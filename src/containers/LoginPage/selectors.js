import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTAINER_KEY } from './constants';

const selectLoginDomain = (state) => state[CONTAINER_KEY] || initialState;

const makeSelectLoginPageState = () => createSelector(selectLoginDomain, (substate) => substate);

const makeSelectLogging = () => createSelector(selectLoginDomain, (substate) => substate.logging);

export default makeSelectLoginPageState;
export { makeSelectLogging, makeSelectLoginPageState };
