export const LS_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  TOKEN_TYPE: 'token_type',
  ID_TOKEN: 'id_token',
  EXPIRES_IN: 'expires_in',
  USER_INFO: 'user_info',
  DRAFT_DATA: 'draft_data',
  CART: 'cart',
  THEME: 'theme',
} as const;

export type KeyType = (typeof LS_KEYS)[keyof typeof LS_KEYS];

export const getLS = (key: KeyType) => {
  // TODO: Optimize it
  return localStorage.getItem(key);
};

export const setLS = (key: KeyType, value: any) => {
  if (key) {
    if (typeof value !== 'string') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }
};

export const removeLS = (key: KeyType) => {
  if (key) {
    localStorage.removeItem(key);
  }
};
