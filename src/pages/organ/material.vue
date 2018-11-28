<template>
  <div class="material content-page">
    <el-form :model="ruleForm" ref="ruleForm" labelWidth="100px" class="demo-ruleForm">
      <el-form-item label="登录名称:">
        <span class="input-span">{{this.get_user_info.user.loginName}}</span>
      </el-form-item>
      <el-form-item label="办公手机:">
        <span class="input-span">{{ruleForm.phone}}</span>
        <span style="color:red;">*</span>
        <span class="notice" @click="changePhone">更换手机</span>
      </el-form-item>
      <el-form-item label="办公邮箱:">
        <span class="input-span">{{ruleForm.email}}</span>
        <span style="color:red;">*</span>
         <span class="notice" @click="changeEmail">更换邮箱</span>
      </el-form-item>
      <el-form-item label="办公座机:">
        <span class="input-span">{{ruleForm.tel}}</span>
        <span style="color:#fff;">*</span>
         <span class="notice" @click="changeTel">更换座机</span>

      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
    <!-- 修改手机 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="formDialog" ref="formDialog" :rules="formDialogRules">
        <el-form-item label="当前手机号码:" label-width="120px" prop="phone">
          <el-input v-model="formDialog.phone" style="width:200px;" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="验证码:" label-width="120px" prop="code">
          <el-input v-model="formDialog.code" :maxLength="6" style="width:200px;"></el-input>
          <span class="inline-code" @click="getCode()" v-if="verificationState">获取验证码</span>
          <span class="verification-agin" v-else>{{verificationCount}}秒后重新获取</span>
          <div>请注意查收原手机号码收到的短信验证码</div>
        </el-form-item>
         <el-form-item label="新手机号码:" label-width="120px" prop="newphone">
          <el-input v-model="formDialog.newphone" style="width:200px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFormPhone('formDialog')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改邮箱 -->
    <el-dialog :visible.sync="dialogEmailVisible">
      <el-form :model="emailDialog" ref="emailDialog" :rules="emailDialoglRules">
        <el-form-item label="当前工作邮箱:" label-width="120px" prop="email">
          <el-input v-model="emailDialog.email" style="width:200px;" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="新工作邮箱:" label-width="120px" prop="newEmail">
          <el-input v-model="emailDialog.newEmail" style="width:200px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEmailVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFormEmail('emailDialog')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改座机 -->
    <el-dialog :visible.sync="dialogTelVisible">
      <el-form :model="telDialog" ref="telDialog" :rules="telDialoglRules">
      <el-form-item label="当前座机:" label-width="120px">
          <el-input v-model="telDialog.tel" style="width:200px;" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="新办公座机:" label-width="120px">
          <el-input v-model="telDialog.newTel" style="width:200px;"></el-input> 　&nbsp;<span>区号、分机号请用“-”分开，如010-098765-123</span>
        </el-form-item>
      </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTelVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitFormTel('telDialog')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {SET_USER_INFO} from 'store/actions/type'
import {GET_USER_INFO} from 'store/getters/type'
  export default {
    data(){
      // var valid_code = (rule, value, callback) => {
      //   if (value == '') {
      //     callback(new Error('验证码不能为空'))
      //   } else if (value.length == 6) {
      //       const state = this.vertifyCode()
      //       console.log(11111,state)
      //       if(state){
      //           callback()
      //       }else{
      //         callback(new Error('验证码错误'))
      //       }
      //   } else {
      //     callback()
      //   }
      // };
      return {
        ruleForm: {
          phone: '',
          email: '',
          tel:''
        },
        verificationState:true,
        verificationCount:0,
        timer: null,
        dialogFormVisible:false,
        dialogEmailVisible:false,
        dialogTelVisible:false,
        formDialog: {
          phone: '',
          newphone: '',
          code:''
        },
        emailDialog:{
           email:'',
           newEmail:''
        },
        telDialog:{
           tel:'',
           newTel:''
        },
        formDialogRules:{
           phone:[
             {required: true, message: '请输入当前手机号码', trigger:['blur','change']},
           ],
           newphone:[
             {required: true, message: '请输入新手机号码', trigger:['blur','change']},
           ],
           code:[
             {required: true, message: '请输入验证码', trigger:['blur','change']},
//             {validator: valid_code, trigger:['blur']}
           ]
        },
        vertifyStatus:false,
        emailDialoglRules:{
           email:[
               {required: true, message: '请输入当前工作邮箱', trigger:['blur','change']},
           ],
           newEmail:[
               {required: true, message: '请输入新工作邮箱', trigger:['blur','change']},
               { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
           ]
        },
        telDialoglRules:{
            tel:[
               {required: true, message: '请输入当前座机', trigger:['blur','change']},
            ],
            newTel:[
              {required: true, message: '请输入新办公座机', trigger:['blur','change']},
            ]
        }
      }
    },
    mounted(){
      this.updateData();
    },
    computed:{
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
          submitFormPhone(formName){
              this.$refs[formName].validate((valid) => {
                if(valid){
                  this.$fetch.api_detection.vertifyCode({
                    loginName:this.get_user_info.user.loginName,
                    smsAuthCode:this.formDialog.code
                  }).then(res=>{
                     if(res.success){
                       this.$fetch.api_detection.updateUserInfo({loginName:this.get_user_info.user.loginName,phone:this.formDialog.newphone}).then(resp=>{
                         if(resp.success){
                            this.dialogFormVisible = false;
                            this.verificationState = true;
                            clearInterval(this.timer);
                            this.timer = null;
                            this.$message({
                              type:'success',
                              message:'修改成功'
                            })
                            this.updateData();
                         }
                       })
                     }
                  })
                }else{
                  return false;
                }
              })
          },

          async getCode(){
             //获取验证码
             const res = await this.$fetch.api_detection.getPhoneCode({loginName:this.get_user_info.user.loginName});
             if(res.code === "200"){
              this.verificationState = false;
              this.verificationCount = 60;
              this.changeCount()
             }else{
               this.$message({
                 type:'error',
                 message:'获取验证码失败，请重新获取'
               })
             }
          },
          changeCount(){
             if (!this.timer) {
              this.timer = setInterval(() => {
                if (this.verificationCount > 0 && this.verificationCount <= 60) {
                  this.verificationCount--;
                } else {
                  this.verificationState = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000)
            }
          },
          //  vertifyCode(){
          //     //验证验证码
          //     let state = false
          //     if(this.formDialog.code != ''){
          //      this.$fetch.api_detection.vertifyCode({
          //         loginName:this.get_user_info.user.loginName,
          //         smsAuthCode:this.formDialog.code
          //       }).then(res=>{

          //      })
          //     }
          //    return state
          // },
          submitFormEmail(formName){
              this.$refs[formName].validate(async (valid) => {
                  if(valid){
                    //修改邮箱
                  const res = await this.$fetch.api_detection.updateUserInfo({loginName:this.get_user_info.user.loginName,email:this.emailDialog.newEmail});
                   if(res.code === "200"){
                    this.dialogEmailVisible = false;
                    this.updateData();
                   }
                  }else{
                    return false;
                  }
              })
          },
          submitFormTel(formName){
               this.$refs[formName].validate(async (valid) => {
                 if(valid){
                    //修改座机
                    const res = await this.$fetch.api_detection.updateUserInfo({loginName:this.get_user_info.user.loginName,tel:this.telDialog.newTel});
                    if(res.code === "200"){
                       this.dialogTelVisible = false;
                       this.updateData();
                    }
                 }else{
                   return false;
                 }
               })
          },
          changePhone(){
              this.dialogFormVisible = true;
              this.formDialog.code = '';
              this.formDialog.newphone = '';
          },
          changeEmail(){
              this.dialogEmailVisible = true;
              this.emailDialog.newEmail = '';
          },
          changeTel(){
            this.dialogTelVisible = true;
            this.telDialog.newTel = '';
          },
          updateData(){
                const dataObj = {
                  loginName:this.get_user_info.user.loginName
                }
                this.$fetch.api_detection.getUserInfomation(dataObj).then((res)=>{
                    if(res.code === "200"){
                      this.ruleForm = res.result;
                      this.formDialog.phone = res.result.phone;
                      this.emailDialog.email = res.result.email;
                      this.telDialog.tel = res.result.tel;
                    }else{
                      this.$message({
                        type:'error',
                        message:'请求用户详细信息失败',
                        showClose:true
                      })
                    }
                })
          }
      }
  }
</script>
<style scoped>
   .input-span{
     display: inline-block;
     width: 180px;
     height: 30px;
     line-height: 30px;
   }
   .notice{
     cursor: pointer;
     color:blue;
     font-size: 14px;
     margin-left:20px;
   }
   .inline-code{
     display: inline-block;
     width: 100px;
     height: 30px;
     line-height: 30px;
     text-align: center;
     cursor: pointer;
     border-radius: 5px;
     /* background: blue; */
     background: #0084FE;
     color: #fff;
     margin-left: 10px;
   }
   .verification-agin{
     display: inline-block;
     width: 100px;
     height: 30px;
     line-height: 30px;
     text-align: center;
     color: #a6a9ad;
     margin-left: 10px;
   }
</style>

