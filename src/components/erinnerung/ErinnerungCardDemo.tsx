import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { ErinnerungCard } from './ErinnerungCard';
import { SammlungsTyp } from '@/features/sammlung/types';
import { SPACING } from '@/constants/theme';

export const ErinnerungCardDemo = () => {
  // Mock-Erinnerungen für die Demo
  const erinnerungen = [
    {
      id: '1',
      sammlungId: 'sammlung_1',
      sammlungsTyp: SammlungsTyp.FILM,
      titel: 'Inception',
      regisseur: 'Christopher Nolan',
      erscheinungsJahr: 2010,
      gesehen: true,
      bewertung: 5,
      tags: ['Sci-Fi', 'Thriller', 'Traum'],
      erstelltAm: new Date(),
      aktualisiertAm: new Date(),
      erfolgreichGenutztAm: new Date(2021, 5, 15),
    },
    {
      id: '2',
      sammlungId: 'sammlung_1',
      sammlungsTyp: SammlungsTyp.FILM,
      titel: 'The Dark Knight',
      regisseur: 'Christopher Nolan',
      erscheinungsJahr: 2008,
      gesehen: false,
      tags: ['Action', 'Superhelden', 'Batman'],
      erstelltAm: new Date(),
      aktualisiertAm: new Date(),
    },
    {
      id: '3',
      sammlungId: 'sammlung_2',
      sammlungsTyp: SammlungsTyp.BUCH,
      titel: 'Die Känguru-Chroniken',
      autor: 'Marc-Uwe Kling',
      erscheinungsJahr: 2009,
      gelesen: true,
      tags: ['Humor', 'Satire'],
      erstelltAm: new Date(),
      aktualisiertAm: new Date(),
      erfolgreichGenutztAm: new Date(2022, 2, 10),
      bildURLs: ['https://example.com/kaenguru.jpg']
    },
    {
      id: '4',
      sammlungId: 'sammlung_3',
      sammlungsTyp: SammlungsTyp.LOKAL,
      titel: 'Berliner Fernsehturm Restaurant',
      adresse: 'Panoramastraße 1A, 10178 Berlin',
      kategorie: 'Restaurant',
      besucht: false,
      tags: ['Berlin', 'Aussicht', 'Speziell'],
      erstelltAm: new Date(),
      aktualisiertAm: new Date(),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>
        Erinnerung Cards
      </Text>
      
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.subheading}>
          Standard-Cards
        </Text>
        
        {erinnerungen.map((erinnerung) => (
          <ErinnerungCard
            key={erinnerung.id}
            erinnerung={erinnerung}
            onOptionsPress={() => alert(`Optionen für ${erinnerung.titel}`)}
          />
        ))}
      </View>
      
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.subheading}>
          Kompakte Cards
        </Text>
        
        {erinnerungen.map((erinnerung) => (
          <ErinnerungCard
            key={`compact-${erinnerung.id}`}
            erinnerung={erinnerung}
            compact
          />
        ))}
      </View>
      
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.subheading}>
          Ohne Optionen-Button
        </Text>
        
        <ErinnerungCard
          erinnerung={erinnerungen[0]}
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
