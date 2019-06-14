<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>会所管理</el-breadcrumb-item>
              <el-breadcrumb-item>财产管理</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">财产管理</span>
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
                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加登记</el-button>
                <template>
                  <el-dialog title="添加登记" :append-to-body="true" :visible.sync="dialogFormVisible">
                    <!--添加物品-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="物品名称:" prop="name" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model.trim="ruleForm.name" maxlength="10" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="领取人:" prop="receive" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-model="ruleForm.receive" placeholder="请选择" style="width:100%" @change="Selectchange2">
                          <el-option v-for="item in staff_info" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="财产类别:" prop="type" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-radio-group v-model="ruleForm.type">
                              <el-radio :label="1">实物</el-radio>
                              <el-radio :label="2">虚拟</el-radio>
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
              <div class="add2">
                <el-button type="text" class="p" @click="delexper">删除登记</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table ref="singleTable" @current-change="handleCurrentChange2" fixed highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
              <el-table-column align="center" prop="radio" fixed width="70px">
                <template slot-scope="scope">
                  <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="name" align="left" label="物品名称"></el-table-column>
              <el-table-column prop="type" align="left" label="物品类型"></el-table-column>
              <el-table-column prop="register_name" align="left" label="登记人"></el-table-column>
              <el-table-column prop="receive_name" align="left" label="领用人"></el-table-column>
              <el-table-column prop="register_day" align="left" label="领用日期"></el-table-column>
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
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
export default {
  inject: ["reload"],
  name: "property",
  data() {
    return {
      formLabelWidth: "130px",
      currentSelectRow: "",
      radio: true,
      dialogFormVisible: false,
      currentPage: 1,
      pagesize: 10,
      staff_info:[],
      ruleForm: {
        receive: "",
        name: "",
        type:""
      },
      rules: {
        receive: [{ required: true,message: '请选择领用人', trigger: "change" }],
        type: [{ required: true,message: '请选择财产类别', trigger: "change" }],
        name:[{ required: true,message: '请输入物品名称', trigger: "blur" }],
      },
      tableData: [],
    };
  },
  created: function() {
    this.getclassroom();
    this.getreceive();
  },
  methods: {
    //获取教室数据
    getclassroom() {
      let _this = this;
      requestLogin("/property", {}, "get")
        .then(function(res) {
          _this.tableData = res;
        })
        .catch(error => {
         let { response: { data: { errorCode, msg } } } = error;
        if (errorCode != 0) {
          this.$message({
            message: msg,
            type: "error"
          });
          return;
        }
        });
    },
    //获取领取人
    getreceive() {
      let _this = this;
      requestLogin("/property/create", {}, "get")
        .then(function(res) {
          _this.staff_info = res;
        })
        .catch(error => {
         let { response: { data: { errorCode, msg } } } = error;
        if (errorCode != 0) {
          this.$message({
            message: msg,
            type: "error"
          });
          return;
        }
        });
    },
    Selectchange2(val){
      let obj = {};
      obj = this.staff_info.find(item => {
        return item.YGXX_YGID_NEI === val;
      });
      this.YGXX_NAME = obj.YGXX_NAME;
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    getCurrentRow(val) {},
    //添加教室
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              name: this.ruleForm.name,
              type: this.ruleForm.type,
              receive_name:this.YGXX_NAME
            };
            requestLogin("/property", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.getclassroom();
                this.resetForm(formName);
                this.dialogFormVisible = false;
              })
              .catch(error => {
                let { response: { data: { errorCode, msg } } } = error;
                if (errorCode != 0) {
                  this.$message({
                    message: msg,
                    type: "error"
                  });
                  return;
                }
              });
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    rowClick(row, event, column) {
      this.radio = row.index;
      //获取表格数据
      this.currentSelectRow = row;
      this.radio = this.tableData.indexOf(row);
    },
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    //删除登记
    delexper() {
      let _this = this;
      this.$confirm("确认删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        requestLogin("/property/" + _this.currentSelectRow.id, {}, "delete")
          .then(response => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            _this.getclassroom();
            _this.radio = false;
          })
          .catch(error => {
            let { response: { data: { errorCode, msg } } } = error;
            if (errorCode != 0) {
              this.$message({
                message: msg,
                type: "error"
              });
              return;
            }
          });
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
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
  }
}
.practice-list {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
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