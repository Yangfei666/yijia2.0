<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>课程管理</el-breadcrumb-item>
              <el-breadcrumb-item>团课课程表</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">团课课程表</span>
            <div class="weber-from">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-col :span="24">
                  <el-form-item label="所属门店:">
                    <el-col :span="24">
                      <el-select v-model="formInline.club" @change="changeClub"
                                 v-if="club[selectClubIndex]"
                                 :placeholder="club[selectClubIndex].Hsxx_Name" style="width:230px">
                        <el-option v-for="item in club" :key="item.Hsxx_Hsid" :label="item.Hsxx_Name"
                                   :value="item.Hsxx_Hsid"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-form>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="group-main">
        <div class="group-head">
          <div class="group-right">
            <el-date-picker v-model="mondayDate" type="daterange" range-separator="至" :disabled="true"
                            style="width:230px;margin-top:4px"
                            :start-placeholder="Monday" :end-placeholder="Sunday"></el-date-picker>
            <el-date-picker v-model="dateValue" @change="changeWeek" :clearable="false"
                            type="week" format="yyyy 第 WW 周" placeholder="选择周" :firstDayOfWeek="1"
                            style="margin-top:-1px;width:153px"></el-date-picker>
            <el-select v-model="value" placeholder="复制课表" style="width:140px;margin-top:-2px" @change="Changeselect">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane label="周一" name="monday">
              <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject"
                              :clubIndex="selectClubIndex" :isSelfClub="isSelfClub" :clubs="club"
                              :weekDay='1'></Grouptimetable>
            </el-tab-pane>
            <el-tab-pane label="周二" name="tuesday">
              <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject"
                              :clubIndex="selectClubIndex" :isSelfClub="isSelfClub" :clubs="club"
                              :weekDay='2'></Grouptimetable>
            </el-tab-pane>
            <el-tab-pane label="周三" name="wednesday">
              <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject"
                              :clubIndex="selectClubIndex" :isSelfClub="isSelfClub" :clubs="club"
                              :weekDay='3'></Grouptimetable>
            </el-tab-pane>
            <el-tab-pane label="周四" name="thursday">
              <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject"
                              :clubIndex="selectClubIndex" :isSelfClub="isSelfClub" :clubs="club"
                              :weekDay='4'></Grouptimetable>
            </el-tab-pane>
            <el-tab-pane label="周五" name="friday">
              <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject"
                              :clubIndex="selectClubIndex" :isSelfClub="isSelfClub" :clubs="club"
                              :weekDay='5'></Grouptimetable>
            </el-tab-pane>
            <el-tab-pane label="周六" name="saturday">
              <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject"
                              :clubIndex="selectClubIndex" :isSelfClub="isSelfClub" :clubs="club"
                              :weekDay='6'></Grouptimetable>
            </el-tab-pane>
            <el-tab-pane label="周日" name="weekday">
              <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject"
                              :clubIndex="selectClubIndex" :isSelfClub="isSelfClub" :clubs="club"
                              :weekDay='7'></Grouptimetable>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
  import Grouptimetable from "@/components/grouptimetable";
  import {requestLogin} from "@/api/api";

  let group = {
    copyTable(params) {
      return requestLogin("/copyCurTable", params, "post");
    },
    getUserInfo() {
      return requestLogin("/PersonalCenter", {}, "get");
    },
    changeGroup(params) {
      return requestLogin("/showCurTableWeek", params, "post");
    }
  };
  export default {
    name: "group",
    components: {
      Grouptimetable
    },
    data() {
      return {
        tdlist: [],
        classroom: [],
        coach: [],
        subject: [],
        formInline: {
          club: []
        },
        club: [],
        activeName: "monday",
        value: "",
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
        selectClubID: null,
        selectClubIndex: -1,
        dateValue: "",// 时间值-哪一周
        mondayDate: '',
        isSelfClub: false,
        copy_selectClubIndex: -1,
      };
    },
    created() {
      let _this = this;
      Promise.all([this.getUserInfo(), this.rolegourp(), this.getGroup()])
        .then(res => {
          _this.getClub();
        })
        .catch(error => {
          console.log(error);
        });
    },
    computed: {
      whichDay() {//选择了哪一天
        return this.week[this.activeName];
      },
      //周一
      Monday() {
        if (this.dateValue == '') {
          this.mondayDate = this.GetDateStr(0, this.getFirstDayOfWeek(new Date()));
          return this.mondayDate;
        } else {
          this.mondayDate = this.GetDateStr(0, this.getFirstDayOfWeek(this.dateValue));
          return this.mondayDate;
        }
      },
      //周末
      Sunday() {
        if (this.dateValue == '') {
          return this.GetDateStr(0, this.getFirstDayOfWeek(new Date(), 2));
        } else {
          return this.GetDateStr(0, this.getFirstDayOfWeek(this.dateValue, 2));
        }
      }
    },
    methods: {
      //获取团课课程表数据
      async getGroup() {
        let _this = this;
        await requestLogin("/CurTableInfo", {}, "get")
          .then(function (res) {
            _this.tdlist = res;
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
      //添加课程数据(课程,教练,教室)
      rolegourp() {
        let _this = this;
        requestLogin("/getCurTableBaseInfo", {}, "post")
          .then(function (res) {
            let {classroom, coach, subject} = res;
            _this.classroom = classroom;
            _this.coach = coach;
            _this.subject = subject;
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
      //获取门店
      getClub() {
        let _this = this;
        requestLogin("/allClub", {}, "get")
          .then(function (res) {
            _this.club = res;
          })
          .then(() => {
            _this.selectClubIndex = _this.club.findIndex(item => item.Hsxx_Hsid === _this.selectClubID);
            _this.copy_selectClubIndex = _this.selectClubIndex
            if (_this.selectClubIndex < 0) {
              _this.selectClubIndex = 0;
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
      async getUserInfo() {
        let _this = this;
        await group.getUserInfo()
          .then(res => {
            _this.selectClubID = res.HSXX_HSID;
          });
      },
      async changeClub(val) {
        let _this = this;
        let sortKinds = 'now';
        let params = {
          monday: this.mondayDate,
          sort: sortKinds,
          hsid: val,
        };
        await group.changeGroup(params)
          .then(res => {
            Object.assign(_this.tdlist, res);
          })
          .then(() => {
            _this.selectClubID = val;
          })
          .catch((error) => {
            this.$message({
              message: "操作失败！",
              type: "error"
            });
          })
          .finally(() => {
            _this.selectClubIndex = _this.club.findIndex(item => item.Hsxx_Hsid === _this.selectClubID);
            if (_this.selectClubIndex < 0) {
              _this.selectClubIndex = 0;
            }
            if (_this.selectClubIndex !== _this.copy_selectClubIndex) {
              _this.isSelfClub = true;
            } else {
              _this.isSelfClub = false;
            }
          });
      },
      handleClick(tab, event) {
      },
      Changeselect(val) {
        let params = {
          classify: val,
          monday: this.mondayDate,
        };
        group.copyTable(params)
          .then(() => {
            this.$message({
              message: "复制课表成功",
              type: "success"
            });
          })
          .catch(() => {
            this.$message({
              message: "复制课表失败",
              type: "error"
            });
          });
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
      // 改变时间
      changeWeek(val) {
        this.changeClub(this.selectClubID);
      },
    }
  };
</script>
<style lang="scss" scoped>
  @import "@/styles/group.scss";
</style>
