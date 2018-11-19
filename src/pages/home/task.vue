<template>
  <div class="task search">
    <div class="task-title"  v-if="$store.state.user_info.user.deptType == 2">
      欢迎您使用全国肿瘤药物监测系统，同时感谢您对全国肿瘤药物监测工作的支持。为帮助您更好的完成数据上报工作，在您首次登录后，请务必完成以下几个小任务：
    </div>
    <div class="task-title" v-if="$store.state.user_info.user.deptType == 1">
      欢迎您使用全国肿瘤药物监测系统，同时感谢您对全国肿瘤药物监测工作的支持。为帮助您更好的完成肿瘤药物数据监管工作，在您首次登录后，请及时修改密码：
    </div>
    <el-row>
      <el-col :span="12">
        <div class="task-image">
          <img src="../../assets/images/welcome.png" alt="" class="welcome-img">
        </div>
      </el-col>
      <el-col :span="12" class="task-task">
          <el-row class="row" v-if="$store.state.user_info.task.firstLogin == 2">
            <el-col :span="10" class="col">
              修改登录密码
            </el-col>
            <el-col :span="12">
              <router-link to="/organ/password">
                <el-button type="primary">前往</el-button>
              </router-link>
            </el-col>
          </el-row>
        <el-row class="row" v-if="$store.state.user_info.task.importDrug == 2">
          <el-col :span="10" class="col">
            下载药品标准模板（供导入）
          </el-col>
          <el-col :span="12">
            <el-button type="primary" @click="downLoad">下载</el-button>
          </el-col>
        </el-row>
        <el-row class="row" v-if="$store.state.user_info.task.importDrug == 2">
            <el-col :span="10" class="col">
              导入医院药品信息
            </el-col>
          <el-col :span="12">
            <!--<router-link to="/basicdata/matching">-->
            <el-button type="primary" @click="goUpload(1)">前往</el-button>
            <!--</router-link>-->
          </el-col>
        </el-row>
        <el-row class="row" v-if="$store.state.user_info.task.drugInfoContrast == 2">
          <el-col :span="10" class="col">
            药品信息对照
          </el-col>
          <el-col :span="12">
            <!--<router-link to="/basicdata/matching">-->
               <el-button type="primary" @click="goUpload(2)">前往</el-button>
            <!--</router-link>-->
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import server from 'src/common/config'
  export default {
    components: {

    },
    data(){
      return {
        taskVisible: false,
      }
    },
    mounted(){
     this.warning()
    },
    methods: {
      //提示
      warning(){
        this.$message({
          message:'请完成基本任务再进行其他操作',
          type: 'warning'
        })
      },
      downLoad(){
        let url = `${server.server_base_url}basefile/医院药品上传模板.xls`
        window.location.href = url
      },
      goUpload(count){
        if(count == 1){
          if(this.$store.state.user_info.task.firstLogin == 2){
            this.$message({
              message:'请先修改密码',
              type: 'warning'
            })
          }else{
            this.$router.push('/basicdata/matching')
          }
        }else if(count == 2){
          if(this.$store.state.user_info.task.firstLogin == 2){
            this.$message({
              message:'请先修改密码',
              type: 'warning'
            })
          }else if(this.$store.state.user_info.task.importDrug == 2){
            this.$message({
              message:'请先下载模板',
              type: 'warning'
            })
          }else{
            this.$router.push('/basicdata/matching')
          }
        }

      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .task-title{
    font-size:18px;
    text-align: center;
    margin-top:40px;
  }
  .task-task{
    margin-top:50px;
    .row{
      height:80px;
      line-height:80px;
      .col{
        color: blue;
      }
    }
  }
  .task-image{
    text-align: center;
    margin-top:20px;

  }
</style>

