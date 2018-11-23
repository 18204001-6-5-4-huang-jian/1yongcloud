<template>
  <div class="mechanism">
    <el-form :model="ruleForm" :rules="ruleDefault" ref="ruleForm" label-width="120px" class="demo-ruleForm">
     <div class="mechanism-item basic-info">
       <div class="title">
             基本信息
       </div>
       <div class="info">
           <el-form-item label="用户名称:">
             {{ruleForm.loginName}}
           </el-form-item>
           <el-form-item label="手机号码:">
             {{ruleForm.phone}}
          </el-form-item>
           <el-form-item label="办公邮箱:">
             {{ruleForm.email}}
          </el-form-item>
           <el-form-item label="办公座机:">
             {{ruleForm.tel}}
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
				  </el-form-item>
          <el-form-item label="所属机构名称:" prop="deptId" >
            {{ruleForm.deptId}}
          </el-form-item>
          <el-form-item label="所属机构角色:" prop="roleId">
            {{ruleForm.roleId}}
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
           loginName:'',
           phone:'',
           email:'',
           tel:'',
           deptType:'',
           deptId:'',
           roleId:''
        },
        options:[],//机构角色
        ruleDefault:{},
      }
    },
     mounted(){
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
               }
             //获取所属机构角色list
             this.$fetch.api_system.getRoleList({}).then((res)=>{
               if(res.code === '200'){
                 this.options = res.result;
                 //展示机构角色
                 for(let i in this.options){
                   if(roleId == this.options[i].uid){
                     this.ruleForm.roleId = this.options[i].name;//所属机构角色
                   }
                 }
               }
             })

                //获取所属机构
                // const obj = {
                //       deptName:this.ruleForm.deptId,
                //       deptType:this.ruleForm.deptType,
                //       pageNum:1,
                //       pageSize:20
                // }
                // this.$fetch.api_system.roleDropdownList(obj).then((res)=>{
                //     this.restaurants = res.result.list;
                // })
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

