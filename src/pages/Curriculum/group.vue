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
                                            <el-select v-model="formInline.club" placeholder="请选择" style="width:230px">
                                                <el-option v-for="item in club" :key="item.Hsxx_Hsid" :label="item.Hsxx_Name" :value="item.Hsxx_Hsid"></el-option>
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
                        <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:250px;margin-top:5px;margin-right:10px;"></el-date-picker>
                        <el-select v-model="value" placeholder="请选择" style="width:140px" @change="Changeselect">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="周一" name="monday">
                            <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject" :clubs="club" :weekDay='1'></Grouptimetable>
                        </el-tab-pane>
                        <el-tab-pane label="周二" name="tuesday">
                            <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject" :clubs="club" :weekDay='2'></Grouptimetable>
                        </el-tab-pane>
                        <el-tab-pane label="周三" name="wednesday">
                            <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject" :clubs="club" :weekDay='3'></Grouptimetable>
                        </el-tab-pane>
                        <el-tab-pane label="周四" name="thursday">
                            <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject" :clubs="club" :weekDay='4'></Grouptimetable>
                        </el-tab-pane>
                        <el-tab-pane label="周五" name="friday">
                            <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject" :clubs="club" :weekDay='5'></Grouptimetable>
                        </el-tab-pane>
                        <el-tab-pane label="周六" name="saturday">
                            <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject" :clubs="club" :weekDay='6'></Grouptimetable>
                        </el-tab-pane>
                        <el-tab-pane label="周日" name="weekday">
                            <Grouptimetable :floorGoods='tdlist' :classrooms="classroom" :coachs="coach" :subjects="subject" :clubs="club" :weekDay='7'></Grouptimetable>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-row>
    </div>
</template>
<script>
import Grouptimetable from "@/components/grouptimetable";
import { requestLogin } from "@/api/api";
export default {
  name: "group",
  components: {
    Grouptimetable
  },
  data() {
    return {
      tdlist: [],
      classroom:[],      
      coach:[],      
      subject:[],      
      formInline: {
        club: []
      },
      club: [],
      activeName: "monday",
      value6: "",
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
    };
  },
  created() {
    this.getGroup();
    setTimeout(() => {
      this.rolegourp();
    }, 1500);
    setTimeout(() => {
      this.getClub();
    }, 2000);
  },
  methods: {
    //获取团课课程表数据
    getGroup() {
      let _this = this;
      requestLogin("/CurTableInfo", {}, "get")
        .then(function(res) {
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
        .then(function(res) {
          let { classroom, coach, subject } = res;
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
        .then(function(res) {
          _this.club = res;
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
    handleClick(tab, event) {
      console.log(tab,event);
    },
    Changeselect(val){
        console.log(val)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/group.scss";
</style>
