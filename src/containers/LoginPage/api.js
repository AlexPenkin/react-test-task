import { create } from 'apisauce';
import { APP_CONFIG } from '../../config';
import { requestTransform } from '../../utils/api/requestTransform';
import { responseTransform } from '../../utils/api/responseTransform';

export const loginApi = create({
  baseURL: APP_CONFIG.baseApiURL,
  headers: { Accept: 'application/vnd.github.v3+json' }
});

export const postCredentialsApi = async (email, name) =>
  loginApi.post(`/register`, { email, name, client_id: APP_CONFIG.clientId }).then((response) => {
    if (!response.ok) {
      throw new Error(response?.data?.error?.message || 'Something gone wrong');
    }
    return response.data;
  });

loginApi.addAsyncRequestTransform(requestTransform);
loginApi.addAsyncResponseTransform(responseTransform);
