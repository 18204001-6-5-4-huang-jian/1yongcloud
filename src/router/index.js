import Vue from 'vue'
import VueRouter from 'vue-router'
import {Message} from 'element-ui';
import store from 'store'
import checkPageAuth from './checkPageAuth'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
//import components
//view page warp component

//home
const viewPage = () => import('pages/App')
//首页
const home = () => import('pages/home/home')
const homeIndex = () => import('pages/home')
//404
const noPage = () => import('pages/error/404')
//登录页
const login = () => import('pages/user/login')
//首次登陆重置密码
const firstLogin = () => import('pages/resetpwd/resetpwd')
//消息管理
const message = () => import('pages/message')
//消息通知
const notice = () => import('pages/message/notice')
//消息发布
const release = () => import('pages/message/release')
//消息详情
const msgDetail = () => import('pages/message/detail')
//数据整体情况
const total = () => import('pages/totalData')
//数据整体情况
const totalData = () => import('pages/totalData/totalData')
//数据整体情况
const totalDetail = () => import('pages/totalData/detail')
//数据整体情况
const detailShow = () => import('pages/totalData/detailShow')
//数据整体情况
const details = () => import('pages/totalData/details')
//数据上报
const data = () => import('pages/data')
//已归档数据
const archived = () => import('pages/data/archived')
//数据上报
const dataReport = () => import('pages/data/dataReport')
//未归档数据
const unfiled = () => import('pages/data/unfiled')
//数据查看
const dataShow = () => import('pages/data/dataShow')
//详情
const detail = () => import('pages/data/detail')
//检测指标
const detection = () => import('pages/detection')
//种类分布
const description = () => import('pages/detection/description')
//种类分布省
const descriptionProvince = () => import('pages/detection/descriptionProvince')
//种类分布市
const descriptionHos = () => import('pages/detection/descriptionHos')
//区域分布
const region = () => import('pages/detection/region')
//药品分布
const drugs = () => import('pages/detection/drugs')
//药品分布
const drugDetail = () => import('pages/detection/drugDetail')
//次均费用
const average = () => import('pages/detection/average')
//抗肿瘤药物清单
const drugList = () => import('pages/detection/drugList')
//基础数据管理
const basicdata = () => import('pages/basicdata')
//数据匹配
const matching = () => import('pages/basicdata/matching')
//匹配结果
const result = () => import('pages/basicdata/result')
//区域字典
const regional = () => import('pages/basicdata/regional')
//医疗机构字典
const institutional = () => import('pages/basicdata/institutional')
//区域字典详情
const regionalDetil = () => import('pages/basicdata/regionalDetail')
//区域字典编辑
const regionalEdit = () => import('pages/basicdata/regionalEdit')
//机构设置
const organ = () => import('pages/organ')
//机构设置
const dataDictionary = () => import('pages/dataDictionary')
//修改资料
const material = () => import('pages/organ/material')
//修改密码
const password = () => import('pages/organ/password')
//帮助中心
const help = () => import('pages/help/help')
//系统管理
const system = () => import('pages/system')
//机构管理
const mechanism = () => import('pages/system/mechanism')
//新增机构
const mechanismAdd = () => import('pages/system/mechanismAdd')
//机构详情
const mechanismDetail = () => import('pages/system/mechanismDetail')
//用户管理
const consumer = () => import('pages/system/consumer')
//用户管理
const consumerAdd = () => import('pages/system/consumerAdd')
//用户详情
const consumerDetail = () => import('pages/system/consumerDetail')
//用户编辑
const consumerEdit = () => import('pages/system/consumerEdit')
//角色管理
const role = () => import('pages/system/role')
//角色管理
const roleAdd = () => import('pages/system/roleAdd')
//角色详情
const roleDetail = () => import('pages/system/roleDetail')
//角色编辑
const roleEdit = () => import('pages/system/roleEdit')
//任务
const task = () => import('pages/home/task')
Vue.use(VueRouter)

const routes = [
  {path: '/404', name: 'notPage', component: noPage},
  {path: '*', redirect: '/404'},
  {path: '/user/login', name: 'login', component: login, meta: {title: "登录", auth: true}},
  {path: '/user/firstLogin', name: 'firstLogin', component: firstLogin, meta: {title: "首次登录", auth: true}},
  {
    path: '/', redirect: '/home/home', component: viewPage,
    children: [
      {path: '/home/task', name: 'task', component: task, meta: {title: "任务", auth: true}},
      {path: '/home/home', name: 'home', component: home, meta: {title: "首页", auth: true}},
      {
        path: '/totalData',
        name: 'total',
        redirect: '/totalData/totalData',
        component: total,
        meta: {title: "数据情况", auth: true},
        children: [
          {path: '/totalData/totalData', name: 'totalData', component: totalData, meta: {title: "数据情况", auth: true},},
          {
            path: '/totalData/detail',
            name: 'totalDetail',
            component: totalDetail,
            meta: {title: "数据整体情况", auth: true},
          },
          {
            path: '/totalData/detailShow',
            name: 'detailShow',
            component: detailShow,
            meta: {title: "文件整体详情", auth: true},
          },
          {path: '/totalData/details', name: 'details', component: details, meta: {title: "文件详情", auth: true},},
        ]
      },
      {
        path: '/message',
        name: 'message',
        redirect: '/message/notice',
        component: message,
        meta: {title: "消息管理", auth: true},
        children: [
          {path: '/message/notice', name: 'notice', component: notice, meta: {title: "消息通知", auth: true},},
          {path: '/message/release', name: 'release', component: release, meta: {title: "消息发布", auth: true}},
          {path: '/message/detail', name: 'msgdetail', component: msgDetail, meta: {title: "消息详情", auth: true}},
        ]
      },
      {
        path: '/data', name: 'data', component: data, redirect: '/data/unfiled', meta: {title: "数据上报", auth: true},
        children: [
          {path: '/data/archived', name: 'archived', component: archived, meta: {title: "已归档数据", auth: true}},
          {path: '/data/unfiled', name: 'unfiled', component: unfiled, meta: {title: "未归档数据", auth: true}},
          {path: '/data/dataReport', name: 'dataReport', component: dataReport, meta: {title: "数据上报", auth: true}},
          {path: '/data/dataShow', name: 'dataShow', component: dataShow, meta: {title: '文件整体详情', auth: true}},
          {path: '/data/detail', name: 'detail', component: detail, meta: {title: '文件详情', auth: true}},
        ]
      },
      {
        path: '/detection',
        name: 'detection',
        redirect: '/detection/description',
        component: detection,
        meta: {title: "监测指标", auth: true},
        children: [
          {
            path: '/detection/description',
            name: 'description',
            component: description,
            meta: {title: "种类分布", auth: true}
          },
          {
            path: '/detection/province',
            name: 'descriptionProvince',
            component: descriptionProvince,
            meta: {title: "种类分布", auth: true}
          },
          {
            path: '/detection/hospital',
            name: 'hospital',
            component: descriptionHos,
            meta: {title: "种类分布", auth: true}
          },
          {
            path: '/detection/drugDetail',
            name: 'drugDetail',
            component: drugDetail,
            meta: {title: "药品分布", auth: true}
          },
          {path: '/detection/region', name: 'region', component: region, meta: {title: "区域分布", auth: true},},
          {path: '/detection/drugs', name: 'drugs', component: drugs, meta: {title: "药品分布", auth: true}},
          {path: '/detection/average', name: 'average', component: average, meta: {title: "次均费用", auth: true}},
          {path: '/detection/drugList', name: 'drugList', component: drugList, meta: {title: "抗肿瘤药物清单", auth: true}},
        ]
      },
      {
        path: '/basicdata',
        name: 'basicdata',
        redirect: '/basicdata/matching',
        component: basicdata,
        meta: {title: "基础数据管理", auth: true},
        children: [
          {path: '/basicdata/regional', name: 'regional', component: regional, meta: {title: "区域字典", auth: true}},
          {path: '/basicdata/institutional', name: 'institutional', component: institutional, meta: {title: "医疗机构字典", auth: true}},
          {path: '/basicdata/regionalDetil', name: 'regionalDetil', component: regionalDetil, meta: {title: "区域字典详情", auth: true}},
          {path: '/basicdata/regionalEdit', name: 'regionalEdit', component: regionalEdit, meta: {title: "区域字典编辑", auth: true}}
        ]
      },
      {
        path: '/dataDictionary', name: 'dataDictionary', component: dataDictionary, redirect: '/dataDictionary/matching', meta: {title: "数据字典管理", auth: true},
        children: [
          {path: '/dataDictionary/matching', name: 'matching', component: matching, meta: {title: "数据匹配", auth: true}},
          {path: '/dataDictionary/result', name: 'result', component: result, meta: {title: "匹配结果", auth: true}},
        ]
      },
      {
        path: '/organ', name: 'organ', component: organ, redirect: '/organ/material', meta: {title: "机构设置", auth: true},
        children: [
          {path: '/organ/material', name: 'material', component: material, meta: {title: "修改资料", auth: true}},
          {path: '/organ/password', name: 'password', component: password, meta: {title: "修改密码", auth: true}},
        ]
      },
      {
        path: '/system',
        name: 'system',
        redirect: '/system/mechanism',
        component: system,
        meta: {title: "系统管理", auth: true},
        children: [
          {path: '/system/mechanism', name: 'mechanism', component: mechanism, meta: {title: "机构管理", auth: true}},
          {
            path: '/system/mechanismAdd',
            name: 'mechanismAdd',
            component: mechanismAdd,
            meta: {title: "新增机构", auth: true}
          },
          {
            path: '/system/mechanismDetail',
            name: 'mechanismDetail',
            component: mechanismDetail,
            meta: {title: "机构详情", auth: true}
          },
          {path: '/system/consumer', name: 'consumer', component: consumer, meta: {title: "用户管理", auth: true}},
          {path: '/system/consumerAdd', name: 'consumerAdd', component: consumerAdd, meta: {title: "新增用户", auth: true}},
          {
            path: '/system/consumerDetail',
            name: 'consumerDetail',
            component: consumerDetail,
            meta: {title: "用户详情", auth: true}
          },
          {
            path: '/system/consumerEdit',
            name: 'consumerEdit',
            component: consumerEdit,
            meta: {title: "用户编辑", auth: true}
          },
          {path: '/system/role', name: 'role', component: role, meta: {title: "角色管理", auth: true}},
          {path: '/system/roleAdd', name: 'roleAdd', component: roleAdd, meta: {title: "新增角色", auth: true}},
          {path: '/system/roleDetail', name: 'roleDetail', component: roleDetail, meta: {title: "角色详情", auth: true}},
          {path: '/system/roleEdit', name: 'roleEdit', component: roleEdit, meta: {title: "角色编辑", auth: true}}
        ]
      },
      {path: '/help', name: 'help', component: help, meta: {title: "帮助中心", auth: true}},
    ]
  },


]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
//
// 路由开始之前的操作
router.beforeEach((to, from, next) => {
  let toName = to.name
  let is_login = store.state.user_info.login
  if (!is_login && toName !== 'login') {
    if(toName == 'firstLogin'){
      next({name:'firstLogin'})
    }else{
      next({
        name: 'login'
      })
    }
  } else if (is_login) {
    if (checkPageAuth(store.state.user_info.user.resource.pages, to.name)) {
      if (toName === 'login') {
        next({path: '/'})
      }
      next()
    } else {
      Message.error('对不起，您没有此页面的权限，请联系管理员')
    }
  } else {
    next()
  }
})

//路由完成之后的操作
router.afterEach(route => {

})

export default router
