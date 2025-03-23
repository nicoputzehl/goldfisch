import { sammlungExtendedStorage } from '../sammlungExtendedStorage';
import { sammlungDB } from '../database';
import { erinnerungStorage } from '../erinnerungStorage';
import { SammlungsTyp } from '@/features/sammlung/types';

// Mock the database and erinnerungStorage
jest.mock('../database', () => {
  const mockDB = {
    update: jest.fn(),
    remove: jest.fn(),
    get: jest.fn(),
    query: jest.fn(),
  };
  
  return {
    sammlungDB: mockDB,
  };
});

jest.mock('../erinnerungStorage', () => ({
  erinnerungStorage: {
    getBySammlung: jest.fn(),
    deleteBySammlung: jest.fn(),
  }
}));

describe('sammlungExtendedStorage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  describe('updateTitelbild', () => {
    it('should update the bildURL of a sammlung', async () => {
      const id = 'sammlung_123';
      const bildURL = 'https://example.com/image.jpg';
      const sammlung = {
        id,
        name: 'Test Sammlung',
        type: SammlungsTyp.FILM,
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
      };
      
      const updatedSammlung = {
        ...sammlung,
        bildURL,
        aktualisiertAm: expect.any(Date)
      };
      
      (sammlungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(sammlung);
        return Promise.resolve(result);
      });
      
      const result = await sammlungExtendedStorage.updateTitelbild(id, bildURL);
      
      expect(sammlungDB.update).toHaveBeenCalledWith(id, expect.any(Function));
      expect(result).toEqual(updatedSammlung);
      expect(result?.bildURL).toBe(bildURL);
      expect(result?.aktualisiertAm).not.toEqual(sammlung.aktualisiertAm);
    });
  });
  
  describe('deleteWithErinnerungen', () => {
    it('should delete a sammlung and all its erinnerungen', async () => {
      const id = 'sammlung_123';
      const erinnerungen = [
        { id: 'erinnerung_1' },
        { id: 'erinnerung_2' }
      ];
      
      (erinnerungStorage.getBySammlung as jest.Mock).mockResolvedValueOnce(erinnerungen);
      (erinnerungStorage.deleteBySammlung as jest.Mock).mockResolvedValueOnce(undefined);
      (sammlungDB.remove as jest.Mock).mockResolvedValueOnce(undefined);
      
      const result = await sammlungExtendedStorage.deleteWithErinnerungen(id);
      
      expect(erinnerungStorage.getBySammlung).toHaveBeenCalledWith(id);
      expect(erinnerungStorage.deleteBySammlung).toHaveBeenCalledWith(id);
      expect(sammlungDB.remove).toHaveBeenCalledWith(id);
      expect(result).toBe(2); // Number of deleted erinnerungen
    });
    
    it('should throw an error if deletion fails', async () => {
      const id = 'sammlung_123';
      const error = new Error('Deletion failed');
      
      (erinnerungStorage.getBySammlung as jest.Mock).mockRejectedValueOnce(error);
      
      await expect(sammlungExtendedStorage.deleteWithErinnerungen(id))
        .rejects.toThrow('Sammlung und Erinnerungen konnten nicht gelöscht werden');
    });
  });
  
  describe('addDescription', () => {
    it('should add a description to a sammlung', async () => {
      const id = 'sammlung_123';
      const beschreibung = 'This is a test description';
      const sammlung = {
        id,
        name: 'Test Sammlung',
        type: SammlungsTyp.FILM,
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
      };
      
      const updatedSammlung = {
        ...sammlung,
        beschreibung,
        aktualisiertAm: expect.any(Date)
      };
      
      (sammlungDB.update as jest.Mock).mockImplementationOnce((id, updateFn) => {
        const result = updateFn(sammlung);
        return Promise.resolve(result);
      });
      
      const result = await sammlungExtendedStorage.addDescription(id, beschreibung);
      
      expect(sammlungDB.update).toHaveBeenCalledWith(id, expect.any(Function));
      expect(result).toEqual(updatedSammlung);
      expect(result?.beschreibung).toBe(beschreibung);
      expect(result?.aktualisiertAm).not.toEqual(sammlung.aktualisiertAm);
    });
  });
  
  describe('getByType', () => {
    it('should return sammlungen of the specified type', async () => {
      const typ = SammlungsTyp.FILM;
      const sammlungen = [
        {
          id: 'sammlung_1',
          name: 'Film 1',
          type: SammlungsTyp.FILM,
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        },
        {
          id: 'sammlung_2',
          name: 'Film 2',
          type: SammlungsTyp.FILM,
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        },
        {
          id: 'sammlung_3',
          name: 'Book 1',
          type: SammlungsTyp.BUCH,
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        }
      ];
      
      (sammlungDB.query as jest.Mock).mockImplementationOnce(predicate => {
        return Promise.resolve(sammlungen.filter(sammlung => predicate(sammlung)));
      });
      
      const result = await sammlungExtendedStorage.getByType(typ);
      
      expect(sammlungDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toHaveLength(2);
      expect(result[0].type).toBe(SammlungsTyp.FILM);
      expect(result[1].type).toBe(SammlungsTyp.FILM);
    });
  });
  
  describe('getSummary', () => {
    it('should return a summary with statistics for a sammlung', async () => {
      const id = 'sammlung_123';
      const sammlung = {
        id,
        name: 'Test Sammlung',
        type: SammlungsTyp.FILM,
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
      };
      
      const erinnerungen = [
        {
          id: 'erinnerung_1',
          titel: 'Erinnerung 1',
          aktualisiertAm: new Date(2020, 0, 2)
        },
        {
          id: 'erinnerung_2',
          titel: 'Erinnerung 2',
          aktualisiertAm: new Date(2020, 0, 3),
          erfolgreichGenutztAm: new Date(2020, 0, 3)
        },
        {
          id: 'erinnerung_3',
          titel: 'Erinnerung 3',
          aktualisiertAm: new Date(2020, 0, 4),
          erfolgreichGenutztAm: new Date(2020, 0, 4)
        }
      ];
      
      (sammlungDB.get as jest.Mock).mockResolvedValueOnce(sammlung);
      (erinnerungStorage.getBySammlung as jest.Mock).mockResolvedValueOnce(erinnerungen);
      
      const result = await sammlungExtendedStorage.getSummary(id);
      
      expect(sammlungDB.get).toHaveBeenCalledWith(id);
      expect(erinnerungStorage.getBySammlung).toHaveBeenCalledWith(id);
      expect(result).toEqual({
        anzahlErinnerungen: 3,
        anzahlErfolge: 2,
        letzteAktualisierung: new Date(2020, 0, 4)
      });
    });
    
    it('should throw an error if sammlung does not exist', async () => {
      const id = 'nonexistent';
      
      (sammlungDB.get as jest.Mock).mockResolvedValueOnce(null);
      
      await expect(sammlungExtendedStorage.getSummary(id))
        .rejects.toThrow(`Sammlung mit ID ${id} nicht gefunden`);
    });
    
    it('should handle case when no erinnerungen exist', async () => {
      const id = 'sammlung_123';
      const sammlung = {
        id,
        name: 'Test Sammlung',
        type: SammlungsTyp.FILM,
        erstelltAm: new Date(2020, 0, 1),
        aktualisiertAm: new Date(2020, 0, 1)
      };
      
      (sammlungDB.get as jest.Mock).mockResolvedValueOnce(sammlung);
      (erinnerungStorage.getBySammlung as jest.Mock).mockResolvedValueOnce([]);
      
      const result = await sammlungExtendedStorage.getSummary(id);
      
      expect(result).toEqual({
        anzahlErinnerungen: 0,
        anzahlErfolge: 0,
        letzteAktualisierung: sammlung.aktualisiertAm
      });
    });
  });
  
  describe('sortSammlungen', () => {
    it('should sort sammlungen by name in ascending order', () => {
      const sammlungen = [
        {
          id: 'sammlung_1',
          name: 'Z Sammlung',
          type: SammlungsTyp.FILM,
          erstelltAm: new Date(2020, 0, 1),
          aktualisiertAm: new Date(2020, 0, 1)
        },
        {
          id: 'sammlung_2',
          name: 'A Sammlung',
          type: SammlungsTyp.BUCH,
          erstelltAm: new Date(2020, 0, 3),
          aktualisiertAm: new Date(2020, 0, 3)
        },
        {
          id: 'sammlung_3',
          name: 'M Sammlung',
          type: SammlungsTyp.REZEPT,
          erstelltAm: new Date(2020, 0, 2),
          aktualisiertAm: new Date(2020, 0, 2)
        }
      ];
      
      const result = sammlungExtendedStorage.sortSammlungen(sammlungen, 'name');
      
      expect(result[0].name).toBe('A Sammlung');
      expect(result[1].name).toBe('M Sammlung');
      expect(result[2].name).toBe('Z Sammlung');
    });
    
    it('should sort sammlungen by erstelltAm in descending order', () => {
      const sammlungen = [
        {
          id: 'sammlung_1',
          name: 'Sammlung 1',
          type: SammlungsTyp.FILM,
          erstelltAm: new Date(2020, 0, 1),
          aktualisiertAm: new Date(2020, 0, 1)
        },
        {
          id: 'sammlung_2',
          name: 'Sammlung 2',
          type: SammlungsTyp.BUCH,
          erstelltAm: new Date(2020, 0, 3),
          aktualisiertAm: new Date(2020, 0, 3)
        },
        {
          id: 'sammlung_3',
          name: 'Sammlung 3',
          type: SammlungsTyp.REZEPT,
          erstelltAm: new Date(2020, 0, 2),
          aktualisiertAm: new Date(2020, 0, 2)
        }
      ];
      
      const result = sammlungExtendedStorage.sortSammlungen(sammlungen, 'erstelltAm', true);
      
      expect(result[0].id).toBe('sammlung_2'); // Newest
      expect(result[1].id).toBe('sammlung_3');
      expect(result[2].id).toBe('sammlung_1'); // Oldest
    });
    
    it('should sort sammlungen by type in ascending order', () => {
      const sammlungen = [
        {
          id: 'sammlung_1',
          name: 'Sammlung 1',
          type: SammlungsTyp.REZEPT,
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        },
        {
          id: 'sammlung_2',
          name: 'Sammlung 2',
          type: SammlungsTyp.BUCH,
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        },
        {
          id: 'sammlung_3',
          name: 'Sammlung 3',
          type: SammlungsTyp.FILM,
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        }
      ];
      
      const result = sammlungExtendedStorage.sortSammlungen(sammlungen, 'type');
      
      // Alphabetical order of enum values
      expect(result[0].type).toBe(SammlungsTyp.BUCH);
      expect(result[1].type).toBe(SammlungsTyp.FILM);
      expect(result[2].type).toBe(SammlungsTyp.REZEPT);
    });
    
    it('should not modify the original array', () => {
      const sammlungen = [
        {
          id: 'sammlung_1',
          name: 'Z Sammlung',
          type: SammlungsTyp.FILM,
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        },
        {
          id: 'sammlung_2',
          name: 'A Sammlung',
          type: SammlungsTyp.BUCH,
          erstelltAm: new Date(),
          aktualisiertAm: new Date()
        }
      ];
      
      const originalFirst = sammlungen[0];
      
      sammlungExtendedStorage.sortSammlungen(sammlungen, 'name');
      
      expect(sammlungen[0]).toBe(originalFirst); // Original array unchanged
    });
  });
});
