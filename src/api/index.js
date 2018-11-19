/**
 * @file: index.
 * @intro: api请求索引.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 15:31.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//导入模块
import * as api_home from './home'
import * as api_data from './data'
import * as api_basicData from './basicData'
import * as api_login from './login'
import * as api_msgManagement from './msgManagement'//消息管理
import * as api_detection from './detection'//机构设置
import * as api_system from './systemSetting' //系统管理
import * as api_total from './total' //系统管理
const apiObj = {
  api_home,
  api_data,
  api_login,
  api_msgManagement,
  api_detection,
  api_system,
  api_basicData,
  api_total
}

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  //定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get() {
        return apiObj
      }
    }
  })
}

export default {
  install
}
