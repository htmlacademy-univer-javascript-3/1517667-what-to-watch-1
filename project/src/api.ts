import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { clearErrorAction } from './store/api-actions';
import { setErrorAction } from './action';
import { store } from './store';
import { getToken } from './store/token';

const StatusCodeMapping: Record<number, boolean> = {
  [400]: true,
  [401]: true,
  [404]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

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

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        processErrorHandle(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
}

const processErrorHandle = (message: string): void => {
  store.dispatch(setErrorAction(message));
  store.dispatch(clearErrorAction());
};
