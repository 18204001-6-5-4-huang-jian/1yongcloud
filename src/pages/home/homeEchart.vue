<template>
  <div class="homeEchart">
    <el-row :gutter="20">
      <el-col   :xl="12" :lg="12" :md="24" >
        <div  class="homeEchart-col">
          <div  class="home-button-group">
          </div>
          <charts :options="optionA" style="height: 350px;width: 90%;" :autoResize=true></charts>
          <div class="homeEchart-show">
            <router-link to="/detection/description">
              <el-button  type="text">查看更多</el-button>
            </router-link>
          </div>
        </div>
      </el-col>
      <el-col   :xl="12" :lg="12" :md="24" >
        <div  class="homeEchart-col">
          <div class="home-button-group">
          <el-radio-group v-model="searchForm.moneyType" size="mini" @change="createChartsB()">
            <el-radio-button :label="1">使用金额</el-radio-button>
            <el-radio-button :label="2">采购金额</el-radio-button>
          </el-radio-group>
          </div>
          <charts :options="optionB" style="height: 350px;width: 90%;" :autoResize=true></charts>
          <div class="homeEchart-show">
            <router-link :to="{path:'/detection/region'}">
              <el-button  type="text">查看更多</el-button>
            </router-link>
          </div>
        </div>
      </el-col>
    </el-row >
    <el-row :gutter="20">
      <el-col  :xl="12" :lg="12" :md="24">
        <div  class="homeEchart-col">
          <div class="home-button-group">
            <el-radio-group v-model="searchForm1.moneyType" size="mini" @change="createChartsC()">
              <el-radio-button :label="1">使用金额</el-radio-button>
              <el-radio-button :label="2">采购金额</el-radio-button>
            </el-radio-group>
          </div>

          <charts :options="optionC" style="height: 350px;width: 90%;" :autoResize=true></charts>
          <div class="homeEchart-show">
            <router-link to="/detection/drugs">
              <el-button  type="text">查看更多</el-button>
            </router-link>
          </div>
        </div>
      </el-col>
      <el-col  :xl="12" :lg="12" :md="24" >
        <div  class="homeEchart-col">
          <div  class="home-button-group"></div>
          <charts :options="optionD" style="height: 350px;width: 90%;" :autoResize=true></charts>
          <div class="homeEchart-show">
            <!--<router-link to="/detection/description">-->
              <el-button  type="text"></el-button>
            <!--</router-link>-->
          </div>
        </div>
      </el-col>
    </el-row >
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, charts} from 'components'
  import 'echarts/map/js/china.js'
  export default{
    data(){
      return {
        optionA: null,
        optionC: null,
        optionB: null,
        optionD: null,
        searchForm: {
          deptType:1,
          moneyType:1,
          topSize:10,
        },
        searchForm1:{
          pageNum:1,
          topSize:10,
          moneyType:1,
        }
      }
    },
    created(){
      this.createAllCharts()
    },
    methods: {
      createAllCharts(){
        setTimeout(this.createChartsA, 500)
        setTimeout(this.createChartsB, 500)
        setTimeout(this.createChartsC, 500)
        setTimeout(this.createChartsD, 500)
      },
      createChartsA(){
          let option ={
            title : {
              text: '抗肿瘤药物分布图',
              x:'center'
            },
            tooltip:
              {
                trigger: 'item',
              "formatter": function (params) {
               if(params.data){
                 var obj = JSON.parse(JSON.stringify(params));
                 var itemName = obj.name;
                 var str = `
                    <ul>
                    <li>${itemName}<span style="margin-left: 20px;">累计${params.data.drugsNum}种</span></li>
                    <li>化疗：${params.data.chemicalDrugsNum}种</li>
                    <li>靶向：${params.data.targetedDrugsNum}种</li>
                    <li>免疫：${params.data.immunologicalDrugsNum}种</li>
                    <li>内分泌：${params.data.endocrineDrugsNum}种</li>
                    <li>其他：${params.data.otherNum}种</li>
                    </ul>
                    `
                 return str;
                }
               }
              },
            dataRange: {
              min: 0,
              max: 260,
              x: 'left',
              y: 'bottom',
              color: ['#0285FE','#92CBFF'],
              text:['高','低'],
              calculable : false,
            },
            roamController: {
              show: true,
              x: 'right',
              mapTypeControl: {
                'china': true
              }
            },
            series : [
              {
                name: '抗肿瘤药物',
                type: 'map',
                mapType: 'china',
                roam: false,
                itemStyle:{
                  normal:{
                    label:{show:true},
                    borderColor:'#ffffff',

                  },
                  emphasis:{
                      borderWidth:1,
                      borderColor:'#fff',
                      areaColor: '#0285FE',
                      label: {
                        show: true,
                        textStyle: {
                          color: '#fff',
                        }
                      }
//                   label:{show:true}
                  },
                },
                data:[]
              }
            ]
          };

        this.$fetch.api_home.getMapData()
          .then(response => {
              response.result.province.filter(item =>{
                  item.name = item.province;
                  item.value = item.drugsNum
              })
            option.series[0].data  = response.result.province;
            this.optionA = option
          })
      },
      createChartsB(){
       let option = {
         title : {
           text: '抗肿瘤药物金额(按区域) TOP10',
           x:'center'
         },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['甲类','乙类','未纳入'],
            y:'bottom'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '5.5%',
            containLabel: true
          },
          xAxis:  {
            type: 'value',

          },
          yAxis: {
            type: 'category',
            data: [],
            inverse:true,
          },
          series: [
            {
              name: '甲类',
              type: 'bar',
              stack: '总量',
              barWidth : 15,
              label: {
                normal: {
                  show: true,
                  position: 'insideRight',
                  color: '#ffffff',
                }
              },
              itemStyle:{
                normal:{
                    color:"#0084fe",
                }
              },
              data: []
            },
            {
              name: '乙类',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight',
                }
              },
              itemStyle:{
                normal:{
                  color:"#24aaf2"
                }
              },
              data: []
            },
            {
              name: '未纳入',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight',
                }
              },
              itemStyle:{
                normal:{
                  color:"#4eeb93",
                  formatter: "{c}({d}%)",//数值和百分比
                }
              },
              data: []
            },
          ]
        };
        this.$fetch.api_home.arrMoney(this.searchForm)
          .then(response => {
              response.result.stackedMapResult.filter(item =>{
                option.yAxis.data.push(item.country)
                option.legend.data.push(item.country)
                option.series[0].data.push(item.nailMoney)
                option.series[1].data.push(item.secondMoney)
                option.series[2].data.push(item.norMedicalInsuranceAmount)
              })
            this.optionB = option
          })

      },
      createChartsC(){
        this.optionC = {
          title : {
            text: '抗肿瘤药物（通用名）金额TOP10',
            x:'center'
          },
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
            data: [],
            inverse:true,
          },
          series: [
            {
              name: '金额',
              type: 'bar',
              stack: '总量',
              barWidth : 15,
              label: {
                normal: {
                  show: true,
                  position: 'insideRight',
                  color: '#ffffff'
                }
              },
              itemStyle:{
                normal:{
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
        this.$fetch.api_home.statisticalDrug(this.searchForm1)
          .then(response => {
            response.result.list.filter(item =>{
              this.optionC.yAxis.data.push(item.genericName)
              this.optionC.series[0].data.push(item.money)
            })
          })


      },
      createChartsD(){
       this.optionD = {
         title : {
           text: '患者人次均抗肿瘤药物治疗费用变化趋势',
           x:'center'
         },
         tooltip : {
           trigger: 'axis',
           axisPointer : {            // 坐标轴指示器，坐标轴触发有效
             type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
           }
         },
         legend: {
           data:['医保费用','自付费用','自付比例'],
           y:'bottom'
         },
         grid: {
           left: '3%',
           right: '4%',
           bottom: '5%',
           containLabel: true
         },
         xAxis : [
           {
             type : 'category',
             data : ['2013','2014','2015','2016','2017','2018']
           }
         ],
         yAxis : [
           {
             type : 'value',
             name: '单位万元',
           },
           {
             type: 'value',
             name: '自付比例',
             min: 0,
             max: 100,
             interval: 10,
             axisLabel: {
               formatter: '{value} %'
             }
           }
         ],
         series : [

           {
             name:'医保费用',
             type:'bar',
             stack: '广告',
             itemStyle:{
               normal:{
                 color:"#0086FA"
               }
             },
             barWidth : 30,
             data:[120, 132, 170, 210, 300, 340, ]
           },
           {
             name:'自付费用',
             type:'bar',
             stack: '广告',
             itemStyle:{
               normal:{
                 color:"#5ab0ff"
               }
             },
             data:[800, 400, 320, 230, 160, 123,]
           },
           {
             name:'自付比例',
             type:'line',
             stack: '广告',
             itemStyle:{
               normal:{
                 color:"#FF9033"
               }
             },
             data:[80, 65, 53, 43, 32, 15,]
           },
         ]
       };
      },
    },
    components: {
      panelTitle,
      charts
    }
  }
</script>
<style scoped>
  .homeEchart{
  }
  .homeEchart-col{
    background: #ffffff;
    margin-bottom: 20px;
    padding-bottom:10px;
    padding-top: 10px;
  }
  .homeEchart-show{
    text-align: right;
    padding-right:20px;
    float: right;
    margin-top: -30px;
  }
  .home-button-group{
    text-align: right;
    margin-right: 20px;
    height: 30px;
  }
</style>
