import request from '../utils/request';
import IP from "./ip";

export function fetch(values) {
  return request(IP.domain + '/api/group/all', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function add(values) {
  return request(IP.domain + '/api/group/add', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
