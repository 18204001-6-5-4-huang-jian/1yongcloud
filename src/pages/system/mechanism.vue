<template>
  <div class="mechanism">
    <div class="search">
      <el-form :model="form" :rules="rules" ref="form" labelWidth="100px" class="demo-ruleForm" :inline="true">
        <el-form-item
          label="机构名称"
        >
          <el-input v-model="form.deptName" placeholder="请输入机构名称" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="机构类型"
        >
          <el-select v-model="form.deptType" placeholder="请选择" style="width:200px" clearable :size="$store.state.size">
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
        >
          <el-select v-model="form.countryType" placeholder="请选择" style="width:200px" clearable :size="$store.state.size">
            <el-option
              v-for="item in $store.state.mechanismLv"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="医院类型"
        >
          <el-select v-model="form.hospitalType" placeholder="请选择" style="width:200px" clearable :size="$store.state.size">
            <el-option
              v-for="item in $store.state.hospitalType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="医院等级"
        >
          <el-select v-model="form.hospitalGrade" placeholder="请选择" style="width:200px" clearable :size="$store.state.size">
            <el-option
              v-for="item in $store.state.hospitalLv"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" :size="$store.state.size">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-container">
        <router-link :to="{path:'/system/mechanismAdd',query:{type:1}}">
          <el-button type="primary" :size="$store.state.size">新增</el-button>
        </router-link>
      <el-table
        v-loading="loading"
        :data="queryResult.list"
        border
        :size="$store.state.size"
        style="width:100%;margin-top: 10px;">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="机构名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="deptCode"
          label="机构编码">
        </el-table-column>
        <el-table-column
          label="机构类型">
          <template slot-scope="scope">
             <span style="margin-left:10px">{{ scope.row.deptType == '1'?'管理类型':'医疗机构' }}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="subjectionInstitutionName"
          label="隶属机构">
        </el-table-column>
        <el-table-column
          prop="deptTel"
          label="机构联系电话">
        </el-table-column>
        <el-table-column
          prop="deptAddress"
          label="机构地址">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" :size="$store.state.size" @click="handleRead(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top: 10px">
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
    async mounted(){
      //默认请求数据
      try {
        const res = await this.$fetch.api_system.getOrganizationList({});
        if (res.code === '200') {
          this.queryResult = res.result;
          this.loading = false;
        } else {
          this.$message({
            showClose: true,
            type: 'error',
            message: '请求机构列表失败',
          })
        }
      } catch (error) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '请求机构列表失败',
        })
      }
    },
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
          hospitalType: '',
          hospitalGrade: '',
          pageSize: 10,
          pageNum: 1
        },
        loading: true,
        rules: {
          deptName: [
            {required: true, message: '请输入机构名称', trigger: 'change'}
          ],
          deptType: [
            {required: true, message: '请选择机构类型', trigger: 'change'}
          ],
          countryType: [
            {required: true, message: '请选择机构等级', trigger: 'change'}
          ],
          hospitalType: [
            {required: true, message: '请选择医院类型', trigger: 'change'}
          ],
          hospitalGrade: [
            {required: true, message: '请选择医院等级', trigger: 'change'}
          ]
        }
      }
    },
    mounted(){
      if (this.$route.query.deptName) {
        this.form.deptName = this.$route.query.deptName
      }
      this.query()
    },
    methods: {
      async query(){
        const res = await this.$fetch.api_system.getOrganizationList(this.form);
        if (res.code === '200') {
          this.queryResult = res.result;
          this.loading = false;
        } else {
          this.$message({
            showClose: true,
            type: 'error',
            message: '请求机构列表失败',
          })
        }
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.form.pageSize = pageSize
        this.query()
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.form.pageNum = currentPage
        this.query()
      },
      handleRead(row){
        this.$router.push({
          path: '/system/mechanismDetail',
          query: {
            deptId: row.deptId,
            uid:row.uid
          }
        })
      },
      submitForm(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            console.log(valid)
            console.log(1111)
            //请求数据
            // console.log(this.$refs[formName].model)
            try {
              const res = await this.$fetch.api_system.getOrganizationList(this.$refs[formName].model);
              if (res.code === '200') {
                this.queryResult = res.result;
                this.loading = false;
              } else {
                this.$message({
                  showClose: true,
                  type: 'error',
                  message: '请求机构列表失败',
                })
              }
            } catch (error) {
              this.$message({
                showClose: true,
                type: 'error',
                message: '请求机构列表失败',
              })
            }
          } else {
            console.log('error')
            return false;
          }
        });
      }
    }

  }
</script>

<style scoped>
  .block {
    text-align: right;
  }

  .button-group {
    line-height: 60px;
    padding-right: 20px;
  }

</style>
