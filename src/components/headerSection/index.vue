<template>
  <div class="header-section">
    <img src="./image/logo.png" alt="" class="logo">
    <span class="header-section-title">全国抗肿瘤药物临床应用监测网</span>
    <nav-right></nav-right>
   </div>
</template>
<script type="text/javascript">
  import navRight from './navRight'
  export default{
    components: {
      navRight
    },
    methods: {

    }
  }
</script>
<style scoped>
  .header-section{
    height:50px;
    background: #fff;
  }
  .logo{
    height: 20px;
    margin-right: 20px;
    margin-left: 40px;
  }
  .header-section-title{
    color: #2D2D2D;
    font-size:16px;
    line-height:50px;
    font-weight: 700;
    margin-left:20px;
  }
</style>
