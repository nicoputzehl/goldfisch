import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SucheScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suche</Text>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color="#95a5a6" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Nach Erinnerungen suchen..."
          placeholderTextColor="#95a5a6"
        />
      </View>
      
      <View style={styles.emptyState}>
        <Ionicons name="search" size={64} color="#95a5a6" />
        <Text style={styles.emptyText}>Gib einen Suchbegriff ein, um Erinnerungen zu finden</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
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
    textAlign: 'center',
  },
});
