<template>    
   <div class="mian">
    <div class="login-mian">
    <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">E+欢迎你</h3>
    <el-form-item prop="username" class="form-item">
      <el-input type="text" class="input" autofocus="autofocus" v-model="account.username" auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="pwd" class="form-item">
      <el-input type="password" class="input" auto-complete="off" v-model="account.pwd" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="door" class="form-item2">
      <el-select v-model="account.door" placeholder="请选择">
      <el-option label="门店一" value="one"></el-option>
      <el-option label="门店二" value="two"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item prop="verifycode" class="identifyform">
      <div class="identifybox">
      <el-input type="text" v-model="account.verifycode" placeholder="验证码" class="identifyinput"></el-input>
      <el-col :span="24">
        <img src="../assets/xiazai.jpg" alt="验证码" title="点击换一张" />
      </el-col>
      </div>
    </el-form-item>
    <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
    <el-form-item class="form-main">
      <el-button v-waves type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining" >登录</el-button>
    </el-form-item>
  </el-form>
    </div>
</div>
</template>
<script>
import {requestLogin} from '../api/api';
import {isvalidPhone} from '../api/isvalidPhone';
import waves from '@/directive/waves/index.js' // 水波纹指令
export default {
  name: 'Login',
  directives: {
    waves
  },
  data () {
    var validateAccount = (rules,value,callback) => {
      if(!value){
        callback(new Error('请输入账号'));
      }else if(!isvalidPhone(value)){
        callback(new Error('请输入正确的手机号'))
      }else{
        if(this.account.username !== ''){
          this.account.username = value;
        }
        callback();
      }
    };
    var validatePwd = (rules, value,callback) => {
      if(value === ''){
        callback(new Error('请输入密码'));
      }else{
        if(this.account.pwd !== ''){
          this.account.pwd = value;
        }
        callback();
      }
    };
    return {
      logining: false,
      checked: false,
        account: {
          username: '',
          pwd: '',
          verifycode:'',
          door:''
        },
        rules: {
          username: [
            {required: true, validator: validateAccount, trigger: 'blur'}
          ],
          pwd: [
            {required: true,validator: validatePwd, trigger: 'blur'},
            { min: 5, message: '密码长度为5个字符'}
          ],
          verifycode:[
            {required: true, message: '请输入验证码', trigger: 'blur'},
          ],
        },
      };
  },
   methods: {
      handleLogin() {
        this.$refs.AccountFrom.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = {
                 username: this.account.username,
                 password: this.account.pwd,
                 verifycode:this.account.verifycode
                 };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              let { msg, code, token } = data;
              if(code == '200'){
                //登录成功
                sessionStorage.setItem('access-token', token);
                //跳转到后台主界面
                this.$router.push({ path: '/home/main' });
              }else{
                this.$message({
                  showClose: true,
                  message: '登录失败',
                  type: 'error'
                });
              }
            });
          } else {
            this.$message({
              showClose: true,
              message: '请检查输入是否有误',
              type: 'error'
            });
            return false;
          }
        });
      },
    },
}
</script>
<style lang="scss" scoped>
 @import '@/styles/login.scss';
</style>

