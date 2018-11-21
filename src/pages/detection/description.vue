<template>
  <div class="description">
    <div class="search">
      <el-form :model="searchForm" ref="form" labelWidth="100px" class="demo-ruleForm" :inline="true">
        <el-form-item
          label="药品种类"
        >
          <el-select v-model="searchForm.drug" clearable placeholder="请选择" style="width:200px" :size="$store.state.size">
            <el-option
              v-for="item in $store.state.drugType1"
              :key="item.value"
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
          <el-select v-model="searchForm.atHomeAndAbroad" clearable placeholder="请选择" style="width:200px" :size="$store.state.size">
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
          <el-select v-model="searchForm.hospitalType" clearable placeholder="请选择" style="width:200px" :size="$store.state.size">
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
          <el-select v-model="searchForm.hospitalGrade" clearable placeholder="请选择" style="width:200px" :size="$store.state.size">
            <el-option
              v-for="item in $store.state.hospitalLv"
              :key="item.key"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createCharts()" :size="$store.state.size" class="button-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <div class="title">
         <span class="title-name">
           抗肿瘤药物使用种类分布情况
         </span>
      </div>
      <div class="button-group">
        <el-row>
          <el-radio-group v-model="searchForm.pageSize"  :size="$store.state.size" @change="createCharts()"
                          class="button-group-button">
            <el-radio-button :label="10">TOP10</el-radio-button>
            <el-radio-button :label="20">TOP20</el-radio-button>
            <el-radio-button :label="100">全部</el-radio-button>
          </el-radio-group>
          <el-radio-group v-model="searchForm.type"  :size="$store.state.size" @change="createCharts()" class="button-group-button">
            <el-radio-button :label="1">按省市</el-radio-button>
            <el-radio-button :label="5">按区域</el-radio-button>
          </el-radio-group>
        </el-row>
      </div>
      <p class="table-row-title">截止到{{today | dateFormater}}，全国抗肿瘤药物累计使用{{queryResult.countryNum}}种</p>
      <el-row style="margin-top: 40px;padding-bottom: 20px;">
        <el-col :span="8" >
          <charts :options="option" class='echart'  :style="{height:height}" :autoResize=true v-if="echartState"></charts>
        </el-col>
        <el-col :span="16">
          <el-table
            :size="$store.state.size"
            :data="queryResult.list.list"
            border
            style="width: 98%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              label="省市"
              v-if="searchForm.type == 1"
            >
              <template slot-scope="scope">
                <router-link :to="{path:'/detection/province',query:{province:scope.row.province,drugsNum:scope.row.drugsNum}}">
                  <span>{{scope.row.province}}</span>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="区域"
              v-if="searchForm.type == 5"
            >
              <template slot-scope="scope">
                <router-link :to="{path:'/detection/province',query:{area:scope.row.area,drugsNum:scope.row.drugsNum}}">
                  <span>{{scope.row.area}}</span>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="覆盖比例"
            >
              <template slot-scope="scope">
                <span>{{scope.row.rate}}%</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="drugsNum"
              label="药品使用种类"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{path:'/detection/drugList',query:{province:scope.row.province,drug:'',tableTitle:scope.row.province}}"
                  v-if="scope.row.drugsNum/1>0">
                  <span>{{scope.row.drugsNum}}</span>
                </router-link>
                <span v-else>0</span>
              </template>
            </el-table-column>
            <el-table-column
              label="化学药物">
              <template slot-scope="scope">
                <router-link
                  :to="{path:'/detection/drugList',query:{province:scope.row.province,drug:'1',tableTitle:scope.row.province}}"
                  v-if="scope.row.chemicalDrugsNum/1>0">
                  <span>{{scope.row.chemicalDrugsNum}}</span>
                </router-link>
                <span v-else>0</span>
              </template>
            </el-table-column>
            <el-table-column
              label="靶向药物">
              <template slot-scope="scope">
                <router-link
                  :to="{path:'/detection/drugList',query:{province:scope.row.province,drug:'2',tableTitle:scope.row.province}}"
                  v-if="scope.row.targetedDrugsNum/1>0">
                  <span>{{scope.row.targetedDrugsNum}}</span>
                </router-link>
                <span v-else>0</span>
              </template>
            </el-table-column>
            <el-table-column
              label="免疫药物">
              <template slot-scope="scope">
                <router-link
                  :to="{path:'/detection/drugList',query:{province:scope.row.province,drug:'3',tableTitle:scope.row.province}}"
                  v-if="scope.row.immunologicalDrugsNum/1>0">
                  <span>{{scope.row.immunologicalDrugsNum}}</span>
                </router-link>
                <span v-else>0</span>
              </template>
            </el-table-column>
            <el-table-column
              label="内分泌药物">
              <template slot-scope="scope">
                <router-link
                  :to="{path:'/detection/drugList',query:{province:scope.row.province,drug:'4',tableTitle:scope.row.province}}"
                  v-if="scope.row.endocrineDrugsNum/1>0">
                  <span>{{scope.row.endocrineDrugsNum}}</span>
                </router-link>
                <span v-else>0</span>
              </template>
            </el-table-column>
            <el-table-column
              label="其他药物">
              <template slot-scope="scope">
                <router-link
                  :to="{path:'/detection/drugList',query:{province:scope.row.province,drug:'5',tableTitle:scope.row.province}}"
                  v-if="scope.row.otherNum/1>0">
                  <span>{{scope.row.otherNum}}</span>
                </router-link>
                <span v-else>0</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
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
          countryBasicDrugStatus: '',
          type: 1,
          pageSize: 10,
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
          pageNum: 1,//当前页
          pageSize: 10,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
        echartState:true,
        height:'400px'
      }
    },
    mounted(){
      this.createCharts()
    },
    methods: {

      async createCharts(){
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
            top:'0%',
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
                  color: function (params) {
                    return "#22507b"
                  },
                }
              },
              data: []
            },
          ]
        };
        this.echartState = false
        this.$fetch.api_home.findListData(this.searchForm)
          .then(response => {
            this.height = (response.result.list.list.length+1) *34+'px'
            this.echartState = true
            this.$nextTick().then(()=>{
              this.queryResult = {}
              this.queryResult = response.result
              if(response.result.value){
                option.series[0].data = JSON.parse(response.result.value);
                option.yAxis.data = JSON.parse(response.result.name);
              }
              this.option = option
            })

          })
      },

    }

  }
</script>

<style scoped>
  .description .el-form-item {
    margin-bottom: 10px;
  }
  .title {
    height: 50px;
    line-height: 50px;
    background: #ffffff;
    margin-top: 10px;
    border-bottom: 1px solid #e5e5e5;
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

  .table {
    background: #ffffff;
  }


  .button-group {
    height: 70px;
    text-align: left;
    line-height: 70px;
    border-bottom: 1px solid #e5e5e5;
  }

  .button-group-button {
    margin-left: 20px;
  }
  .echart{
    width:100%;
  }
  .table-row-title {
    padding-left: 30px;
    height: 20px;
    line-height: 40px;
    font-size: 14px;
  }
</style>

