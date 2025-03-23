import { erinnerungDB } from './database';
import type { 
  ErinnerungTypen, 
  CreateErinnerungInput, 
  UpdateErinnerungInput
} from '@/features/erinnerung/types';

/**
 * Service zur Verwaltung von Erinnerungen in der Datenbank
 */
export const erinnerungStorage = {
  /**
   * Speichert eine neue Erinnerung in der Datenbank
   * @param input Die Daten für die neue Erinnerung
   * @returns Die gespeicherte Erinnerung mit generierter ID
   */
  async create(input: CreateErinnerungInput): Promise<ErinnerungTypen> {
    // Generiert eine eindeutige ID
    const id = `erinnerung_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    // Erstellt Zeitstempel
    const jetzt = new Date();
    
    // Erstellt das vollständige Erinnerungsobjekt
    const erinnerung = {
      ...input,
      id,
      erstelltAm: jetzt,
      aktualisiertAm: jetzt,
      erfolgreichGenutztAm: undefined
    } as ErinnerungTypen;
    
    // Speichert die Erinnerung in der Datenbank
    await erinnerungDB.set(id, erinnerung);
    
    return erinnerung;
  },
  
  /**
   * Ruft eine Erinnerung anhand ihrer ID ab
   * @param id Die ID der Erinnerung
   * @returns Die gefundene Erinnerung oder null, wenn nicht gefunden
   */
  async getById(id: string): Promise<ErinnerungTypen | null> {
    return await erinnerungDB.get<ErinnerungTypen>(id);
  },
  
  /**
   * Ruft alle Erinnerungen ab
   * @returns Ein Array aller Erinnerungen
   */
  async getAll(): Promise<ErinnerungTypen[]> {
    return await erinnerungDB.getAll<ErinnerungTypen>();
  },
  
  /**
   * Ruft alle Erinnerungen einer bestimmten Sammlung ab
   * @param sammlungId Die ID der Sammlung
   * @returns Ein Array der Erinnerungen der Sammlung
   */
  async getBySammlung(sammlungId: string): Promise<ErinnerungTypen[]> {
    return await erinnerungDB.query<ErinnerungTypen>((erinnerung) => {
      return erinnerung.sammlungId === sammlungId;
    });
  },
  
  /**
   * Aktualisiert eine Erinnerung
   * @param id Die ID der zu aktualisierenden Erinnerung
   * @param updates Die Aktualisierungen
   * @returns Die aktualisierte Erinnerung oder null, wenn nicht gefunden
   */
  async update(id: string, updates: UpdateErinnerungInput): Promise<ErinnerungTypen | null> {
    return await erinnerungDB.update<ErinnerungTypen>(id, (erinnerung) => {
      return {
        ...erinnerung,
        ...updates,
        aktualisiertAm: new Date()
      } as ErinnerungTypen;
    });
  },
  
  /**
   * Markiert eine Erinnerung als erfolgreich
   * @param id Die ID der Erinnerung
   * @returns Die aktualisierte Erinnerung oder null, wenn nicht gefunden
   */
  async markAsSuccess(id: string): Promise<ErinnerungTypen | null> {
    return await erinnerungDB.update<ErinnerungTypen>(id, (erinnerung) => {
      // Die explizite Typumwandlung stellt sicher, dass der Rückgabetyp 
      // mit dem erwarteten Typ ErinnerungTypen übereinstimmt
      return {
        ...erinnerung,
        erfolgreichGenutztAm: new Date(),
        aktualisiertAm: new Date()
      } as ErinnerungTypen;
    });
  },
  
  /**
   * Verschiebt eine Erinnerung in eine andere Sammlung
   * @param id Die ID der Erinnerung
   * @param neueSammlungId Die ID der neuen Sammlung
   * @returns Die aktualisierte Erinnerung oder null, wenn nicht gefunden
   */
  async moveToSammlung(id: string, neueSammlungId: string): Promise<ErinnerungTypen | null> {
    return await erinnerungDB.update<ErinnerungTypen>(id, (erinnerung) => {
      return {
        ...erinnerung,
        sammlungId: neueSammlungId,
        aktualisiertAm: new Date()
      } as ErinnerungTypen;
    });
  },
  
  /**
   * Löscht eine Erinnerung
   * @param id Die ID der zu löschenden Erinnerung
   */
  async delete(id: string): Promise<void> {
    await erinnerungDB.remove(id);
  },
  
  /**
   * Löscht alle Erinnerungen einer Sammlung
   * @param sammlungId Die ID der Sammlung
   */
  async deleteBySammlung(sammlungId: string): Promise<void> {
    const erinnerungen = await this.getBySammlung(sammlungId);
    
    // Löscht jede Erinnerung einzeln
    for (const erinnerung of erinnerungen) {
      await erinnerungDB.remove(erinnerung.id);
    }
  },
  
  /**
   * Sucht nach Erinnerungen anhand des Titels
   * @param suchbegriff Der Suchbegriff
   * @returns Ein Array der gefundenen Erinnerungen
   */
  async searchByTitle(suchbegriff: string): Promise<ErinnerungTypen[]> {
    const lowerCaseSuchbegriff = suchbegriff.toLowerCase();
    
    return await erinnerungDB.query<ErinnerungTypen>((erinnerung) => {
      return erinnerung.titel.toLowerCase().includes(lowerCaseSuchbegriff);
    });
  },
  
  /**
   * Sucht nach Erinnerungen anhand von Tags
   * @param tags Die zu suchenden Tags
   * @returns Ein Array der gefundenen Erinnerungen
   */
  async searchByTags(tags: string[]): Promise<ErinnerungTypen[]> {
    if (tags.length === 0) {
      return [];
    }
    
    return await erinnerungDB.query<ErinnerungTypen>((erinnerung) => {
      // Prüft, ob die Erinnerung Tags hat
      if (!erinnerung.tags || erinnerung.tags.length === 0) {
        return false;
      }
      
      // Prüft, ob mindestens ein Tag übereinstimmt
      return tags.some(tag => erinnerung.tags?.includes(tag));
    });
  },
  
  /**
   * Ruft alle erfolgreichen Erinnerungen ab
   * @returns Ein Array der erfolgreichen Erinnerungen
   */
  async getSuccessful(): Promise<ErinnerungTypen[]> {
    return await erinnerungDB.query<ErinnerungTypen>((erinnerung) => {
      // Prüft, ob die Eigenschaft existiert und einen Wert hat (nicht undefined)
      return erinnerung.erfolgreichGenutztAm !== undefined;
    });
  },
  
  /**
   * Zählt die Anzahl der Erinnerungen in einer Sammlung
   * @param sammlungId Die ID der Sammlung
   * @returns Die Anzahl der Erinnerungen
   */
  async countBySammlung(sammlungId: string): Promise<number> {
    const erinnerungen = await this.getBySammlung(sammlungId);
    return erinnerungen.length;
  }
};