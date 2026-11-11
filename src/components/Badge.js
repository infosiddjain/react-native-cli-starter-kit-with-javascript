import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import AppText from './AppText';

/**
 * Small count or label pill.
 * variant: primary | error | success | warning | neutral
 */
export default function Badge({ value, variant = 'error', max = 99, style }) {
  const { colors } = useTheme();
  if (value == null || value === 0) return null;

  const backgrounds = {
    primary: colors.primary,
    error: colors.error,
    success: colors.success,
    warning: colors.warning,
    neutral: colors.textSecondary,
  };
  const label = typeof value === 'number' && value > max ? `${max}+` : value;

  return (
    <View
      style={[styles.badge, { backgroundColor: backgrounds[variant] }, style]}
    >
      <AppText variant="caption" color="onPrimary" style={styles.text}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: 11, lineHeight: 14, fontWeight: '700' },
});
