<template>
  <div class="left-side">
    <!--<div class="left-side-icon"><i class="iconfont icon-zoom-on" @click="$store.state.menu_state = !$store.state.menu_state" v-if="$store.state.menu_state"></i><i class="iconfont icon-zoom-off" @click="$store.state.menu_state = !$store.state.menu_state" v-else></i></div>-->
    <el-menu mode="vertical" router unique-opened :default-active="$route.path"  background-color="#0084FE"  active-text-color="#ffffff" text-color="#ffffff" class="el-menu-vertical-demo">
      <div  v-for="(totalItem, index) in $store.state.user_info.user.resource.menu.child" :key="totalItem.uid">
        <el-submenu :index="index.toString()+1" v-if="totalItem.child">
          <template slot="title">
            <i :class="totalItem.icon"></i>
            <span slot="title">{{totalItem.name}}</span>
          </template>
          <el-menu-item-group v-for="item,scIndex in totalItem.child" :key="item.uid">
            <el-menu-item :index="item.url" :disabled="item.url == '/'">{{item.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="totalItem.url" v-else>
          <i :class="['iconfont',totalItem.icon]"></i>
          <span slot="title">{{totalItem.name}}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        nav_menu_data:[],
      };
    },

  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 201px;
    min-height: 400px;
  }
  .el-menu-vertical-demo {
    border-right:2px solid #0084FE;
  }
  .el-submenu__title i{
    color: #fff!important;
  }
  .el-menu-item i{
    color: #ffffff;
  }
  .el-menu-vertical-demo .el-menu-item-group ul li{
    padding-left: 60px!important;
  }
  .el-menu-vertical-demo .is-active{
    background: rgb(0, 106, 203)!important;
    opacity: 0.9;
  }
  .iconfont{
    margin-right:5px;
    font-size:18px!important;
  }
</style>
<style>
  .el-submenu__title i{
    color: #ffffff!important;
  }
</style>
