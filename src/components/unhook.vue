<template>
  <!--会员卡解挂操作-->
  <div class="memberhome">
    <el-col :span="24">
      <div class="class-main">
        <router-link :to="{name:'Memberhome'}" style="text-decoration:none;">
          <div class="infor-but">
            <span class="goback el-icon-arrow-left">返回</span>
          </div>
        </router-link>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
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
          <el-tab-pane label="补卡操作" name="second">
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
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                      </el-form-item>
                    </el-col>
                  </el-form>
                </div>
              </el-col>
            </template>
          </el-tab-pane>
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
      activeName: "first",
      ruleForm: {
        card: "",
        confirmcard: ""
      },
      rules: {
        card: [{ validator: validatecard, trigger: "blur" }],
        confirmcard: [{ validator: validateconfirmcard, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //补卡
    submitForm(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        requestLogin(
          "/setDesignateMember/SupplementCard/" +
            this.$route.params.HYID +
            "/" +
            this.ruleForm.card,
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
    },
    //解挂
    Unhook(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        requestLogin(
          "/setDesignateMember/RescissionLoss/" + this.$route.params.HYID,
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
          "/setDesignateMember/ReportLoss/" + this.$route.params.HYID,
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
      top: 1.8%;
      z-index: 2;
      color: #262626;
      right: 69%;
      .goback {
        font-size: 14px;
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
