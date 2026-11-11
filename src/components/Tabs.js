import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import AppText from './AppText';
import Badge from './Badge';
import Icon from './Icon';

/**
 * In-screen tabs (not navigation). Controlled: you keep the active key.
 *
 * items: [{ key, label, icon?, badge? }]
 * variant: segment (pill switcher) | underline (classic top tabs)
 * scrollable: lets many tabs scroll sideways (underline variant)
 *
 *   <Tabs items={TABS} value={tab} onChange={setTab} variant="underline" />
 */
export default function Tabs({
  items = [],
  value,
  onChange,
  variant = 'segment',
  scrollable = false,
  style,
}) {
  const { colors, radius, spacing } = useTheme();
  const isSegment = variant === 'segment';

  const tabs = items.map(item => {
    const active = item.key === value;
    const color = isSegment
      ? active
        ? 'onPrimary'
        : 'textSecondary'
      : active
      ? 'primary'
      : 'textSecondary';

    return (
      <Pressable
        key={item.key}
        onPress={() => onChange?.(item.key)}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        style={[
          styles.tab,
          !scrollable && styles.flex,
          isSegment
            ? [
                { borderRadius: radius.sm, paddingVertical: spacing.sm },
                active && { backgroundColor: colors.primary },
              ]
            : [
                {
                  paddingVertical: spacing.md,
                  paddingHorizontal: spacing.lg,
                  borderBottomColor: colors.transparent,
                },
                styles.underlineTab,
                active && { borderBottomColor: colors.primary },
              ],
        ]}
      >
        {item.icon ? <Icon name={item.icon} size={16} color={color} /> : null}
        <AppText variant="bodyBold" color={color} align="center">
          {item.label}
        </AppText>
        {item.badge ? (
          <Badge
            value={item.badge}
            variant={active && isSegment ? 'neutral' : 'error'}
          />
        ) : null}
      </Pressable>
    );
  });

  const containerStyle = isSegment
    ? [
        styles.segment,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radius.md,
        },
      ]
    : [styles.underline, { borderBottomColor: colors.border }];

  if (scrollable) {
    return (
      <View style={[containerStyle, style]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs}
        </ScrollView>
      </View>
    );
  }
  return <View style={[containerStyle, styles.row, style]}>{tabs}</View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  flex: { flex: 1 },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  segment: { padding: 4, borderWidth: 1, gap: 4 },
  underline: { borderBottomWidth: StyleSheet.hairlineWidth },
  underlineTab: {
    borderBottomWidth: 2,
    marginBottom: -StyleSheet.hairlineWidth,
  },
});
