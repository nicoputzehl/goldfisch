import { useState } from 'react';
import { sammlungStorage } from '@/services/storage/sammlungStorage';
import type { SammlungTypen, CreateSammlungInput } from '@/features/sammlung/types';

export function useCreateSammlung() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSammlung = async (data: CreateSammlungInput): Promise<SammlungTypen | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const neueSammlung = await sammlungStorage.create(data);
      return neueSammlung;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Fehler beim Erstellen der Sammlung';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createSammlung,
    isLoading,
    error
  };
}
