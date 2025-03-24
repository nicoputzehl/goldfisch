import { type TextStyle, StyleSheet } from 'react-native';
import { theme, FONT_SIZES } from '@/constants/theme';

// Generate consistent text styles
export const createTextStyle = (
  size: number,
  weight: TextStyle['fontWeight'] = 'normal',
  color = theme.colors.text,
  lineHeight?: number
): TextStyle => ({
  fontSize: size,
  fontWeight: weight,
  color,
  lineHeight: lineHeight || Math.round(size * 1.4),
});

// Typography styles for the app
export const Typography = StyleSheet.create({
  // Headings
  h1: createTextStyle(FONT_SIZES.xxxl, 'bold', theme.colors.text, 40),
  h2: createTextStyle(FONT_SIZES.xxl, 'bold', theme.colors.text, 32),
  h3: createTextStyle(FONT_SIZES.xl, 'bold', theme.colors.text, 28),
  h4: createTextStyle(FONT_SIZES.lg, 'bold', theme.colors.text, 24),
  h5: createTextStyle(FONT_SIZES.md, 'bold', theme.colors.text, 22),
  
  // Body text
  bodyLarge: createTextStyle(FONT_SIZES.md, 'normal', theme.colors.text),
  body: createTextStyle(FONT_SIZES.sm, 'normal', theme.colors.text),
  bodySmall: createTextStyle(FONT_SIZES.xs, 'normal', theme.colors.text),
  
  // Special styles
  caption: createTextStyle(FONT_SIZES.xs, 'normal', theme.colors.textLight),
  button: createTextStyle(FONT_SIZES.sm, '500', theme.colors.primary),
  label: createTextStyle(FONT_SIZES.sm, '500', theme.colors.text),
  
  // Weight variations
  bold: { fontWeight: 'bold' } as TextStyle,
  semiBold: { fontWeight: '600' } as TextStyle,
  medium: { fontWeight: '500' } as TextStyle,
  regular: { fontWeight: 'normal' } as TextStyle,
  light: { fontWeight: '300' } as TextStyle,
  
  // Color variations
  primary: { color: theme.colors.primary } as TextStyle,
  secondary: { color: theme.colors.secondary } as TextStyle,
  accent: { color: theme.colors.accent } as TextStyle,
  error: { color: theme.colors.error } as TextStyle,
  success: { color: theme.colors.success } as TextStyle,
  warning: { color: theme.colors.warning } as TextStyle,
  info: { color: theme.colors.info } as TextStyle,
  muted: { color: theme.colors.textLight } as TextStyle,
  
  // Text alignment
  center: { textAlign: 'center' } as TextStyle,
  right: { textAlign: 'right' } as TextStyle,
  left: { textAlign: 'left' } as TextStyle,
  
  // Text decorations
  underline: { textDecorationLine: 'underline' } as TextStyle,
  lineThrough: { textDecorationLine: 'line-through' } as TextStyle,
});

export default Typography;
