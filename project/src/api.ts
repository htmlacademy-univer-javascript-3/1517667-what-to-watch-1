import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from './store/token';
import { toast } from 'react-toastify';

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
    (error: AxiosError<{ error: string }>) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.warn(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
}
