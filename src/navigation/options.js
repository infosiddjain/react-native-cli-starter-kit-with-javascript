import { useMemo } from 'react';
import { useTheme } from '@/hooks/useTheme';
import {
  renderMenuButton,
  renderNotificationsButton,
} from './components/HeaderButtons';

// Shared, themed header options for every stack and the drawer.
export const useHeaderOptions = () => {
  const { colors, typography } = useTheme();
  return useMemo(
    () => ({
      headerStyle: { backgroundColor: colors.surface },
      headerTintColor: colors.primary,
      headerTitleStyle: { ...typography.h3, color: colors.text },
      headerTitleAlign: 'center',
      headerShadowVisible: false,
      headerBackButtonDisplayMode: 'minimal',
      contentStyle: { backgroundColor: colors.background },
    }),
    [colors, typography],
  );
};

// Use on the first screen of each tab stack: menu on the left, bell on the right.
export const rootScreenOptions = title => ({
  title,
  headerLeft: renderMenuButton,
  headerRight: renderNotificationsButton,
});
