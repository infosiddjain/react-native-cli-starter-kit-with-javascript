import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Icon from './Icon';
import Badge from './Badge';

/**
 * Round tappable icon. Good for headers and toolbars.
 * variant: ghost | filled
 */
export default function IconButton({
  name,
  onPress,
  size = 22,
  color = 'text',
  variant = 'ghost',
  badge,
  accessibilityLabel,
  disabled,
  style,
}) {
  const { colors } = useTheme();
  const box = size + 18;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || name}
      style={({ pressed }) => [
        styles.base,
        { width: box, height: box, borderRadius: box / 2 },
        variant === 'filled' && { backgroundColor: colors.primaryMuted },
        pressed && { backgroundColor: colors.border },
        disabled && styles.disabled,
        style,
      ]}
    >
      <Icon name={name} size={size} color={color} />
      {badge ? (
        <View style={styles.badge}>
          <Badge value={badge} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 2, right: 0 },
  disabled: { opacity: 0.4 },
});
