<template>
  <div>
    <!--体验图表-->
    <el-col :span="24">
      <div class="Totalachievement">
        <el-col :span="12" class="Total-head">
          <div id="myChart111" :style="{width: '100%', height: '300px'}"></div>
        </el-col>
        <div class="box4"></div>
        <el-col :span="12" class="Total-head">
          <div id="myChart222" :style="{width: '100%', height: '300px'}"></div>
        </el-col>
      </div>
    </el-col>
    <el-col v-show="dataDate.length <= 7" :span="24">
      <div class="Performancechange">
        <el-col :span="24" class="charts">
          <div id="myChart333" :style="{width: '100%', height: '430px'}"></div>
        </el-col>
      </div>
    </el-col>
    <el-col v-show="dataDate.length <= 7" :span="24">
      <div class="Performancechange2">
        <el-col :span="24" class="charts">
          <div id="myChart444" :style="{width: '100%', height: '450px'}"></div>
        </el-col>
      </div>
    </el-col>
  </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入饼图组件
require("echarts/lib/chart/pie");
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");

function getDaysInMonth(year, month) {
  var month = parseInt(month, 10);
  var temp = new Date(year, month, 0);
  return temp.getDate();
}

export default {
  name: "latentchart",
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
          adviser: pro_adviser,
          prospectData: pro_prospectData,
          prospectData: {
            staff: pro_staff,
            timeAchievement: pro_timeAchievement,
            staffTimeAchievement: pro_staffTimeAchievement
          }
        } = _this.chartData;
        _this.drawPie({ pro_prospectData, pro_staff });
        if (this.dataDate.length <= 7) {
          _this.drawLine({ pro_timeAchievement });
          _this.drawBar({ pro_adviser, pro_staffTimeAchievement });
        }
      }, 500);
      let sum = 0;
      this.chartData.prospectData.staff.map(item => {
        sum += item.value;
      });
      this.sumStaffValue = sum;
    },
    handleClick(tab, event) {},
    drawPie({ pro_adviser, pro_prospectData, pro_staff }) {
      //饼图
      let myChart111 = echarts.init(document.getElementById("myChart111"));
      let myChart222 = echarts.init(document.getElementById("myChart222"));
      let option111 = {
        title: {
          text: "潜在客户成交量占比图",
          subtext: '2018-12 潜在总人数20',
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
          data: [
            {
              value: pro_prospectData.A,
              name: "A类客户"
            },
            {
              value: pro_prospectData.B,
              name: "B类客户"
            },
            {
              value: pro_prospectData.C,
              name: "C类客户"
            },
            {
              value: pro_prospectData.D,
              name: "D类客户"
            }
          ],
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
            hoverAnimation: true, //hover放大
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
                value: pro_prospectData.A,
                name: "A类客户"
              },
              {
                value: pro_prospectData.B,
                name: "B类客户"
              },
              {
                value: pro_prospectData.C,
                name: "C类客户"
              },
              {
                value: pro_prospectData.D,
                name: "D类客户"
              }
            ]
          }
        ]
      };
      let option222 = {
        title: {
          text: "员工开发潜在客户占比图",
          subtext: '2018-12 潜在总人数20',
          x: "left",
          textStyle: {
            color: "#595959",
            fontSize: "34px"
          },
          top: "2%",
          left: "25%"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          x: "right",
          data: pro_adviser,
          orient: "vertical",
          right: 10,
          top: 10,
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
            data: pro_staff
          }
        ]
      };
      myChart111.setOption(option111);
      myChart222.setOption(option222);
      window.onresize = function() {
        myChart111.resize();
        setTimeout(() => {
          myChart222.resize();
        }, 500);
      };
    },
    drawLine({ pro_timeAchievement }) {
      //折线图
      let myChart333 = echarts.init(document.getElementById("myChart333"));
      myChart333.setOption({
        title: {
          text: "潜在客户变化折线图",
          subtext: '2018-12 潜在总人数20',
          textStyle: {
            color: "#595959",
            fontSize: "20px"
          },
          top: "2%",
          left: "1%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: this.detailLegend(pro_timeAchievement),
          top: "4%"
        },
        grid: {
          left: "1%",
          right: "2%",
          bottom: "3%",
          top: "20%",
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
          name : '人数',
          type: "value"
        },
        series: this.detailLineData(pro_timeAchievement)
      });
      window.onresize = function() {
        myChart333.resize();
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
          return "A类客户";
        }
        if (item === "group") {
          return "B类客户";
        }
        if (item === "suc") {
          return "C类客户";
        }
        if (item === "sum") {
          return "D类客户";
        }
        // return item;
      });
    },
    detailLineData(object) {
      let keys = Object.keys(object);
      return keys
        .map(item => {
          let temp = {};
          temp.name = "";
          if (item === "private") {
            temp.name = "A类客户";
          }
          if (item === "group") {
            temp.name = "B类客户";
          }
          if (item === "suc") {
            temp.name = "C类客户";
          }
          if (item === "sum") {
            temp.name = "D类客户";
          }
          temp.data = object[item];
          temp.type = "line";
          temp.stack = "总量";
          return temp;
        })
        .filter(item => item.name);
    },
    drawBar({ pro_adviser, pro_staffTimeAchievement }) {
      //柱状图
      let myChart444 = echarts.init(document.getElementById("myChart444"));
      myChart444.setOption({
        title: {
          text: "潜在人数构成柱状图",
          subtext: '2018-12 潜在总人数30',
          textStyle: {
            color: "#595959",
            fontSize: "20px"
          },
          top: "2%",
          left: "1%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: pro_adviser,
          top: "1%",
          width:"90%",
          right: "1%",
        },
        grid: {
          left: "1%",
          right: "2%",
          bottom: "3%",
          top: "22%",
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
            name:"人数",
            type: "value"
          }
        ],
        series: pro_staffTimeAchievement
      });
      window.onresize = function() {
        myChart444.resize();
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
@import "@/styles/latentchart.scss";
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
    #myChart111 {
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
    #myChart222 {
      position: absolute;
      right: 70px;
      top: 42px;
      width: 50%;
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
  height: 450px;
  margin: 10px auto;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
}
.Performancechange2 {
  width: 97%;
  height: 470px;
  margin: 10px auto;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
}
</style>
