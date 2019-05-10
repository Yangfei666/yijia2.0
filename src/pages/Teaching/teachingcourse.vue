<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>教培管理</el-breadcrumb-item>
              <el-breadcrumb-item>教培课程</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">教培课程</span>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <!--教培课程-->
    <div class="practice-list">
      <div class="practice-center">
        <el-row>
          <el-col :span="24">
            <div class="purple">
              <div class="add">
                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加教培</el-button>
                <template>
                  <el-dialog title="添加教培" :append-to-body="true" :visible.sync="dialogFormVisible">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="教培主题:" prop="theme" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model.trim="ruleForm.theme" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="教培内容:" prop="content" :label-width="formLabelWidth">
                        <el-col :span="22">
                         <el-input v-model.trim="ruleForm.content" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="教培日期:" prop="startDay" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-date-picker v-model="ruleForm.startDay" :clearable="false"  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:49%" placeholder="开始日期"></el-date-picker>
                          <el-date-picker v-model="ruleForm.endDay" :clearable="false"  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:49%" placeholder="结束日期"></el-date-picker>
                        </el-col>
                      </el-form-item>
                      <el-form-item class="dialog-footer">
                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                          <el-button @click="dialogFormVisible = false">取消</el-button>
                          <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </template>
                 <template>
                  <el-dialog title="编辑教培" :append-to-body="true" :visible.sync="dialogFormVisible2">
                    <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
                        <el-form-item label="教培主题:" prop="theme" :label-width="formLabelWidth">
                        <el-col :span="22">
                            <el-input v-model.trim="currentSelectRow.theme" placeholder="请输入"></el-input>
                        </el-col>
                        </el-form-item>
                        <el-form-item label="教培内容:" prop="content" :label-width="formLabelWidth">
                        <el-col :span="22">
                           <el-input v-model.trim="currentSelectRow.content" placeholder="请输入"></el-input>
                        </el-col>
                        </el-form-item>
                        <el-form-item label="教培日期:" prop="startDay" :label-width="formLabelWidth">
                        <el-col :span="22">
                             <el-date-picker v-model="currentSelectRow.startDay" :clearable="false"  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:49%" placeholder="开始日期"></el-date-picker>
                             <el-date-picker v-model="currentSelectRow.endDay" :clearable="false"  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:49%" placeholder="结束日期"></el-date-picker>
                        </el-col>
                        </el-form-item>
                        <el-form-item class="dialog-footer">
                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                            <el-button type="primary" @click="editForm('currentSelectRow')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
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
            <el-table ref="singleTable" tooltip-effect="dark"  @current-change="handleCurrentChange2"  element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick" >
              <el-table-column prop="theme" align="center" label="主题"></el-table-column>
              <el-table-column prop="startDay" align="center" label="开始日期"></el-table-column>
              <el-table-column prop="endDay" align="center" label="结束日期"></el-table-column>
              <el-table-column prop="content" align="center" label="内容"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="medium" @click="changeInfo2(scope.$index, scope.row)">详情</el-button>
                  <el-button type="text" size="medium" @click="dialogFormVisible2 = true">编辑</el-button>
                  <el-button type="text" size="medium" @click="delexper(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"  :total="tableData.length" ></el-pagination>
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
import moment from "moment";
export default {
  name: "teachingcourse",
  inject: ["reload"],
  data() {
    return {
      currentPage: 1,
      formLabelWidth: "130px",
      currentSelectRow: {},
      dialogFormVisible:false,
      dialogFormVisible2:false,
      pagesize: 10,
      tableData: [],
      ruleForm: {
        theme: "",
        content: "",
        startDay: "",
        endDay: "",
      },
      rules: {
        theme: [
          { required: true, message: "请输入教培主题", trigger: "blur" }
        ],
        content: [{ required: true, message: "请输入教培内容", trigger: "blur" }],
        startDay: [
          { required: true, message: "请选择教培开始时间", trigger: "change" }
        ],
        endDay: [
          { required: true, message: "请选择教培结束时间", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.gettabledata();
  },
  methods: {
    //表格数据
    gettabledata() {
      let _this = this;
      requestLogin("/teachInfo", {}, "get")
        .then(res => {
          _this.tableData = res;
        })
        .catch(error => {
          let { response: { data: { errorCode, msg }}} = error;
          if (errorCode != 0) {
            this.$message({
              message: msg,
              type: "error"
            });
            return;
          }
        });
    },
    //添加教培
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              theme: this.ruleForm.theme, //教培主题
              content: this.ruleForm.content, //教培内容
              startDay: this.ruleForm.startDay, //开始时间
              endDay: this.ruleForm.endDay, //结束时间
            };
            requestLogin("/teachInfo", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible = false;
                this.ruleForm.theme = "";
                this.ruleForm.content = "";
                this.ruleForm.startDay = "";
                this.ruleForm.endDay = "";
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
    //修改教培
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              theme: this.currentSelectRow.theme, //教培主题
              content: this.currentSelectRow.content, //教培内容
              startDay: this.currentSelectRow.startDay, //开始时间
              endDay: this.currentSelectRow.endDay, //结束时间
            };
            requestLogin("/teachInfo/"+this.currentSelectRow.id, loginParams, "put")
              .then(data => {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible2 = false;
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
    //删除教培
    delexper(index, row) {
      this.currentSelectRow = row;
      this.$confirm("确认删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        requestLogin(
          "/teachInfo/" + this.currentSelectRow.id,
          {},
          "delete"
        )
          .then(response => {
            this.$message({ message: "删除成功", type: "success" });
            this.reload();
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
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    rowClick(row, event, column) {
      this.currentSelectRow = row;
    },
    changeInfo2(index, row) {
      this.currentSelectRow = row;
      this.$router.push({
        path: "/Teaching/teachingcourse/classprogress",
        query: {
          id: this.currentSelectRow.id,
          shibie:'shibie'
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
  display: inline-block;
  .practice-center {
    height: 80px;
    margin-top: -10px;
    .purple {
      height: 80px;
      display: flex;
      justify-content: flex-start;
      .add {
        border: 1px solid #00bc71;
        width: 13%;
        height: 35px;
        border-radius: 4px;
        line-height: 0px;
        margin-top: 25px;
        margin-left: 13px;
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
        height: 35px;
        margin-top: 20px;
        margin-right: 27px;
        margin-left: 10px;
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