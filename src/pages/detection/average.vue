<template>
  <div class="description">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><router-link to="/detection" >监测指标</router-link></el-breadcrumb-item>
        <el-breadcrumb-item><span class="no-redirect">区域分布</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :model="searchForm" ref="form" labelWidth="100px" class="demo-ruleForm" :inline="true">
        <el-form-item label="时间">
          <el-date-picker
            clearable
            v-model="searchForm.time"
            type="daterange"
            align="right"
            unlink-panels
            :size="$store.state.size"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            @change="change()"
            style="width: 100%;"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="药品种类"
        >
          <el-select v-model="searchForm.drug" clearable placeholder="请选择" style="width:200px"
                     :size="$store.state.size">
            <el-option
              v-for="item in $store.state.drugType1"
              :key="item.key"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="医保药物"
        >
          <el-select v-model="searchForm.medicalInsuranceType" clearable placeholder="请选择" style="width:200px"
                     :size="$store.state.size">
            <el-option
              v-for="item in $store.state.medications"
              :key="item.key"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="谈判药物"
        >
          <el-select v-model="searchForm.countryVarietiesNegotialStatus" clearable placeholder="请选择" style="width:200px"
                     :size="$store.state.size">
            <el-option
              v-for="item in $store.state.yesOrNo"
              :key="item.key"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="基本药物"
        >
          <el-select v-model="searchForm.countryBasicDrugStatus" clearable placeholder="请选择" style="width:200px"
                     :size="$store.state.size">
            <el-option
              v-for="item in $store.state.yesOrNo"
              :key="item.key"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="国内外范围"
        >
          <el-select v-model="searchForm.atHomeAndAbroad" clearable placeholder="请选择" style="width:200px"
                     :size="$store.state.size">
            <el-option
              v-for="item in $store.state.national"
              :key="item.key"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="医院类型"
        >
          <el-select v-model="searchForm.hospitalType" clearable placeholder="请选择" style="width:200px"
                     :size="$store.state.size">
            <el-option
              v-for="item in $store.state.hospitalType"
              :key="item.key"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="医院等级"
        >
          <el-select v-model="searchForm.hospitalGrade" clearable placeholder="请选择" style="width:200px"
                     :size="$store.state.size">
            <el-option
              v-for="item in $store.state.hospitalLv"
              :key="item.key"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="医院名称"
        >
          <el-input :size="$store.state.size" v-model="searchForm.hospital"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createCharts()" :size="$store.state.size" class="button-search">查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container1">
      <div class="title">
         <span class="title-name">
           全国抗肿瘤药物金额
         </span>
      </div>
      <div>
        <el-row class="table-row">
          <el-col :span="8" >
            <charts :options="option" class='echart' id="echart" :style="{height:height}" v-if="echartState" :autoResize=true></charts>
          </el-col>
          <el-col :span="16">
            <el-table
              :size="$store.state.size"
              :data="queryResult.stackedMapResult"
              border
              ref="table"
              style="width: 98%;">
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                label="省市"
                v-if="searchForm.deptType == 1"
              >
                <template slot-scope="scope">
                  <router-link :to="{path:'/detection/regionProvince',query:{province:scope.row.country,deptType:2}}">
                    <el-button type="text">{{scope.row.country}}</el-button>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column
                label="市"
                v-if="searchForm.deptType == 2"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="query(scope.row,3)">{{scope.row.country}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="医院"
                width="110"
                v-if="searchForm.deptType == 3"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.country}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="区域"
                v-if="searchForm.deptType == 4"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.country}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="医保金额占比"
                width="110"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.alreadyMedicalInsuranceAmountProportion | toFixed}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="alreadyMedicalInsuranceAmount"
                label="医保金额"
              >
              </el-table-column>
              <el-table-column
                prop="allMoney"
                label="全部金额"
              >
              </el-table-column>
              <el-table-column
                prop="norMedicalInsuranceAmount"
                label="未纳入医保金额"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="nailMoney"
                label="甲类金额"
              >
              </el-table-column>
              <el-table-column
                prop="secondMoney"
                label="乙类金额"
              >
              </el-table-column>
              <el-table-column
                label="未纳入医保金额占比"
                width="150"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.norMedicalInsuranceAmountProportion | toFixed}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="甲类金额占比"
                width="120"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.nailMoneyProportion | toFixed}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="乙类金额占比"
                width="120"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.secondMoneyProportion | toFixed}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import {charts} from 'components'
  export default {
    components: {
      charts
    },
    data(){
      return {
        allOverNation: '',
        searchForm: {
          deptType: 1,
          moneyType: 1,
          indexType: 1,
          topSize: 10,
          province: '',
          startDate: '',
          endDate: '',
          atHomeAndAbroad: '',
          countryVarietiesNegotialStatus: '',
          hospitalType: '',
          hospitalGrade: '',
          hospital: '',
          drug: '',
          medicalInsuranceType: ''
        },
        today: new Date(),
        button: 3,
        buttonArea: 1,
        option: {},
        //查询结果
        queryResult: {
          num: 1,//当前页
          topSize: 10,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
        echartState:true,
        height:''
      }
    },
    created(){

    },
    methods: {
      change(value){
        if (this.searchForm.time) {
          this.searchForm.startDate = this.searchForm.time[0]
          this.searchForm.endDate = this.searchForm.time[1]
        } else {
          this.searchForm.startDate = ''
          this.searchForm.endDate = ''
        }

      }

    }

  }
</script>

<style scoped>

  .button-search {
    margin-left: 30px;
  }
  .table-container1{
    background: #FFFFFF;
    border-radius: 4px;
    padding-bottom: 20px;
  }
  .title {
    height: 50px;
    line-height: 50px;
    background: #ffffff;
    margin-top: 10px;
    border-bottom: 1px solid #e5e5e5;
  }

  .button-group {
    /* height: 70px; */
    text-align: left;
    line-height: 70px;
    border-bottom: 1px solid #e5e5e5;
  }

  .button-group-button {
    margin-left: 10px;
  }

  .title span .el-radio-group {
    margin-right: 20px;
    display: inline-block;
  }

  .title-name {
    width: 100%;
    display: block;
    text-align: center;
    float: left;

  }

  .table-row-title {
    /* padding-top: 40px; */
    padding-left: 30px;
    height: 20px;
    line-height: 40px;
    font-size: 14px;
  }
  .echart{
    width:100%;
  }
  .table {
    background: #ffffff;
    padding-bottom: 20px;
  }

  .table-row {
    margin-top: 40px;
    font-size: 14px;
  }
</style>

