<template>
    <!--会所基本信息-->
    <div>
        <div class="practice-table">
            <el-col :span="24">
                <div class="add">
                    <el-button type="text" class="p" @click="editclub">修改基本信息</el-button>
                    <template>
                        <el-dialog title="修改会所基本信息" :append-to-body="true" :visible.sync="dialogFormVisible">
                            <!--修改会所基本信息-->
                            <el-form :model="ruleForm" label-width="100px">
                                <el-form-item label="会所名称:" prop="Hsxx_Name" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.Hsxx_Name"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="会所别名:" prop="Hsxx_Name_jch" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.Hsxx_Name_jch"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="所属城市:" prop="Hsxx_City" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.Hsxx_City"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="详细地址:" prop="Hsxx_Add" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.Hsxx_Add"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="邮编:" prop="Hsxx_YB" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.Hsxx_YB"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="电话:" prop="Hsxx_Tel" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.Hsxx_Tel"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="传真:" prop="Hsxx_Fax" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.Hsxx_Fax"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="是否开启员工注册:" prop="register" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-radio-group v-model="ruleForm.register">
                                            <el-radio label="是">是</el-radio>
                                            <el-radio label="否">否</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="预售开始时间:" prop="starttime" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-date-picker v-model="ruleForm.startTime" value-format="yyyy-MM-dd" type="datetime" style="width:100%"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="预售结束时间:" prop="preSaleTime" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-date-picker v-model="ruleForm.preSaleTime" value-format="yyyy-MM-dd" type="datetime" style="width:100%"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="邀请码:" prop="invite" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.invite"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item class="dialog-footer">
                                    <el-col :span="24" style="display: flex;justify-content: flex-end;">
                                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                                        <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </el-dialog>
                    </template>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="handback">
                    <el-col :span="20" class="hand-left">
                        <div class="left-table">
                            <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>会所名称</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>{{club.Hsxx_Name}}</span>
                                </el-col>
                            </div>
                            <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>会所别名</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>{{club.Hsxx_Name_jch}}</span>
                                </el-col>
                            </div>
                            <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>所属城市</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>{{club.Hsxx_City}}</span>
                                </el-col>
                            </div>
                            <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>详细地址</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>{{club.Hsxx_Add}}</span>
                                </el-col>
                            </div>
                            <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>邮编</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>{{club.Hsxx_YB}}</span>
                                </el-col>
                            </div>
                            <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>电话</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>{{club.Hsxx_Tel}}</span>
                                </el-col>
                            </div>
                            <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>传真</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>{{club.Hsxx_Fax}}</span>
                                </el-col>
                            </div>
                            <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>是否开启员工注册</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span class="gg-span">{{club.register}}</span>
                                </el-col>
                            </div>
                            <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>预售开始时间</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>{{club.startTime}}</span>
                                </el-col>
                            </div>
                            <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>预售截止时间</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>{{club.preSaleTime}}</span>
                                </el-col>
                            </div>
                            <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>邀请码</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>{{club.invite}}</span>
                                </el-col>
                            </div>
                        </div>
                    </el-col>
                </div>
            </el-col>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "clubhousebasic",
  inject: ["reload"],
  data() {
    return {
      formLabelWidth: "130px",
      dialogFormVisible: false,
      club: "",
      ruleForm: {}
    };
  },
  created: function() {
    this.getClub();
  },
  methods: {
    //获取会所信息
    getClub() {
      let _this = this;
      requestLogin("/setClubInfo", {}, "get")
        .then(function(res) {
          _this.club = res;
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
    //编辑会所信息
    submitForm(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        var loginParams = {
          Hsxx_Name: this.ruleForm.Hsxx_Name, //会馆名称
          Hsxx_Name_jch: this.ruleForm.Hsxx_Name_jch, //会所别名
          Hsxx_City: this.ruleForm.Hsxx_City, //城市
          Hsxx_Add: this.ruleForm.Hsxx_Add, //地址
          Hsxx_YB: this.ruleForm.Hsxx_YB, //邮编
          Hsxx_FR: this.Hsxx_FR, //法人
          Hsxx_Tel: this.ruleForm.Hsxx_Tel, //电话
          Hsxx_Fax: this.ruleForm.Hsxx_Fax, //传真
          preSaleTime: this.ruleForm.preSaleTime, //预售结束时间
          invite: this.ruleForm.invite, //邀请码
          register: this.ruleForm.register=='是'? 1:2, //是否可以注册员工
          startTime: this.ruleForm.startTime //预售开始时间
        };
        requestLogin("/setClubInfo", loginParams, "post")
          .then(data => {
            this.$message({
              message: "修改成功",
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
    },
    editclub(){
       this.dialogFormVisible = true;
       this.ruleForm = this.club;
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
<style lang="scss" scoped>
.practice-table {
  .add {
    border: 1px solid #00bc71;
    width: 120px;
    height: 32px;
    border-radius: 4px;
    line-height: 0px;
    margin-top: 10px;
    margin-left: 30px;
    .p {
      color: #00bc71;
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      line-height: 6px;
    }
  }
  .handback {
    .hand-left {
      height: 100%;
      .left-table {
        width: 90%;
        height: 100%;
        border: solid 1px #e8e8e8;
        margin: 20px auto;
        .left-table-main {
          height: 50px;
          margin-top: 1px;
          .table-hh {
            height: 50px;
            line-height: 50px;
            text-align: left;
            text-indent: 20px;
            background: #edfaf5;
            span {
              color: #262626;
              font-size: 14px;
            }
          }
          .table-gg {
            height: 50px;
            line-height: 50px;
            text-align: left;
            text-indent: 20px;
            span {
              color: #262626;
              font-size: 14px;
            }
            .gg-span {
              color: #23c585;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .practice-table {
    .add {
      border: 1px solid #00bc71;
      width: 15% !important;
      height: 32px;
      border-radius: 4px;
      margin-top: 10px;
      margin-left: 30px;
      .p {
        color: #00bc71;
        font-family: PingFang-SC-Regular;
        font-size: 12px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-top: -2px !important;
      }
    }
  }
}
@media screen and (min-width: 992px) and (max-width: 1280px) {
  .practice-table {
    .add {
      border: 1px solid #00bc71;
      width: 15% !important;
      height: 32px;
      border-radius: 4px;
      margin-top: 10px;
      margin-left: 30px;
      .p {
        color: #00bc71;
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-top: -2px !important;
      }
    }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1440px) {
  .practice-table {
    .add {
      border: 1px solid #00bc71;
      width: 12% !important;
      height: 32px;
      border-radius: 4px;
      margin-top: 10px;
      margin-left: 30px;
      .p {
        color: #00bc71;
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-top: -2px !important;
      }
    }
  }
}
@media screen and (min-width: 1440px) and (max-width: 1920px) {
  .practice-table {
    .add {
      border: 1px solid #00bc71;
      width: 11% !important;
      height: 32px;
      border-radius: 4px;
      margin-top: 10px;
      margin-left: 30px;
      .p {
        color: #00bc71;
        font-family: PingFang-SC-Regular;
        font-size: 15px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-top: -2px !important;
      }
    }
  }
}
@media screen and (min-width: 1920px) and (max-width: 2048px) {
  .practice-table {
    .add {
      border: 1px solid #00bc71;
      width: 10% !important;
      height: 32px;
      border-radius: 4px;
      margin-top: 10px;
      margin-left: 30px;
      .p {
        color: #00bc71;
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-top: -2px !important;
      }
    }
  }
}
</style>