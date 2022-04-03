import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROUTE_NAMES } from '../../routeNames';

const AuthRoute = ({ component: Component, isAuthorized, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthorized ? (
        <Component {...rest} {...props} isAuthorized={isAuthorized} />
      ) : (
        <Redirect to={ROUTE_NAMES.ROOT} />
      )
    }
  />
);

AuthRoute.propTypes = { component: PropTypes.any, isAuthorized: PropTypes.bool };

export default AuthRoute;
