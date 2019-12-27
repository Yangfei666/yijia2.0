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
                          <el-input v-model.trim="ruleForm.name" placeholder="请输入"></el-input>
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
                          <el-input v-model.trim="ruleForm.phone" maxlength="11" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="身份证号:" prop="idnumber" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model.trim="ruleForm.idnumber" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="分配角色:" prop="selectRoleId" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-checkbox-group v-model="ruleForm.selectRoleId" @change="handleCheckChange">
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
                      <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-radio-group v-model="ruleForm.status">
                            <el-radio :label="1">全职</el-radio>
                            <el-radio :label="3">兼职</el-radio>
                          </el-radio-group>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="员工简介:" prop="desc" :label-width="formLabelWidth">
                        <el-col :span="22" class="from-date">
                          <el-input type="textarea" v-model.trim="ruleForm.desc" maxlength="50" @input="descInput" style="min-height:96px;width:100%;height:69px"></el-input>
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
                <div v-if="dialogFormVisible2">
                  <template>
                    <el-dialog title="编辑员工信息" :append-to-body="true" :visible.sync="dialogFormVisible2">
                      <Editstaff :currentSelectRow="currentSelectRow" @closeEdit="closeEdit"></Editstaff>
                    </el-dialog>
                  </template>
                </div>
              </div>
              <div class="add">
                <el-button type="text" class="p" @click="delstaff">员工离职</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="purple2">
              <el-col :span="24" class="search">
                <input class="search-input" maxlength="18" v-model="searchVal" placeholder="搜索姓名/电话" />
                <i class="search-icon el-icon-search" @click="search"></i>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table v-loading="loading" ref="singleTable" @current-change="handleCurrentChange2" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
              <el-table-column align="center" prop="radio" fixed width="50px">
                <template slot-scope="scope">
                  <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="YGXX_NAME" align="left" label="员工姓名" fixed width="140px"></el-table-column>
              <el-table-column prop="YGXX_HOMETEL" align="left" label="手机号" width="160px"></el-table-column>
              <el-table-column prop="YGXX_SEX" align="left" label="性别" width="100px"></el-table-column>
              <el-table-column prop="YGXX_STATE" align="left" label="状态" width="100px"></el-table-column>
              <el-table-column prop="strRole" align="left" label="角色" width="300px"></el-table-column>
              <el-table-column prop="ygAddTime" align="left" label="添加时间" width="200px"></el-table-column>
              <el-table-column prop="ygIdentity" align="left" label="身份证" width="180px"></el-table-column>
              <el-table-column prop="ygIntro" align="left" label="简介"></el-table-column>
              <!-- <el-table-column align="left" label="操作" fixed="right" width="110px">
                <template slot-scope="scope">
                  <el-button @click="dialogFormVisible3 = true" type="success" plain v-if="scope.row.strRole != null" :disabled="scope.row.strRole !=null ? scope.row.strRole.indexOf('会籍顾问') == -1 : false" size="small">客户转出
                  </el-button>
                  <el-button type="success" plain size="small" v-else disabled>客户转出</el-button>
                </template>
              </el-table-column> -->
            </el-table>
            <!-- <el-dialog title="转出客户到新会籍" :append-to-body="true" :visible.sync="dialogFormVisible3">
              <el-form :model="ruleForm2" ref="ruleForm2" label-width="100px">
                <el-form-item label="新会籍:" prop="adviser" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-select v-model="ruleForm2.adviser" placeholder="请选择" style="width:100%" @change="Selectchange2">
                      <el-option v-for="item in staff_info" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item class="dialog-footer">
                  <el-col :span="24" style="display: flex;justify-content: flex-end;">
                    <el-button type="primary" @click="submitForm2('ruleForm2')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                  </el-col>
                </el-form-item>
              </el-form>
            </el-dialog> -->
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
  inject: ["reload"],
  components: {
    Editstaff
  },
  data() {
    return {
      staff_info: [],
      bigsvalue: "",
      addLoading: false,
      loading: true,
      remnant: 50,
      dialogFormVisible: false,
      formLabelWidth: "130px",
      disabled: false,
      currentSelectRow: "",
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      currentPage: 1,
      pagesize: 10,
      radio: true,
      selectRoleId: [],
      form: {
        name: ""
      },
      ruleForm: {
        name: "", //姓名
        sex: "", //性别
        phone: "", //电话
        idnumber: "", //身份证号
        selectRoleId: [], //分配角色
        big: "", //所属大队
        small: "", //所属小组
        status: "", //状态
        desc: "" //员工简介
      },
      ruleForm2: {
        adviser: [] //新会籍
      },
      rules: {
        name: validate.name,
        sex: validate.sex,
        phone: validate.phone,
        status:validate.status,
        // idnumber: validate.idnumber,
        selectRoleId: validate.selectRoleId
      },
      tableData: [],
      tableData2: [],
      role: [],
      brigades: [],
      groups: [],
      searchVal: ""
    };
  },
  watch: {
    searchVal(val) {
      if (!val) {
        this.tableData = this.tableData2;
      }
    }
  },
  activated () {
    let _this = this;
    _this.loading = true;
    requestLogin("/setStaffInfo", {}, "get")
      .then(res => {
        _this.loading = false;
        _this.tableData = res;
        _this.tableData2 = res;
        _this.rolegourp();
        for (var i = 0; i < _this.tableData.length; i++) {
          _this.tableData[i].strRole = _this.transformRole(_this.tableData[i]);
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
    _this.gethuiji();
    this.dialogFormVisible = false;
    this.dialogFormVisible2 = false;
  },
  mounted: function() {
    //表格列表数据
    let _this = this;
    _this.loading = true;
    requestLogin("/setStaffInfo", {}, "get")
      .then(res => {
        _this.loading = false;
        _this.tableData = res;
        _this.tableData2 = res;
        _this.rolegourp();
        for (var i = 0; i < _this.tableData.length; i++) {
          _this.tableData[i].strRole = _this.transformRole(_this.tableData[i]);
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
    _this.gethuiji();
  },
  methods: {
    submitForm2() {
      this.$confirm("确认提交吗？", "提示").then(() => {
        requestLogin(
          "/setStaffInfo/changeAdviser/" +
            this.currentSelectRow.YGXX_YGID_NEI +
            "/" +
            this.ruleForm2.adviser,
          {},
          "get"
        )
          .then(data => {
            this.$message({
              message: "转出成功",
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
    },
    //获取会籍顾问
    gethuiji() {
      let _this = this;
      requestLogin("/setDepositCustomer/create", {}, "get")
        .then(function(res) {
          let { staff_info } = res;
          _this.staff_info = staff_info;
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
    //添加员工角色大队
    rolegourp() {
      let _this = this;
      _this.loading = true;
      requestLogin("/setStaffInfo/create", {}, "get")
        .then(function(res) {
          _this.loading = false;
          let { role, brigades } = res;
          _this.role = role;
          _this.brigades = brigades;
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
    bigsVal(id) {
      this.brigades.map((item, index) => {
        if (item.id === id) {
          this.groups = item.club_info_group;
        }
      });
    },
    //查询表格
    search() {
      this.tableData = this.tableData2;
      this.tableData = this.tableData2.filter(
        i =>
          i.YGXX_NAME.includes(this.searchVal) ||
          i.YGXX_HOMETEL.includes(this.searchVal)
      );
    },
    handleCheckChange(val) {
      Object.assign(this.selectRoleId, val);
    },
    radiochange(row) {
      this.radio = row;
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    xiaozu(val) {
    },
    getCurrentRow(val) {},
    xiaozu(val) {},
    rowClick(row, event, column) {
      // for (let index = 0; index < this.currentSelectRow.role.length; index++) {
      //   const element = this.currentSelectRow.role[index];
      //   if (element.name == '超级管理员') {
      //     this.$message({ message: "不可以操作超级管理员!", type: "warning" });
      //     return false;
      //   }
      // }
      this.currentSelectRow = row;
      this.radio = this.tableData.indexOf(row);
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
              YGXX_STATE: this.ruleForm.status, //状态
              role: this.ruleForm.selectRoleId //分配角色
            };
            requestLogin("/setStaffInfo", loginParams, "post")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.reload();
                this.resetForm(formName);
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
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.remnant = 50;
    },
    descInput() {
      var txtVal = this.ruleForm.desc.length;
      this.remnant = 50 - txtVal;
    },
    Selectchange2(val) {},
    changeInfo() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    closeEdit(isClose) {
      this.dialogFormVisible2 = isClose;
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
      }).then(() => {
        _this.loading = true;
        requestLogin(
          "/setStaffInfo/" + _this.currentSelectRow.YGXX_YGID_NEI,
          {},
          "delete"
        )
          .then(response => {
            _this.loading = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.reload();
          })
          .catch(error => {
            _this.loading = false;
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
    transformRole(roleArray) {
      var rolestr = roleArray.role[0].name;
      var role = roleArray.role;
      if (role.length > 1) {
        for (var j = 1; j < role.length; j++) {
          rolestr = rolestr.concat("," + role[j].name);
        }
      }
      return rolestr;
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
