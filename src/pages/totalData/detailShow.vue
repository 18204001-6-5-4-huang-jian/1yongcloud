<template>
  <div class="dataShow">
    <!--<div class="search">-->
      <!--<el-form :model="searchForm" ref="searchForm" labelWidth="80px" class="demo-ruleForm" :show-message="false"-->
               <!--:inline="true">-->
        <!--<el-form-item-->
          <!--label="数据状态"-->
        <!--&gt;-->
          <!--<el-select v-model="searchForm.uploadStatus" placeholder="请选择数据状态" style="width:200px" size="small">-->
            <!--<el-option-->
              <!--v-for="item in $store.state.dataType"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.label">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item-->
          <!--label="数据年份"-->
        <!--&gt;-->
          <!--<el-select v-model="searchForm.batchYear" placeholder="请选择" style="width:120px" size="small">-->
            <!--<el-option-->
              <!--v-for="item in $store.state.optionsYear"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item-->
          <!--label="数据年份"-->
        <!--&gt;-->
          <!--<el-select v-model="searchForm.batchYear" placeholder="请选择" style="width:120px" size="small">-->
            <!--<el-option-->
              <!--v-for="item in $store.state.optionsYear1"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item-->
          <!--label="数据月份"-->
        <!--&gt;-->
          <!--<el-select v-model="searchForm.batchMonth" placeholder="请选择" style="width: 120px;" size="small">-->
            <!--<el-option-->
              <!--v-for="item in $store.state.optionsMonth"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="query()" size="small">查询</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</div>-->
    <div class="dataShow-table">
      <div class="title">
        <span>{{$route.query.hosName}}</span>
        <span v-if="$route.query.batchType == 1" >
          {{$route.query.batchDataYear}}年{{$route.query.batchDataMonth}}月数据详情
        </span >
        <span v-if="$route.query.batchType == 0" >
          {{$route.query.batchDataYear}}年数据详情
        </span>
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
          prop="taskName"
          label="文件名称">
        </el-table-column>
        <el-table-column
          prop="date"
          label="文件数量">
        </el-table-column>
        <el-table-column
          label="上报状态">
          <template slot-scope="scope">
            <span>{{scope.row.uploadStatus | uploadStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="checkStatus"
          label="校验状态">
        </el-table-column>
        <el-table-column
          prop="checkSuccessStatus"
          label="通过情况">
        </el-table-column>
        <el-table-column
          prop="filePassingRate"
          label="实际校验通过率">
        </el-table-column>
        <el-table-column
          label="上报时间">
          <template slot-scope="scope">
            {{scope.row.fileUplodTime | dateFormater}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <router-link
              :to="{path:'/totalData/details',query:{
                uid:scope.row.uid
              }}"
              v-if="scope.row.uploadStatus == 1">
              <el-button type="text" size="small">查看</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        searchForm:{
          checkStatus:'',
          checkSuccessStatus:'',
          taskName:'',
          batchType:this.$route.query.batchType,
          batchId:this.$route.query.uid,
          deptId: this.$route.query.deptId,
          uploadStatus:''
        },
        //查询结果
        queryResult: {
          pageNum: 1,//当前页
          pageSize: 18,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
      }
    },
    mounted(){
      this.query()
    },
    methods: {
      query(){
        this.$fetch.api_data.taskList(this.searchForm)
          .then(response => {
            this.queryResult.list = response.result
          })
      },


    }

  }
</script>

<style scoped>
  .dataShow .search{
    background: #ffffff;
    padding-top:10px;
    padding-bottom:10px;
    padding-left:20px;
  }
  .dataShow .el-form-item{
    margin-bottom:0px;
  }
  .dataShow-table{
    background: #ffffff;
    padding:20px;
    margin-top:20px;
  }
  .dataShow-table .title{
    text-align: center;
    line-height: 40px;
    font-size: 18px;
  }
</style>

