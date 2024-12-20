import produce from 'immer';
import { LOADING, REJECTED, SUCCEEDED } from '.';

export const initialState = {
  currentPost: null,
  freePosts: [],
  imagePaths: [],
  profileImage: [],
  myPosts: [],
  myComments: [],
  myBookmark: [],
  searchPosts: [],
  postTotal: 0,
  loadFreePostsStatus: 'idle',
  loadFreePostsError: null,
  you: null,
  loadYourInfoStatus: 'idle',
  loadYourInfoError: null,
  addPostStatus: 'idle',
  addPostError: null,
  removePostStatus: 'idle',
  removePostError: null,
  addCommentStatus: 'idle',
  addCommentError: null,
  removeCommentStatus: 'idle',
  removeCommentError: null,
  updateCommentStatus: 'idle',
  updateCommentError: null,
  addNestedCommentStatus: 'idle',
  addNestedCOmmentError: null,
  removeNestedCommentStatus: 'idle',
  removeNestedCommentError: null,
  updateNestedCommentStatus: 'idle',
  updateNestedCommentError: null,
  loadPostStatus: 'idle',
  loadPostError: null,
  uploadImagesStatus: 'idle',
  uploadImagesError: null,
  unlikePostStatus: 'idle',
  unlikePostError: null,
  likePostStatus: 'idle',
  likePostError: null,
  addBookmarkStatus: 'idle',
  addBookmarkError: null,
  removeBookmarkStatus: 'idle',
  removeBookmarkError: null,
  loadMyPostsStatus: 'idle',
  loadMyPostsError: null,
  loadMyCommentsStatus: 'idle',
  loadMyCommentError: null,
  loadMyBookmarkStatus: 'idle',
  loadMyBookmarkError: null,
  searchPostsStatus: 'idle',
  searchPostsError: null,
  updatePostStatus: 'idle',
  updatePostError: null,
};

export const CHANGE_COMMENTS = 'CHANGE_COMMENTS';

export const LOAD_FREE_POSTS_REQUEST = 'LOAD_FREE_POSTS_REQUEST';
export const LOAD_FREE_POSTS_SUCCESS = 'LOAD_FREE_POSTS_SUCCESS';
export const LOAD_FREE_POSTS_FAILURE = 'LOAD_FREE_POSTS_FAILURE';

export const LOAD_YOUR_INFO_REQUEST = 'LOAD_YOUR_INFO_REQUEST';
export const LOAD_YOUR_INFO_SUCCESS = 'LOAD_YOUR_INFO_SUCCESS';
export const LOAD_YOUR_INFO_FAILURE = 'LOAD_YOUR_INFO_REQUEST';

export const SEARCH_POSTS_REQUEST = 'SEARCH_POSTS_REQUEST';
export const SEARCH_POSTS_SUCCESS = 'SEARCH_POSTS_SUCCESS';
export const SEARCH_POSTS_FAILURE = 'SEARCH_POSTS_FAILURE';

export const LOAD_PROFILE_IMAGE = 'LOAD_PROFILE_IMAGE';
export const RESET_IMAGE = 'RESET_IMAGE';

export const LOAD_MY_POSTS_REQUEST = 'LOAD_MY_POSTS_REQUEST';
export const LOAD_MY_POSTS_SUCCESS = 'LOAD_MY_POSTS_SUCCESS';
export const LOAD_MY_POSTS_FAILURE = 'LOAD_MY_POSTS_FAILURE';

export const LOAD_MY_COMMENTS_REQUEST = 'LOAD_MY_COMMENTS_REQUEST';
export const LOAD_MY_COMMENTS_SUCCESS = 'LOAD_MY_COMMENTS_SUCCESS';
export const LOAD_MY_COMMENTS_FAILURE = 'LOAD_MY_COMMENTS_FAILURE';

export const LOAD_MY_BOOKMARK_REQUEST = 'LOAD_MY_BOOKMARK_REQUEST';
export const LOAD_MY_BOOKMARK_SUCCESS = 'LOAD_MY_BOOKMARK_SUCCESS';
export const LOAD_MY_BOOKMARK_FAILURE = 'LOAD_MY_BOOKMARK_FAILURE';

export const REMOVE_BOOKMARK_REQUEST = 'REMOVE_BOOKMARK_REQUEST';
export const REMOVE_BOOKMARK_SUCCESS = 'REMOVE_BOOKMARK_SUCCESS';
export const REMOVE_BOOKMARK_FAILURE = 'REMOVE_BOOKMARK_FAILURE';

export const ADD_BOOKMARK_REQUEST = 'ADD_BOOKMARK_REQUEST';
export const ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS';
export const ADD_BOOKMARK_FAILURE = 'ADD_BOOKMARK_FAILURE';

export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UPDATE_NESTED_COMMENT_REQUEST = 'UPDATE_NESTED_COMMENT_REQUEST';
export const UPDATE_NESTED_COMMENT_SUCCESS = 'UPDATE_NESTED_COMMENT_SUCCESS';
export const UPDATE_NESTED_COMMENT_FAILURE = 'UPDATE_NESTED_COMMENT_FAILURE';

export const REMOVE_NESTED_COMMENT_REQUEST = 'REMOVE_NESTED_COMMENT_REQUEST';
export const REMOVE_NESTED_COMMENT_SUCCESS = 'REMOVE_NESTED_COMMENT_SUCCESS';
export const REMOVE_NESTED_COMMENT_FAILURE = 'REMOVE_NESTED_COMMENT_FAILURE';

export const ADD_NESTED_COMMENT_REQUEST = 'ADD_NESTED_COMMENT_REQUEST';
export const ADD_NESTED_COMMENT_SUCCESS = 'ADD_NESTED_COMMENT_SUCCESS';
export const ADD_NESTED_COMMENT_FAILURE = 'ADD_NESTED_COMMENT_FAILURE';

export const UPDATE_COMMENT_REQUEST = 'UPDATE_COMMENT_REQUEST';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const LOAD_IMAGE = 'LOAD_IMAGE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    function findElement(elements) {
      return elements?.find(v => v.id === action.data.PostId);
    }
    function filterElement(elements) {
      return elements.filter(v => v.id !== action.data.UserId);
    }
    function pushElement(elements) {
      return elements?.push({ id: action.data.UserId });
    }
    switch (action.type) {
      case LOAD_YOUR_INFO_REQUEST:
        draft.loadYourInfoStatus = LOADING;
        break;
      case LOAD_YOUR_INFO_SUCCESS:
        draft.loadYourInfoStatus = SUCCEEDED;
        draft.you = {
          ...action.data.yourInfo,
          Comments: action.data.comments,
        };
        break;
      case LOAD_YOUR_INFO_FAILURE:
        draft.loadYourInfoStatus = REJECTED;
        draft.loadYourInfoError = action.error;
        break;
      case SEARCH_POSTS_REQUEST:
        draft.searchPostsStatus = LOADING;
        break;
      case SEARCH_POSTS_SUCCESS:
        draft.searchPostsStatus = SUCCEEDED;
        draft.searchPosts = action.data;
        break;
      case SEARCH_POSTS_FAILURE:
        draft.searchPostsStatus = REJECTED;
        draft.searchPostsError = action.error;
        break;
      case LOAD_PROFILE_IMAGE:
        draft.profileImage = [];
        draft.profileImage.push(action.image);
        break;
      case RESET_IMAGE:
        draft.imagePaths = [];
        break;
      case LOAD_MY_POSTS_REQUEST:
        draft.loadMyPostsStatus = LOADING;
        break;
      case LOAD_MY_POSTS_SUCCESS:
        draft.loadMyPostsStatus = SUCCEEDED;
        draft.myPosts = action.data;
        break;
      case LOAD_MY_POSTS_FAILURE:
        draft.loadMyPostsStatus = REJECTED;
        draft.loadMyPostsError = action.error;
        break;
      case LOAD_MY_COMMENTS_REQUEST:
        draft.loadMyCommentsStatus = LOADING;
        break;
      case LOAD_MY_COMMENTS_SUCCESS:
        draft.loadMyCommentsStatus = SUCCEEDED;
        draft.myComments = action.data;
        break;
      case LOAD_MY_COMMENTS_FAILURE:
        draft.loadMyCommentsStatus = REJECTED;
        draft.loadMyCommentsError - action.error;
        break;
      case LOAD_MY_BOOKMARK_REQUEST:
        draft.loadMyBookmarkStatus = LOADING;
        break;
      case LOAD_MY_BOOKMARK_SUCCESS:
        draft.loadMyBookmarkStatus = SUCCEEDED;
        draft.myBookmark = action.data;
        break;
      case LOAD_MY_BOOKMARK_FAILURE:
        draft.loadMyBookmarkStatus = REJECTED;
        draft.loadMyBookmarkError = action.error;
        break;
      case REMOVE_BOOKMARK_REQUEST:
        draft.removeBookmarkStatus = LOADING;
        break;
      case REMOVE_BOOKMARK_SUCCESS: {
        if (draft.currentPost) {
          draft.currentPost.Bookmarkers = filterElement(
            draft.currentPost.Bookmarkers,
          );
        }

        const freePost = findElement(draft.freePosts);
        if (freePost) {
          freePost.Bookmarkers = filterElement(freePost.Bookmarkers);
        }
        const myPost = findElement(draft.myPosts);
        if (myPost) {
          myPost.Bookmarkers = filterElement(myPost.Bookmarkers);
        }
        const myBookmark = findElement(draft.myBookmark);
        if (myBookmark) {
          myBookmark.Bookmarkers = filterElement(myBookmark.Bookmarkers);
        }
        const search = findElement(draft.searchPosts);
        if (search) {
          search.Bookmarkers = filterElement(search.Bookmarkers);
        }
        const yourPost = findElement(draft.you?.Posts);
        if (yourPost) {
          yourPost.Bookmarkers = filterElement(yourPost.Bookmarkers);
        }

        draft.removeBookmarkStatus = SUCCEEDED;
        break;
      }
      case REMOVE_BOOKMARK_FAILURE:
        draft.removeBookmarkStatus = REJECTED;
        draft.removeBookmarkError = action.error;
        break;
      case ADD_BOOKMARK_REQUEST:
        draft.addBookmarkStatus = LOADING;
        break;
      case ADD_BOOKMARK_SUCCESS: {
        if (draft.currentPost) {
          draft.currentPost.Bookmarkers.push({ id: action.data.UserId });
        }
        const freePost = findElement(draft.freePosts);
        if (freePost) {
          pushElement(freePost.Bookmarkers);
        }
        const myPost = findElement(draft.myPosts);
        if (myPost) {
          pushElement(myPost.Bookmarkers);
        }
        const myBookmark = findElement(draft.myBookmark);
        if (myBookmark) {
          pushElement(myBookmark.Bookmarkers);
        }
        const search = findElement(draft.searchPosts);
        if (search) {
          pushElement(search.Bookmarkers);
        }

        const yourPost = findElement(draft.you?.Posts);
        if (yourPost) {
          pushElement(yourPost.Bookmarkers);
        }

        draft.addBookmarkStatus = SUCCEEDED;
        break;
      }
      case ADD_BOOKMARK_FAILURE:
        draft.addBookmarkStatus = REJECTED;
        draft.addBookmarkError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostStatus = LOADING;
        break;
      case UNLIKE_POST_SUCCESS: {
        if (draft.currentPost) {
          draft.currentPost.Likers = filterElement(draft.currentPost.Likers);
        }
        const freePost = findElement(draft.freePosts);
        if (freePost) {
          freePost.Likers = filterElement(freePost.Likers);
        }
        const myPost = findElement(draft.myPosts);
        if (myPost) {
          myPost.Likers = filterElement(myPost.Likers);
        }
        const myBookmark = findElement(draft.myBookmark);
        if (myBookmark) {
          myBookmark.Likers = filterElement(myBookmark.Likers);
        }
        const search = findElement(draft.searchPosts);
        if (search) {
          search.Likers = filterElement(search.Likers);
        }
        const yourPost = findElement(draft.you?.Posts);
        if (yourPost) {
          yourPost.Likers = filterElement(yourPost.Likers);
        }

        draft.unlikePostStatus = SUCCEEDED;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostStatus = REJECTED;
        draft.unlikePostError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostStatus = LOADING;
        break;
      case LIKE_POST_SUCCESS: {
        if (draft.currentPost) {
          pushElement(draft.currentPost.Likers);
        }
        const freePost = findElement(draft.freePosts);
        if (freePost) {
          pushElement(freePost.Likers);
        }
        const myPost = findElement(draft.myPosts);
        if (myPost) {
          pushElement(myPost.Likers);
        }
        const myBookmark = findElement(draft.myBookmark);
        if (myBookmark) {
          pushElement(myBookmark.Likers);
        }
        const search = findElement(draft.searchPosts);
        if (search) {
          pushElement(search.Likers);
        }
        const yourPost = findElement(draft.you?.Posts);
        if (yourPost) {
          pushElement(yourPost.Likers);
        }
        draft.likePostStatus = SUCCEEDED;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostStatus = REJECTED;
        draft.likePostError = action.error;
        break;
      case UPDATE_NESTED_COMMENT_REQUEST:
        draft.updateNestedCommentStatus = LOADING;
        break;
      case UPDATE_NESTED_COMMENT_SUCCESS: {
        draft.updateNestedCommentStatus = SUCCEEDED;
        break;
      }
      case UPDATE_NESTED_COMMENT_FAILURE:
        draft.updateNestedCommentStatus = REJECTED;
        draft.updateNestedCommentError = action.error;
        break;
      case REMOVE_NESTED_COMMENT_REQUEST:
        draft.removeNestedCommentStatus = LOADING;
        break;
      case REMOVE_NESTED_COMMENT_SUCCESS: {
        draft.removeNestedCommentStatus = SUCCEEDED;
        break;
      }
      case REMOVE_NESTED_COMMENT_FAILURE:
        draft.removeNestedCommentStatus = REJECTED;
        draft.removeNestedCommentError = action.error;
        break;
      case ADD_NESTED_COMMENT_REQUEST:
        draft.addNestedCommentStatus = LOADING;
        break;
      case ADD_NESTED_COMMENT_SUCCESS: {
        draft.addNestedCommentStatus = SUCCEEDED;
        break;
      }
      case ADD_NESTED_COMMENT_FAILURE:
        draft.addNestedCommentStatus = REJECTED;
        draft.addNestedCommentError = action.error;
        break;
      case UPDATE_COMMENT_REQUEST:
        draft.updateCommentStatus = LOADING;
        break;
      case UPDATE_COMMENT_SUCCESS: {
        draft.updateCommentStatus = SUCCEEDED;
        break;
      }
      case UPDATE_COMMENT_FAILURE:
        draft.updateCommentStatus = REJECTED;
        draft.updateCommentError = action.error;
        break;
      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentStatus = LOADING;
        break;
      case REMOVE_COMMENT_SUCCESS: {
        draft.removeCommentStatus = SUCCEEDED;
        break;
      }
      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentStatus = REJECTED;
        draft.removeCommentError = action.error;
        break;
      case LOAD_IMAGE:
        draft.imagePaths = action.images.map(image => image.src);
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentStatus = LOADING;
        break;
      case ADD_COMMENT_SUCCESS:
        draft.addCommentStatus = SUCCEEDED;
        break;
      case CHANGE_COMMENTS: {
        draft.currentPost.Comments = action.data;
        const freePost = draft.freePosts.find(v => v.id === action.postId);
        if (freePost) {
          freePost.Comments = action.data;
        }
        const myPost = draft.myPosts.find(v => v.id === action.postId);
        if (myPost) {
          myPost.Comments = action.data;
        }
        const myBookmark = draft.myBookmark.find(v => v.id === action.postId);
        if (myBookmark) {
          myBookmark.Comments = action.data;
        }
        const search = draft.searchPosts.find(v => v.id === action.postId);
        if (search) {
          search.Comments = action.data;
        }
        const yourPost = draft.you?.Posts.find(v => v.id === action.postId);
        if (yourPost) {
          yourPost.Comments = action.data;
        }
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentStatus = REJECTED;
        draft.addCommentError = action.error;
        break;
      case UPDATE_POST_REQUEST:
        draft.updatePostStatus = LOADING;
        break;
      case UPDATE_POST_SUCCESS:
        draft.imagePaths = []; // 게시글 올린뒤 이미지업로드 부분 초기화
        draft.currentPost = action.data;

        draft.updatePostStatus = SUCCEEDED;
        break;
      case UPDATE_POST_FAILURE:
        draft.updatePostStatus = REJECTED;
        draft.updatePostError = action.error;
        break;
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i != action.data);
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesStatus = LOADING;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        if (action.mode === 'profile_img') {
          draft.profileImage = action.data;
        } else {
          draft.imagePaths = action.data;
        }

        draft.uploadImagesStatus = SUCCEEDED;
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesStatus = REJECTED;
        draft.uploadImagesError = action.error;
        break;
      case LOAD_POST_REQUEST:
        draft.loadPostStatus = LOADING;
        break;
      case LOAD_POST_SUCCESS:
        draft.currentPost = action.data;

        draft.loadPostStatus = SUCCEEDED;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostStatus = REJECTED;
        draft.loadPostError = action.error;
        break;
      case LOAD_FREE_POSTS_REQUEST:
        draft.loadFreePostsStatus = LOADING;
        break;
      case LOAD_FREE_POSTS_SUCCESS:
        draft.freePosts = action.data[0];
        draft.postTotal = action.data[1];

        draft.loadFreePostsStatus = SUCCEEDED;
        break;
      case LOAD_FREE_POSTS_FAILURE:
        draft.loadFreePostsStatus = REJECTED;
        draft.loadFreePostsError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostStatus = LOADING;
        break;
      case ADD_POST_SUCCESS:
        draft.freePosts.unshift(action.data);
        draft.imagePaths = []; // 게시글 올린뒤 이미지업로드 부분 초기화

        draft.addPostStatus = SUCCEEDED;
        draft.currentPost = action.data;
        break;
      case ADD_POST_FAILURE:
        draft.addPostStatus = REJECTED;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostStatus = LOADING;
        break;
      case REMOVE_POST_SUCCESS:
        draft.freePosts = draft.freePosts.filter(
          v => v.id !== action.data.PostId,
        );
        draft.removePostStatus = SUCCEEDED;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostStatus = REJECTED;
        draft.removePostError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
