import { useContext, useEffect } from 'react';
import { ReactReduxContext } from 'react-redux';

const injectedSagas = {};

const injectSaga = (store, key, saga) => {
  injectedSagas[key] = {
    task: store.runSaga(saga)
  };
};

const ejectSaga = (key) => {
  injectedSagas[key].task.cancel();
};

export const useInjectSaga = ({ key, saga }) => {
  const context = useContext(ReactReduxContext);
  useEffect(() => {
    if (!context) {
      return;
    }

    injectSaga(context.store, key, saga);

    return () => {
      ejectSaga(key);
    };
  }, []);
};
