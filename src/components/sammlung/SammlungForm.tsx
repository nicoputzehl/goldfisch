import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
  TextField, 
  SelectInput, 
  Button,
  Container,
  ScrollContainer,
  Spacer
} from '@/components/ui';
import { SammlungsTyp } from '@/features/sammlung/types';
import { VERFUEGBARE_SAMMLUNGSTYPEN } from '@/constants/typen';
import { SPACING } from '@/constants/theme';

export interface SammlungFormData {
  name: string;
  type: SammlungsTyp;
  beschreibung?: string;
  plattform?: string;
  genre?: string;
  kategorie?: string;
}

interface SammlungFormProps {
  initialData?: Partial<SammlungFormData>;
  onSubmit: (data: SammlungFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function SammlungForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false
}: SammlungFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [type, setType] = useState<SammlungsTyp>(initialData?.type || SammlungsTyp.FILM);
  const [beschreibung, setBeschreibung] = useState(initialData?.beschreibung || '');
  const [plattform, setPlattform] = useState(initialData?.plattform || '');
  const [genre, setGenre] = useState(initialData?.genre || '');
  const [kategorie, setKategorie] = useState(initialData?.kategorie || '');
  
  // Validierungszustände
  const [nameError, setNameError] = useState<string | undefined>();

  // Sammlung-Typ in SelectInput-Option umwandeln
  const typeOptions = VERFUEGBARE_SAMMLUNGSTYPEN.map(typ => ({
    value: typ.wert,
    label: typ.label,
    icon: typ.icon
  }));

  // Validierung beim Namensändern
  const handleNameChange = (value: string) => {
    setName(value);
    if (value.trim().length === 0) {
      setNameError('Name ist erforderlich');
    } else if (value.trim().length < 3) {
      setNameError('Name muss mindestens 3 Zeichen lang sein');
    } else {
      setNameError(undefined);
    }
  };

  // Typabhängige Felder anzeigen
  const renderTypeSpecificFields = () => {
    switch (type) {
      case SammlungsTyp.FILM:
      case SammlungsTyp.SERIE:
        return (
          <TextField
            label="Plattform"
            value={plattform}
            onChangeText={setPlattform}
            placeholder="z.B. Netflix, Amazon Prime, Disney+"
          />
        );
      case SammlungsTyp.BUCH:
        return (
          <TextField
            label="Genre"
            value={genre}
            onChangeText={setGenre}
            placeholder="z.B. Roman, Sachbuch, Fantasy"
          />
        );
      case SammlungsTyp.LOKAL:
      case SammlungsTyp.REZEPT:
      case SammlungsTyp.NOTIZ:
      case SammlungsTyp.LINK:
        return (
          <TextField
            label="Kategorie"
            value={kategorie}
            onChangeText={setKategorie}
            placeholder="z.B. Restaurant, Café, Dessert"
          />
        );
      default:
        return null;
    }
  };

  // Formular absenden
  const handleSubmit = () => {
    // Nochmalige Validierung vor dem Absenden
    if (!name.trim()) {
      setNameError('Name ist erforderlich');
      return;
    }

    const formData: SammlungFormData = {
      name: name.trim(),
      type,
      beschreibung: beschreibung.trim() || undefined
    };

    // Typspezifische Felder hinzufügen
    if (type === SammlungsTyp.FILM || type === SammlungsTyp.SERIE) {
      formData.plattform = plattform.trim() || undefined;
    } else if (type === SammlungsTyp.BUCH) {
      formData.genre = genre.trim() || undefined;
    } else if ([
      SammlungsTyp.LOKAL, 
      SammlungsTyp.REZEPT, 
      SammlungsTyp.NOTIZ, 
      SammlungsTyp.LINK
    ].includes(type)) {
      formData.kategorie = kategorie.trim() || undefined;
    }

    onSubmit(formData);
  };

  return (
    <ScrollContainer keyboardAware>
      <TextField
        label="Name der Sammlung"
        value={name}
        onChangeText={handleNameChange}
        error={nameError}
        placeholder="z.B. Filme zum Anschauen"
        maxLength={50}
        characterCount
      />

      <SelectInput
        label="Typ"
        value={type}
        onChange={(value) => setType(value as SammlungsTyp)}
        options={typeOptions}
        placeholder="Bitte Typ auswählen"
      />

      {renderTypeSpecificFields()}

      <TextField
        label="Beschreibung (optional)"
        value={beschreibung}
        onChangeText={setBeschreibung}
        placeholder="Beschreibe deine Sammlung..."
        multiline
        numberOfLines={4}
        autoGrow
      />

      <Spacer size="lg" />

      <View style={styles.buttons}>
        {onCancel && (
          <Button
            title="Abbrechen"
            onPress={onCancel}
            mode="outlined"
            style={styles.button}
            disabled={isSubmitting}
          />
        )}
        <Button
          title="Sammlung erstellen"
          onPress={handleSubmit}
          style={styles.button}
          loading={isSubmitting}
          disabled={isSubmitting || !!nameError || name.trim().length === 0}
        />
      </View>
      
      <Spacer size="xl" />
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  button: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
});
