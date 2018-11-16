<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>会所管理</el-breadcrumb-item>
              <el-breadcrumb-item>可视化数表</el-breadcrumb-item>
              <el-breadcrumb-item>会所业绩报表</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="practice-head">
          <el-col :span="24" class="weber">
            <div class="main-right">
              <div class="block">
                <el-col :span="24">
                  <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                  <el-date-picker v-model="value4" type="month" placeholder="选择月"></el-date-picker>
                  <el-date-picker v-model="value5" type="year" placeholder="选择年"></el-date-picker>
                </el-col>
              </div>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
              <el-tab-pane label="总业绩图表" name="first" :lazy="true">
                <Totalchart></Totalchart>
              </el-tab-pane>
              <el-tab-pane label="体验图表" name="second" :lazy="true">
                <Experiencechart></Experiencechart>
              </el-tab-pane>
              <el-tab-pane label="潜在图表" name="third" :lazy="true">
                <Latentchart></Latentchart>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Totalchart from '@/components/totalchart';
  import Experiencechart from '@/components/experiencechart';
  import Latentchart from '@/components/latentchart';
  import {requestLogin} from "@/api/api";

  let clubDate = {
    getChart(date, params) {
      return requestLogin(`/chart/getClubData/${date}`, params, "get");
    }
  };
  export default {
    name: 'visualization',
    components: {
      Totalchart,
      Experiencechart,
      Latentchart
    },
    data() {
      return {
        activeName: 'first',
        radio4: '今天',
        value2: '',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [
            {
              text: "今天",
              onClick(picker) {
                picker.$emit("pick", new Date());
              }
            },
            {
              text: "昨天",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
              }
            },
            {
              text: "一周前",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
              }
            }
          ]
        },
        chartTypeData: {
          achievementData: {},
          experienceData: {},
          prospectData: {},
        },
        selectChartData: {},
        selectDate: '2018',
      };
    },
    created() {
      let _this = this;
      _this.getChartDate();
    },
    methods: {
      getChartDate() {
        let _this = this;
        let date = this.selectDate;
        let params = {
          date,
        };
        clubDate.getChart(date, params)
          .then(res => {
            _this.chartTypeData.achievementData = res.achievement;
            _this.chartTypeData.experienceData = res.experience;
            _this.chartTypeData.prospectData = res.prospect;
          })
      },
      handleClick(tab) {
      },
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
      margin-top: 10px;
      position: relative;
      .main-right {
        // width: 29%;
        position: absolute;
        right: 2%;
        z-index: 2;
        .block {
          float: right;
          margin-top: -5px;
          line-height: 40px;
          .el-date-editor {
            position: relative;
            display: inline-block;
            text-align: left;
            .el-input__inner {
              -webkit-appearance: none;
              background-color: #fff;
              background-image: none;
              border-radius: 16px;
              border: 1px solid #e8e8e8;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              color: #606266;
              display: inline-block;
              font-size: inherit;
              height: 32px;
              line-height: 32px;
              outline: 0;
              padding: 0 15px;
              -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
              transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
              width: 100%;
            }
          }
          .el-date-editor.el-input,
          .el-date-editor.el-input__inner {
            width: 148px;
          }
          .el-input {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 100%;
          }
        }
        .block2 {
          float: left;
          display: flex;
          justify-content: space-between;
          border-radius: 30px;
          height: 32px;
          line-height: 32px;
          margin-top: -2px;
          margin-right: 10px;
          .el-radio-button__inner {
            color: #fff;
            background-color: #00bc71;
            border-color: #00bc71;
            -webkit-box-shadow: -1px 0 0 0 #00bc71;
            box-shadow: -1px 0 0 0 #00bc71;
          }
        }
      }
    }

  }
</style>
