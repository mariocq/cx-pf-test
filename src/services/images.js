import request from '../utils/request';

export function realtime(values) {
  return request('/api/real-time-image', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
