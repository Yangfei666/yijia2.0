<template>
    <div>
        <!--团课教练进场-->
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
            <el-form-item label="课程名称:" prop="name" :label-width="formLabelWidth">
                <el-col :span="22">
                    <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="上课日期:" prop="attenddate" :label-width="formLabelWidth">
                <el-col :span="22">
                    <el-date-picker v-model="ruleForm.attenddate" value-format="yyyy-MM-dd" type="date" placeholder="请选择" style="width:100%"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="开始时间:" prop="attendtime" :label-width="formLabelWidth">
                <el-col :span="22">
                 <el-time-select placeholder="起始时间" value-format="HH:mm:ss" v-model="ruleForm.attendtime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" style="width:100%"></el-time-select>
                </el-col>
            </el-form-item>
            <el-form-item label="上课教练:" prop="trainer" :label-width="formLabelWidth">
                <el-col :span="22">
                    <el-select v-model="ruleForm.trainer" placeholder="请选择" style="width:100%">
                        <el-option label="菲菲" value="feifei"></el-option>
                        <el-option label="琦琦" value="qiqi"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="进场手牌:" prop="approach" :label-width="formLabelWidth">
                <el-col :span="22">
                    <el-input v-model="ruleForm.approach" placeholder="请输入"></el-input>
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
export default {
  data() {
    return {
      formLabelWidth: "130px",
      ruleForm: {
        name: "", //课程名称
        approach: "", //进场手牌
        trainer: "", //上课教练
        attenddate: "", //上课日期
        attendtime: ""//开始时间
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        approach: [
          { required: true, message: "请输入进场手牌", trigger: "blur" }
        ],
        trainer: [{ required: true, message: "请选择教练", trigger: "change" }],
        attenddate: [
          {
            type: "date",
            required: true,
            message: "请选择上课日期",
            trigger: "change"
          }
        ],
        attendtime: [
          { required: true, message: "请选择开始时间", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>