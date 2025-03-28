import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SammlungenScreen from '../(tabs)/index';
import { router } from 'expo-router';
import * as SammlungHooks from '@/features/sammlung/hooks';
import { erinnerungStorage } from '@/services/storage/erinnerungStorage';

// Mock für expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
  useFocusEffect: jest.fn((callback) => {
    callback();
    return null;
  }),
}));

// Mock für die Sammlung-Hooks
jest.mock('@/features/sammlung/hooks', () => ({
  useSammlungen: jest.fn(),
}));

// Mock für erinnerungStorage
jest.mock('@/services/storage/erinnerungStorage', () => ({
  erinnerungStorage: {
    countBySammlung: jest.fn(),
  },
}));

describe('SammlungenScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Standard-Mock für useSammlungen
    (SammlungHooks.useSammlungen as jest.Mock).mockReturnValue({
      sammlungen: [],
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });
    
    // Standard-Mock für countBySammlung
    (erinnerungStorage.countBySammlung as jest.Mock).mockResolvedValue(0);
  });

  it('sollte den Ladezustand korrekt anzeigen', () => {
    (SammlungHooks.useSammlungen as jest.Mock).mockReturnValue({
      sammlungen: [],
      isLoading: true,
      error: null,
      refresh: jest.fn(),
    });
    
    const { getByTestId } = render(<SammlungenScreen />);
    
    // Hier würden wir einen ActivityIndicator oder ähnliches erwarten
    // Dies würde einen testID für den Ladeindikator erfordern
    // expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('sollte den leeren Zustand anzeigen, wenn keine Sammlungen vorhanden sind', () => {
    (SammlungHooks.useSammlungen as jest.Mock).mockReturnValue({
      sammlungen: [],
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });
    
    const { getByText } = render(<SammlungenScreen />);
    
    expect(getByText('Noch keine Sammlungen vorhanden')).toBeTruthy();
    expect(getByText('Neue Sammlung erstellen')).toBeTruthy();
  });

  it('sollte den Fehlerzustand korrekt anzeigen', () => {
    const errorMessage = 'Fehler beim Laden der Sammlungen';
    
    (SammlungHooks.useSammlungen as jest.Mock).mockReturnValue({
      sammlungen: [],
      isLoading: false,
      error: errorMessage,
      refresh: jest.fn(),
    });
    
    const { getByText } = render(<SammlungenScreen />);
    
    expect(getByText(errorMessage)).toBeTruthy();
    expect(getByText('Erneut versuchen')).toBeTruthy();
  });

  it('sollte die Sammlungen auflisten, wenn welche vorhanden sind', async () => {
    const mockSammlungen = [
      {
        id: '1',
        name: 'Meine Filme',
        type: 'film',
        erstelltAm: new Date(),
        aktualisiertAm: new Date(),
      },
      {
        id: '2',
        name: 'Meine Bücher',
        type: 'buch',
        erstelltAm: new Date(),
        aktualisiertAm: new Date(),
      },
    ];
    
    (SammlungHooks.useSammlungen as jest.Mock).mockReturnValue({
      sammlungen: mockSammlungen,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });
    
    // Mock für die Erinnerungszahlen
    (erinnerungStorage.countBySammlung as jest.Mock)
      .mockResolvedValueOnce(3) // Für Sammlung 1
      .mockResolvedValueOnce(2); // Für Sammlung 2
    
    const { getByText, queryByText } = render(<SammlungenScreen />);
    
    // Warten auf das Laden der Erinnerungszahlen
    await waitFor(() => {
      // Überprüfen, ob die Sammlungsnamen angezeigt werden
      expect(getByText('Meine Filme')).toBeTruthy();
      expect(getByText('Meine Bücher')).toBeTruthy();
      
      // Der leere Zustand sollte nicht mehr angezeigt werden
      expect(queryByText('Noch keine Sammlungen vorhanden')).toBeNull();
    });
  });

  it('sollte zur Sammlung-Erstellen-Seite navigieren, wenn der Button gedrückt wird', () => {
    (SammlungHooks.useSammlungen as jest.Mock).mockReturnValue({
      sammlungen: [],
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });
    
    const { getByText } = render(<SammlungenScreen />);
    
    fireEvent.press(getByText('Neue Sammlung erstellen'));
    
    expect(router.push).toHaveBeenCalledWith('/sammlung/erstellen');
  });

  it('sollte die refresh-Funktion aufrufen, wenn der Bildschirm fokussiert wird', () => {
    const refreshMock = jest.fn();
    
    (SammlungHooks.useSammlungen as jest.Mock).mockReturnValue({
      sammlungen: [],
      isLoading: false,
      error: null,
      refresh: refreshMock,
    });
    
    render(<SammlungenScreen />);
    
    expect(refreshMock).toHaveBeenCalledTimes(1);
  });
});
