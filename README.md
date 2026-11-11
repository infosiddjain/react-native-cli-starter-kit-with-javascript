# StarterKit — React Native CLI (JavaScript)

A plain JavaScript React Native CLI starter with:

- **Reusable API layer**: axios client, interceptors, endpoint constants, services
- **Redux Toolkit + thunks**: a `createApiThunk` helper, auth/theme/posts slices
- **Themes**: light, dark, and system mode, saved between launches
- **Navigation**: root stack → auth stack or drawer → custom bottom tabs → one stack per tab, plus global modal screens
- **Local storage**: `storage` helper and a `useStorage` hook (useState that's saved on the device)
- **Constants**: config, storage keys, UI strings, dropdown option lists
- **Components**: Dropdown (single/multi, searchable), BottomSheet, Tabs, ListItem, Section, Icon (vector icons), IconButton, Badge, Divider, ThemeSwitcher, Text, Button, Input, ScreenWrapper, Card, Loader, ErrorView, EmptyState, Spacer

Open the **Components** tab in the app to see every component in action.

The demo uses [dummyjson.com](https://dummyjson.com). Log in with **emilys / emilyspass**.

## Getting started

```sh
npm install        # also creates .env files from .env.example

# iOS (first time, and after adding native packages)
bundle install
cd ios && bundle exec pod install && cd ..   # needed after adding any native package

npm start          # Metro
npm run android    # or: npm run ios
```

Other scripts: `npm test`, `npm run lint`, `npm run start:reset` (clears Metro cache),
`npm run android:release` / `npm run ios:release` (production env).

## Environment variables

| File | Committed | Used for |
| --- | --- | --- |
| `.env.example` | yes | Template listing every variable |
| `.env` | no | Shared fallback values |
| `.env.development` | no | Debug builds (`npm start`, `npm run android`) |
| `.env.production` | no | Release builds (`APP_ENV=production`) |

`npm install` creates the missing files for you (or run `npm run setup:env`).

Read values only through `src/constants/env.js`:
```js
import { ENV } from '@/constants/env';
ENV.API_BASE_URL;
```
To add a variable: put it in `.env.example` and your `.env.*` files, then export it in `env.js`.

- After changing any `.env` file, restart Metro with `npm run start:reset`.
- Values are built into the app and can be read by anyone with the app.
  Never put real secrets there; keep those on your server.

## Folder structure

```
App.js                     Providers (Redux, SafeArea) + RootNavigator
src/
├── api/
│   ├── client.js          axios instance, token + error interceptors, 401 handler
│   ├── apiService.js      api.get / post / put / patch / delete / upload
│   ├── endpoints.js       every API path
│   └── services/          one file per feature (authService, postService)
├── store/
│   ├── index.js           configureStore + 401 → logout wiring
│   ├── rootReducer.js     combines slices, resets state on logout
│   ├── createApiThunk.js  reusable thunk factory
│   └── slices/            authSlice, themeSlice, postsSlice
├── theme/
│   ├── colors.js          raw palette + light/dark semantic colors
│   ├── typography.js
│   ├── spacing.js         spacing + radius scales
│   └── index.js           lightTheme, darkTheme, THEME_MODES
├── navigation/
│   ├── routes.js          ROUTES constants + the full navigation tree
│   ├── RootNavigator.js   restores session, picks Auth vs App, global modals
│   ├── AuthStack.js       Login → Register
│   ├── AppDrawer.js       drawer: Tabs, Settings, About
│   ├── MainTabs.js        bottom tabs (custom bar), hides bar on detail screens
│   ├── stacks.js          one stack per tab
│   ├── options.js         shared themed header options
│   ├── components/        CustomTabBar, CustomDrawerContent, header buttons
│   └── navigationRef.js   navigate() from outside components
├── constants/             config (BASE_URL), storage keys, strings
├── components/            shared UI, all themed
├── screens/               auth, home, components, profile, settings, about, notifications
├── hooks/                 useTheme, useStorage, useAppDispatch, useAppSelector
└── utils/                 storage (AsyncStorage wrapper), helpers
```

Import with the `@/` alias, for example `import { AppButton } from '@/components'`.
It is set up in `babel.config.js` (and `jsconfig.json` for editor autocomplete).
If you change aliases, restart Metro with `npm start -- --reset-cache`.

## Common tasks

### Point at your backend
Edit `BASE_URL` in `src/constants/config.js`.

### Add an API call
1. Add the path to `src/api/endpoints.js`
2. Add a function to a service:
   ```js
   // src/api/services/userService.js
   export const userService = {
     getUsers: params => api.get(ENDPOINTS.USERS.LIST, { params }),
     updateUser: ({ id, ...body }) => api.put(ENDPOINTS.USERS.DETAIL(id), body),
   };
   ```
3. Make a thunk with the helper. Errors arrive as `{ message, status, data }`:
   ```js
   export const fetchUsers = createApiThunk('users/fetch', userService.getUsers);
   ```

The token is attached automatically. Any 401 logs the user out. To skip that
for one request (like login), pass `{ skipAuthRedirect: true }` in the config.

### Add a slice
Create it in `src/store/slices/`, then register it in `src/store/rootReducer.js`.

### Navigation tree

```
RootStack
├── AuthStack                 (logged out)  Login → Register
├── AppDrawer                 (logged in)
│   ├── MainTabs              custom bottom tab bar
│   │   ├── HomeStack         Home → PostDetail { id }
│   │   ├── ComponentsStack   Components
│   │   └── ProfileStack      Profile
│   ├── Settings
│   └── About
└── Notifications             global modal, reachable from anywhere
```

### Add a screen
1. Add its name to `src/navigation/routes.js`
2. Register it where it belongs:
   - inside a tab → that tab's stack in `stacks.js` (add to `HIDE_TAB_BAR_ON` in `MainTabs.js` to hide the bar)
   - a new tab → `MainTabs.js` with `options={{ title, icon }}`
   - a drawer item → `AppDrawer.js` with `options={{ title, icon }}`
   - reachable from everywhere → the modal group in `RootNavigator.js`
3. Navigate with `navigation.navigate(ROUTES.MY_SCREEN, params)`. Names work across navigators.

### Save something on the device
```js
// In a component: works like useState, but survives app restarts
const [lang, setLang] = useStorage(STORAGE_KEYS.LANGUAGE, 'en');

// Anywhere else
await storage.set(STORAGE_KEYS.NOTE, 'hello');
const note = await storage.get(STORAGE_KEYS.NOTE, '');
await storage.merge(KEY, { partial: true });
await storage.clear({ keep: AUTH_STORAGE_KEYS });
```
Add new keys to `src/constants/storageKeys.js`.

### Dropdown, Tabs, BottomSheet
```js
<Dropdown label="Country" items={COUNTRIES} value={country} onChange={setCountry} searchable />
<Dropdown label="Topics" items={TOPICS} value={topics} onChange={setTopics} multiple />

<Tabs items={[{ key: 'a', label: 'A' }, { key: 'b', label: 'B', badge: 2 }]}
      value={tab} onChange={setTab} variant="underline" />

<BottomSheet visible={open} onClose={() => setOpen(false)} title="Filters">
  ...
</BottomSheet>
```
### Icons (react-native-vector-icons)

Installed families: **Ionicons** (default) and **MaterialDesignIcons**.
[Browse all icons](https://oblador.github.io/react-native-vector-icons/).

```js
<Icon name="home" />                              // app name, outline
<Icon name="home" filled color="primary" />       // filled, theme color
<Icon name="rocket-outline" size={18} />          // any Ionicons name
<Icon family="material" name="github" />          // any MaterialDesignIcons name
```

App names (`home`, `user`, `bell`, …) are mapped in `src/components/Icon.js`, so you can
switch icon sets later without touching screens.

Add another family (e.g. Feather):
1. `npm install @react-native-vector-icons/feather`
2. Add it to `FAMILIES` in `src/components/Icon.js`
3. `npm run icons:ios` (adds the font to iOS `Info.plist`), then `cd ios && bundle exec pod install`
4. Rebuild the app (Android copies fonts automatically)

### Use the theme
```js
const { colors, spacing, typography, radius, dark } = useTheme();
<AppText variant="h2" color="primary">Hello</AppText>
```
Add or change colors in `src/theme/colors.js`. Keep both `lightColors` and
`darkColors` using the same keys.
