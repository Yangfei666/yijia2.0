<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="practice-main">
                    <el-col :span="23" class="breadcrumb">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>会所管理</el-breadcrumb-item>
                            <el-breadcrumb-item>储物柜</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="23" class="weber">
                        <span class="weber-span">储物柜</span>
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
                                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加储物柜</el-button>
                                <template>
                                    <el-dialog title="添加储物柜" :append-to-body="true" :visible.sync="dialogFormVisible">
                                        <!--添加储物柜-->
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                                            <el-form-item label="储物柜编号:" prop="priorityid" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model="ruleForm.priorityid" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="优先级:" prop="priority" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-radio-group v-model="ruleForm.priority" @change="cahngesen">
                                                        <el-radio :label="1">优先使用</el-radio>
                                                        <el-radio :label="2">一般</el-radio>
                                                        <el-radio :label="3">最后</el-radio>
                                                        <el-radio :label="4">VIP专用柜</el-radio>
                                                    </el-radio-group>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="VIP姓名:" prop="priorityname" :label-width="formLabelWidth" v-show="ruleForm.priority == 4">
                                                <el-col :span="22">
                                                    <el-input v-model="ruleForm.priorityname" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-radio-group v-model="ruleForm.sex" @change="cahngesen">
                                                        <el-radio :label="1">女</el-radio>
                                                        <el-radio :label="2">男</el-radio>
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
                                <el-button type="text" class="p" @click="editpriority()">编辑储物柜</el-button>
                                <template>
                                    <el-dialog title="编辑储物柜" :append-to-body="true" :visible.sync="dialogFormVisible2">
                                        <!--编辑储物柜-->
                                        <el-form :model="ruleForm2" ref="ruleForm2" label-width="100px">
                                            <el-form-item label="储物柜编号:" prop="name" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model="currentSelectRow.name" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="优先级:" prop="priority" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-radio-group v-model="currentSelectRow.priority" @change="cahngesen">
                                                        <el-radio label="优先使用" value="1"></el-radio>
                                                        <el-radio label="一般" value="2"></el-radio>
                                                        <el-radio label="最后" value="3"></el-radio>
                                                        <el-radio label="vip专用" value="4"></el-radio>
                                                    </el-radio-group>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="VIP姓名:" prop="vipName" :label-width="formLabelWidth" v-show="currentSelectRow.priority == 'vip专用'">
                                                <el-col :span="22">
                                                    <el-input v-model="currentSelectRow.vipName" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-radio-group v-model="currentSelectRow.sex" @change="cahngesen">
                                                        <el-radio label="女" value="1"></el-radio>
                                                        <el-radio label="男" value="2"></el-radio>
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
                            <el-table-column prop="name" align="left" label="储物柜编号"></el-table-column>
                            <el-table-column prop="priority" align="left" label="优先级"></el-table-column>
                            <el-table-column prop="vipName" align="left" label="VIP姓名">
                              <template slot-scope="scope">
                                <span v-show="scope.row.priority == 'vip专用'">{{scope.row.vipName}}</span>
                              </template>
                            </el-table-column>
                            <el-table-column prop="sex" align="left" label="性别"></el-table-column>
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
const radioDict = {
  "优先使用": 1,
  "一般": 2,
  "最后": 3,
  "vip专用":4
}
export default {
  inject: ["reload"],
  name: "classroomsetting",
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
        priorityid: "",
        priority: "",
        priorityname:"",
        sex:""
      },
      ruleForm2: {
        name: "",
        priority:"",
        vipName:"",
        sex:""
      },
      rules: {
        priorityid: validate.priorityid,
        priority: validate.priority,
        priorityname:{ required: true, message: '请输入vip姓名', trigger: 'blur' },
        sex:{ required: true, message: '请选择性别', trigger: 'change' },
      },
      tableData: []
    };
  },
  created: function() {
    this.getclassroom();
    this.ruleForm2.name = this.currentSelectRow.name;
    this.ruleForm2.priority = this.currentSelectRow.priority;
    this.ruleForm2.vipName = this.currentSelectRow.vipName;
    this.ruleForm2.sex = this.currentSelectRow.sex;
  },
  methods: {
    //获取储物柜数据
    getclassroom() {
      let _this = this;
      requestLogin("/setLocker", {}, "get")
        .then(function(res) {
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
              name: this.ruleForm.priorityid,
              priority: this.ruleForm.priority,
              vipName:this.ruleForm.priorityname,
              sex:this.ruleForm.sex,
            };
            requestLogin("/setLocker", loginParams, "post")
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
    //编辑储物柜
    submitForm2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              name: this.currentSelectRow.name,
              priority:radioDict[this.currentSelectRow.priority],
              vipName:this.currentSelectRow.vipName,
              sex:this.currentSelectRow.sex == '女' ? 1 : 2,
            };
            requestLogin("/editLocker", loginParams, "put")
              .then(data => {
                this.$message({
                  message: "修改成功",
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
    //删除教室
    delexper() {
      let _this = this;
      this.$confirm("确认删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let loginParams = {
          name: _this.currentSelectRow.name
        };
        requestLogin("/remLocker", loginParams, "delete")
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