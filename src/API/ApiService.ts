/* eslint-disable @typescript-eslint/no-unused-vars */
import {CustomerProfileUpdateRequestPayload} from '../redux/types';
import {ApiEndPoints} from './ApiEndPoints';
import {ApiFetch} from './ApiFetch';

const API = {
  getRefreshToken: async (refreshToken: string) => {
    return await ApiFetch.POST(ApiEndPoints.refreshtoken, {
      refreshToken: refreshToken,
    });
  },
  createUser: async (data: any) => {
    return await ApiFetch.POST(ApiEndPoints.register, data);
  },
  userLogin: async (data: any) => {
    return await ApiFetch.POST(ApiEndPoints.userlogin, data);
  },

  userOTP: async (data: any) => {
    return await ApiFetch.PUT(`${ApiEndPoints.otpRequest}/${data.email}`);
  },

  userPasswordOTP: async (data: any) => {
    return await ApiFetch.PUT(`${ApiEndPoints.forgot}/${data.email}`);
  },

  userOTPValidate: async (data: any) => {
    return await ApiFetch.POST(ApiEndPoints.register, data);
  },

  userPasswordOTPValidate: async (data: any) => {
    return await ApiFetch.POST(ApiEndPoints.password, data);
  },

  userLogout: async (data: any) => {
    return await ApiFetch.POST(ApiEndPoints.userlogout, data);
  },

  getCategories: async () => {
    return await ApiFetch.GET(ApiEndPoints.categorySearch);
  },

  getCountrys: async () => {
    return await ApiFetch.GET(ApiEndPoints.countries);
  },

  getHomeData: async () => {
    return await ApiFetch.GET(`${ApiEndPoints.countries}`);
  },
  // getProfile: async (data: {id: string}) => {
  //   return await ApiFetch.GET(`${ApiEndPoints.customerProfile}/${data.id}`);
  // },
};

export default API;
