export const truncate = (text = '', max = 100) =>
  text.length > max ? `${text.slice(0, max).trim()}…` : text;

export const capitalize = (text = '') =>
  text.charAt(0).toUpperCase() + text.slice(1);
