import { makeSelectPostsPageState, makeSelectPosts } from '../selectors';
import { initialState } from '../reducer';
import { CONTAINER_KEY } from '../constants';

const mockStore = () => ({ [CONTAINER_KEY]: { ...initialState } });

describe('selectPostsDomain', () => {
  it('Should select postsPageState', () => {
    const selector = makeSelectPostsPageState();
    expect(selector(mockStore())).toEqual(mockStore()[CONTAINER_KEY]);
  });

  it('Should select posts', () => {
    const selector = makeSelectPosts();
    expect(selector(mockStore())).toEqual(mockStore()[CONTAINER_KEY].posts);
  });
});
