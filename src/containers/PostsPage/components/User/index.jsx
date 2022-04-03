import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.less';

export const User = (props) => {
  const { userName, postCount, onClick, currentUser } = props;

  const isSelected = currentUser === userName;

  const classNames = classnames({
    User: true,
    selected: isSelected
  });

  return (
    <div data-testid="User" onClick={() => onClick(userName)} className={classNames}>
      <div className="User__name">{userName}</div>
      <div className="User__count">{postCount}</div>
    </div>
  );
};

User.propTypes = {
  userName: PropTypes.string,
  currentUser: PropTypes.string,
  postCount: PropTypes.number,
  onClick: PropTypes.func
};
