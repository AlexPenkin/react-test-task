import { logout } from '../../components/useProtect';

export const responseTransform = async ({ status }) => {
  if (status === 500) {
    logout();
  }
};
