# Aktuelle Entwicklungsstand

## Zusammenfassung Schritt 2: Grundlegende Navigation einrichten

### Implementierte Funktionalität

In Schritt 2 wurde die grundlegende Navigationsstruktur für die Goldfisch-App mit Expo Router v4 eingerichtet.

#### Hauptkomponenten

1. **Tab-Navigation** mit drei Haupttabs:
   - Sammlungen (Startseite)
   - Suche
   - Erfolge

2. **Stack-Navigation** für:
   - Sammlung erstellen
   - Sammlung anzeigen
   - Erinnerung erstellen

#### Erstellte Dateien und Verzeichnisse

```bash
app/
├── _layout.tsx                   # Haupt-App-Layout
├── (tabs)/                       # Tab-Navigation
│   ├── _layout.tsx               # Tab-Konfiguration
│   ├── index.tsx                 # Sammlungen-Tab
│   ├── suche.tsx                 # Suche-Tab
│   └── erfolge.tsx               # Erfolge-Tab
└── sammlung/
    ├── erstellen.tsx             # Neue Sammlung erstellen
    └── [id]/                     # Dynamische Route für Sammlungen
        ├── index.tsx             # Sammlungsdetails
        └── erinnerung/
            └── erstellen.tsx     # Neue Erinnerung erstellen

src/
└── contexts/
    └── AppProvider.tsx           # Context für globalen App-Zustand
```

### Konfigurationsänderungen

1. **babel.config.js**: Konfiguration für Modulo-Resolver und Reanimated
2. **app.json**: Hinzufügen von scheme "goldfischapp" für Deep Linking
3. **index.ts**: Einstiegspunkt für Expo Router

### UI-Komponenten

Alle Screens wurden als Platzhalter erstellt mit:

- Passenden Icons und Styling
- Leeren Zuständen für noch nicht vorhandene Daten
- Einfachen Formularen für Sammlung und Erinnerung erstellen

### Navigationsflüsse

1. **Hauptnavigation**: Wechseln zwischen den drei Tabs
2. **Sammlungsflow**:
   - Startseite -> "Neue Sammlung erstellen" -> Formular ausfüllen -> zurück zur Startseite
   - Startseite -> Sammlung auswählen -> Sammlungsdetails
3. **Erinnerungsflow**:
   - Sammlungsdetails -> "Erinnerung hinzufügen" -> Formular ausfüllen -> zurück zur Sammlungsdetails

### Abhängigkeiten

- expo-router
- expo-linking
- expo-constants
- @expo/vector-icons
- react-native-safe-area-context
- react-native-screens
- react-native-reanimated
- babel-plugin-module-resolver

### Nächste Schritte

Für den nächsten Schritt (Schritt 3: Datenmodell definieren) müssen die TypeScript-Interfaces für Sammlungen und Erinnerungen definiert werden, bevor mit der tatsächlichen Implementierung der Funktionalität begonnen wird.

## Datenmodell (Schritt 3)

### Übersicht

In Schritt 3 wurde das Datenmodell für die Goldfisch-App definiert. Dieses Modell bildet die Grundlage für die Speicherung und Verwaltung von Sammlungen und Erinnerungen innerhalb der App. Es besteht aus TypeScript-Interfaces und Typen, die eine typensichere Entwicklung ermöglichen.

### Implementierte Dateien

#### 1. Sammlung-Typen (`src/features/sammlung/types.ts`)

- **Basis-Interface `Sammlung`** mit Grundattributen:
  - id, name, type, erstelltAm, aktualisiertAm, etc.
- **Enum `SammlungsTyp`** mit Kategorien:
  - FILM, SERIE, BUCH, LOKAL, REZEPT, NOTIZ, LINK, ANDERE
- **Typ-spezifische Interfaces** für jede Kategorie:
  - `FilmSammlung`, `SerieSammlung`, `BuchSammlung`, etc.
- **Input-Interfaces** für CRUD-Operationen:
  - `CreateSammlungInput`, `UpdateSammlungInput`

#### 2. Erinnerung-Typen (`src/features/erinnerung/types.ts`)

- **Basis-Interface `Erinnerung`** mit gemeinsamen Eigenschaften:
  - id, sammlungId, titel, tags, erstelltAm, etc.
- **Spezialisierte Interfaces** für jeden Erinnerungstyp:
  - `FilmErinnerung`, `SerieErinnerung`, `BuchErinnerung`, etc.
- **Input-Interfaces** für CRUD-Operationen:
  - `CreateErinnerungInput`, `UpdateErinnerungInput`

#### 3. Konstanten für Typen (`src/constants/typen.ts`)

- **`SAMMLUNGS_TYP_FELDER`**: Record-Objekt mit Metadaten für jeden Sammlungstyp:
  - pflichtFelder, optionaleFelder, typName, icon, beschreibung
- **`ERINNERUNGS_TYP_FELDER`**: Record-Objekt mit Metadaten für jeden Erinnerungstyp:
  - pflichtFelder, optionaleFelder
- **`VERFUEGBARE_SAMMLUNGSTYPEN`**: Liste aller Sammlungstypen für die UI

#### 4. Such- und Tag-System (`src/features/suche/types.ts`)

- **Interface `Tag`** für das Tag-System
- **Interface `ErinnerungTag`** für die Beziehung zwischen Erinnerungen und Tags
- **Verschiedene Suchparameter-Interfaces**:
  - `SuchParameter`, `DatumsSuchParameter`, `ErweiterteSuchParameter`, etc.

#### 5. App-Context (`src/contexts/AppProvider.tsx`)

- **Context-Definition** mit Zuständen für Sammlungen und Erinnerungen
- **Mock-Daten** für die Entwicklungsphase
- **Hook `useApp()`** für einfachen Zugriff auf den Context

### Beziehungen im Datenmodell

- **Sammlung enthält Erinnerungen**: Eine Sammlung kann mehrere Erinnerungen enthalten
- **Typ-Abhängigkeit**: Der Typ einer Sammlung bestimmt die Struktur der enthaltenen Erinnerungen
- **Tags verknüpfen Erinnerungen**: Tags können über verschiedene Sammlungen hinweg Erinnerungen verbinden

### Beispiel für eine Sammlung vom Typ "Film"

```typescript
const filmSammlung: FilmSammlung = {
  id: '1',
  name: 'Meine Filme',
  type: SammlungsTyp.FILM,
  erstelltAm: new Date(),
  aktualisiertAm: new Date(),
  plattform: 'Netflix'
};
```

### Beispiel für eine Erinnerung vom Typ "Film"

```typescript
const filmErinnerung: FilmErinnerung = {
  id: '1',
  sammlungId: '1',
  sammlungsTyp: SammlungsTyp.FILM,
  titel: 'Inception',
  erstelltAm: new Date(),
  aktualisiertAm: new Date(),
  tags: ['Sci-Fi', 'Christopher Nolan'],
  regisseur: 'Christopher Nolan',
  erscheinungsJahr: 2010,
  dauer: 148,
  gesehen: true,
  bewertung: 5
};
```

### Nächste Schritte (Stand 3)

Das Datenmodell ist nun vollständig definiert. Der nächste Schritt (Schritt 4) besteht in der Implementierung der Datenbankabstraktion, um mit diesen Typen tatsächlich Daten zu speichern und abzurufen.

## Schritt 4: Datenbankabstraktion - Zusammenfassung

### Implementierte Komponenten

In Schritt 4 (Unterpunkte 1-3) der Goldfisch-App-Entwicklung wurde die Datenbankabstraktion implementiert. Dazu wurden folgende Dateien erstellt:

#### 1. `src/services/storage/database.ts`

Diese Datei enthält die zentrale Abstraktionsklasse `Database`, die eine einheitliche Schnittstelle für den Zugriff auf AsyncStorage bietet. Die Klasse implementiert folgende Funktionen:

- **`set<T>(id, data)`**: Speichert Daten mit einer bestimmten ID
- **`get<T>(id)`**: Ruft Daten anhand einer ID ab
- **`remove(id)`**: Löscht Daten anhand einer ID
- **`getAll<T>()`**: Ruft alle Daten mit einem bestimmten Präfix ab
- **`update<T>(id, updateFn)`**: Aktualisiert Daten mit einer Aktualisierungsfunktion
- **`query<T>(predicate)`**: Filtert Daten anhand einer Prüffunktion
- **`clear()`**: Löscht alle Daten mit einem bestimmten Präfix

Die Klasse verwendet einen Präfix-Mechanismus, um verschiedene Datentypen zu trennen. Am Ende der Datei werden Singleton-Instanzen für verschiedene Datentypen exportiert:

```typescript
export const sammlungDB = new Database('sammlung');
export const erinnerungDB = new Database('erinnerung');
export const tagDB = new Database('tag');
```

#### 2. `src/services/storage/sammlungStorage.ts`

Dieser Service implementiert spezifische Operationen für Sammlungen und nutzt dabei die Datenbankabstraktion. Die wichtigsten Funktionen sind:

- **`create(input)`**: Erstellt eine neue Sammlung mit generierter ID und Zeitstempeln
- **`getById(id)`**: Ruft eine Sammlung anhand ihrer ID ab
- **`getAll()`**: Ruft alle Sammlungen ab (sortiert nach Erstellungsdatum)
- **`update(id, updates)`**: Aktualisiert eine Sammlung
- **`delete(id)`**: Löscht eine Sammlung
- **`searchByName(suchbegriff)`**: Sucht nach Sammlungen anhand des Namens
- **`count()`**: Zählt die Anzahl der Sammlungen

#### 3. `src/services/storage/erinnerungStorage.ts`

Dieser Service implementiert spezifische Operationen für Erinnerungen und nutzt dabei die Datenbankabstraktion. Die wichtigsten Funktionen sind:

- **`create(input)`**: Erstellt eine neue Erinnerung mit generierter ID und Zeitstempeln
- **`getById(id)`**: Ruft eine Erinnerung anhand ihrer ID ab
- **`getAll()`**: Ruft alle Erinnerungen ab
- **`getBySammlung(sammlungId)`**: Ruft alle Erinnerungen einer bestimmten Sammlung ab
- **`update(id, updates)`**: Aktualisiert eine Erinnerung
- **`markAsSuccess(id)`**: Markiert eine Erinnerung als erfolgreich
- **`moveToSammlung(id, neueSammlungId)`**: Verschiebt eine Erinnerung in eine andere Sammlung
- **`delete(id)`**: Löscht eine Erinnerung
- **`deleteBySammlung(sammlungId)`**: Löscht alle Erinnerungen einer Sammlung
- **`searchByTitle(suchbegriff)`**: Sucht nach Erinnerungen anhand des Titels
- **`searchByTags(tags)`**: Sucht nach Erinnerungen anhand von Tags
- **`getSuccessful()`**: Ruft alle erfolgreichen Erinnerungen ab
- **`countBySammlung(sammlungId)`**: Zählt die Anzahl der Erinnerungen in einer Sammlung

### Besondere Implementierungsdetails

1. **Typensicherheit**: Alle Funktionen sind mit TypeScript-Generics implementiert, um Typensicherheit zu gewährleisten.
2. **ID-Generierung**: Die Services generieren eindeutige IDs basierend auf Timestamp und Zufallszahl.
3. **Zeitstempel**: Automatische Verwaltung von `erstelltAm` und `aktualisiertAm` Zeitstempeln.
4. **Fehlerbehandlung**: Alle Datenbankoperationen sind mit Try-Catch-Blöcken und aussagekräftigen Fehlermeldungen versehen.
5. **Datenfilterung und -sortierung**: Implementierung von Filterfunktionen und Sortierlogik.

### Designprinzipien

Die Implementierung folgt diesen Prinzipien:

- **Abstraktion**: Klare Trennung zwischen Datenbankzugriff und Geschäftslogik
- **Single Responsibility**: Jede Klasse und Funktion hat eine klar definierte Verantwortung
- **DRY (Don't Repeat Yourself)**: Wiederverwendung von Code durch Abstraktion
- **Erweiterbarkeit**: Die Struktur erlaubt einfaches Hinzufügen neuer Funktionen und Datentypen

### Nächste Schritte (Stand 4)

Die Datenbankabstraktion bildet die Grundlage für die zukünftige Implementierung von:

- UI-Komponenten, die diese Services nutzen
- Feature-spezifischen Hooks, die die Datenbank-Services verwenden
- Geschäftslogik, die auf dieser Datenzugriffsschicht aufbaut

Der nächste Schritt wäre die Entwicklung der UI-Bibliothek und der Basis-UI-Komponenten (Schritt 5).

### Codebeispiel: Einfache Verwendung

```typescript
// Beispiel für die Verwendung in einem Hook
async function useSammlungen() {
  const [sammlungen, setSammlungen] = useState<SammlungTypen[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadSammlungen = async () => {
      try {
        const alleSammlungen = await sammlungStorage.getAll();
        setSammlungen(alleSammlungen);
      } catch (error) {
        console.error('Fehler beim Laden der Sammlungen', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSammlungen();
  }, []);
  
  return { sammlungen, isLoading };
}
```

## Implementierung der Speicher-Services (Schritt 4.4-4.5)

### Übersicht (4.4 - 4.5)

In Schritt 4, Unterpunkte 4-5 der Goldfisch-App-Entwicklung wurden die Speicher-Services für Sammlungen und Erinnerungen implementiert und erweitert. Die grundlegende Datenbankabstraktion in `database.ts` wurde um spezialisierte Services ergänzt, die das Speichern, Abrufen, Aktualisieren und Löschen von Sammlungen und Erinnerungen ermöglichen.

### Implementierte Komponenten (4.4 - 4.5)

#### 1. Tag-Storage Service (`tagStorage.ts`)

Dieser Service ermöglicht die Verwaltung von Tags und deren Verknüpfungen mit Erinnerungen:

- **Funktionen für Tags**: Erstellen, Abrufen und Löschen von Tags
- **Verknüpfungsfunktionen**: Verbinden und Trennen von Tags mit Erinnerungen
- **Suchfunktionen**: Abrufen von Erinnerungen mit bestimmten Tags und umgekehrt

#### 2. Erweiterte Sammlungsfunktionen (`sammlungExtendedStorage.ts`)

Diese Erweiterung für den Sammlungs-Storage bietet zusätzliche Funktionen für komplexere Anwendungsfälle:

- **Titelbild-Verwaltung**: Aktualisieren von Titelbildern für Sammlungen
- **Komplexe Löschoperationen**: Löschen einer Sammlung inkl. aller zugehörigen Erinnerungen
- **Statistik-Funktionen**: Berechnen von Zusammenfassungen und Statistiken für Sammlungen
- **Sortier- und Filterfunktionen**: Sortieren und Filtern von Sammlungslisten

#### 3. Erweiterte Erinnerungsfunktionen (`erinnerungExtendedStorage.ts`)

Diese Erweiterung für den Erinnerungs-Storage bietet zusätzliche Funktionen zur Verwaltung von Erinnerungen:

- **Duplizieren**: Erstellen von Kopien bestehender Erinnerungen
- **Bild-Verwaltung**: Hinzufügen und Entfernen von Bildern
- **Tag-Management**: Hinzufügen, Entfernen und Aktualisieren von Tags
- **Erinnerungsdatum-Verwaltung**: Setzen und Entfernen von Erinnerungsdaten
- **Erfolgsmarkierung**: Markieren und Aufheben der Erfolgsmarkierung von Erinnerungen

#### 4. Benachrichtigungsservice (`notifications/index.ts`)

Ein Service zur Verwaltung von Benachrichtigungen für Erinnerungen mit Erinnerungsdatum:

- **Initialisierung**: Anfordern und Prüfen von Berechtigungen
- **Benachrichtigungsplanung**: Planen und Aktualisieren von Benachrichtigungen
- **Aktualisierungsfunktionen**: Aktualisieren von Benachrichtigungen für Erinnerungen
- **Batch-Operationen**: Massenaktualisierung aller bevorstehenden Benachrichtigungen

#### 5. Typdefinitionen für die Suche (`suche/types.ts`)

Definition von Interfaces für das Such- und Tag-System:

- **Tag-Interface**: Definition eines Tag-Objekts
- **Verknüpfungs-Interface**: Definition der Beziehung zwischen Tags und Erinnerungen
- **Suchparameter-Interfaces**: Definition verschiedener Suchparameter
- **Suchergebnis-Interface**: Definition des Formats für Suchergebnisse

### Besondere Implementierungsdetails (4.4 - 4.5)

1. **Typensicherheit**: Alle Services sind vollständig mit TypeScript-Typen implementiert, um Typensicherheit zu gewährleisten.
2. **Erweiterbares Datenmodell**: Verwendung von Intersection Types (`&`) für die Erweiterung von Basistypen, z.B. für Erinnerungen mit Erinnerungsdatum.
3. **Fehlerbehandlung**: Umfassende Fehlerbehandlung mit Try-Catch-Blöcken und aussagekräftigen Fehlermeldungen.
4. **ID-Generierung**: Einheitliche ID-Generierung basierend auf Timestamp und Zufallszahlen.
5. **Kompatibilität mit Expo**: Anpassung an die Expo-Notifications-API für die Benachrichtigungsfunktionalität.

### Erweiterungsmöglichkeiten

Die implementierten Services bieten bereits eine umfangreiche Funktionalität, können aber in Zukunft weiter ausgebaut werden:

1. **Indizierung für bessere Suchperformance**
2. **Batch-Operationen für mehrere Erinnerungen/Sammlungen**
3. **Export/Import-Funktionen für Datensicherung**
4. **Komplexere Filterkriterien für die erweiterte Suche**

### Zusammenfassung

Mit diesen Implementierungen ist Schritt 4 der Goldfisch-App-Entwicklung abgeschlossen. Die Speicher-Services bieten eine solide Grundlage für die weiteren Entwicklungsschritte, insbesondere für die Implementierung der UI-Komponenten und Features, die diese Datenbank-Services nutzen werden.

## UI-Bibliothek Implementierung - Schritt 5.1

### Was wurde implementiert

Für Schritt 5.1 des Entwicklungsplans der Goldfisch-App wurde eine UI-Bibliothek mit flotierenden Labels ausgewählt und implementiert.

#### Verwendete Bibliothek

- **React Native Paper**: Eine Material Design-Bibliothek für React Native mit flotierenden Labels und einer umfangreichen Komponentensammlung

#### Kernkomponenten

1. **Theme-System**:
   - Anpassbares Farbschema basierend auf Material Design 3
   - Vordefinierte Abstände, Schriftgrößen und Schattenstile
   - Zentrale Theme-Konfiguration in `constants/theme.ts`

2. **UI-Komponenten**:
   - **Input**: Textfeld mit flotierendem Label und Fehleranzeige
   - **Button**: Anpassbarer Button mit verschiedenen Modi
   - **Card**: Karten-Komponente für Sammlungen und Erinnerungen
   - **Tag**: Chip-Komponente für die Tag-Darstellung
   - **TagContainer**: Flexibler Container für mehrere Tags

3. **Paper-Provider Integration**:
   - Der PaperProvider wurde in den bestehenden AppProvider integriert
   - Alle Komponenten haben nun Zugriff auf das zentrale Theme

### Technische Details

1. **Installierte Pakete**:

   ```bash
   react-native-paper
   react-native-vector-icons
   expo-build-properties
   ```

2. **Angepasstes Theme**:
   - Primärfarbe: #3498db (Blau)
   - Sekundärfarbe: #2ecc71 (Grün)
   - Akzentfarbe: #f1c40f (Gelb)
   - Abgerundete Ecken: 8px
   - Vordefinierte Abstände und Schatten

3. **Komponenten-API**:
   - Alle Komponenten haben eine konsistente, gut dokumentierte API
   - TypeScript-Typunterstützung für alle Props
   - Fehlerbehandlung und Barrierefreiheit integriert

4. **Dokumentation**:
   - Eine umfassende Dokumentation aller UI-Komponenten wurde erstellt
   - Beispiele für die Verwendung jeder Komponente

### Nächste Schritte nach 5.1

Nach erfolgreichem Abschluss von Schritt 5.1 können die nächsten Teilschritte angegangen werden:

1. Theme-Konfiguration weiter verfeinern (Schritt 5.2)
2. Weitere Basis-UI-Komponenten anpassen (Schritt 5.3)
3. Spezielle Komponenten für die Goldfisch-App entwickeln (Schritt 5.4)

Die implementierte UI-Bibliothek bildet nun eine solide Grundlage für die Entwicklung der Sammlung- und Erinnerung-Features in den folgenden Schritten.

## Schritt 5.2: Theme-Konfiguration Implementierung

### Übersicht 5.2

In Schritt 5.2 wurde eine umfassende Theme-Konfiguration für die Goldfisch-App entwickelt, die als Grundlage für ein konsistentes UI-Design dient. Die Implementierung umfasst ein erweitertes Farbschema, Typografie-Definitionen, Abstände, Schatten und weitere Design-Konstanten.

### Implementierte Komponenten 5.2

#### 1. Erweiterte Theme-Konfiguration (`src/constants/theme.ts`)

- **Umfassende Farbpalette**: Definition von primären, sekundären und Akzentfarben mit Abstufungen
- **Typografie-Konfiguration**: Komplette Schriftdefinitionen mit unterschiedlichen Gewichtungen
- **Spacing-System**: Konsistente Abstände für das gesamte UI
- **Border-Radius-System**: Standardisierte Abrundungen für UI-Elemente
- **Schatten-System**: Verschiedene Schattenstärken für Tiefeneffekte
- **Animationsgeschwindigkeiten**: Konstanten für UI-Animationen
- **Z-Index-Management**: Werte für die Schichtung von UI-Elementen

#### 2. Hilfsfunktionen für Farben (`src/utils/colorUtils.ts`)

- Funktionen für die Umwandlung von HEX zu RGBA-Farben
- Utilities zum Aufhellen und Abdunkeln von Farben
- Generator für transparente Farbvarianten

#### 3. Typografie-Utilities (`src/utils/typography.ts`)

- Textgrößen und -stile für die gesamte App
- Funktion zur konsistenten Erstellung von Textstilen
- Vordefinierte Stile für Überschriften, Fließtext, etc.

#### 4. Layout-Utilities (`src/utils/layout.ts`)

- Flex-Konfigurationen für häufige Layout-Muster
- Ausrichtungs- und Positionierungsstile
- Abstands- und Container-Definitionen

#### 5. Gemeinsame Stile (`src/utils/styles.ts`)

- Stilkombinationen aus Theme, Typography und Layout
- Vordefinierte Stile für häufig verwendete UI-Elemente

#### 6. ThemeProvider (`src/contexts/ThemeProvider.tsx`)

- Kontext-Provider für den Zugriff auf das Theme
- Infrastruktur für zukünftige Theme-Umschaltung (z.B. Dark Mode)
- Hook für einfachen Zugriff auf das Theme

#### 7. Theme-Demo-Komponente (`src/components/ui/ThemeDemo.tsx`)

- Visuelle Darstellung aller Theme-Elemente
- Demo für Farben, Typografie, Abstände, etc.
- Hilfreich für UI-Design-Entscheidungen

#### 8. Theme-Demo-Screen (`app/theme-demo.tsx`)

- Separater Screen zum Testen des Themes
- Zugänglich über die Navigation

### Änderungen an bestehenden Dateien

1. **AppProvider.tsx**: Jetzt verwendet ThemeProvider statt direkt PaperProvider
2. **UI-Komponenten-Index**: Export der Theme-Utilities für einfachen Zugriff

### Vorteile der Implementierung

- **Konsistenz**: Einheitliches Design in der gesamten App
- **Wartbarkeit**: Zentrale Stelle für Design-Änderungen
- **Entwicklungsgeschwindigkeit**: Vordefinierte Stile beschleunigen die Entwicklung
- **Skalierbarkeit**: Einfache Erweiterung um neue Design-Elemente

### Nächste Schritte nach 5.2

Nach Abschluss von Schritt 5.2 (Theme-Konfiguration) können nun die bestehenden UI-Komponenten mit dem neuen Theme-System aktualisiert werden (Schritt 5.3). Die konsistente Design-Sprache wird die Benutzererfahrung verbessern und die App-Entwicklung beschleunigen.

### Code-Beispiel: Verwendung des Themes

```typescript
import { StyleSheet } from 'react-native';
import { theme, SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';
import { Typography, Layout } from '@/utils/styles';

const styles = StyleSheet.create({
  container: {
    ...Layout.container,
    backgroundColor: theme.colors.background,
  },
  title: {
    ...Typography.h2,
    color: theme.colors.primary,
    marginBottom: SPACING.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
});
```

## Zusammenfassung: Schritt 5.3 - Basis-UI-Komponenten anpassen

### Überblick 5.3

Im Schritt 5.3 wurden die grundlegenden UI-Komponenten der Goldfisch-App implementiert und an das Theme-System angepasst. Die Komponenten basieren auf React Native Paper und wurden erweitert, um den spezifischen Anforderungen der App gerecht zu werden.

### Implementierte Komponenten (Stand 5.3)

#### 1. Button

Eine erweiterte Version der Paper-Button-Komponente mit zusätzlichen Features:

- Angepasstes Styling basierend auf dem App-Theme
- Erweiterte Props für bessere Kontrolle (contentStyle, labelStyle, uppercase)
- Konsistente Abstandsgestaltung

#### 2. Input

Eine erweiterte TextInput-Komponente mit flotierendem Label:

- Forward Ref für programmatischen Zugriff
- Unterstützung für Fehlerdarstellung
- Optionale Icons links und rechts
- Clear-Button-Funktion
- Multiline-Unterstützung
- Anpassbare Farben für den Outline-Modus

#### 3. Card

Eine angepasste Card-Komponente für Sammlungen und Erinnerungen:

- Titel- und Untertitelbereich
- Unterstützung für linke und rechte Icons
- Cover-Bild-Option
- Anpassbare Elevation
- Action-Bereich für Buttons

#### 4. Layout-Komponenten

Zusätzliche Layout-Utilities für konsistente UI-Implementierung:

- `Container`: Basis-Container für Screens
- `ScrollContainer`: Scrollbarer Container mit Keyboard-Avoiding-Funktion
- `Row`: Flexbox-Row mit anpassbaren Justify- und Align-Eigenschaften
- `Spacer`: Komponent für konsistente Abstände

#### 5. Tag/TagContainer

Komponenten für die Darstellung und Verwaltung von Tags:

- `Tag`: Chip-basierte Komponente für einzelne Tags
- `TagContainer`: Container für mehrere Tags mit Flex-Wrap

### Utility-Funktionen und Styles

#### ColorUtils

Funktionen zur Farbmanipulation wurden implementiert:

- HEX zu RGBA Konvertierung
- Farbe aufhellen/abdunkeln
- Farbvariantengenerierung
- Helligkeitserkennung

#### Styles-Utilities

Wiederverwendbare Style-Patterns wurden definiert:

- Typografie-Stile für konsistente Textdarstellung
- Layout-Stile für häufig verwendete Layouts
- Komponentenstile für wiederkehrende UI-Elemente

### Theme-Integration

Alle Komponenten wurden in das zentrale Theme-System integriert und nutzen:

- Farbpalette aus theme.colors
- Abstände aus SPACING
- Schattenstile aus SHADOWS
- Border-Radien aus BORDER_RADIUS

### Dokumentation

Eine umfassende README-Datei wurde für den UI-Komponenten-Ordner erstellt, die:

- Alle verfügbaren Komponenten beschreibt
- Ihre Props dokumentiert
- Beispiele für die Verwendung bietet
- Theme-System und Utilities erklärt

### Demo-Screen

Ein Theme-Demo-Screen wurde implementiert, der:

- Alle Theme-Farben visualisiert
- Typografie-Beispiele zeigt
- Spacing, Border-Radius und Schatten demonstriert
- Als Referenz für Entwickler dient

### Zusammenfassung 5.3

Die angepassten UI-Komponenten bilden nun ein konsistentes, erweiterbares und gut dokumentiertes System, das als Grundlage für alle Feature-spezifischen UI-Komponenten der Goldfisch-App dient. Das System folgt den Design-Prinzipien aus Schritt 5.2 und ermöglicht eine effiziente und konsistente UI-Entwicklung.

Die Komponenten wurden so gestaltet, dass sie:

- Gut mit TypeScript typisiert sind
- Responsive und zugänglich sind
- Eine konsistente API bieten
- Das zentrale Theme-System nutzen
- Leicht erweiterbar sind

Mit diesem Fundament können wir nun zu den feature-spezifischen Komponenten übergehen, die auf dieser UI-Bibliothek aufbauen werden.

## Implementierung: Benutzerdefinierte Input-Komponenten mit flotierendem Label für die Goldfisch-App 5.4

### Überblick

Im Rahmen von Schritt 5.4 des Entwicklungsplans wurden spezialisierte Eingabekomponenten für die Goldfisch-App entwickelt. Diese bauen auf der grundlegenden Input-Komponente auf, die bereits floatierende Labels unterstützt (basierend auf React Native Paper), und erweitern sie um spezifische Funktionalitäten für verschiedene Anwendungsfälle.

### Implementierte Komponenten (Stand 5)

#### 1. Grundlegende Input-Komponente (Erweitert)

Die bereits vorhandene `Input.tsx` wurde aktualisiert, um die InputProps-Schnittstelle zu exportieren und damit den anderen Komponenten zugänglich zu machen.

```typescript
// src/components/ui/Input.tsx (aktualisiert)
export interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  // ... weitere Eigenschaften
}

export const Input = forwardRef<InputRef, InputProps>(/* ... */);
```

#### 2. TextField-Komponente

Eine erweiterte Textfeld-Komponente mit zusätzlichen Funktionen wie Zeichenzähler, automatischer Höhenanpassung und Hinweistexten.

```typescript
// src/components/ui/inputs/TextField.tsx
export interface TextFieldProps {
  // Input-Basis-Eigenschaften
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  
  // TextField-spezifische Eigenschaften
  characterCount?: boolean;
  maxCharacters?: number;
  hint?: string;
  autoGrow?: boolean;
  // ... weitere Eigenschaften
}

export const TextField = forwardRef<InputRef, TextFieldProps>(/* ... */);
```

#### 3. TagInput-Komponente

Eine Komponente zum Hinzufügen und Entfernen von Tags mit Unterstützung für ein Limit und Validierung.

```typescript
// src/components/ui/inputs/TagInput.tsx
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

export const TagInput = forwardRef<TagInputRef, TagInputProps>(/* ... */);
```

#### 4. DateInput-Komponente

Eine Komponente zur Auswahl von Datum und Uhrzeit mit verschiedenen Formaten und Validierungsoptionen.

```typescript
// src/components/ui/inputs/DateInput.tsx
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
  // ... weitere Eigenschaften
}

export const DateInput = forwardRef<InputRef, DateInputProps>(/* ... */);
```

#### 5. SelectInput-Komponente

Eine Komponente zur Auswahl aus einer Liste von Optionen mit Suchfunktion und Modalansicht.

```typescript
// src/components/ui/inputs/SelectInput.tsx
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
  searchable?: boolean;
  // ... weitere Eigenschaften
}

export const SelectInput = forwardRef<InputRef, SelectInputProps>(/* ... */);
```

#### 6. Export-Datei für Input-Komponenten

```typescript
// src/components/ui/inputs/index.ts
export * from './TextField';
export * from './TagInput';
export * from './DateInput';
export * from './SelectInput';
```

#### 7. Aktualisierte Haupt-Export-Datei

```typescript
// src/components/ui/index.ts
// Basis-UI-Komponenten
export * from './Button';
export * from './Card';
export * from './Input';
export * from './Tag';
export * from './Layout';

// Spezialisierte Input-Komponenten
export * from './inputs';

// Export andere UI-Utilities
export * from '@/constants/theme';
export * from '@/utils/colorUtils';
export * from '@/utils/typography';
export * from '@/utils/styles';
```

#### 8. FormDemo-Komponente zur Demonstration

Eine Demo-Komponente, die alle spezialisierten Input-Komponenten in einem Formular darstellt und deren Verwendung demonstriert.

```typescript
// src/components/ui/FormDemo.tsx
export const FormDemo = () => {
  const [text, setText] = useState('');
  const [multilineText, setMultilineText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  
  // ... Beispieloptionen und Rendering der Komponenten
};
```

#### 9. Demo-Screen

```typescript
// app/form-demo.tsx
export default function FormDemoScreen() {
  return (
    <Container>
      <FormDemo />
    </Container>
  );
}
```

### Vorteile der Implementierung (Stand 5)

1. **Typensicherheit**: Alle Komponenten sind vollständig mit TypeScript typisiert
2. **Wiederverwendbarkeit**: Die Komponenten sind modular und können in der gesamten App verwendet werden
3. **Konsistenz**: Alle Komponenten basieren auf dem zentralen Theme und bieten ein einheitliches Erscheinungsbild
4. **Erweiterbarkeit**: Die Struktur erlaubt einfaches Hinzufügen weiterer spezialisierter Input-Komponenten
5. **Benutzerfreundlichkeit**: Floatierende Labels und andere UI-Details verbessern die Benutzererfahrung

### Abhängigkeiten (Stand 5)

Die Implementierung benötigt folgende zusätzliche Abhängigkeiten:

```bash
@react-native-community/datetimepicker
```

### Nächste Schritte (Stand 5)

Nach der erfolgreichen Implementierung der benutzerdefinierten Input-Komponenten können diese nun in den Formularen für Sammlung und Erinnerung verwendet werden. Der nächste Schritt im Entwicklungsplan ist die Implementierung des Sammlung-Features (Schritt 6).

## Implementierung Schritt 6.1: SammlungCard-Komponente

### Überblick (Stand 6.1)

Für Schritt 6.1 der Goldfisch-App wurde die `SammlungCard`-Komponente implementiert. Diese Komponente zeigt eine visuelle Darstellung einer Sammlung mit ihren wichtigsten Informationen an und ist eine grundlegende UI-Komponente für die App-Startseite und andere Ansichten, in denen Sammlungen dargestellt werden.

### Dateien und Struktur

Folgende Dateien wurden angelegt oder aktualisiert:

1. `src/components/sammlung/SammlungCard.tsx` - Die Hauptkomponente
2. `src/components/sammlung/index.ts` - Export der Sammlung-Komponenten
3. `src/components/index.ts` - Aktualisierung der übergeordneten Exportstruktur
4. `src/components/sammlung/__tests__/SammlungCard.test.tsx` - Unit-Tests
5. `src/components/sammlung/SammlungCardDemo.tsx` - Demo-Komponente für die SammlungCard
6. `app/sammlung-card-demo.tsx` - Demo-Screen für die App

### Funktionalität der SammlungCard

Die SammlungCard-Komponente:

- Zeigt den Namen der Sammlung an
- Visualisiert den Typ der Sammlung mit entsprechendem Icon
- Zeigt die Anzahl der enthaltenen Erinnerungen an
- Unterstützt optionale Titelbilder
- Bietet einen optionalen Optionen-Button (Ellipsis)
- Ist anklickbar und navigiert standardmäßig zur Detailseite der Sammlung
- Unterstützt benutzerdefinierte onPress und onOptionsPress Handler

### Technische Details (Stand 6.1)

1. **Props-Interface**:

   ```typescript
   interface SammlungCardProps {
     sammlung: SammlungTypen;         // Die darzustellende Sammlung
     erinnerungCount?: number;        // Anzahl der Erinnerungen
     onPress?: () => void;            // Optionaler eigener onPress-Handler
     onOptionsPress?: () => void;     // Optionaler Handler für Optionen-Button
   }
   ```

2. **Styling**:
   - Verwendet das zentrale Theme-System der App
   - Konsistente Größen über SPACING, BORDER_RADIUS und SHADOWS Konstanten
   - Responsive Layout mit flexiblem Text-Container

3. **Typsicherheit**:
   - Vermeidet `any` durch Verwendung des spezifischen IoniconsName-Typs
   - Sauberes TypeScript ohne Warnungen

4. **Integration**:
   - Nutzt die SAMMLUNGS_TYP_FELDER für typenspezifische Informationen
   - Verwendet Expo Router für die Navigation

### Tests

Die implementierten Tests prüfen:

- Korrekte Darstellung des Sammlungsnamens
- Korrekte Anzeige der Erinnerungsanzahl
- Singularform "Erinnerung" bei nur einer Erinnerung
- Korrekte onPress-Funktionalität
- Korrekte onOptionsPress-Funktionalität

### Demo

Die SammlungCardDemo zeigt verschiedene Varianten der SammlungCard:

- Standard-Cards mit verschiedenen Sammlungstypen
- Card mit genau einer Erinnerung (Singular-Anzeige)
- Card ohne Optionen-Button
- Card mit Titelbild

Der Demo-Screen ist über `/sammlung-card-demo` erreichbar.

### Nächste Schritte (Stand 6.1)

Nach der SammlungCard-Komponente (Schritt 6.1) folgen laut Entwicklungsplan:

1. Formular für Sammlungserstellung implementieren (Schritt 6.2)
2. Screen für Sammlungsliste auf der Startseite entwickeln (Schritt 6.3)
3. Logik für Speichern neuer Sammlungen implementieren (Schritt 6.4)

## Implementierung Schritte 6.2-6.4: Sammlung-Feature

### Übersicht 6.2 - 6.4

In den Schritten 6.2 bis 6.4 wurde das Sammlung-Feature der Goldfisch-App implementiert. Dieses Feature umfasst die Erstellung von Sammlungen, die Anzeige von Sammlungen auf der Startseite und die Logik zum Speichern neuer Sammlungen.

### Schritt 6.2: Formular für Sammlungserstellung

#### Implementierte Komponente: `SammlungForm`

- **Datei**: `src/components/sammlung/SammlungForm.tsx`
- **Zweck**: Formular für die Erstellung und Bearbeitung von Sammlungen
- **Features**:
  - Eingabefelder für Sammlung-Grunddaten (Name, Typ, Beschreibung)
  - Dynamische Felder basierend auf dem Sammlungstyp
  - Formularvalidierung für Pflichtfelder
  - Typ-spezifische Felder wie Plattform (Film, Serie), Genre (Buch), Kategorie (Lokal)
  - Typensichere Datenverarbeitung

#### Exportierte Typen

```typescript
export interface SammlungFormData {
  name: string;
  type: SammlungsTyp;
  beschreibung?: string;
  plattform?: string;
  genre?: string;
  kategorie?: string;
}
```

### Schritt 6.3: Screen für Sammlungsliste auf der Startseite

#### Implementierte Komponente: Startseite (Index-Screen)

- **Datei**: `app/(tabs)/index.tsx`
- **Zweck**: Anzeige aller Sammlungen auf der Startseite
- **Features**:
  - Auflistung aller vorhandenen Sammlungen als Karten
  - Laden und Anzeigen der Anzahl der Erinnerungen pro Sammlung
  - Leer- und Fehlerzustände
  - Pull-to-Refresh-Funktionalität
  - "Neue Sammlung erstellen"-Button
  - Navigationen zu Sammlungsdetails

#### Integrierte Hooks

- **useSammlungen**: Lädt alle Sammlungen aus dem Storage
- **useFocusEffect**: Aktualisiert die Sammlungen, wenn der Screen fokussiert wird

### Schritt 6.4: Logik für Speichern neuer Sammlungen

#### Implementierter Hook: `useCreateSammlung`

- **Datei**: `src/features/sammlung/hooks/useCreateSammlung.ts`
- **Zweck**: Kommunikation mit dem Datenbank-Service zum Erstellen neuer Sammlungen
- **Features**:
  - Verwaltung des Ladezustands (`isLoading`)
  - Fehlerbehandlung (`error`)
  - Asynchrone Funktion zum Erstellen von Sammlungen (`createSammlung`)

#### Implementierter Screen: `SammlungErstellenScreen`

- **Datei**: `app/sammlung/erstellen.tsx`
- **Zweck**: Screen für die Erstellung einer neuen Sammlung
- **Features**:
  - Integriert das `SammlungForm`
  - Verwendet den `useCreateSammlung`-Hook für die Datenspeicherung
  - Fehleranzeige
  - Navigation zurück zur Startseite nach erfolgreicher Erstellung

### Datenfluss für "Sammlung erstellen"

1. Benutzer navigiert zur Startseite (`app/(tabs)/index.tsx`)
2. Benutzer klickt auf "Neue Sammlung erstellen"
3. Navigation zum `SammlungErstellenScreen` (`app/sammlung/erstellen.tsx`)
4. Benutzer füllt das `SammlungForm` aus
5. Bei Speichern wird der `useCreateSammlung`-Hook aufgerufen
6. Hook nutzt `sammlungStorage`, um Daten in der lokalen Datenbank zu speichern
7. Bei Erfolg wird der Benutzer zurück zur Startseite geleitet
8. Die Startseite aktualisiert die Sammlungsliste und zeigt die neue Sammlung an

### Abhängigkeiten 6.2 - 6.4

- Verwendet vorhandene UI-Komponenten: `TextField`, `SelectInput`, `Button`, `Container`
- Nutzt `sammlungStorage` zum Speichern von Sammlungsdaten
- Verwendet das Typsystem mit `SammlungsTyp` und `SAMMLUNGS_TYP_FELDER`
- Verwendet `expo-router` für die Navigation

### Zusammenfassung 6.2 -6.4

Die implementierten Komponenten bilden zusammen ein vollständiges Feature für das Erstellen und Anzeigen von Sammlungen in der Goldfisch-App. Benutzer können verschiedene Arten von Sammlungen (Film, Buch, Lokal, etc.) erstellen, und diese werden auf der Startseite angezeigt. Die Implementierung folgt einem einheitlichen Datenfluss-Muster, verwendet typensichere Komponenten und ist bereit für die Integration mit dem Erinnerungs-Feature.

## Implementierung Schritt 7.1: Dynamisches ErinnerungForm

### Übersicht 7.1

In diesem Schritt wurde das dynamische Erinnerungsformular implementiert, das basierend auf dem Sammlungstyp (Film, Buch, Lokal, etc.) unterschiedliche Eingabefelder anzeigt. Dies ist ein zentraler Bestandteil des Erinnerungs-Features der Goldfisch-App.

### Implementierte Komponenten 7.1

#### 1. `useCreateErinnerung` Hook

- **Datei**: `src/features/erinnerung/hooks/useCreateErinnerung.ts`
- **Zweck**: Kommunikation mit dem Datenbank-Service zum Erstellen neuer Erinnerungen
- **Features**:
  - Verwaltung des Ladezustands (`isLoading`)
  - Fehlerbehandlung (`error`)
  - Asynchrone Funktion zum Erstellen von Erinnerungen (`createErinnerung`)

#### 2. `ErinnerungForm` Komponente

- **Datei**: `src/components/erinnerung/ErinnerungForm.tsx`
- **Zweck**: Dynamisches Formular für die Erstellung von Erinnerungen
- **Features**:
  - Basisfelder für alle Erinnerungstypen (Titel, Tags, Notizen)
  - Dynamische Felder basierend auf dem Sammlungstyp:
    - **Film**: Regisseur, Erscheinungsjahr, Genre, Dauer
    - **Serie**: Genre, Erscheinungsjahr
    - **Buch**: Autor, Genre, Erscheinungsjahr, Seitenanzahl
    - **Lokal**: Adresse, Kategorie, Öffnungszeiten, Webseite, Telefon
    - **Notiz**: Inhalt, Priorität
    - **Link**: URL
  - Formularvalidierung für Pflichtfelder
  - Typensichere Datenverarbeitung

#### 3. `ErinnerungErstellenScreen` Komponente

- **Datei**: `app/sammlung/[id]/erinnerung/erstellen.tsx`
- **Zweck**: Screen für die Erstellung einer neuen Erinnerung
- **Features**:
  - Lädt Sammlungsdaten anhand der übergebenen ID
  - Bestimmt den Sammlungstyp für das dynamische Formular
  - Fehlerbehandlung für nicht gefundene Sammlungen
  - Sammlungstitel-Anzeige
  - Formularverwaltung und Datenübergabe
  - Navigation zurück zur Sammlungsdetailseite nach erfolgreicher Erstellung

### Exportierte Typen 7.1

```typescript
export interface ErinnerungFormData {
  titel: string;
  tags?: string[];
  notizen?: string;
  
  // Film/Serie spezifische Felder
  regisseur?: string;
  erscheinungsJahr?: number;
  genre?: string;
  dauer?: number;
  
  // Buch spezifische Felder
  autor?: string;
  seitenanzahl?: number;
  
  // Lokal spezifische Felder
  adresse?: string;
  kategorie?: string;
  oeffnungszeiten?: string;
  webseite?: string;
  telefon?: string;
  
  // Notiz spezifische Felder
  inhalt?: string;
  prioritaet?: 'niedrig' | 'mittel' | 'hoch';
  
  // Link spezifische Felder
  url?: string;
}
```

### Abhängigkeiten 7.1

- Verwendet vorhandene UI-Komponenten: `TextField`, `TagInput`, `SelectInput`, `Button`
- Nutzt `sammlungStorage` zum Laden von Sammlungsinformationen
- Greift auf `erinnerungStorage` über den `useCreateErinnerung`-Hook zu
- Verwendet das Typsystem mit `SammlungsTyp` und `ERINNERUNGS_TYP_FELDER`

### Bemerkungen

- Beim Übergeben der Daten an den `createErinnerung`-Hook musste beachtet werden, dass die Felder einzeln übergeben werden, da das `CreateErinnerungInput`-Interface eine spezifische Struktur erwartet.
- Die Implementierung unterstützt alle in der App definierten Sammlungstypen und zeigt nur die relevanten Felder für jeden Typ.
- Die Formularvalidierung stellt sicher, dass alle Pflichtfelder (z.B. Titel) ausgefüllt sind, bevor die Erinnerung erstellt werden kann.

### Nächste Schritte nach 7.1

Als nächstes sollte die `ErinnerungCard`-Komponente implementiert werden (Schritt 7.2), um Erinnerungen in Listen darstellen zu können.
