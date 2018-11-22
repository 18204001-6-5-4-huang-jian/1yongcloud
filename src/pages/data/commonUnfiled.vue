<template>
  <div class="unfiled">
    <div class="buttons" v-if="batchStatus != 0">
      <router-link :to="{path:'/data/dataReport',query:{batchType:1,batchDataYear:new Date().getFullYear(),batchDataMonth:new Date().getMonth()+1,}}">
        <el-button type="primary">2018年及以后数据上报</el-button>
      </router-link>
      <router-link :to="{path:'/data/dataReport',query:{batchType:0,batchDataYear:2017}}">
        <el-button type="primary">2013年-2017年数据上报</el-button>
      </router-link>
    </div>
    <div class="search"  v-if="searchType == 2">
      <el-form :model="searchForm" ref="searchForm" labelWidth="80px" class="demo-ruleForm"  :inline="true">
        <el-form-item
          label="数据年份"
          v-if="searchForm.batchType == '1'"
        >
          <el-select v-model="searchForm.batchYear"  placeholder="请选择" style="width:200px" clearable :size="$store.state.size">
            <el-option
              v-for="item in $store.state.optionsYear"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="数据年份"
          v-if="searchForm.batchType == '0'"
        >
          <el-select v-model="searchForm.batchYear"  placeholder="请选择" style="width:200px" clearable :size="$store.state.size">
            <el-option
              v-for="item in $store.state.optionsYear1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="数据月份"
          v-if="searchForm.batchType == '1'"
        >
          <el-select v-model="searchForm.batchMonth"  placeholder="请选择" style="width: 200px;" clearable size="$store.state.size">
            <el-option
              v-for="item in $store.state.optionsMonth"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="query()" :size="$store.state.size">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-tabs v-model="searchForm.batchType" type="card" @tab-click="handleClick" >
        <el-tab-pane label="2018年及以后" name="1">
          <el-table
            :data="queryResult.list"
            border
            :size="$store.state.size"
            style="width: 100%">
            <el-table-column
              prop="batchDataTime"
              label="数据时间"
              width="150">
            </el-table-column>
            <el-table-column
              label="开始上报时间"
            >
              <template slot-scope="scope">
                <span>{{scope.row.batchStartTime | dateFormater}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="截止上报时间"
            >
              <template slot-scope="scope">
                <span>{{scope.row.batchEndTime | dateFormater}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="uploadProgress"
              label="上报任务数"
            >
            </el-table-column>
            <el-table-column
              prop="checkProgress"
              label="校验中文件数"
            >
            </el-table-column>
            <el-table-column
              prop="checkSuccessProgress"
              label="校验通过文件数"
            >
            </el-table-column>
            <el-table-column
              prop="checkErrorProgress"
              label="校验未通过文件数"
            >
            </el-table-column>

            <el-table-column
              prop="date"
              label="操作">
              <template slot-scope="scope">
                <router-link
                  :to="{
                 path:'/data/dataShow',query:{
                     batchType:1,
                     uid:scope.row.uid,
                     batchDataYear:scope.row.batchDataYear,
                     batchDataMonth:scope.row.batchDataMonth,
                     }}">
                  <el-button type="text" size="small">查看</el-button>
                </router-link>
                <router-link :to="{
                 path:'/data/dataReport',query:{
                   batchType:1,
                   uid:scope.row.uid,
                   batchDataYear:scope.row.batchDataYear,
                   batchDataMonth:scope.row.batchDataMonth}}"
                   v-if="scope.row.batchStatus == 1 && upload == 2">
                  <el-button type="text" size="small">上报</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="2013年-2017年" name="0">
          <el-table
            border
            :data="queryResult.list"
            :size="$store.state.size"
            style="width: 100%">
            <el-table-column
              prop="batchDataTime"
              label="数据时间"
              width="150">
            </el-table-column>
            <el-table-column
              label="开始上报时间"
            >
              <template slot-scope="scope">
                <span>{{scope.row.batchStartTime | dateFormater}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="截止上报时间"
            >
              <template slot-scope="scope">
                <span>{{scope.row.batchEndTime | dateFormater}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="uploadProgress"
              label="上报任务数"
            >
            </el-table-column>
            <el-table-column
              prop="checkProgress"
              label="校验中文件数"
            >
            </el-table-column>
            <el-table-column
              prop="checkSuccessProgress"
              label="校验通过文件数"
            >
            </el-table-column>
            <el-table-column
              prop="checkErrorProgress"
              label="校验未通过文件数"
            >
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <router-link
                  :to="{
                 path:'/data/dataShow',query:{
                     batchType:0,
                     uid:scope.row.uid,
                     batchDataTime:scope.row.batchDataTime
                     }}">
                  <el-button type="text" size="small">查看</el-button>
                </router-link>
                <router-link :to="{
                  path:'/data/dataReport',
                  query:{
                  batchType:0,
                  uid:scope.row.uid,
                  batchDataYear:scope.row.batchDataYear}}"
                             v-if="scope.row.batchStatus == 1 && upload == 2">
                  <el-button type="text" size="small">上报</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="block">
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
  import  query from './commonUnfiled'
  export default {
    mixins:[ query ],
    props:['searchType','upload','batchStatus'],
    data(){
      return {
        searchForm:{
          batchYear:'',
          batchMonth:'',
          batchType:'1',
          batchStatus:'',
          pageNum:1,
          pageSize:10,
        },
        //传入table的参数
        type:'1',
        //合并数组
        hoverOrderArr:[],
        OrderIndexArr:[],
        //选项卡
        activeName2:'first',


        //查询结果
        queryResult: {
          pageNum: 1,//当前页
          pageSize: 18,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
        //查询标准药品结果
        queryResult1: {
          pageNum: 1,//当前页
          pageSize: 10,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },

      }
    },
    mounted(){
      if(this.batchStatus != null){
        this.searchForm.batchStatus = this.batchStatus
      }
      this.query()
    },
    methods: {
        //tab改变改变赛选条件
      handleClick(tab,event){
        this.searchForm.batchYear = ''
        this.searchForm.batchMonth = ''
        this.query()
      },

      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.searchForm.pageSize = pageSize
        this.query()
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.searchForm.pageNum = currentPage
        this.query()
      },

      //table合并行
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 7) {
          if (rowIndex % 7 === 0) {//合并多少行
            return {
              rowspan: 7,  //要合并的行数
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }


        }
      },
      tableRowClassName({row, rowIndex}) {
        let arr = this.hoverOrderArr
        for (let i = 0; i < arr.length; i++) {
          if (rowIndex == arr[i]) {
            return 'hovered-row'
          }
        }
      },


      cellMouseEnter(row, column, cell, event) {
        this.rowIndex = row.rowIndex;
        this.hoverOrderArr = [];
        this.OrderIndexArr.forEach(element => {
          if (element.indexOf(this.rowIndex) >= 0) {
            this.hoverOrderArr = element
          }
        })
      },

      cellMouseLeave(row, column, cell, event) {
        this.rowIndex = '3'
        this.hoverOrderArr = [];
      }
    }

  }
</script>

<style scoped>
  .unfiled .el-button{
    margin-right:10px;
  }

 .block{
   text-align: right;
   margin-top: 10px;
   height: 30px;
 ;
 }
  .buttons{
    margin-bottom: 10px;
  }
</style>
<style>
  .unfiled .el-table thead.is-group th{
    background: #ffffff!important;
  }
</style>
