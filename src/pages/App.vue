<template>
  <div class="wrapper-container">
    <el-container>
      <el-header height="50px">
        <header-section class="header-section"></header-section>
      </el-header>
      <el-container>
        <el-aside width="201px">
          <left-slide></left-slide>
        </el-aside>
        <el-main>
          <main-content :class="['mainContain']">
            <breadcrumb v-if=""></breadcrumb>
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive">
                <!-- 这里是会被缓存的视图组件，比如 Home！ -->
              </router-view>
            </keep-alive>

            <router-view v-if="!$route.meta.keepAlive">
              <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
            </router-view>
          </main-content>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script type="text/javascript">
  import {mainContent, leftSlide,headerSection,breadcrumb} from 'components'
  export default{
    name: 'page',
    components: {
      mainContent,
      leftSlide,
      headerSection,
      breadcrumb:breadcrumb
    }
  }
</script>
<style scoped>
  .wrapper-container{
    height:100%;
    width:100%;
  }
</style>
<style>
  .el-header{
    padding:0;
  }
  .el-main{
    padding:0;
  }
  .el-container{
    height:100%;
    width:100%;
  }
</style>
