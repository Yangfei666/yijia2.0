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
            <!-- <el-date-picker type="daterange" range-separator="至" :readonly="true" style="width:250px;margin-top:2px" :start-placeholder="Monday" :end-placeholder="Sunday"></el-date-picker> -->
            <el-date-picker v-model="dateValue" @change="changeWeek" :clearable="false" type="week" format="yyyy 第 WW 周" placeholder="选择周" :firstDayOfWeek="1" style="margin-top:-3px;width:153px"></el-date-picker>
          </div>
          <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane name="Monday">
              <span slot="label">周一
                <b style="font-size:12px">({{this.getsubstr('Monday')}})</b>
              </span>
            </el-tab-pane>
            <el-tab-pane name="Tuesday">
              <span slot="label">周二
                <b style="font-size:12px">({{this.getsubstr('Tuesday')}})</b>
              </span>
            </el-tab-pane>
            <el-tab-pane name="Wednesday">
              <span slot="label">周三
                <b style="font-size:12px">({{this.getsubstr('Wednesday')}})</b>
              </span>
            </el-tab-pane>
            <el-tab-pane name="Thursday">
              <span slot="label">周四
                <b style="font-size:12px">({{this.getsubstr('Thursday')}})</b>
              </span>
            </el-tab-pane>
            <el-tab-pane name="Friday">
              <span slot="label">周五
                <b style="font-size:12px">({{this.getsubstr('Friday')}})</b>
              </span>
            </el-tab-pane>
            <el-tab-pane name="Saturday">
              <span slot="label">周六
                <b style="font-size:12px">({{this.getsubstr('Saturday')}})</b>
              </span>
            </el-tab-pane>
            <el-tab-pane name="Sunday">
              <span slot="label">周日
                <b style="font-size:12px">({{this.getsubstr('Sunday')}})</b>
              </span>
            </el-tab-pane>
            <Culum :courseDaily="courseDaily" :SystemSetup="SystemSetup" :whichDay="whichDay" :coachList="coachList" v-if="hackReset" v-on:listcentevent="listcentevent" :yuyue="yuyue"></Culum>
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
      huisuoid:'',
      hackReset: true,
      startTimes:'',
      endTimes:"",
      whichDays:"",
      activeName: "Monday", //选择的周几
      courseTotal: {}, //全部课程
      courseDaily: {}, //每日课程
      SystemSetup: {}, //会所设置
      week: {}, // 当前数据是哪一周的
      coachList: [], //本会所教练
      dateValue: "", // 时间值-哪一周
    };
  },
  computed: {
    whichDay() {
      //选择了哪一天
      return this.week[this.activeName];
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
  created() {
    let day = this.getFirstDayOfWeek(new Date());
    let FirstDay = this.GetDateStr(0, day);
    this.getPrivateTable(FirstDay);
    this.huisuoid = JSON.parse(sessionStorage.getItem("club")).Hsxx_Hsid;
  },
  methods: {
    yuyue:function(){
      this.getCoachList();
      },
    listcentevent(data){
      this.startTimes = data.startTime;
      this.endTimes = data.endTime;
      this.whichDays = data.whichDay;
    },
    // 改变时间
    changeWeek() {
      this.getPrivateTable(this.Monday);
    },
    // 获取教练列表
    getCoachList() {
      var coachlist = {
        kcStime:this.whichDays,
        Stime:this.startTimes,
        Etime:this.endTimes,
        hsid:this.huisuoid
      };
      request("/getCoachListByDateAndTime",coachlist, "post")
        .then(data => {
          this.coachList = data;
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
    //获取课表数据
    getPrivateTable(day) {
      request("/CurTableInfo/create?day=" + day, {}, "get")
        .then(data => {
          this.courseTotal = data.list;
          this.SystemSetup = data.SystemSetup;
          this.week = data.week;
          //根据week的value值得到它的key值
          let findKey = (value, compare = (a, b) => a === b) => {
            return Object.keys(data.week).find(k =>
              compare(data.week[k], value)
            );
          };
          //调用上述方法,把当前日期传过去,得到当前日期对应的星期,并把星期赋给activeName
          this.activeName = findKey(this.getNowFormatDate());
          if(this.activeName==null){
              this.activeName='Monday';
          }
          this.courseDaily = this.courseTotal[this.activeName];
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
    getsubstr(name) {
      var dates = this.week[name];
      if (dates != null) {
        return dates.substring(5);
      }
    },
    // 切换日期
    handleClick(tab, event) {
      this.courseDaily = this.courseTotal[this.activeName];
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/privateculum.scss";
</style>
