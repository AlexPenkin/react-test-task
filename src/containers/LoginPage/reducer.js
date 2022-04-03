import produce from 'immer';
import { createStateStatus } from '../../utils/reducer/createStateStatus';
import { MAKE_LOGIN, MAKE_LOGIN_SUCCESS, MAKE_LOGIN_FAIL, RESET_MAKE_LOGIN_STATUS } from './constants';

export const initialState = {
  logging: {
    ...createStateStatus()
  }
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MAKE_LOGIN:
        draft.logging.isFetching = true;
        draft.logging.isError = null;
        break;
      case MAKE_LOGIN_SUCCESS:
        draft.logging.isFetching = false;
        draft.logging.isDone = true;
        draft.logging.isError = null;
        break;
      case MAKE_LOGIN_FAIL:
        draft.logging.isFetching = false;
        draft.logging.isDone = true;
        draft.logging.isError = action.payload.error;
        break;
      case RESET_MAKE_LOGIN_STATUS:
        draft.logging.isDone = false;
        draft.logging.isFetching = false;
        draft.logging.isError = null;
        break;
    }
  });

export default loginReducer;
