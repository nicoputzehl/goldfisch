
# UI-Komponenten-Dokumentation

## Übersicht

Die Goldfisch-App verwendet React Native Paper als UI-Bibliothek, um ein konsistentes und modernes Erscheinungsbild zu gewährleisten. Die Komponenten wurden angepasst, um den spezifischen Anforderungen der App gerecht zu werden.

## Theme

Das App-Theme ist in `src/constants/theme.ts` definiert und basiert auf dem Material Design 3 Light Theme. Es definiert:

- Farben
- Schriftarten
- Abstände
- Schattenstile

## Komponenten

### Input

Eine TextInput-Komponente mit flotierendem Label, die auf der TextInput-Komponente von React Native Paper basiert.

**Eigenschaften:**

- `label`: Text für das flotierende Label
- `value`: Aktueller Wert des Eingabefelds
- `onChangeText`: Funktion, die bei Änderung des Texts aufgerufen wird
- `error`: Optional. Fehlermeldung, die unter dem Eingabefeld angezeigt wird
- `secureTextEntry`: Optional. Ob das Eingabefeld für Passwörter verwendet wird
- `multiline`: Optional. Ob das Eingabefeld mehrzeilig sein soll
- `numberOfLines`: Optional. Anzahl der Zeilen für mehrzeilige Eingabefelder
- `keyboardType`: Optional. Art der Tastatur
- `autoCapitalize`: Optional. Automatische Großschreibung
- `maxLength`: Optional. Maximale Zeichenanzahl
- `placeholder`: Optional. Platzhaltertext
- `disabled`: Optional. Ob das Eingabefeld deaktiviert ist
- `right`: Optional. Element, das rechts im Eingabefeld angezeigt wird
- `onBlur`: Optional. Funktion, die beim Verlassen des Eingabefelds aufgerufen wird
- `onFocus`: Optional. Funktion, die beim Fokussieren des Eingabefelds aufgerufen wird
- `testID`: Optional. ID für Tests

### Button

Eine Button-Komponente basierend auf der Button-Komponente von React Native Paper.

**Eigenschaften:**

- `onPress`: Funktion, die beim Drücken des Buttons aufgerufen wird
- `title`: Text des Buttons
- `mode`: Optional. Darstellungsmodus des Buttons ('text', 'outlined', 'contained', 'elevated', 'contained-tonal')
- `color`: Optional. Farbe des Buttons
- `loading`: Optional. Ob der Button einen Ladeindikator anzeigt
- `disabled`: Optional. Ob der Button deaktiviert ist
- `icon`: Optional. Name des Icons, das im Button angezeigt wird
- `compact`: Optional. Ob der Button kompakt dargestellt wird
- `testID`: Optional. ID für Tests
- `style`: Optional. Zusätzliche Styles für den Button

### Card

Eine Card-Komponente basierend auf der Card-Komponente von React Native Paper.

**Eigenschaften:**

- `title`: Titel der Karte
- `subtitle`: Optional. Untertitel der Karte
- `onPress`: Optional. Funktion, die beim Drücken der Karte aufgerufen wird
- `children`: Optional. Inhalt der Karte
- `leftIcon`: Optional. Name des Icons, das links in der Karte angezeigt wird
- `rightIcon`: Optional. Name des Icons, das rechts in der Karte angezeigt wird
- `coverImage`: Optional. URL des Titelbilds der Karte
- `style`: Optional. Zusätzliche Styles für die Karte
- `contentStyle`: Optional. Zusätzliche Styles für den Inhalt der Karte
- `disabled`: Optional. Ob die Karte deaktiviert ist
- `testID`: Optional. ID für Tests

### Tag

Eine Chip-Komponente für Tags, basierend auf der Chip-Komponente von React Native Paper.

**Eigenschaften:**

- `label`: Text des Tags
- `onPress`: Optional. Funktion, die beim Drücken des Tags aufgerufen wird
- `onClose`: Optional. Funktion, die beim Schließen des Tags aufgerufen wird
- `selected`: Optional. Ob das Tag ausgewählt ist
- `disabled`: Optional. Ob das Tag deaktiviert ist
- `testID`: Optional. ID für Tests
- `style`: Optional. Zusätzliche Styles für das Tag

### TagContainer

Ein Container für mehrere Tags, der die Tags in Zeilen anordnet.

**Eigenschaften:**

- `children`: Die Tags, die im Container angezeigt werden sollen
- `style`: Optional. Zusätzliche Styles für den Container

## Verwendung

```jsx
import { Button, Card, Input, Tag, TagContainer } from '@/components/ui';

// Beispiel für ein Formular
function MyForm() {
  const [name, setName] = useState('');
  const [tags, setTags] = useState([]);
  
  return (
    <View>
      <Input
        label="Name"
        value={name}
        onChangeText={setName}
        error={name ? '' : 'Name ist erforderlich'}
      />
      
      <TagContainer>
        {tags.map(tag => (
          <Tag
            key={tag}
            label={tag}
            onClose={() => removeTag(tag)}
          />
        ))}
      </TagContainer>
      
      <Button
        title="Speichern"
        onPress={handleSave}
        disabled={!name}
      />
    </View>
  );
}
