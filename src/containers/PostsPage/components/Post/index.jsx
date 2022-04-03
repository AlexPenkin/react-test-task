/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import './style.less';

export const Post = (props) => {
  const { message, created_time } = props;

  return (
    <div data-testid="Post" className="Post">
      <div className="Post__time">{format(parseISO(created_time), 'LLLL dd, yyyy hh:mm:ss')}</div>
      <div className="Post__text">{message}</div>
    </div>
  );
};

Post.propTypes = {
  message: PropTypes.string.isRequired,
  created_time: PropTypes.string.isRequired
};
