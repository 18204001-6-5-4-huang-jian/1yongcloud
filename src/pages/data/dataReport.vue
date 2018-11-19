<template>
  <div class="data-report content-page">
    <el-form :model="searchForm" ref="searchForm" labelWidth="100px" class="demo-ruleForm" :show-message="false"
             :inline="true">
      <el-form-item
        label="上报数据年度"
      >
        <el-select v-model="searchForm.batchDataYear" placeholder="请选择" style="width:120px" :size="$store.state.size"
                   v-if="$route.query.batchType == 1" @change="query()" clearable>
          <el-option
            v-for="item in $store.state.optionsYear"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="searchForm.batchDataYear" placeholder="请选择" style="width:120px" :size="$store.state.size" v-else clearable
                   @change="query()">
          <el-option
            v-for="item in $store.state.optionsYear1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="上报数据月份"
        v-if="$route.query.batchType == 1"
      >
        <el-select v-model="searchForm.batchDataMonth" placeholder="请选择" style="width:120px" :size="$store.state.size" clearable
                   @change="query()">
          <el-option
            v-for="item in $store.state.optionsMonth"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table
      :data="queryResult.list"
      border
      :size="$store.state.size"
      tooltip-effect="dark"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="标准文件名称"
        prop="taskName"
        width="250">
      </el-table-column>
      <el-table-column
        prop="uploadStatus"
        label="上报状态"
        width="120">
        <template slot-scope="scope">
          <span>
            {{scope.row.uploadStatus | uploadStatus}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="checkStatus"
        label="质检状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="checkSuccessStatus"
        label="通过状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="上报文件大小"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.fileSize | fileSize}}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        prop="fileSuffix"
        label="上报文件格式"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="标准文件格式"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span>xls，xlsx，txt，csv</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="upload">
      <el-upload
        class="upload-demo"
        ref="upload"
        :http-request="uploadFile"
        :action="uploadUrl()"
        multiple
        :file-list="fileList"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :on-preview="handlePreview"
        :with-credentials="true"
        :on-remove="handleRemove"
        :show-file-list='true'
        :auto-upload="false">
        <el-button slot="trigger" :size="$store.state.size" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" :size="$store.state.size" type="success" @click="submitUpload">确认上传</el-button>
      </el-upload>
    </div>
    <div class="toop-notice">
      本系统目前只支持以下几种格式的文件上报：1.上报文件格式支持txt，csv，xls，xlsx，；2.采用UTF-8编码；3.各数据字段以tab键分割；4.前一个月数据需在本月10号前完成上报
    </div>
  </div>
</template>

<script>
  import server from 'src/common/config'
  export default {
    data(){
      return {
        searchForm: {
          batchDataYear: this.$route.query.batchDataYear ? this.$route.query.batchDataYear : new Date().getFullYear(),
          batchDataMonth: this.$route.query.batchDataYear ? this.$route.query.batchDataMonth : new Date().getMonth() + 1,
          batchType: this.$route.query.batchType
        },
        optionsYear: [],
        multipleSelection: [],
        //查询结果
        queryResult: {
          pageNum: 1,//当前页
          pageSize: 18,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
        tasks: [],
        formData: {},
        fileList: [],
        batchId:''
      }
    },
    mounted(){
      if (this.$route.query.batchType == 0) {
        this.searchForm.batchDataYear = this.$route.query.batchDataYear
      } else if (this.$route.query.batchType == 1) {
        this.searchForm.batchDataYear = this.$route.query.batchDataYear
        this.searchForm.batchDataMonth = this.$route.query.batchDataMonth
      }
      if(this.$route.query.uid){
         this.batchId = this.$route.query.batchId
      }
      this.query()
    },
    methods: {
      query(){
        this.$fetch.api_data.uploadList(this.searchForm)
          .then(response => {
              this.queryResult.list = response.result
              this.batchId = response.result[0].deptBatchId
          })
      },
      getState() {
        let state = false
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].uploadStatus == 1) {
            state = true
          }

        }
        return state
      },
      submitUpload(){
        let state = this.getState()
        if (state) {
          this.$confirm(' 此操作将覆盖已上报文件,是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.submit()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消上传'
            });
          })
        } else {
          this.submit()
        }
      },
      submit(){
        this.formData = new FormData();
        this.$refs.upload.submit();
        this.formData.append('tasks', this.tasks)
        this.formData.append('batchId', this.batchId)
        this.$fetch.api_data.files(this.formData)
          .then(response => {
            this.fileList = []
            this.$message({
              type: 'success',
              message: '上传成功'
            });
            this.query()
          })
      },
      handleAvatarSuccess(res, file, fileList) {
        this.$message({
          message: '文件上传成功',
          type: 'success'
        });
      },
      beforeAvatarUpload(file){
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        const isLt2M = file.size / 1024 / 1024 < 300
        const extension = testmsg.toLowerCase() === 'xls'
        const extension2 = testmsg.toLowerCase() === 'xlsx'
        const extension3 = testmsg.toLowerCase() === 'csv'
        const extension4 = testmsg.toLowerCase() === 'txt'
        if (!extension && !extension2 && extension3 && extension4) {
          this.$message({
            message: '上传文件只能是 xls、xlsx格式!',
            type: 'warning'
          });
          return
        }
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 300MB!',
            type: 'warning'
          });
          return
        }
      },
      //自定义上传
      uploadFile(params){
        this.formData.append('file', params.file);
      },
      // 上传
      uploadUrl(){
        return server.server_base_url + "/odmapi/batch/task/upload/files"
      },
      handleRemove(file, fileList) {
        console.log(fileList)
      },
      handlePreview(file) {

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
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
        console.log(file);
      },
      //表格多选
      handleSelectionChange(val){
        this.tasks = []
        this.multipleSelection = val;
        this.multipleSelection.filter(item => {
          this.tasks.push(item.taskCode)
        })

      },
    }

  }
</script>

<style scoped>
  .toop-notice {
    line-height: 40px;
    height: 40px;
    margin-top: 10px;
    color: red;
  }

  .upload {
    margin-top: 20px;
    width: 400px;
  }
</style>

