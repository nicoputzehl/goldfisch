import { MD3LightTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  fontFamily: 'System',
};

// Definiere unser Theme basierend auf dem Material Design 3 Theme
export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498db', // Blau
    primaryContainer: '#e1f5fe',
    secondary: '#2ecc71', // Grün
    secondaryContainer: '#e8f5e9',
    accent: '#f1c40f', // Gelb
    background: '#ffffff',
    surface: '#ffffff',
    error: '#e74c3c',
    text: '#2c3e50',
    onSurface: '#2c3e50',
    disabled: '#bdc3c7',
    placeholder: '#95a5a6',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#e74c3c',
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: 8,
};

// Spezifische Themenkonstanten für unsere App
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
};

// Schatten-Styles
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
};
