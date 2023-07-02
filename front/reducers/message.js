import produce from 'immer';

export const initialState = {
  likeMessageVisual: false,
  unlikeMessageVisual: false,
  bookmarkMessageVisual: false,
  unbookmarkMessageVisual: false,
};

export const UNBOOKMARK_MESSAGE_OPEN = 'UNBOOKMARK_MESSAGE_OPEN';
export const UNBOOKMARK_MESSAGE_CLOSE = 'UNBOOKMARK_MESSAGE_CLOSE';

export const BOOKMARK_MESSAGE_OPEN = 'BOOKMARK_MESSAGE_OPEN';
export const BOOKMARK_MESSAGE_CLOSE = 'BOOKMARK_MESSAGE_CLOSE';

export const UNLIKE_MESSAGE_OPEN = 'UNLIKE_MESSAGE_OPEN';
export const UNLIKE_MESSAGE_CLOSE = 'UNLIKE_MESSAGE_CLOSE';

export const LIKE_MESSAGE_OPEN = 'LIKE_MESSAGE_OPEN';
export const LIKE_MESSAGE_CLOSE = 'LIKE_MESSAGE_CLOSE';

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LIKE_MESSAGE_OPEN:
        draft.likeMessageVisual = true;
        draft.unlikeMessageVisual = false;
        draft.bookmarkMessageVisual = false;
        draft.unbookmarkMessageVisual = false;
        break;
      case LIKE_MESSAGE_CLOSE:
        draft.likeMessageVisual = false;
        break;
      case UNLIKE_MESSAGE_OPEN:
        draft.likeMessageVisual = false;
        draft.unlikeMessageVisual = true;
        draft.bookmarkMessageVisual = false;
        draft.unbookmarkMessageVisual = false;
        break;
      case UNLIKE_MESSAGE_CLOSE:
        draft.unlikeMessageVisual = false;
        break;
      case BOOKMARK_MESSAGE_OPEN:
        draft.likeMessageVisual = false;
        draft.unlikeMessageVisual = false;
        draft.bookmarkMessageVisual = true;
        draft.unbookmarkMessageVisual = false;
        break;
      case BOOKMARK_MESSAGE_CLOSE:
        draft.bookmarkMessageVisual = false;
        break;
      case UNBOOKMARK_MESSAGE_OPEN:
        draft.likeMessageVisual = false;
        draft.unlikeMessageVisual = false;
        draft.bookmarkMessageVisual = false;
        draft.unbookmarkMessageVisual = true;
        break;
      case UNBOOKMARK_MESSAGE_CLOSE:
        draft.unbookmarkMessageVisual = false;
        break;
      default:
        break;
    }
  });
};

export default reducer;
