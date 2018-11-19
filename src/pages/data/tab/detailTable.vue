<template>
  <div class="colTable">
    <el-row class="colTable-row">
      “提示"型问题不影响上报数据的数量，无需重新上传，"错误'型问题的数据将被淘汰。
    </el-row>
    <el-table
      :data="queryResult.list"
      border
      size="small"
      :row-style="rowClass"
      style="width: 100%;margin-top: 20px;color: #ffffff;">
      <el-table-column
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="taskFileMessageType"
        label="错误类型">
      </el-table-column>
      <el-table-column
        prop="taskFileMessageCode"
        label="编码">
      </el-table-column>
      <el-table-column
        prop="taskFileMessage"
        label="描述">
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
      }
    },
    created(){
       this.query(3)
    },
    methods: {
      rowClass(row, index) {
        return {"background-color": row.row.taskFileMessageType == '提示'?'green':'red',}
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.searchForm.pageSize = pageSize
        this.query(3)
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.searchForm.pageNum = currentPage
        this.query(3)
      },
    }

  }
</script>

<style scoped>
  .colTable{
    width:100%;
  }
  .colTable-row{
    height:40px;
    line-height: 40px;
    text-align: center;
    background: #FFF8ED;
    font-size: 14px;
    color: #2D2D2D;
  }
  .colTable-row-title span{
    margin-left:40px;
  }
  .colTable-row-notice li{
    margin-top:15px;
  }
  .block{
    text-align: right;
    margin-top: 10px;
    height: 30px;
  ;
  }

</style>

