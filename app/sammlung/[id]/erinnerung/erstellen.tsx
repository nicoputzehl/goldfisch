import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { ErinnerungForm, type ErinnerungFormData } from '@/components/erinnerung/ErinnerungForm';
import { useCreateErinnerung } from '@/features/erinnerung/hooks';
import { sammlungStorage } from '@/services/storage/sammlungStorage';
import type { SammlungsTyp } from '@/features/sammlung/types';
import { Container, Spacer } from '@/components/ui';
import { SPACING } from '@/constants/theme';

export default function ErinnerungErstellenScreen() {
  const { id } = useLocalSearchParams();
  const sammlungId = id as string;
  
  const [sammlungsTyp, setSammlungsTyp] = useState<SammlungsTyp | null>(null);
  const [isLoadingSammlung, setIsLoadingSammlung] = useState(true);
  const [sammlungError, setSammlungError] = useState<string | null>(null);
  
  const { createErinnerung, isLoading, error } = useCreateErinnerung();
  
  // Sammlung laden, um den Typ zu ermitteln
  useEffect(() => {
    const loadSammlung = async () => {
      try {
        const sammlung = await sammlungStorage.getById(sammlungId);
        if (sammlung) {
          setSammlungsTyp(sammlung.type);
        } else {
          setSammlungError('Sammlung nicht gefunden');
        }
      } catch (err) {
        setSammlungError('Fehler beim Laden der Sammlung');
      } finally {
        setIsLoadingSammlung(false);
      }
    };
    
    loadSammlung();
  }, [sammlungId]);

  const handleSubmit = async (formData: ErinnerungFormData) => {
    if (!sammlungsTyp) return;
    
    // Daten für die Erstellung einer Erinnerung vorbereiten
    const erinnerungData = {
      sammlungId,
      sammlungsTyp,
      ...formData
    };
    
    const result = await createErinnerung(erinnerungData);
    
    if (result) {
      // Zurück zur Sammlungsdetailansicht navigieren
      router.replace(`/sammlung/${sammlungId}`);
    }
  };

  // Zeige Ladeindikator, während die Sammlung geladen wird
  if (isLoadingSammlung) {
    return (
      <Container center>
        <ActivityIndicator size="large" color="#3498db" />
      </Container>
    );
  }
  
  // Zeige Fehlermeldung, wenn die Sammlung nicht geladen werden konnte
  if (sammlungError || !sammlungsTyp) {
    return (
      <Container>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => router.back()}
          />
          <Text style={styles.title}>Fehler</Text>
        </View>
        
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{sammlungError || 'Unbekannter Fehler'}</Text>
          <Spacer size="md" />
          <IconButton
            icon="refresh"
            size={24}
            onPress={() => router.reload()}
          />
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Neue Erinnerung</Text>
      </View>
      
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <ErinnerungForm
        sammlungsTyp={sammlungsTyp}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isSubmitting={isLoading}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: SPACING.sm,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  errorBanner: {
    backgroundColor: '#ffebee',
    padding: SPACING.md,
    borderRadius: 8,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
  },
  errorText: {
    color: '#b71c1c',
    textAlign: 'center',
  },
});