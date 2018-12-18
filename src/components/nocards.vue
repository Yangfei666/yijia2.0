<template>
  <div>
    <!--不办卡操作-->
    <div class="health">
      <el-col :span="24" class="infor-head">
        <div class="infor-title">
          <span>不办卡</span>
        </div>
        <div class="infor-but" @click="back">
          <el-button class="goback el-icon-arrow-left">返回</el-button>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="health-from">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
            <el-col :span="17" class="from-date">
              <el-col :span="24">
                <el-form-item label="不办卡原因：" prop="desc">
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
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "nocards",
  data() {
    return {
      remnant: 50,
      ruleForm: {
        desc: ""
      },
      rules: {
        desc: [
          { required: true, message: "请输入请假原因", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //不办卡
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              id: this.$route.params.id, //体验客户id
              content: this.ruleForm.desc //原因
            };
            requestLogin("/setExperienceCustomer/giveUp", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
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
      this.remnant = 50;
    },
    descInput() {
      var txtVal = this.ruleForm.desc.length;
      this.remnant = 50 - txtVal;
    },
    back() {
      this.$router.push({
        name: "Experhome",
        params: {
          id: this.$route.params.id,
          exName: this.$route.params.exName,
          exHjgwName: this.$route.params.exHjgwName,
          exTel: this.$route.params.exTel,
          exSex: this.$route.params.exSex,
          exWeChat:this.$route.params.exWeChat,
          exHjgwId:this.$route.params.exHjgwId
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
      padding-right: 10px;
      font-size: 16px;
      color: #262626;
      .goback{
        border: none;
        background: #fff;
        font-size: 16px;
      }
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
        top: 65%;
        right: 6%;
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
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .health {
    width: 97%;
    height: 600px;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    .health-from {
      width: 83%;
      margin: 30px auto;
      .from-date {
        position: relative;
        .textarea {
          color: #00bc71;
          position: absolute;
          top: 63%;
          right: -42%;
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
      .el-textarea {
        width: 375px !important;
      }
    }
  }
}
@media screen and (min-width: 992px) and (max-width: 1280px) {
  .health {
    width: 97%;
    height: 600px;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    .health-from {
      width: 83%;
      margin: 30px auto;
      .from-date {
        position: relative;
        .textarea {
          color: #00bc71;
          position: absolute;
          top: 65%;
          right: -30%;
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
      .el-textarea {
        width: 510px !important;
      }
    }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1440px) {
  .health {
    width: 97%;
    height: 600px;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    .health-from {
      width: 83%;
      margin: 30px auto;
      .from-date {
        position: relative;
        .textarea {
          color: #00bc71;
          position: absolute;
          top: 65%;
          right: 3%;
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
      .el-textarea {
        width: 550px !important;
      }
    }
  }
}
@media screen and (min-width: 1440px) and (max-width: 1920px) {
  .health {
    width: 97%;
    height: 600px;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    .health-from {
      width: 83%;
      margin: 30px auto;
      .from-date {
        position: relative;
        .textarea {
          color: #00bc71;
          position: absolute;
          top: 65%;
          right: 6%;
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
      .el-textarea {
        width: 600px !important;
      }
    }
  }
}
@media screen and (min-width: 1920px) and (max-width: 2048px) {
  .health {
    width: 97%;
    height: 600px;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    .health-from {
      width: 83%;
      margin: 30px auto;
      .from-date {
        position: relative;
        .textarea {
          color: #00bc71;
          position: absolute;
          top: 65%;
          right: 20%;
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
      .el-textarea {
        width: 650px !important;
      }
    }
  }
}
</style>
