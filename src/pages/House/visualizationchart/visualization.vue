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
                  <el-date-picker @change="getSelectDate" value-format="yyyy-MM-dd" value="2018-01-1" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                  <el-date-picker @change="getSelectDate" value-format="yyyy-MM" v-model="value4" type="month" placeholder="选择月"></el-date-picker>
                  <el-date-picker @change="getSelectDate" value-format="yyyy" v-model="value5" type="year" placeholder="选择年"></el-date-picker>
                </el-col>
              </div>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
              <el-tab-pane label="总业绩图表" name="first" :lazy="true">
                <Totalchart v-if="Object.keys(chartTypeData.achievementData).length !== 0" :chart-data.sync="chartTypeData.achievementData" :data-date.sync="selectDate"></Totalchart>
              </el-tab-pane>
              <el-tab-pane label="体验图表" name="second" :lazy="true">
                <Experiencechart v-if="Object.keys(chartTypeData.experienceData).length !== 0" :chart-data.sync="chartTypeData.experienceData" :data-date.sync="selectDate"></Experiencechart>
              </el-tab-pane>
              <el-tab-pane label="潜在图表" name="third" :lazy="true">
                <Latentchart v-if="Object.keys(chartTypeData.prospectData).length !== 0" :chart-data.sync="chartTypeData.prospectData" :data-date.sync="selectDate"></Latentchart>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Totalchart from "@/components/totalchart";
import Experiencechart from "@/components/experiencechart";
import Latentchart from "@/components/latentchart";
import { requestLogin } from "@/api/api";
let clubDate = {
  getChart(date, params) {
    return requestLogin(`/chart/getClubData/${date}`, params, "get");
  }
};
export default {
  name: "visualization",
  components: {
    Totalchart,
    Experiencechart,
    Latentchart
  },
  data() {
    return {
      activeName: "first",
      value1: "",
      value4: "",
      value5: "",
      chartTypeData: {
        achievementData: {},
        experienceData: {},
        prospectData: {}
      },
      selectChartData: {},
      selectDate: "2018"
    };
  },
  created() {
    let _this = this;
    _this.getChartDate();
  },
  methods: {
    async getChartDate() {
      let _this = this;
      let date = this.selectDate;
      let params = {
        date
      };
      await clubDate.getChart(date, params).then(res => {
        _this.chartTypeData.achievementData = Object.assign(
          {},
          res.achievement
        );
        _this.chartTypeData.experienceData = Object.assign({}, res.experience);
        _this.chartTypeData.prospectData = Object.assign({}, res.prospect);
      });
    },
    getSelectDate(val) {
      if (val.length > 7) {
        this.value4 = "";
        this.value5 = "";
      } else if (val.length > 5) {
        this.value5 = "";
        this.value1 = "";
      } else {
        this.value1 = "";
        this.value4 = "";
      }
      this.selectDate = val;
      this.getChartDate();
    },
    handleClick(tab) {}
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
            -webkit-transition: border-color 0.2s
              cubic-bezier(0.645, 0.045, 0.355, 1);
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
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
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
              -webkit-transition: border-color 0.2s
                cubic-bezier(0.645, 0.045, 0.355, 1);
              transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
              width: 100%;
            }
          }
          .el-date-editor.el-input,
          .el-date-editor.el-input__inner {
            width: 110px !important;
          }
          .el-input {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 100%;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 992px) and (max-width: 1280px) {
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
              -webkit-transition: border-color 0.2s
                cubic-bezier(0.645, 0.045, 0.355, 1);
              transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
              width: 100%;
            }
          }
          .el-date-editor.el-input,
          .el-date-editor.el-input__inner {
            width: 120px !important;
          }
          .el-input {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 100%;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1680px) {
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
              -webkit-transition: border-color 0.2s
                cubic-bezier(0.645, 0.045, 0.355, 1);
              transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
              width: 100%;
            }
          }
          .el-date-editor.el-input,
          .el-date-editor.el-input__inner {
            width: 120px !important;
          }
          .el-input {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 100%;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1680px) and (max-width: 1920px) {
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
              -webkit-transition: border-color 0.2s
                cubic-bezier(0.645, 0.045, 0.355, 1);
              transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
              width: 100%;
            }
          }
          .el-date-editor.el-input,
          .el-date-editor.el-input__inner {
            width: 140px !important;
          }
          .el-input {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 100%;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1920px) and (max-width: 2048px) {
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
              -webkit-transition: border-color 0.2s
                cubic-bezier(0.645, 0.045, 0.355, 1);
              transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
              width: 100%;
            }
          }
          .el-date-editor.el-input,
          .el-date-editor.el-input__inner {
            width: 150px !important;
          }
          .el-input {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
