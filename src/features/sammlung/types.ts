/**
 * Typen und Interfaces für Sammlungen
 */

// Basis-Interface für alle Sammlungen
export interface Sammlung {
  id: string;
  name: string;
  type: SammlungsTyp;
  erstelltAm: Date;
  aktualisiertAm: Date;
  bildURL?: string;
  beschreibung?: string;
}

// Enum für die verfügbaren Sammlungstypen
export enum SammlungsTyp {
  FILM = 'film',
  SERIE = 'serie',
  BUCH = 'buch',
  LOKAL = 'lokalität',
  REZEPT = 'rezept',
  NOTIZ = 'notiz',
  LINK = 'link',
  ANDERE = 'andere'
}

// Spezifische Eigenschaften für einzelne Sammlungstypen
export interface FilmSammlung extends Sammlung {
  type: SammlungsTyp.FILM;
  plattform?: string;
}

export interface SerieSammlung extends Sammlung {
  type: SammlungsTyp.SERIE;
  plattform?: string;
}

export interface BuchSammlung extends Sammlung {
  type: SammlungsTyp.BUCH;
  genre?: string;
}

export interface LokalSammlung extends Sammlung {
  type: SammlungsTyp.LOKAL;
  kategorie?: string;
}

export interface RezeptSammlung extends Sammlung {
  type: SammlungsTyp.REZEPT;
  kategorie?: string;
}

export interface NotizSammlung extends Sammlung {
  type: SammlungsTyp.NOTIZ;
  kategorie?: string;
}

export interface LinkSammlung extends Sammlung {
  type: SammlungsTyp.LINK;
  kategorie?: string;
}

export interface AndereSammlung extends Sammlung {
  type: SammlungsTyp.ANDERE;
  benutzerdefinierteFelder?: string[];
}

// Sammlung mit allen möglichen Typen
export type SammlungTypen = 
  | FilmSammlung
  | SerieSammlung
  | BuchSammlung
  | LokalSammlung
  | RezeptSammlung
  | NotizSammlung
  | LinkSammlung
  | AndereSammlung;

// Interface für das Erstellen einer neuen Sammlung
export interface CreateSammlungInput {
  name: string;
  type: SammlungsTyp;
  bildURL?: string;
  beschreibung?: string;
  // Zusätzliche typspezifische Felder
  plattform?: string;
  genre?: string;
  kategorie?: string;
  benutzerdefinierteFelder?: string[];
}

// Interface für das Aktualisieren einer Sammlung
export interface UpdateSammlungInput {
  id: string;
  name?: string;
  bildURL?: string;
  beschreibung?: string;
  // Zusätzliche typspezifische Felder
  plattform?: string;
  genre?: string;
  kategorie?: string;
  benutzerdefinierteFelder?: string[];
}
