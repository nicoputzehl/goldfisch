import { erinnerungStorage } from '../erinnerungStorage';
import { erinnerungDB } from '../database';
import { SammlungsTyp } from '@/features/sammlung/types';
import type { ErinnerungTypen } from '@/features/erinnerung/types';

// Mock the database
jest.mock('../database', () => {
  const mockDB = {
    set: jest.fn(),
    get: jest.fn(),
    getAll: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
    query: jest.fn(),
  };
  
  return {
    erinnerungDB: mockDB,
  };
});

describe('erinnerungStorage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Mock Date.now() to return a fixed timestamp
    jest.spyOn(Date, 'now').mockReturnValue(1600000000000);
    // Mock Math.random() to return a fixed value
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  describe('create', () => {
    it('should create an erinnerung with the correct properties', async () => {
      const input = {
        sammlungId: 'sammlung_123',
        sammlungsTyp: SammlungsTyp.FILM,
        titel: 'Test Erinnerung',
        tags: ['test', 'film'],
        notizen: 'Testnotizen',
        regisseur: 'Test Director',
        erscheinungsJahr: 2020
      };
      
      const expectedErinnerung = {
        ...input,
        id: 'erinnerung_1600000000000_500',
        erstelltAm: expect.any(Date),
        aktualisiertAm: expect.any(Date),
        erfolgreichGenutztAm: undefined
      };
      
      (erinnerungDB.set as jest.Mock).mockResolvedValueOnce(undefined);
      
      const result = await erinnerungStorage.create(input);
      
      expect(erinnerungDB.set).toHaveBeenCalledWith(
        'erinnerung_1600000000000_500',
        expectedErinnerung
      );
      expect(result).toEqual(expectedErinnerung);
      expect(result.erstelltAm).toBeInstanceOf(Date);
      expect(result.aktualisiertAm).toBeInstanceOf(Date);
    });
  });

  describe('getById', () => {
    it('should return the erinnerung with the given id', async () => {
      const erinnerung = {
        id: 'erinnerung_123',
        sammlungId: 'sammlung_123',
        sammlungsTyp: SammlungsTyp.FILM,
        titel: 'Test',
        tags: [],
        erstelltAm: new Date(),
        aktualisiertAm: new Date()
      };
      
      (erinnerungDB.get as jest.Mock).mockResolvedValueOnce(erinnerung);
      
      const result = await erinnerungStorage.getById('erinnerung_123');
      
      expect(erinnerungDB.get).toHaveBeenCalledWith('erinnerung_123');
      expect(result).toEqual(erinnerung);
    });

    it('should return null if no erinnerung is found', async () => {
      (erinnerungDB.get as jest.Mock).mockResolvedValueOnce(null);
      
      const result = await erinnerungStorage.getById('nonexistent');
      
      expect(result).toBeNull();
    });
  });

  describe('getBySammlung', () => {
    it('should return all erinnerungen for a given sammlungId', async () => {
      const sammlungId = 'sammlung_123';
      const erinnerungen = [
        {
          id: 'erinnerung_1',
          sammlungId,
          titel: 'Test 1',
          tags: [],
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        },
        {
          id: 'erinnerung_2',
          sammlungId,
          titel: 'Test 2',
          tags: [],
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        }
      ];
      
      (erinnerungDB.query as jest.Mock).mockImplementationOnce(predicate => {
        // Simulate predicate filtering
        const results = erinnerungen.filter(e => predicate(e));
        return Promise.resolve(results);
      });
      
      const result = await erinnerungStorage.getBySammlung(sammlungId);
      
      expect(erinnerungDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toHaveLength(2);
      expect(result[0].sammlungId).toBe(sammlungId);
      expect(result[1].sammlungId).toBe(sammlungId);
    });
  });

  describe('markAsSuccess', () => {
    it('should mark an erinnerung as successful', async () => {
      const id = 'erinnerung_123';
      const erinnerung = {
        id,
        sammlungId: 'sammlung_123',
        sammlungsTyp: SammlungsTyp.FILM,
        titel: 'Test',
        tags: [],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1),
        erfolgreichGenutztAm: undefined
      };
      
      const updatedErinnerung = {
        ...erinnerung,
        erfolgreichGenutztAm: expect.any(Date),
        aktualisiertAm: expect.any(Date)
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungStorage.markAsSuccess(id);
      
      expect(erinnerungDB.update).toHaveBeenCalledWith(id, expect.any(Function));
      expect(result).toEqual(updatedErinnerung);
      expect(result?.erfolgreichGenutztAm).toBeInstanceOf(Date);
      expect(result?.aktualisiertAm).not.toEqual(erinnerung.aktualisiertAm);
    });
  });

  describe('moveToSammlung', () => {
    it('should update the sammlungId of an erinnerung', async () => {
      const id = 'erinnerung_123';
      const originalSammlungId = 'sammlung_123';
      const neueSammlungId = 'sammlung_456';
      
      const erinnerung = {
        id,
        sammlungId: originalSammlungId,
        titel: 'Test',
        tags: [],
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
      };
      
      const updatedErinnerung = {
        ...erinnerung,
        sammlungId: neueSammlungId,
        aktualisiertAm: expect.any(Date)
      };
      
      (erinnerungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(erinnerung);
        return Promise.resolve(result);
      });
      
      const result = await erinnerungStorage.moveToSammlung(id, neueSammlungId);
      
      expect(erinnerungDB.update).toHaveBeenCalledWith(id, expect.any(Function));
      expect(result).toEqual(updatedErinnerung);
      expect(result?.sammlungId).toBe(neueSammlungId);
    });
  });

  describe('searchByTitle', () => {
    it('should return erinnerungen that include the search term in their title', async () => {
      const suchbegriff = 'test';
      const erinnerungen = [
        {
          id: 'erinnerung_1',
          titel: 'Test Erinnerung',
          tags: [],
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        },
        {
          id: 'erinnerung_2',
          titel: 'Andere Erinnerung',
          tags: [],
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        }
      ];
      
      (erinnerungDB.query as jest.Mock).mockImplementationOnce(predicate => {
        const results = erinnerungen.filter(erinnerung => 
          predicate(erinnerung)
        );
        return Promise.resolve(results);
      });
      
      const result = await erinnerungStorage.searchByTitle(suchbegriff);
      
      expect(erinnerungDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('erinnerung_1');
    });

    it('should be case insensitive', async () => {
      const suchbegriff = 'TEST';
      const erinnerungen = [
        {
          id: 'erinnerung_1',
          titel: 'Test Erinnerung',
          tags: [],
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        }
      ];
      
      (erinnerungDB.query as jest.Mock).mockImplementationOnce(predicate => {
        const results = erinnerungen.filter(erinnerung => 
          predicate(erinnerung)
        );
        return Promise.resolve(results);
      });
      
      const result = await erinnerungStorage.searchByTitle(suchbegriff);
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('erinnerung_1');
    });
  });

  describe('searchByTags', () => {
    it('should return erinnerungen that have at least one of the provided tags', async () => {
      const tags = ['film', 'action'];
      const erinnerungen = [
        {
          id: 'erinnerung_1',
          titel: 'Film 1',
          tags: ['film', 'drama'],
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        },
        {
          id: 'erinnerung_2',
          titel: 'Film 2',
          tags: ['action', 'sci-fi'],
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        },
        {
          id: 'erinnerung_3',
          titel: 'Film 3',
          tags: ['comedy'],
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        }
      ];
      
      (erinnerungDB.query as jest.Mock).mockImplementationOnce(predicate => {
        const results = erinnerungen.filter(erinnerung => 
          predicate(erinnerung)
        );
        return Promise.resolve(results);
      });
      
      const result = await erinnerungStorage.searchByTags(tags);
      
      expect(erinnerungDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('erinnerung_1');
      expect(result[1].id).toBe('erinnerung_2');
    });

    it('should return an empty array if tags array is empty', async () => {
      const tags: string[] = [];
      
      const result = await erinnerungStorage.searchByTags(tags);
      
      expect(result).toEqual([]);
      expect(erinnerungDB.query).not.toHaveBeenCalled();
    });
  });

  describe('getSuccessful', () => {
    it('should return all erinnerungen that have been marked as successful', async () => {
      const erinnerungen = [
        {
          id: 'erinnerung_1',
          titel: 'Success 1',
          tags: [],
          erstelltAm: new Date(),
          aktualisiertAm: new Date(),
          erfolgreichGenutztAm: new Date()
        },
        {
          id: 'erinnerung_2',
          titel: 'Not Success',
          tags: [],
          erstelltAm: new Date(),
          aktualisiertAm: new Date(),
          erfolgreichGenutztAm: undefined
        },
        {
          id: 'erinnerung_3',
          titel: 'Success 2',
          tags: [],
          erstelltAm: new Date(),
          aktualisiertAm: new Date(),
          erfolgreichGenutztAm: new Date()
        }
      ];
      
      (erinnerungDB.query as jest.Mock).mockImplementationOnce(predicate => {
        const results = erinnerungen.filter(erinnerung => 
          predicate(erinnerung)
        );
        return Promise.resolve(results);
      });
      
      const result = await erinnerungStorage.getSuccessful();
      
      expect(erinnerungDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('erinnerung_1');
      expect(result[1].id).toBe('erinnerung_3');
    });
  });

  describe('countBySammlung', () => {
    it('should return the count of erinnerungen for a given sammlungId', async () => {
      const sammlungId = 'sammlung_123';
      const erinnerungen = [
        { id: 'erinnerung_1', sammlungId },
        { id: 'erinnerung_2', sammlungId }
      ] as ErinnerungTypen[];
      
      // Mock getBySammlung to return these erinnerungen
      jest.spyOn(erinnerungStorage, 'getBySammlung').mockResolvedValueOnce(erinnerungen);
      
      const result = await erinnerungStorage.countBySammlung(sammlungId);
      
      expect(erinnerungStorage.getBySammlung).toHaveBeenCalledWith(sammlungId);
      expect(result).toBe(2);
    });
  });

  describe('deleteBySammlung', () => {
    it('should delete all erinnerungen for a given sammlungId', async () => {
      const sammlungId = 'sammlung_123';
      const erinnerungen = [
        { id: 'erinnerung_1', sammlungId },
        { id: 'erinnerung_2', sammlungId }
      ] as ErinnerungTypen[];
      
      // Mock getBySammlung to return these erinnerungen
      jest.spyOn(erinnerungStorage, 'getBySammlung').mockResolvedValueOnce(erinnerungen);
      
      await erinnerungStorage.deleteBySammlung(sammlungId);
      
      expect(erinnerungStorage.getBySammlung).toHaveBeenCalledWith(sammlungId);
      expect(erinnerungDB.remove).toHaveBeenCalledTimes(2);
      expect(erinnerungDB.remove).toHaveBeenCalledWith('erinnerung_1');
      expect(erinnerungDB.remove).toHaveBeenCalledWith('erinnerung_2');
    });
  });
});
