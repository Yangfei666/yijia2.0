<template>
  <div>
    <!--潜在修改资料-->
    <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
      <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.prName" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
        <el-col :span="22">
            <el-radio label="女" value="1" v-model="currentSelectRow.prSex"></el-radio>
            <el-radio label="男" value="2" v-model="currentSelectRow.prSex"></el-radio>
        </el-col>
      </el-form-item>
      <el-form-item label="电话:" prop="tel" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.prTel" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="微信:" prop="wechat" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.WeChat" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="客户质量:" prop="quality" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-select v-model="currentSelectRow.prQuality" placeholder="请选择" style="width:100%" @change="Selectchange">
            <el-option v-for="item in quality" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
  name:'revisedatum',
  props: ["currentSelectRow"],
  inject: ["reload"],
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "130px",
       quality: [//客户质量
          {value: '1',label: 'A'},
          {value: '2',label: 'B'}, 
          {value: '3',label: 'C'}, 
          {value: '4',label: 'D'}],
    };
  },
  methods: {
     //修改潜在客户
    submitForm(formName) {
      let _this=this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              prName: _this.currentSelectRow.prName, //姓名
              prTel: _this.currentSelectRow.prTel, //电话
              prSex: _this.currentSelectRow.prSex =='女'? 1 : 2, //性别
              prQuality: _this.currentSelectRow.prQuality, //客户质量
              WeChat: _this.currentSelectRow.WeChat, //微信号
            };
            requestLogin("/setPotentialCustomer/"+_this.currentSelectRow.id, loginParams, "put")
              .then(data => {
                this.$message({
                  message: "提交成功",
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
    Selectchange(val){
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>

