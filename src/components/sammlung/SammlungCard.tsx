import type React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { type SammlungTypen, SammlungsTyp } from '@/features/sammlung/types';
import { SAMMLUNGS_TYP_FELDER } from '@/constants/typen';
import { SPACING, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

// Definieren eines Typs für MaterialCommunityIcons Namen
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface SammlungCardProps {
  sammlung: SammlungTypen;
  erinnerungCount?: number;
  onPress?: () => void;
  onOptionsPress?: () => void;
}

export const SammlungCard = ({
  sammlung,
  erinnerungCount = 0,
  onPress,
  onOptionsPress,
}: SammlungCardProps) => {
  const theme = useTheme();
  const { name, type, bildURL } = sammlung;
  
  const typInfo = SAMMLUNGS_TYP_FELDER[type];
  const iconName = (typInfo?.icon || 'folder') as MaterialIconName;
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/sammlung/${sammlung.id}`);
    }
  };

  return (
    <Surface
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          {bildURL ? (
            <Image source={{ uri: bildURL }} style={styles.coverImage} />
          ) : (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.colors.primaryContainer },
              ]}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={32}
                color={theme.colors.primary}
              />
            </View>
          )}

          <View style={styles.textContainer}>
            <Text
              variant="titleMedium"
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </Text>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name={iconName} size={16} color={theme.colors.onSurfaceVariant} />
              <Text
                variant="bodySmall"
                style={[styles.typeName, { color: theme.colors.onSurfaceVariant }]}
              >
                {typInfo?.typName || 'Sammlung'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name={"text-box" as MaterialIconName} size={16} color={theme.colors.onSurfaceVariant} />
              <Text
                variant="bodySmall"
                style={[styles.count, { color: theme.colors.onSurfaceVariant }]}
              >
                {erinnerungCount} {erinnerungCount === 1 ? 'Erinnerung' : 'Erinnerungen'}
              </Text>
            </View>
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
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.md,
    marginVertical: SPACING.xs,
    marginHorizontal: SPACING.xs,
    ...SHADOWS.small,
  },
  touchable: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    padding: SPACING.md,
  },
  coverImage: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.sm,
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
  title: {
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xxs,
  },
  typeName: {
    marginLeft: SPACING.xs,
  },
  count: {
    marginLeft: SPACING.xs,
  },
  optionsButton: {
    padding: SPACING.xs,
    justifyContent: 'center',
  },
});
