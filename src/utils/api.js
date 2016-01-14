import Promise from 'bluebird';
import superagent from 'superagent';
import superagentPromise from 'superagent-promise';
import config from '../config';
export const agent = superagentPromise(superagent, Promise);

// api token
const TOKEN_KEY = 'authorizationToken';
let token = localStorage.getItem(TOKEN_KEY) || null;

// request wrapper
export function makeRequest(method, url){
  var req = agent[method.toLowerCase()](
    `${config.apiRoot}/${url}`
  );

  if (token) {
    req.set('Authorization', `JWT ${token}`);
  }

  return req;
}
export default {
  get: (...args) => makeRequest('get', ...args),
  post: (...args) => makeRequest('post', ...args),
  put: (...args) => makeRequest('put', ...args),
  delete: (...args) => makeRequest('delete', ...args),
  head: (...args) => makeRequest('head', ...args),
};

// manages api token
export function setToken(newToken){
  localStorage.setItem(TOKEN_KEY, newToken);
  console.debug('Api Token: %s', newToken);
  token = newToken;
}

export function getToken(){
  return token;
}
