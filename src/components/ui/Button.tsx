import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { SPACING } from '@/constants/theme';

type ButtonProps = {
  onPress: () => void;
  title: string;
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  color?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  compact?: boolean;
  testID?: string;
  style?: object;
};

export function Button({
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
}: ButtonProps) {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      icon={icon}
      compact={compact}
      testID={testID}
      style={[styles.button, style]}
      textColor={color}
    >
      {title}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: SPACING.sm,
  },
});
