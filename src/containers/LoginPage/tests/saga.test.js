/* eslint-disable redux-saga/yield-effects */

import { runSaga } from 'redux-saga';
import { loggingSaga } from '../saga';
import { makeLoginActionSuccessAction, makeLoginErrorAction } from '../actions';
import * as loginApi from '../../../components/useProtect';

import * as api from '../api';

describe('LoggingSaga', () => {
  it('loggingSaga should call api and dispatch success action', async () => {
    const dummyResponse = { data: { sl_token: 'testToken' } };
    const payload = { email: 'test@test.com', name: 'test' };
    const request = jest.spyOn(api, 'postCredentialsApi').mockImplementation(() => Promise.resolve(dummyResponse));
    const login = jest.spyOn(loginApi, 'login').mockImplementation(() => Promise.resolve(true));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      loggingSaga,
      { payload }
    ).toPromise();
    expect(request).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith(dummyResponse.data.sl_token);
    expect(dispatched).toEqual([makeLoginActionSuccessAction(dummyResponse)]);
    request.mockClear();
  });
  it('loggingSaga should call api and dispatch error action', async () => {
    const exceptionError = new Error('Error');
    const request = jest.spyOn(api, 'postCredentialsApi').mockImplementation(() => Promise.reject(exceptionError));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      loggingSaga
    );
    expect(request).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([makeLoginErrorAction(exceptionError)]);
    request.mockClear();
  });
});
