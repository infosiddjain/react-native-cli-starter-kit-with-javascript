import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme, THEME_MODES } from '@/theme';

// Returns the active theme object: { dark, colors, typography, spacing, radius, mode }.
export const useTheme = () => {
  const mode = useSelector(state => state.theme.mode);
  const systemScheme = useColorScheme();

  const isDark =
    mode === THEME_MODES.DARK ||
    (mode === THEME_MODES.SYSTEM && systemScheme === 'dark');

  return { ...(isDark ? darkTheme : lightTheme), mode };
};
