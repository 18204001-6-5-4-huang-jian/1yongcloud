<template>
  <div class="colTable">
    <el-row class="colTable-row">
      <el-col :span="14" class="colTable-row-title">
        <span>信息总数：{{detailData[0].messageNum}}</span>
        <span>提示总数：{{detailData[0].filedTsNum}}</span>
        <span>错误总数：{{detailData[0].filedErrNum}}</span>
      </el-col>
      <el-col :span="10">
        <ul class="colTable-row-notice">
          <li>
            <span><i class="iconfont icon-zhengque"></i>检验通过</span>
          </li>
          <li>
            <span><i class="iconfont icon-cuowu"></i>检验失败</span>
          </li>
          <li>
            <span>点击　<i class="iconfont icon-cuowu"></i>可查看具体错误原因</span>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-table
      :data="queryResult.list"
      border
      size="small"
      style="width: 100%;margin-top: 20px;">
      <el-table-column
        label="校验结果"
        width="180">
        <template slot-scope="scope">
          <el-popover
            placement="right-start"
            style="min-width:800px;"
            trigger="click"
            :width="getWidth"
            v-model="scope.row.visible">
            <el-table :data="gridData.list"  size="mini" style="width: 100%;">
              <el-table-column width="100" property="fieldName" label="字段名"></el-table-column>
              <el-table-column width="150" property="fieldInfo" label="字段描述"></el-table-column>
              <el-table-column width="80" property="messageType" label="类型"></el-table-column>
              <el-table-column width="80" property="messageCode" label="代码"></el-table-column>
              <el-table-column width="80" property="fieldCheckStatus" label="校验情况"></el-table-column>
              <el-table-column  property="message" label="描述"></el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                small
                @size-change="gridDatapageSizeChange"
                @current-change="gridDatacurrentPageChange"
                :current-page="gridData.pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="gridData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="gridData.total">
              </el-pagination>
            </div>
            <span slot="reference" v-if="scope.row.taskFieldCheckStatus == '0'"> <i class="iconfont icon-cuowu result-error" @click="getDetailError(scope.row)"  ></i></span>
          </el-popover >
          <span slot="reference" v-if="scope.row.taskFieldCheckStatus == '1'"> <i class="iconfont icon-zhengque" ></i></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="taskFieldName"
        label="字段名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="taskFieldInfo"
        label="字段含义"
        width="180">
      </el-table-column>
      <el-table-column
        prop="taskFieldRowCount"
        label="校验总数">
      </el-table-column>
      <el-table-column
        prop="taskFieldRowCount"
        label="填写总数">
      </el-table-column>
      <el-table-column
        prop="taskFieldMessCount"
        label="信息总数">
      </el-table-column>
      <el-table-column
        prop="taskFieldTsCount"
        label="提示总数">
      </el-table-column>
      <el-table-column
        prop="taskFieldCwCount"
        label="错误总数">
      </el-table-column>
      <el-table-column
        prop="taskFieldPassingRate"
        label="校验通过率">
      </el-table-column>
      <el-table-column
        prop="taskFieldMinPassingRate"
        label="通过率最低要求">
      </el-table-column>
    </el-table>
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
</template>

<script>
  import query from './tabJs'
  export default {
    props:['detailData'],
    mixins:[ query ],
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
        searchForm:{
          taskId:this.$route.query.uid,
          pageSize:10,
          pageNum:1
        },
        queryDetail:{
          pageNum:1,
          pageSize:10,
          taskId:'',
          batchTaskResultRowId:''
        },
        gridData:{
          pageNum: 1,//当前页
          pageSize: 10,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
      }
    },
    computed: {
      getWidth: function () {
        return (document.body.clientWidth - 400)
      }
    },
    mounted(){
      this.query(2)
    },
    methods: {
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.searchForm.pageSize = pageSize
        this.query(2)
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.searchForm.pageNum = currentPage
        this.query(2)
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      gridDatapageSizeChange(pageSize) {
        this.queryDetail.pageSize = pageSize
        this.getDetailError(2)
      },
      //切换当前页事件，做重新查询操作
      gridDatacurrentPageChange(currentPage) {
        this.queryDetail.pageNum = currentPage
        this.getDetailError(2)
      },
      //查看具体错误信息
      getDetailError(row){
        this.queryDetail.taskId = row.taskId
        this.queryDetail.batchTaskResultRowId = row._id
        this.$fetch.api_data.rowFields(this.queryDetail)
          .then(response => {
            row.visible = true
            this.gridData = response.result
          })
      }
    }

  }
</script>

<style scoped>
  .colTable{
    width:100%;
  }
  .colTable-row{
    height:122px;
    background: #FFF8ED;
  }
  .colTable-row-title{
    text-align: center;
    line-height:122px;
    float: left;
  }
  .colTable-row-title span{
    margin-left:40px;
  }
  .colTable-row-notice{
    font-size:14px;
    float: right;
    margin-right:20px;
  }
  .colTable-row-notice li{
    margin-top:15px;
  }
  .colTable .icon-cuowu{
    color: #FF3A39;
    margin-right: 10px;
  }
  .colTable .icon-zhengque{
    color: #00BC6F;
    margin-right: 10px;
  }
  .block{
    text-align: right;
    margin-top: 10px;
    height: 30px;
  ;
  }
  .result-error{
    cursor: pointer;

  }

</style>

