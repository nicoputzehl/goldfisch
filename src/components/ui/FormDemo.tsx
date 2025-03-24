import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { Container, ScrollContainer, Spacer } from './Layout';
import { TextField, TagInput, DateInput, SelectInput } from './inputs';
import { SPACING } from '@/constants/theme';
import Typography from '@/utils/typography';

export const FormDemo = () => {
  const [text, setText] = useState('');
  const [multilineText, setMultilineText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { value: 'option1', label: 'Option 1', icon: 'numeric-1-circle' },
    { value: 'option2', label: 'Option 2', icon: 'numeric-2-circle' },
    { value: 'option3', label: 'Option 3', icon: 'numeric-3-circle' },
    { value: 'option4', label: 'Option 4', icon: 'numeric-4-circle' },
    { value: 'option5', label: 'Option 5', icon: 'numeric-5-circle' },
  ];

  return (
    <ScrollContainer>
      <Text style={Typography.h2}>Input-Komponenten Demo</Text>
      <Spacer size="md" />

      <Card style={styles.section}>
        <Card.Title title="TextField" />
        <Card.Content>
          <TextField
            label="Einfaches Textfeld"
            value={text}
            onChangeText={setText}
            placeholder="Text eingeben..."
          />

          <TextField
            label="Textfeld mit Zeichenzähler"
            value={text}
            onChangeText={setText}
            characterCount
            maxCharacters={50}
            hint="Maximal 50 Zeichen"
          />

          <TextField
            label="Mehrzeiliges Textfeld"
            value={multilineText}
            onChangeText={setMultilineText}
            multiline
            numberOfLines={4}
            autoGrow
            placeholder="Längeren Text eingeben..."
          />

          <TextField
            label="Textfeld mit Fehler"
            value={text}
            onChangeText={setText}
            error={text.length < 3 ? "Text muss mindestens 3 Zeichen lang sein" : undefined}
          />
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Title title="TagInput" />
        <Card.Content>
          <TagInput
            label="Tags"
            value={tags}
            onChangeTags={setTags}
            maxTags={5}
            placeholder="Tag eingeben und Enter drücken..."
          />
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Title title="DateInput" />
        <Card.Content>
          <DateInput
            label="Datum"
            value={date}
            onChange={setDate}
            placeholder="Datum auswählen..."
          />
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Title title="SelectInput" />
        <Card.Content>
          <SelectInput
            label="Auswahl"
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
            searchable
            placeholder="Option auswählen..."
          />
        </Card.Content>
      </Card>

      <Spacer size="xl" />

      <Button mode="contained" onPress={() => {
        console.log({
          text,
          multilineText,
          tags,
          date,
          selectedOption
        });
      }}>
        Formulardaten anzeigen
      </Button>

      <Spacer size="xl" />
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.lg,
  },
});
