import { APP_ENV, API_BASE_URL, API_TIMEOUT, ENABLE_API_LOGS } from '@env';

// The only file that reads .env. Everything else imports ENV from here,
// so missing values fall back to safe defaults in one place.
export const ENV = {
  APP_ENV: APP_ENV || 'development',
  API_BASE_URL: API_BASE_URL || 'https://dummyjson.com',
  API_TIMEOUT: Number(API_TIMEOUT) || 15000,
  ENABLE_API_LOGS: ENABLE_API_LOGS === 'true',
};

export const IS_PRODUCTION = ENV.APP_ENV === 'production';
