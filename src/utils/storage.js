import AsyncStorage from '@react-native-async-storage/async-storage';

// Small wrapper so the rest of the app never touches AsyncStorage directly.
// Values are stored as JSON, so objects, arrays, numbers and strings all work.
const parse = value => {
  if (value == null) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value; // a plain string saved by something else
  }
};

export const storage = {
  async get(key, fallback = null) {
    try {
      const value = parse(await AsyncStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  },

  async set(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  // Shallow-merges into a saved object: storage.merge(KEY, { language: 'en' })
  async merge(key, partial) {
    const current = (await storage.get(key)) || {};
    return storage.set(key, { ...current, ...partial });
  },

  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch {}
  },

  async getMany(keys) {
    try {
      const result = await AsyncStorage.getMany(keys);
      return Object.fromEntries(
        Object.entries(result).map(([k, v]) => [k, parse(v)]),
      );
    } catch {
      return {};
    }
  },

  async removeMany(keys) {
    try {
      await AsyncStorage.removeMany(keys);
    } catch {}
  },

  async keys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch {
      return [];
    }
  },

  // Removes everything except the keys you want to keep (e.g. the login).
  async clear({ keep = [] } = {}) {
    const all = await storage.keys();
    await storage.removeMany(all.filter(key => !keep.includes(key)));
  },
};
