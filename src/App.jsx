import React, { memo, useMemo } from 'react';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import './App.less';
import { useInjectSaga } from './utils/injectSaga';
import { useInjectReducer } from './utils/reducer/injectReducer';
import AuthRoute from './components/AuthRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { useProtect } from './components/useProtect';
import LoginPage from './containers/LoginPage';
import PostsPage from './containers/PostsPage';
import { CONTAINER_KEY as LOGIN_PAGE_CONTAINER_KEY } from './containers/LoginPage/constants';
import loginPageReducer from './containers/LoginPage/reducer';
import loginPageSaga from './containers/LoginPage/saga';
import { ROUTE_NAMES } from './routeNames';

const useOnStartInjector = () => {
  useInjectReducer({ key: LOGIN_PAGE_CONTAINER_KEY, reducer: loginPageReducer });
  useInjectSaga({ key: LOGIN_PAGE_CONTAINER_KEY, saga: loginPageSaga });
};

function App() {
  useOnStartInjector();
  const isAuthorized = useProtect();
  const routeProps = useMemo(() => ({ isAuthorized }), [isAuthorized]);

  return (
    <div className="App">
      <Switch>
        <AuthRoute exact path={`/${ROUTE_NAMES.AUTH_LOGIN}`} component={LoginPage} {...routeProps} />
        <ProtectedRoute exact path={`/${ROUTE_NAMES.ROOT}`} component={PostsPage} {...routeProps} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(App);
