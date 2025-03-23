import { sammlungDB } from './database';
import type { SammlungTypen, UpdateSammlungInput } from '@/features/sammlung/types';
import { erinnerungStorage } from './erinnerungStorage';

/**
 * Erweiterte Funktionen für die Verwaltung von Sammlungen
 */
export const sammlungExtendedStorage = {
  /**
   * Aktualisiert das Titelbild einer Sammlung
   * @param id Die ID der Sammlung
   * @param bildURL Die URL des Titelbilds
   * @returns Die aktualisierte Sammlung oder null, wenn nicht gefunden
   */
  async updateTitelbild(id: string, bildURL: string): Promise<SammlungTypen | null> {
    return await sammlungDB.update<SammlungTypen>(id, (sammlung) => {
      return {
        ...sammlung,
        bildURL,
        aktualisiertAm: new Date()
      };
    });
  },
  
  /**
   * Löscht eine Sammlung und alle dazugehörigen Erinnerungen
   * @param id Die ID der zu löschenden Sammlung
   * @returns Anzahl der gelöschten Erinnerungen
   */
  async deleteWithErinnerungen(id: string): Promise<number> {
    try {
      // Zuerst alle Erinnerungen dieser Sammlung abrufen
      const erinnerungen = await erinnerungStorage.getBySammlung(id);
      const anzahlErinnerungen = erinnerungen.length;
      
      // Alle Erinnerungen löschen
      await erinnerungStorage.deleteBySammlung(id);
      
      // Dann die Sammlung selbst löschen
      await sammlungDB.remove(id);
      
      return anzahlErinnerungen;
    } catch (error) {
      console.error('Fehler beim Löschen der Sammlung mit Erinnerungen:', error);
      throw new Error('Sammlung und Erinnerungen konnten nicht gelöscht werden');
    }
  },
  
  /**
   * Fügt eine Beschreibung zu einer Sammlung hinzu
   * @param id Die ID der Sammlung
   * @param beschreibung Die Beschreibung
   * @returns Die aktualisierte Sammlung oder null, wenn nicht gefunden
   */
  async addDescription(id: string, beschreibung: string): Promise<SammlungTypen | null> {
    return await sammlungDB.update<SammlungTypen>(id, (sammlung) => {
      return {
        ...sammlung,
        beschreibung,
        aktualisiertAm: new Date()
      };
    });
  },
  
  /**
   * Ruft Sammlungen nach Typ ab
   * @param typ Der Typ der Sammlung
   * @returns Ein Array der Sammlungen des angegebenen Typs
   */
  async getByType(typ: string): Promise<SammlungTypen[]> {
    return await sammlungDB.query<SammlungTypen>((sammlung) => {
      return sammlung.type === typ;
    });
  },
  
  /**
   * Berechnet eine Zusammenfassung für eine Sammlung
   * @param id Die ID der Sammlung
   * @returns Eine Zusammenfassung mit Statistiken
   */
  async getSummary(id: string): Promise<{
    anzahlErinnerungen: number;
    anzahlErfolge: number;
    letzteAktualisierung: Date | null;
  }> {
    try {
      // Sammlung abrufen
      const sammlung = await sammlungDB.get<SammlungTypen>(id);
      if (!sammlung) {
        throw new Error(`Sammlung mit ID ${id} nicht gefunden`);
      }
      
      // Erinnerungen abrufen
      const erinnerungen = await erinnerungStorage.getBySammlung(id);
      
      // Anzahl der Erfolge berechnen
      const erfolge = erinnerungen.filter(
        (erinnerung) => erinnerung.erfolgreichGenutztAm !== undefined
      );
      
      // Letzte Aktualisierung finden
      let letzteAktualisierung: Date | null = sammlung.aktualisiertAm;
      
      // Prüfen, ob Erinnerungen neuer sind als die Sammlung selbst
      for (const erinnerung of erinnerungen) {
        const erinnerungsDatum = new Date(erinnerung.aktualisiertAm);
        if (!letzteAktualisierung || erinnerungsDatum > letzteAktualisierung) {
          letzteAktualisierung = erinnerungsDatum;
        }
      }
      
      return {
        anzahlErinnerungen: erinnerungen.length,
        anzahlErfolge: erfolge.length,
        letzteAktualisierung
      };
    } catch (error) {
      console.error('Fehler beim Abrufen der Sammlungszusammenfassung:', error);
      throw new Error('Sammlungszusammenfassung konnte nicht abgerufen werden');
    }
  },
  
  /**
   * Sortiert Sammlungen nach einem bestimmten Kriterium
   * @param sammlungen Die zu sortierenden Sammlungen
   * @param sortierNach Das Sortierkriterium
   * @param absteigend Ob absteigend sortiert werden soll
   * @returns Die sortierten Sammlungen
   */
  sortSammlungen(
    sammlungen: SammlungTypen[],
    sortierNach: 'name' | 'erstelltAm' | 'aktualisiertAm' | 'type',
    absteigend = false
  ): SammlungTypen[] {
    return [...sammlungen].sort((a, b) => {
      let vergleich = 0;
      
      switch (sortierNach) {
        case 'name':
          vergleich = a.name.localeCompare(b.name);
          break;
        case 'erstelltAm':
          vergleich = new Date(a.erstelltAm).getTime() - new Date(b.erstelltAm).getTime();
          break;
        case 'aktualisiertAm':
          vergleich = new Date(a.aktualisiertAm).getTime() - new Date(b.aktualisiertAm).getTime();
          break;
        case 'type':
          vergleich = a.type.localeCompare(b.type);
          break;
      }
      
      return absteigend ? -vergleich : vergleich;
    });
  }
};
