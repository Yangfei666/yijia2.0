<template>
  <div>
    <!--会员综合信息-->
    <div class="infor">
      <el-col :span="24" class="infor-head">
        <div class="infor-but" v-on:click="back">
          <span class="goback el-icon-arrow-left">返回</span>
        </div>
        <div class="infor-title">
          <span>会员综合信息</span>
          <img src="../assets/deit.png" @click="editclub" />
          <template>
            <el-dialog title="会员综合信息编辑" :append-to-body="true" :visible.sync="dialogFormVisible">
              <!--会员综合信息编辑-->
              <el-form :model="ruleForm" label-width="100px">
                <el-form-item label="姓名:" prop="HYName" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-input v-model="ruleForm.HYName" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="电话:" prop="MotoTel" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-input v-model="ruleForm.MotoTel" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="微信:" prop="hyWeChat" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-input v-model="ruleForm.hyWeChat" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="性别:" prop="Sex" label-width="130px">
                  <el-col :span="22">
                    <el-radio-group v-model="ruleForm.Sex">
                      <el-radio label="女" value="1"></el-radio>
                      <el-radio label="男" value="2"></el-radio>
                    </el-radio-group>
                  </el-col>
                </el-form-item>
                <el-form-item label="生日:" prop="Birthday" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-date-picker v-model="ruleForm.Birthday" type="date" placeholder="请选择" style="width:100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="住址:" prop="HomeAdd" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-input v-model="ruleForm.HomeAdd" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="职业:" prop="ZhiYe" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-input v-model="ruleForm.ZhiYe" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="紧急联系人:" prop="hyContacts" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-input v-model="ruleForm.hyContacts" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="紧急联系人电话:" prop="hyConTel" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-input v-model="ruleForm.hyConTel" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="证件号码:" prop="ZhengJianNO" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-input v-model="ruleForm.ZhengJianNO" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item class="dialog-footer" style="margin-left:30px;">
                  <el-col :span="24" style="display: flex;justify-content: flex-end;">
                    <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-col>
                </el-form-item>
              </el-form>
            </el-dialog>
          </template>
        </div>
      </el-col>
      <el-col :span="24" class="infor-wp">
        <div class="infor-center">
          <el-col :span="24" class="infor-info">
            <span class="left padding">姓名：</span>
            <span class="right">{{club.HYName}}</span>
          </el-col>
          <el-col :span="24" class="infor-info">
            <span class="left padding">电话：</span>
            <span class="right">{{club.MotoTel}}</span>
          </el-col>
          <el-col :span="24" class="infor-info">
            <span class="left padding">微信：</span>
            <span class="right">{{club.hyWeChat}}</span>
          </el-col>
          <el-col :span="24" class="infor-info">
            <span class="left padding">生日：</span>
            <span class="right">{{club.Birthday}}</span>
          </el-col>
          <el-col :span="24" class="infor-info">
            <span class="left padding">地址：</span>
            <span class="right">{{club.HomeAdd}}</span>
          </el-col>
          <el-col :span="24" class="infor-info">
            <span class="left padding">职业：</span>
            <span class="right">{{club.ZhiYe}}</span>
          </el-col>
          <el-col :span="24" class="infor-info">
            <span class="left margin">紧急联系人：</span>
            <span class="right">{{club.hyContacts}}</span>
          </el-col>
          <el-col :span="24" class="infor-info">
            <span class="left margin2">紧急联系人电话：</span>
            <span class="right">{{club.hyConTel}}</span>
          </el-col>
          <el-col :span="24" class="infor-info">
            <span class="left padding2">证件号：</span>
            <span class="right">{{club.ZhengJianNO}}</span>
          </el-col>
        </div>
        <div class="infor-center2">
          <el-col :span="24" class="hand-right">
            <div class="head_img">
              <img :src="imageUrl" />
            </div>
            <el-upload class="upload-demo" ref="upload" action=" " :file-list="fileList" :limit='1' :on-exceed='uploadOverrun' :http-request='submitUpload' list-type="picture" :auto-upload="true">
              <el-button type="success" class="successbut" plain>更换头像</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "information",
  inject: ["reload"],
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "130px",
      payment: 3,
      club: "",
      imageUrl: "",
      ruleForm: {},
      fileList: [],
      membership_card: ""
    };
  },
  created() {
    this.getexperhome();
  },
  methods: {
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传1张图片!"
      });
    },
    //打开图片上传
    submitUpload: function(content) {
      this.addLoading = true;
      this.file = content.file;
      let formData = new FormData();
      formData.append("file", this.file);
      requestLogin(
        "/setDesignateMember/editMemberIcon/" + this.$route.query.HYID,
        formData,
        "post"
      )
        .then(res => {
          this.addLoading = false;
          this.$message({
            message: "更换成功",
            type: "success"
          });
          this.reload();
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
    },
    //获取会员详情
    getexperhome() {
      let _this = this;
      let relationCard = [];
      requestLogin("/setMemberCustomers/" + this.$route.query.HYID, {}, "get")
        .then(function(res) {
          _this.club = res;
          let { membership_card } = res;
          relationCard = membership_card.relationCard;
          let { Photo } = res;
          _this.imageUrl = Photo;
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
    submitForm(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        var loginParams = {
          HYName: this.ruleForm.HYName, //姓名
          Sex: this.ruleForm.Sex, //性别
          Birthday: this.ruleForm.Birthday, //生日
          MotoTel: this.ruleForm.MotoTel, //电话
          ZhiYe: this.ruleForm.ZhiYe, //职业
          ZhengJianNO: this.ruleForm.ZhengJianNO, //证件号
          HomeAdd: this.ruleForm.HomeAdd, //地址
          hyContacts: this.ruleForm.hyContacts, //紧急联系人
          hyConTel: this.ruleForm.hyConTel, //紧急联系人电话
          hyWeChat: this.ruleForm.hyWeChat //微信号
        };
        requestLogin(
          "/setDesignateMember/" + this.$route.query.HYID,
          loginParams,
          "put"
        )
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
    back() {
      this.$router.go(-1); //返回上一层
    },
    editclub() {
      this.dialogFormVisible = true;
      this.ruleForm = this.club;
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
<style lang="scss" scoped>
.infor {
  width: 97%;
  height: 100%;
  display: inline-block;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .infor-head {
    height: 50px;
    display: flex;
    line-height: 50px;
    border-bottom: 1px solid #e8e8e8;
    .infor-but {
      padding-left: 10px;
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
        width: 17px;
        height: 17px;
        position: relative;
        top: 3px;
      }
    }
  }
  .infor-wp {
    display: flex;
    .infor-center {
      width: 40%;
      margin: 20px auto;
      height: 100%;
      display: inline-block;
      .infor-info {
        height: 47px;
        line-height: 47px;
        text-align: left;
        .left {
          font-family: PingFang-SC-Regular;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #8c8c8c;
        }
        .padding {
          padding-left: 28px;
        }
        .margin {
          margin-left: -14px;
        }
        .margin2 {
          margin-left: -42px;
        }
        .padding2 {
          padding-left: 13px;
        }
        .right {
          font-family: PingFang-SC-Regular;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #262626;
        }
      }
    }
    .infor-center2 {
      width: 40%;
      margin: 20px auto;
      height: 100%;
      display: inline-block;
      margin-left: -9%;
      .hand-right {
        height: 100%;
        .head_img {
          margin-top: 4%;
          img {
            width: 28%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .setting_right {
          height: 35px;
          margin-top: 4%;
          .successbut {
            width: 17%;
            height: 35px;
            padding: 10px;
          }
        }
      }
    }
  }
}
</style>