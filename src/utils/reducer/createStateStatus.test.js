import { createStateStatus } from './createStateStatus';

describe('createStateStatus util function', () => {
  it('should give object without argument', () => {
    const result = {
      data: undefined,
      isDone: false,
      isError: null,
      isFetching: false
    };
    expect(createStateStatus()).toEqual(result);
  });

  it('should give object with argument', () => {
    const result = {
      test: {
        data: undefined,
        isDone: false,
        isError: null,
        isFetching: false
      }
    };
    expect(createStateStatus('test')).toEqual(result);
  });
});
