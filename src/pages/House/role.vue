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
                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">创建角色</el-button>
                <template>
                  <el-dialog title="创建角色" :append-to-body="true" :visible.sync="dialogFormVisible">
                    <!--创建角色-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="角色名称:" prop="rolename" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model="ruleForm.rolename" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-model="ruleForm.status" placeholder="请选择" style="width:100%">
                            <el-option label="启用" value="cishucard"></el-option>
                            <el-option label="禁用" value="jinecard"></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                      <!--体验管理-->
                      <el-form-item prop="cities" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="orderShowToggle()"></i>
                          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                       @change="orderHandleCheckAllChange($event, undefined)">体验管理
                          </el-checkbox>
                          <el-checkbox-group v-model="ruleForm.cities"
                                             @change="orderHandleCheckedCitiesChange($event, 1)"
                                             style="margin-left:45px;" v-show="isShow">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--会员管理-->
                      <el-form-item prop="member" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="orderShowToggle(2)"></i>
                          <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2"
                                       @change="orderHandleCheckAllChange($event, 2)">会员管理
                          </el-checkbox>
                          <el-checkbox-group v-model="checkedCities2"
                                             @change="orderHandleCheckedCitiesChange($event, 2)"
                                             style="margin-left:45px;" v-show="isShow2">
                            <el-checkbox v-for="city in member" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--会员/会员卡操作管理-->
                      <el-form-item prop="memberoperation" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="orderShowToggle(3)"></i>
                          <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3"
                                       @change="orderHandleCheckAllChange($event, 3)">会员/会员卡操作管理
                          </el-checkbox>
                          <el-checkbox-group v-model="checkedCities3"
                                             @change="orderHandleCheckedCitiesChange($event, 3)"
                                             style="margin-left:45px;" v-show="isShow3">
                            <el-checkbox v-for="city in memberoperation" :label="city" :key="city">{{city}}
                            </el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--会员卡管理-->
                      <el-form-item prop="membercard" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="orderShowToggle(4)"></i>
                          <el-checkbox :indeterminate="isIndeterminate4" v-model="checkAll4"
                                       @change="orderHandleCheckAllChange($event, 4)">会员卡管理
                          </el-checkbox>
                          <el-checkbox-group v-model="checkedCities4"
                                             @change="orderHandleCheckedCitiesChange($event, 4)"
                                             style="margin-left:45px;" v-show="isShow4">
                            <el-checkbox v-for="city in membercard" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--预约管理-->
                      <el-form-item prop="bespoke" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="orderShowToggle(5)"></i>
                          <el-checkbox :indeterminate="isIndeterminate5" v-model="checkAll5"
                                       @change="orderHandleCheckAllChange($event, 5)">预约管理
                          </el-checkbox>
                          <el-checkbox-group v-model="checkedCities5"
                                             @change="orderHandleCheckedCitiesChange($event, 5)"
                                             style="margin-left:45px;" v-show="isShow5">
                            <el-checkbox v-for="city in bespoke" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--进场管理-->
                      <el-form-item prop="approach" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="orderShowToggle(6)"></i>
                          <el-checkbox :indeterminate="isIndeterminate6" v-model="checkAll6"
                                       @change="orderHandleCheckAllChange($event, 6)">进场管理
                          </el-checkbox>
                          <el-checkbox-group v-model="checkedCities6"
                                             @change="orderHandleCheckedCitiesChange($event, 6)"
                                             style="margin-left:45px;" v-show="isShow6">
                            <el-checkbox v-for="city in approach" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--员工管理-->
                      <el-form-item prop="staff" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="orderShowToggle(7)"></i>
                          <el-checkbox :indeterminate="isIndeterminate7" v-model="checkAll7"
                                       @change="orderHandleCheckAllChange($event, 7)">员工管理
                          </el-checkbox>
                          <el-checkbox-group v-model="checkedCities7"
                                             @change="orderHandleCheckedCitiesChange($event, 7)"
                                             style="margin-left:45px;" v-show="isShow7">
                            <el-checkbox v-for="city in staff" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--角色权限管理-->
                      <el-form-item prop="role" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="orderShowToggle(8)"></i>
                          <el-checkbox :indeterminate="isIndeterminate8" v-model="checkAll8"
                                       @change="orderHandleCheckAllChange($event, 8)">角色权限管理
                          </el-checkbox>
                          <el-checkbox-group v-model="checkedCities8"
                                             @change="orderHandleCheckedCitiesChange($event, 8)"
                                             style="margin-left:45px;" v-show="isShow8">
                            <el-checkbox v-for="city in role" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--课程管理-->
                      <el-form-item prop="course" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="orderShowToggle(9)"></i>
                          <el-checkbox :indeterminate="isIndeterminate9" v-model="checkAll9"
                                       @change="orderHandleCheckAllChange($event, 9)">课程管理
                          </el-checkbox>
                          <el-checkbox-group v-model="checkedCities9"
                                             @change="orderHandleCheckedCitiesChange($event, 9)"
                                             style="margin-left:45px;" v-show="isShow9">
                            <el-checkbox v-for="city in course" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--个人中心-->
                      <el-form-item prop="center" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="orderShowToggle(10)"></i>
                          <el-checkbox :indeterminate="isIndeterminate10" v-model="checkAll10"
                                       @change="orderHandleCheckAllChange($event, 10)">个人中心
                          </el-checkbox>
                          <el-checkbox-group v-model="checkedCities10"
                                             @change="orderHandleCheckedCitiesChange($event, 10)"
                                             style="margin-left:45px;" v-show="isShow10">
                            <el-checkbox v-for="city in center" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--会员名下卡管理-->
                      <el-form-item prop="membercardunder" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="orderShowToggle(11)"></i>
                          <el-checkbox :indeterminate="isIndeterminate11" v-model="checkAll11"
                                       @change="orderHandleCheckAllChange($event, 11)">会员名下卡管理
                          </el-checkbox>
                          <el-checkbox-group v-model="checkedCities11"
                                             @change="orderHandleCheckedCitiesChange($event, 11)"
                                             style="margin-left:45px;" v-show="isShow11">
                            <el-checkbox v-for="city in membercardunder" :label="city" :key="city">{{city}}
                            </el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--数据报表-->
                      <el-form-item prop="datereport" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="orderShowToggle(12)"></i>
                          <el-checkbox :indeterminate="isIndeterminate12" v-model="checkAll12"
                                       @change="orderHandleCheckAllChange($event, 12)">数据报表
                          </el-checkbox>
                          <el-checkbox-group v-model="checkedCities12"
                                             @change="orderHandleCheckedCitiesChange($event, 12)"
                                             style="margin-left:45px;" v-show="isShow12">
                            <el-checkbox v-for="city in datereport" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <el-form-item class="dialog-footer">
                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                          <el-button @click="resetForm('ruleForm')">重置</el-button>
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
                    <Editrole :currentSelectRow="currentSelectRow"></Editrole>
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
            <el-table v-loading="loading" ref="singleTable" @current-change="handleCurrentChange2"
                      element-loading-text="拼命加载中..." highlight-current-row :data="tableData"
                      :header-cell-style="{background:'#fafafa'}" fixed style="width: 100%" @row-click="rowClick">
              <el-table-column align="center" prop="radio" fixed width="100px">
                <template slot-scope="scope">
                  <el-radio class="radio" v-model="radio" :label="scope.$index"
                            @change.native="getCurrentRow(scope.$index)">&nbsp;
                  </el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="name" align="left" label="角色名称"></el-table-column>
              <el-table-column prop="type" align="left" label="类型"></el-table-column>
              <el-table-column fixed="right" label="操作" align="left">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="danger" plain disabled size="small">删除</el-button>
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
  import {requestLogin} from "@/api/api";
  import * as validate from "@/validate/Login";
  import Editrole from "@/components/editrole";

  const cityOptions = ["资料录入", "体验客户管理", "体验券设置", "客户退体验券", "体验客户约课", "编辑体验客户资料", "体验客户购券"]; //体验管理
  const cityOptions2 = ["会员资料录入", "开卡审核", "会员续会/充值", "会员积分", "更换会籍顾问", "更换教练", "会员请假/销假", "会员综合信息查询编辑", "意向会员交定金", "意向会员定金管理", "补开卡", "放弃定金", "上课记录"]; //会员管理
  const cityOptions3 = ["挂失", "解挂", "补卡", "转卡", "退让", "升级", "变更有效期", "变更体侧数据"]; //会员/会员卡操作管理
  const cityOptions4 = ["添加会员卡", "会员卡管理"]; //会员卡管理
  const cityOptions5 = ["私教预约", "团课预约", "预约管理"]; //预约管理
  const cityOptions6 = ["私教登记进场", "团课登记进场"]; //进场管理
  const cityOptions7 = ["添加新员工", "员工管理"]; //员工管理
  const cityOptions8 = ["添加新角色", "角色管理", "新增权限"]; //角色权限管理
  const cityOptions9 = ["课程表查看", "课程表修改", "课程科目查看", "课程科目修改", "课程上课登记"]; //课程管理
  const cityOptions10 = ["登录+个人中心"]; //个人中心
  const cityOptions11 = ["新增卡种", "查看会员名下所有卡种", "卡种切换"]; //会员名下卡管理
  const cityOptions12 = ["会馆业绩", "会馆潜在录入", "会馆卖卡", "会馆卖券"]; //数据报表
  const cityOptionsObject = {
    1: cityOptions,
    2: cityOptions2,
    3: cityOptions3,
    4: cityOptions4,
    5: cityOptions5,
    6: cityOptions6,
    7: cityOptions7,
    8: cityOptions8,
    9: cityOptions9,
    10: cityOptions10,
    11: cityOptions11,
    12: cityOptions12,
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
        isShow: true,
        isShow2: true,
        isShow3: true,
        isShow4: true,
        isShow5: true,
        isShow6: true,
        isShow7: true,
        isShow8: true,
        isShow9: true,
        isShow10: true,
        isShow11: true,
        isShow12: true,
        checkAll: false,
        checkAll2: false,
        checkAll3: false,
        checkAll4: false,
        checkAll5: false,
        checkAll6: false,
        checkAll7: false,
        checkAll8: false,
        checkAll9: false,
        checkAll10: false,
        checkAll11: false,
        checkAll12: false,
        // cities: [],
        checkedCities: [],
        checkedCities2: [],
        checkedCities3: [],
        checkedCities4: [],
        checkedCities5: [],
        checkedCities6: [],
        checkedCities7: [],
        checkedCities8: [],
        checkedCities9: [],
        checkedCities10: [],
        checkedCities11: [],
        checkedCities12: [],
        cities: cityOptions, //体验管理
        member: cityOptions2, //会员管理
        memberoperation: cityOptions3, //会员/会员卡操作管理
        membercard: cityOptions4, //会员卡管理
        bespoke: cityOptions5, //预约管理
        approach: cityOptions6, //进场管理
        staff: cityOptions7, //员工管理
        role: cityOptions8, //角色权限管理
        course: cityOptions9, //课程管理
        center: cityOptions10, //个人中心
        membercardunder: cityOptions11, //会员名下卡管理
        datereport: cityOptions12, //数据报表
        isIndeterminate: false,
        isIndeterminate2: false,
        isIndeterminate3: false,
        isIndeterminate4: false,
        isIndeterminate5: false,
        isIndeterminate6: false,
        isIndeterminate7: false,
        isIndeterminate8: false,
        isIndeterminate9: false,
        isIndeterminate10: false,
        isIndeterminate11: false,
        isIndeterminate12: false,
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
          rolename: validate.rolename,
        },
        currentSelectRow: "",
        dialogFormVisible: false,
        dialogFormVisible2: false,
        currentPage4: 4,
        radio: true,
        tableData: []
      };
    },
    created: function () {
      //表格列表数据
      let _this = this;
      _this.loading = true;
      requestLogin("/RoleAuthorityManagement", {}, "get")
        .then(function (res) {
          _this.tableData = res;
          _this.loading = false;
          _this.rolecreate();
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
      //角色编辑页
      rolecreate() {
        let _this = this;
        _this.loading = true;
        requestLogin("/RoleAuthorityManagement/create", {}, "get")
          .then(function (res) {
            _this.loading = false;
            console.log(res);
            // let { role, brigades } = res;
            // _this.role = role;
            // _this.brigades = brigades;
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
      handleClick(row) {
        console.log(row);
      },
      radiochange(row) {
        console.log(`当前: ${row}`);
      },
      handleCurrentChange2(val, index) {
        this.currentRow = val;
        // this.$emit('data',val.pkg);
      },
      getCurrentRow(val) {
        console.log(val);
      },
      rowClick(row, event, column) {
        this.radio = row.index;
        //获取表格数据
        this.currentSelectRow = row;
        console.log(row.index);
        this.radio = this.tableData.indexOf(row);
      },
      changeInfo() {
        //先选择列表
        if (this.currentSelectRow) {
          this.dialogFormVisible2 = true;
        } else {
          this.$message({message: "请先选择数据!", type: "warning"});
        }
      },
      //添加角色权限
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示").then(() => {
              this.addLoading = true;
              var loginParams = {
                name: this.ruleForm.rolename, //角色名称
                power: this.ruleForm.cities, //权限
              };
              requestLogin("/RoleAuthorityManagement", loginParams, "post")
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
                  let {response: {data: {errorCode, msg}}} = error;
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
            this.$message({message: "提交失败!", type: "error"});
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      orderShowToggle(order = '') {
        let isShow = `isShow${order}`;
        this[isShow] = !this[isShow];
      },
      orderHandleCheckAllChange(val = undefined, order = '') {
        let isIndeterminate = `isIndeterminate${order}`;
        let checkedCities = `checkedCities${order}`;
        if (!order) {
          this.ruleForm.cities = val ? cityOptionsObject[1] : [];
          // this[checkedCities] = val ? cityOptionsObject[1] : [];
        } else {
          this[checkedCities] = val ? cityOptionsObject[order] : [];
        }
        this[isIndeterminate] = false;
      },
      orderHandleCheckedCitiesChange(value, order = '') {
        let checkedCount = value.length;
        let check = `checkAll${order}`;
        let isIndeterminate = `isIndeterminate${order}`;
        if (order === 1) {
          check = 'checkAll';
          isIndeterminate = 'isIndeterminate';
        }
        this[check] = checkedCount === cityOptionsObject[order].length;
        this[isIndeterminate] =
          checkedCount > 0 && checkedCount < this.member.length;
      },
    }
  };
</script>
<style lang="scss">
  @import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
  @import "@/styles/role.scss";
</style>
