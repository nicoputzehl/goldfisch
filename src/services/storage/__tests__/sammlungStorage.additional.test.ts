import { sammlungStorage } from '../sammlungStorage';
import { sammlungDB } from '../database';
import { SammlungsTyp } from '@/features/sammlung/types';

// Mock für database
jest.mock('../database', () => ({
  sammlungDB: {
    set: jest.fn(),
    get: jest.fn(),
    getAll: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
    query: jest.fn(),
  },
}));

describe('sammlungStorage - erweiterte Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('sollte Timestamps und ID korrekt setzen', async () => {
      // Wir müssen Date.now als Wert mocken, nicht als Funktion
      const originalNow = Date.now;
      const mockTimestamp = 1600000000000;
      Date.now = jest.fn(() => mockTimestamp);
      
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);
      
      const input = {
        name: 'Test Sammlung',
        type: SammlungsTyp.FILM,
        beschreibung: 'Test Beschreibung',
      };

      (sammlungDB.set as jest.Mock).mockResolvedValueOnce(undefined);

      const result = await sammlungStorage.create(input);

      expect(result).toEqual({
        ...input,
        id: `sammlung_${mockTimestamp}_500`,
        erstelltAm: expect.any(Date),
        aktualisiertAm: expect.any(Date),
      });

      expect(sammlungDB.set).toHaveBeenCalledWith(
        `sammlung_${mockTimestamp}_500`,
        expect.objectContaining({
          name: 'Test Sammlung',
          type: SammlungsTyp.FILM,
          beschreibung: 'Test Beschreibung',
          erstelltAm: expect.any(Date),
          aktualisiertAm: expect.any(Date),
        })
      );

      // Cleanup
      Date.now = originalNow;
      mockRandom.mockRestore();
    });
  });

  describe('update', () => {
    it('sollte aktualisiertAm aktualisieren', async () => {
      const dateBefore = new Date(2023, 0, 1);
      const dateAfter = new Date(2023, 0, 2);
      let currentDate = dateBefore;
      
      // Mock Date constructor instead of Date.now
      const originalDate = global.Date;
      global.Date = jest.fn(() => currentDate) as any;
      global.Date.now = originalDate.now;
      
      // Restore original prototype methods
      Object.setPrototypeOf(global.Date, originalDate);
      
      const id = 'sammlung_123';
      const initialSammlung = {
        id,
        name: 'Alte Sammlung',
        type: SammlungsTyp.FILM,
        erstelltAm: dateBefore,
        aktualisiertAm: dateBefore,
      };

      const updates = {
        id,
        name: 'Neue Sammlung',
      };

      (sammlungDB.update as jest.Mock).mockImplementation((id, updateFn) => {
        // Change current date before calling updateFn
        currentDate = dateAfter;
        const result = updateFn(initialSammlung);
        return Promise.resolve(result);
      });

      const result = await sammlungStorage.update(id, updates);

      expect(result).toEqual({
        ...initialSammlung,
        name: 'Neue Sammlung',
        aktualisiertAm: dateAfter,
      });

      // Cleanup
      global.Date = originalDate;
    });
  });

  describe('searchByName', () => {
    it('sollte case-insensitive suchen', async () => {
      const sammlungen = [
        {
          id: '1',
          name: 'Film Sammlung',
          type: SammlungsTyp.FILM,
          erstelltAm: new Date(),
          aktualisiertAm: new Date(),
        },
        {
          id: '2',
          name: 'Andere Sammlung',
          type: SammlungsTyp.BUCH,
          erstelltAm: new Date(),
          aktualisiertAm: new Date(),
        },
      ];

      (sammlungDB.query as jest.Mock).mockImplementation((predicate) => {
        return Promise.resolve(sammlungen.filter(s => predicate(s)));
      });

      // Suche mit Großbuchstaben, obwohl "film" in kleinbuchstaben gespeichert ist
      const results = await sammlungStorage.searchByName('FILM');

      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('1');
      expect(sammlungDB.query).toHaveBeenCalledTimes(1);
    });

    it('sollte teilweise Übereinstimmungen finden', async () => {
      const sammlungen = [
        {
          id: '1',
          name: 'Film Sammlung',
          type: SammlungsTyp.FILM,
          erstelltAm: new Date(),
          aktualisiertAm: new Date(),
        },
        {
          id: '2',
          name: 'Filmabend Ideen',
          type: SammlungsTyp.NOTIZ,
          erstelltAm: new Date(),
          aktualisiertAm: new Date(),
        },
        {
          id: '3',
          name: 'Bücher',
          type: SammlungsTyp.BUCH,
          erstelltAm: new Date(),
          aktualisiertAm: new Date(),
        },
      ];

      (sammlungDB.query as jest.Mock).mockImplementation((predicate) => {
        return Promise.resolve(sammlungen.filter(s => predicate(s)));
      });

      const results = await sammlungStorage.searchByName('film');

      expect(results).toHaveLength(2);
      expect(results[0].id).toBe('1');
      expect(results[1].id).toBe('2');
    });
  });

  describe('getAll', () => {
    it('sollte Sammlungen nach Erstellungsdatum (neueste zuerst) sortieren', async () => {
      const sammlungen = [
        {
          id: '1',
          name: 'Alte Sammlung',
          type: SammlungsTyp.FILM,
          erstelltAm: new Date(2023, 0, 1),
          aktualisiertAm: new Date(2023, 0, 1),
        },
        {
          id: '2',
          name: 'Neue Sammlung',
          type: SammlungsTyp.BUCH,
          erstelltAm: new Date(2023, 0, 2),
          aktualisiertAm: new Date(2023, 0, 2),
        },
        {
          id: '3',
          name: 'Mittlere Sammlung',
          type: SammlungsTyp.NOTIZ,
          erstelltAm: new Date(2023, 0, 1, 12), // 12 Stunden später als '1'
          aktualisiertAm: new Date(2023, 0, 1, 12),
        },
      ];

      (sammlungDB.getAll as jest.Mock).mockResolvedValueOnce(sammlungen);

      const results = await sammlungStorage.getAll();

      expect(results).toHaveLength(3);
      // Sortierung: neueste zuerst
      expect(results[0].id).toBe('2');
      expect(results[1].id).toBe('3');
      expect(results[2].id).toBe('1');
    });
  });
});
