import React, { forwardRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import AppText from './AppText';
import Icon from './Icon';

/**
 * Themed text input with label, error, and optional left icon / right element.
 *   <AppInput label="Email" leftIcon="search" error={errors.email} />
 */
const AppInput = forwardRef(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      right,
      style,
      containerStyle,
      onFocus,
      onBlur,
      editable = true,
      ...rest
    },
    ref,
  ) => {
    const { colors, radius, spacing, typography } = useTheme();
    const [focused, setFocused] = useState(false);

    const borderColor = error
      ? colors.error
      : focused
      ? colors.primary
      : colors.border;

    return (
      <View style={[{ marginBottom: spacing.lg }, containerStyle]}>
        {label ? (
          <AppText
            variant="caption"
            color="textSecondary"
            style={{ marginBottom: spacing.xs }}
          >
            {label}
          </AppText>
        ) : null}
        <View
          style={[
            styles.field,
            {
              backgroundColor: colors.inputBackground,
              borderColor,
              borderRadius: radius.md,
              paddingHorizontal: spacing.md,
            },
            !editable && styles.disabled,
          ]}
        >
          {leftIcon ? (
            <Icon
              name={leftIcon}
              size={18}
              color="textSecondary"
              style={{ marginRight: spacing.sm }}
            />
          ) : null}
          <TextInput
            ref={ref}
            editable={editable}
            placeholderTextColor={colors.placeholder}
            onFocus={e => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={e => {
              setFocused(false);
              onBlur?.(e);
            }}
            style={[
              styles.input,
              typography.body,
              { color: colors.text },
              style,
            ]}
            {...rest}
          />
          {right}
        </View>
        {error || hint ? (
          <AppText
            variant="caption"
            color={error ? 'error' : 'textSecondary'}
            style={{ marginTop: spacing.xs }}
          >
            {error || hint}
          </AppText>
        ) : null}
      </View>
    );
  },
);

export default AppInput;

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderWidth: 1,
  },
  input: { flex: 1, paddingVertical: 10 },
  disabled: { opacity: 0.6 },
});
