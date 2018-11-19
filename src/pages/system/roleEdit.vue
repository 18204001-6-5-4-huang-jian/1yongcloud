<template>
  <div class="mechanism">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
     <div class="mechanism-item basic-info">
       <div class="title">
         基本信息
       </div>
       <div class="info">

           <el-form-item label="角色名称" prop="name">
             <el-input v-model="ruleForm.name" placeholder="请输入5-20个汉字" ref="name" class="mechanism-input"></el-input>
           </el-form-item>
           <el-form-item label="角色描述" prop="desc">
             <el-input
               type="textarea"
               :autosize="{ minRows: 4, maxRows: 16}"
               placeholder="请输入不少于50字的中文描述"
               v-model="ruleForm.desc">
             </el-input>
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
      <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      <el-button @click="returnRoleDetail">返回</el-button>
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
              label: 'name'
            },
           rules: {
              name: [
                { required: true, message: '请输入角色名称', trigger: 'blur' },
                { required: true, message: '请输入角色名称', trigger: 'change' },
                { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' },
                { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'change' }
              ],
              desc: [
                  { required: true, message: '请输入角色描述', trigger: 'blur' },
                  { required: true, message: '请输入角色描述', trigger: 'blur' },
                  { min: 50, max: 1000, message: '请输入不少于50字的中文描述', trigger: 'blur' },
                  { min: 50, max: 1000, message: '请输入不少于50字的中文描述', trigger: 'change' }
                ]
            },
            treeData: [],
            checkList:[],
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             var flag = false;
             var treeList = this.$refs.tree.getCheckedKeys();//获取uid的数组
             //处理数据
            //const _data = this.treeData[0].child;
             const _data = this.treeData;
             for(let i=0;i<_data.length;i++){
                if(_data[i].child && _data[i].child != null){
                  for(let j=0;j<_data[i].child.length;j++){
                     if(treeList.indexOf(_data[i].child[j].uid)>=0 && treeList.indexOf(_data[i].uid) < 0){
                       treeList.push(_data[i].uid);
                     }
                  }
                }
             }
             var dataArray = [{menuId:'100'}];
             for(let i in treeList){
                   dataArray.push({menuId:treeList[i]})
             }
             flag = true;
             if(flag){
                 const dataObj = {
                    sysRolePO:{
                         uid:this.$route.query.uid,
                         name:this.ruleForm.name,
                         desc:this.ruleForm.desc
                    },
                    resource:dataArray
                 }
                 this.$fetch.api_system.updateRole(dataObj).then((res) => {
                    if(res.code === "200"){
                      this.$router.push({
                        path:'/system/role'
                      })
                    }
                 })
             }
          } else {
            return false;
          }
        });
      },
     returnRoleDetail(){
       //返回用户详情
       this.$router.push({
          path:'/system/roleDetail',
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
