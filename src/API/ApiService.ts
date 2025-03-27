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

  createStage2User: async (data: any) => {
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
    return await ApiFetch.POST(ApiEndPoints.passwordvalidate, data);
  },

  userPasswordChange: async (data: any) => {
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

  getScoreTypes: async () => {
    return await ApiFetch.GET(ApiEndPoints.scoreTypes);
  },

  getInstitutionsList: async (data: any) => {
    return await ApiFetch.GET(
      `${ApiEndPoints.institutions}${1}&countryId=${
        data.payload.countryId
      }&limit=${data.payload.count}&sortBy=name&sortOrder=asc&type=College`,
    );
  },

  getUniversityList: async (data: any) => {
    return await ApiFetch.GET(
      `${ApiEndPoints.institutions}${1}&countryId=${
        data.payload.countryId
      }&limit=${data.payload.count}&sortBy=name&sortOrder=asc&type=University`,
    );
  },

  getCourseList: async (data: any) => {
    return await ApiFetch.GET(
      `${ApiEndPoints.courses}sortBy=name&sortOrder=ASC&categoryIds=${data.payload.categoryId}&countryId=${data.payload.countryId}`,
    );
  },

  getHomeData: async () => {
    return await ApiFetch.GET(`${ApiEndPoints.countries}`);
  },
  getProfile: async () => {
    return await ApiFetch.GET(ApiEndPoints.profile);
  },
  profileUpdate: async (data: any) => {
    console.log('profileUpdate data========', data);

    return await ApiFetch.PUT(`${ApiEndPoints.profileUpdate}/${data.id}`, data);
  },

  educationUpdate: async (data: any) => {
    console.log('educationUpdate data========', data);

    return await ApiFetch.POST(`${ApiEndPoints.studentEducation}`, data);
  },

  getAppliedCourses: async (data: any) => {
    return await ApiFetch.GET(
      `${ApiEndPoints.appliedCourses}?page=${data.payload.page}&limit=${data.payload.count}&sortBy=createdAt&order=DESC&email=${data.payload.email}&paymentStatus=PAID&categoryId=${data.payload.categoryId}`,
    );
  },

  getPopularColleges: async (data: any) => {
    return await ApiFetch.GET(
      `${ApiEndPoints.popularColleges}${data.payload.page}&limit=${data.payload.count}&sortBy=name&sortOrder=asc&type=college&isPopular=true&countryId=${data.payload.countryId}`,
    );
  },

  getTopCourses: async (data: any) => {
    return await ApiFetch.GET(
      `${ApiEndPoints.topCourses}sortBy=name&sortOrder=ASC&isPopular=true&categoryIds=${data.payload.categoryId}&countryId=${data.payload.countryId}`,
    );
  },

  getCoursesForYou: async (data: any) => {
    return await ApiFetch.GET(
      `${ApiEndPoints.topCourses}sortBy=name&sortOrder=ASC&categoryIds=${data.payload.categoryId}&countryId=${data.payload.countryId}`,
    );
  },

  applyCourses: async (data: any) => {
    console.log('data===========', data);
    return await ApiFetch.PUT(`${ApiEndPoints.courseApply}${data.payload.id}`);
  },

  addReview: async (data: any) => {
    console.log('addReview data========', data);

    return await ApiFetch.POST(`${ApiEndPoints.review}`, data);
  },
};

export default API;
