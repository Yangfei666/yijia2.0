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
                          <i class="el-icon-caret-bottom" @click="showToggle"></i>
                          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">体验管理</el-checkbox>
                          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" style="margin-left:45px;" v-show="isShow">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--会员管理-->
                      <el-form-item prop="member" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="showToggle2"></i>
                          <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">会员管理</el-checkbox>
                          <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2" style="margin-left:45px;" v-show="isShow2">
                            <el-checkbox v-for="city in member" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--会员/会员卡操作管理-->
                      <el-form-item prop="memberoperation" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="showToggle3"></i>
                          <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3">会员/会员卡操作管理</el-checkbox>
                          <el-checkbox-group v-model="checkedCities3" @change="handleCheckedCitiesChange3" style="margin-left:45px;" v-show="isShow3">
                            <el-checkbox v-for="city in memberoperation" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--会员卡管理-->
                      <el-form-item prop="membercard" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="showToggle4"></i>
                          <el-checkbox :indeterminate="isIndeterminate4" v-model="checkAll4" @change="handleCheckAllChange4">会员卡管理</el-checkbox>
                          <el-checkbox-group v-model="checkedCities4" @change="handleCheckedCitiesChange4" style="margin-left:45px;" v-show="isShow4">
                            <el-checkbox v-for="city in membercard" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--预约管理-->
                      <el-form-item prop="bespoke" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="showToggle5"></i>
                          <el-checkbox :indeterminate="isIndeterminate5" v-model="checkAll5" @change="handleCheckAllChange5">预约管理</el-checkbox>
                          <el-checkbox-group v-model="checkedCities5" @change="handleCheckedCitiesChange5" style="margin-left:45px;" v-show="isShow5">
                            <el-checkbox v-for="city in bespoke" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--进场管理-->
                      <el-form-item prop="approach" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="showToggle6"></i>
                          <el-checkbox :indeterminate="isIndeterminate6" v-model="checkAll6" @change="handleCheckAllChange6">进场管理</el-checkbox>
                          <el-checkbox-group v-model="checkedCities6" @change="handleCheckedCitiesChange6" style="margin-left:45px;" v-show="isShow6">
                            <el-checkbox v-for="city in approach" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--员工管理-->
                      <el-form-item prop="staff" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="showToggle7"></i>
                          <el-checkbox :indeterminate="isIndeterminate7" v-model="checkAll7" @change="handleCheckAllChange7">员工管理</el-checkbox>
                          <el-checkbox-group v-model="checkedCities7" @change="handleCheckedCitiesChange7" style="margin-left:45px;" v-show="isShow7">
                            <el-checkbox v-for="city in staff" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--角色权限管理-->
                      <el-form-item prop="role" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="showToggle8"></i>
                          <el-checkbox :indeterminate="isIndeterminate8" v-model="checkAll8" @change="handleCheckAllChange8">角色权限管理</el-checkbox>
                          <el-checkbox-group v-model="checkedCities8" @change="handleCheckedCitiesChange8" style="margin-left:45px;" v-show="isShow8">
                            <el-checkbox v-for="city in role" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--课程管理-->
                      <el-form-item prop="course" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="showToggle9"></i>
                          <el-checkbox :indeterminate="isIndeterminate9" v-model="checkAll9" @change="handleCheckAllChange9">课程管理</el-checkbox>
                          <el-checkbox-group v-model="checkedCities9" @change="handleCheckedCitiesChange9" style="margin-left:45px;" v-show="isShow9">
                            <el-checkbox v-for="city in course" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--个人中心-->
                      <el-form-item prop="center" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="showToggle10"></i>
                          <el-checkbox :indeterminate="isIndeterminate10" v-model="checkAll10" @change="handleCheckAllChange10">个人中心</el-checkbox>
                          <el-checkbox-group v-model="checkedCities10" @change="handleCheckedCitiesChange10" style="margin-left:45px;" v-show="isShow10">
                            <el-checkbox v-for="city in center" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--会员名下卡管理-->
                      <el-form-item prop="membercardunder" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="showToggle11"></i>
                          <el-checkbox :indeterminate="isIndeterminate11" v-model="checkAll11" @change="handleCheckAllChange11">会员名下卡管理</el-checkbox>
                          <el-checkbox-group v-model="checkedCities11" @change="handleCheckedCitiesChange11" style="margin-left:45px;" v-show="isShow11">
                            <el-checkbox v-for="city in membercardunder" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
                        </el-col>
                      </el-form-item>
                      <!--数据报表-->
                      <el-form-item prop="datereport" :label-width="formLabelWidth" style="margin-bottom:10px">
                        <el-col :span="22">
                          <i class="el-icon-caret-bottom" @click="showToggle12"></i>
                          <el-checkbox :indeterminate="isIndeterminate12" v-model="checkAll12" @change="handleCheckAllChange12">数据报表</el-checkbox>
                          <el-checkbox-group v-model="checkedCities12" @change="handleCheckedCitiesChange12" style="margin-left:45px;" v-show="isShow12">
                            <el-checkbox v-for="city in datereport" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group>
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
            <el-table v-loading="loading" element-loading-text="拼命加载中..." highlight-current-row :data="tableData" :header-cell-style="{background:'#fafafa'}" fixed style="width: 100%" @row-click="rowClick">
              <el-table-column align="center" prop="radio" fixed width="100px">
                <template slot-scope="scope">
                  <el-radio-group v-model="radio">
                    <el-radio :label="scope.$index" @change.native="radiochange(scope.row)">&nbsp;</el-radio>
                  </el-radio-group>
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
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
import Editrole from "@/components/editrole";
const cityOptions = [
  "资料录入",
  "体验客户管理",
  "体验券设置",
  "客户退体验券",
  "体验客户约课",
  "编辑体验客户资料",
  "体验客户购券"
]; //体验管理
const cityOptions2 = [
  "会员资料录入",
  "开卡审核",
  "会员续会/充值",
  "会员积分",
  "更换会籍顾问",
  "更换教练",
  "会员请假/销假",
  "会员综合信息查询编辑",
  "意向会员交定金",
  "意向会员定金管理",
  "补开卡",
  "放弃定金",
  "上课记录"
]; //会员管理
const cityOptions3 = [
  "挂失",
  "解挂",
  "补卡",
  "转卡",
  "退让",
  "升级",
  "变更有效期",
  "变更体侧数据"
]; //会员/会员卡操作管理
const cityOptions4 = ["添加会员卡", "会员卡管理"]; //会员卡管理
const cityOptions5 = ["私教预约", "团课预约", "预约管理"]; //预约管理
const cityOptions6 = ["私教登记进场", "团课登记进场"]; //进场管理
const cityOptions7 = ["添加新员工", "员工管理"]; //员工管理
const cityOptions8 = ["添加新角色", "角色管理", "新增权限"]; //角色权限管理
const cityOptions9 = [
  "课程表查看",
  "课程表修改",
  "课程科目查看",
  "课程科目修改",
  "课程上课登记"
]; //课程管理
const cityOptions10 = ["登录+个人中心"]; //个人中心
const cityOptions11 = ["新增卡种", "查看会员名下所有卡种", "卡种切换"]; //会员名下卡管理
const cityOptions12 = ["会馆业绩", "会馆潜在录入", "会馆卖卡", "会馆卖券"]; //数据报表
export default {
  name: "role",
  components: {
    Editrole
  },
  data() {
    return {
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
        cities: "", //体验管理
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
        status: validate.status
      },
      currentSelectRow: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      currentPage4: 4,
      radio: true,
      tableData: []
    };
  },
  created: function() {
    //表格列表数据
    let _this = this;
    _this.loading = true;
    requestLogin("/RoleAuthorityManagement", {}, "get")
      .then(function(res) {
        _this.tableData = res;
        _this.loading = false;
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
     handleClick(row) {
        console.log(row);
      },
    radiochange(row) {
      console.log(`当前: ${row}`);
    },
    handleClick3(row) {
      console.log(row);
      alert("点击了");
    },
    onSubmit() {
      console.log("submit!");
    },
    rowClick(row, event, column) {
      this.radio = row.index;
      //获取表格数据
      this.currentSelectRow = row;
      console.log(row.index);
    },
    changeInfo() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    open2() {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData = this.tableData.slice(1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showToggle: function() {
      this.isShow = !this.isShow;
    },
    showToggle2: function() {
      this.isShow2 = !this.isShow2;
    },
    showToggle3: function() {
      this.isShow3 = !this.isShow3;
    },
    showToggle4: function() {
      this.isShow4 = !this.isShow4;
    },
    showToggle5: function() {
      this.isShow5 = !this.isShow5;
    },
    showToggle6: function() {
      this.isShow6 = !this.isShow6;
    },
    showToggle7: function() {
      this.isShow7 = !this.isShow7;
    },
    showToggle8: function() {
      this.isShow8 = !this.isShow8;
    },
    showToggle9: function() {
      this.isShow9 = !this.isShow9;
    },
    showToggle10: function() {
      this.isShow10 = !this.isShow10;
    },
    showToggle11: function() {
      this.isShow11 = !this.isShow11;
    },
    showToggle12: function() {
      this.isShow12 = !this.isShow12;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckAllChange2(val) {
      this.checkedCities2 = val ? cityOptions2 : [];
      this.isIndeterminate2 = false;
    },
    handleCheckAllChange3(val) {
      this.checkedCities3 = val ? cityOptions3 : [];
      this.isIndeterminate3 = false;
    },
    handleCheckAllChange4(val) {
      this.checkedCities4 = val ? cityOptions4 : [];
      this.isIndeterminate4 = false;
    },
    handleCheckAllChange5(val) {
      this.checkedCities5 = val ? cityOptions5 : [];
      this.isIndeterminate5 = false;
    },
    handleCheckAllChange6(val) {
      this.checkedCities6 = val ? cityOptions6 : [];
      this.isIndeterminate6 = false;
    },
    handleCheckAllChange7(val) {
      this.checkedCities7 = val ? cityOptions7 : [];
      this.isIndeterminate7 = false;
    },
    handleCheckAllChange8(val) {
      this.checkedCities8 = val ? cityOptions8 : [];
      this.isIndeterminate8 = false;
    },
    handleCheckAllChange9(val) {
      this.checkedCities9 = val ? cityOptions9 : [];
      this.isIndeterminate9 = false;
    },
    handleCheckAllChange10(val) {
      this.checkedCities10 = val ? cityOptions10 : [];
      this.isIndeterminate10 = false;
    },
    handleCheckAllChange11(val) {
      this.checkedCities11 = val ? cityOptions11 : [];
      this.isIndeterminate11 = false;
    },
    handleCheckAllChange12(val) {
      this.checkedCities12 = val ? cityOptions12 : [];
      this.isIndeterminate12 = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount2 = value.length;
      this.checkAll2 = checkedCount2 === this.member.length;
      this.isIndeterminate2 =
        checkedCount2 > 0 && checkedCount2 < this.member.length;
    },
    handleCheckedCitiesChange3(value) {
      let checkedCount3 = value.length;
      this.checkAll3 = checkedCount3 === this.memberoperation.length;
      this.isIndeterminate3 =
        checkedCount3 > 0 && checkedCount3 < this.memberoperation.length;
    },
    handleCheckedCitiesChange4(value) {
      let checkedCount4 = value.length;
      this.checkAll4 = checkedCount4 === this.membercard.length;
      this.isIndeterminate4 =
        checkedCount4 > 0 && checkedCount4 < this.membercard.length;
    },
    handleCheckedCitiesChange5(value) {
      let checkedCount5 = value.length;
      this.checkAll5 = checkedCount5 === this.bespoke.length;
      this.isIndeterminate5 =
        checkedCount5 > 0 && checkedCount5 < this.bespoke.length;
    },
    handleCheckedCitiesChange6(value) {
      let checkedCount6 = value.length;
      this.checkAll6 = checkedCount6 === this.approach.length;
      this.isIndeterminate6 =
        checkedCount6 > 0 && checkedCount6 < this.approach.length;
    },
    handleCheckedCitiesChange7(value) {
      let checkedCount7 = value.length;
      this.checkAll7 = checkedCount7 === this.staff.length;
      this.isIndeterminate7 =
        checkedCount7 > 0 && checkedCount7 < this.staff.length;
    },
    handleCheckedCitiesChange8(value) {
      let checkedCount8 = value.length;
      this.checkAll8 = checkedCount8 === this.role.length;
      this.isIndeterminate8 =
        checkedCount8 > 0 && checkedCount8 < this.role.length;
    },
    handleCheckedCitiesChange9(value) {
      let checkedCount9 = value.length;
      this.checkAll9 = checkedCount9 === this.course.length;
      this.isIndeterminate9 =
        checkedCount9 > 0 && checkedCount9 < this.course.length;
    },
    handleCheckedCitiesChange10(value) {
      let checkedCount10 = value.length;
      this.checkAll10 = checkedCount10 === this.center.length;
      this.isIndeterminate10 =
        checkedCount10 > 0 && checkedCount10 < this.center.length;
    },
    handleCheckedCitiesChange11(value) {
      let checkedCount11 = value.length;
      this.checkAll11 = checkedCount11 === this.membercardunder.length;
      this.isIndeterminate11 =
        checkedCount11 > 0 && checkedCount11 < this.membercardunder.length;
    },
    handleCheckedCitiesChange12(value) {
      let checkedCount12 = value.length;
      this.checkAll12 = checkedCount12 === this.datereport.length;
      this.isIndeterminate12 =
        checkedCount12 > 0 && checkedCount12 < this.datereport.length;
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