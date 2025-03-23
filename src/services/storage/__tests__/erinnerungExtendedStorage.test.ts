import { erinnerungExtendedStorage } from '../erinnerungExtendedStorage';
import { erinnerungDB } from '../database';
import { SammlungsTyp } from '@/features/sammlung/types';

// Mock the database
jest.mock('../database', () => {
  const mockDB = {
    set: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    query: jest.fn(),
  };
  
  return {
    erinnerungDB: mockDB,
  };
});

describe('erinnerungExtendedStorage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Mock Date.now() to return a fixed timestamp
    jest.spyOn(Date, 'now').mockReturnValue(1600000000000);
    // Mock Math.random() to return a fixed value
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });
  
  describe('duplicate', () => {
    it('should create a copy of an erinnerung with a new ID and "(Kopie)" added to the title', async () => {
      const id = 'erinnerung_123';
      const original = {
        id,
        sammlungId: 'sammlung_123',
        sammlungsTyp: SammlungsTyp.FILM,
        titel: 'Original Titel',
        tags: ['tag1', 'tag2'],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1),
        erfolgreichGenutztAm: new Date(2020, 0, 2),
        regisseur: 'Director Name'
      };
      
      (erinnerungDB.get as jest.Mock).mockResolvedValueOnce(original);
      (erinnerungDB.set as jest.Mock).mockResolvedValueOnce(undefined);
      
      const result = await erinnerungExtendedStorage.duplicate(id);
      
      expect(erinnerungDB.get).toHaveBeenCalledWith(id);
      expect(erinnerungDB.set).toHaveBeenCalledWith(
        'erinnerung_1600000000000_500',
        expect.objectContaining({
          id: 'erinnerung_1600000000000_500',
          sammlungId: 'sammlung_123',
          sammlungsTyp: SammlungsTyp.FILM,
          titel: 'Original Titel (Kopie)',
          tags: ['tag1', 'tag2'],
          regisseur: 'Director Name',
          erstelltAm: expect.any(Date),
          aktualisiertAm: expect.any(Date),
          erfolgreichGenutztAm: undefined  // Should reset success status
        })
      );
      
      expect(result?.titel).toBe('Original Titel (Kopie)');
      expect(result?.erfolgreichGenutztAm).toBeUndefined();
    });
    
    it('should return null if the original erinnerung does not exist', async () => {
      const id = 'nonexistent';
      
      (erinnerungDB.get as jest.Mock).mockResolvedValueOnce(null);
      
      const result = await erinnerungExtendedStorage.duplicate(id);
      
      expect(erinnerungDB.get).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
      expect(erinnerungDB.set).not.toHaveBeenCalled();
    });
    
    it('should throw an error if duplication fails', async () => {
      const id = 'erinnerung_123';
      const error = new Error('Get error');
      
      (erinnerungDB.get as jest.Mock).mockRejectedValueOnce(error);
      
      await expect(erinnerungExtendedStorage.duplicate(id))
        .rejects.toThrow('Erinnerung konnte nicht dupliziert werden');
    });
  });
  
  describe('unmarkSuccess', () => {
    it('should remove the erfolgreichGenutztAm field from an erinnerung', async () => {
      const id = 'erinnerung_123';
      const erinnerung = {
        id,
        titel: 'Test Erinnerung',
        tags: [],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1),
        erfolgreichGenutztAm: new Date(2020, 0, 2)
      };
      
      const expectedUpdated = {
        id: erinnerung.id,
        titel: erinnerung.titel,
        tags: erinnerung.tags,
        erstelltAm: erinnerung.erstelltAm,
        aktualisiertAm: expect.any(Date)
        // erfolgreichGenutztAm should be removed
      };
      
      (erinnerungDB.get as jest.Mock).mockResolvedValueOnce(erinnerung);
      (erinnerungDB.set as jest.Mock).mockResolvedValueOnce(undefined);
      
      const result = await erinnerungExtendedStorage.unmarkSuccess(id);
      
      expect(erinnerungDB.get).toHaveBeenCalledWith(id);
      expect(erinnerungDB.set).toHaveBeenCalledWith(id, expectedUpdated);
      expect(result).toEqual(expectedUpdated);
      expect(result?.erfolgreichGenutztAm).toBeUndefined();
    });
    
    it('should return null if the erinnerung does not exist', async () => {
      const id = 'nonexistent';
      
      (erinnerungDB.get as jest.Mock).mockResolvedValueOnce(null);
      
      const result = await erinnerungExtendedStorage.unmarkSuccess(id);
      
      expect(erinnerungDB.get).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
      expect(erinnerungDB.set).not.toHaveBeenCalled();
    });
    
    it('should handle errors and return null', async () => {
      const id = 'erinnerung_123';
      const error = new Error('Get error');
      
      (erinnerungDB.get as jest.Mock).mockRejectedValueOnce(error);
      
      const result = await erinnerungExtendedStorage.unmarkSuccess(id);
      
      expect(result).toBeNull();
    });
  });
});
