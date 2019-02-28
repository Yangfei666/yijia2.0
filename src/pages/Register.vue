<template>
  <div class="mian">
    <!--注册-->
    <transition name="fade">
      <div class="login-mian" v-if="show2">
        <el-form ref="AccountFrom" :model="account2" :rules="rules2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
          <h3 class="title">注册</h3>
          <el-form-item prop="tel2" class="form-item">
            <el-input type="text" class="input" autofocus="autofocus" v-model.number="account2.tel2" :disabled="disabled" maxlength="11" auto-complete="off" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="verifycode2" class="identifyform" v-if="!isAdmin">
            <div class="identifybox">
              <el-input type="text" v-model="account2.verifycode2" placeholder="输入验证码" class="identifyinput" style="width:98%"></el-input>
              <el-col :span="24">
                <el-button v-show="sendAuthCode" class="auth_text" @click="getAuthCode">获取验证码</el-button>
                <el-button v-show="!sendAuthCode" class="auth_text">
                  <b class="auth">{{auth_time}}</b>秒后重新获取</el-button>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item prop="pwd2" class="form-item" v-show="hide">
            <el-input type="password" class="input" auto-complete="off" v-model="account2.pwd2" :disabled="disabled" placeholder="设置密码"></el-input>
          </el-form-item>
          <el-form-item class="form-main" v-if="!isAdmin">
            <el-button v-waves style="width:100%;height:40px;" @click.native.prevent="handleRegister" :disabled="account2.tel2==''&&account2.verifycode2==''&&account2.pwd2==''" :loading="logining">注册</el-button>
          </el-form-item>
          <div class="frombutt" v-if="!isAdmin">已经有账号？《
            <el-button class="butt" @click="showcont2">点击登录</el-button>》</div>
          <transition name="slide-fade">
            <el-form-item prop="doorname" class="form-item" v-if="isAdmin">
              <el-input class="input" auto-complete="off" v-model="account2.doorname" placeholder="会所名称"></el-input>
            </el-form-item>
          </transition>
          <transition name="slide-fade">
            <el-form-item prop="city" class="form-item" v-if="isAdmin">
              <el-input class="input" auto-complete="off" v-model="account2.city" placeholder="所属城市"></el-input>
            </el-form-item>
          </transition>
          <el-form-item class="form-main" v-if="isAdmin">
            <el-button v-waves style="width:100%;height:40px;" @click.native.prevent="confirmClub2" :loading="logining">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>
<script>
import { requestLogin } from "../api/api";
import * as validate from "../validate/Login";
import waves from "@/directive/waves/index.js"; // 水波纹指令
export default {
  name: "Register",
  inject: ["reload"],
  directives: {
    waves
  },
  data() {
    let telCheck = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入电话号码"));
      } else if (!Number.isInteger(value)) {
        return callback(new Error("电话号码必须是数字"));
      } else if (value.toString().length !== 11) {
        return callback(new Error("电话号码必须是11位数字"));
      } else {
        callback();
      }
    };
    return {
      sendAuthCode: true, //获取按钮
      auth_time: 0, //倒计时
      show2: true,
      hide: false,
      disabled: false,
      logining: false,
      dialogVisible: true,
      checked: false,
      num: 0,
      account2: {
        tel2: "",
        pwd2: "",
        verifycode2: "",
        city: "",
        doorname: ""
      },
      rules2: {
        doorname: validate.door,
        tel2: [
          {
            required: true,
            validator: telCheck,
            trigger: "blur"
          }
        ],
        pwd2: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        city: validate.city,
        verifycode2: validate.verifycode
      },
      isAdmin: false,
      clubList: [],
      isIE1: false,
      dataid: "",
      dianhua:this.$route.query.dianhua,
      mima:this.$route.query.mima,
    };
  },
  mounted(){
    this.loginreg();
  },
  methods: {
    loginreg(){
      if(this.$route.query.shezhi == 'shezhi'){
        this.account2.tel2 = this.$route.query.dianhua;
        this.account2.pwd2 = this.$route.query.mima;
        this.disabled = true;
        this.hide = true;
        this.isAdmin = !this.isAdmin;
      }
    },
    //获取验证码注册
    getAuthCode: function() {
      if (this.account2.tel2 == "") {
        this.$message({
          message: "请先输入手机号码",
          type: "warning"
        });
      } else {
        requestLogin(
          "/register/getVerificationCode/" + this.account2.tel2 + "/register",
          {},
          "get"
        )
          .then(data => {
            this.logining = true;
            let { response: { data: { errorCode } } } = error;
            if (data != "" && errorCode != 0) {
              this.sendAuthCode = true;
              this.logining = false;
              this.hide = false;
            }
          })
          .catch(error => {
            this.logining = false;
            let { response: { data: { errorCode, msg } } } = error;
            if (errorCode != 0) {
              this.$message({
                message: msg,
                type: "error"
              });
              this.hide = false;
              this.sendAuthCode = true;
              return;
            }
          });
        this.sendAuthCode = false;
        this.hide = true;
        //设置倒计时秒
        this.auth_time = 59;
        var auth_timetimer = setInterval(() => {
          this.auth_time--;
          if (this.auth_time <= 0) {
            this.sendAuthCode = true;
            clearInterval(auth_timetimer);
          }
        }, 1000);
      }
    },
    //注册
    handleRegister() {
      this.logining = true;
      let loginParams = {
        tel: this.account2.tel2,
        password: this.account2.pwd2,
        verificationCode: this.account2.verifycode2
      };
      requestLogin("/register/save/register", loginParams)
        .then(data => {
          this.logining = false;
          if (data !== "") {
            this.isAdmin = !this.isAdmin;
            this.disabled = true;
            this.dataid = data;
          }
        })
        .catch(error => {
          this.logining = false;
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
    //登录
    showcont2() {
      this.$router.push({ path: "/login" });
      this.reload();
    },
    //注册提交门店
    confirmClub2() {
      let loginParams = {
        Hsxx_Name: this.account2.doorname,
        Hsxx_City: this.account2.city
      };
      requestLogin("/register/saveClubInfo/" + this.dataid, loginParams)
        .then(data => {
            this.$message({
            message: "注册成功",
            type: "success"
          });
         this.$router.push({ path: "/login" });
        })
        .catch(error => {
          this.logining = false;
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
  },
};
</script>
<style lang="scss">
@import "@/styles/register.scss";
</style>
<style scoped>
.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  background: #000;
}
</style>

