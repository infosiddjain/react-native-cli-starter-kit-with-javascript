import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export default function Divider({ inset = 0, spacing = 0, style }) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.line,
        {
          backgroundColor: colors.border,
          marginLeft: inset,
          marginVertical: spacing,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  line: { height: StyleSheet.hairlineWidth },
});
