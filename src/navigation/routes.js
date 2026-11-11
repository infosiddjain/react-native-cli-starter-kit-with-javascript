/**
 * Every navigator and screen name. Never type a route name as a raw string.
 *
 * Navigation tree:
 *
 * RootStack
 * ├── AuthStack                 (logged out)
 * │   ├── Login
 * │   └── Register
 * ├── AppDrawer                 (logged in)
 * │   ├── MainTabs              custom bottom tab bar
 * │   │   ├── HomeStack         Home → PostDetail { id }
 * │   │   ├── ComponentsStack   Components
 * │   │   └── ProfileStack      Profile
 * │   ├── Settings
 * │   └── About
 * └── Notifications             global screen, opens as a modal above everything
 */
export const ROUTES = {
  // Navigators
  AUTH_STACK: 'AuthStack',
  APP_DRAWER: 'AppDrawer',
  MAIN_TABS: 'MainTabs',
  HOME_STACK: 'HomeStack',
  COMPONENTS_STACK: 'ComponentsStack',
  PROFILE_STACK: 'ProfileStack',

  // Auth stack
  LOGIN: 'Login',
  REGISTER: 'Register',

  // Home stack
  HOME: 'Home',
  POST_DETAIL: 'PostDetail', // params: { id }

  // Components stack
  COMPONENTS: 'Components',

  // Profile stack
  PROFILE: 'Profile',

  // Drawer
  SETTINGS: 'Settings',
  ABOUT: 'About',

  // Global (root stack)
  NOTIFICATIONS: 'Notifications',
};
