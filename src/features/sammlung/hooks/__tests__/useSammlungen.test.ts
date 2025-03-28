import { renderHook, act } from '@testing-library/react-native';
import { useSammlungen } from '../useSammlungen';
import { sammlungStorage } from '@/services/storage/sammlungStorage';
import { SammlungsTyp } from '@/features/sammlung/types';

// Mock für sammlungStorage
jest.mock('@/services/storage/sammlungStorage', () => ({
  sammlungStorage: {
    getAll: jest.fn(),
  },
}));

describe('useSammlungen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sollte Sammlungen laden und korrekt zurückgeben', async () => {
    const mockSammlungen = [
      {
        id: '1',
        name: 'Test Sammlung 1',
        type: SammlungsTyp.FILM,
        erstelltAm: new Date(),
        aktualisiertAm: new Date(),
      },
      {
        id: '2',
        name: 'Test Sammlung 2',
        type: SammlungsTyp.BUCH,
        erstelltAm: new Date(),
        aktualisiertAm: new Date(),
      },
    ];

    (sammlungStorage.getAll as jest.Mock).mockResolvedValueOnce(mockSammlungen);

    const { result } = renderHook(() => useSammlungen());

    // Initial sollte isLoading true sein und sammlungen leer
    expect(result.current.isLoading).toBe(true);
    expect(result.current.sammlungen).toEqual([]);
    expect(result.current.error).toBeNull();

    // Warten auf das Laden der Daten - statt waitForNextUpdate verwenden wir act mit einem flushPromises
    await act(async () => {
      // Warten auf alle Promises
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Nach dem Laden sollten die Sammlungen verfügbar sein
    expect(result.current.isLoading).toBe(false);
    expect(result.current.sammlungen).toEqual(mockSammlungen);
    expect(result.current.error).toBeNull();
    expect(sammlungStorage.getAll).toHaveBeenCalledTimes(1);
  });

  it('sollte einen Fehler setzen, wenn das Laden fehlschlägt', async () => {
    const errorMessage = 'Fehler beim Laden der Sammlungen';
    const error = new Error(errorMessage);

    (sammlungStorage.getAll as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useSammlungen());

    // Warten auf den Fehler
    await act(async () => {
      // Warten auf alle Promises
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.sammlungen).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  it('sollte die Sammlungen neu laden können', async () => {
    const initialSammlungen = [
      {
        id: '1',
        name: 'Test Sammlung 1',
        type: SammlungsTyp.FILM,
        erstelltAm: new Date(),
        aktualisiertAm: new Date(),
      },
    ];

    const updatedSammlungen = [
      ...initialSammlungen,
      {
        id: '2',
        name: 'Test Sammlung 2',
        type: SammlungsTyp.BUCH,
        erstelltAm: new Date(),
        aktualisiertAm: new Date(),
      },
    ];

    // Erstes Laden
    (sammlungStorage.getAll as jest.Mock).mockResolvedValueOnce(initialSammlungen);

    const { result } = renderHook(() => useSammlungen());

    // Warten auf das initiale Laden
    await act(async () => {
      // Warten auf alle Promises
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.sammlungen).toEqual(initialSammlungen);

    // Mock für das Neuladen aktualisieren
    (sammlungStorage.getAll as jest.Mock).mockResolvedValueOnce(updatedSammlungen);

    // refresh-Funktion aufrufen
    act(() => {
      result.current.refresh();
    });

    // isLoading sollte während des Neuladens true sein
    expect(result.current.isLoading).toBe(true);

    // Warten auf das Neuladen
    await act(async () => {
      // Warten auf alle Promises
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Nach dem Neuladen
    expect(result.current.isLoading).toBe(false);
    expect(result.current.sammlungen).toEqual(updatedSammlungen);
    expect(sammlungStorage.getAll).toHaveBeenCalledTimes(2);
  });
});
