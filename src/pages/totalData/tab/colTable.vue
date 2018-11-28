<template>
  <div class="colTable">
      <el-row class="colTable-row">
        <el-col :span="14" class="colTable-row-title">
          有信息反馈的记录共{{detailData[0].hasMessageRowNum}}条，共包含{{detailData[0].messageNum}}个信息项
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
            <li>
              红色字段值为需要修正的值
            </li>
          </ul>
        </el-col>
      </el-row>
    <el-table
      :data="queryResult.list"
      size="small"
      border
      style="width: 100%;margin-top: 20px;">
      <el-table-column
        label="校验结果"
        width="100">
        <template slot-scope="scope">
          <span slot="reference" v-if="scope.row.taskRowCheckStatus == '0'"> <i class="iconfont icon-cuowu result-error" @click="getDetailError(scope.row)"  ></i></span>
          <span slot="reference" v-if="scope.row.taskRowCheckStatus == '1'"> <i class="iconfont icon-zhengque" ></i></span>
      </template>

      </el-table-column>
      <el-table-column
        prop="taskRowNum"
        label="行号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="taskMessNumCount"
        label="信息项总数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="taskTsCount"
        label="提示总数">
      </el-table-column>
      <el-table-column
        prop="taskCwCount"
        label="错误总数">
      </el-table-column>
      <el-table-column
        prop="taskRowPassingRate"
        label="校验通过率">
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
    <el-dialog
      title="数据提示"
      :visible.sync="visible"
       width="50%"
      center>
      <el-table :data="gridData.list"  size="mini" border style="width: 100%;color:#ffffff;" :row-style="rowClass">
      <el-table-column width="100" property="fieldName" label="字段名"></el-table-column>
      <el-table-column width="150" property="fieldInfo" label="字段描述"></el-table-column>
      <el-table-column width="80" property="messageType" label="类型"></el-table-column>
      <el-table-column width="80" property="messageCode" label="代码"></el-table-column>
      <el-table-column  property="msgs" label="描述"></el-table-column>
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
    </el-dialog>

  </div>
</template>

<script>
  import query from './tabJs'
  export default {
      props:['detailData'],
    mixins:[ query ],
    data(){
      return {
        visible: false,
        gridData:{
          pageNum: 1,//当前页
          pageSize: 10,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
        //查询结果
        queryResult: {
          pageNum: 1,//当前页
          pageSize: 10,//每页的条数
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
      }
    },
    mounted(){
      this.query(1)
    },
    computed: {
      getWidth: function () {
        return (document.body.clientWidth - 400)
      }
    },
    methods: {
      rowClass(row, index) {
        return {"background-color": row.row.fieldCheckStatus == '0'?'red':'green',}
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.searchForm.pageSize = pageSize
        this.query(1)
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.searchForm.pageNum = currentPage
        this.query(1)
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      gridDatapageSizeChange(pageSize) {
        this.queryDetail.pageSize = pageSize
        this.getDetailError()
      },
      //切换当前页事件，做重新查询操作
      gridDatacurrentPageChange(currentPage) {
        this.queryDetail.pageNum = currentPage
        this.getDetailError()
      },
      //查看具体错误信息
      getDetailError(row){
          if(row){
            this.queryDetail.taskId = row.taskId
            this.queryDetail.batchTaskResultRowId = row._id
          }
          this.visible = true
          this.$fetch.api_data.rowFields(this.queryDetail)
            .then(response => {
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
    /*line-height:122px;*/
    margin-top:50px;
    float: left;
  }
  .colTable-row-notice{
    font-size:14px;
    float: right;
    margin-right:20px;
  }
  .colTable-row-notice li{
    margin-top:10px;
  }
 .colTable .icon-cuowu{
   color: #FF3A39;
   margin-right: 10px;
 }
 .colTable .icon-zhengque{
   color: #00BC6F;
   margin-right: 10px;
 }
  .result-error{
    cursor: pointer;

  }
 .block{
   text-align: right;
   margin-top: 10px;
   height: 30px;
 ;
 }

</style>
<style>
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    /*background-color: #212e3e !important;*/
    color: #333;
  }
</style>
