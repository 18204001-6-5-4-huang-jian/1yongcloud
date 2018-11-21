<template>
  <div class="nav-right">
    <router-link to="/message/notice">
       <span>
         <el-badge :value="$store.state.messageCount" :max="99" class="item">
             <i class="iconfont icon-xiaoxi" :style="$store.state.messageCount>0?'margin-right: -20px':'margin-right:0px' "></i>
          </el-badge>
       </span>
    </router-link>
    <router-link to="/organ/material">
      <span>
         <i class="iconfont icon-shezhi border"></i>
      </span>
    </router-link>

    <span class="user-name border">{{$store.state.user_info.user.loginName ? $store.state.user_info.user.loginName : ''}} <img
      src="../image/avatar-1.jpg" alt="" class="user-avatar"></span>
    <el-button size="mini" type="primary" class="quit" @click="user_out()">退出</el-button>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  import {SET_USER_INFO} from 'store/actions/type'
  export default{
    data(){
      return {
        //圆点是否显示
        elBadge: true,
        messageCount: ''
      }
    },
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO
      })
    },
    created(){
      this.$fetch.api_home.countyMeaasge()
        .then((res) => {
          if(res.result == 0){
            this.$store.state.messageCount = ''
          }else{
            this.$store.state.messageCount = res.result
          }
        })
    },
    methods: {
      ...mapActions({
        set_user_info: SET_USER_INFO
      }),
      //退出
      user_out(){
        this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$fetch.api_login.loginout()
            .then(() => {
              this.set_user_info(null)
              setTimeout(this.$router.replace({name: "login"}), 500)
            })
        }).catch(() => {

        })
      },
    }
  }
</script>
<style scoped>
  .nav-right {
    float: right;
    height: 50px;
    line-height: 50px;
    margin-right: 20px;
  }

  .iconfont {
    color: #cdcdcd;
  }

  .user-avatar {
    height: 28px;
    width: 28px;
    line-height: 50px;
    border-radius: 100%;
    margin-left: 10px;
  }

  .user-name {
    font-size: 14px;
    color: #787878;
    padding-right: 10px;
    border-right: 1px solid #e5e5e5;
  }

  .border {
    border-left: 1px solid #e5e5e5;
    margin-left: 10px;
    padding-left: 10px;
  }

  .quit {
    margin-left: 8px;
  }

  .nav-right .iconfont {
    cursor: pointer;
  }
  .item-icon{
    display: inline-block;
    width: 40px;
  }
</style>
<style>
  .nav-right .el-button--mini {
    padding: 4px 8px !important;
  }
  .nav-right .el-badge__content.is-fixed{
    position: relative;
    left:12px;
    top:-4px;
    transform:scale(0.9);
  }
</style>
