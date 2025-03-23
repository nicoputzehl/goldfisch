/**
 * Interface für ein Tag
 */
export interface Tag {
  id: string;
  name: string;
  erstelltAm: Date;
}

/**
 * Interface für die Verknüpfung zwischen Erinnerungen und Tags
 */
export interface ErinnerungTag {
  id: string;
  erinnerungId: string;
  tagId: string;
  erstelltAm: Date;
}

/**
 * Interface für Suchparameter
 */
export interface SuchParameter {
  suchbegriff?: string;
  sammlungsId?: string;
  tags?: string[];
  nurErfolgreich?: boolean;
  mitErinnerungsDatum?: boolean;
}

/**
 * Interface für Datumsbasierte Suchparameter
 */
export interface DatumsSuchParameter extends SuchParameter {
  vonDatum?: Date;
  bisDatum?: Date;
}

/**
 * Interface für erweiterte Suchparameter
 */
export interface ErweiterteSuchParameter extends DatumsSuchParameter {
  sammlungsTyp?: string;
  sortierung?: 'titel' | 'erstelltAm' | 'aktualisiertAm' | 'erfolgreichGenutztAm';
  sortierungRichtung?: 'aufsteigend' | 'absteigend';
}

/**
 * Interface für Suchergebnisse
 */
export interface Suchergebnis<T> {
  ergebnisse: T[];
  gesamtAnzahl: number;
  suchparameter: SuchParameter | DatumsSuchParameter | ErweiterteSuchParameter;
}
