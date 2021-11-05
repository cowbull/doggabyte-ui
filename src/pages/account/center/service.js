import { request } from 'umi';
export async function queryCurrent() {
  return request('/api/accountSettingCurrentUser');
}
export function queryProvince(token) {
  const province = require('./geographic/province.json');
  return province;
  //  return request('/api/geographic/province', {
  //    method: 'GET',
  //    headers: {
  //      Authorization: 'Bearer ' + token,
  //    },
  //    ...(options || {}),
  //  });
}
export async function queryCity(province) {
  return request(`/api/geographic/city/${province}`);
}
export async function query() {
  return request('/api/users');
}
