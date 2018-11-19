<template>
  <div class="left-side">
    <!--<div class="left-side-icon"><i class="iconfont icon-zoom-on" @click="$store.state.menu_state = !$store.state.menu_state" v-if="$store.state.menu_state"></i><i class="iconfont icon-zoom-off" @click="$store.state.menu_state = !$store.state.menu_state" v-else></i></div>-->
    <el-menu router unique-opened :default-active="$route.path" background-color="#0084FE"  active-text-color="#ffffff" text-color="#ffffff" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="$store.state.menu_state">
      <template  v-for="(item, index) in nav_menu_data">
        <el-submenu :index="index.toString()+1" v-if="item.child">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item-group v-for="item,index in item.child" :key="index">
            <el-menu-item :index="item.url" :disabled="item.url == '/'">{{item.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.url" v-else>
          <i :class="['iconfont',item.icon]"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isCollapse: false,
        nav_menu_data:[],
      };
    },
    created(){
      this.nav_menu_data = this.$store.state.user_info.user.resource.menu.child
      console.log(this.$store.state.user_info,1)
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

    }
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
