/* eslint-disable quotes */
import {all} from 'redux-saga/effects';
import {AuthenticationSaga} from './AuthenticationSaga';
import {AppSaga} from './AppSaga';

export function* rootSaga() {
  yield all([AuthenticationSaga(), AppSaga()]);
}
