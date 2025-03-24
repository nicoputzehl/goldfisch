import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SammlungForm, type SammlungFormData } from '@/components/sammlung';
import { useCreateSammlung } from '@/features/sammlung/hooks';
import { Container, Spacer } from '@/components/ui';

export default function SammlungErstellenScreen() {
  const { createSammlung, isLoading, error } = useCreateSammlung();

  const handleSubmit = async (data: SammlungFormData) => {
    const result = await createSammlung(data);
    
    if (result) {
      // Zurück zur Startseite navigieren
      router.replace('/(tabs)');
    }
  };

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
        <Text style={styles.title}>Neue Sammlung</Text>
      </View>
      
      <Spacer size="md" />
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <SammlungForm
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
