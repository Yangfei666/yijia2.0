<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>会所管理</el-breadcrumb-item>
              <el-breadcrumb-item>员工管理</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">员工管理</span>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <div class="practice-list">
      <div class="practice-center">
        <el-row>
          <el-col :span="12">
            <div class="purple">
              <div class="add">
                <el-button type="text" class="add-p el-icon-plus" @click="dialogFormVisible = true">添加新员工</el-button>
                <template>
                  <el-dialog title="添加新员工" :append-to-body="true" :visible.sync="dialogFormVisible">
                    <!--添加新员工-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-radio-group v-model="ruleForm.sex">
                            <el-radio :label="1">女</el-radio>
                            <el-radio :label="2">男</el-radio>
                          </el-radio-group>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="电话:" prop="phone" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model="ruleForm.phone" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="身份证号:" prop="idnumber" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model="ruleForm.idnumber" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="分配角色:" prop="role" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-checkbox-group v-model="ruleForm.role" @change="handleCheckChange">
                            <el-checkbox v-for="i in role" :label="i.id" :key="i.id">{{i.name}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="所属大队:" prop="big" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-model="ruleForm.big" placeholder="请选择" style="width:100%" @change="bigsVal">
                            <el-option v-for="item in brigades" :key="item.id" :label="item.Brigade" :value="item.id"></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="所属小组:" prop="small" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-model="ruleForm.small" placeholder="请选择" style="width:100%" @change="xiaozu">
                            <el-option v-for="item in groups" :key="item.id" :label="item.group" :value="item.group"></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="员工简介:" prop="desc" :label-width="formLabelWidth">
                        <el-col :span="22" class="from-date">
                          <el-input type="textarea" v-model="ruleForm.desc" maxlength="666" @input="descInput" style="min-height:96px;width:690px;height:69px"></el-input>
                          <span class="textarea">还可以输入{{remnant}}字</span>
                        </el-col>
                      </el-form-item>
                      <el-form-item class="dialog-footer">
                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                          <el-button @click="resetForm('ruleForm')">重置</el-button>
                          <el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </template>
              </div>
              <div class="add">
                <el-button type="text" class="p" @click="changeInfo">编辑员工信息</el-button>
                <template>
                  <el-dialog title="编辑员工信息" :append-to-body="true" :visible.sync="dialogFormVisible2">
                    <Editstaff :currentSelectRow="currentSelectRow"></Editstaff>
                  </el-dialog>
                </template>
              </div>
              <div class="add">
                <el-button type="text" class="p" @click.prevent="delstaff">员工离职</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="purple2">
              <el-col :span="24" class="search">
                <input class="search-input" maxlength="18" placeholder="搜索姓名/电话/卡号" />
                <i class="search-icon el-icon-search"></i>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table v-loading="loading" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
              <el-table-column align="center" prop="radio" fixed width="70px">
                <template slot-scope="scope">
                  <el-radio-group v-model="radio">
                    <el-radio :label="scope.$index" @change.native="radiochange(scope.row)">&nbsp;</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column prop="YGXX_NAME" align="left" label="员工姓名" fixed width="180px"></el-table-column>
              <el-table-column prop="YGXX_HOMETEL" align="left" label="手机号" width="180px"></el-table-column>
              <el-table-column prop="ygIdentity" align="left" label="身份证" width="180px"></el-table-column>
              <el-table-column prop="YGXX_SEX" align="left" label="性别" width="160px"></el-table-column>
              <el-table-column prop="YGXX_STATE" align="left" label="状态" width="160px"></el-table-column>
              <el-table-column prop="role.name" align="left" label="角色" width="160px"></el-table-column>
              <el-table-column prop="ygIntro" align="left" label="简介" width="180px"></el-table-column>
              <el-table-column prop="ygAddTime" align="left" label="添加时间" width="230px" fixed="right"></el-table-column>
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
import Editstaff from "@/components/editstaff";
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
export default {
  name: "staff",
  inject:['reload'],
  components: {
    Editstaff
  },
  data() {
    return {
      bigsvalue:'',
      addLoading: false,
      loading: true,
      remnant: 666,
      dialogFormVisible: false,
      formLabelWidth: "130px",
      sex: 1,
      disabled: false,
      limitdate: [],
      currentSelectRow: "",
      dialogFormVisible2: false,
      currentPage: 1,
      pagesize: 10,
      radio: true,
      form: {
        name: ""
      },
      ruleForm: {
        name: "", //姓名
        sex: "", //性别
        phone: "", //电话
        idnumber: "", //身份证号
        role: [], //分配角色
        big: "", //所属大队
        small: "", //所属小组
        desc: "" //员工简介
      },
      rules: {
        name: validate.name,
        sex: validate.sex,
        phone: validate.phone,
        idnumber: validate.idnumber,
        role: validate.role
      },
      tableData: [],
      role: [],
      brigades: [],
      groups: []
    };
  },
  mounted: function() {
    //表格列表数据
    let _this = this;
    _this.loading = true;
    requestLogin("/setStaffInfo", {}, "get")
      .then(function(res) {
        _this.tableData = res;
        _this.loading = false;
        this.rolegourp();
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
  methods: {
    //添加员工角色大队
    rolegourp() {
      let _this = this;
      _this.loading = true;
      requestLogin("/setStaffInfo/create", {}, "get")
        .then(function(res) {
          _this.loading = false;
          let { role, brigades} = res;
          _this.role = role;
          _this.brigades = brigades;
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
    bigsVal(id){
     this.brigades.map((item,index) => {
        if (item.id === id) {
          this.groups = item.club_info_group;
        }
     })
    },
    handleCheckChange(val){
       console.log(this.ruleForm.role);
    },
    radiochange(row) {
      this.radio = row;
      console.log(`当前: ${row}`);
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
    xiaozu(val){
      console.log(val);
    },
    rowClick(row, event, column) {
      this.radio = row.index;
      //获取表格数据
      this.currentSelectRow = row;
      console.log(row.index);
    },
    //添加员工
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            var loginParams = {
              YGXX_NAME: this.ruleForm.name, //姓名
              YGXX_SEX: this.ruleForm.sex, //性别
              YGXX_HOMETEL: this.ruleForm.phone, //电话
              ygIntro: this.ruleForm.desc, //简介
              ygIdentity: this.ruleForm.idnumber, //身份证
              Brigade: this.ruleForm.big, //大队
              group: this.ruleForm.small, //小组
              role: this.ruleForm.role //分配角色
            };
            requestLogin("/setStaffInfo", loginParams, "post")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible = false;
              })
               .catch(error => {
                this.addLoading = false;
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
         this.$message({ message: "提交失败!", type: "error" });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    descInput() {
      var txtVal = this.ruleForm.desc.length;
      this.remnant = 666 - txtVal;
    },
    changeInfo() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    //员工离职
    delstaff() {
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
          console.log(_this.currentSelectRow.YGXX_YGID_NEI);
          requestLogin(
            "/setStaffInfo/" + _this.currentSelectRow.YGXX_YGID_NEI,
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
        .catch(error => {
          this.addLoading = false;
          let { response: { data: { errorCode, msg } } } = error;
          if (errorCode != 0) {
            this.$message({
              message: msg,
              type: "error"
            });
            return;
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
@import "@/styles/staff.scss";
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
      justify-content: flex-end;
      .search {
        width: 35%;
        border: 1px solid #e8e8e8;
        height: 32px;
        display: flex;
        border-radius: 16px;
        margin-top: 20px;
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