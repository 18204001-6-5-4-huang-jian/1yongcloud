<template>
  <div class="help-center">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="下载中心" name="first">
        <el-table
          align="left"
          border
          :data="tableData"
          style="width:100%">
          <el-table-column
            prop="name"
            align="left"
            label="文件名称"
            width="300">
          </el-table-column>
          <el-table-column
            label="操作"
            align="left"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="downLoad(scope.row)"> {{scope.row.name}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="常见问题" name="second">

      </el-tab-pane>
      <el-tab-pane label="联系我们" name="third">
        <div class="container">
          <div style="width: 450px;margin: auto;padding: 20px 70px;">
            <h2 style="text-align: center;">联系我们</h2>
            <div class="contan">
              <p class="text">
                地　　址：北京市朝阳区潘家园南里17号
              </p>
              <p class="text">
                邮　　编：100021
              </p>
              <p class="text">
                电子邮箱：natdss@cicams.ac.cn
              </p>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import server from 'src/common/config'
  export default {
    data() {
      return {
        activeName: 'first',
        tableData: [{
          name: '医院用户快速入门手册.docx',
        }, {
          name: '国家中心用户快速入门手册.docx',
        }, {
          name: '医院药品上传模板.xls',
        }, {
          name: '恶性肿瘤患者住院病案首页基本信息.xls',
        }, {
          name: '恶性肿瘤患者住院病案首页手术记录.xls',
        }, {
          name: '恶性肿瘤患者住院病案首页诊断记录.xls',
        }, {
          name: '恶性肿瘤患者住院诊疗医嘱信息.xls',
        }, {
          name: '恶性肿瘤患者住院诊疗费用明细记录.xls',
        }, {
          name: '恶性肿瘤患者就诊基本信息.xls',
        }, {
          name: '抗肿瘤药物使用清单.xls',
        }, {
          name: '抗肿瘤药物采购明细清单.xls',
        },]
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      downLoad(row){
        console.log(row.name)
        let url = `${server.server_base_url}basefile/${row.name}`
        window.location.href = url
      }
    }
  }
</script>

<style scoped>
  .help-center {
    background: #ffffff;
    padding: 20px;
    border-radius: 4px;
  }

  .container .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .container .date {
    height: 30px;
    line-height: 30px;
    font-weight: normal;
    text-indent: 60%;
  }

  .text {
    height: 40px;
    line-height: 40px;
  }

  .contan {
    margin-top: 20px;
  }
</style>
<style>
 .help-center .cell{
   text-align: left!important;
   padding-left: 20px!important;
 }
</style>
