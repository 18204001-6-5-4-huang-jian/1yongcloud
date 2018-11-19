<template>
  <div class="mechanism">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <div class="mechanism-item basic-info">
        <div class="title">
          基本信息
        </div>
        <div>
          <el-form-item label="用户编码" prop="code">
            <el-input v-model="ruleForm.code" class="mechanism-input"></el-input>
          </el-form-item>
          <el-form-item label="用户名称" prop="loginName">
            <el-input v-model="ruleForm.loginName" class="mechanism-input"></el-input>
          </el-form-item>
          <el-form-item label="初始密码" prop="pwd">
            <el-input v-model="ruleForm.pwd" class="mechanism-input"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="ruleForm.phone" class="mechanism-input"></el-input>
          </el-form-item>
          <el-form-item label="办公邮箱" prop="email">
            <el-input v-model="ruleForm.email" class="mechanism-input"></el-input>
          </el-form-item>
          <el-form-item label="办公座机">
            <el-input v-model="ruleForm.tel" class="mechanism-input"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="mechanism-item basic-info">
        <div class="title">
          用户角色
        </div>
        <div>
          <el-form-item label="所属机构类型" prop="deptType">
            <el-radio-group v-model="ruleForm.deptType" @change="changeDeptType($event)">
              <el-radio :label="1" value="1">管理机构</el-radio>
              <el-radio :label="2" value="2">医疗机构</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属机构名称" prop="deptName">
            <el-autocomplete
              class="inline-input"
              v-model="ruleForm.deptName"
              :fetch-suggestions="querySearch"
              placeholder="请输入所属机构名称"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="所属机构角色" prop="roleId" class="consumer-role">
            <br>
            <el-radio-group v-model="ruleForm.roleId">
              <el-radio
                v-for="item in options"
                :label="item.name"
                :name="item.uid"
                :key="item.uid"
                class="role-radio"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
      <div class="button-group">
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        restaurants: [],
        obj: {},
        ruleForm: {
          code: '',
          loginName: '',
          pwd: '',
          phone: '',
          email: '',
          tel: '',
          deptType: '',
          deptId: '',
          roleId: ''
        },
        options: [],
        rules: {
          code: [
            {required: true, message: '请输入用户编码', trigger: ['change', 'blur']},
          ],
          loginName: [
            {required: true, message: '请输入用户名称', trigger: ['change', 'blur']},
          ],
          pwd: [
            {required: true, message: '请输入初始密码', trigger: 'blur'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
            {required: true, message: '请输入初始密码', trigger: 'change'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change'}
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: ['change', 'blur']},
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: ['change', 'blur']},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
          tel: [
            {required: true, message: '请输入办公座机', trigger: ['change', 'blur']}
          ],
          deptType: [
            {required: true, message: '请选择所属机构类型', trigger: ['change', 'blur']}
          ],
          deptName: [
            {required: true, message: '请选择所属机构名称', trigger: ['change', 'blur']}
          ],
          roleId: [
            {required: true, message: '请选择所属机构角色', trigger: ['change', 'blur']}
          ]
        }
      }
    },
    mounted(){
      //获取所属机构角色list
      this.$fetch.api_system.getRoleList({}).then((res) => {
        if (res.code === '200') {
          this.options = res.result;
        }
      })
    },
    methods: {
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(!this.ruleForm.deptId){
              this.$message({
                            type:'warning',
                            message:'您提交的所属机构名称在系统中不存在,请重新输入'
                        })
              return;
           }
            //获取所属机构角色uid
            var roleId = "";
            for (let i in this.options) {
              if (this.options[i].name === this.ruleForm.roleId) {
                roleId = this.options[i].uid;
              }
            }
            const dataObj = {
              userRole: {
                roleId: roleId,
                deptId: this.ruleForm.deptId,
                deptType: this.ruleForm.deptType
              },
              userPO: {
                loginName: this.ruleForm.loginName,
                pwd: this.ruleForm.pwd,
                email: this.ruleForm.email,
                tel: this.ruleForm.tel,
                code: this.ruleForm.code,
                phone: this.ruleForm.phone
              }
            }
            this.$fetch.api_system.addUser(dataObj).then((res) => {
              if (res.code === "200") {
                this.$router.push({
                  path: '/system/consumer'
                })
              } else {
                this.$message({
                  type: 'warning',
                  showClose: true,
                  message: '请求失败，请重新输入'
                })
              }
            })
             } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      querySearch(queryString, cb) {
        //console.log(queryString);//参数 deptName
        //console.log(this.ruleForm.deptType) //参数 deptType
        //请求数据下拉数据
        const obj = {
          deptName: queryString,
          deptType: this.ruleForm.deptType,
          pageNum: 1,
          pageSize: 20
        }
        this.ruleForm.deptId = null;
        this.$fetch.api_system.roleDropdownList(obj).then((res) => {
          this.restaurants = res.result.list;
          if (this.restaurants.length == 0) {
            //  this.$message({
            //     type:'warning',
            //     showClose:true,
            //     message:'您输入的所属机构名称在系统中不存在,请重新输入'
            //  })
          } else {
            this.restaurants.filter(item => {
              item.value = item.deptName
            })
            cb(this.restaurants);
          }
        })
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.deptName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.ruleForm.deptId = item.deptId
        this.ruleForm.deptName = item.deptName
      },
      changeDeptType(e){
        console.log(e);
      }
    }
  }
</script>
<style scoped>
  .mechanism-item {
    padding: 20px;
    background: #ffffff;
    margin-bottom: 20px;
  }

  .mechanism .title {
    color: #0084FE;
  }

  .mechanism-input {
    width: 400px;
  }

  .button-group {
    text-align: right;
  }

  .role-radio {
    width: 300px;
    line-height: 20px;
  }
</style>
<style>
  .consumer-role .el-radio + .el-radio {
    margin-left: 0px;
  }
</style>
