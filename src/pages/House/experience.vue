<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>会所管理</el-breadcrumb-item>
              <el-breadcrumb-item>体验卷管理</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">体验卷管理</span>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <div class="practice-list">
      <div class="practice-center">
        <el-row>
          <el-col :span="24">
            <div class="purple">
              <div class="add">
                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加体验卷</el-button>
                <template>
                  <el-dialog title="添加体验卷" :append-to-body="true" :visible.sync="dialogFormVisible">
                    <!--添加体验卷-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="体验卷名称:" prop="cardname" :label-width="formLabelWidth">
                          <el-col :span="22">
                            <el-input v-model="ruleForm.cardname" placeholder="请输入"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="售价(元):" prop="price" :label-width="formLabelWidth">
                          <el-col :span="22">
                            <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="总次数:" prop="num" :label-width="formLabelWidth">
                          <el-col :span="22">
                            <el-input v-model="ruleForm.num" placeholder="请输入"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="有效期(天数):" prop="datenum" :label-width="formLabelWidth">
                          <el-col :span="22">
                            <el-input v-model="ruleForm.datenum" placeholder="请输入"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                          <el-col :span="22">
                            <el-radio-group v-model="status">
                                <el-radio :label="1">启用</el-radio>
                                <el-radio :label="2">禁用</el-radio>
                            </el-radio-group>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="类型:" prop="type" :label-width="formLabelWidth">
                          <el-col :span="22">
                            <el-radio-group v-model="ruleForm.type">
                                <el-radio :label="1">团课卷</el-radio>
                                <el-radio :label="2">私教卷</el-radio>
                            </el-radio-group>
                            </el-col>
                        </el-form-item>
                        <el-form-item class="dialog-footer">
                          <el-col :span="24" style="display: flex;justify-content: flex-end;">
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                        </el-col>
                    </el-form-item>
                    </el-form>
                  </el-dialog>
                </template>
              </div>
              <div class="add">
                <el-button type="text" class="p" @click="changeInfo">编辑体验卷</el-button>
                <template>
                  <el-dialog title="编辑体验卷" :append-to-body="true" :visible.sync="dialogFormVisible2">
                    <Editexpersecurity :currentSelectRow="currentSelectRow"></Editexpersecurity>
                  </el-dialog>
                </template>
              </div>
              <div class="add2">
                <el-button type="text" class="p" @click="open2">删除体验卷</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table v-loading="loading" element-loading-text="拼命加载中..." fixed highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
              <el-table-column align="center" prop="radio" fixed width="70px">
                <template slot-scope="scope">
                  <el-radio-group v-model="radio">
                    <el-radio :label="scope.$index" @change.native="radiochange(scope.row)">&nbsp;</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column prop="tkName" align="left" label="体验卷名称"></el-table-column>
              <el-table-column prop="tkPrice" align="left" label="售价"></el-table-column>
              <el-table-column prop="tkState" align="left" label="状态"></el-table-column>
              <el-table-column prop="type" align="left" label="类型"></el-table-column>
              <el-table-column prop="frequency" align="left" label="次数"></el-table-column>
              <el-table-column prop="vld" align="left" label="有效期(天数)"></el-table-column>
            </el-table>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import Editexpersecurity from "@/components/editexpersecurity";
import { requestLogin } from "@/api/api";
export default {
  name: "experience",
  components: {
    Editexpersecurity
  },
  data() {
    return {
      formLabelWidth: '130px',
      num: 1,
      status:1,
      memcolor:1,
      classtype:1,
      type:1,
      disabled:false,
      limitdate: [],
      currentSelectRow: "",
      loading: true,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      currentPage: 1,
      pagesize: 10,
      radio: true,
      ruleForm: {
          cardname:'',//卡名称
          type: '',//类型
          price:'',//售价
          datenum: '',//有效期
          num:'',//总次数
          status:'',//状态
        },
        rules: {
          cardname:[
            {required: true, message: '请输入体验卷名称', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          price: [
            {required: true, message: '请输入售价', trigger: 'blur' }
          ],
          datenum: [
            {required: true, message: '请输入有效期', trigger: 'blur' }
          ],
         num:[
             {required: true, message: '请输入总次数', trigger: 'blur' }
         ],
         status:[
             {required: true, message: '请选择状态', trigger: 'change'}
         ]
        },
      tableData: []
    };
  },
      created: function () {
    //表格列表数据
      let _this = this;
      _this.loading = true;
      requestLogin("/setExperienceVoucher",{},'get')
        .then(function(res) {
          _this.tableData = res;
          _this.loading = false;
        })
        .catch(error => {
          if(error.res){
             this.$message({
              message: "获取数据失败",
              type: "error"
            });
          }
        });
  },
  methods: {
    radiochange(row) {
      console.log(`当前: ${row}`);
    },
    handleClick3(row) {
      console.log(row);
      alert("点击了");
    },
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
    },
    onSubmit() {
      console.log("submit!");
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    rowClick(row, event, column) {
       this.radio=row.index;
      //获取表格数据
      this.currentSelectRow = row;
      console.log(row.index);
    },
    changeInfo() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$alert("请先选择列表", "提示信息", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `请先选择列表`
            });
          }
        });
      }
    },
    open2() {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData = this.tableData.slice(1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="scss">
 @import '@/styles/dialog.scss';
</style>
<style lang="scss" scoped>
@import "@/styles/experience.scss";
.practice-main {
  height: 112px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  .breadcrumb {
    margin: 17px 20px auto;
  }
  .weber {
    margin: 17px 20px auto;
    height: 45px;
    display: flex;
    line-height: 45px;
    .weber-span {
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      font-family: PingFang-SC-Regular;
    }
    .search {
      width: 261px;
      border: 1px solid #e8e8e8;
      height: 32px;
      margin: 5px 35px auto;
      display: flex;
      border-radius: 16px;
      .search-input {
        width: 100%;
        border-radius: 16px;
        border: none;
        text-indent: 10px;
        color: #8c8c8c;
        font-size: 14px;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
    }
  }
}
.practice-list {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .quanbu {
    display: block;
    height: 60px;
    .search-form {
      height: 45px;
      display: flex;
      float: left;
      margin: 15px 0px auto;
      .el-button--primary {
        background-color: #00bc71;
        border-color: #00bc71;
      }
    }
    .el-input__inner {
      height: 37px;
    }
    .el-input {
      height: 37px;
    }
  }
  .quanbu2 {
    display: inherit;
    float: left;
    height: 60px;
    margin-left: -70px;
    .search-form2 {
      display: flex;
      margin: 15px 0px auto;
      float: left;
      height: 45px;
      .el-button--primary {
        background-color: #00bc71;
        border-color: #00bc71;
      }
    }
    .corry {
      height: 37px;
      line-height: 37px;
      float: left;
      margin-top: 15px;
      .corry-out {
        color: #00bc71;
        font-size: 14px;
      }
    }
  }
  .practice-center {
    height: 80px;
    .purple {
      height: 80px;
      display: flex;
      justify-content: flex-start;
      .add {
        border: 1px solid #00bc71;
        width: 20%;
        height: 35px;
        border-radius: 4px;
        line-height: 0px;
        margin-top: 20px;
        margin-left: 20px;
        .p {
          color: #00bc71;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 9px;
        }
        .add-p {
          color: #00bc71;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 9px;
        }
      }
      .add2 {
        border: 1px solid #ff2366;
        width: 20%;
        height: 35px;
        border-radius: 4px;
        line-height: 0px;
        margin-top: 20px;
        margin-left: 20px;
        .p {
          color: #ff2366;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 9px;
        }
      }
    }
    .purple2 {
      height: 80px;
      display: flex;
      justify-content: center;
      .search {
        width: 44%;
        border: 1px solid #e8e8e8;
        height: 32px;
        display: flex;
        border-radius: 16px;
        margin-top: 20px;
        margin-right: 20px;
        .search-input {
          width: 100%;
          border-radius: 16px;
          border: none;
          text-indent: 10px;
          color: #8c8c8c;
          font-size: 14px;
        }
        .search-icon {
          margin-top: 8px;
          margin-right: 13px;
        }
      }
      .purple-name {
        margin-top: 17px;
      }
      .purple-but {
        margin-top: 17px;
        .el-button--primary {
          height: 35px;
          line-height: 11px;
        }
      }
    }
  }
  .practice-table {
    .el-button--text {
      color: #00bc71;
    }
    .block {
      float: right;
      margin-top: 10px;
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
  }
}
</style>