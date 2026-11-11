import { ENV } from './env';

// App-wide configuration. Values that change per environment come from .env
// (see .env.example). The demo API is https://dummyjson.com (emilys / emilyspass).
export const CONFIG = {
  BASE_URL: ENV.API_BASE_URL,
  API_TIMEOUT: ENV.API_TIMEOUT,
  ENABLE_API_LOGS: ENV.ENABLE_API_LOGS,
  APP_ENV: ENV.APP_ENV,
  APP_NAME: 'StarterKit',
  APP_VERSION: '1.0.0',
};
