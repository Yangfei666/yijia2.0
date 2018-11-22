<template>
  <div>
    <!--会员卡升级操作-->
    <el-row>
      <div class="tag">
        <em class="top"></em>
        <el-col :span="24" class="transfer">
          <div class="transfer-main">
            <span class="transfer-span">会员卡升级</span>
            <span class="transfer-span2">当前卡种：{{this.$route.query.CARD.card_type.CTName}}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="transfer-from">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-col :span="16">
                <el-form-item label="旧卡折算:" prop="price">
                  <el-col :span="24">
                    <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="新的卡种:" prop="cardseed">
                  <el-col :span="24">
                    <el-select v-model="ruleForm.cardseed" placeholder="请选择" style="width:100%" @change="Selectchange">
                      <el-option v-for="item in selfCard" :key="item.CTID" :label="item.CTName" :value="item.CTID"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="付款方式:" prop="mode">
                  <el-col :span="24">
                    <el-radio-group v-model="ruleForm.mode" style="width:100%;text-align:left;" @change="radiochange">
                      <el-radio :label="1" value="微信">微信</el-radio>
                      <el-radio :label="2" value="支付宝">支付宝</el-radio>
                      <el-radio :label="3" value="现金">现金</el-radio>
                      <el-radio :label="4" value="银行卡">银行卡</el-radio>
                      <el-radio :label="5" value="信用卡">信用卡</el-radio>
                      <el-radio :label="6" value="手机银行转账">手机银行转账</el-radio>
                    </el-radio-group>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="补交差价:" prop="price2">
                  <el-col :span="24">
                    <el-input v-model="ruleForm.price2" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="16" class="submit">
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">升级</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "upgradecard",
  inject: ["reload"],
  data() {
    return {
      remnant: 666,
      radio2: "",
      selfCard: [],
      ruleForm: {
        price: "",
        price2: "",
        mode: "",
        cardseed: ""
      }
    };
  },
  created() {
    setTimeout(() => {
      this.getCard();
    }, 1000);
  },
  methods: {
    //获取卡名称
    getCard() {
      let _this = this;
      let relationCards = [];
      requestLogin("/setMemberCustomers/selectCards", {}, "get")
        .then(function(res) {
          let { selfCard, relationCard } = res;
          _this.selfCard = selfCard;
          relationCards = relationCard;
          for (var i = 0; i < relationCard.length; i++) {
            _this.selfCard.push(relationCard[i]);
          }
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
    //升级
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              oldCardId: _this.$route.query.CARD.id, //会员卡id
              newCardId: _this.ruleForm.cardseed, //新卡种id
              mode: _this.ruleForm.mode, //付款方式
              discount: _this.ruleForm.price, //旧卡折扣价
              money: _this.ruleForm.price2 //新卡补交差价
            };
            requestLogin("/setDesignateMember/upgradeCard", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "升级成功",
                  type: "success"
                });
                this.reload();
                this.resetForm(formName);
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    radiochange(val) {},
    Selectchange(val) {},
    descInput() {
      var txtVal = this.ruleForm.desc.length;
      this.remnant = 666 - txtVal;
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
      justify-content: flex-start;
      .transfer-span {
        font-size: 16px;
        color: #262626;
        text-indent: 5px;
      }
      .transfer-span2 {
        font-size: 16px;
        color: #00bc71;
        padding-left: 20px;
      }
      .transfer-div {
        width: 105px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #00bc71;
        line-height: 32px;
        margin-top: 6px;
        span {
          color: #00bc71;
          font-size: 16px;
        }
      }
    }
  }
  .transfer-from {
    width: 85%;
    margin: 20px auto;
    .el-button--primary {
      height: 35px;
      line-height: 10px;
    }
    .submit {
      display: flex;
    }
    .from-date {
      display: flex;
      position: relative;
      margin-top: 15px;
      .textarea {
        color: #00bc71;
        position: absolute;
        top: 55px;
        right: 20px;
      }
    }
  }
  .transfer-table {
    width: 98%;
    margin: 0 auto;
  }
}
</style>
