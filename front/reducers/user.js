import produce from 'immer';

export const initialState = {
  me: null,
  loadMyInfoLoading: false, // 내 정보 가져오는 중
  loadMyInfoError: null,
  loadMyInfoDone: false,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: true,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  SignUpDone: false,
  signUpError: null,
  updateMyInfoLoading: false,
  updateMyInfoError: null,
  updateMyInfoDone: false,
  verifyPasswordLoading: false,
  verifyPasswordError: null,
  verifyPasswordDone: false,
  removeAccountLoading: false,
  removeAccountError: null,
  removeAccountDone: false,
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

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case REMOVE_ACCOUNT_REQUEST:
        draft.removeAccountLoading = true;
        draft.removeAccountError = null;
        draft.removeAccountDone = false;
        break;
      case REMOVE_ACCOUNT_SUCCESS:
        draft.removeAccountLoading = false;
        draft.removeAccountDone = true;
        break;
      case REMOVE_ACCOUNT_FAILURE:
        draft.removeAccountLoading = false;
        draft.removeAccountError = action.error;
        break;
      case VERIFY_PASSWORD_REQUEST:
        draft.verifyPasswordLoading = true;
        draft.verifyPasswordError = null;
        draft.verifyPasswordDone = false;
        break;
      case VERIFY_PASSWORD_SUCCESS:
        draft.verifyPasswordLoading = false;
        draft.verifyPasswordDone = true;
        break;
      case VERIFY_PASSWORD_FAILURE:
        draft.verifyPasswordLoading = false;
        draft.verifyPasswordError = action.error;
        break;
      case RESET_UPDATE_MY_INFO_DONE:
        draft.updateMyInfoDone = false;
        break;
      case RESET_UPDATE_MY_INFO_ERROR:
        draft.updateMyInfoError = null;
        break;
      case UPDATE_MY_INFO_REQUEST:
        draft.updateMyInfoLoading = true;
        draft.updateMyInfoError = null;
        draft.updateMyInfoDone = false;
        break;
      case UPDATE_MY_INFO_SUCCESS:
        draft.updateMyInfoLoading = false;
        draft.updateMyInfoDone = true;
        draft.me = action.data;
        break;
      case UPDATE_MY_INFO_FAILURE:
        draft.updateMyInfoLoading = false;
        draft.updateMyInfoError = action.error;
        break;
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
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
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      case RESET_LOG_IN_ERROR:
        draft.logInError = false;
        break;
      case RESET_SIGN_UP_ERROR:
        draft.signUpError = false;
        break;
      case RESET_SIGN_UP_DONE:
        draft.signUpDone = false;
        break;
      case LOG_IN_REQUEST:
        draft.loginLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.logOutDone = false;
        draft.me = action.data;
        window.location.reload();
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logInDone = true;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logInDone = false;
        draft.logOutDone = true;
        draft.me = null;
        window.location.reload();
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
