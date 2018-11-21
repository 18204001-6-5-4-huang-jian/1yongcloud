<template>
  <div class="dataShow">
    <div class="search">
      <el-form :model="searchForm" ref="searchForm" labelWidth="80px" class="demo-ruleForm" :show-message="false" :inline="true">
        <el-form-item
          label="校验状态"
        >
          <el-select v-model="searchForm.checkStatus"  placeholder="请选择校验状态" style="width:200px" clearable :size="$store.state.size">
            <el-option
              v-for="item in $store.state.checkStatus"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="通过情况"
        >
          <el-select v-model="searchForm.checkSuccessStatus"  placeholder="请选择通过情况" style="width:200px" clearable :size="$store.state.size">
            <el-option
              v-for="item in $store.state.checkSuccessStatus"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="文件名称"
        >
          <el-select v-model="searchForm.taskName"  placeholder="请选择文件名称" style="width:200px" clearable :size="$store.state.size">
            <el-option
              v-for="item in $store.state.files"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="query()" :size="$store.state.size">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <div class="title">
        <span v-if="$route.query.batchType == 1" >
          {{$route.query.batchDataYear}}年{{$route.query.batchDataMonth}}月数据详情
        </span >
        <span v-if="$route.query.batchType == 0" >
          {{$route.query.batchDataTime}}年数据详情
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
          prop="fileRows"
          label="计入数量">
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
        <!--<el-table-column-->
          <!--prop="minPassingRate"-->
          <!--label="要求校验通过率">-->
        <!--</el-table-column>-->
        <el-table-column
          label="上报时间">
          <template slot-scope="scope">
            <span>{{scope.row.fileUplodTime | dateFormater}}</span>
          </template>
        </el-table-column>

        <el-table-column
        label="操作">
          <template slot-scope="scope">
            <router-link
              :to="{path:'/data/detail',query:{
                uid:scope.row.uid
              }}"
              v-if="scope.row.uploadStatus == 1">
              <el-button type="text" size="small">查看</el-button>
            </router-link>
            <router-link :to="{path:'/data/dataReport',query:{
                uid:scope.row.uid
              }}">
              <el-button type="text" size="small" v-if="$route.query.updateType == 2">上传</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

  import commonUnfiled from './commonUnfiled.vue'
  export default {
    components: {
      commonUnfiled
    },
    data(){
      return {
        searchForm:{
          checkStatus:'',
          checkSuccessStatus:'',
          taskName:'',
          batchId:this.$route.query.uid,
          uploadStatus:1
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
  .table-container .title{
    text-align: center;
    line-height: 40px;
    font-size: 18px;
  }
</style>

