import produce from 'immer';
import postsReducer from '../reducer';
import { getPostsSuccessAction, getPostsAction, getPostsErrorAction } from '../actions';
import { createStateStatus } from '../../../utils/reducer/createStateStatus';

/* eslint-disable default-case, no-param-reassign */
describe('postsReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      posts: {
        ...createStateStatus(),
        data: undefined
      }
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(postsReducer(state, {})).toEqual(expectedResult);
  });

  it('should handle the getPostsAction action correctly', () => {
    const expectedResult = produce(state, (draft) => {
      draft.posts.isFetching = true;
      draft.posts.isDone = false;
      draft.posts.isError = false;
      draft.posts.data = undefined;
    });
    expect(postsReducer(state, getPostsAction())).toEqual(expectedResult);
  });

  it('should handle the getPostsErrorAction action correctly', () => {
    const error = {
      message: 'Error'
    };
    const expectedResult = produce(state, (draft) => {
      draft.posts.isFetching = false;
      draft.posts.isDone = true;
      draft.posts.isError = error;
      draft.posts.data = undefined;
    });
    expect(postsReducer(state, getPostsErrorAction(error))).toEqual(expectedResult);
  });

  it('should handle the getPostsSuccessAction action correctly', () => {
    const posts = [];
    const expectedResult = produce(state, (draft) => {
      draft.posts.isFetching = false;
      draft.posts.isDone = true;
      draft.posts.isError = null;
      draft.posts.data = posts;
    });
    expect(postsReducer(state, getPostsSuccessAction(posts))).toEqual(expectedResult);
  });
});
