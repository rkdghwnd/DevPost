import produce from 'immer';
import { LOADING, REJECTED, SUCCEEDED } from '.';

export const initialState = {
  me: null,
  loadMyInfoStatus: 'idle',
  loadMyInfoError: null,
  logInStatus: 'idle',
  logInError: null,
  logOutStatus: 'idle',
  logOutError: null,
  signUpStatus: 'idle',
  signUpError: null,
  updateMyInfoStatus: 'idle',
  updateMyInfoError: null,
  verifyPasswordStatus: 'idle',
  verifyPasswordError: null,
  removeAccountStatus: 'idle',
  removeAccountError: null,
};

export const REMOVE_ACCOUNT_REQUEST = 'REMOVE_ACCOUNT_REQUEST';
export const REMOVE_ACCOUNT_SUCCESS = 'REMOVE_ACCOUNT_SUCCESS';
export const REMOVE_ACCOUNT_FAILURE = 'REMOVE_ACCOUNT_FAILURE';

export const VERIFY_PASSWORD_REQUEST = 'VERIFY_PASSWORD_REQUEST';
export const VERIFY_PASSWORD_SUCCESS = 'VERIFY_PASSWORD_SUCCESS';
export const VERIFY_PASSWORD_FAILURE = 'VERIFY_PASSWORD_FAILURE';

export const UPDATE_MY_INFO_REQUEST = 'UPDATE_MY_INFO_REQUEST';
export const UPDATE_MY_INFO_SUCCESS = 'UPDATE_MY_INFO_SUCCESS';
export const UPDATE_MY_INFO_FAILURE = 'UPDATE_MY_INFO_FAILURE';

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
        draft.removeAccountError = action.error;
        break;
      case VERIFY_PASSWORD_REQUEST:
        draft.verifyPasswordStatus = LOADING;
        break;
      case VERIFY_PASSWORD_SUCCESS:
        draft.verifyPasswordStatus = SUCCEEDED;
        break;
      case VERIFY_PASSWORD_FAILURE:
        draft.verifyPasswordStatus = REJECTED;
        draft.verifyPasswordError = action.error;
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
        draft.updateMyInfoError = action.error;
        break;
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoStatus = LOADING;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoStatus = SUCCEEDED;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoStatus = REJECTED;
        draft.loadMyInfoError = action.error;
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
        draft.logInError = action.error;
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
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpStatus = LOADING;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpStatus = SUCCEEDED;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpStatus = action.error;
        draft.signUpError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
