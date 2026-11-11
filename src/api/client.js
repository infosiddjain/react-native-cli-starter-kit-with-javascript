import axios from 'axios';
import { CONFIG } from '@/constants/config';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { storage } from '@/utils/storage';

const client = axios.create({
  baseURL: CONFIG.BASE_URL,
  timeout: CONFIG.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Called when the server says the session is no longer valid (401).
// The store registers a handler at startup, which avoids a circular import.
let onUnauthorized = null;
export const setUnauthorizedHandler = handler => {
  onUnauthorized = handler;
};

// Attach the saved token to every request.
client.interceptors.request.use(async config => {
  const token = await storage.get(STORAGE_KEYS.TOKEN);
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (__DEV__ && CONFIG.ENABLE_API_LOGS) {
    console.log(`➡️ ${config.method?.toUpperCase()} ${config.url}`);
  }
  return config;
});

// Turn every failure into the same simple shape: { message, status, data }.
client.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status ?? null;
    const data = error.response?.data ?? null;

    let message = data?.message || error.message || 'Something went wrong';
    if (error.code === 'ECONNABORTED') {
      message = 'Request timed out. Please try again.';
    } else if (!error.response) {
      message = 'No internet connection or server is unreachable.';
    }

    if (status === 401 && onUnauthorized && !error.config?.skipAuthRedirect) {
      onUnauthorized();
    }

    return Promise.reject({ message, status, data });
  },
);

export default client;
