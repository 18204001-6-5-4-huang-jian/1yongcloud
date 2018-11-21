<template>
  <div class="login">
    <el-container>
      <el-header class="el-header"><img src="./images/logo.png" alt="" class="logo">全国抗肿瘤药物临床应用监测网</el-header>
      <el-main class="el-main">
        <div class="login-form">
          <img src="./images/logo.png" alt="" class="logo">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="" prop="loginName">
              <el-input v-model="ruleForm.loginName" ref="loginName" placeholder="请输入用户名">
                <i slot="prefix" class="iconfont icon-yonghu"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="pwd">
              <el-input v-model="ruleForm.pwd" placeholder="请输入密码" ref="pwd" type="password">
                <i slot="prefix" class="iconfont icon-mima"></i>
              </el-input>
            </el-form-item>
            <!--<el-form-item label="" prop="phone">-->
              <!--<el-input v-model="ruleForm.phone" placeholder="请输入手机号" ref="phone">-->
                <!--<i slot="prefix" class="iconfont icon-shouji"></i>-->
              <!--</el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="" prop="capText">
              <el-input v-model="ruleForm.capText" placeholder="验证码" :maxLength="4" class="input-verification" @keyup.enter.native="submitForm('ruleForm')"
                        ref="smsAuthCode">
                <i slot="prefix" class="iconfont icon-yanzhengma"></i>
              </el-input>
              <span class="svg-container" @click="changeImgUrl"><img id="codeImg"
                                                                     style="width: 90px;vertical-align:middle;height:38px;margin-top: -2px;"
                                                                     alt="点击更换" title="图片验证" :src="imgUrl"/></span>
              <el-button type="text" @click="changeImgUrl">看不清，换一张</el-button>
            </el-form-item>

          </el-form>
          <el-button type="primary" @click="submitForm('ruleForm')" class="submit-button">登录</el-button>
          <div class="forget-password-button">
            <el-button type="text" @click="forgetState = true ">忘记密码？</el-button>
          </div>
        </div>
      </el-main>
      <el-footer class="el-footer">为了提升您更好的使用体验，请使用谷歌浏览器、360或者IE10以上的浏览器，否则部分功能您可能无法正常使用</el-footer>
    </el-container>
    <el-dialog
      title="忘记密码"
      :visible.sync="forgetState"
      width="30%"
      center>
      <div style="font-size: 16px;text-align: center;">请通过邮箱natdss@cicams.ac.cn联系管理员，为您重置密码。</div>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="forgetState = false">取 消</el-button>-->
        <el-button type="primary" @click="forgetState = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {cookieStorage} from 'common/storage'
  import {mapGetters, mapActions} from 'vuex'
  import {SET_USER_INFO} from 'store/actions/type'
  import {GET_USER_INFO} from 'store/getters/type'
  import server from 'src/common/config'
  export default {
    mixins: [cookieStorage],
    data(){
      var valid_phone = (rule, value, callback) => {
        if (value && (/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/.test(value))) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号码'))
        }


      };
      return {
        //是否可以获取验证码
        verificationState: true,
        verificationCount: 0,
        timer: null,
        ruleForm: {
          loginName: '',
          pwd: '',
          capText: '',
        },
        forgetState:false,
        imgUrl:'',
        load_data: false,
        rules: {
          loginName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {required: true, message: '请输入用户名', trigger: 'change'},
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 位', trigger: 'blur'},
            {required: true, message: '请输入密码', trigger: 'change'},
            {min: 6, max: 20, message: '长度在 6 到 20 位', trigger: 'change'},
          ],
//          phone: [
//            {required: true, message: '请输入手机号码', trigger: 'blur'},
//            {min: 11, max: 11, message: '请输入正确的手机号码', trigger: 'blur'},
//            {required: true, message: '请输入手机号码', trigger: 'change'},
//            {min: 11, max: 11, message: '请输入正确的手机号码', trigger: 'change'},
//            {validator: valid_phone, trigger: 'change'},
//            {validator: valid_phone, trigger: 'blur'}
//          ],
          capText: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 4, max: 4, message: '长度为6位', trigger: 'blur'},
            {required: true, message: '请输入验证码', trigger: 'change'},
            {min: 4, max: 4, message: '长度为6位', trigger: 'change'},
          ],
        }
      }
    },
    created(){
      this.changeImgUrl()
    },
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO
      })
    },
    methods: {
      ...mapActions({
        set_user_info: SET_USER_INFO
      }),
      //获取验证码
      changeImgUrl(){
        var num = Math.ceil(Math.random() * 10);
        this.imgUrl = server.server_base_url + 'odmapi/authCode/images?' + num
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid, obj) => {
          if (valid) {
            this.$fetch.api_login.login(this.ruleForm)
              .then(response => {
               let obj = response.result
                this.$fetch.api_login.taskStatistics()
                  .then(response => {
                    this.set_user_info({
                      user: obj,
                      task:response.result,
                      login: true
                    })
                    this.$message({
                      type: 'success',
                      message: '登录成功'
                    })
                     for(let i in response.result){
                       if (response.result[i] == 2){
                         setTimeout(() => {
                           this.$router.replace('/home/task')
                         }, 100)
                         return
                       }
                     }
                      setTimeout(() => {
                        this.$router.replace('/')
                      }, 100)
                  })

              })
          } else {
            for (var item in obj) {
              this.$refs[item].focus()
              break;
            }
            return false;
          }
        });
      },

    },

  }
</script>

<style scoped>
  .login {
    height: 100%;
    width: 100%;
    background: #ffffff;
  }

  .login .el-footer {
    color: #FB7707;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    text-align: center;
  }

  .login .el-header {
    height: 60px;
    margin-left: 40px;
    line-height: 60px;
    font-size: 16px;
    font-weight: 700;
  }

  .login .el-main {
    height: 100%;
    background: url("./images/login_bg.png") 100% 100%/100% 100%;
  }

  .login .el-container {
    height: 100%;
  }

  .login .el-header, .el-main, .el-footer {
    padding: 0;
  }

  .login-form {
    width: 360px;
    padding: 20px 35px;
    background: #ffffff;
    height: 380px;
    position: absolute;
    right: 20%;
    top: calc(50% - 210px);
    border-radius: 4px;
  }

  .submit-button {
    width: 290px;
    margin-top: 20px;

  }

  .input-verification {
    width: 90px;
    display: inline-block;
  }

  .verification-button {
    display: inline-block;
  }

  .demo-ruleForm {
    margin-top: 20px;
  }

  .forget-password-button {
    text-align: right;
  }

  .logo {
    height: 20px;
    margin-right: 20px;
  }

  .el-header .logo {
    margin-top: -2px;
  }

  .verification-agin {
    color: #a6a9ad;
  }
</style>
<style>
  .login-form .el-form-item__content {
    margin-left: 0px !important;
  }

  .login-form .el-input__inner {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
</style>
