<template>
  <div class="mechanism">
    <div class="search">
      <el-form :model="form" :rules="rules" ref="form" labelWidth="100px" class="demo-ruleForm" :inline="true">
       <el-form-item
          label="用户名称"
        >
         <el-input  v-model="form.loginName" placeholder="请输入用户名称" clearable :size="$store.state.size"></el-input>
        </el-form-item>
        <el-form-item
          label="机构类型"
        >
          <el-select v-model="form.deptType"  placeholder="请选择" style="width:120px" clearable :size="$store.state.size">
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
          <el-select v-model="form.countryType"  placeholder="请选择" style="width:120px" clearable :size="$store.state.size">
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
          <el-select v-model="form.hospitalType"  placeholder="请选择" style="width:120px" clearable :size="$store.state.size">
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
          <el-select v-model="form.hospitalGrade"  placeholder="请选择" style="width:120px" clearable :size="$store.state.size">
            <el-option
              v-for="item in $store.state.hospitalLv"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="submitForm('form')" :size="$store.state.size">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <div class="button-group">
        <router-link to="/system/consumerAdd">
          <el-button type="primary" :size="$store.state.size">新增</el-button>
        </router-link>

      </div>
      <el-table
        :data="queryResult.list"
        :size="$store.state.size"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="用户名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码">
        </el-table-column>
        <el-table-column
          label="所属机构类型">
           <template slot-scope="scope">
          <span style="margin-left:10px">{{ scope.row.deptType == '1'?'管理类型':'医疗机构' }}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="所属机构名称">
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
        //请求数据
        try{
           const res = await this.$fetch.api_system.getUserList({});
           if(res.code == "200"){
            this.queryResult = res.result;
           }else{
                  this.$message({
                    showClose: true,
                    type:'error',
                    message:'请求用户列表失败',
                  })
           }
        }catch(err){
          this.$message({
                    showClose: true,
                    type:'error',
                    message:'请求用户列表失败',
            })
        }
    },
    data(){
      return {
        form:{
             loginName:'',
             deptType:'',
             countryType:'',
             hospitalType:'',
             hospitalGrade:'',
             pageNum:1,
             pageSize:10
        },
        queryResult: {
          pageNum: 1,//当前页
          pageSize: 10,//每页的条数
          pages: 0,
          total: 0,
          list:[]
        },
        rules:{
            loginName:[
             {required:true, message: '请输入用户名称', trigger: 'blur' }
            ],
            deptType:[
              {required:true, message: '请选择机构类型', trigger: 'change' }
            ],
            countryType:[
             {required:true, message:'请选择机构等级',trigger:'change'}
            ],
            hospitalType:[
            {required:true, message:'请选择医院类型',trigger:'change'}
            ],
             hospitalGrade:[
             {required:true, message:'请选择医院等级',trigger:'change'}
            ]
        }
      }
    },
    methods: {
      async query(){
        //请求数据
        const res = await this.$fetch.api_system.getUserList(this.form);
         if(res.code == "200"){
            this.queryResult = res.result;
           }else{
                  this.$message({
                    showClose: true,
                    type:'error',
                    message:'请求用户列表失败',
                  })
           }
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.form.pageSize = pageSize;
        this.query();
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.form.pageNum = currentPage;
        this.query();
      },
      handleRead(row){
        this.$router.push({
           path:'/system/consumerDetail',
           query:{
             uid:row.uid
           }
        })

      },
      submitForm(formName){
          this.$refs[formName].validate(async (valid) => {
            if(valid){
                 try{
                   const res = await this.$fetch.api_system.getUserList(this.$refs[formName].model);
                   if(res.code == "200"){
                     this.queryResult = res.result;
                   }else{
                     this.$message({
                      showClose: true,
                      type:'error',
                      message:'请求用户列表失败',
                    })
                   }
                }catch(err){
                    this.$message({
                    showClose: true,
                    type:'error',
                    message:'请求用户列表失败',
                   })
                }
            }else{
               console.log('error')
               return false;
            }
          })
      }
    }
  }
</script>

<style scoped>
  .block{
    text-align: right;
  }
  .button-group{
    height: 60px;
    line-height:60px;
    padding-right:20px;
  }
</style>
<style>

</style>
