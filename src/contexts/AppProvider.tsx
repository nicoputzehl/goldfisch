import type React from 'react';
import { createContext, useState, useContext, type ReactNode, useEffect } from 'react'
import { type SammlungTypen, SammlungsTyp } from '@/features/sammlung/types';
import type { ErinnerungTypen } from '@/features/erinnerung/types';
import { ThemeProvider } from './ThemeProvider';

// Definiere den Kontext-Typ
type AppContextType = {
  // Sammlungs-bezogene Zustände und Funktionen
  sammlungen: SammlungTypen[];
  setSammlungen: React.Dispatch<React.SetStateAction<SammlungTypen[]>>;
  selectedSammlung: SammlungTypen | null;
  setSelectedSammlung: React.Dispatch<React.SetStateAction<SammlungTypen | null>>;
  
  // Erinnerungs-bezogene Zustände und Funktionen
  erinnerungen: Record<string, ErinnerungTypen[]>;
  setErinnerungen: React.Dispatch<React.SetStateAction<Record<string, ErinnerungTypen[]>>>;
  
  // Such-bezogene Zustände und Funktionen
  suchQuery: string;
  setSuchQuery: React.Dispatch<React.SetStateAction<string>>;
  
  // Allgemeine App-Funktionen
  isInitialized: boolean;
};

// Erstelle den Kontext mit einem Default-Wert
const AppContext = createContext<AppContextType>({} as AppContextType);

// Erstelle den Provider
export function AppProvider({ children }: { children: ReactNode }) {
  // Sammlungs-Zustände
  const [sammlungen, setSammlungen] = useState<SammlungTypen[]>([]);
  const [selectedSammlung, setSelectedSammlung] = useState<SammlungTypen | null>(null);
  
  // Erinnerungs-Zustände
  const [erinnerungen, setErinnerungen] = useState<Record<string, ErinnerungTypen[]>>({});
  
  // Such-Zustände
  const [suchQuery, setSuchQuery] = useState<string>('');
  
  // App-Zustand
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  
  // Initialisiere die App
  useEffect(() => {
    // Hier würde später der Code zum Laden der Daten aus der Datenbank stehen
    
    // Mock-Daten für die Entwicklung
    const mockSammlungen: SammlungTypen[] = [
      {
        id: '1',
        name: 'Meine Filme',
        type: SammlungsTyp.FILM,
        erstelltAm: new Date(),
        aktualisiertAm: new Date(),
        plattform: 'Netflix'
      },
      {
        id: '2',
        name: 'Restaurants in Berlin',
        type: SammlungsTyp.LOKAL,
        erstelltAm: new Date(),
        aktualisiertAm: new Date(),
        kategorie: 'Restaurant'
      }
    ];
    
    setSammlungen(mockSammlungen);
    setIsInitialized(true);
  }, []);
  
  // Werte, die im Context bereitgestellt werden
  const contextValue: AppContextType = {
    sammlungen,
    setSammlungen,
    selectedSammlung,
    setSelectedSammlung,
    erinnerungen,
    setErinnerungen,
    suchQuery,
    setSuchQuery,
    isInitialized
  };

  return (
    <ThemeProvider>
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
    </ThemeProvider>
  );
}

// Hook für den einfachen Zugriff auf den Kontext
export function useApp() {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
}
