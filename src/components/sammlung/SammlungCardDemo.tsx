import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { SammlungCard } from './SammlungCard';
import { SammlungsTyp } from '@/features/sammlung/types';
import { SPACING } from '@/constants/theme';

export const SammlungCardDemo = () => {
  const sammlungen = [
    {
      id: '1',
      name: 'Meine Filme',
      type: SammlungsTyp.FILM,
      erstelltAm: new Date(),
      aktualisiertAm: new Date(),
      plattform: 'Netflix',
    },
    {
      id: '2',
      name: 'Restaurants in Berlin',
      type: SammlungsTyp.LOKAL,
      erstelltAm: new Date(),
      aktualisiertAm: new Date(),
      kategorie: 'Restaurant',
    },
    {
      id: '3',
      name: 'Bücher 2024',
      type: SammlungsTyp.BUCH,
      erstelltAm: new Date(),
      aktualisiertAm: new Date(),
      genre: 'Sachbuch',
    },
    {
      id: '4',
      name: 'Rezepte für Desserts',
      type: SammlungsTyp.REZEPT,
      erstelltAm: new Date(),
      aktualisiertAm: new Date(),
      kategorie: 'Dessert',
      bildURL: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>
        Sammlung Cards
      </Text>
      
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.subheading}>
          Standard-Cards
        </Text>
        
        {sammlungen.map((sammlung) => (
          <SammlungCard
            key={sammlung.id}
            sammlung={sammlung}
            erinnerungCount={Math.floor(Math.random() * 20)}
            onOptionsPress={() => alert(`Optionen für ${sammlung.name}`)}
          />
        ))}
      </View>
      
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.subheading}>
          Einzelne Erinnerung
        </Text>
        
        <SammlungCard
          sammlung={sammlungen[0]}
          erinnerungCount={1}
        />
      </View>
      
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.subheading}>
          Ohne Optionen-Button
        </Text>
        
        <SammlungCard
          sammlung={sammlungen[1]}
          erinnerungCount={8}
        />
      </View>
      
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.subheading}>
          Mit Titelbild
        </Text>
        
        <SammlungCard
          sammlung={sammlungen[3]}
          erinnerungCount={12}
          onOptionsPress={() => alert(`Optionen für ${sammlungen[3].name}`)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  heading: {
    marginVertical: SPACING.md,
  },
  subheading: {
    marginVertical: SPACING.sm,
  },
  section: {
    marginBottom: SPACING.lg,
  },
});
