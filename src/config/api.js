export const BASE_URL = "http://localhost:3000/api/v1";

export const AUTH_URLS = {
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
};

export const USER_URLS = {
  DETAILS: `${BASE_URL}/profile/view`,
  UPDATE: `${BASE_URL}/profile/edit`,
  DELETE: `${BASE_URL}/profile/delete`,
};
