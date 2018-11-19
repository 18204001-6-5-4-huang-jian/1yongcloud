
import fetch from 'common/fetch'

//查询药品接口
export function queryDeptDrugibrary(data) {
  return fetch({
    url: '/odmapi/medicine/queryDeptDrugibrary',
    method: 'post',
    data
  })
}
//查询标准药品接口
export function queryLikeSysDrugibrary(data) {
  return fetch({
    url: '/odmapi/medicine/queryLikeSysDrugibrary',
    method: 'post',
    data
  })
}

//匹配药品信息
export function matchingMedicine(data) {
  return fetch({
    url: '/odmapi/medicine/matchingMedicine',
    method: 'post',
    data
  })
}
//匹配结果
export function queryMatchingDeptDrugibrary(data) {
  return fetch({
    url: '/odmapi/medicine/queryMatchingDeptDrugibrary',
    method: 'post',
    data
  })
}
//导出数据
export function excelDrugResult(data) {
  return fetch({
    url: '/odmapi/excel/excelDrugResult',
    method: 'post',
    responseType: 'blob',
    data
  })
}
//未匹配个数
export function queryCountDeptDrugibrary(data) {
  return fetch({
    url: '/odmapi/medicine/queryCountDeptDrugibrary',
    method: 'post',
    data
  })
}
//取消匹配
export function deleteMatchingMedicine(data) {
  return fetch({
    url: '/odmapi/medicine/deleteMatchingMedicine',
    method: 'post',
    data
  })
}
//移除药品
export function deleteMedicine(data) {
  return fetch({
    url: '/odmapi/medicine/deleteMedicine',
    method: 'post',
    data
  })
}



//区域字典
//获取区域字典list
export const getRegionalList = function(data){
   return fetch({
     url:'/odmapi/find/areaDictionary',
     method:'post',
     data
   })
}

//根据uid查询区域字典
export const getRegionalInfo = function(data){
   return fetch({
     url:'/odmapi/find/areaById',
     method:'post',
     data
   })
}

//修改区域字典
export const updateRegional = function(data){
  return fetch({
    url:'/odmapi/update/area',
    method:'post',
    data
  })
}

//添加区域字典
export const addAreaRegional = function(data){
  return fetch({
    url:'/odmapi/add/area',
    method:'post',
    data
  })
}

//添加区域查询省市Tree
export const addAreaTree = function(data){
  return fetch({
    url:'/odmapi/find/cityTree',
    method:'post',
    data
  })
}