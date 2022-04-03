import { logout } from '../../components/useProtect';
import { getAccessToken } from '../storage/tokens';

export const requestTransform = async (request) => {
  const token = getAccessToken();
  if (!token) {
    logout();
    return;
  }
  request.params.sl_token = token;
  request.headers.Authorization = `Bearer ${token}`;
};
