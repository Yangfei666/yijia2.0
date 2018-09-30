<template>
    <div>
      <!--会员卡升级操作-->
        <el-row>
            <div class="tag">
                <em class="top"></em>
                <el-col :span="24" class="transfer">
                    <div class="transfer-main">
                        <span class="transfer-span">会员卡升级</span>
                        <span class="transfer-span2">当前卡种：月卡(期限卡)</span>
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
                               <el-select v-model="ruleForm.cardseed" placeholder="请选择" style="width:100%">
                                    <el-option label="次卡" value="shanghai"></el-option>
                                    <el-option label="主卡" value="beijing"></el-option>
                                </el-select>
                                </el-col>
                            </el-form-item>
                            </el-col>
                             <el-col :span="16">
                           <el-form-item label="付款方式:" prop="mode">
                               <el-col :span="24">
                                 <el-radio-group v-model="ruleForm.mode" style="width:100%;text-align:left;">
                                    <el-radio :label="1">微信</el-radio>
                                    <el-radio :label="2">支付宝</el-radio>
                                    <el-radio :label="3">信用卡</el-radio>
                                    <el-radio :label="4">现金</el-radio>
                                    <el-radio :label="5">银行卡</el-radio>
                                    <el-radio :label="6">手机银行转账</el-radio>
                                </el-radio-group>
                                </el-col>
                            </el-form-item>
                            </el-col>
                            <el-col :span="16">
                           <el-form-item label="补交差价:" prop="price">
                               <el-col :span="24">
                                <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
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
export default {
  name:'upgradecard',
  data() {
    return {
        remnant: 666,
        radio2:'',
      ruleForm: {
        price: '',
        desc: ''
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       descInput(){
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
    .submit{
        display: flex;
    }
    .from-date{
        display: flex;
        position: relative;
        margin-top: 15px;
        .textarea{
            color: #00bc71;
            position: absolute;
            top: 55px;
            right: 20px;
        }
    }
  }
  .transfer-table{
      width: 98%;
      margin: 0 auto;
  }
}
</style>