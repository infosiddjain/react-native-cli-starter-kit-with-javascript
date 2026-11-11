import { configureStore } from '@reduxjs/toolkit';
import { setUnauthorizedHandler } from '@/api/client';
import rootReducer from './rootReducer';
import { logout } from './slices/authSlice';

export const store = configureStore({
  reducer: rootReducer,
});

// Any 401 from the API logs the user out.
setUnauthorizedHandler(() => {
  if (store.getState().auth.token) {
    store.dispatch(logout());
  }
});

export * from './slices/authSlice';
export * from './slices/themeSlice';
export * from './slices/postsSlice';
export { createApiThunk } from './createApiThunk';
