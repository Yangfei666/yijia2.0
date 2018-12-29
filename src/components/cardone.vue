 <template>
  <div>
    <!--会员卡1-->
    <div class="cardone">
      <el-col :span="10" class="one-left">
        <div class="card-left">
          <el-col :span="22" class="cardseed">
            <span class="seed2">ID:{{membershipcards.CardNO}}</span>
            <span class="seed1">{{membershipcards.mode}}:{{membershipcards.money}}元</span>
          </el-col>
          <el-col :span="12" class="carddate">
            <p class="date1">开卡时间:{{membershipcards.fkTime}}</p>
            <p class="date2">到期时间:{{membershipcards.eTime}}</p>
          </el-col>
          <el-col :span="12" class="cardimg">
            <img src="../assets/EPLUS.png">
          </el-col>
          <el-col :span="12" class="cardimg2" v-if="membershipcards.isEnabled == 2">
            <img src="../assets/JINYONG.png">
          </el-col>
          <el-col :span="21" class="cardfoot">
            <el-col :span="18" class="cardplace" v-if="membershipcards.card_type.CTxTime_YN == '限用'">
              <span class="place1">卡的使用限制</span>
              <span class="place2">{{membershipcards.card_type.CTxTime_1S}}~{{membershipcards.card_type.CTxTime_1E}}</span>
            </el-col>
            <el-col :span="18" class="cardplace" v-else>
              <span class="place1">卡的使用限制</span>
            </el-col>
            <el-col :span="6" class="cardstatus">
              <span class="status1">卡状态</span>
              <span class="status2">{{membershipcards.State}}</span>
            </el-col>
          </el-col>
        </div>
      </el-col>
      <div class="box4"></div>
      <el-col :span="13" class="one-right">
        <el-col :span="12">
          <div :id="chartId" style="width:300px; height:300px"></div>
        </el-col>
        <el-col :span="12" class="chart-bottom">
          <el-col :span="12" class="chart-left">
            <div class="box"></div>
            <span class="chart-span" v-if="membershipcards.card_type.ctType=='次数卡'">已使用次数</span>
            <span class="chart-span" v-else-if="membershipcards.card_type.ctType=='金额卡'">已使用金额</span>
            <span class="chart-span" v-else>已使用天数</span>
          </el-col>
          <el-col :span="12" class="chart-left">
            <div class="box2"></div>
            <span class="chart-span" v-if="membershipcards.card_type.ctType=='次数卡'">剩余次数</span>
            <span class="chart-span" v-else-if="membershipcards.card_type.ctType=='金额卡'">剩余金额</span>
            <span class="chart-span" v-else>剩余天数</span>
          </el-col>
          <div class="chart-top">
            <el-col class="box-top" v-if="membershipcards.card_type.ctType=='次数卡'">
              <span>总次数</span>
              <p>{{membershipcards.card_type.Ctnum}}
                <span class="ci">次</span>
              </p>
            </el-col>
            <el-col class="box-top" v-else-if="membershipcards.card_type.ctType=='金额卡'">
              <span>总金额</span>
              <p>{{membershipcards.card_type.CTjg}}
                <span class="ci">元</span>
              </p>
            </el-col>
            <el-col class="box-top" v-else>
              <span>总天数</span>
              <p>{{datedifference(membershipcards.sTime,membershipcards.eTime)}}
                <span class="ci">天</span>
              </p>
            </el-col>
            <div class="box3"></div>
            <el-col class="box-top" v-if="membershipcards.card_type.ctType=='次数卡'">
              <span>已使用{{((membershipcards.card_type.Ctnum-membershipcards.SYCS)/membershipcards.card_type.Ctnum).toFixed(2)*100}}%</span>
              <p>{{membershipcards.card_type.Ctnum-membershipcards.SYCS}}
                <span class="ci">次</span>
              </p>
            </el-col>
            <el-col class="box-top" v-else-if="membershipcards.card_type.ctType=='金额卡'">
              <span>已使用{{((membershipcards.card_type.CTjg-membershipcards.SYJE)/membershipcards.card_type.CTjg).toFixed(2)*100}}%</span>
              <p>{{membershipcards.card_type.CTjg-membershipcards.SYJE}}
                <span class="ci">元</span>
              </p>
            </el-col>
            <el-col class="box-top" v-else>
              <span>已使用{{Number(datedifference(membershipcards.sTime,new Date())== 0 ? 0 : ( datedifference(membershipcards.sTime,new Date()) > datedifference(membershipcards.sTime,membershipcards.eTime) ? datedifference(membershipcards.sTime,membershipcards.eTime) : datedifference(membershipcards.sTime,new Date())+1 )/datedifference(membershipcards.sTime,membershipcards.eTime)).toFixed(3)*100}}%</span>
              <p v-if="membershipcards.State == '未激活'">{{datedifference(membershipcards.sTime,new Date())== 0 ? 0 : ( datedifference(membershipcards.sTime,new Date()) > datedifference(membershipcards.sTime,membershipcards.eTime) ? datedifference(membershipcards.sTime,membershipcards.eTime) : datedifference(membershipcards.sTime,new Date())+1 )}}
                <span class="ci">天</span>
              </p>
              <p v-else>{{datedifference(membershipcards.sTime,new Date())== 1 ? 1 : ( datedifference(membershipcards.sTime,new Date()) > datedifference(membershipcards.sTime,membershipcards.eTime) ? datedifference(membershipcards.sTime,membershipcards.eTime) : datedifference(membershipcards.sTime,new Date())+1 )}}
                <span class="ci">天</span>
              </p>
            </el-col>
            <div class="box3"></div>
            <el-col class="box-top" v-if="membershipcards.card_type.ctType=='次数卡'">
              <span>剩余{{(this.membershipcards.SYCS/membershipcards.card_type.Ctnum).toFixed(2)*100}}%</span>
              <p>{{membershipcards.SYCS}}
                <span class="ci">次</span>
              </p>
            </el-col>
            <el-col class="box-top" v-else-if="membershipcards.card_type.ctType=='金额卡'">
              <span>剩余{{(membershipcards.SYJE/membershipcards.card_type.CTjg).toFixed(2)*100}}%</span>
              <p>{{membershipcards.SYJE}}
                <span class="ci">元</span>
              </p>
            </el-col>
            <el-col class="box-top" v-else>
              <span>剩余{{(Number(datedifference(new Date,membershipcards.eTime) >= datedifference(membershipcards.sTime,membershipcards.eTime) ? datedifference(membershipcards.sTime,membershipcards.eTime) : datedifference(new Date,membershipcards.eTime))/datedifference(membershipcards.sTime,membershipcards.eTime)).toFixed(2)*100}}%</span>
              <p>{{datedifference(new Date,membershipcards.eTime) >= datedifference(membershipcards.sTime,membershipcards.eTime) ? datedifference(membershipcards.sTime,membershipcards.eTime) : datedifference(new Date,membershipcards.eTime)}}
                <span class="ci">天</span>
              </p>
            </el-col>
          </div>
        </el-col>
      </el-col>
    </div>
    <el-col :span="24">
      <div class="operate">
        <div class="oper">{{this.membershipcards.card_type.CTName}}操作：</div>
        <el-col :span="20" class="oper-main">
          <el-button class="operdiv" :class="{active:tab == 1}" @click="toggleTabs(1)">转卡</el-button>
          <el-button class="operdiv" :class="{active:tab == 2}" @click="toggleTabs(2)">退卡</el-button>
          <el-button class="operdiv" :class="{active:tab == 3}" @click="toggleTabs(3)">升级</el-button>
          <el-button class="operdiv" :class="{active:tab == 4}" @click="toggleTabs(4)">变更有效期</el-button>
          <el-button class="operdiv" :class="{active:tab == 5}" @click="toggleTabs(5);open3()">变更次数/金额</el-button>
          <el-button class="operdiv" :class="{active:tab == 6}" @click="toggleTabs(6)">启用/禁用</el-button>
          <el-button class="operdiv" :class="{active:tab == 7}" @click="toggleTabs(7)" v-if="membershipcards.State == '未激活'">激活</el-button>
          <el-button class="operdiv" :class="{active:tab == 8}" @click="toggleTabs(8)">办卡说明</el-button>
        </el-col>
      </div>
      <template>
        <keep-alive v-if="tab == 1">
          <Transfercard :pathquery='pathquerys'></Transfercard>
        </keep-alive>
        <keep-alive v-if="tab == 2">
          <Returncard :pathquery='pathquerys'></Returncard>
        </keep-alive>
        <keep-alive v-if="tab == 3">
          <Upgradecard :pathquery='pathquerys'></Upgradecard>
        </keep-alive>
        <keep-alive v-if="tab == 4">
          <Changevalidity :pathquery='pathquerys'></Changevalidity>
        </keep-alive>
        <keep-alive v-if="tab == 5">
          <Changepriceandnum :pathquery='pathquerys'></Changepriceandnum>
        </keep-alive>
        <keep-alive v-if="tab == 6">
          <Enabledisabling :pathquery='pathquerys'></Enabledisabling>
        </keep-alive>
        <keep-alive v-if="tab == 7">
          <Activate :pathquery='pathquerys'></Activate>
        </keep-alive>
        <keep-alive v-if="tab == 8">
          <Businesscarddes :pathquery='pathquerys'></Businesscarddes>
        </keep-alive>
      </template>
    </el-col>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import Transfercard from "@/components/transfercard";
import Returncard from "@/components/returncard";
import Upgradecard from "@/components/upgradecard";
import Changevalidity from "@/components/changevalidity";
import Changepriceandnum from "@/components/changepriceandnum";
import Enabledisabling from "@/components/enabledisabling";
import Activate from "@/components/activate";
import Businesscarddes from "@/components/businesscarddes";
export default {
  name: "cardone",
  props: ["membershipcards", "chartId", "idx"],
  components: {
    Transfercard,
    Returncard,
    Upgradecard,
    Changevalidity,
    Changepriceandnum,
    Enabledisabling,
    Activate,
    Businesscarddes
  },
  data() {
    return {
      tab: null,
      tbdata: [],
      isShow: false,
      boxshow: false,
      boxshow2: false,
      pathquerys:{},
    };
  },
  watch: {
    membershipcards(val) {}
  },
  mounted() {
    setTimeout(() => {
      this.drawBar();
    }, 500);
    if (this.membershipcards.card_type.ctType == "次数卡") {
      this.tbdata = [
        {
          value:
            this.membershipcards.card_type.Ctnum - this.membershipcards.SYCS,
          name: "已使用次数"
        },
        { value: this.membershipcards.SYCS, name: "剩余次数" }
      ];
    } else if (this.membershipcards.card_type.ctType == "金额卡") {
      this.tbdata = [
        {
          value:
            this.membershipcards.card_type.CTjg - this.membershipcards.SYJE,
          name: "已使用金额"
        },
        { value: this.membershipcards.SYJE, name: "剩余金额" }
      ];
    } else {
      this.tbdata = [
        {
          value:
            this.datedifference(this.membershipcards.sTime, new Date()) == 0
              ? 0
              : this.datedifference(this.membershipcards.sTime, new Date()) >
                this.datedifference(
                  this.membershipcards.sTime,
                  this.membershipcards.eTime
                )
                ? this.datedifference(
                    this.membershipcards.sTime,
                    this.membershipcards.eTime
                  )
                : this.datedifference(this.membershipcards.sTime, new Date()) +
                  1,
          name: "已使用天数"
        },
        {
          value:
            this.datedifference(new Date(), this.membershipcards.eTime) >=
            this.datedifference(
              this.membershipcards.sTime,
              this.membershipcards.eTime
            )
              ? this.datedifference(
                  this.membershipcards.sTime,
                  this.membershipcards.eTime
                )
              : this.datedifference(new Date(), this.membershipcards.eTime),
          name: "剩余天数"
        }
      ];
    }
  },
  methods: {
    toggleTabs(tab) {
      this.tab = tab;
      this.pathquerys.HYID=this.$route.query.HYID;
      this.pathquerys.CARD=this.membershipcards;
    },
    open3() {
      if (this.membershipcards.card_type.ctType == "期限卡") {
        this.$message({
          message: "对不起~期限卡不能更改次数或金额",
          type: "warning"
        });
      }
    },
    datedifference(sDate1, sDate2) {
      //sDate1和sDate2是2006-12-18格式
      var dateSpan, tempDate, iDays;
      sDate1 = Date.parse(sDate1);
      sDate2 = Date.parse(sDate2);
      dateSpan = sDate2 - sDate1;
      // dateSpan = Math.abs(dateSpan);
      if (dateSpan <= 0) {
        return 0;
      } else {
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays;
      }
    },
    drawBar() {
      //初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.chartId));
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
            data: this.tbdata,
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
      window.onresize = function() {
        myChart.resize();
      };
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/cardone.scss";
.cardone {
  height: 300px;
  margin: 0 auto;
  .one-left {
    height: 300px;
    .card-left {
      width: 460px;
      height: 240px;
      background-color: #161d24;
      border-radius: 10px;
      margin: 25px 25px auto;
      position: relative;
      .cardseed {
        margin: 20px 19px auto;
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 40px;
        border-bottom: 2px solid #fff;
        .seed1 {
          font-family: PingFang-SC-Medium;
          font-size: 20px;
          font-weight: normal;
          font-stretch: normal;
          color: #fff;
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
      .cardimg {
        position: absolute;
        right: 16%;
        top: 40%;
        width: 31%;
        height: 12%;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .cardimg2 {
        position: absolute;
        right: 2%;
        top: 33%;
        width: 17.5%;
        height: 25%;
        img {
          width: 100%;
          height: 100%;
          display: block;
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
          text-align: center;
          .status1 {
            color: #e6e6e6;
            font-family: PingFang-SC-Medium;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
          }
          .status2 {
            color: #ffffff;
            font-family: PingFang-SC-Medium;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
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
  height: 60px;
  display: flex;
  line-height: 55px;
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
    .operdiv {
      background: #fafafa;
      height: 30px;
      line-height: 30px;
      margin-top: 13px;
      margin-left: 10px;
      border-radius: 4px;
      color: #595959;
      font-size: 16px;
      padding: 0px 15px;
      border: none;
    }
    .operdiv.active {
      background: #facc14;
      font-size: 16px;
      border-radius: 4px;
      color: #595959;
    }
    .oper-left {
      background: #fafafa;
      border-radius: 4px;
      margin-left: 12px;
      color: #595959;
      font-size: 16px;
      .link {
        text-decoration: none;
        border-radius: 4px;
        font-size: 16px;
        background: #fafafa;
        color: #595959;
        padding: 5px 15px;
      }
      .router-link-exact-active {
        background: #facc14;
        font-size: 16px;
        border-radius: 4px;
        color: #595959;
      }
    }
  }
}
</style>