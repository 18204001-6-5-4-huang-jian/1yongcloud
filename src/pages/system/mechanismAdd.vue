<template>
  <div class="mechanism">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <div class="mechanism-item basic-info">
        <div class="title">
          基本信息
        </div>
        <div class="info">
          <el-form-item label="机构名称:" prop="deptName">
            <el-input v-model="ruleForm.deptName" class="mechanism-input" :disabled="disabledState" @change="deptNameChange($event)"></el-input>
          </el-form-item>
          <el-form-item label="机构电话:" prop="deptTel">
            <el-input v-model="ruleForm.deptTel" class="mechanism-input"></el-input>
          </el-form-item>
          <el-form-item label="机构地址:" prop="deptProvince" style="float:left">
            <el-select v-model="ruleForm.deptProvince" placeholder="请选择省" @change="provinceChange($event)">
              <!-- <el-option value="">请选择省</el-option> -->
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" style="float:left" prop="deptCity" v-if="cityList != null">
            <el-select v-model="ruleForm.deptCity" placeholder="请选择市" @change="cityChange($event)">
              <!-- <el-option value="">请选择市</el-option> -->
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" style="float:left" prop="deptDistrict" 　v-if="cityList != null && areaList != null">
            <el-select v-model="ruleForm.deptDistrict" placeholder="请选择区">
              <!-- <el-option value="">请选择区</el-option> -->
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址:" prop="deptAddress" style="float:left">
            <el-input v-model="ruleForm.deptAddress" class="mechanism-input" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="机构简介:" prop="deptSynopsis" style="clear:both">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 16}"
              placeholder="请输入不多余50字的描述"
              v-model="ruleForm.deptSynopsis">
            </el-input>
          </el-form-item>
        </div>
      </div>
      <!-- table -->
      <div class="mechanism-item basic-info disabled">
        <div class="title">
          机构属性
        </div>
        <div class="info">
          <el-form-item label="机构类型:" prop="deptType">
            <el-radio-group v-model="ruleForm.deptType" @change="selectCountryType" :disabled="disabledState">
              <el-radio :label="1" value="1" style="line-height: 40px;">
                管理类型&nbsp;&nbsp;
                <span v-if="ruleForm.deptType == 1">
                  <el-select placeholder="请选择管理类型" v-model="ruleForm.countryType">
                    <el-option label="省级卫计委" :value="2"></el-option>
                    <el-option label="市级卫计委" :value="3"></el-option>
                    <el-option label="县级卫计委" :value="4"></el-option>
                    <el-option label="区级卫计委" :value="5"></el-option>
                  </el-select>
                </span>

              </el-radio>
              <br>
              <el-radio :label="2" value="2" style="margin-top:20px;line-height: 40px;">
                医疗机构&nbsp;&nbsp;
                <span v-if="ruleForm.deptType == 2">
                  <el-select placeholder="请选择医疗机构" style="width:200px" v-model="ruleForm.hospitalType"
                            >
                    <el-option label="综合医院" :value="1"></el-option>
                    <el-option label="专科医院" :value="2"></el-option>
                    <el-option label="其他" :value="3"></el-option>
                  </el-select>
                  &nbsp;&nbsp;医院等级&nbsp;&nbsp;
                  <el-select placeholder="请选择医院等级" style="width:200px" v-model="ruleForm.hospitalGrade"
                            >
                    <el-option
                      v-for="item in $store.state.hospitalLv"
                      :key="item.key"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="组织机构代码:">
            <el-autocomplete
              class="inline-input"
              v-model="ruleForm.deptCode"
              :fetch-suggestions="querySearch"
              placeholder="请输入所属机构名称"
              @select="handleSelect"
              style="width:200px"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="隶属机构:" prop="deptPid" v-if="$route.query.type == 1">
            <div class="block">
              <el-cascader
                :options="optionList"
                :props="props"
                :disabled="disabledState"
                v-model="ruleForm.deptPid"
                change-on-select
                :show-all-levels="false"
                @change="handleChangeOptions">
              </el-cascader>
            </div>
          </el-form-item>
          <el-form-item label="隶属机构:" prop="deptPid" v-if="$route.query.type == 2">
            <el-input v-model="ruleForm.subjectionInstitutionName" :disabled="disabledState"
                      style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="隶属关系:" prop="subjectionRelation" ref="form" v-if="ruleForm.deptType == 2">
            <el-select v-model="ruleForm.subjectionRelation" placeholder="请选择" style="width:200px">
              <el-option label="委属(管)" :value="1"></el-option>
              <el-option label="省属" :value="2"></el-option>
              <el-option label="直辖市属" :value="3"></el-option>
              <el-option label="县属" :value="4"></el-option>
              <el-option label="区属" :value="5"></el-option>
              <el-option label="地属" :value="6"></el-option>
              <el-option label="兵团级" :value="7"></el-option>
              <el-option label="师级" :value="8"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="button-group">
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm()">返回</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        optionList: [],//隶属机构
        provinceList: [],//省
        cityList: [],//市
        areaList: [],//区
        disabledState: false,
        ruleForm: {
          deptName: '',
          deptTel: '',
          deptProvince: '',
          deptCity:'',
          deptDistrict: '',
          deptAddress: '',
          deptSynopsis: '',
          deptType: '',
          countryType: '',
          hospitalType: '',
          hospitalGrade: '',
          deptCode: '',
          deptPid: [],//级联选择器
          subjectionRelation: '',
        },
        props: {
          value: 'uid',
          label: 'deptName',
          children: 'child'
        },
        restaurants: [],
        rules: {
          deptName: [
            {required: true, message: '请输入机构名称', trigger: 'blur'}
          ],
          deptTel: [
            {required: true, message: '请输入机构电话', trigger: 'blur'}
          ],
          deptProvince: [
            {required: true, message: '请选择省', trigger: 'change'}
          ],
          deptCity: [
            {required: true, message: '请选择市', trigger: 'change'}],
          deptDistrict: [
            {required: true, message: '请选择区', trigger: 'change'}
          ],
          deptAddress: [
            {required: true, message: '请填写详细地址', trigger: 'change'}
          ],
          deptSynopsis: [
            {required: false, message: '请输入机构简介', trigger: 'change'},
            {min: 1, max: 50, message: '请输入不多余500字的描述', trigger: 'change'}
          ],
          deptType: [
            {required: true, message: '请选择机构类型', trigger: 'change'}
          ],
          countryType: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          hospitalType: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          hospitalGrade: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          deptCode: [
            {required: true, message: '请输入组织机构代码', trigger: 'blur'},
            {required: true, message: '请输入组织机构代码', trigger: 'change'}
          ],
          deptPid: [
            {required: true, message: '请选择隶属机构', trigger: 'blur'},
            {required: true, message: '请选择隶属机构', trigger: 'change'}
          ],
          subjectionRelation: [
            {required: false, message: '请选择隶属关系', trigger: 'blur'},
            {required: false, message: '请选择隶属关系', trigger: 'change'}
          ]
        }
      }
    },
    async mounted(){
      if (this.$route.query.type == 2) {
        //请求数据 获取省
        const res = await this.$fetch.api_system.getLinkageList('000000');
        if (res.code === "200") {
          this.provinceList = res.result;
          const info = await this.$fetch.api_system.getOrganizationInfo({deptId: this.$route.query.deptId});
          this.$nextTick(() => {
            if (info.code === '200') {
              //显示info数据
              this.ruleForm = info.result
              this.ruleForm.deptName = info.result.deptName;
              this.ruleForm.deptTel = info.result.deptTel;
              this.ruleForm.deptProvince = info.result.deptProvince;
              this.ruleForm.deptCity = info.result.deptCity;
              this.ruleForm.deptDistrict = info.result.deptDistrict;
              // console.log(this.ruleForm.deptCity)
              //根据省 获取市
              if(info.result.deptProvince){
                this.$fetch.api_system.getLinkageList(info.result.deptProvince).then((res) => {
                  if (res.code === "200") {
                    this.cityList = res.result;
                    //  console.log(this.cityList)
                  }
                })
              }
              if(info.result.deptCity){
                //根据市 获取区
                this.$fetch.api_system.getLinkageList(info.result.deptCity).then((res) => {
                  if (res.code === "200") {
                    this.areaList = res.result;
                    // console.log(this.areaList)
                  }
                })
              }

              this.ruleForm.deptAddress = info.result.deptAddress;
              this.ruleForm.deptSynopsis = info.result.deptSynopsis;
              this.ruleForm.deptType = info.result.deptType;
              if (info.result.deptType === 1) {
                //管理类型
                this.ruleForm.countryType = info.result.countryType;
              } else {
                //医疗机构
                this.ruleForm.hospitalType = info.result.hospitalType;
                this.ruleForm.hospitalGrade = info.result.hospitalGrade;
              }
              this.ruleForm.deptCode = info.result.deptCode;
              this.ruleForm.deptPid = info.result.deptPid;//级联选择器
              this.ruleForm.subjectionRelation = info.result.subjectionRelation;
              // this.ruleForm.subjectionRelation = info.result.subjectionRelation == null?'':info.result.subjectionRelation + '';
            }
          })
        }
        //获取隶属机构树
        const optionRes = await this.$fetch.api_system.getOrganizationTree();
        if (optionRes.code === "200") {
          this.optionList = optionRes.result;
        }
      } else if (this.$route.query.type == 1) {
        //请求数据 获取省
        const res = await this.$fetch.api_system.getLinkageList('000000');
        if (res.code === "200") {
          this.provinceList = res.result;
        }
        //获取隶属机构树
        const optionRes = await this.$fetch.api_system.getOrganizationTree();
        if (optionRes.code === "200") {
          // this.optionList = optionRes.result
          this.optionList = optionRes.result;
        }
      }
      if (this.$route.query.type == 2) {
        this.disabledState = true
      }

    },
    methods: {
      submitForm(formName, count){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = ''
            if (this.ruleForm.countryType != "" || (this.ruleForm.hospitalType != "" && this.ruleForm.hospitalGrade != "")) {
              //请求数据
              //console.log(this.ruleForm.deptPid[this.ruleForm.deptPid.length-1])//隶属机构
              console.log(this.ruleForm)
              //判断是管理机构还是医疗机构
                const obj = {
                    deptName: this.ruleForm.deptName,
                    deptTel: this.ruleForm.deptTel,
                    deptProvince: this.ruleForm.deptProvince,
                    deptCity:this.ruleForm.deptCity,
                    deptDistrict: this.ruleForm.deptDistrict,
                    deptAddress: this.ruleForm.deptAddress,
                    deptSynopsis: this.ruleForm.deptSynopsis,
                    deptType: this.ruleForm.deptType,
                    countryType: this.ruleForm.countryType,
                    hospitalType: this.ruleForm.hospitalType,
                    hospitalGrade: this.ruleForm.hospitalGrade,
                    deptCode: this.ruleForm.deptCode,
                    deptId:this.$route.query.deptId,
                    // deptPid:this.ruleForm.deptPid[this.ruleForm.deptPid.length - 1],//级联选择器
                    subjectionRelation: this.ruleForm.subjectionRelation
                }
              if (this.$route.query.type == 1) {
                url = 'addOrganization'
                obj.deptPid = this.ruleForm.deptPid[this.ruleForm.deptPid.length - 1];
                // this.ruleForm.deptPid = this.ruleForm.deptPid[this.ruleForm.deptPid.length - 1]
              } else if (this.$route.query.type == 2) {
                url = 'updateOrganization'
                obj.deptPid = this.ruleForm.deptPid;
                obj.uid = this.$route.query.uid;
              }
              // console.log(obj)
              this.$fetch.api_system[url](obj).then((res) => {
                if (res.code === "200") {
                  this.$router.push({
                    path: '/system/mechanism'
                  })
                }
              })
            } else {
              this.$message({
                type: 'error',
                message: '请选择对应的完整机构类型'
              })
            }
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$router.go(-1)
      },
      async provinceChange(e){
        //请求市数据
         const res = await this.$fetch.api_system.getLinkageList(e);
         if(res.code === "200"){
           if(this.ruleForm.deptCity){
             this.ruleForm.deptCity = '';
             this.ruleForm.deptDistrict = '';
           }
          this.cityList = res.result;
        }
      },
      async cityChange(e){
        //请求区数据
         const res = await this.$fetch.api_system.getLinkageList(e);
         if(res.code === "200"){
          if(this.ruleForm.deptDistrict){
            this.ruleForm.deptDistrict = '';
          }
          this.areaList = res.result;
        }
      },
      handleChangeOptions(value){
        //获取隶属机构uid  //数组
        console.log(value);
      },
      //获取输入框建议数据
      deptNameChange(value){
          if(this.ruleForm.deptName&&this.ruleForm.deptType === 2){
            this.$fetch.api_system.getHospitalCode({name: this.ruleForm.deptName}).then((res) => {
              if (res.code === "200") {
                this.restaurants = res.result;
                this.restaurants.filter(item => {
                  item.value = item.code
                })
              }
            })
          }
      },
      querySearch(queryString, cb) {

        if (this.ruleForm.deptName.trim() != "" && this.ruleForm.deptType === 2) {
          //请求数据结构代码下拉list
          cb(this.restaurants);
        } else {
          this.restaurants = [];
        }
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.code.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        //获取组织机构代码code
        // console.log(item.code);
      },
      selectCountryType(value){
        if (value == 1) {
          this.ruleForm.hospitalType = ''
          this.ruleForm.hospitalGrade = ''
        } else if (value == 2) {
          this.ruleForm.countryType = ''
          this.ruleForm.subjectionRelation = ''
          this.deptNameChange()
        }
        // console.log(value)
      }
    }
  }
</script>
<style scoped>
  .mechanism-item {
    padding: 20px;
    background: #ffffff;
    margin-bottom: 20px;
    border-radius: 4px;
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

  .info {
    /* border:1px solid #e5e5e5; */
    margin-top: 20px;
    padding-top: 10px
  }
</style>

