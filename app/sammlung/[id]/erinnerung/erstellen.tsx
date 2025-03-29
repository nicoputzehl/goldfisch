import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ErinnerungForm, type ErinnerungFormData } from '@/components/erinnerung';
import { useCreateErinnerung } from '@/features/erinnerung/hooks';
import { sammlungStorage } from '@/services/storage/sammlungStorage';
import { Container, Spacer } from '@/components/ui';
import type { SammlungsTyp } from '@/features/sammlung/types';

export default function ErinnerungErstellenScreen() {
  const { id } = useLocalSearchParams();
  const sammlungId = Array.isArray(id) ? id[0] : id;
  
  const [sammlungsTyp, setSammlungsTyp] = useState<SammlungsTyp | null>(null);
  const [sammlungName, setSammlungName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  const { createErinnerung, isLoading: isSubmitting, error: submitError } = useCreateErinnerung();
  
  // Laden der Sammlungsinformationen
  useEffect(() => {
    const loadSammlung = async () => {
      try {
        const sammlung = await sammlungStorage.getById(sammlungId);
        if (sammlung) {
          setSammlungsTyp(sammlung.type);
          setSammlungName(sammlung.name);
        } else {
          setLoadError('Sammlung nicht gefunden');
        }
      } catch (error) {
        setLoadError('Fehler beim Laden der Sammlung');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSammlung();
  }, [sammlungId]);
  
  const handleSubmit = async (data: ErinnerungFormData) => {
    if (!sammlungsTyp) return;
    
    const result = await createErinnerung({
      sammlungId,
      titel: data.titel,
      tags: data.tags,
      notizen: data.notizen,
      // Typspezifische Felder
      regisseur: data.regisseur,
      erscheinungsJahr: data.erscheinungsJahr,
      genre: data.genre,
      dauer: data.dauer,
      autor: data.autor,
      seitenanzahl: data.seitenanzahl,
      adresse: data.adresse,
      kategorie: data.kategorie,
      oeffnungszeiten: data.oeffnungszeiten,
      webseite: data.webseite,
      telefon: data.telefon,
      inhalt: data.inhalt,
      prioritaet: data.prioritaet,
      url: data.url
    });
    
    if (result) {
      // Zurück zur Sammlungsdetailseite navigieren
      router.back();
    }
  };
  
  // Zeigt Ladezustand
  if (isLoading) {
    return (
      <Container center>
        <ActivityIndicator size="large" color="#3498db" />
      </Container>
    );
  }
  
  // Zeigt Fehler an
  if (loadError || !sammlungsTyp) {
    return (
      <Container>
        <View style={styles.header}>
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color="#333" 
            onPress={() => router.back()}
            style={styles.backButton}
          />
          <Text style={styles.title}>Neue Erinnerung</Text>
        </View>
        
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{loadError || 'Unbekannter Fehler beim Laden der Sammlung'}</Text>
        </View>
      </Container>
    );
  }
  
  return (
    <Container>
      <View style={styles.header}>
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color="#333" 
          onPress={() => router.back()}
          style={styles.backButton}
        />
        <Text style={styles.title}>Neue Erinnerung</Text>
      </View>
      
      <Text style={styles.subtitle}>Für Sammlung: {sammlungName}</Text>
      
      {submitError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{submitError}</Text>
        </View>
      )}
      
      <Spacer size="md" />
      
      <ErinnerungForm
        sammlungsTyp={sammlungsTyp}
        sammlungId={sammlungId}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isSubmitting={isSubmitting}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 15,
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#b71c1c',
  }
});