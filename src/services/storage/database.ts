import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Abstrakte Klasse für die Datenbankoperationen
 * Bietet eine einheitliche Schnittstelle für CRUD-Operationen
 */
export class Database {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  /**
   * Generiert einen eindeutigen Schlüssel für AsyncStorage
   * @param id Die ID des Elements
   * @returns Der generierte Schlüssel
   */
  private getKey(id: string): string {
    return `${this.prefix}:${id}`;
  }

  /**
   * Speichert ein Objekt in AsyncStorage
   * @param id Die ID des Objekts
   * @param data Das zu speichernde Objekt
   */
  async set<T>(id: string, data: T): Promise<void> {
    try {
      const key = this.getKey(id);
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Fehler beim Speichern der Daten:', error);
      throw new Error('Daten konnten nicht gespeichert werden.');
    }
  }

  /**
   * Ruft ein Objekt aus AsyncStorage ab
   * @param id Die ID des Objekts
   * @returns Das abgerufene Objekt oder null, wenn nicht gefunden
   */
  async get<T>(id: string): Promise<T | null> {
    try {
      const key = this.getKey(id);
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      throw new Error('Daten konnten nicht abgerufen werden.');
    }
  }

  /**
   * Löscht ein Objekt aus AsyncStorage
   * @param id Die ID des Objekts
   */
  async remove(id: string): Promise<void> {
    try {
      const key = this.getKey(id);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Fehler beim Löschen der Daten:', error);
      throw new Error('Daten konnten nicht gelöscht werden.');
    }
  }

  /**
   * Ruft alle Objekte mit einem bestimmten Präfix ab
   * @returns Ein Array aller Objekte
   */
  async getAll<T>(): Promise<T[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter(key => key.startsWith(this.prefix));
      
      if (filteredKeys.length === 0) {
        return [];
      }

      const jsonValues = await AsyncStorage.multiGet(filteredKeys);
      return jsonValues
        .map(([_, value]) => (value ? JSON.parse(value) : null))
        .filter((item): item is T => item !== null);
    } catch (error) {
      console.error('Fehler beim Abrufen aller Daten:', error);
      throw new Error('Daten konnten nicht abgerufen werden.');
    }
  }

  /**
   * Aktualisiert ein Objekt in AsyncStorage
   * @param id Die ID des Objekts
   * @param updateFn Eine Funktion zur Aktualisierung des Objekts
   * @returns Das aktualisierte Objekt oder null, wenn nicht gefunden
   */
  async update<T>(id: string, updateFn: (data: T) => T): Promise<T | null> {
    try {
      const data = await this.get<T>(id);
      if (data === null) {
        return null;
      }

      const updatedData = updateFn(data);
      await this.set(id, updatedData);
      return updatedData;
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Daten:', error);
      throw new Error('Daten konnten nicht aktualisiert werden.');
    }
  }

  /**
   * Sucht nach Objekten, die bestimmte Kriterien erfüllen
   * @param predicate Eine Filterfunktion
   * @returns Ein Array der gefilterten Objekte
   */
  async query<T>(predicate: (data: T) => boolean): Promise<T[]> {
    try {
      const allData = await this.getAll<T>();
      return allData.filter(predicate);
    } catch (error) {
      console.error('Fehler bei der Abfrage:', error);
      throw new Error('Abfrage konnte nicht ausgeführt werden.');
    }
  }

  /**
   * Löscht alle Daten mit dem aktuellen Präfix
   */
  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter(key => key.startsWith(this.prefix));
      
      if (filteredKeys.length > 0) {
        await AsyncStorage.multiRemove(filteredKeys);
      }
    } catch (error) {
      console.error('Fehler beim Löschen aller Daten:', error);
      throw new Error('Daten konnten nicht gelöscht werden.');
    }
  }
}

// Singleton-Instanzen für unterschiedliche Datentypen
export const sammlungDB = new Database('sammlung');
export const erinnerungDB = new Database('erinnerung');
export const tagDB = new Database('tag');