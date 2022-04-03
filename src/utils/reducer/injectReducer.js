/* eslint-disable no-param-reassign */
import { useContext, useEffect } from 'react';

import { ReactReduxContext } from 'react-redux';
import { createReducer } from '../../rootReducer';

const injectedReducers = {};

function injectReducer(store, name, reducer) {
  injectedReducers[name] = reducer;
  store.replaceReducer(createReducer(injectedReducers));
}

export const useInjectReducer = ({ key, reducer }) => {
  const context = useContext(ReactReduxContext);
  useEffect(() => {
    if (!context) {
      return;
    }
    context.store && injectReducer(context.store, key, reducer);
  }, []);
};
