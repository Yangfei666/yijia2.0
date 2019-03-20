<template>
  <div>
      <!--班次设置-->
    <div class="practice-list">
      <div class="practice-center">
        <el-row>
          <el-col :span="24">
            <div class="purple">
              <div class="add">
                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加班次</el-button>
                <template>
                  <el-dialog title="添加班次" :append-to-body="true" :visible.sync="dialogFormVisible">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="班次名称:" prop="name" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="所属岗位:" prop="classes" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-model="ruleForm.classes" placeholder="请选择" style="width:100%" @change="Selectchange2">
                            <el-option v-for="item in classify" :key="item.id" :label="item.name" :value="item.id"></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="班次时间:" prop="timeframestart" :label-width="formLabelWidth">
                        <el-col :span="22">
                           <el-time-picker  v-model="ruleForm.timeframestart" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
                           <el-time-picker  v-model="ruleForm.timeframeend" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
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
                <el-button type="text" class="p" @click="editlunbo">编辑班次</el-button>
                <template>
                  <el-dialog title="编辑班次" :append-to-body="true" :visible.sync="dialogFormVisible2">
                    <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
                        <el-form-item label="班次名称:" prop="name" :label-width="formLabelWidth">
                        <el-col :span="22">
                            <el-input v-model="currentSelectRow.name" placeholder="请输入"></el-input>
                        </el-col>
                        </el-form-item>
                        <el-form-item label="所属岗位:" prop="classes" :label-width="formLabelWidth">
                        <el-col :span="22">
                            <el-select v-model="currentSelectRow.type" placeholder="请选择" style="width:100%" @change="Selectchange3">
                            <el-option v-for="item in classify" :key="item.id" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-col>
                        </el-form-item>
                        <el-form-item label="班次时间:" prop="timeframestart" :label-width="formLabelWidth">
                        <el-col :span="22">
                            <el-time-picker  v-model="currentSelectRow.startTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
                            <el-time-picker  v-model="currentSelectRow.endTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
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
              <div class="add2">
                <el-button type="text" class="p" @click="delexper">删除班次</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table ref="singleTable" @current-change="handleCurrentChange2" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
              <el-table-column align="left" fixed label="" width="50"></el-table-column>
              <el-table-column prop="name" align="left" label="班次"></el-table-column>
              <el-table-column prop="type" align="left" label="所属岗位"></el-table-column>
              <el-table-column prop="startTime" align="left" label="上班时间"></el-table-column>
              <el-table-column prop="endTime" align="left" label="下班时间"></el-table-column>
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
  name: "shiftsetup",
  inject: ["reload"],
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
        timeframestart: "",
        timeframeend: "",
      },
      rules: {
        classes: [
          { required: true, message: "请选择所属岗位", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入班次名称", trigger: "blur" }],
        timeframestart: [
          { required: true, message: "请选择开始时间", trigger: "change" }
        ],
        timeframeend: [
          { required: true, message: "请选择结束时间", trigger: "change" }
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
    //所属岗位下拉框
    Rotationselect() {
      let _this = this;
      requestLogin("/RoleAuthorityManagement", {}, "get")
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
    //班次表格数据
    gettabledata() {
      let _this = this;
      requestLogin("/shift", {}, "get")
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
    //添加班次
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              name: this.ruleForm.name, //班次名称
              type: this.name, //所属岗位
              startTime: this.ruleForm.timeframestart, //开始时间
              endTime: this.ruleForm.timeframeend, //结束时间
            };
            requestLogin("/shift", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.gettabledata();
                this.dialogFormVisible = false;
                this.ruleForm.name = "";
                this.ruleForm.classes = "";
                this.ruleForm.timeframestart = "";
                this.ruleForm.timeframeend = "";
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
    //编辑轮播图
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              name: this.currentSelectRow.name, //班次名称
              type: this.currentSelectRow.type, //所属岗位
              startTime: this.currentSelectRow.startTime, //开始时间
              endTime: this.currentSelectRow.endTime, //结束时间
            };
            let temp  = this.currentSelectRow.type
           requestLogin(
              "/shift/" + this.currentSelectRow.id,
              loginParams,
              "put"
            )
              .then(data => {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.dialogFormVisible2 = false;
                 for (var i = 0; i < this.tableData.length; i++) {
                  if (this.tableData[i].id == this.currentSelectRow.id) {
                    this.tableData[i].name = this.currentSelectRow.name; //班次名称
                    this.tableData[i].type = temp; //所属岗位
                    this.tableData[i].startTime = this.currentSelectRow.startTime; //开始时间
                    this.tableData[i].endTime = this.currentSelectRow.endTime; //结束时间
                  }
                }
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
    //删除班次
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
          "/shift/" + _this.currentSelectRow.id,
          {},
          "delete"
        )
          .then(response => {
            this.$message({ message: "删除成功", type: "success" });
            _this.gettabledata();
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
    Selectchange3(val) {
      this.classify.map((item, index) => {
        if (val == item.id) {
          this.name = item.name;
        }
      });
    },
    Selectchange2(val) {
      let obj = {};
      obj = this.classify.find(item => {
        return item.id === val;
      });
      this.name = obj.name;
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
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
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