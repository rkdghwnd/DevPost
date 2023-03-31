import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import postSaga from './post';
import userSaga from './user';
import modalSaga from './modal';
import postsSaga from './posts';

axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga), fork(modalSaga), fork(postsSaga)]);
}
