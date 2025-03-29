import type React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Surface, Text, useTheme, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { type ErinnerungTypen, type FilmErinnerung, type BuchErinnerung, type LokalErinnerung } from '@/features/erinnerung/types';
import { SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';
import { SammlungsTyp } from '@/features/sammlung/types';
import { SAMMLUNGS_TYP_FELDER } from '@/constants/typen';

// Definieren eines Typs für MaterialCommunityIcons Namen
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface ErinnerungCardProps {
  erinnerung: ErinnerungTypen;
  onPress?: () => void;
  onOptionsPress?: () => void;
  compact?: boolean;
}

export function ErinnerungCard({
  erinnerung,
  onPress,
  onOptionsPress,
  compact = false,
}: ErinnerungCardProps) {
  const theme = useTheme();
  const { titel, sammlungId, sammlungsTyp, tags = [], bildURLs = [], erfolgreichGenutztAm } = erinnerung;
  
  const typInfo = SAMMLUNGS_TYP_FELDER[sammlungsTyp];
  const iconName = (typInfo?.icon || 'text-box') as MaterialIconName;
  
  // Vorschaubild auswählen (das erste, falls vorhanden)
  const previewImage = bildURLs && bildURLs.length > 0 ? bildURLs[0] : undefined;
  
  // Spezifische Eigenschaften basierend auf dem Typ anzeigen
  const renderTypeSpecificInfo = () => {
    if (compact) return null;
    
    switch (sammlungsTyp) {
      case SammlungsTyp.FILM:
        const filmErinnerung = erinnerung as FilmErinnerung;
        return (
          <>
            {filmErinnerung.regisseur && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="movie-outline" size={16} color={theme.colors.onSurfaceVariant} />
                <Text variant="bodySmall" style={styles.infoText}>
                  {filmErinnerung.regisseur}
                  {filmErinnerung.erscheinungsJahr ? ` (${filmErinnerung.erscheinungsJahr})` : ''}
                </Text>
              </View>
            )}
            {filmErinnerung.gesehen !== undefined && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons 
                  name={filmErinnerung.gesehen ? "check-circle-outline" : "timer-outline"} 
                  size={16} 
                  color={theme.colors.onSurfaceVariant} 
                />
                <Text variant="bodySmall" style={styles.infoText}>
                  {filmErinnerung.gesehen ? 'Gesehen' : 'Noch nicht gesehen'}
                </Text>
              </View>
            )}
          </>
        );
      
      case SammlungsTyp.BUCH:
        const buchErinnerung = erinnerung as BuchErinnerung;
        return (
          <>
            {buchErinnerung.autor && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="account-outline" size={16} color={theme.colors.onSurfaceVariant} />
                <Text variant="bodySmall" style={styles.infoText}>
                  {buchErinnerung.autor}
                  {buchErinnerung.erscheinungsJahr ? ` (${buchErinnerung.erscheinungsJahr})` : ''}
                </Text>
              </View>
            )}
            {buchErinnerung.gelesen !== undefined && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons 
                  name={buchErinnerung.gelesen ? "check-circle-outline" : "book-outline"} 
                  size={16} 
                  color={theme.colors.onSurfaceVariant} 
                />
                <Text variant="bodySmall" style={styles.infoText}>
                  {buchErinnerung.gelesen ? 'Gelesen' : 'Noch nicht gelesen'}
                </Text>
              </View>
            )}
          </>
        );
        
      case SammlungsTyp.LOKAL:
        const lokalErinnerung = erinnerung as LokalErinnerung;
        return (
          <>
            {lokalErinnerung.adresse && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="map-marker-outline" size={16} color={theme.colors.onSurfaceVariant} />
                <Text variant="bodySmall" style={styles.infoText} numberOfLines={1}>
                  {lokalErinnerung.adresse}
                </Text>
              </View>
            )}
            {lokalErinnerung.besucht !== undefined && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons 
                  name={lokalErinnerung.besucht ? "check-circle-outline" : "calendar-outline"} 
                  size={16} 
                  color={theme.colors.onSurfaceVariant} 
                />
                <Text variant="bodySmall" style={styles.infoText}>
                  {lokalErinnerung.besucht ? 'Besucht' : 'Noch nicht besucht'}
                </Text>
              </View>
            )}
          </>
        );
      
      default:
        return null;
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/sammlung/${sammlungId}/erinnerung/${erinnerung.id}`);
    }
  };
  
  return (
    <Surface
      style={[
        styles.container,
        compact && styles.compactContainer,
        { backgroundColor: theme.colors.surface },
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          {previewImage ? (
            <Image source={{ uri: previewImage }} style={[styles.image, compact && styles.compactImage]} />
          ) : (
            <View
              style={[
                styles.iconContainer,
                compact && styles.compactImage,
                { backgroundColor: theme.colors.primaryContainer },
              ]}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={compact ? 24 : 32}
                color={theme.colors.primary}
              />
            </View>
          )}

          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text
                variant={compact ? "bodyMedium" : "titleMedium"}
                style={[styles.title, compact && styles.compactTitle]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {titel}
              </Text>
              
              {erfolgreichGenutztAm && (
                <MaterialCommunityIcons
                  name="trophy"
                  size={16}
                  color={theme.colors.tertiary}
                  style={styles.successIcon}
                />
              )}
            </View>
            
            {renderTypeSpecificInfo()}
            
            {!compact && tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {tags.slice(0, 3).map((tag, index) => (
                  <Chip 
                    key={index} 
                    style={styles.tag} 
                    textStyle={styles.tagText}
                    compact
                  >
                    {tag}
                  </Chip>
                ))}
                {tags.length > 3 && (
                  <Text style={styles.moreTagsText}>+{tags.length - 3}</Text>
                )}
              </View>
            )}
          </View>

          {onOptionsPress && (
            <TouchableOpacity
              style={styles.optionsButton}
              onPress={onOptionsPress}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <MaterialCommunityIcons
                name={"dots-vertical" as MaterialIconName}
                size={20}
                color={theme.colors.onSurfaceVariant}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.md,
    marginVertical: SPACING.xs,
    marginHorizontal: SPACING.xs,
    ...SHADOWS.small,
  },
  compactContainer: {
    marginVertical: SPACING.xxs,
  },
  touchable: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    padding: SPACING.md,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.sm,
  },
  compactImage: {
    width: 50,
    height: 50,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xxs,
  },
  title: {
    fontWeight: '500',
    flex: 1,
  },
  compactTitle: {
    marginBottom: 0,
  },
  successIcon: {
    marginLeft: SPACING.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xxs,
  },
  infoText: {
    marginLeft: SPACING.xs,
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.sm,
  },
  tag: {
    marginRight: SPACING.xs,
    marginBottom: SPACING.xxs,
    height: 24,
  },
  tagText: {
    fontSize: 10,
  },
  moreTagsText: {
    fontSize: 10,
    color: '#95a5a6',
    marginLeft: SPACING.xs,
    alignSelf: 'center',
  },
  optionsButton: {
    padding: SPACING.xs,
    justifyContent: 'center',
  },
});
