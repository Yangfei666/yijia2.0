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
                <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:250px;margin-top:4px"></el-date-picker>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                <el-tab-pane label="周一" name="Monday"></el-tab-pane>
                <el-tab-pane label="周二" name="Tuesday"></el-tab-pane>
                <el-tab-pane label="周三" name="Wednesday"></el-tab-pane>
                <el-tab-pane label="周四" name="Thursday"></el-tab-pane>
                <el-tab-pane label="周五" name="Friday"></el-tab-pane>
                <el-tab-pane label="周六" name="Saturday"></el-tab-pane>
                <el-tab-pane label="周日" name="Weekday"></el-tab-pane>
                <Culum :courseDaily="courseDaily" :SystemSetup="SystemSetup"></Culum>
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
      activeName: "Monday",
      courseTotal: {}, //全部课程
      courseDaily: {}, //每日课程
      SystemSetup:{}, //会所设置
      value6: "",
      value1: "",
      value: ""
    };
  },
  created() {
    let day = this.getFirstDayOfWeek(new Date());
    let FirstDay = this.GetDateStr(0, day);
    this.getPrivateTable(FirstDay);
  },
  methods: {
    //获取课表数据
    getPrivateTable(day) {
      request("/CurTableInfo/create?day=" + day, {}, "get")
        .then(data => {
          // console.log(data);
          // console.log(sessionStorage.getItem('access-token'));
          this.courseTotal = data.list;
          this.SystemSetup = data.SystemSetup;
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
    },
    // 获取指日期的周一时间
    getFirstDayOfWeek(date) {
      var day = date.getDay() || 7;
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1 - day
      );
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
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/privateculum.scss";
</style>
