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
  messageModal,
} from '../reducers/modal';
import { HEADER_OPTION_TOGGLE_REQUEST } from '../reducers/option';
import createRequestSaga from '../hooks/createRequestSaga';

function logInAPI(data) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/local/auth`,
    data,
  );
}

const logIn = createRequestSaga(
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  logInAPI,
  { type: LOG_IN_MODAL_CLOSE_REQUEST },
  'error_data_response',
);

function logOutAPI() {
  return axios.delete(`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/auth`);
}

const logOut = createRequestSaga(
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  logOutAPI,
  {
    type: HEADER_OPTION_TOGGLE_REQUEST,
  },
  messageModal('로그아웃에 실패했습니다.'),
);

function signUpAPI(data) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/info`,
    data,
  );
}

const signUp = createRequestSaga(
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  signUpAPI,
  messageModal('회원가입에 성공하였습니다.'),
  messageModal('회원가입에 실패하였습니다.'),
);

function loadMyInfoAPI() {
  return axios.get(`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/me`);
}

const loadMyInfo = createRequestSaga(
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  loadMyInfoAPI,
  undefined,
  messageModal('내 정보를 불러오지 못했습니다.'),
);

function updateMyInfoAPI(data) {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/me`,
    data,
  );
}

const updateMyInfo = createRequestSaga(
  UPDATE_MY_INFO_SUCCESS,
  UPDATE_MY_INFO_FAILURE,
  updateMyInfoAPI,
  messageModal('회원정보 수정이 완료되었습니다.'),
  messageModal('내 정보 수정 실패'),
);

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

const removeAccount = createRequestSaga(
  REMOVE_ACCOUNT_SUCCESS,
  REMOVE_ACCOUNT_FAILURE,
  removeAccountAPI,
  messageModal('회원탈퇴에 성공하였습니다.'),
  messageModal('회원탈퇴에 실패하였습니다.'),
);

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
