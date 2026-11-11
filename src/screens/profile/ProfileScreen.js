import React from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';

import {
  AppText,
  Card,
  ListItem,
  ScreenWrapper,
  Section,
  ThemeSwitcher,
} from '@/components';
import { STRINGS } from '@/constants/strings';
import { ROUTES } from '@/navigation/routes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logout, selectUser } from '@/store/slices/authSlice';

export default function ProfileScreen({ navigation }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
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
    <ScreenWrapper scroll edges={[]}>
      <Card style={styles.userCard}>
        {user?.image ? (
          <Image source={{ uri: user.image }} style={styles.avatar} />
        ) : null}
        <View style={styles.flex}>
          <AppText variant="h3">{fullName || user?.username}</AppText>
          {user?.email ? (
            <AppText color="textSecondary">{user.email}</AppText>
          ) : null}
        </View>
      </Card>

      <Section title={STRINGS.profile.appearance} style={styles.top}>
        <ThemeSwitcher />
      </Section>

      {/* Navigating to screens in other navigators (drawer, root stack) works by name. */}
      <Section card>
        <ListItem
          icon="settings"
          title="Settings"
          showChevron
          onPress={() => navigation.navigate(ROUTES.SETTINGS)}
        />
        <ListItem
          icon="bell"
          title="Notifications"
          showChevron
          onPress={() => navigation.navigate(ROUTES.NOTIFICATIONS)}
        />
        <ListItem
          icon="info"
          title="About"
          showChevron
          onPress={() => navigation.navigate(ROUTES.ABOUT)}
        />
      </Section>

      <Section card>
        <ListItem
          icon="logout"
          title={STRINGS.profile.logout}
          destructive
          onPress={confirmLogout}
        />
      </Section>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  top: { marginTop: 24 },
  userCard: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 56, height: 56, borderRadius: 28 },
});
