<template>
    <div>
        <!--团课课程表-->
        <div class="practice-center">
            <el-row>
                <el-col :span="24">
                    <div class="purple">
                        <div class="add">
                            <el-button type="text" class="add-p el-icon-plus" @click="dialogFormVisible = true">添加课程</el-button>
                            <template>
                                <el-dialog title="添加课程(2018-07-10 周一)" :append-to-body="true" :visible.sync="dialogFormVisible">
                                    <!--添加课程-->
                                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                                        <el-form-item label="课程:" prop="course" :label-width="formLabelWidth">
                                            <el-col :span="22">
                                                <el-select v-model="ruleForm.course" placeholder="请选择" style="width:100%" @change="Selectchange2">
                                                    <el-option v-for="item in kecheng" :key="item.kcno" :label="item.kcName" :value="item.kcno"></el-option>
                                                </el-select>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="课程底色:" prop="courseclassify" :label-width="formLabelWidth">
                                            <el-col :span="22">
                                                <el-select v-model="ruleForm.courseclassify" placeholder="请选择" style="width:100%">
                                                    <el-option label="白底" value="1"></el-option>
                                                    <el-option label="灰底" value="2"></el-option>
                                                </el-select>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="教练:" prop="train" :label-width="formLabelWidth">
                                            <el-col :span="22">
                                                <el-select v-model="ruleForm.train" placeholder="请选择" style="width:100%" @change="Selectchange3">
                                                    <el-option v-for="item in jiaolian" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                                                </el-select>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="教室:" prop="room" :label-width="formLabelWidth">
                                            <el-col :span="22">
                                                <el-select v-model="ruleForm.room" placeholder="请选择" style="width:100%" @change="Selectchange4">
                                                    <el-option v-for="item in jiaoshi" :key="item.name" :label="item.name" :value="item.name"></el-option>
                                                </el-select>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="课程日期:" prop="attenddate" :label-width="formLabelWidth">
                                            <el-col :span="22">
                                                <el-date-picker v-model="ruleForm.attenddate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:100%;">
                                                </el-date-picker>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="上课时间:" prop="attendtime" :label-width="formLabelWidth">
                                            <el-col :span="22">
                                                <el-time-picker is-range value-format="HH:mm:ss" v-model="ruleForm.attendtime" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 100%;"></el-time-picker>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="容纳人数:" prop="galleryful" :label-width="formLabelWidth">
                                            <el-col :span="22">
                                                <el-input v-model="ruleForm.galleryful" placeholder="请输入"></el-input>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="难度:" prop="difficulty" :label-width="formLabelWidth">
                                            <el-col :span="22">
                                                <el-input v-model="ruleForm.difficulty" placeholder="请输入"></el-input>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item label="价格:" prop="price" :label-width="formLabelWidth">
                                            <el-col :span="22">
                                                <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
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
                            <el-button type="text" class="p" @click="changeInfo">修改课程</el-button>
                            <template>
                                <el-dialog title="修改课程" :append-to-body="true" :visible.sync="dialogFormVisible3">
                                    <template>
                                        <!--修改课程-->
                                        <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
                                            <el-form-item label="课程:" prop="kcName" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-select v-model="currentSelectRow.kcName" placeholder="请选择" style="width:100%" @change="Selectchange2">
                                                        <el-option v-for="item in kecheng" :key="item.kcno" :label="item.kcName" :value="item.kcno"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="课程底色:" prop="kcbSort" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-select v-model="currentSelectRow.kcbSort" placeholder="请选择" style="width:100%">
                                                        <el-option label="白底" value="1"></el-option>
                                                        <el-option label="灰底" value="2"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="教练:" prop="JLIDs" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-select v-model="currentSelectRow.JLIDs" placeholder="请选择" style="width:100%" @change="Selectchange3">
                                                        <el-option v-for="item in jiaolian" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="教室:" prop="kcPlace" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-select v-model="currentSelectRow.kcPlace" placeholder="请选择" style="width:100%" @change="Selectchange4">
                                                        <el-option v-for="item in jiaoshi" :key="item.name" :label="item.name" :value="item.name"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="课程日期:" prop="kcStime" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-date-picker v-model="currentSelectRow.kcStime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:100%;">
                                                    </el-date-picker>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="上课时间:" prop="Stime" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-time-picker is-range v-model="currentSelectRow.Stime" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 100%;"></el-time-picker>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="容纳人数:" prop="RenShu" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model="currentSelectRow.RenShu" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="难度:" prop="kcDiff" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model="currentSelectRow.kcDiff" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="价格:" prop="price" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model="currentSelectRow.price" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item class="dialog-footer">
                                                <el-col :span="24" style="display: flex;justify-content: flex-end;">
                                                    <el-button @click="resetForm('currentSelectRow')">重置</el-button>
                                                    <el-button type="primary" @click="editForm('currentSelectRow')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                                                </el-col>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-dialog>
                            </template>
                        </div>
                        <div class="add">
                            <el-button type="text" class="p" @click="changeInfo2">预约团课</el-button>
                            <template>
                                <el-dialog title="预约团课" :append-to-body="true" :visible.sync="dialogFormVisible2">
                                    <template>
                                        <!--预约团课-->
                                        <el-form :model="currentSelectRow" :rules="rules2" ref="currentSelectRow" label-width="100px">
                                            <el-form-item label="门店:" prop="door" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                   <el-select v-model="currentSelectRow.door" placeholder="请选择" style="width:100%" @change="Selectchange3">
                                                        <el-option v-for="item in mendian" :key="item.Hsxx_Hsid" :label="item.Hsxx_Name" :value="item.Hsxx_Hsid"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item prop="kcStime" label="上课日期:" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-date-picker type="date" placeholder="请选择" v-model="currentSelectRow.kcStime" style="width: 100%;"></el-date-picker>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item prop="Stime" label="上课时间:" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-time-picker is-range v-model="currentSelectRow.Stime" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 100%;"></el-time-picker>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="预约课程:" prop="kcName" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-select v-model="currentSelectRow.kcName" placeholder="请选择" style="width:100%" @change="Selectchange2">
                                                        <el-option v-for="item in kecheng" :key="item.kcno" :label="item.kcName" :value="item.kcno"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model="currentSelectRow.name" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="会员/体验客户:" prop="consumer" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-select v-model="currentSelectRow.consumer" placeholder="请选择" style="width:100%">
                                                        <el-option label="会员" value="member"></el-option>
                                                        <el-option label="体验客户" value="experience"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="卡种:" prop="card" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-select v-model="currentSelectRow.card" placeholder="请选择" style="width:100%">
                                                        <el-option label="次数卡" value="cishucard"></el-option>
                                                        <el-option label="金额卡" value="jinecard"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item class="dialog-footer">
                                                <el-col :span="24" style="display: flex;justify-content: flex-end;">
                                                    <el-button @click="resetForm('currentSelectRow')">重置</el-button>
                                                    <el-button type="primary" @click="yuyueForm('currentSelectRow')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                                                </el-col>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-dialog>
                            </template>
                        </div>
                        <div class="add2">
                            <el-button type="text" class="p" @click="Delcourse">删除课程</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="practice-table">
            <el-row>
                <el-col :span="24">
                    <el-table highlight-current-row :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" @row-click="rowClick" :default-sort="{order: 'descending'}" style="width: 100%" :header-cell-style="{background:'#fafafa'}">
                        <el-table-column align="center" prop="radio" fixed width="50px">
                            <template slot-scope="scope">
                                <el-radio-group v-model="radio">
                                    <el-radio :label="scope.$index" @change.native="radiochange(scope.row)">&nbsp;</el-radio>
                                </el-radio-group>
                            </template>
                        </el-table-column>
                        <el-table-column prop="kcName" align="left" label="课程名称"></el-table-column>
                        <el-table-column prop="kcStime" align="left" label="上课时间" sortable></el-table-column>
                        <el-table-column prop="kcbSort" align="left" label="底色" sortable></el-table-column>
                        <el-table-column prop="JLIDs" align="left" label="教练"></el-table-column>
                        <el-table-column prop="RenShu" align="left" label="已预约" sortable></el-table-column>
                        <el-table-column prop="kcDiff" align="left" label="难度" sortable fixed="right"></el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
export default {
  name: "grouptimetable",
  inject: ["reload"],
  props: ["floorGoods", "weekDay", "classrooms", "subjects", "coachs","clubs"],
  data() {
    return {
      jiaoshi: [],
      kecheng: [],
      jiaolian: [],
      tableData: [],
      mendian:[],
      formLabelWidth: "130px",
      radio: "",
      ruleForm: {
        course: "", //课程
        courseclassify: "", //课程分类
        train: "", //教练
        room: "", //教室
        attendtime: "", //上课时间
        attenddate: "", //课程日期
        galleryful: "", //容纳人数
        difficulty: "", //难度
        price: "" //价格
      },
      currentSelectRow: {
          door:'',//门店
          attenddate: '',//上课日期
          attendtime:'',//上课时间
          kcName:'',//预约课程
          consumer:'',//会员/体验客户
          name: '',//姓名
          card:'',//卡种
        },
      rules: {
        course: [{ required: true, message: "请选择课程", trigger: "change" }],
        courseclassify: [
          { required: true, message: "请选择课程分类", trigger: "change" }
        ],
        train: [{ required: true, message: "请选择教练", trigger: "change" }],
        room: [{ required: true, message: "请选择教室", trigger: "change" }],
        attendtime: [
          { required: true, message: "请选择上课时间", trigger: "change" }
        ],
        attenddate: [
          { required: true, message: "请选择课程日期", trigger: "change" }
        ],
        galleryful: [
          { required: true, message: "请输入容纳人数", trigger: "blur" }
        ],
        difficulty: [
          { required: true, message: "请输入课程难度", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入课程价格", trigger: "blur" }]
      },
      rules2: {
          door:[
            {required: true, message: '请输入门店', trigger: 'blur' }
          ],
          kcName: [
            {required: true, message: '请选择预约课程', trigger: 'change' }
          ],
          consumer: [
            {required: true, message: '请选择会员/体验客户', trigger: 'change' }
          ],
         card:[
             {required: true, message: '请选择卡种', trigger: 'change' }
         ]
        },
      currentSelectRow: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      currentPage: 1,
      pagesize: 10
    };
  },
  watch: {
    floorGoods(val) {
      switch (this.weekDay) {
        case 1:
          this.tableData = val.list.Monday;
          break;
        case 2:
          this.tableData = val.list.Tuesday;
          break;
        case 3:
          this.tableData = val.list.Wednesday;
          break;
        case 4:
          this.tableData = val.list.Thursday;
          break;
        case 5:
          this.tableData = val.list.Friday;
          break;
        case 6:
          this.tableData = val.list.Saturday;
          break;
        case 7:
          this.tableData = val.list.Sunday;
          break;
      }
      this.tableData.map((item, index) => {
        item.kcName = item.curriculum_subject.kcName;
        item.JLIDs = item.staff_info.YGXX_NAME;
      });
    },
    classrooms(val) {
      this.jiaoshi = this.classrooms;
    },
    subjects(val) {
      this.kecheng = this.subjects;
    },
    coachs(val) {
      this.jiaolian = this.coachs;
    },
    clubs(val) {
      this.mendian = this.clubs;
    }
  },
  methods: {
    radiochange(row) {
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
    rowClick(row, event, column) {
      this.radio = row.index;
      //获取表格数据
      this.currentSelectRow = row;
      console.log(row.index);
    },
    changeInfo() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible3 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    changeInfo2() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    //预约团课
    yuyueForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //修改课程
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认修改吗？", "提示").then(() => {
            var formData = {
              kcStime: this.currentSelectRow.kcStime, //课程日期
              KCNO: this.currentSelectRow.KCNO, //所选课程id
              kcbSort: this.currentSelectRow.kcbSort, //灰底白底
              JLID: this.currentSelectRow.JLIDs, //教练id
              kcPlace: this.currentSelectRow.kcPlace, //教室
              Stime: this.currentSelectRow.Stime[0], //开课时间
              Etime: this.currentSelectRow.Stime[1], //结束时间
              RenShu: this.currentSelectRow.RenShu, //容纳人数
              kcDiff: this.currentSelectRow.kcDiff, //课程难度
              price: this.currentSelectRow.price //价格
            };
            console.log(this.currentSelectRow.KCNO);
            requestLogin(
              "/CurTableInfo/" + this.currentSelectRow.KCNO,
              formData,
              "put"
            )
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
          this.$message({ message: "提交失败!", type: "error" });
          return false;
        }
      });
    },
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
        })
          .then(() => {
            console.log(_this.currentSelectRow.KCNO);
            requestLogin(
              "/CurTableInfo/" + _this.currentSelectRow.KCNO,
              {},
              "delete"
            ).then(response => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
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
      }
    },
    //添加课程
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var formData = {
              kcStime: this.ruleForm.attenddate, //课程日期
              KCNO: this.ruleForm.course, //所选课程id
              kcbSort: this.ruleForm.courseclassify, //灰底白底
              JLID: this.ruleForm.train, //教练id
              kcPlace: this.ruleForm.room, //教室
              Stime: this.ruleForm.attendtime[0], //开课时间
              Etime: this.ruleForm.attendtime[1], //结束时间
              RenShu: this.ruleForm.galleryful, //容纳人数
              kcDiff: this.ruleForm.difficulty, //课程难度
              price: this.ruleForm.price //价格
            };
            requestLogin("/CurTableInfo", formData, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
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
          this.$message({ message: "提交失败!", type: "error" });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    Selectchange2(val) {
      console.log(val);
    },
    Selectchange3(val) {
      console.log(val);
    },
    Selectchange4(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/group.scss";
</style>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>