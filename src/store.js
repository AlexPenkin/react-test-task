import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { createReducer } from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger();

const devMiddlewares = import.meta.env.DEV ? [logger] : [];

const middlwares = [...devMiddlewares, sagaMiddleware];

export const store = createStore(createReducer(), applyMiddleware(...middlwares));

store.runSaga = sagaMiddleware.run;
