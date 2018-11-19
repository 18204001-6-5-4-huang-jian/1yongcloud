
import fetch from 'common/fetch'
//获取机构列表
export const getOrganizationList = function(data) {
  return fetch({
        url:'/odmapi/find/dept',
        method:'post',
        data
  })
}

//新增机构
export const addOrganization = function(data){
	return fetch({
        url:'/odmapi/add/dept',
        method:'post',
        data
  })
}

//获取省 市 区 三级联动
export const getLinkageList = function(data){
  return fetch({
     url:`/odmapi/resource/getResource/${data}`,
     method:'post'
  })
}


//获取组织机构代码下拉提示
export const getHospitalCode = function(data){
   return fetch({
      url:'/odmapi/find/hospitalCode/byDeptName',
      method:"post",
      data
   })
}

//获取机构的隶属机构树  没有参数
export const getOrganizationTree = function(){
    return fetch({
      url:'/odmapi/dept/getDeptTree',
      method:'post'
    })
}

//获取机构信息
export const getOrganizationInfo = function(data){
    return fetch({
      url:'/odmapi/find/deptById',
      method:'post',
      data
    })
}

//修改机构
export const updateOrganization = function(data){
	return fetch({
        url:'/odmapi/update/dept',
        method:'post',
        data
  })
}

//获取用户列表
export const getUserList = function(data){
   return fetch({
    url:'/odmapi/find/user',
    method:'post',
    data
   })
}

//新增用户
export const addUser = function(data){
  return fetch({
    url:'/odmapi/add/user',
    method:'post',
    data
   })
}

//获取<新增用户>所属机构下拉list
export const　roleDropdownList = function(data){
  return fetch({
    url:'/odmapi/find/dept',
    method:'post',
    data
  })
}

//查看用户
export const getUserInfo = function(data){
   return fetch({
     url:'/odmapi/find/userById',
     method:'post',
     data
   })
}

//修改用户
export const updateUser = function(data){
  return fetch({
    url:'/odmapi/update/user',
    method:'post',
    data
   })
}

//查看角色列表
export const getRoleList = function(data){
  return fetch({
    url:'/odmapi/find/role',
    method:'post',
    data
   })
}

//新增角色
export const addRole = function(data){
  return fetch({
    url:'/odmapi/add/role',
    method:'post',
    data
   })
}

//获取<新增角色> 资源树
export const getRoleTree = function(){
  return fetch({
    url:'/odmapi/menu/getResource',
    method:'post'
  })
}

//修改角色
export const updateRole = function(data){
   return fetch({
     url:'/odmapi/update/role',
     method:'post',
     data
   })
}

//查看角色
export const getRoleInfo = function(data){
  return fetch({
    url:'/odmapi/find/roleById',
    method:'post',
    data
   })
}

