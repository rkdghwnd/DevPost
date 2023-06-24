import { fork, takeLatest, put, all, call, throttle } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_BLOG_POSTS_FAILURE,
  LOAD_BLOG_POSTS_REQUEST,
  LOAD_BLOG_POSTS_SUCCESS,
  LOAD_EARLY_HOTDEAL_POSTS_FAILURE,
  LOAD_EARLY_HOTDEAL_POSTS_REQUEST,
  LOAD_EARLY_HOTDEAL_POSTS_SUCCESS,
  LOAD_MORE_HOTDEAL_POSTS_FAILURE,
  LOAD_MORE_HOTDEAL_POSTS_REQUEST,
  LOAD_MORE_HOTDEAL_POSTS_SUCCESS,
  LOAD_NEWS_POSTS_FAILURE,
  LOAD_NEWS_POSTS_REQUEST,
  LOAD_NEWS_POSTS_SUCCESS,
} from '../reducers/posts';
import { messageModal } from '../reducers/modal';
import createRequestSaga from '../hooks/createRequestSaga';

function loadMoreHotDealPostsAPI(lastId) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_CRAWLER_DOMAIN}/hotdeal?lastId=${lastId || 0}`,
  );
}

const loadMoreHotDealPosts = createRequestSaga(
  LOAD_MORE_HOTDEAL_POSTS_SUCCESS,
  LOAD_MORE_HOTDEAL_POSTS_FAILURE,
  loadMoreHotDealPostsAPI,
  undefined,
  messageModal('핫딜 게시판 추가로드 실패'),
);

function loadEarlyHotDealPostsAPI(lastId) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_CRAWLER_DOMAIN}/hotdeal?lastId=${lastId || 0}`,
  );
}

const loadEarlyHotDealPosts = createRequestSaga(
  LOAD_EARLY_HOTDEAL_POSTS_SUCCESS,
  LOAD_EARLY_HOTDEAL_POSTS_FAILURE,
  loadEarlyHotDealPostsAPI,
  undefined,
  messageModal('핫딜 게시판 초기로드 실패'),
);

function loadBlogPostsAPI(page) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_CRAWLER_DOMAIN}/blog?page=${page || 1}`,
  );
}

const loadBlogPosts = createRequestSaga(
  LOAD_BLOG_POSTS_SUCCESS,
  LOAD_BLOG_POSTS_FAILURE,
  loadBlogPostsAPI,
  undefined,
  messageModal('블로그 게시판 로드 실패'),
);

function loadNewsPostsAPI(page) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_CRAWLER_DOMAIN}/news?page=${page || 1}`,
  );
}

const loadNewsPosts = createRequestSaga(
  LOAD_NEWS_POSTS_SUCCESS,
  LOAD_NEWS_POSTS_FAILURE,
  loadNewsPostsAPI,
  undefined,
  messageModal('뉴스 게시판 로드 실패'),
);

function* watchLoadMoreHotDealPosts() {
  yield takeLatest(LOAD_MORE_HOTDEAL_POSTS_REQUEST, loadMoreHotDealPosts);
}
function* watchLoadHotDealPosts() {
  yield takeLatest(LOAD_EARLY_HOTDEAL_POSTS_REQUEST, loadEarlyHotDealPosts);
}

function* watchLoadBlogPosts() {
  yield takeLatest(LOAD_BLOG_POSTS_REQUEST, loadBlogPosts);
}

function* watchLoadNewsPosts() {
  yield takeLatest(LOAD_NEWS_POSTS_REQUEST, loadNewsPosts);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadHotDealPosts),
    fork(watchLoadMoreHotDealPosts),
    fork(watchLoadBlogPosts),
    fork(watchLoadNewsPosts),
  ]);
}
