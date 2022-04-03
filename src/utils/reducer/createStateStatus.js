export const createStateStatus = (name) => {
  if (name) {
    return {
      [`${name}`]: {
        isDone: false,
        isFetching: false,
        isError: null,
        data: undefined
      }
    };
  }
  return {
    isDone: false,
    isFetching: false,
    isError: null,
    data: undefined
  };
};
