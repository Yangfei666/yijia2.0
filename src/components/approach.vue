<template>
    <div>
        <!--进场-->
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
            <el-form-item label="课程信息:" prop="name" :label-width="formLabelWidth">
                <el-button-group>
                  <el-button type="danger" round >{{course.kcStime}}</el-button>
                  <el-button type="danger" round >{{course.Stime}}~{{course.Etime}}</el-button>
                  <el-button type="danger" round >{{course.curriculum_subject.kcName}}</el-button>
                </el-button-group>
            </el-form-item>
            <el-form-item label="上课教练:" prop="trainer" :label-width="formLabelWidth" v-if="userId == 0">
                <el-col :span="22">
                    <el-select v-model="ruleForm.trainer" placeholder="请选择" style="width:100%">
                        <el-option v-for="item in coach" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="进场手牌:" prop="approach" :label-width="formLabelWidth">
                <el-col :span="22">
                    <el-input v-model="ruleForm.approach" placeholder="请输入手牌号,不用则忽略"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-col :span="24" style="display: flex;justify-content: flex-end;">
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { requestLogin as request } from "../api/api";
export default {
  props: {
    course:[Object, Array],
    userId:Number,
  },
  data() {
    return {
      formLabelWidth: "130px",
      ruleForm: {
        approach: "", //进场手牌
        trainer: "", //上课教练
      },
      rules: {
        approach: [{ required: true, message: "请输入进场手牌", trigger: "blur" }],
        trainer: [{ required: true, message: "请选择教练", trigger: "change" }],
      },
      coach : []
    };
  },
  // 获取教练列表
  created() {
    request("/getCurTableBaseInfo")
      .then(data => {
        this.coach = data.coach;
      });
  },
  methods: {
    // 进场
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.userId === 0 ? this.caochEnter() : this.customerEntry()
        } else {
          return false;
        }
      });
    },
    // 客户进场
    customerEntry() {
      let params = {
        id : this.course.ID,
        userId : this.userId,
        number : this.ruleForm.approach == '' ? '0000' : this.ruleForm.approach,
        bool : this.course.kcIsPrivate == '团课课程' ? true : false
      };
      request("/adminHomePage", params)
        .then(data => {
          CustomerSuccess(params.number);
          this.msgThen(data);
        })
        .catch(error => {
          this.msgCatch(error, "对不起,客户进场失败");
        });
    },
    CustomerSuccess(hand){
      this.$emit('CustomerSuccess', hand);
    },
    //教练进场
    caochEnter() {
      let params = {
        userId : this.ruleForm.trainer,
        number : this.ruleForm.approach,
      };
      request("/adminHomePage/" + this.course.ID, params, "put")
        .then(data => {
          for (let i = 0; i < this.coach.length; i++) {
            const element = this.coach[i];
            if (element.YGXX_YGID_NEI == params.userId) {
              var name2 = element.YGXX_NAME;
            }
          }
          this.caochSuccess (name2, params.userId);
          this.msgThen(data);
        })
        .catch(error => {
          this.msgCatch(error, '对不起,教练进场失败');
        });
    },
    caochSuccess (name2,JLIDs) {
      this.$emit('caochSuccess', name2, JLIDs);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //成功提示
    msgThen(data) {
      if (data.errorCode == 0) {
        this.$message({
          message: "操作成功",
          type: "success"
        });
      } else {
        this.$message({
          message: data.msg,
          type: "error"
        });
      }
    },
    //失败提示
    msgCatch(error, msg) {
      if (error.response) {
        this.$message({
          message: msg ? mag : error.response.data.msg,
          type: "error"
        });
      }
    },
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
