import { sammlungStorage } from '../sammlungStorage';
import { sammlungDB } from '../database';
import { SammlungsTyp } from '@/features/sammlung/types';

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
    sammlungDB: mockDB,
  };
});

describe('sammlungStorage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Mock Date.now() to return a fixed timestamp
    jest.spyOn(Date, 'now').mockReturnValue(1600000000000);
    // Mock Math.random() to return a fixed value
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  describe('create', () => {
    it('should create a sammlung with the correct properties', async () => {
      const input = {
        name: 'Test Sammlung',
        type: SammlungsTyp.FILM,
        beschreibung: 'Eine Testsammlung',
        plattform: 'Netflix'
      };
      
      const expectedSammlung = {
        ...input,
        id: 'sammlung_1600000000000_500',
        erstelltAm: expect.any(Date),
        aktualisiertAm: expect.any(Date),
      };
      
      (sammlungDB.set as jest.Mock).mockResolvedValueOnce(undefined);
      
      const result = await sammlungStorage.create(input);
      
      expect(sammlungDB.set).toHaveBeenCalledWith(
        'sammlung_1600000000000_500',
        expectedSammlung
      );
      expect(result).toEqual(expectedSammlung);
      expect(result.erstelltAm).toBeInstanceOf(Date);
      expect(result.aktualisiertAm).toBeInstanceOf(Date);
    });
  });

  describe('getById', () => {
    it('should return the sammlung with the given id', async () => {
      const sammlung = {
        id: 'sammlung_123',
        name: 'Test',
        type: SammlungsTyp.FILM,
        erstelltAm: new Date(),
        aktualisiertAm: new Date()
      };
      
      (sammlungDB.get as jest.Mock).mockResolvedValueOnce(sammlung);
      
      const result = await sammlungStorage.getById('sammlung_123');
      
      expect(sammlungDB.get).toHaveBeenCalledWith('sammlung_123');
      expect(result).toEqual(sammlung);
    });

    it('should return null if no sammlung is found', async () => {
      (sammlungDB.get as jest.Mock).mockResolvedValueOnce(null);
      
      const result = await sammlungStorage.getById('nonexistent');
      
      expect(result).toBeNull();
    });
  });

  describe('getAll', () => {
    it('should return all sammlungen sorted by creation date (newest first)', async () => {
      const sammlungen = [
        {
          id: 'sammlung_1',
          name: 'Old',
          type: SammlungsTyp.FILM,
          erstelltAm: new Date(2020, 0, 1),
          aktualisiertAm: new Date(2020, 0, 1)
        },
        {
          id: 'sammlung_2',
          name: 'New',
          type: SammlungsTyp.BUCH,
          erstelltAm: new Date(2020, 0, 2),
          aktualisiertAm: new Date(2020, 0, 2)
        }
      ];
      
      (sammlungDB.getAll as jest.Mock).mockResolvedValueOnce(sammlungen);
      
      const result = await sammlungStorage.getAll();
      
      expect(sammlungDB.getAll).toHaveBeenCalled();
      // Should be sorted with newest first
      expect(result[0].id).toBe('sammlung_2');
      expect(result[1].id).toBe('sammlung_1');
    });
  });

  describe('update', () => {
    it('should update a sammlung with the given properties', async () => {
      const id = 'sammlung_123';
      const updates = {
        id: 'sammlung_123',
        name: 'Updated Name',
        beschreibung: 'Updated description'
      };
      
      const original = {
        id,
        name: 'Original Name',
        type: SammlungsTyp.FILM,
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
      };
      
      const updated = {
        ...original,
        ...updates,
        aktualisiertAm: expect.any(Date)
      };
      
      (sammlungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(original);
        return Promise.resolve(result);
      });
      
      const result = await sammlungStorage.update(id, updates);
      
      expect(sammlungDB.update).toHaveBeenCalledWith(id, expect.any(Function));
      expect(result).toEqual(updated);
      expect(result?.aktualisiertAm).not.toEqual(original.aktualisiertAm);
    });
  });

  describe('delete', () => {
    it('should delete the sammlung with the given id', async () => {
      const id = 'sammlung_123';
      
      await sammlungStorage.delete(id);
      
      expect(sammlungDB.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('searchByName', () => {
    it('should return sammlungen that include the search term in their name', async () => {
      const suchbegriff = 'test';
      const sammlungen = [
        {
          id: 'sammlung_1',
          name: 'Test Sammlung',
          type: SammlungsTyp.FILM,
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        },
        {
          id: 'sammlung_2',
          name: 'Andere Sammlung',
          type: SammlungsTyp.BUCH,
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        }
      ];
      
      (sammlungDB.query as jest.Mock).mockImplementationOnce(predicate => {
        const results = sammlungen.filter(sammlung => 
          predicate(sammlung)
        );
        return Promise.resolve(results);
      });
      
      const result = await sammlungStorage.searchByName(suchbegriff);
      
      expect(sammlungDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('sammlung_1');
    });

    it('should be case insensitive', async () => {
      const suchbegriff = 'TEST';
      const sammlungen = [
        {
          id: 'sammlung_1',
          name: 'Test Sammlung',
          type: SammlungsTyp.FILM,
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        }
      ];
      
      (sammlungDB.query as jest.Mock).mockImplementationOnce(predicate => {
        const results = sammlungen.filter(sammlung => 
          predicate(sammlung)
        );
        return Promise.resolve(results);
      });
      
      const result = await sammlungStorage.searchByName(suchbegriff);
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('sammlung_1');
    });
  });

  describe('count', () => {
    it('should return the count of all sammlungen', async () => {
      const sammlungen = [
        { id: 'sammlung_1' },
        { id: 'sammlung_2' }
      ];
      
      (sammlungDB.getAll as jest.Mock).mockResolvedValueOnce(sammlungen);
      
      const result = await sammlungStorage.count();
      
      expect(sammlungDB.getAll).toHaveBeenCalled();
      expect(result).toBe(2);
    });
  });
});
