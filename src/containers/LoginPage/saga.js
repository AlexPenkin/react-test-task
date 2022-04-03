import { takeLatest, call, put } from 'redux-saga/effects';
import { postCredentialsApi } from './api';
import { makeLoginActionSuccessAction, makeLoginErrorAction } from './actions';
import { MAKE_LOGIN } from './constants';
import { login } from '../../components/useProtect';

export function* loggingSaga({ payload = {} } = {}) {
  const { email, name } = payload;
  try {
    const result = yield call(postCredentialsApi, email, name);
    const token = result?.data?.sl_token;
    if (token) {
      login(result?.data?.sl_token);
    } else {
      throw new Error('No token in api response');
    }
    yield put(makeLoginActionSuccessAction(result));
  } catch (err) {
    yield put(makeLoginErrorAction(err));
  }
}

export default function* loginSaga() {
  yield takeLatest(MAKE_LOGIN, loggingSaga);
}
