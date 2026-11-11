import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import AppText from './AppText';

// Titled group of content, e.g. a block of settings rows.
export default function Section({
  title,
  description,
  children,
  card = false,
  style,
}) {
  const { colors, radius, spacing } = useTheme();
  return (
    <View style={[{ marginBottom: spacing.xl }, style]}>
      {title ? (
        <AppText
          variant="caption"
          color="textSecondary"
          style={[styles.title, { marginBottom: spacing.sm }]}
        >
          {title}
        </AppText>
      ) : null}
      {description ? (
        <AppText
          variant="caption"
          color="textSecondary"
          style={{ marginBottom: spacing.sm }}
        >
          {description}
        </AppText>
      ) : null}
      <View
        style={
          card && [
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: radius.lg,
            },
          ]
        }
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: '600' },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    paddingVertical: 4,
  },
});
