import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.less';

export const FormError = (props) => {
  const { className, error } = props;

  const classNames = classnames({
    FormError: true,
    [`FormError ${className}`]: !!className
  });

  if (!error) {
    return null;
  }

  return <span className={classNames}>{error}</span>;
};

FormError.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string
};
