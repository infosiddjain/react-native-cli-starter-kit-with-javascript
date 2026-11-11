import React from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Divider, ListItem } from '@/components';
import { STRINGS } from '@/constants/strings';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import { logout, selectUser } from '@/store/slices/authSlice';
import { ROUTES } from '../routes';

// Shortcuts into specific tabs, shown above the drawer's own screens.
const TAB_SHORTCUTS = [
  { label: 'Posts', icon: 'home', tab: ROUTES.HOME_STACK },
  { label: 'Components', icon: 'grid', tab: ROUTES.COMPONENTS_STACK },
  { label: 'Profile', icon: 'user', tab: ROUTES.PROFILE_STACK },
];

export default function CustomDrawerContent(props) {
  const { state, descriptors, navigation } = props;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  const currentDrawerRoute = state.routes[state.index];
  const nestedTabState = currentDrawerRoute.state;
  const activeTab =
    currentDrawerRoute.name === ROUTES.MAIN_TABS
      ? nestedTabState?.routes[nestedTabState.index]?.name ?? ROUTES.HOME_STACK
      : null;

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ');

  const confirmLogout = () =>
    Alert.alert(STRINGS.profile.logout, STRINGS.profile.logoutConfirm, [
      { text: STRINGS.common.cancel, style: 'cancel' },
      {
        text: STRINGS.profile.logout,
        style: 'destructive',
        onPress: () => dispatch(logout()),
      },
    ]);

  return (
    <View style={[styles.flex, { backgroundColor: colors.surface }]}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: insets.top + spacing.lg }}
      >
        <View
          style={[
            styles.header,
            { paddingHorizontal: spacing.lg, marginBottom: spacing.lg },
          ]}
        >
          {user?.image ? (
            <Image
              source={{ uri: user.image }}
              style={[styles.avatar, { backgroundColor: colors.primaryMuted }]}
            />
          ) : (
            <View
              style={[
                styles.avatar,
                styles.avatarFallback,
                { backgroundColor: colors.primaryMuted },
              ]}
            >
              <AppText variant="h3" color="primary">
                {(fullName || user?.username || '?').charAt(0).toUpperCase()}
              </AppText>
            </View>
          )}
          <AppText variant="h3" style={{ marginTop: spacing.md }}>
            {fullName || user?.username}
          </AppText>
          {user?.email ? (
            <AppText color="textSecondary">{user.email}</AppText>
          ) : null}
        </View>

        <Divider spacing={spacing.sm} />

        <View style={{ paddingHorizontal: spacing.sm }}>
          {TAB_SHORTCUTS.map(item => (
            <ListItem
              key={item.tab}
              icon={item.icon}
              title={item.label}
              selected={activeTab === item.tab}
              onPress={() =>
                navigation.navigate(ROUTES.MAIN_TABS, { screen: item.tab })
              }
            />
          ))}

          {state.routes
            .filter(route => route.name !== ROUTES.MAIN_TABS)
            .map(route => {
              const { options } = descriptors[route.key];
              return (
                <ListItem
                  key={route.key}
                  icon={options.icon}
                  title={options.drawerLabel ?? options.title ?? route.name}
                  selected={currentDrawerRoute.key === route.key}
                  onPress={() => navigation.navigate(route.name)}
                />
              );
            })}
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          padding: spacing.sm,
          paddingBottom: insets.bottom + spacing.sm,
        }}
      >
        <Divider spacing={spacing.sm} />
        <ListItem
          icon="logout"
          title={STRINGS.profile.logout}
          destructive
          onPress={confirmLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {},
  avatar: { width: 64, height: 64, borderRadius: 32 },
  avatarFallback: { alignItems: 'center', justifyContent: 'center' },
});
