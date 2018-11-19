
import fetch from 'common/fetch'

//查看上报数据接口
export function batchList(data) {
  return fetch({
    url: '/odmapi/batch/list',
    method: 'post',
    data
  })
}


//上报数据列表查询
export function uploadList(data) {
  return fetch({
    url: '/odmapi/batch/task/upload/list',
    method: 'post',
    data
  })
}
//上报数据列表查询
export function taskList(data) {
  return fetch({
    url: '/odmapi/batch/task/list',
    method: 'post',
    data
  })
}
//批量上传文件
export function files(data) {
  return fetch({
    url: '/odmapi/batch/task/upload/files',
    method: 'post',
    contentType:' form-data',
    data
  })
}
//查看详情中按行分析结果
export function resultRow(data) {
  return fetch({
    url: '/odmapi/batch/task/result/row',
    method: 'post',
    data
  })
}
//查看详情中按行分析结果
export function resultField(data) {
  return fetch({
    url: '/odmapi/batch/task/result/field',
    method: 'post',
    data
  })
}
//查看详情中按行分析结果
export function resultFile(data) {
  return fetch({
    url: '/odmapi/batch/task/result/file',
    method: 'post',
    data
  })
}
//查看行结果具体错误信息
export function rowFields(data) {
  return fetch({
    url: '/odmapi/batch/task/result/row/fields',
    method: 'post',
    data
  })
}
//查看行结果具体错误信息
export function taskInfo(data) {
  return fetch({
    url: '/odmapi/batch/task/info',
    method: 'post',
    data
  })
}
