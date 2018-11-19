<template>
  <div class="detail">
    <div class="top">
       <div class="button-group">
         <el-button size="small" type="text" @click="downLoad">原始文件下载</el-button>
         <!--<el-button size="small" type="text">系统处理后文件下载</el-button>-->
         <!--<el-button size="small" type="text">数据分析汇总结果下载</el-button>-->
       </div>
      <el-table
        :data="detailData"
        border
        style="width: 100%">
        <el-table-column
          label="质控状态"
          width="">
          <template slot-scope="scope">
            <span v-if="scope.row.checkSuccessStatus == '未通过'">
               <i class="iconfont icon-cuowu"></i>质控未通过！
            </span>
            <span v-if="scope.row.checkSuccessStatus == '已通过'">
               <i class="iconfont icon-zhengque"></i>质控通过！
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="fileName"
          label="文件名称"
          width="280">
        </el-table-column>
        <el-table-column
          prop="fileFiledNum"
          label="字段总数">
        </el-table-column>
        <el-table-column
          prop="fileRows"
          label="行总数">
        </el-table-column>
        <el-table-column
          prop="errorRowNum"
          label="未通过行数">
        </el-table-column>
        <el-table-column
          prop="filePassingRate"
          label="实际校验通过率">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="minPassingRate"-->
          <!--label="要求校验通过率">-->
        <!--</el-table-column>-->
      </el-table>

    </div>
    <div class="content-tab">
      <v-tab :detailData=detailData></v-tab>
    </div>
  </div>
</template>

<script>
  import tab from './tab/dataTab'
  import server from 'src/common/config'
  export default {
    components: {
       "v-tab":tab
    },
    data(){
      return {
        detailData:[]
      }
    },
    mounted(){
      this.query()
    },
    methods: {
      query(){
          this.$fetch.api_data.taskInfo({
            taskId:this.$route.query.uid
          })
            .then(response => {
               this.detailData.push(response.result)
            })
        },
      downLoad(){
        let url = `${server.server_base_url}odmapi/excel/downfile?taskId=${this.$route.query.uid}`
        window.location.href= url
      }
      }
  }
</script>

<style scoped>
 .detail .top{
   padding: 10px 20px;
   background: #ffffff;
 }
  .detail .table{
    margin-top: 10px;
    border-collapse: collapse;
  }
  .detail .table tr td{
    width:120px;
    padding:5px;
    text-align: center;
    border:1px solid #E9EDF8;
    line-height: 40px;
    font-size: 14px;
    color: #545967;
  }
  .detail .table-th{
    background: #F8F9FC;
  }
  .detail .icon-cuowu{
    color: #FF3A39;
    margin-right: 10px;
  }
 .detail .icon-zhengque{
   color: #00BC6F;
   margin-right: 10px;
 }
  .title{
    color: #FF3A39;
    line-height: 30px;
    height: 30px;
  }
  .content-tab{
    background: #ffffff;
    margin-top:20px;
    padding:20px;
  }


</style>
<style>

</style>
