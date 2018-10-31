<template>
    <div>
        <!--体验综合信息-->
        <div class="infor">
            <el-col :span="24" class="infor-head">
                <div class="infor-but" v-on:click="back">
                    <span class="goback el-icon-arrow-left">返回</span>
                </div>
                <div class="infor-title">
                    <span>体验综合信息</span>
                    <img src="../assets/deit.png" @click="dialogFormVisible = true" />
                    <template>
                        <el-dialog title="体验综合信息编辑" :append-to-body="true" :visible.sync="dialogFormVisible">
                             <!--体验综合信息编辑-->
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
                                  <el-radio v-model="ruleForm.sex" :label="1">女</el-radio>
                                  <el-radio v-model="ruleForm.sex" :label="2">男</el-radio>
                              </el-col>
                          </el-form-item>
                          <el-form-item label="会籍顾问ID:" prop="hjgwID" :label-width="formLabelWidth">
                              <el-col :span="22">
                              <el-date-picker v-model="ruleForm.hjgwID" type="date" placeholder="请选择" style="width:100%;"></el-date-picker>
                              </el-col>
                          </el-form-item>
                          <el-form-item label="会籍顾问名字:" prop="hjgwname" :label-width="formLabelWidth">
                            <el-col :span="22">
                              <el-input v-model="ruleForm.hjgwname" placeholder="请输入"></el-input>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="登记时间:" prop="registertime" :label-width="formLabelWidth">
                            <el-col :span="22">
                               <el-date-picker v-model="ruleForm.registertime" type="date" placeholder="登记日期"></el-date-picker>
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
                        <span class="left padding">姓名：</span>
                        <span class="right">1995-02-35</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left padding">电话：</span>
                        <span class="right">暂无</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left padding">微信：</span>
                        <span class="right">教室</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left margin">性别：</span>
                        <span class="right">暂无</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left">会籍顾问id：</span>
                        <span class="right">1995-02-35</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left">会籍顾问名字：</span>
                        <span class="right">1995-02-35</span>
                    </el-col>
                    <el-col :span="24" class="infor-info">
                        <span class="left">登记时间：</span>
                        <span class="right">1995-02-35</span>
                    </el-col>
                </div>
            </el-col>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name:'information',
  inject: ["reload"],
  data() {
    return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
        birthday:'',
        club:"",
        ruleForm: {
          name: '',//姓名
          tel:'',//电话
          wechat:'',//微信
          sex:'',//性别
          hjgwID:'',//会籍顾问id
          hjgwname:'',//证件号码
          registertime:'',//登记时间
        },
    };
  },
  created(){
    this.getexperhome();
  },
  methods: {
    //获取体验券详情
    getexperhome(){
      let _this = this;
      console.log(this.$route);
      requestLogin("/setExperienceCustomer/"+this.$route.params.id, {}, "get")
        .then(function(res) {
          _this.club = res;
          console.log(res);
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
    back() {
      let url = this.$route.path;
      if (url === "/Customer/experiencehome/experhome") {
        this.$router.push("/Customer/experiencehome/experhome");
      } else {
        this.$router.go(-1); //返回上一层
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            var loginParams = {
              id: this.ruleForm.name, //客户id
              exName: this.ruleForm.sex, //姓名
              exTel: this.ruleForm.phone, //电话
              exWeChat: this.ruleForm.desc, //微信
              exSex : this.ruleForm.idnumber, //性别
            };
            requestLogin("/setExperienceCustomer/"+this.$route.params.id, loginParams, "post")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "提交成功",
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
          this.$message({ message: "提交失败!", type: "error" });
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