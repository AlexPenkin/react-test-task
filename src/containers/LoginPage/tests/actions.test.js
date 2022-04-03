import { MAKE_LOGIN, MAKE_LOGIN_SUCCESS, MAKE_LOGIN_FAIL, RESET_MAKE_LOGIN_STATUS } from '../constants';

import {
  makeLoginAction,
  makeLoginActionSuccessAction,
  makeLoginErrorAction,
  resetMakeLoginStatusAction
} from '../actions';

describe('Login actions', () => {
  it('Make login action', () => {
    const payload = { email: 'test@test.com', name: 'test' };
    const expected = {
      type: MAKE_LOGIN,
      payload: {
        ...payload
      }
    };
    expect(makeLoginAction(payload)).toEqual(expected);
  });

  it('Make login success action', () => {
    const expected = {
      type: MAKE_LOGIN_SUCCESS
    };
    expect(makeLoginActionSuccessAction()).toEqual(expected);
  });

  it('Make login fail action', () => {
    const error = new Error('Error');
    const expected = {
      type: MAKE_LOGIN_FAIL,
      payload: {
        error
      }
    };
    expect(makeLoginErrorAction(error)).toEqual(expected);
  });

  it('Make login reset action', () => {
    const expected = {
      type: RESET_MAKE_LOGIN_STATUS
    };
    expect(resetMakeLoginStatusAction()).toEqual(expected);
  });
});
