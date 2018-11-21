<template>
    <div>
      <!--变更有效期-->
        <el-row>
            <div class="tag">
                <em class="top"></em>
                <el-col :span="24" class="transfer">
                    <div class="transfer-main">
                        <span class="transfer-span">变更有效期</span>
                        <span class="transfer-span2">原有效期：{{this.$route.params.CARD.eTime}}</span>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="transfer-from">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="115px" class="demo-ruleForm">
                            <el-col :span="16">
                           <el-form-item label="新的到期时间:" prop="date">
                               <el-col :span="24">
                                <el-date-picker v-model="ruleForm.date" type="date" placeholder="请选择" style="width:100%"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            </el-col>
                            <el-col :span="16" class="from-date">
                                <el-col :span="24">
                            <el-form-item label="变更原因:" prop="desc">
                                <el-input type="textarea" v-model="ruleForm.desc" maxlength="666" @input="descInput" style="width:100%"></el-input>
                                <span class="textarea">还可以输入{{remnant}}字</span>
                            </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="16" class="submit">
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
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
  name:'changevalidity',
  inject: ["reload"],
  data() {
    return {
        remnant: 666,
      ruleForm: {
        date: '',
        desc: ''
      },
       rules: {
            date: [
            { required: true, message: '请选择新的到期时间', trigger: 'change' },
          ],
           desc: [
            { required: true, message: '请填写变更原因', trigger: 'blur' },
            { min: 1, max: 666, message: '长度在 1 到 666个字符', trigger: 'blur' }
          ]
       }
    };
  },
  methods: {
    //变更有效期
    submitForm(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        var loginParams = {
          id: this.$route.params.CARD.id, //会员卡id
          day: this.ruleForm.date, //有效期时间
          reason: this.ruleForm.desc //原因
        };
        requestLogin(
          "/setDesignateMember/cardChangeValue",
          loginParams,
          "post"
        )
          .then(data => {
            this.$message({
              message: "变更成功",
              type: "success"
            });
            this.resetForm(formName);
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
      justify-content:flex-start;
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
        position: relative;
        .textarea{
            color: #00bc71;
            position: absolute;
            top: 60%;
            right: 5%;
        }
    }
  }
  .transfer-table{
      width: 98%;
      margin: 0 auto;
  }
}
</style>
