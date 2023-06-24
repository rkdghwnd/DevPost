import produce from 'immer';

export const initialState = {
  shareModalVisual: false,
  shareModalSlideUp: false,
  updatePostModalVisual: false,
  updatePostModalSlideUp: false,
  message: '',
  messageModalVisual: false,
  newPostModalVisual: false,
  newPostModalSlideUp: false,
  commentModalVisual: false,
  commentModalSlideUp: false,
  infoModalVisual: false,
  infoModalSlideUp: false,
  logInModalVisual: false,
  logInModalSlideUp: false,
  userInfoModalVisual: false,
  userInfoModalSlideUp: false,
  copyToclipVisual: false,
  confirmRemoveCommentVisual: false,
  commentId: null,
  nestedCommentId: null,
  commentTarget: null,
  confirmRemovePostVisual: false,
  confirmCancelPostModalVisual: false,
  verifyPasswordModalVisual: false,
  confirmRemoveAccountModalVisual: false,
};

export const messageModal = message => ({
  type: MESSAGE_MODAL_TOGGLE_REQUEST,
  message,
});

export const CONFIRM_REMOVE_ACCOUNT_MODAL_OPEN =
  'CONFIRM_REMOVE_ACCOUNT_MODAL_OPEN';
export const CONFIRM_REMOVE_ACCOUNT_MODAL_CLOSE =
  'CONFIRM_REMOVE_ACCOUNT_MODAL_CLOSE';

export const VERIFY_PASSWORD_MODAL_OPEN = 'VERIFY_PASSWORD_MODAL_OPEN';
export const VERIFY_PASSWORD_MODAL_CLOSE = 'VERIFY_PASSWORD_MODAL_CLOSE';

export const CONFIRM_CANCEL_POST_MODAL_OPEN = 'CONFIRM_CANCEL_POST_MODAL_OPEN';
export const CONFIRM_CANCEL_POST_MODAL_CLOSE =
  'CONFIRM_CANCEL_POST_MODAL_CLOSE';

export const CONFIRM_REMOVE_POST_MODAL_OPEN = 'CONFIRM_REMOVE_POST_MODAL_OPEN';
export const CONFIRM_REMOVE_POST_MODAL_CLOSE =
  'CONFIRM_REMOVE_POST_MODAL_CLOSE';

export const CONFIRM_REMOVE_COMMENT_MODAL_OPEN =
  'CONFIRM_REMOVE_COMMENT_MODAL_OPEN';
export const CONFIRM_REMOVE_COMMENT_MODAL_CLOSE =
  'CONFIRM_REMOVE_COMMENT_MODAL_CLOSE';

export const COPY_TO_CLIP_MESSAGE_VISIBLE = 'COPY_TO_CLIP_MESSAGE_VISIBLE';
export const COPY_TO_CLIP_MESSAGE_INVISIBLE = 'COPY_TO_CLIP_MESSAGE_INVISIBLE';

export const INFO_MODAL_OPEN = 'INFO_MODAL_OPEN';
export const INFO_MODAL_CLOSE_REQUEST = 'INFO_MODAL_CLOSE_REQUEST';
export const INFO_MODAL_CLOSE_SUCCESS = 'INFO_MODAL_CLOSE_SUCCESS';

export const USER_INFO_MODAL_OPEN = 'USER_INFO_MODAL_OPEN';
export const USER_INFO_MODAL_CLOSE_REQUEST = 'USER_INFO_MODAL_CLOSE_REQUEST';
export const USER_INFO_MODAL_CLOSE_SUCCESS = 'USER_INFO_MODAL_CLOSE_SUCCESS';

export const SHARE_MODAL_OPEN = 'SHARE_MODAL_OPEN';
export const SHARE_MODAL_CLOSE_REQUEST = 'SHARE_MODAL_CLOSE_REQUEST';
export const SHARE_MODAL_CLOSE_SUCCESS = 'SHARE_MODAL_CLOSE_SUCCESS';

export const UPDATE_POST_MODAL_OPEN = 'UPDATE_POST_MODAL_OPEN';
export const UPDATE_POST_MODAL_CLOSE_REQUEST =
  'UPDATE_POST_MODAL_CLOSE_REQUEST';
export const UPDATE_POST_MODAL_CLOSE_SUCCESS =
  'UPDATE_POST_MODAL_CLOSE_SUCCESS';

export const MESSAGE_MODAL_TOGGLE_REQUEST = 'MESSAGE_MODAL_TOGGLE_REQUEST';

export const LOG_IN_MODAL_OPEN = 'LOG_IN_MODAL_OPEN';
export const LOG_IN_MODAL_CLOSE_REQUEST = 'LOG_IN_MODAL_CLOSE_REQUEST';
export const LOG_IN_MODAL_CLOSE_SUCCESS = 'LOG_IN_MODAL_CLOSE_SUCCESS';

export const NEW_POST_MODAL_OPEN = 'NEW_POST_MODAL_OPEN';
export const NEW_POST_MODAL_CLOSE_REQUEST = 'NEW_POST_MODAL_CLOSE_REQUEST';
export const NEW_POST_MODAL_CLOSE_SUCCESS = 'NEW_POST_MODAL_CLOSE_SUCCESS';

export const COMMENT_MODAL_OPEN = 'COMMENT_MODAL_OPEN';
export const COMMENT_MODAL_CLOSE_REQUEST = 'COMMENT_MODAL_CLOSE_REQUEST';
export const COMMENT_MODAL_CLOSE_SUCCESS = 'COMMENT_MODAL_CLOSE_SUCCESS';

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case CONFIRM_REMOVE_ACCOUNT_MODAL_OPEN:
        draft.confirmRemoveAccountModalVisual = true;
        break;
      case CONFIRM_REMOVE_ACCOUNT_MODAL_CLOSE:
        draft.confirmRemoveAccountModalVisual = false;
        break;
      case VERIFY_PASSWORD_MODAL_OPEN:
        draft.verifyPasswordModalVisual = true;
        break;
      case VERIFY_PASSWORD_MODAL_CLOSE:
        draft.verifyPasswordModalVisual = false;
        break;
      case CONFIRM_CANCEL_POST_MODAL_OPEN:
        draft.confirmCancelPostModalVisual = true;
        break;
      case CONFIRM_CANCEL_POST_MODAL_CLOSE:
        draft.confirmCancelPostModalVisual = false;
        break;
      case CONFIRM_REMOVE_POST_MODAL_OPEN:
        draft.confirmRemovePostVisual = true;
        break;
      case CONFIRM_REMOVE_POST_MODAL_CLOSE:
        draft.confirmRemovePostVisual = false;
        break;
      case CONFIRM_REMOVE_COMMENT_MODAL_OPEN:
        draft.confirmRemoveCommentVisual = true;
        draft.commentId = action.commentId;
        draft.commentTarget = action.commentTarget;
        draft.nestedCommentId = action.nestedCommentId;
        break;
      case CONFIRM_REMOVE_COMMENT_MODAL_CLOSE:
        draft.confirmRemoveCommentVisual = false;
        break;
      case COPY_TO_CLIP_MESSAGE_VISIBLE:
        draft.copyToclipVisual = true;
        break;
      case COPY_TO_CLIP_MESSAGE_INVISIBLE:
        draft.copyToclipVisual = false;
        break;
      case INFO_MODAL_OPEN:
        draft.infoModalSlideUp = true;
        draft.infoModalVisual = true;
        break;
      case INFO_MODAL_CLOSE_REQUEST:
        draft.infoModalSlideUp = false;
        break;
      case INFO_MODAL_CLOSE_SUCCESS:
        draft.infoModalVisual = false;
        break;
      case USER_INFO_MODAL_OPEN:
        draft.userInfoModalSlideUp = true;
        draft.userInfoModalVisual = true;
        break;
      case USER_INFO_MODAL_CLOSE_REQUEST:
        draft.userInfoModalSlideUp = false;
        break;
      case USER_INFO_MODAL_CLOSE_SUCCESS:
        draft.userInfoModalVisual = false;
        break;
      case SHARE_MODAL_OPEN:
        draft.shareModalSlideUp = true;
        draft.shareModalVisual = true;
        break;
      case SHARE_MODAL_CLOSE_REQUEST:
        draft.shareModalSlideUp = false;
        break;
      case SHARE_MODAL_CLOSE_SUCCESS:
        draft.shareModalVisual = false;
        break;
      case UPDATE_POST_MODAL_OPEN:
        draft.updatePostModalSlideUp = true;
        draft.updatePostModalVisual = true;
        break;
      case UPDATE_POST_MODAL_CLOSE_REQUEST:
        draft.updatePostModalSlideUp = false;
        break;
      case UPDATE_POST_MODAL_CLOSE_SUCCESS:
        draft.updatePostModalVisual = false;
        break;
      case MESSAGE_MODAL_TOGGLE_REQUEST:
        draft.messageModalVisual = !draft.messageModalVisual;
        draft.message = action.message;
        break;
      case LOG_IN_MODAL_OPEN:
        draft.logInModalSlideUp = true;
        draft.logInModalVisual = true;
        break;
      case LOG_IN_MODAL_CLOSE_REQUEST:
        draft.logInModalSlideUp = false;
        break;
      case LOG_IN_MODAL_CLOSE_SUCCESS:
        draft.logInModalVisual = false;
        break;
      case NEW_POST_MODAL_OPEN:
        draft.newPostModalSlideUp = true;
        draft.newPostModalVisual = true;
        break;
      case NEW_POST_MODAL_CLOSE_REQUEST:
        draft.newPostModalSlideUp = false;
        break;
      case NEW_POST_MODAL_CLOSE_SUCCESS:
        draft.newPostModalVisual = false;
        break;
      case COMMENT_MODAL_OPEN:
        draft.commentModalSlideUp = true;
        draft.commentModalVisual = true;
        break;
      case COMMENT_MODAL_CLOSE_REQUEST:
        draft.commentModalSlideUp = false;
        break;
      case COMMENT_MODAL_CLOSE_SUCCESS:
        draft.commentModalVisual = false;
        break;
      default:
        break;
    }
  });
};

export default reducer;
