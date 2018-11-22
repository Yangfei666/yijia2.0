<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="practice-main">
                    <el-col :span="23" class="breadcrumb">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>会所管理</el-breadcrumb-item>
                            <el-breadcrumb-item>教室设置</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="23" class="weber">
                        <span class="weber-span">教室设置</span>
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
                                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加教室</el-button>
                                <template>
                                    <el-dialog title="添加教室" :append-to-body="true" :visible.sync="dialogFormVisible">
                                        <!--添加教室-->
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                                            <el-form-item label="教室名称:" prop="classroom" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model="ruleForm.classroom" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="教室类型:" prop="sign" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-select v-model="ruleForm.sign" placeholder="请选择" style="width:100%">
                                                        <el-option v-for="item in sign" :key="item.value" :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>
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
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="practice-table">
                <el-row>
                    <el-col :span="24">
                        <el-table v-loading="loading" ref="singleTable" @current-change="handleCurrentChange2" element-loading-text="拼命加载中..." fixed highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
                            <el-table-column align="center" prop="radio" fixed width="70px">
                                <template slot-scope="scope">
                                    <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" align="left" label="教室名称" width="350px"></el-table-column>
                            <el-table-column prop="sign" align="left" label="教室类型" width="350px"></el-table-column>
                            <el-table-column align="left" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="danger" plain size="small" @click="delexper">删除</el-button>
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
export default {
  inject: ["reload"],
  name: "classroomsetting",
  data() {
    return {
      formLabelWidth: "130px",
      currentSelectRow: "",
      loading: true,
      radio: true,
      dialogFormVisible: false,
      currentPage: 1,
      pagesize: 10,
      ruleForm: {
        classroom: "",
        sign:''
      },
      rules: {
        classroom: validate.classroom,
        sign:validate.sign
      },
      tableData: [],
       sign: [{
          value: '1',
          label: '团课教室'
        }, {
          value: '2',
          label: '私教教室'
        }],
    };
  },
  created: function() {
    this.getclassroom();
  },
  methods: {
    //获取教室数据
    getclassroom() {
      let _this = this;
      _this.loading = true;
      requestLogin("/setClassroom", {}, "get")
        .then(function(res) {
          _this.tableData = res;
          _this.loading = false;
        })
        .catch(error => {
          if (error.res) {
            this.$message({
              message: "获取数据失败",
              type: "error"
            });
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
    //添加教室
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            var loginParams = {
              name: this.ruleForm.classroom,
              sign: this.ruleForm.sign,
            };
            requestLogin("/setClassroom", loginParams, "post")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.reload();
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
    //删除教室
    delexper() {
      let _this = this;
      this.$confirm("确认删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.loading = true;
          requestLogin(
            "/setClassroom/" + _this.currentSelectRow.ID,
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
              message: "操作失败",
              type: "error"
            });
          }
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