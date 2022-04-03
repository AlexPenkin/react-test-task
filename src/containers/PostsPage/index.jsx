/**
 *
 * Posts
 *
 */

import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import parseISO from 'date-fns/parseISO';
import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/reducer/injectReducer';
import { makeSelectPosts } from './selectors';
import { getPostsAction } from './actions';
import { CONTAINER_KEY } from './constants';
import reducer from './reducer';
import saga from './saga';
import { Users } from './components/Users';
import { Input } from '../../components/Input';
import { Posts } from './components/Posts';

import './style.less';

export function PostsPage(props) {
  useInjectReducer({ key: CONTAINER_KEY, reducer });
  useInjectSaga({ key: CONTAINER_KEY, saga });
  const { getPosts, postsState: { isFetching, data: { posts = [] } = {} } = {} } = props;

  const history = useHistory();
  const params = new URLSearchParams(history?.location?.search);

  const [currentUser, setCurrentUser] = useState(params.get('currentUser'));
  const [userFilter, setUserFilter] = useState('');
  const [postFilter, setPostFilter] = useState('');
  const [descendingOrder, setDescendingOrder] = useState(true);

  const handleSelectUser = useCallback(
    (userName) => {
      if (userName === currentUser) {
        setCurrentUser(undefined);
        history.push({
          search: ``
        });
      } else {
        params.set('currentUser', userName);
        setCurrentUser(userName);
        history.push({
          search: `?${params.toString()}`
        });
      }
    },
    [currentUser]
  );

  const handleUserFilter = useCallback((e) => {
    setUserFilter(e.target.value);
  }, []);

  const handlePostFilter = useCallback((e) => {
    setPostFilter(e.target.value);
  }, []);

  const handleDescendClick = useCallback(() => {
    setDescendingOrder(true);
  }, []);

  const handleAscendClick = useCallback(() => {
    setDescendingOrder(false);
  }, []);

  const sortingFunction = useMemo(() => {
    if (descendingOrder) {
      return (a, b) => {
        if (isEqual(parseISO(a.created_time), parseISO(b.created_time))) {
          return 0;
        }
        if (isBefore(parseISO(a.created_time), parseISO(b.created_time))) {
          return 1;
        }
        return -1;
      };
    }

    return (a, b) => {
      if (isEqual(parseISO(a.created_time), parseISO(b.created_time))) {
        return 0;
      }
      if (isBefore(parseISO(a.created_time), parseISO(b.created_time))) {
        return -1;
      }
      return 1;
    };
  }, [descendingOrder]);

  React.useEffect(() => {
    getPosts();
  }, []);

  const users = useMemo(
    () =>
      Object.keys(posts)
        .map((name) => ({
          userName: name,
          postCount: posts[name].length
        }))
        .filter(({ userName }) => userName.toLowerCase().includes(userFilter.toLowerCase())),
    [posts, userFilter]
  );

  const userPosts = useMemo(
    () =>
      currentUser &&
      posts[currentUser] &&
      posts[currentUser]
        .filter(({ message }) => message.toLowerCase().includes(postFilter.toLowerCase()))
        .sort(sortingFunction),
    [posts, currentUser, postFilter, sortingFunction]
  );

  if (isFetching) {
    return '...Loading';
  }

  return (
    <div data-testid="PostsPage" className="PostsPage">
      <div className="PostsPage__layout PostsPageLayout">
        <div className="PostsPageLayout__left">
          <Input placeholder="User search" onChange={handleUserFilter} value={userFilter} />
          <Users currentUser={currentUser} onClick={handleSelectUser} users={users} />
        </div>
        {currentUser && (
          <div className="PostsPageLayout__right">
            <div className="PostsToolbar">
              <div className="PostsToolbar__order">
                <button onClick={handleDescendClick} type="button">
                  descend
                </button>
                <button onClick={handleAscendClick} type="button">
                  ascend
                </button>
              </div>
              <Input placeholder="Post search" onChange={handlePostFilter} value={postFilter} />
            </div>
            <Posts posts={userPosts} />
          </div>
        )}
      </div>
    </div>
  );
}

PostsPage.propTypes = {
  getPosts: PropTypes.func,
  postsState: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  postsState: makeSelectPosts()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPosts: (postsId) => dispatch(getPostsAction(postsId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PostsPage);
