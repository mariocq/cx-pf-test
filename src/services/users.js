import request from '../utils/request';
import IP from "./ip";

export function login(values) {
  return request(IP.domain + '/api/login', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
export function setpassword(values) {
  return request(IP.domain + '/api/setpassword', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
export function logout(values) {
  return request(IP.domain + '/api/logout', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
export function record(values) {
  return request(IP.domain + '/api/record/login', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
