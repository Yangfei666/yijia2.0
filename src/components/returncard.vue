<template>
    <div>
      <!--退卡操作-->
        <el-row>
            <div class="tag">
                <em class="top"></em>
                <el-col :span="24" class="transfer">
                    <div class="transfer-main">
                        <span class="transfer-span">退卡操作</span>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="transfer-from">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-col :span="16">
                           <el-form-item label="退卡金额:" prop="price">
                               <el-col :span="24">
                                <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
                                </el-col>
                            </el-form-item>
                            </el-col>
                            <el-col :span="16" class="from-date">
                            <el-form-item label="退卡原因:" prop="desc">
                                <el-col :span="24">
                                <el-input type="textarea" v-model="ruleForm.desc" maxlength="666" @input="descInput"></el-input>
                                </el-col>
                                <span class="textarea">还可以输入{{remnant}}字</span>
                            </el-form-item>
                            </el-col>
                            <el-col :span="16" class="submit">
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
  name:'returncard',
  inject: ["reload"],
  data() {
    return {
        remnant: 666,
      ruleForm: {
        price: '',
        desc: ''
      },
       rules: {
            price: [
            { required: true, message: '请输入退卡金额', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
           desc: [
            { required: true, message: '请填写退卡原因', trigger: 'blur' },
            { min: 1, max: 666, message: '长度在 1 到 666个字符', trigger: 'blur' }
          ]
       }
    };
  },
  methods: {
    //退卡
    submitForm(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        var loginParams = {
          id:this.$route.params.CARD.id, //会员卡id
          num: this.ruleForm.price, //退款金额
          content: this.ruleForm.desc //原因
        };
        console.log(this.$route.params.HYID);
        requestLogin(
          "/setDesignateMember/backCard",
          loginParams,
          "post"
        )
          .then(data => {
            this.$message({
              message: "退卡成功",
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