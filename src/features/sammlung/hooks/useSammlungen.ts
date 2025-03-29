import { useState, useEffect } from 'react';
import { sammlungStorage } from '@/services/storage/sammlungStorage';
import type { SammlungTypen } from '@/features/sammlung/types';

export function useSammlungen() {
  const [sammlungen, setSammlungen] = useState<SammlungTypen[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSammlungen = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await sammlungStorage.getAll();
      setSammlungen(results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Fehler beim Laden der Sammlungen';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    loadSammlungen();
  }, []);

  const refresh = () => {
    loadSammlungen();
  };

  return {
    sammlungen,
    isLoading,
    error,
    refresh
  };
}
