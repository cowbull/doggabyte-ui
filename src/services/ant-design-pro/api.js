// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 获取当前的用户 GET /api/login/currentUser */
export async function currentUser(token, options) {
  // const initialInfo = (useModel && useModel('@@initialState'));
  // debugger;
  return request('/api/login/currentUser', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  debugger;
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 登录接口 POST /api/login/account */

export async function login(body, options) {
  return request('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 此处后端没有提供注释 GET /api/notices */

export async function getNotices(options) {
  return request('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取规则列表 GET /api/order_list */

export async function rule(params, options) {
  return request('/api/order_list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 新建规则 PUT /api/order_list */

export async function updateRule(options) {
  return request('/api/order_list', {
    method: 'PUT',
    ...(options || {}),
  });
}
/** 新建规则 POST /api/order_list */

export async function addRule(options) {
  return request('/api/order_list', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/order_list */

export async function removeRule(options) {
  return request('/api/order_list', {
    method: 'DELETE',
    ...(options || {}),
  });
}
