<template>
  <div class="mechanism">
     <div class="mechanism-item basic-info">
       <div class="title">
         基本信息
       </div>
       <div>
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="角色名称:" prop="name">
             <el-input v-model="ruleForm.name" placeholder="请输入5-20个汉字" class="mechanism-input"></el-input>
           </el-form-item>
           <el-form-item label="角色描述:" prop="desc">
             <el-input
               type="textarea"
               :autosize="{ minRows: 4, maxRows: 16}"
               placeholder="请输入不少于50字的中文描述"
               v-model="ruleForm.desc">
             </el-input>
           </el-form-item>
           <div class="mechanism-item basic-info">
            <div class="title">
              功能权限
            </div>
            <div>
            </div>
          </div>
           <el-form-item label="选择权限:" prop="tree">
                 <el-tree
                  :data="data"
                  show-checkbox
                  node-key="uid"
                  :default-expanded-keys="[]"
                  :default-checked-keys="[]"
                  :props="defaultProps"
                  ref="tree"
                  @node-click="handleNodeClick">
                </el-tree> 
            </el-form-item>
         </el-form>
       </div>
     </div>
    <div class="button-group">
      <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </div>
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
          data: [],
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
          }
      }
    },
    async mounted(){
      //获取资源树
       const res = await this.$fetch.api_system.getRoleTree();
       if(res.code === "200"){
          this.data = res.result.child;
       }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            var flag = false;
            var treeList = this.$refs.tree.getCheckedKeys();//获取uid的数组
             //处理数据
             for(let i = 0;i<this.data.length;i++){
                if(this.data[i].child && this.data[i].child != null){
                  for(let j = 0 ;j<this.data[i].child.length;j++){
                      if(treeList.indexOf(this.data[i].child[j].uid) >=0 && treeList.indexOf(this.data[i].uid) < 0){
                        treeList.push(this.data[i].uid);
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
                         name:this.ruleForm.name,
                         desc:this.ruleForm.desc
                    },
                    resource:dataArray
                 }
                 // console.log(dataObj)
                 this.$fetch.api_system.addRole(dataObj).then((res) => {
                    if(res.code === "200"){
                      this.$router.push({
                        path:'/system/role'
                      })
                    }
                 })
             }
          }else{
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleNodeClick(data){
        //点击节点名字
        console.log(data)
      }
    }

  }
</script>
<style scoped>
 .mechanism-item{
   padding:20px;
   background: #ffffff;
   margin-bottom:20px;
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
</style>

