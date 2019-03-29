<template>
    <div>
      <!--定金修改资料-->
        <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
        <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="currentSelectRow.itName" placeholder="请输入"></el-input>
            </el-col>
        </el-form-item>
         <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
            <el-col :span="22">
                <el-radio-group v-model="currentSelectRow.itSex">
                    <el-radio label="女" value="1"></el-radio>
                    <el-radio label="男" value="2"></el-radio>
                </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="电话:" prop="tel" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="currentSelectRow.itTel" maxlength="11" placeholder="请输入" @blur.prevent="testUser"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="微信:" prop="wechat" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="currentSelectRow.itWeChat" placeholder="请输入"></el-input>
            </el-col>
        </el-form-item>
         <el-form-item label="备注:" prop="desc" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input type="textarea" v-model="currentSelectRow.itRemark"></el-input>
            </el-col>
        </el-form-item>
         <el-form-item class="dialog-footer">
           <el-col :span="24" style="display: flex;justify-content: flex-end;">
            <!--<el-button @click="resetForm('currentSelectRow')">重置</el-button>-->
            <el-button type="primary" @click="submitForm('currentSelectRow')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
            </el-col>
        </el-form-item>
        </el-form>
     </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
export default {
  name: "revisedatum2",
  props: ["currentSelectRow"],
  inject: ["reload"],
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "130px"
    };
  },
  methods: {
    testUser(){
      let _this = this;
    requestLogin("/searchInfoByTel/"+_this.currentSelectRow.itTel, {}, "get")
      .then(function(res) {
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
    //修改定金客户资料
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              name: _this.currentSelectRow.itName, //姓名
              tel: _this.currentSelectRow.itTel, //电话
              sex: _this.currentSelectRow.itSex == "女" ? 1 : 2, //性别
              weChat: _this.currentSelectRow.itWeChat, //微信号
              remark:_this.currentSelectRow.itRemark//备注
            };
            requestLogin(
              "/setDepositCustomer/" + _this.currentSelectRow.id,
              loginParams,
              "put"
            )
              .then(data => {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                _this.reload();
                _this.dialogFormVisible = false;
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
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>

