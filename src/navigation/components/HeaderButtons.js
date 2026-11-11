import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { IconButton } from '@/components';
import { ROUTES } from '../routes';

// Opens the side drawer from any screen inside it.
export function MenuButton() {
  const navigation = useNavigation();
  return (
    <IconButton
      name="menu"
      accessibilityLabel="Open menu"
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );
}

// Opens the global Notifications screen (lives on the root stack).
export function NotificationsButton({ count = 3 }) {
  const navigation = useNavigation();
  return (
    <IconButton
      name="bell"
      badge={count}
      accessibilityLabel="Notifications"
      onPress={() => navigation.navigate(ROUTES.NOTIFICATIONS)}
    />
  );
}

// Render functions for screen options (kept outside components on purpose).
export const renderMenuButton = () => <MenuButton />;
export const renderNotificationsButton = () => <NotificationsButton />;
