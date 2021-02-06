import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from '../actions/actionTypes';

function loginAPI(loginData) {
  console.log("🚀 ~ file: user.js ~ line 13 ~ loginAPI ~ loginData", loginData)
  // 서버에 요청을 보내는 부분
  // return userLoginAPI(loginData);
  
  return axios.post('http://localhost:8001/api/login', loginData, {});

}

function* login(action) {
  console.log("🚀 ~ file: user.js ~ line 21 ~ function*login ~ action", action)
  try {

    const result = yield call(loginAPI, action.data.loginData);

    yield put({ // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    // console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function logoutAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('http://localhost:8001/api/logout');
}

function* logout() {
  try {
    // yield call(logoutAPI);
    yield call(logoutAPI);
    yield put({ // put은 dispatch 동일
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e,
    });
  }
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUEST, logout);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
  ]);
}