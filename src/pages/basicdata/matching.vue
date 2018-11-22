<template>
  <div class="matching">
    <div class="search">
      <el-row class="top">
        <el-col :span="12">
          待匹配: <span style="color: #0084FE;">{{count}}条</span>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadUrl()"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :on-preview="handlePreview"
            :with-credentials="true"
            :on-remove="handleRemove"
            :show-file-list='false'
            style="display: inline-block;">
            <el-button type="primary" :size="$store.state.size">导入医院药品信息</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <div class="binding">
          <el-row>
            <el-col :span="12">
              <div class="title titlecolor">医院药品信息</div>
              <el-row :gutter="20">
                <el-col :span="8">
                  通用名：<span>{{formData.genericName}}</span>
                </el-col>
                <el-col :span="8">
                  规格：<span>{{formData.specifications}}</span>
                </el-col>
                <el-col :span="8">
                  批准文号：<span>{{formData.approvalNumber}}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  商品名：<span>{{formData.productName}}</span>
                </el-col>
                <el-col :span="8">
                  剂型：<span>{{formData.dosageForm}}</span>
                </el-col>
                <el-col :span="8">
                  注册证号：<span>{{formData.registrationNumber}}</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <div class="title titlecolor">标准库药品信息</div>
              <el-row :gutter="20">
                <el-col :span="8">
                  通用名：<span>{{formData1.genericName}}</span>
                </el-col>
                <el-col :span="8">
                  规格：<span>{{formData1.specifications}}</span>
                </el-col>
                <el-col :span="8">
                  批准文号：<span>{{formData1.approvalNumber}}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  商品名：<span>{{formData1.productName}}</span>
                </el-col>
                <el-col :span="8">
                  剂型：<span>{{formData1.dosageForm}}</span>
                </el-col>
                <el-col :span="8">
                  注册证号：<span>{{formData1.registrationNumber}}</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row class="button-group">
            <el-button type="primary" @click="submitForm(1)" :size="$store.state.size">确定</el-button>
            <el-button type="primary"  :size="$store.state.size">取消</el-button>
          </el-row>
        </div>
      </el-row>
    </div>
    <div class="table-container">
      <el-row :gutter="20">
        <el-col :span="12" class="col">
          <div class="top-title">医院药品信息</div>
          <div class="table-search">
              <el-form :model="searchForm" ref="searchFormRules" labelWidth="80px" class="demo-ruleForm" :show-message="false" :inline="true">
                <el-form-item
                  label="查找字段"
                  prop="deptType"
                >
                  <el-select v-model="searchForm.deptType" clearable placeholder="请选择" style="width:200px" :size="$store.state.size">
                    <el-option
                      v-for="item in $store.state.queryDeptDrugibrary"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="查找内容"
                  prop="deptParam"
                >
                  <el-input v-model.trim="searchForm.deptParam" autocomplete="off" style="width:200px" :size="$store.state.size"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="query(1)" :size="$store.state.size">查询</el-button>
                  <el-button type="primary" @click="moveOut()" :size="$store.state.size">移除</el-button>
                </el-form-item>
              </el-form>
            </div>
          <div class="singleTable">
              <el-table
                border
                ref="singleTable"
                :size="$store.state.size"
                :data="queryResult.list"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  fixed
                  width="50">
                </el-table-column>
                <el-table-column
                  label="通用名"
                 width="150"
                  :show-overflow-tooltip="true"
                  prop="genericName"
                >
                </el-table-column>
                <el-table-column
                  label="商品名"
                 width="150"
                  :show-overflow-tooltip="true"
                  prop="productName"
                >
                </el-table-column>
                <el-table-column
                  prop="productionUnits"
                  width="250"
                  label="生产单位"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="dosageForm"
                 width="150"
                  :show-overflow-tooltip="true"
                  label="剂型"
                >
                </el-table-column>
                <el-table-column
                  prop="specifications"
                 width="150"
                  :show-overflow-tooltip="true"
                  label="规格"
                >
                </el-table-column>
                <el-table-column
                  prop="approvalNumber"
                 width="200"
                  label="批准文号（国产药物）"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="registrationNumber"
                 width="200"
                  :show-overflow-tooltip="true"
                  label="注册证号（进口药物）"
                >
                </el-table-column>
                <el-table-column
                  prop="drugCode"
                 width="150"
                  :show-overflow-tooltip="true"
                  label="本院药品编码"
                >
                </el-table-column>
                <el-table-column
                  prop="localHealcareDirectory"
                 width="200"
                  :show-overflow-tooltip="true"
                  label="是否纳入当地医保目录"
                >
                </el-table-column>
                <el-table-column
                  prop="localHealcareDirectoryTime"
                 width="200"
                  label="纳入当地医保目录时间"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </el-table>
              <div class="block" style="margin-top: 10px">
                <el-pagination
                  small
                  @size-change="pageSizeChange"
                  @current-change="currentPageChange"
                  :current-page="queryResult.pageNum"
                  :page-sizes="[10, 20, 50, 100]"
                  :file-list="fileList"
                  :page-size="queryResult.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="queryResult.total">
                </el-pagination>
              </div>
            </div>
        </el-col>
        <el-col :span="12" class="col">
          <div class="top-title">标准药品信息</div>
          <div class="matching-table-table">
            <div class="table-search">
              <el-form :model="searchForm1" ref="searchFormRules" labelWidth="80px" class="demo-ruleForm" :show-message="false" :inline="true">
                <el-form-item
                  label="查找字段"
                  prop="deptType"
                >
                  <el-select v-model="searchForm1.deptType" clearable placeholder="请选择" style="width:200px" :size="$store.state.size">
                    <el-option
                      v-for="item in $store.state.queryDeptDrugibrary1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="查找内容"
                  prop="deptParam"
                >
                  <el-input v-model.trim="searchForm1.deptParam" autocomplete="off" style="width:200px" :size="$store.state.size"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="query(2)" :size="$store.state.size">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="singleTable">
              <el-table
                border
                ref="singleTable"
                :size="$store.state.size"
                :data="queryResult1.list"
                highlight-current-row
                @current-change="handleCurrentChange1"
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="genericName"
                  label="通用名"
                 width="150"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="productName"
                  label="商品名"
                 width="150"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="productionUnits"
                  label="生产单位"
                  width="250"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="dosageForm"
                  label="剂型"
                 width="150"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="specifications"
                  label="规格"
                 width="150"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="approvalNumber"
                 width="150"
                  label="批准文号"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="registrationNumber"
                 width="150"
                  label="注册证号"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                 width="150"
                  label="药品名"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="genericEnglishName"
                  label="通用名（英文名）"
                 width="150"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="packagingSpecifications"
                  width="250"
                  label="包装规格"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="packingCompanyName"
                 width="200"
                  label="分包装批准文号"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="basedCode"
                 width="150"
                  label="药品本位码"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="scope"
                 width="150"
                  label="国内外范围"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="classification"
                 width="150"
                  label="药品种类"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="productCategory"
                 width="150"
                  label="产品类别"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="countryHealcareDirectory"
                 width="150"
                  label="治疗分类"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="countryHealcareDirectory"
                 width="150"
                  label="纳入国家医保目录"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="countryHealcareDirectoryTime"
                 width="200"
                  label="纳入国家医保目录时间"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="countryBasicDrugStatus"
                 width="150"
                  label="是否为国家基本药物"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="countryBasicDrugTime"
                 width="200"
                  label="纳入国家基本药物时间"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="countryVarietiesNegotialStatus"
                  width="150"
                  label="是否为国家谈判品牌"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="countryVarietiesNegotialTime"
                 width="200"
                  label="纳入国家谈判品种时间"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="ypId"
                 width="150"
                  label="YPID"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </el-table>
              <div class="block" style="margin-top: 10px">
                <el-pagination
                  small
                  @size-change="pageSizeChange1"
                  @current-change="currentPageChange1"
                  :current-page="queryResult1.pageNum"
                  :page-sizes="[10, 20, 50, 100]"
                  :file-list="fileList"
                  :page-size="queryResult1.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="queryResult1.total">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import server from 'src/common/config'
  import {SET_USER_INFO} from 'store/actions/type'
  export default {
    data(){
      return {
        fileList:[],
        searchForm: {
          deptParam:'',
          deptType:'',
          pageNum:1,
          pageSize:10,
        },
        searchForm1: {
          deptParam:'',
          deptType:'',
          deptDrugLibraryId:'',
          pageNum:1,
          pageSize:10,
        },
        formData:{
          genericName:'',
          specifications:'',
          approvalNumber:'',
          productName:'',
          dosageForm:'',
          registrationNumber:'',
          uid:''
        },
        formData1:{
          genericName:'',
          specifications:'',
          approvalNumber:'',
          productName:'',
          dosageForm:'',
          registrationNumber:'',
          uid:''
        },
        searchFormRules:{

        },
        //查询结果
        queryResult: {
          pageNum: 1,//当前页
          pageSize: 18,//每页的条数
          pages: 0,
          total: 1,
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
        count:0
      }
    },
    mounted(){
      this.query(1)
    },
    methods: {
      query(count){
        if(count == 1) {
          this.$fetch.api_basicData.queryDeptDrugibrary(
            this.searchForm
          )
            .then(response => {
              this.queryResult = response.result
              if(this.$store.state.user_info.task.drugInfoContrast === 2){
                this.changeTaskStatus()
              }
              if(this.$store.state.user_info.task.importDrug === 2){
                this.changeTaskStatus()
              }
          })
        } else if(count == 2){
          if(!this.searchForm1.deptDrugLibraryId){
            this.$message({
              type:'warning',
              message:'请选择一条医院药品信息'
            })
            return
          }
          this.$fetch.api_basicData.queryLikeSysDrugibrary(
            this.searchForm1
          )
            .then(response => {
              this.queryResult1 = response.result
          })
        }
        this.getCount()

      },
      submitForm(count) {
        if (count === 1){
           console.log(this.formData.uid,this.formData1.uid)
            if(this.formData.uid && this.formData1.uid){
              this.$fetch.api_basicData.matchingMedicine({
                uid:this.formData.uid,
                sysDrugId:this.formData1.uid
              })
                .then(response => {
                  this.$message({
                    type:'success',
                    message:'匹配成功'
                  })
                  Object.assign(this.$data.formData, this.$options.data().formData)
                  Object.assign(this.$data.formData1, this.$options.data().formData1)
                  this.queryResult1 = []
                  this.query(1)
                })
            }else{
                this.$message({
                  type:'warning',
                  message:'请选择要匹配的药品'
                })
            }
        }
      },
      //移除
      moveOut(){
        this.$fetch.api_basicData.deleteMedicine(
          {uid:this.formData.uid}
        )
          .then(response => {
              this.$message.success('数据移除成功')
              this.formData = {}
              this.query(1)
          })
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
      pageSizeChange1(pageSize) {
        this.searchForm1.pageSize = pageSize
        this.query(2)
      },
      //切换当前页事件，做重新查询操作
      currentPageChange1(currentPage) {
        this.searchForm1.pageNum = currentPage
        this.query(2)
      },
      //表格单选选事件触发
      handleCurrentChange(val){
        this.formData.genericName = val.genericName
        this.formData.uid = val.uid
        this.formData.specifications = val.specifications
        this.formData.approvalNumber = val.approvalNumber
        this.formData.productName = val.productName
        this.formData.dosageForm = val.dosageForm
        this.formData.registrationNumber = val.registrationNumber
        this.searchForm1.deptDrugLibraryId = val.uid
        this.query(2)
      },
      //标砖药品库表格单选选事件触发
      handleCurrentChange1(val){
        this.formData1.uid = val.uid
        this.formData1.genericName = val.genericName
        this.formData1.specifications = val.specifications
        this.formData1.approvalNumber = val.approvalNumber
        this.formData1.productName = val.productName
        this.formData1.dosageForm = val.dosageForm
        this.formData1.registrationNumber = val.registrationNumber
      },

      handleAvatarSuccess(res, file,fileList) {
       if(res.success == true){
         this.$message({
           message: '文件上传成功',
           type: 'success'
         });
         this.query(1)
       }else{
         console.log(fileList)
         this.fileList = []
         this.$message({
           message: res.message,
           type: 'error'
         });
       }

      },
      beforeAvatarUpload(file){

        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
        const isLt2M = file.size / 1024 / 1024 < 100
        const extension = testmsg === 'xls'
        const extension2 = testmsg === 'xlsx'
        if(!extension && !extension2) {
          this.$message({
            message: '上传文件只能是 xls、xlsx格式!',
            type: 'warning'
          });
          return false
        }
        if(!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 100MB!',
            type: 'warning'
          });
          return false
        }

      },
      // 上传
      uploadUrl(){
        return server.server_base_url+"/odmapi/excel/uploadDrug"
      },
      handleRemove(file, fileList) {

      },
      handlePreview(file) {
      },
      //获取未匹配个数
      getCount(){
        this.$fetch.api_basicData.queryCountDeptDrugibrary()
          .then(response => {
            this.count = response.result
          })
      },
      //保存用户任务状态
      changeTaskStatus(){
        this.$fetch.api_login.taskStatistics()
          .then(response => {
            this.$store.state.user_info.task = response.result
            this.$store.dispatch(SET_USER_INFO, this.$store.state.user_info)
          })
      }
    },
  }
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
   .matching{
     height:100%;
   }
   .binding {
     border:1px solid #e5e5e5;
     padding:20px;
     margin-bottom: 10px;
   }
  .title{
    line-height:40px;
  }
  .button-group{
    text-align: right;
    margin-top:20px;
  }
   .top-title{
     text-align: center;
     padding-top: 10px;
     line-height: 39px;
     font-size:18px;
   }
  .block{
    text-align: right;
  }
  .demo-ruleForm{
    padding-top:10px;
    border:1px solid #e5e5e5;
    border-bottom:none;
  }
  .titlecolor{
    color: #0084FE;
  }
</style>

