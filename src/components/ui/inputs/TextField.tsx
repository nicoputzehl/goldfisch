import type React from 'react';
import { useState, forwardRef } from 'react';
import { View, StyleSheet, type NativeSyntheticEvent, type TextInputContentSizeChangeEventData } from 'react-native';
import { TextInput, HelperText, useTheme } from 'react-native-paper';
import { SPACING } from '@/constants/theme';
import { Input, type InputRef } from '../Input';

// Erweiterte Props speziell für die TextField-Komponente
export interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  characterCount?: boolean;
  maxCharacters?: number;
  hint?: string;
  autoGrow?: boolean;
  style?: object;
  contentStyle?: object;
  // Andere Input-Props
  secureTextEntry?: boolean;
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
  testID?: string;
  clearButton?: boolean;
  outlineColor?: string;
  activeOutlineColor?: string;
}

export const TextField = forwardRef<InputRef, TextFieldProps>(({
  label,
  value,
  onChangeText,
  error,
  multiline = false,
  numberOfLines = 1,
  characterCount = false,
  maxCharacters,
  hint,
  autoGrow = false,
  style,
  contentStyle,
  ...rest
}: TextFieldProps, ref) => {
  const theme = useTheme();
  const [localHeight, setLocalHeight] = useState<number | undefined>(undefined);
  
  // Berechnen der aktuellen Zeichenanzahl und des Limits
  const characterCountText = maxCharacters 
    ? `${value.length}/${maxCharacters}`
    : `${value.length}`;
  
  // Prüfen, ob das Zeichenlimit überschritten wurde
  const isOverLimit = maxCharacters ? value.length > maxCharacters : false;
  
  // Callback für Content-Size-Änderung im Multiline-Modus
  const handleContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    if (autoGrow && multiline) {
      setLocalHeight(event.nativeEvent.contentSize.height);
    }
  };
  
  return (
    <View style={styles.container}>
      <Input
        ref={ref}
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={error}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        style={[
          autoGrow && multiline && localHeight ? { height: Math.max(80, localHeight + 20) } : {},
          style
        ]}
        contentStyle={contentStyle}
        {...rest}
      />
      
      <View style={styles.bottomRow}>
        {hint && !error && (
          <HelperText type="info" visible={true} style={styles.hint}>
            {hint}
          </HelperText>
        )}
        
        {characterCount && (
          <HelperText 
            type={isOverLimit ? "error" : "info"} 
            visible={true}
            style={[styles.characterCount, isOverLimit && styles.overLimit]}
          >
            {characterCountText}
          </HelperText>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -SPACING.sm,
  },
  hint: {
    flex: 1,
    paddingTop: 0,
    fontSize: 12,
  },
  characterCount: {
    paddingTop: 0,
    fontSize: 12,
    textAlign: 'right',
  },
  overLimit: {
    color: 'red',
  }
});
