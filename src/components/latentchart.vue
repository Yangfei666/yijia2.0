<template>
  <div>
    <!--体验图表-->
    <el-col :span="24">
      <div class="Totalachievement">
        <el-col :span="12" class="Total-head">
          <el-col :span="24" class="total-span">
            <span>潜在客户成交量占比图</span>
          </el-col>
          <div id="myChart111" :style="{width: '280px', height: '300px'}" style="float: left;"></div>
          <el-col class="total-main">
            <el-col :span="12" class="total-right">
              <div class="box"></div>
              <span class="chart-span">转体验</span>
              <div class="bord"></div>
              <span class="total-bai">80.00%</span>
              <span class="total-num">￥12,624</span>
            </el-col>
            <el-col :span="12" class="total-right">
              <div class="box2"></div>
              <span class="chart-span">转定金</span>
              <div class="bord"></div>
              <span class="total-bai">80.00%</span>
              <span class="total-num">￥12,624</span>
            </el-col>
            <el-col :span="12" class="total-right">
              <div class="box3"></div>
              <span class="chart-span">转会员</span>
              <div class="bord"></div>
              <span class="total-bai">80.00%</span>
              <span class="total-num">￥12,624</span>
            </el-col>
            <el-col :span="12" class="total-right">
              <div class="box4"></div>
              <span class="chart-span">未转化</span>
              <div class="bord"></div>
              <span class="total-bai">80.00%</span>
              <span class="total-num">￥12,624</span>
            </el-col>
          </el-col>
        </el-col>
        <div class="box4"></div>
        <el-col :span="12" class="Total-head">
          <el-col :span="24" class="total-span">
            <span>员工开发潜在客户占比图</span>
          </el-col>
          <div id="myChart222" :style="{width: '280px', height: '300px'}" style="float: left;"></div>
          <el-col class="total-main">
            <el-col v-for="(item, index) in chartData.prospectData.staff" :span="11" class="total-right">
              <div :class="`box${index%6}`"></div>
              <span class="chart-span">{{item.name}}</span>
              <div class="bord"></div>
              <span class="total-bai">{{parseInt(item.value,10)/sumStaffValue}}%</span>
              <span class="total-num">￥{{item.value}}</span>
            </el-col>
          </el-col>
        </el-col>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="Performancechange">
        <el-col :span="24" class="charts">
          <div id="myChart333" :style="{width: '100%', height: '410px'}"></div>
        </el-col>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="Performancechange">
        <el-col :span="24" class="charts">
          <div id="myChart444" :style="{width: '100%', height: '410px'}"></div>
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
    name: 'latentchart',
    props: {
      chartData: {
        type: Object,
      },
      dataDate: {
        type: String,
      }
    },
    data() {
      return {
        sumStaffValue: 0,
      };
    },
    beforeMount() {
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
        this.drawLine({pro_timeAchievement});
        this.drawPie({pro_prospectData, pro_staff});
        this.drawBar({pro_adviser, pro_staffTimeAchievement});
      }, 500);
      let sum = 0
      this.chartData.experienceData.staff.map(item=>{
        sum += item.value
      })
      this.sumStaffValue = sum
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      drawPie({pro_prospectData, pro_staff}) { //饼图
        let myChart111 = echarts.init(document.getElementById('myChart111'));
        let myChart222 = echarts.init(document.getElementById('myChart222'));
        let option111 = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              color: ['#2FC25B', '#1890FF', '#FFDB5C', '#13c2c2', '#E062AE', '#8378EA',],
              radius: ['53%', '70%'],
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
                  value: 30,
                  name: '转体验'
                },
                {
                  value: 50,
                  name: '转定金'
                },
                {
                  value: 70,
                  name: '转会员'
                },
                {
                  value: 46,
                  name: '未转化'
                }]
            }
          ]
        };
        let option222 = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              color: ['#2FC25B', '#1890FF', '#8378EA', '#E062AE', '#FFDB5C', '#13c2c2',],
              radius: ['53%', '70%'],
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
              data: pro_staff
            }
          ]
        };
        myChart111.setOption(option111);
        myChart222.setOption(option222);
      },
      drawLine({pro_timeAchievement}) { //折线图
        let myChart333 = echarts.init(document.getElementById('myChart333'));
        myChart333.setOption({
          title: {
            text: '潜在客户变化折线图',
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
            data: Object.keys(pro_timeAchievement),
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
          series: this.detailLineData(pro_timeAchievement)
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
      drawBar({pro_adviser, pro_staffTimeAchievement}) { //柱状图
        let myChart444 = echarts.init(document.getElementById('myChart444'));
        myChart444.setOption({
          title: {
            text: '潜在人数构成柱状图',
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
            data: pro_adviser,
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
          series: pro_staffTimeAchievement
        });
      },
    }
  };
</script>
<style lang="scss" scoped>
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
      .total-span {
        height: 45px;
        display: flex;
        line-height: 45px;
        color: #595959;
        font-size: 14px;
        text-indent: 15px;
        margin-top: 20px;
      }
      .total-main {
        float: initial;
        margin-top: 85px;
        .total-right {
          height: 40px;
          float: right;
          display: flex;
          line-height: 40px;
          color: #8c8c8c;
          font-size: 14px;
          .box0 {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #de90ff;
            position: relative;
            top: 16px;
          }
          .box1 {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #1890ff;
            position: relative;
            top: 16px;
          }
          .box2 {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #2fc25b;
            position: relative;
            top: 16px;
          }
          .box3 {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #13c2c2;
            position: relative;
            top: 16px;
          }
          .box4 {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #facc14;
            position: relative;
            top: 16px;
          }
          .box5 {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #f04864;
            position: relative;
            top: 16px;
          }
          .box6 {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #8543e0;
            position: relative;
            top: 16px;
          }
          .chart-span {
            padding-left: 10px;
          }
          .bord {
            width: 1px;
            height: 35%;
            background: #e8e8e8;
            float: left;
            position: relative;
            top: 35%;
            border-radius: 5px;
            left: 2%;
          }
          .total-bai {
            padding-left: 12px;
          }
          .total-num {
            padding-left: 12px;
          }
        }
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
      .change-right {
        display: flex;
        line-height: 32px;
        margin: 0 auto;
        .com {
          width: 12px;
          height: 2px;
          background-color: #1890ff;
          position: relative;
          top: 18px;
        }
        .com2 {
          width: 12px;
          height: 2px;
          background-color: #2fc25b;
          position: relative;
          top: 18px;
        }
        .com-span {
          color: #8c8c8c;
          font-size: 14px;
        }
      }
      .change-right2 {
        display: flex;
        line-height: 32px;
        margin: 0 auto;
        .com {
          width: 12px;
          height: 2px;
          background-color: #1890ff;
          position: relative;
          top: 18px;
        }
        .com2 {
          width: 12px;
          height: 2px;
          background-color: #13c2c2;
          position: relative;
          top: 18px;
        }
        .com3 {
          width: 12px;
          height: 2px;
          position: relative;
          top: 18px;
          background: #2fc25b;
        }
        .com4 {
          width: 12px;
          height: 2px;
          position: relative;
          top: 18px;
          background: #facc14;
        }
        .com5 {
          width: 12px;
          height: 2px;
          position: relative;
          top: 18px;
          background: #f04864;
        }
        .com6 {
          width: 12px;
          height: 2px;
          position: relative;
          top: 18px;
          background: #ac7fea;
        }
        .com-span {
          color: #8c8c8c;
          font-size: 14px;
        }
      }
    }
  }
</style>
