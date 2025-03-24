import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui';

export default function SammlungenScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meine Sammlungen</Text>

      <View style={styles.emptyState}>
        <Ionicons name="folder-open-outline" size={64} color="#95a5a6" />
        <Text style={styles.emptyText}>Noch keine Sammlungen vorhanden</Text>
        <Link href="/sammlung/erstellen" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Neue Sammlung erstellen</Text>
          </Pressable>
        </Link>
      </View>
            {/* Development only: Theme Demo Link */}
            <View >
        <Link href="/theme-demo" asChild>
          <Button 
            title="Theme Demo ansehen" 
            mode="outlined" 
            icon="palette-outline" 
            onPress={() => {}}
          />
        </Link>
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
});
