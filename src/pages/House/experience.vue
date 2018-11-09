<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>会所管理</el-breadcrumb-item>
              <el-breadcrumb-item>体验券管理</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">体验券管理</span>
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
                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加体验券</el-button>
                <template>
                  <el-dialog title="添加体验券" :append-to-body="true" :visible.sync="dialogFormVisible">
                    <!--添加体验券-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="体验券名称:" prop="experiencename" :label-width="formLabelWidth">
                          <el-col :span="22">
                            <el-input v-model="ruleForm.experiencename" placeholder="请输入"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="售价(元):" prop="price" :label-width="formLabelWidth">
                          <el-col :span="22">
                            <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="总次数:" prop="number" :label-width="formLabelWidth">
                          <el-col :span="22">
                            <el-input v-model="ruleForm.number" placeholder="请输入"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="有效期(天数):" prop="termvalidity" :label-width="formLabelWidth">
                          <el-col :span="22">
                            <el-input v-model="ruleForm.termvalidity" placeholder="请输入"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                          <el-col :span="22">
                            <el-radio-group v-model="ruleForm.status">
                                <el-radio :label="1">启用</el-radio>
                                <el-radio :label="0">禁用</el-radio>
                            </el-radio-group>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="类型:" prop="type" :label-width="formLabelWidth">
                          <el-col :span="22">
                            <el-radio-group v-model="ruleForm.type">
                                <el-radio :label="1">团课券</el-radio>
                                <el-radio :label="0">私教券</el-radio>
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
                <el-button type="text" class="p" @click="changeInfo">编辑体验券</el-button>
                <template>
                  <el-dialog title="编辑体验券" :append-to-body="true" :visible.sync="dialogFormVisible2">
                    <Editexpersecurity :currentSelectRow="currentSelectRow"></Editexpersecurity>
                  </el-dialog>
                </template>
              </div>
              <div class="add2">
                <el-button type="text" class="p" @click="delexper">删除体验券</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table v-loading="loading"  ref="singleTable" @current-change="handleCurrentChange2" element-loading-text="拼命加载中..." fixed highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
              <el-table-column align="center" prop="radio" fixed width="70px">
                <template slot-scope="scope">
                 <el-radio class="radio" v-model="radio"  :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="tkName" align="left" fixed label="体验券名称"></el-table-column>
              <el-table-column prop="tkPrice" align="left" label="售价"></el-table-column>
              <el-table-column prop="tkState" align="left" label="状态"></el-table-column>
              <el-table-column prop="type" align="left" label="类型"></el-table-column>
              <el-table-column prop="frequency" align="left" label="次数"></el-table-column>
              <el-table-column prop="vld" align="left" label="有效期(天数)"></el-table-column>
            </el-table>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
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
import * as validate from "@/validate/Login";
export default {
  inject:['reload'],
  name: "experience",
  components: {
    Editexpersecurity
  },
  data() {
    return {
      formLabelWidth: '130px',
      disabled:false,
      currentSelectRow: "",
      loading: true,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      currentPage: 1,
      pagesize: 10,
      radio: true,
      ruleForm: {
          experiencename:'',//体验券名称
          type: '',//类型
          price:'',//售价
          termvalidity: '',//有效期
          number:'',//总次数
          status:'',//状态
        },
        rules: {
          experiencename:validate.experiencename,
          type: validate.type,
          price:validate.price,
          termvalidity: validate.termvalidity,
          number:validate.number,
          status:validate.status
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
    //添加体验券
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            var loginParams = {
              tkName: this.ruleForm.experiencename, //劵名称
              tkPrice: this.ruleForm.price, //劵价格
              tkState: this.ruleForm.status, //状态
              frequency: this.ruleForm.number, //次数
              vld: this.ruleForm.termvalidity, //有效期
              type: this.ruleForm.type //类型
            };
            requestLogin("/setExperienceVoucher", loginParams, "post")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible=false;
              })
              .catch(error => {
                this.addLoading = false;
                if (error.response) {
                  this.$message({
                    message: "提交失败,请稍候再试",
                    type: "error"
                  });
                }
              });
          });
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
      this.radio = this.tableData.indexOf(row);
    },
    handleCurrentChange2(val,index) {
        this.currentRow = val;
        // this.$emit('data',val.pkg);
     },
        getCurrentRow(val){
          console.log(val);
     },
    changeInfo() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    //删除体验券
      delexper() {
      let _this = this;
      if (!this.currentSelectRow) {
        this.$message({ message: "请先选择数据!", type: "warning" });
        return;
      }
      this.$confirm("确认删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.loading = true;
          console.log(_this.currentSelectRow.id);
          requestLogin(
            "/setExperienceVoucher/" + _this.currentSelectRow.id,
            {},
            "delete"
          ).then(response => {
            _this.loading = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
          this.reload();
        })
        .catch(() => {
          if (error.response) {
            this.$message({
              message: "对不起,该员工还有正在跟进的定金客户没有交接",
              type: "error"
            });
          }
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