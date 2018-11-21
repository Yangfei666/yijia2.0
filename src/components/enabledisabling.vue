<template>
  <div>
    <!--启用禁用操作-->
    <el-row>
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
                    <el-select v-model="ruleForm.enablecard" placeholder="请选择" style="width:100%">
                      <el-option label="禁用" value="2"></el-option>
                      <el-option label="启用" value="1"></el-option>
                    </el-select>
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
  data() {
    return {
      remnant: 666,
      ruleForm: {
        enablecard: "",
        desc: ""
      },
      rules: {
        enablecard: [
          { required: true, message: "请选择启用或禁用", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请填写变更原因", trigger: "blur" },
          {
            min: 1,
            max: 666,
            message: "长度在 1 到 666个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //启用禁用
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              id: _this.$route.query.CARD.id, //会员卡id
              num: _this.ruleForm.enablecard, //启用禁用
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