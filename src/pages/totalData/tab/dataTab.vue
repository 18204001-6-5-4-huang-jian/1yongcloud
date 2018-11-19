<template>
  <div class="tab-wrapper clearfix">
    <col-table :detailData="detailData"></col-table>
    <!--<ul>-->
      <!--<li id="tab-item1" :class="active == 1?'active':''" @click="changeItem(1)">按行分析结果</li>-->
      <!--&lt;!&ndash;<li id="tab-item2" :class="active == 2?'active':''" @click="changeItem(2)">按列分析结果</li>&ndash;&gt;-->
      <!--<li id="tab-item3" :class="active == 3?'active':''" @click="changeItem(3)">分析结果明细</li>-->
    <!--</ul>-->
    <!--<div class="tab-wrapper-container" v-if="active == 1">-->
       <!--<col-table :detailData="detailData"></col-table>-->
    <!--</div>-->
    <!--&lt;!&ndash;<div class="tab-wrapper-container" v-if="active == 2">&ndash;&gt;-->
       <!--&lt;!&ndash;<row-table :detailData="detailData"></row-table>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--<div class="tab-wrapper-container" v-if="active == 3">-->
       <!--<detail-table></detail-table>-->
    <!--</div>-->
  </div>
</template>

<script>
  import colTable from './colTable'
  import rowTable from './rowTable'
  import detailTable from './detailTable'

  export default {
      props:['detailData'],
    components: {
      colTable,
      rowTable,
      detailTable
    },
    data(){
      return {
        active:1,
        queryResult:{}
      }
    },
    created(){

    },
    methods: {
      //切换tab
      changeItem(count){
          this.active = count
      },

    }

  }
</script>

<style scoped>
  .tab-wrapper ul{
    float: left;
    position: absolute;
    z-index: 999;
  }
  .tab-wrapper{
    min-height:540px;
  }
 .tab-wrapper ul li{
   width: 40px;
   padding: 20px 10px;
   border:1px solid #E9EDF8;
   cursor: pointer;
 }
  .tab-wrapper ul li:hover{
    background: #0084FE;
    color: #ffffff;
  }
  .tab-wrapper-container{
    float: left;
    width:100%;
    padding-left:40px;
    position: relative;
    top:0;

  }
  .active{
    background: #0084FE;
    color: #ffffff;
    border-right:none;
  }
  #tab-item1{
    border-bottom:none;
  }
 #tab-item2{
   border-bottom:none;
 }
</style>

