import produce from 'immer';

export const initialState = {
  blogPosts: [],
  newsPosts: [],
  hotDealPosts: [],
  loadBlogPostsLoading: false,
  loadBlogPostsDone: false,
  loadBlogPostsError: null,
  loadNewsPostsLoading: false,
  loadNewsPostsDone: false,
  loadNewsPostsError: null,
  hasMoreHotDealPosts: true,
  loadHotDealPostsLoading: false,
  loadHotDealPostsDone: false,
  loadHotDealPostsError: null,
};

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
      case LOAD_NEWS_POSTS_REQUEST:
        draft.loadNewsPostsLoading = true;
        draft.loadNewsPostsDone = false;
        draft.loadNewsPostsError = null;
        break;
      case LOAD_NEWS_POSTS_SUCCESS:
        draft.newsPosts = action.data;
        draft.loadNewsPostsLoading = false;
        draft.loadNewsPostsDone = true;
        break;
      case LOAD_NEWS_POSTS_FAILURE:
        draft.loadNewsPostsLoading = false;
        draft.loadNewsPostsError = action.error;
        break;
      case LOAD_BLOG_POSTS_REQUEST:
        draft.loadBlogPostsLoading = true;
        draft.loadBlogPostsDone = false;
        draft.loadBlogPostsError = null;
        break;
      case LOAD_BLOG_POSTS_SUCCESS:
        draft.blogPosts = action.data;
        draft.loadBlogPostsLoading = false;
        draft.loadBlogPostsDone = true;
        break;
      case LOAD_BLOG_POSTS_FAILURE:
        draft.loadBlogPostsLoading = false;
        draft.loadBlogPostsError = action.error;
        break;
      case LOAD_EARLY_HOTDEAL_POSTS_REQUEST:
        draft.loadHotDealPostsLoading = true;
        draft.loadHotDealPostsDone = false;
        draft.loadHotDealPostsError = null;
        break;
      case LOAD_EARLY_HOTDEAL_POSTS_SUCCESS:
        draft.hotDealPosts = action.data;
        draft.loadHotDealPostsLoading = false;
        draft.loadHotDealPostsDone = true;
        draft.hasMoreHotDealPosts = action.data.length === 10;
        break;
      case LOAD_EARLY_HOTDEAL_POSTS_FAILURE:
        draft.loadHotDealPostsLoading = false;
        draft.loadHotDealPostsError = action.error;
        break;
      case LOAD_MORE_HOTDEAL_POSTS_REQUEST:
        draft.loadHotDealPostsLoading = true;
        draft.loadHotDealPostsDone = false;
        draft.loadHotDealPostsError = null;
        break;
      case LOAD_MORE_HOTDEAL_POSTS_SUCCESS:
        draft.hotDealPosts = draft.hotDealPosts.concat(action.data);
        draft.loadHotDealPostsLoading = false;
        draft.loadHotDealPostsDone = true;
        draft.hasMoreHotDealPosts = action.data.length === 10;
        break;
      case LOAD_MORE_HOTDEAL_POSTS_FAILURE:
        draft.loadHotDealPostsLoading = false;
        draft.loadHotDealPostsError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
