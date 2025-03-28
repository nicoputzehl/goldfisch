import { renderHook, act } from '@testing-library/react-native';
import { useCreateSammlung } from '../useCreateSammlung';
import { sammlungStorage } from '@/services/storage/sammlungStorage';
import { type SammlungTypen, SammlungsTyp } from '@/features/sammlung/types';

// Mock für sammlungStorage
jest.mock('@/services/storage/sammlungStorage', () => ({
  sammlungStorage: {
    create: jest.fn(),
  },
}));

describe('useCreateSammlung', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sollte Anfangszustand korrekt setzen', () => {
    const { result } = renderHook(() => useCreateSammlung());
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.createSammlung).toBe('function');
  });

  it('sollte eine Sammlung erffolgreich erstellen', async () => {
    const mockSammlung: SammlungTypen = {
      id: 'test_id',
      name: 'Test Sammlung',
      type: SammlungsTyp.FILM,
      erstelltAm: new Date(),
      aktualisiertAm: new Date(),
    };
    
    (sammlungStorage.create as jest.Mock).mockResolvedValueOnce(mockSammlung);
    
    const { result } = renderHook(() => useCreateSammlung());
    
    let returnValue: SammlungTypen | null = null;
    await act(async () => {
      returnValue = await result.current.createSammlung({
        name: 'Test Sammlung',
        type: SammlungsTyp.FILM,
      });
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(returnValue).toEqual(mockSammlung);
    expect(sammlungStorage.create).toHaveBeenCalledWith({
      name: 'Test Sammlung',
      type: SammlungsTyp.FILM,
    });
  });

  it('sollte einen Fehler setzen, wenn die Erstellung fehlschlägt', async () => {
    const errorMessage = 'Test Fehler';
    const error = new Error(errorMessage);
    
    (sammlungStorage.create as jest.Mock).mockRejectedValueOnce(error);
    
    const { result } = renderHook(() => useCreateSammlung());
    
    let returnValue: SammlungTypen | null = null;
    await act(async () => {
      returnValue = await result.current.createSammlung({
        name: 'Test Sammlung',
        type: SammlungsTyp.FILM,
      });
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(returnValue).toBeNull();
  });

  it('sollte isLoading während der Erstellung auf true setzen', async () => {
    // Wir verzögern die Auflösung des Promises, um isLoading zu prüfen
    (sammlungStorage.create as jest.Mock).mockImplementationOnce(() => {
      return new Promise<SammlungTypen>((resolve) => {
        setTimeout(() => {
          resolve({
            id: 'test_id',
            name: 'Test Sammlung',
            type: SammlungsTyp.FILM,
            erstelltAm: new Date(),
            aktualisiertAm: new Date(),
          });
        }, 100);
      });
    });
    
    const { result } = renderHook(() => useCreateSammlung());
    
    let promise: Promise<SammlungTypen | null>;
    act(() => {
      promise = result.current.createSammlung({
        name: 'Test Sammlung',
        type: SammlungsTyp.FILM,
      });
    });
    
    // isLoading sollte während der Erstellung true sein
    expect(result.current.isLoading).toBe(true);
    
    // Warten auf Abschluss
    await act(async () => {
      await promise;
    });
    
    // isLoading sollte nach Abschluss false sein
    expect(result.current.isLoading).toBe(false);
  });
});
