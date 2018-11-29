import request from '../utils/request';

export function login(values) {
  return request('http://120.79.44.187:5000/api/login', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
