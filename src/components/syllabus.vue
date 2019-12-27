<template>
  <div>
    <div class="practice-center">
    <el-row>
    <el-col :span="24">
        <div class="purple">
        <div class="add">
            <el-button type="text" class="p el-icon-plus" :disabled ='true' v-if="this.$route.query.shibie == 'shibie' && this.$route.query.endDay < this.$route.query.daydate">添加课程</el-button>
            <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true" v-else>添加课程</el-button>
             <template>
                <el-dialog title="添加课程" :append-to-body="true" :visible.sync="dialogFormVisible">
                  <!--添加课程-->
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="课程名称:" prop="name" :label-width="formLabelWidth">
                      <el-col :span="22">
                       <el-input v-model.trim="ruleForm.name" placeholder="请输入" style="width:100%"></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="课程日期:" prop="attenddate" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-date-picker v-model="this.kcStime" disabled value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" style="width:100%;">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="上课时间:" prop="attendtime" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-time-picker v-model="ruleForm.attendtime" value-format="HH:mm" format="HH:mm" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
                        <el-time-picker v-model="ruleForm.endtime" value-format="HH:mm" format="HH:mm" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
                      </el-col>
                    </el-form-item>
                     <el-form-item label="课程教室:" prop="room" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-select v-model="ruleForm.room" placeholder="请选择" style="width:100%" @change="Selectchange4" @focus="Selectclick">
                          <el-option v-for="item in jiaoshi" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="课程教练:" prop="train" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-select v-model="ruleForm.train" placeholder="请选择" style="width:100%" @change="Selectchange3" @focus="Selectclick2">
                          <el-option v-for="item in jiaolian" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="课程类别:" prop="shift" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-radio-group v-model="ruleForm.shift" @change="Changeshift">
                            <el-radio label="1" value="全天班">全天班</el-radio>
                            <el-radio label="2" value="周末班">周末班</el-radio>
                            <el-radio label="3" value="晚班">晚班</el-radio>
                          </el-radio-group>
                        </el-col>
                      </el-form-item>
                    <el-form-item class="dialog-footer">
                      <el-col :span="24" style="display: flex;justify-content: flex-end;">
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定
                        </el-button>
                      </el-col>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </template>
        </div>
        <div class="add">
            <el-button type="text" class="p" :disabled ='true' v-if="this.$route.query.shibie == 'shibie' && this.$route.query.endDay < this.$route.query.daydate">编辑课程</el-button>
            <el-button type="text" class="p" @click="editlunbo" v-else>编辑课程</el-button>
             <template>
                <el-dialog title="编辑课程" :append-to-body="true" :visible.sync="dialogFormVisible2">
                  <!--编辑课程-->
                  <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
                    <el-form-item label="课程名称:" prop="name" :label-width="formLabelWidth">
                      <el-col :span="22">
                       <el-input v-model.trim="currentSelectRow.name" placeholder="请输入" style="width:100%"></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="课程日期:" prop="day" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-date-picker v-model="currentSelectRow.day" disabled value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" style="width:100%;">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="上课时间:" prop="startTime" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-time-picker v-model="currentSelectRow.startTime" value-format="HH:mm" format="HH:mm" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
                        <el-time-picker v-model="currentSelectRow.endTime" value-format="HH:mm" format="HH:mm" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
                      </el-col>
                    </el-form-item>
                     <el-form-item label="课程教室:" prop="classroom" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-select v-model="currentSelectRow.classroom" placeholder="请选择" style="width:100%" @change="Selectchange4" @focus="Selectclick3">
                          <el-option v-for="item in jiaoshi" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="课程教练:" prop="doCoach" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-select v-model="currentSelectRow.doCoach" placeholder="请选择" style="width:100%" @change="Selectchange5" @focus="Selectclick4">
                          <el-option v-for="item in jiaolian" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="课程类别:" prop="shift" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-radio-group v-model="currentSelectRow.shift" @change="Changeshift">
                            <el-radio label="全天班" value="1"></el-radio>
                            <el-radio label="周末班" value="2"></el-radio>
                            <el-radio label="晚班" value="3"></el-radio>
                          </el-radio-group>
                        </el-col>
                      </el-form-item>
                    <el-form-item class="dialog-footer">
                      <el-col :span="24" style="display: flex;justify-content: flex-end;">
                        <el-button type="primary" @click="editForm('currentSelectRow')" style="background-color: #00BC71;border-color: #00BC71;">确定
                        </el-button>
                      </el-col>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </template>
        </div>
        <div class="add2">
            <el-button type="text" class="p" :disabled ='true' v-if="this.$route.query.shibie == 'shibie' && this.$route.query.endDay < this.$route.query.daydate">删除课程</el-button>
            <el-button type="text" class="p" @click="Delcourse" v-else>删除课程</el-button>
        </div>
        <div class="add">
            <el-button type="text" class="p" :disabled ='true' v-if="this.$route.query.shibie == 'shibie' && this.$route.query.endDay < this.$route.query.daydate">上课登记</el-button>
            <el-button type="text" class="p" @click="registration" v-else>上课登记</el-button>
              <template>
                <el-dialog title="上课登记" :append-to-body="true" :visible.sync="dialogFormVisible3">
                  <!--上课登记-->
                  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px">
                    <el-form-item label="上课教练名称:" prop="name" :label-width="formLabelWidth">
                      <el-col :span="22">
                       <el-select v-model="ruleForm2.name" placeholder="请选择" style="width:100%" @change="Selectclass" @focus="classclick">
                          <el-option v-for="item in classation" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_NAME"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                    <el-form-item class="dialog-footer">
                      <el-col :span="24" style="display: flex;justify-content: flex-end;">
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                        <el-button type="primary" @click="submitForm2('ruleForm2')" style="background-color: #00BC71;border-color: #00BC71;">确定
                        </el-button>
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
    <el-col :span="24">
    <el-table v-loading="loading" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
        <el-table-column align="right" prop="radio" fixed width="50px">
            <template slot-scope="scope">
            <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;
            </el-radio>
            </template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="课程名称"></el-table-column>
        <el-table-column prop="doCoach" align="center" label="上课教练"></el-table-column>
        <el-table-column prop="classroom" align="center" label="教室"></el-table-column>
        <el-table-column prop="day" align="center" label="日期"></el-table-column>
        <el-table-column prop="startTime" align="center" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" align="center" label="结束时间"></el-table-column>
        <el-table-column prop="theme" align="center" label="归属教培"></el-table-column>
    </el-table>
    <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
    </div>
    </el-col>
    </div>
 </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import moment from "moment";
const radioDict = {
  "全天班": 1,
  "周末班": 2,
  "晚班": 3,
}
export default {
  name: "syllabus",
  inject: ["reload"],
  props: [
    "floorGoods",
    "floorGoodss",
    "floorGoodsss",
    "weekDay",
    "whichDay",
    "jiaojiao",
    "jiaojiaoname",
  ],
  data() {
    return {
      currentSelectRow: "",
      formLabelWidth: "130px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3:false,
      loading: false,
      tableData: [],
      classation:[],
      jiaolianming: "",
      jiaoshi: [],
      jiaolian: [],
      shishi:"",
      currentPage: 1,
      pagesize: 10,
      tablelength: 0,
      radio: "",
      kcStime: "",
      ruleForm: {
        name: "", //课程名称
        shift: "", //课程类别
        train: "", //教练
        room: "", //教室
        attendtime: "", //开始时间
        endtime: "", //结束时间
        attenddate: "", //课程日期
      },
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        shift: [
          { required: true, message: "请选择课程类别", trigger: "change" }
        ],
        train: [{ required: true, message: "请选择教练", trigger: "change" }],
        room: [{ required: true, message: "请选择教室", trigger: "change" }],
        attendtime: [
          { required: true, message: "请选择开始时间", trigger: "change" }
        ],
        endtime: [
          { required: true, message: "请选择结束时间", trigger: "change" }
        ],
      },
      ruleForm2: {
        name: "", //上课教练名称
      },
      rules2: {
        name: [{ required: true, message: "请输入上课教练名称", trigger: "blur" }],
      },
    };
  },
    watch: {
    floorGoods: {
      deep: true,
      handler(val, oldVal) {
        switch (this.weekDay) {
          case 1:
            this.tableData = val.shift1.Monday;
            this.kcStime = val.week.Monday;
            break;
          case 2:
            this.tableData = val.shift1.Tuesday;
            this.kcStime = val.week.Tuesday;
            break;
          case 3:
            this.tableData = val.shift1.Wednesday;
            this.kcStime = val.week.Wednesday;
            break;
          case 4:
            this.tableData = val.shift1.Thursday;
            this.kcStime = val.week.Thursday;
            break;
          case 5:
            this.tableData = val.shift1.Friday;
            this.kcStime = val.week.Friday;
            break;
          case 6:
            this.tableData = val.shift1.Saturday;
            this.kcStime = val.week.Saturday;
            break;
          case 7:
            this.tableData = val.shift1.Sunday;
            this.kcStime = val.week.Sunday;
            break;
        }
        if (this.tableData != null) {
            this.tableData.map((item, index) => {
            item.theme = item.teach_info.theme;
          });
            this.tablelength = this.tableData.length;
        } else {
          this.tableData = [];
        }
      }
    },
    floorGoodss: {
      deep: true,
      handler(val, oldVal) {
        switch (this.weekDay) {
          case 1:
            this.tableData = val.shift2.Monday;
            this.kcStime = val.week.Monday;
            break;
          case 2:
            this.tableData = val.shift2.Tuesday;
            this.kcStime = val.week.Tuesday;
            break;
          case 3:
            this.tableData = val.shift2.Wednesday;
            this.kcStime = val.week.Wednesday;
            break;
          case 4:
            this.tableData = val.shift2.Thursday;
            this.kcStime = val.week.Thursday;
            break;
          case 5:
            this.tableData = val.shift2.Friday;
            this.kcStime = val.week.Friday;
            break;
          case 6:
            this.tableData = val.shift2.Saturday;
            this.kcStime = val.week.Saturday;
            break;
          case 7:
            this.tableData = val.shift2.Sunday;
            this.kcStime = val.week.Sunday;
            break;
        }
        if (this.tableData != null) {
            this.tableData.map((item, index) => {
            item.theme = item.teach_info.theme;
          });
            this.tablelength = this.tableData.length;
        } else {
          this.tableData = [];
        }
      }
    },
    floorGoodsss: {
      deep: true,
      handler(val, oldVal) {
        switch (this.weekDay) {
          case 1:
            this.tableData = val.shift3.Monday;
            this.kcStime = val.week.Monday;
            break;
          case 2:
            this.tableData = val.shift3.Tuesday;
            this.kcStime = val.week.Tuesday;
            break;
          case 3:
            this.tableData = val.shift3.Wednesday;
            this.kcStime = val.week.Wednesday;
            break;
          case 4:
            this.tableData = val.shift3.Thursday;
            this.kcStime = val.week.Thursday;
            break;
          case 5:
            this.tableData = val.shift3.Friday;
            this.kcStime = val.week.Friday;
            break;
          case 6:
            this.tableData = val.shift3.Saturday;
            this.kcStime = val.week.Saturday;
            break;
          case 7:
            this.tableData = val.shift3.Sunday;
            this.kcStime = val.week.Sunday;
            break;
        }
        if (this.tableData != null) {
            this.tableData.map((item, index) => {
            item.theme = item.teach_info.theme;
          });
            this.tablelength = this.tableData.length;
        } else {
          this.tableData = [];
        }
      }
    },
  },
    created(){
      this.huisuoid = JSON.parse(sessionStorage.getItem("club")).Hsxx_Hsid;
    },
    activated () {
      this.huisuoid = JSON.parse(sessionStorage.getItem("club")).Hsxx_Hsid;
      this.dialogFormVisible = false;
      this.dialogFormVisible2 = false;
      this.dialogFormVisible3 = false;
    },
  methods: {
    //删除课程
    Delcourse() {
      //先选择列表
      let _this = this;
      if (!this.currentSelectRow) {
        this.$message({
          message: "请先选择数据!",
          type: "warning"
        });
        return;
      } else {
        this.$confirm("确认删除该条记录吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          requestLogin(
            "/setTeachCurInfo/" + _this.currentSelectRow.id,
            {},
            "delete"
          )
            .then(response => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.radio=false;
              for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].id == this.currentSelectRow.id) {
                  this.tableData.splice(i, 1);
                }
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
        });
      }
    },
    //教室
    roomdata() {
      let _this = this;
      let roomparams = {
        kcStime:_this.kcStime,
        Stime:_this.ruleForm.attendtime,
        Etime:_this.ruleForm.endtime,
        hsid:_this.huisuoid
      }
      requestLogin("/getClassroomListByDateAndTime", roomparams, "post")
        .then(res => {
          _this.jiaoshi = res;
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
    //教练
    traindata() {
      let _this = this;
      let trainparams = {
        kcStime:_this.kcStime,
        Stime:_this.ruleForm.attendtime,
        Etime:_this.ruleForm.endtime,
        hsid:_this.huisuoid
      }
      requestLogin("/getCoachListByDateAndTime", trainparams, "post")
        .then(res => {
          _this.jiaolian = res;
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
    //教室
    roomdata2() {
      let _this = this;
      let roomparams2 = {
        kcStime:_this.kcStime,
        Stime:_this.currentSelectRow.startTime,
        Etime:_this.currentSelectRow.endTime,
        hsid:_this.huisuoid
      }
      requestLogin("/getClassroomListByDateAndTime", roomparams2, "post")
        .then(res => {
          _this.jiaoshi = res;
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
    //教练
    traindata2() {
      let _this = this;
      let trainparams2 = {
        kcStime:_this.kcStime,
        Stime:_this.currentSelectRow.startTime,
        Etime:_this.currentSelectRow.endTime,
        hsid:_this.huisuoid
      }
      requestLogin("/getCoachListByDateAndTime", trainparams2, "post")
        .then(res => {
          _this.jiaolian = res;
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
    //添加课程
    submitForm(formName) {
      if(this.$route.query.shibie == 'shibie'){
        this.shishi=this.$route.query.id;
        if(this.jiaojiao){
          this.shishi = this.jiaojiao;
         }
      }else if(!this.jiaojiao){
        this.shishi = JSON.parse(sessionStorage.getItem('coachid'));
      }else{
        this.shishi = this.jiaojiao;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var formData = {
              day: this.kcStime, //课程日期
              name: this.ruleForm.name, //课程名称
              arrangeCoach: this.ruleForm.train, //教练id
              classroom: this.ruleForm.room, //教室
              startTime: this.ruleForm.attendtime, //开始时间
              endTime: this.ruleForm.endtime, //结束时间
              teachId: this.shishi, //所属教培id
              shift: this.ruleForm.shift, //课程类别
            };
            requestLogin("/setTeachCurInfo", formData, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.dialogFormVisible = false;
                formData.day = this.kcStime;
                formData.name = this.ruleForm.name;
                formData.classroom = this.ruleForm.room;
                formData.attendtime = this.ruleForm.attendtime;
                formData.endtime = this.ruleForm.endtime;
                for(var i=0;i<this.jiaolian.length;i++){
                    if(this.jiaolian[i].YGXX_YGID_NEI==this.ruleForm.train){
                         formData.doCoach = this.jiaolian[i].YGXX_NAME;
                         if(!this.jiaojiao){
                            formData.theme = sessionStorage.getItem('coachtheme');
                          }else{
                            formData.theme = this.jiaojiaoname;
                          }
                      if(this.$route.query.shibie == 'shibie'){
                          formData.theme = this.$route.query.theme;
                          if(this.jiaojiao){
                            formData.theme = this.jiaojiaoname;
                          }
                        }
                    }
                }
                this.tableData.push(formData);
                this.resetForm(formName);
                this.ruleForm.endtime = '';
              })
              .catch(error => {
                let { response: { data: { errorCode, msg } } } = error;
                if (errorCode != 0) {
                  this.$message({ message: msg, type: "error" });
                }
              });
          });
        } else {
          return false;
        }
      });
    },
    //上课教练登记
    submitForm2(formName) {
        this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let formData = {
              doCoach: this.ruleForm2.name, //上课教练名称
            };
            requestLogin("/setTeachCurInfo/doCoachTeachCurTable/"+this.currentSelectRow.id, formData, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.dialogFormVisible3 = false;
                for (var i = 0; i < this.tableData.length; i++) {
                  if (this.tableData[i].id== this.currentSelectRow.id) {
                    this.tableData[i].doCoach = this.ruleForm2.name; //名称
                  }
                }
                this.resetForm(formName);
              })
              .catch(error => {
                let { response: { data: { errorCode, msg } } } = error;
                if (errorCode != 0) {
                  this.$message({ message: msg, type: "error" });
                }
              });
          });
        } else {
          return false;
        }
      });
    },
     //修改课程
    editForm(formName) {
     if(this.$route.query.shibie == 'shibie'){
        this.shishi=this.$route.query.id;
        if(this.jiaojiao){
          this.shishi = this.jiaojiao;
         }
      }else if(!this.jiaojiao){
        this.shishi = JSON.parse(sessionStorage.getItem('coachid'));
      }else{
        this.shishi = this.jiaojiao;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认修改吗？", "提示").then(() => {
            let formData = {
              day: this.currentSelectRow.day, //课程日期
              name: this.currentSelectRow.name, //课程名称
              startTime: this.currentSelectRow.startTime, //开始时间
              endTime: this.currentSelectRow.endTime, //结束时间
              arrangeCoach: this.currentSelectRow.arrangeCoach, //教练
              classroom: this.currentSelectRow.classroom, //教室
              teachId: this.shishi, //所属教培
              shift: radioDict[this.currentSelectRow.shift], //类别
            };
            requestLogin(
              "/setTeachCurInfo/" + this.currentSelectRow.id,
              formData,
              "put"
            )
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.dialogFormVisible2 = false;
                for (var i = 0; i < this.tableData.length; i++) {
                  if (this.tableData[i].id== this.currentSelectRow.id) {
                    this.tableData[i].day = this.currentSelectRow.day; //日期
                    this.tableData[i].name = this.currentSelectRow.name; //名称
                    this.tableData[i].startTime = this.currentSelectRow.startTime; //开始时间
                    this.tableData[i].endTime = this.currentSelectRow.endTime; //结束时间
                   for(var j=0;j<this.jiaolian.length;j++){
                    if(this.jiaolian[j].YGXX_YGID_NEI==this.currentSelectRow.arrangeCoach){
                         this.tableData[i].doCoach = this.jiaolian[j].YGXX_NAME;
                    }
                }
                    this.tableData[i].classroom = this.currentSelectRow.classroom; //教室
                  }
                }
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
    Selectclick(){
      if(this.ruleForm.attendtime != "" && this.ruleForm.endtime != ""){
        this.roomdata();
      }
    },
    Selectclick2(){
      if(this.ruleForm.attendtime != "" && this.ruleForm.endtime != ""){
        this.traindata();
      }
    },
    Selectclick3(){
      if(this.currentSelectRow.attendtime != "" && this.currentSelectRow.endtime != ""){
        this.roomdata2();
      }
    },
    Selectclick4(){
      if(this.ruleForm.currentSelectRow != "" && this.currentSelectRow.endtime != ""){
        this.traindata2();
      }
    },
    Selectclass(val){
    },
    classclick(){
      let _this = this;
      requestLogin("/getCurTableBaseInfo", {}, "post")
        .then(res => {
          _this.classation = res.coach;
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    Selectchange3(val) {
      this.jiaolian.map((item, index) => {
        if (val == item.YGXX_YGID_NEI) {
          this.jiaolianming = item.YGXX_NAME;
        }
      });
    },
    Selectchange5(val) {
        this.jiaolian.map((item, index) => {
        if (val == item.YGXX_YGID_NEI) {
          this.currentSelectRow.arrangeCoach = item.YGXX_YGID_NEI;
        }
      });
    },
    Selectchange4(val) {
    },
    Changeshift(val){
    },
    editlunbo() {
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择列表!", type: "warning" });
      }
    },
    registration(){
      if (this.currentSelectRow) {
        this.dialogFormVisible3 = true;
      } else {
        this.$message({ message: "请先选择列表!", type: "warning" });
      }
    },
    rowClick(row, event, column) {
      this.currentSelectRow = row;
      this.radio = row.index;
      this.radio = this.tableData.indexOf(row);
    },
    getCurrentRow(val) {},
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
<style lang="scss" scoped>
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
</style>