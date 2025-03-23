import { sammlungDB } from './database';
import type { SammlungTypen, CreateSammlungInput, UpdateSammlungInput } from '@/features/sammlung/types';

/**
 * Service zur Verwaltung von Sammlungen in der Datenbank
 */
export const sammlungStorage = {
  /**
   * Speichert eine neue Sammlung in der Datenbank
   * @param sammlung Die zu speichernde Sammlung
   * @returns Die gespeicherte Sammlung mit generierter ID
   */
  async create(input: CreateSammlungInput): Promise<SammlungTypen> {
    // Generiert eine eindeutige ID
    const id = `sammlung_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    // Erstellt Zeitstempel
    const jetzt = new Date();
    
    // Erstellt das vollständige Sammlungsobjekt
    const sammlung = {
      ...input,
      id,
      erstelltAm: jetzt,
      aktualisiertAm: jetzt
    } as SammlungTypen;
    
    // Speichert die Sammlung in der Datenbank
    await sammlungDB.set(id, sammlung);
    
    return sammlung;
  },
  
  /**
   * Ruft eine Sammlung anhand ihrer ID ab
   * @param id Die ID der Sammlung
   * @returns Die gefundene Sammlung oder null, wenn nicht gefunden
   */
  async getById(id: string): Promise<SammlungTypen | null> {
    return await sammlungDB.get<SammlungTypen>(id);
  },
  
  /**
   * Ruft alle Sammlungen ab
   * @returns Ein Array aller Sammlungen
   */
  async getAll(): Promise<SammlungTypen[]> {
    // Holt alle Sammlungen und sortiert sie nach Erstellungsdatum (neueste zuerst)
    const alleSammlungen = await sammlungDB.getAll<SammlungTypen>();
    
    return alleSammlungen.sort((a, b) => {
      const dateA = new Date(a.erstelltAm).getTime();
      const dateB = new Date(b.erstelltAm).getTime();
      return dateB - dateA;
    });
  },
  
  /**
   * Aktualisiert eine Sammlung
   * @param id Die ID der zu aktualisierenden Sammlung
   * @param updates Die Aktualisierungen
   * @returns Die aktualisierte Sammlung oder null, wenn nicht gefunden
   */
  async update(id: string, updates: UpdateSammlungInput): Promise<SammlungTypen | null> {
    return await sammlungDB.update<SammlungTypen>(id, (sammlung) => {
      return {
        ...sammlung,
        ...updates,
        aktualisiertAm: new Date()
      };
    });
  },
  
  /**
   * Löscht eine Sammlung
   * @param id Die ID der zu löschenden Sammlung
   */
  async delete(id: string): Promise<void> {
    await sammlungDB.remove(id);
  },
  
  /**
   * Sucht nach Sammlungen anhand des Namens
   * @param suchbegriff Der Suchbegriff
   * @returns Ein Array der gefundenen Sammlungen
   */
  async searchByName(suchbegriff: string): Promise<SammlungTypen[]> {
    const lowerCaseSuchbegriff = suchbegriff.toLowerCase();
    
    return await sammlungDB.query<SammlungTypen>((sammlung) => {
      return sammlung.name.toLowerCase().includes(lowerCaseSuchbegriff);
    });
  },
  
  /**
   * Zählt die Anzahl der Sammlungen
   * @returns Die Anzahl der Sammlungen
   */
  async count(): Promise<number> {
    const sammlungen = await sammlungDB.getAll<SammlungTypen>();
    return sammlungen.length;
  }
};