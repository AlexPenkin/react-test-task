const ACCESS_TOKEN_STORAGE_KEY = 'access_token';

export const setAccessToken = (accessToken) => localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
