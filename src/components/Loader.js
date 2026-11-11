import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export default function Loader({ fullScreen = false, size = 'large', style }) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        fullScreen ? styles.fullScreen : styles.inline,
        fullScreen && { backgroundColor: colors.background },
        style,
      ]}
    >
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  inline: { paddingVertical: 16, alignItems: 'center' },
});
