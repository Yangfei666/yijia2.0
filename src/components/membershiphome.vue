<template>
  <div>
    <!--会员主页-->
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>客户管理</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/Customer/leaguermanage' }">会员管理</el-breadcrumb-item>
              <el-breadcrumb-item>会员主页</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <el-col :span="1" class="weber-img">
              <img :src="club.urlPic" />
            </el-col>
            <el-col :span="8" class="weber-left">
              <div class="weber-span">{{club.HYName}}·{{club.Sex}}
                <span class="right-span">
                  <router-link :to="{path:'/Customer/membershiphome/information',query:{HYID:this.HYID,YGXX_NAME:this.YGXX_NAME}}" class="link">[详情]</router-link>
                </span>
              </div>
              <div class="weber-p">
                会籍顾问:{{this.YGXX_NAME}}
                <span class="weber-pp">电话:{{club.MotoTel}}</span>
              </div>
            </el-col>
            <el-col :span="14" class="weber-right">
              <div class="right-span">
                <router-link :to="{path:'/Customer/membershiphome/memberment',query:{HYID:this.HYID,YGXX_NAME:this.YGXX_NAME}}" class="link">入会协议</router-link>
              </div>
              <div class="border"></div>
              <div class="right-span">
                <router-link :to="{path:'/Customer/membershiphome/leave',query:{HYID:this.HYID,YGXX_NAME:this.YGXX_NAME}}" class="link">请假/销假</router-link>
              </div>
              <div class="border"></div>
              <div class="right-span">
                <router-link :to="{path:'/Customer/membershiphome/unhook',query:{HYID:this.HYID,YGXX_NAME:this.YGXX_NAME}}" class="link">挂失/解挂/补卡</router-link>
              </div>
              <div class="border"></div>
              <div class="right-span">
                <el-button type="text" class="add-p link" @click="dialogFormVisible2 = true">IC卡序列号</el-button>
                <template>
                  <el-dialog title="IC卡序列号" :append-to-body="true" :visible.sync="dialogFormVisible2">
                    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" @submit.native.prevent>
                      <el-form-item label="IC卡序列号:" prop="seriesnumber" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model.trim="ruleForm.seriesnumber" placeholder=""></el-input>
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
              <!-- <div class="border"></div>
              <div class="right-span">
                <el-button type="text" class="add-p link" @click="dialogFormVisible = true">换会籍</el-button>
                <template>
                  <el-dialog title="换会籍" :append-to-body="true" :visible.sync="dialogFormVisible">
                    <Change :potential="Potential"></Change>
                  </el-dialog>
                </template>
              </div> -->
              <div class="weber-top">
                <div class="right-span2">
                <router-link :to="{path:'/Customer/membershiphome/memberconsume',query:{HYID:this.HYID,YGXX_NAME:this.YGXX_NAME}}" class="link">消费记录</router-link>
              </div>
              <div class="right-span2">
                <router-link :to="{path:'/Customer/membershiphome/operationnote',query:{HYID:this.HYID,YGXX_NAME:this.YGXX_NAME}}" class="link">操作记录</router-link>
              </div>
              <div class="right-span2">
                <router-link :to="{path:'/Customer/membershiphome/classcard2',query:{HYID:this.HYID,YGXX_NAME:this.YGXX_NAME}}" class="link">上课记录</router-link>
              </div>
              </div>
            </el-col>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import Change from "@/components/change";
export default {
  name: "membershiphome",
  inject: ["reload"],
  components: {
    Change
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      Potential: {
        potential: "setDesignateMember",
        id: this.$route.query.HYID,
        YGXX_NAME: this.$route.query.YGXX_NAME
      },
      club: "",
      YGXX_NAME: "",
      HYName: "",
      HYID: "",
      MotoTel: "",
      ruleForm: {
        seriesnumber: ""
      },
      formLabelWidth: "130px"
    };
  },
  created() {
    setTimeout(() => {
      this.getexperhome();
    }, 500);
    this.YGXX_NAME = this.$route.query.YGXX_NAME;
    this.HYID = this.$route.query.HYID;
    this.HYName = this.$route.query.HYName;
    this.MotoTel = this.$route.query.MotoTel;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let aa =
              this.ruleForm.seriesnumber == ""
                ? "12345678"
                : this.ruleForm.seriesnumber;
            requestLogin(
              "/setDesignateMember/supplementSerialNumber/" +
                this.$route.query.HYID +
                "/" +
                aa,
              {},
              "get"
            )
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible2 = false;
                this.resetForm(formName);
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
      this.ruleForm.seriesnumber = "";
    },
    //获取个人中心详情
    getexperhome() {
      let _this = this;
      requestLogin("/setMemberCustomers/" + this.$route.query.HYID, {}, "get")
        .then(function(res) {
          _this.club = res;
          _this.ruleForm.seriesnumber = res.membership_card[0].serialNumber;
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
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
<style lang="scss" scoped>
.practice-main {
  height: 140px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  .breadcrumb {
    margin: 17px 20px auto;
  }
  .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 15px;
          height: 15px;
          padding-left: 5px;
        }
        .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #00bc71;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 16px;
          color: #00bc71;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 16px;
        }
      }
      .is-active {
        color: #00bc71;
      }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 0px;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      position: relative;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 16px;
          color: #595959;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 16px;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
      .weber-top {
      display: flex;
      justify-content: space-around;
      position: absolute;
      right: 10px;
      .right-span2 {
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #fff;
        height: 30px;
        border: 1px solid;
        line-height: 30px;
        border-radius: 6px;
        width:90px;
        background:#00bc71;
        margin-left:10px;
        .link {
          text-decoration: none;
          font-size: 16px;
          color: #fff;
        }
        .router-link-active {
          color: #fff;
          font-size: 16px;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
   .weber {
    margin: 20px 12px auto !important;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 18px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 30px !important;
        text-align: left;
        img {
          width: 15px;
          height: 15px;
          padding-left: 5px;
        }
        .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #00bc71;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 14px !important;
          color: #00bc71;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 14px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: -10px !important;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          display: flex !important;
          justify-content: flex-start !important;
          padding-left:2px !important;
        }
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      position: relative;
      width:77% !important;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 13px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 13px !important;
          color: #595959;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 13px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
      .weber-top {
      display: flex;
      justify-content: space-around;
      position: absolute;
      right: 10px !important;
      .right-span2 {
        font-family: PingFang-SC-Regular;
        font-size: 13px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #fff;
        height: 30px;
        border: 1px solid;
        line-height: 30px;
        border-radius: 6px;
        width:90px;
        background:#00bc71;
        margin-left:10px;
        .link {
          text-decoration: none;
          font-size: 13px !important;
          color: #fff;
        }
        .router-link-active {
          color: #fff;
          font-size: 13px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
    }
  }
}
@media screen and (min-width: 992px) and (max-width: 1280px) {
   .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .weber-left {
      display: inline-grid;
      width:39% !important;
      .weber-span {
        font-size: 20px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 15px;
          height: 15px;
          padding-left: 5px;
        }
        .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #00bc71;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 16px !important;
          color: #00bc71;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 16px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      position: relative;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 14px !important;
          color: #595959;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 14px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
      .weber-top {
      display: flex;
      justify-content: space-around;
      position: absolute;
      right: 10px !important;
      .right-span2 {
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #fff;
        height: 30px;
        border: 1px solid;
        line-height: 30px;
        border-radius: 6px;
        width:90px;
        background:#00bc71;
        margin-left:10px;
        .link {
          text-decoration: none;
          font-size: 14px !important;
          color: #fff;
        }
        .router-link-active {
          color: #fff;
          font-size: 14px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
    }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1440px) {
   .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 20px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 15px;
          height: 15px;
          padding-left: 5px;
        }
        .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #00bc71;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 16px !important;
          color: #00bc71;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 16px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      position: relative;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 14px !important;
          color: #595959;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 14px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
      .weber-top {
      display: flex;
      justify-content: space-around;
      position: absolute !important;
      right: 10px !important;
      .right-span2 {
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #fff;
        height: 30px;
        border: 1px solid;
        line-height: 30px;
        border-radius: 6px;
        width:90px;
        background:#00bc71;
        margin-left:10px;
        .link {
          text-decoration: none;
          font-size: 14px !important;
          color: #fff;
        }
        .router-link-active {
          color: #fff;
          font-size: 14px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
    }
  }
}
@media screen and (min-width: 1440px) and (max-width: 1680px) {
    .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 20px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 15px;
          height: 15px;
          padding-left: 5px;
        }
        .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #00bc71;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 16px !important;
          color: #00bc71;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 16px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      position: relative;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 14px !important;
          color: #595959;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 14px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
      .weber-top {
      display: flex;
      justify-content: space-around;
      position: absolute;
      right: 10px !important;
      .right-span2 {
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #fff;
        height: 30px;
        border: 1px solid;
        line-height: 30px;
        border-radius: 6px;
        width:90px;
        background:#00bc71;
        margin-left:10px;
        .link {
          text-decoration: none;
          font-size: 14px !important;
          color: #fff;
        }
        .router-link-active {
          color: #fff;
          font-size: 14px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
    }
  }
}
@media screen and (min-width: 1680px) and (max-width: 1920px) {
    .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
   .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 21px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 15px;
          height: 15px;
          padding-left: 5px;
        }
        .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #00bc71;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 16px !important;
          color: #00bc71;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 16px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      position: relative;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 16px !important;
          color: #595959;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 16px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
      .weber-top {
      display: flex;
      justify-content: space-around;
      position: absolute;
      right: 10px !important;
      .right-span2 {
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #fff;
        height: 30px;
        border: 1px solid;
        line-height: 30px;
        border-radius: 6px;
        width:90px;
        background:#00bc71;
        margin-left:10px;
        .link {
          text-decoration: none;
          font-size: 16px !important;
          color: #fff;
        }
        .router-link-active {
          color: #fff;
          font-size: 16px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
    }
  }
}
@media screen and (min-width: 1920px) and (max-width: 2048px) {
    .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
   .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 22px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 15px;
          height: 15px;
          padding-left: 5px;
        }
        .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #00bc71;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 16px !important;
          color: #00bc71;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 16px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 18px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      position: relative;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 18px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 18px !important;
          color: #595959;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 18px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
      .weber-top {
      display: flex;
      justify-content: space-around;
      position: absolute;
      right: 10px !important;
      .right-span2 {
        font-family: PingFang-SC-Regular;
        font-size: 17px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #fff;
        height: 30px;
        border: 1px solid;
        line-height: 30px;
        border-radius: 6px;
        width:90px;
        background:#00bc71;
        margin-left:10px;
        .link {
          text-decoration: none;
          font-size: 17px !important;
          color: #fff;
        }
        .router-link-active {
          color: #fff;
          font-size: 17px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
    }
  }
}
</style>
