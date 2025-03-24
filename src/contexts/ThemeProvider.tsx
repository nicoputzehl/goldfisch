import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { PaperProvider } from 'react-native-paper';
import { theme as defaultTheme, navigationTheme } from '@/constants/theme';
import { useColorScheme } from 'react-native';

// Theme context type
type ThemeContextType = {
  theme: typeof defaultTheme;
  navigationTheme: typeof navigationTheme;
  toggleTheme: () => void;
  isDarkMode: boolean;
};

// Create the theme context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  navigationTheme: navigationTheme,
  toggleTheme: () => {},
  isDarkMode: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Get the device's color scheme preference
  const colorScheme = useColorScheme();
  
  // State to track if we're in dark mode
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  
  // For now, we'll just use the light theme
  // In the future, we could implement a dark theme
  const theme = defaultTheme;
  
  // Function to toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Here we would also switch the actual theme when dark mode is implemented
  };
  
  const contextValue: ThemeContextType = {
    theme,
    navigationTheme,
    toggleTheme,
    isDarkMode,
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
}

// Hook for easy access to the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
