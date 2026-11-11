import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export default function Card({ children, onPress, style }) {
  const { colors, radius, spacing } = useTheme();
  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderRadius: radius.lg,
      padding: spacing.lg,
    },
    style,
  ];

  if (!onPress) {
    return <View style={cardStyle}>{children}</View>;
  }
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [cardStyle, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: StyleSheet.hairlineWidth },
  pressed: { opacity: 0.8 },
});
