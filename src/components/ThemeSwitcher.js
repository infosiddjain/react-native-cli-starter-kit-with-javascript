import React from 'react';
import { useDispatch } from 'react-redux';
import { STRINGS } from '@/constants/strings';
import { useTheme } from '@/hooks/useTheme';
import { setThemeMode } from '@/store/slices/themeSlice';
import { THEME_MODES } from '@/theme';
import Tabs from './Tabs';

const MODES = [
  { key: THEME_MODES.SYSTEM, label: STRINGS.theme.system },
  { key: THEME_MODES.LIGHT, label: STRINGS.theme.light },
  { key: THEME_MODES.DARK, label: STRINGS.theme.dark },
];

// System / Light / Dark switch. The choice is saved to local storage.
export default function ThemeSwitcher({ style }) {
  const dispatch = useDispatch();
  const { mode } = useTheme();
  return (
    <Tabs
      items={MODES}
      value={mode}
      onChange={next => dispatch(setThemeMode(next))}
      style={style}
    />
  );
}
