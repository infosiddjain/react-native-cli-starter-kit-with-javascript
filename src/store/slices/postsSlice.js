import { createSlice } from '@reduxjs/toolkit';
import { postService } from '@/api';
import { createApiThunk, getErrorMessage } from '../createApiThunk';

const PAGE_SIZE = 10;

// Pass { refresh: true } to reload from the first page.
export const fetchPosts = createApiThunk(
  'posts/fetchPosts',
  async ({ refresh = false } = {}, { getState }) => {
    const skip = refresh ? 0 : getState().posts.items.length;
    const data = await postService.getPosts({ limit: PAGE_SIZE, skip });
    return { ...data, refresh };
  },
  {
    // Skip duplicate "load more" calls while one is already running.
    condition: ({ refresh = false } = {}, { getState }) => {
      const { loading, loadingMore, items, total } = getState().posts;
      if (refresh) return true;
      if (loading || loadingMore) return false;
      return total === null || items.length < total;
    },
  },
);

export const fetchPostById = createApiThunk(
  'posts/fetchPostById',
  postService.getPost,
);

const initialState = {
  items: [],
  total: null,
  loading: false,
  loadingMore: false,
  refreshing: false,
  error: null,
  selected: null,
  selectedLoading: false,
  selectedError: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearSelectedPost: state => {
      state.selected = null;
      state.selectedError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, (state, { meta }) => {
        const refresh = meta.arg?.refresh;
        state.error = null;
        if (refresh && state.items.length) state.refreshing = true;
        else if (state.items.length && !refresh) state.loadingMore = true;
        else state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.items = payload.refresh
          ? payload.posts
          : [...state.items, ...payload.posts];
        state.total = payload.total;
        state.loading = state.loadingMore = state.refreshing = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = state.loadingMore = state.refreshing = false;
        state.error = getErrorMessage(action);
      })
      .addCase(fetchPostById.pending, state => {
        state.selectedLoading = true;
        state.selectedError = null;
      })
      .addCase(fetchPostById.fulfilled, (state, { payload }) => {
        state.selectedLoading = false;
        state.selected = payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = getErrorMessage(action);
      });
  },
});

export const { clearSelectedPost } = postsSlice.actions;
export const selectPosts = state => state.posts;

export default postsSlice.reducer;
