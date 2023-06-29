import produce from 'immer';
import { LOADING, REJECTED, SUCCEEDED } from '.';

export const initialState = {
  me: null,

  loadMyInfoStatus: 'idle',

  logInStatus: 'idle',

  logOutStatus: 'idle',

  signUpStatus: 'idle',

  updateMyInfoStatus: 'idle',

  verifyPasswordStatus: 'idle',

  removeAccountStatus: 'idle',
};

export const REMOVE_ACCOUNT_REQUEST = 'REMOVE_ACCOUNT_REQUEST';
export const REMOVE_ACCOUNT_SUCCESS = 'REMOVE_ACCOUNT_SUCCESS';
export const REMOVE_ACCOUNT_FAILURE = 'REMOVE_ACCOUNT_FAILURE';

export const VERIFY_PASSWORD_REQUEST = 'VERIFY_PASSWORD_REQUEST';
export const VERIFY_PASSWORD_SUCCESS = 'VERIFY_PASSWORD_SUCCESS';
export const VERIFY_PASSWORD_FAILURE = 'VERIFY_PASSWORD_FAILURE';

export const RESET_UPDATE_MY_INFO_DONE = 'RESET_UPDATE_MY_INFO_DONE';
export const RESET_UPDATE_MY_INFO_ERROR = 'RESET_UPDATE_MY_INFO_ERROR';

export const UPDATE_MY_INFO_REQUEST = 'UPDATE_MY_INFO_REQUEST';
export const UPDATE_MY_INFO_SUCCESS = 'UPDATE_MY_INFO_SUCCESS';
export const UPDATE_MY_INFO_FAILURE = 'UPDATE_MY_INFO_FAILURE';

export const RESET_SIGN_UP_DONE = 'RESET_SIGN_UP_DONE';
export const RESET_LOG_IN_ERROR = 'RESET_LOG_IN_ERROR';
export const RESET_SIGN_UP_ERROR = 'RESET_SIGN_UP_ERROR';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case REMOVE_ACCOUNT_REQUEST:
        draft.removeAccountStatus = LOADING;
        break;
      case REMOVE_ACCOUNT_SUCCESS:
        draft.removeAccountStatus = SUCCEEDED;
        break;
      case REMOVE_ACCOUNT_FAILURE:
        draft.removeAccountStatus = REJECTED;
        break;
      case VERIFY_PASSWORD_REQUEST:
        draft.verifyPasswordStatus = LOADING;
        break;
      case VERIFY_PASSWORD_SUCCESS:
        draft.verifyPasswordStatus = SUCCEEDED;
        break;
      case VERIFY_PASSWORD_FAILURE:
        draft.verifyPasswordStatus = REJECTED;
        break;
      case RESET_UPDATE_MY_INFO_DONE:
        draft.updateMyInfoDone = false;
        break;
      case RESET_UPDATE_MY_INFO_ERROR:
        draft.updateMyInfoError = null;
        break;
      case UPDATE_MY_INFO_REQUEST:
        draft.updateMyInfoStatus = LOADING;
        break;
      case UPDATE_MY_INFO_SUCCESS:
        draft.updateMyInfoStatus = SUCCEEDED;
        draft.me = action.data;
        break;
      case UPDATE_MY_INFO_FAILURE:
        draft.updateMyInfoStatus = REJECTED;
        break;
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoStatus = LOADING;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoStatus = SUCCEEDED;
        if (action.data) {
          draft.logInDone = true;
          draft.logOutDone = false;
        } else {
          draft.logInDone = false;
          draft.logOutDone = true;
        }
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoStatus = REJECTED;
        break;
      case RESET_LOG_IN_ERROR:
        draft.logInStatus = 'idle';
        break;
      case RESET_SIGN_UP_ERROR:
        draft.signUpStatus = 'idle';
        break;
      case LOG_IN_REQUEST:
        draft.logInStatus = LOADING;
        break;
      case LOG_IN_SUCCESS:
        draft.logInStatus = SUCCEEDED;

        draft.logOutStatus = 'idle';
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.logInStatus = REJECTED;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutStatus = LOADING;

        break;
      case LOG_OUT_SUCCESS:
        draft.logOutStatus = SUCCEEDED;
        draft.logInStatus = 'idle';
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutStatus = REJECTED;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpStatus = LOADING;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpStatus = SUCCEEDED;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpStatus = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
