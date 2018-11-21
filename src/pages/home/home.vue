<template>
  <div class="home">
    <div v-if="state">
      <common-unfiled :searchType="1" :upload="2"></common-unfiled>
    </div>
    <div v-else>
      <home-echart></home-echart>
    </div>
  </div>

</template>

<script>
  import commonUnfiled from 'src/pages/data/commonUnfiled.vue'
  import homeEchart from './homeEchart.vue'
  export default {
    components: {
      commonUnfiled,
      homeEchart
    },
    data(){
      return {
        state:true,
        taskVisible: true,
      }
    },
    created(){
        if(this.$store.state.user_info.user.deptType == 1){
            this.state = false
        }else if(this.$store.state.user_info.user.deptType == 2){
          this.state = true
        }
    },
    methods: {
//      getChina(){
//        //请求数据 获取省
//        this.$fetch.api_system.getLinkageList('000000')
//          .then(res=>{
//            this.provinceList = res.result;
//            for(let i =0;i<this.provinceList.length;i++){
//                this.$fetch.api_system.getLinkageList(this.provinceList[i].code).then((res) => {
//                  if (res.code === "200") {
//                    if(res.result){
//                      this.provinceList[i].child = res.result;
//                      console.log(this.provinceList)
//                      for(let j =0;j<this.provinceList[i].child.length;j++){
//                        this.$fetch.api_system.getLinkageList(this.provinceList[i].child[j].code)
//                          .then(res=>{
//                            if(res.result){
//                              this.provinceList[i].child[j].child = res.result
//                            }
//                          })
//                      }
//                    }
//                    //  console.log(this.cityList)
//                  }
//                })
//
//            }
//          });
//        setTimeout(()=>{
//          this.$fetch.api_login.login(this.provinceList)
//            .then(response => {
//
//            })
//        },10000)

//      }
    }

  }
</script>

<style scoped>

</style>

