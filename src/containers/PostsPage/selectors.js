import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTAINER_KEY } from './constants';

const selectPostsDomain = (state) => state[CONTAINER_KEY] || initialState;

const makeSelectPostsPageState = () => createSelector(selectPostsDomain, (substate) => substate);

const makeSelectPosts = () => createSelector(selectPostsDomain, (substate) => substate.posts);

export default makeSelectPostsPageState;
export { selectPostsDomain, makeSelectPostsPageState, makeSelectPosts };
