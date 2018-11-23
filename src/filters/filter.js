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
let scope = value => {
  if(value==1){
    return '进口'
  }else if(value==2){
    return '国产'
  }else if(value==9){
    return '未知'
  }else {
    return value
  }

}
let dosageForm = value => {
  if(value== '01'){
    return '注射剂'
  }else if(value=='02'){
    return '片剂'
  }else if(value=='03'){
    return '原料药'
  }else if(value=='04'){
    return '胶囊剂'
  }else if(value=='05'){
    return '植入剂'
  }else if(value=='06'){
    return '注射液'
  }else if(value=='07'){
    return '注射剂(注射液)'
  }else if(value=='08'){
    return '口服溶液剂'
  }else if(value=='09'){
    return '酊剂'
  }else if(value=='10'){
    return '冻干粉针剂'
  }else if(value=='11'){
    return '口服乳剂'
  }else if(value=='12'){
    return '乳膏剂'
  }else if(value=='13'){
    return '口服溶液'
  }else if(value=='14'){
    return '乳剂'
  }else if(value=='15'){
    return '栓剂'
  }else if(value=='16'){
    return '注射剂(冻干)'
  }else if(value=='17'){
    return '注射剂(小容量注射剂)'
  }else if(value=='18'){
    return '靶向制剂'
  }else if(value=='19'){
    return '注射剂(冻干粉针剂)'
  }else if(value=='20'){
    return '注射剂(无菌分装粉针剂)'
  }else if(value=='21'){
    return '注射剂(冻干粉针)'
  }else if(value=='22'){
    return '注射剂(粉针剂)'
  }else if(value=='23'){
    return '片剂(薄膜衣片)'
  }else if(value=='24'){
    return '注射剂(注射用无菌粉末)'
  }else if(value=='25'){
    return '滴眼剂'
  }else if(value=='26'){
    return '眼用制剂'
  }else if(value=='27'){
    return '喷雾剂'
  }else if(value=='28'){
    return '软膏剂'
  }else if(value=='29'){
    return '注射溶液'
  }else if(value=='30'){
    return '泡腾片'
  }else if(value=='31'){
    return '凝胶剂'
  }else if(value=='32'){
    return '注射剂(无菌粉末)'
  }else if(value=='33'){
    return '片剂(糖衣片)'
  }else if(value=='34'){
    return '片剂(糖衣)'
  }else {
    return value
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
  fileSize,
  dosageForm,
  scope
}
