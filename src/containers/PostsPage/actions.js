import { GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAIL } from './constants';

export function getPostsAction(page = 1) {
  return {
    type: GET_POSTS,
    payload: {
      page
    }
  };
}

export function getPostsSuccessAction(posts) {
  return {
    type: GET_POSTS_SUCCESS,
    payload: {
      posts
    }
  };
}

export function getPostsErrorAction(error) {
  return {
    type: GET_POSTS_FAIL,
    payload: {
      error
    }
  };
}
