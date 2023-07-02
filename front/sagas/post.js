import {
  fork,
  takeLatest,
  delay,
  put,
  all,
  call,
  take,
  debounce,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_BOOKMARK_FAILURE,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_NESTED_COMMENT_FAILURE,
  ADD_NESTED_COMMENT_REQUEST,
  ADD_NESTED_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LOAD_FREE_POSTS_FAILURE,
  LOAD_FREE_POSTS_REQUEST,
  LOAD_FREE_POSTS_SUCCESS,
  LOAD_MY_BOOKMARK_FAILURE,
  LOAD_MY_BOOKMARK_REQUEST,
  LOAD_MY_BOOKMARK_SUCCESS,
  LOAD_MY_COMMENTS_FAILURE,
  LOAD_MY_COMMENTS_REQUEST,
  LOAD_MY_COMMENTS_SUCCESS,
  LOAD_MY_POSTS_FAILURE,
  LOAD_MY_POSTS_REQUEST,
  LOAD_MY_POSTS_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_YOUR_INFO_FAILURE,
  LOAD_YOUR_INFO_REQUEST,
  LOAD_YOUR_INFO_SUCCESS,
  REMOVE_BOOKMARK_FAILURE,
  REMOVE_BOOKMARK_REQUEST,
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_NESTED_COMMENT_FAILURE,
  REMOVE_NESTED_COMMENT_REQUEST,
  REMOVE_NESTED_COMMENT_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  SEARCH_POSTS_FAILURE,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_NESTED_COMMENT_FAILURE,
  UPDATE_NESTED_COMMENT_REQUEST,
  UPDATE_NESTED_COMMENT_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
} from '../reducers/post';
import {
  MESSAGE_MODAL_TOGGLE_REQUEST,
  NEW_POST_MODAL_CLOSE_REQUEST,
  messageModal,
} from '../reducers/modal';
import { UPDATE_POST_MODAL_CLOSE_REQUEST } from '../reducers/modal';
import createRequestSaga from '../hooks/createRequestSaga';
import {
  BOOKMARK_MESSAGE_OPEN,
  LIKE_MESSAGE_OPEN,
  UNLIKE_MESSAGE_OPEN,
} from '../reducers/message';

function addPostAPI(data) {
  return axios.post(`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post`, data);
}

const addPost = createRequestSaga(
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  addPostAPI,
  { type: NEW_POST_MODAL_CLOSE_REQUEST },
  messageModal('글 작성에 실패했습니다.'),
);

function removePostAPI(data) {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post/${data}`,
  );
}

const removePost = createRequestSaga(
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  removePostAPI,
  undefined,
  messageModal('글 삭제에 실패했습니다.'),
);

function loadFreePostsAPI(data) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/posts/free?page=${data || 1}`,
  );
}

const loadFreePosts = createRequestSaga(
  LOAD_FREE_POSTS_SUCCESS,
  LOAD_FREE_POSTS_FAILURE,
  loadFreePostsAPI,
  undefined,
  messageModal('자유게시판 불러오기 실패'),
);

function loadPostAPI(data) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post/free?postId=${data}`,
  );
}

const loadPost = createRequestSaga(
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  loadPostAPI,
  undefined,
  messageModal('게시글 불러오기 실패'),
);

function uploadImagesAPI(data) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post/images`,
    data,
  );
}

const uploadImages = createRequestSaga(
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  uploadImagesAPI,
  undefined,
  messageModal('이미지 업로드 실패'),
);

function updatePostAPI(data) {
  return axios.patch(`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post`, data);
}

const updatePost = createRequestSaga(
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  updatePostAPI,
  { type: UPDATE_POST_MODAL_CLOSE_REQUEST },
  messageModal('글 수정에 실패하였습니다'),
);

function addCommentAPI(data) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post/${data.postId}/comment`,
    data,
  ); // POST /post/:postId/comment
}

const addComment = createRequestSaga(
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  addCommentAPI,
  undefined,
  messageModal('댓글 추가에 실패하였습니다'),
);

function removeCommentAPI(data) {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post/${data.postId}/comment/${data.commentId}`,
  ); // DELETE /post/:postId/comment
}

const removeComment = createRequestSaga(
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  removeCommentAPI,
  undefined,
  messageModal('댓글 삭제에 실패하였습니다.'),
);

function updateCommentAPI(data) {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post/${data.postId}/comment/${data.commentId}`,
    data,
  ); // DELETE /post/:postId/comment
}

const updateComment = createRequestSaga(
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  updateCommentAPI,
  undefined,
  messageModal('댓글 수정에 실패하였습니다.'),
);

function addNestedCommentAPI(data) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post/${data.postId}/comment/${data.commentId}/nested_comment`,
    data,
  ); // POST /post/:postId/comment
}

const addNestedComment = createRequestSaga(
  ADD_NESTED_COMMENT_SUCCESS,
  ADD_NESTED_COMMENT_FAILURE,
  addNestedCommentAPI,
  undefined,
  messageModal('대댓글 추가에 실패하였습니다'),
);

function removeNestedCommentAPI(data) {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post/${data.postId}/comment/${data.commentId}/nested_comment/${data.nestedCommentId}`,
  ); // DELETE /post/:postId/comment/:commentId/nested_comment/:nestedCommentId
}

const removeNestedComment = createRequestSaga(
  REMOVE_NESTED_COMMENT_SUCCESS,
  REMOVE_NESTED_COMMENT_FAILURE,
  removeNestedCommentAPI,
  undefined,
  messageModal('대댓글 삭제에 실패하였습니다.'),
);

function updateNestedCommentAPI(data) {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post/${data.postId}/comment/${data.commentId}/nested_comment/${data.nestedCommentId}`,
    data,
  ); // DELETE /post/:postId/comment/:commentId/nested_comment/:nestedCommentId
}

const updateNestedComment = createRequestSaga(
  UPDATE_NESTED_COMMENT_SUCCESS,
  UPDATE_NESTED_COMMENT_FAILURE,
  updateNestedCommentAPI,
  undefined,
  messageModal('대댓글 수정에 실패하였습니다.'),
);

function likePostAPI(postId) {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post/${postId}/like`,
  );
}

const likePost = createRequestSaga(
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  likePostAPI,
  { type: LIKE_MESSAGE_OPEN },
  messageModal('좋아요 추가에 실패하였습니다.'),
);

function unlikePostAPI(postId) {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post/${postId}/like`,
  );
}

const unlikePost = createRequestSaga(
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  unlikePostAPI,
  { type: UNLIKE_MESSAGE_OPEN },
  messageModal('좋아요 취소에 실패하였습니다.'),
);

function addBookmarkAPI(postId) {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post/${postId}/bookmark`,
  );
}

const addBookmark = createRequestSaga(
  ADD_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_FAILURE,
  addBookmarkAPI,
  { type: BOOKMARK_MESSAGE_OPEN },
  messageModal('북마크 추가에 실패하였습니다.'),
);

function removeBookmarkAPI(postId) {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/post/${postId}/bookmark`,
  );
}

const removeBookmark = createRequestSaga(
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_FAILURE,
  removeBookmarkAPI,
  { type: UNLIKE_MESSAGE_OPEN },
  messageModal('북마크 취소에 실패하였습니다.'),
);

function loadMyPostsAPI() {
  return axios.get(`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/posts`);
}

const loadMyPosts = createRequestSaga(
  LOAD_MY_POSTS_SUCCESS,
  LOAD_MY_POSTS_FAILURE,
  loadMyPostsAPI,
  undefined,
  messageModal('내 게시글 목록 로드 실패'),
);

function loadMyCommentsAPI() {
  return axios.get(`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/comments`);
}

const loadMyComments = createRequestSaga(
  LOAD_MY_COMMENTS_SUCCESS,
  LOAD_MY_COMMENTS_FAILURE,
  loadMyCommentsAPI,
  undefined,
  messageModal('내 댓글 목록 로드 실패'),
);

function loadMyBookmarkAPI() {
  return axios.get(`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/bookmark`);
}

const loadMyBookmark = createRequestSaga(
  LOAD_MY_BOOKMARK_SUCCESS,
  LOAD_MY_BOOKMARK_FAILURE,
  loadMyBookmarkAPI,
  undefined,
  messageModal('내 북마크 목록 로드 실패'),
);

function searchPostsAPI(keyword) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/posts/search?keyword=${keyword}`,
  );
}
function searchCrawlingAPI(keyword) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_CRAWLER_DOMAIN}/search?keyword=${keyword}`,
  );
}
function* searchPosts(action) {
  try {
    const searchPostResult = yield call(searchPostsAPI, action.keyword);
    const searchCrawlingResult = yield call(searchCrawlingAPI, action.keyword);

    // 시간순으로 정렬
    searchPostResult.data.forEach(v => {
      v.time = new Date(v.createdAt).getTime();
    });
    const result = searchPostResult.data.concat(
      searchCrawlingResult.data.flat(),
    );
    result.sort((a, b) => b.time - a.time);

    yield put({
      type: SEARCH_POSTS_SUCCESS,
      data: result,
    });
  } catch (err) {
    yield put({
      type: SEARCH_POSTS_FAILURE,
      error: err.response.data,
    });
    yield put({
      type: MESSAGE_MODAL_TOGGLE_REQUEST,
      message: '검색에 실패 하였습니다.',
    });
  }
}

function loadYourInfoAPI(userId) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/user/you?userId=${userId}`,
  );
}

const loadYourInfo = createRequestSaga(
  LOAD_YOUR_INFO_SUCCESS,
  LOAD_YOUR_INFO_FAILURE,
  loadYourInfoAPI,
  undefined,
  messageModal('유저정보를 불러오지 못했습니다.'),
);

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}
function* watchUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_REQUEST, updateComment);
}
function* watchAddNestedComment() {
  yield takeLatest(ADD_NESTED_COMMENT_REQUEST, addNestedComment);
}
function* watchRemoveNestedComment() {
  yield takeLatest(REMOVE_NESTED_COMMENT_REQUEST, removeNestedComment);
}
function* watchUpdateNestedComment() {
  yield takeLatest(UPDATE_NESTED_COMMENT_REQUEST, updateNestedComment);
}
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchAddBookmark() {
  yield takeLatest(ADD_BOOKMARK_REQUEST, addBookmark);
}
function* watchRemoveBookmark() {
  yield takeLatest(REMOVE_BOOKMARK_REQUEST, removeBookmark);
}
function* watchLoadMyPosts() {
  yield takeLatest(LOAD_MY_POSTS_REQUEST, loadMyPosts);
}
function* watchLoadMyComments() {
  yield takeLatest(LOAD_MY_COMMENTS_REQUEST, loadMyComments);
}

function* watchLoadMyBookmark() {
  yield takeLatest(LOAD_MY_BOOKMARK_REQUEST, loadMyBookmark);
}

function* watchSearchPosts() {
  yield debounce(500, SEARCH_POSTS_REQUEST, searchPosts);
}

function* watchYourInfo() {
  yield takeLatest(LOAD_YOUR_INFO_REQUEST, loadYourInfo);
}

function* watchLoadFreePosts() {
  yield takeLatest(LOAD_FREE_POSTS_REQUEST, loadFreePosts);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchLoadPost),
    fork(watchUploadImages),
    fork(watchUpdatePost),
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchUpdateComment),
    fork(watchAddNestedComment),
    fork(watchRemoveNestedComment),
    fork(watchUpdateNestedComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddBookmark),
    fork(watchRemoveBookmark),
    fork(watchLoadMyPosts),
    fork(watchLoadMyComments),
    fork(watchLoadMyBookmark),
    fork(watchSearchPosts),
    fork(watchYourInfo),
    fork(watchLoadFreePosts),
  ]);
}
