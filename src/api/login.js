
import fetch from 'common/fetch'

//获取验证码
export function sendAuthCode(data) {
  return fetch({
    url: '/odmapi/auth/sendAuthCode',
    method: 'post',
    data
  })
}

//登录
export function login(data) {
  return fetch({
    url: '/odmapi/auth/login',
    method: 'post',
    data
  })
}
//退出登录
export function loginout(data) {
  return fetch({
    url: '/odmapi/user/loginout',
    method: 'post',
    data
  })
}

//获取登录用户信息
export function getUserInfo(data) {
  return fetch({
    url: '/odmapi/user/getUserInfo',
    method: 'post',
    data
  })
}
//获取登录用户信息
export function taskStatistics(data) {
  return fetch({
    url: '/odmapi/index/taskStatistics',
    method: 'post',
    data
  })
}
