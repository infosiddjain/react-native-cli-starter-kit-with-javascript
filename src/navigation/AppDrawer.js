import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ROUTES } from './routes';
import { useHeaderOptions } from './options';
import { renderMenuButton } from './components/HeaderButtons';
import CustomDrawerContent from './components/CustomDrawerContent';
import MainTabs from './MainTabs';
import SettingsScreen from '@/screens/settings/SettingsScreen';
import AboutScreen from '@/screens/about/AboutScreen';
import { useTheme } from '@/hooks/useTheme';

const Drawer = createDrawerNavigator();

const renderDrawerContent = props => <CustomDrawerContent {...props} />;

export default function AppDrawer() {
  const headerOptions = useHeaderOptions();
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.MAIN_TABS}
      drawerContent={renderDrawerContent}
      screenOptions={{
        ...headerOptions,
        headerLeft: renderMenuButton,
        drawerType: 'front',
        drawerStyle: { backgroundColor: colors.surface, width: 300 },
        overlayColor: 'rgba(0,0,0,0.45)',
        swipeEdgeWidth: 40,
      }}
    >
      {/* The tabs bring their own headers, so the drawer header is hidden here. */}
      <Drawer.Screen
        name={ROUTES.MAIN_TABS}
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{ title: 'Settings', icon: 'settings' }}
      />
      <Drawer.Screen
        name={ROUTES.ABOUT}
        component={AboutScreen}
        options={{ title: 'About', icon: 'info' }}
      />
    </Drawer.Navigator>
  );
}
