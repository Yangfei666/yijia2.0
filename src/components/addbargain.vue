<template>
  <div>
    <!--添加定金客户-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.name" placeholder="中英文，长度2-10"></el-input>
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
      <el-form-item label="电话:" prop="phone" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.phone" maxlength="11" placeholder="请输入11位手机号码"></el-input>
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
      <el-form-item label="金额:" prop="price" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="支付凭证:" prop="file" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-upload class="upload-demo" ref="upload" action=" " :file-list="fileList" :limit='5' :on-exceed='uploadOverrun' :http-request='submitUpload' list-type="picture" :auto-upload="true">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="备注:" prop="desc" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入汉字,字母,数字, 30字以内"></el-input>
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
  name: "addbargain",
  inject: ["reload"],
    props:{
    dingjinqufen: {
      type: Object,
      required: true
    }},
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "130px",
      disabled: false,
      fileList: [],
      staff_info: [],
      YGXX_NAME:'',
      ruleForm: {
        name:"", //姓名
        sex: "", //性别
        phone: "", //电话
        wechat: "", //微信
        adviser: "", //会籍顾问
        file: "", //支付凭证
        price: "", //金额
        mode: "", //付款方式
        desc: "" //员工简介
      },
      rules: {
        name: validate.name,
        sex: validate.sex,
        phone: validate.phone,
        adviser: validate.adviser,
        price: validate.price,
        mode: validate.mode,
      },
      file: ""
    };
  },
  created(){
    this.getCustomer();
    this.ruleForm.name=this.dingjinqufen.name;
    this.ruleForm.sex=this.dingjinqufen.sex;
    this.ruleForm.phone=this.dingjinqufen.tel;
    this.ruleForm.wechat=this.dingjinqufen.wechat;
    this.ruleForm.adviser=this.dingjinqufen.ygxxnameid;
    this.YGXX_NAME=this.dingjinqufen.ygxxname;
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
              message: "获取会籍顾问数据失败",
              type: "error"
            });
          }
        });
    },
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传5张图片!"
      });
    },
    //上传图片
    submitUpload: function(content) {
      this.file = content.file;
    },
    //添加定金客户
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let formData = new FormData();
            formData.append("name", this.ruleForm.name);//姓名
            formData.append("file", this.file);//上传凭证
            formData.append("sex", this.ruleForm.sex=="女"?1:2);//性别
            formData.append("remark", this.ruleForm.desc);//备注
            formData.append("tel", this.ruleForm.phone);//电话
            formData.append("mode", this.ruleForm.mode);//付款方式
            formData.append("price", this.ruleForm.price);//价格
            formData.append("adviserId", this.ruleForm.adviser);//会籍顾问id
            formData.append("adviserName", this.YGXX_NAME);//会籍顾问名字
            formData.append("weChat", this.ruleForm.wechat);//微信
            formData.append("identity",this.dingjinqufen.dingjinqufen);//转换客户的身份
            formData.append("oldId",this.dingjinqufen.id);//原客户类别的id
            requestLogin("/setDepositCustomer",formData,"post")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible = false;
                this.resetForm(formName);
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
      obj = this.staff_info.find(item => {
        return item.YGXX_YGID_NEI === val;
      });
      this.YGXX_NAME = obj.YGXX_NAME;
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
