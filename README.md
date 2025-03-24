# Goldfisch-App

Goldfisch ist eine persönliche Erinnerungssammlung für iOS, die es Nutzern ermöglicht, verschiedene Arten von Informationen strukturiert zu speichern und später leicht wiederzufinden.

## 📱 Über die App

Die Goldfisch-App funktioniert nach dem Prinzip thematischer Sammlungen mit typspezifischen Erinnerungen:

- **Sammlungen** sind Container für thematisch zusammengehörige Erinnerungen (z.B. "Filme zum Anschauen", "Restaurants in Berlin")
- Jede Sammlung hat einen bestimmten **Typ** (Film, Serie, Buch, Lokal, Rezept, Notiz, Link oder Andere)
- **Erinnerungen** sind die eigentlichen Einträge mit typspezifischen Feldern

## 🛠️ Technischer Aufbau

- **Framework**: Expo React Native mit TypeScript für iOS
- **Navigation**: Expo Router v4 mit Tab- und Stack-Navigation
- **UI-Komponenten**: React Native Paper mit angepasstem Theme
- **Datenspeicherung**: AsyncStorage mit eigener Abstraktion
- **State Management**: React Context und Custom Hooks

## 🏗️ Architektur

Die App folgt einer feature-basierten Struktur mit klarer Trennung von Anzeige- und Geschäftslogik:

### Hauptkomponenten

1. **UI-Komponenten** (`src/components/ui/`)
   - Basis-UI-Komponenten wie Button, Input, Card
   - Spezialisierte Input-Komponenten mit flotierenden Labels

2. **Feature-Komponenten** (`src/components/sammlung/`, `src/components/erinnerung/`)
   - Spezifische UI-Komponenten für Sammlungen und Erinnerungen
   - Integriert Basis-UI-Komponenten

3. **Screens** (`app/`)
   - Verwenden Feature-Komponenten
   - Strukturiert mit Expo Router

4. **Datenmodell** (`src/features/`)
   - TypeScript-Interfaces für Sammlungen und Erinnerungen
   - Type-Definitionen und Konstanten

5. **Services** (`src/services/`)
   - Datenbankabstraktion und Storage-Services
   - Media-Services und Benachrichtigungen

6. **Hooks** (`src/features/*/hooks/`)
   - Feature-spezifische Custom Hooks
   - Verbinden UI mit Services

### Datenfluss

1. **User interagiert mit UI** ➡️ Component ruft Hook auf ➡️ Hook nutzt Service ➡️ Service kommuniziert mit Datenbank
2. **Datenänderung** ➡️ Service aktualisiert Daten ➡️ Hook aktualisiert State ➡️ UI rendert neue Daten

## 🚀 Entwicklung

### Voraussetzungen

- Node.js (v18 oder höher empfohlen)
- Yarn als Paketmanager
- iOS-Gerät oder Simulator für Tests

### Erste Schritte

1. **Repository klonen**
   ```bash
   git clone [repository-url]
   cd goldfisch-app
   ```

2. **Abhängigkeiten installieren**
   ```bash
   yarn install
   ```

3. **App starten**
   ```bash
   yarn start
   ```

4. **Im iOS-Simulator oder auf Gerät öffnen**
   Folge den Anweisungen in der Konsole, um die App im Simulator oder auf einem physischen Gerät zu öffnen.

### Ordnerstruktur

```
.
├── App.tsx                    # Haupteinstiegspunkt
├── app                        # Screens und Routing (Expo Router)
│   ├── (tabs)                 # Tab-Navigation
│   │   ├── _layout.tsx
│   │   ├── index.tsx          # Sammlungen-Tab
│   │   ├── suche.tsx
│   │   └── erfolge.tsx
│   ├── _layout.tsx
│   └── sammlung/              # Sammlung-bezogene Screens
│       ├── erstellen.tsx
│       └── [id]/              # Dynamische Route
│           ├── index.tsx
│           └── erinnerung/
│               └── erstellen.tsx
├── src
│   ├── components             # Wiederverwendbare Komponenten
│   │   ├── ui/                # Basis-UI-Komponenten
│   │   │   └── inputs/        # Spezialisierte Input-Komponenten
│   │   ├── sammlung/          # Sammlungs-spezifische Komponenten
│   │   └── erinnerung/        # Erinnerungs-spezifische Komponenten
│   ├── constants              # App-weite Konstanten
│   │   ├── theme.ts           # Theme-Definitionen
│   │   └── typen.ts           # Typ-Definitionen
│   ├── contexts               # React Context Provider
│   ├── features               # Feature-spezifische Logik und Typen
│   │   ├── sammlung/
│   │   ├── erinnerung/
│   │   └── suche/
│   ├── hooks                  # Gemeinsame Hooks
│   ├── services               # Dienste für Datenzugriff
│   │   ├── storage/           # Datenbankoperationen
│   │   ├── media/             # Medienoperationen
│   │   └── notifications/     # Benachrichtigungen
│   └── utils                  # Hilfsfunktionen
```

## 🧩 Kernfunktionen

### Sammlungsverwaltung
- Erstellen, Bearbeiten und Löschen von Sammlungen
- Typspezifische Attribute
- Übersichtliche Darstellung auf der Startseite

### Erinnerungsverwaltung
- Hinzufügen von Erinnerungen zu Sammlungen
- Typspezifische Eingabefelder
- Markierung erfolgreicher Erinnerungen

### Suche und Filterung
- Suche innerhalb einer Sammlung
- Sammlungsübergreifende Suche
- Filterung nach Tags und Kriterien

### Benutzeroberfläche
- Konsistentes Design mit angepasstem Material Design
- Flotierende Labels für verbesserte Benutzerfreundlichkeit
- Responsive Layouts

## 🤝 Mitwirken

Beiträge zum Projekt sind willkommen! Bitte beachte die folgenden Punkte:

1. **Code-Style**: Projekt verwendet ESLint und Prettier
2. **Commit-Messages**: Beschreibend formulieren
3. **Tests**: Neue Funktionen sollten getestet werden
4. **Dokumentation**: Code dokumentieren und README aktualisieren

## 📄 Lizenz

Dieses Projekt ist unter der [MIT-Lizenz](LICENSE) lizenziert.