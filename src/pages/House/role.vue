<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>会所管理</el-breadcrumb-item>
              <el-breadcrumb-item>角色权限管理</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">角色权限管理</span>
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
                <el-button type="text" class="p el-icon-plus" @click="createRole">创建角色</el-button>
                <template>
                  <el-dialog title="创建角色" :append-to-body="true" :visible.sync="dialogFormVisible">
                    <!--创建角色-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="角色名称:" prop="rolename" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model="ruleForm.rolename" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>

                      <el-form-item v-for="(items, index) in emptyOptions" :key="index" :prop="items.type" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="isShowToggle(index)"></i>
                          <el-checkbox :indeterminate="items.isIndeterminate" v-model="items.checkAll" @change="isCheckAll($event, index)">
                            {{items.type}}
                          </el-checkbox>
                          <el-checkbox-group @change="getCheckedItems($event, index)" v-model="items.checkedItems" style="margin-left:45px;" v-show="items.isShow">
                            <el-checkbox v-for="(item, index) in items.power" :label="item.id" :key="index">
                              {{item.describe}}
                            </el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <el-form-item class="dialog-footer">
                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                          <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                          <el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading"
                                     style="background-color: #00BC71;border-color: #00BC71;">确定
                          </el-button>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </template>
              </div>
              <div class="add">
                <el-button type="text" class="p" @click="changeInfo">修改角色权限</el-button>
                <template>
                  <el-dialog title="修改角色权限" :append-to-body="true" :visible.sync="dialogFormVisible2">
                    <Editrole v-if="dialogFormVisible2" :currentSelectRow="currentSelectRow" @closeEditPage="closeEditPage"></Editrole>
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
            <el-table v-loading="loading" ref="singleTable" @current-change="handleCurrentChange2" element-loading-text="拼命加载中..." highlight-current-row :data="tableData" :header-cell-style="{background:'#fafafa'}" fixed style="width: 100%" @row-click="rowClick">
              <el-table-column align="center" prop="radio" fixed width="100px">
                <template slot-scope="scope">
                  <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;
                  </el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="name" align="left" label="角色名称"></el-table-column>
              <el-table-column prop="type" align="left" label="类型"></el-table-column>
              <el-table-column fixed="right" label="操作" align="left">
                <template slot-scope="scope">
                  <el-button @click="deleteRole(scope.row)" type="danger" plain :disabled="tableData[scope.$index].type === '默认角色'" size="small">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
import Editrole from "@/components/editrole";

let role = {
  infoById(id) {
    return requestLogin(`/RoleAuthorityManagement/${id}`, {}, "get");
  },
  updateById(id, params) {
    return requestLogin(`/RoleAuthorityManagement/${id}`, params, "put");
  },
  deleteById(id) {
    return requestLogin(`/RoleAuthorityManagement/${id}`, {}, "delete");
  },
  createList() {
    return requestLogin("/RoleAuthorityManagement/create", {}, "get");
  },
  add(params) {
    return requestLogin("/RoleAuthorityManagement", params, "post");
  },
  get() {
    return requestLogin("/RoleAuthorityManagement", {}, "get");
  }
};
export default {
  name: "role",
  inject: ["reload"],
  components: {
    Editrole
  },
  data() {
    return {
      addLoading: false,
      loading: true,
      formLabelWidth: "130px",
      num: 1,
      status: 1,
      memcolor: 1,
      classtype: 1,
      type: 1,
      disabled: false,
      ruleForm: {
        rolename: "", //角色名称
        status: "", //状态
        cities: [], //体验管理
        member: "", //会员管理
        memberoperation: "", //会员/会员卡操作管理
        membercard: "", //会员卡管理
        bespoke: "", //预约管理
        approach: "", //进场管理
        staff: "", //员工管理
        role: "", //角色权限管理
        course: "", //课程管理
        center: "", //个人中心
        membercardunder: "", //会员名下卡管理
        datereport: "" //数据报表
      },
      rules: {
        rolename: validate.rolename
      },
      currentSelectRow: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      currentPage4: 4,
      radio: true,
      tableData: [],
      //添加角色选项
      emptyOptions: []
    };
  },
  created() {
    this.getRoleLists();
  },
  methods: {
    getRoleLists() {
      //表格列表数据
      let _this = this;
      _this.loading = true;
      role
        .get()
        .then(function(res) {
          _this.tableData = res;
          _this.loading = false;
        })
        .catch(error => {
          if (error.res) {
            _this.$message({
              message: "获取数据失败",
              type: "error"
            });
          }
        });
    },
    createRole() {
      this.rolecreate();
    },
    //角色编辑页
    rolecreate() {
      let _this = this;
      _this.dialogFormVisible = true;
      _this.loading = true;
      role
        .createList()
        .then(function(res) {
          _this.loading = false;
          _this.emptyOptions = res.map(item => {
            item.checkedItems = [];
            item.checkAll = false;
            item.isShow = true;
            item.isIndeterminate = false;
            return item;
          });
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
    deleteRole(row) {
      let _this = this;
      this.$confirm("确认删除吗？", "提示")
        .then(() => {
          role.deleteById(row.id).then(() => {
            _this.$message({
              message: "删除成功",
              type: "success"
            });
            _this.reload();
          });
        })
        .catch(error => {
          this.$message({ message: "已取消删除!", type: "error" });
        });
    },
    radiochange(row) {},
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    getCurrentRow(val) {},
    rowClick(row, event, column) {
      if (row.name == '超级管理员') {
        this.$message({ message: "超级管理员不能操作!", type: "warning" });
      } else {
        this.radio = row.index;
        //获取表格数据
        this.currentSelectRow = row;
        this.radio = this.tableData.indexOf(row);
      }
    },
    changeInfo() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    mapSubmitFormParams() {
      let checkPower = [];
      this.emptyOptions.map(item => {
        item.checkedItems.map(subItem => {
          checkPower.push(subItem);
        });
      });
      return checkPower;
    },
    //添加角色权限
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        let _this = this;
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            _this.addLoading = true;
            let params = {
              name: _this.ruleForm.rolename, //角色名称
              power: _this.mapSubmitFormParams() //权限
            };
            role
              .add(params)
              .then(data => {
                _this.addLoading = false;
                _this.$message({
                  message: "提交成功",
                  type: "success"
                });
                _this.reload();
                _this.dialogFormVisible = false;
              })
              .catch(error => {
                _this.addLoading = false;
                let { response: { data: { errorCode, msg } } } = error;
                if (errorCode != 0) {
                  _this.$message({
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
      this.emptyOptions.map(item => {
        item.checkedItems = [];
        item.checkAll = false;
        item.isShow = true;
        item.isIndeterminate = false;
      });
    },
    isShowToggle(order) {
      this.emptyOptions[order].isShow = !this.emptyOptions[order].isShow;
    },
    isCheckAll(val, order) {
      let orderOptions = this.emptyOptions[order];
      orderOptions.checkAll = val;
      orderOptions.checkedItems = val
        ? orderOptions.power.map(item => item.id)
        : [];
      orderOptions.isIndeterminate = false;
    },
    getCheckedItems(val, order) {
      let checkedCount = val.length;
      let orderOptions = this.emptyOptions[order];
      orderOptions.checkAll = checkedCount === orderOptions.power.length;
      orderOptions.isIndeterminate =
        checkedCount > 0 && checkedCount < orderOptions.power.length;
    },
    closeEditPage() {
      this.dialogFormVisible2 = false;
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
@import "@/styles/role.scss";
</style>
