import { create } from 'apisauce';
import { postsApiToFrontAdapter } from '../../adapters/posts/postsApiToFrontAdapter';
import { APP_CONFIG } from '../../config';
import { requestTransform } from '../../utils/api/requestTransform';
import { responseTransform } from '../../utils/api/responseTransform';

export const postsApi = create({
  baseURL: APP_CONFIG.baseApiURL,
  headers: { Accept: 'application/vnd.github.v3+json' }
});

export const getPostsApi = async (page) => postsApiToFrontAdapter((await postsApi.get('/posts', { page })).data.data);

postsApi.addAsyncRequestTransform(requestTransform);
postsApi.addAsyncResponseTransform(responseTransform);
