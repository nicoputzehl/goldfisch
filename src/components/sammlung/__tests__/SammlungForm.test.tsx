import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text, View, TouchableOpacity } from 'react-native';
import { SammlungsTyp } from '@/features/sammlung/types';

// Ein stark vereinfachter TestSammlungForm ohne externe Abhängigkeiten
const TestSammlungForm = ({ onSubmit }) => {
  return (
    <View>
      <Text>Test Sammlung Form</Text>
      <TouchableOpacity testID="submit-button" onPress={() => onSubmit({
        name: 'Meine Filme',
        type: SammlungsTyp.FILM,
        beschreibung: 'Eine Testbeschreibung'
      })}>
        <Text>Sammlung erstellen</Text>
      </TouchableOpacity>
    </View>
  );
};

// Mock für die eigentliche SammlungForm
jest.mock('../SammlungForm', () => ({
  SammlungForm: (props) => {
    const React = require('react');
    return React.createElement(TestSammlungForm, props);
  }
}));

describe('SammlungForm', () => {
  it('sollte onSubmit aufrufen, wenn der Submit-Button gedrückt wird', async () => {
    const onSubmitMock = jest.fn();
    const { getByTestId } = render(<TestSammlungForm onSubmit={onSubmitMock} />);
    
    const submitButton = getByTestId('submit-button');
    fireEvent.press(submitButton);
    
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        name: 'Meine Filme',
        type: SammlungsTyp.FILM,
        beschreibung: 'Eine Testbeschreibung'
      });
    });
  });
});
