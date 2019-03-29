<template>
    <div>
        <!--操作记录-->
        <div class="health">
            <el-col :span="24">
                <div class="class-main">
                    <div class="infor-but" v-on:click="back">
                        <el-button class="goback el-icon-arrow-left">返回</el-button>
                    </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                        <el-tab-pane label="转卡" name="1">
                            <template>
                                <el-col :span="24">
                                    <div class="practice-table">
                                        <el-row :gutter="12" class="item-wrap" style="margin-left:0px;margin-right:0px">
                                            <!-- 转卡 -->
                                            <el-col :span="4" class="box-ul" v-for="(item, index) in RecordTransferCard" :key='index+200'>
                                                <el-card shadow="always">
                                                    <div class="always-main">
                                                        <span class="always-span">{{item.zhktime}}</span>
                                                        <div class="card-main">
                                                            <div class="always-card">转卡</div>
                                                            <div class="always-cardone">{{item.membership_card.card_type.CTName}}</div>
                                                        </div>
                                                        <div class="yuan-main3">
                                                            <div class="yuan">原会员姓名：
                                                                <span>{{item.yhyname}}</span>
                                                            </div>
                                                            <div class="yuan">新会员姓名：
                                                                <span>{{item.nhyname}}</span>
                                                            </div>
                                                        </div>
                                                        <div class="foot">
                                                            <span class="foot1">操作人</span>
                                                            <div class="foot2">{{item.czyname}}</div>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="退卡" name="2">
                            <template>
                                <el-col :span="24">
                                    <div class="practice-table">
                                        <el-row :gutter="12" class="item-wrap" style="margin-left:0px;margin-right:0px">
                                            <!-- 退卡 -->
                                            <el-col :span="4" class="box-ul" v-for="(item, index) in RecordBackCard" :key='index'>
                                                <el-card shadow="always">
                                                    <div class="always-main">
                                                        <span class="always-span">{{item.tkTime}}</span>
                                                        <div class="card-main">
                                                            <div class="always-card">退卡</div>
                                                            <div class="always-cardone">{{item.membership_card.card_type.CTName}}</div>
                                                        </div>
                                                        <div class="yuan-main">
                                                            <div class="yuan">退还金额：
                                                                <span class="right">￥{{item.money}}</span>
                                                            </div>
                                                            <div class="yuan">退卡原因：
                                                                <span class="right">{{item.yuanyin}}</span>
                                                            </div>
                                                        </div>
                                                        <div class="foot">
                                                            <span class="foot1">操作人</span>
                                                            <div class="foot2">{{item.CzyName}}</div>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="升级" name="3">
                            <template>
                                <el-col :span="24">
                                    <div class="practice-table">
                                        <el-row :gutter="12" class="item-wrap" style="margin-left:0px;margin-right:0px">
                                            <!-- 升级 -->
                                            <el-col :span="4" class="box-ul" v-for="(item, index) in RecordUpgrade" :key='index+100'>
                                                <el-card shadow="always">
                                                    <div class="always-main">
                                                        <span class="always-span">{{item.shjTime}}</span>
                                                        <div class="card-main">
                                                            <div class="always-card">升级</div>
                                                        </div>
                                                        <div class="yuan-main3">
                                                            <div class="yuan">原卡类型：
                                                                <span>{{item.YCtName}}</span>
                                                            </div>
                                                            <div class="yuan">原激活时间:
                                                                <span class="yuan2">{{item.YsTime}}</span>
                                                            </div>
                                                            <div class="yuan" v-show="item.show">原到期时间:
                                                                <span class="yuan2">{{item.YeTime}}</span>
                                                            </div>
                                                            <div class="yuan" v-show="item.show">原支付方式：
                                                                <span class="yuan">{{item.oldmode}}</span>
                                                            </div>
                                                            <div class="yuan" v-show="item.show">原付款金额：
                                                                <span class="yuan">￥{{item.oldmoney}}</span>
                                                            </div>
                                                            <div class="yuan" v-show="item.show">原卡剩余：
                                                                <span class="yuan">{{item.lave}}</span>
                                                            </div>
                                                            <div class="yuan" v-show="item.show">原卡折算：
                                                                <span class="yuan">{{item.oldConversion}}</span>
                                                            </div>
                                                            <div class="yuan" v-show="item.show">新卡名称：
                                                                <span class="yuan">{{item.newCardName}}</span>
                                                            </div>
                                                            <div class="yuan" v-show="item.show">新卡补缴金额：
                                                                <span class="yuan">{{item.newmoney}}</span>
                                                            </div>
                                                        </div>
                                                        <span class="corry-out" @click="showToggle(index)">{{item.btnText}}</span>
                                                        <div class="footss">
                                                            <span class="foot1">操作人</span>
                                                            <div class="foot2">{{item.CzyName}}</div>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="变更有效期 / 次数 / 金额" name="4">
                            <template>
                                <el-col :span="24">
                                    <div class="practice-table">
                                        <el-row :gutter="12" class="item-wrap" style="margin-left:0px;margin-right:0px">
                                            <!-- 变更有效期 / 次数 / 金额 -->
                                            <el-col :span="4" class="box-ul" v-for="(item, index) in RecordChange" :key='index+300'>
                                                <el-card shadow="always">
                                                    <div class="always-main">
                                                        <span class="always-span">{{item.bgtime}}</span>
                                                        <div class="card-main">
                                                            <div class="always-card">
                                                                {{item.yuancishu.indexOf('.') == -1 ? (item.yuancishu.indexOf('-') == -1 ? '变更次数' : '变更有效期') : '变更金额'}}
                                                            </div>
                                                            <div class="always-cardone">{{item.membership_card.card_type.CTName}}</div>
                                                        </div>
                                                        <div class="yuan-main3">
                                                            <div class="yuan">变更前:
                                                                <span>{{item.yuancishu}}</span>
                                                            </div>
                                                            <div class="yuan">变更后:
                                                                <span>{{item.newcishu}}</span>
                                                            </div>
                                                            <div class="yuan" v-show="item.show2">原因:
                                                                <span>{{item.bgyuanyin}}</span>
                                                            </div>
                                                        </div>
                                                        <span class="corry-out" @click="showToggle2(index)">{{item.btnText2}}</span>
                                                        <div class="foot">
                                                            <span class="foot1">操作人</span>
                                                            <div class="foot2">{{item.czyname}}</div>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="启用 / 禁用" name="5">
                            <template>
                                <el-col :span="24">
                                    <div class="practice-table">
                                        <el-row :gutter="12" class="item-wrap" style="margin-left:0px;margin-right:0px">
                                            <!-- 启用 -->
                                            <el-col :span="4" class="box-ul" v-for="(item, index) in RecordEnabledDisable" :key='index+800'>
                                                <el-card shadow="always" v-if="item.enabledTime != null">
                                                    <div class="always-main">
                                                        <span class="always-span">{{item.enabledTime}}</span>
                                                        <div class="card-main">
                                                            <div class="always-card">启用</div>
                                                            <div class="always-cardone">{{item.membership_card.card_type.CTName}}</div>
                                                        </div>
                                                        <div class="yuan-main3">
                                                            <div class="yuan">原因
                                                                <span>{{item.rereason}}</span>
                                                            </div>
                                                        </div>
                                                        <div class="footsss">
                                                            <span class="foot1">操作人</span>
                                                            <div class="foot2">{{item.rename}}</div>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                            <!-- 禁用 -->
                                            <el-col :span="4" class="box-ul" v-for="(item, index) in RecordEnabledDisable" :key='index+850'>
                                                <el-card shadow="always">
                                                    <div class="always-main">
                                                        <span class="always-span">{{item.disabledTime}}</span>
                                                        <div class="card-main">
                                                            <div class="always-card">禁用</div>
                                                            <div class="always-cardone">{{item.membership_card.card_type.CTName}}</div>
                                                        </div>
                                                        <div class="yuan-main3">
                                                            <div class="yuan">原因
                                                                <span>{{item.reason}}</span>
                                                            </div>
                                                        </div>
                                                        <div class="footsss">
                                                            <span class="foot1">操作人</span>
                                                            <div class="foot2">{{item.name}}</div>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="换会籍" name="6">
                            <template>
                                <el-col :span="24">
                                    <div class="practice-table">
                                        <el-row :gutter="12" class="item-wrap" style="margin-left:0px;margin-right:0px">
                                            <!-- 换会籍 -->
                                            <el-col :span="4" class="box-ul" v-for="(item, index) in RecordReplaceAdviser" :key='index+600'>
                                                <el-card shadow="always">
                                                    <div class="always-main">
                                                        <span class="always-span">{{item.bgtime}}</span>
                                                        <div class="card-main">
                                                            <div class="always-card">换会籍</div>
                                                        </div>
                                                        <div class="yuan-main3">
                                                            <div class="yuan">原会籍:
                                                                <span>{{item.hjgwname}}</span>
                                                            </div>
                                                            <div class="yuan">新会籍:
                                                                <span>{{item.newhjgwname}}</span>
                                                            </div>
                                                            <div class="yuan" v-show="item.show3">原因:
                                                                <span>{{item.bgyuanyin}}</span>
                                                            </div>
                                                        </div>
                                                        <span class="corry-out" @click="showToggle3(index)">{{item.btnText3}}</span>
                                                        <div class="foot">
                                                            <span class="foot1">操作人</span>
                                                            <div class="foot2">{{item.czyname}}</div>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="请假 / 销假" name="7">
                            <template>
                                <el-col :span="24">
                                    <div class="practice-table">
                                        <el-row :gutter="12" class="item-wrap" style="margin-left:0px;margin-right:0px">
                                            <!-- 请假 -->
                                            <el-col :span="4" class="box-ul" v-for="(item, index) in RecordLeave" :key='index+700'>
                                                <el-card shadow="always">
                                                    <div class="always-main">
                                                        <span class="always-span">{{item.czrq}}</span>
                                                        <div class="card-main">
                                                            <div class="always-card">请假</div>
                                                        </div>
                                                        <div class="yuan-main3">
                                                            <div class="yuan">请假时段:
                                                                <span>{{item.qjsTime}}~{{item.qjeTime}}</span>
                                                            </div>
                                                            <div class="yuan">原因:
                                                                <span>{{item.yuanyin}}</span>
                                                            </div>
                                                        </div>
                                                        <div class="foo">
                                                            <span class="foot1">操作人</span>
                                                            <div class="foot2">{{item.czyname}}</div>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                            <!-- 销假 -->
                                            <el-col :span="4" class="box-ul" v-for="(item, index) in RecordLeave" :key='index+750'>
                                                <el-card shadow="always" v-if="item.xjrname != ''">
                                                    <div class="always-main">
                                                        <span class="always-span">{{item.czrq}}</span>
                                                        <div class="card-main">
                                                            <div class="always-card">销假</div>
                                                        </div>
                                                        <div class="yuan-main3">
                                                            <div class="yuan">销假时间:
                                                                <span>{{item.xjTime}}</span>
                                                            </div>
                                                        </div>
                                                        <div class="fo">
                                                            <span class="foot1">操作人</span>
                                                            <div class="foot2">{{item.xjrname}}</div>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="挂失 / 解挂 / 补卡" name="8">
                            <template>
                                <el-col :span="24">
                                    <div class="practice-table">
                                        <el-row :gutter="12" class="item-wrap" style="margin-left:0px;margin-right:0px">
                                            <!-- 挂失 -->
                                            <el-col :span="4" class="box-ul" v-for="(item, index) in RecordReportLoss" :key='index+400'>
                                                <el-card shadow="always">
                                                    <div class="always-main">
                                                        <span class="always-span">{{item.czrq}}</span>
                                                        <div class="card-main">
                                                            <div class="always-card">挂失</div>
                                                        </div>
                                                        <div class="yuan-main3">
                                                            <div class="yuan">挂失时间:
                                                                <span>{{item.gshTime}}</span>
                                                            </div>
                                                        </div>
                                                        <div class="fo">
                                                            <span class="foot1">操作人</span>
                                                            <div class="foot2">{{item.czyname}}</div>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                            <!-- 解挂 -->
                                            <el-col :span="4" class="box-ul" v-for="(item, index) in RecordReportLoss" :key='index+450'>
                                                <el-card shadow="always" v-if="item.state == '解除挂失'">
                                                    <div class="always-main">
                                                        <span class="always-span">{{item.czrq}}</span>
                                                        <div class="card-main">
                                                            <div class="always-card">解挂</div>
                                                        </div>
                                                        <div class="yuan-main3">
                                                            <div class="yuan">解挂时间:
                                                                <span>{{item.qxgsTime}}</span>
                                                            </div>
                                                        </div>
                                                        <div class="fo">
                                                            <span class="foot1">操作人</span>
                                                            <div class="foot2">{{item.czyname}}</div>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                            <!-- 补卡 -->
                                            <el-col :span="4" class="box-ul" v-for="(item, index) in RecordSupplementCard" :key='index+500'>
                                                <el-card shadow="always">
                                                    <div class="always-main">
                                                        <span class="always-span">{{item.bktime}}</span>
                                                        <div class="card-main">
                                                            <div class="always-card">补卡</div>
                                                        </div>
                                                        <div class="yuan-main3">
                                                            <div class="yuan">原卡号:
                                                                <span>{{item.yuancardno}}</span>
                                                            </div>
                                                            <div class="yuan">新卡号:
                                                                <span>{{item.newcardno}}</span>
                                                            </div>

                                                        </div>
                                                        <div class="foot">
                                                            <span class="foot1">操作人</span>
                                                            <div class="foot2">{{item.czyname}}</div>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="惩罚" name="9">
                            <template>
                                <el-col :span="24">
                                    <div class="practice-table">
                                        <el-row :gutter="12" class="item-wrap" style="margin-left:0px;margin-right:0px">
                                            <!-- 惩罚 -->
                                            <el-col :span="4" class="box-ul" v-for="(item, index) in RecordPunishment" :key='index+900'>
                                                <el-card shadow="always">
                                                    <div class="always-main">
                                                        <span class="always-span">{{item.create_time}}</span>
                                                        <div class="card-main">
                                                            <div class="always-card">惩罚</div>
                                                            <div class="always-cardone">{{item.membership_card.card_type.CTName}}</div>
                                                        </div>
                                                        <div class="yuan-main3">
                                                            <div class="yuan">惩罚类型:
                                                                <span>{{item.type == 1 ? '限制约课' : '扣权益'}}</span>
                                                            </div>
                                                            <div class="yuan" v-show="item.type == 1">开始时间:
                                                                <span>{{item.startTime}}</span>
                                                            </div>
                                                            <div class="yuan" v-show="item.type == 1">结束时间:
                                                                <span>{{item.endTime}}</span>
                                                            </div>
                                                            <div class="yuan" v-show="item.type == 2">扣权益:
                                                                <span>{{item.num}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "operationnote",
  data() {
    return {
      btnText: "展开",
      btnText2: "展开",
      btnText3: "展开",
      isShow: false,
      isShow2: false,
      isShow3: false,
      activeName: "1",
      RecordTransferCard: [], //转卡记录
      RecordReportLoss: [], //挂失
      RecordSupplementCard: [], //补卡
      RecordBackCard: [], //退卡
      RecordUpgrade: [], //升级
      RecordChange: [], //变更有效期/金额/次数
      RecordReplaceAdviser: [], //变更会籍顾问
      RecordEnabledDisable: [], //启用/禁用
      RecordPunishment: [], //惩罚
      RecordLeave: [] //请假/销假
    };
  },
  created() {
    this.getexperhome();
  },
  methods: {
    //获取操作记录
    getexperhome() {
      let _this = this;
      requestLogin(
        "/setDesignateMember/getOperationRecord/" + this.$route.query.HYID,
        {},
        "get"
      )
        .then(function(data) {
          _this.RecordTransferCard = data.RecordTransferCard; //转卡记录
          _this.RecordReportLoss = data.RecordReportLoss; //挂失
          _this.RecordSupplementCard = data.RecordSupplementCard; //补卡
          _this.RecordBackCard = data.RecordBackCard; //退卡
          _this.RecordUpgrade = data.RecordUpgrade; //升级
          for (let item of _this.RecordUpgrade) {
            item.show = false;
            item.btnText = "展开";
          }
          _this.RecordChange = data.RecordChange; //变更有效期/金额/次数
          for (let item of _this.RecordChange) {
            item.show2 = false;
            item.btnText2 = "展开";
          }
          _this.RecordReplaceAdviser = data.RecordReplaceAdviser; //变更会籍顾问
          for (let item of _this.RecordReplaceAdviser) {
            item.show3 = false;
            item.btnText3 = "展开";
          }
          _this.RecordEnabledDisable = data.RecordEnabledDisable; //启用/禁用
          _this.RecordPunishment = data.RecordPunishment; //惩罚
          _this.RecordLeave = data.RecordLeave; //请假
        })
        .catch(error => {
         let { response: { data: { errorCode, msg } } } = error;
        if (errorCode != 0) {
          this.$message({
            message: msg,
            type: "error"
          });
          return;
        }
        });
    },
    showToggle(index) {
      let copy = this.RecordUpgrade[index];
      let changShow = !this.RecordUpgrade[index].show;
      let merge = Object.assign({}, copy, {
        show: changShow,
        btnText: changShow ? "收起" : "展开"
      });
      this.$set(this.RecordUpgrade, index, merge);
    },
    showToggle2: function(index) {
      let copy = this.RecordChange[index];
      let changShow = !this.RecordChange[index].show2;
      let merge = Object.assign({}, copy, {
        show2: changShow,
        btnText2: changShow ? "收起" : "展开"
      });
      this.$set(this.RecordChange, index, merge);
    },
    showToggle3: function(index) {
      let copy = this.RecordReplaceAdviser[index];
      let changShow = !this.RecordReplaceAdviser[index].show3;
      let merge = Object.assign({}, copy, {
        show3: changShow,
        btnText3: changShow ? "收起" : "展开"
      });
      this.$set(this.RecordReplaceAdviser, index, merge);
    },
    handleClick(tab, event) {},
    back() {
      this.$router.push({
        path: "/Customer/membershiphome/memberhome",
        query: {
          HYID: this.$route.query.HYID,
          HYName: this.$route.query.HYName,
          YGXX_NAME: this.$route.query.YGXX_NAME,
          MotoTel: this.$route.query.MotoTel
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/operationnote.scss";
.health {
  width: 97%;
  height: 100%;
  display: inline-block;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .class-main {
    height: 100%;
    position: relative;
    .infor-but {
      position: absolute;
      top: 0px;
      z-index: 2;
      color: #262626;
      right: 1%;
      .goback {
        font-size: 16px;
        border: none;
        background: #fff;
      }
    }
    .infor-but:hover {
      color: #00bc71;
    }
    .practice-table {
      width: 98%;
      height: 100%;
      margin: 0 auto;
      .item-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: inherit;
        flex-wrap: wrap;
        padding-left: 0px;
        padding-right: 0px;
      }
      .box-ul {
        width: 20%;
        margin-bottom: 10px;
        .always-main {
          text-align: left;
          .always-span {
            font-size: 20px;
            color: #262626;
          }
          .card-main {
            width: 100%;
            display: flex;
            margin-top: 10px;
            .always-card {
              width: 42%;
              height: 32px;
              background: #00bc71;
              border-radius: 4px;
              font-size: 14px;
              text-align: center;
              line-height: 32px;
              color: #fff;
            }
            .always-cardone {
              width: 42%;
              height: 32px;
              background: #facc14;
              border-radius: 4px;
              font-size: 14px;
              text-align: center;
              line-height: 32px;
              margin-left: 10px;
              color: #fff;
            }
          }
          .yuan-main {
            padding-left: 0px;
            text-align: left;
            height: 100%;
            margin-top: 10px;
            line-height: 25px;
            .yuan {
              color: #8c8c8c;
              font-size: 14px;
              .right {
                color: #8c8c8c;
                font-size: 13.5px;
                width: 64%;
              }
            }
          }
          .yuan-main4 {
            padding-left: 0px;
            text-align: left;
            height: 100%;
            margin-top: 15px;
            line-height: 35px;
            .yuan {
              color: #8c8c8c;
              font-size: 14px;
              .right {
                color: #8c8c8c;
                font-size: 13.5px;
                width: 64%;
              }
            }
          }
          .yuan-main3 {
            padding-left: 0px;
            text-align: left;
            height: 100%;
            margin-top: 10px;
            line-height: 25px;
            .yuan {
              color: #8c8c8c;
              font-size: 14px;
              .right {
                color: #8c8c8c;
                font-size: 13.5px;
                width: 64%;
              }
              .yuan2 {
                color: #8c8c8c;
                font-size: 13px;
              }
            }
          }
          .yuan-main2 {
            padding-left: 0px;
            text-align: left;
            height: 100%;
            margin-top: 10px;
            line-height: 25px;
            .yuan {
              color: #262626;
              font-size: 14px;
              .yuan2 {
                color: #262626;
                font-size: 13.5px;
              }
            }
          }
          .corry-out {
            color: #00bc71;
            font-size: 14px;
          }
          .foot {
            margin-top: 10px;
            line-height: 25px;
            .foot1 {
              font-size: 14px;
              color: #eca110;
            }
            .foot2 {
              font-size: 20px;
              color: #262626;
            }
          }
          .footss {
            margin-top: 10px;
            line-height: 25px;
            .foot1 {
              font-size: 14px;
              color: #eca110;
            }
            .foot2 {
              font-size: 20px;
              color: #262626;
            }
          }
          .fo {
            margin-top: 55px;
            line-height: 25px;
            .foot1 {
              font-size: 14px;
              color: #eca110;
            }
            .foot2 {
              font-size: 20px;
              color: #262626;
            }
          }
          .foo {
            margin-top: 30px;
            line-height: 25px;
            .foot1 {
              font-size: 14px;
              color: #eca110;
            }
            .foot2 {
              font-size: 20px;
              color: #262626;
            }
          }
          .footsss {
            margin-top: 55px;
            line-height: 25px;
            .foot1 {
              font-size: 14px;
              color: #eca110;
            }
            .foot2 {
              font-size: 20px;
              color: #262626;
            }
          }
        }
      }
      .block {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
    }
  }
}
</style>
