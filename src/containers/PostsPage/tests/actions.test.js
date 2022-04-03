import { GET_POSTS, GET_POSTS_FAIL, GET_POSTS_SUCCESS } from '../constants';

import { getPostsSuccessAction, getPostsAction, getPostsErrorAction } from '../actions';

describe('Posts actions', () => {
  it('Get posts action', () => {
    const page = 2;
    const expected = {
      type: GET_POSTS,
      payload: {
        page
      }
    };
    const actionResult = getPostsAction(page);
    expect(actionResult).toEqual(expected);
    expect(actionResult.payload.page).toBe(page);
  });

  it('Get posts success action', () => {
    const posts = [];
    const expected = {
      type: GET_POSTS_SUCCESS,
      payload: {
        posts
      }
    };
    expect(getPostsSuccessAction(posts)).toEqual(expected);
  });

  it('Get Posts error action', () => {
    const error = { message: 'ошибка' };
    const expected = {
      type: GET_POSTS_FAIL,
      payload: {
        error
      }
    };
    expect(getPostsErrorAction(error)).toEqual(expected);
  });
});
