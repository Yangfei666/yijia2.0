<template>
    <div>
        <!--转卡操作-->
        <el-row>
            <div class="tag">
                <em class="top"></em>
                <el-col :span="24" class="transfer">
                    <div class="transfer-main">
                        <span class="transfer-span">转卡给老客户</span>
                        <div class="transfer-div">
                            <span @click="dialogFormVisible = true">转卡给新客户</span>
                        </div>
                        <template>
                            <el-dialog title="添加新会员" :append-to-body="true" :visible.sync="dialogFormVisible">
                                <!--添加新会员-->
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                                    <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-input v-model="ruleForm.name" placeholder="汉字、字母、数字和下划线及逗号句号组成、长度2-6"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="手机号:" prop="phone" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-input v-model="ruleForm.phone" placeholder="请输入11位手机号码"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="微信:" prop="wechat" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-input v-model="ruleForm.wechat" placeholder="6-20个字母、数字、下划线和减号，必须以字母开头"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-radio-group v-model="ruleForm.sex" @change="ChangeSex">
                                                <el-radio label="女" value="女"></el-radio>
                                                <el-radio label="男" value="男"></el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="生日:" prop="birthday" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-date-picker v-model="ruleForm.birthday" value-format="yyyy-MM-dd" type="date" placeholder="请选择" style="width:100%;"></el-date-picker>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="证件号码:" prop="catenumber" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-input v-model="ruleForm.catenumber" placeholder="请输入18位身份证号码/护照均可"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="住址:" prop="address" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-input v-model="ruleForm.address" placeholder="汉字、字母、数字和下划线及逗号句号组成 长度2-20"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="职业:" prop="vocation" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-input v-model="ruleForm.vocation" placeholder="长度2-10"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="会籍顾问:" prop="adviser" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-select v-model="ruleForm.adviser" placeholder="请选择" style="width:100%" @change="Selectchange2">
                                                <el-option v-for="item in staff_info" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                                            </el-select>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="紧急联系人:" prop="contact" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-input v-model="ruleForm.contact" placeholder="长度2-6"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="紧急联系人电话:" prop="contacttel" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-input v-model="ruleForm.contacttel" placeholder="请输入11位手机号码"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item class="dialog-footer">
                                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                                            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                                            <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                                        </el-col>
                                    </el-form-item>
                                </el-form>
                            </el-dialog>
                        </template>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="transfer-from">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="被转卡人姓名:">
                                <el-input v-model="formInline.user" placeholder="请输入" @change="textinput"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="transfer-table">
                        <el-table :data="tableData4" :header-cell-style="{background:'#fafafa'}" style="width: 100%">
                            <el-table-column prop="HYName" align="left" label="姓名" fixed></el-table-column>
                            <el-table-column prop="MotoTel" align="left" label="手机号"></el-table-column>
                            <el-table-column prop="czyName" align="left" label="会籍"></el-table-column>
                            <el-table-column fixed="right" align="left" label="操作">
                                <template slot-scope="scope">
                                    <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="small">
                                        转卡
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </div>
        </el-row>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
export default {
  name: "transfercard",
  inject: ["reload"],
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      ruleForm: {
        name: "", //姓名
        phone: "", //手机号
        wechat: "", //微信
        sex: "", //性别
        birthday: "", //生日
        catenumber: "", //证件号码
        address: "", //地址
        vocation: "", //职业
        adviser: "", //会籍顾问
        contact: "", //紧急联系人
        contacttel: "" //紧急联系人电话
      },
      rules: {
        name: validate.name,
        sex: validate.sex,
        phone: validate.phone,
        adviser: validate.adviser,
        catenumber: validate.idnumber
      },
      formLabelWidth: "130px",
      tableData4: [],
      staff_info: [],
      dialogFormVisible: false,
      hyinfo:{}
    };
  },
  created() {
    this.getCustomer();
    console.log(this.$route);
    console.log(this.$route.params.HYID);
    console.log("CARD:" + this.$route.params.CARD.CardNO);
  },
  methods: {
    //获取会籍顾问
    getCustomer() {
      let _this = this;
      requestLogin("/setDepositCustomer/create", {}, "get")
        .then(function(res) {
          let { staff_info } = res;
          _this.staff_info = staff_info;
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
    //添加新会员
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              id: _this.ruleForm.adviser, //会籍顾问id
              HYName: _this.ruleForm.name, //姓名
              Sex: _this.ruleForm.sex, //性别
              Birthday: _this.ruleForm.birthday, //生日
              MotoTel: _this.ruleForm.phone, //电话
              ZhiYe: _this.ruleForm.vocation, //职业
              ZhengJianNO: _this.ruleForm.catenumber, //证件号
              hyContacts: _this.ruleForm.contact, //紧急联系人
              hyConTel: _this.ruleForm.contacttel, //紧急联系人电话
              hyWeChat: _this.ruleForm.wechat, //微信
              identity:'newCustomer'//新会员
            };
            requestLogin(
              "/setMemberCustomers/onlyMemberInfo",
              loginParams,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
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
    textinput(val) {
      console.log(val);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    Selectchange2(val) {
      console.log(val);
    },
    ChangeSex(val) {
      console.log(val);
    },
    //转卡
    deleteRow(index, rows) {
      let _this = this;
      this.$confirm("确认提交吗？", "提示").then(() => {
      var loginParams = {
        id: _this.$route.params.CARD.id, //会员卡id
        oldId:_this.$route.params.HYID, //原会员id
        oldName: _this.$route.params.HYName, //原会员姓名
        newId: _this.hyinfo.HYID, //新会员id
        newName:_this.hyinfo.HYName //新会员姓名
      };
      requestLogin("/setDesignateMember/transferCard", loginParams, "post")
        .then(function(res) {
          this.$message({
            message: "转卡成功",
            type: "success"
          });
          this.reload();
        })
        .catch(error => {
          if (error.res) {
            this.$message({
              message: "提交数据失败",
              type: "error"
            });
          }
        });
      });
    },
    //查询
    onSubmit() {
      let _this = this;
      var loginParams = {
        name: _this.formInline.user, //姓名
        sign: "member" //类别
      };
      requestLogin("/getSearchName", loginParams, "post")
        .then(function(res) {
          res.CardNO = _this.$route.params.CARD.CardNO;
          res.CTName = _this.$route.params.CARD.card_type.CTName;
          _this.hyinfo = res;
          _this.tableData4.push(res);
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
    }
  }
};
</script>
<style lang="scss" scoped>
.tag {
  width: 97%;
  height: 500px;
  display: inline-block;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  margin: 0px auto;
  em {
    width: 0;
    height: 0;
    font-size: 0;
    overflow: hidden;
    position: absolute;
    &.top {
      border-width: 10px;
      border-style: solid dashed dashed;
      border-color: transparent transparent #fff transparent;
      left: 40px;
      top: -20px;
    }
  }
  .transfer {
    border-bottom: 1px solid #e8e8e8;
    .transfer-main {
      height: 45px;
      width: 98%;
      margin: auto;
      line-height: 45px;
      display: flex;
      justify-content: space-between;
      .transfer-span {
        font-size: 16px;
        color: #262626;
        text-indent: 5px;
      }
      .transfer-div {
        width: 105px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #00bc71;
        line-height: 32px;
        margin-top: 6px;
        margin-right: 10px;
        span {
          color: #00bc71;
          font-size: 16px;
        }
      }
    }
  }
  .transfer-from {
    width: 98%;
    height: 45px;
    line-height: 45px;
    margin: 20px auto;
    display: flex;
    .el-button--primary {
      height: 35px;
      line-height: 10px;
    }
  }
  .transfer-table {
    width: 98%;
    margin: 0 auto;
  }
}
</style>
