import produce from 'immer';
import { LOADING, REJECTED, SUCCEEDED } from '.';

export const initialState = {
  blogPosts: [],
  newsPosts: [],
  hotDealPosts: [],
  loadBlogPostsStatus: 'idle',
  loadNewsPostsStatus: 'idle',
  hasMoreHotDealPosts: false,
  loadHotDealPostsStatus: 'idle',
  filteredList: [],
};

export const TOGGLE_FILTER_LIST = 'TOGGLE_FILTER_LIST';

export const LOAD_NEWS_POSTS_REQUEST = 'LOAD_NEWS_POSTS_REQUEST';
export const LOAD_NEWS_POSTS_SUCCESS = 'LOAD_NEWS_POSTS_SUCCESS';
export const LOAD_NEWS_POSTS_FAILURE = 'LOAD_NEWS_POSTS_REQUEST';

export const LOAD_BLOG_POSTS_REQUEST = 'LOAD_BLOG_POSTS_REQUEST';
export const LOAD_BLOG_POSTS_SUCCESS = 'LOAD_BLOG_POSTS_SUCCESS';
export const LOAD_BLOG_POSTS_FAILURE = 'LOAD_BLOG_POSTS_FAILURE';

export const LOAD_EARLY_HOTDEAL_POSTS_REQUEST =
  'LOAD_EARLY_HOTDEAL_POSTS_REQUEST';
export const LOAD_EARLY_HOTDEAL_POSTS_SUCCESS =
  'LOAD_EARLY_HOTDEAL_POSTS_SUCCESS';
export const LOAD_EARLY_HOTDEAL_POSTS_FAILURE =
  'LOAD_EARLY_HOTDEAL_POSTS_REQUEST';

export const LOAD_MORE_HOTDEAL_POSTS_REQUEST =
  'LOAD_MORE_HOTDEAL_POSTS_REQUEST';
export const LOAD_MORE_HOTDEAL_POSTS_SUCCESS =
  'LOAD_MORE_HOTDEAL_POSTS_SUCCESS';
export const LOAD_MORE_HOTDEAL_POSTS_FAILURE =
  'LOAD_MORE_HOTDEAL_POSTS_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case TOGGLE_FILTER_LIST:
        // 이미 존재하는 태그면 삭제, 존재 안하면 추가
        if (draft.filteredList.includes(action.tag)) {
          draft.filteredList.splice(draft.filteredList.indexOf(action.tag), 1);
        } else {
          draft.filteredList.push(action.tag);
        }
        break;
      case LOAD_NEWS_POSTS_REQUEST:
        draft.loadNewsPostsStatus = LOADING;
        break;
      case LOAD_NEWS_POSTS_SUCCESS:
        draft.newsPosts = action.data;

        draft.loadNewsPostsStatus = SUCCEEDED;
        break;
      case LOAD_NEWS_POSTS_FAILURE:
        draft.loadNewsPostsStatus = REJECTED;
        break;
      case LOAD_BLOG_POSTS_REQUEST:
        draft.loadBlogPostsStatus = LOADING;
        break;
      case LOAD_BLOG_POSTS_SUCCESS:
        draft.blogPosts = action.data;

        draft.loadBlogPostsStatus = SUCCEEDED;
        break;
      case LOAD_BLOG_POSTS_FAILURE:
        draft.loadBlogPostsStatus = REJECTED;
        break;
      case LOAD_EARLY_HOTDEAL_POSTS_REQUEST:
        draft.loadHotDealPostsStatus = LOADING;
        break;
      case LOAD_EARLY_HOTDEAL_POSTS_SUCCESS:
        draft.hotDealPosts = action.data;

        draft.loadHotDealPostsStatus = SUCCEEDED;
        draft.hasMoreHotDealPosts = action.data.length === 10;
        break;
      case LOAD_EARLY_HOTDEAL_POSTS_FAILURE:
        draft.loadHotDealPostsStatus = REJECTED;
        break;
      case LOAD_MORE_HOTDEAL_POSTS_REQUEST:
        draft.loadHotDealPostsStatus = LOADING;
        break;
      case LOAD_MORE_HOTDEAL_POSTS_SUCCESS:
        draft.hotDealPosts = draft.hotDealPosts.concat(action.data);

        draft.loadHotDealPostsStatus = SUCCEEDED;
        draft.hasMoreHotDealPosts = action.data.length === 10;
        break;
      case LOAD_MORE_HOTDEAL_POSTS_FAILURE:
        draft.loadHotDealPostsStatus = REJECTED;
        break;
      default:
        break;
    }
  });
};

export default reducer;
