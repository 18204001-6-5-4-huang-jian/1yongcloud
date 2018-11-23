/**
 * Created by parti on 2018/11/9.
 */

export default {
  methods: {
    //查询table结果
    query(count){
      if (count == 1) {
        this.searchForm.deptType = count
        this.allOverNation = '全国'
      } else if (count == 2) {
        this.searchForm.deptType = this.$route.query.deptType
        this.searchForm.province = this.$route.query.province
        // this.allOverNation = this.$route.query.province
      } else if (count == 3) {
        this.searchForm.deptType =  this.$route.query.deptType
        this.searchForm.city =this.$route.query.city
        this.searchForm.rpovince =this.$route.query.rpovince
        // this.allOverNation = row.country
      } else if (count == 4) {
        this.searchForm.deptType = count
        // this.allOverNation = '全国'
      }
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
        legend: {
          data: ['甲类', '乙类', '未纳入'],
          y: '20px',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '7%',
          containLabel: true
        },
        xAxis: {
          type: 'value',

        },
        yAxis: {
          type: 'category',
          data: [],
          inverse: true,
        },
        series: [
          {
            name: '甲类',
            type: 'bar',
            stack: '总量',
            barWidth: 20,
            barMaxWidth: 40,
            label: {
              normal: {
                show: true,
                position: 'insideRight',
                color: '#ffffff',
              }
            },
            itemStyle: {
              normal: {
                color: "#0086FA",
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
            itemStyle: {
              normal: {
                color: "#00D196"
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
            itemStyle: {
              normal: {
                color: "#0CC5EB",
                formatter: "{c}({d}%)",//数值和百分比
              }
            },
            data: []
          },

        ]
      };
      this.echartState = false
      this.$fetch.api_home.arrMoney(this.searchForm)
        .then(response => {
          this.height = (response.result.stackedMapResult.length + 1) * 51 + 'px'
          console.log(this.height)
          this.echartState = true
          this.$nextTick().then(() => {
            response.result.stackedMapResult.filter(item => {
              option.yAxis.data.push(item.country)
              option.legend.data.push(item.country)
              option.series[0].data.push(item.nailMoney)
              option.series[1].data.push(item.secondMoney)
              option.series[2].data.push(item.norMedicalInsuranceAmount)
            })
            this.queryResult = response.result
            this.option = option
          })
        })

    },
  }
}
