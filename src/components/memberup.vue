<template>
  <div>
    <!--潜在跟进记录-->
    <div class="taste-wapper">
      <el-row>
        <div class="taste-list">
          <el-col :span="24" class="taste-buttom">
            <span>跟进记录:</span>
          </el-col>
          <el-col :span="24" class="taste-center">
            <el-button type="text" @click="dialogFormVisible = true" :disabled="disabled">
              <i class="el-icon-plus"></i>添加跟进记录</el-button>
            <template>
              <el-dialog title="添加跟进记录" :append-to-body="true" :visible.sync="dialogFormVisible">
                <!--添加跟进记录-->
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                  <el-form-item label="跟进内容:" prop="desc" :label-width="formLabelWidth">
                    <el-col :span="22" class="from-date">
                      <el-input type="textarea" v-model.trim="ruleForm.desc" maxlength="100" @input="descInput" placeholder="请输入"></el-input>
                      <span class="textarea">还可以输入{{remnant}}字</span>
                    </el-col>
                  </el-form-item>
                  <el-form-item class="dialog-footer">
                    <el-col :span="24" style="display: flex;justify-content: flex-end;">
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                      <el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                    </el-col>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </template>
          </el-col>
          <el-col :span="24" class="taste-center">
            <el-button type="text" @click="dialogFormVisible2 = true" :disabled="disabled">
              <i class="el-icon-plus"></i>添加邀约</el-button>
              <template>
              <el-dialog title="添加邀约" :append-to-body="true" :visible.sync="dialogFormVisible2">
                <!--添加邀约-->
                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px">
                  <el-form-item label="日期:" prop="kcStime" :label-width="formLabelWidth">
                    <el-col :span="22">
                      <el-date-picker placeholder="请选择" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="ruleForm2.kcStime" style="width: 100%;"></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="跟进内容:" prop="desc" :label-width="formLabelWidth">
                    <el-col :span="22" class="from-date">
                      <el-input type="textarea" v-model.trim="ruleForm2.desc" maxlength="100" @input="descInput2" placeholder="请输入"></el-input>
                      <span class="textarea">还可以输入{{remnant}}字</span>
                    </el-col>
                  </el-form-item>
                  <el-form-item class="dialog-footer">
                    <el-col :span="24" style="display: flex;justify-content: flex-end;">
                      <el-button @click="resetForm2('ruleForm2')">重置</el-button>
                      <el-button type="primary" @click="addcustomer('ruleForm2')" :loading="addLoading" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                    </el-col>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </template>
          </el-col>
          <template>
            <el-col :span="24" class="taste-top" v-for="item in taste" :key="item.packetId">
              <div class="round"></div>
              <div class="data">{{item.reCreaTime}}</div>
              <div class="record">{{item.reContent}}</div>
            </el-col>
          </template>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "memberup",
  inject: ["reload"],
  data() {
    return {
      addLoading: false,
      disabled:false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "130px",
      customerType:"",
      ruleForm: {
        desc: "" //跟进内容
      },
      ruleForm2: {
        kcStime:"",//日期
        desc: "" //跟进内容
      },
      rules: {
        desc: [{ required: true, message: "请输入跟进内容", trigger: "blur" }]
      },
      rules2: {
        kcStime:[{required:true,message: "请选择日期", trigger: "blur" }],
        desc: [{ required: true, message: "请输入跟进内容", trigger: "blur" }]
      },
      taste: [],
      remnant:100
    };
  },
  created: function() {
    let _this = this;
    requestLogin(
      "/CustomerFollowUp/getFollowUpRecord/potential/" + _this.$route.query.id,
      {},
      "get"
    )
      .then(function(res) {
        _this.taste = res.record;
        _this.customerType = res.customerType;
        if(res.collectiveInvitation == 1 && res.customerType.indexOf("2") > -1){
          _this.disabled = true;
        }else{
          _this.disabled = false;
        }
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
  methods: {
    //添加跟进记录
    submitForm(formName) {
      if(this.ruleForm.desc.length < 10){
         this.$message({
            message: "输入字数不能少于10个字",
            type: "warning"
          });
      }else{
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            var loginParams = {
              identity: "potential", //客户类别
              id: this.$route.query.id, //客户id
              content: this.ruleForm.desc //内容
            };
            requestLogin(
              "/CustomerFollowUp/addFollowUpRecord",
              loginParams,
              "post"
            )
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "添加成功",
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
      }
    },
    //添加邀约
    addcustomer(formName){
      if(this.ruleForm2.desc.length < 10){
         this.$message({
            message: "输入字数不能少于10个字",
            type: "warning"
          });
      }else{
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            var loginParams = {
              identity: "potential", //客户类别
              id: this.$route.query.id, //客户id
              day:this.ruleForm2.kcStime,//日期
              content: this.ruleForm2.desc //内容
            };
            requestLogin(
              "/CustomerFollowUp/invitation/create",
              loginParams,
              "post"
            )
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible2 = false;
                this.resetForm2(formName);
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
      }
    },
    resetForm2(formName) {
      this.$refs[formName].resetFields();
      this.remnant = 100;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.remnant = 100;
    },
    descInput2() {
      var txtVal = this.ruleForm2.desc.length;
      this.remnant = 100 - txtVal;
    },
     descInput() {
      var txtVal = this.ruleForm.desc.length;
      this.remnant = 100 - txtVal;
    },
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
.taste-wapper {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .taste-list {
    width: 97%;
    height: 100%;
    margin: 20px auto;
    .taste-buttom {
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      text-align: left;
    }
    .taste-center {
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      height: 40px;
      line-height: 35px;
      border: 1px dashed #d0f2e5;
      border-radius: 16px;
      margin-top: 15px;
      margin-bottom: 20px;
      color: #00bc71;
      width: 50%;
    }
    .taste-center:hover {
      border: 1px dashed #00bc71;
    }
    .taste-top {
      margin: 10px auto;
      border-radius: 16px;
      background: #f2faf7;
      display: flex;
      height: 32px;
      line-height: 32px;
      .round {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid #00bc71;
        margin: 10px;
      }
      .data {
        font-family: PingFang-SC-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #595959;
      }
      .record {
        margin-left: 30px;
        font-family: PingFang-SC-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #595959;
      }
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .taste-wapper {
    width: 97%;
    height: 100%;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    .taste-list {
      width: 97%;
      height: 100%;
      margin: 20px auto;
      .taste-buttom {
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        text-align: left;
      }
      .taste-center {
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        height: 40px !important;
        line-height: 35px !important;
        border: 1px dashed #d0f2e5;
        border-radius: 16px;
        margin-bottom: 20px;
        margin-top: 15px !important;
        color: #00bc71;
      }
      .taste-center:hover {
        border: 1px dashed #00bc71;
      }
      .taste-top {
        margin: 15px auto !important;
        border-radius: 16px;
        background: #f2faf7;
        display: flex;
        height: 100% !important;
        line-height: 32px;
        .round {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid #00bc71;
          margin: 11px !important;
        }
        .data {
          font-family: PingFang-SC-Regular;
          font-size: 12px !important;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #595959;
          width: 18% !important;
        }
        .record {
          margin-left: 13px !important;
          font-family: PingFang-SC-Regular;
          font-size: 12px !important;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #595959;
          text-align: left !important;
        }
      }
    }
  }
}
@media screen and (min-width: 992px) and (max-width: 1280px) {
  .taste-wapper {
    width: 97%;
    height: 100%;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    .taste-list {
      width: 97%;
      height: 100%;
      margin: 20px auto;
      .taste-buttom {
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        text-align: left;
      }
      .taste-center {
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        height: 40px !important;
        line-height: 35px !important;
        border: 1px dashed #d0f2e5;
        border-radius: 16px;
        margin-bottom: 20px;
        margin-top: 15px !important;
        color: #00bc71;
      }
      .taste-center:hover {
        border: 1px dashed #00bc71;
      }
      .taste-top {
        margin: 15px auto !important;
        border-radius: 16px;
        background: #f2faf7;
        display: flex;
        height: 100% !important;
        line-height: 32px;
        .round {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid #00bc71;
          margin: 11px !important;
        }
        .data {
          font-family: PingFang-SC-Regular;
          font-size: 14px !important;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #595959;
          width: 12% !important;
        }
        .record {
          margin-left: 13px !important;
          font-family: PingFang-SC-Regular;
          font-size: 14px !important;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #595959;
          text-align: left !important;
        }
      }
    }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1440px) {
  .taste-wapper {
    width: 97%;
    height: 100%;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    .taste-list {
      width: 97%;
      height: 100%;
      margin: 20px auto;
      .taste-buttom {
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        text-align: left;
      }
      .taste-center {
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        height: 40px !important;
        line-height: 35px !important;
        border: 1px dashed #d0f2e5;
        border-radius: 16px;
        margin-bottom: 20px;
        margin-top: 15px !important;
        color: #00bc71;
      }
      .taste-center:hover {
        border: 1px dashed #00bc71;
      }
      .taste-top {
        margin: 15px auto !important;
        border-radius: 16px;
        background: #f2faf7;
        display: flex;
        height: 100% !important;
        line-height: 32px;
        .round {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid #00bc71;
          margin: 11px !important;
        }
        .data {
          font-family: PingFang-SC-Regular;
          font-size: 14px !important;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #595959;
          width: 10% !important;
        }
        .record {
          margin-left: 13px !important;
          font-family: PingFang-SC-Regular;
          font-size: 14px !important;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #595959;
          text-align: left !important;
        }
      }
    }
  }
}
@media screen and (min-width: 1440px) and (max-width: 1920px) {
  .taste-wapper {
    width: 97%;
    height: 100%;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    .taste-list {
      width: 97%;
      height: 100%;
      margin: 20px auto;
      .taste-buttom {
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        text-align: left;
      }
      .taste-center {
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        height: 40px !important;
        line-height: 35px !important;
        border: 1px dashed #d0f2e5;
        border-radius: 16px;
        margin-bottom: 20px;
        margin-top: 15px !important;
        color: #00bc71;
      }
      .taste-center:hover {
        border: 1px dashed #00bc71;
      }
      .taste-top {
        margin: 15px auto !important;
        border-radius: 16px;
        background: #f2faf7;
        display: flex;
        height: 100% !important;
        line-height: 32px;
        .round {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid #00bc71;
          margin: 11px !important;
        }
        .data {
          font-family: PingFang-SC-Regular;
          font-size: 14px !important;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #595959;
          width: 10% !important;
        }
        .record {
          margin-left: 13px !important;
          font-family: PingFang-SC-Regular;
          font-size: 14px !important;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #595959;
          text-align: left !important;
        }
      }
    }
  }
}
</style>
