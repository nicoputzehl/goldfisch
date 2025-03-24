import { MD3LightTheme, configureFonts } from 'react-native-paper';
import { DefaultTheme } from '@react-navigation/native';

// Font configuration with weighted variants
const fontConfig = {
  displaySmall: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 44,
    fontSize: 36,
  },
  displayMedium: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 52,
    fontSize: 45,
  },
  displayLarge: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 64,
    fontSize: 57,
  },
  headlineSmall: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 32,
    fontSize: 24,
  },
  headlineMedium: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 36,
    fontSize: 28,
  },
  headlineLarge: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 40,
    fontSize: 32,
  },
  titleSmall: {
    fontFamily: 'System',
    fontWeight: '500' as const,
    letterSpacing: 0,
    lineHeight: 20,
    fontSize: 14,
  },
  titleMedium: {
    fontFamily: 'System',
    fontWeight: '500' as const,
    letterSpacing: 0.15,
    lineHeight: 24,
    fontSize: 16,
  },
  titleLarge: {
    fontFamily: 'System',
    fontWeight: '500' as const,
    letterSpacing: 0,
    lineHeight: 28,
    fontSize: 22,
  },
  labelSmall: {
    fontFamily: 'System',
    fontWeight: '500' as const,
    letterSpacing: 0.5,
    lineHeight: 16,
    fontSize: 11,
  },
  labelMedium: {
    fontFamily: 'System',
    fontWeight: '500' as const,
    letterSpacing: 0.5,
    lineHeight: 16,
    fontSize: 12,
  },
  labelLarge: {
    fontFamily: 'System',
    fontWeight: '500' as const,
    letterSpacing: 0.1,
    lineHeight: 20,
    fontSize: 14,
  },
  bodySmall: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    letterSpacing: 0.4,
    lineHeight: 16,
    fontSize: 12,
  },
  bodyMedium: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    letterSpacing: 0.25,
    lineHeight: 20,
    fontSize: 14,
  },
  bodyLarge: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    letterSpacing: 0.15,
    lineHeight: 24,
    fontSize: 16,
  },
};

// Defining main color palette
const COLOR_PALETTE = {
  // Primary colors
  primary: '#3498db', // Main blue
  primaryLight: '#5dade2',
  primaryDark: '#2980b9',
  primaryContainer: '#e1f5fe',
  onPrimaryContainer: '#0277bd',
  
  // Secondary colors
  secondary: '#2ecc71', // Main green
  secondaryLight: '#58d68d',
  secondaryDark: '#27ae60',
  secondaryContainer: '#e8f5e9',
  onSecondaryContainer: '#1b5e20',
  
  // Accent colors
  accent: '#f1c40f', // Main yellow
  accentLight: '#f4d03f',
  accentDark: '#d4ac0d',
  accentContainer: '#fff8e1',
  onAccentContainer: '#ff6f00',
  
  // Background colors
  background: '#ffffff',
  surface: '#ffffff',
  surfaceVariant: '#f5f5f5',
  
  // Text colors
  text: '#2c3e50',
  textLight: '#7f8c8d',
  textDark: '#1a252f',
  onSurface: '#2c3e50',
  
  // Utility colors
  error: '#e74c3c',
  errorLight: '#ec7063',
  errorDark: '#c0392b',
  errorContainer: '#ffebee',
  onErrorContainer: '#b71c1c',
  
  disabled: '#bdc3c7',
  placeholder: '#95a5a6',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  notification: '#e74c3c',
  
  // New colors for different states
  success: '#27ae60',
  successLight: '#2ecc71',
  successDark: '#219653',
  
  warning: '#f39c12',
  warningLight: '#f1c40f',
  warningDark: '#d35400',
  
  info: '#3498db',
  infoLight: '#2980b9',
  infoDark: '#0097a7',
};

// Define our theme based on the Material Design 3 Theme
export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...COLOR_PALETTE,
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: 8,
  animation: {
    scale: 1.0,
  },
};

// Navigation theme (for React Navigation)
export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLOR_PALETTE.primary,
    background: COLOR_PALETTE.background,
    card: COLOR_PALETTE.background,
    text: COLOR_PALETTE.text,
    border: COLOR_PALETTE.disabled,
    notification: COLOR_PALETTE.notification,
  },
};

// Specific theme constants for our app
export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Border radius constants
export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999, // For fully rounded elements
};

// Shadow styles
export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 13.16,
    elevation: 12,
  },
};

// Animation timing constants
export const ANIMATION = {
  short: 200,
  medium: 300,
  long: 500,
};

// Z-index constants for layering
export const Z_INDEX = {
  base: 0,
  card: 10,
  modal: 100,
  toast: 1000,
  tooltip: 2000,
};

// Export the theme and constants
export default {
  theme,
  navigationTheme,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
  SHADOWS,
  ANIMATION,
  Z_INDEX,
  COLOR_PALETTE,
};
