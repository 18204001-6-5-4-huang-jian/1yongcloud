
import fetch from 'common/fetch'

//根据loginName或者用户信息，进行回显
export const  getUserInfomation = function(data){
	return fetch({
		url:'/odmapi/user/getUserInfo',
		method:'post',
		data
	})
}

//获取验证码
export const getPhoneCode = function(data){
	return fetch({
		url:'/odmapi/user/updatePhone/sendAuthCode',
		method:'post',
		data
	})
}

//验证验证码
export const vertifyCode = function(data){
	return fetch({
		url:'/odmapi/user/auth/smsCode',
		method:'post',
		data
	})
}
//修改资料
export const updateUserInfo = function(data) {
  return fetch({
    url: '/odmapi/update/userInfo',
    method: 'post',
    data
  })
}

//修改密码
export const updatePwd = function(data){
	return fetch({
		url:'/odmapi/user/updateUserPwd',
		method:'post',
		data
	})
}


