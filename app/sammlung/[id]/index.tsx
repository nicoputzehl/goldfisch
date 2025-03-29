import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	ActivityIndicator,
	FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useErinnerungen } from '@/features/erinnerung/hooks/useErinnerungen';
import { useCallback } from 'react';
import { Container, ErinnerungCard, Spacer } from '@/components';
import { Button } from 'react-native-paper';

export default function SammlungDetailScreen() {
	const { id } = useLocalSearchParams();
	const { erinnerungen, isLoading, error, refresh } = useErinnerungen(
		id as string
	);

	// Aktualisieren der Sammlungen, wenn der Screen fokussiert wird
	useFocusEffect(
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		useCallback(() => {
			refresh();
		}, [])
	);

	// Rendert den Ladeindikator
	if (isLoading && erinnerungen.length === 0) {
		return (
			<Container center>
				<ActivityIndicator size='large' color='#3498db' />
			</Container>
		);
	}

	// Rendert den Fehlerzustand
	if (error && !isLoading) {
		return (
			<Container>
				<Text style={styles.title}>Meine Sammlungen</Text>
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>
						Fehler beim Laden der Sammlungen:
					</Text>
					<Text style={styles.errorText}>{error}</Text>
					<Spacer size='md' />
					<Button mode='contained' onPress={refresh} icon='refresh'>
						Erneut versuchen
					</Button>
				</View>
			</Container>
		);
	}

	// Rendert den leeren Zustand (keine Sammlungen)
	if (erinnerungen.length === 0 && !isLoading) {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Pressable onPress={() => router.back()} style={styles.backButton}>
						<Ionicons name='arrow-back' size={24} color='#333' />
					</Pressable>
					<Text style={styles.title}>Sammlung {id}</Text>
					<Pressable style={styles.editButton}>
						<Ionicons name='ellipsis-vertical' size={24} color='#333' />
					</Pressable>
				</View>

				<View style={styles.content}>
					<View style={styles.searchContainer}>
						<Ionicons
							name='search-outline'
							size={20}
							color='#95a5a6'
							style={styles.searchIcon}
						/>
						<Text style={styles.searchPlaceholder}>
							In dieser Sammlung suchen...
						</Text>
					</View>

					<View style={styles.emptyState}>
						<Ionicons name='document-text-outline' size={64} color='#95a5a6' />
						<Text style={styles.emptyText}>
							Noch keine Erinnerungen in dieser Sammlung
						</Text>
						<Pressable
							style={styles.button}
							onPress={() =>
								router.push(`/sammlung/${id}/erinnerung/erstellen`)
							}
						>
							<Text style={styles.buttonText}>Erinnerung hinzufügen</Text>
						</Pressable>
					</View>
				</View>
			</View>
		);
	}
	// rendert die Erinnerungen
	return (
		<Container>
			<View style={styles.header}>
				<Text style={styles.title}>Meine Sammlungen</Text>
				<Button
					mode='contained'
					icon='plus'
					onPress={() => router.push(`/sammlung/${id}/erinnerung/erstellen`)}
				>
					Neue Erinnerung
				</Button>
			</View>

			<FlatList
				data={erinnerungen}
				renderItem={({ item }) => (
					<ErinnerungCard
						erinnerung={item}
						onOptionsPress={() => console.log('Optionen für', item.titel)}
					/>
				)}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.listContent}
				ItemSeparatorComponent={() => <Spacer size='xs' />}
				ListFooterComponent={() => <Spacer size='xl' />}
				onRefresh={refresh}
				refreshing={isLoading}
			/>
		</Container>
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
		justifyContent: 'space-between',
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
		flex: 1,
	},
	editButton: {
		padding: 5,
	},
	content: {
		flex: 1,
		padding: 20,
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
	searchPlaceholder: {
		fontSize: 16,
		color: '#95a5a6',
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
	listContent: {
		paddingBottom: 20,
	},
});
