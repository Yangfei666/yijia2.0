<template>
    <div>
        <!--添加潜在客户-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.name" placeholder="中英文，长度2-10"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
            <el-col :span="22">
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio :label="1">女</el-radio>
                    <el-radio :label="2">男</el-radio>
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
            <el-form-item label="客户质量:" prop="quality" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.quality" placeholder="请选择" style="width:100%" @change="Selectchange">
                  <el-option v-for="item in quality" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="会籍顾问:" prop="adviser" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.adviser" placeholder="请选择" style="width:100%" @change="Selectchange2">
                <el-option v-for="item in staff_info" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                </el-select>
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
  name:'addlatent',
  inject: ["reload"],
    data() {
     return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
        disabled:false,
        quality: [//客户质量
          {value: '1',label: 'A'},
          {value: '2',label: 'B'},
          {value: '3',label: 'C'},
          {value: '4',label: 'D'}],
        staff_info:[],
        ruleForm: {
          name:'',//姓名
          sex: '',//性别
          tel:'',//电话
          wechat: '',//微信
          quality:'',//客户质量
          adviser:[],//会籍顾问
          desc:''//员工简介
        },
        rules: {
          name:validate.name,//姓名
          sex:validate.sex,//性别
          tel: validate.phone,//电话
          adviser:validate.adviser,//会籍顾问
          quality:validate.quality,//客户质量
        }
     }
    },
    created:function(){
      this.getCustomer();
    },
    methods: {
    //获取会籍顾问列表
    getCustomer(){
      let _this = this;
    requestLogin("/setDepositCustomer/create", {}, "get")
      .then(function(res) {
        let {staff_info} = res;
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
     //添加潜在客户
    submitForm(formName) {
      let _this=this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              prName: _this.ruleForm.name, //姓名
              prTel: _this.ruleForm.tel, //电话
              prSex: _this.ruleForm.sex, //性别
              prQuality: _this.ruleForm.quality, //客户质量
              prBelog: _this.ruleForm.adviser, //会籍顾问id
              WeChat: _this.ruleForm.wechat, //微信号
              remark: _this.ruleForm.desc, //备注
            };
            requestLogin("/setPotentialCustomer", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                _this.reload();
                _this.dialogFormVisible = false;
                this.resetForm(formName);
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
      Selectchange(val){
      },
     Selectchange2(val) {
    },
    }
}
</script>
<style lang="scss">
 @import '../styles/dialog.scss';
</style>
