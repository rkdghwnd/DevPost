import { call, put, delay } from 'redux-saga/effects';
import {
  ADD_BOOKMARK_SUCCESS,
  ADD_COMMENT_SUCCESS,
  ADD_NESTED_COMMENT_SUCCESS,
  CHANGE_COMMENTS,
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
import {
  BOOKMARK_MESSAGE_OPEN,
  LIKE_MESSAGE_OPEN,
  UNBOOKMARK_MESSAGE_OPEN,
  UNLIKE_MESSAGE_OPEN,
} from '../reducers/message';

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
      const successAction = { type: successType, data: result.data };
      const addedModeTypes = [
        UPLOAD_IMAGES_SUCCESS,
        LIKE_POST_SUCCESS,
        UNLIKE_POST_SUCCESS,
        ADD_BOOKMARK_SUCCESS,
        REMOVE_BOOKMARK_SUCCESS,
      ];
      const changeCommentsTypes = [
        ADD_COMMENT_SUCCESS,
        REMOVE_COMMENT_SUCCESS,
        UPDATE_COMMENT_SUCCESS,
        ADD_NESTED_COMMENT_SUCCESS,
        REMOVE_NESTED_COMMENT_SUCCESS,
        UPDATE_NESTED_COMMENT_SUCCESS,
      ];
      const deletedDataTypes = [LOG_OUT_SUCCESS, SIGN_UP_SUCCESS];
      if (addedModeTypes.includes(successType)) {
        successAction['mode'] = action.mode;
      } else if (changeCommentsTypes.includes(successType)) {
        delete successAction.data;
        yield put({
          type: CHANGE_COMMENTS,
          data: result.data,
          postId: action.data.postId,
        });
      } else if (deletedDataTypes.includes(successType)) {
        delete successAction.data;
      }

      yield put(successAction);

      if (successAdditionalAction) {
        yield put(successAdditionalAction);
        const messageTypes = [
          LIKE_MESSAGE_OPEN,
          UNLIKE_MESSAGE_OPEN,
          BOOKMARK_MESSAGE_OPEN,
          UNBOOKMARK_MESSAGE_OPEN,
        ];
        if (messageTypes.includes(successAdditionalAction.type)) {
          yield delay(4000);
          yield put({
            type: successAdditionalAction.type.replace('_OPEN', '_CLOSE'),
          });
        }
      }
    } catch (error) {
      yield put({ type: failureType, error: error.response.data });
      if (failureAdditionalAction === 'error_data_response') {
        yield put(messageModal(error.response.data));
      } else if (failureAdditionalAction) {
        yield put(failureAdditionalAction);
      }
    }
  };
}
