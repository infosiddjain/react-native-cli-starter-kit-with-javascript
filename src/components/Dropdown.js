import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import AppText from './AppText';
import AppInput from './AppInput';
import AppButton from './AppButton';
import BottomSheet from './BottomSheet';
import EmptyState from './EmptyState';
import Icon from './Icon';

/**
 * Select one or many options from a list. Opens in a BottomSheet.
 *
 * items: [{ label, value, description?, icon?, disabled? }]
 *
 * Single:   <Dropdown items={items} value={value} onChange={setValue} />
 * Multiple: <Dropdown multiple items={items} value={values} onChange={setValues} />
 */
export default function Dropdown({
  label,
  placeholder = 'Select',
  items = [],
  value,
  onChange,
  multiple = false,
  searchable = false,
  searchPlaceholder = 'Search',
  sheetTitle,
  error,
  hint,
  disabled = false,
  leftIcon,
  maxSummaryItems = 2,
  containerStyle,
}) {
  const { colors, radius, spacing } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selectedValues = useMemo(
    () => (multiple ? value || [] : value != null ? [value] : []),
    [multiple, value],
  );
  const isSelected = itemValue => selectedValues.includes(itemValue);

  const summary = useMemo(() => {
    const labels = items
      .filter(i => selectedValues.includes(i.value))
      .map(i => i.label);
    if (!labels.length) return null;
    if (labels.length <= maxSummaryItems) return labels.join(', ');
    return `${labels.length} selected`;
  }, [items, selectedValues, maxSummaryItems]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      i =>
        i.label.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q),
    );
  }, [items, query]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const onSelect = item => {
    if (item.disabled) return;
    if (multiple) {
      const next = isSelected(item.value)
        ? selectedValues.filter(v => v !== item.value)
        : [...selectedValues, item.value];
      onChange?.(next);
    } else {
      onChange?.(item.value);
      close();
    }
  };

  const renderItem = ({ item }) => {
    const active = isSelected(item.value);
    return (
      <Pressable
        onPress={() => onSelect(item)}
        disabled={item.disabled}
        accessibilityRole={multiple ? 'checkbox' : 'radio'}
        accessibilityState={{ checked: active, disabled: item.disabled }}
        style={({ pressed }) => [
          styles.option,
          { paddingHorizontal: spacing.lg, borderRadius: radius.md },
          active && { backgroundColor: colors.primaryMuted },
          pressed && { backgroundColor: colors.border },
          item.disabled && styles.disabled,
        ]}
      >
        {item.icon ? (
          <Icon
            name={item.icon}
            size={18}
            color={active ? 'primary' : 'textSecondary'}
          />
        ) : null}
        <View style={[styles.flex, item.icon && { marginLeft: spacing.md }]}>
          <AppText
            variant={active ? 'bodyBold' : 'body'}
            color={active ? 'primary' : 'text'}
          >
            {item.label}
          </AppText>
          {item.description ? (
            <AppText variant="caption" color="textSecondary">
              {item.description}
            </AppText>
          ) : null}
        </View>
        {multiple ? (
          <View
            style={[
              styles.checkbox,
              {
                borderColor: active ? colors.primary : colors.border,
                borderRadius: radius.sm,
              },
              active && { backgroundColor: colors.primary },
            ]}
          >
            {active ? <Icon name="check" size={16} color="onPrimary" /> : null}
          </View>
        ) : active ? (
          <Icon name="check" size={18} color="primary" />
        ) : null}
      </Pressable>
    );
  };

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

      <Pressable
        onPress={() => setOpen(true)}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label || placeholder}
        accessibilityHint="Opens a list of options"
        style={[
          styles.trigger,
          {
            backgroundColor: colors.inputBackground,
            borderColor: error
              ? colors.error
              : open
              ? colors.primary
              : colors.border,
            borderRadius: radius.md,
            paddingHorizontal: spacing.md,
          },
          disabled && styles.disabled,
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
        <AppText
          color={summary ? 'text' : 'placeholder'}
          numberOfLines={1}
          style={styles.flex}
        >
          {summary || placeholder}
        </AppText>
        <Icon name="chevron-down" size={18} color="textSecondary" />
      </Pressable>

      {error || hint ? (
        <AppText
          variant="caption"
          color={error ? 'error' : 'textSecondary'}
          style={{ marginTop: spacing.xs }}
        >
          {error || hint}
        </AppText>
      ) : null}

      <BottomSheet
        visible={open}
        onClose={close}
        title={sheetTitle || label || placeholder}
        footer={
          multiple ? (
            <View style={styles.footer}>
              <AppButton
                title="Clear"
                variant="outline"
                fullWidth={false}
                style={styles.flex}
                onPress={() => onChange?.([])}
              />
              <AppButton
                title="Done"
                fullWidth={false}
                style={styles.flex}
                onPress={close}
              />
            </View>
          ) : null
        }
      >
        {searchable ? (
          <AppInput
            value={query}
            onChangeText={setQuery}
            placeholder={searchPlaceholder}
            leftIcon="search"
            autoCorrect={false}
            autoCapitalize="none"
            containerStyle={{
              marginHorizontal: spacing.lg,
              marginBottom: spacing.sm,
            }}
          />
        ) : null}
        <FlatList
          data={filtered}
          keyExtractor={item => String(item.value)}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingHorizontal: spacing.sm }}
          ListEmptyComponent={<EmptyState title="No matches" />}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderWidth: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingVertical: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: { flexDirection: 'row', gap: 12 },
  disabled: { opacity: 0.5 },
  flex: { flex: 1 },
});
