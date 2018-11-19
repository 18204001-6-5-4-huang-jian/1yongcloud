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

    }

  }
</script>

<style scoped>

</style>

