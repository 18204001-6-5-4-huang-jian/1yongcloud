<template>
  <div class="help-center">
    <div class="button-group">
      <el-radio-group v-model="searchForm1.moneyType" size="mini" @change="createChartsA()"  class="home-button-group">
        <el-radio-button :label="1">使用金额</el-radio-button>
        <el-radio-button :label="2">采购金额</el-radio-button>
      </el-radio-group>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <charts :options="optionA" style="height: 350px;width: 90%;" :autoResize=true @getYear="getYear"></charts>
      </el-col>
      <el-col :span="12">
        <charts :options="optionB" style="height: 350px;width: 90%;" :autoResize=true></charts>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {charts} from 'components'
  export default {
      components:{
        charts
      },
    data() {
      return {
        optionA: null,
        optionB: null,
        searchForm:{
          genericName:this.$route.query.genericName,
          moneyType:1
        },
        searchForm1:{
          genericName:this.$route.query.genericName,
          moneyType:1,
          year:''
        }
      }
    },
    created(){
      this.createAllCharts()
    },
    methods: {
      createAllCharts(){
        setTimeout(this.createChartsA, 500)
      },
      createChartsA(){
        let option = {
          title : {
            text: this.$route.query.genericName+'金额情况',
            x:'center'
          },
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              name:'年',
              data : [],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              name:'单位（万元）'
            }
          ],
          series : [
            {
              name:'金额',
              type:'bar',
              barWidth: '60%',
              data:[]
            }
          ]
        };
        this.optionA = option
        this.$fetch.api_home.byYear(
            this.searchForm1
        )
          .then(response => {
            response.result.filter(item =>{
              option.series[0].data.push(item.money)
              option.xAxis[0].data.push(item.time)
            })
            this.optionA = option
            setTimeout(this.createChartsB(option.xAxis[0].data[0]), 500)
          })
      },
      createChartsB(params){
        let option = {
          title : {
            text: params+'年'+this.$route.query.genericName+'金额情况',
            x:'center'
          },
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              name:'月',
              data : [],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              name:'单位（万元）'
            }
          ],
          series : [
            {
              name:'金额',
              type:'bar',
              barWidth: '25',
              data:[]
            }
          ]
        };
        this.searchForm1.year = params
        this.$fetch.api_home.byMonth(
          this.searchForm1
        )
          .then(response => {
            response.result.filter(item =>{

//              var money = item.money.toFixed(2)
              option.series[0].data.push(item.money)
              option.xAxis[0].data.push(item.time)

            })
            this.optionB = option

          })
      },
      getYear(value){
        this.createChartsB(value.name)
      }
    }
  }
</script>

<style scoped>
  .help-center {
    background: #ffffff;
    padding: 20px;
  }
  .button-group{
    text-align: right;
  }
</style>

