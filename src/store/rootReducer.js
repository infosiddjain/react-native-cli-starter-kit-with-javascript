import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import postsReducer from './slices/postsSlice';

const appReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  posts: postsReducer,
});

// On logout, reset every slice except theme and the bootstrap flag.
const rootReducer = (state, action) => {
  if (action.type === 'auth/logout/fulfilled' && state) {
    return appReducer({ theme: state.theme, auth: state.auth }, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
