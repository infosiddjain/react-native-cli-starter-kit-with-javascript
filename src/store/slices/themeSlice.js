import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { THEME_MODES } from '@/theme';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { storage } from '@/utils/storage';

export const loadThemeMode = createAsyncThunk('theme/load', async () => {
  const mode = await storage.get(STORAGE_KEYS.THEME_MODE);
  return Object.values(THEME_MODES).includes(mode) ? mode : THEME_MODES.SYSTEM;
});

export const setThemeMode = createAsyncThunk('theme/set', async mode => {
  await storage.set(STORAGE_KEYS.THEME_MODE, mode);
  return mode;
});

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: THEME_MODES.SYSTEM },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadThemeMode.fulfilled, (state, { payload }) => {
        state.mode = payload;
      })
      // Update right away so the switch feels instant.
      .addCase(setThemeMode.pending, (state, { meta }) => {
        state.mode = meta.arg;
      });
  },
});

export const selectThemeMode = state => state.theme.mode;

export default themeSlice.reducer;
