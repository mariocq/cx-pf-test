import request from '../utils/request';
import IP from "./ip";

export function realtime(values) {
  return request(IP.domain + '/api/real-time-image', {
  // return request('/api/real-time-image', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
