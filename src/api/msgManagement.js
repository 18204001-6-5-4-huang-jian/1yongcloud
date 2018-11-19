import fetch from 'common/fetch'

//消息列表
export const getMsgList = function(data){
   return fetch({
       url:'/odmapi/meaasge/queryMeaasge',
       method:'post',
       data
  })
}

//发布消息
export const setMsg = function(data){
	return fetch({
		url:'/odmapi/meaasge/sendMeaasge',
		method:'post',
		data
	})
}

//获取消息详情
export const getMsgDetail = function(data){
	return fetch({
		url:'/odmapi/meaasge/updateMeaasge',
		method:'post',
		data
	})
}