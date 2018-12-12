<template>
  <div>
    <!--约私教-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="上课日期:" prop="attenddate" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="whichDay" disabled></el-input>
        </el-col>
      </el-form-item>
      <el-form-item prop="attendtime" label="上课时间:" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-time-picker is-range disabled range-separator="~" :start-placeholder="startTime" :end-placeholder="endTime" placeholder="选择时间范围" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="教室:" prop="room" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="classroom" disabled></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="姓名/电话:" prop="name" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="会员/体验客户:" prop="consumer" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-select v-model="ruleForm.consumer" @change="getCardInfo()" placeholder="请选择" style="width:100%">
            <el-option label="会员" value="member"></el-option>
            <el-option label="体验客户" value="experience"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="会员卡/体验券:" prop="card" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-select v-model="ruleForm.card" placeholder="请选择" style="width:100%">
            <el-option v-for="item in cardList" :key="item.id" :value="item.id" :label="item.CTName"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="教练:" prop="trainer" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-select v-model="ruleForm.trainer" placeholder="请选择" style="width:100%">
            <el-option v-for="item in coachList" :key="item.YGXX_YGID_NEI" :value="item.YGXX_YGID_NEI" :label="item.YGXX_NAME">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item class="dialog-footer">
        <el-col :span="24" style="display: flex;justify-content: flex-end;">
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { requestLogin as request } from "../api/api";
export default {
  name: "personal",
  props: {
    startTime: String,
    endTime: String,
    classroom: String,
    whichDay: String,
    coachList: Array
  },
  data() {
    return {
      formLabelWidth: "130px",
      cardList: [],
      ruleForm: {
        name: "", //姓名
        card: "", //卡种
        consumer: "", //会员/体验客户
        trainer: "" //教练
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入会员姓名或者体验电话",
            trigger: "blur"
          }
        ],
        card: [
          {
            required: true,
            message: "请选择会员卡或者体验券",
            trigger: "change"
          }
        ],
        trainer: [{ required: true, message: "请选择教练", trigger: "change" }],
        consumer: [
          { required: true, message: "请选择会员/体验客户", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 约课
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            kcStime: this.whichDay,
            Stime: this.startTime,
            Etime: this.endTime,
            kcPlace: this.classroom,
            JLID: this.ruleForm.trainer,
            cardId: this.ruleForm.card,
            sign: this.ruleForm.consumer
          };
          request("/SetPrivateReserve", params)
            .then(data => {
              this.$message({ message: "预约成功", type: "success" });
              this.$emit("success");
              this.resetForm(formName);
            })
            .catch(error => {
              this.$message({
                message: error.response.data.msg,
                type: "error"
              });
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.name = "";
      this.ruleForm.consumer = "";
      this.ruleForm.card = "";
      this.ruleForm.trainer = "";
    },
    // 获取客户卡/券信息
    getCardInfo(val) {
      this.cardInfoHandle();
      if (this.ruleForm.consumer == "experience") {
        this.ruleForm.card = "";
        this.cardList = [];
        this.$message({
          message:
            "体验客户的唯一标识非姓名,请输入电话号码,如已输入请忽略此提示!",
          type: "warning"
        });
      } else {
        this.ruleForm.card = "";
        this.cardList = [];
      }
    },
    //卡信息显示内容
    cardInfoHandle() {
      let _this = this;
      var loginParams = {
        name: _this.ruleForm.name,
        sign: _this.ruleForm.consumer
      };
      request("/getSearchName", loginParams, "post")
        .then(function(res) {
          if (loginParams.sign == "member") {
            _this.cardList = [];
            var membership_card = res.membership_card;
            for (var i = 0; i < membership_card.length; i++) {
              var item = membership_card[i];
              var cardType = { CTID: "", CTName: "" };
              cardType.id = item.id;
              cardType.CTName =
                item.card_type.CTName +
                " (" +
                (item.isEnabled == 1 ? "已启用" : "已禁用") +
                "; 到期时间:" +
                item.eTime +
                "; 状态:" +
                item.State +
                "";
              if (item.SYCS > 0) {
                cardType.CTName =
                  cardType.CTName + "; 剩余次数:" + item.SYCS + ")";
              } else if (item.SYJE > 0) {
                cardType.CTName =
                  cardType.CTName + "; 剩余金额:" + item.SYJE + ")";
              } else {
                cardType.CTName = cardType.CTName + ")";
              }
              _this.cardList.push(cardType);
            }
          } else {
            _this.cardList = [];
            var customer_voucher = res.customer_voucher;
            for (var i = 0; i < customer_voucher.length; i++) {
              var item = customer_voucher[i];
              var cardType = { CTID: "", CTName: "" };
              cardType.id = customer_voucher[i].id;
              cardType.CTName =
                item.experience_voucher.tkName +
                " (到期时间:" +
                item.endTime +
                "; 剩余次数:" +
                item.surplus +
                ")";
              _this.cardList.push(cardType);
            }
          }
        })
        .catch(error => {
          if (error.res) {
            this.$message({
              message: "获取数据失败",
              type: "error"
            });
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>

