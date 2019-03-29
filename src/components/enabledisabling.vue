<template>
  <div>
    <!--启用禁用操作-->
    <el-row>
      <el-col :span="24" class="elcol"></el-col>
      <div class="tag">
        <em class="top"></em>
        <el-col :span="24" class="transfer">
          <div class="transfer-main">
            <span class="transfer-span">启用/禁用操作</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="transfer-from">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
              <el-col :span="16">
                <el-form-item label="启用或禁用该卡:" prop="enablecard">
                  <el-col :span="24">
                    <el-select v-model="ruleForm.enablecard" style="width:100%" @change="asfa">
                      <el-option label="启用" value="1"></el-option>
                      <el-option label="禁用" value="2"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="16" class="from-date">
                <el-col :span="24">
                  <el-form-item label="变更原因:" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc" maxlength="50" @input="descInput" style="width:100%"></el-input>
                    <span class="textarea">还可以输入{{remnant}}字</span>
                  </el-form-item>
                </el-col>
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
  name: "enabledisabling",
  inject: ["reload"],
  props:['pathquery'],
  data() {
    return {
      remnant: 50,
      ruleForm: {
        enablecard:"",
        desc: ""
      },
      rules: {
        desc: [
          { required: true, message: "请填写变更原因", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    if (this.pathquery.CARD.isEnabled == 1) {
      this.ruleForm.enablecard = "禁用";
    } else {
      this.ruleForm.enablecard = "启用";
    }
  },
  methods: {
    asfa(val){
    },
    //启用禁用
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let enablecards = '1';
            if(_this.ruleForm.enablecard == '启用' || _this.ruleForm.enablecard == '1'){
              enablecards = '1';
            }
            if(_this.ruleForm.enablecard == '禁用' || _this.ruleForm.enablecard == '2'){
              enablecards = '2';
            }
            var loginParams = {
              id: _this.pathquery.CARD.id, //会员卡id
              num: enablecards, //启用禁用
              content: _this.ruleForm.desc //原因
            };
            requestLogin(
              "/setDesignateMember/enabledOrDisable",
              loginParams,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "操作成功",
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.remnant = 50;
    },
    descInput() {
      var txtVal = this.ruleForm.desc.length;
      this.remnant = 50 - txtVal;
    }
  }
};
</script>
<style lang="scss" scoped>
.elcol{
  height: 25px;
  background: #E9EEF3;
}
.tag {
  width: 100%;
  height: 400px;
  display: inline-block;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.08);
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
      position: relative;
      .textarea {
        color: #00bc71;
        position: absolute;
        top: 60%;
        right: 5%;
      }
    }
  }
  .transfer-table {
    width: 98%;
    margin: 0 auto;
  }
}
</style>
