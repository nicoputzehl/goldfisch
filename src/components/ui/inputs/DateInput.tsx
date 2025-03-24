import React, { useState, forwardRef } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import {
  TextInput,
  HelperText,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { SPACING, BORDER_RADIUS } from '@/constants/theme';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Input, type InputRef } from '../Input';

export interface DateInputProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  disabled?: boolean;
  mode?: 'date' | 'time' | 'datetime';
  minimumDate?: Date;
  maximumDate?: Date;
  placeholder?: string;
  testID?: string;
  style?: object;
}

export const DateInput = forwardRef<InputRef, DateInputProps>(
  (
    {
      label,
      value,
      onChange,
      error,
      disabled = false,
      mode = 'date',
      minimumDate,
      maximumDate,
      placeholder = 'Datum auswählen',
      testID,
      style,
    }: DateInputProps,
    ref
  ) => {
    const [showPicker, setShowPicker] = useState(false);
    const theme = useTheme();

    const formatDate = (date: Date | null): string => {
      if (!date) return '';
      if (mode === 'date') {
        return date.toLocaleDateString('de-DE');
      }
      if (mode === 'time') {
        return date.toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
        });
      }
      return `${date.toLocaleDateString('de-DE')} ${date.toLocaleTimeString(
        'de-DE',
        { hour: '2-digit', minute: '2-digit' }
      )}`;
    };

    const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate || value;
      if (Platform.OS === 'android') {
        setShowPicker(false);
      }
      if (currentDate !== undefined) {
        onChange(currentDate);
      }
    };

    const showDatepicker = () => {
      setShowPicker(true);
    };

    const clearDate = () => {
      onChange(null);
    };

    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity
          onPress={showDatepicker}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Input
            ref={ref}
            label={label}
            value={formatDate(value)}
            error={error}
            disabled={disabled}
            placeholder={placeholder}
            onChangeText={() => {}}
            // Entfernt die nicht unterstützte pointerEvents-Prop
            // Ersetzen wir durch eine spezielle Eigenschaft im Style
            style={{ opacity: 1 }}
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            contentStyle={{ pointerEvents: 'none' as any }}
            right={
              value ? (
                <TextInput.Icon
                  icon='close-circle'
                  onPress={clearDate}
                  forceTextInputFocus={false}
                />
              ) : (
                <TextInput.Icon
                  icon={mode === 'date' ? 'calendar' : 'clock-outline'}
                  onPress={showDatepicker}
                  forceTextInputFocus={false}
                />
              )
            }
            testID={testID}
          />
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            testID='dateTimePicker'
            value={value || new Date()}
            mode={mode === 'datetime' ? 'date' : mode}
            is24Hour={true}
            display='default'
            onChange={handleChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
});
