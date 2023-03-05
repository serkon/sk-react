import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Authenticator } from 'src/common/component/user/authenticator.component';

export enum AuthorizationHeader {
  Bearer = 'Bearer',
  Basic = 'Basic',
  RefreshToken = 'refreshToken',
  AccessToken = 'accessToken',
}
const env = process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: env,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Timeout: 20000,
    Expires: '0',
    WithCredentials: true,
  },
});

api.defaults.withCredentials = true;

api.interceptors.request.use(
  (request: InternalAxiosRequestConfig<any>) => {
    const token = window.localStorage.getItem(AuthorizationHeader.AccessToken);
    // const headers: AxiosRequestHeaders = Object.assign({}, request.headers);

    if (token) {
      request.headers['Authorization'] = 'Bearer ' + token;
    }

    return request;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const res = error.response;

    if (res.status === 401 && !error.config.headers['RefreshToken']) {
      api.defaults.headers.common['RefreshToken'] = true;
      try {
        const refreshToken = window.localStorage.getItem(AuthorizationHeader.RefreshToken);

        if (refreshToken) {
          const refreshResponse: AxiosResponse<HttpResponse<RefreshTokenResponse>> = await api.post('/refresh', {
            refreshToken,
          });

          window.localStorage.setItem(AuthorizationHeader.AccessToken, refreshResponse.data.data[AuthorizationHeader.AccessToken] as string);
          // api.defaults.headers.common['Authorization'] = 'Bearer ' + refreshResponse.data.accessToken;
          error.config.headers['Authorization'] = 'Bearer ' + refreshResponse.data.data[AuthorizationHeader.AccessToken];
          api.defaults.headers.common['RefreshToken'] = false;
        } else {
          signOut();
          api.defaults.headers.common['RefreshToken'] = false;

          return Promise.reject(new Error('No refresh token'));
        }
      } catch (_error: any) {
        signOut();
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }

        return Promise.reject(_error);
      }

      return api(error.config);
    }
    console.error('Looks like there was a problem. Status Code: ' + res.status);
    api.defaults.headers.common['RefreshToken'] = false;

    return Promise.reject(error);
  },
);

const signOut = (): void => {
  // window.location.href = '/login';
  Authenticator.signOut();
  api.defaults.headers.common['RefreshToken'] = false;
};

export interface HttpResponse<T> {
  data: T;
  paging?: { current: number; limit: number; total: number };
  errorCode?: string;
}

export interface HttpRequest<T> {
  data: T;
  paging?: { current: number; limit: number };
  sort?: { field: string; order: string }[];
}

export interface RefreshTokenResponse {
  [AuthorizationHeader.AccessToken]: string;
  status: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  refreshExpire: string | null;
  time: number | undefined;
}
