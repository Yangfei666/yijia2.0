<template>
  <div>
    <!--会员主页-->
    <div class="memberhome">
      <div class="member-but">
        <div class="butt el-icon-plus" @click="dialogFormVisible = true">添加新卡</div>
        <template>
          <el-dialog title="添加新卡" :append-to-body="true" :visible.sync="dialogFormVisible">
            <!--添加新卡-->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="客户编号:" prop="userid" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-input v-model="this.$route.params.HYID" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="卡名称:" prop="cardname" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-select v-model="ruleForm.cardname" placeholder="请选择" style="width:100%" @change="Selectchange">
                    <el-option v-for="item in selfCard" :key="item.CTID+100" :label="item.CTName" :value="item.CTID"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="金额:" prop="money" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-input v-model="ruleForm.money" placeholder="0-100000元之间"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="付款方式:" prop="payment" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-radio-group v-model="ruleForm.payment" @change="Selectchange2">
                    <el-radio :label="1">微信</el-radio>
                    <el-radio :label="2">支付宝</el-radio>
                    <el-radio :label="3">现金</el-radio>
                    <el-radio :label="4">银行卡</el-radio>
                    <el-radio :label="5">信用卡</el-radio>
                    <el-radio :label="6">手机银行转账</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>
              <el-form-item label="是否立即启用:" prop="start" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-radio-group v-model="ruleForm.start" @change="Selectchange3">
                    <el-radio :label="true">启用</el-radio>
                    <el-radio :label="false">禁用</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>
              <el-form-item label="激活时间:" prop="activate" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-radio-group v-model="ruleForm.activate" @change="Selectchange4">
                    <el-radio :label="1">立即激活</el-radio>
                    <el-radio :label="2">系统设置时间激活</el-radio>
                    <el-radio :label="3">客户首次刷卡激活</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>
              <el-form-item label="到期时间:" prop="become" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-radio-group v-model="ruleForm.become" @change="Selectchange5">
                    <el-radio :label="1" v-if="ruleForm.activate != 3">自定义</el-radio>
                    <el-radio :label="2">默认有效期</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>
              <el-form-item prop="attenddate" label="自定义到期时间:" :label-width="formLabelWidth" v-show="ruleForm.become == '1'">
                <el-col :span="22">
                  <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择" v-model="ruleForm.attenddate" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item class="dialog-footer">
                <el-col :span="24" style="display: flex;justify-content: flex-end;">
                  <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                  <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                </el-col>
              </el-form-item>
            </el-form>
          </el-dialog>
        </template>
      </div>
      <el-tabs v-model="TabsValue" @tab-click="handleClick" type="card">
        <el-tab-pane v-for="(item,idx) in header" :label="item.CTName" :name="String(item.id)" :key="item.id+200" :data-idx='idx' style="font-size:16px" :lazy="false">
          <Cardone :ref="'chart'+item.id" :membershipcards="membershipcard" :chartId="'chart'+item.id"></Cardone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
import Cardone from "../components/cardone";
export default {
  name: "memberhome",
  inject: ["reload"],
  components: {
    Cardone
  },
  data() {
    return {
      formLabelWidth: "130px",
      TabsValue: "",
      dialogFormVisible: false,
      selfCard: [],
      club: [],
      header: [],
      membershipcard: {},
      ruleForm: {
        userid: "", //编号
        cardname: "", //卡名称
        money: "", //金额
        payment: "", //付款方式
        start: "", //是否立即启用
        activate: "", //激活时间
        become: "", //到期时间
        attenddate: "" //自定义到期时间
      },
      rules: {
        money: validate.price,
        cardname: validate.cardname,
        payment: validate.mode,
        start: validate.start,
        activate: validate.sensitize,
        become: validate.become
      }
    };
  },
  created() {
    this.getexperhome();
    setTimeout(() => {
      this.getCard();
    }, 1000);
  },
  methods: {
    //获取个人中心详情
    getexperhome() {
      let _this = this;
      console.log(this.$route.params.HYID);
      requestLogin("/setMemberCustomers/" + this.$route.params.HYID, {}, "get")
        .then(function(res) {
          _this.clubs = res.membership_card;
          _this.membershipcard = _this.clubs[0];
          var membership_card = res.membership_card;
          for (var i = 0; i < membership_card.length; i++) {
            var voucher = { id: "", CTName: "", name: "" };
            voucher.id = membership_card[i].id;
            voucher.CTName = membership_card[i].card_type.CTName;
            voucher.name = voucher.CTName + voucher.id;
            _this.header.push(voucher);
          }
          _this.TabsValue = String(_this.header[0].id);
        })
        .catch(error => {
          if (error.res) {
            this.$message({
              message: "获取数据失败",
              type: "error"
            });
          }
        });
    },
    //获取卡名称
    getCard() {
      let _this = this;
      let relationCards = [];
      requestLogin("/setMemberCustomers/selectCards", {}, "get")
        .then(function(res) {
          let { selfCard, relationCard } = res;
          _this.selfCard = selfCard;
          relationCards = relationCard;
          for (var i = 0; i < relationCard.length; i++) {
            _this.selfCard.push(relationCard[i]);
          }
          console.log(res);
        })
        .catch(error => {
          if (error.res) {
            this.$message({
              message: "获取数据失败",
              type: "error"
            });
          }
        });
    },
    handleClick(tab, event) {
      let _this = this;
      var eventId = event.currentTarget.id;
      for (var i = 0; i < _this.clubs.length; i++) {
        var name = _this.clubs[i].card_type.CTName;
        var id = _this.clubs[i].id;
        var eventIds = "tab-" + id;
        if (eventId == eventIds) {
          _this.membershipcard = _this.clubs[i];
          return;
        }
      }
    },
    //添加新卡
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              id: _this.$route.params.HYID, //会员id
              CTID: _this.ruleForm.cardname, //会员卡id
              mode: _this.ruleForm.payment, //付款方式
              money: _this.ruleForm.money, //价格
              eTime: _this.ruleForm.attenddate, //自定义到期时间
              bool: _this.ruleForm.start, //是否立即启用
              delay: _this.ruleForm.activate //激活时间选择
            };
            requestLogin("/setMemberCustomers/saveCard", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible = false;
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
          });
        } else {
          this.$message({ message: "提交失败!", type: "error" });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    Selectchange(val) {
      console.log(val);
    },
    Selectchange2(val) {
      console.log(val);
    },
    Selectchange3(val) {
      console.log(val);
    },
    Selectchange4(val) {
      console.log(val);
    },
    Selectchange5(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
.memberhome {
  width: 97%;
  height: 410px;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  .member-but {
    width: 100px;
    height: 32px;
    position: absolute;
    right: 30px;
    top: 6px;
    border-radius: 4px;
    background: #00bc71;
    color: #fff;
    z-index: 2;
    .butt {
      width: 100%;
      height: 100%;
      line-height: 32px;
      text-align: center;
      span {
        margin-left: 3px;
      }
    }
  }
}
</style>
