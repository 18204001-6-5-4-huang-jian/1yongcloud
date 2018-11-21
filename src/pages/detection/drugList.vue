<template>
  <div class="description">
    <div class="search">
      <el-form :model="searchForm" ref="form" labelWidth="100px" class="demo-ruleForm" :inline="true">
        <el-form-item
          label="医保药物"
        >
          <el-select v-model="searchForm.medicalInsuranceType" placeholder="请选择" clearable style="width:200px" size="small">
            <el-option
              v-for="item in $store.state.medications"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="谈判药物"
        >
          <el-select v-model="searchForm.countryVarietiesNegotialStatus" placeholder="请选择" clearable style="width:200px" size="small">
            <el-option
              v-for="item in $store.state.yesOrNo"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="基本药物"
        >
          <el-select v-model="searchForm.countryBasicDrugStatus" placeholder="请选择" clearable style="width:200px" size="small">
            <el-option
              v-for="item in $store.state.yesOrNo"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="国内外范围"
        >
          <el-select v-model="searchForm.hospitalGrade" placeholder="请选择" style="width:200px"clearable size="small">
            <el-option
              v-for="item in $store.state.national"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="医院类型"
        >
          <el-select v-model="searchForm.hospitalGrade" placeholder="请选择" style="width:200px"clearable  size="small">
            <el-option
              v-for="item in $store.state.hospitalLv"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="医院等级"
        >
          <el-select v-model="searchForm.medicalInsuranceType" placeholder="请选择" style="width:200px" clearable size="small">
            <el-option
              v-for="item in $store.state.hospitalLv"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="query()" size="small" class="button-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">
         <span class="title-name">
           {{$route.query.tableTitle}}肿瘤药物清单
         </span>
    </div>
    <div class="table">
      <el-tabs v-model="searchForm.drug" type="card" @tab-click="tabClick()">
        <el-tab-pane label="全部" name="0">
          <common-table :queryResult="queryResult"></common-table>
        </el-tab-pane>
        <el-tab-pane label="化学药品" name="1">
          <common-table :queryResult="queryResult"></common-table>
        </el-tab-pane>
        <el-tab-pane label="靶向药品" name="2">
          <common-table :queryResult="queryResult"></common-table>
        </el-tab-pane>
        <el-tab-pane label="免疫药品" name="3">
          <common-table :queryResult="queryResult"></common-table>
        </el-tab-pane>
        <el-tab-pane label="内分泌药品" name="4">
          <common-table :queryResult="queryResult"></common-table>
        </el-tab-pane>
        <el-tab-pane label="其他药物" name="5">
          <common-table :queryResult="queryResult"></common-table>
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
  import commonTable from './common/index.vue'
  export default {
    components: {
      commonTable
    },
    data(){
      return {
        activeState:'first',
        searchForm: {
          drug:'0',
          medicalInsuranceType:'',
          countryVarietiesNegotialStatus:'',
          countryBasicDrugStatus:'',
          hospitalGrade:'',
          province:this.$route.query.province,
          city:this.$route.query.city,
          hospital:this.$route.query.hospital,
          type:4,
          pageNum:1,
          pageSize:10,
        },
        //查询结果
        queryResult: {
          pageNum: 1,//当前页
          pageSize: 10,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
      }
    },
    mounted(){
      if(this.$route.query.drug)  {
          this.searchForm.drug = this.$route.query.drug
      }
      this.query()
    },
    methods: {
      tabClick(){
        this.searchForm.pageNUm = 1
        this.searchForm.pageSize = 10
        this.query()
      },
       query(){
         this.$fetch.api_home.findListData(this.searchForm)
           .then(response => {
             this.queryResult = response.result.medicine
           })
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

    }

  }
</script>

<style scoped>
  .description .search {
    background: #ffffff;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .description .el-form-item{
    margin-bottom:0px;
  }
  .button-search{
    margin-left:30px;
  }
  .title{
    height:50px;
    line-height:50px;
    background: #ffffff;
    margin-top:10px;
  }
  .button-group{
    position: relative;
    top:-50px;
    /*right:20px;*/
    float: right;
  }
  .title span .el-radio-group{
    margin-right:20px;
    display: inline-block;
  }
  .title-name{
    width:100%;
    display: block;
    text-align: center;
    float: left;
  }
  .table{
    background: #ffffff;
    padding:10px;
  }
  .block{
    text-align: right;
    margin-top: 10px;
    height: 30px;
  ;
  }
</style>
<style>
  .el-radio-group{
    border-bottom:none!important;
  }
  .el-radio-button{
    border-bottom:none!important;
  }
</style>
