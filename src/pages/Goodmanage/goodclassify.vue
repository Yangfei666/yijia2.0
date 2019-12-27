<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="practice-main">
                    <el-col :span="23" class="breadcrumb">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="23" class="weber">
                        <span class="weber-span">商品分类</span>
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
                                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加分类</el-button>
                                <template>
                                    <el-dialog title="添加分类" :append-to-body="true" :visible.sync="dialogFormVisible">
                                        <!--添加分类-->
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                                            <el-form-item label="分类名称:" prop="classname" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="ruleForm.classname" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-radio-group v-model="ruleForm.status" @change="cahngesen">
                                                        <el-radio :label="1">启用</el-radio>
                                                        <el-radio :label="2">禁用</el-radio>
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
                                <el-button type="text" class="p" @click="editpriority()">编辑分类</el-button>
                                <template>
                                    <el-dialog title="编辑分类" :append-to-body="true" :visible.sync="dialogFormVisible2">
                                        <!--编辑储物柜-->
                                        <el-form :model="ruleForm2" ref="ruleForm2" label-width="100px">
                                            <el-form-item label="分类名称:" prop="name" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="currentSelectRow.name"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-radio-group v-model="currentSelectRow.status" @change="cahngesen">
                                                        <el-radio label="启用" value="1"></el-radio>
                                                        <el-radio label="禁用" value="2"></el-radio>
                                                    </el-radio-group>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item class="dialog-footer">
                                                <el-col :span="24" style="display: flex;justify-content: flex-end;">
                                                    <el-button type="primary" @click="submitForm2('ruleForm2')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                                                </el-col>
                                            </el-form-item>
                                        </el-form>
                                    </el-dialog>
                                </template>
                            </div>
                            <div class="add2">
                                <el-button type="text" class="p" @click="deleteclassify">删除分类</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="practice-table">
                <el-row>
                    <el-col :span="24">
                        <el-table ref="singleTable" @current-change="handleCurrentChange2" fixed highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
                            <el-table-column align="right" prop="radio" fixed width="30px">
                                <template slot-scope="scope">
                                    <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" align="center" label="分类名称"></el-table-column>
                            <el-table-column prop="status" align="center" label="状态"></el-table-column>
                            <el-table-column align="center" label="操作">
                                <template slot-scope="scope">
                                    <el-button v-if="scope.row.status == '启用'" type="danger" plain size="medium" @click="Enabledisabled(scope.$index)">禁用</el-button>
                                    <el-button v-else plain type="success" size="medium" @click="Enabledisabled(scope.$index)">启用</el-button>
                                </template>
                            </el-table-column>
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
const radioDict = {
  "启用": 1,
  "禁用": 2,
}
export default {
  inject: ["reload"],
  name: "goodclassify",
  data() {
    return {
      formLabelWidth: "130px",
      currentSelectRow: "",
      radio: true,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      currentPage: 1,
      pagesize: 10,
      ruleForm: {
        classname: "",
        status: "",
      },
      ruleForm2:{
        name: "",
        status: "",
      },
      rules: {
        classname: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
        status:[{ required: true, message: '请选择分类', trigger: 'change' }],
      },
      tableData: []
    };
  },
  created: function() {
    this.getclassroom();
    this.ruleForm2.name = this.currentSelectRow.name;
    this.ruleForm2.status = this.currentSelectRow.status;
  },
  activated () {
    this.getclassroom();
    this.ruleForm2.name = this.currentSelectRow.name;
    this.ruleForm2.status = this.currentSelectRow.status;
    this.dialogFormVisible = false;
    this.dialogFormVisible2 = false;
  },
  methods: {
    //获取商品分类表格数据
    getclassroom() {
      let _this = this;
      requestLogin("/setGoodsType", {}, "get")
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
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    getCurrentRow(val) {},
    //编辑储物柜
    editpriority() {
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    //添加教室
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              name: this.ruleForm.classname,
              status: this.ruleForm.status,
            };
            requestLogin("/setGoodsType", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.reload();
                this.resetForm(formName);
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
    //编辑储物柜
    submitForm2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              name: this.currentSelectRow.name,
              status:radioDict[this.currentSelectRow.status],
            };
            requestLogin("/setGoodsType/"+this.currentSelectRow.id, loginParams, "put")
              .then(data => {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.reload();
                this.radio = false;
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
    cahngesen(val) {
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
    //删除分类
    deleteclassify() {
      let _this = this;
      if (!_this.currentSelectRow) {
        this.$message({ message: "请先选择数据!", type: "warning" });
        return;
      }
      this.$confirm("确认删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        requestLogin("/setGoodsType/"+_this.currentSelectRow.id, {}, "delete")
          .then(response => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            _this.reload();
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
    },
    //启用禁用
    Enabledisabled() {
      let _this = this;
     this.$confirm("确认更改该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        requestLogin("/updateStatus/"+_this.currentSelectRow.id, {}, "get")
          .then(response => {
            this.$message({
              message: "变更成功",
              type: "success"
            });
            _this.reload();
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
        width: 15%;
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
        width: 15%;
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
        .add-p {
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