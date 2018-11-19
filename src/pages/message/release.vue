<template>
  <div class="message-release-container">
   <el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="消息标题" prop="title">
    <el-input v-model="form.title" placeholder="请输入消息标题" size="small"></el-input>
    <span class="span">请输入不超过20个字的消息标题</span>
  </el-form-item>
  <el-form-item label="消息正文">
     <div class="message-release-content">
   <!-- editor -->
    <div class="editor-container">
      <UE :defaultMsg=defaultMsg :config=config ref="editor"></UE>
    </div>
      </div>
  </el-form-item>
    <el-form-item label="接收平台" prop="platform">
      <el-checkbox-group v-model="form.platform">
      <el-checkbox label="系统平台" name="type"></el-checkbox>
         <el-checkbox label="短信" name="type"></el-checkbox>
     <!--    <el-checkbox label="短信通知" name="type"></el-checkbox> -->
    </el-checkbox-group>
    </el-form-item>
      <el-form-item>
    <el-button type="primary" @click="handleSubmit('form')">立即发布</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
  import UE from './ue.vue';
  export default {
    components: {
        UE
    },
    data() {
      return {
        form: {
           title:'',
           // staus:'',
           platform:[]
        },
        systemType:'',
        smsType:'',
        rules:{
            title:[
                {required: true, message: '请输入消息标题', trigger:['blur', 'change'] },
                { min: 1, max: 20, message: '请输入不超过20个字的消息标题', trigger:['blur', 'change']}
            ],
            platform:[
                {type:'array',required:true,message:'请选择至少一个接收平台',trigger:['blur', 'change']}
            ]
        },
        //富文本
        defaultMsg:'',
        config:{
           toolbars: [
                ['fullscreen', 'source', 'undo', 'redo'],
                ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
          ],
          initialFrameWidth: 900,
          initialFrameHeight: 350
         }
      }
    },
    methods: {
      //获取富文本文字
      getUEContent() {
        let content = this.$refs.editor.getUEContent();
          // console.log(content)；
       },
       filterHTMLTag(msg){
        var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML
        msg = msg.replace(/[|]*\n/, '') //去除行尾空格
        msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
        return msg;
       },
       handleSubmit(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
             let content = this.$refs.editor.getUEContent();
             if (content){
                let _content = this.filterHTMLTag(content);
                const list = this.form.platform;
                for(let i in list){
                  if(list[i] == '系统平台'){
                      this.systemType = '1';
                  }else if(list[i] == '短信'){
                      this.smsType = '2';
                  }
                }
                const dataObj = {
                  title:this.form.title,
                  context:_content,
                  systemType:this.systemType,
                  smsType:this.smsType

                }
                //请求数据
                const res = await this.$fetch.api_msgManagement.setMsg(dataObj);
                // console.log(res);
                if(res.code === "200"){
                  this.$router.push({
                    path:'/message/notice'
                  })
                }
             }else{
                //富文本为空
                this.$message({
                   type:'error',
                   showClose:true,
                   message:'请输入消息正文'
                })
             }
          }else{
            return false;
          }
        })
       }
    }
  }
</script>
<style scoped>
    .message-release-container{
      user-select:none;
      background: #ffffff;
      padding: 20px;
    }
    .el-form:nth-child(1) .el-input{
      width:300px;
    }
    .message-release-container .message-release-content{
       width:100%;
       height:500px;
    }
    .span{
      font-size: 14px;
      margin-left:20px;
    }
  </style>
