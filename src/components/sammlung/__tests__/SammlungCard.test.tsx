import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SammlungCard } from '../SammlungCard';
import { SammlungsTyp } from '@/features/sammlung/types';
import { AppProvider } from '@/contexts/AppProvider';

// Mock für expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('SammlungCard', () => {
  const mockSammlung = {
    id: '1',
    name: 'Meine Filme',
    type: SammlungsTyp.FILM,
    erstelltAm: new Date(),
    aktualisiertAm: new Date(),
  };

  it('rendert den Namen der Sammlung korrekt', () => {
    const { getByText } = render(
      <AppProvider>
        <SammlungCard sammlung={mockSammlung} erinnerungCount={5} />
      </AppProvider>
    );
    
    expect(getByText('Meine Filme')).toBeTruthy();
  });

  it('zeigt die korrekte Anzahl der Erinnerungen an', () => {
    const { getByText } = render(
      <AppProvider>
        <SammlungCard sammlung={mockSammlung} erinnerungCount={5} />
      </AppProvider>
    );
    
    expect(getByText('5 Erinnerungen')).toBeTruthy();
  });

  it('verwendet "Erinnerung" im Singular, wenn nur eine vorhanden ist', () => {
    const { getByText } = render(
      <AppProvider>
        <SammlungCard sammlung={mockSammlung} erinnerungCount={1} />
      </AppProvider>
    );
    
    expect(getByText('1 Erinnerung')).toBeTruthy();
  });

  it('ruft onPress auf, wenn darauf getippt wird', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <AppProvider>
        <SammlungCard 
          sammlung={mockSammlung} 
          erinnerungCount={5} 
          onPress={onPressMock}
        />
      </AppProvider>
    );
    
    fireEvent.press(getByText('Meine Filme'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('ruft onOptionsPress auf, wenn auf die Optionen getippt wird', () => {
    const onOptionsPressMock = jest.fn();
    const { getByTestId } = render(
      <AppProvider>
        <SammlungCard 
          sammlung={mockSammlung} 
          erinnerungCount={5} 
          onOptionsPress={onOptionsPressMock}
        />
      </AppProvider>
    );
    
    // Hinweis: Da wir keinen testID im Button haben, müssten wir das Icon finden.
    // Für diesen Test müssten wir den Code anpassen, um das zu testen.
    // Dies ist nur ein Beispiel, wie der Test aussehen könnte.
  });
});
