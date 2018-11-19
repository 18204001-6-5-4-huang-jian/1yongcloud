<template>
  <div class="dataShow">
    <div class="search">
      <el-form :model="searchForm" ref="searchForm" labelWidth="80px" class="demo-ruleForm" :show-message="false"
               :inline="true">
        <el-form-item
          label="数据状态"
        >
          <el-select v-model="searchForm.batchStatus" placeholder="请选择数据状态" style="width:200px" :size="$store.state.size"  clearable>
            <el-option
              v-for="item in $store.state.dataType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="数据年份"
          v-if="activeName2 == 'first'"
        >
          <el-select v-model="searchForm.batchYear" placeholder="请选择" style="width:120px" :size="$store.state.size"  clearable>
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
          v-if="activeName2 == 'second'"
        >
          <el-select v-model="searchForm.batchYear" placeholder="请选择" style="width:120px" :size="$store.state.size" clearable>
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
          v-if="activeName2 == 'first'"
        >
          <el-select v-model="searchForm.batchMonth" placeholder="请选择" style="width: 120px;" :size="$store.state.size"  clearable>
            <el-option
              v-for="item in $store.state.optionsMonth"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query()" :size="$store.state.size">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container dataShow-table">
      <div class="title">
        <span>
          {{$route.query.hosname}}数据详情
        </span>
      </div>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="table-tabs">
        <el-tab-pane label="2018年及以后" name="first">
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
                 path:'/totalData/detailShow',query:{
                      batchType:1,
                      uid:scope.row.uid,
                     batchDataYear:scope.row.batchDataYear,
                     batchDataMonth:scope.row.batchDataMonth,
                     deptId: $route.query.deptId,
                     hosName: $route.query.hosname,
                     }}">
                  <el-button type="text" size="small">查看</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="2013年-2017年" name="second">
            <el-table
              :size="$store.state.size"
              :data="queryResult.list"
              :cell-class-name="tableRowClassName"
              @cell-mouse-leave="cellMouseLeave"
              @cell-mouse-enter="cellMouseEnter"
              :span-method="objectSpanMethod"
              style="width: 100%">

              <el-table-column label="一期数据">
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
              </el-table-column>
              <el-table-column
                label="二期数据"
                width="120">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <router-link
                    :to="{
                 path:'/totalData/detailShow',query:{
                     batchType:0,
                     batchDataTime:scope.row.batchDataTime,
                     deptId:$route.query.deptId,
                     hosName: $route.query.hosname,
                     }}">
                    <el-button type="text" size="small">查看</el-button>
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
  import  query from './detailJs'
  export default {
    mixins: [query],
    data(){
      return {
        activeName2: 'first',
        searchForm: {
          checkStatus: '',
          checkSuccessStatus: '',
          batchType: '1',
          deptId: this.$route.query.deptId,
          batchStatus: '',
          batchYear:'',
          batchMonth:''
        },
        //查询结果
        queryResult: {
          pageNum: 1,//当前页
          pageSize: 10,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
        //查询结果
        queryResult1: {
          pageNum: 1,//当前页
          pageSize: 10,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
        //合并数组
        hoverOrderArr:[],
        OrderIndexArr:[],
      }
    },
    mounted(){
      this.query()
    },
    methods: {
      handleClick(){
        if (this.activeName2 == 'first') {
          this.searchForm.batchType = 1
        } else {
          this.searchForm.batchType = 0
        }
        this.searchForm.batchMonth = ''
        this.searchForm.batchYear = ''
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
  .dataShow-table {
    background: #ffffff;
    padding: 20px;
    margin-top: 20px;
  }

  .dataShow-table .title {
    text-align: center;
    line-height: 40px;
    font-size: 18px;
  }

  .block {
    text-align: right;
    margin-top: 10px;
    height: 30px;;
  }
</style>
<style>
  .dataShow .el-table thead.is-group th {
    background: #ffffff !important;
  }
</style>

