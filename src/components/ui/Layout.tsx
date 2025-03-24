import type React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { SPACING } from '@/constants/theme';

type ContainerProps = {
  children: React.ReactNode;
  style?: object;
  padding?: boolean;
  center?: boolean;
  testID?: string;
};

export function Container({ children, style, padding = true, center = false, testID }: ContainerProps) {
  return (
    <View 
      style={[
        styles.container, 
        padding && styles.padding, 
        center && styles.center, 
        style
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
}

type ScrollContainerProps = {
  children: React.ReactNode;
  style?: object;
  contentContainerStyle?: object;
  padding?: boolean;
  testID?: string;
  keyboardAware?: boolean;
  refreshControl?: React.ReactElement;
};

export function ScrollContainer({ 
  children, 
  style, 
  contentContainerStyle, 
  padding = true, 
  testID,
  keyboardAware = false,
  refreshControl
}: ScrollContainerProps) {
  const content = (
    <ScrollView
      style={[styles.scrollContainer, style]}
      contentContainerStyle={[
        padding && styles.padding,
        contentContainerStyle
      ]}
      testID={testID}
      keyboardShouldPersistTaps="handled"
      refreshControl={refreshControl}
    >
      {children}
    </ScrollView>
  );

  if (keyboardAware) {
    return (
      <KeyboardAvoidingView 
        style={styles.flex} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
}

type RowProps = {
  children: React.ReactNode;
  style?: object;
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  wrap?: boolean;
  testID?: string;
};

export function Row({ 
  children, 
  style, 
  justify = 'flex-start', 
  align = 'center', 
  wrap = false,
  testID 
}: RowProps) {
  return (
    <View 
      style={[
        styles.row, 
        { justifyContent: justify, alignItems: align, flexWrap: wrap ? 'wrap' : 'nowrap' }, 
        style
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
}

type SpacerProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  horizontal?: boolean;
};

export function Spacer({ size = 'md', horizontal = false }: SpacerProps) {
  const sizeMap = {
    xs: SPACING.xs,
    sm: SPACING.sm,
    md: SPACING.md,
    lg: SPACING.lg,
    xl: SPACING.xl,
    xxl: SPACING.xxl,
  };

  return (
    <View 
      style={[
        horizontal 
          ? { width: sizeMap[size] } 
          : { height: sizeMap[size] }
      ]} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  padding: {
    padding: SPACING.md,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  }
});