<template>
  <div>
    <!--体验图表-->
    <el-col :span="24">
      <div class="Totalachievement">
        <el-col :span="12" class="Total-head">
          <div id="myChart11" :style="{width: '100%', height: '300px'}"></div>
        </el-col>
        <div class="box4"></div>
        <el-col :span="12" class="Total-head">
          <div id="myChart22" :style="{width: '100%', height: '300px'}" style="float: left;"></div>
        </el-col>
      </div>
    </el-col>
    <el-col v-show="dataDate.length <= 7" :span="24">
      <div class="Performancechange">
        <el-col :span="24" class="charts">
          <div id="myChart33" :style="{width: '100%', height: '410px'}"></div>
        </el-col>
      </div>
    </el-col>
    <el-col v-show="dataDate.length <= 7" :span="24">
      <div class="Performancechange">
        <el-col :span="24" class="charts">
          <div id="myChart44" :style="{width: '100%', height: '410px'}"></div>
        </el-col>
      </div>
    </el-col>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
function getDaysInMonth(year, month) {
  var month = parseInt(month, 10);
  var temp = new Date(year, month, 0);
  return temp.getDate();
}
export default {
  name: "experiencechart",
  props: {
    chartData: {
      type: Object
    },
    dataDate: {
      type: String
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val, old) {
        this.draw();
      }
    }
  },
  data() {
    return {
      sumStaffValue: 0
    };
  },
  beforeMount() {
    this.draw();
  },
  methods: {
    draw() {
      let _this = this;
      setTimeout(() => {
        let {
          adviser: exp_adviser,
          experienceData: exp_experienceData,
          experienceData: {
            staff: exp_staff,
            timeAchievement: exp_timeAchievement,
            staffTimeAchievement: exp_staffTimeAchievement
          }
        } = _this.chartData;
        _this.drawPie({ exp_experienceData, exp_staff });
        if (_this.dataDate.length <= 7) {
          _this.drawLine({ exp_timeAchievement });
          _this.drawBar({ exp_adviser, exp_staffTimeAchievement });
        }
      }, 500);
      let sum = 0;
      this.chartData.experienceData.staff.map(item => {
        sum += item.value;
      });
      this.sumStaffValue = sum;
    },
    handleClick(tab, event) {},
    drawPie({ exp_adviser, exp_experienceData, exp_staff }) {
      //饼图
      let myChart11 = echarts.init(document.getElementById("myChart11"));
      let myChart22 = echarts.init(document.getElementById("myChart22"));
      let option11 = {
        title: {
          text: "私教团课体验客户占比图",
          x: "left",
          textStyle: {
            color: "#595959",
            fontSize: "34px"
          },
          top: "1%",
          left: "1%"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          x: "right",
          data: ["团课业绩", "私教业绩"],
          orient: "vertical",
          right: 4,
          top: 40,
          bottom: 10
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            color: [
              "#2FC25B",
              "#1890FF",
              "#8378EA",
              "#E062AE",
              "#FFDB5C",
              "#41EA17",
              "#410544",
              "#EA510F",
              "#9C3205",
              "#EB1330",
              "#02374B",
              "#1B0AD7",
              "#F47378",
              "#B84A5B",
              "#660010",
              "#803A0A",
              "#7A297B",
              "#5C63CB",
              "#2B4B58",
              "#02042C",
              "#6C6710",
              "#43694E",
              "#461214",
            ],
            radius: ["53%", "70%"],
            avoidLabelOverlap: false,
            hoverAnimation: true,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "20",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: exp_experienceData.private,
                name: "私教业绩"
              },
              {
                value: exp_experienceData.group,
                name: "团课业绩"
              }
            ]
          }
        ]
      };
      let option22 = {
        title: {
          text: "员工开发体验客户占比图",
          x: "left",
          textStyle: {
            color: "#595959",
            fontSize: "34px"
          },
          top: "2%",
          left: "4%"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          x: "right",
          data: exp_adviser,
          orient: "vertical",
          right: 10,
          top: 40,
          bottom: 10
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            color: [
              "#2FC25B",
              "#1890FF",
              "#8378EA",
              "#E062AE",
              "#FFDB5C",
              "#41EA17",
              "#410544",
              "#EA510F",
              "#9C3205",
              "#EB1330",
              "#02374B",
              "#1B0AD7",
              "#F47378",
              "#B84A5B",
              "#660010",
              "#803A0A",
              "#7A297B",
              "#5C63CB",
              "#2B4B58",
              "#02042C",
              "#6C6710",
              "#43694E",
              "#461214",
            ],
            radius: ["53%", "70%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "20",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: exp_staff
          }
        ]
      };
      myChart11.setOption(option11);
      myChart22.setOption(option22);
      window.onresize = function() {
        myChart11.resize();
        setTimeout(() => {
          myChart22.resize();
        }, 500);
      };
    },
    drawLine({ exp_timeAchievement }) {
      //折线图
      let myChart33 = echarts.init(document.getElementById("myChart33"));
      myChart33.setOption({
        title: {
          text: "团课/私教体验客户变化折线图",
          textStyle: {
            color: "#595959",
            fontSize: "20px"
          },
          top: "4%",
          left: "1%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: this.detailLegend(exp_timeAchievement),
          top: "4%"
        },
        grid: {
          left: "1%",
          right: "2%",
          bottom: "3%",
          top: "14%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.detailXAxis()
        },
        yAxis: {
          type: "value"
        },
        series: this.detailLineData(exp_timeAchievement)
      });
      window.onresize = function() {
        myChart33.resize();
      };
    },
    detailXAxis() {
      let [year, month, day] = this.dataDate.split("-");
      if (!month) {
        return "1,2,3,4,5,6,7,8,9,10,11,12".split(",").map(item => {
          return `${year}-${item}`;
        });
      } else {
        let days = getDaysInMonth(year, month);
        let temp = [];
        for (let d = 1; d <= days; d++) {
          temp.push(`${month}-${d}`);
        }
        return temp;
      }
    },

    detailLegend(legend) {
      return Object.keys(legend).map(item => {
        if (item === "private") {
          return "私教";
        }
        if (item === "group") {
          return "团课";
        }
      });
    },
    detailLineData(object) {
      let keys = Object.keys(object);
      return keys
        .map(item => {
          let temp = {};
          temp.name = "";
          if (item === "private") {
            temp.name = "私教";
          }
          if (item === "group") {
            temp.name = "团课";
          }
          temp.data = object[item];
          temp.type = "line";
          temp.stack = "总量";
          return temp;
        })
        .filter(item => item.name);
    },
    drawBar({ exp_adviser, exp_staffTimeAchievement }) {
      //柱状图
      let myChart44 = echarts.init(document.getElementById("myChart44"));
      myChart44.setOption({
        title: {
          text: "员工开发体验客户柱状图",
          textStyle: {
            color: "#595959",
            fontSize: "20px"
          },
          top: "4%",
          left: "1%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: exp_adviser,
          top: "4%"
        },
        grid: {
          left: "1%",
          right: "2%",
          bottom: "3%",
          top: "14%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.detailXAxis()
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: exp_staffTimeAchievement
      });
      window.onresize = function() {
        myChart44.resize();
      };
    }
  },
  filters: {
    isNaNNumber(value) {
      return Number.isNaN(value) ? 0 : (value * 100).toFixed(2);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/experiencechart.scss";
.Totalachievement {
  width: 97%;
  height: 370px;
  margin: 10px auto;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  display: flex;
  .Total-head {
    height: 100%;
    #myChart11 {
      position: absolute;
      left: 37px;
      top: 42px;
      width: 41%;
      height: 300px;
      user-select: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      padding: 0px;
      margin: 0px;
      border-width: 0px;
    }
    #myChart22 {
      position: absolute;
      right: 70px;
      top: 42px;
      width: 45%;
      height: 300px;
      user-select: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      padding: 0px;
      margin: 0px;
      border-width: 0px;
    }
  }
  .box4 {
    width: 1px;
    height: 50%;
    background: #e8e8e8;
    float: left;
    position: relative;
    top: 23%;
    border-radius: 5px;
    left: -1%;
  }
}

.Performancechange {
  width: 97%;
  height: 440px;
  margin: 10px auto;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
}
</style>
