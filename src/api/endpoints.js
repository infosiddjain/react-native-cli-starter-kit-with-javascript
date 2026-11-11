// All API paths live here. Use functions for paths that need params.
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
    REGISTER: '/users/add',
  },
  POSTS: {
    LIST: '/posts',
    DETAIL: id => `/posts/${id}`,
  },
};
