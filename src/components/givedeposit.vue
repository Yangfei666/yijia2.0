<template>
    <div>
        <!--放弃定金-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="放弃原因:" prop="desc" :label-width="formLabelWidth">
               <el-col :span="22">
               <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item class="dialog-footer">
               <el-col :span="24" style="display: flex;justify-content: flex-end;">
            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
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
  name:'givedeposit',
  inject: ["reload"],
  props:['currentSelectRow'],
    data() {
     return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
        ruleForm: {
          desc:''//放弃原因
        },
        rules: {
          desc:validate.desc,
        }
      }
    },
    methods: {
      submitForm(formName) {
      this.$confirm("确认要变更吗？", "提示").then(() => {
        var loginParams = {
          id:this.currentSelectRow.id, //定金客户id
          content: this.ruleForm.desc //变更原因
        };
        requestLogin("/setDepositCustomer/giveUp", loginParams, "post")
          .then(data => {
            this.$message({
              message: "提交成功",
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
    }
}
</script>
<style lang="scss">
 @import '../styles/dialog.scss';
</style>
