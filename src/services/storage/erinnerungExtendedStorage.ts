import { erinnerungDB } from './database';
import type { ErinnerungTypen, UpdateErinnerungInput } from '@/features/erinnerung/types';

// Benutzerdefinierter Typ für Erinnerungen mit zusätzlichen Feldern für Datum
// Wir verwenden einen Schnittstellen-Union-Typ statt Vererbung
type ErinnerungMitDatum = ErinnerungTypen & {
  erinnerungsDatum?: Date;
  benachrichtigungId?: string;
};

/**
 * Erweiterte Funktionen für die Verwaltung von Erinnerungen
 */
export const erinnerungExtendedStorage = {
  /**
   * Dupliziert eine Erinnerung
   * @param id Die ID der zu duplizierenden Erinnerung
   * @returns Die duplizierte Erinnerung oder null, wenn nicht gefunden
   */
  async duplicate(id: string): Promise<ErinnerungTypen | null> {
    try {
      // Original-Erinnerung abrufen
      const original = await erinnerungDB.get<ErinnerungTypen>(id);
      if (!original) {
        return null;
      }
      
      // Neue ID generieren
      const neueId = `erinnerung_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      
      // Zeitstempel erstellen
      const jetzt = new Date();
      
      // Neue Erinnerung erstellen (dupliziert alles außer ID, Erstellungs- und Aktualisierungsdatum)
      const { id: _, erstelltAm, aktualisiertAm, erfolgreichGenutztAm, ...rest } = original;
      const duplizierteErinnerung: ErinnerungTypen = {
        ...rest,
        id: neueId,
        titel: `${original.titel} (Kopie)`,
        erstelltAm: jetzt,
        aktualisiertAm: jetzt,
        erfolgreichGenutztAm: undefined
      };
      
      // Duplizierte Erinnerung speichern
      await erinnerungDB.set(neueId, duplizierteErinnerung);
      
      return duplizierteErinnerung;
    } catch (error) {
      console.error('Fehler beim Duplizieren der Erinnerung:', error);
      throw new Error('Erinnerung konnte nicht dupliziert werden');
    }
  },
  
  /**
   * Fügt Bilder zu einer Erinnerung hinzu
   * @param id Die ID der Erinnerung
   * @param bildURLs Die URLs der Bilder
   * @returns Die aktualisierte Erinnerung oder null, wenn nicht gefunden
   */
  async addBilder(id: string, bildURLs: string[]): Promise<ErinnerungTypen | null> {
    return await erinnerungDB.update<ErinnerungTypen>(id, (erinnerung) => {
      // Aktuelle Bild-URLs abrufen oder leeres Array, wenn noch keine vorhanden
      const aktuelleBilder = erinnerung.bildURLs || [];
      
      // Neue Bilder hinzufügen (doppelte entfernen)
      const alleBilder = [...new Set([...aktuelleBilder, ...bildURLs])];
      
      return {
        ...erinnerung,
        bildURLs: alleBilder,
        aktualisiertAm: new Date()
      } as ErinnerungTypen;
    });
  },
  
  /**
   * Entfernt Bilder aus einer Erinnerung
   * @param id Die ID der Erinnerung
   * @param bildURLs Die URLs der zu entfernenden Bilder
   * @returns Die aktualisierte Erinnerung oder null, wenn nicht gefunden
   */
  async removeBilder(id: string, bildURLs: string[]): Promise<ErinnerungTypen | null> {
    return await erinnerungDB.update<ErinnerungTypen>(id, (erinnerung) => {
      // Aktuelle Bild-URLs abrufen oder leeres Array, wenn keine vorhanden
      const aktuelleBilder = erinnerung.bildURLs || [];
      
      // Bilder entfernen
      const neueBilder = aktuelleBilder.filter(url => !bildURLs.includes(url));
      
      return {
        ...erinnerung,
        bildURLs: neueBilder,
        aktualisiertAm: new Date()
      } as ErinnerungTypen;
    });
  },
  
  /**
   * Aktualisiert Tags einer Erinnerung
   * @param id Die ID der Erinnerung
   * @param tags Die neuen Tags
   * @returns Die aktualisierte Erinnerung oder null, wenn nicht gefunden
   */
  async updateTags(id: string, tags: string[]): Promise<ErinnerungTypen | null> {
    return await erinnerungDB.update<ErinnerungTypen>(id, (erinnerung) => {
      return {
        ...erinnerung,
        tags,
        aktualisiertAm: new Date()
      } as ErinnerungTypen;
    });
  },
  
  /**
   * Fügt einen Tag zu einer Erinnerung hinzu
   * @param id Die ID der Erinnerung
   * @param tag Der hinzuzufügende Tag
   * @returns Die aktualisierte Erinnerung oder null, wenn nicht gefunden
   */
  async addTag(id: string, tag: string): Promise<ErinnerungTypen | null> {
    return await erinnerungDB.update<ErinnerungTypen>(id, (erinnerung) => {
      // Aktuelle Tags abrufen oder leeres Array, wenn noch keine vorhanden
      const aktuelleTags = erinnerung.tags || [];
      
      // Tag hinzufügen, wenn er noch nicht existiert
      const neueTags = aktuelleTags.includes(tag) 
        ? aktuelleTags 
        : [...aktuelleTags, tag];
      
      return {
        ...erinnerung,
        tags: neueTags,
        aktualisiertAm: new Date()
      } as ErinnerungTypen;
    });
  },
  
  /**
   * Entfernt einen Tag aus einer Erinnerung
   * @param id Die ID der Erinnerung
   * @param tag Der zu entfernende Tag
   * @returns Die aktualisierte Erinnerung oder null, wenn nicht gefunden
   */
  async removeTag(id: string, tag: string): Promise<ErinnerungTypen | null> {
    return await erinnerungDB.update<ErinnerungTypen>(id, (erinnerung) => {
      // Aktuelle Tags abrufen oder leeres Array, wenn keine vorhanden
      const aktuelleTags = erinnerung.tags || [];
      
      // Tag entfernen
      const neueTags = aktuelleTags.filter(t => t !== tag);
      
      return {
        ...erinnerung,
        tags: neueTags,
        aktualisiertAm: new Date()
      } as ErinnerungTypen;
    });
  },
  
  /**
   * Setzt ein Erinnerungsdatum für eine Erinnerung
   * @param id Die ID der Erinnerung
   * @param datum Das Erinnerungsdatum
   * @returns Die aktualisierte Erinnerung mit Erinnerungsdatum
   */
  async setErinnerungsDatum(id: string, datum: Date): Promise<ErinnerungMitDatum | null> {
    try {
      const erinnerung = await erinnerungDB.get<ErinnerungTypen>(id);
      if (!erinnerung) return null;
      
      const erinnerungMitDatum: ErinnerungMitDatum = {
        ...erinnerung,
        erinnerungsDatum: datum,
        aktualisiertAm: new Date()
      };
      
      await erinnerungDB.set(id, erinnerungMitDatum);
      return erinnerungMitDatum;
    } catch (error) {
      console.error('Fehler beim Setzen des Erinnerungsdatums:', error);
      return null;
    }
  },
  
  /**
   * Setzt eine Benachrichtigungs-ID für eine Erinnerung
   * @param id Die ID der Erinnerung
   * @param benachrichtigungId Die Benachrichtigungs-ID
   * @returns Die aktualisierte Erinnerung mit Benachrichtigungs-ID
   */
  async setBenachrichtigungId(id: string, benachrichtigungId: string): Promise<ErinnerungMitDatum | null> {
    try {
      const erinnerung = await erinnerungDB.get<ErinnerungMitDatum>(id);
      if (!erinnerung) return null;
      
      const aktualisierteErinnerung: ErinnerungMitDatum = {
        ...erinnerung,
        benachrichtigungId,
        aktualisiertAm: new Date()
      };
      
      await erinnerungDB.set(id, aktualisierteErinnerung);
      return aktualisierteErinnerung;
    } catch (error) {
      console.error('Fehler beim Setzen der Benachrichtigungs-ID:', error);
      return null;
    }
  },
  
  /**
   * Entfernt das Erinnerungsdatum und die Benachrichtigungs-ID aus einer Erinnerung
   * @param id Die ID der Erinnerung
   * @returns Die aktualisierte Erinnerung ohne Erinnerungsdatum
   */
  async removeErinnerungsDatum(id: string): Promise<ErinnerungTypen | null> {
    try {
      const erinnerung = await erinnerungDB.get<ErinnerungMitDatum>(id);
      if (!erinnerung) return null;
      
      // Erstelle eine neue Erinnerung ohne die speziellen Felder
      const { erinnerungsDatum, benachrichtigungId, ...rest } = erinnerung;
      
      const aktualisierteErinnerung: ErinnerungTypen = {
        ...rest,
        aktualisiertAm: new Date()
      };
      
      await erinnerungDB.set(id, aktualisierteErinnerung);
      return aktualisierteErinnerung;
    } catch (error) {
      console.error('Fehler beim Entfernen des Erinnerungsdatums:', error);
      return null;
    }
  },
  
  /**
   * Ruft Erinnerungen mit Erinnerungsdatum ab
   * @returns Ein Array der Erinnerungen mit Erinnerungsdatum
   */
  async getWithReminderDate(): Promise<ErinnerungMitDatum[]> {
    return await erinnerungDB.query<ErinnerungMitDatum>((erinnerung) => {
      return (erinnerung as ErinnerungMitDatum).erinnerungsDatum !== undefined;
    });
  },
  
  /**
   * Ruft bald fällige Erinnerungen ab
   * @param tage Die maximale Anzahl an Tagen in der Zukunft
   * @returns Ein Array der bald fälligen Erinnerungen
   */
  async getUpcoming(tage = 7): Promise<ErinnerungMitDatum[]> {
    const jetzt = new Date();
    const ende = new Date();
    ende.setDate(jetzt.getDate() + tage);
    
    return await erinnerungDB.query<ErinnerungMitDatum>((erinnerung) => {
      const erinnerungMitDatum = erinnerung as ErinnerungMitDatum;
      if (!erinnerungMitDatum.erinnerungsDatum) return false;
      
      const datum = new Date(erinnerungMitDatum.erinnerungsDatum);
      return datum >= jetzt && datum <= ende;
    });
  },
  
  /**
   * Hebt die Erfolgsmarkierung einer Erinnerung auf
   * @param id Die ID der Erinnerung
   * @returns Die aktualisierte Erinnerung oder null, wenn nicht gefunden
   */
  async unmarkSuccess(id: string): Promise<ErinnerungTypen | null> {
    try {
      const erinnerung = await erinnerungDB.get<ErinnerungTypen>(id);
      if (!erinnerung) return null;
      
      // Destrukturiere, um erfolgreichGenutztAm zu entfernen
      const { erfolgreichGenutztAm, ...rest } = erinnerung;
      
      const aktualisierteErinnerung: ErinnerungTypen = {
        ...rest,
        aktualisiertAm: new Date()
      };
      
      await erinnerungDB.set(id, aktualisierteErinnerung);
      return aktualisierteErinnerung;
    } catch (error) {
      console.error('Fehler beim Aufheben der Erfolgsmarkierung:', error);
      return null;
    }
  }
};
