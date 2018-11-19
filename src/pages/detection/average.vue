<template>
  <div class="description">
    <div class="search">
      <el-form :model="searchForm" ref="form" labelWidth="100px" class="demo-ruleForm" :inline="true">
        <el-form-item
          label="时间"
        >
          <el-date-picker
            v-model="searchForm.value6"
            type="daterange"
            size="small"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="药品种类"
        >
          <el-select v-model="searchForm.deptType" placeholder="请选择" style="width:200px" size="small">
            <el-option
              v-for="item in $store.state.mechanismType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="医保药物"
        >
          <el-select v-model="searchForm.countryType" placeholder="请选择" style="width:200px" size="small">
            <el-option
              v-for="item in $store.state.mechanismLv"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="谈判药物"
        >
          <el-select v-model="searchForm.hospitalType" placeholder="请选择" style="width:200px" size="small">
            <el-option
              v-for="item in $store.state.hospitalType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="基本药物"
        >
          <el-select v-model="searchForm.hospitalGrade" placeholder="请选择" style="width:200px" size="small">
            <el-option
              v-for="item in $store.state.hospitalLv"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="国内外范围"
        >
          <el-select v-model="searchForm.hospitalGrade" placeholder="请选择" style="width:200px" size="small">
            <el-option
              v-for="item in $store.state.hospitalLv"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="剂型"
        >
          <el-select v-model="searchForm.hospitalGrade" placeholder="请选择" style="width:200px" size="small">
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
          <el-select v-model="searchForm.hospitalGrade" placeholder="请选择" style="width:200px" size="small">
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
          <el-select v-model="searchForm.hospitalGrade" placeholder="请选择" style="width:200px" size="small">
            <el-option
              v-for="item in $store.state.hospitalLv"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="submitForm('form')" size="small" class="button-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">
         <span class="title-name">
           抗肿瘤药物使用种类分布情况
         </span>
      <span class="button-group">
           <el-radio-group v-model="button" size="small">
              <el-radio-button label="1">TOP10</el-radio-button>
              <el-radio-button label="2">TOP20</el-radio-button>
              <el-radio-button label="3">全部</el-radio-button>
            </el-radio-group>
          <el-radio-group v-model="buttonArea" size="small">
              <el-radio-button label="1">按省市</el-radio-button>
              <el-radio-button label="2">按区域</el-radio-button>
            </el-radio-group>
       </span>
    </div>
    <div class="table">
      <el-row>
        <el-col :span="12">
          <charts :options="option" style="height: 550px;width: 100%;"></charts>
        </el-col>
        <el-col :span="12">
          <el-table
            size="small"
            :data="tableData"
            border
            style="width: 98%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="date"
              label="覆盖比例"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="药品使用种类"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="化学药物">
            </el-table-column>
            <el-table-column
              prop="address"
              label="靶向药物">
            </el-table-column>
            <el-table-column
              prop="address"
              label="免疫药物">
            </el-table-column>
            <el-table-column
              prop="address"
              label="内分泌药物">
            </el-table-column>
            <el-table-column
              prop="address"
              label="其他">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { charts } from 'components'
  export default {
    components: {
      charts
    },
    data(){
      return {
        searchForm: {},
        button:3,
        buttonArea:1,
        option:{},
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    mounted(){
      this.createCharts()
    },
    methods: {
      createCharts(){
        this.option = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '5.5%',
            containLabel: true
          },
          xAxis:  {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['北京','北京','北京','北京','北京','北京','北京','北京','北京','北京']
          },
          series: [
            {
              name: '金额',
              type: 'bar',
              stack: '总量',
              barWidth : 30,
              label: {
                normal: {
                  show: true,
                  position: 'insideRight',
                  color: '#ffffff'
                }
              },
              itemStyle:{
                normal:{
                  color: function(params) {
                    return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
                  },
                }
              },
              data: [120, 132, 101, 134, 90, 230, 210,210,210,600]
            },
          ]
        };
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
    border-bottom:1px solid #e5e5e5;
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
  }
</style>

