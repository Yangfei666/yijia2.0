 <template>
  <div>
    <!--体验券1-->
    <div class="cardone">
      <el-col :span="10" class="one-left">
        <div class="card-left">
          <div class="LeftRound"></div>
          <div class="RightRound"></div>
          <el-col :span="22" class="cardseed">
            <span class="seed1">劵种</span>
          </el-col>
          <el-col :span="21" class="carddate">
            <p class="date1">付款方式: {{customercars.mode}}</p>
            <p class="date2">应收金额: ￥{{customercars.price}}</p>
          </el-col>
          <el-col :span="21" class="cardfoot">
            <el-col :span="16" class="cardplace">
              <span class="place1">劵期限</span>
              <span class="place2">{{customercars.startTime}}~{{customercars.endTime}}</span>
            </el-col>
            <el-col :span="8" class="cardstatus">
              <span class="status1">次数</span>
              <span class="status2">{{customercars.surplus}}</span>
            </el-col>
          </el-col>
        </div>
      </el-col>
      <div class="box4"></div>
      <el-col :span="13" class="one-right">
        <el-col :span="12">
          <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
        </el-col>
        <el-col :span="12" class="chart-bottom">
          <el-col :span="12" class="chart-left">
            <div class="box"></div>
            <span class="chart-span">已使用次数</span>
          </el-col>
          <el-col :span="12" class="chart-left">
            <div class="box2"></div>
            <span class="chart-span">剩余次数</span>
          </el-col>
          <div class="chart-top">
            <el-col class="box-top">
              <span>总次数</span>
              <p>{{customercars.experience_voucher.frequency}}
                <span class="ci">次</span>
              </p>
            </el-col>
            <div class="box3"></div>
            <el-col class="box-top">
              <span>已使用次数30%</span>
              <p>{{customercars.experience_voucher.frequency-customercars.surplus}}
                <span class="ci">次</span>
              </p>
            </el-col>
            <div class="box3"></div>
            <el-col class="box-top">
              <span>剩余次数70%</span>
              <p>{{customercars.surplus}}
                <span class="ci">次</span>
              </p>
            </el-col>
          </div>
        </el-col>
      </el-col>
    </div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import { requestLogin } from "@/api/api";
export default {
  name: "securityone",
  props: ["customercars"],
  data() {
    return {
    };
  },
  watch: {
    customercars(val){
     console.log('customercars:'+this.customercars);
    },
  },
  mounted() {
    setTimeout(() => {
      this.drawBar();
    }, 500);
  },
  methods: {
    drawBar() {
      //初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["65%", "68%"],
            avoidLabelOverlap: false,
            color: [
              "#56E79E",
              "#161D24",
              "#8378EA",
              "#E062AE",
              "#FFDB5C",
              "#9d96f5"
            ],
            data: [
              { value: this.customercars.experience_voucher.frequency-this.customercars.surplus, name: "已使用次数" },
              { value:this.customercars.surplus, name: "剩余次数" }
            ],
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
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/security.scss";
.cardone {
  height: 300px;
  margin: 0 auto;
  .one-left {
    height: 300px;
    .card-left {
      width: 91.79%;
      height: 80%;
      background-color: #161d24;
      border-radius: 10px;
      margin: 5% 6% auto;
      position: relative;
      .LeftRound {
        /*左半圆*/
        width: 15px;
        border-radius: 20px 0px 0px 20px;
        background: #fff;
        height: 20px;
        position: absolute;
        right: 0px;
        top: 58px;
      }
      .RightRound {
        /*右半圆*/
        width: 15px;
        border-radius: 0px 20px 20px 0px;
        height: 20px;
        position: absolute;
        background: #fff;
        top: 58px;
        left: 0px;
      }
      .cardseed {
        margin: 20px 19px auto;
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 40px;
        border-bottom: 2px dotted #fff;
        .seed1 {
          font-family: PingFang-SC-Medium;
          font-size: 20px;
          font-weight: normal;
          font-stretch: normal;
          color: #fff;
          width: 100%;
          text-align: left;
        }
        .seed2 {
          font-family: PingFang-SC-Medium;
          font-size: 20px;
          font-weight: normal;
          font-stretch: normal;
          color: #fff;
        }
      }
      .carddate {
        height: 60px;
        line-height: 15px;
        margin: 8px 29px auto;
        text-align: left;
        .date1 {
          font-family: PingFang-SC-Medium;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          color: #fff;
        }
        .date2 {
          font-family: PingFang-SC-Medium;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          color: #fff;
        }
      }
      .cardfoot {
        height: 70px;
        margin: 21px 25px auto;
        display: flex;
        justify-content: space-between;
        .cardplace {
          display: grid;
          text-align: left;
          margin-top: 7px;
          .place1 {
            color: #e6e6e6;
            font-family: PingFang-SC-Medium;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
          }
          .place2 {
            color: #ffffff;
            font-family: PingFang-SC-Medium;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
          }
        }
        .cardstatus {
          display: grid;
          text-align: right;
          .status1 {
            color: #e6e6e6;
            font-family: PingFang-SC-Medium;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            text-align: center;
          }
          .status2 {
            color: #ffffff;
            font-family: PingFang-SC-Medium;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            text-align: center;
          }
        }
      }
    }
  }
  .box4 {
    width: 2px;
    height: 50%;
    background: #e8e8e8;
    float: left;
    position: relative;
    top: 23%;
    border-radius: 5px;
    left: 2%;
  }
  .one-right {
    height: 300px;
    display: flex;
    .chart-bottom {
      display: inline-block;
      .chart-left {
        height: 40px;
        margin-top: 85px;
        .box {
          width: 25px;
          height: 5px;
          background: #56e79e;
          display: inline-block;
        }
        .box2 {
          width: 25px;
          height: 5px;
          background: #161d24;
          display: inline-block;
        }
        .chart-span {
          font-family: PingFang-SC-Light;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 33px;
          letter-spacing: 0px;
          color: #262626;
        }
      }
      .chart-top {
        height: 85px;
        display: inline-flex;
        width: 100%;
        line-height: 15px;
        .box-top {
          margin-top: 20px;
          span {
            font-family: PingFang-SC-Light;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #b3b3b3;
            margin-left: 8px;
          }
          p {
            font-family: PingFang-SC-Regular;
            font-size: 30px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #272727;
            .ci {
              font-family: PingFang-SC-Medium;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #8c8c8c;
            }
          }
        }
        .box3 {
          width: 2px;
          height: 50%;
          background: #e8e8e8;
          float: right;
          position: relative;
          top: 35%;
          border-radius: 5px;
          padding-left: 1px;
        }
      }
    }
  }
}
.operate {
  height: 30px;
  display: flex;
  line-height: 30px;
  .oper {
    padding-left: 15px;
    font-family: PingFang-SC-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #262626;
  }
  .oper-main {
    display: flex;
    .oper-left {
      width: 70px;
      background: #fafafa;
      border-radius: 4px;
      margin-left: 12px;
      span {
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #595959;
      }
    }
    .oper-left:hover {
      background: #00bc71;
    }
    .oper-left2 {
      width: 120px;
      background: #fafafa;
      border-radius: 4px;
      margin-left: 12px;
      span {
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #595959;
      }
    }
    .oper-left3 {
      width: 130px;
      background: #fafafa;
      border-radius: 4px;
      margin-left: 12px;
      span {
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #595959;
      }
    }
    .oper-left4 {
      width: 100px;
      background: #fafafa;
      border-radius: 4px;
      margin-left: 12px;
      span {
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #595959;
      }
    }
  }
}
</style>