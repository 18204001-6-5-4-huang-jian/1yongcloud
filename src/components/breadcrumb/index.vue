<template>
  <el-breadcrumb class="app-breadcrumb" separator="/" v-if="$route.name != 'home'">
      <el-breadcrumb-item  v-for="(item,index) in levelList" :key="item.path" v-if="item.meta.title">
        <span   v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.meta.title}}</span>
        <router-link   v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
  export default {
    name: "idnex",
    data(){
      return {
        levelList:null
      }
    },
    created() {
      this.getBreadcrumb()
    },
    watch:{
      $route(){
        this.getBreadcrumb()
      }
    },
    methods:{
      getBreadcrumb(){
        let matched=this.$route.matched.filter(item=>item.name)//$route.matched 将会是一个包含从上到下的所有对象 (副本)。
        const first=matched[0]
        if(first && first.name !=='home'){//$route.name当前路由名称  ；$route.redirectedFrom重定向来源的路由的名字
          matched=[{ path: '/', meta: { title: '首页' }}].concat(matched)
        }
        console.log(matched,1)
        this.levelList=matched
        console.log(this.$route)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    height:20px;
    font-size: 14px;
    margin-bottom:10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
