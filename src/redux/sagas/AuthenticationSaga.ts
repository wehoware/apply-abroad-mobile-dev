/* eslint-disable @typescript-eslint/no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';
import {
  userCreateFetch,
  userCreateSuccess,
  userLoginFetch,
  userLoginSuccess,
  userOTPFetch,
  userPasswordOTPFetch,
  userOTPValidateFetch,
  userPasswordOTPValidateFetch,
  customerProfileRequest,
  userCreateStage2Fetch,
  customerProfileUpdateRequest,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  logoutRequest,
  redirectForgotRequest,
  redirectRequest,
  resetAuthState,
  setIsLogged,
  logoutUserFetch,
  getProfileFetch,
  getProfileSuccess,
  updateProfileFetch,
  updateEducationFetch,
  updateCountryFetch,
} from '../slices/authSlice';
import {
  resetCommonState,
  setErrorData,
  setIsError,
  setIsFetching,
  setTheme,
} from '../slices/commonSlice';
import API from '../../API/ApiService';
import {PayloadAction} from '@reduxjs/toolkit';
import {ColorScheme} from '../../types';
import {AxiosResponse} from 'axios';
import {CustomerProfileUpdateRequestPayload, UserState} from '../types';
import {formatUserData} from '../../services/Helpers';
import {
  getDataFromAsync,
  removeDataFromAsync,
  setDataToAsync,
} from '../../services/AsyncService';
import resources from '../../resources/';
import {Toaster} from '../../services/Toaster';

function* createUser(data: PayloadAction<any>) {
  try {
    yield put(setIsFetching(true));

    var res: AxiosResponse<any, any> = yield call(API.createUser, data.payload);

    if (res.status) {
      var userData: UserState = formatUserData(res.data.user);

      let _theme: ColorScheme | null = yield getDataFromAsync(
        resources.AsyncConstants.theme,
      );
      setDataToAsync(resources.AsyncConstants.authToken, userData.accessToken);
      setDataToAsync(
        resources.AsyncConstants.refreshToken,
        userData.refreshToken,
      );
      setDataToAsync(resources.AsyncConstants.userData, userData);
      yield put(userCreateSuccess(userData));
      yield call(getProfile);
      yield put(setIsLogged(true));
      yield put(setIsFetching(false));
      yield put(setIsError(false));

      if (_theme !== null) {
        yield put(setTheme(_theme));
      }

      yield put(redirectRequest('Home'));
    } else {
      yield put(setIsFetching(false));
      yield put(setIsLogged(false));
      yield put(setIsError(true));
      yield put(setErrorData(res.data));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(true));

    if (error && error.response) {
      Toaster.error(error.response.data.message);
    }
  }
}

function* createStage2User(data: PayloadAction<any>) {
  try {
    yield put(setIsFetching(true));

    var res: AxiosResponse<any, any> = yield call(
      API.createStage2User,
      data.payload,
    );

    if (res.status) {
      var userData: UserState = formatUserData(res.data.data);

      let _theme: ColorScheme | null = yield getDataFromAsync(
        resources.AsyncConstants.theme,
      );

      yield put(setIsLogged(true));
      yield put(setIsFetching(false));
      yield put(setIsError(false));

      if (_theme !== null) {
        yield put(setTheme(_theme));
      }

      yield put(redirectRequest('Category'));
    } else {
      yield put(setIsFetching(false));
      yield put(setIsLogged(false));
      yield put(setIsError(true));
      yield put(setErrorData(res.data));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(true));

    if (error && error.response) {
      Toaster.error(error.response.data.message);
    }
  }
}

function* userLogin(data: PayloadAction<any>) {
  console.log('data==================', data);

  try {
    yield put(setIsFetching(true));

    var res: AxiosResponse<any, any> = yield call(API.userLogin, data.payload);
    console.log('res---------', res.data);

    if (res?.status) {
      var user: UserState = formatUserData(res.data.user);
      console.log('res---------if', user);

      setDataToAsync(resources.AsyncConstants.authToken, user.accessToken);
      setDataToAsync(resources.AsyncConstants.refreshToken, user.refreshToken);
      setDataToAsync(resources.AsyncConstants.userData, user);

      let _theme: ColorScheme | null = yield getDataFromAsync(
        resources.AsyncConstants.theme,
      );

      yield put(userLoginSuccess(user));
      yield call(getProfile);
      yield put(setIsFetching(false));
      yield put(setIsError(false));
      yield put(setIsLogged(true));
      // yield put(getProfileFetch());

      if (_theme !== null) {
        yield put(setTheme(_theme));
      }
      Toaster.success(res.data.message);
      yield put(redirectRequest('Home'));
    } else {
      console.log('else==============');
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(setIsLogged(false));
      yield put(setErrorData(res.data));

      Toaster.error(res.data.message);
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(false));
    console.log('response ==>', error);

    if (error && error.response) {
      console.log('111111111', error.response);
      Toaster.error(error.response.data.message);
    }
  }
}

function* userOTP(data: PayloadAction<any>) {
  console.log('data==================', data);

  try {
    yield put(setIsFetching(true));

    var res: AxiosResponse<any, any> = yield call(API.userOTP, data.payload);

    if (res?.status) {
      console.log('userPasswordOTP---------', res.data);
      let _theme: ColorScheme | null = yield getDataFromAsync(
        resources.AsyncConstants.theme,
      );

      yield put(setIsFetching(false));
      yield put(setIsError(false));

      if (_theme !== null) {
        yield put(setTheme(_theme));
      }
      yield put(redirectRequest('VerificationCode'));
    } else {
      console.log('else==============');
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(setIsLogged(false));
      yield put(setErrorData(res.data));

      Toaster.error(res.data.message);
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(false));
    console.log('response ==>', error);

    if (error && error.response) {
      console.log('111111111', error.response);
      Toaster.error(error.response.data.message);
    }
  }
}

function* userPasswordOTP(data: PayloadAction<any>) {
  console.log('data==================', data);

  try {
    yield put(setIsFetching(true));

    var res: AxiosResponse<any, any> = yield call(
      API.userPasswordOTP,
      data.payload,
    );

    if (res?.status) {
      console.log('userOTP---------', res.data);
      let _theme: ColorScheme | null = yield getDataFromAsync(
        resources.AsyncConstants.theme,
      );

      yield put(setIsFetching(false));
      yield put(setIsError(false));

      if (_theme !== null) {
        yield put(setTheme(_theme));
      }
      yield put(redirectRequest('PasswordVerificationCode'));
    } else {
      console.log('else==============');
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(setIsLogged(false));
      yield put(setErrorData(res.data));

      Toaster.error(res.data.message);
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(false));
    console.log('response ==>', error);

    if (error && error.response) {
      console.log('111111111', error.response);
      Toaster.error(error.response.data.message);
    }
  }
}

function* userOTPValidate(data: PayloadAction<any>) {
  console.log('data==================', data);

  try {
    yield put(setIsFetching(true));

    var res: AxiosResponse<any, any> = yield call(
      API.userOTPValidate,
      data.payload,
    );

    if (res?.status) {
      console.log('userOTP---------', res.data);
      let _theme: ColorScheme | null = yield getDataFromAsync(
        resources.AsyncConstants.theme,
      );

      yield put(setIsFetching(false));
      yield put(setIsError(false));

      if (_theme !== null) {
        yield put(setTheme(_theme));
      }
      yield put(redirectRequest('Education'));
    } else {
      console.log('else==============');
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(setIsLogged(false));
      yield put(setErrorData(res.data));

      Toaster.error(res.data.message);
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(false));
    console.log('response ==>', error);

    if (error && error.response) {
      console.log('111111111', error.response);
      Toaster.error(error.response.data.message);
    }
  }
}

function* userPasswordOTPValidate(data: PayloadAction<any>) {
  console.log('data==================', data);

  try {
    yield put(setIsFetching(true));

    var res: AxiosResponse<any, any> = yield call(
      API.userPasswordOTPValidate,
      data.payload,
    );

    if (res?.status) {
      console.log('userOTP---------', res.data);
      let _theme: ColorScheme | null = yield getDataFromAsync(
        resources.AsyncConstants.theme,
      );
      var res: AxiosResponse<any, any> = yield call(
        API.userPasswordChange,
        data.payload,
      );
      if (res?.status) {
        yield put(redirectRequest('Login'));
        yield put(setIsError(false));
        yield put(setIsFetching(false));
      } else {
        yield put(setIsError(true));
        yield put(setIsLogged(false));
        yield put(setErrorData(res.data));
        yield put(redirectRequest('ForgotPassword'));
        Toaster.error(res.data.message);
      }
      // yield put(setIsError(false));
      // yield put(setIsFetching(false));

      if (_theme !== null) {
        yield put(setTheme(_theme));
      }
    } else {
      console.log('else==============');
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(setIsLogged(false));
      yield put(setErrorData(res.data));
      yield put(redirectRequest('ForgotPassword'));
      Toaster.error(res.data.message);
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(false));
    console.log('response ==>', error);

    if (error && error.response) {
      console.log('111111111', error.response);
      Toaster.error(error.response.data.message);
    }
  }
}

function* forgotPassword(data: PayloadAction<any>) {
  try {
    yield put(setIsFetching(true));

    // do the api call here
    let res: AxiosResponse<any, any> = yield call(
      API.userPasswordOTP,
      data.payload,
    );

    console.log('forgot password payload ==>', data.payload);

    if (res.status) {
      yield put(setIsFetching(false));
      yield put(forgotPasswordSuccess(true));

      yield delay(1000);

      yield put(redirectForgotRequest(true));

      yield delay(3000);

      yield put(redirectRequest('Login'));
      yield put(forgotPasswordSuccess(false));
      yield put(redirectForgotRequest(false));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));

    yield put(forgotPasswordSuccess(false));
    yield put(redirectForgotRequest(false));
    if (error && error.response) {
      Toaster.error(error.response.data.message);
    }
  }
}

function* logoutUser(data: PayloadAction<any>) {
  console.log('logout data==================', data);

  try {
    yield put(setIsFetching(true));

    var res: AxiosResponse<any, any> = yield call(API.userLogout, data.payload);
    console.log('res---------', res.data);

    if (res?.status) {
      let _theme: ColorScheme | null = yield getDataFromAsync(
        resources.AsyncConstants.theme,
      );
      yield removeDataFromAsync(resources.AsyncConstants.authToken);
      yield removeDataFromAsync(resources.AsyncConstants.refreshToken);
      yield removeDataFromAsync(resources.AsyncConstants.userData);
      yield put(resetAuthState());
      yield put(resetCommonState());
      yield put(setIsFetching(false));
      yield put(setIsError(false));
      yield put(setIsLogged(false));

      if (_theme !== null) {
        yield put(setTheme(_theme));
      }
      yield put(redirectRequest('Login'));
      Toaster.success(res.data.message);
    } else {
      console.log('else==============');
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(setIsLogged(false));
      Toaster.error(res.data.message);
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(false));
    console.log('response ==>', error);

    if (error && error.response) {
      Toaster.error(error.response.data.message);
    }
  }
}

function* getProfile() {
  try {
    var res: AxiosResponse<any> = yield call(API.getProfile);

    if (res.status) {
      var userData: UserState = formatUserData(res.data.data);

      yield put(getProfileSuccess(userData));
    } else {
      let user: Promise<any | null> = yield getDataFromAsync(
        resources.AsyncConstants.userData,
      );

      if (user !== null) {
        let _user = formatUserData(user);

        yield put(getProfileSuccess(_user));
      }
    }
  } catch (error) {
    console.log('error in getting profile ==>', error);
  }
}

function* updateProfile(data: PayloadAction<any>) {
  console.log('updateProfile data==================', data.payload);

  try {
    yield put(setIsFetching(true));

    var res: AxiosResponse<any, any> = yield call(
      API.profileUpdate,
      data.payload,
    );
    console.log('res---------', res.data);

    if (res?.status) {
      let _theme: ColorScheme | null = yield getDataFromAsync(
        resources.AsyncConstants.theme,
      );

      yield put(setIsFetching(false));
      yield put(setIsError(false));
      yield put(setIsLogged(false));
      yield put(redirectRequest(''));
      yield call(getProfile);
      if (_theme !== null) {
        yield put(setTheme(_theme));
      }
      Toaster.success(res.data.message);
    } else {
      console.log('else==============');
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(setIsLogged(false));
      Toaster.error(res.data.message);
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(false));
    console.log('response ==>', error);

    if (error && error.response) {
      Toaster.error(error.response.data.message);
    }
  }
}

function* updateCountry(data: PayloadAction<any>) {
  console.log('updateCountry data==================', data.payload);

  try {
    yield put(setIsFetching(true));

    var res: AxiosResponse<any, any> = yield call(
      API.profileUpdate,
      data.payload,
    );
    console.log('res---------', res.data);

    if (res?.status) {
      let _theme: ColorScheme | null = yield getDataFromAsync(
        resources.AsyncConstants.theme,
      );

      yield put(setIsFetching(false));
      yield put(setIsError(false));
      yield put(setIsLogged(false));
      yield put(redirectRequest('Home'));
      yield call(getProfile);
      if (_theme !== null) {
        yield put(setTheme(_theme));
      }
      Toaster.success(res.data.message);
    } else {
      console.log('else==============');
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(setIsLogged(false));
      Toaster.error(res.data.message);
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(false));
    console.log('response ==>', error);

    if (error && error.response) {
      Toaster.error(error.response.data.message);
    }
  }
}

function* updateEducation(data: PayloadAction<any>) {
  console.log('updateEducation data==================', data);

  try {
    yield put(setIsFetching(true));

    var res: AxiosResponse<any, any> = yield call(
      API.educationUpdate,
      data.payload,
    );
    console.log('res---------', res.data);

    if (res?.status) {
      let _theme: ColorScheme | null = yield getDataFromAsync(
        resources.AsyncConstants.theme,
      );

      yield put(setIsFetching(false));
      yield put(setIsError(false));
      yield put(setIsLogged(false));
      yield call(getProfile);
      yield put(redirectRequest('EducationCertificates'));
      if (_theme !== null) {
        yield put(setTheme(_theme));
      }

      Toaster.success(res.data.message);
    } else {
      console.log('else==============');
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(setIsLogged(false));
      Toaster.error(res.data.message);
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(false));
    console.log('response ==>', error);

    if (error && error.response) {
      Toaster.error(error.response.data.message);
    }
  }
}

export function* AuthenticationSaga() {
  yield takeLatest(userCreateFetch.type, createUser);
  yield takeLatest(userCreateStage2Fetch.type, createStage2User);
  yield takeLatest(userLoginFetch.type, userLogin);
  yield takeLatest(userOTPFetch.type, userOTP);
  yield takeLatest(userPasswordOTPFetch.type, userPasswordOTP);
  yield takeLatest(userOTPValidateFetch.type, userOTPValidate);
  yield takeLatest(userPasswordOTPValidateFetch.type, userPasswordOTPValidate);
  yield takeLatest(logoutUserFetch.type, logoutUser);
  yield takeLatest(logoutRequest.type, logoutUser);
  yield takeLatest(forgotPasswordRequest.type, forgotPassword);
  yield takeLatest(getProfileFetch.type, getProfile);
  yield takeLatest(updateProfileFetch.type, updateProfile);
  yield takeLatest(updateCountryFetch.type, updateCountry);
  yield takeLatest(updateEducationFetch.type, updateEducation);
}
