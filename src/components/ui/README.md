# UI-Komponenten-Dokumentation

## Übersicht

Die Goldfisch-App verwendet React Native Paper als UI-Bibliothek, um ein konsistentes und modernes Erscheinungsbild zu gewährleisten. Die Komponenten wurden angepasst, um den spezifischen Anforderungen der App gerecht zu werden.

## Theme

Das App-Theme ist in `src/constants/theme.ts` definiert und basiert auf dem Material Design 3 Light Theme. Es definiert:

- Farben (primary, secondary, accent, etc.)
- Schriftarten und Typografie
- Abstände (SPACING)
- Schattenstile (SHADOWS)
- Border-Radien (BORDER_RADIUS)
- Animationsgeschwindigkeiten (ANIMATION)
- Z-Index-Werte (Z_INDEX)

## Basis-Komponenten

### Input

Eine TextInput-Komponente mit flotierendem Label, basierend auf der TextInput-Komponente von React Native Paper.

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
- `right`, `left`: Optional. Elemente, die rechts oder links im Eingabefeld angezeigt werden
- `onBlur`, `onFocus`: Optional. Funktionen, die beim Verlassen oder Fokussieren des Eingabefelds aufgerufen werden
- `onSubmitEditing`: Optional. Funktion, die beim Abschicken aufgerufen wird
- `blurOnSubmit`: Optional. Ob der Fokus nach dem Abschicken entfernt werden soll
- `returnKeyType`: Optional. Typ der Eingabetaste
- `autoComplete`: Optional. Vorschläge für Autovervollständigung
- `clearButton`: Optional. Ob ein Button zum Löschen angezeigt werden soll
- `outlineColor`, `activeOutlineColor`: Optional. Farben für den Rahmen

### Button

Eine Button-Komponente basierend auf der Button-Komponente von React Native Paper.

**Eigenschaften:**

- `title`: Text des Buttons
- `onPress`: Funktion, die beim Drücken des Buttons aufgerufen wird
- `mode`: Optional. Darstellungsmodus des Buttons ('text', 'outlined', 'contained', 'elevated', 'contained-tonal')
- `color`: Optional. Farbe des Buttons
- `loading`: Optional. Ob der Button einen Ladeindikator anzeigt
- `disabled`: Optional. Ob der Button deaktiviert ist
- `icon`: Optional. Name des Icons, das im Button angezeigt wird
- `compact`: Optional. Ob der Button kompakt dargestellt wird
- `style`: Optional. Zusätzliche Styles für den Button
- `contentStyle`: Optional. Styles für den Inhalt des Buttons
- `labelStyle`: Optional. Styles für den Text des Buttons
- `uppercase`: Optional. Ob der Text in Großbuchstaben dargestellt werden soll

### Card

Eine Card-Komponente basierend auf der Card-Komponente von React Native Paper.

**Eigenschaften:**

- `title`: Titel der Karte
- `subtitle`: Optional. Untertitel der Karte
- `onPress`: Optional. Funktion, die beim Drücken der Karte aufgerufen wird
- `children`: Optional. Inhalt der Karte
- `leftIcon`: Optional. Name des Icons, das links in der Karte angezeigt wird
- `rightIcon`: Optional. Name des Icons, das rechts in der Karte angezeigt wird
- `onRightIconPress`: Optional. Funktion, die beim Drücken des rechten Icons aufgerufen wird
- `coverImage`: Optional. URL des Titelbilds der Karte
- `style`: Optional. Zusätzliche Styles für die Karte
- `contentStyle`: Optional. Zusätzliche Styles für den Inhalt der Karte
- `titleStyle`, `subtitleStyle`: Optional. Styles für Titel und Untertitel
- `disabled`: Optional. Ob die Karte deaktiviert ist
- `elevation`: Optional. Höhe der Karte (0-5)
- `actions`: Optional. Aktions-Buttons am unteren Rand der Karte

### Tag

Eine Chip-Komponente für Tags, basierend auf der Chip-Komponente von React Native Paper.

**Eigenschaften:**

- `label`: Text des Tags
- `onPress`: Optional. Funktion, die beim Drücken des Tags aufgerufen wird
- `onClose`: Optional. Funktion, die beim Schließen des Tags aufgerufen wird
- `selected`: Optional. Ob das Tag ausgewählt ist
- `disabled`: Optional. Ob das Tag deaktiviert ist
- `style`: Optional. Zusätzliche Styles für das Tag

### TagContainer

Ein Container für mehrere Tags, der die Tags in Zeilen anordnet.

**Eigenschaften:**

- `children`: Die Tags, die im Container angezeigt werden sollen
- `style`: Optional. Zusätzliche Styles für den Container

## Layout-Komponenten

### Container

Ein Container für den gesamten Bildschirminhalt.

**Eigenschaften:**

- `children`: Der Inhalt des Containers
- `style`: Optional. Zusätzliche Styles für den Container
- `padding`: Optional. Ob der Container einen Innenabstand haben soll
- `center`: Optional. Ob der Inhalt zentriert werden soll
- `testID`: Optional. ID für Tests

### ScrollContainer

Ein scrollbarer Container für längere Inhalte.

**Eigenschaften:**

- `children`: Der Inhalt des Containers
- `style`: Optional. Zusätzliche Styles für den Container
- `contentContainerStyle`: Optional. Styles für den Inhaltscontainer
- `padding`: Optional. Ob der Container einen Innenabstand haben soll
- `keyboardAware`: Optional. Ob der Container auf die Tastatur reagieren soll
- `refreshControl`: Optional. Pull-to-Refresh-Komponente
- `testID`: Optional. ID für Tests

### Row

Ein Container für horizontale Anordnung von Elementen.

**Eigenschaften:**

- `children`: Die Elemente in der Zeile
- `style`: Optional. Zusätzliche Styles für den Container
- `justify`: Optional. Horizontale Ausrichtung der Elemente
- `align`: Optional. Vertikale Ausrichtung der Elemente
- `wrap`: Optional. Ob die Elemente umbrechen sollen
- `testID`: Optional. ID für Tests

### Spacer

Eine Komponente für Abstände zwischen Elementen.

**Eigenschaften:**

- `size`: Optional. Größe des Abstands ('xs', 'sm', 'md', 'lg', 'xl', 'xxl')
- `horizontal`: Optional. Ob der Abstand horizontal sein soll

## Utilities

### Theme-Utilities

In `constants/theme.ts` werden verschiedene Theme-Konstanten exportiert:

- `theme`: Das vollständige Theme-Objekt
- `SPACING`: Abstände für konsistente Layouts
- `FONT_SIZES`: Schriftgrößen für Typografie
- `BORDER_RADIUS`: Abrundungen für UI-Elemente
- `SHADOWS`: Vordefinierte Schattenstile
- `ANIMATION`: Animationsgeschwindigkeiten
- `Z_INDEX`: Stapelreihenfolge für Elemente

### Style-Utilities

In `utils/styles.ts` werden wiederverwendbare Styles exportiert:

- `Typography`: Textstile für Überschriften, Fließtext, etc.
- `Layout`: Layouts für Container, Zeilen, etc.
- `Components`: Stile für häufig verwendete Komponenten

### Color-Utilities

In `utils/colorUtils.ts` werden Funktionen für Farbmanipulationen exportiert:

- `hexToRgba`: Konvertiert HEX zu RGBA
- `lightenColor`: Hellt eine Farbe auf
- `darkenColor`: Dunkelt eine Farbe ab
- `generateColorVariants`: Erzeugt Farbvarianten
- `isLightColor`: Prüft, ob eine Farbe hell ist

## Verwendung

```jsx
import { 
  Button, 
  Card, 
  Input, 
  Tag, 
  TagContainer, 
  Container, 
  ScrollContainer, 
  Row, 
  Spacer 
} from '@/components/ui';

// Beispiel für ein Formular
function MyForm() {
  const [name, setName] = useState('');
  const [tags, setTags] = useState(['Wichtig', 'Dringend']);
  
  return (
    <Container>
      <ScrollContainer keyboardAware>
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
        
        <Spacer size="lg" />
        
        <Row justify="space-between">
          <Button
            title="Abbrechen"
            mode="outlined"
            onPress={handleCancel}
          />
          <Button
            title="Speichern"
            onPress={handleSave}
            disabled={!name}
          />
        </Row>
      </ScrollContainer>
    </Container>
  );
}

## Theme-Demo
Eine Live-Demo aller Theme-Komponenten und -Konstanten ist verfügbar unter `/theme-demo`.
