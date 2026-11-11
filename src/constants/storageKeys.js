// Every local storage key. Prefix keeps them apart from other libraries.
export const STORAGE_KEYS = {
  // Auth (kept when the user clears app data)
  TOKEN: '@app/token',
  REFRESH_TOKEN: '@app/refresh_token',
  USER: '@app/user',

  // Preferences
  THEME_MODE: '@app/theme_mode',
  LANGUAGE: '@app/language',
  FAVORITE_TOPICS: '@app/favorite_topics',
  NOTE: '@app/note',
};

export const AUTH_STORAGE_KEYS = [
  STORAGE_KEYS.TOKEN,
  STORAGE_KEYS.REFRESH_TOKEN,
  STORAGE_KEYS.USER,
];
