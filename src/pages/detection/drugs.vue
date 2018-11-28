<template>
  <div class="description">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><router-link to="/detection" >监测指标</router-link></el-breadcrumb-item>
        <el-breadcrumb-item><span class="no-redirect">药品分布</span></el-breadcrumb-item>
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
            style="width: 100%;"
            @change="change()"
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
          <el-select v-model="searchForm.medicalInsuranceType" clearable placeholder="请选择"  style="width:200px"
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
        <el-form-item
          label="通用名"
        >
          <el-input :size="$store.state.size" v-model="searchForm.genericName"></el-input>
        </el-form-item>
        <el-form-item
          label="商品名"
        >
          <el-input :size="$store.state.size" v-model="searchForm.productName"></el-input>
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
           抗肿瘤药物（通用名）累计金额
         </span>
      </div>
      <div class="table">
        <div class="button-group">
          <el-row>
            <el-radio-group v-model="searchForm.moneyType" :size="$store.state.size" @change="query()"
                            class="button-group-button">
              <el-radio-button :label="1">使用金额</el-radio-button>
              <el-radio-button :label="2">采购金额</el-radio-button>
            </el-radio-group>
            <el-radio-group v-model="searchForm.topSize" :size="$store.state.size" @change="query()"
                            class="button-group-button">
              <el-radio-button :label="10">TOP10</el-radio-button>
              <el-radio-button :label="20">TOP20</el-radio-button>
            </el-radio-group>
          </el-row>
        </div>
        <!--<p class="table-row-title">截止到{{today | dateFormater}}，全国抗肿瘤药物累计使用160种</p>-->
        <el-row class="table-row">
          <el-col :span="8">
            <charts :options="option" class='echart' :style="{height:height}" :autoResize=true
                    v-if="echartState"></charts>
          </el-col>
          <el-col :span="16">
            <el-table
              :size="$store.state.size"
              :data="queryResult.list"
              border
              ref="table"
              style="width: 98%;">
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                label="药品名"
                width="150"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <router-link :to="{path:'/detection/drugDetail',query:{genericName:scope.row.genericName}}">
                    <el-button type="text">{{scope.row.genericName}}</el-button>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column
                width="150"
                :show-overflow-tooltip="true"
                prop="productName"
                label="商品名"
              >
              </el-table-column>
              <el-table-column
                width="150"
                :show-overflow-tooltip="true"
                prop="productionUnits"
                label="生产单位"
              >
              </el-table-column>
              <el-table-column
                width="150"
                :show-overflow-tooltip="true"
                label="剂型"
              >
                <template slot-scope="scope">
                  {{scope.row.dosageForm | dosageForm}}
                </template>
              </el-table-column>
              <el-table-column
                width="150"
                :show-overflow-tooltip="true"
                prop="specifications"
                label="规格"
              >
              </el-table-column>
              <el-table-column
                width="150"
                :show-overflow-tooltip="true"
                prop="approvalNumber"
                label="批准文号"
              >
              </el-table-column>
              <el-table-column
                width="150"
                :show-overflow-tooltip="true"
                prop="registrationNumber"
                label="注册证号"
              >
              </el-table-column>
              <el-table-column
                width="150"
                :show-overflow-tooltip="true"
                prop="money"
                label="金额（万元）"
              >
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                small
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
                :current-page="queryResult.num"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="queryResult.topSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryResult.total">
              </el-pagination>
            </div>
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
        searchForm: {
          num: 1,
          topSize: 10,
          moneyType: 1,
          startDate: '',
          endDate: '',
          atHomeAndAbroad: '',
          countryVarietiesNegotialStatus: '',
          hospitalType: '',
          hospitalGrade: '',
          hospital: '',
          drug: '',
          medicalInsuranceType: '',
          genericName: '',
          productName: ''
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
        echartState: true,
        height: '400px'
      }
    },
    created(){
      this.query()
    },
    mounted(){

    },
    methods: {
      query(){
        this.createCharts()
      },
      createCharts(){
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '5.5%',
            top: 0,
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: [],
            inverse: true,
          },
          series: [
            {
              name: '金额',
              type: 'bar',
              stack: '总量',
              barWidth: 20,
              label: {
                normal: {
                  show: true,
                  position: 'insideRight',
                  color: '#ffffff'
                }
              },
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      {offset: 0, color: '#00E7DC'},
                      {offset: 1, color: '#00CAC0'}

                    ]
                  )
                }
              },
              data: []
            },
          ]
        };
        this.echartState = false
        this.$fetch.api_home.statisticalDrug(this.searchForm)
          .then(response => {
            this.height = (response.result.list.length + 1) * 51 + 'px'
            this.echartState = true
            this.$nextTick().then(() => {
              response.result.list.filter(item => {
                option.yAxis.data.push(item.genericName)
                option.series[0].data.push(item.money)
              })
              this.option = option
              this.queryResult = response.result
            })
          })
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(topSize) {
        this.searchForm.topSize = topSize
        this.query()
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.searchForm.num = currentPage
        this.query()
      },
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
    padding-left: 30px;
    height: 20px;
    line-height: 40px;
    font-size: 14px;
  }

  .table {
    background: #ffffff;
    padding-bottom: 20px;
  }

  .table-row {
    margin-top: 40px;
    font-size: 14px;
  }

  .block {
    text-align: right;
    margin-top: 10px;
    height: 30px;;
  }
</style>

