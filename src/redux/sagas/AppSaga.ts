/* eslint-disable @typescript-eslint/no-unused-vars */
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  appliedCoursesListFetchRequest,
  appliedCoursesListFetchSuccess,
  applyCoursesFetchRequest,
  applyCoursesFetchSuccess,
  categoriesFetchRequest,
  categoriesFetchSuccess,
  countriesFetchRequest,
  countriesFetchSuccess,
  courseListFetchRequest,
  courseListFetchSuccess,
  getConfig,
  institutionListFetchRequest,
  institutionListFetchSuccess,
  popularCollegesListFetchRequest,
  popularCollegesListFetchSuccess,
  reviewFetchRequest,
  scoreTypesFetchRequest,
  scoreTypesFetchSuccess,
  topCoursesListFetchRequest,
  topCoursesListFetchSuccess,
  universityListFetchRequest,
  universityListFetchSuccess,
  updateConfig,
} from '../slices/appSlice';
import {setIsError, setIsFetching} from '../slices/commonSlice';
import {AxiosResponse} from 'axios';
import API from '../../API/ApiService';
import {PayloadAction} from '@reduxjs/toolkit';
import {ConfigRequestPayload, SelectedCategoryPayload} from '../types';
import {redirectRequest} from '../slices/authSlice';

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

      const updatedArray = response?.data?.data?.map(
        (item: any, index: number) => ({
          id: item.id,
          name: item.name,
          select: index === 0,
          image: item.image,
          description: item.description,
        }),
      );

      yield put(categoriesFetchSuccess(updatedArray));
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
    // yield put(setIsFetching(true));
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

      yield put(institutionListFetchSuccess(response?.data?.data));
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
    // yield put(setIsFetching(true));
    var response: AxiosResponse<any, any> = yield call(
      API.getUniversityList,
      data,
    );
    if (response.status) {
      yield put(setIsFetching(false));
      yield put(setIsError(false));

      yield put(universityListFetchSuccess(response?.data?.data));
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

function* fetchCourseList(data: PayloadAction<any>) {
  try {
    yield put(setIsFetching(true));
    var response: AxiosResponse<any, any> = yield call(API.getCourseList, data);
    if (response.status) {
      yield put(setIsFetching(false));
      yield put(setIsError(false));
      yield put(courseListFetchSuccess(response?.data?.data));
    } else {
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(courseListFetchSuccess([]));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(true));
    yield put(courseListFetchSuccess([]));
    if (error && error.response) {
      console.log('error in getting course list ==>', error.response.data);
    }
  }
}

function* fetchappliedCoursesList(data: PayloadAction<any>) {
  try {
    yield put(setIsFetching(true));
    var response: AxiosResponse<any, any> = yield call(
      API.getAppliedCourses,
      data,
    );
    if (response.status) {
      yield put(setIsFetching(false));
      yield put(setIsError(false));

      yield put(appliedCoursesListFetchSuccess(response?.data?.data));
    } else {
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(appliedCoursesListFetchSuccess([]));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(true));
    yield put(appliedCoursesListFetchSuccess([]));
    if (error && error.response) {
      console.log('error in getting catgeories ==>', error.response.data);
    }
  }
}

function* fetchApplyCourseList(data: PayloadAction<any>) {
  try {
    yield put(setIsFetching(true));
    var response: AxiosResponse<any, any> = yield call(API.applyCourses, data);
    console.log('response?.data', response?.data);

    if (response.status) {
      yield put(setIsFetching(false));
      yield put(setIsError(false));

      yield put(applyCoursesFetchSuccess(response?.data?.data));
    } else {
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(applyCoursesFetchSuccess([]));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(true));
    yield put(applyCoursesFetchSuccess([]));
    if (error && error.response) {
      console.log('error in getting catgeories ==>', error.response.data);
    }
  }
}

function* fetchPopularCollegesList(data: PayloadAction<any>) {
  try {
    yield put(setIsFetching(true));
    var response: AxiosResponse<any, any> = yield call(
      API.getPopularColleges,
      data,
    );

    if (response.status) {
      yield put(setIsFetching(false));
      yield put(setIsError(false));

      yield put(popularCollegesListFetchSuccess(response?.data?.data));
    } else {
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(popularCollegesListFetchSuccess([]));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(true));
    yield put(popularCollegesListFetchSuccess([]));
    if (error && error.response) {
      console.log('error in getting catgeories ==>', error.response.data);
    }
  }
}

function* fetchTopCoursesList(data: PayloadAction<any>) {
  try {
    yield put(setIsFetching(true));
    var response: AxiosResponse<any, any> = yield call(API.getTopCourses, data);

    if (response.status) {
      yield put(setIsFetching(false));
      yield put(setIsError(false));

      yield put(topCoursesListFetchSuccess(response?.data?.data));
    } else {
      yield put(setIsFetching(false));
      yield put(setIsError(true));
      yield put(topCoursesListFetchSuccess([]));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(true));
    yield put(topCoursesListFetchSuccess([]));
    if (error && error.response) {
      console.log('error in getting catgeories ==>', error.response.data);
    }
  }
}

function* fetchReviewFetch(data: PayloadAction<any>) {
  try {
    yield put(setIsFetching(true));
    var response: AxiosResponse<any, any> = yield call(
      API.addReview,
      data.payload,
    );

    if (response.status) {
      yield put(setIsFetching(false));
      yield put(setIsError(false));
      yield put(redirectRequest('Home'));
    } else {
      yield put(setIsFetching(false));
      yield put(setIsError(true));
    }
  } catch (error: any) {
    yield put(setIsFetching(false));
    yield put(setIsError(true));

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
  yield takeLatest(
    appliedCoursesListFetchRequest.type,
    fetchappliedCoursesList,
  );
  yield takeLatest(courseListFetchRequest.type, fetchCourseList);
  yield takeLatest(applyCoursesFetchRequest.type, fetchApplyCourseList);
  yield takeLatest(
    popularCollegesListFetchRequest.type,
    fetchPopularCollegesList,
  );
  yield takeLatest(topCoursesListFetchRequest.type, fetchTopCoursesList);
  yield takeLatest(reviewFetchRequest.type, fetchReviewFetch);
}
