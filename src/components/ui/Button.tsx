import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { SPACING, theme } from '@/constants/theme';

type ButtonProps = {
  onPress?: () => void;
  title: string;
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  color?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  compact?: boolean;
  testID?: string;
  style?: object;
  contentStyle?: object;
  labelStyle?: object;
  uppercase?: boolean;
};

// forwardRef verwenden, um Refs von außen zu akzeptieren
export const Button = forwardRef<any, ButtonProps>(({
  onPress,
  title,
  mode = 'contained',
  color,
  loading = false,
  disabled = false,
  icon,
  compact = false,
  testID,
  style,
  contentStyle,
  labelStyle,
  uppercase = false,
}, ref) => {
  return (
    <PaperButton
      ref={ref}
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      icon={icon}
      compact={compact}
      testID={testID}
      style={[styles.button, style]}
      contentStyle={contentStyle}
      labelStyle={labelStyle}
      uppercase={uppercase}
      buttonColor={color}
    >
      {title}
    </PaperButton>
  );
});

const styles = StyleSheet.create({
  button: {
    marginVertical: SPACING.sm,
    borderRadius: theme.roundness,
  },
});
