import React from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { useTheme } from '@/hooks/useTheme';

/**
 * App icon, powered by react-native-vector-icons.
 *
 *   <Icon name="home" />                          app name (see APP_ICONS below)
 *   <Icon name="home" filled color="primary" />   filled version, theme color
 *   <Icon name="heart-outline" size={18} />       any Ionicons name
 *   <Icon family="material" name="github" />      any MaterialDesignIcons name
 *
 * Browse all icons: https://oblador.github.io/react-native-vector-icons/
 * To add another family: npm install @react-native-vector-icons/<family>,
 * add it to FAMILIES, then run `npm run icons:ios` and `pod install`.
 */
export const FAMILIES = {
  ionicons: Ionicons,
  material: MaterialDesignIcons,
};

// App-level names, so screens don't depend on one icon set's naming.
// [outline, filled] Ionicons names.
const APP_ICONS = {
  menu: ['menu', 'menu'],
  home: ['home-outline', 'home'],
  grid: ['grid-outline', 'grid'],
  user: ['person-outline', 'person'],
  bell: ['notifications-outline', 'notifications'],
  settings: ['settings-outline', 'settings'],
  info: ['information-circle-outline', 'information-circle'],
  'chevron-down': ['chevron-down', 'chevron-down'],
  'chevron-right': ['chevron-forward', 'chevron-forward'],
  'chevron-left': ['chevron-back', 'chevron-back'],
  check: ['checkmark', 'checkmark'],
  close: ['close', 'close'],
  search: ['search', 'search'],
  logout: ['log-out-outline', 'log-out'],
  trash: ['trash-outline', 'trash'],
  globe: ['globe-outline', 'globe'],
  database: ['server-outline', 'server'],
  layers: ['layers-outline', 'layers'],
  moon: ['moon-outline', 'moon'],
  plus: ['add', 'add'],
  mail: ['mail-outline', 'mail'],
  lock: ['lock-closed-outline', 'lock-closed'],
  eye: ['eye-outline', 'eye'],
  'eye-off': ['eye-off-outline', 'eye-off'],
  heart: ['heart-outline', 'heart'],
  star: ['star-outline', 'star'],
  share: ['share-social-outline', 'share-social'],
};

export const ICON_NAMES = Object.keys(APP_ICONS);

export default function Icon({
  name,
  family = 'ionicons',
  filled = false,
  size = 22,
  color = 'text',
  style,
  ...rest
}) {
  const { colors } = useTheme();
  const IconSet = FAMILIES[family] ?? Ionicons;
  const mapped = family === 'ionicons' ? APP_ICONS[name] : null;
  const glyph = mapped ? mapped[filled ? 1 : 0] : name;

  if (!name) return null;

  return (
    <IconSet
      name={glyph}
      size={size}
      color={colors[color] ?? color}
      style={style}
      accessibilityElementsHidden
      importantForAccessibility="no"
      {...rest}
    />
  );
}
