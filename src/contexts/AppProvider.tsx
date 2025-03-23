import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definiere den Kontext-Typ
type AppContextType = {
  // Hier kommen später die globalen Zustände und Funktionen hin
};

// Erstelle den Kontext mit einem Default-Wert
const AppContext = createContext<AppContextType>({} as AppContextType);

// Erstelle den Provider
export function AppProvider({ children }: { children: ReactNode }) {
  // Hier kommen später die Zustandsvariablen hin

  // Werte, die im Context bereitgestellt werden
  const contextValue: AppContextType = {
    // Hier kommen später die Zustände und Funktionen hin
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Hook für den einfachen Zugriff auf den Kontext
export function useApp() {
  return useContext(AppContext);
}
