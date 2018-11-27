<template>
  <div>
    <!--会员跟进记录-->
    <div class="taste-wapper">
      <el-row>
        <div class="taste-list">
          <el-col :span="24" class="taste-buttom">
            <span>跟进记录:</span>
          </el-col>
          <el-col :span="24" class="taste-center">
            <span @click="dialogFormVisible = true">
              <i class="el-icon-plus"></i>添加跟进记录</span>
            <template>
              <el-dialog title="添加跟进记录" :append-to-body="true" :visible.sync="dialogFormVisible">
                <!--添加跟进记录-->
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                  <el-form-item label="跟进内容:" prop="desc" :label-width="formLabelWidth">
                    <el-col :span="22">
                      <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item class="dialog-footer">
                    <el-col :span="24" style="display: flex;justify-content: flex-end;">
                      <el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
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
  inject: ["reload"],
  data() {
    return {
      addLoading: false,
      dialogFormVisible: false,
      formLabelWidth: "130px",
      ruleForm: {
        desc: "" //跟进内容
      },
      rules: {
        desc: [{ required: true, message: "请输入跟进内容", trigger: "blur" }]
      },
      taste: []
    };
  },
  created: function() {
    let _this = this;
    requestLogin(
      "/CustomerFollowUp/getFollowUpRecord/member/" + this.$route.query.HYID,
      {},
      "get"
    )
      .then(function(res) {
        _this.taste = res;
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
    //添加跟进记录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            var loginParams = {
              identity: "member", //客户类别
              id: this.$route.query.HYID, //客户id
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
      height: 32px;
      line-height: 32px;
      color: #00bc71;
      border: 1px dashed #d0f2e5;
      border-radius: 16px;
      margin-top: 15px;
      color: #00bc71;
      margin: 15px auto;
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
        height: 32px;
        line-height: 32px;
        color: #00bc71;
        border: 1px dashed #d0f2e5;
        border-radius: 16px;
        margin-top: 15px;
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
        height: 32px;
        line-height: 32px;
        color: #00bc71;
        border: 1px dashed #d0f2e5;
        border-radius: 16px;
        margin-top: 15px;
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
        height: 32px;
        line-height: 32px;
        color: #00bc71;
        border: 1px dashed #d0f2e5;
        border-radius: 16px;
        margin-top: 15px;
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
        height: 32px;
        line-height: 32px;
        color: #00bc71;
        border: 1px dashed #d0f2e5;
        border-radius: 16px;
        margin-top: 15px;
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
