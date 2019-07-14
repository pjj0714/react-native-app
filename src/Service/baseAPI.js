import axios from 'axios';

function baseAxios(options, headers) {
  const defaultHeaders = headers || {
    'Content-Type': 'application/json'
  };

  return axios.create({
    baseURL: 'https://mcricwiojwfb.cleancitynetworks.com/mobile/v1',

    timeout: options.timeout || 30000,
    headers: defaultHeaders
  });
}

function executeRequest(method, pathname, data, headers, options = {}) {
  const body = method === 'get' || !data ? {} : { data };
  const reqObj = {
    method,
    url: pathname,
    params: options.query,
    headers,
    ...body
  };

  const baseAxiosRequest = baseAxios(options, headers);
  return new Promise((resolve, reject) => {
    return baseAxiosRequest
      .request(reqObj)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export default {
  get(pathname, headers, options) {
    return executeRequest('get', pathname, null, headers, options);
  },

  post(pathname, data, headers) {
    return executeRequest('post', pathname, data, headers);
  },

  put(pathname, data, headers) {
    return executeRequest('put', pathname, data, headers);
  },

  delete(pathname, data, headers) {
    return executeRequest('delete', pathname, data, headers);
  },

  all(promises) {
    return axios.all(promises);
  }
};
