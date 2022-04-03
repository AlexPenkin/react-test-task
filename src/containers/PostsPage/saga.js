import { takeLatest, call, put } from 'redux-saga/effects';
import { getPostsApi } from './api';
import { getPostsErrorAction, getPostsSuccessAction } from './actions';
import { GET_POSTS } from './constants';

export function* getPostsSaga({ payload = {} } = {}) {
  const { page } = payload;
  try {
    const result = yield call(getPostsApi, page);
    yield put(getPostsSuccessAction(result));
  } catch (err) {
    yield put(getPostsErrorAction(err));
  }
}

export default function* postsSaga() {
  yield takeLatest(GET_POSTS, getPostsSaga);
}
