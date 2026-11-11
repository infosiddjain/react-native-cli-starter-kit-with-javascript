import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import AppText from './AppText';
import IconButton from './IconButton';

const SCREEN_HEIGHT = Dimensions.get('window').height;

/**
 * Slide-up panel from the bottom of the screen.
 *
 *   <BottomSheet visible={open} onClose={() => setOpen(false)} title="Filters">
 *     ...content
 *   </BottomSheet>
 */
export default function BottomSheet({
  visible,
  onClose,
  title,
  children,
  footer,
  maxHeight = '85%',
  closeOnBackdrop = true,
  showHandle = true,
}) {
  const { colors, radius, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const [mounted, setMounted] = useState(visible);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdrop = useRef(new Animated.Value(0)).current;
  const wasOpened = useRef(false);

  useEffect(() => {
    if (!visible && !wasOpened.current) return; // never opened: nothing to close
    if (visible) {
      wasOpened.current = true;
      setMounted(true);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
          speed: 16,
        }),
        Animated.timing(backdrop, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(backdrop, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        // Only unmount if the close finished (re-opening mid-close interrupts it).
      ]).start(({ finished }) => finished && setMounted(false));
    }
  }, [visible, translateY, backdrop]);

  if (!mounted) return null;

  return (
    <Modal
      transparent
      visible
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.backdrop,
            { opacity: backdrop },
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeOnBackdrop ? onClose : undefined}
            accessibilityLabel="Close"
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            {
              maxHeight,
              backgroundColor: colors.surface,
              borderTopLeftRadius: radius.lg * 1.5,
              borderTopRightRadius: radius.lg * 1.5,
              paddingBottom: insets.bottom + spacing.md,
              transform: [{ translateY }],
            },
          ]}
        >
          {showHandle ? (
            <View style={[styles.handle, { backgroundColor: colors.border }]} />
          ) : null}
          {title ? (
            <View style={[styles.header, { paddingHorizontal: spacing.lg }]}>
              <AppText variant="h3" style={styles.flex}>
                {title}
              </AppText>
              <IconButton
                name="close"
                size={20}
                onPress={onClose}
                accessibilityLabel="Close"
              />
            </View>
          ) : null}
          <View style={styles.body}>{children}</View>
          {footer ? (
            <View
              style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md }}
            >
              {footer}
            </View>
          ) : null}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: { width: '100%' },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  body: { flexShrink: 1 },
  flex: { flex: 1 },
});
