/* eslint-disable @typescript-eslint/no-unused-vars */
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  categoriesFetchRequest,
  categoriesFetchSuccess,
  countriesFetchRequest,
  countriesFetchSuccess,
  getConfig,
  institutionListFetchRequest,
  institutionListFetchSuccess,
  scoreTypesFetchRequest,
  scoreTypesFetchSuccess,
  universityListFetchRequest,
  universityListFetchSuccess,
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
      const updatedArray = response?.data?.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        select: false,
        flagImage: item.flagImage,
      }));

      // var data = response?.data?.data.forEach((country: any) => {
      //   country.select = false;
      // });
      yield put(countriesFetchSuccess(updatedArray));
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

function* fetchScoreTypes() {
  try {
    yield put(setIsFetching(true));
    var response: AxiosResponse<any, any> = yield call(API.getScoreTypes);
    if (response.status) {
      yield put(setIsFetching(false));
      yield put(setIsError(false));

      const updatedArray = response?.data?.data.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));
      yield put(scoreTypesFetchSuccess(updatedArray));
    } else {
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(scoreTypesFetchSuccess([]));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(true));
    yield put(scoreTypesFetchSuccess([]));
    if (error && error.response) {
      console.log('error in getting catgeories ==>', error.response.data);
    }
  }
}

function* fetchInstitutionList(data: PayloadAction<any>) {
  try {
    yield put(setIsFetching(true));
    var response: AxiosResponse<any, any> = yield call(
      API.getInstitutionsList,
      data,
    );
    if (response.status) {
      yield put(setIsFetching(false));
      yield put(setIsError(false));

      // const updatedArray = response?.data?.data.map((item: any) => ({
      //   value: item.id,
      //   label: item.name,
      // }));
      // console.log('response?.data?.data.data', response?.data?.data.data);

      yield put(institutionListFetchSuccess(response?.data?.data.data));
    } else {
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(institutionListFetchSuccess([]));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(true));
    yield put(institutionListFetchSuccess([]));
    if (error && error.response) {
      console.log('error in getting catgeories ==>', error.response.data);
    }
  }
}

function* fetchUniversityList(data: PayloadAction<any>) {
  try {
    yield put(setIsFetching(true));
    var response: AxiosResponse<any, any> = yield call(
      API.getUniversityList,
      data,
    );
    if (response.status) {
      yield put(setIsFetching(false));
      yield put(setIsError(false));

      yield put(universityListFetchSuccess(response?.data?.data.data));
    } else {
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(universityListFetchSuccess([]));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(true));
    yield put(universityListFetchSuccess([]));
    if (error && error.response) {
      console.log('error in getting catgeories ==>', error.response.data);
    }
  }
}

export function* AppSaga() {
  yield takeLatest(updateConfig.type, fetchConfigObject);
  yield takeLatest(countriesFetchRequest.type, fetchCountries);
  yield takeLatest(categoriesFetchRequest.type, fetchCategories);
  yield takeLatest(scoreTypesFetchRequest.type, fetchScoreTypes);
  yield takeLatest(institutionListFetchRequest.type, fetchInstitutionList);
  yield takeLatest(universityListFetchRequest.type, fetchUniversityList);
}
