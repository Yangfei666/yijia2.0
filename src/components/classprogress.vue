<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>教培管理</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/Teaching/teachingcourse' }">教培课程</el-breadcrumb-item>
              <el-breadcrumb-item>正在上课</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="practice-head">
          <el-col :span="24" class="weber">
            <span class="weber-span">正在上课</span>
            <div class="main-right">
              <div class="block3">
                <el-form ref="form" :model="form" label-width="85px">
                  <el-col :span="20" style="height:50px">
                    <el-form-item label="当前教培:">
                      <el-col :span="24">
                        <el-select v-if="Coach.length > 0" v-model="form.train" placeholder="请选择" style="width:230px" @change="Selectchange3">
                          <el-option v-for="item in Coach" :key="item.id" :label="item.theme" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-form>
              </div>
              <div class="block4">
                  <div class="add">
                  <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible1 = true" :disabled ='disabled'>添加学员</el-button>
                  <template>
                    <el-dialog title="添加学员" :append-to-body="true" :visible.sync="dialogFormVisible1">
                    <!--添加学员-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" @submit.native.prevent>
                      <el-form-item label="学员姓名:" prop="name" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model.trim="ruleForm.name" placeholder="汉字、字母、数字和下划线及逗号句号组成、长度2-6"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="学员电话:" prop="tel" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model.trim="ruleForm.tel" maxlength="11" placeholder="请输入11位手机号码"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="学员性别:" prop="sex" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-radio-group v-model="ruleForm.sex" @change="ChangeSex">
                            <el-radio label="1" value="女">女</el-radio>
                            <el-radio label="2" value="男">男</el-radio>
                          </el-radio-group>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="归属教培:" prop="teachId" :label-width="formLabelWidth">
                        <el-col :span="22">
                           <el-input v-model.trim="this.$route.query.id" :disabled="true"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="班次:" prop="shift" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-radio-group v-model="ruleForm.shift" @change="Changeshift">
                            <el-radio label="1" value="全天班">全天班</el-radio>
                            <el-radio label="2" value="周末班">周末班</el-radio>
                            <el-radio label="3" value="晚班">晚班</el-radio>
                          </el-radio-group>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="缴费:" prop="money" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model.trim="ruleForm.money" placeholder="0~99999之间的数字"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="身份证照片:" prop="identityPhoto" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-upload class="upload-demo" ref="upload" action=" " :file-list="fileList" :limit='1' :on-exceed='uploadOverrun' :http-request='submitUpload1' list-type="picture" :auto-upload="true">
                            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
                            <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                          </el-upload>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="合同照片:" prop="contractphoto" :label-width="formLabelWidth">
                        <el-col :span="22">
                           <el-upload class="upload-demo" ref="upload" action=" " :file-list="fileList2" :limit='1' :on-exceed='uploadOverrun' :http-request='submitUpload2' list-type="picture" :auto-upload="true">
                            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
                            <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                          </el-upload>
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
                  <el-button type="text" class="p" @click="viewall">查看所有学员</el-button>
                  </div>
              </div>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-col :span="24">
      <div class="staff-main">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全天班" name="Fulldayshift">
            <template>
                <div class="practice-center">
                <el-row>
                <el-col :span="24">
                    <div class="purple">
                    <div class="add">
                        <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加课程</el-button>
                    </div>
                    <div class="add">
                        <el-button type="text" class="p" @click="editlunbo">编辑课程</el-button>
                    </div>
                    <div class="add2">
                        <el-button type="text" class="p" @click="delexper">删除课程</el-button>
                    </div>
                    </div>
                    <div class="group-right">
                        <el-date-picker v-model="dateValue" @change="changeWeek" :clearable="false" type="week" format="yyyy 第 WW 周" placeholder="选择周" :firstDayOfWeek="1" style="margin-top:-2px;width:153px"></el-date-picker>
                        <el-select v-model="value" placeholder="复制课表" style="width:140px;margin-top:-2px" @change="Changeselect">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </el-col>
                </el-row>
            </div>
              <el-col :span="24" v-if="coachData.groupList !=null">
                <el-table v-loading="loading" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="coachData.groupList.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
                  <el-table-column prop="curriculum_subject.kcName" align="left" label="课程名称" fixed></el-table-column>
                  <el-table-column prop="Stime" align="left" label="开始时间"></el-table-column>
                  <el-table-column prop="Etime" align="left" label="结束时间"></el-table-column>
                  <el-table-column prop="kcIsPrivate" align="left" label="课程分类"></el-table-column>
                  <el-table-column prop="staff_info.YGXX_NAME" align="left" label="教练"></el-table-column>
                  <el-table-column prop="group_curriculum_appointment_count" align="left" label="上课人数"></el-table-column>
                  <el-table-column prop="hand" align="left" label="手牌"></el-table-column>
                  <el-table-column prop="kcStime" align="left" label="开课日期" fixed="right"></el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="coachData.groupList.length">
                  </el-pagination>
                </div>
              </el-col>
            </template>
          </el-tab-pane>
          <el-tab-pane label="周末班" name="Weekendshift">
            <template>
                <div class="practice-center">
                <el-row>
                <el-col :span="24">
                    <div class="purple">
                    <div class="add">
                        <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加课程</el-button>
                    </div>
                    <div class="add">
                        <el-button type="text" class="p" @click="editlunbo">编辑课程</el-button>
                    </div>
                    <div class="add2">
                        <el-button type="text" class="p" @click="delexper">删除课程</el-button>
                    </div>
                    </div>
                     <div class="group-right">
                        <el-date-picker v-model="dateValue" @change="changeWeek" :clearable="false" type="week" format="yyyy 第 WW 周" placeholder="选择周" :firstDayOfWeek="1" style="margin-top:-2px;width:153px"></el-date-picker>
                        <el-select v-model="value" placeholder="复制课表" style="width:140px;margin-top:-2px" @change="Changeselect">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </el-col>
                </el-row>
            </div>
              <el-col :span="24" v-if="coachData.privateList != null">
                <el-table v-loading="loading" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="coachData.privateList.slice((currentPage2-1)*pagesize2,currentPage2*pagesize2)" style="width: 100%" @row-click="rowClick">
                  <el-table-column width="20px"></el-table-column>
                  <el-table-column prop="private_curriculum_appointment.isExperience" align="left" label="客户类型"></el-table-column>
                  <el-table-column prop="private_curriculum_appointment.member_customers.HYName" align="left" label="客户姓名">
                    <template slot-scope="scope">
                      <span v-if="scope.row.private_curriculum_appointment.isExperience == '会员客户'">{{scope.row.private_curriculum_appointment.member_customers.HYName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="private_curriculum_appointment.membership_card.card_type.CTName" align="left" label="上课卡种">
                    <template slot-scope="scope">
                      <span v-if="scope.row.private_curriculum_appointment.isExperience == '会员客户'">{{scope.row.private_curriculum_appointment.membership_card.card_type.CTName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Stime" align="left" label="开始时间"></el-table-column>
                  <el-table-column prop="Etime" align="left" label="结束时间"></el-table-column>
                  <el-table-column prop="private_curriculum_appointment.deductNum" align="left" label="扣卡次数"></el-table-column>
                  <el-table-column prop="staff_info.YGXX_NAME" align="left" label="教练"></el-table-column>
                  <el-table-column prop="hand" align="left" label="手牌"></el-table-column>
                  <el-table-column prop="kcStime" align="left" label="开课日期"></el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize2" layout="total, sizes, prev, pager, next, jumper" :total="coachData.privateList.length">
                  </el-pagination>
                </div>
              </el-col>
            </template>
          </el-tab-pane>
          <el-tab-pane label="晚班" name="Eveningshift">
            <template>
                <div class="practice-center">
                <el-row>
                <el-col :span="24">
                    <div class="purple">
                    <div class="add">
                        <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加课程</el-button>
                    </div>
                    <div class="add">
                        <el-button type="text" class="p" @click="editlunbo">编辑课程</el-button>
                    </div>
                    <div class="add2">
                        <el-button type="text" class="p" @click="delexper">删除课程</el-button>
                    </div>
                    </div>
                     <div class="group-right">
                        <el-date-picker v-model="dateValue" @change="changeWeek" :clearable="false" type="week" format="yyyy 第 WW 周" placeholder="选择周" :firstDayOfWeek="1" style="margin-top:-2px;width:153px"></el-date-picker>
                        <el-select v-model="value" placeholder="复制课表" style="width:140px;margin-top:-2px" @change="Changeselect">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </el-col>
                </el-row>
            </div>
              <el-col :span="24" v-if="coachData.privateList != null">
                <el-table v-loading="loading" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="coachData.privateList.slice((currentPage2-1)*pagesize2,currentPage2*pagesize2)" style="width: 100%" @row-click="rowClick">
                  <el-table-column width="20px"></el-table-column>
                  <el-table-column prop="private_curriculum_appointment.isExperience" align="left" label="客户类型"></el-table-column>
                  <el-table-column prop="private_curriculum_appointment.member_customers.HYName" align="left" label="客户姓名">
                    <template slot-scope="scope">
                      <span v-if="scope.row.private_curriculum_appointment.isExperience == '会员客户'">{{scope.row.private_curriculum_appointment.member_customers.HYName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="private_curriculum_appointment.membership_card.card_type.CTName" align="left" label="上课卡种">
                    <template slot-scope="scope">
                      <span v-if="scope.row.private_curriculum_appointment.isExperience == '会员客户'">{{scope.row.private_curriculum_appointment.membership_card.card_type.CTName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Stime" align="left" label="开始时间"></el-table-column>
                  <el-table-column prop="Etime" align="left" label="结束时间"></el-table-column>
                  <el-table-column prop="private_curriculum_appointment.deductNum" align="left" label="扣卡次数"></el-table-column>
                  <el-table-column prop="staff_info.YGXX_NAME" align="left" label="教练"></el-table-column>
                  <el-table-column prop="hand" align="left" label="手牌"></el-table-column>
                  <el-table-column prop="kcStime" align="left" label="开课日期"></el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize2" layout="total, sizes, prev, pager, next, jumper" :total="coachData.privateList.length">
                  </el-pagination>
                </div>
              </el-col>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import moment from "moment";
export default {
  name: "classprogress",
  inject: ["reload"],
  data() {
    return {
      form: {
        train: ""
      },
      activeName: "Fulldayshift",
      value1: "",
      dateValue:"",
      value: "",
      disabled:false,
      dialogFormVisible1:false,
      options: [
        {
          value: "now",
          label: "复制本周"
        },
        {
          value: "month",
          label: "复制本月"
        }
      ],
      ruleForm: {
        name: "", //姓名
        tel: "", //手机号
        sex: "", //性别
        teachId: "", //归属教培
        shift: "", //班次
        money: "", //缴费
        identityPhoto: "", //身份证照片
        contractphoto: "", //合同照片
      },
      rules: {
        name: { required: true, message: '请输入学员姓名', trigger: 'blur' },
        sex: { required: true, message: '请选择学员性别', trigger: 'change' },
        tel: { required: true, message: '请输入学员电话', trigger: 'blur' },
        // teachId: { required: true, message: '请输入归属教培', trigger: 'blur' },
        shift: { required: true, message: '请选择班次', trigger: 'change' },
        money: { required: true, message: '请输入缴费', trigger: 'blur' },
        // identityPhoto: { required: true, message: '请选择身份证照片'},
        // contractphoto: { required: true, message: '请选择合同照片', trigger: 'blur' },
      },
      value4: moment(new Date()).format("YYYY-MM"),
      value5: "2018",
      formLabelWidth: "130px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      loading: false,
      Coach: [],
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      currentPage2: 1,
      pagesize2: 10,
      jskey: "",
      fileList: [],
      fileList2: [],
      Coachclass: [], //全部数据
      coachData: [] //当前选中的教练数据
    };
  },
  mounted() {
      this.getCoachdata();
      this.gettabledata();
      this.value4 = this.getCurrentDateTime();
  },
  created () {
    console.log(this.$route.query.id)
    console.log(this.$route.query.shibie)
  },
  methods: {
     //身份证照片
    submitUpload1: function(content) {
      this.file = content.file;
    },
     //合同照片
    submitUpload2: function(content) {
      this.file2 = content.file;
    },
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传1张图片!"
      });
    },
    //当前教培下拉
    getCoachdata() {
      let _this = this;
      requestLogin("/teachInfo/onGoing", {}, "get")
        .then(res => {
          _this.Coach = res.data;
        })
        .catch(error => {
          let { response: { data: { errorCode, msg }}} = error;
          if (errorCode != 0) {
            this.$message({
              message: msg,
              type: "error"
            });
            return;
          }
        });
    },
    //表格数据
    gettabledata() {
      let _this = this;
      requestLogin("/teachInfo/"+_this.$route.query.id, {}, "get")
        .then(res => {
          _this.tableData = res;
        })
        .catch(error => {
          let { response: { data: { errorCode, msg }}} = error;
          if (errorCode != 0) {
            this.$message({
              message: msg,
              type: "error"
            });
            return;
          }
        });
    },
    //添加新学员
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let formData = new FormData();
            formData.append("name", _this.ruleForm.name); //姓名
            formData.append("tel", _this.ruleForm.tel); //电话
            formData.append("sex", _this.ruleForm.sex); //性别
            formData.append("teachId", _this.$route.query.id); //归属教培
            formData.append("shift", _this.ruleForm.shift); //班次
            formData.append("money", _this.ruleForm.money); //班费
            formData.append("identity_Photo", _this.file); //身份证照片
            formData.append("contract_Photo", _this.file2); //合同照片
            requestLogin(
              "/teachStudent",
              formData,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                _this.reload();
                _this.resetForm(formName);
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
      Changeselect(val) {
    },
    ChangeSex(val) {
      console.log(val)
    },
    Changeshift(val){
      console.log(val);
    },
       // 改变时间
    changeWeek(val) {
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCurrentDateTime() {
      return moment(new Date()).format("YYYY-MM");
    },
    //课程分类
    formatkcIs(row, column, cellValue) {
      if (cellValue === 1) {
        return "私教";
      } else if (cellValue === 0) {
        return "团课";
      }
    },
    // 根据数组下标获取单个教练的课程数据
    // getCoachData(num) {
    //   this.coachData = this.Coachclass[num];
    // },
    editlunbo() {
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择列表!", type: "warning" });
      }
    },
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
    //教练上课记录
    getstaffdate() {
      let _this = this;
      requestLogin("/chart/getCoachData/" + _this.value4, {}, "get")
        .then(function(res) {
          let Coachclass = Object.values(res.data);
          let Coach = Object.keys(res.data);
          _this.Coach = Object.keys(res.data);
          _this.Coachclass = Object.values(res.data);
          let num = 0;
          if (_this.jskey != "") {
            for (var i = 0; i < _this.Coach.length; i++) {
              if (_this.jskey == Coach[i]) {
                num = i;
              }
            }
          }
          // 默认第一个教练的上课记录
          _this.getCoachData(num);
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
    change1(val) {
      let year = this.value4.split("-")[0];
      if (year !== this.value5) {
        this.value5 = year;
      }
      this.getstaffdate();
    },
    change2(val) {
      let year = this.value4.split("-")[0];
      let month = this.value4.split("-")[1];
      if (year !== this.value5) {
        this.value4 = `${this.value5}-${month}`;
      }
      this.getstaffdate();
    },
    Selectchange3(val) {
      this.jskey = val;
      let num = 0;
      if (this.jskey != "") {
        for (var i = 0; i < this.Coach.length; i++) {
          if (this.jskey == this.Coach[i]) {
            num = i;
          }
        }
      }
      console.log(val);
      // this.getCoachData(num);
    },
    rowClick(row, event, column) {
      this.currentSelectRow = row;
    },
    handleClick(tab, event) {},
    getCurrentRow(val) {},
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange2(size) {
      this.pagesize2 = size;
    },
    handleCurrentChange2(currentPage2) {
      this.currentPage2 = currentPage2;
    },
    viewall(){
        this.$router.push({
        path: "/Teaching/teachingcourse/classprogress/viewall",
        query: {
          id: this.$route.query.id,
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.practice-main {
  height: 60px;
  background: #fff;
  border-top: 1px solid #ebebeb;
  .breadcrumb {
    margin: 23px 20px auto;
  }
}
.practice-head {
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  .weber {
    position: relative;
    display: flex;
    height: 50px;
    line-height: 45px;
    .weber-span {
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      font-family: PingFang-SC-Regular;
      text-indent: 20px;
    }
    .main-right {
      position: absolute;
      left: 10%;
      z-index: 2;
      top: 2px;
      width:88%;
      display: flex;
      justify-content: space-between;
      .block3 {
        height: 50px;
        line-height: 50px;
        display: flex;
        float: left;
        .el-button--primary {
          height: 35px;
          line-height: 8px;
        }
      }
      .block4{
          display:flex;
          width:300px;
          .add {
            border: 1px solid #00bc71;
            width: 45%;
            height: 35px;
            border-radius: 4px;
            line-height: 0px;
            margin-top: 0px;
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
      }
      }
    }
  }
}
.staff-main {
  width: 97%;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  height: 100%;
  display: inline-block;
  margin: 20px auto;
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
    .group-right{
    display: flex;
    justify-content: flex-end;
    margin-top: -57px;
    margin-right: 15px;
    }
  }
}
// @media screen and (min-width: 768px) and (max-width: 992px) {
//   .practice-head {
//     height: 50px;
//     background: #fff;
//     border-bottom: 1px solid #e8e8e8;
//     .weber {
//       position: relative;
//       display: flex;
//       height: 50px;
//       line-height: 45px;
//       .weber-span {
//         font-size: 20px;
//         font-weight: normal;
//         font-stretch: normal;
//         letter-spacing: 0px;
//         color: #262626;
//         font-family: PingFang-SC-Regular;
//         text-indent: 20px;
//       }
//       .main-right {
//         width: 67% !important;
//         position: absolute;
//         right: 2% !important;
//         z-index: 2;
//         top: 0px;
//         .block2 {
//           height: 32px;
//           line-height: 32px;
//           height: 50px;
//           line-height: 37px;
//           float: right;
//           .dsd {
//             line-height: 34px;
//             text-align: right;
//           }
//           .block1 {
//             line-height: 38px;
//           }
//           .el-radio-button__inner {
//             color: #fff;
//             background-color: #00bc71;
//             border-color: #00bc71;
//             -webkit-box-shadow: -1px 0 0 0 #00bc71;
//             box-shadow: -1px 0 0 0 #00bc71;
//           }
//         }
//         .el-select {
//           width: 154px !important;
//         }
//         .el-date-editor {
//           width: 120px !important;
//         }
//         .block3 {
//           height: 50px;
//           line-height: 50px;
//           display: flex;
//           float: left;
//           .el-button--primary {
//             height: 35px;
//             line-height: 8px;
//           }
//         }
//       }
//     }
//   }
// }
// @media screen and (min-width: 992px) and (max-width: 1280px) {
//   .practice-head {
//     height: 50px;
//     background: #fff;
//     border-bottom: 1px solid #e8e8e8;
//     .weber {
//       position: relative;
//       display: flex;
//       height: 50px;
//       line-height: 45px;
//       .weber-span {
//         font-size: 20px;
//         font-weight: normal;
//         font-stretch: normal;
//         letter-spacing: 0px;
//         color: #262626;
//         font-family: PingFang-SC-Regular;
//         text-indent: 20px;
//       }
//       .main-right {
//         width: 67% !important;
//         position: absolute;
//         right: 2% !important;
//         z-index: 2;
//         top: 0px;
//         .block2 {
//           height: 32px;
//           line-height: 32px;
//           height: 50px;
//           line-height: 37px;
//           float: right;
//           .dsd {
//             line-height: 34px;
//             text-align: right;
//           }
//           .block1 {
//             line-height: 38px;
//           }
//           .el-radio-button__inner {
//             color: #fff;
//             background-color: #00bc71;
//             border-color: #00bc71;
//             -webkit-box-shadow: -1px 0 0 0 #00bc71;
//             box-shadow: -1px 0 0 0 #00bc71;
//           }
//         }
//         .el-select {
//           width: 200px !important;
//         }
//         .el-date-editor {
//           width: 130px !important;
//         }
//         .block3 {
//           height: 50px;
//           line-height: 50px;
//           display: flex;
//           float: left;
//           .el-button--primary {
//             height: 35px;
//             line-height: 8px;
//           }
//         }
//       }
//     }
//   }
// }
// @media screen and (min-width: 1280px) and (max-width: 1440px) {
//   .practice-head {
//     height: 50px;
//     background: #fff;
//     border-bottom: 1px solid #e8e8e8;
//     .weber {
//       position: relative;
//       display: flex;
//       height: 50px;
//       line-height: 45px;
//       .weber-span {
//         font-size: 20px;
//         font-weight: normal;
//         font-stretch: normal;
//         letter-spacing: 0px;
//         color: #262626;
//         font-family: PingFang-SC-Regular;
//         text-indent: 20px;
//       }
//       .main-right {
//         width: 67% !important;
//         position: absolute;
//         right: 2% !important;
//         z-index: 2;
//         top: 0px;
//         .block2 {
//           height: 32px;
//           line-height: 32px;
//           height: 50px;
//           line-height: 37px;
//           float: right;
//           .dsd {
//             line-height: 34px;
//             text-align: right;
//           }
//           .block1 {
//             line-height: 38px;
//           }
//           .el-radio-button__inner {
//             color: #fff;
//             background-color: #00bc71;
//             border-color: #00bc71;
//             -webkit-box-shadow: -1px 0 0 0 #00bc71;
//             box-shadow: -1px 0 0 0 #00bc71;
//           }
//         }
//         .el-select {
//           width: 240px !important;
//         }
//         .el-date-editor {
//           width: 150px !important;
//         }
//         .block3 {
//           height: 50px;
//           line-height: 50px;
//           display: flex;
//           float: left;
//           .el-button--primary {
//             height: 35px;
//             line-height: 8px;
//           }
//         }
//       }
//     }
//   }
// }
// @media screen and (min-width: 1440px) and (max-width: 1680px) {
//   .practice-head {
//     height: 50px;
//     background: #fff;
//     border-bottom: 1px solid #e8e8e8;
//     .weber {
//       position: relative;
//       display: flex;
//       height: 50px;
//       line-height: 45px;
//       .weber-span {
//         font-size: 20px;
//         font-weight: normal;
//         font-stretch: normal;
//         letter-spacing: 0px;
//         color: #262626;
//         font-family: PingFang-SC-Regular;
//         text-indent: 20px;
//       }
//       .main-right {
//         width: 67% !important;
//         position: absolute;
//         right: 2% !important;
//         z-index: 2;
//         top: 0px;
//         .block2 {
//           height: 32px;
//           line-height: 32px;
//           height: 50px;
//           line-height: 37px;
//           float: right;
//           .dsd {
//             line-height: 34px;
//             text-align: right;
//           }
//           .block1 {
//             line-height: 38px;
//           }
//           .el-radio-button__inner {
//             color: #fff;
//             background-color: #00bc71;
//             border-color: #00bc71;
//             -webkit-box-shadow: -1px 0 0 0 #00bc71;
//             box-shadow: -1px 0 0 0 #00bc71;
//           }
//         }
//         .el-select {
//           width: 250px !important;
//         }
//         .el-date-editor {
//           width: 150px !important;
//         }
//         .block3 {
//           height: 50px;
//           line-height: 50px;
//           display: flex;
//           float: left;
//           .el-button--primary {
//             height: 35px;
//             line-height: 8px;
//           }
//         }
//       }
//     }
//   }
// }
// @media screen and (min-width: 1680px) and (max-width: 1920px) {
//   .practice-head {
//     height: 50px;
//     background: #fff;
//     border-bottom: 1px solid #e8e8e8;
//     .weber {
//       position: relative;
//       display: flex;
//       height: 50px;
//       line-height: 45px;
//       .weber-span {
//         font-size: 20px;
//         font-weight: normal;
//         font-stretch: normal;
//         letter-spacing: 0px;
//         color: #262626;
//         font-family: PingFang-SC-Regular;
//         text-indent: 20px;
//       }
//       .main-right {
//         width: 67% !important;
//         position: absolute;
//         right: 2% !important;
//         z-index: 2;
//         top: 0px;
//         .block2 {
//           height: 32px;
//           line-height: 32px;
//           height: 50px;
//           line-height: 37px;
//           float: right;
//           .dsd {
//             line-height: 34px;
//             text-align: right;
//           }
//           .block1 {
//             line-height: 38px;
//           }
//           .el-radio-button__inner {
//             color: #fff;
//             background-color: #00bc71;
//             border-color: #00bc71;
//             -webkit-box-shadow: -1px 0 0 0 #00bc71;
//             box-shadow: -1px 0 0 0 #00bc71;
//           }
//         }
//         .el-select {
//           width: 260px !important;
//         }
//         .el-date-editor {
//           width: 160px !important;
//         }
//         .block3 {
//           height: 50px;
//           line-height: 50px;
//           display: flex;
//           float: left;
//           .el-button--primary {
//             height: 35px;
//             line-height: 8px;
//           }
//         }
//       }
//     }
//   }
// }
// @media screen and (min-width: 1920px) and (max-width: 2048px) {
//   .practice-head {
//     height: 50px;
//     background: #fff;
//     border-bottom: 1px solid #e8e8e8;
//     .weber {
//       position: relative;
//       display: flex;
//       height: 50px;
//       line-height: 45px;
//       .weber-span {
//         font-size: 20px;
//         font-weight: normal;
//         font-stretch: normal;
//         letter-spacing: 0px;
//         color: #262626;
//         font-family: PingFang-SC-Regular;
//         text-indent: 20px;
//       }
//       .main-right {
//         width: 67% !important;
//         position: absolute;
//         right: 2% !important;
//         z-index: 2;
//         top: 0px;
//         .block2 {
//           height: 32px;
//           line-height: 32px;
//           height: 50px;
//           line-height: 37px;
//           float: right;
//           .dsd {
//             line-height: 34px;
//             text-align: right;
//           }
//           .block1 {
//             line-height: 38px;
//           }
//           .el-radio-button__inner {
//             color: #fff;
//             background-color: #00bc71;
//             border-color: #00bc71;
//             -webkit-box-shadow: -1px 0 0 0 #00bc71;
//             box-shadow: -1px 0 0 0 #00bc71;
//           }
//         }
//         .el-select {
//           width: 280px !important;
//         }
//         .el-date-editor {
//           width: 180px !important;
//         }
//         .block3 {
//           height: 50px;
//           line-height: 50px;
//           display: flex;
//           float: left;
//           .el-button--primary {
//             height: 35px;
//             line-height: 8px;
//           }
//         }
//       }
//     }
//   }
// }
</style>