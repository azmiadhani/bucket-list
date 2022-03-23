import axios from 'axios';
import TokenService from '../services/Token';

// @desc  default config for axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// @desc  Intercept Request, continue after finished intercepting
axiosInstance.interceptors.request.use(
  (config) => {
    // add token to header
    const token = TokenService.getAccessToken();
    // if token exist
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // do other thing here

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// @Desc Intercept Request, continue after finished intercepting
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    // console.log(err.response);
    // if request is not containing request to /api/auth/ and if error response exist
    if (!originalConfig.url.includes('/api/auth/') && err.response) {
      // if 401 status
      // if not retrying, this is a flag call _retry on original Request (config) to handle Infinite loop. It is the case that request is failed again, and the server continue to return 401 status code.
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          // refreshing accessToken wi
          const res = await axiosInstance.post('/api/auth/refresh-token', {
            refreshToken: TokenService.getRefreshToken(),
          });
          // store new accessToken
          const { accessToken } = res.data;
          TokenService.storeAccessToken(accessToken);

          // return original config
          return axiosInstance(originalConfig);
        } catch (_error) {
          // if failed to refresh token, then delete access & refresh token
          TokenService.deleteToken();

          // reject original request
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
