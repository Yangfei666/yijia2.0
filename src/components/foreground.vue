<template>
  <div>
      <!--前台排班表-->
    <div class="practice-list">
      <div class="practice-center">
        <el-row>
          <el-col :span="24">
            <div class="purple">
              <div class="add">
                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加排班表</el-button>
                <template>
                  <el-dialog title="添加排班表" :append-to-body="true" :visible.sync="dialogFormVisible">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="日期:" prop="timeframe" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-date-picker v-model="ruleForm.timeframe" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%">
                          </el-date-picker>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="班次:" prop="classes" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-model="ruleForm.classes" placeholder="请选择" style="width:100%" @change="Selectchange2">
                            <el-option v-for="item in classify" :key="item.id" :label="item.name" :value="item.id"></el-option>
                          </el-select>
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
              </div>
              <div class="add">
                <el-button type="text" class="p" @click="editlunbo">编辑排班表</el-button>
                <template>
                  <el-dialog title="编辑排班表" :append-to-body="true" :visible.sync="dialogFormVisible2">
                    <Editlunbo :currentSelectRow="currentSelectRow"></Editlunbo>
                  </el-dialog>
                </template>
              </div>
              <div class="add">
                <el-button type="text" class="p" @click="changeInfo2">复制排班表</el-button>
              </div>
              <div class="add2">
                <el-button type="text" class="p" @click="delexper">删除排班表</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table ref="singleTable" border @current-change="handleCurrentChange2" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
              <el-table-column prop="banTitle" align="left" fixed label=" "></el-table-column>
              <el-table-column prop="banDes" align="left" label="周一"></el-table-column>
              <el-table-column prop="banState" align="left" label="周二"></el-table-column>
              <el-table-column prop="banStart" align="left" label="周三"></el-table-column>
              <el-table-column prop="banEnd" align="left" label="周四"></el-table-column>
              <el-table-column prop="banStatus" align="left" label="周五"></el-table-column>
              <el-table-column prop="banStatus" align="left" label="周六"></el-table-column>
              <el-table-column prop="banStatus" align="left" label="周日"></el-table-column>
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
import Editlunbo from "@/components/editlunbo";
export default {
  name: "foreground",
  inject: ["reload"],
  components: {
    Editlunbo
  },
  data() {
    return {
      formLabelWidth: "130px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      currentPage: 1,
      currentSelectRow: "",
      pagesize: 10,
      tableData: [],
      classify: [],
      ruleForm: {
        classes: "",
        name: "",
        timeframe: "",
      },
      rules: {
        classes: [
          { required: true, message: "请选择班次", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        timeframe: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.gettabledata();
    setTimeout(() => {
      this.Rotationselect();
    }, 1000);
  },
  methods: {
    //轮播图下拉框
    Rotationselect() {
      let _this = this;
      requestLogin("/setBannerInfo/create", {}, "get")
        .then(res => {
          _this.classify = res;
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
    //轮播图表格数据
    gettabledata() {
      let _this = this;
      requestLogin("/setBannerInfo", {}, "get")
        .then(res => {
          _this.tableData = res;
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
    //添加轮播图
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              banTitle: this.ruleForm.title, //标题
              banDes: this.ruleForm.desc, //描述
              banState: this.ruleForm.classify, //分类
              banStart: this.ruleForm.timeframe[0], //开始时间
              banStatus: this.ruleForm.status, //状态
              banEnd: this.ruleForm.timeframe[1] //结束时间
            };
            requestLogin("/setBannerInfo", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
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
        } else {
          return false;
        }
      });
    },
    //删除轮播图
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
      }).then(() => {
        requestLogin(
          "/setBannerInfo/" + _this.currentSelectRow.id,
          {},
          "delete"
        )
          .then(response => {
            this.$message({ message: "删除成功", type: "success" });
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
    editlunbo() {
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择列表!", type: "warning" });
      }
    },
    Selectchange2(val) {},
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
    //轮播图管理
    changeInfo2() {
      if (!this.currentSelectRow) {
        this.$message({
          message: "请先选择列表!",
          type: "warning"
        });
        return;
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
// @import "@/styles/foreground.scss";
.practice-list {
  width: 97%;
  height: 100%;
  margin: 0px auto;
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
        margin-top: 20px;
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
        border: 1px solid #ff2366;
        width: 13%;
        height: 35px;
        border-radius: 4px;
        line-height: 0px;
        margin-top: 20px;
        margin-left: 13px;
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