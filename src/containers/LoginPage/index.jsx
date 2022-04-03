import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectLogging } from './selectors';
import { makeLoginAction, resetMakeLoginStatusAction } from './actions';

import './style.less';
import { LoginForm } from './components/LoginForm';

export function LoginPage(props) {
  const {
    makeLogin,
    resetMakeLoginStatus,
    loggingState: { isError, isFetching }
  } = props;

  useEffect(() => () => {
    resetMakeLoginStatus();
  });

  return (
    <div data-testid="LoginPage" className="LoginPage">
      <LoginForm isError={isError} isFetching={isFetching} onSubmit={makeLogin} />
    </div>
  );
}

LoginPage.propTypes = {
  makeLogin: PropTypes.func,
  resetMakeLoginStatus: PropTypes.func,
  loggingState: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  loggingState: makeSelectLogging()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    makeLogin: (data) => dispatch(makeLoginAction(data)),
    resetMakeLoginStatus: () => dispatch(resetMakeLoginStatusAction())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(LoginPage);
