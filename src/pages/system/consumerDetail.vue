<template>
  <div class="mechanism">
    <el-form :model="ruleForm" :rules="ruleDefault" ref="ruleForm" label-width="120px" class="demo-ruleForm">
     <div class="mechanism-item basic-info">
       <div class="title">
             基本信息
       </div>
       <div class="info">
           <el-form-item label="用户编码:" prop="code">
              {{ruleForm.code}}
             <!-- <el-input v-model="ruleForm.code" ref="code"  class="mechanism-input"></el-input> -->
           </el-form-item>
           <el-form-item label="用户名称:" prop="loginName">
             {{ruleForm.loginName}}
             <!-- <el-input v-model="ruleForm.loginName"  class="mechanism-input"></el-input> -->
           </el-form-item>
           <el-form-item label="手机号码:"  prop="phone">
             {{ruleForm.phone}}
             <!-- <el-input v-model="ruleForm.phone"  class="mechanism-input"></el-input> -->
          </el-form-item>
           <el-form-item label="办公邮箱:"  prop="email">
             {{ruleForm.email}}
             <!-- <el-input v-model="ruleForm.email"  class="mechanism-input"></el-input> -->
          </el-form-item>
           <el-form-item label="办公座机:"  prop="tel">
             {{ruleForm.tel}}
             <!-- <el-input v-model="ruleForm.tel"  class="mechanism-input"></el-input> -->
          </el-form-item>
       </div>
     </div>
    <div class="mechanism-item basic-info">
      <div class="title">
             用户角色
      </div>
      <div class="info">
          <el-form-item label="所属机构类型:" prop="deptType">
            {{ruleForm.deptType == 1?"管理机构":"医疗机构"}}
				    <!-- <el-radio-group v-model="ruleForm.deptType">
				      <el-radio label="1">管理机构</el-radio>
				      <el-radio label="2">医疗机构</el-radio>
				    </el-radio-group> -->
				  </el-form-item>
          <el-form-item label="所属机构名称:" prop="deptId" >
            {{ruleForm.deptId}}
					    <!-- <el-autocomplete
					      class="inline-input"
					      v-model="ruleForm.deptId"
					      placeholder="请输入所属机构名称"
					      :trigger-on-focus="false"
					    ></el-autocomplete> -->
          </el-form-item>
          <el-form-item label="所属机构角色:" prop="roleId">
            {{ruleForm.roleId}}
			    <!-- <el-radio-group v-model="ruleForm.roleId">
				    <el-radio
				      	v-for="item in options"
				      	:label="item.name"
				      	:value="item.name"
                :key="item.uid"
				      	></el-radio>
				    </el-radio-group> -->
			  </el-form-item>
      </div>
    </div>
    <div class="button-group">
      <el-button @click="pushConsumerEdit()">编辑</el-button>
      <el-button type="primary" @click="pushReturn()">返回</el-button>
    </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        ruleForm: {
           code:'',
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
        ruleDefault:{},
        rules:{
        	  code:[
        	      {required: true, message: '请输入用户编码', trigger: 'change' }
        	  ],
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
                this.ruleForm.code = res.result.userPO.code;
                this.ruleForm.loginName = res.result.userPO.loginName;
                this.ruleForm.phone = res.result.userPO.phone;
                this.ruleForm.email = res.result.userPO.email;
                this.ruleForm.tel = res.result.userPO.tel;
                this.ruleForm.deptType = res.result.userRole.deptType;
                this.ruleForm.deptId = res.result.userRole.deptId;
                roleId = res.result.userRole.roleId;//所属机构角色
                this.userRoleUid = res.result.userRole.uid;
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
       pushConsumerEdit(){
         this.$router.push({
           path:'/system/consumerEdit',
           query:{
             uid:this.$route.query.uid
           }
         })
       },
       pushReturn(){
         this.$router.push({
           path:'/system/consumer'
         })
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
  .mechanism .title{
    color: #0084FE;
  }
 .info{
   /* border:1px solid #e5e5e5; */
   margin-top: 20px;
   padding-top:10px
 }
  .mechanism-input{
    width:400px;
  }
  .button-group{
    text-align: right;
  }
</style>

