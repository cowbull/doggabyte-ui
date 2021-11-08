// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 获取当前的用户 GET /api/account/currentUser */
export async function currentUser(token, id, options) {
  let user = getCurrentUser();
  if (token?.length > 0) setCurrentUser({ token: token, id: id });
  else if (user?.token?.length > 0) token = user?.token;

  return request('/api/account/currentUser', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/account/outLogin */

export async function outLogin(options) {
  let user = getCurrentUser();
  if (user != null) removeCurrentUser();
  return request('/api/account/outLogin', {
    method: 'POST',
    data: { userId: user?.id },
    ...(options || {}),
  });
}
/** 登录接口 POST /api/account/signin */

export async function login(body, options) {
  return request('/api/account/signin', {
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

export function setCurrentUser(data) {
  localStorage.setItem('user', JSON.stringify(data));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function removeCurrentUser() {
  return localStorage.removeItem('user');
}
