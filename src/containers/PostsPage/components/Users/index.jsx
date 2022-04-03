import React from 'react';
import PropTypes from 'prop-types';

import './style.less';
import { User } from '../User';

export const Users = (props) => {
  const { users, onClick, currentUser } = props;

  if (!users?.length) {
    return (
      <span data-testid="Users__empty" className="Users__empty">
        Users has not been found
      </span>
    );
  }

  return (
    <div data-testid="Users" className="Users">
      {users.map((user) => (
        <User key={user.userName} onClick={onClick} currentUser={currentUser} {...user} />
      ))}
    </div>
  );
};

Users.propTypes = {
  currentUser: PropTypes.string,
  users: PropTypes.array,
  onClick: PropTypes.func
};
