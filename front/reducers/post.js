import produce from 'immer';

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
  loadFreePostsLoading: false,
  loadFreePostsDone: false,
  loadFreePostsError: null,
  you: null,
  loadYourInfoLoading: false, // 상대 정보 가져오는 중
  loadYourInfoError: null,
  loadYourInfoDone: false,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
  updateCommentLoading: false,
  updateCommentDone: false,
  updateCommentError: null,
  addNestedCommentLoading: false,
  addNestedCommentDone: false,
  addNestedCommentError: null,
  removeNestedCommentLoading: false,
  removeNestedCommentDone: false,
  removeNestedCommentError: null,
  updateNestedCommentLoading: false,
  updateNestedCommentDone: false,
  updateNestedCommentError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  addBookmarkLoading: false,
  addBookmarkDone: false,
  addBookmarkError: null,
  removeBookmarkLoading: false,
  removeBookmarkDone: false,
  removeBookmarkError: null,
  loadMyPostsLoading: false, // 내가 쓴 글 가져오는 중
  loadMyPostsError: null,
  loadMyPostsDone: false,
  loadMyCommentsLoading: false, // 내가 쓴 댓글 가져오는 중
  loadMyCommentsError: null,
  loadMyCommentsDone: false,
  loadMyBookmarkLoading: false, // 내가 저장한 북마크 가져오는 중
  loadMyBookmarkError: null,
  loadMyBookmarkDone: false,
  searchPostsLoading: false, // 내가 쓴 글 가져오는 중
  searchPostsError: null,
  searchPostsDone: false,
};

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
    switch (action.type) {
      case LOAD_YOUR_INFO_REQUEST:
        draft.loadYourInfoLoading = true;
        draft.loadYourInfoError = null;
        draft.loadYourInfoDone = false;
        break;
      case LOAD_YOUR_INFO_SUCCESS:
        draft.loadYourInfoLoading = false;
        draft.loadYourInfoDone = true;
        draft.you = {
          ...action.data.yourInfo,
          Comments: action.data.fullComments,
        };
        break;
      case LOAD_YOUR_INFO_FAILURE:
        draft.loadYourInfoLoading = false;
        draft.loadYourInfoError = action.error;
        break;
      case SEARCH_POSTS_REQUEST:
        draft.searchPostsLoading = true;
        draft.searchPostsError = null;
        draft.searchPostsDone = false;
        break;
      case SEARCH_POSTS_SUCCESS:
        draft.searchPostsLoading = false;
        draft.searchPostsDone = true;
        draft.searchPosts = action.data;
        break;
      case SEARCH_POSTS_FAILURE:
        draft.searchPostsLoading = false;
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
        draft.loadMyPostsLoading = true;
        draft.loadMyPostsError = null;
        draft.loadMyPostsDone = false;
        break;
      case LOAD_MY_POSTS_SUCCESS:
        draft.loadMyPostsLoading = false;
        draft.loadMyPostsDone = true;
        draft.myPosts = action.data;
        break;
      case LOAD_MY_POSTS_FAILURE:
        draft.loadMyPostsLoading = false;
        draft.loadMyPostsError = action.error;
        break;
      case LOAD_MY_COMMENTS_REQUEST:
        draft.loadMyCommentsLoading = true;
        draft.loadMyCommentsError = null;
        draft.loadMyCommentsDone = false;
        break;
      case LOAD_MY_COMMENTS_SUCCESS:
        draft.loadMyCommentsLoading = false;
        draft.loadMyCommentsDone = true;
        draft.myComments = action.data;
        break;
      case LOAD_MY_COMMENTS_FAILURE:
        draft.loadMyCommentsLoading = false;
        draft.loadMyCommentsError = action.error;
        break;
      case LOAD_MY_BOOKMARK_REQUEST:
        draft.loadMyBookmarkLoading = true;
        draft.loadMyBookmarkError = null;
        draft.loadMyBookmarkDone = false;
        break;
      case LOAD_MY_BOOKMARK_SUCCESS:
        draft.loadMyBookmarkLoading = false;
        draft.loadMyBookmarkDone = true;
        draft.myBookmark = action.data;
        break;
      case LOAD_MY_BOOKMARK_FAILURE:
        draft.loadMyBookmarkLoading = false;
        draft.loadMyBookmarkError = action.error;
        break;

      case REMOVE_BOOKMARK_REQUEST:
        draft.removeBookmarkLoading = true;
        draft.removeBookmarkDone = false;
        draft.removeBookmarkError = null;
        break;
      case REMOVE_BOOKMARK_SUCCESS: {
        if (draft.currentPost) {
          draft.currentPost.Bookmarkers = draft.currentPost.Bookmarkers.filter(
            v => v.id !== action.data.UserId,
          );
        }
        const freePost = draft.freePosts.find(v => v.id === action.data.PostId);
        if (freePost) {
          freePost.Bookmarkers = freePost.Bookmarkers.filter(
            v => v.id !== action.data.UserId,
          );
        }
        const myPost = draft.myPosts.find(v => v.id === action.data.PostId);
        if (myPost) {
          myPost.Bookmarkers = myPost.Bookmarkers.filter(
            v => v.id !== action.data.UserId,
          );
        }
        const myBookmark = draft.myBookmark.find(
          v => v.id === action.data.PostId,
        );
        if (myBookmark) {
          myBookmark.Bookmarkers = myBookmark.Bookmarkers.filter(
            v => v.id !== action.data.UserId,
          );
        }
        const search = draft.searchPosts.find(v => v.id === action.data.PostId);
        if (search) {
          search.Bookmarkers = search.Bookmarkers.filter(
            v => v.id !== action.data.UserId,
          );
        }
        const yourPost = draft.you?.Posts.find(
          v => v.id === action.data.PostId,
        );
        if (yourPost) {
          yourPost.Bookmarkers = yourPost.Bookmarkers.filter(
            v => v.id !== action.data.UserId,
          );
        }
        draft.removeBookmarkLoading = false;
        draft.removeBookmarkDone = true;
        break;
      }
      case REMOVE_BOOKMARK_FAILURE:
        draft.removeBookmarkLoading = false;
        draft.removeBookmarkError = action.error;
        break;
      case ADD_BOOKMARK_REQUEST:
        draft.addBookmarkLoading = true;
        draft.addBookmarkDone = false;
        draft.addBookmarkError = null;
        break;
      case ADD_BOOKMARK_SUCCESS: {
        if (draft.currentPost) {
          draft.currentPost.Bookmarkers.push({ id: action.data.UserId });
        }
        const freePost = draft.freePosts.find(v => v.id === action.data.PostId);
        if (freePost) {
          freePost.Bookmarkers.push({ id: action.data.UserId });
        }
        const myPost = draft.myPosts.find(v => v.id === action.data.PostId);
        if (myPost) {
          myPost.Bookmarkers.push({ id: action.data.UserId });
        }
        const myBookmark = draft.myBookmark.find(
          v => v.id === action.data.PostId,
        );
        if (myBookmark) {
          myBookmark.Bookmarkers.push({ id: action.data.UserId });
        }
        const search = draft.searchPosts.find(v => v.id === action.data.PostId);
        if (search) {
          search.Bookmarkers.push({ id: action.data.UserId });
        }
        const yourPost = draft.you?.Posts.find(
          v => v.id === action.data.PostId,
        );
        if (yourPost) {
          yourPost.Bookmarkers.push({ id: action.data.UserId });
        }
        draft.addBookmarkLoading = false;
        draft.addBookmarkDone = true;
        break;
      }
      case ADD_BOOKMARK_FAILURE:
        draft.addBookmarkLoading = false;
        draft.addBookmarkError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        if (draft.currentPost) {
          draft.currentPost.Likers = draft.currentPost.Likers.filter(
            v => v.id !== action.data.UserId,
          );
        }
        const freePost = draft.freePosts.find(v => v.id === action.data.PostId);
        if (freePost) {
          freePost.Likers = freePost.Likers.filter(
            v => v.id !== action.data.UserId,
          );
        }
        const myPost = draft.myPosts.find(v => v.id === action.data.PostId);
        if (myPost) {
          myPost.Likers = myPost.Likers.filter(
            v => v.id !== action.data.UserId,
          );
        }
        const myBookmark = draft.myBookmark.find(
          v => v.id === action.data.PostId,
        );
        if (myBookmark) {
          myBookmark.Likers = myBookmark.Likers.filter(
            v => v.id !== action.data.UserId,
          );
        }
        const search = draft.searchPosts.find(v => v.id === action.data.PostId);
        if (search) {
          search.Likers = search.Likers.filter(
            v => v.id !== action.data.UserId,
          );
        }
        const yourPost = draft.you?.Posts.find(
          v => v.id === action.data.PostId,
        );
        if (yourPost) {
          yourPost.Likers = yourPost.Likers.filter(
            v => v.id !== action.data.UserId,
          );
        }
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        if (draft.currentPost) {
          draft.currentPost.Likers.push({ id: action.data.UserId });
        }
        const freePost = draft.freePosts.find(v => v.id === action.data.PostId);
        if (freePost) {
          freePost.Likers.push({ id: action.data.UserId });
        }
        const myPost = draft.myPosts.find(v => v.id === action.data.PostId);
        if (myPost) {
          myPost.Likers.push({ id: action.data.UserId });
        }
        const myBookmark = draft.myBookmark.find(
          v => v.id === action.data.PostId,
        );
        if (myBookmark) {
          myBookmark.Likers.push({ id: action.data.UserId });
        }
        const yourPost = draft.you?.Posts.find(
          v => v.id === action.data.PostId,
        );
        if (yourPost) {
          yourPost.Likers.push({ id: action.data.UserId });
        }
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case UPDATE_NESTED_COMMENT_REQUEST:
        draft.updateNestedCommentLoading = true;
        draft.updateNestedCommentDone = false;
        draft.updateNestedCommentError = null;
        break;
      case UPDATE_NESTED_COMMENT_SUCCESS: {
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
        draft.updateNestedCommentLoading = false;
        draft.updateNestedCommentDone = true;
        break;
      }
      case UPDATE_NESTED_COMMENT_FAILURE:
        draft.updateNestedCommentLoading = false;
        draft.updateNestedCommentError = action.error;
        break;
      case REMOVE_NESTED_COMMENT_REQUEST:
        draft.removeNestedCommentLoading = true;
        draft.removenestedCommentDone = false;
        draft.removenestedCommentError = null;
        break;
      case REMOVE_NESTED_COMMENT_SUCCESS: {
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
        draft.removeNestedCommentLoading = false;
        draft.removeNestedCommentDone = true;
        break;
      }
      case REMOVE_NESTED_COMMENT_FAILURE:
        draft.removeNestedCommentLoading = false;
        draft.removeNestedCommentError = action.error;
        break;
      case ADD_NESTED_COMMENT_REQUEST:
        draft.addNestedCommentLoading = true;
        draft.addnestedCommentDone = false;
        draft.addnestedCommentError = null;
        break;
      case ADD_NESTED_COMMENT_SUCCESS: {
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
        draft.addNestedCommentLoading = false;
        draft.addNestedCommentDone = true;
        break;
      }
      case ADD_NESTED_COMMENT_FAILURE:
        draft.addNestedCommentLoading = false;
        draft.addNestedCommentError = action.error;
        break;
      case UPDATE_COMMENT_REQUEST:
        draft.updateCommentLoading = true;
        draft.updateCommentDone = false;
        draft.updateCommentError = null;
        break;
      case UPDATE_COMMENT_SUCCESS: {
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
        draft.updateCommentLoading = false;
        draft.updateCommentDone = true;
        break;
      }
      case UPDATE_COMMENT_FAILURE:
        draft.updateCommentLoading = false;
        draft.updateCommentError = action.error;
        break;
      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;
      case REMOVE_COMMENT_SUCCESS: {
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
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        break;
      }
      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
        break;
      case LOAD_IMAGE:
        draft.imagePaths = action.images.map(image => image.src);
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
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
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      case UPDATE_POST_REQUEST:
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;
      case UPDATE_POST_SUCCESS:
        draft.imagePaths = []; // 게시글 올린뒤 이미지업로드 부분 초기화
        draft.freePosts = draft.freePosts.map(post =>
          post.id === action.data.id ? action.data : post,
        );
        draft.currentPost = action.data;
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        window.location.reload();
        break;
      case UPDATE_POST_FAILURE:
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
        break;
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i != action.data);
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        if (action.mode === 'profile_img') {
          draft.profileImage = action.data;
        } else {
          draft.imagePaths = action.data;
        }
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.currentPost = action.data;
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case LOAD_FREE_POSTS_REQUEST:
        draft.loadFreePostsLoading = true;
        draft.loadFreePostsDone = false;
        draft.loadFreePostsError = null;
        break;
      case LOAD_FREE_POSTS_SUCCESS:
        draft.freePosts = action.data;
        draft.loadFreePostsLoading = false;
        draft.loadFreePostsDone = true;
        draft.postTotal = action.page;
        break;
      case LOAD_FREE_POSTS_FAILURE:
        draft.loadFreePostsLoading = false;
        draft.loadFreePostsError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.freePosts.unshift(action.data);
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.imagePaths = []; // 게시글 올린뒤 이미지업로드 부분 초기화
        window.location.href = `${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/free`;
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.freePosts = draft.freePosts.filter(
          v => v.id !== action.data.PostId,
        );
        draft.removePostLoading = false;
        draft.removePostDone = true;
        window.location.href = `${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/free`;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
