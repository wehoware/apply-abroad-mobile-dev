import {axiosInstance} from './AxiosInstance';

export const ApiFetch = {
  GET: async (url: string) => {
    return await axiosInstance.get(url);
  },
  POST: async (url: string, data: any) => {
    return await axiosInstance.post(url, data);
  },
  PUT: async (url: string, data?: any) => {
    return await axiosInstance.put(url, data);
  },
  DELETE: async (url: string, data: any) => {
    return await axiosInstance.delete(url, data);
  },
};
