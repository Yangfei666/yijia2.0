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
                    <el-date-picker @change="getSelectDate" value-format="yyyy-MM" v-model="value4" :clearable="false" type="month" placeholder="选择月"></el-date-picker>
                    <el-date-picker @change="getSelectDate" value-format="yyyy" v-model="value5" :clearable="false" type="year" placeholder="选择年"></el-date-picker>
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
          <div id="myChart11" :style="{width: '515px', height: '300px'}"></div>
        </el-col>
        <div class="box4"></div>
        <el-col :span="12" class="Total-head">
          <div id="myChart22" :style="{width: '515px', height: '300px'}"></div>
        </el-col>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="Totalachievement2">
        <el-col :span="12" class="Total-head">
          <div id="myChart33" :style="{width: '515px', height: '300px'}"></div>
        </el-col>
        <div class="box4"></div>
        <el-col :span="12" class="Total-head">
          <div id="myChart44" :style="{width: '515px', height: '300px'}"></div>
        </el-col>
      </div>
    </el-col>
  </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
// 引入饼图组件
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
import { requestLogin } from "@/api/api";
import moment from "moment";

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

const detailPie = legend => {
  return Object.keys(legend)
    .map(item => {
      if (item === "private") {
        return { name: "私教业绩", value: legend[item] };
      }
      if (item === "group") {
        return { name: "团课业绩", value: legend[item] };
      }
    })
    .filter(item => item);
};
const detailPie2 = legend => {
  return Object.keys(legend)
    .map(item => {
      if (item === "private") {
        return { name: "A类客户", value: legend[item] };
      }
      if (item === "group") {
        return { name: "B类客户", value: legend[item] };
      }
      if (item === "exSuc") {
        return { name: "C类客户", value: legend[item] };
      }
      if (item === "exEro") {
        return { name: "D类客户", value: legend[item] };
      }
    })
    .filter(item => item);
};
const detailPie3 = legend => {
  return Object.keys(legend)
    .map(item => {
      if (item === "exSuc") {
        return { name: "已成交", value: legend[item] };
      }
      if (item === "exEro") {
        return { name: "已放弃", value: legend[item] };
      }
      if (item === "exDef") {
        return { name: "跟进中", value: legend[item] };
      }
    })
    .filter(item => item);
};
const detailBarData = (object, type = "bar") => {
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
};
const detailLegend = legend => {
  return Object.keys(legend).map(item => {
    if (item === "private") {
      return "私教";
    }
    if (item === "group") {
      return "团课";
    }
    // return item;
  });
};
const detailLegend2 = legend => {
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
};
const detailLegend3 = legend => {
  return Object.keys(legend).map(item => {
    if (item === "sum") {
      return "定金客户";
    }
    // return item;
  });
};
const detailLineData = (object, type = "line") => {
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
};
const detailLineData2 = (object, type = "line") => {
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
};
const detailLineData3 = (object, type = "line") => {
  let keys = Object.keys(object);
  return keys
    .map(item => {
      let temp = {};
      temp.name = "";
      if (item === "sum") {
        temp.name = "定金客户";
      }
      temp.data = object[item];
      temp.type = type;
      temp.stack = "总量";
      return temp;
    })
    .filter(item => item.name);
};
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
      selectDate: moment(new Date()).format("YYYY-MM"),
      selectStaffID: 0
    };
  },
  beforeMount() {
    this.getStaffList();
  },
  created() {
    this.value4 = this.getCurrentDateTime();
  },
  methods: {
    getCurrentDateTime() {
      return moment(new Date()).format("YYYY-MM");
    },
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
            let achievementAch = {
              Data: _this.staffChartData.achievement.timeAchievement,
              chartID: "staffchart",
              chartTitle: "私教/团课业绩构成柱状图",
              yAName:"业绩",
              dataFn: detailLegend,
              seriesFn: detailBarData
            };
            _this.drawBar(achievementAch);

            let experienceAch = {
              Data: _this.staffChartData.experience.timeAchievement, //数据源
              chartID: "staffchart2", //图表ID
              chartTitle: "体验客户新增折线图", //图表标题
              yAName:"人数",
              dataFn: detailLegend, //图表legend
              seriesFn: detailLineData //图表数据
            };
            _this.drawLine(experienceAch);

            let prospectAch = {
              Data: _this.staffChartData.prospect.timeAchievement,
              chartID: "staffchart3",
              chartTitle: "潜在客户变化折线图",
              yAName:"业绩",
              dataFn: detailLegend2,
              seriesFn: detailLineData2
            };
            _this.drawLine(prospectAch);

            let intentionAch2 = {
              Data: _this.staffChartData.intention.timeAchievement,
              chartID: "staffchart4",
              chartTitle: "定金客户变化折线图",
              yAName:"业绩",
              dataFn: detailLegend3,
              seriesFn: detailLineData3
            };
            _this.drawLine(intentionAch2);

            let pieAch = {
              Data: detailPie(_this.staffChartData.achievement), //图表数据
              chartID: "myChart11",
              chartTitle: "私教团课业绩占比图",
              sername:"业绩构成"
            };
            _this.drawPie(pieAch);

            let pieInt = {
              Data: detailPie3(_this.staffChartData.experience),
              chartID: "myChart22",
              chartTitle: "体验客户成交量占比图",
              sername:"体验客户成交量占比"
            };
            _this.drawPie(pieInt);

            let piePro = {
              Data: detailPie2(_this.staffChartData.prospect),
              chartID: "myChart33",
              chartTitle: "潜在客户成交量占比图",
              sername:"潜在客户成交量占比"
            };
            _this.drawPie(piePro);

            let pieExp = {
              Data: detailPie3(_this.staffChartData.intention),
              chartID: "myChart44",
              chartTitle: "定金客户成交量占比图",
              sername:"定金客户成交量占比"
            };
            _this.drawPie(pieExp);
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

    drawPie({ Data, chartID, chartTitle, sername} = {}) {
      //饼图
      let myChart11 = echarts.init(document.getElementById(chartID));
      let option11 = {
        title: {
          text: chartTitle,
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
          data: Data.filter(item => item.name),
          orient: "vertical",
          right: 4,
          top: 40,
          bottom: 10
        },
        series: [
          {
            name: sername,
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
            data: Data
          }
        ]
      };
      myChart11.setOption(option11);
      window.onresize = function() {
        myChart11.resize();
      };
    },
    drawBar({ Data, chartID, chartTitle, dataFn, seriesFn ,yAName} = {}) {
      let staffchart = echarts.init(document.getElementById(chartID));
      let option = {
        title: {
          text: chartTitle,
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
            type: "shadow"
          }
        },
        legend: {
          data: dataFn(Data),
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
            name:yAName,
            type: "value"
          }
        ],
        series: seriesFn(Data)
      };
      staffchart.setOption(option);
    },
    drawLine({ Data, chartID, chartTitle, dataFn, seriesFn ,yAName} = {}) {
      let staffchart2 = echarts.init(document.getElementById(chartID));
      let option2 = {
        title: {
          text: chartTitle,
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
          data: dataFn(Data),
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
          name:yAName,
          type: "value"
        },
        series: seriesFn(Data)
      };
      staffchart2.setOption(option2);
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
  position: relative;
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
.Totalachievement2 {
  width: 97%;
  height: 370px;
  margin: 10px auto;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  display: flex;
  position: relative;
  .Total-head {
    height: 100%;
    #myChart33 {
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
    #myChart44 {
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
