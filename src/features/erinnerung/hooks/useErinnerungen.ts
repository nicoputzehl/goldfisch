import { useEffect, useState } from "react";
import type { ErinnerungTypen } from "../types";
import { erinnerungStorage } from "@/services/storage/erinnerungStorage";

export function useErinnerungen(sammlungId: string) {
    const [erinnerungen, setErinnerungen] = useState<ErinnerungTypen[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadErinnerungen = async () => {
        setIsLoading(true);
        setError(null);
    
        try {
          const results = await erinnerungStorage.getBySammlung(sammlungId);
          setErinnerungen(results);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Fehler beim Laden der Sammlungen';
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };

      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
        loadErinnerungen();
      }, []);

      const refresh = () => {
        loadErinnerungen();
      };

      return {
        erinnerungen,
        isLoading,
        error,
        refresh
      };
}