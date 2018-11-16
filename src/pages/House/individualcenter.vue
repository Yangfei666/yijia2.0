<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <el-col :span="1" class="weber-img">
              <img :src="item.Photo" />
            </el-col>
            <el-col :span="10" class="weber-left">
              <span class="weber-span">{{item.YGXX_NAME}}</span>
              <p class="weber-p">岗位:{{a.name}}
                <span class="weber-pp">电话:{{item.YGXX_HOMETEL}}</span>
              </p>
            </el-col>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="center-main">
          <el-col :span="24">
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
              <!--个人资料-->
              <el-tab-pane label="个人资料" name="first">
                <template>
                  <div class="handback">
                    <el-col :span="10" class="hand-left">
                      <div class="left-table">
                        <div class="left-table-main">
                          <el-col :span="7" class="table-hh">
                            <span>岗位</span>
                          </el-col>
                          <el-col :span="17" class="table-gg">
                            <span>{{a.name}}</span>
                          </el-col>
                        </div>
                        <div class="left-table-main">
                          <el-col :span="7" class="table-hh">
                            <span>电话</span>
                          </el-col>
                          <el-col :span="17" class="table-gg">
                            <span>{{item.YGXX_HOMETEL}}</span>
                          </el-col>
                        </div>
                        <div class="left-table-main">
                          <el-col :span="7" class="table-hh">
                            <span>录入时间</span>
                          </el-col>
                          <el-col :span="17" class="table-gg">
                            <span>{{item.ygAddTime}}</span>
                          </el-col>
                        </div>
                        <div class="left-table-main">
                          <el-col :span="7" class="table-hh">
                            <span>员工编号</span>
                          </el-col>
                          <el-col :span="17" class="table-gg">
                            <span>{{item.YGXX_YGID_NEI}}</span>
                          </el-col>
                        </div>
                        <div class="left-table-main">
                          <el-col :span="7" class="table-hh">
                            <span>身份证号</span>
                          </el-col>
                          <el-col :span="17" class="table-gg">
                            <span>{{item.ygIdentity}}</span>
                          </el-col>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="11" class="hand-right">
                      <div class="head_img">
                        <img :src="imageUrl" />
                      </div>
                      <el-upload class="upload-demo" ref="upload" action=" " :file-list="fileList" :limit='1' :on-exceed='uploadOverrun' :http-request='submitUpload' list-type="picture" :auto-upload="true">
                        <el-button type="success" class="successbut" plain>更换头像</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-col>
                  </div>
                </template>
              </el-tab-pane>
              <!--修改密码-->
              <el-tab-pane label="修改密码" name="first2">
                <template>
                  <el-col :span="16" class="center-two">
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="原密码:" prop="pass">
                        <el-input :type="pwdType" v-model="ruleForm2.pass" placeholder="请输入6-18位数字或字母"></el-input>
                        <div class="eye" @click="showToggle">
                          <img :src="openeye" @click="changeType()" v-show="downIcon" />
                          <img :src="openeye2" @click="changeType()" v-show="!downIcon" />
                        </div>
                      </el-form-item>
                      <el-form-item label="新密码:" prop="passWord">
                        <el-input :type="pwdType2" v-model="ruleForm2.passWord" placeholder="请输入6-18位数字或字母"></el-input>
                        <div class="closed" @click="showToggle2">
                          <img :src="openeye" @click="changeType2()" v-show="downIcon2" />
                          <img :src="openeye2" @click="changeType2()" v-show="!downIcon2" />
                        </div>
                      </el-form-item>
                      <el-form-item label="确认密码:" prop="checkPass">
                        <el-input :type="pwdType3" v-model="ruleForm2.checkPass" placeholder="请输入6-18位数字或字母"></el-input>
                        <div class="closed" @click="showToggle3">
                          <img :src="openeye" @click="changeType3()" v-show="downIcon3" />
                          <img :src="openeye2" @click="changeType3()" v-show="!downIcon3" />
                        </div>
                      </el-form-item>
                      <el-form-item class="primary">
                        <el-button type="primary" @click="Modifypsd('ruleForm2')" :loading="addLoading">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </template>
              </el-tab-pane>
              <!--我的门店-->
              <el-tab-pane label="我的门店" name="second">
                <template>
                  <el-col :span="24" class="room-main">
                    <div class="add">
                      <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加门店</el-button>
                      <template>
                        <el-dialog title="添加门店" :append-to-body="true" :visible.sync="dialogFormVisible">
                          <!--添加门店-->
                          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                            <el-form-item label="门店名称:" prop="roomname" :label-width="formLabelWidth">
                              <el-col :span="22">
                                <el-input v-model="ruleForm.roomname" placeholder="请输入"></el-input>
                              </el-col>
                            </el-form-item>
                            <el-form-item label="门店别名:" prop="roombyname" :label-width="formLabelWidth">
                              <el-col :span="22">
                                <el-input v-model="ruleForm.roombyname" placeholder="请输入"></el-input>
                              </el-col>
                            </el-form-item>
                            <el-form-item label="电话:" prop="tel" :label-width="formLabelWidth">
                              <el-col :span="22">
                                <el-input v-model="ruleForm.tel" placeholder="请输入"></el-input>
                              </el-col>
                            </el-form-item>
                            <el-form-item label="邮编:" prop="zipcode" :label-width="formLabelWidth">
                              <el-col :span="22">
                                <el-input v-model="ruleForm.zipcode" placeholder="请输入"></el-input>
                              </el-col>
                            </el-form-item>
                            <el-form-item label="法人:" prop="corporation" :label-width="formLabelWidth">
                              <el-col :span="22">
                                <el-input v-model="ruleForm.corporation" placeholder="请输入"></el-input>
                              </el-col>
                            </el-form-item>
                            <el-form-item label="传真:" prop="portraiture" :label-width="formLabelWidth">
                              <el-col :span="22">
                                <el-input v-model="ruleForm.portraiture" placeholder="请输入"></el-input>
                              </el-col>
                            </el-form-item>
                            <el-form-item label="城市:" prop="homecity" :label-width="formLabelWidth">
                              <el-col :span="22">
                                <el-input v-model="ruleForm.homecity" placeholder="请输入"></el-input>
                              </el-col>
                            </el-form-item>
                            <el-form-item label="详细地址:" prop="detadaddress" :label-width="formLabelWidth">
                              <el-col :span="22">
                                <el-input v-model="ruleForm.detadaddress" placeholder="请输入"></el-input>
                              </el-col>
                            </el-form-item>
                            <el-form-item class="dialog-footer">
                              <el-col :span="24" style="display: flex;justify-content: flex-end;">
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                                <el-button type="primary" @click="addroom('ruleForm')" :loading="addLoading" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                              </el-col>
                            </el-form-item>
                          </el-form>
                        </el-dialog>
                      </template>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="table-room">
                      <el-table v-loading="loading"  ref="singleTable"  @current-change="handleCurrentChange2" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
                        <el-table-column align="center" prop="radio" fixed width="70px">
                          <template slot-scope="scope">
                            <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                          </template>
                        </el-table-column>
                        <el-table-column prop="Hsxx_Name" align="left" fixed label="门店名称" width="230px"></el-table-column>
                        <el-table-column prop="Hsxx_Name_jch" align="left" label="门店别名" width="230px"></el-table-column>
                        <el-table-column prop="Hsxx_FR" align="left" label="法人" width="200px"></el-table-column>
                        <el-table-column prop="Hsxx_Tel" align="left" label="电话" width="200px"></el-table-column>
                        <el-table-column prop="Hsxx_YB" align="left" label="邮编" width="180px"></el-table-column>
                        <el-table-column prop="Hsxx_Fax" align="left" label="传真" width="180px"></el-table-column>
                        <el-table-column prop="Hsxx_City" align="left" label="所属城市" width="200px"></el-table-column>
                        <el-table-column prop="Hsxx_Add" align="left" label="详细地址" width="400px" fixed="right"></el-table-column>
                      </el-table>
                      <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                        </el-pagination>
                      </div>
                    </div>
                  </el-col>
                </template>
              </el-tab-pane>
              <!--私教禁用时间-->
              <el-tab-pane label="私教禁用时间" name="forbidden">
                <template>
                  <el-col :span="24" class="room-main">
                    <div class="add">
                      <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible2 = true">添加禁用时间</el-button>
                      <template>
                        <el-dialog title="添加新的禁用时间" :append-to-body="true" :visible.sync="dialogFormVisible2">
                          <!--添加门店-->
                          <el-form :model="ruleForm3" ref="ruleForm3" label-width="100px">
                            <el-form-item label="开始日期:" prop="startdate" :label-width="formLabelWidth">
                              <el-col :span="22">
                                <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm3.startdate" type="date" placeholder="选择开始日期" style="width:100%"></el-date-picker>
                              </el-col>
                            </el-form-item>
                            <el-form-item label="结束日期:" prop="enddate" :label-width="formLabelWidth">
                              <el-col :span="22">
                                <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm3.enddate" type="date" placeholder="选择结束日期" style="width:100%"></el-date-picker>
                              </el-col>
                            </el-form-item>
                            <el-form-item label="开始时间:" prop="starttime" :label-width="formLabelWidth">
                              <el-col :span="22">
                                <el-time-picker value-format="HH:mm:ss" v-model="ruleForm3.starttime" :picker-options="{selectableRange: '18:30:00 - 20:30:00'}" placeholder="选择开始时间" style="width:100%"></el-time-picker>
                              </el-col>
                            </el-form-item>
                            <el-form-item label="结束时间:" prop="endtime" :label-width="formLabelWidth">
                              <el-col :span="22">
                                <el-time-picker value-format="HH:mm:ss" v-model="ruleForm3.endtime" :picker-options="{selectableRange: '18:30:00 - 20:30:00'}" placeholder="选择结束时间" style="width:100%"></el-time-picker>
                              </el-col>
                            </el-form-item>
                            <el-form-item class="dialog-footer">
                              <el-col :span="24" style="display: flex;justify-content: flex-end;">
                                <el-button @click="resetforbidden('ruleForm3')">重置</el-button>
                                <el-button type="primary" @click="addforbidden('ruleForm3')" :loading="addLoading" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                              </el-col>
                            </el-form-item>
                          </el-form>
                        </el-dialog>
                      </template>
                    </div>
                    <div class="add2">
                      <el-button type="text" class="p" @click="Deltime">删除禁用时间</el-button>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="table-room">
                      <el-table v-loading="loading" ref="singleTable"  @current-change="handleCurrentChange3" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
                        <el-table-column align="center" prop="radio2" fixed width="70px">
                          <template slot-scope="scope">
                            <el-radio class="radio" v-model="radio2" :label="scope.$index" @change.native="getCurrentRow2(scope.$index)">&nbsp;</el-radio>
                          </template>
                        </el-table-column>
                        <el-table-column prop="StartDate" align="left" fixed label="开始日期"></el-table-column>
                        <el-table-column prop="EndDate" align="left" label="结束日期"></el-table-column>
                        <el-table-column prop="StartTime" align="left" label="开始时间"></el-table-column>
                        <el-table-column prop="EndTime" align="left" label="结束时间"></el-table-column>
                      </el-table>
                      <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData2.length">
                        </el-pagination>
                      </div>
                    </div>
                  </el-col>
                </template>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
export default {
  name: "individualcenter",
  inject: ["reload"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm2.passWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      item: "",
      imageUrl: "",
      user: "",
      radio: true,
      radio2: true,
      value1: "",
      loading: false,
      addLoading: false,
      formLabelWidth: "130px",
      downIcon: true,
      downIcon2: false,
      fileList: [],
      downIcon3: false,
      pwdType: "text", // 密码类型
      pwdType2: "password", // 密码类型
      pwdType3: "password", // 密码类型
      openeye: require("@/assets/eye.png"), //图片地址
      openeye2: require("@/assets/closed.png"), //图片地址
      currentPage: 1,
      pagesize: 10,
      activeName: "first",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      ruleForm: {
        roomname: "", //门店名称
        roombyname: "", //门店别名
        tel: "", //电话
        zipcode: "", //邮编
        corporation: "", //法人
        portraiture: "", //传真
        homecity: "", //城市
        detadaddress: "" //详细地址
      },
      ruleForm3: {
        startdate: "", //开始日期
        enddate: "", //结束日期
        starttime: "", //开始时间
        endtime: "" //结束时间
      },
      rules: {
        roomname: validate.roomname, //门店名称
        roombyname: validate.roombyname, //门店别名
        tel: validate.tel, //电话号
        zipcode: validate.zipcode, //邮编
        corporation: validate.corporation, //法人
        portraiture: validate.portraiture, //法人
        homecity: validate.homecity, //城市
        detadaddress: validate.detadaddress //地址
      },
      ruleForm2: {
        pass: "", //原密码
        passWord: "", //新密码
        checkPass: "" //确认新密码
      },
      rules2: {
        pass: [{ required: true, trigger: "blur", message: "请输入原密码" }], //原密码
        passWord: [{ validator: validatePass, trigger: "blur" }], //新密码
        checkPass: [{ validator: validatePass2, trigger: "blur" }] //确认新密码
      },
      tableData: [], //我的门店
      tableData2: [], //私教禁用时间
      a: ""
    };
  },
  //获取门店表格信息
  created: function() {
    let _this = this;
    this.getUser();
    //获取门店信息
    setTimeout(() => {
      _this.loading = true;
      requestLogin("/allClub", {}, "get")
        .then(function(res) {
          _this.loading = false;
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
    }, 1000);
    //获取私教禁用时间
    setTimeout(() => {
      _this.loading = true;
      requestLogin("/PersonalCenter/create", {}, "get")
        .then(function(res) {
          _this.loading = false;
          _this.tableData2 = res;
        })
        .catch(error => {
          if (error.res) {
            this.$message({
              message: "获取数据失败",
              type: "error"
            });
          }
        });
    }, 1500);
    this.user = JSON.parse(sessionStorage.getItem("userInfo"));
    let { role: [a, b, c] } = this.user;
    this.a = a;
    console.log(a, b, c);
  },
  methods: {
    //获取个人资料
    getUser() {
      let _this = this;
      _this.loading = true;
      requestLogin("/PersonalCenter", {}, "get")
        .then(function(res) {
          _this.loading = false;
          _this.item = res;
          let { Photo } = res;
          _this.imageUrl = Photo;
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
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传1张图片!"
      });
    },
    //打开图片上传
    submitUpload: function(content) {
      this.addLoading = true;
      this.file = content.file;
      let formData = new FormData();
      formData.append("file", this.file);
      requestLogin("/uploadStaffPhoto", formData, "post")
        .then(res => {
          this.addLoading = false;
          this.$message({
            message: "更换成功",
            type: "success"
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
    },
    //获取表格列表
    rowClick(row, event, column) {
      this.radio = row.index;
      this.currentSelectRow = row;
      this.radio = this.tableData.indexOf(row);
      this.radio2 = this.tableData2.indexOf(row);
    },
       getCurrentRow(val){
          console.log(val);
     },
       getCurrentRow2(val){
          console.log(val);
     },
        handleCurrentChange2(val,index) {
        this.currentRow = val;
     },
        handleCurrentChange3(val,index) {
        this.currentRow = val;
     },
    //删除禁用时间
    Deltime() {
      let _this = this;
      if (!this.currentSelectRow) {
        this.$message({
          message: "请先选择数据!",
          type: "warning"
        });
        return;
      }
      this.$confirm("确认删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.loading = true;
          console.log(_this.currentSelectRow.id);
          requestLogin(
            "/PersonalCenter/" + _this.currentSelectRow.id,
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
    },
    //修改密码
    Modifypsd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            var loginParams = {
              oldPassword: this.ruleForm2.pass, //原密码
              password: this.ruleForm2.passWord //新密码
            };
            requestLogin("/PersonalCenter", loginParams, "post")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "修改成功",
                  type: "success"
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
          });
        } else {
          this.$message({
            message: "修改失败!",
            type: "error"
          });
          return false;
        }
      });
    },
    //添加门店
    addroom(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            var loginParams = {
              Hsxx_Name: this.ruleForm.roomname, //会馆名称
              Hsxx_Name_jch: this.ruleForm.roombyname, //会馆别名
              Hsxx_City: this.ruleForm.homecity, //城市
              Hsxx_Add: this.ruleForm.detadaddress, //地址
              Hsxx_YB: this.ruleForm.zipcode, //邮编
              Hsxx_FR: this.ruleForm.corporation, //法人
              Hsxx_Tel: this.ruleForm.tel, //电话
              Hsxx_Fax: this.ruleForm.portraiture //传真
            };
            requestLogin("/addClub", loginParams, "post")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "添加成功",
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
          this.$message({
            message: "添加失败!",
            type: "error"
          });
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //添加新的禁用时间
    addforbidden(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            var loginParams = {
              StartDate: this.ruleForm3.startdate, //开始日期
              EndDate: this.ruleForm3.enddate, //结束日期
              StartTime: this.ruleForm3.starttime, //开始时间
              EndTime: this.ruleForm3.endtime //结束时间
            };
            requestLogin("/addDisabledTime", loginParams, "post")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible2 = false;
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
          this.$message({
            message: "添加失败!",
            type: "error"
          });
          return false;
        }
      });
    },
    //重置私教时间
    resetforbidden(formName) {
      this.$refs[formName].resetFields();
    },
    radiochange(row) {
      console.log(`当前: ${row}`);
    },
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(event.target.getAttribute("id"));
    },
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
    },
    showToggle: function() {
      this.downIcon = !this.downIcon;
    },
    showToggle2: function() {
      this.downIcon2 = !this.downIcon2;
    },
    showToggle3: function() {
      this.downIcon3 = !this.downIcon3;
    },
    changeType() {
      this.pwdType = this.pwdType === "password" ? "text" : "password";
    },
    changeType2() {
      this.pwdType2 = this.pwdType2 === "password" ? "text" : "password";
    },
    changeType3() {
      this.pwdType3 = this.pwdType3 === "password" ? "text" : "password";
    }
  }
};
</script>
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
.item_bock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 94px;
  width: 300px;
  padding: 0px 24px 0px 38px;
  border-bottom: 1px solid #f7f7f7;
  background: #fff;
}
.head_p {
  height: 132px;
  margin-left: 70px;
}

.hiddenInput {
  display: none;
}
.caption {
  color: #8f8f8f;
  font-size: 22px;
  height: 37px;
}
.practice-main {
  height: 140px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  .breadcrumb {
    margin: 17px 20px auto;
  }
  .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: flex-start;
    .weber-img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .weber-left {
      display: inline-grid;
      padding-left: 20px;
      .weber-span {
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 15px;
          height: 15px;
          padding-left: 5px;
        }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
  }
}
.center-main {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  display: inline-block;
  .handback {
    height: 450px;
    .hand-left {
      .left-table {
        width: 100%;
        height: 100%;
        border: solid 1px #e8e8e8;
        margin-left: 30px;
        margin-top: 20px;
        .left-table-main {
          height: 50px;
          margin-top: 1px;
          .table-hh {
            height: 50px;
            line-height: 50px;
            text-align: left;
            text-indent: 20px;
            background: #edfaf5;
            span {
              color: #262626;
              font-size: 14px;
            }
          }
          .table-gg {
            height: 50px;
            line-height: 50px;
            text-align: left;
            text-indent: 20px;
            span {
              color: #262626;
              font-size: 14px;
            }
            .gg-span {
              color: #23c585;
            }
          }
        }
      }
    }
    .hand-right {
      height: 100%;
      .head_img {
        margin-top: 4%;
        img {
          width: 32%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .setting_right {
        height: 35px;
        margin-top: 4%;
        .successbut {
          width: 17%;
          height: 35px;
          padding: 10px;
        }
      }
    }
  }
  .center-two {
    margin: 20px 80px auto;
    width: 70%;
    height: 440px;
    display: inline-block;
    position: relative;
    .primary {
      display: flex;
      justify-content: flex-start;
      margin-top: 35px;
    }
    .eye {
      width: 40px;
      height: 33px;
      background: #f5f5f5;
      position: absolute;
      right: 1px;
      top: 4px;
      img {
        width: 17px;
        height: 16px;
        display: inline-block;
        margin-top: 10px;
      }
    }
    .closed {
      width: 40px;
      height: 32px;
      background: #f5f5f5;
      position: absolute;
      right: 1px;
      top: 5px;
      img {
        width: 15px;
        height: 13px;
        display: inline-block;
      }
    }
  }
  .room-main {
    height: 60px;
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
        font-size: 16px;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-top: -5px;
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
        font-size: 16px;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-top: -5px;
      }
    }
  }
  .table-room {
    width: 98%;
    margin: 0px auto;
    .block {
      margin: 15px auto;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
