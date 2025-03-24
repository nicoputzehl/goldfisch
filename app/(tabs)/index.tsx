import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { Link, router, useFocusEffect } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SammlungCard } from '@/components/sammlung';
import { useSammlungen } from '@/features/sammlung/hooks';
import { erinnerungStorage } from '@/services/storage/erinnerungStorage';
import { Container, Spacer } from '@/components/ui';
import { Button } from 'react-native-paper';

export default function SammlungenScreen() {
  const { sammlungen, isLoading, error, refresh } = useSammlungen();
  const [erinnerungCounts, setErinnerungCounts] = useState<Record<string, number>>({});

  // Laden der Anzahl der Erinnerungen
  const loadErinnerungCounts = async () => {
    const counts: Record<string, number> = {};
    for (const sammlung of sammlungen) {
      counts[sammlung.id] = await erinnerungStorage.countBySammlung(sammlung.id);
    }
    setErinnerungCounts(counts);
  };

  // Aktualisieren der Daten, wenn sich Sammlungen ändern
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    if (sammlungen.length > 0) {
      loadErinnerungCounts();
    }
  }, [sammlungen]);

  // Aktualisieren der Sammlungen, wenn der Screen fokussiert wird
  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useCallback(() => {
      refresh();
    }, [])
  );

  // Rendert den Ladeindikator
  if (isLoading && sammlungen.length === 0) {
    return (
      <Container center>
        <ActivityIndicator size="large" color="#3498db" />
      </Container>
    );
  }

  // Rendert den Fehlerzustand
  if (error && !isLoading) {
    return (
      <Container>
        <Text style={styles.title}>Meine Sammlungen</Text>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Fehler beim Laden der Sammlungen:</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Spacer size="md" />
          <Button 
            mode="contained" 
            onPress={refresh}
            icon="refresh"
          >
            Erneut versuchen
          </Button>
        </View>
      </Container>
    );
  }

  // Rendert den leeren Zustand (keine Sammlungen)
  if (sammlungen.length === 0 && !isLoading) {
    return (
      <Container>
        <Text style={styles.title}>Meine Sammlungen</Text>

        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="folder-open" size={64} color="#95a5a6" />
          <Text style={styles.emptyText}>Noch keine Sammlungen vorhanden</Text>
          <Pressable 
            style={styles.button}
            onPress={() => router.push('/sammlung/erstellen')}
          >
            <Text style={styles.buttonText}>Neue Sammlung erstellen</Text>
          </Pressable>
        </View>

        {/* Development only: Theme Demo Link */}
        <View style={styles.devLinks}>
          <Button 
            mode="outlined" 
            icon="palette"
            onPress={() => router.push('/theme-demo')}
          >
            Theme Demo ansehen
          </Button>
          <Spacer size="sm" />
          <Button 
            mode="outlined" 
            icon="palette"
            onPress={() => router.push('/sammlung-card-demo')}
          >
            Sammlung Card Demo ansehen
          </Button>
        </View>
      </Container>
    );
  }

  // Rendert die Sammlungsansicht
  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Meine Sammlungen</Text>
        <Button 
          mode="contained" 
          icon="plus"
          onPress={() => router.push('/sammlung/erstellen')}
        >
          Neue Sammlung
        </Button>
      </View>

      <FlatList
        data={sammlungen}
        renderItem={({ item }) => (
          <SammlungCard
            sammlung={item}
            erinnerungCount={erinnerungCounts[item.id] || 0}
            onOptionsPress={() => console.log('Optionen für', item.name)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <Spacer size="xs" />}
        ListFooterComponent={() => <Spacer size="xl" />}
        onRefresh={refresh}
        refreshing={isLoading}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#95a5a6',
    marginTop: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 8,
  },
  devLinks: {
    padding: 20,
    marginTop: 20,
  },
});
