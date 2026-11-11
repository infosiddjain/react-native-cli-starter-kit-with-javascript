import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import AppText from './AppText';
import Icon from './Icon';

/**
 * A settings-style row.
 *   <ListItem icon="settings" title="Settings" onPress={...} showChevron />
 *   <ListItem title="Dark mode" right={<Switch />} />
 */
export default function ListItem({
  title,
  subtitle,
  icon,
  left,
  right,
  onPress,
  showChevron = false,
  destructive = false,
  selected = false,
  style,
}) {
  const { colors, spacing, radius } = useTheme();
  const tint = destructive ? 'error' : selected ? 'primary' : 'text';

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.row,
        {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          borderRadius: radius.md,
        },
        selected && { backgroundColor: colors.primaryMuted },
        pressed && { backgroundColor: colors.border },
        style,
      ]}
    >
      {left ?? (icon ? <Icon name={icon} size={20} color={tint} /> : null)}
      <View style={[styles.text, (left || icon) && { marginLeft: spacing.md }]}>
        <AppText variant="bodyBold" color={tint}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="caption" color="textSecondary">
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {right}
      {showChevron ? (
        <Icon name="chevron-right" size={18} color="textSecondary" />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', minHeight: 52 },
  text: { flex: 1 },
});
