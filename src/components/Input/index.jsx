import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.less';

export const Input = (props) => {
  const { className } = props;

  const classNames = classnames({
    Input: true,
    [className]: !!className
  });

  return <input className={classNames} {...props} />;
};

Input.propTypes = {
  className: PropTypes.string
};
