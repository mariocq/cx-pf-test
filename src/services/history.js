import request from '../utils/request';
import IP from "./ip";

export function fetch(values) {
  return request(IP.domain + '/api/history', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
