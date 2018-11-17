<template>
  <!--会所人员架构-->
  <div>
    <div class="practice-table2">
      <el-col :span="24">
        <div class="add">
          <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">创建大队</el-button>
          <template>
            <el-dialog title="创建大队" :append-to-body="true" :visible.sync="dialogFormVisible">
              <!--创建大队-->
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="大队名称:" prop="bigname" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-input v-model="ruleForm.bigname" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item class="dialog-footer">
                  <el-col :span="24" style="display: flex;justify-content: flex-end;">
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')"
                               style="background-color: #00BC71;border-color: #00BC71;">确定
                    </el-button>
                  </el-col>
                </el-form-item>
              </el-form>
            </el-dialog>
          </template>
        </div>
        <div class="add2">
          <el-button type="text" class="p" @click="open2">删除大队</el-button>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="handback">
          <el-table :data="tableData" ref="singleTable" @current-change="handleCurrentChange2" :show-header="false"
                    style="width: 100%" highlight-current-row @row-click="rowClick">
            <el-table-column align="center" prop="radio" fixed width="50px">
              <template slot-scope="scope">
                <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.$index)">&nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="tag">
              <template slot-scope="scope">
                <span>{{scope.row.Brigade}}</span>
                <el-tag :key="tag.index" v-for="tag in scope.row.club_info_group" closable :disable-transitions="false"
                        @close="handleClose(scope.$index, tag)" style="margin-left:20px;">
                  {{tag.group}}
                </el-tag>
                <el-input class="input-new-tag" v-if="scope.$index === selectInputIndex" v-model="inputValue"
                          ref="saveTagInput" size="small" :autofocus="true"
                          @keyup.enter.native="handleInputConfirm(scope.$index)"
                          @blur="handleInputConfirm(scope.$index)"
                          style="width:87px;height:35px;">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.$index,scope.row)">+添加新组
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
  import {requestLogin} from "@/api/api";

  export default {
    name: "personnelstructure",
    inject: ["reload"],
    data() {
      return {
        formLabelWidth: "130px",
        dialogFormVisible: false,
        radio: true,
        club_info_group: [],
        inputVisible: false,
        loading: false,
        inputValue: "",
        ruleForm: {
          bigname: "" //大队名称
        },
        rules: {
          bigname: [
            {required: true, message: "请输入大队名称", trigger: "blur"}
          ]
        },
        tableData: [],
        selectInputIndex: -1,//小组下标
        rowIndex: -1,//大队下标
      };
    },
    created: function () {
      this.getClubGroup();
    },
    methods: {
      //获取大队小组数据
      getClubGroup() {
        let _this = this;
        requestLogin("/setClubInfo/create", {}, "get")
          .then(function (res) {
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
      //删除小组
      handleClose(index, tag) {
        let _this = this;
        let subIndex = _this.tableData[index].club_info_group.findIndex(item => item.id === tag.id);
        this.$confirm("确认删除该小组吗？", "提示")
          .then(() => {
            requestLogin(`/setClubInfo/${tag.id}`, {id: tag.id}, "get")
              .then(response => {
                _this.$message({
                  message: "删除成功",
                  type: "success"
                });
              })
              .then(() => {
                _this.tableData[index].club_info_group.splice(subIndex, 1);
              })
              .catch(error => {
                _this.$message({
                  message: "删除失败",
                  type: "error"
                });
              });
          })
          .catch(error => {
            this.$message({
              message: "取消删除",
              type: "error"
            });
          });
      },
      //添加小组
      showInput(index, row) {
        this.selectInputIndex = index;
      },
      handleInputConfirm(index) {
        this.selectInputIndex = -1;
        let inputValue = this.inputValue;
        if (inputValue) {
          let title = inputValue;
          let id = this.currentSelectRow.id;
          let params = {title, id,};
          let _this = this;
          requestLogin(`/addGroup`, params, "post")
            .then(data => {
              _this.$message({
                message: "添加小组成功",
                type: "success"
              });
            })
            .then(() => {
              _this.tableData[index].club_info_group.push(data);
            })
            .catch(error => {
              let {response: {data: {errorCode, msg}}} = error;
              if (errorCode != 0) {
                _this.$message({
                  message: msg,
                  type: "error"
                });
                return;
              }
            });
        }
        this.inputValue = "";
      },
      //添加大队
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示").then(() => {
              var loginParams = {
                title: this.ruleForm.bigname //大队名称
              };
              requestLogin("/addBrigade", loginParams, "post")
                .then(data => {
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.dialogFormVisible = false;
                  return data;
                })
                .then((data) => {
                  data.club_info_group = [];
                  _this.tableData.push(data);
                })
                .catch(error => {
                  let {response: {data: {errorCode, msg}}} = error;
                  if (errorCode != 0) {
                    this.$message({
                      message: msg,
                      type: "error"
                    });
                    return;
                  }
                })
                .finally(() => {
                  _this.ruleForm.bigname = '';
                });
            });
          } else {
            this.$message({message: "提交失败!", type: "error"});
            return false;
          }
        });
      },
      rowClick(row, event, column) {
        this.radio = row.index;
        //获取表格数据
        this.currentSelectRow = row;
        this.radio = this.tableData.indexOf(row);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      radiochange(row) {
        console.log(`当前: ${row}`);
      },
      handleCurrentChange2(val, index) {
        this.currentRow = val;
        if (val.pkg) {
          console.log(222);
          // this.$emit("data", val.pkg);
        }
      },
      getCurrentRow(val) {
        console.log(val);
      },
      //删除大队
      open2() {
        let _this = this;
        let index = _this.tableData.findIndex(item => item.id === _this.currentSelectRow.id);
        _this.rowIndex = index === -1 ? _this.rowIndex : index;
        if (!this.currentSelectRow) {
          this.$message({message: "请先选择数据!", type: "warning"});
          return;
        } else {
          this.$confirm("确认删除该条记录吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              _this.loading = true;
              requestLogin(
                "/setClubInfo/" + _this.tableData[_this.rowIndex].id,
                {},
                "delete"
              ).then(response => {
                _this.loading = false;
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
              })
                .then(() => {
                  _this.tableData.splice(_this.rowIndex, 1);
                })
                .catch(error => {
                  let {response: {data: {errorCode, msg}}} = error;
                  if (errorCode != 0) {
                    this.$message({
                      message: msg,
                      type: "error"
                    });
                    return;
                  }
                });
            })
            .catch(error => {
              this.$message({
                message: '取消删除',
                type: "error"
              });
            });
        }
      }
    }
  };
</script>
<style lang="scss">
  @import "../styles/dialog.scss";
</style>
<style lang="scss" scoped>
  @import "@/styles/personnelstructure.scss";

  .practice-table2 {
    .add {
      border: 1px solid #00bc71;
      width: 120px;
      height: 32px;
      border-radius: 4px;
      line-height: 0px;
      margin-top: 10px;
      margin-left: 30px;
      float: left;
      .p {
        color: #00bc71;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        line-height: 6px;
      }
    }
    .add2 {
      border: 1px solid #ff2366;
      width: 120px;
      height: 32px;
      border-radius: 4px;
      line-height: 0px;
      margin-top: 10px;
      margin-left: 20px;
      float: left;
      .p {
        color: #ff2366;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        line-height: 6px;
      }
    }
    .handback {
      height: 100%;
      width: 95%;
      margin: 20px auto;
      display: inline-block;
    }
  }
</style>
