import type React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card as PaperCard, Text, useTheme, IconButton, Avatar } from 'react-native-paper';
import { SHADOWS, SPACING, BORDER_RADIUS } from '@/constants/theme';

type CardProps = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  coverImage?: string;
  style?: object;
  contentStyle?: object;
  titleStyle?: object;
  subtitleStyle?: object;
  disabled?: boolean;
  testID?: string;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  actions?: React.ReactNode;
};

export function Card({
  title,
  subtitle,
  onPress,
  children,
  leftIcon,
  rightIcon,
  onRightIconPress,
  coverImage,
  style,
  contentStyle,
  titleStyle,
  subtitleStyle,
  disabled = false,
  testID,
  elevation = 1,
  actions,
}: CardProps) {
  const theme = useTheme();

  const renderRightIcon = () => {
    if (!rightIcon) return null;
    
    return (
      <IconButton
        icon={rightIcon}
        size={20}
        onPress={onRightIconPress}
        disabled={!onRightIconPress}
      />
    );
  };

  return (
    <PaperCard
      style={[styles.card, style]}
      onPress={onPress}
      disabled={disabled || !onPress}
      testID={testID}
      elevation={elevation}
    >
      {coverImage && (
        <PaperCard.Cover source={{ uri: coverImage }} />
      )}
      <PaperCard.Title
        title={title}
        subtitle={subtitle}
        left={leftIcon ? (props) => <Avatar.Icon {...props} icon={leftIcon} /> : undefined}
        right={rightIcon ? () => renderRightIcon() : undefined}
        titleStyle={[styles.title, titleStyle]}
        subtitleStyle={[styles.subtitle, subtitleStyle]}
      />
      {children && (
        <PaperCard.Content style={[styles.content, contentStyle]}>
          {children}
        </PaperCard.Content>
      )}
      {actions && (
        <PaperCard.Actions>
          {actions}
        </PaperCard.Actions>
      )}
    </PaperCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
  }
});
