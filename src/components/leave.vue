<template>
  <div>
    <!--请假操作-->
    <div class="health">
      <el-col :span="24" class="infor-head">
        <div class="infor-title" v-if="membership_card.State === '请假'">
          <span>销假操作</span>
        </div>
        <div class="infor-title" v-else-if="membership_card.State === '未激活'|| membership_card.State === '挂失'">
          <span>卡异常</span>
        </div>
        <div class="infor-title" v-else>
          <span>请假操作</span>
        </div>
        <div class="infor-but" v-on:click="back">
          <span class="goback el-icon-arrow-left">返回</span>
        </div>
      </el-col>
      <el-col :span="24" v-if="membership_card.State != '未激活' && membership_card.State != '挂失' && membership_card.State != '请假'">
        <div class="health-from">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-col :span="20" class="from-date">
              <el-col :span="24">
                <el-form-item label="请假时间：" prop="leavedate">
                  <el-date-picker v-model="ruleForm.leavedate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="20" class="from-date">
              <el-col :span="24">
                <el-form-item label="请假原因：" prop="desc">
                  <el-input type="textarea" v-model="ruleForm.desc" maxlength="50" @input="descInput" style="width:100%"></el-input>
                  <span class="textarea">还可以输入{{remnant}}字</span>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="20" class="from-date">
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-col>
      <el-col :span="24" v-if="membership_card.State === '请假'">
        <div class="first-from">
          <span>点击右侧按钮销假<img class="from-img" src="../assets/shou.png" /></span>
          <el-button class="first-but" type="primary" @click="leave">确定</el-button>
        </div>
      </el-col>
      <el-col :span="24" v-else-if="membership_card.State === '未激活'|| membership_card.State === '挂失'">
        <div class="unusual">卡状态异常,无法执行此操作</div>
      </el-col>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
export default {
  naem: "leave",
  inject: ["reload"],
  data() {
    return {
      remnant: 50,
      membership_card: "",
      ruleForm: {
        leavedate: "",
        desc: ""
      },
      rules: {
        leavedate: validate.leavedate,
        desc: validate.desc
      }
    };
  },
  created() {
    this.getexperhome();
  },
  methods: {
    //请假
    submitForm(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        var loginParams = {
          startTime: this.ruleForm.leavedate[0], //请假开始时间
          endTime: this.ruleForm.leavedate[1], //请假结束时间
          reason: this.ruleForm.desc //原因
        };
        requestLogin(
          "/setDesignateMember/leaveAbsence/" + this.$route.query.HYID,
          loginParams,
          "post"
        )
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
    //销假
    leave() {
      this.$confirm("确认提交吗？", "提示").then(() => {
        requestLogin(
          "/setDesignateMember/resumptionFromLeave/" + this.$route.query.HYID,
          {},
          "get"
        )
          .then(data => {
            this.$message({
              message: "销假成功",
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
    //获取会员详情
    getexperhome() {
      let _this = this;
      requestLogin("/setMemberCustomers/" + this.$route.query.HYID, {}, "get")
        .then(function(res) {
          _this.membership_card = res.membership_card[0];
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    descInput() {
      var txtVal = this.ruleForm.desc.length;
      this.remnant = 50 - txtVal;
    },
    back() {
      this.$router.push({
      path: "/Customer/membershiphome/memberhome",
      query: {
          HYID: this.$route.query.HYID,
          HYName: this.$route.query.HYName,
          YGXX_NAME: this.$route.query.YGXX_NAME,
          MotoTel: this.$route.query.MotoTel
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.health {
  width: 97%;
  height: 600px;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .infor-head {
    height: 50px;
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    border-bottom: 1px solid #e8e8e8;
    .infor-but {
      padding-right: 20px;
      font-size: 16px;
      color: #262626;
    }
    .infor-but:hover {
      color: #00bc71;
    }
    .infor-title {
      padding-left: 15px;
      font-size: 16px;
      color: #262626;
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
  .health-from {
    width: 83%;
    margin: 30px auto;
    .from-date {
      position: relative;
      .textarea {
        color: #00bc71;
        position: absolute;
        top: 55px;
        right: 20px;
      }
    }
    .el-button--primary {
      height: 35px;
      line-height: 1px;
    }
    .el-button + .el-button {
      height: 35px;
      line-height: 1px;
    }
  }
  .first-from {
    width: 70%;
    margin: 20px;
    display: flex;
    justify-content: space-between;
    .first-but {
      width: 64px;
      height: 33px;
      border: 1px solid;
      line-height: 8px;
      text-align: center;
    }
    span .from-img {
      width: 22px;
      height: 18px;
      padding-left: 10px;
      position: relative;
      top: 3px;
    }
  }
  .unusual {
    color: #bfa808;
    width: 24%;
    height: 30px;
    background: #fef8ce;
    margin-top: 3%;
    border-radius: 6px;
    line-height: 30px;
    margin-left: 33%;
  }
}
</style>
