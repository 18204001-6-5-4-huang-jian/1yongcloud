
import fetch from 'common/fetch'

//地图数据
export function getMapData(data) {
  return fetch({
    url: '/odmapi/map/statistics/getMapData',
    method: 'post',
    data
  })
}

//地图下钻数据
export function findListData(data) {
  return fetch({
    url: '/odmapi/map/statistics/findListData',
    method: 'post',
    data
  })
}
//堆叠图
export function arrMoney(data) {
  return fetch({
    url: '/odmapi/histogram/statistical/area/money',
    method: 'post',
    data
  })
}
//查询药品柱状图
export function statisticalDrug(data) {
  return fetch({
    url: '/odmapi/histogram/statistical/drug',
    method: 'post',
    data
  })
}
//查询药品柱状图按年统计
export function byYear(data) {
  return fetch({
    url: '/odmapi/histogram/statistical/drug/byYear',
    method: 'post',
    data
  })
}
//查询药品柱状图按年统计
export function byMonth(data) {
  return fetch({
    url: '/odmapi/histogram/statistical/drug/byMonth',
    method: 'post',
    data
  })
}

//header中消息提醒
export function countyMeaasge(data) {
  return fetch({
    url: '/odmapi/meaasge/countyMeaasge',
    method: 'post',
    data
  })
}
