<template>
  <div class="result">
    <div class="search">
      <el-form :model="searchForm" ref="searchForm" labelWidth="100px" class="demo-ruleForm" :show-message="false"
               :inline="true">
        <el-form-item
          label=""
          style="margin-left: 20px;"
        >
          <el-radio-group v-model="searchForm.sysDept">
            <el-radio label="DEPT">本院药品库</el-radio>
            <el-radio label="SYS">标准药品库</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="请选择查询字段名" label-width="150px"
        >
          <el-select v-model="searchForm.deptType" placeholder="请选择查询字段名" style="width:200px"  :size="$store.state.size">
            <el-option
              v-for="item in $store.state.queryDeptDrugibrary1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="查找内容"
          prop="deptParam"
        >
          <el-input v-model="searchForm.deptParam" autocomplete="off" style="width:200px"  :size="$store.state.size"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query()"  :size="$store.state.size">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tip">
      <span>
        待匹配数据

           <router-link to="/basicdata/matching">
             <span style="color: #0084FE;">
              {{count}}
             </span>
           </router-link>

        条，点击右侧“匹配”功能或者在菜单”药品数据匹配“进行匹配
      </span>
      <span class="button-group">
        <router-link to="/basicdata/matching">
            <el-button type="primary" :size="$store.state.size">继续匹配</el-button>
        </router-link>
         <el-button type="primary" :size="$store.state.size" @click="exportData()">导出</el-button>
         <el-button type="primary" :size="$store.state.size" @click="cancelData">取消匹配</el-button>
      </span>
    </div>
    <div class="result-table">
      <h3 style="text-align: center;line-height: 40px;">药品数据匹配结果</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="title">
            医院药品字典
          </div>
          <el-table
            border
            :size="$store.state.size"
            :data="queryResult.list"
            tooltip-effect="dark"
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              fixed
              width="50">
            </el-table-column>
            <el-table-column
              label="通用名"
              width="150"
              :show-overflow-tooltip="true"
              prop="genericName"
            >
            </el-table-column>
            <el-table-column
              label="商品名"
              width="150"
              :show-overflow-tooltip="true"
              prop="productName"
            >
            </el-table-column>
            <el-table-column
              prop="productionUnits"
              width="250"
              label="生产单位"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="dosageForm"
              width="150"
              :show-overflow-tooltip="true"
              label="剂型"
            >
            </el-table-column>
            <el-table-column
              prop="specifications"
              width="150"
              :show-overflow-tooltip="true"
              label="规格"
            >
            </el-table-column>
            <el-table-column
              prop="approvalNumber"
              width="200"
              label="批准文号（国产药物）"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="registrationNumber"
              width="200"
              :show-overflow-tooltip="true"
              label="注册证号（进口药物）"
            >
            </el-table-column>
            <el-table-column
              prop="drugCode"
              width="150"
              :show-overflow-tooltip="true"
              label="本院药品编码"
            >
            </el-table-column>
            <el-table-column
              prop="localHealcareDirectory"
              width="200"
              :show-overflow-tooltip="true"
              label="是否纳入当地医保目录"
            >
            </el-table-column>
            <el-table-column
              prop="localHealcareDirectoryTime"
              width="200"
              label="纳入当地医保目录时间"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <div class="title">
            标准药品字典
          </div>
          <el-table
            border
            :size="$store.state.size"
            ref="multipleTable"
            :data="queryResult.list"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="sysgenericName"
              label="通用名"
              width="150"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sysproductName"
              label="商品名"
              width="150"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sysproductionUnits"
              label="生产单位"
              width="250"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sysdosageForm"
              label="剂型"
              width="150"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sysspecifications"
              label="规格"
              width="150"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sysapprovalNumber"
              width="200"
              label="批准文号"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sysregistrationNumber"
              width="200"
              label="注册证号"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sysname"
              width="150"
              label="药品名"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sysgenericEnglishName"
              label="通用名（英文名）"
              width="150"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="syspackagingSpecifications"
              width="250"
              label="包装规格"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="syspackingCompanyName"
              width="150"
              label="分包装批准文号"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sysbasedCode"
              width="150"
              label="药品本位码"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sysscope"
              width="150"
              label="国内外范围"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sysclassification"
              width="150"
              label="药品种类"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sysproductCategory"
              width="150"
              label="产品类别"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="systreatmentType"
              width="150"
              label="治疗分类"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="syscountryHealcareDirectory"
              width="150"
              label="纳入国家医保目录"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="syscountryHealcareDirectoryTime"
              width="200"
              label="纳入国家医保目录时间"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="syscountryBasicDrugStatus"
              width="150"
              label="是否为国家基本药物"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="syscountryBasicDrugTime"
              width="200"
              label="纳入国家基本药物时间"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="syscountryVarietiesNegotialStatus"
              width="150"
              label="是否为国家谈判品牌"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="syscountryVarietiesNegotialTime"
              width="200"
              label="纳入国家谈判品种时间"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sysypId"
              width="150"
              label="YPID"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <div class="block" style="margin-top: 10px">
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
      </el-row>

    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data(){
      return {
        //未匹配个数
        count:0,
        //查询结果
        queryResult: {
          pageNum: 1,//当前页
          pageSize: 10,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
        searchForm: {
          sysDept: '',
          deptParam: '',
          deptType: '',
          pageNum: 1,
          pageSize: 10,
        },
        multipleSelection:[]
      }
    },
    mounted(){
      this.query()
      this.getCount()
    },
    methods: {
       //查询列表
      query(){
        this.$fetch.api_basicData.queryMatchingDeptDrugibrary(
          this.searchForm
        )
        .then(response => {
          this.queryResult = response.result
        })
      },
      //取消匹配
      cancelData(){
        let arr = []
        this.multipleSelection.filter(item=>{
          arr.push({
            uid:item.uid
          })
        })
        this.$fetch.api_basicData.deleteMatchingMedicine(arr)
          .then(response => {
             this.$message.success('取消匹配成功')
             this.query()
          })
      },
      //获取未匹配个数
      getCount(){
        this.$fetch.api_basicData.queryCountDeptDrugibrary()
          .then(response => {
            this.count = response.result
          })
      },
      //导出数据
      exportData(){
        this.$fetch.api_basicData.excelDrugResult({
          deptParam:this.searchForm.deptParam,
          deptType:this.searchForm.deptType,
          sysDept:this.searchForm.sysDept,
        })
          .then(res => {
            console.log(res,1)
            let url = window.URL.createObjectURL(new Blob([res.data],{type:'application/msexcel'}))
            console.log(url)
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', '数据匹配结果.xlsx')
            document.body.appendChild(link)
            link.click()
            URL.revokeObjectURL(link.href); // 释放URL 对象
            document.body.removeChild(link);
          })
      },
      //表格多选
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.searchForm.pageSize = pageSize
        this.query()
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.searchForm.pageNum = currentPage
        this.query()
      },
    }

  }
</script>

<style scoped>
  .button-group {
    float: right;
  }

  .tip {
    height: 60px;
    line-height: 60px;
  }

  .result-table {
    padding: 20px;
    background: #ffffff;
  }

  .result .title {
    text-align: center;
    line-height: 40px;
    border: 1px solid #e5e5e5;
    border-bottom: none;
  }
</style>
<style>
  .result .el-table thead.is-group th {
    background: #ffffff !important;
  }

  .result td {
    height: 41px !important;
  }
</style>
