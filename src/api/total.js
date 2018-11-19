
import fetch from 'common/fetch'

//查看数据
export function hosList(data) {
  return fetch({
    url: '/odmapi/batch/hos/list',
    method: 'post',
    data
  })
}


