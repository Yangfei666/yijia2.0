<template>
    <div>
        <!--放弃定金-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="放弃原因:" prop="desc" :label-width="formLabelWidth">
               <el-col :span="22">
               <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入"></el-input>
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
  name:'givedeposit',
    data() {
     return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
        sex:1,
        disabled:false,
        limitdate: [],
        fileList:[],
        ruleForm: {
          desc:''//放弃原因
        },
        rules: {
          desc:[
            {required: true, message: '请输入放弃原因', trigger: 'blur' }
          ],
        }
     }
    },
    methods: {
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
    }
}
</script>
<style lang="scss">
 @import '../styles/dialog.scss';
</style>
