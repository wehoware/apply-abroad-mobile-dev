import axios from 'axios';
import resources from '../resources';
import {
  getDataFromAsync,
  removeDataFromAsync,
  setDataToAsync,
} from '../services/AsyncService';
import {ApiEndPoints} from './ApiEndPoints';
import {forceLogout} from '../hooks/navigationHelper';

export const axiosInstance = axios.create({
  baseURL: resources.config.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const refreshAxiosInstance = axios.create({
  baseURL: resources.config.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getNewRefreshToken = async () => {
  try {
    const refreshToken = await getDataFromAsync(
      resources.AsyncConstants.refreshToken,
    );
    const deviceId = await getDataFromAsync(resources.AsyncConstants.deviceId);

    if (!refreshToken) {
      throw new Error('No refresh token found'); // Handle missing refresh token
    }

    const response = await refreshAxiosInstance.post(
      ApiEndPoints.refreshtoken,
      {
        refreshToken: refreshToken,
        deviceId: deviceId,
      },
    );

    await setDataToAsync(
      resources.AsyncConstants.authToken,
      response.data.accessToken,
    );

    return response.data.accessToken;
  } catch (error: any) {
    // if (error && error.response?.status === 401) {
    handleForceLogout();
    // }

    throw error;
  }
};

const handleForceLogout = async () => {
  // Clear user session data
  await removeDataFromAsync(resources.AsyncConstants.authToken);
  await removeDataFromAsync(resources.AsyncConstants.refreshToken);
  await removeDataFromAsync(resources.AsyncConstants.userData);

  // Redirect to login screen
  forceLogout();
};

/**@ADDING_TOKEN_BEFORE_REQUEST */
axiosInstance.interceptors.request.use(
  async config => {
    const authToken = await getDataFromAsync(
      resources.AsyncConstants.authToken,
    );

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/**@MODIFYING_REQUEST_TO_GET_NEW_REFRESH_TOKEN_IF_EXPIRED */
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    console.log('inside axios intercept ==>', error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newRefreshToken = await getNewRefreshToken();
        originalRequest.headers.Authorization = `Bearer ${newRefreshToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // Return the error for any other status codes
    return Promise.reject(error);
  },
);
