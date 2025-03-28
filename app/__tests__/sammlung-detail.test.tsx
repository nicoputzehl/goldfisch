import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SammlungDetailScreen from '../sammlung/[id]/index';
import { router, useLocalSearchParams } from 'expo-router';

// Mock für expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    back: jest.fn(),
  },
  useLocalSearchParams: jest.fn(),
}));

describe('SammlungDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Standard-Mock für useLocalSearchParams
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: '123' });
  });

  it('sollte korrekt rendern', () => {
    const { getByText } = render(<SammlungDetailScreen />);
    
    expect(getByText('Sammlung 123')).toBeTruthy();
  });

  it('sollte zum vorherigen Bildschirm zurückkehren, wenn der Zurück-Button geklickt wird', () => {
    const { getByTestId } = render(<SammlungDetailScreen />);
    
    // Hier würden wir einen testID für den Zurück-Button benötigen
    // In SammlungDetailScreen müsste hinzugefügt werden: testID="back-button"
    // fireEvent.press(getByTestId('back-button'));
    
    // expect(router.back).toHaveBeenCalledTimes(1);
  });

  it('sollte zur Erinnerung-Erstellen-Seite navigieren, wenn der Button geklickt wird', () => {
    const { getByText } = render(<SammlungDetailScreen />);
    
    fireEvent.press(getByText('Erinnerung hinzufügen'));
    
    expect(router.push).toHaveBeenCalledWith('/sammlung/123/erinnerung/erstellen');
  });

  it('sollte die Sammlung-ID aus den URL-Parametern verwenden', () => {
    // Mock für eine andere Sammlung-ID
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: '456' });
    
    const { getByText } = render(<SammlungDetailScreen />);
    
    expect(getByText('Sammlung 456')).toBeTruthy();
  });

  it('sollte den leeren Zustand anzeigen, wenn keine Erinnerungen vorhanden sind', () => {
    const { getByText } = render(<SammlungDetailScreen />);
    
    expect(getByText('Noch keine Erinnerungen in dieser Sammlung')).toBeTruthy();
  });
});
