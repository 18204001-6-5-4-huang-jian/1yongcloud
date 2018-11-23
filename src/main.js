// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/iconfont.css'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import '../theme/index.css'
//导入element组件
import ElementUI from 'element-ui'
//导入组件
import router from './router'
//导入状态管理器
import store from 'store'
//导入请求框架
import api from './api'
//导入自定义插件
import Plugins from 'plugins'
import * as custom from './filters/filter.js'
import echarts from 'echarts'
Vue.prototype.$echarts= echarts;
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

//使用element-ui
Vue.use(ElementUI)

//使用自定义插件
Vue.use(Plugins)

//使用api
Vue.use(api)
//发布后是否显示提示
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
Vue.config.productionTip = false
//是否开启工具调试
Vue.config.devtools = process.env.NODE_ENV === 'development'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // render: h => h(App),
  components: { App },
  template: '<App/>'
})

