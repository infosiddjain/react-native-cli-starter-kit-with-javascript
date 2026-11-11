import client from './client';

// Thin wrappers that return response.data directly.
// Pass any axios option in `config` (params, headers, signal, etc).
export const api = {
  get: (url, config) => client.get(url, config).then(res => res.data),
  post: (url, body, config) =>
    client.post(url, body, config).then(res => res.data),
  put: (url, body, config) =>
    client.put(url, body, config).then(res => res.data),
  patch: (url, body, config) =>
    client.patch(url, body, config).then(res => res.data),
  delete: (url, config) => client.delete(url, config).then(res => res.data),
  upload: (url, formData, config) =>
    client
      .post(url, formData, {
        ...config,
        headers: { 'Content-Type': 'multipart/form-data', ...config?.headers },
      })
      .then(res => res.data),
};
