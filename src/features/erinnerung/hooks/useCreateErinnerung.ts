import { useState } from 'react';
import { erinnerungStorage } from '@/services/storage/erinnerungStorage';
import type { ErinnerungTypen, CreateErinnerungInput } from '@/features/erinnerung/types';

export function useCreateErinnerung() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createErinnerung = async (data: CreateErinnerungInput): Promise<ErinnerungTypen | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const neueErinnerung = await erinnerungStorage.create(data);
      return neueErinnerung;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Fehler beim Erstellen der Erinnerung';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createErinnerung,
    isLoading,
    error
  };
}