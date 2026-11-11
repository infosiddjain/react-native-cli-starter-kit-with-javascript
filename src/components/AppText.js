import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

/**
 * Themed text.
 * variant: h1 | h2 | h3 | body | bodyBold | caption | button
 * color: a theme color key ('textSecondary', 'primary') or any color value.
 */
export default function AppText({
  variant = 'body',
  color = 'text',
  align,
  style,
  children,
  ...rest
}) {
  const { typography, colors } = useTheme();
  return (
    <Text
      style={[
        typography[variant],
        { color: colors[color] ?? color, textAlign: align },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
