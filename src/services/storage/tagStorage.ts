import { tagDB } from './database';
import type { Tag } from '@/features/suche/types';

/**
 * Interface für die Verknüpfung zwischen Erinnerungen und Tags
 */
interface ErinnerungTag {
  id: string;
  erinnerungId: string;
  tagId: string;
  erstelltAm: Date;
}

/**
 * Service zur Verwaltung von Tags in der Datenbank
 */
export const tagStorage = {
  /**
   * Erstellt ein neues Tag
   * @param name Der Name des Tags
   * @returns Das erstellte Tag-Objekt
   */
  async createTag(name: string): Promise<Tag> {
    const id = `tag_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const normalizedName = name.trim().toLowerCase();
    
    const tag: Tag = {
      id,
      name: normalizedName,
      erstelltAm: new Date()
    };
    
    await tagDB.set(id, tag);
    return tag;
  },
  
  /**
   * Ruft alle Tags ab
   * @returns Ein Array aller Tags
   */
  async getAllTags(): Promise<Tag[]> {
    const alleTags = await tagDB.getAll<Tag>();
    
    // Sortiere Tags alphabetisch
    return alleTags.sort((a, b) => a.name.localeCompare(b.name));
  },
  
  /**
   * Ruft ein Tag anhand seines Namens ab oder erstellt es, wenn es nicht existiert
   * @param name Der Name des Tags
   * @returns Das vorhandene oder neu erstellte Tag
   */
  async getOrCreateTag(name: string): Promise<Tag> {
    const normalizedName = name.trim().toLowerCase();
    
    // Suche nach Tag mit dem normalisierten Namen
    const vorhandeneTag = await tagDB.query<Tag>(tag => 
      tag.name.toLowerCase() === normalizedName
    );
    
    // Wenn es bereits existiert, gib es zurück
    if (vorhandeneTag.length > 0) {
      return vorhandeneTag[0];
    }
    
    // Ansonsten erstelle ein neues Tag
    return await this.createTag(normalizedName);
  },
  
  /**
   * Verknüpft ein Tag mit einer Erinnerung
   * @param erinnerungId Die ID der Erinnerung
   * @param tagName Der Name des Tags
   */
  async addTagToErinnerung(erinnerungId: string, tagName: string): Promise<void> {
    // Hole oder erstelle das Tag
    const tag = await this.getOrCreateTag(tagName);
    
    // Erstelle die Verknüpfung
    const erinnerungTag: ErinnerungTag = {
      id: `erinnerung_tag_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      erinnerungId,
      tagId: tag.id,
      erstelltAm: new Date()
    };
    
    // Speichere die Verknüpfung
    await tagDB.set(erinnerungTag.id, erinnerungTag);
  },
  
  /**
   * Entfernt ein Tag von einer Erinnerung
   * @param erinnerungId Die ID der Erinnerung
   * @param tagId Die ID des Tags
   */
  async removeTagFromErinnerung(erinnerungId: string, tagId: string): Promise<void> {
    // Finde die Verknüpfung
    const verknuepfungen = await tagDB.query<ErinnerungTag>(
      verknuepfung => verknuepfung.erinnerungId === erinnerungId && verknuepfung.tagId === tagId
    );
    
    // Wenn eine Verknüpfung gefunden wurde, lösche sie
    if (verknuepfungen.length > 0) {
      await tagDB.remove(verknuepfungen[0].id);
    }
  },
  
  /**
   * Ruft alle Tags einer Erinnerung ab
   * @param erinnerungId Die ID der Erinnerung
   * @returns Ein Array der Tags der Erinnerung
   */
  async getTagsForErinnerung(erinnerungId: string): Promise<Tag[]> {
    // Finde alle Verknüpfungen für die gegebene Erinnerung
    const verknuepfungen = await tagDB.query<ErinnerungTag>(
      verknuepfung => verknuepfung.erinnerungId === erinnerungId
    );
    
    // Wenn keine Verknüpfungen gefunden wurden, gib ein leeres Array zurück
    if (verknuepfungen.length === 0) {
      return [];
    }
    
    // Hole alle tagIds
    const tagIds = verknuepfungen.map(verknuepfung => verknuepfung.tagId);
    
    // Hole alle Tags
    const alleTags = await this.getAllTags();
    
    // Filtere die Tags nach den tagIds
    return alleTags.filter(tag => tagIds.includes(tag.id));
  },
  
  /**
   * Ruft alle Erinnerungen mit einem bestimmten Tag ab
   * @param tagId Die ID des Tags
   * @returns Ein Array der IDs von Erinnerungen mit diesem Tag
   */
  async getErinnerungenForTag(tagId: string): Promise<string[]> {
    // Finde alle Verknüpfungen für den gegebenen Tag
    const verknuepfungen = await tagDB.query<ErinnerungTag>(
      verknuepfung => verknuepfung.tagId === tagId
    );
    
    // Gib die IDs der Erinnerungen zurück
    return verknuepfungen.map(verknuepfung => verknuepfung.erinnerungId);
  },
  
  /**
   * Löscht ein Tag vollständig, einschließlich aller Verknüpfungen
   * @param tagId Die ID des Tags
   */
  async deleteTag(tagId: string): Promise<void> {
    // Lösche das Tag selbst
    await tagDB.remove(tagId);
    
    // Finde alle Verknüpfungen für den gegebenen Tag
    const verknuepfungen = await tagDB.query<ErinnerungTag>(
      verknuepfung => verknuepfung.tagId === tagId
    );
    
    // Lösche alle Verknüpfungen
    for (const verknuepfung of verknuepfungen) {
      await tagDB.remove(verknuepfung.id);
    }
  },
  
  /**
   * Sucht nach Tags, die mit einem bestimmten Text beginnen
   * @param suchbegriff Der Suchbegriff
   * @returns Ein Array der gefundenen Tags
   */
  async searchTags(suchbegriff: string): Promise<Tag[]> {
    const normalizedSuchbegriff = suchbegriff.trim().toLowerCase();
    
    // Wenn der Suchbegriff leer ist, gib alle Tags zurück
    if (normalizedSuchbegriff === '') {
      return this.getAllTags();
    }
    
    // Suche nach Tags, die mit dem normalisierten Suchbegriff beginnen
    return await tagDB.query<Tag>(
      tag => tag.name.toLowerCase().startsWith(normalizedSuchbegriff)
    );
  }
};
