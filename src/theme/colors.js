// Raw palette. Screens should not use these directly; use theme.colors instead.
export const palette = {
  primary50: '#EEF2FF',
  primary100: '#E0E7FF',
  primary500: '#6366F1',
  primary600: '#4F46E5',
  primary700: '#4338CA',

  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  gray950: '#0B0F19',

  green500: '#22C55E',
  amber500: '#F59E0B',
  red500: '#EF4444',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Semantic colors: what the color is for, not what it looks like.
export const lightColors = {
  primary: palette.primary600,
  primaryMuted: palette.primary100,
  onPrimary: palette.white,
  background: palette.gray50,
  surface: palette.white,
  text: palette.gray900,
  textSecondary: palette.gray500,
  border: palette.gray200,
  inputBackground: palette.white,
  placeholder: palette.gray400,
  success: palette.green500,
  warning: palette.amber500,
  error: palette.red500,
  card: palette.white,
  shadow: palette.black,
  transparent: palette.transparent,
};

export const darkColors = {
  primary: palette.primary500,
  primaryMuted: '#1E1B4B',
  onPrimary: palette.white,
  background: palette.gray950,
  surface: palette.gray900,
  text: palette.gray50,
  textSecondary: palette.gray400,
  border: palette.gray800,
  inputBackground: palette.gray900,
  placeholder: palette.gray500,
  success: palette.green500,
  warning: palette.amber500,
  error: '#F87171',
  card: palette.gray900,
  shadow: palette.black,
  transparent: palette.transparent,
};
