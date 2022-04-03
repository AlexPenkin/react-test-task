import produce from 'immer';
import loginReducer from '../reducer';
import {
  makeLoginAction,
  makeLoginActionSuccessAction,
  makeLoginErrorAction,
  resetMakeLoginStatusAction
} from '../actions';
import { createStateStatus } from '../../../utils/reducer/createStateStatus';

/* eslint-disable default-case, no-param-reassign */
describe('loginReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      logging: {
        ...createStateStatus(),
        data: undefined
      }
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(loginReducer(state, {})).toEqual(expectedResult);
  });

  it('should handle the makeLoginAction action correctly', () => {
    const expectedResult = produce(state, (draft) => {
      draft.logging.isFetching = true;
      draft.logging.isDone = false;
      draft.logging.isError = null;
      draft.logging.data = undefined;
    });
    expect(loginReducer(state, makeLoginAction({}))).toEqual(expectedResult);
  });

  it('should handle the makeLoginErrorAction action correctly', () => {
    const error = {
      message: 'Error'
    };
    const expectedResult = produce(state, (draft) => {
      draft.logging.isFetching = false;
      draft.logging.isDone = true;
      draft.logging.isError = error;
      draft.logging.data = undefined;
    });
    expect(loginReducer(state, makeLoginErrorAction(error))).toEqual(expectedResult);
  });

  it('should handle the makeLoginActionSuccessAction action correctly', () => {
    const logging = 'Some comparable value';
    const expectedResult = produce(state, (draft) => {
      draft.logging.isFetching = false;
      draft.logging.isDone = true;
      draft.logging.isError = null;
    });
    expect(loginReducer(state, makeLoginActionSuccessAction(logging))).toEqual(expectedResult);
  });

  it('should handle the resetMakeLoginStatusAction() action correctly', () => {
    const expectedResult = produce(state, (draft) => {
      draft.logging.isFetching = false;
      draft.logging.isDone = false;
      draft.logging.isError = null;
      draft.logging.data = undefined;
    });
    expect(loginReducer(state, resetMakeLoginStatusAction())).toEqual(expectedResult);
  });
});
