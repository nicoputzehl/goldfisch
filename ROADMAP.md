# Goldfisch-App Entwicklungs-Roadmap

Diese Roadmap beschreibt den geplanten Entwicklungspfad der Goldfisch-App und gibt einen Überblick über abgeschlossene, laufende und zukünftige Entwicklungsphasen.

## 🏁 Abgeschlossene Meilensteine

### Grundlegende Infrastruktur
- ✅ **Projekteinrichtung**: Expo-Projekt mit TypeScript, Ordnerstruktur, Konfiguration
- ✅ **Navigation**: Einrichtung mit Expo Router v4, Tab- und Stack-Navigation 
- ✅ **Datenmodell**: TypeScript-Interfaces für Sammlungen und Erinnerungen
- ✅ **Datenbankabstraktion**: Implementierung von AsyncStorage mit CRUD-Operationen
- ✅ **UI-Bibliothek**: Einrichtung von React Native Paper mit Theme-Konfiguration

### UI-Komponenten
- ✅ **Basis-UI-Komponenten**: Button, Input, Card, Layout-Komponenten
- ✅ **Spezialisierte Input-Komponenten**: TextField, TagInput, DateInput, SelectInput
- ✅ **SammlungCard**: Komponente zur Darstellung einer Sammlung in der Liste
- ✅ **SammlungForm**: Formular zur Erstellung und Bearbeitung von Sammlungen

### Sammlungsfunktionalität
- ✅ **Sammlung erstellen**: UI und Logik für die Erstellung neuer Sammlungen
- ✅ **Sammlungsansicht**: Darstellung aller Sammlungen auf der Startseite

## 🚧 Aktuelle Entwicklung

### Erinnerungsfunktionalität
- 🔄 **ErinnerungForm**: Dynamisches Formular basierend auf Sammlungstyp
- 🔄 **ErinnerungCard**: Komponente zur Darstellung einer Erinnerung in der Liste
- 🔄 **Erinnerung erstellen**: UI und Logik für die Erstellung neuer Erinnerungen

### Sammlung-Detail-Ansicht
- 🔄 **Detailansicht**: Verbesserung der Sammlungsdetailansicht
- 🔄 **Erinnerungsliste**: Anzeige aller Erinnerungen in einer Sammlung
- 🔄 **Optionen**: Bearbeiten und Löschen von Sammlungen

## 📋 Geplante Funktionen

### Phase 1: Grundfunktionalität abschließen

#### Erinnerungsmanagement
- 📌 **Erinnerung bearbeiten**: UI und Logik zum Bearbeiten bestehender Erinnerungen
- 📌 **Erinnerung löschen**: Möglichkeit, Erinnerungen zu entfernen
- 📌 **Erinnerungen verschieben**: Funktion zum Verschieben zwischen Sammlungen

#### Suchfunktionalität
- 📌 **Einfache Suche**: Implementierung der Suchfunktion innerhalb einer Sammlung
- 📌 **Erweiterte Suche**: Sammlungsübergreifende Suche mit Filtern
- 📌 **Tag-System**: Tag-basierte Filterung implementieren

### Phase 2: Erweiterte Funktionen

#### Medienintegration
- 📌 **Bildauswahl**: Integration von Expo Image Picker
- 📌 **Bildkompression**: Optimierung von Bildern für lokale Speicherung
- 📌 **Titelbilder**: Implementierung von Titelbildern für Sammlungen

#### Erinnerungsverwaltung
- 📌 **Duplizieren**: Funktion zum Duplizieren von Erinnerungen
- 📌 **Sortieroptionen**: Verschiedene Sortieroptionen für Erinnerungen
- 📌 **Massenaktionen**: Funktionen für mehrere Erinnerungen gleichzeitig

#### Tag-System
- 📌 **Tag-Eingabe**: Verbesserte Tag-Eingabekomponente
- 📌 **Tag-Verwaltung**: UI zur Verwaltung aller Tags
- 📌 **Tag-Vorschläge**: Intelligente Vorschläge basierend auf vorhandenen Tags

### Phase 3: Benutzerfreundlichkeit und Erweiterungen

#### Benachrichtigungen
- 📌 **Zeitabhängige Erinnerungen**: Erinnerungen mit Datum und Zeit
- 📌 **Benachrichtigungen**: Lokale Benachrichtigungen für Erinnerungen
- 📌 **Wiederholende Erinnerungen**: Regelmäßige Benachrichtigungen

#### Erfolgs-Tracking
- 📌 **Erfolgsmarkierung**: "Als erfolgreich markieren"-Funktionalität
- 📌 **Erfolgsübersicht**: Screen für erfolgreiche Erinnerungen
- 📌 **Statistiken**: Einfache Statistiken zu erfolgreichen Erinnerungen

#### UI/UX-Verbesserungen
- 📌 **Animationen**: Übergangsanimationen für bessere UX
- 📌 **Responsiveness**: Optimierung für verschiedene Bildschirmgrößen
- 📌 **Barrierefreiheit**: Verbesserung der Zugänglichkeit
- 📌 **Dark Mode**: Implementierung eines Dunkelmodus

### Phase 4: Optimierung und Abschluss

#### Performance
- 📌 **Optimierung**: Leistungsverbesserungen für große Datenmengen
- 📌 **Caching**: Intelligentes Caching für schnellere Ladezeiten
- 📌 **Speichernutzung**: Optimierung der lokalen Speichernutzung

#### Qualitätssicherung
- 📌 **Tests**: Umfassende Tests für alle Hauptfunktionen
- 📌 **Bug-Fixing**: Behebung bekannter Probleme
- 📌 **Feedback**: Einarbeitung von Nutzerfeedback

#### App-Store-Vorbereitung
- 📌 **App-Icons**: Erstellung und Integration finaler Icons
- 📌 **Splash-Screen**: Optimierung des Splash-Screens
- 📌 **App-Store-Material**: Vorbereitung für App Store-Einreichung

## 🔮 Zukünftige Visionen

### Mögliche Erweiterungen für zukünftige Versionen

- 🌟 **Datenexport/-import**: Funktion zum Sichern und Wiederherstellen von Daten
- 🌟 **Erweitertes UI-Customizing**: Mehr Anpassungsmöglichkeiten für Benutzer
- 🌟 **Sharing-Funktionen**: Teilen von Sammlungen oder Erinnerungen
- 🌟 **Widgets**: iOS-Widgets für schnellen Zugriff auf Sammlungen
- 🌟 **Offline-Synchronisierung**: Optionale Cloud-Synchronisierung
- 🌟 **Integration mit anderen Apps**: Tiefere Integration mit iOS-Ökosystem

---

Diese Roadmap wird regelmäßig aktualisiert, um den aktuellen Entwicklungsstand widerzuspiegeln.

Letztes Update: März 2025