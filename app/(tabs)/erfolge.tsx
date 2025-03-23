import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ErfolgeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meine Erfolge</Text>
      
      <View style={styles.emptyState}>
        <Ionicons name="trophy" size={64} color="#95a5a6" />
        <Text style={styles.emptyText}>Noch keine erfolgreich genutzten Erinnerungen</Text>
        <Text style={styles.subText}>
          Markiere Erinnerungen als erfolgreich genutzt, damit sie hier erscheinen
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
    maxWidth: '80%',
  },
});
