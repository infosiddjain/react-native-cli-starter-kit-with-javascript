import { storage } from '@/utils/storage';

describe('storage', () => {
  beforeEach(() => storage.clear());

  it('saves and reads JSON values', async () => {
    await storage.set('obj', { a: 1 });
    expect(await storage.get('obj')).toEqual({ a: 1 });
    expect(await storage.get('missing', 'fallback')).toBe('fallback');
  });

  it('merges objects', async () => {
    await storage.set('prefs', { a: 1 });
    await storage.merge('prefs', { b: 2 });
    expect(await storage.get('prefs')).toEqual({ a: 1, b: 2 });
  });

  it('clears everything except kept keys', async () => {
    await storage.set('token', 'abc');
    await storage.set('theme', 'dark');
    await storage.clear({ keep: ['token'] });
    expect(await storage.keys()).toEqual(['token']);
  });
});
