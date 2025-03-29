import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import { 
  TextField, 
  TagInput, 
  DateInput, 
  SelectInput,
  Button,
  Spacer
} from '@/components/ui';
import { SammlungsTyp } from '@/features/sammlung/types';
import { SPACING } from '@/constants/theme';

export interface ErinnerungFormData {
  titel: string;
  notizen?: string;
  tags?: string[];
  
  // Film- und Serien-spezifische Felder
  regisseur?: string;
  erscheinungsJahr?: number;
  genre?: string;
  dauer?: number;
  gesehen?: boolean;
  bewertung?: number;
  
  // Serien-spezifische Felder
  staffel?: number;
  folge?: number;
  
  // Buch-spezifische Felder
  autor?: string;
  seitenanzahl?: number;
  gelesen?: boolean;
  
  // Lokal-spezifische Felder
  adresse?: string;
  kategorie?: string;
  oeffnungszeiten?: string;
  webseite?: string;
  telefon?: string;
  besucht?: boolean;
  
  // Rezept-spezifische Felder
  zubereitungszeit?: number;
  portionen?: number;
  quelle?: string;
  ausprobiert?: boolean;
  
  // Notiz-spezifische Felder
  inhalt?: string;
  prioritaet?: 'niedrig' | 'mittel' | 'hoch';
  
  // Link-spezifische Felder
  url?: string;
}

interface ErinnerungFormProps {
  sammlungsTyp: SammlungsTyp;
  initialData?: Partial<ErinnerungFormData>;
  onSubmit: (data: ErinnerungFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function ErinnerungForm({
  sammlungsTyp,
  initialData = {},
  onSubmit,
  onCancel,
  isSubmitting = false
}: ErinnerungFormProps) {
  // Gemeinsame Felder
  const [titel, setTitel] = useState(initialData.titel || '');
  const [notizen, setNotizen] = useState(initialData.notizen || '');
  const [tags, setTags] = useState<string[]>(initialData.tags || []);
  
  // Film-/Serien-Felder
  const [regisseur, setRegisseur] = useState(initialData.regisseur || '');
  const [erscheinungsJahr, setErscheinungsJahr] = useState<string>(
    initialData.erscheinungsJahr ? initialData.erscheinungsJahr.toString() : ''
  );
  const [genre, setGenre] = useState(initialData.genre || '');
  const [dauer, setDauer] = useState<string>(
    initialData.dauer ? initialData.dauer.toString() : ''
  );
  const [gesehen, setGesehen] = useState(initialData.gesehen || false);
  
  // Serien-spezifische Felder
  const [staffel, setStaffel] = useState<string>(
    initialData.staffel ? initialData.staffel.toString() : ''
  );
  const [folge, setFolge] = useState<string>(
    initialData.folge ? initialData.folge.toString() : ''
  );
  
  // Buch-spezifische Felder
  const [autor, setAutor] = useState(initialData.autor || '');
  const [seitenanzahl, setSeitenanzahl] = useState<string>(
    initialData.seitenanzahl ? initialData.seitenanzahl.toString() : ''
  );
  const [gelesen, setGelesen] = useState(initialData.gelesen || false);
  
  // Lokal-spezifische Felder
  const [adresse, setAdresse] = useState(initialData.adresse || '');
  const [kategorie, setKategorie] = useState(initialData.kategorie || '');
  const [oeffnungszeiten, setOeffnungszeiten] = useState(initialData.oeffnungszeiten || '');
  const [webseite, setWebseite] = useState(initialData.webseite || '');
  const [telefon, setTelefon] = useState(initialData.telefon || '');
  const [besucht, setBesucht] = useState(initialData.besucht || false);
  
  // Rezept-spezifische Felder
  const [zubereitungszeit, setZubereitungszeit] = useState<string>(
    initialData.zubereitungszeit ? initialData.zubereitungszeit.toString() : ''
  );
  const [portionen, setPortionen] = useState<string>(
    initialData.portionen ? initialData.portionen.toString() : ''
  );
  const [quelle, setQuelle] = useState(initialData.quelle || '');
  const [ausprobiert, setAusprobiert] = useState(initialData.ausprobiert || false);
  
  // Notiz-spezifische Felder
  const [inhalt, setInhalt] = useState(initialData.inhalt || '');
  const [prioritaet, setPrioritaet] = useState<string>(
    initialData.prioritaet || 'mittel'
  );
  
  // Link-spezifische Felder
  const [url, setUrl] = useState(initialData.url || '');
  
  // Validierungszustände
  const [titelError, setTitelError] = useState<string | undefined>();
  const [inhaltError, setInhaltError] = useState<string | undefined>();
  const [urlError, setUrlError] = useState<string | undefined>();
  
  // Validierung beim Ändern des Titels
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
  
  // Validierung für Notiz-Inhalt
  const handleInhaltChange = (value: string) => {
    setInhalt(value);
    if (sammlungsTyp === SammlungsTyp.NOTIZ && value.trim().length === 0) {
      setInhaltError('Inhalt ist für Notizen erforderlich');
    } else {
      setInhaltError(undefined);
    }
  };
  
  // Validierung für URL
  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (sammlungsTyp === SammlungsTyp.LINK) {
      if (value.trim().length === 0) {
        setUrlError('URL ist erforderlich');
      } else if (!value.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)) {
        setUrlError('Ungültiges URL-Format');
      } else {
        setUrlError(undefined);
      }
    }
  };
  
  // Typenabhängige Felder rendern
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
              keyboardType="numeric"
              placeholder="z.B. 2022"
            />
            
            <TextField
              label="Genre"
              value={genre}
              onChangeText={setGenre}
              placeholder="z.B. Sci-Fi, Drama, Komödie"
            />
            
            <TextField
              label="Dauer in Minuten"
              value={dauer}
              onChangeText={setDauer}
              keyboardType="numeric"
              placeholder="z.B. 120"
            />
            
            <View style={styles.switchContainer}>
              <Text>Gesehen</Text>
              <Switch value={gesehen} onValueChange={setGesehen} />
            </View>
          </>
        );
        
      case SammlungsTyp.SERIE:
        return (
          <>
            <TextField
              label="Erscheinungsjahr"
              value={erscheinungsJahr}
              onChangeText={setErscheinungsJahr}
              keyboardType="numeric"
              placeholder="z.B. 2022"
            />
            
            <TextField
              label="Genre"
              value={genre}
              onChangeText={setGenre}
              placeholder="z.B. Sci-Fi, Drama, Komödie"
            />
            
            <View style={styles.row}>
              <View style={styles.halfField}>
                <TextField
                  label="Staffel"
                  value={staffel}
                  onChangeText={setStaffel}
                  keyboardType="numeric"
                  placeholder="z.B. 1"
                />
              </View>
              
              <View style={styles.halfField}>
                <TextField
                  label="Folge"
                  value={folge}
                  onChangeText={setFolge}
                  keyboardType="numeric"
                  placeholder="z.B. 1"
                />
              </View>
            </View>
            
            <View style={styles.switchContainer}>
              <Text>Gesehen</Text>
              <Switch value={gesehen} onValueChange={setGesehen} />
            </View>
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
              label="Erscheinungsjahr"
              value={erscheinungsJahr}
              onChangeText={setErscheinungsJahr}
              keyboardType="numeric"
              placeholder="z.B. 2022"
            />
            
            <TextField
              label="Genre"
              value={genre}
              onChangeText={setGenre}
              placeholder="z.B. Roman, Sachbuch"
            />
            
            <TextField
              label="Seitenanzahl"
              value={seitenanzahl}
              onChangeText={setSeitenanzahl}
              keyboardType="numeric"
              placeholder="z.B. 350"
            />
            
            <View style={styles.switchContainer}>
              <Text>Gelesen</Text>
              <Switch value={gelesen} onValueChange={setGelesen} />
            </View>
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
              placeholder="z.B. Mo-Fr 9-18 Uhr"
            />
            
            <TextField
              label="Webseite"
              value={webseite}
              onChangeText={setWebseite}
              placeholder="z.B. https://example.com"
              keyboardType="url"
            />
            
            <TextField
              label="Telefon"
              value={telefon}
              onChangeText={setTelefon}
              placeholder="z.B. +49 30 12345678"
              keyboardType="phone-pad"
            />
            
            <View style={styles.switchContainer}>
              <Text>Besucht</Text>
              <Switch value={besucht} onValueChange={setBesucht} />
            </View>
          </>
        );
        
      case SammlungsTyp.REZEPT:
        return (
          <>
            <TextField
              label="Zubereitungszeit (Minuten)"
              value={zubereitungszeit}
              onChangeText={setZubereitungszeit}
              keyboardType="numeric"
              placeholder="z.B. 30"
            />
            
            <TextField
              label="Portionen"
              value={portionen}
              onChangeText={setPortionen}
              keyboardType="numeric"
              placeholder="z.B. 4"
            />
            
            <TextField
              label="Quelle"
              value={quelle}
              onChangeText={setQuelle}
              placeholder="z.B. Kochbuch Seite 42, Website"
            />
            
            <View style={styles.switchContainer}>
              <Text>Bereits ausprobiert</Text>
              <Switch value={ausprobiert} onValueChange={setAusprobiert} />
            </View>
          </>
        );
        
      case SammlungsTyp.NOTIZ:
        return (
          <>
            <TextField
              label="Inhalt"
              value={inhalt}
              onChangeText={handleInhaltChange}
              error={inhaltError}
              multiline
              numberOfLines={4}
              autoGrow
              placeholder="Text der Notiz"
            />
            
            <SelectInput
              label="Priorität"
              value={prioritaet}
              onChange={(value) => setPrioritaet(value)}
              options={[
                { value: 'niedrig', label: 'Niedrig', icon: 'arrow-down' },
                { value: 'mittel', label: 'Mittel', icon: 'minus' },
                { value: 'hoch', label: 'Hoch', icon: 'arrow-up' }
              ]}
            />
          </>
        );
        
      case SammlungsTyp.LINK:
        return (
          <>
            <TextField
              label="URL"
              value={url}
              onChangeText={handleUrlChange}
              error={urlError}
              placeholder="https://example.com"
              keyboardType="url"
            />
          </>
        );
        
      default:
        return null;
    }
  };
  
  // Formular absenden
  const handleSubmit = () => {
    // Validierung vor dem Absenden
    if (!titel.trim()) {
      setTitelError('Titel ist erforderlich');
      return;
    }
    
    if (sammlungsTyp === SammlungsTyp.NOTIZ && !inhalt.trim()) {
      setInhaltError('Inhalt ist für Notizen erforderlich');
      return;
    }
    
    if (sammlungsTyp === SammlungsTyp.LINK && !url.trim()) {
      setUrlError('URL ist erforderlich');
      return;
    }
    
    // Grunddaten
    const formData: ErinnerungFormData = {
      titel: titel.trim(),
      notizen: notizen.trim() || undefined,
      tags: tags.length > 0 ? tags : undefined,
    };
    
    // Typspezifische Daten hinzufügen
    if (sammlungsTyp === SammlungsTyp.FILM) {
      formData.regisseur = regisseur.trim() || undefined;
      formData.erscheinungsJahr = erscheinungsJahr ? parseInt(erscheinungsJahr, 10) : undefined;
      formData.genre = genre.trim() || undefined;
      formData.dauer = dauer ? parseInt(dauer, 10) : undefined;
      formData.gesehen = gesehen;
    } 
    else if (sammlungsTyp === SammlungsTyp.SERIE) {
      formData.erscheinungsJahr = erscheinungsJahr ? parseInt(erscheinungsJahr, 10) : undefined;
      formData.genre = genre.trim() || undefined;
      formData.staffel = staffel ? parseInt(staffel, 10) : undefined;
      formData.folge = folge ? parseInt(folge, 10) : undefined;
      formData.gesehen = gesehen;
    }
    else if (sammlungsTyp === SammlungsTyp.BUCH) {
      formData.autor = autor.trim() || undefined;
      formData.erscheinungsJahr = erscheinungsJahr ? parseInt(erscheinungsJahr, 10) : undefined;
      formData.genre = genre.trim() || undefined;
      formData.seitenanzahl = seitenanzahl ? parseInt(seitenanzahl, 10) : undefined;
      formData.gelesen = gelesen;
    }
    else if (sammlungsTyp === SammlungsTyp.LOKAL) {
      formData.adresse = adresse.trim() || undefined;
      formData.kategorie = kategorie.trim() || undefined;
      formData.oeffnungszeiten = oeffnungszeiten.trim() || undefined;
      formData.webseite = webseite.trim() || undefined;
      formData.telefon = telefon.trim() || undefined;
      formData.besucht = besucht;
    }
    else if (sammlungsTyp === SammlungsTyp.REZEPT) {
      formData.zubereitungszeit = zubereitungszeit ? parseInt(zubereitungszeit, 10) : undefined;
      formData.portionen = portionen ? parseInt(portionen, 10) : undefined;
      formData.quelle = quelle.trim() || undefined;
      formData.ausprobiert = ausprobiert;
    }
    else if (sammlungsTyp === SammlungsTyp.NOTIZ) {
      formData.inhalt = inhalt.trim();
      formData.prioritaet = prioritaet as 'niedrig' | 'mittel' | 'hoch';
    }
    else if (sammlungsTyp === SammlungsTyp.LINK) {
      formData.url = url.trim();
    }
    
    onSubmit(formData);
  };
  
  return (
    <ScrollView contentContainerStyle={styles.formContainer}>
      <TextField
        label="Titel"
        value={titel}
        onChangeText={handleTitelChange}
        error={titelError}
        placeholder="Titel der Erinnerung"
        maxLength={100}
      />
      
      {renderTypeSpecificFields()}
      
      <TagInput
        label="Tags"
        value={tags}
        onChangeTags={setTags}
        placeholder="Tags hinzufügen..."
        maxTags={10}
      />
      
      {sammlungsTyp !== SammlungsTyp.NOTIZ && (
        <TextField
          label="Notizen"
          value={notizen}
          onChangeText={setNotizen}
          multiline
          numberOfLines={3}
          autoGrow
          placeholder="Zusätzliche Notizen (optional)"
        />
      )}
      
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
          disabled={
            isSubmitting ||
            !!titelError ||
            !!inhaltError ||
            !!urlError ||
            titel.trim().length === 0 ||
            (sammlungsTyp === SammlungsTyp.NOTIZ && inhalt.trim().length === 0) ||
            (sammlungsTyp === SammlungsTyp.LINK && url.trim().length === 0)
          }
        />
      </View>
      
      <Spacer size="xl" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfField: {
    width: '48%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
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
