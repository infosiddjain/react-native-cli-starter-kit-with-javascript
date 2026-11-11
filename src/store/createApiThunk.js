import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Reusable thunk factory for API calls.
 * The request function gets (arg, thunkAPI) and returns the data.
 * Errors always reach the reducer as { message, status, data } via rejectWithValue.
 *
 * Example:
 *   export const fetchPosts = createApiThunk('posts/fetch', postService.getPosts);
 */
export const createApiThunk = (type, request, options) =>
  createAsyncThunk(
    type,
    async (arg, thunkAPI) => {
      try {
        return await request(arg, thunkAPI);
      } catch (error) {
        return thunkAPI.rejectWithValue({
          message: error?.message || 'Something went wrong',
          status: error?.status ?? null,
          data: error?.data ?? null,
        });
      }
    },
    options,
  );

// Helper to read the error message from a rejected action.
export const getErrorMessage = action =>
  action.payload?.message || action.error?.message || 'Something went wrong';
