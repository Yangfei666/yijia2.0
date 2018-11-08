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
                            <el-dialog title="添加会员" :append-to-body="true" :visible.sync="dialogFormVisible">
                                <!--添加会员-->
                                <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
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
                                    </el-form-item> -->
                                    <!-- <el-form-item label="会籍顾问:" prop="adviser" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-select v-model="ruleForm.adviser" placeholder="请选择" style="width:100%" @change="Selectchange2">
                                                <el-option v-for="item in staff" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                                            </el-select>
                                        </el-col>
                                    </el-form-item> -->
                                    <!-- <el-form-item label="紧急联系人:" prop="contact" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-input v-model="ruleForm.contact" placeholder="长度2-6"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="紧急联系人电话:" prop="contacttel" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-input v-model="ruleForm.contacttel" placeholder="请输入11位手机号码"></el-input>
                                        </el-col>
                                    </el-form-item> -->
                                    <!-- <el-form-item label="卡名称:" prop="cardname" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-select v-model="ruleForm.cardname" placeholder="请选择" style="width:100%" @change="Selectchange3">
                                                <el-option v-for="item in cards" :key="item.CTID" :label="item.CTName" :value="item.CTID"></el-option>
                                            </el-select>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="卡号:" prop="card" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-input v-model="ruleForm.card" placeholder="长度6-12位"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="卡号确认:" prop="cardaffirm" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-input v-model="ruleForm.cardaffirm" placeholder="长度6-12位"></el-input>
                                        </el-col>
                                    </el-form-item> -->
                                    <!-- <el-form-item label="金额:" prop="price" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-input v-model="ruleForm.price" placeholder="0-100000元之间"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="付款方式:" prop="mode" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-radio-group v-model="ruleForm.mode">
                                                <el-radio :label="1">微信</el-radio>
                                                <el-radio :label="2">支付宝</el-radio>
                                                <el-radio :label="3">现金</el-radio>
                                                <el-radio :label="4">银行卡</el-radio>
                                                <el-radio :label="5">信用卡</el-radio>
                                                <el-radio :label="6">手机银行转账</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="激活时间:" prop="sensitize" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                            <el-radio-group v-model="ruleForm.sensitize" @change="cahngesen">
                                                <el-radio :label="1">立即激活</el-radio>
                                                <el-radio :label="2">系统设置时间激活</el-radio>
                                                <el-radio :label="3">客户首次刷卡激活</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item class="dialog-footer">
                                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                                            <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                                        </el-col>
                                    </el-form-item>
                                </el-form> -->
                            </el-dialog>
                        </template>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="transfer-from">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="被转卡人姓名:">
                                <el-input v-model="formInline.user" placeholder="请输入"></el-input>
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
                            <el-table-column fixed prop="name" align="left" label="姓名" width="90"></el-table-column>
                            <el-table-column prop="tel" align="left" label="手机号" width="140"></el-table-column>
                            <el-table-column prop="cardmunber" align="left" label="卡号" width="140"></el-table-column>
                            <el-table-column prop="cardseed" align="left" label="卡种" width="140"></el-table-column>
                            <el-table-column prop="membership" align="left" label="会籍" width="140"></el-table-column>
                            <el-table-column prop="opentime" align="left" label="开卡时间" width="140"></el-table-column>
                            <el-table-column prop="endtime" align="left" label="到期时间" width="140"></el-table-column>
                            <el-table-column prop="residuenum" align="left" label="剩余次数" width="140"></el-table-column>
                            <el-table-column prop="residueprice" align="left" label="剩余金额" width="140"></el-table-column>
                            <el-table-column prop="status" align="left" label="卡状态" width="140"></el-table-column>
                            <el-table-column fixed="right" align="left" label="操作">
                                <template slot-scope="scope">
                                    <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
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
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
    //   ruleForm: {
    //     name: "", //姓名
    //     phone: "", //手机号
    //     wechat: "", //微信
    //     sex: "", //性别
    //     birthday: "", //生日
    //     catenumber: "", //证件号码
    //     address: "", //地址
    //     vocation: "", //职业
    //     adviser: "", //会籍顾问
    //     contact: "", //紧急联系人
    //     contacttel: "", //紧急联系人电话
    //     cardname: "", //卡名称
    //     card: "", //卡号
    //     cardaffirm: "", //卡号确认
    //     price: "", //金额
    //     mode: "", //付款方式
    //     sensitize: "" //激活时间
    //   },
    //   rules: {
    //     name: validate.name,
    //     sex: validate.sex,
    //     phone: validate.phone,
    //     adviser: validate.adviser,
    //     mode: validate.mode,
    //     cardname: validate.cardname,
    //     card: [{ validator: validatecard, trigger: "blur" }],
    //     cardaffirm: [{ validator: validatecardaffirm, trigger: "blur" }],
    //     sensitize: validate.sensitize,
    //     price: validate.price
    //   },
      tableData4: [],
      dialogFormVisible: false //转卡给新客户接口setMemberCustomers/onlyMemberInfo
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    deleteRow(index, rows) {}
  }
};
</script>
<style lang="scss" scoped>
.tag {
  width: 97%;
  height: 500px;
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