<template>
  <div class="tatalData">
    <div class="search">
      <el-form :model="searchForm" ref="searchForm" labelWidth="80px" class="demo-ruleForm" :show-message="false"
               :inline="true">
        <el-form-item
          label="医院名称"
        >
          <el-input placeholder="请输入机构名称"  v-model="searchForm.hosName" :size="$store.state.size" clearable  class="input-width"></el-input>
        </el-form-item>
        <el-form-item
          label="隶属关系"
        >
          <el-select v-model="searchForm.relation" placeholder="请选择" class="input-width" clearable :size="$store.state.size">
            <el-option
              v-for="item in $store.state.subjectionRelation"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所在省"
        >
          <el-select v-model="searchForm.province" placeholder="请选择" class="input-width" clearable :size="$store.state.size"
                     @change="provinceChange">
            <el-option
              v-for="item in provinceList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所在市"
        >
          <el-select v-model="searchForm.city" placeholder="请选择"  class="input-width" clearable :size="$store.state.size" @change="cityChange">
            <el-option
              v-for="item in cityList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所在区"
        >
          <el-select v-model="searchForm.district" placeholder="请选择"  class="input-width" clearable :size="$store.state.size">
            <el-option
              v-for="item in areaList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="医院等级"
        >
          <el-select v-model="searchForm.grade" placeholder="请选择"  class="input-width" clearable :size="$store.state.size">
            <el-option
              v-for="item in $store.state.hospitalLv"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="医院类型"
        >
          <el-select v-model="searchForm.type" placeholder="请选择"  class="input-width" clearable :size="$store.state.size">
            <el-option
              v-for="item in $store.state.hospitalType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query()" :size="$store.state.size" class="button-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container content-page">
      <el-tabs v-model="searchForm.upStatus" type="card" @tab-click="query()">
        <el-tab-pane label="有数据医院" name="1">
          <data-table :list="queryResult.list" :type="searchForm.upStatus"></data-table>
        </el-tab-pane>
        <el-tab-pane label="无数据医院" name="0">
          <data-table :list="queryResult.list" :type="searchForm.upStatus"></data-table>
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
  import dataTable from './dataTable'
  export default {
    components: {
      dataTable,

    },
    data(){
      return {
        activeName: 'first',
        type: 1,
        searchForm: {
          deptName: '',
          subjectionRelation: '',
          hospitalGrade: '',
          hospitalType: '',
          province: '',
          city: '',
          district: '',
          upStatus: '1',
          pageNum: 1,
          pageSize: 10
        },
        provinceList: [],
        areaList: [],
        cityList: [],
        tableData: [],
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
      this.getProvince()
      this.query()
    },
    methods: {
      async provinceChange(code){
          if(code){
            this.searchForm.city = ''
            this.searchForm.district = ''
            //请求市数据
            const res = await this.$fetch.api_system.getLinkageList(code);
            if (res.code === "200") {
              // this.ruleForm.deptCity = "";
              this.cityList = res.result;
            }
          }
      },
      async cityChange(code){
          if(code){
            this.searchForm.district = ''
            //请求区数据
            const res = await this.$fetch.api_system.getLinkageList(code);
            if (res.code === "200") {
              // this.ruleForm.deptDistrict = "";
              this.areaList = res.result;
            }
          }
      },
      async getProvince(){
        //请求数据 获取省
        const res = await this.$fetch.api_system.getLinkageList('000000');
        if (res.code === "200") {
          this.provinceList = res.result;
        }
      },
      query(){
        this.$fetch.api_total.hosList(this.searchForm)
          .then((res) => {
            this.queryResult = res.result
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

  .totalData-tab {
    margin-top: 20px;
  }
  .block{
    text-align: right;
    margin-top: 10px;
    height: 30px;
  ;
  }
  .input-width{
    width: 220px;
  }
</style>

<style>
  .tatalData .search .el-form-item {
    margin-bottom: 10px;
  }
</style>
