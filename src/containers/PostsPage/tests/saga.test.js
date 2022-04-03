/* eslint-disable redux-saga/yield-effects */

import { runSaga } from 'redux-saga';
import { getPostsSaga } from '../saga';
import { getPostsSuccessAction, getPostsErrorAction } from '../actions';

import * as api from '../api';

describe('PostsSaga', () => {
  it('getPostsSaga should call api and dispatch success action', async () => {
    const dummyPosts = [];
    const requestPosts = jest.spyOn(api, 'getPostsApi').mockImplementation(() => Promise.resolve(dummyPosts));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      getPostsSaga
    ).toPromise();
    expect(requestPosts).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([getPostsSuccessAction(dummyPosts)]);
    requestPosts.mockClear();
  });

  it('getPostsSaga should call api and dispatch error action', async () => {
    const exceptionError = new Error('Error');
    const requestPosts = jest.spyOn(api, 'getPostsApi').mockImplementation(() => Promise.reject(exceptionError));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      getPostsSaga
    );
    expect(requestPosts).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([getPostsErrorAction(exceptionError)]);
    requestPosts.mockClear();
  });
});
