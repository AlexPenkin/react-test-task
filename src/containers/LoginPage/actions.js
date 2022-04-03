import { MAKE_LOGIN, MAKE_LOGIN_SUCCESS, MAKE_LOGIN_FAIL, RESET_MAKE_LOGIN_STATUS } from './constants';

export function makeLoginAction({ email, name }) {
  return {
    type: MAKE_LOGIN,
    payload: {
      email,
      name
    }
  };
}

export function makeLoginActionSuccessAction() {
  return {
    type: MAKE_LOGIN_SUCCESS
  };
}

export function makeLoginErrorAction(error) {
  return {
    type: MAKE_LOGIN_FAIL,
    payload: {
      error
    }
  };
}

export function resetMakeLoginStatusAction() {
  return {
    type: RESET_MAKE_LOGIN_STATUS
  };
}
