import type React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card as PaperCard, Avatar, Text } from 'react-native-paper';
import { SHADOWS, SPACING } from '@/constants/theme';

type CardProps = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  leftIcon?: string;
  rightIcon?: string;
  coverImage?: string;
  style?: object;
  contentStyle?: object;
  disabled?: boolean;
  testID?: string;
};

export function Card({
  title,
  subtitle,
  onPress,
  children,
  leftIcon,
  rightIcon,
  coverImage,
  style,
  contentStyle,
  disabled = false,
  testID,
}: CardProps) {
  return (
    <PaperCard
      style={[styles.card, style]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      mode="elevated"
    >
      {coverImage && (
        <PaperCard.Cover source={{ uri: coverImage }} />
      )}
      <PaperCard.Title
        title={title}
        subtitle={subtitle}
        left={leftIcon ? (props) => <Avatar.Icon {...props} icon={leftIcon} /> : undefined}
        right={rightIcon ? (props) => <Avatar.Icon {...props} icon={rightIcon} /> : undefined}
      />
      {children && (
        <PaperCard.Content style={[styles.content, contentStyle]}>
          {children}
        </PaperCard.Content>
      )}
    </PaperCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: SPACING.sm,
    ...SHADOWS.small,
  },
  content: {
    marginTop: SPACING.xs,
  },
});