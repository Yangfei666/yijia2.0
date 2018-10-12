<template>    
   <div class="mian">
    <div class="login-mian">
    <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">易伽欢迎你</h3>
    <el-form-item prop="username" class="form-item">
      <el-input type="text" class="input" v-model="account.username" auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="pwd" class="form-item">
      <el-input type="password" class="input" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <div class="identifybox" v-if="!isAdmin">
      <el-form-item prop="verifycode" class="identifyform">
        <el-input type="text" v-model="account.verifycode" placeholder="验证码" class="identifyinput"></el-input>
        <img :src="img" alt="验证码" title="点击换一张" @click="getimg"/>
      </el-form-item>
    </div>
    <el-checkbox v-model="checked" class="remember" v-if="!isAdmin">记住密码</el-checkbox>
    <el-form-item class="form-main" v-if="!isAdmin">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining" >登录</el-button>
    </el-form-item>
    <el-form-item prop="door" class="form-item2" v-if="isAdmin">
      <el-select v-model="account.door" placeholder="请选择要进入的门店">
        <el-option v-for="item in clubList" :key="item.Hsxx_Hsid" :label="item.Hsxx_Name" :value="item.Hsxx_Hsid" ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="form-main" v-if="isAdmin">
      <el-button type="primary" style="width:100%;" @click.native.prevent="confirmClub">确定</el-button>
    </el-form-item>
  </el-form>
    </div>
</div>
</template>
<script>
import { requestLogin } from "../api/api";
import * as validate from "../validate/Login";
export default {
  name: "Login",
  data() {
    return {
      logining: false,
      checked: false,
      img : 'http://192.168.2.111/pc/v1.Login/getVerification',
      num : 0,
      account: {
        username: "18550105300",
        pwd: "123456",
        verifycode: "",
        door: ""
      },
      rules: {
        username: validate.tel,
        pwd: validate.pwd,
        verifycode: validate.verifycode
      },
      isAdmin: false,
      clubList: []
    };
  },
  methods: {
    handleLogin () {
      this.$refs.AccountFrom.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            tel: this.account.username,
            pwd: this.account.pwd,
            verifycode: this.account.verifycode,
            num: this.num
          };
          requestLogin('/getToken', loginParams)
            .then(data => {
              console.log(data);
              this.logining = false;
              sessionStorage.setItem("userInfo", JSON.stringify(data.user)); //缓存用户信息
              sessionStorage.setItem("access-token", data.token); //缓存token
              if (data.sign == "super") {
                this.clubList = data.club;
                this.isAdmin = !this.isAdmin;
                sessionStorage.setItem("clubList", JSON.stringify(data.club)); //缓存名下门店
              } else {
                sessionStorage.setItem("club", JSON.stringify(data.club)); //缓存所属门店
                this.$router.push({ path: "/home/main" });
              }
            })
            .catch(error => {
              if (error.response) {
                this.$message({
                  message: "登录失败,请稍候再试",
                  type: "error"
                });
              }
            });
        } else {
          console.log("....");
          return false;
        }
      });
    },
    confirmClub () {
      requestLogin('/againGetToken/'+this.account.door).then(data => {
        console.log(data);
        sessionStorage.setItem("access-token", data.token);//换成有权限的token
        sessionStorage.setItem("club", JSON.stringify(data.club)); //缓存所属门店
        this.$router.push({ path: "/home/main" });
      }).catch(error => {
        if (error.response) {
          this.$message({
            message: "对不起,选择门店失败",
            type: "error"
          });
        }
      })
    },
    getimg () {
      this.img = this.img + '?num=' + this.num + '&random=' +Math.random();
    }
  },
  mounted () {
    this.num = Math.ceil(Math.random() * 10);
    this.getimg();
  }
};
</script>
<style lang="scss">
@import "../styles/login.scss";
</style>

