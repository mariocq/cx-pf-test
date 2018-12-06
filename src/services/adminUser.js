import request from '../utils/request';
import IP from "./ip";

export function fetch(values) {
  return request(IP.domain + '/api/user/all', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function add(values) {
  return request(IP.domain + '/api/user/add', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function edit(values) {
  return request(IP.domain + '/api/user/update', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
