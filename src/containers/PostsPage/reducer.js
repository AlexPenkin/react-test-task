import produce from 'immer';
import { createStateStatus } from '../../utils/reducer/createStateStatus';
import { GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAIL } from './constants';

export const initialState = {
  posts: {
    ...createStateStatus(),
    data: undefined
  }
};

/* eslint-disable default-case, no-param-reassign */
const postsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_POSTS:
        draft.posts.isFetching = true;
        draft.posts.isError = false;
        break;
      case GET_POSTS_SUCCESS:
        draft.posts.isFetching = false;
        draft.posts.isDone = true;
        draft.posts.data = action.payload.posts;
        break;
      case GET_POSTS_FAIL:
        draft.posts.isFetching = false;
        draft.posts.isDone = true;
        draft.posts.isError = action.payload.error;
        break;
    }
  });

export default postsReducer;
