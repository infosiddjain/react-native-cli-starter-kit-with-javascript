import { createSlice } from '@reduxjs/toolkit';
import { authService } from '@/api';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { storage } from '@/utils/storage';
import { createApiThunk, getErrorMessage } from '../createApiThunk';

export const login = createApiThunk('auth/login', async credentials => {
  const data = await authService.login(credentials);
  const { accessToken, refreshToken, token, ...user } = data;
  const authToken = accessToken || token;
  await storage.set(STORAGE_KEYS.TOKEN, authToken);
  if (refreshToken) {
    await storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }
  await storage.set(STORAGE_KEYS.USER, user);
  return { token: authToken, user };
});

// Runs once on app start: loads the saved session, if any.
export const restoreSession = createApiThunk('auth/restore', async () => {
  const [token, user] = await Promise.all([
    storage.get(STORAGE_KEYS.TOKEN),
    storage.get(STORAGE_KEYS.USER),
  ]);
  return { token, user };
});

export const logout = createApiThunk('auth/logout', async () => {
  await storage.removeMany([
    STORAGE_KEYS.TOKEN,
    STORAGE_KEYS.REFRESH_TOKEN,
    STORAGE_KEYS.USER,
  ]);
  return true;
});

const initialState = {
  user: null,
  token: null,
  isBootstrapped: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(restoreSession.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.isBootstrapped = true;
      })
      .addCase(restoreSession.rejected, state => {
        state.isBootstrapped = true;
      })
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.token;
        state.user = payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action);
      })
      .addCase(logout.fulfilled, state => ({
        ...initialState,
        isBootstrapped: state.isBootstrapped,
      }));
  },
});

export const { clearAuthError } = authSlice.actions;

export const selectAuth = state => state.auth;
export const selectUser = state => state.auth.user;
export const selectIsLoggedIn = state => Boolean(state.auth.token);

export default authSlice.reducer;
