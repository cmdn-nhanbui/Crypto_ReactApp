import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const request = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export const setHeaderConfigAxios = (token: string) => {
  if (token) {
    request.defaults.headers.common['Authorization'] = token ? 'Bearer ' + token : '';
  } else {
    delete request.defaults.headers.common['Authorization'];
  }
};

export default request;
