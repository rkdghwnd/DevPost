import produce from 'immer';
export const initialState = {
  headerOptionVisible: false,
  myProfileOptionVisible: false,
  postOptionVisible: false,
};

export const POST_OPTION_CLOSE_REQUEST = 'POST_OPTION_CLOSE_REQUEST';
export const MY_PROFILE_OPTION_CLOSE_REQUEST =
  'MY_PROFILE_OPTION_CLOSE_REQUEST';
export const HEADER_OPTION_CLOSE_REQUEST = 'HEADER_OPTION_CLOSE_REQUEST';
export const POST_OPTION_TOGGLE_REQUEST = 'POST_OPTION_TOGGLE_REQUEST';
export const HEADER_OPTION_TOGGLE_REQUEST = 'HEADER_OPTION_TOGGLE_REQUEST';
export const MY_PROFILE_OPTION_TOGGLE_REQUEST =
  'MY_PROFILE_OPTION_TOGGLE_REQUEST';
export const COMMENT_INPUT_VISIBLE = 'COMMENT_INPUT_VISIBLE';
export const NESTED_COMMENT_INPUT_VISIBLE = 'NESTED_COMMENT_INPUT_VISIBLE';

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case MY_PROFILE_OPTION_CLOSE_REQUEST:
        draft.myProfileOptionVisible = false;
        break;
      case POST_OPTION_CLOSE_REQUEST:
        draft.postOptionVisible = false;
        break;
      case HEADER_OPTION_CLOSE_REQUEST:
        draft.headerOptionVisible = false;
        break;
      case POST_OPTION_TOGGLE_REQUEST:
        draft.postOptionVisible = !draft.postOptionVisible;
        break;
      case HEADER_OPTION_TOGGLE_REQUEST:
        draft.headerOptionVisible = !draft.headerOptionVisible;
        break;
      case MY_PROFILE_OPTION_TOGGLE_REQUEST:
        draft.myProfileOptionVisible = !draft.myProfileOptionVisible;
        break;
      default:
        break;
    }
  });
};

export default reducer;
