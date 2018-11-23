<template>
  <div class="regional-detail-container">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="区域名称:" prop="name">
        {{ruleForm.name}}
      </el-form-item>
      <el-form-item label="区域编码:" prop="code">
        {{ruleForm.code}}
      </el-form-item>
      <el-form-item label="包含省，市:" prop="tree">
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
      <el-form-item label="备注:">
        {{ruleForm.remark}}
      </el-form-item>
      <el-form-item style="text-align:right;padding-right:10px;">
        <el-button type="primary" @click="pushEdit()">编辑</el-button>
        <el-button @click="returnRegional">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        ruleForm: {
          name: '',
          code: '',
          remark: '',
          deptPid: []
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
      pushEdit(){
        this.$router.push({
          path: '/basicdata/regionalEdit',
          query: {
            uid: this.$route.query.uid
          }
        })
      },
      returnRegional(){
        this.$router.push({
          path: '/basicdata/regional'
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


