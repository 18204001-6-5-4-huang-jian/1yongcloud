<template>
  <div class="password content-page">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" labelWidth="100px" class="demo-ruleForm">
      <el-form-item label="旧密码:" prop="oldWord">
        <el-input v-model="ruleForm.oldWord" type="password" ref="oldWord"></el-input>
        <span class="password-notice">请输入旧密码</span>
      </el-form-item>
      <el-form-item label="新密码:" prop="newWord">
        <el-input v-model="ruleForm.newWord" type="password" ref="newWord" @input="newPswwordChange()"></el-input>
        <span class="password-notice">请输入新密码，需包含大小写字母、数字或其他符号中至少2种且长度不小于6位</span>
      </el-form-item>
      <div class="progress-bar_wrap" v-if="strongState">
        <div class="progress-bar-item1" v-if="strongState == 3"></div>
        <div class="progress-bar-item2" v-if="strongState == 2"></div>
        <div class="progress-bar-item3" v-if="strongState == 1"></div>
      </div>
      <span style="margin-left: 20px;">{{strongState | strongState}}</span>
      <el-form-item label="确认新密码:" prop="sureWord">
        <el-input v-model="ruleForm.sureWord" type="password" ref="sureWord"></el-input>
        <span class="password-notice">请再次输入新密码</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="submit-button">确认修改</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {SET_USER_INFO} from 'store/actions/type'
import {GET_USER_INFO} from 'store/getters/type'
  export default {
    data(){
      return {
        ruleForm: {
          oldWord: '',
          newWord: '',
          sureWord: ''
        },
        rules: {
          oldWord: [
            {required: true, message: '请输入旧密码', trigger: 'blur'},
            {required: true, message: '请输入旧密码', trigger: 'change'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change'}
          ],
          newWord: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
            {required: true, message: '请输入新密码', trigger: 'change'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change'},
            // {pattern: /^(?!([a-zA-Z\d]*|[\d!@#\$%_\.]*|[a-zA-Z!@#\$%_\.]*)$)[a-zA-Z\d!@#\$%_\.]{6,16}$/, message: '请输入新密码，需包含大小写字母、数字或和其他符号且长度不小于6-16位' }
          ],
          sureWord: [
            {required: true, message: '请确认新密码', trigger: 'blur'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
            {required: true, message: '请确认新密码', trigger: 'change'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change'}
          ],
        },
        reg1:/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,
        reg2:/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,
        reg3:/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/,
        strongState:null
      }
    },
    computed: {
      ...mapGetters({
        //获取用户信息
        get_user_info: GET_USER_INFO
      })
    },
    methods: {
      ...mapActions({
            //set用户信息
            set_user_info: SET_USER_INFO
      }),
      submitForm(formName) {
        this.$refs[formName].validate((valid,obj) => {
          if (valid) {
            if(this.strongState == 3){
             this.$message({
               message:'新密码等级太低,请重新填写',
               type:'warning'
             })
              this.$refs.newWord.focus()
              return
            }
            if(this.ruleForm.newWord !== this.ruleForm.sureWord){
              this.$message({
                message:'两次填写密码不一致,请重新填写',
                type:'warning'
              })
              this.$refs.sureWord.focus()
               return;
            }
            this.$refs[formName].validate((valid) => {
              // console.log(this.$store.state.user_info.user.loginName)
              const dataObj = {
                  loginName:this.get_user_info.user.loginName,
                  pwd:this.ruleForm.oldWord,
                  newPwd:this.ruleForm.newWord
              }
              this.$fetch.api_detection.updatePwd(dataObj).then((res) =>{
                  console.log(res);
                  if(res.code == "200"){
                    this.$message({
                      type:'success',
                      message:'修改密码成功请重新登录',
                    })
                    this.set_user_info(null)
                    this.$router.push({
                      path:'/user/login'
                    })
                  }else{
                    this.$message({
                      type:'error',
                      showClose:true,
                      message:'对不起，修改密码失败，请重新修改',
                     })
                  }
              }).catch((error)=>{
                   this.$message({
                  type:'error',
                  showClose:true,
                  message:'对不起，修改密码失败，请重新修改',
                 })
              })

            })
          } else {
            for (var item in obj) {
              this.$refs[item].focus();
              return false;
            }
          }
        });
      },
      //新密码输入监测密码强度
      newPswwordChange(){
          if(this.reg1.test( this.ruleForm.newWord)){
            this.strongState = 1
          }else if(this.reg2.test( this.ruleForm.newWord)){
            this.strongState = 2
          }else if(this.reg3.test(this.ruleForm.newWord)){
            this.strongState = 3
          }else {
            this.strongState = null
          }
        console.log(this.strongState,'strong')
      }
    }

  }
</script>

<style scoped>
  .demo-ruleForm {
    margin: 20px;

  }

  .password .el-input {
    width: 225px;
  }

  .password-notice {
    margin-left: 20px;
    font-size: 14px;
    /*color: #97a8be;*/
  }
 .progress-bar-item1{
   float: left;
   width: 75px;
   height: 5px;
   background: #FF4B47;
 }
  .progress-bar-item2{
    float: left;
    width: 150px;
    height: 5px;
    background: #F9AE35;
  }
  .progress-bar-item3{
    float: left;
    width: 225px;
    height: 5px;
    background: #2DAF7D;
  }
  .progress-bar_wrap {
    width: 225px;
    height: 5px;
    background: #e5e5e5;
    margin-bottom:10px;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    margin-left: 100px;
    border-radius: 5px;
  }
</style>

