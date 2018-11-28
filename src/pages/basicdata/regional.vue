<template>
  <div class="regional">
    <div class="search">
      <el-form :model="form" :rules="rules" ref="form" labelWidth="80px" class="demo-ruleForm" :inline="true">
        <el-form-item
          label="区域名称"
        >
          <el-input v-model="form.name" placeholder="请输入区划名称" clearable :size="$store.state.size"></el-input>
        </el-form-item>
        <el-form-item
          label="区域编码"
        >
          <el-input v-model="form.code" placeholder="请输入区划编码" clearable :size="$store.state.size"></el-input>
        </el-form-item>
        <el-form-item
          label="省份:"
        >
          <el-select v-model="form.subordinate" placeholder="请选择省份" style="width:200px" clearable
                     :size="$store.state.size" @change="getCityList($event)">
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="市:"
        >
          <el-select v-model="form.subordinateCity" placeholder="请选择市" style="width:200px" clearable
                     :size="$store.state.size">
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" :size="$store.state.size">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-group" style="text-align:right">
      <router-link to="">
        <el-button type="primary" :size="$store.state.size" @click="addArea">添加区域</el-button>
      </router-link>

    </div>
    <div class="table-container">
      <el-table
        :data="queryResult.list"
        border
        :size="$store.state.size"
        style="width:100%">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="区域名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="code"
          label="区域编码">
        </el-table-column>
        <el-table-column
          prop="subordinate"
          label="包含省、市">
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
      <div class="block" style="margin-top:10px;text-align:right;">
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
      <!-- dialog -->
      <el-dialog title="添加区划" :visible.sync="dialogFormVisible" center ref="dialog">
        <el-form :model="formDialog" ref="formDialog" :rules="dialogRules">
          <el-form-item label="区域名称" label-width="120px" prop="name">
            <el-input v-model="formDialog.name" placeholder="请输入区划名称" clearable style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="区域编码" label-width="120px" prop="code">
            <el-input v-model="formDialog.code" placeholder="请输入区划编码" clearable style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="包含省，市" label-width="120px">
            <el-tree
              :data="data"
              show-checkbox
              node-key="code"
              :default-expanded-keys="defaultExpanded"
              :default-checked-keys="checkArray"
              :props="defaultProps"
              ref="tree"
            >
            </el-tree>
          </el-form-item>
          <el-form-item label="备注" label-width="120px">
            <el-input v-model="formDialog.remark" autocomplete="off" style="width:200px;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitDialog('formDialog')">确定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        //查询结果
        queryResult: {
          pageNum: 1,//当前页
          pageSize: 18,//每页的条数
          pages: 0,
          total: 0,
          list: []
        },
        form: {
          name: '',
          code: '',
          subordinate: '',
          subordinateCity: '',
          pageSize: 10,
          pageNum: 1
        },
        provinceList: [],
        cityList: [],
        rules: {
          name: [
            {required: true, message: '请输入区划名称', trigger: 'change'}
          ],
          code: [
            {required: true, message: '请输入区域编码', trigger: 'change'}
          ],
          subordinate: [
            {required: true, message: '请选择省份', trigger: 'change'}
          ],
          subordinateCity: [
            {required: true, message: '请选择市', trigger: 'change'}
          ]
        },
        //弹出框
        dialogFormVisible: false,
        formDialog: {
          name: '',
          code: '',
          remark: ''
        },
        dialogRules: {
          name: [
            {required: true, message: '请输入区划名称', trigger: ['change','blur']}
          ],
          code: [
            {required: true, message: '请输入区划编码', trigger: ['change','blur']}
          ]
        },
        //tree
        data: [],
        checkArray: [],
        defaultExpanded: [],
        defaultProps: {
          children: 'child',
          label: 'name'
        }

      }
    },
    async mounted(){
      //获取列表数据
      const listData = await this.$fetch.api_basicData.getRegionalList({});
      if (listData.code === "200") {
        this.queryResult = listData.result;
      }
      //请求省份list
      const res = await this.$fetch.api_system.getLinkageList('000000');
      if (res.code === "200") {
        this.provinceList = res.result;
      }
      //请求dirlog的tree数据
      const resDirlog = await this.$fetch.api_basicData.addAreaTree();
      if (resDirlog.code === "200") {
        this.data = resDirlog.result.child;//级联选择器list
      }
    },
    methods: {
      async query(){
        //分页请求数据
        console.log(this.form);
        const res = await this.$fetch.api_basicData.getRegionalList(this.form);
        if (res.code === "200") {
          this.queryResult = res.result;
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: '请求失败'
          })
        }
      },
      pageSizeChange(pageSize) {
        this.form.pageSize = pageSize;
        this.query()
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.form.pageNum = currentPage;
        this.query()
      },
      handleRead(row){
        // console.log(row.uid);
        this.$router.push({
          path: '/basicdata/regionalDetil',
          query: {
            uid: row.uid
          }
        })
      },
      submitForm(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            //请求数据
            const dataObj = {
              name: this.form.name,
              code: this.form.code,
              subordinate: this.form.subordinateCity != "" ? this.form.subordinateCity : this.form.subordinate,
              pageSize: 10,
              pageNum: 1
            }
            const res = await this.$fetch.api_basicData.getRegionalList(dataObj);
            if (res.code === "200") {
              this.queryResult = res.result;
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                message: '查询失败'
              })
            }
          } else {
            return false;
          }
        });
      },
      async getCityList(e){
        if (e != '') {
          const res = await this.$fetch.api_system.getLinkageList(e);
          if (res.code === "200") {
            this.form.subordinateCity = "";//清空上一次选择的市
            this.cityList = res.result;
          }
        } else {
          //省份为空
        }
      },
      addArea(){
        this.dialogFormVisible = true;
      },
      submitDialog(form){
        //请求数据
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            const treeList = this.$refs.tree.getCheckedKeys();//获取code数组
            if(treeList.length == 0){
              this.$message({
                type:'error',
                message:'请选择省或者市'
              })
              var dom =  this.$refs.dialog.$refs.dialog.parentNode;
              // dom.animate({scrollTop: '0px'}, 200);
              dom.scrollTop = 0;
              return false;
            }
            for (let i = 0; i < this.data.length; i++) {
              if (this.data[i].child && this.data[i].child != null) {
                for (let j = 0; j < this.data[i].child.length; j++) {
                  if (treeList.indexOf(this.data[i].child[j].code) >= 0 && treeList.indexOf(this.data[i].code) < 0) {
                    treeList.push(this.data[i].code);
                  }
                }
              }
            }
            const data = {
              name: this.formDialog.name,
              code: this.formDialog.code,
              remark: this.formDialog.remark,
              subordinate: treeList.join(',')
            }
            const res = await this.$fetch.api_basicData.addAreaRegional(data);
            if (res.code === "200") {
              this.dialogFormVisible = false;
              //清空
              this.formDialog.name = '';
              this.formDialog.code = '';
              this.formDialog.remark = '';
              this.$refs.tree.setCheckedKeys([]);
              //刷新数据
              this.$nextTick(async () => {
                const listData = await this.$fetch.api_basicData.getRegionalList({});
                if (listData.code === "200") {
                  this.queryResult = listData.result;
                }
              })
            }
          } else {
              var dom =  this.$refs.dialog.$refs.dialog.parentNode;
              // dom.animate({scrollTop: '0px'}, 200);
              dom.scrollTop = 0;
              return false;
          }
        })
      }
    }

  }
</script>

<style scoped>
  .regional .el-button--text {
    background: #0084FE;
    padding: 10px 15px;
    border-radius: 5px;
    color: #ffffff;
  }

  .regional .el-message-box__header {
    text-align: center;
  }

  .el-dialog__header {
    text-align: center;
  }
</style>


