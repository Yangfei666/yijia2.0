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
              <el-breadcrumb-item>员工业绩报表</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="practice-head">
          <el-col :span="24" class="weber">
            <span class="weber-span">员工业绩报表</span>
            <div class="main-right">
              <div class="block3">
                <el-form ref="form" :model="form" label-width="85px">
                  <el-col :span="20" style="height:50px">
                    <el-form-item label="员工姓名:">
                      <el-col :span="24">
                        <el-select v-if="staffList.length > 0" @change="selectStaff" v-model="form.region" :placeholder="staffList[0].name" style="width:200px">
                          <el-option v-for="staff in staffList" :key="staff.id" :label="staff.name" :value="staff.id"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-form>
              </div>
              <div class="block2">
                <div class="block">
                  <el-col :span="24">
                    <el-date-picker @change="getSelectDate" value-format="yyyy-MM" v-model="value4" type="month" placeholder="选择月"></el-date-picker>
                    <el-date-picker @change="getSelectDate" value-format="yyyy" v-model="value5" type="year" placeholder="选择年"></el-date-picker>
                  </el-col>
                </div>
              </div>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-col :span="24" class="staffchart">
      <div class="staff-main">
        <div id="staffchart" :style="{width: '100%', height: '415px'}"></div>
      </div>
    </el-col>
    <el-col :span="24" class="staffchart">
      <div class="staff-main">
        <div id="staffchart2" :style="{width: '100%', height: '415px'}"></div>
      </div>
    </el-col>
    <el-col :span="24" class="staffchart">
      <div class="staff-main">
        <div id="staffchart3" :style="{width: '100%', height: '415px'}"></div>
      </div>
    </el-col>
    <el-col :span="24" class="staffchart">
      <div class="staff-main">
        <div id="staffchart4" :style="{width: '100%', height: '415px'}"></div>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="Totalachievement">
        <el-col :span="12" class="Total-head">
          <div id="staffchart5" :style="{width: '100%', height: '300px'}"></div>
        </el-col>
        <div class="box4"></div>
        <el-col :span="12" class="Total-head">
          <div id="staffchart6" :style="{width: '100%', height: '300px'}"></div>
        </el-col>
      </div>
    </el-col>
        <el-col :span="24">
      <div class="Totalachievement">
        <el-col :span="12" class="Total-head">
          <div id="staffchart5" :style="{width: '100%', height: '300px'}"></div>
        </el-col>
        <div class="box4"></div>
        <el-col :span="12" class="Total-head">
          <div id="staffchart6" :style="{width: '100%', height: '300px'}"></div>
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
import { requestLogin } from "@/api/api";

let staff = {
  getList() {
    return requestLogin(`/setStaffInfo`, {}, "get");
  },
  getChart(date, id, params) {
    return requestLogin(`/chart/getStaffData/${date}/${id}`, params, "get");
  }
};

function getDaysInMonth(year, month) {
  var month = parseInt(month, 10);
  var temp = new Date(year, month, 0);
  return temp.getDate();
}

export default {
  name: "staffearningreport",
  data() {
    return {
      form: {
        region: ""
      },
      radio4: "今天",
      value2: "",
      value4: "",
      value5: "",
      staffChartData: {
        adviser: [],
        achievement: {},
        experience: {},
        intention: {},
        prospect: {}
      },
      staffList: [],
      selectDate: "2018-8",
      selectStaffID: 0
    };
  },
  beforeMount() {
    this.getStaffList();
  },
  methods: {
    selectStaff(id) {
      this.selectStaffID = id;
      this.getStaffChart(id, this.selectDate);
    },
    getStaffChart(id, date) {
      let _this = this;
      let params = {
        date,
        id
      };
      staff
        .getChart(date, id, params)
        .then(res => {
          Object.assign(_this.staffChartData, res);
        })
        .then(() => {
          setTimeout(() => {
            _this.drawLine(_this.staffChartData.intention.timeAchievement);
            _this.drawBar(_this.staffChartData.achievement.timeAchievement);
          }, 500);
        });
    },
    getStaffList() {
      let _this = this;
      staff
        .getList()
        .then(res => {
          _this.staffList = res.map(item => {
            let temp = {};
            temp.id = item.YGXX_YGID_NEI;
            temp.name = item.YGXX_NAME;
            return temp;
          });
        })
        .then(() => {
          _this.selectStaffID = _this.staffList[0].id;
          _this.getStaffChart(_this.staffList[0].id, _this.selectDate);
        });
    },
    handleClick(tab, event) {},
    drawBar(achievement) {
      let staffchart = echarts.init(document.getElementById("staffchart"));
      let option = {
        title: {
          text: "私教/团课业绩构成柱状图",
          textStyle: {
            color: "#595959",
            fontSize: "20px"
          },
          top: "5%",
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
          data: this.detailLegend(achievement),
          top: "5%"
        },
        grid: {
          left: "1%",
          right: "2%",
          bottom: "1%",
          top: "20%",
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
        series: this.detailBarData(achievement)
      };
      staffchart.setOption(option);
    },
    drawLine(increased) {
      let staffchart2 = echarts.init(document.getElementById("staffchart2"));
      let staffchart3 = echarts.init(document.getElementById("staffchart3"));
      let staffchart4 = echarts.init(document.getElementById("staffchart4"));
      let option2 = {
        title: {
          text: "体验客户新增折线图",
          textStyle: {
            color: "#595959",
            fontSize: "20px"
          },
          top: "5%",
          left: "1%"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.detailLegend(increased),
          top: "5%"
        },
        grid: {
          left: "1%",
          right: "2%",
          bottom: "1%",
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
          type: "value"
        },
        series: this.detailLineData(increased)
      };
      let option3 = {
        title: {
          text: "潜在客户变化折线图",
          textStyle: {
            color: "#595959",
            fontSize: "20px"
          },
          top: "5%",
          left: "1%"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.detailLegend2(increased),
          top: "5%"
        },
        grid: {
          left: "1%",
          right: "2%",
          bottom: "1%",
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
          type: "value"
        },
        series: this.detailLineData2(increased)
      };
      let option4 = {
        title: {
          text: "定金客户变化折线图",
          textStyle: {
            color: "#595959",
            fontSize: "20px"
          },
          top: "5%",
          left: "1%"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.detailLegend3(increased),
          top: "5%"
        },
        grid: {
          left: "1%",
          right: "2%",
          bottom: "1%",
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
          type: "value"
        },
        series: this.detailLineData3(increased)
      };
      staffchart2.setOption(option2);
      staffchart3.setOption(option3);
      staffchart4.setOption(option4);
    },
    drawPie() {
      //饼图
      let staffchart5 = echarts.init(document.getElementById("staffchart5"));
      let staffchart6 = echarts.init(document.getElementById("staffchart6"));
      let option5 = {
        title: {
          text: "私教团课业绩占比图",
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
          data: ['私教业绩','团课业绩'],
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
              "#1B0AD7"
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
                value: 23,
                name: "私教业绩"
              },
              {
                value:45,
                name: "团课业绩"
              }
            ]
          }
        ]
      };
      let option6 = {
        title: {
          text: "体验客户成交量占比图",
          x: "left",
          textStyle: {
            color: "#595959",
            fontSize: "34px"
          },
          top: "2%",
          left: "1%"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          x: "right",
          data: pro_adviser,
          orient: "vertical",
          right: 5,
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
              "#1B0AD7"
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
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
            ]
          }
        ]
      };
      staffchart5.setOption(option5);
      staffchart6.setOption(option6);
      window.onresize = function() {
        staffchart5.resize();
        setTimeout(() => {
          staffchart6.resize();
        }, 500);
      };
    },
    detailXAxis() {
      let [year, month, day] = this.selectDate.split("-");
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
    detailBarData(object, type = "bar") {
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
          temp.type = type;
          temp.barGap = 0;
          return temp;
        })
        .filter(item => item.name);
    },
    detailLegend(legend) {
      return Object.keys(legend).map(item => {
        if (item === "private") {
          return "私教";
        }
        if (item === "group") {
          return "团课";
        }
        // return item;
      });
    },
    detailLegend2(legend) {
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
    detailLegend3(legend) {
      return Object.keys(legend).map(item => {
        if (item === "private") {
          return "定金客户";
        }
        // return item;
      });
    },
    detailLineData(object, type = "line") {
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
          temp.type = type;
          temp.stack = "总量";
          return temp;
        })
        .filter(item => item.name);
    },
    detailLineData2(object, type = "line") {
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
          temp.type = type;
          temp.stack = "总量";
          return temp;
        })
        .filter(item => item.name);
    },
    detailLineData3(object, type = "line") {
      let keys = Object.keys(object);
      return keys
        .map(item => {
          let temp = {};
          temp.name = "";
          if (item === "private") {
            temp.name = "定金客户";
          }
          temp.data = object[item];
          temp.type = type;
          temp.stack = "总量";
          return temp;
        })
        .filter(item => item.name);
    },
    getSelectDate(val) {
      if (val.length > 5) {
        this.value5 = "";
      } else {
        this.value4 = "";
      }
      this.selectDate = val;
      this.getStaffChart(this.selectStaffID, val);
    }
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
    position: relative;
    display: flex;
    height: 50px;
    line-height: 45px;
    .weber-span {
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      font-family: PingFang-SC-Regular;
      text-indent: 20px;
    }
    .main-right {
      width: 70%;
      position: absolute;
      right: 0px;
      z-index: 2;
      top: 0px;
      .block {
        float: right;
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
      .block2 {
        height: 32px;
        line-height: 32px;
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: flex-end;
        margin-right: 2%;
        .dsd {
          line-height: 34px;
          text-align: right;
        }
        .block1 {
          line-height: 38px;
        }
        .el-radio-button__inner {
          color: #fff;
          background-color: #00bc71;
          border-color: #00bc71;
          -webkit-box-shadow: -1px 0 0 0 #00bc71;
          box-shadow: -1px 0 0 0 #00bc71;
        }
      }
      .block3 {
        height: 50px;
        line-height: 50px;
        display: flex;
        float: left;
        .el-button--primary {
          height: 35px;
          line-height: 8px;
        }
      }
    }
  }
}

.staffchart {
  .staff-main {
    width: 97%;
    background-color: #ffffff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    height: 450px;
    margin: 20px auto;
  }
}
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
    #staffchart5 {
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
    #staffchart6 {
      position: absolute;
      right: 70px;
      top: 42px;
      width: 41%;
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
</style>
