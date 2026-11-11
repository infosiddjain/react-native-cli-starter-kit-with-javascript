import reducer, { fetchPosts } from '@/store/slices/postsSlice';

describe('postsSlice', () => {
  it('appends posts on load more and replaces them on refresh', () => {
    let state = reducer(undefined, { type: 'init' });

    state = reducer(
      state,
      fetchPosts.fulfilled(
        { posts: [{ id: 1 }], total: 2, refresh: true },
        'r1',
        { refresh: true },
      ),
    );
    expect(state.items).toHaveLength(1);

    state = reducer(
      state,
      fetchPosts.fulfilled(
        { posts: [{ id: 2 }], total: 2, refresh: false },
        'r2',
        {},
      ),
    );
    expect(state.items.map(p => p.id)).toEqual([1, 2]);

    state = reducer(
      state,
      fetchPosts.fulfilled(
        { posts: [{ id: 9 }], total: 2, refresh: true },
        'r3',
        { refresh: true },
      ),
    );
    expect(state.items.map(p => p.id)).toEqual([9]);
  });

  it('stores the error message on failure', () => {
    const state = reducer(
      undefined,
      fetchPosts.rejected(null, 'r1', {}, { message: 'Network down' }),
    );
    expect(state.error).toBe('Network down');
  });
});
