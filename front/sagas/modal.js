import { fork, takeLatest, delay, put, all } from 'redux-saga/effects';
import {
  COMMENT_MODAL_CLOSE_REQUEST,
  COMMENT_MODAL_CLOSE_SUCCESS,
  COMMENT_MODAL_OPEN,
  COPY_TO_CLIP_MESSAGE_INVISIBLE,
  COPY_TO_CLIP_MESSAGE_VISIBLE,
  INFO_MODAL_CLOSE_REQUEST,
  INFO_MODAL_CLOSE_SUCCESS,
  LOG_IN_MODAL_CLOSE_REQUEST,
  LOG_IN_MODAL_CLOSE_SUCCESS,
  NEW_POST_MODAL_CLOSE_REQUEST,
  NEW_POST_MODAL_CLOSE_SUCCESS,
  SHARE_MODAL_CLOSE_REQUEST,
  SHARE_MODAL_CLOSE_SUCCESS,
  UPDATE_POST_MODAL_CLOSE_REQUEST,
  UPDATE_POST_MODAL_CLOSE_SUCCESS,
  USER_INFO_MODAL_CLOSE_REQUEST,
  USER_INFO_MODAL_CLOSE_SUCCESS,
} from '../reducers/modal';
import { LOAD_POST_REQUEST } from '../reducers/post';

function* commentModalOpen(action) {
  yield put({
    type: LOAD_POST_REQUEST,
    data: action.postId,
  });
}

function* commentModalClose() {
  yield delay(250);
  yield put({
    type: COMMENT_MODAL_CLOSE_SUCCESS,
  });
}

function* newPostModalClose() {
  yield delay(250);
  yield put({
    type: NEW_POST_MODAL_CLOSE_SUCCESS,
  });
}

function* logInModalClose() {
  yield delay(250);
  yield put({
    type: LOG_IN_MODAL_CLOSE_SUCCESS,
  });
}

function* updatePostModalClose() {
  yield delay(250);
  yield put({
    type: UPDATE_POST_MODAL_CLOSE_SUCCESS,
  });
}

function* shareModalClose() {
  yield delay(250);
  yield put({
    type: SHARE_MODAL_CLOSE_SUCCESS,
  });
}

function* userInfoModalClose() {
  yield delay(250);
  yield put({
    type: USER_INFO_MODAL_CLOSE_SUCCESS,
  });
}

function* infoModalClose() {
  yield delay(250);
  yield put({
    type: INFO_MODAL_CLOSE_SUCCESS,
  });
}

function* copyToClip() {
  yield delay(3000);
  yield put({
    type: COPY_TO_CLIP_MESSAGE_INVISIBLE,
  });
}

function* watchCommentModalOpen() {
  yield takeLatest(COMMENT_MODAL_OPEN, commentModalOpen);
}
function* watchCommentModalClose() {
  yield takeLatest(COMMENT_MODAL_CLOSE_REQUEST, commentModalClose);
}
function* watchNewPostModalClose() {
  yield takeLatest(NEW_POST_MODAL_CLOSE_REQUEST, newPostModalClose);
}
function* watchLogInModalClose() {
  yield takeLatest(LOG_IN_MODAL_CLOSE_REQUEST, logInModalClose);
}
function* watchUpdatePostModalClose() {
  yield takeLatest(UPDATE_POST_MODAL_CLOSE_REQUEST, updatePostModalClose);
}
function* watchShareModalClose() {
  yield takeLatest(SHARE_MODAL_CLOSE_REQUEST, shareModalClose);
}
function* watchUserInfoModalClose() {
  yield takeLatest(USER_INFO_MODAL_CLOSE_REQUEST, userInfoModalClose);
}

function* watchInfoModalClose() {
  yield takeLatest(INFO_MODAL_CLOSE_REQUEST, infoModalClose);
}
function* watchCopyToClip() {
  yield takeLatest(COPY_TO_CLIP_MESSAGE_VISIBLE, copyToClip);
}

export default function* postSaga() {
  yield all([
    fork(watchCommentModalClose),
    fork(watchCommentModalOpen),
    fork(watchNewPostModalClose),
    fork(watchLogInModalClose),
    fork(watchUpdatePostModalClose),
    fork(watchShareModalClose),
    fork(watchUserInfoModalClose),
    fork(watchInfoModalClose),
    fork(watchCopyToClip),
  ]);
}
