/**
 * Typen und Interfaces für die Suche und das Tag-System
 */

// Interface für einen Tag
export interface Tag {
  id: string;
  name: string;
  farbe?: string;
  verwendungszaehler: number; // Wie oft der Tag verwendet wurde
}

// Interface für die Beziehung zwischen Erinnerungen und Tags
export interface ErinnerungTag {
  erinnerungId: string;
  tagId: string;
}

// Interface für eine Suchanfrage
export interface SuchParameter {
  query?: string;
  tags?: string[];
  sammlungId?: string;
  sammlungsTyp?: string;
  nurErfolgreich?: boolean;
  sortierung?: 'neuste' | 'aelteste' | 'name' | 'bewertung';
}

// Interface für die Datumssuche
export interface DatumsSuchParameter {
  vonDatum?: Date;
  bisDatum?: Date;
  erstellungsdatum?: boolean; // Falls true, wird nach Erstellungsdatum gesucht, sonst nach Aktualisierungsdatum
}

// Interface für die erweiterte Suche mit Metadaten
export interface ErweiterteSuchParameter extends SuchParameter, DatumsSuchParameter {
  attribute?: Record<string, string | number | boolean>; // Spezifische Attribute je nach Sammlungstyp
}

// Interface für die Suche nach Sammlungen
export interface SammlungSuchParameter {
  query?: string;
  typ?: string;
  sortierung?: 'neuste' | 'aelteste' | 'name';
}
