<template>
  <div>
    <!--转卡操作-->
    <el-row>
      <el-col :span="24" class="elcol"></el-col>
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
                <!--转卡给新客户-->
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" @submit.native.prevent>
                  <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
                    <el-col :span="22">
                      <el-input v-model="ruleForm.name" placeholder="汉字、字母、数字和下划线及逗号句号组成、长度2-6"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="手机号:" prop="phone" :label-width="formLabelWidth">
                    <el-col :span="22">
                      <el-input v-model="ruleForm.phone" maxlength="11" placeholder="请输入11位手机号码"></el-input>
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
                      <el-date-picker v-model="ruleForm.birthday" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="请选择" style="width:100%;"></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="证件号码:" prop="catenumber" :label-width="formLabelWidth">
                    <el-col :span="22">
                      <el-input v-model="ruleForm.catenumber" maxlength="18" placeholder="请输入18位身份证号码/护照均可"></el-input>
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
                      <el-input v-model="ruleForm.contacttel" maxlength="11" placeholder="请输入11位手机号码"></el-input>
                    </el-col>
                  </el-form-item>
                   <el-form-item label="会员头像:" prop="memberimg" :label-width="formLabelWidth" v-show="this.memberIsNull == 1">
                    <el-col :span="22">
                        <Fileupload3 ref="fileUpload" :imageUrl="imageUrl" @sendBlobFile="setBlobImg"></Fileupload3>
                        <el-button size="small" type="primary" @click="changeUserIcon">上传头像</el-button>
                        <span class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                        <ul v-if="blobImg.src" class="el-upload-list el-upload-list--picture">
                          <li tabindex="0" class="el-upload-list__item is-ready">
                            <img :src="blobImg.src" alt="" class="el-upload-list__item-thumbnail">
                            <a class="el-upload-list__item-name">
                              <i class="el-icon-document"></i>{{blobImg.name}}
                            </a>
                            <label class="el-upload-list__item-status-label">
                              <i class="el-icon-upload-success el-icon-check"></i>
                            </label>
                            <i class="el-icon-close" @click="clearBlobImg"></i>
                            <i class="el-icon-close-tip">按 delete 键可删除</i>
                          </li>
                        </ul>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="入会协议:" prop="memberment" :label-width="formLabelWidth">
                    <el-col :span="22">
                      <el-upload class="upload-demo" ref="upload" action=" " :file-list="fileList" :limit='1' :on-exceed='uploadOverrun' :http-request='submitUpload2' list-type="picture" :auto-upload="true">
                        <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                      </el-upload>
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
                  <el-button @click="deleteRow(scope.$index)" type="primary" size="small">
                    转卡
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog title="添加新卡号" :append-to-body="true" :visible.sync="dialogFormVisible2">
              <!--添加新卡号-->
              <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px">
                <el-form-item label="卡号：" prop="card">
                  <el-col :span="22">
                    <el-input v-model="ruleForm2.card" placeholder="请输入" style="width:100%"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="IC卡序列号：" prop="seriesnumber">
                  <el-col :span="22">
                    <el-input v-model="ruleForm2.seriesnumber" placeholder="请输入" maxlength="30" style="width:100%"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item class="dialog-footer">
                  <el-col :span="24" style="display: flex;justify-content: flex-end;">
                    <el-button @click="resetForm2('ruleForm2')">重置</el-button>
                    <el-button type="primary" @click="submitForm2('ruleForm2')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                  </el-col>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
          <div style="text-align: left; padding-left: 24px; font-size: 14px; color: #666;margin-top:20px;">备注：1,转给老客户请直接搜索老客户姓名&nbsp;&nbsp;2,转给新客户请先添加新客户的基本资料再搜索新客户完成转卡</div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
import Fileupload3 from "@/components/fileupload3";
export default {
  name: "transfercard",
  inject: ["reload"],
  props: ["pathquery"],
  components: {
    Fileupload3
  },
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
        contacttel: "", //紧急联系人电话
        memberimg:"",//会员头像
        memberment:"",//入会协议
      },
      rules: {
        name: validate.name,
        sex: validate.sex,
        phone: validate.phone,
        adviser: validate.adviser
      },
      ruleForm2: {
        card: "",
        seriesnumber: ""
      },
      rules2: {
        card: [{ required: true, message: "请输入卡号", trigger: "blur" }]
      },
      formLabelWidth: "130px",
      tableData4: [],
      staff_info: [],
      membership_card: [],
      membershipcard: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      hyinfo: {},
      blobImg:{},
      imageUrl: "",
      file: "",
      file2:"",
      memberIsNull:"",
      fileList: [],
    };
  },
  created() {
    this.getCustomer();
    this.getexperhome();
  },
  methods: {
     changeUserIcon() {
      this.$refs.fileUpload.openFile();
    },
   uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传1张图片!"
      });
    },
    clearBlobImg(){
      this.blobImg = {};
    },
    setBlobImg(val){
      let {fileImg, formData, fileName, data2file} = val
      this.blobImg = {
        src:URL.createObjectURL(fileImg),
        name: fileName
      }
      this.file = data2file
    },
    changeUserIcon() {
      this.$refs.fileUpload.openFile();
    },
     //入会协议
    submitUpload2: function(content) {
      this.file2 = content.file;
    },
    //获取个人中心详情
    getexperhome() {
      let _this = this;
      requestLogin("/setMemberCustomers/" + _this.$route.query.HYID, {}, "get")
        .then(function(res) {
          _this.membershipcard = res.membership_card;
          _this.memberIsNull = res.memberIsNull;
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
    },
    //获取会籍顾问
    getCustomer() {
      let _this = this;
      requestLogin("/setDepositCustomer/create", {}, "get")
        .then(function(res) {
          let { staff_info } = res;
          _this.staff_info = staff_info;
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
    },
    //添加新会员
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let formData = new FormData();
            formData.append("id", _this.ruleForm.adviser); //会籍顾问id
            formData.append("HYName", _this.ruleForm.name); //姓名
            formData.append("Sex", _this.ruleForm.sex); //性别
            formData.append("Birthday", _this.ruleForm.birthday); //生日
            formData.append("MotoTel", _this.ruleForm.phone); //电话
            formData.append("ZhiYe", _this.ruleForm.vocation); //职业
            formData.append("ZhengJianNO", _this.ruleForm.catenumber); //证件号
            formData.append("HomeAdd", _this.ruleForm.address); //地址
            formData.append("hyContacts", _this.ruleForm.contact); //紧急联系人
            formData.append("hyConTel", _this.ruleForm.contacttel); //紧急联系人电话
            formData.append("hyWeChat", _this.ruleForm.wechat); //微信
            formData.append("memberPic", _this.file); //会员头像
            formData.append("memberVoucher", _this.file2); //入会协议
            formData.append("identity", "newCustomer"); //新会员
            requestLogin(
              "/setMemberCustomers/onlyMemberInfo",
              formData,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                _this.reload();
                _this.resetForm(formName);
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
    //添加新卡号
    submitForm2(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              id: _this.pathquery.CARD.id, //会员卡id
              oldId: _this.$route.query.HYID, //原会员id
              oldName: _this.$route.query.HYName, //原会员姓名
              newId: _this.hyinfo.HYID, //新会员id
              newName: _this.hyinfo.HYName, //新会员姓名
              cardNo: _this.ruleForm2.card == "" ? "" : _this.ruleForm2.card, //卡号
              serialNumber:
                _this.ruleForm2.seriesnumber == ""
                  ? "12345678"
                  : _this.ruleForm2.seriesnumber //IC卡序列号
            };
            requestLogin(
              "/setDesignateMember/transferCard",
              loginParams,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "转卡成功",
                  type: "success"
                });
                _this.$router.push(
                  "/Customer/leaguermanage/leaguermanagetable"
                );
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
    textinput(val) {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    resetForm2(formName) {
      this.$refs[formName].resetFields();
    },
    Selectchange2(val) {},
    ChangeSex(val) {},
    transformCard() {
      let _this = this;
      let loginParams = {
        id: _this.pathquery.CARD.id, //会员卡id
        oldId: _this.$route.query.HYID, //原会员id
        oldName: _this.$route.query.HYName, //原会员姓名
        newId: _this.hyinfo.HYID, //新会员id
        newName: _this.hyinfo.HYName //新会员姓名
      };
      requestLogin("/setDesignateMember/transferCard", loginParams, "post")
        .then(data => {
          this.$message({
            message: "转卡成功",
            type: "success"
          });
          _this.$router.push(
            "/Customer/leaguermanage/leaguermanagetable"
          );
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
    },
    //转卡
    deleteRow(index) {
      let _this = this;
      let oldMemberCard = _this.membershipcard;
      let newMemberCard = _this.membership_card;
      if (newMemberCard.length === 0) {
        if (oldMemberCard.length >= 1) {
          _this.dialogFormVisible2 = true;
        }
      } else {
        if (oldMemberCard.length === 1) {
          _this.dialogFormVisible2 = true;
        } else {
          _this.dialogFormVisible2 = false;
          this.$confirm("确认提交吗？", "提示").then(() => {
            _this.transformCard();
          });
        }
      }
    },
    //查询
    onSubmit() {
      let _this = this;
      let loginParams = {
        name: _this.formInline.user, //姓名
        sign: "member" //类别
      };
      requestLogin("/getSearchName", loginParams, "post")
        .then(function(res) {
          if (res == null) {
            alert("没有查到该客户,请检查输入是否有误！");
            _this.tableData4 = [];
          } else {
            _this.tableData4 = [];
            res.CardNO = _this.pathquery.CARD.CardNO;
            res.CTName = _this.pathquery.CARD.card_type.CTName;
            _this.hyinfo = res;
            _this.tableData4.push(res);
            let { membership_card } = res;
            _this.membership_card = membership_card;
          }
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
<style lang="scss" scoped>
.elcol {
  height: 25px;
  background: #e9eef3;
}
.tag {
  width: 100%;
  height: 400px;
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
