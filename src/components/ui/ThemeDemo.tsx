import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { SPACING, FONT_SIZES, SHADOWS, BORDER_RADIUS, theme } from '@/constants/theme';

// Since COLOR_PALETTE is not exported directly, we'll use the colors from the theme
const colors = theme.colors;

// A component to demonstrate all theme elements
export function ThemeDemo() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Color Palette</Text>
      
      <View style={styles.colorSection}>
        <Text style={styles.subSectionTitle}>Primary Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.primary }]}>
            <Text style={styles.colorLabel}>Primary</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.primaryLight }]}>
            <Text style={styles.colorLabel}>Primary Light</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.primaryDark }]}>
            <Text style={styles.colorLabel}>Primary Dark</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.colorSection}>
        <Text style={styles.subSectionTitle}>Secondary Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.secondary }]}>
            <Text style={styles.colorLabel}>Secondary</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.secondaryLight }]}>
            <Text style={styles.colorLabel}>Secondary Light</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.secondaryDark }]}>
            <Text style={styles.colorLabel}>Secondary Dark</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.colorSection}>
        <Text style={styles.subSectionTitle}>Accent Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.accent }]}>
            <Text style={styles.colorLabel}>Accent</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.accentLight }]}>
            <Text style={styles.colorLabel}>Accent Light</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.accentDark }]}>
            <Text style={styles.colorLabel}>Accent Dark</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.colorSection}>
        <Text style={styles.subSectionTitle}>Utility Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.success }]}>
            <Text style={styles.colorLabel}>Success</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.warning }]}>
            <Text style={styles.colorLabel}>Warning</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.error }]}>
            <Text style={styles.colorLabel}>Error</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.info }]}>
            <Text style={styles.colorLabel}>Info</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Typography</Text>
      
      <Card title="Font Sizes">
        <View style={styles.typographyDemo}>
          <Text style={{ fontSize: FONT_SIZES.xxxl }}>XXXL (32px)</Text>
          <Text style={{ fontSize: FONT_SIZES.xxl }}>XXL (24px)</Text>
          <Text style={{ fontSize: FONT_SIZES.xl }}>XL (20px)</Text>
          <Text style={{ fontSize: FONT_SIZES.lg }}>LG (18px)</Text>
          <Text style={{ fontSize: FONT_SIZES.md }}>MD (16px)</Text>
          <Text style={{ fontSize: FONT_SIZES.sm }}>SM (14px)</Text>
          <Text style={{ fontSize: FONT_SIZES.xs }}>XS (12px)</Text>
        </View>
      </Card>
      
      <Text style={styles.sectionTitle}>Spacing</Text>
      
      <View style={styles.spacingDemo}>
        <View style={[styles.spacingBlock, { width: SPACING.xxl, height: SPACING.xxl }]}>
          <Text style={styles.spacingLabel}>XXL</Text>
        </View>
        <View style={[styles.spacingBlock, { width: SPACING.xl, height: SPACING.xl }]}>
          <Text style={styles.spacingLabel}>XL</Text>
        </View>
        <View style={[styles.spacingBlock, { width: SPACING.lg, height: SPACING.lg }]}>
          <Text style={styles.spacingLabel}>LG</Text>
        </View>
        <View style={[styles.spacingBlock, { width: SPACING.md, height: SPACING.md }]}>
          <Text style={styles.spacingLabel}>MD</Text>
        </View>
        <View style={[styles.spacingBlock, { width: SPACING.sm, height: SPACING.sm }]}>
          <Text style={styles.spacingLabel}>SM</Text>
        </View>
        <View style={[styles.spacingBlock, { width: SPACING.xs, height: SPACING.xs }]}>
          <Text style={styles.spacingLabel}>XS</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Border Radius</Text>
      
      <View style={styles.borderRadiusDemo}>
        <View style={[styles.borderRadiusBlock, { borderRadius: BORDER_RADIUS.xs }]}>
          <Text style={styles.borderRadiusLabel}>XS</Text>
        </View>
        <View style={[styles.borderRadiusBlock, { borderRadius: BORDER_RADIUS.sm }]}>
          <Text style={styles.borderRadiusLabel}>SM</Text>
        </View>
        <View style={[styles.borderRadiusBlock, { borderRadius: BORDER_RADIUS.md }]}>
          <Text style={styles.borderRadiusLabel}>MD</Text>
        </View>
        <View style={[styles.borderRadiusBlock, { borderRadius: BORDER_RADIUS.lg }]}>
          <Text style={styles.borderRadiusLabel}>LG</Text>
        </View>
        <View style={[styles.borderRadiusBlock, { borderRadius: BORDER_RADIUS.xl }]}>
          <Text style={styles.borderRadiusLabel}>XL</Text>
        </View>
        <View style={[styles.borderRadiusBlock, { borderRadius: BORDER_RADIUS.round }]}>
          <Text style={styles.borderRadiusLabel}>Round</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Shadows</Text>
      
      <View style={styles.shadowDemo}>
        <View style={[styles.shadowBox, SHADOWS.xs]}>
          <Text style={styles.shadowLabel}>XS Shadow</Text>
        </View>
        <View style={[styles.shadowBox, SHADOWS.small]}>
          <Text style={styles.shadowLabel}>Small Shadow</Text>
        </View>
        <View style={[styles.shadowBox, SHADOWS.medium]}>
          <Text style={styles.shadowLabel}>Medium Shadow</Text>
        </View>
        <View style={[styles.shadowBox, SHADOWS.large]}>
          <Text style={styles.shadowLabel}>Large Shadow</Text>
        </View>
        <View style={[styles.shadowBox, SHADOWS.xl]}>
          <Text style={styles.shadowLabel}>XL Shadow</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  subSectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    marginBottom: SPACING.sm,
  },
  
  // Color demo styles
  colorSection: {
    marginBottom: SPACING.md,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.sm,
  },
  colorSwatch: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    ...SHADOWS.small,
  },
  colorLabel: {
    color: '#fff',
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  // Typography demo styles
  typographyDemo: {
    marginVertical: SPACING.md,
  },
  
  // Spacing demo styles
  spacingDemo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    marginBottom: SPACING.lg,
  },
  spacingBlock: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  spacingLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  
  // Border radius demo styles
  borderRadiusDemo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.lg,
  },
  borderRadiusBlock: {
    width: 80,
    height: 80,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  borderRadiusLabel: {
    color: '#fff',
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
  },
  
  // Shadow demo styles
  shadowDemo: {
    marginBottom: SPACING.xl,
  },
  shadowBox: {
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  shadowLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
  },
});

export default ThemeDemo;
