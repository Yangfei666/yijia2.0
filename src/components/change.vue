<template>
  <div>
    <!--换会籍-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="新会籍:" prop="adviser" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-select v-model="ruleForm.adviser" placeholder="请选择" style="width:100%" @change="Selectchange2">
            <el-option v-for="item in staff_info" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="变更原因:" prop="desc" :label-width="formLabelWidth">
        <el-col :span="22" class="from-date">
          <el-input type="textarea" v-model="ruleForm.desc" maxlength="50" @input="descInput" style="min-height:96px;width:690px;height:69px"></el-input>
          <span class="textarea">还可以输入{{remnant}}字</span>
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
  name: "change",
  inject: ["reload"],
  props: ["currentSelectRow"],
  props: {
    potential: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      remnant: 50,
      staff_info: [],
      formLabelWidth: "130px",
      ruleForm: {
        adviser: [], //新会籍
        desc: "" //变更原因
      },
      rules: {
        adviser: validate.adviser,
        desc: validate.desc
      }
    };
  },
  created: function() {
    //获取会籍顾问列表
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
  methods: {
    submitForm(formName) {
      this.$confirm("确认要更换会籍吗？", "提示").then(() => {
        var loginParams = {
          num: this.ruleForm.adviser, //会籍id
          id: this.potential.id, //客户id
          content: this.ruleForm.desc //变更原因
        };
        requestLogin(
          "/" + this.potential.potential + "/changeAdviser",
          loginParams,
          "post"
        )
          .then(data => {
            this.$message({
              message: "变更成功",
              type: "success"
            });
            this.reload();
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    descInput() {
      var txtVal = this.ruleForm.desc.length;
      this.remnant = 50 - txtVal;
    },
    Selectchange2(val) {}
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>

