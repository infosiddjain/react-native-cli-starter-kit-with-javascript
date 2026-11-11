import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';

/**
 * Base layout for every screen: safe area, theme background,
 * optional scrolling and keyboard handling.
 */
export default function ScreenWrapper({
  children,
  scroll = false,
  padded = true,
  keyboardAware = false,
  edges = ['top', 'bottom'],
  style,
  contentContainerStyle,
}) {
  const { colors, spacing } = useTheme();
  const padding = padded ? { padding: spacing.lg } : null;

  const content = scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.grow, padding, contentContainerStyle]}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, padding, contentContainerStyle]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.flex, { backgroundColor: colors.background }, style]}
    >
      {keyboardAware ? (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  grow: { flexGrow: 1 },
});
