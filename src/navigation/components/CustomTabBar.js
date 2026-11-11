import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText, Badge, Icon } from '@/components';
import { useTheme } from '@/hooks/useTheme';

/**
 * Custom bottom tab bar. Reads these screen options:
 *   title / tabBarLabel  label text
 *   icon                 Icon name (see components/Icon.js)
 *   tabBarBadge          number or text badge
 *   tabBarVisible        false hides the bar (set per screen in MainTabs)
 */
export default function CustomTabBar({ state, descriptors, navigation }) {
  const { colors, spacing, radius } = useTheme();
  const insets = useSafeAreaInsets();

  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) return null;

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: Math.max(insets.bottom, spacing.sm),
          paddingTop: spacing.sm,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = state.index === index;
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const color = focused ? 'primary' : 'textSecondary';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        const onLongPress = () =>
          navigation.emit({ type: 'tabLongPress', target: route.key });

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
            style={styles.item}
          >
            <View
              style={[
                styles.pill,
                { borderRadius: radius.full, paddingHorizontal: spacing.lg },
                focused && { backgroundColor: colors.primaryMuted },
              ]}
            >
              <Icon
                name={options.icon}
                filled={focused}
                size={22}
                color={color}
              />
              {options.tabBarBadge ? (
                <View style={styles.badge}>
                  <Badge value={options.tabBarBadge} />
                </View>
              ) : null}
            </View>
            <AppText
              variant="caption"
              color={color}
              style={focused && styles.activeLabel}
            >
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', borderTopWidth: StyleSheet.hairlineWidth },
  item: { flex: 1, alignItems: 'center', gap: 2 },
  pill: { paddingVertical: 4 },
  badge: { position: 'absolute', top: -2, right: 6 },
  activeLabel: { fontWeight: '700' },
});
