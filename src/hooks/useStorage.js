import { useCallback, useEffect, useState } from 'react';
import { storage } from '@/utils/storage';

/**
 * useState that is saved to local storage.
 *
 *   const [lang, setLang, { loading, remove }] = useStorage(STORAGE_KEYS.LANGUAGE, 'en');
 *
 * setValue accepts a value or an updater function, like useState.
 */
export const useStorage = (key, defaultValue = null) => {
  const [value, setValueState] = useState(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    storage.get(key, defaultValue).then(saved => {
      if (active) {
        setValueState(saved);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
    // defaultValue is only the first-load fallback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = useCallback(
    next => {
      setValueState(prev => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        storage.set(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  const remove = useCallback(() => {
    setValueState(defaultValue);
    storage.remove(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue, { loading, remove }];
};
