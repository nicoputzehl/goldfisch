import type React from 'react';
import { useState } from 'react';
import { View, StyleSheet, TextInput as RNTextInput } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { SPACING } from '@/constants/theme';

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
  right?: React.ReactNode;
  onBlur?: () => void;
  onFocus?: () => void;
  testID?: string;
};

export function Input({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  maxLength,
  placeholder,
  disabled = false,
  right,
  onBlur,
  onFocus,
  testID,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        error={!!error}
        onFocus={handleFocus}
        onBlur={handleBlur}
        mode="outlined"
        style={[
          styles.input,
          multiline && { height: numberOfLines * 40 },
          isFocused && styles.focused
        ]}
        right={right}
        testID={testID}
      />
      {error ? (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  input: {
    backgroundColor: 'transparent',
  },
  focused: {
    borderColor: '#3498db',
  },
});
