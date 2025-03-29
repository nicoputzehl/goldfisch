import type React from 'react';
import { useEffect, useState, useCallback } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	ActivityIndicator,
	Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { IconButton, Button, Chip, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, Spacer } from '@/components/ui';
import { erinnerungStorage } from '@/services/storage/erinnerungStorage';
import type {
	ErinnerungTypen,
	FilmErinnerung,
	BuchErinnerung,
	LokalErinnerung,
	NotizErinnerung,
	LinkErinnerung,
} from '@/features/erinnerung/types';
import { SPACING } from '@/constants/theme';
import { SammlungsTyp } from '@/features/sammlung/types';




type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];
interface DetailItemProps {
	icon: IconName;
	label: string;
	value: string;
	isLink?: boolean;
}

// DetailItem Component with proper typing
const DetailItem: React.FC<DetailItemProps> = ({
	icon,
	label,
	value,
	isLink = false,
}) => (
	<View style={styles.detailItem}>
		<MaterialCommunityIcons
			name={icon}
			size={20}
			color='#3498db'
			style={styles.detailIcon}
		/>
		<View style={styles.detailContent}>
			<Text style={styles.detailLabel}>{label}</Text>
			<Text style={[styles.detailValue, isLink && styles.linkText]}>
				{value}
			</Text>
		</View>
	</View>
);

export default function ErinnerungDetailScreen() {
	const { id, erinnerungId } = useLocalSearchParams();
	const sammlungId = id as string;
	const erinnerungIdString = erinnerungId as string;

	const [erinnerung, setErinnerung] = useState<ErinnerungTypen | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Laden der Erinnerung
	const loadErinnerung = useCallback(async () => {
		try {
			setError(null);
			setIsLoading(true);

			const data = await erinnerungStorage.getById(erinnerungIdString);
			if (!data) {
				setError('Erinnerung nicht gefunden');
				return;
			}

			setErinnerung(data);
		} catch (err) {
			setError('Fehler beim Laden der Erinnerung');
			console.error('Fehler beim Laden der Erinnerung:', err);
		} finally {
			setIsLoading(false);
		}
	}, [erinnerungIdString]);

	// Erinnerung als erfolgreich markieren
	const markAsSuccess = async () => {
		if (!erinnerung) return;

		try {
			setIsSubmitting(true);

			await erinnerungStorage.markAsSuccess(erinnerung.id);
			// Erinnerung neu laden, um das aktualisierte Datum zu erhalten
			await loadErinnerung();
		} catch (err) {
			console.error('Fehler beim Markieren als erfolgreich:', err);
			Alert.alert(
				'Fehler',
				'Die Erinnerung konnte nicht als erfolgreich markiert werden.'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Erinnerung löschen
	const deleteErinnerung = async () => {
		Alert.alert(
			'Erinnerung löschen',
			'Möchtest du diese Erinnerung wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
			[
				{
					text: 'Abbrechen',
					style: 'cancel',
				},
				{
					text: 'Löschen',
					style: 'destructive',
					onPress: async () => {
						try {
							setIsSubmitting(true);

							await erinnerungStorage.delete(erinnerungIdString);

							// Zurück zur Sammlungsdetailansicht navigieren
							router.replace(`/sammlung/${sammlungId}`);
						} catch (err) {
							console.error('Fehler beim Löschen der Erinnerung:', err);
							Alert.alert(
								'Fehler',
								'Die Erinnerung konnte nicht gelöscht werden.'
							);
							setIsSubmitting(false);
						}
					},
				},
			]
		);
	};

	// Daten laden, wenn die Komponente gemountet wird
	useEffect(() => {
		loadErinnerung();
	}, [loadErinnerung]);

	// Rendern des Ladeindikators
	if (isLoading) {
		return (
			<Container center>
				<ActivityIndicator size='large' color='#3498db' />
			</Container>
		);
	}

	// Rendern des Fehlerzustands
	if (error || !erinnerung) {
		return (
			<Container>
				<View style={styles.header}>
					<IconButton
						icon='arrow-left'
						size={24}
						onPress={() => router.back()}
					/>
					<Text style={styles.title}>Fehler</Text>
				</View>

				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error || 'Unbekannter Fehler'}</Text>
					<Spacer size='md' />
					<Button mode='contained' onPress={loadErinnerung} icon='refresh'>
						Erneut versuchen
					</Button>
				</View>
			</Container>
		);
	}

	// Typspezifische Details rendern
	const renderTypeSpecificDetails = () => {
		switch (erinnerung.sammlungsTyp) {
			case SammlungsTyp.FILM: {
				const filmErinnerung = erinnerung as FilmErinnerung;
				return (
					<>
						{filmErinnerung.regisseur && (
							<DetailItem
								icon='account-outline'
								label='Regisseur'
								value={filmErinnerung.regisseur}
							/>
						)}
						{filmErinnerung.erscheinungsJahr && (
							<DetailItem
								icon='calendar'
								label='Erscheinungsjahr'
								value={filmErinnerung.erscheinungsJahr.toString()}
							/>
						)}
						{filmErinnerung.genre && (
							<DetailItem
								icon='tag-outline'
								label='Genre'
								value={filmErinnerung.genre}
							/>
						)}
						{filmErinnerung.dauer && (
							<DetailItem
								icon='clock-outline'
								label='Dauer'
								value={`${filmErinnerung.dauer} Minuten`}
							/>
						)}
						<DetailItem
							icon={filmErinnerung.gesehen ? 'check-circle' : 'eye-off'}
							label='Status'
							value={filmErinnerung.gesehen ? 'Gesehen' : 'Noch nicht gesehen'}
						/>
					</>
				);
			}

			case SammlungsTyp.BUCH: {
				const buchErinnerung = erinnerung as BuchErinnerung;
				return (
					<>
						{buchErinnerung.autor && (
							<DetailItem
								icon='account-outline'
								label='Autor'
								value={buchErinnerung.autor}
							/>
						)}
						{buchErinnerung.erscheinungsJahr && (
							<DetailItem
								icon='calendar'
								label='Erscheinungsjahr'
								value={buchErinnerung.erscheinungsJahr.toString()}
							/>
						)}
						{buchErinnerung.genre && (
							<DetailItem
								icon='tag-outline'
								label='Genre'
								value={buchErinnerung.genre}
							/>
						)}
						{buchErinnerung.seitenanzahl && (
							<DetailItem
								icon='file-document-outline'
								label='Seitenanzahl'
								value={buchErinnerung.seitenanzahl.toString()}
							/>
						)}
						<DetailItem
							icon={buchErinnerung.gelesen ? 'check-circle' : 'book-outline'}
							label='Status'
							value={buchErinnerung.gelesen ? 'Gelesen' : 'Noch nicht gelesen'}
						/>
					</>
				);
			}

			case SammlungsTyp.LOKAL: {
				const lokalErinnerung = erinnerung as LokalErinnerung;
				return (
					<>
						{lokalErinnerung.adresse && (
							<DetailItem
								icon='map-marker-outline'
								label='Adresse'
								value={lokalErinnerung.adresse}
							/>
						)}
						{lokalErinnerung.kategorie && (
							<DetailItem
								icon='tag-outline'
								label='Kategorie'
								value={lokalErinnerung.kategorie}
							/>
						)}
						{lokalErinnerung.oeffnungszeiten && (
							<DetailItem
								icon='clock-outline'
								label='Öffnungszeiten'
								value={lokalErinnerung.oeffnungszeiten}
							/>
						)}
						{lokalErinnerung.webseite && (
							<DetailItem
								icon='web'
								label='Webseite'
								value={lokalErinnerung.webseite}
								isLink
							/>
						)}
						{lokalErinnerung.telefon && (
							<DetailItem
								icon='phone'
								label='Telefon'
								value={lokalErinnerung.telefon}
							/>
						)}
						<DetailItem
							icon={lokalErinnerung.besucht ? 'check-circle' : 'map-marker'}
							label='Status'
							value={lokalErinnerung.besucht ? 'Besucht' : 'Noch nicht besucht'}
						/>
					</>
				);
			}

			case SammlungsTyp.NOTIZ: {
				const notizErinnerung = erinnerung as NotizErinnerung;
				return (
					<>
						{notizErinnerung.inhalt && (
							<View style={styles.textContentContainer}>
								<Text style={styles.label}>Inhalt</Text>
								<Text style={styles.textContent}>{notizErinnerung.inhalt}</Text>
							</View>
						)}
						{notizErinnerung.prioritaet && (
							<DetailItem
								icon='flag'
								label='Priorität'
								value={
									notizErinnerung.prioritaet.charAt(0).toUpperCase() +
									notizErinnerung.prioritaet.slice(1)
								}
							/>
						)}
					</>
				);
			}

			case SammlungsTyp.LINK: {
				const linkErinnerung = erinnerung as LinkErinnerung;
				return (
					<>
						{linkErinnerung.url && (
							<DetailItem
								icon='link'
								label='URL'
								value={linkErinnerung.url}
								isLink
							/>
						)}
						<DetailItem
							icon={linkErinnerung.besucht ? 'check-circle' : 'open-in-new'}
							label='Status'
							value={linkErinnerung.besucht ? 'Besucht' : 'Noch nicht besucht'}
						/>
					</>
				);
			}

			default:
				return null;
		}
	};

	return (
		<Container>
			<View style={styles.header}>
				<IconButton icon='arrow-left' size={24} onPress={() => router.back()} />
				<Text style={styles.title}>Erinnerung</Text>
				<IconButton
					icon='dots-vertical'
					size={24}
					onPress={() => {
						Alert.alert('Optionen', 'Wähle eine Aktion', [
							{
								text: 'Abbrechen',
								style: 'cancel',
							},
							{
								text: 'Bearbeiten',
								onPress: () => {
									// TODO: Implementieren, wenn Bearbeiten-Funktion hinzugefügt wird
									Alert.alert(
										'Info',
										'Diese Funktion wird in einer zukünftigen Version implementiert.'
									);
								},
							},
							{
								text: 'Löschen',
								style: 'destructive',
								onPress: deleteErinnerung,
							},
						]);
					}}
				/>
			</View>

			<ScrollView style={styles.content}>
				<View style={styles.titleSection}>
					<Text style={styles.erinnerungTitle}>{erinnerung.titel}</Text>
					{erinnerung.erfolgreichGenutztAm ? (
						<View style={styles.successBadge}>
							<MaterialCommunityIcons name='trophy' size={16} color='#fff' />
							<Text style={styles.successText}>Erfolgreich</Text>
						</View>
					) : null}
				</View>

				<Divider style={styles.divider} />

				{renderTypeSpecificDetails()}

				{erinnerung.tags && erinnerung.tags.length > 0 ? (
					<View style={styles.tagsContainer}>
						<Text style={styles.sectionTitle}>Tags</Text>
						<View style={styles.tagsList}>
							{erinnerung.tags.map((tag) => (
								<Chip key={`tag-${tag}`} style={styles.tag}>
									{tag}
								</Chip>
							))}
						</View>
					</View>
				) : null}

				{erinnerung.notizen ? (
					<View style={styles.notizenContainer}>
						<Text style={styles.sectionTitle}>Notizen</Text>
						<Text style={styles.notizen}>{erinnerung.notizen}</Text>
					</View>
				) : null}

				<View style={styles.metaInfo}>
					<Text style={styles.metaText}>
						Erstellt am:{' '}
						{new Date(erinnerung.erstelltAm).toLocaleDateString('de-DE')}
					</Text>
					<Text style={styles.metaText}>
						Aktualisiert am:{' '}
						{new Date(erinnerung.aktualisiertAm).toLocaleDateString('de-DE')}
					</Text>
					{erinnerung.erfolgreichGenutztAm && (
						<Text style={styles.metaText}>
							Erfolgreich genutzt am:{' '}
							{new Date(erinnerung.erfolgreichGenutztAm).toLocaleDateString(
								'de-DE'
							)}
						</Text>
					)}
				</View>

				<Spacer size='lg' />

				<View style={styles.actionButtons}>
					{!erinnerung.erfolgreichGenutztAm && (
						<Button
							mode='contained'
							icon='trophy'
							onPress={markAsSuccess}
							loading={isSubmitting}
							disabled={isSubmitting}
							style={styles.successButton}
						>
							Als erfolgreich markieren
						</Button>
					)}

					<Button
						mode='outlined'
						icon='pencil'
						onPress={() => {
							// TODO: Implementieren, wenn Bearbeiten-Funktion hinzugefügt wird
							Alert.alert(
								'Info',
								'Diese Funktion wird in einer zukünftigen Version implementiert.'
							);
						}}
						disabled={isSubmitting}
						style={styles.actionButton}
					>
						Bearbeiten
					</Button>

					<Button
						mode='outlined'
						icon='delete'
						onPress={deleteErinnerung}
						disabled={isSubmitting}
						style={[styles.actionButton, styles.dangerButton]}
					>
						Löschen
					</Button>
				</View>

				<Spacer size='xl' />
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.md,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		flex: 1,
		textAlign: 'center',
	},
	content: {
		flex: 1,
		padding: SPACING.md,
	},
	titleSection: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: SPACING.md,
	},
	erinnerungTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		flex: 1,
	},
	successBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#2ecc71',
		borderRadius: 16,
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
		marginLeft: SPACING.sm,
	},
	successText: {
		color: '#fff',
		fontSize: 12,
		fontWeight: 'bold',
		marginLeft: 4,
	},
	divider: {
		marginBottom: SPACING.md,
	},
	detailItem: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: SPACING.md,
	},
	detailIcon: {
		marginRight: SPACING.sm,
		marginTop: 2,
	},
	detailContent: {
		flex: 1,
	},
	detailLabel: {
		fontSize: 14,
		color: '#7f8c8d',
		marginBottom: 2,
	},
	detailValue: {
		fontSize: 16,
	},
	linkText: {
		color: '#3498db',
		textDecorationLine: 'underline',
	},
	textContentContainer: {
		marginBottom: SPACING.md,
	},
	label: {
		fontSize: 14,
		color: '#7f8c8d',
		marginBottom: 4,
	},
	textContent: {
		fontSize: 16,
		lineHeight: 24,
		backgroundColor: '#f9f9f9',
		padding: SPACING.md,
		borderRadius: 8,
	},
	tagsContainer: {
		marginVertical: SPACING.md,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: SPACING.sm,
	},
	tagsList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	tag: {
		marginRight: SPACING.xs,
		marginBottom: SPACING.xs,
	},
	notizenContainer: {
		marginVertical: SPACING.md,
	},
	notizen: {
		fontSize: 16,
		lineHeight: 24,
	},
	metaInfo: {
		marginTop: SPACING.md,
		padding: SPACING.md,
		backgroundColor: '#f9f9f9',
		borderRadius: 8,
	},
	metaText: {
		fontSize: 12,
		color: '#7f8c8d',
		marginBottom: 4,
	},
	actionButtons: {
		marginTop: SPACING.lg,
	},
	successButton: {
		marginBottom: SPACING.sm,
	},
	actionButton: {
		marginBottom: SPACING.sm,
	},
	dangerButton: {
		borderColor: '#e74c3c',
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: SPACING.lg,
	},
	errorText: {
		fontSize: 16,
		color: '#e74c3c',
		textAlign: 'center',
	},
});
