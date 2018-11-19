<template>
  <div class="noDataTable">
    <el-table
      :data="list"
      border
      :size="$store.state.size"
      style="width: 100%">
      <el-table-column
        prop="hosname"
        label="医院名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="rows"
        label="上报记录有效行数"
        width="180"
        v-if="type==1">
      </el-table-column>
      <el-table-column
        prop="uptime"
        label="初次上报时间"
        v-if="type==1">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="医院等级">
      </el-table-column>
      <el-table-column
        prop="type"
        label="医院类型">
      </el-table-column>
      <el-table-column
        prop="province"
        label="所在省">
      </el-table-column>
      <el-table-column
        prop="city"
        label="所在市">
      </el-table-column>
      <el-table-column
        prop="district"
        label="所在区">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <router-link :to="{path:'/totalData/detail',query:{deptId:scope.row.deptId,hosname:scope.row.hosname}}">
            <el-button type="text" v-if="type == 1">查看详情</el-button>
          </router-link>
          <router-link :to="{path:'/system/mechanismDetail',query:{deptId:scope.row.deptId}}">
            <el-button type="text" v-if="type == 0">查看联系方式</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    props:['list','type'],
    components: {
    }
  }
</script>
<style scoped>

</style>

