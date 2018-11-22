<template>
  <div class="mechanism">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
     <div class="mechanism-item basic-info">
       <div class="title">
             基本信息
       </div>
       <div class="info">
           <el-form-item label="用户名称:" prop="loginName">
             <el-input v-model="ruleForm.loginName"  class="mechanism-input"></el-input>
           </el-form-item>
           <el-form-item label="手机号码:"  prop="phone">
             <el-input v-model="ruleForm.phone"  class="mechanism-input"></el-input>
          </el-form-item>
           <el-form-item label="办公邮箱:"  prop="email">
             <el-input v-model="ruleForm.email"  class="mechanism-input"></el-input>
          </el-form-item>
              <el-form-item label="办公座机:">
             <el-input v-model="ruleForm.tel"  class="mechanism-input"></el-input>
          </el-form-item>
       </div>
     </div>
    <div class="mechanism-item basic-info">
      <div class="title">
             用户角色
      </div>
      <div class="info">
          <el-form-item label="所属机构类型:" prop="deptType">
				    <el-radio-group v-model="ruleForm.deptType"  @change="changeDeptType($event)">
				      <el-radio :label="1" value="1">管理机构</el-radio>
				      <el-radio :label="2" value="2">医疗机构</el-radio>
				    </el-radio-group>
				  </el-form-item>
          <el-form-item label="所属机构名称:" prop="deptId" >
					    <el-autocomplete
					      class="inline-input"
					      v-model="ruleForm.deptId"
					      :fetch-suggestions="querySearch"
					      placeholder="请输入所属机构名称"
					      :trigger-on-focus="false"
                @select="handleSelect"
					    ></el-autocomplete>
          </el-form-item>
          <el-form-item label="所属机构角色:" prop="roleId" class="consumer-role">
			    <el-radio-group v-model="ruleForm.roleId" >
				    <el-radio
				      	v-for="item in options"
				      	:label="item.name"
				      	:value="item.name"
                :key="item.uid"
                class="role-radio"
				      	></el-radio>
				    </el-radio-group>
			  </el-form-item>
      </div>
    </div>
    <div class="button-group">
      <el-button @click="submitForm('ruleForm')">确定</el-button>
      <el-button type="primary" @click="returnConsumerDetail()">返回</el-button>
    </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        ruleForm: {
           loginName:'',
           phone:'',
           email:'',
           tel:'',
           deptType:'',
           deptId:'',
           roleId:""
        },
        options:[],//机构角色
        restaurants:[],//自动完成数组
        rules:{
        	  loginName:[
        	      {required: true, message: '请输入用户名称', trigger: 'change' }
        	  ],
        	  phone:[
        	      {required: true, message: '请输入手机号码', trigger: 'change' }
        	  ],
        	  email:[
        	      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        	  ],
        	  tel:[
        	      {required: true, message: '请输入办公座机', trigger: 'change' }
        	  ],
        	  deptType: [
                {required: true, message: '请选择所属机构类型', trigger: 'change' }
            ],
            deptId:[
        	      {required: true, message: '请选择所属机构名称', trigger: 'change' }
        	  ],
        	  roleId:[
        	      {required: true, message: '请选择所属机构角色', trigger: 'change' }
        	  ]
        },
        readonlyStatus:true,
        disabledStatus:true,
        userRoleUid:''
      }
    },
     mounted(){
         	//获取所属机构角色list
     	    this.$fetch.api_system.getRoleList({}).then((res)=>{
     	    	   if(res.code === '200'){
     	    	   	  this.options = res.result;
     	    	   }
           })
           var roleId = '';
           this.$fetch.api_system.getUserInfo({uid:this.$route.query.uid}).then((res)=>{
               if(res.code === "200"){
                //获取用户详情信息展示
                this.ruleForm.loginName = res.result.userPO.loginName;
                this.ruleForm.phone = res.result.userPO.phone;
                this.ruleForm.email = res.result.userPO.email;
                this.ruleForm.tel = res.result.userPO.tel;
                this.ruleForm.deptType = res.result.userRole.deptType;
                this.ruleForm.deptId = res.result.userRole.deptId;
                roleId = res.result.userRole.roleId;//所属机构角色
                this.userRoleUid = res.result.userRole.uid;//用于编辑接口
               }
               //展示机构角色
               for(let i in this.options){
                 if(roleId == this.options[i].uid){
                    this.ruleForm.roleId = this.options[i].name;//所属机构角色
                 }
               }
                //获取所属机构
                const obj = {
                      deptName:this.ruleForm.deptId,
                      deptType:this.ruleForm.deptType,
                      pageNum:1,
                      pageSize:20
                }
                this.$fetch.api_system.roleDropdownList(obj).then((res)=>{
                    this.restaurants = res.result.list;
                })
           })
    },
    methods:{
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
                var roleId = "";
                var deptId = "";
                //获取机构角色uid
		            for(let i in this.options){
		            	if(this.options[i].name == this.ruleForm.roleId){
		                   roleId = this.options[i].uid;
		            	}
                }
               //获取机构角名称deptId
                for(let i in this.restaurants){
                   if(this.restaurants[i].deptName == this.ruleForm.deptId){
                       deptId = this.restaurants[i].deptId;
                   }
                }
                if(deptId == ''){
                    this.$message({
                                  type:'warning',
                                  message:'您提交的所属机构名称在系统中不存在,请重新输入'
                                 })
                }else{
                    const dataObj = {
                        userRole: {
                          roleId: roleId,
                          deptId: deptId,
                          deptType: this.ruleForm.deptType,
                          uid:this.userRoleUid
                        },
                        userPO: {
                          loginName: this.ruleForm.loginName,
                          pwd: this.ruleForm.pwd,
                          email: this.ruleForm.email,
                          tel: this.ruleForm.tel,
                          phone: this.ruleForm.phone,
                          uid:this.$route.query.uid
                        }
                      }
                  this.$fetch.api_system.updateUser(dataObj).then((res) => {
                  if (res.code === "200") {
                    this.$router.push({
                      path: '/system/consumer'
                    })
                  } else {
                    this.$message({
                      type: 'warning',
                      showClose: true,
                      message: '请求失败，请重新输入'
                    })
                  }
                })
                }
          } else {
            return false;
          }
        });
      },
      querySearch(queryString, cb) {
      	//请求数据下拉数据
      	const obj = {
      		   deptName:queryString,
      		   deptType:this.ruleForm.deptType,
      		   pageNum:1,
      		   pageSize:20
        }
      	this.$fetch.api_system.roleDropdownList(obj).then((res)=>{
             this.restaurants = res.result.list;
             if (this.restaurants.length == 0) {
                //  this.$message({
                //     type:'warning',
                //     showClose:true,
                //     message:'您输入的所属机构名称在系统中不存在,请重新输入'
                //  })
             }else{
               this.restaurants.filter(item => {
      		   	   item.value = item.deptName
              })
              cb(this.restaurants);
             }
          })
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.deptName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
     returnConsumerDetail(){
         this.$router.push({
           path:'/system/consumerDetail',
           query:{
             uid:this.$route.query.uid
           }
         })
     },
     handleSelect(item){
       console.log(item);
     },
      changeDeptType(e){
        // console.log(e)
        //切换机构类型，清空机构名称
        this.ruleForm.deptId = '';
      }
    }
  }
</script>
<style scoped>
 .mechanism-item{
   padding:20px;
   background: #ffffff;
   margin-bottom:20px;
   border-radius: 4px;
 }
 .info{
   /* border:1px solid #e5e5e5; */
   margin-top: 20px;
   padding-top:10px
 }
  .mechanism .title{
    color: #0084FE;
  }
  .mechanism-input{
    width:400px;
  }
  .button-group{
    text-align: right;
  }
  .role-radio {
    width: 300px;
    line-height: 20px;
  }
</style>
<style>
  .consumer-role .el-radio + .el-radio {
    margin-left:0px;
  }
</style>
