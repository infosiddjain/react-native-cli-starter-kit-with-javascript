import { api } from '../apiService';
import { ENDPOINTS } from '../endpoints';

export const authService = {
  // skipAuthRedirect: a wrong password returns 401, which should not log the user out.
  login: ({ username, password }) =>
    api.post(
      ENDPOINTS.AUTH.LOGIN,
      { username, password, expiresInMins: 60 },
      { skipAuthRedirect: true },
    ),
  register: body =>
    api.post(ENDPOINTS.AUTH.REGISTER, body, { skipAuthRedirect: true }),
  getMe: () => api.get(ENDPOINTS.AUTH.ME),
};
