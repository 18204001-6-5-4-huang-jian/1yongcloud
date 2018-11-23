/**
 * @file: index.
 * @intro: 数据请求统一封装.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 14:52.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//导入模块
import axios from 'axios'
import {port_code} from 'common/port_uri'
import router from 'src/router'
import {Message} from 'element-ui'
import store from 'store'
import {SET_USER_INFO} from 'store/actions/type'
import {cookieStorage} from 'common/storage'
import {Loading} from 'element-ui'
import {server_base_url} from 'common/config'

//设置用户信息action
const setUserInfo = function (user) {
  store.dispatch(SET_USER_INFO, user)
}

export default function fetch(options) {
  // console.log(options)
  return new Promise((resolve, reject) => {
    let loadingInstance;
    loadingInstance = Loading.service({fullscreen: true})
    // https://github.com/mzabriskie/axios
    //创建一个axios实例
    const token = cookieStorage.get('user_info').token || '';
    const instance = axios.create({
      //设置默认根地址
      baseURL: server_base_url,
      //设置请求超时设置
      timeout: 15000,
      withCredentials: true,
      responseType:options.responseType?options.responseType:'json',
      //设置请求时的header
      headers: {
       "Content-Type":options.contentType == ' form-data'?options.contentType:'application/json'
        // 'Authorization': token
      }
    })
    //请求处理
    instance(options)
      .then((res) => {
      if(res.status == '200') {
        if (options.url.indexOf('excel') >= 0) {
          resolve(res);
          loadingInstance.close()
          return;
        }
        if (res.data.success == true) {
          loadingInstance.close()
          resolve(res.data)
          return false
        } else {
          loadingInstance.close()
          Message.error(res.data.message)
          // resolve(res.data)
          reject(res.data)
        }
      }else{

      }

      })
      .catch((error)=>{
      if(error.response.status == '401'){
        loadingInstance.close()
        Message.error('对不起，您的登录状态已过期，请重新登陆')
        setTimeout(()=>{
          setUserInfo(null)
          router.replace('/user/login')
        },200)
      }else {
        loadingInstance.close()
        Message.error('请求错误，请联系管理员')
      }

    })
  })
}
