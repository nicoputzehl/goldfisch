import React from 'react';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, TextInput as RNTextInput } from 'react-native';
import { TextInput, HelperText, useTheme } from 'react-native-paper';
import { SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

export interface InputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  isFocused: () => boolean;
}

// autoComplete typings from RN
type AutoComplete = 
  | 'off'
  | 'additional-name'
  | 'address-line1'
  | 'address-line2'
  | 'birthdate-day'
  | 'birthdate-full'
  | 'birthdate-month'
  | 'birthdate-year'
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-day'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'country'
  | 'current-password'
  | 'email'
  | 'family-name'
  | 'given-name'
  | 'honorific-prefix'
  | 'honorific-suffix'
  | 'name'
  | 'name-family'
  | 'name-given'
  | 'name-middle'
  | 'name-middle-initial'
  | 'name-prefix'
  | 'name-suffix'
  | 'new-password'
  | 'nickname'
  | 'one-time-code'
  | 'organization'
  | 'organization-title'
  | 'password'
  | 'password-new'
  | 'postal-address'
  | 'postal-address-country'
  | 'postal-address-extended'
  | 'postal-address-extended-postal-code'
  | 'postal-address-locality'
  | 'postal-address-region'
  | 'postal-code'
  | 'street-address'
  | 'sms-otp'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-device'
  | 'username'
  | 'username-new'
  | 'url';

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
  left?: React.ReactNode;
  onBlur?: () => void;
  onFocus?: () => void;
  onSubmitEditing?: () => void;
  blurOnSubmit?: boolean;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  autoComplete?: AutoComplete;
  testID?: string;
  style?: object;
  contentStyle?: object;
  clearButton?: boolean;
  outlineColor?: string;
  activeOutlineColor?: string;
};

export const Input = forwardRef<InputRef, InputProps>(({
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
  left,
  onBlur,
  onFocus,
  onSubmitEditing,
  blurOnSubmit,
  returnKeyType,
  autoComplete,
  testID,
  style,
  contentStyle,
  clearButton = false,
  outlineColor,
  activeOutlineColor,
}: InputProps, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const inputRef = React.useRef<any>(null);
  const theme = useTheme();
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    },
    clear: () => {
      inputRef.current?.clear();
    },
    isFocused: () => {
      return inputRef.current?.isFocused() || false;
    }
  }));
  
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  // Add clear button functionality
  const rightElement = clearButton && value ? (
    <TextInput.Icon
      icon="close-circle"
      onPress={() => onChangeText('')}
      forceTextInputFocus={false}
    />
  ) : right;

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
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
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        returnKeyType={returnKeyType}
        autoComplete={autoComplete}
        mode="outlined"
        style={[
          styles.input,
          multiline && { minHeight: numberOfLines * 24 },
          style
        ]}
        contentStyle={[
          styles.contentStyle,
          contentStyle
        ]}
        outlineColor={outlineColor}
        activeOutlineColor={activeOutlineColor || theme.colors.primary}
        right={rightElement}
        left={left}
        testID={testID}
      />
      {error ? (
        <HelperText type="error" visible={!!error} style={styles.errorText}>
          {error}
        </HelperText>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  input: {
    backgroundColor: 'transparent',
  },
  contentStyle: {
    paddingVertical: SPACING.xs,
  },
  errorText: {
    marginTop: -SPACING.xs,
    marginBottom: SPACING.xs,
  }
});
