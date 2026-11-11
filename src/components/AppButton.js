import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import AppText from './AppText';

/**
 * variant: primary | secondary | outline | ghost | danger
 * size: sm | md | lg
 */
export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = true,
  leftIcon,
  style,
  textStyle,
  ...rest
}) {
  const { colors, radius, spacing } = useTheme();
  const isDisabled = disabled || loading;

  const variants = {
    primary: {
      bg: colors.primary,
      text: colors.onPrimary,
      border: colors.primary,
    },
    secondary: {
      bg: colors.primaryMuted,
      text: colors.primary,
      border: colors.primaryMuted,
    },
    outline: {
      bg: 'transparent',
      text: colors.primary,
      border: colors.primary,
    },
    ghost: { bg: 'transparent', text: colors.primary, border: 'transparent' },
    danger: { bg: colors.error, text: colors.onPrimary, border: colors.error },
  };
  const heights = { sm: 36, md: 48, lg: 56 };
  const v = variants[variant] ?? variants.primary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: v.bg,
          borderColor: v.border,
          borderRadius: radius.md,
          minHeight: heights[size],
          paddingHorizontal: spacing.lg,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          opacity: isDisabled ? 0.6 : pressed ? 0.85 : 1,
        },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={v.text} />
      ) : (
        <View style={styles.row}>
          {leftIcon ? (
            <View style={{ marginRight: spacing.sm }}>{leftIcon}</View>
          ) : null}
          <AppText variant="button" color={v.text} style={textStyle}>
            {title}
          </AppText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
});
