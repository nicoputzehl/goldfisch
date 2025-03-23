import { useLocalSearchParams, router } from 'expo-router';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ErinnerungErstellenScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.title}>Neue Erinnerung</Text>
      </View>
      
      <ScrollView style={styles.form}>
        <Text style={styles.formTitle}>Neue Erinnerung für Sammlung {id}</Text>
        
        <View style={styles.formField}>
          <Text style={styles.label}>Titel</Text>
          <TextInput
            style={styles.input}
            placeholder="Titel der Erinnerung eingeben"
            placeholderTextColor="#95a5a6"
          />
        </View>
        
        <View style={styles.formField}>
          <Text style={styles.label}>Beschreibung (optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Beschreibung eingeben"
            placeholderTextColor="#95a5a6"
            multiline
            numberOfLines={4}
          />
        </View>
        
        <View style={styles.formField}>
          <Text style={styles.label}>Tags (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Tags mit Komma trennen"
            placeholderTextColor="#95a5a6"
          />
        </View>
        
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Erinnerung speichern</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  formField: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
