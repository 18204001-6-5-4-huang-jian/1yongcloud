<template>
  <div class="regional-detail-container">
    <el-form :model="ruleForm" :rules="ruleDefault" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="区域名称" prop="name">
        <el-input v-model="ruleForm.name" style="width:200px;" ref="name"></el-input>
      </el-form-item>
      <el-form-item label="区域编码" prop="code">
        <el-input v-model="ruleForm.code" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="包含省，市" prop="tree">
        <el-tree
          :data="data"
          show-checkbox
          node-key="code"
          :default-checked-keys="defaultList"
          :props="defaultProps"
          ref="tree"
        >
        </el-tree>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 16}"
          placeholder="请输入不少于50字的中文描述"
          v-model="ruleForm.remark">
        </el-input>
      </el-form-item>
      <el-form-item style="text-align:right;padding-right:10px;">
        <el-button @click="submitForm('ruleForm')">确定</el-button>
         <el-button type="primary" @click="returnDetail">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        readonlyStatus: true,
        ruleForm: {
          name: '',
          code: '',
          remark: '',
          deptPid: []
        },
        ruleDefault: {},
        rules: {
          name: [
            {required: true, message: '请输入区域名称', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入区域编码', trigger: 'blur'}
          ]
        },
        data: [],
        defaultList: [],
        defaultProps: {
          children: 'child',
          label: 'name'
        },
      }
    },
    async mounted(){
      const res = await this.$fetch.api_basicData.getRegionalInfo({uid: this.$route.query.uid});
      if (res.code === "200") {
        this.ruleForm.name = res.result.SysAreaDictionary.name;
        this.ruleForm.code = res.result.SysAreaDictionary.code;
        this.ruleForm.remark = res.result.SysAreaDictionary.remark;
        this.data = res.result.city.child;//级联选择器list
        this.defaultList = res.result.SysAreaDictionary.subordinate.split(',');
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            //数据处理
            const treeList = this.$refs.tree.getCheckedKeys();
            for (let i = 0; i < this.data.length; i++) {
              if (this.data[i].child && this.data[i].child != null) {
                for (let j = 0; j < this.data[i].child.length; j++) {
                  //console.log(this.data[i].child[j].code);//子
                  //console.log(this.data[i].code)//父
                  if (treeList.indexOf(this.data[i].child[j].code) >= 0 && treeList.indexOf(this.data[i].code) < 0) {
                    treeList.push(this.data[i].code);
                  }
                }
              }
            }
            // console.log(treeList);
            const dataObj = {
              uid: this.$route.query.uid,
              name: this.ruleForm.name,
              code: this.ruleForm.code,
              remark: this.ruleForm.remark,
              subordinate: treeList.join(',')//获取code的数组
            }
            const res = await this.$fetch.api_basicData.updateRegional(dataObj);
            if (res.code === "200") {
              this.$router.push({
                path: '/basicdata/regional'
              })
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                message: '对不起，编辑失败'
              })
            }
          } else {
            return false;
          }
        });
      },
      returnDetail(){
         this.$router.push({
           path:'/basicdata/regionalDetil',
           query:{
             uid:this.$route.query.uid
           }
         })
      }
    }
  }
</script>
<style scoped>
  .regional-detail-container {
    background: #ffffff;
    border-radius: 4px;
    padding: 20px 0;
  }
</style>


