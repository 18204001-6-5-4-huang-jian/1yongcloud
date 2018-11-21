<template>
	<div class="message-detail">
		<div class="message-title" v-text="result.title"></div>
		<div class="message-context" v-html="'各单位:<br/><p>' + result.context + '<p>'"></div>
		<div class="message-footer">以上如有问题，请联系我们</div>
		<div style="text-align:right;margin:20px 0;">
			<el-button type="primary" style="margin-right:100px;" @click="returnBack()">返回</el-button>
		</div>
	</div>
</template>
<script>
export default{
		data(){
			return{
               result:{
               	 title:'',
                 context:''
               }
			}
		},
		async mounted(){
           // console.log(this.$route.query.uid);
           const res = await this.$fetch.api_msgManagement.getMsgDetail({uid:this.$route.query.uid});
           if(res.code === "200"){
              this.result = res.result;
             this.$fetch.api_home.countyMeaasge()
               .then((res) => {
                 if(res.result == 0){
                   this.$store.state.messageCount = ''
                 }else{
                   this.$store.state.messageCount = res.result
                 }

               })
           }else{
           	   this.$message({
           	   	   type:'error',
           	   	   showClose:true,
           	   	   message:'获取该条详情失败'
           	   })
           }

		},
		methods:{
              returnBack(){
              	this.$router.push({
              		path:'/message/notice'
              	})
              }
		}
	}
</script>
<style>
	.message-detail{
		width: 100%;
		background: #fff;
		overflow: hidden;
	}
	.message-title{
		height: 80px;
		line-height: 80px;
		text-align: center;
		font-size: 24px;
	}
	.message-context{
		width: 50%;
		height: 260px;
		margin:20px auto;
		font-size: 16px;
	}
	.message-context p{
		text-indent: 50px;
	}
	.message-footer{
		height: 80px;
		line-height: 80px;
		text-align: center;
		font-size: 20px;
	}
</style>
