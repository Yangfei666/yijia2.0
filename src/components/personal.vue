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
      <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.name" @change="getCardInfo()" placeholder="请输入"></el-input>
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
              <el-option v-for="item in cardList" :key="item.id" :value="item.id"
                 :label="cardInfoHandle(item)"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="教练:" prop="trainer" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-select v-model="ruleForm.trainer" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in coachList" :key="item.YGXX_YGID_NEI" :value="item.YGXX_YGID_NEI"
                :label="item.YGXX_NAME"
                >
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
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        card: [{ required: true, message: "请输入卡种", trigger: "blur" }],
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
    },
    // 获取客户卡/券信息
    getCardInfo() {
      if (this.ruleForm.name != "" && this.ruleForm.consumer != "") {
        let params = {
          name: this.ruleForm.name,
          sign: this.ruleForm.consumer
        };
        request("/getSearchName", params)
          .then(data => {
            if (this.ruleForm.consumer == "member") {
              this.cardList = data.membership_card;
            } else {
              this.cardList = data.customer_voucher;
            }
          })
          .catch(error => {
            this.msgCatch(error, "对不起,教练信息加载失败");
          });
      }
    },
    // 卡信息显示内容
    cardInfoHandle(item) {
      if (this.ruleForm.consumer == "member") {
        let string =
          item.card_type.CTName +
          " (" +
          (item.isEnabled == 1 ? "已启用" : "已禁用") +
          "; 到期时间:" +
          item.eTime +
          "; 状态:" +
          item.State +
          "";
        if (item.SYCS > 0) {
          return string + "; 剩余次数:" + item.SYCS + ")";
        } else if (item.SYJE > 0) {
          return string + "; 剩余金额:" + item.SYJE + ")";
        } else {
          return string + ")";
        }
      } else {
        return (
          item.experience_voucher.tkName +
          " (到期时间:" +
          item.endTime +
          "; 剩余次数:" +
          item.surplus +
          ")"
        );
      }
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>

