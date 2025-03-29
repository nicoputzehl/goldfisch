/**
 * Typen und Interfaces für Erinnerungen
 */
import type { SammlungsTyp } from '../sammlung/types';

// Basis-Interface für alle Erinnerungen
export interface Erinnerung {
  id: string;
  sammlungId: string;
  sammlungsTyp: SammlungsTyp;
  titel: string;
  erstelltAm: Date;
  aktualisiertAm: Date;
  erfolgreichGenutztAm?: Date;
  tags: string[];
  bildURLs?: string[];
  notizen?: string;
}

// Film-Erinnerung
export interface FilmErinnerung extends Erinnerung {
  sammlungsTyp: SammlungsTyp.FILM;
  regisseur?: string;
  erscheinungsJahr?: number;
  genre?: string;
  dauer?: number; // in Minuten
  gesehen?: boolean;
  bewertung?: number; // 1-5 Sterne
}

// Serien-Erinnerung
export interface SerieErinnerung extends Erinnerung {
  sammlungsTyp: SammlungsTyp.SERIE;
  staffel?: number;
  folge?: number;
  genre?: string;
  laufzeit?: string; // z.B. "2020-2023"
  gesehen?: boolean;
  bewertung?: number; // 1-5 Sterne
}

// Buch-Erinnerung
export interface BuchErinnerung extends Erinnerung {
  sammlungsTyp: SammlungsTyp.BUCH;
  autor?: string;
  erscheinungsJahr?: number;
  genre?: string;
  seitenanzahl?: number;
  gelesen?: boolean;
  bewertung?: number; // 1-5 Sterne
}

// Lokalitäts-Erinnerung
export interface LokalErinnerung extends Erinnerung {
  sammlungsTyp: SammlungsTyp.LOKAL;
  adresse?: string;
  kategorie?: string;
  oeffnungszeiten?: string;
  webseite?: string;
  telefon?: string;
  besucht?: boolean;
  bewertung?: number; // 1-5 Sterne
}

// Rezept-Erinnerung
export interface RezeptErinnerung extends Erinnerung {
  sammlungsTyp: SammlungsTyp.REZEPT;
  zutaten?: string[];
  zubereitungszeit?: number; // in Minuten
  portionen?: number;
  quelle?: string;
  ausprobiert?: boolean;
  bewertung?: number; // 1-5 Sterne
}

// Notiz-Erinnerung
export interface NotizErinnerung extends Erinnerung {
  sammlungsTyp: SammlungsTyp.NOTIZ;
  inhalt: string;
  kategorie?: string;
  prioritaet?: 'niedrig' | 'mittel' | 'hoch';
}

// Link-Erinnerung
export interface LinkErinnerung extends Erinnerung {
  sammlungsTyp: SammlungsTyp.LINK;
  url: string;
  kategorie?: string;
  besucht?: boolean;
}

// Andere-Erinnerung
export interface AndereErinnerung extends Erinnerung {
  sammlungsTyp: SammlungsTyp.ANDERE;
  benutzerdefinierteFelder?: Record<string, string | number | boolean>;
}

// Erinnerung mit allen möglichen Typen
export type ErinnerungTypen = 
  | FilmErinnerung
  | SerieErinnerung
  | BuchErinnerung
  | LokalErinnerung
  | RezeptErinnerung
  | NotizErinnerung
  | LinkErinnerung
  | AndereErinnerung;

// Interface für das Erstellen einer neuen Erinnerung
export interface CreateErinnerungInput {
  sammlungId: string;
  titel: string;
  tags?: string[];
  bildURLs?: string[];
  notizen?: string;
  
  // Gemeinsame optionale Felder
  bewertung?: number;
  
  // Film-spezifische Felder
  regisseur?: string;
  erscheinungsJahr?: number;
  genre?: string;
  dauer?: number;
  gesehen?: boolean;
  
  // Serien-spezifische Felder
  staffel?: number;
  folge?: number;
  laufzeit?: string;
  
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
  zutaten?: string[];
  zubereitungszeit?: number;
  portionen?: number;
  quelle?: string;
  ausprobiert?: boolean;
  
  // Notiz-spezifische Felder
  inhalt?: string;
  prioritaet?: 'niedrig' | 'mittel' | 'hoch';
  
  // Link-spezifische Felder
  url?: string;
  
  // Andere-spezifische Felder
  benutzerdefinierteFelder?: Record<string, string | number | boolean>;
}

// Interface für das Aktualisieren einer Erinnerung
export interface UpdateErinnerungInput {
  id: string;
  titel?: string;
  tags?: string[];
  bildURLs?: string[];
  notizen?: string;
  erfolgreichGenutztAm?: Date | null;
  
  // Gemeinsame optionale Felder
  bewertung?: number;
  
  // Film-spezifische Felder
  regisseur?: string;
  erscheinungsJahr?: number;
  genre?: string;
  dauer?: number;
  gesehen?: boolean;
  
  // Serien-spezifische Felder
  staffel?: number;
  folge?: number;
  laufzeit?: string;
  
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
  zutaten?: string[];
  zubereitungszeit?: number;
  portionen?: number;
  quelle?: string;
  ausprobiert?: boolean;
  
  // Notiz-spezifische Felder
  inhalt?: string;
  prioritaet?: 'niedrig' | 'mittel' | 'hoch';
  
  // Link-spezifische Felder
  url?: string;
  
  // Andere-spezifische Felder
  benutzerdefinierteFelder?: Record<string, string | number | boolean>;
}
