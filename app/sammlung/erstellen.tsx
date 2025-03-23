import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';

export default function SammlungErstellenScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.title}>Neue Sammlung</Text>
      </View>
      
      <View style={styles.form}>
        <View style={styles.formField}>
          <Text style={styles.label}>Name der Sammlung</Text>
          <TextInput
            style={styles.input}
            placeholder="z.B. Filme zum Anschauen"
            placeholderTextColor="#95a5a6"
          />
        </View>
        
        <View style={styles.formField}>
          <Text style={styles.label}>Typ</Text>
          <Pressable style={styles.typeSelector}>
            <Text style={styles.typeSelectorText}>Bitte Typ auswählen</Text>
            <Ionicons name="chevron-down" size={20} color="#333" />
          </Pressable>
        </View>
        
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sammlung erstellen</Text>
        </Pressable>
      </View>
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
  typeSelector: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeSelectorText: {
    fontSize: 16,
    color: '#95a5a6',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
