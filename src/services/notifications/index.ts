import * as ExpoNotifications from 'expo-notifications';
import { Platform } from 'react-native';
import { erinnerungExtendedStorage } from '../storage/erinnerungExtendedStorage';
import type { ErinnerungTypen } from '@/features/erinnerung/types';

// Benötigter Typ für Erinnerungen mit Datumsfeld
export type ErinnerungMitDatum = ErinnerungTypen & {
  erinnerungsDatum?: Date;
  benachrichtigungId?: string;
};

/**
 * Service zur Verwaltung von App-Benachrichtigungen
 */
export const notificationService = {
  /**
   * Initialisiert den Benachrichtigungsservice
   */
  async initialize(): Promise<boolean> {
    try {
      // Berechtigungen für Benachrichtigungen anfordern
      const { status: existingStatus } = await ExpoNotifications.getPermissionsAsync();
      
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await ExpoNotifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.warn('Benachrichtigungsberechtigungen nicht erteilt');
        return false;
      }
      
      // Konfigurieren, wie Benachrichtigungen im Vordergrund angezeigt werden
      ExpoNotifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
      
      return true;
    } catch (error) {
      console.error('Fehler bei der Initialisierung des Benachrichtigungsservice:', error);
      return false;
    }
  },
  
  /**
   * Plant eine lokale Benachrichtigung
   * @param titel Der Titel der Benachrichtigung
   * @param nachricht Die Nachricht der Benachrichtigung
   * @param datum Das Datum, an dem die Benachrichtigung angezeigt werden soll
   * @param daten Zusätzliche Daten für die Benachrichtigung
   * @returns Die ID der geplanten Benachrichtigung
   */
  async scheduleNotification(
    titel: string,
    nachricht: string,
    datum: Date,
    daten: Record<string, unknown> = {}
  ): Promise<string> {
    try {
      // Benachrichtigung planen
      const identifier = await ExpoNotifications.scheduleNotificationAsync({
        content: {
          title: titel,
          body: nachricht,
          data: daten,
          sound: true,
        },
        trigger: {
          date: datum,
          type: ExpoNotifications.SchedulableTriggerInputTypes.DATE
        },
      });
      
      return identifier;
    } catch (error) {
      console.error('Fehler beim Planen der Benachrichtigung:', error);
      throw new Error('Benachrichtigung konnte nicht geplant werden');
    }
  },
  
  /**
   * Bricht eine geplante Benachrichtigung ab
   * @param notificationId Die ID der Benachrichtigung
   */
  async cancelNotification(notificationId: string): Promise<void> {
    try {
      await ExpoNotifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Fehler beim Abbrechen der Benachrichtigung:', error);
      throw new Error('Benachrichtigung konnte nicht abgebrochen werden');
    }
  },
  
  /**
   * Registriert einen Handler für eingehende Benachrichtigungen
   * @param handler Die Funktion, die aufgerufen wird, wenn eine Benachrichtigung eingeht
   * @returns Ein Objekt mit einer remove-Funktion zum Entfernen des Handlers
   */
  registerNotificationHandler(
    handler: (response: ExpoNotifications.NotificationResponse) => void
  ): { remove: () => void } {
    const subscription = ExpoNotifications.addNotificationResponseReceivedListener(handler);
    
    return {
      remove: () => subscription.remove(),
    };
  },
  
  /**
   * Aktualisiert eine bestehende Benachrichtigung für eine Erinnerung
   * @param erinnerungId Die ID der Erinnerung
   * @param titel Der Titel der Benachrichtigung
   * @param nachricht Die Nachricht der Benachrichtigung
   * @param neuesDatum Das neue Datum für die Benachrichtigung
   */
  async updateErinnerungBenachrichtigung(
    erinnerungId: string,
    titel: string,
    nachricht: string,
    neuesDatum: Date
  ): Promise<void> {
    try {
      // Erinnerungen mit Erinnerungsdatum abrufen
      const erinnerungen = await erinnerungExtendedStorage.getWithReminderDate();
      const targetErinnerung = erinnerungen.find(e => e.id === erinnerungId);
      
      if (!targetErinnerung) {
        throw new Error(`Erinnerung mit ID ${erinnerungId} nicht gefunden oder hat kein Erinnerungsdatum`);
      }
      
      // Vorhandene Benachrichtigung abbrechen, wenn vorhanden
      if (targetErinnerung.benachrichtigungId) {
        await this.cancelNotification(targetErinnerung.benachrichtigungId);
      }
      
      // Neue Benachrichtigung planen
      const newNotificationId = await this.scheduleNotification(
        titel,
        nachricht,
        neuesDatum,
        { erinnerungId }
      );
      
      // Erinnerung mit neuer Benachrichtigungs-ID und Datum aktualisieren
      await erinnerungExtendedStorage.setBenachrichtigungId(erinnerungId, newNotificationId);
      await erinnerungExtendedStorage.setErinnerungsDatum(erinnerungId, neuesDatum);
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Erinnerungsbenachrichtigung:', error);
      throw new Error('Erinnerungsbenachrichtigung konnte nicht aktualisiert werden');
    }
  },
  
  /**
   * Aktualisiert automatisch alle bevorstehenden Benachrichtigungen
   * (nützlich nach App-Neustart)
   */
  async refreshAllNotifications(): Promise<void> {
    try {
      // Alle Erinnerungen mit Erinnerungsdatum abrufen
      const erinnerungen = await erinnerungExtendedStorage.getWithReminderDate();
      const jetzt = new Date();
      
      // Nur Erinnerungen berücksichtigen, deren Datum in der Zukunft liegt
      const zukuenftigeErinnerungen = erinnerungen.filter(e => {
        if (!e.erinnerungsDatum) return false;
        const erinnerungsDatum = new Date(e.erinnerungsDatum);
        return erinnerungsDatum > jetzt;
      });
      
      // Anzahl der aktualisierten Benachrichtigungen zählen
      let aktualisiert = 0;
      
      // Für jede zukünftige Erinnerung die Benachrichtigung neu planen
      for (const erinnerung of zukuenftigeErinnerungen) {
        if (erinnerung.erinnerungsDatum) {
          try {
            // Alte Benachrichtigung abbrechen, falls vorhanden
            if (erinnerung.benachrichtigungId) {
              await this.cancelNotification(erinnerung.benachrichtigungId);
            }
            
            // Neue Benachrichtigung planen
            const newNotificationId = await this.scheduleNotification(
              erinnerung.titel,
              `Erinnerung für: ${erinnerung.titel}`,
              new Date(erinnerung.erinnerungsDatum),
              { erinnerungId: erinnerung.id }
            );
            
            // Benachrichtigungs-ID in der Erinnerung aktualisieren
            await erinnerungExtendedStorage.setBenachrichtigungId(erinnerung.id, newNotificationId);
            
            aktualisiert++;
          } catch (e) {
            console.warn(`Fehler beim Aktualisieren der Benachrichtigung für Erinnerung ${erinnerung.id}:`, e);
          }
        }
      }
      
      console.log(`${aktualisiert} von ${zukuenftigeErinnerungen.length} Benachrichtigungen aktualisiert`);
    } catch (error) {
      console.error('Fehler beim Aktualisieren aller Benachrichtigungen:', error);
      throw new Error('Benachrichtigungen konnten nicht aktualisiert werden');
    }
  }
};
