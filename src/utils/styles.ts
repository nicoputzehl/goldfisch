import { StyleSheet } from 'react-native';
import { SHADOWS, SPACING, BORDER_RADIUS, theme } from '@/constants/theme';
import Typography from './typography';
import Layout from './layout';

// Common styles for the app
export const CommonStyles = StyleSheet.create({
  // Card styles
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  cardElevated: {
    backgroundColor: theme.colors.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.medium,
  },
  
  // Input styles
  input: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.disabled,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  inputFocused: {
    borderColor: theme.colors.primary,
    ...SHADOWS.xs,
  },
  
  // Button styles
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  
  // Pills/Tags
  tag: {
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: BORDER_RADIUS.round,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  tagText: {
    color: theme.colors.onPrimaryContainer,
    fontSize: 12,
  },
  
  // Separators
  divider: {
    height: 1,
    backgroundColor: theme.colors.disabled,
    marginVertical: SPACING.md,
  },
  
  // Containers with common spacing patterns
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  
  // Utility styles for quick adjustments
  roundedFull: {
    borderRadius: BORDER_RADIUS.round,
  },
  shadow: SHADOWS.small,
  shadowMedium: SHADOWS.medium,
  shadowLarge: SHADOWS.large,
  
  // State styles
  error: {
    borderColor: theme.colors.error,
  },
  success: {
    borderColor: theme.colors.success,
  },
  disabled: {
    opacity: 0.6,
  },
});

// Combine all styles into a single export
export default {
  ...CommonStyles,
  ...Layout,
  ...Typography,
};
