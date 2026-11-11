import { api } from '../apiService';
import { ENDPOINTS } from '../endpoints';

export const postService = {
  getPosts: ({ limit = 10, skip = 0 } = {}) =>
    api.get(ENDPOINTS.POSTS.LIST, { params: { limit, skip } }),
  getPost: id => api.get(ENDPOINTS.POSTS.DETAIL(id)),
};
