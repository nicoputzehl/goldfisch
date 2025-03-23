import { erinnerungExtendedStorage } from '../erinnerungExtendedStorage';
import { erinnerungDB } from '../database';

// Mock the database
jest.mock('../database', () => {
  const mockDB = {
    update: jest.fn(),
  };
  
  return {
    erinnerungDB: mockDB,
  };
});

describe('erinnerungExtendedStorage - Tag Operations', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  describe('updateTags', () => {
    it('should replace all tags in an erinnerung', async () => {
      const id = 'erinnerung_123';
      const newTags = ['new1', 'new2', 'new3'];
      const erinnerung = {
        id,
        titel: 'Test Erinnerung',
        tags: ['old1', 'old2'],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
      };
      
      const expectedUpdated = {
        ...erinnerung,
        tags: newTags,
        aktualisiertAm: expect.any(Date)
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungExtendedStorage.updateTags(id, newTags);
      
      expect(erinnerungDB.update).toHaveBeenCalledWith(id, expect.any(Function));
      expect(result).toEqual(expectedUpdated);
      expect(result?.tags).toEqual(newTags);
    });
  });
  
  describe('addTag', () => {
    it('should add a tag to an erinnerung if it does not already exist', async () => {
      const id = 'erinnerung_123';
      const newTag = 'newTag';
      const erinnerung = {
        id,
        titel: 'Test Erinnerung',
        tags: ['existingTag'],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
      };
      
      const expectedUpdated = {
        ...erinnerung,
        tags: ['existingTag', newTag],
        aktualisiertAm: expect.any(Date)
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungExtendedStorage.addTag(id, newTag);
      
      expect(erinnerungDB.update).toHaveBeenCalledWith(id, expect.any(Function));
      expect(result).toEqual(expectedUpdated);
      expect(result?.tags).toContain(newTag);
    });
    
    it('should not add a tag if it already exists', async () => {
      const id = 'erinnerung_123';
      const existingTag = 'existingTag';
      const erinnerung = {
        id,
        titel: 'Test Erinnerung',
        tags: [existingTag],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungExtendedStorage.addTag(id, existingTag);
      
      expect(result?.tags).toHaveLength(1);
      expect(result?.tags).toEqual([existingTag]);
    });
    
    it('should create tags array if it does not exist', async () => {
      const id = 'erinnerung_123';
      const newTag = 'newTag';
      const erinnerung = {
        id,
        titel: 'Test Erinnerung',
        tags: undefined as unknown as string[], // Explicitly set to undefined for test
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungExtendedStorage.addTag(id, newTag);
      
      expect(result?.tags).toEqual([newTag]);
    });
  });
  
  describe('removeTag', () => {
    it('should remove a tag from an erinnerung', async () => {
      const id = 'erinnerung_123';
      const tagToRemove = 'tag2';
      const erinnerung = {
        id,
        titel: 'Test Erinnerung',
        tags: ['tag1', 'tag2', 'tag3'],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
      };
      
      const expectedUpdated = {
        ...erinnerung,
        tags: ['tag1', 'tag3'],
        aktualisiertAm: expect.any(Date)
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungExtendedStorage.removeTag(id, tagToRemove);
      
      expect(erinnerungDB.update).toHaveBeenCalledWith(id, expect.any(Function));
      expect(result).toEqual(expectedUpdated);
      expect(result?.tags).not.toContain(tagToRemove);
    });
    
    it('should handle case when tag does not exist', async () => {
      const id = 'erinnerung_123';
      const nonExistentTag = 'nonExistentTag';
      const erinnerung = {
        id,
        titel: 'Test Erinnerung',
        tags: ['tag1', 'tag2'],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungExtendedStorage.removeTag(id, nonExistentTag);
      
      expect(result?.tags).toEqual(['tag1', 'tag2']);
    });
    
    it('should handle case when tags array is undefined', async () => {
      const id = 'erinnerung_123';
      const tagToRemove = 'tag';
      const erinnerung = {
        id,
        titel: 'Test Erinnerung',
        tags: undefined as unknown as string[],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungExtendedStorage.removeTag(id, tagToRemove);
      
      expect(result?.tags).toEqual([]);
    });
  });
});
