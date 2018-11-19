<template>
  <div class="mechanism">
    <el-form :model="ruleForm" :rules="ruleDefault" ref="ruleForm" label-width="120px" class="demo-ruleForm">
     <div class="mechanism-item basic-info">
       <div class="title">
         基本信息
       </div>
       <div class="info">
           <el-form-item label="机构名称：" prop="deptName">
             {{ruleForm.deptName}}
           </el-form-item>
           <el-form-item label="机构电话：" prop="deptTel">
             {{ruleForm.deptTel}}
           </el-form-item>
           <el-form-item label="机构地址：" prop="deptProvince" style="float:left">
             {{ruleForm.deptProvince}}{{ruleForm.deptCity}}{{ruleForm.deptDistrict}}{{ruleForm.deptAddress}}
          </el-form-item>
           <el-form-item label="机构简介：" prop="deptSynopsis" style="clear:both">
             {{ruleForm.deptSynopsis}}
           </el-form-item>
       </div>
     </div>
     <!-- table -->
    <div class="mechanism-item basic-info">
      <div class="title">
        机构属性
      </div>
      <div class="info">
          <el-form-item label="机构类型：" prop="deptType">
            <span v-if="ruleForm.deptType == 1">管理类型（{{ruleForm.countryType}}）</span>
            <span v-if="ruleForm.deptType == 2">医疗机构（{{ruleForm.hospitalType}}）</span>
            <span v-if="ruleForm.deptType == 2">{{ruleForm.hospitalGrade}}</span>
          </el-form-item>
          <el-form-item label="组织机构代码：" prop="deptCode">
            {{ruleForm.deptCode}}
          </el-form-item>
          <el-form-item label="隶属机构：" prop="deptPid">
            {{ruleForm.subjectionInstitutionName}}
          </el-form-item>
          <el-form-item label="隶属关系：" prop="subjectionRelation" v-if="ruleForm.deptType == 2">
            {{ruleForm.subjectionRelation}}
          </el-form-item>
      </div>
    </div>
    <div class="button-group">
      <router-link :to="{path:'/system/mechanismAdd',query:{type:2,deptId:$route.query.deptId}}">
        <el-button type="primary">编辑</el-button>
      </router-link>
      <router-link :to="{path:'/system/mechanism'}">
        <el-button >返回</el-button>
      </router-link>
    </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        optionList:[],//隶属机构
        provinceList:[],//省
        cityList:[],//市
        areaList:[],//区
        ruleForm: {
          deptName: '',
          deptTel:'',
          deptProvince:'',
          deptCity:'',
          deptDistrict:'',
          deptAddress:'',
          deptSynopsis:'',
          deptType:'',
          countryType:'',
          hospitalType:'',
          hospitalGrade:'',
          deptCode:'',
          deptPid:[],//级联选择器
          subjectionRelation:'',
        },
        props:{
          value:'uid',
          label:'deptName',
          children:'child'
        },
		     restaurants:[],
		     readonlyStatus:true,
         disabledStatus:true,
          ruleDefault:{},
          rules: {
          deptName:[
            { required: true, message: '请输入机构名称', trigger: 'change' }
          ],
          deptTel:[
             { required: true, message: '请输入机构电话', trigger: 'change' }
          ],
          deptProvince:[
              { required: true, message: '请选择省', trigger: 'change' }
          ],
          deptCity:[
             { required: true, message: '请选择市', trigger: 'change' }
          ],
          deptDistrict:[
             { required: true, message: '请选择区', trigger: 'change' }
          ],
          deptAddress:[
              { required: true, message: '请填写详细地址', trigger: 'change' }
          ],
          deptSynopsis:[
			        { required: true, message: '请输入机构简介', trigger: 'change' },
              { min: 50, max: 1000, message: '请输入不少于50字的中文描述', trigger: 'change' }
          ],
          deptType:[
              { required: true, message: '请选择机构类型', trigger: 'change' }
          ],
          countryType:[
                { required: true, message: '请选择', trigger: 'change' }
          ],
          hospitalType:[
                { required: true, message: '请选择', trigger: 'change' }
          ],
          hospitalGrade:[
                { required: true, message: '请选择', trigger: 'change' }
          ],
          deptCode: [
              { required: true, message: '请输入组织机构代码', trigger: 'blur' },
              { required: true, message: '请输入组织机构代码', trigger: 'change' }
          ],
          deptPid:[
              { required: true, message: '请选择隶属机构', trigger: 'blur' },
              { required: true, message: '请选择隶属机构', trigger: 'change' }
          ],
          subjectionRelation:[
              { required: true, message: '请选择隶属关系', trigger: 'blur' },
              { required: true, message: '请选择隶属关系', trigger: 'change' }
          ]
        }
      }
    },
    async mounted(){

      //获取隶属机构树
      const optionRes = await this.$fetch.api_system.getOrganizationTree();
      if(optionRes.code === "200"){
        this.optionList = optionRes.result;
      }
      //请求数据 获取省
       const res = await this.$fetch.api_system.getLinkageList('000000');
       if(res.code === "200"){
		   this.provinceList = res.result;
		   const info = await this.$fetch.api_system.getOrganizationInfo({deptId:this.$route.query.deptId});
        this.$nextTick(() => {
				if(info.code === '200'){
          this.getInfo(info.result)
          }
		    })
       }
    },
    methods: {
      //转化
      getInfo(data){
        this.ruleForm = data
        this.$fetch.api_system.getLinkageList('000000').then((res)=>{
          this.ruleForm.deptProvince = this.getValue(res.result,this.ruleForm.deptProvince,'code','name')
        });
        this.$fetch.api_system.getLinkageList(this.ruleForm.deptProvince).then((res)=>{
          this.ruleForm.deptCity = this.getValue(res.result,this.ruleForm.deptCity,'code','name')
        });
        this.$fetch.api_system.getLinkageList(this.ruleForm.deptCity).then((res)=>{
          this.ruleForm.deptDistrict = this.getValue(res.result,this.ruleForm.deptDistrict,'code','name')
        });
        if(this.ruleForm.countryType){
          this.ruleForm.countryType = this.getValue(this.$store.state.mechanismLv,this.ruleForm.countryType,'value','label')
        }
        if(this.ruleForm.hospitalType){
          this.ruleForm.hospitalType = this.getValue(this.$store.state.hospitalType,this.ruleForm.hospitalType,'value','label')
        }
        if(this.ruleForm.hospitalGrade){
          this.ruleForm.hospitalGrade = this.getValue(this.$store.state.hospitalLv,this.ruleForm.hospitalGrade,'value','label')
        }
        if(this.ruleForm.subjectionRelation){
          this.ruleForm.subjectionRelation = this.getValue(this.$store.state.subjectionRelation,this.ruleForm.subjectionRelation,'value','label')
        }
      },
      //数组取值
      getValue(arr,value,key,key1){
          console.log(arr,value,key,key1)
          var a = arr.filter(item =>item[key]===value).map(x => x[key1])
          return a[0]
      },
      //提交
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(this.ruleForm.countryType != "" || (this.ruleForm.hospitalType != "" && this.ruleForm.hospitalGrade != "")){
                //请求数据
                //console.log(this.ruleForm.deptPid[this.ruleForm.deptPid.length-1])//隶属机构
                console.log(this.ruleForm)
                //判断是管理机构还是医疗机构,传对应的参数
                const dataObj = {
                    deptName:this.ruleForm.deptName,
                    deptTel:this.ruleForm.deptTel,
                    deptProvince:this.ruleForm.deptProvince,
                    deptCity:this.ruleForm.deptCity,
                    deptDistrict:this.ruleForm.deptDistrict,
                    deptAddress:this.ruleForm.deptAddress,
                    deptSynopsis:this.ruleForm.deptSynopsis,
                    deptType:this.ruleForm.deptType,
                    deptCode:this.ruleForm.deptCode,
                    deptPid:this.ruleForm.deptPid+'',
                    subjectionRelation:parseInt(this.ruleForm.subjectionRelation),
                    deptId:this.$route.query.deptId,
                    uid:this.$route.query.uid
                }
                   const obj = Object.assign({},dataObj,{countryType:this.ruleForm.countryType})
                   this.$fetch.api_system.updateOrganization(obj).then((res)=>{
                       if(res.code === "200"){
                            this.$router.push({
                              path:'/system/mechanism'
                            })
                       }
                   })
            }else{
                this.$message({
                  type:'error',
                  message:'请选择对应的完整机构类型'
               })
            }
          }else{
            return false;
          }
        });
      },
      changeStatus(){
		  this.readonlyStatus = false;
      this.disabledStatus = false;
      this.ruleDefault = this.rules;
		  this.$refs.deptName.focus();
	  },
      async provinceChange(e){
		 //请求市数据
		 //console.log(e)
         const res = await this.$fetch.api_system.getLinkageList(e);
         if(res.code === "200"){
          this.cityList = res.result;
         }
      },
      async cityChange(e){
        //请求区数据
         const res = await this.$fetch.api_system.getLinkageList(e);
         if(res.code === "200"){
          this.areaList = res.result;
         }
      },
      querySearch(queryString, cb) {
           if(this.ruleForm.deptName.trim() != "" && this.ruleForm.deptType === 2){
             //请求数据结构代码下拉list
             this.$fetch.api_system.getHospitalCode({name:this.ruleForm.deptName}).then((res)=>{
                 if(res.code === "200"){
                    this.restaurants = res.result;
                    this.restaurants.filter(item => {
                       item.value = item.code
                   })
                 }
             })
             cb(this.restaurants);
           }else{
                this.restaurants = [];
           }
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.code.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      }
    }
  }
</script>
<style scoped>
 .mechanism-item{
   padding:20px;
   background: #ffffff;
   margin-bottom:20px;
   -webkit-border-radius: 4px;
   -moz-border-radius: 4px;
   border-radius: 4px;
 }
  .mechanism .title{
    color: #0084FE;
  }
  .mechanism-input{
    width:400px;
  }
  .button-group{
    text-align: right;
  }
  .info{
    /* border:1px solid #e5e5e5; */
    margin-top: 20px;
    padding-top:10px
  }
  .button-group .el-button{
    margin-left:20px;
  }
</style>

