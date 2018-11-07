<template>
  <div>
    <!--体验客户主页-->
    <div class="memberhome">
      <div class="member-but">
        <el-button type="text" class="butt el-icon-plus" @click="dialogFormVisible = true">购买体验券</el-button>
        <template>
          <el-dialog title="购买体验劵" :append-to-body="true" :visible.sync="dialogFormVisible">
            <!--购买体验券-->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="劵类型:" prop="type" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-select v-model="ruleForm.type" placeholder="请选择" style="width:100%" @change="Selectchange">
                    <el-option v-for="item in tkName" :key="item.id" :label="item.tkName" :value="item.id"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="金额:" prop="price" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-input v-model="ruleForm.price" placeholder="0-1000之间"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="付款方式:" prop="mode" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-radio-group v-model="ruleForm.mode">
                    <el-radio :label="1">店内到付</el-radio>
                    <el-radio :label="2">美团</el-radio>
                    <el-radio :label="3">大众</el-radio>
                    <el-radio :label="4">会籍代收</el-radio>
                    <el-radio :label="5">未支付</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>
              <el-form-item label="原因:" prop="desc" :label-width="formLabelWidth">
                <el-col :span="22" class="from-date">
                  <el-input type="textarea" v-model="ruleForm.desc" maxlength="666" @input="descInput" style="min-height:96px;width:690px;height:69px"></el-input>
                  <span class="textarea">还可以输入{{remnant}}字</span>
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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="title in header" :label="title.title" :name="title.key" :key="title.key" style="font-size:16px" :lazy="true">
          <Securityone></Securityone>
        </el-tab-pane>
        <!-- <el-tab-pane label="劵2" name="cardtwo" style="font-size:16px" :lazy="true">
          <Securitytwo></Securitytwo>
        </el-tab-pane>
        <el-tab-pane label="劵3" name="cardthree" style="font-size:16px" :lazy="true">
          <Securitythree></Securitythree>
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
import Securityone from "../components/securityone";
import Securitytwo from "../components/securitytwo";
import Securitythree from "../components/securitythree";
export default {
  name: "experhome",
  inject: ["reload"],
  components: {
    Securityone,
    Securitytwo,
    Securitythree
  },
  data() {
    return {
      activeName: "cardone",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      remnant: 666,
      formLabelWidth: "130px",
      payment: 1,
      disabled: false,
      limitdate: [],
      club:[],
      header: [
        { title: "劵1", key: "agekey" ,name:"cardone"},
        { title: "劵2", key: "namekey" ,name:"cardtwo"},
        { title: "劵3", key: "sixkey" ,name:"cardthree"}
      ],
      ruleForm: {
        type: [], //券类型
        price: "", //金额
        mode: "", //付款方式
        desc: "" //原因
      },
      tkName: [],
      rules: {
        type: validate.type,
        price: validate.price,
        mode: validate.mode
      }
    };
  },
  created: function() {
    this.getVouchers();
    this.getexperhome();
  },
  methods: {
    //购买体验券
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              vid: _this.ruleForm.type, //体验券id
              mode: _this.ruleForm.mode, //付款方式
              price: _this.ruleForm.price //价格
            };
            console.log(this.$route.params.id);
            requestLogin(
              "/setExperienceCustomer/purchaseVoucher/" + this.$route.params.id,
              loginParams,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "购买成功",
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
        } else {
          this.$message({ message: "提交失败!", type: "error" });
          return false;
        }
      });
    },
    //获取体验券详情
    getexperhome() {
      let _this = this;
      requestLogin("/setExperienceCustomer/" + this.$route.params.id, {}, "get")
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
    //获取体验券
    getVouchers() {
      let _this = this;
      requestLogin("/setExperienceCustomer/selectVouchers", {}, "get")
        .then(function(res) {
          _this.tkName = res;
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
    Selectchange(val) {
      console.log(val);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    descInput() {
      var txtVal = this.ruleForm.desc.length;
      this.remnant = 666 - txtVal;
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
.memberhome {
  width: 97%;
  height: 410px;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  .member-but {
    width: 100px;
    height: 32px;
    position: absolute;
    right: 30px;
    top: 6px;
    border-radius: 4px;
    background: #00bc71;
    color: #fff;
    z-index: 2;
    .butt {
      width: 100%;
      height: 100%;
      line-height: 7px;
      text-align: center;
      color: #fff;
      span {
        margin-left: 3px;
      }
    }
  }
}
</style>