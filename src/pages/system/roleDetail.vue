<template>
  <div class="mechanism">
    <el-form :model="ruleForm" :rules="ruleDefault" ref="ruleForm" label-width="100px" class="demo-ruleForm">
     <div class="mechanism-item basic-info">
       <div class="title">
         基本信息
       </div>
       <div class="info">
           <el-form-item label="角色名称:" prop="name">
             {{ruleForm.name}}
             <!-- <el-input v-model="ruleForm.name" placeholder="请输入5-20个汉字" ref="name" class="mechanism-input" ></el-input> -->
           </el-form-item>
           <el-form-item label="角色描述:" prop="desc">
             {{ruleForm.desc}}
             <!-- <el-input
               type="textarea"
               :autosize="{ minRows: 4, maxRows: 16}"
               placeholder="请输入不少于50字的中文描述"
               v-model="ruleForm.desc">
             </el-input> -->
           </el-form-item>
       </div>
     </div>
      <div class="mechanism-item basic-info">
        <div class="title">
          功能权限
        </div>
        <div class="info">
          <el-form-item label="选择权限" prop="tree">
            <el-tree
              ref="tree"
              :data="treeData"
              show-checkbox
              node-key="uid"
              :default-expanded-keys="[]"
              :default-checked-keys="checkList"
              :props="defaultProps"
              :expand-on-click-node="false"
            >
            </el-tree>
          </el-form-item>
        </div>
      </div>
    <div class="button-group">
      <el-button @click="pushRoleEdit">编辑</el-button>
      <el-button type="primary" @click="pushReturn">返回</el-button>
    </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
           ruleForm: {
            name:'',
            desc:'',
            tree:''
            },
            defaultProps: {
              children: 'child',
              label: 'name',
             disabled:true,
            },
            ruleDefault:{},
            treeData: [],
            checkList:[]
      }
    },
    async mounted(){
       const res = await this.$fetch.api_system.getRoleInfo({uid:this.$route.query.uid});
       if(res.code === "200"){
          //数据显示
          this.ruleForm.name = res.result.role.name;
          this.ruleForm.desc = res.result.role.desc;
          this.treeData = res.result.menu;
          //展示节点

          const list = res.result.menuIds;
          const treeList = res.result.menu[0].child;
          let newArr = [];
          for(let i =0;i<list.length;i++){
              for(let j =0;j<treeList.length;j++){
                  if(treeList[j].child &&list[i].menuId == treeList[j].uid ){
                    newArr.push(i);
                  }
              }
          }
          for(let i =0;i<list.length;i++){
              if(newArr.indexOf(i) == -1 && list[i].menuId!= 100){
                  this.checkList.push(list[i].menuId)
              }
          }
       }
    },
    methods: {
      pushReturn(){
         this.$router.push({
             path:"/system/role"
         })
      },
      pushRoleEdit(){
        this.$router.push({
          path:"/system/roleEdit",
          query:{
            uid:this.$route.query.uid
          }
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
  .mechanism-input{
    width:400px;
  }
  .button-group{
    text-align: right;
  }
 .info{
   /* border:1px solid #e5e5e5; */
   margin-top: 20px;
   padding-top:10px
 }
</style>
