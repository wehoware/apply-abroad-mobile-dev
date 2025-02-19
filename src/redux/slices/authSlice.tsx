/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  AuthSliceState,
  CustomerProfileUpdateRequestPayload,
  LegalInfo,
  UserState,
} from '../types';
import {StackNavigatorList, stackProps} from '../../navigation/types';

const initialState: AuthSliceState = {
  userData: {
    email: '',
    fullName: '',
    role: '',
    profilePic: '',
    loginMethod: '',
    status: '',
    intrestedCountry: 0,
    interestedFields: [],
    id: 0,
    socialLogins: [],
    accessToken: '',
    refreshToken: '',
    StudentEducation: [],
  },
  isLogged: false,
  redirect: null,
  showForgotPasswordText: false,
  redirectForgot: false,
  legalInfo: {
    type: '',
    show: false,
    url: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userOTPFetch: (state: AuthSliceState, action: PayloadAction<any>) => {},
    userPasswordOTPFetch: (
      state: AuthSliceState,
      action: PayloadAction<any>,
    ) => {},
    userOTPValidateFetch: (
      state: AuthSliceState,
      action: PayloadAction<any>,
    ) => {},
    userPasswordOTPValidateFetch: (
      state: AuthSliceState,
      action: PayloadAction<any>,
    ) => {},
    userCreateStage2Fetch: (
      state: AuthSliceState,
      action: PayloadAction<any>,
    ) => {},

    userCreateFetch: (state: AuthSliceState, action: PayloadAction<any>) => {},
    userCreateSuccess: (
      state: AuthSliceState,
      action: PayloadAction<UserState>,
    ) => {
      state.userData = action.payload;
    },
    userLoginFetch: (
      state: AuthSliceState,
      action: PayloadAction<{
        email: string;
        password: string;
        deviceId: string;
      }>,
    ) => {},
    logoutUserFetch: (
      state: AuthSliceState,
      action: PayloadAction<{
        email: string;
        deviceId: string;
      }>,
    ) => {},
    userLoginSuccess: (
      state: AuthSliceState,
      action: PayloadAction<UserState>,
    ) => {
      state.userData = action.payload;
    },

    getProfileFetch: () => {},
    getProfileSuccess: (
      state: AuthSliceState,
      action: PayloadAction<UserState>,
    ) => {
      state.userData = action.payload;
    },
    setIsLogged: (state: AuthSliceState, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    redirectRequest: (
      state: AuthSliceState,
      action: PayloadAction<string | null>,
    ) => {
      state.redirect = action.payload;
    },
    clearRedirect: (state: AuthSliceState, action: PayloadAction<any>) => {
      state.redirect = action.payload;
    },
    logoutRequest: (state: AuthSliceState) => {
      state.isLogged = false;
    },
    forgotPasswordRequest: (
      state: AuthSliceState,
      action: PayloadAction<any>,
    ) => {},
    forgotPasswordSuccess: (
      state: AuthSliceState,
      action: PayloadAction<boolean>,
    ) => {
      state.showForgotPasswordText = action.payload;
    },
    redirectForgotRequest: (
      state: AuthSliceState,
      action: PayloadAction<boolean>,
    ) => {
      state.redirectForgot = action.payload;
    },
    legalInfoRequest: (
      state: AuthSliceState,
      action: PayloadAction<LegalInfo>,
    ) => {
      state.legalInfo = action.payload;
    },

    customerProfileRequest: (
      state: AuthSliceState,
      action: PayloadAction<{id: string}>,
    ) => {},
    customerProfileUpdateRequest: (
      state: AuthSliceState,
      action: PayloadAction<CustomerProfileUpdateRequestPayload>,
    ) => {},
    resetAuthState: () => initialState,
  },
});

export const {
  userCreateFetch,
  userCreateSuccess,
  userCreateStage2Fetch,
  userLoginFetch,
  userLoginSuccess,
  getProfileFetch,
  getProfileSuccess,
  setIsLogged,
  redirectRequest,
  clearRedirect,
  logoutRequest,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  redirectForgotRequest,
  legalInfoRequest,
  customerProfileRequest,
  customerProfileUpdateRequest,
  resetAuthState,
  logoutUserFetch,
  userOTPFetch,
  userPasswordOTPFetch,
  userOTPValidateFetch,
  userPasswordOTPValidateFetch,
} = authSlice.actions;

export default authSlice.reducer;
