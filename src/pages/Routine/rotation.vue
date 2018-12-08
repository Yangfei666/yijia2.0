<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>小程序管理</el-breadcrumb-item>
              <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">轮播图管理</span>
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
                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加轮播图</el-button>
                <template>
                  <el-dialog title="添加轮播图" :append-to-body="true" :visible.sync="dialogFormVisible">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="分类:" prop="classify" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-model="ruleForm.classify" placeholder="请选择" style="width:100%" @change="Selectchange2">
                            <el-option v-for="item in classify" :key="item.id" :label="item.name" :value="item.id"></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="标题:" prop="title" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model="ruleForm.title" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="时间范围:" prop="timeframe" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-date-picker v-model="ruleForm.timeframe" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%">
                          </el-date-picker>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-radio-group v-model="ruleForm.status">
                            <el-radio :label="2">启用</el-radio>
                            <el-radio :label="1">禁用</el-radio>
                          </el-radio-group>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="描述:" prop="desc" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input type="textarea" v-model="ruleForm.desc" placeholder="汉字、字母、数字和下划线及逗号句号, 长度50以内" style="width:100%"></el-input>
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
                <el-button type="text" class="p" @click="editlunbo">编辑轮播图</el-button>
                <template>
                  <el-dialog title="编辑轮播图" :append-to-body="true" :visible.sync="dialogFormVisible2">
                    <Editlunbo :currentSelectRow="currentSelectRow"></Editlunbo>
                  </el-dialog>
                </template>
              </div>
              <div class="add">
                <el-button type="text" class="p" @click="changeInfo2">图片管理</el-button>
              </div>
              <div class="add2">
                <el-button type="text" class="p" @click="delexper">删除轮播图</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table ref="singleTable" @current-change="handleCurrentChange2" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
              <el-table-column align="left" label="" fixed width="10px"></el-table-column>
              <el-table-column prop="banTitle" align="left" fixed label="标题"></el-table-column>
              <el-table-column prop="banDes" align="left" label="描述"></el-table-column>
              <el-table-column prop="banState" align="left" label="分类"></el-table-column>
              <el-table-column prop="banStart" align="left" label="发布时间"></el-table-column>
              <el-table-column prop="banEnd" align="left" label="结束时间"></el-table-column>
              <el-table-column prop="banStatus" align="left" label="状态"></el-table-column>
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
  name: "rotation",
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
        classify: "",
        title: "",
        desc: "",
        timeframe: "",
        status: ""
      },
      rules: {
        classify: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        desc: [{ required: true, message: "请输入描述", trigger: "blur" }],
        timeframe: [
          { required: true, message: "请选择时间范围", trigger: "change" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }]
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
      })
        .then(() => {
          requestLogin(
            "/setBannerInfo/" + _this.currentSelectRow.id,
            {},
            "delete"
          ).then(response => {
            this.$message({ message: "删除成功", type: "success" });
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
      this.$router.push({
        path: "/Routine/rotation/lunbomanage",
        query: {
          id: this.currentSelectRow.id
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
@import "@/styles/rotation.scss";
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
  display: inline-block;
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