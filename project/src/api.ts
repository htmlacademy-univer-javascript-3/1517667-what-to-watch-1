import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { getToken } from './store/token';

const StatusCodeMapping: Record<number, boolean> = {
  [400]: true,
  [401]: true,
  [404]: true
};

//const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export function getApi() {
  const api = axios.create({
    baseURL: 'https://10.react.pages.academy/wtw/',
    timeout: 5000
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
}
