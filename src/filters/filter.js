/**
 * Created by Administrator on 2017/11/13.
 */
//性别
let sex = value => {
  if(value==1){
    return '男'
  }else if(value==2){
    return '女'
  }else {
    return null
  }

}
//性别
let uploadStatus = value => {
  if(value==0){
    return '未上报'
  }else if(value==1){
    return '已上报'
  }else {
    return null
  }

}
//性别
let fileSize = value => {
  if(value ){
    let size = (value/1024).toFixed(2)
    return size+' k'
  }else{
    return ''
  }

}
let strongState = value => {
  if(value==1){
    return '高'
  }else if(value==2){
    return '中'
  }else if(value==3){
    return '低'
  }else {
    return ''
  }

}
let toFixed = value => {
 if(value){
   var value = Number(value*100).toFixed(2)
 }
  return value +'%'

}
//时间格式化 年月日
let dateFormater = value => {
  if(value != '' && value != null && value != undefined){
    var value = new Date(value)
    return `${value.getFullYear()}年${value.getMonth()+1}月${value.getDate()}日`
  }
  return value
}
export {
  sex,
  strongState,
  dateFormater,
  uploadStatus,
  toFixed,
  fileSize
}
