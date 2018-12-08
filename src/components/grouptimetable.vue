<template>
  <div>
    <!--团课课程表-->
    <div class="practice-center">
      <el-row>
        <el-col :span="24">
          <div class="purple">
            <div class="add">
              <el-button type="text" :disabled="isSelfClub" class="add-p el-icon-plus" @click="dialogFormVisible = true">添加课程</el-button>
              <template>
                <el-dialog title="添加课程" :append-to-body="true" :visible.sync="dialogFormVisible">
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
                    <el-form-item label="容纳人数:" prop="galleryful" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-input v-model="ruleForm.galleryful" placeholder="请输入" style="width:100%"></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="难度:" prop="difficulty" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-input v-model="ruleForm.difficulty" placeholder="请输入" style="width:100%"></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="价格:" prop="price" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-input v-model="ruleForm.price" placeholder="请输入" style="width:100%"></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item class="dialog-footer">
                      <el-col :span="24" style="display: flex;justify-content: flex-end;">
                        <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定
                        </el-button>
                      </el-col>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </template>
            </div>
            <div class="add">
              <el-button type="text" :disabled="isSelfClub" class="p" @click="changeInfo">修改课程</el-button>
              <template>
                <el-dialog title="修改课程" :append-to-body="true" :visible.sync="dialogFormVisible3">
                  <template>
                    <!--修改课程-->
                    <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
                      <el-form-item label="课程:" prop="kcName" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-model="currentSelectRow.KCNO" :placeholder="currentSelectRow.kcName" style="width:100%" @change="Selectchange2">
                            <el-option v-for="item in kecheng" :key="item.kcno" :label="item.kcName" :value="item.kcno"></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="课程底色:" prop="kcbSort" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-model="currentSelectRow.kcbSort" @change="ceshihcange" :placeholder="currentSelectRow.kcbSort" style="width:100%">
                            <el-option label="白底" value="1"></el-option>
                            <el-option label="灰底" value="2"></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="教练:" prop="JLIDs" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-model="currentSelectRow.JLID" :placeholder="currentSelectRow.JLIDs" style="width:100%" @change="Selectchange3">
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
                          <el-date-picker v-model="currentSelectRow.kcStime" disabled value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" style="width:100%;">
                          </el-date-picker>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="上课时间:" prop="Stime" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-time-picker v-model="currentSelectRow.Stime" value-format="HH:mm" format="HH:mm" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
                          <el-time-picker v-model="currentSelectRow.Etime" value-format="HH:mm" format="HH:mm" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
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
                          <el-button type="primary" @click="editForm('currentSelectRow')" style="background-color: #00BC71;border-color: #00BC71;">确定
                          </el-button>
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
                    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px">
                      <el-form-item label="门店:" prop="door" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-if="clubs[clubIndex]" disabled v-model="clubs[clubIndex].Hsxx_Name" :placeholder="clubs[clubIndex].Hsxx_Name" style="width:100%" @change="Selectchange5">
                            <el-option v-for="item in mendian" :key="item.Hsxx_Hsid" :label="item.Hsxx_Name" :value="item.Hsxx_Hsid"></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                      <el-form-item prop="date" label="上课日期:" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-date-picker type="date" placeholder="请选择" format="yyyy-MM-dd" disabled v-model="currentSelectRow.kcStime" style="width: 100%;"></el-date-picker>
                        </el-col>
                      </el-form-item>
                      <el-form-item prop="time" label="上课时间:" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-time-picker v-model="currentSelectRow.Stime" value-format="HH:mm" disabled format="HH:mm" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
                          <el-time-picker v-model="currentSelectRow.Etime" value-format="HH:mm" disabled format="HH:mm" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="预约课程:" prop="yycourse" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-model="currentSelectRow.kcName" disabled placeholder="请选择" style="width:100%" @change="Selectchange2">
                            <el-option v-for="item in kecheng" :key="item.ID" :label="item.kcName" :value="item.ID"></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="姓名/电话:" prop="name" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model="ruleForm2.name" placeholder="请输入" @change="inputchange"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="会员/体验客户:" prop="consumer" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-model="ruleForm2.consumer" @change="optionchange" placeholder="请选择" style="width:100%">
                            <el-option label="会员" value="member"></el-option>
                            <el-option label="体验客户" value="experience"></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="会员卡/体验券:" prop="card" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-select v-model="ruleForm2.card" placeholder="请选择" style="width:100%">
                            <el-option v-for="item in kazhong" :key="item.id" :label="item.CTName" :value="item.id"></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                      <el-form-item class="dialog-footer">
                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                          <el-button @click="resetForm('ruleForm2')">重置</el-button>
                          <el-button type="primary" @click="yuyueForm('ruleForm2')" style="background-color: #00BC71;border-color: #00BC71;">确定
                          </el-button>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-dialog>
              </template>
            </div>
            <div class="add2">
              <el-button type="text" :disabled="isSelfClub" class="p" @click="Delcourse">删除课程</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="practice-table">
      <el-row>
        <el-col :span="24">
          <el-table highlight-current-row ref="singleTable" @current-change="handleCurrentChange2" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" @row-click="rowClick" :default-sort="{order: 'descending'}" style="width: 100%" :header-cell-style="{background:'#fafafa'}">
            <el-table-column align="center" prop="radio" fixed width="50px">
              <template slot-scope="scope">
                <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <!---->
            <el-table-column prop="kcName" align="left" label="课程名称"></el-table-column>
            <el-table-column align="left" label="开课时间">
              <template slot-scope="scope">
                <span>{{scope.row.Stime.substring(0,5)}}--{{scope.row.Etime.substring(0,5)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="kcbSort" align="left" sortable label="底色"></el-table-column>
            <el-table-column prop="JLIDs" align="left" label="教练"></el-table-column>
            <el-table-column align="left" label="已预约">
              <template slot-scope="scope">
                <span>{{scope.row.group_curriculum_appointment_count}}/{{scope.row.RenShu}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="kcDiff" align="left" label="难度" fixed="right"></el-table-column>
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
  props: [
    "floorGoods",
    "weekDay",
    "classrooms",
    "subjects",
    "coachs",
    "clubs",
    "clubIndex",
    "isSelfClub"
  ],
  data() {
    return {
      kechengname: "",
      jiaolianname: "",
      jiaoshi: [],
      kecheng: [],
      jiaolian: [],
      tableData: [],
      tablelength: 0,
      mendian: [],
      value2: "",
      formLabelWidth: "130px",
      radio: "",
      startTime: "",
      endTime: "",
      kcStime: "",
      ruleForm: {
        course: "", //课程
        courseclassify: "", //课程分类
        train: "", //教练
        room: "", //教室
        attendtime: "", //上课时间
        endtime: "", //结束时间
        attenddate: "", //课程日期
        galleryful: "", //容纳人数
        difficulty: "", //难度
        price: "" //价格
      },
      ruleForm2: {
        door: "", //门店
        date: "", //上课日期
        time: "", //上课时间
        yycourse: "", //预约课程
        consumer: "", //会员/体验客户
        name: "", //姓名
        card: "" //卡种
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
        endtime: [
          { required: true, message: "请选择结束时间", trigger: "change" }
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
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        consumer: [
          { required: true, message: "请选择会员/体验客户", trigger: "change" }
        ],
        card: [{ required: true, message: "请选择卡种", trigger: "change" }]
      },
      currentSelectRow: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      currentPage: 1,
      pagesize: 10,
      kazhong: []
    };
  },
  watch: {
    floorGoods: {
      deep: true,
      handler(val, oldVal) {
        switch (this.weekDay) {
          case 1:
            this.tableData = val.list.Monday;
            this.kcStime = val.week.Monday;
            break;
          case 2:
            this.tableData = val.list.Tuesday;
            this.kcStime = val.week.Tuesday;
            break;
          case 3:
            this.tableData = val.list.Wednesday;
            this.kcStime = val.week.Wednesday;
            break;
          case 4:
            this.tableData = val.list.Thursday;
            this.kcStime = val.week.Thursday;
            break;
          case 5:
            this.tableData = val.list.Friday;
            this.kcStime = val.week.Friday;
            break;
          case 6:
            this.tableData = val.list.Saturday;
            this.kcStime = val.week.Saturday;
            break;
          case 7:
            this.tableData = val.list.Sunday;
            this.kcStime = val.week.Sunday;
            break;
        }
        if (this.tableData != null) {
          this.tableData.map((item, index) => {
            item.kcName = item.curriculum_subject.kcName;
            item.JLIDs = item.staff_info.YGXX_NAME;
          });
          this.tablelength = this.tableData.length;
        } else {
          this.tableData = [];
        }
      }
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
  created() {
    // console.log(this.kecheng[0].kcName);
  },
  methods: {
    radiochange(row) {},
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    getCurrentRow(val) {},
    rowClick(row, event, column) {
      this.radio = row.index;
      //获取表格数据
      this.currentSelectRow = row;
      this.radio = this.tableData.indexOf(row);
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
    //查询姓名
    searchname() {
      let _this = this;
      var loginParams = {
        name: _this.ruleForm2.name, //姓名
        sign: _this.ruleForm2.consumer //类别experience  member
      };
      requestLogin("/getSearchName", loginParams, "post")
        .then(function(res) {
          if (loginParams.sign == "member") {
            _this.kazhong = [];
            var membership_card = res.membership_card;
            for (var i = 0; i < membership_card.length; i++) {
              var item = membership_card[i];
              var cardType = { CTID: "", CTName: "" };
              cardType.id = item.id;
              cardType.CTName =
                item.card_type.CTName +
                " (" +
                (item.isEnabled == 1 ? "已启用" : "已禁用") +
                "; 到期时间:" +
                item.eTime +
                "; 状态:" +
                item.State +
                "";
              if (item.SYCS > 0) {
                cardType.CTName =
                  cardType.CTName + "; 剩余次数:" + item.SYCS + ")";
              } else if (item.SYJE > 0) {
                cardType.CTName =
                  cardType.CTName + "; 剩余金额:" + item.SYJE + ")";
              } else {
                cardType.CTName = cardType.CTName + ")";
              }
              _this.kazhong.push(cardType);
            }
          } else {
            _this.kazhong = [];
            var customer_voucher = res.customer_voucher;
            for (var i = 0; i < customer_voucher.length; i++) {
              var item = customer_voucher[i];
              var cardType = { CTID: "", CTName: "" };
              cardType.id = customer_voucher[i].id;
              cardType.CTName =
                item.experience_voucher.tkName +
                " (到期时间:" +
                item.endTime +
                "; 剩余次数:" +
                item.surplus +
                ")";
              _this.kazhong.push(cardType);
            }
          }
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
    //预约团课
    yuyueForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认预约课程吗？", "提示").then(() => {
            var formData = {
              kcbId: this.currentSelectRow.ID, //课程编号
              cardId: this.ruleForm2.card, //会员卡id
              sign: this.ruleForm2.consumer, //查询类别
              hsid: this.clubs[this.clubIndex].Hsxx_Hsid //会所id
            };
            requestLogin("/SetGroupReserve", formData, "post")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "预约成功",
                  type: "success"
                });
                this.dialogFormVisible2 = false;
                this.$emit("regetData");
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
    //修改课程
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认修改吗？", "提示").then(() => {
            var kcbSortid='1';
            if(this.currentSelectRow.kcbSort=='灰底' || this.currentSelectRow.kcbSort=='2'){
                kcbSortid='2'
            }
            if(this.currentSelectRow.kcbSort=='白底' || this.currentSelectRow.kcbSort=='1'){
                kcbSortid='1'
            }
            var formData = {
              kcStime: this.currentSelectRow.kcStime, //课程日期
              KCNO: this.currentSelectRow.KCNO, //所选课程id
              kcbSort: kcbSortid, //灰底白底
              JLID: this.currentSelectRow.JLID, //教练id
              kcPlace: this.currentSelectRow.kcPlace, //教室
              Etime: this.currentSelectRow.Etime, //结束时间
              Stime: this.currentSelectRow.Stime, //开课时间
              RenShu: this.currentSelectRow.RenShu, //容纳人数
              kcDiff: this.currentSelectRow.kcDiff, //课程难度
              price: this.currentSelectRow.price //价格
            };
            requestLogin(
              "/CurTableInfo/" + this.currentSelectRow.ID,
              formData,
              "put"
            )
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.dialogFormVisible3 = false;
                // this.$emit('regetData');
                if(this.currentSelectRow.kcbSort=='1'){
                  this.currentSelectRow.kcbSort='白底';
                }else if(this.currentSelectRow.kcbSort=='2'){
                  this.currentSelectRow.kcbSort='灰底';
                }
                console.log('this.kechengname:'+this.kechengname);
                for(var i=0;i<this.tableData.length;i++){
                   if(this.tableData[i].ID==this.currentSelectRow.ID){
                     this.tableData[i].kcbSort=this.currentSelectRow.kcbSort;//底色
                     this.tableData[i].curriculum_subject.kcName = this.kechengname == '' ? this.tableData[i].curriculum_subject.kcName : this.kechengname;//课程名称
                     this.tableData[i].staff_info.YGXX_NAME = this.jiaolianname == '' ? this.tableData[i].staff_info.YGXX_NAME : this.jiaolianname;//教练
                     this.tableData[i].Etime = this.currentSelectRow.Etime;//结束时间
                     this.tableData[i].Stime = this.currentSelectRow.Stime;//开始时间
                     this.tableData[i].kcDiff = this.currentSelectRow.kcDiff;//难度
                     this.tableData[i].RenShu = this.currentSelectRow.RenShu;//人数
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
            requestLogin(
              "/CurTableInfo/" + _this.currentSelectRow.ID,
              {},
              "delete"
            ).then(response => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              for(var i=0;i<this.tableData.length;i++){
                   if(this.tableData[i].ID==this.currentSelectRow.ID){
                     this.tableData.splice(i,1);
                   }
                }
            });
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
              kcStime: this.kcStime, //课程日期
              KCNO: this.ruleForm.course, //所选课程id
              kcbSort: this.ruleForm.courseclassify, //灰底白底
              JLID: this.ruleForm.train, //教练id
              kcPlace: this.ruleForm.room, //教室
              Stime: this.ruleForm.attendtime, //开始时间
              Etime: this.ruleForm.endtime, //结束时间
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
                this.dialogFormVisible = false;
                formData.kcName = this.kechengname;
                formData.JLIDs = this.jiaolianname;
                formData.kcbSort = this.ruleForm.courseclassify;
                if(this.ruleForm.courseclassify=='1'){
                  formData.kcbSort='白底';
                }else{
                  formData.kcbSort='灰底';
                }
                this.tableData.push(formData);
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    inputchange(val) {},
    Selectchange2(val) {
      this.kecheng.map((item, index) => {
        if (val == item.kcno) {
          this.kechengname = item.kcName;
        }
      });
    },
    Selectchange3(val) {
      this.jiaolian.map((item, index) => {
        if (val == item.YGXX_YGID_NEI) {
          this.jiaolianname = item.YGXX_NAME;
        }
      });
    },
    Selectchange4(val) {},
    Selectchange5(val) {},
    optionchange(val) {
      this.searchname();
      if (this.ruleForm2.consumer == "experience") {
        this.ruleForm2.card = "";
        this.kazhong = [];
        this.$message({
          message:
            "体验客户的唯一标识非姓名,请输入电话号码,如已输入请忽略此提示!",
          type: "warning"
        });
      } else {
        this.ruleForm2.card = "";
        this.kazhong = [];
      }
    },
    ceshihcange(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
@import "@/styles/group.scss";
</style>