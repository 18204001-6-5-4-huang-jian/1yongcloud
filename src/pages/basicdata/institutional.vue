<template>
  <div class="regional">
    <div class="search">
      <el-form :model="form" :rules="rules" ref="form" labelWidth="100px" class="demo-ruleForm" :inline="true">
         <el-form-item
          label="机构名称"
          prop="deptName"
        >
          <el-input v-model="form.deptName" placeholder="请输入机构名称" size="small"></el-input>
        </el-form-item>
        <el-form-item
          label="机构类型"
          prop="deptType"
        >
          <el-select v-model="form.deptType" placeholder="请选择机构类型" style="width:180px" size="small">
            <el-option
              v-for="item in $store.state.mechanismType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="机构等级"
          prop="countryType"
        >
          <el-select v-model="form.countryType" placeholder="请选择机构等级" style="width:180px" size="small">
            <el-option
              v-for="item in $store.state.mechanismLv"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" size="small">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="machanism-table">
      <div class="button-group" style="text-align:right">
        <router-link to="">
          <el-button type="primary" size="small" @click="addArea">添加区域</el-button>
        </router-link>
      </div> -->
      <el-table
        :data="queryResult.list"
        border
        style="width:100%">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="区域名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="code"
          label="编码">
        </el-table-column>
        <el-table-column
          prop="subordinate"
          label="包含省、市">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleRead(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top:10px;text-align:right;">
        <el-pagination
          small
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
          :current-page="queryResult.pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="queryResult.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryResult.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        //查询结果
        queryResult: {
          pageNum: 1,//当前页
          pageSize: 18,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
        form: {
          deptName: '',
          deptType: '',
          countryType: '',
          pageSize: 10,
          pageNum: 1
        },
        provinceList:[],
        cityList:[],
        rules: {
          deptName: [
            {required: true, message: '请输入机构名称', trigger: 'change'}
          ],
          deptType: [
            {required: true, message: '请选择机构类型', trigger: 'change'}
          ],
          countryType: [
            {required: true, message: '请选择机构等级', trigger: 'change'}
          ]
        }
      }
    },
    async mounted(){
      //获取列表数据
      const listData = await this.$fetch.api_basicData.getRegionalList({});
      if(listData.code === "200"){
        this.queryResult = listData.result;
      }
      //请求省份list
       const res = await this.$fetch.api_system.getLinkageList('000000');
       if(res.code === "200"){
         this.provinceList = res.result;
       }
    },
    methods: {
      async query(){
        //分页请求数据
        const res = await this.$fetch.api_basicData.getRegionalList(this.form);
        if(res.code === "200"){
          this.queryResult = listData.result;
        }else{
          this.$message({
             type:'error',
             showClose:true,
             message:'请求失败'
          })
        }
      },
      pageSizeChange(pageSize) {
        this.form.pageSize = pageSize;
        this.query()
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.form.pageNum = currentPage;
        this.query()
      },
      handleRead(row){
        
      },
      submitForm(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            //请求数据
            const res = await this.$fetch.api_basicData.getRegionalList(this.form);
            if(res.code === "200"){
              this.queryResult = res.result;
            }else{
              this.$message({
                type:'error',
                showClose:true,
                message:'查询失败'
              })
            }
          } else {
            return false;
          }
        });
      },
      async getCityList(e){
         const res = await this.$fetch.api_system.getLinkageList(e);
         if(res.code === "200"){
            this.cityList = res.result;
         }
      },
      addArea(){
        this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
          dangerouslyUseHTMLString: true
        });
      }
    }

  }
</script>

<style scoped>
  .regional .el-button--text{
    background: #0084FE;
    padding: 10px 15px;
    border-radius: 5px;
    color: #ffffff;
  }
</style>


