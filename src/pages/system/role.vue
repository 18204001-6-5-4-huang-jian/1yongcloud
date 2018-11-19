<template>
  <div class="mechanism">
    <div class="machanism-table">
      <div class="button-group">
        <router-link to="/system/roleAdd">
          <el-button type="primary"  :size="$store.state.size">新增</el-button>
        </router-link>
      </div>
      <el-table
        :data="queryResult.result"
        border
        :size="$store.state.size"
        style="width: 100%">
        <el-table-column
         type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="角色描述">
        </el-table-column>
         <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleRead(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
     <!-- <div class="block" style="margin-top: 10px">
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
      </div> -->
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        searchForm:{
            pageNum:1,
            pageSize:null
        },
        //查询结果
        queryResult: {
          pageNum: 1,//当前页
          pageSize: 10,//每页的条数
          pages:0,
          total:0,
          result:[]
        },
      }
    },
    async mounted(){
        //请求数据
            const res = await this.$fetch.api_system.getRoleList(this.searchForm);
              // console.log(res);
              if(res){
                this.queryResult = res;
              }else{
                    this.$message({
                    showClose: true,
                    type:'error',
                    message:'请求角色列表失败',
                  })
              }

    },
    methods: {
      handleRead(row){
        this.$router.push({
          path:'/system/roleDetail',
          query:{
            uid:row.uid
          }
        })
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.form.pageSize = pageSize
        this.query()
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.form.pageNum = currentPage
        this.query()
      },
    }
  }
</script>
<style scoped>
  .machanism-table{
    background: #ffffff;
    padding:10px 20px;
  }
  .block{
    text-align: right;
  }
  .button-group{
    height: 60px;
    line-height:60px;
    padding-right:20px;
  }
</style>
<style>

</style>
