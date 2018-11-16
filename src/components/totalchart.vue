<template>
  <div>
    <!--总业绩图表-->
    <el-col :span="24">
      <div class="Totalachievement">
        <el-col :span="12" class="Total-head">
          <div id="myChart" :style="{width: '100%', height: '410px'}"></div>
        </el-col>
        <div class="box4"></div>
        <el-col :span="12" class="Total-head">
          <div id="myChart2" :style="{width: '100%', height: '410px'}"></div>
        </el-col>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="Performancechange">
        <el-col :span="24" class="charts">
          <div id="myChart3" :style="{width: '100%', height: '410px'}"></div>
        </el-col>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="Performancechange">
        <el-col :span="24" class="charts">
          <div id="myChart4" :style="{width: '100%', height: '410px'}"></div>
        </el-col>
      </div>
    </el-col>
  </div>
</template>
<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入饼图组件
  require('echarts/lib/chart/pie');
  require('echarts/lib/chart/line');
  require('echarts/lib/chart/bar');
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');

  function getDaysInMonth(year, month) {
    var month = parseInt(month, 10);
    var temp = new Date(year, month, 0);
    return temp.getDate();
  }

  export default {
    name: 'totalchart',
    props: {
      chartData: {
        type: Object,
      },
      dataDate: {
        type: String,
      }
    },
    data() {
      return {};
    },
    beforeMount() {
      let _this = this;
      setTimeout(() => {
        let {
          adviser: ach_adviser,
          achievementData: ach_achievementData,
          achievementData: {
            staff: ach_staff,
            timeAchievement: ach_timeAchievement,
            staffTimeAchievement: ach_staffTimeAchievement,
          }
        } = _this.chartData;
        _this.drawLine({ach_timeAchievement});
        _this.drawPie({ach_adviser, ach_achievementData, ach_staff});
        _this.drawBar({ach_adviser, ach_staffTimeAchievement});
      }, 500);
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      drawPie({ach_adviser, ach_achievementData, ach_staff}) { //饼图
        let myChart = echarts.init(document.getElementById('myChart'));
        let myChart2 = echarts.init(document.getElementById('myChart2'));
        let option = {
          title: {
            text: '私教团课业绩占比图',
            x: 'left',
            textStyle: {
              color: '#595959',
              fontSize: '34px'
            },
            top: '1%',
            left: '1%'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            x: 'right',
            data: ['团课业绩', '私教业绩'],
            orient: 'vertical',
            right: 5,
            top: 40,
            bottom: 10,
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              color: ['#2FC25B', '#1890FF', '#8378EA', '#E062AE', '#FFDB5C', '#9d96f5',],
              radius: ['53%', '70%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              hoverAnimation: true, //hover放大
              label: {
                normal: {
                  show: false,
                  position: 'center',
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
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
                  value: ach_achievementData.private,
                  name: '私教业绩'
                },
                {
                  value: ach_achievementData.group,
                  name: '团课业绩'
                }]
            }
          ]
        };
        let option2 = {
          title: {
            text: '员工业绩占比图',
            x: 'left',
            textStyle: {
              color: '#595959',
              fontSize: '34px'
            },
            top: '1%',
            left: '1%'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            x: 'right',
            data: ach_adviser,
            orient: 'vertical',
            right: 5,
            top: 40,
            bottom: 10,
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              color: ['#2FC25B', '#1890FF', '#8378EA', '#E062AE', '#FFDB5C', '#13c2c2',],
              radius: ['53%', '70%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: ach_staff
            }
          ]
        };
        myChart.setOption(option);
        myChart2.setOption(option2);
      },
      drawLine({ach_timeAchievement}) { //折线图
        let myChart3 = echarts.init(document.getElementById('myChart3'));
        myChart3.setOption({
          title: {
            text: '团课/私教业绩变化折线图',
            textStyle: {
              color: '#595959',
              fontSize: '20px'
            },
            top: '4%',
            left: '1%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: Object.keys(ach_timeAchievement),
            top: '4%'
          },
          grid: {
            left: '1%',
            right: '2%',
            bottom: '3%',
            top: '14%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.detailXAxis()
          },
          yAxis: {
            type: 'value'
          },
          series: this.detailLineData(ach_timeAchievement)
        });
      },
      detailXAxis() {
        let [year, month, day] = this.dataDate.split('-');
        if (!month) {
          return '1,2,3,4,5,6,7,8,9,10,11,12'.split(',').map(item => {
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
      detailLineData(object) {
        let keys = Object.keys(object);
        return keys.map(item => {
          let temp = {};
          temp.name = item;
          temp.data = object[item];
          temp.type = 'line';
          temp.stack = '总量';
          return temp;
        });
      },
      drawBar({ach_adviser, ach_staffTimeAchievement}) { //柱状图
        let myChart4 = echarts.init(document.getElementById('myChart4'));
        myChart4.setOption({
          title: {
            text: '员工业绩柱状图',
            textStyle: {
              color: '#595959',
              fontSize: '20px'
            },
            top: '4%',
            left: '1%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ach_adviser,
            top: '4%'
          },
          grid: {
            left: '1%',
            right: '2%',
            bottom: '3%',
            top: '14%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.detailXAxis()
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: ach_staffTimeAchievement
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import '@/styles/totalchart.scss';

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
      #myChart {
        position: absolute;
        left: 37px !important;
        top: 42px !important;
        width: 41% !important;
        height: 300px !important;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        padding: 0px;
        margin: 0px;
        border-width: 0px;
      }
      #myChart2 {
        position: absolute;
        right: 70px !important;
        top: 42px !important;
        width: 41% !important;
        height: 300px !important;
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
    .change-head {
      height: 40px;
      display: flex;
      line-height: 40px;
      margin-top: 15px;
      span {
        color: #595959;
        font-size: 14px;
        text-indent: 20px;
      }
    }
  }
</style>
