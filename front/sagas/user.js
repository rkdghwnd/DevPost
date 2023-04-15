import { fork, takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  REMOVE_ACCOUNT_FAILURE,
  REMOVE_ACCOUNT_REQUEST,
  REMOVE_ACCOUNT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UPDATE_MY_INFO_FAILURE,
  UPDATE_MY_INFO_REQUEST,
  UPDATE_MY_INFO_SUCCESS,
  VERIFY_PASSWORD_FAILURE,
  VERIFY_PASSWORD_REQUEST,
  VERIFY_PASSWORD_SUCCESS,
} from '../reducers/user';
import {
  CONFIRM_REMOVE_ACCOUNT_MODAL_OPEN,
  LOG_IN_MODAL_CLOSE_REQUEST,
  MESSAGE_MODAL_TOGGLE_REQUEST,
  VERIFY_PASSWORD_MODAL_CLOSE,
} from '../reducers/modal';
import { HEADER_OPTION_TOGGLE_REQUEST } from '../reducers/option';
import { LOAD_PROFILE_IMAGE } from '../reducers/post';

function logInAPI(data) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/local/auth`,
    data,
  );
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOG_IN_MODAL_CLOSE_REQUEST,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
    yield put({
      type: MESSAGE_MODAL_TOGGLE_REQUEST,
      message: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.delete(`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/auth`);
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
    yield put({
      type: HEADER_OPTION_TOGGLE_REQUEST,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
    yield put({
      type: MESSAGE_MODAL_TOGGLE_REQUEST,
      message: '로그아웃에 실패했습니다',
    });
  }
}

function signUpAPI(data) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/info`,
    data,
  );
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
    yield put({
      type: MESSAGE_MODAL_TOGGLE_REQUEST,
      message: '회원가입에 성공하였습니다.',
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
    yield put({
      type: MESSAGE_MODAL_TOGGLE_REQUEST,
      message: '회원가입에 실패하였습니다',
    });
  }
}

function loadMyInfoAPI() {
  return axios.get(`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/me`);
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
    yield put({
      type: MESSAGE_MODAL_TOGGLE_REQUEST,
      message: '내 정보를 불러오지 못했습니다.',
    });
  }
}

function updateMyInfoAPI(data) {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/me`,
    data,
  );
}

function* updateMyInfo(action) {
  try {
    const result = yield call(updateMyInfoAPI, action.data);
    yield put({
      type: UPDATE_MY_INFO_SUCCESS,
      data: result.data,
    });
    yield put({
      type: MESSAGE_MODAL_TOGGLE_REQUEST,
      message: '회원정보 수정이 완료되었습니다.',
    });
  } catch (err) {
    yield put({
      type: UPDATE_MY_INFO_FAILURE,
      error: err.response.data,
    });
    yield put({
      type: MESSAGE_MODAL_TOGGLE_REQUEST,
      message: '내 정보 수정 실패',
    });
  }
}

function verifyPasswordAPI(data) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/password/validate`,
    data,
  );
}

function* verifyPassword(action) {
  try {
    const result = yield call(verifyPasswordAPI, action.data);
    yield put({
      type: VERIFY_PASSWORD_SUCCESS,
      data: result.data,
    });
    yield put({
      type: VERIFY_PASSWORD_MODAL_CLOSE,
    });
    yield put({
      type: CONFIRM_REMOVE_ACCOUNT_MODAL_OPEN,
    });
  } catch (err) {
    yield put({
      type: VERIFY_PASSWORD_FAILURE,
      error: err.response.data,
    });
    yield put({
      type: MESSAGE_MODAL_TOGGLE_REQUEST,
      message: '비밀번호가 다릅니다.',
    });
  }
}

function removeAccountAPI(data) {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/me`,
    data,
  );
}

function* removeAccount(action) {
  try {
    const result = yield call(removeAccountAPI, action.data);
    yield put({
      type: REMOVE_ACCOUNT_SUCCESS,
      data: result.data,
    });
    window.location.href = process.env.NEXT_PUBLIC_FRONT_END_DOMAIN;
  } catch (err) {
    yield put({
      type: REMOVE_ACCOUNT_FAILURE,
      error: err.response.data,
    });
    yield put({
      type: MESSAGE_MODAL_TOGGLE_REQUEST,
      message: '회원탈퇴에 실패하였습니다',
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchUpdateMyInfo() {
  yield takeLatest(UPDATE_MY_INFO_REQUEST, updateMyInfo);
}

function* watchVerifyPassword() {
  yield takeLatest(VERIFY_PASSWORD_REQUEST, verifyPassword);
}

function* watchRemoveAccount() {
  yield takeLatest(REMOVE_ACCOUNT_REQUEST, removeAccount);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchUpdateMyInfo),
    fork(watchVerifyPassword),
    fork(watchRemoveAccount),
  ]);
}
