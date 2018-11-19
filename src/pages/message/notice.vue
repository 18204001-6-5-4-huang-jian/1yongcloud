<template>
  <div class="message-notice-container">
   <div class="list-container">
     <div class="search">
       <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-form-inline">
         <el-form-item label="消息标题">
           <el-input v-model="ruleForm.title" placeholder="消息标题" :size="$store.state.size"></el-input>
         </el-form-item>
         <el-form-item label="接收时间">
           <el-col :span="11">
             <el-form-item>
               <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startAcceptTime" style="width: 100%;" value-format="yyyy-MM-dd" :size="$store.state.size"></el-date-picker>
             </el-form-item>
           </el-col>
           <el-col class="line" :span="2" style="padding-left:8px;">至</el-col>
           <el-col :span="11">
             <el-form-item >
               <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endAcceptTime" style="width: 100%;" value-format="yyyy-MM-dd" :size="$store.state.size"></el-date-picker>
             </el-form-item>
           </el-col>
         </el-form-item>
         <el-form-item label="阅读状态">
           <el-select v-model="ruleForm.status" placeholder="阅读状态" :size="$store.state.size">
             <el-option label="全部" value="0"></el-option>
             <el-option label="已读" value="1"></el-option>
             <el-option label="未读" value="2"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="submitForm('ruleForm')" :size="$store.state.size">查询</el-button>
         </el-form-item>
       </el-form>
     </div>

   <!-- tabke -->
     <div class="table-container">
       <el-table
         border
         :size="$store.state.size"
         :data="queryResult.list"
         style="width:100%;margin-top:10px;">
         <el-table-column
           type="index"
           label="序号"
           width="50">
         </el-table-column>
         <el-table-column
           prop="title"
           label="通知标题"
           width="180">
         </el-table-column>
         <el-table-column
           prop="acceptTime"
           label="接收时间">
         </el-table-column>
         <el-table-column
           label="阅读状态">
           <template slot-scope="scope">
             <span>{{scope.row.status === 1?'已读':'未读'}}</span>
           </template>
         </el-table-column>
         <el-table-column
           label="阅读时间">
           <template slot-scope="scope">
             <span>{{scope.row.readTime | formatDate}}</span>
           </template>
         </el-table-column>
         <!-- 操作 -->
         <el-table-column
           fixed="right"
           label="操作"
           width="100">
           <template slot-scope="scope">
             <el-button  size="small" @click="handleRead(scope.row)" type="text">阅读</el-button>
           </template>
         </el-table-column>
       </el-table>
       <!-- 分页 -->
       <div class="pagination-container" style="margin-top: 10px">
         <el-pagination
           small
           @size-change="pageSizeChange"
           @current-change="currentPageChange"
           :current-page="queryResult.pageNum"
           :page-sizes="[10, 20, 50, 100]"
           :page-size="queryResult.pageSize"
           layout="total, sizes, prev, pager, next, jumper"
           :total="queryResult.total">
         </el-pagination>
       </div>
     </div>

   </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
  export default {
    data(){
      return {
        ruleForm: {
            title: '',
            status: '',
            startAcceptTime:'',
            endAcceptTime:'',
            pageNum:1,
            pageSize:10
          },
        queryResult: {
          pageNum: 1,//当前页
          pageSize: 18,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
         screenHeight:document.body.clientHeight,
         rules:{
             title:[
                {required: true, message: '请输入标题名称', trigger: 'blur' },
                {required: true, message: '请输入标题名称', trigger: 'change' }
             ],
             startAcceptTime:[
                 {required: true, message: '请输入起始时间', trigger: 'blur' },
                 {required: true, message: '请输入起始时间', trigger: 'change' }
             ],
             endAcceptTime:[
                 {required: true, message: '请输入结束时间', trigger: 'blur' },
                 {required: true, message: '请输入结束时间', trigger: 'change' }
             ],
             status:[
                 {required: true, message: '请选择状态', trigger: 'blur' },
                 {required: true, message: '请选择状态', trigger: 'change' }
             ]
         }
      }
    },
    async mounted(){
         // console.log(this.screenHeight);
         const res = await this.$fetch.api_msgManagement.getMsgList({})
         if(res.code === "200"){
                this.queryResult = res.result;
         }else{
              this.$message({
                 showClose:true,
                 type:'error',
                 message:'请求消息通知列表失败'
              })
         }
    },
    filters:{
      formatDate(time) {
            var date = new Date(time);
            return dayjs(date).format('YYYY-MM-DD')
        }
    },
    methods: {
       handleRead(row) {
        this.$router.push({
          path:'/message/detail',
          query:{
             uid:row.uid
          }
        })
      },
      async query(){
          //分页请求数据
           const res = await this.$fetch.api_msgManagement.getMsgList(this.ruleForm);
           // console.log(res);
           if(res.code === "200"){
                this.queryResult = res.result;
           }else{
                this.$message({
                   showClose:true,
                   type:'error',
                   message:'请求消息通知列表失败'
                })
           }
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.ruleForm.pageSize = pageSize
        this.query();
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.ruleForm.pageNum = currentPage
        this.query();
      },
      submitForm(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            //YYYY-MM-DD
            console.log(this.ruleForm.startAcceptTime);
            const dataObj = {
                  title:this.ruleForm.title,
                  status:this.ruleForm.status == '0'?'':this.ruleForm.status,
                  // dayjs(this.ruleForm.startAcceptTime).format('YYYY-MM-DD')
                  startAcceptTime:this.ruleForm.startAcceptTime != "" && this.ruleForm.startAcceptTime != null?dayjs(this.ruleForm.startAcceptTime).format('YYYY-MM-DD'):"",
                  endAcceptTime:this.ruleForm.endAcceptTime != "" && this.ruleForm.endAcceptTime != null?dayjs(this.ruleForm.endAcceptTime).format('YYYY-MM-DD'):""
            }
            //请求数据
            const res = await this.$fetch.api_msgManagement.getMsgList(dataObj);
             if(res.code === "200"){
                this.queryResult = res.result;
                 }else{
                      this.$message({
                         showClose:true,
                         type:'error',
                         message:'请求消息通知列表失败'
                      })
                 }
           } else {
            return false;
          }
        });
      }
    }
  }
</script>
<style scoped>
    .message-notice-container{
      width: 100%;
    }
    .select-container{
      width: 100%;
      height: 80px;
      display: flex;
      flex-direction: row;
      justify-content:space-around;
      align-items: center;
      background: #ffffff;
    }
    .select-container .message-title-input{
      outline: none;
      width: 180px;
      height:35px;
      line-height: 35px;
      border-radius: 3px;
      border:1px solid #cccccc;
    }
    .select-container .message-title-input::-webkit-input-placeholder{
      font-size: 14px;
    }
    .returnBtn{
      padding:0 10px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #0084FE;
      color:#ffffff;
      font-size: 12px;
      letter-spacing: 2px;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
      float: right;
    }
    .el-icon-location{
      float: left;
      margin-right:10px;
    }
    .pagination-container{
      text-align: right;
    }
    .message-notice-container .search{
      background: #ffffff;
      padding-top:10px;
      padding-bottom:10px;
      padding-left:20px;
    }
    .message-notice-container .el-form-item{
      margin-bottom:0px;
    }
    .dataShow-table{
      background: #ffffff;
      padding:20px;
      margin-top:20px;
    }
</style>

