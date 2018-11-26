<template>
  <div>
    <!--添加会员-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.name" placeholder="汉字、字母、数字和下划线及逗号句号组成、长度2-6"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号:" prop="phone" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.phone" placeholder="请输入11位手机号码"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="微信:" prop="wechat" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.wechat" placeholder="6-20个字母、数字、下划线和减号，必须以字母开头"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="ruleForm.sex" @change="ChangeSex">
            <el-radio label="女" value="女"></el-radio>
            <el-radio label="男" value="男"></el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="生日:" prop="birthday" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-date-picker v-model="ruleForm.birthday" value-format="yyyy-MM-dd" type="date" placeholder="请选择" style="width:100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="证件号码:" prop="catenumber" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.catenumber" placeholder="请输入18位身份证号码/护照均可"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="住址:" prop="address" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.address" placeholder="汉字、字母、数字和下划线及逗号句号组成 长度2-20"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="职业:" prop="vocation" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.vocation" placeholder="长度2-10"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="会籍顾问:" prop="adviser" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-select v-model="ruleForm.adviser" placeholder="请选择" style="width:100%" @change="Selectchange2">
            <el-option v-for="item in staff" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="紧急联系人:" prop="contact" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.contact" placeholder="长度2-6"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="紧急联系人电话:" prop="contacttel" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.contacttel" placeholder="请输入11位手机号码"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="卡名称:" prop="cardname" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-select v-model="ruleForm.cardname" placeholder="请选择" style="width:100%" @change="Selectchange3">
            <el-option v-for="item in cards" :key="item.CTID" :label="item.CTName" :value="item.CTID"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="卡号:" prop="card" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.card" placeholder="长度6-12位"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="卡号确认:" prop="cardaffirm" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.cardaffirm" placeholder="长度6-12位"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="金额:" prop="price" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="this.CTjg" placeholder="0-100000元之间"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="付款方式:" prop="mode" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="ruleForm.mode">
            <el-radio :label="1">微信</el-radio>
            <el-radio :label="2">支付宝</el-radio>
            <el-radio :label="3">现金</el-radio>
            <el-radio :label="4">银行卡</el-radio>
            <el-radio :label="5">信用卡</el-radio>
            <el-radio :label="6">手机银行转账</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="激活时间:" prop="sensitize" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="ruleForm.sensitize" @change="cahngesen">
            <el-radio :label="1">立即激活</el-radio>
            <el-radio :label="2">系统设置时间激活</el-radio>
            <el-radio :label="3">客户首次刷卡激活</el-radio>
          </el-radio-group>
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
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
export default {
  name: "addmember",
  inject: ["reload"],
  props:{
    huiyuanqufen: {
      type: Object,
      required: true
    }},
  data() {
    var validatecard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入卡号"));
      } else {
        if (this.ruleForm.cardaffirm !== "") {
          this.$refs.ruleForm.validateField("cardaffirm");
        }
        callback();
      }
    };
    var validatecardaffirm = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入卡号"));
      } else if (value !== this.ruleForm.card) {
        callback(new Error("两次输入卡号不一致!"));
      } else {
        callback();
      }
    };
    return {
      fileList: [],
      formLabelWidth: "130px",
      staff: [],
      cards: [],
      file: "",
      CTjg:"",
      ruleForm: {
        name: "", //姓名
        phone: "", //手机号
        wechat: "", //微信
        sex: "", //性别
        birthday: "", //生日
        catenumber: "", //证件号码
        address: "", //地址
        vocation: "", //职业
        adviser: "", //会籍顾问
        contact: "", //紧急联系人
        contacttel: "", //紧急联系人电话
        cardname: "", //卡名称
        card: "", //卡号
        cardaffirm: "", //卡号确认
        price: "", //金额
        mode: "", //付款方式
        sensitize: "" //激活时间
      },
      rules: {
        name: validate.name,
        sex: validate.sex,
        phone: validate.phone,
        adviser: validate.adviser,
        mode: validate.mode,
        cardname: validate.cardname,
        card: [{ validator: validatecard, trigger: "blur" }],
        cardaffirm: [{ validator: validatecardaffirm, trigger: "blur" }],
        sensitize: validate.sensitize,
      }
    };
  },
  created() {
    this.getCustomer();
    this.ruleForm.name = this.huiyuanqufen.name;
    this.ruleForm.sex = this.huiyuanqufen.sex;
    this.ruleForm.phone = this.huiyuanqufen.tel;
    this.ruleForm.wechat = this.huiyuanqufen.wechat;
    this.ruleForm.adviser = this.huiyuanqufen.ygxxnameid;
  },
  methods: {
    //获取会籍顾问和卡名称
    getCustomer() {
      let _this = this;
      let relationCard = [];
      requestLogin("/setMemberCustomers/create", {}, "get")
        .then(function(res) {
          let { cards, staff } = res;
          _this.staff = staff.staff_info;
          relationCard = cards.relationCard;
          _this.cards = cards.selfCard;
          for (var i = 0; i < relationCard.length; i++) {
            _this.cards.push(relationCard[i]);
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
    },
    //添加会员客户
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let formData = new FormData();
            formData.append("id", this.ruleForm.adviser); //会籍顾问id
            formData.append("HYName", this.ruleForm.name); //姓名
            formData.append("Sex", this.ruleForm.sex); //性别
            formData.append("Birthday", this.ruleForm.birthday); //生日
            formData.append("MotoTel", this.ruleForm.phone); //电话
            formData.append("ZhiYe", this.ruleForm.vocation); //职业
            formData.append("ZhengJianNO", this.ruleForm.catenumber); //证件号
            formData.append("HomeAdd", this.ruleForm.address); //地址
            formData.append("hyContacts", this.ruleForm.contact); //紧急联系人
            formData.append("hyConTel", this.ruleForm.contacttel); //紧急联系人电话
            formData.append("hyWeChat", this.ruleForm.wechat); //微信
            formData.append("CardNO", this.ruleForm.card); //卡号
            formData.append("mode", this.ruleForm.mode); //付款方式
            formData.append("money", this.CTjg); //付款金额
            formData.append("CTID", this.ruleForm.cardname); //会员卡id
            formData.append("delay", this.ruleForm.sensitize); //激活时间选择
            formData.append("identity",this.huiyuanqufen.huiyuanqufen); //转换客户类别
            formData.append("oldId", this.huiyuanqufen.id); //原客户类别的id
            requestLogin("/setMemberCustomers/newMember", formData, "post")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
              })
              .catch(error => {
                this.addLoading = false;
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
          return false;
        }
      });
    },
    Selectchange2(val) {
      let obj = {};
      obj = this.staff.find(item => {
        return item.YGXX_YGID_NEI === val;
      });
      this.YGXX_NAME = obj.YGXX_NAME;
    },
    Selectchange3(val) {
      let obj2 = {};
      obj2 = this.cards.find(item => {
        return item.CTID === val;
      });
      this.CTjg = obj2.CTjg;
    },
    ChangeSex(val) {
    },
    cahngesen(val) {
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>

