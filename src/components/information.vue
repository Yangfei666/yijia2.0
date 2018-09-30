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
                    <img src="../assets/deit.png" @click="dialogFormVisible = true" />
                    <template>
                        <el-dialog title="会员综合信息编辑" :append-to-body="true" :visible.sync="dialogFormVisible">
                             <!--会员综合信息编辑-->
                          <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
                            <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
                            <el-col :span="22">
                              <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="电话:" prop="tel" :label-width="formLabelWidth">
                            <el-col :span="22">
                              <el-input v-model="ruleForm.tel" placeholder="请输入"></el-input>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="微信:" prop="wechat" :label-width="formLabelWidth">
                            <el-col :span="22">
                              <el-input v-model="ruleForm.wechat" placeholder="请输入"></el-input>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="性别:" prop="sex" label-width="130px">
                              <el-col :span="22">
                                  <el-radio v-model="radio" label="女">女</el-radio>
                                  <el-radio v-model="radio" label="男">男</el-radio>
                              </el-col>
                          </el-form-item>
                          <el-form-item label="生日:" prop="birthday" :label-width="formLabelWidth">
                              <el-col :span="22">
                              <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="请选择" style="width:100%;"></el-date-picker>
                              </el-col>
                          </el-form-item>
                          <el-form-item label="住址:" prop="address" :label-width="formLabelWidth">
                            <el-col :span="22">
                              <el-input v-model="ruleForm.address" placeholder="请输入"></el-input>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="职业:" prop="vocation" :label-width="formLabelWidth">
                            <el-col :span="22">
                              <el-input v-model="ruleForm.vocation" placeholder="请输入"></el-input>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="紧急联系人:" prop="contact" :label-width="formLabelWidth">
                            <el-col :span="22">
                              <el-input v-model="ruleForm.contact" placeholder="请输入"></el-input>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="紧急联系人电话:" prop="contacttel" :label-width="formLabelWidth">
                            <el-col :span="22">
                              <el-input v-model="ruleForm.contacttel" placeholder="请输入"></el-input>
                            </el-col>
                          </el-form-item>
                        <el-form-item label="证件号码:" prop="catenumber" :label-width="formLabelWidth">
                            <el-col :span="22">
                              <el-input v-model="ruleForm.catenumber" placeholder="请输入"></el-input>
                            </el-col>
                          </el-form-item>
                          <el-form-item class="dialog-footer" style="margin-left:30px;">
                            <el-col :span="24" style="display: flex;justify-content: flex-start;">
                              <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                              <el-button @click="resetForm('ruleForm')">重置</el-button>
                              </el-col>
                          </el-form-item>
                          </el-form>
                        </el-dialog>
                    </template>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="infor-center">
                    <el-col :span="24" class="infor-info">
                        <span class="left padding">生日：</span>
                        <span class="right">1995-02-35</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left padding">地址：</span>
                        <span class="right">暂无</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left padding">职业：</span>
                        <span class="right">教室</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left margin">紧急联系人：</span>
                        <span class="right">暂无</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left">发卡时间：</span>
                        <span class="right">1995-02-35</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left">激活时间：</span>
                        <span class="right">1995-02-35</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left">到期时间：</span>
                        <span class="right">1995-02-35</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left">付款金额：</span>
                        <span class="right">￥3004</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left">付款方式：</span>
                        <span class="right">微信</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left padding2">证件号：</span>
                        <span class="right">19965565455</span>
                    </el-col>
                </div>
            </el-col>
        </div>
    </div>
</template>
<script>
export default {
  name:'information',
  data() {
    return {
        fileList: [],
        radio: '男',
        dialogFormVisible: false,
        formLabelWidth: '130px',
        birthday:'',
        payment:3,
        ruleForm: {
          name: '',//姓名
          tel:'',//电话
          wechat:'',//微信
          sex:'',//性别
          birthday:'',//生日
          catenumber:'',//证件号码
          address:'',//地址
          vocation:'',//职业
          contact:'',//紧急联系人
          contacttel:'',//紧急联系人电话
        },
    };
  },
  methods: {
    back() {
      let url = this.$route.path;
      if (url === "/Customer/membershiphome/information") {
        this.$router.push("/Customer/membershiphome/memberhome");
      } else {
        this.$router.go(-1); //返回上一层
      }
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
};
</script>
<style lang="scss">
 @import '../styles/dialog.scss';
</style>
<style lang="scss" scoped>
.infor {
  width: 97%;
  height: 570px;
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
  .infor-center {
    width: 70%;
    margin: 20px auto;
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
}
</style>