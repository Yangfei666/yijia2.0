<template>
  <div class="mian">
    <!-- <el-dialog v-if="isIE1" :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false" :show-close='false'>
      <el-alert title="抱歉!该浏览器暂不支持浏览本网站，建议更换谷歌浏览器，360浏览器，或者其他浏览器" type="warning" show-icon center></el-alert>
    </el-dialog> -->
    <!--登录-->
    <transition name="fade">
      <div class="login-mian" v-if="show">
        <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px" class="demo-ruleForm login-container">
          <h3 class="title">易伽欢迎你</h3>
          <el-form-item prop="username" class="form-item">
            <el-input type="text" class="input" autofocus="autofocus" v-model.number="account.username" :disabled="disabled" maxlength="11" auto-complete="off" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="pwd" class="form-item">
            <el-input type="password" class="input" auto-complete="off" v-model="account.pwd" :disabled="disabled" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="verifycode" class="identifyform" v-if="!isAdmin">
            <div class="identifybox">
              <el-input type="text" v-model="account.verifycode" placeholder="输入验证码" class="identifyinput" style="width:98%"></el-input>
              <el-col :span="24">
                <img :src="img" alt="验证码" title="点击换一张" @click="getimg" />
              </el-col>
            </div>
          </el-form-item>
          <el-form-item class="form-main" v-if="!isAdmin">
            <el-button v-waves style="width:100%;height:40px;" @click.native.prevent="handleLogin" :disabled="account.username==''&&account.verifycode==''&&account.pwd==''" :loading="logining">登录</el-button>
          </el-form-item>
          <!-- <div class="frombutt" v-if="!isAdmin">忘记密码了?《
            <el-button class="butt" @click="showcont3">找回密码</el-button>》</div> -->
          <transition name="slide-fade">
            <el-form-item prop="door" class="form-item2" v-if="isAdmin">
              <el-select v-model="account.door" placeholder="请选择门店">
                <el-option v-for="item in clubList" :key="item.Hsxx_Hsid" :label="item.Hsxx_Name" :value="item.Hsxx_Hsid"></el-option>
              </el-select>
            </el-form-item>
          </transition>
          <el-form-item class="form-main" v-if="isAdmin">
            <el-button v-waves style="width:100%;height:40px;" @click.native.prevent="confirmClub" :loading="logining">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
    <!--找回密码-->
    <transition name="fade">
      <div class="login-mian" v-if="conthide">
        <el-form ref="AccountFrom" :model="account3" :rules="rules3" label-position="left" label-width="0px" class="demo-ruleForm login-container">
          <h3 class="title">重置</h3>
          <el-form-item prop="tel3" class="form-item">
            <el-input type="text" class="input" autofocus="autofocus" v-model.number="account3.tel3" :disabled="disabled" maxlength="11" auto-complete="off" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="verifycode3" class="identifyform" v-if="!isAdmin">
            <div class="identifybox">
              <el-input type="text" v-model="account3.verifycode3" placeholder="输入验证码" class="identifyinput" style="width:98%"></el-input>
              <el-col :span="24">
                <el-button v-show="sendAuthCode2" class="auth_text" @click="getAuthCode2">获取验证码</el-button>
                <el-button v-show="!sendAuthCode2" class="auth_text">
                  <b class="auth">{{auth_time2}}</b>秒后重新获取</el-button>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item prop="pwd3" class="form-item" v-show="hide2">
            <el-input type="password" class="input" auto-complete="off" v-model="account3.pwd3" :disabled="disabled" placeholder="设置密码"></el-input>
          </el-form-item>
          <el-form-item class="form-main" v-if="!isAdmin">
            <el-button v-waves style="width:100%;height:40px;" @click.native.prevent="handleResetting" :disabled="account3.tel3==''&&account3.verifycode3==''&&account3.pwd3==''" :loading="logining">重置</el-button>
          </el-form-item>
          <!-- <div class="frombutt" v-if="!isAdmin">已经有账号？《
            <el-button class="butt" @click="showcont2">点击登录</el-button>》</div> -->
        </el-form>
      </div>
    </transition>
  </div>
</template>
<script>
import { requestLogin } from "../api/api";
import * as validate from "../validate/Login";
import waves from "@/directive/waves/index.js"; // 水波纹指令
// function IEVersion() {
//   var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
//   var isIE =
//     userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
//   var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
//   var isIE11 =
//     userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
//   if (isIE) {
//     var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
//     reIE.test(userAgent);
//     var fIEVersion = parseFloat(RegExp["$1"]);
//     if (fIEVersion > 6) {
//       // IE版本：7,8,9,10
//       return true;
//     } else {
//       //IE版本<=6
//       return true;
//     }
//   } else if (isEdge) {
//     return false; //edge
//   } else if (isIE11) {
//     return true; //IE11
//   } else {
//     return false; //不是ie浏览器
//   }
// }
export default {
  name: "Login",
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
      sendAuthCode2: true, //获取按钮
      auth_time2: 0, //倒计时
      show: true,
      conthide: false,
      hide2: false,
      disabled: false,
      logining: false,
      dialogVisible: true,
      checked: false,
      // img : 'http://api.yijiayoga.cn/pc/v1.Login/getVerification',
      img: "http://192.168.2.107/pc/v1.Login/getVerification",
      num: 0,
      account: {
        username: "",
        pwd: "",
        verifycode: "",
        door: ""
      },
      account3: {
        tel3: "",
        pwd3: "",
        verifycode3: ""
      },
      rules: {
        username: validate.tel,
        pwd: validate.pwd,
        verifycode: validate.verifycode
      },
      rules3: {
        tel3: [
          {
            required: true,
            validator: telCheck,
            trigger: "blur"
          }
        ],
        pwd3: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        verifycode3: validate.verifycode
      },
      isAdmin: false,
      clubList: [],
      isIE1: false,
      dataid: ""
    };
  },
  methods: {
    //获取验证码重置
    getAuthCode2: function() {
      if (this.account3.tel3 == "") {
        this.$message({
          message: "请先输入手机号码",
          type: "warning"
        });
      } else {
        requestLogin(
          "/register/getVerificationCode/" + this.account3.tel3 + "/reset",
          {},
          "get"
        )
          .then(data => {
            this.logining = false;
          })
          .catch(error => {
            this.logining = false;
            let { response: { data: { errorCode, msg } } } = error;
            if (errorCode != 0) {
              this.$message({
                message: msg,
                type: "error"
              });
              this.sendAuthCode2 = true;
              this.hide2 = false;
              return;
            }
          });
        this.sendAuthCode2 = false;
        this.hide2 = true;
        //设置倒计时秒
        this.auth_time2 = 59;
        var auth_timetimer = setInterval(() => {
          this.auth_time2--;
          if (this.auth_time2 <= 0) {
            this.sendAuthCode2 = true;
            clearInterval(auth_timetimer);
          }
        }, 1000);
      }
    },
    //登录
    handleLogin() {
      this.$refs.AccountFrom.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            tel: this.account.username,
            pwd: this.account.pwd,
            verifycode: this.account.verifycode,
            num: this.num
          };
          requestLogin("/getToken", loginParams)
            .then(data => {
              this.logining = false;
              sessionStorage.setItem("userInfo", JSON.stringify(data.user)); //缓存用户信息
              sessionStorage.setItem("access-token", data.token); //缓存token
              if (data.sign == "super") {
                this.clubList = data.club;
                this.isAdmin = !this.isAdmin;
                this.disabled = true;
                sessionStorage.setItem("clubList", JSON.stringify(data.club)); //缓存名下门店
              } else {
                sessionStorage.setItem("club", JSON.stringify(data.club)); //缓存所属门店
                this.$router.push({ path: "/home/main" });
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
              }
              if (msg == "请完善资料后再登录,谢谢!") {
                this.$router.push({
                  path: "/register",
                  query: {
                    dianhua: this.account.username,
                    mima: this.account.pwd,
                    shezhi: "shezhi"
                  }
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    //登录
    showcont2() {
      this.show = true;
      this.conthide = false;
    },
    //重置
    showcont3() {
      this.conthide = true;
      this.show = false;
    },
    //提交门店
    confirmClub() {
      requestLogin("/againGetToken/" + this.account.door)
        .then(data => {
          this.logining = true;
          sessionStorage.setItem("access-token", data); //换成有权限的token
          this.clubList.forEach(item => {
            if (item.Hsxx_Hsid == this.account.door) {
              sessionStorage.setItem("club", JSON.stringify(item)); //缓存所属门店
            }
          });
          this.$router.push({ path: "/home/main" });
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
    //重置
    handleResetting() {
      this.logining = true;
      let loginParams = {
        tel: this.account3.tel3,
        password: this.account3.pwd3,
        verificationCode: this.account3.verifycode3
      };
      requestLogin("/register/save/reset", loginParams)
        .then(data => {
          this.logining = false;
          this.$message({
            message: "重置成功",
            type: "success"
          });
          this.show = true;
          this.conthide = false;
          this.account3.tel3 = "";
          this.account3.pwd3 = "";
          this.account3.verifycode3 = "";
          this.sendAuthCode2 = true;
          this.hide2 = false;
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
    getimg() {
      this.img = this.img + "?num=" + this.num + "&random=" + Math.random();
    }
  },
  mounted() {
    this.num = Math.ceil(Math.random() * 10);
    this.getimg();
    // console.log(IEVersion());
    // this.isIE1 = IEVersion();
  }
};
</script>
<style lang="scss">
@import "@/styles/login.scss";
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

