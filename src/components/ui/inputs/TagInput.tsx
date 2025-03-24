import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, type TextInput as RNTextInput, TouchableOpacity, type NativeSyntheticEvent, type TextInputKeyPressEventData } from 'react-native';
import { TextInput, IconButton, Text, useTheme } from 'react-native-paper';
import { SPACING, BORDER_RADIUS } from '@/constants/theme';
import { Tag, TagContainer } from '../Tag';

export interface TagInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

type TagInputProps = {
  label: string;
  value: string[];
  onChangeTags: (tags: string[]) => void;
  error?: string;
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  testID?: string;
};

export const TagInput = forwardRef<TagInputRef, TagInputProps>(({
  label,
  value,
  onChangeTags,
  error,
  placeholder = 'Tag hinzufügen...',
  maxTags = 10,
  disabled = false,
  testID,
}: TagInputProps, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<RNTextInput>(null);
  const theme = useTheme();
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    },
    clear: () => {
      setInputValue('');
    }
  }));
  
  const handleAddTag = () => {
    if (inputValue.trim() && value.length < maxTags) {
      const newTag = inputValue.trim();
      const tagExists = value.includes(newTag);
      
      if (!tagExists) {
        const newTags = [...value, newTag];
        onChangeTags(newTags);
      }
      
      setInputValue('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = value.filter(tag => tag !== tagToRemove);
    onChangeTags(newTags);
  };
  
  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    // Wenn Enter oder Komma gedrückt wird, füge Tag hinzu
    if (e.nativeEvent.key === 'Enter' || e.nativeEvent.key === ',') {
      e.preventDefault?.();
      handleAddTag();
    }
  };
  
  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    // Füge bei Verlassen des Fokus den aktuellen Wert als Tag hinzu
    if (inputValue.trim()) {
      handleAddTag();
    }
  };

  const isTagLimitReached = value.length >= maxTags;
  
  return (
    <View style={styles.container} testID={testID}>
      <View style={[
        styles.inputContainer, 
        isFocused && styles.focused,
        error && styles.error,
        disabled && styles.disabled
      ]}>
        <TextInput
          ref={inputRef}
          label={label}
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleAddTag}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          disabled={disabled || isTagLimitReached}
          placeholder={isTagLimitReached ? `Maximale Anzahl (${maxTags}) erreicht` : placeholder}
          mode="outlined"
          right={
            <TextInput.Icon
              icon="tag-plus"
              disabled={!inputValue.trim() || disabled || isTagLimitReached}
              onPress={handleAddTag}
            />
          }
          style={styles.input}
        />
      </View>
      
      {value.length > 0 && (
        <TagContainer>
          {value.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              onClose={() => handleRemoveTag(tag)}
              disabled={disabled}
            />
          ))}
        </TagContainer>
      )}
      
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      
      {isTagLimitReached && !error && (
        <Text style={styles.limitText}>
          Maximale Anzahl an Tags ({maxTags}) erreicht
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  inputContainer: {
    borderRadius: BORDER_RADIUS.sm,
  },
  input: {
    backgroundColor: 'transparent',
  },
  focused: {
    borderColor: '#3498db',
  },
  error: {
    borderColor: 'red',
  },
  disabled: {
    opacity: 0.6,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: SPACING.xs,
  },
  limitText: {
    color: 'orange',
    fontSize: 12,
    marginTop: SPACING.xs,
  }
});
