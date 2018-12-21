<template>
  <!--会员卡解挂操作-->
  <div class="memberhome">
    <el-col :span="24">
      <div class="class-main">
        <div class="infor-but" v-on:click="back">
          <el-button class="goback el-icon-arrow-left">返回</el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card" v-show="membership_card.State !== '挂失'">
          <el-tab-pane label="挂失操作" name="unhook">
            <template>
              <el-col :span="24">
                <div class="first-from">
                  <span>点击右侧按钮挂失<img class="from-img" src="../assets/shou.png" /></span>
                  <el-button class="first-but" type="primary" @click="ReportLoss">确定</el-button>
                </div>
              </el-col>
            </template>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeName2" @tab-click="handleClick" type="card" v-show="membership_card.State === '挂失'">
          <el-tab-pane label="解挂操作" name="first">
            <template>
              <el-col :span="24">
                <div class="first-from">
                  <span>点击右侧按钮解挂<img class="from-img" src="../assets/shou.png" /></span>
                  <el-button class="first-but" type="primary" @click="Unhook">确定</el-button>
                </div>
              </el-col>
            </template>
          </el-tab-pane>
          <el-tab-pane label="补卡操作" name="second" v-if="membership_card.State === '挂失'">
            <template>
              <el-col :span="24">
                <div class="health-from">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-col :span="20" class="from-date">
                      <el-col :span="24">
                        <el-form-item label="新的卡号：" prop="card">
                          <el-input v-model="ruleForm.card" placeholder="请输入" style="width:100%"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="20" class="from-date">
                      <el-col :span="24">
                        <el-form-item label="确认卡号：" prop="confirmcard">
                          <el-input v-model="ruleForm.confirmcard" placeholder="请输入" style="width:100%"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="20" class="from-date">
                      <el-col :span="24">
                        <el-form-item label="IC卡序列号：" prop="seriesnumber">
                          <el-input v-model="ruleForm.seriesnumber" placeholder="请输入" maxlength="30" style="width:100%"></el-input>
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
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "unhook",
  inject: ["reload"],
  data() {
    var validatecard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新卡号"));
      } else {
        if (this.ruleForm.confirmcard !== "") {
          this.$refs.ruleForm.validateField("confirmcard");
        }
        callback();
      }
    };
    var validateconfirmcard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入卡号"));
      } else if (value !== this.ruleForm.card) {
        callback(new Error("两次输入卡号不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeName: "unhook",
      activeName2: "first",
      membership_card: "",
      ruleForm: {
        card: "",
        confirmcard: "",
        seriesnumber: ""
      },
      rules: {
        card: [{ validator: validatecard, trigger: "blur" }],
        confirmcard: [{ validator: validateconfirmcard, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getexperhome();
  },
  methods: {
    //获取会员详情
    getexperhome() {
      let _this = this;
      requestLogin("/setMemberCustomers/" + _this.$route.query.HYID, {}, "get")
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
    handleClick(tab, event) {},
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
    },
    //补卡
    submitForm(formName) {
      if (this.ruleForm.confirmcard !== this.ruleForm.card) {
        this.$message({
          message: "两次输入卡号不一致",
          type: "error"
        });
      } else {
        this.$confirm("确认提交吗？", "提示").then(() => {
          requestLogin(
            "/setDesignateMember/SupplementCard/" +
              this.$route.query.HYID +
              "/" +
              this.ruleForm.card +
              "/" +
              this.ruleForm.seriesnumber,
            {},
            "get"
          )
            .then(data => {
              this.$message({
                message: "补卡成功",
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
      }
    },
    //解挂
    Unhook(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        requestLogin(
          "/setDesignateMember/RescissionLoss/" + this.$route.query.HYID,
          {},
          "get"
        )
          .then(data => {
            this.$message({
              message: "解挂成功",
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
    //挂失
    ReportLoss(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        requestLogin(
          "/setDesignateMember/ReportLoss/" + this.$route.query.HYID,
          {},
          "get"
        )
          .then(data => {
            this.$message({
              message: "挂失成功",
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
    }
  }
};
</script>
<style lang="scss" scoped>
.memberhome {
  width: 97%;
  height: 585px;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  position: relative;
  .class-main {
    height: 100%;
    .infor-but {
      position: absolute;
      top: 0px;
      z-index: 2;
      color: #262626;
      right: 1%;
      font-size: 16px;
      .goback {
        font-size: 16px;
        border: none;
        background: #fff;
      }
    }
    .infor-but:hover {
      color: #00bc71;
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
  }
}
</style>
