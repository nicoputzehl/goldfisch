import type React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { SPACING } from '@/constants/theme';

type TagProps = {
  label: string;
  onPress?: () => void;
  onClose?: () => void;
  selected?: boolean;
  disabled?: boolean;
  testID?: string;
  style?: object;
};

export function Tag({
  label,
  onPress,
  onClose,
  selected = false,
  disabled = false,
  testID,
  style,
}: TagProps) {
  return (
    <Chip
      mode={selected ? 'flat' : 'outlined'}
      selected={selected}
      onPress={onPress}
      onClose={onClose}
      disabled={disabled}
      style={[styles.tag, selected && styles.selectedTag, style]}
      testID={testID}
    >
      {label}
    </Chip>
  );
}

type TagContainerProps = {
  children: React.ReactNode;
  style?: object;
};

export function TagContainer({ children, style }: TagContainerProps) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  selectedTag: {
    backgroundColor: '#3498db20',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: SPACING.sm,
  },
});
