import React, { useState, forwardRef } from 'react';
import { View, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { TextInput, List, Surface, Text, useTheme, IconButton } from 'react-native-paper';
import { SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { Input, type InputRef } from '../Input';

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

export interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  testID?: string;
  style?: object;
}

export const SelectInput = forwardRef<InputRef, SelectInputProps>(({
  label,
  value,
  onChange,
  options,
  error,
  placeholder = 'Option auswählen',
  disabled = false,
  searchable = false,
  testID,
  style,
}: SelectInputProps, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  
  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : '';
  
  const filteredOptions = searchable && searchQuery
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  const openModal = () => {
    if (!disabled) {
      setModalVisible(true);
      setSearchQuery('');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    closeModal();
  };

  const clearSelection = () => {
    onChange('');
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      <TouchableOpacity
        onPress={openModal}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Input
          ref={ref}
          label={label}
          value={displayValue}
          onChangeText={() => {}}
          error={error}
          disabled={disabled}
          placeholder={placeholder}
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          contentStyle={{ pointerEvents: 'none' as any }}
          right={
            value ? (
              <TextInput.Icon
                icon="close-circle"
                onPress={clearSelection}
                forceTextInputFocus={false}
              />
            ) : (
              <TextInput.Icon
                icon="chevron-down"
                onPress={openModal}
                forceTextInputFocus={false}
              />
            )
          }
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={closeModal}
        >
          <Surface style={styles.modalContent} elevation={4}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <IconButton
                icon="close"
                size={20}
                onPress={closeModal}
              />
            </View>
            
            {searchable && (
              <TextInput
                placeholder="Suchen..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                mode="outlined"
                style={styles.searchInput}
                left={<TextInput.Icon icon="magnify" />}
                autoFocus
              />
            )}
            
            <ScrollView style={styles.optionsList}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <List.Item
                    key={option.value}
                    title={option.label}
                    left={option.icon ? (props) => <List.Icon {...props} icon={option.icon || ""} /> : undefined}
                    right={option.value === value ? (props) => <List.Icon {...props} icon="check" /> : undefined}
                    onPress={() => handleSelect(option.value)}
                    style={option.value === value ? styles.selectedItem : undefined}
                  />
                ))
              ) : (
                <View style={styles.noResults}>
                  <Text>Keine Optionen gefunden</Text>
                </View>
              )}
            </ScrollView>
          </Surface>
        </TouchableOpacity>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  searchInput: {
    margin: SPACING.md,
    backgroundColor: 'white',
  },
  optionsList: {
    maxHeight: 300,
  },
  selectedItem: {
    backgroundColor: '#e1f5fe',
  },
  noResults: {
    padding: SPACING.lg,
    alignItems: 'center',
  }
});
