import { StyleSheet } from 'react-native';
import { SPACING } from '@/constants/theme';

// Layout styles for the app
export const Layout = StyleSheet.create({
  // Flex configurations
  flex1: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  
  // Flex directions
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  column: {
    flexDirection: 'column',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  
  // Justify content
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
  
  // Align items
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStretch: {
    alignItems: 'stretch',
  },
  alignBaseline: {
    alignItems: 'baseline',
  },
  
  // Combinations
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Wrapping
  wrap: {
    flexWrap: 'wrap',
  },
  noWrap: {
    flexWrap: 'nowrap',
  },
  
  // Position
  relative: {
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
  },
  
  // Fill dimensions
  fillHeight: {
    height: '100%',
  },
  fillWidth: {
    width: '100%',
  },
  fill: {
    height: '100%',
    width: '100%',
  },
  
  // Common spacing patterns
  padding: {
    padding: SPACING.md,
  },
  paddingHorizontal: {
    paddingHorizontal: SPACING.md,
  },
  paddingVertical: {
    paddingVertical: SPACING.md,
  },
  margin: {
    margin: SPACING.md,
  },
  marginHorizontal: {
    marginHorizontal: SPACING.md,
  },
  marginVertical: {
    marginVertical: SPACING.md,
  },
  
  // Gap utilities
  gapXs: {
    gap: SPACING.xs,
  },
  gapSm: {
    gap: SPACING.sm,
  },
  gapMd: {
    gap: SPACING.md,
  },
  gapLg: {
    gap: SPACING.lg,
  },
  gapXl: {
    gap: SPACING.xl,
  },
  
  // Specific spacing shortcuts (example)
  mb1: { marginBottom: SPACING.xs },
  mb2: { marginBottom: SPACING.sm },
  mb3: { marginBottom: SPACING.md },
  mb4: { marginBottom: SPACING.lg },
  mb5: { marginBottom: SPACING.xl },
  
  mt1: { marginTop: SPACING.xs },
  mt2: { marginTop: SPACING.sm },
  mt3: { marginTop: SPACING.md },
  mt4: { marginTop: SPACING.lg },
  mt5: { marginTop: SPACING.xl },
  
  // Container styles
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  contentContainer: {
    flexGrow: 1,
    padding: SPACING.md,
  },
  safeArea: {
    flex: 1,
  },
});

export default Layout;
