import React, { useCallback, useRef } from 'react';
import { useInterval } from '../../utils/useInterval';
import { getAccessToken, removeAccessToken, setAccessToken } from '../../utils/storage/tokens';

const LOGOUT_EVENT_NAME = 'logout';
const logoutEvent = new Event(LOGOUT_EVENT_NAME);
const LOGIN_EVENT_NAME = 'login';
const loginEvent = new Event(LOGIN_EVENT_NAME);

export const logout = () => {
  removeAccessToken();
  window.dispatchEvent(logoutEvent);
};

export const login = (token) => {
  setAccessToken(token);
  window.dispatchEvent(loginEvent);
};

export const useProtect = () => {
  const [isAuthorized, setIsAuthorized] = React.useState(null);
  const token = useRef(undefined);

  const logoutListener = useCallback(() => {
    setIsAuthorized(false);
  }, []);

  const loginListener = useCallback(() => {
    checkToken();
  }, []);

  const checkToken = useCallback(async () => {
    try {
      token.current = await getAccessToken();
    } catch (error) {
      setIsAuthorized(false);
    }
    if (!token.current) {
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, []);

  useInterval(checkToken, 1000);

  React.useEffect(async () => {
    checkToken();
    window.addEventListener(LOGOUT_EVENT_NAME, logoutListener, false);
    window.addEventListener(LOGIN_EVENT_NAME, loginListener, false);
    return () => {
      window.removeEventListener(LOGOUT_EVENT_NAME, logoutListener);
      window.removeEventListener(LOGIN_EVENT_NAME, logoutListener);
    };
  }, []);
  return isAuthorized;
};
