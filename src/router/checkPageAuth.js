/**
 * Created by parti on 2018/11/12.
 */



export default function checkPageAuth(data,name){
  let state = true
  data.filter(item=>{
    if(item == name){
      console.log(item,name)
     state = true
    }
  })
  return state
}
