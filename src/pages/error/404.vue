<template>
  <div class="error-page">
    <div class="errorWarp">
      <div class="image">
        <div class="gohome">
          <img :src="image" class="img"/><br>
        </div>
       <div class="gohome">
         <router-link :to="path" class="backBtn" tag="span">返回首页</router-link>
       </div>
      </div>
      <!--<h2 class="title" v-text="title"></h2>-->
      <!--<h3 class="desc" v-text="desc"></h3>-->

    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'noPage',
    data() {
      return {
        image: require('./images/404_err.png'),
        title: 'PAGE NOT FOUND',
        desc: 'WE COULDN’T FIND THIS PAGE',
        path: '/'
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .error-page {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    text-align: center;
    .errorWarp {
      width: 1000px;
      margin: 10% auto auto auto;
      .image {
        margin: 20px auto;
        width: 800px;;
        padding: 20px;
      }
      .title {
        color: #fff;
        font-size: 64px;
        padding: 15px 30px;
        margin-bottom: 20px;
        margin-top: 50px;
        font-weight: bold;
      }
      .desc {
        font-size: 32px;
        color: #474747;
        font-weight: bold;
        line-height: 30px;
      }
      .backBtn {
        color: #0079e8;
        padding: 5px 30px;
        border: 1px solid #0079e8;
        border-radius: 30px;
        cursor: pointer;
        height: 80px;
        line-height: 80px;
        margin-left: -100px;
      }
      .img {
        width:50%;
        height:50%;
      }
      .gohome{
        width:100%;
        text-align: center;
      }
    }
  }
</style>
