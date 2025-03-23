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

describe('erinnerungExtendedStorage - Image Operations', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  describe('addBilder', () => {
    it('should add image URLs to an erinnerung', async () => {
      const id = 'erinnerung_123';
      const bildURLs = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'];
      const erinnerung = {
        id,
        titel: 'Test Erinnerung',
        tags: [],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1),
        bildURLs: ['https://example.com/existing.jpg']
      };
      
      const expectedUpdated = {
        ...erinnerung,
        bildURLs: [
          'https://example.com/existing.jpg',
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg'
        ],
        aktualisiertAm: expect.any(Date)
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungExtendedStorage.addBilder(id, bildURLs);
      
      expect(erinnerungDB.update).toHaveBeenCalledWith(id, expect.any(Function));
      expect(result).toEqual(expectedUpdated);
      expect(result?.bildURLs).toHaveLength(3);
    });
    
    it('should create bildURLs array if it does not exist', async () => {
      const id = 'erinnerung_123';
      const bildURLs = ['https://example.com/image1.jpg'];
      const erinnerung = {
        id,
        titel: 'Test Erinnerung',
        tags: [],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
        // No bildURLs property
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungExtendedStorage.addBilder(id, bildURLs);
      
      expect(result?.bildURLs).toEqual(['https://example.com/image1.jpg']);
    });
    
    it('should remove duplicate URLs', async () => {
      const id = 'erinnerung_123';
      const bildURLs = [
        'https://example.com/image1.jpg',
        'https://example.com/image1.jpg'  // Duplicate
      ];
      const erinnerung = {
        id,
        titel: 'Test Erinnerung',
        tags: [],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1),
        bildURLs: ['https://example.com/image1.jpg']  // Already exists
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungExtendedStorage.addBilder(id, bildURLs);
      
      expect(result?.bildURLs).toHaveLength(1);  // Should only have one unique URL
      expect(result?.bildURLs).toEqual(['https://example.com/image1.jpg']);
    });
  });
  
  describe('removeBilder', () => {
    it('should remove specified image URLs from an erinnerung', async () => {
      const id = 'erinnerung_123';
      const bildURLsToRemove = ['https://example.com/image2.jpg'];
      const erinnerung = {
        id,
        titel: 'Test Erinnerung',
        tags: [],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1),
        bildURLs: [
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg',
          'https://example.com/image3.jpg'
        ]
      };
      
      const expectedUpdated = {
        ...erinnerung,
        bildURLs: [
          'https://example.com/image1.jpg',
          'https://example.com/image3.jpg'
        ],
        aktualisiertAm: expect.any(Date)
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungExtendedStorage.removeBilder(id, bildURLsToRemove);
      
      expect(erinnerungDB.update).toHaveBeenCalledWith(id, expect.any(Function));
      expect(result).toEqual(expectedUpdated);
      expect(result?.bildURLs).toHaveLength(2);
      expect(result?.bildURLs).not.toContain('https://example.com/image2.jpg');
    });
    
    it('should handle case when bildURLs is undefined', async () => {
      const id = 'erinnerung_123';
      const bildURLsToRemove = ['https://example.com/image1.jpg'];
      const erinnerung = {
        id,
        titel: 'Test Erinnerung',
        tags: [],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
        // No bildURLs property
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungExtendedStorage.removeBilder(id, bildURLsToRemove);
      
      expect(result?.bildURLs).toEqual([]);
    });
  });
});
