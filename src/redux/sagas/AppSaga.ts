/* eslint-disable @typescript-eslint/no-unused-vars */
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  categoriesFetchRequest,
  categoriesFetchSuccess,
  countriesFetchRequest,
  countriesFetchSuccess,
  getConfig,
  updateConfig,
} from '../slices/appSlice';
import {setIsError, setIsFetching} from '../slices/commonSlice';
import {AxiosResponse} from 'axios';
import API from '../../API/ApiService';
import {PayloadAction} from '@reduxjs/toolkit';
import {ConfigRequestPayload, SelectedCategoryPayload} from '../types';

function* fetchConfigObject(data: PayloadAction<ConfigRequestPayload>) {
  try {
    let config: ConfigRequestPayload = yield select(getConfig);

    console.log('config object', config);
  } catch (error) {
    console.log('error in updating config object', error);
  }
}

function* fetchCountries() {
  try {
    yield put(setIsFetching(true));
    var response: AxiosResponse<any, any> = yield call(API.getCountrys);
    if (response.status) {
      yield put(setIsFetching(false));
      yield put(setIsError(false));
      // var data = response?.data?.data.forEach((country: any) => {
      //   country.select = false;
      // });
      yield put(countriesFetchSuccess(response?.data?.data));
    } else {
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(countriesFetchSuccess([]));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(true));
    yield put(countriesFetchSuccess([]));
    if (error && error.response) {
      console.log('error in getting catgeories ==>', error.response.data);
    }
  }
}

function* fetchCategories() {
  try {
    yield put(setIsFetching(true));
    var response: AxiosResponse<any, any> = yield call(API.getCategories);
    if (response.status) {
      yield put(setIsFetching(false));
      yield put(setIsError(false));

      yield put(categoriesFetchSuccess(response.data.data));
    } else {
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(categoriesFetchSuccess([]));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(true));
    yield put(categoriesFetchSuccess([]));
    if (error && error.response) {
      console.log('error in getting catgeories ==>', error.response.data);
    }
  }
}

export function* AppSaga() {
  yield takeLatest(updateConfig.type, fetchConfigObject);
  yield takeLatest(countriesFetchRequest.type, fetchCountries);
  yield takeLatest(categoriesFetchRequest.type, fetchCategories);
}
