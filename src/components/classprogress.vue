<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb" v-if="this.$route.query.shibie == 'shibie'">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>教培管理</el-breadcrumb-item>
              <el-breadcrumb-item>教培课程</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="breadcrumb" v-else>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>教培管理</el-breadcrumb-item>
              <el-breadcrumb-item>正在上课</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="practice-head">
          <el-col :span="24" class="weber">
            <span class="weber-span" v-if="this.$route.query.shibie == 'shibie'">教培课程</span>
            <span class="weber-span" v-else>正在上课</span>
            <div class="main-right">
              <div class="block3">
                <el-form ref="form" :model="form" label-width="85px">
                  <el-col :span="20" style="height:50px">
                    <el-form-item label="当前教培:">
                      <el-col :span="24" v-if="this.$route.query.shibie == 'shibie'">
                        <el-select v-model="form.train" placeholder="请选择" style="width:230px" @change="trainchange2">
                          <el-option v-for="item in Coach2" :key="item.id" :label="item.theme" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                       <el-col :span="24" v-else>
                        <el-select v-model="form.train2" placeholder="请选择" style="width:230px" @change="trainchange">
                          <el-option v-for="item in Coach" :key="item.id" :label="item.theme" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-form>
              </div>
              <div class="block4">
                  <div class="add">
                  <el-button type="text" class="p el-icon-plus" :disabled ='true' v-if="this.$route.query.shibie == 'shibie' && this.$route.query.endDay < this.$route.query.daydate">添加学员</el-button>
                  <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible1 = true" :disabled ='disabled' v-else>添加学员</el-button>
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
        <div class="group-right">
            <el-date-picker v-model="dateValue" @change="changeWeek" :clearable="false" type="week" format="yyyy 第 WW 周" placeholder="选择周" :firstDayOfWeek="1" style="margin-top:-2px;width:153px"></el-date-picker>
            <el-select v-model="value" placeholder="复制课表" style="width:140px;margin-top:-2px" @change="copyschedule">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全天班" name="Fulldayshift">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
              <el-tab-pane :label="'周一('+getsubstr('Monday')+')'" name="Monday">
                <Syllabus :floorGoods='tdlist' :weekDay='1' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周二('+getsubstr('Tuesday')+')'" name="Tuesday">
                <Syllabus :floorGoods='tdlist' :weekDay='2' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周三('+getsubstr('Wednesday')+')'" name="Wednesday">
                <Syllabus :floorGoods='tdlist' :weekDay='3' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周四('+getsubstr('Thursday')+')'" name="Thursday">
                <Syllabus :floorGoods='tdlist' :weekDay='4' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周五('+getsubstr('Friday')+')'" name="Friday">
                <Syllabus :floorGoods='tdlist' :weekDay='5' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周六('+getsubstr('Saturday')+')'" name="Saturday">
                <Syllabus :floorGoods='tdlist' :weekDay='6' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周日('+getsubstr('Sunday')+')'" name="Sunday">
                <Syllabus :floorGoods='tdlist' :weekDay='7' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="周末班" name="Weekendshift">
           <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
              <el-tab-pane :label="'周一('+getsubstr('Monday')+')'" name="Monday">
                <Syllabus :floorGoods='tdlist' :weekDay='1' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周二('+getsubstr('Tuesday')+')'" name="Tuesday">
                <Syllabus :floorGoods='tdlist' :weekDay='2' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周三('+getsubstr('Wednesday')+')'" name="Wednesday">
                <Syllabus :floorGoods='tdlist' :weekDay='3' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周四('+getsubstr('Thursday')+')'" name="Thursday">
                <Syllabus :floorGoods='tdlist' :weekDay='4' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周五('+getsubstr('Friday')+')'" name="Friday">
                <Syllabus :floorGoods='tdlist' :weekDay='5' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周六('+getsubstr('Saturday')+')'" name="Saturday">
                <Syllabus :floorGoods='tdlist' :weekDay='6' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周日('+getsubstr('Sunday')+')'" name="Sunday">
                <Syllabus :floorGoods='tdlist' :weekDay='7' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="晚班" name="Eveningshift">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
               <el-tab-pane :label="'周一('+getsubstr('Monday')+')'" name="Monday">
                <Syllabus :floorGoods='tdlist' :weekDay='1' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周二('+getsubstr('Tuesday')+')'" name="Tuesday">
                <Syllabus :floorGoods='tdlist' :weekDay='2' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周三('+getsubstr('Wednesday')+')'" name="Wednesday">
                <Syllabus :floorGoods='tdlist' :weekDay='3' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周四('+getsubstr('Thursday')+')'" name="Thursday">
                <Syllabus :floorGoods='tdlist' :weekDay='4' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周五('+getsubstr('Friday')+')'" name="Friday">
                <Syllabus :floorGoods='tdlist' :weekDay='5' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周六('+getsubstr('Saturday')+')'" name="Saturday">
                <Syllabus :floorGoods='tdlist' :weekDay='6' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
              <el-tab-pane :label="'周日('+getsubstr('Sunday')+')'" name="Sunday">
                <Syllabus :floorGoods='tdlist' :weekDay='7' :whichDay="whichDay" :jiaojiao="jiaojiao" :jiaojiaoname="jiaojiaoname"></Syllabus>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import Syllabus from "@/components/syllabus";
export default {
  name: "classprogress",
  inject: ["reload"],
  components: {
    Syllabus
  },
  data() {
    return {
      dateValue:"",
      value: "",
      form: {
        train:"",
        train2:""
      },
      tdlist: [],
      week: {},
      jiaojiao:'',
      jiaojiaoname:"",
      activeName: "Fulldayshift",
      activeName2:"Monday",
      disabled:false,
      dialogFormVisible1:false,
      ruleForm: {
        name: "", //姓名
        tel: "", //手机号
        sex: "", //性别
        shift: "", //班次
        money: "", //缴费
        identityPhoto: "", //身份证照片
        contractphoto: "", //合同照片
      },
      rules: {
        name: { required: true, message: '请输入学员姓名', trigger: 'blur' },
        sex: { required: true, message: '请选择学员性别', trigger: 'change' },
        tel: { required: true, message: '请输入学员电话', trigger: 'blur' },
        shift: { required: true, message: '请选择班次', trigger: 'change' },
        money: { required: true, message: '请输入缴费', trigger: 'blur' },
        // identityPhoto: { required: true, message: '请选择身份证照片'},
        // contractphoto: { required: true, message: '请选择合同照片', trigger: 'blur' },
      },
      formLabelWidth: "130px",
      Coach: [],
      Coach2:[],
      coachtheme:"",
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      fileList: [],
      fileList2: [],
      idd:"",
      options: [
        {
          value: "now",
          label: "复制本周"
        }
      ],
    };
  },
  computed: {
    whichDay() {
      //选择了哪一天
      return this.week[this.activeName2];
    },
    //周一
    Monday() {
      if (this.dateValue == "") {
        return this.GetDateStr(0, this.getFirstDayOfWeek(new Date()));
      } else {
        return this.GetDateStr(0, this.getFirstDayOfWeek(this.dateValue));
      }
    },
    //周末
    Sunday() {
      if (this.dateValue == "") {
        return this.GetDateStr(0, this.getFirstDayOfWeek(new Date(), 2));
      } else {
        return this.GetDateStr(0, this.getFirstDayOfWeek(this.dateValue, 2));
      }
    }
  },
  created () {
    let day = this.getFirstDayOfWeek(new Date());
    let FirstDay = this.GetDateStr(0, day);
    this.gettabledata(FirstDay);
    this.getCoachdata();
    this.getCoachdata2();
    if(this.$route.query.shibie == 'shibie'){
      this.form.train = this.$route.query.id;
    }else{
      this.form.train2 = JSON.parse(sessionStorage.getItem('coachid'));
    }
  },
  methods: {
     getsubstr(name) {
      var dates = this.week[name];
      if (dates != null) {
        return dates.substring(5);
      }
    },
    trainchange(val){
      let _this = this;
      _this.jiaojiao = val;
      let obj = {};
        obj = _this.Coach.find((item)=>{ return item.id === val;});
        _this.jiaojiaoname = obj.theme;
      requestLogin("/setTeachCurInfo/showIndexById/"+val, {}, "get")
        .then(res => {
          Object.assign(_this.tdlist, res);
          Object.assign(_this.week, res.week);
          _this.dateValue = "";
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
    trainchange2(val){
      let _this = this;
      _this.jiaojiao = val;
      let obj = {};
        obj = _this.Coach2.find((item)=>{ return item.id === val;});
        _this.jiaojiaoname = obj.theme;
      requestLogin("/setTeachCurInfo/showIndexById/"+val, {}, "get")
        .then(res => {
          Object.assign(_this.tdlist, res);
          Object.assign(_this.week, res.week);
          _this.dateValue = "";
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
    //当前教培下拉
    getCoachdata() {
      let _this = this;
      requestLogin("/teachInfo/onGoing", {}, "get")
        .then(res => {
            _this.Coach = res.data;
            sessionStorage.setItem("coachid",res.data[0].id);
            sessionStorage.setItem("coachtheme",res.data[0].theme);
            // if(this.$route.query.endDay < this.Monday){
            //   _this.form.train = JSON.parse(sessionStorage.getItem('coachtheme'));
            // }else{
            //   _this.form.train2 = JSON.parse(sessionStorage.getItem('coachtheme'));
            // }
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
    getCoachdata2() {
      let _this = this;
      requestLogin("/teachInfo", {}, "get")
        .then(res => {
            _this.Coach2 = res;
            // if(_this.$route.query.endDay < _this.Monday){
            //   _this.form.train = _this.$route.query.id;
            //   }else{
            //     _this.form.train2 = JSON.parse(sessionStorage.getItem('coachid'));
            //   }
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
      if(_this.$route.query.shibie == 'shibie'){
        _this.idd = _this.$route.query.id;
      }else{
        _this.idd = JSON.parse(sessionStorage.getItem('coachid'));
      }
      requestLogin("/setTeachCurInfo/showIndexById/"+_this.idd, {}, "get")
        .then(res => {
          _this.tdlist = res;
          let { week } = res;
          _this.week = week;
          //根据week的value值得到它的key值
          let findKey = (value, compare = (a, b) => a === b) => {
            return Object.keys(week).find(k => compare(week[k], value));
          };
          //调用上述方法,把当前日期传过去,得到当前日期对应的星期,并把星期赋给activeName
          _this.activeName2 = findKey(_this.getNowFormatDate());
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
    //复制课表
    copyschedule() {
      let _this = this;
      if(_this.$route.query.shibie == 'shibie'){
        _this.idd = _this.$route.query.id;
        if(_this.jiaojiao){
        _this.idd = _this.jiaojiao;
         }
      }else if(!_this.jiaojiao){
        _this.idd = JSON.parse(sessionStorage.getItem('coachid'));
      }else{
        _this.idd = _this.jiaojiao;
      }
      let copyparams = {
        monday:this.Monday,
        teachId:_this.idd
      }
      requestLogin("/setTeachCurInfo/copyTeachCurTable",copyparams, "post")
        .then(res => {
          this.$message({
            message: "复制课表成功",
            type: "success"
          });
          _this.value = "";
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
     if(_this.$route.query.shibie == 'shibie'){
        _this.idd = _this.$route.query.id;
        if(_this.jiaojiao){
        _this.idd = _this.jiaojiao;
         }
      }else if(!_this.jiaojiao){
          _this.idd = JSON.parse(sessionStorage.getItem('coachid'));
        }else{
          _this.idd = _this.jiaojiao;
        }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let formData = new FormData();
            formData.append("name", _this.ruleForm.name); //姓名
            formData.append("tel", _this.ruleForm.tel); //电话
            formData.append("sex", _this.ruleForm.sex); //性别
            formData.append("teachId", _this.idd); //归属教培
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
                _this.resetForm(formName);
                _this.dialogFormVisible1 = false;
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
    //得到当前年月日yyyy-MM-dd
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    // 获取指日期的周一/日时间
    getFirstDayOfWeek(date, num) {
      num = num ? num : 1;
      var day = date.getDay() || 7;
      if (num == 1) {
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1 - day
        );
      } else {
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 7 - day
        );
      }
    },
    // 获取指定天数后的时间
    GetDateStr(num, day) {
      var day = day || new Date();
      let date = new Date(day);
      date.setDate(date.getDate() + num);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
     //身份证照片
    submitUpload1: function(content) {
      this.file = content.file;
    },
     //合同照片
    submitUpload2: function(content) {
      this.file2 = content.file;
    },
     // 改变时间
    changeWeek() {
       let _this = this;
      if(_this.$route.query.shibie == 'shibie'){
        _this.idd = _this.$route.query.id;
        if(_this.jiaojiao){
        _this.idd = _this.jiaojiao;
         }
      }else if(!_this.jiaojiao){
        _this.idd = JSON.parse(sessionStorage.getItem('coachid'));
      }else{
        _this.idd = _this.jiaojiao;
      }
      let copyparams = {
        monday:this.Monday,
        teachId:_this.idd
      }
      requestLogin("/setTeachCurInfo/showTeachCurTableWeek",copyparams, "post")
        .then(res => {
          Object.assign(_this.tdlist, res);
          Object.assign(_this.week, res.week);
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
     Changeselect(val) {
    },
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传1张图片!"
      });
    },
    ChangeSex(val) {
    },
    Changeshift(val){
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
      if(this.$route.query.shibie == 'shibie'){
        this.idd=this.$route.query.id;
        if(this.jiaojiao){
          this.idd = this.jiaojiao;
         }
      }else if(!this.jiaojiao){
        this.idd= JSON.parse(sessionStorage.getItem('coachid'));
      }else{
        this.idd = this.jiaojiao;
      }
        this.$router.push({
        path: "/Teaching/teachingcourse/classprogress/viewall",
        query: {
          id: this.idd,
          shibie:this.$route.query.shibie,
          endDay:this.$route.query.endDay,
          daydate:this.$route.query.daydate,
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
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
  position: relative;
      .group-right{
          width: 50%;
          position: absolute;
          right: 1%;
          height: 45px;
          line-height: 45px;
          z-index: 2;
          display: flex;
          justify-content: flex-end;
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
</style>