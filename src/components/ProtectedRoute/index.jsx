/**
 *
 * ProtectedRoute
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ROUTE_NAMES } from '../../routeNames';

const ProtectedRoute = ({ component: Component, isAuthorized, path, rolesData, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthorized === null) {
        return null;
      }

      if (isAuthorized) {
        return <Component {...props} />;
      }
      return <Redirect to={`/${ROUTE_NAMES.AUTH_LOGIN}`} />;
    }}
  />
);

ProtectedRoute.propTypes = {
  isAuthorized: PropTypes.bool,
  path: PropTypes.string,
  rolesData: PropTypes.object,
  component: PropTypes.any
};

export default ProtectedRoute;
