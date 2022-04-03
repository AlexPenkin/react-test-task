import { makeSelectLoginPageState, makeSelectLogging } from '../selectors';
import { initialState } from '../reducer';
import { CONTAINER_KEY } from '../constants';

const mockStore = () => ({ [CONTAINER_KEY]: { ...initialState } });

describe('selectLoginDomain', () => {
  it('Should select loginPageState', () => {
    const selector = makeSelectLoginPageState();
    expect(selector(mockStore())).toEqual(mockStore()[CONTAINER_KEY]);
  });

  it('Should select logging state', () => {
    const selector = makeSelectLogging();
    expect(selector(mockStore())).toEqual(mockStore()[CONTAINER_KEY].logging);
  });
});
