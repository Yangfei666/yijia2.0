<template>
  <div>
    <!--添加体验客户-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.name" placeholder="数字,字母,汉字,逗号句号 长度1-6"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="女" value="1"></el-radio>
            <el-radio label="男" value="2"></el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="电话:" prop="tel" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.tel" maxlength="11" placeholder="请输入11位手机号码"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="微信:" prop="wechat" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.wechat" placeholder="6-20个字母、数字、下划线和减号，必须以字母开头"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="会籍顾问:" prop="adviser" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-select v-model="ruleForm.adviser" placeholder="请选择" style="width:100%" @change="Selectchange2">
            <el-option v-for="item in staff_info" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="体验券:" prop="type" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-select v-model="ruleForm.type" placeholder="请选择" style="width:100%" @change="Selectchange">
            <el-option v-for="item in tkName" :key="item.id" :label="item.tkName" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="金额:" prop="prices" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.prices" placeholder="请输入金额"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="付款方式:" prop="mode" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="ruleForm.mode">
            <el-radio :label="1">店内到付</el-radio>
            <el-radio :label="2">美团</el-radio>
            <el-radio :label="3">大众点评</el-radio>
            <el-radio :label="4">会籍代收</el-radio>
            <el-radio :label="5">未支付</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="备注:" prop="desc" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input type="textarea" v-model="ruleForm.desc" placeholder="汉字、字母、数字和下划线及逗号句号, 长度50以内"></el-input>
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
  name: "addpractice",
  inject: ["reload"],
  props: {
    tiyanqufen: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "130px",
      disabled: false,
      ruleForm: {
        name: "", //姓名
        sex: "", //性别
        tel: "", //电话
        wechat: "", //微信
        adviser: "", //会籍顾问
        type: [], //体验券
        prices:"", //金额
        mode: "", //付款方式
        desc: "" //员工简介
      },
      rules: {
        name:validate.name,
        sex: validate.sex,
        tel: validate.phone,
        adviser: validate.adviser,
        type: validate.type,
        mode: validate.mode,
        prices:validate.price
      },
      staff_info: [],
      tkName: [],
      YGXX_NAME: "",
      tkPrice:""
    };
  },
  created: function() {
    this.getCustomer();
    setTimeout(() => {
      this.getVouchers();
    }, 1000);
    this.ruleForm.name = this.tiyanqufen.name;
    this.ruleForm.sex = this.tiyanqufen.sex;
    this.ruleForm.tel = this.tiyanqufen.tel;
    this.ruleForm.wechat = this.tiyanqufen.wechat;
    this.ruleForm.adviser = this.tiyanqufen.ygxxnameid;
    this.YGXX_NAME = this.tiyanqufen.ygxxname;
  },
  methods: {
    //获取会籍顾问列表
    getCustomer() {
      let _this = this;
      requestLogin("/setDepositCustomer/create", {}, "get")
        .then(function(res) {
          let { staff_info } = res;
          _this.staff_info = staff_info;
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
    //获取体验券
    getVouchers() {
      let _this = this;
      requestLogin("/setExperienceCustomer/selectVouchers", {}, "get")
        .then(function(res) {
          _this.tkName = res;
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
    //添加体验客户
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              exName: _this.ruleForm.name, //姓名
              exTel: _this.ruleForm.tel, //电话
              exWeChat: _this.ruleForm.wechat, //微信
              exSex: _this.ruleForm.sex=='女'?1:2, //性别
              exHjgwId: _this.ruleForm.adviser, //会籍顾问id
              exHjgwName: _this.YGXX_NAME, //会籍顾问姓名
              vid: _this.ruleForm.type, //体验券id
              mode: _this.ruleForm.mode, //付款方式
              price: _this.ruleForm.prices, //价格
              identity: _this.tiyanqufen.tiyanqufen, //转换客户的身份
              oldId: _this.tiyanqufen.id //原客户类别的id
            };
            requestLogin("/setExperienceCustomer", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                _this.reload();
                _this.dialogFormVisible = false;
                _this.resetForm(formName);
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
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    Selectchange2(val) {
      let obj = {};
      obj = this.staff_info.find(item => {
        return item.YGXX_YGID_NEI === val;
      });
      this.YGXX_NAME = obj.YGXX_NAME;
    },
    Selectchange(val) {
      let obj2 = {};
      obj2 = this.tkName.find(item=>{
        return item.id ===val;
      });
      this.ruleForm.prices = obj2.tkPrice;
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
