<template>
    <div>
      <el-row>
        <el-col :span="24">
          <div class="practice-main">
            <el-col :span="23" class="breadcrumb">
              <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>课程管理</el-breadcrumb-item>
                  <el-breadcrumb-item>私教课程表</el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="23" class="weber">
              <span class="weber-span">私教课程表</span>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <div class="group-main">
          <div class="group-head">
            <div class="group-right">
              <el-date-picker type="daterange" range-separator="至" :clearable="false" :disabled="true" style="width:250px;margin-top:4px"
              :start-placeholder="Monday" :end-placeholder="Sunday" ></el-date-picker>
              <el-date-picker v-model="dateValue" @change="changeWeek"
              type="week" format="yyyy 第 WW 周" placeholder="选择周" :firstDayOfWeek="1" style="margin-top:-1px"></el-date-picker>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                <el-tab-pane label="周一" name="Monday"></el-tab-pane>
                <el-tab-pane label="周二" name="Tuesday"></el-tab-pane>
                <el-tab-pane label="周三" name="Wednesday"></el-tab-pane>
                <el-tab-pane label="周四" name="Thursday"></el-tab-pane>
                <el-tab-pane label="周五" name="Friday"></el-tab-pane>
                <el-tab-pane label="周六" name="Saturday"></el-tab-pane>
                <el-tab-pane label="周日" name="Sunday"></el-tab-pane>
                <Culum :courseDaily="courseDaily" :SystemSetup="SystemSetup" :whichDay="whichDay" :coachList="coachList"
                v-if="hackReset"></Culum>
            </el-tabs>
          </div>
        </div>
      </el-row>
    </div>
</template>
<script>
import Culum from "@/components/culum";
import { requestLogin as request } from "../../api/api";
export default {
  name: "privateculum",
  components: {
    Culum
  },
  data() {
    return {
      num: 1,
      hackReset: true,
      activeName: "Monday", //选择的周几
      courseTotal: {}, //全部课程
      courseDaily: {}, //每日课程
      SystemSetup: {}, //会所设置
      week: {}, // 当前数据是哪一周的
      coachList: [], //本会所教练
      dateValue: "",// 时间值-哪一周
    };
  },
  computed: {
    whichDay() {
      //选择了哪一天
      return this.week[this.activeName];
    },
    //周一
    Monday () {
      if (this.dateValue == '') {
        return this.GetDateStr(0, this.getFirstDayOfWeek(new Date()));
      } else {
        return this.GetDateStr(0, this.getFirstDayOfWeek(this.dateValue));
      }
    },
    //周末
    Sunday () {
      if (this.dateValue == '') {
        return this.GetDateStr(0, this.getFirstDayOfWeek(new Date(), 2));
      } else {
        return this.GetDateStr(0, this.getFirstDayOfWeek(this.dateValue, 2));
      }
    }
  },
  created() {
    let day = this.getFirstDayOfWeek(new Date());
    let FirstDay = this.GetDateStr(0, day);
    this.getPrivateTable(FirstDay);
    setTimeout(this.getCoachList(), 500);
  },
  methods: {
    // 改变时间
    changeWeek() {
      this.getPrivateTable(this.Monday);
    },
    // 获取教练列表
    getCoachList() {
      request("/getCurTableCoach", {}, "get")
        .then(data => {
          this.coachList = data;
        })
        .catch(error => {
          this.msgCatch(error, "对不起,教练信息加载失败");
        });
    },
    //获取课表数据
    getPrivateTable(day) {
      request("/CurTableInfo/create?day=" + day, {}, "get")
        .then(data => {
          this.courseTotal = data.list;
          this.SystemSetup = data.SystemSetup;
          this.week = data.week;
          this.activeName = "Monday";
          this.courseDaily = this.courseTotal.Monday;
        })
        .catch(error => {
          this.msgCatch(error, "对不起,私教课程表加载失败");
        });
    },
    // 切换日期
    handleClick(tab, event) {
      this.courseDaily = this.courseTotal[this.activeName];
      console.log(this.courseDaily);
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
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
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/privateculum.scss";
</style>
