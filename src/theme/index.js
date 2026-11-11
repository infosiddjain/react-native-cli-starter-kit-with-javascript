import { lightColors, darkColors, palette } from './colors';
import { typography } from './typography';
import { spacing, radius } from './spacing';

export const THEME_MODES = {
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark',
};

const base = { typography, spacing, radius, palette };

export const lightTheme = { ...base, dark: false, colors: lightColors };
export const darkTheme = { ...base, dark: true, colors: darkColors };

export { palette, typography, spacing, radius };
