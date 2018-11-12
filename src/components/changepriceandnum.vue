<template>
  <div>
    <!--变更次数-->
    <el-row>
      <div class="tag">
        <em class="top"></em>
        <el-col :span="24" class="transfer">
          <div class="transfer-main" v-if="this.$route.params.CARD.card_type.ctType == '次数卡'">
            <span class="transfer-span">次卡变更使用次数</span>
            <span class="transfer-span2">原剩余次数：{{this.$route.params.CARD.SYCS}}</span>
          </div>
          <div class="transfer-main" v-else>
            <span class="transfer-span">次卡变更使用金额</span>
            <span class="transfer-span2">原剩余金额：{{this.$route.params.CARD.SYJE}}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="transfer-from" v-if="this.$route.params.CARD.card_type.ctType == '次数卡'">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
              <el-col :span="16">
                <el-form-item label="变更后的总次数:" prop="num">
                  <el-col :span="24">
                    <el-input v-model="ruleForm.num" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="16" class="from-date">
                <el-form-item label="变更原因:" prop="desc">
                  <el-col :span="24">
                    <el-input type="textarea" v-model="ruleForm.desc" maxlength="666" @input="descInput"></el-input>
                    <span class="textarea">还可以输入{{remnant}}字</span>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="16" class="submit">
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
          <div class="transfer-from" v-else>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
              <el-col :span="16">
                <el-form-item label="变更后的总金额:" prop="price">
                  <el-col :span="24">
                    <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="16" class="from-date">
                <el-form-item label="变更原因:" prop="desc2">
                  <el-col :span="24">
                    <el-input type="textarea" v-model="ruleForm.desc2" maxlength="666" @input="descInput"></el-input>
                    <span class="textarea">还可以输入{{remnant}}字</span>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="16" class="submit">
                <el-form-item>
                  <el-button type="primary" @click="submitForm2('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "changepriceandnum",
  inject: ["reload"],
  data() {
    return {
      remnant: 666,
      ruleForm: {
        num: "",
        price: "",
        desc2: "",
        desc: ""
      },
      rules: {
        num: [
          { required: true, message: "请输入变更后的总次数", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "请填写变更原因", trigger: "blur" },
          {
            min: 1,
            max: 666,
            message: "长度在 1 到 666个字符",
            trigger: "blur"
          }
        ],
        price: [
          { required: true, message: "请输入变更后的总金额", trigger: "blur" }
        ],
        desc2: [
          { required: true, message: "请填写变更原因", trigger: "blur" },
          {
            min: 1,
            max: 666,
            message: "长度在 1 到 666个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //变更次数
    submitForm(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        var loginParams = {
          id: this.$route.params.CARD.id, //会员卡id
          num: this.ruleForm.num, //次数
          reason: this.ruleForm.desc //原因
        };
        requestLogin("/setDesignateMember/cardChangeValue", loginParams, "post")
          .then(data => {
            this.$message({
              message: "变更成功",
              type: "success"
            });
            this.resetForm(formName);
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
    //变更金额
    submitForm2(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        var loginParams = {
          id: this.$route.params.CARD.id, //会员卡id
          money: this.ruleForm.price, //金额
          reason: this.ruleForm.desc2 //原因
        };
        requestLogin("/setDesignateMember/cardChangeValue", loginParams, "post")
          .then(data => {
            this.$message({
              message: "变更成功",
              type: "success"
            });
            this.resetForm(formName);
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
      this.remnant = 666 - txtVal;
    }
  }
};
</script>
<style lang="scss" scoped>
.tag {
  width: 97%;
  height:500px;
  display: inline-block;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  margin: 0px auto;
  em {
    width: 0;
    height: 0;
    font-size: 0;
    overflow: hidden;
    position: absolute;
    &.top {
      border-width: 10px;
      border-style: solid dashed dashed;
      border-color: transparent transparent #fff transparent;
      left: 40px;
      top: -20px;
    }
  }
  .transfer {
    border-bottom: 1px solid #e8e8e8;
    .transfer-main {
      height: 45px;
      width: 98%;
      margin: auto;
      line-height: 45px;
      display: flex;
      justify-content: flex-start;
      .transfer-span {
        font-size: 16px;
        color: #262626;
        text-indent: 5px;
      }
      .transfer-span2 {
        font-size: 16px;
        color: #00bc71;
        padding-left: 20px;
      }
      .transfer-div {
        width: 105px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #00bc71;
        line-height: 32px;
        margin-top: 6px;
        span {
          color: #00bc71;
          font-size: 16px;
        }
      }
    }
  }
  .transfer-from {
    width: 85%;
    margin: 20px auto;
    .el-button--primary {
      height: 35px;
      line-height: 10px;
    }
    .submit {
      display: flex;
    }
    .from-date {
      position: relative;
      .textarea {
        color: #00bc71;
        position: absolute;
        top: 60%;
        right: 5%;
      }
    }
  }
  .transfer-table {
    width: 98%;
    margin: 0 auto;
  }
}
</style>