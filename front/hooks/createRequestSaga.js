import { call, put } from 'redux-saga/effects';
import {
  ADD_BOOKMARK_SUCCESS,
  ADD_COMMENT_SUCCESS,
  ADD_NESTED_COMMENT_SUCCESS,
  LIKE_POST_SUCCESS,
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_NESTED_COMMENT_SUCCESS,
  UNLIKE_POST_SUCCESS,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_NESTED_COMMENT_SUCCESS,
  UPLOAD_IMAGES_SUCCESS,
} from '../reducers/post';
import { messageModal } from '../reducers/modal';
import { LOG_OUT_SUCCESS, SIGN_UP_SUCCESS } from '../reducers/user';

export default function createRequestSaga(
  successType,
  failureType,
  request,
  successAdditionalAction,
  failureAdditionalAction,
) {
  return function* (action) {
    try {
      const result = yield call(request, action.data);
      let successAction = { type: successType, data: result.data };
      if (
        successType === UPLOAD_IMAGES_SUCCESS ||
        successType === LIKE_POST_SUCCESS ||
        successType === UNLIKE_POST_SUCCESS ||
        successType === ADD_BOOKMARK_SUCCESS ||
        successType === REMOVE_BOOKMARK_SUCCESS
      ) {
        successAction = { ...successAction, mode: action.mode };
      } else if (
        successType === ADD_COMMENT_SUCCESS ||
        successType === REMOVE_COMMENT_SUCCESS ||
        successType === UPDATE_COMMENT_SUCCESS ||
        successType === ADD_NESTED_COMMENT_SUCCESS ||
        successType === REMOVE_NESTED_COMMENT_SUCCESS ||
        successType === UPDATE_NESTED_COMMENT_SUCCESS
      ) {
        successAction = { ...successAction, postId: action.data.postId };
      } else if (
        successType === LOG_OUT_SUCCESS ||
        successType === SIGN_UP_SUCCESS
      ) {
        delete successAction.data;
      }

      yield put(successAction);

      if (successAdditionalAction) {
        yield put(successAdditionalAction);
      }
    } catch (error) {
      yield put({ type: failureType, data: error.response.data });
      if (failureAdditionalAction === 'error_data_response') {
        yield put(messageModal(error.response.data));
      } else if (failureAdditionalAction) {
        yield put(failureAdditionalAction);
      }
    }
  };
}
