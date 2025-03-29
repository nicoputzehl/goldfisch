import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
  TextField, 
  TagInput, 
  SelectInput,
  DateInput,
  Button,
  ScrollContainer,
  Spacer
} from '@/components/ui';
import { SammlungsTyp } from '@/features/sammlung/types';
import { ERINNERUNGS_TYP_FELDER } from '@/constants/typen';
import { SPACING } from '@/constants/theme';

export interface ErinnerungFormData {
  titel: string;
  tags?: string[];
  notizen?: string;
  
  // Film/Serie spezifische Felder
  regisseur?: string;
  erscheinungsJahr?: number;
  genre?: string;
  dauer?: number;
  gesehen?: boolean;
  bewertung?: number;
  
  // Buch spezifische Felder
  autor?: string;
  seitenanzahl?: number;
  gelesen?: boolean;
  
  // Lokal spezifische Felder
  adresse?: string;
  kategorie?: string;
  oeffnungszeiten?: string;
  webseite?: string;
  telefon?: string;
  besucht?: boolean;
  
  // Rezept spezifische Felder
  zutaten?: string[];
  zubereitungszeit?: number;
  portionen?: number;
  quelle?: string;
  ausprobiert?: boolean;
  
  // Notiz spezifische Felder
  inhalt?: string;
  prioritaet?: 'niedrig' | 'mittel' | 'hoch';
  
  // Link spezifische Felder
  url?: string;
}

interface ErinnerungFormProps {
  sammlungsTyp: SammlungsTyp;
  sammlungId: string;
  initialData?: Partial<ErinnerungFormData>;
  onSubmit: (data: ErinnerungFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function ErinnerungForm({
  sammlungsTyp,
  sammlungId,
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false
}: ErinnerungFormProps) {
  // Grundlegende Felder für alle Erinnerungen
  const [titel, setTitel] = useState(initialData?.titel || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [notizen, setNotizen] = useState(initialData?.notizen || '');
  
  // Spezifische Felder basierend auf dem Sammlungstyp
  // Film/Serie
  const [regisseur, setRegisseur] = useState(initialData?.regisseur || '');
  const [erscheinungsJahr, setErscheinungsJahr] = useState<string>(
    initialData?.erscheinungsJahr?.toString() || ''
  );
  const [genre, setGenre] = useState(initialData?.genre || '');
  const [dauer, setDauer] = useState<string>(
    initialData?.dauer?.toString() || ''
  );
  
  // Buch
  const [autor, setAutor] = useState(initialData?.autor || '');
  const [seitenanzahl, setSeitenanzahl] = useState<string>(
    initialData?.seitenanzahl?.toString() || ''
  );
  
  // Lokal
  const [adresse, setAdresse] = useState(initialData?.adresse || '');
  const [kategorie, setKategorie] = useState(initialData?.kategorie || '');
  const [oeffnungszeiten, setOeffnungszeiten] = useState(initialData?.oeffnungszeiten || '');
  const [webseite, setWebseite] = useState(initialData?.webseite || '');
  const [telefon, setTelefon] = useState(initialData?.telefon || '');
  
  // Notiz
  const [inhalt, setInhalt] = useState(initialData?.inhalt || '');
  const [prioritaet, setPrioritaet] = useState<string>(initialData?.prioritaet || '');
  
  // Link
  const [url, setUrl] = useState(initialData?.url || '');
  
  // Validierungszustände
  const [titelError, setTitelError] = useState<string | undefined>();
  
  // Prioritäts-Optionen für Notizen
  const prioritaetOptions = [
    { value: 'niedrig', label: 'Niedrig', icon: 'arrow-down' },
    { value: 'mittel', label: 'Mittel', icon: 'arrow-right' },
    { value: 'hoch', label: 'Hoch', icon: 'arrow-up' }
  ];
  
  // Validierung beim Titeländern
  const handleTitelChange = (value: string) => {
    setTitel(value);
    if (value.trim().length === 0) {
      setTitelError('Titel ist erforderlich');
    } else if (value.trim().length < 3) {
      setTitelError('Titel muss mindestens 3 Zeichen lang sein');
    } else {
      setTitelError(undefined);
    }
  };
  
  // Rendert Felder basierend auf dem Sammlungstyp
  const renderTypeSpecificFields = () => {
    switch (sammlungsTyp) {
      case SammlungsTyp.FILM:
        return (
          <>
            <TextField
              label="Regisseur"
              value={regisseur}
              onChangeText={setRegisseur}
              placeholder="Name des Regisseurs"
            />
            <TextField
              label="Erscheinungsjahr"
              value={erscheinungsJahr}
              onChangeText={setErscheinungsJahr}
              placeholder="z.B. 2023"
              keyboardType="numeric"
            />
            <TextField
              label="Genre"
              value={genre}
              onChangeText={setGenre}
              placeholder="z.B. Action, Komödie"
            />
            <TextField
              label="Dauer (Minuten)"
              value={dauer}
              onChangeText={setDauer}
              placeholder="z.B. 120"
              keyboardType="numeric"
            />
          </>
        );
      case SammlungsTyp.SERIE:
        return (
          <>
            <TextField
              label="Genre"
              value={genre}
              onChangeText={setGenre}
              placeholder="z.B. Drama, Science Fiction"
            />
            <TextField
              label="Erscheinungsjahr"
              value={erscheinungsJahr}
              onChangeText={setErscheinungsJahr}
              placeholder="z.B. 2020"
              keyboardType="numeric"
            />
          </>
        );
      case SammlungsTyp.BUCH:
        return (
          <>
            <TextField
              label="Autor"
              value={autor}
              onChangeText={setAutor}
              placeholder="Name des Autors"
            />
            <TextField
              label="Genre"
              value={genre}
              onChangeText={setGenre}
              placeholder="z.B. Roman, Sachbuch"
            />
            <TextField
              label="Erscheinungsjahr"
              value={erscheinungsJahr}
              onChangeText={setErscheinungsJahr}
              placeholder="z.B. 2022"
              keyboardType="numeric"
            />
            <TextField
              label="Seitenanzahl"
              value={seitenanzahl}
              onChangeText={setSeitenanzahl}
              placeholder="z.B. 300"
              keyboardType="numeric"
            />
          </>
        );
      case SammlungsTyp.LOKAL:
        return (
          <>
            <TextField
              label="Adresse"
              value={adresse}
              onChangeText={setAdresse}
              placeholder="Vollständige Adresse"
            />
            <TextField
              label="Kategorie"
              value={kategorie}
              onChangeText={setKategorie}
              placeholder="z.B. Restaurant, Café, Bar"
            />
            <TextField
              label="Öffnungszeiten"
              value={oeffnungszeiten}
              onChangeText={setOeffnungszeiten}
              placeholder="z.B. Mo-Fr 10-22 Uhr"
            />
            <TextField
              label="Webseite"
              value={webseite}
              onChangeText={setWebseite}
              placeholder="z.B. www.example.com"
              keyboardType="url"
            />
            <TextField
              label="Telefon"
              value={telefon}
              onChangeText={setTelefon}
              placeholder="z.B. +49 30 12345678"
              keyboardType="phone-pad"
            />
          </>
        );
      case SammlungsTyp.NOTIZ:
        return (
          <>
            <TextField
              label="Inhalt"
              value={inhalt}
              onChangeText={setInhalt}
              placeholder="Notizinhalt eingeben..."
              multiline
              numberOfLines={8}
              autoGrow
            />
            <SelectInput
              label="Priorität"
              value={prioritaet}
              onChange={setPrioritaet}
              options={prioritaetOptions}
              placeholder="Priorität auswählen"
            />
          </>
        );
      case SammlungsTyp.LINK:
        return (
          <TextField
            label="URL"
            value={url}
            onChangeText={setUrl}
            placeholder="https://..."
            keyboardType="url"
          />
        );
      default:
        return null;
    }
  };
  
  // Formular absenden
  const handleSubmit = () => {
    // Nochmalige Validierung vor dem Absenden
    if (!titel.trim()) {
      setTitelError('Titel ist erforderlich');
      return;
    }
    
    // Basisformulardaten für alle Erinnerungstypen
    const formData: ErinnerungFormData = {
      titel: titel.trim(),
      tags: tags.length > 0 ? tags : undefined,
      notizen: notizen.trim() || undefined
    };
    
    // Typspezifische Felder hinzufügen
    switch (sammlungsTyp) {
      case SammlungsTyp.FILM:
        formData.regisseur = regisseur.trim() || undefined;
        formData.genre = genre.trim() || undefined;
        if (erscheinungsJahr) {
          const jahr = Number.parseInt(erscheinungsJahr, 10);
          if (!Number.isNaN(jahr)) formData.erscheinungsJahr = jahr;
        }
        if (dauer) {
          const dauerMinuten = Number.parseInt(dauer, 10);
          if (!Number.isNaN(dauerMinuten)) formData.dauer = dauerMinuten;
        }
        break;
      case SammlungsTyp.SERIE:
        formData.genre = genre.trim() || undefined;
        if (erscheinungsJahr) {
          const jahr = Number.parseInt(erscheinungsJahr, 10);
          if (!Number.isNaN(jahr)) formData.erscheinungsJahr = jahr;
        }
        break;
      case SammlungsTyp.BUCH:
        formData.autor = autor.trim() || undefined;
        formData.genre = genre.trim() || undefined;
        if (erscheinungsJahr) {
          const jahr = Number.parseInt(erscheinungsJahr, 10);
          if (!Number.isNaN(jahr)) formData.erscheinungsJahr = jahr;
        }
        if (seitenanzahl) {
          const anzahl = Number.parseInt(seitenanzahl, 10);
          if (!Number.isNaN(anzahl)) formData.seitenanzahl = anzahl;
        }
        break;
      case SammlungsTyp.LOKAL:
        formData.adresse = adresse.trim() || undefined;
        formData.kategorie = kategorie.trim() || undefined;
        formData.oeffnungszeiten = oeffnungszeiten.trim() || undefined;
        formData.webseite = webseite.trim() || undefined;
        formData.telefon = telefon.trim() || undefined;
        break;
      case SammlungsTyp.NOTIZ:
        formData.inhalt = inhalt.trim();
        formData.prioritaet = prioritaet as 'niedrig' | 'mittel' | 'hoch' || undefined;
        break;
      case SammlungsTyp.LINK:
        formData.url = url.trim();
        break;
    }
    
    onSubmit(formData);
  };
  
  return (
    <ScrollContainer keyboardAware>
      <TextField
        label="Titel"
        value={titel}
        onChangeText={handleTitelChange}
        error={titelError}
        placeholder="Titel der Erinnerung"
        maxLength={100}
        characterCount
      />
      
      {renderTypeSpecificFields()}
      
      <TagInput
        label="Tags (optional)"
        value={tags}
        onChangeTags={setTags}
        placeholder="Tag eingeben und Enter drücken..."
        maxTags={10}
      />
      
      <TextField
        label="Notizen (optional)"
        value={notizen}
        onChangeText={setNotizen}
        placeholder="Zusätzliche Notizen..."
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
          title="Erinnerung speichern"
          onPress={handleSubmit}
          style={styles.button}
          loading={isSubmitting}
          disabled={isSubmitting || !!titelError || titel.trim().length === 0}
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