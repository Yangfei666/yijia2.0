<template>
    <div>
      <!--换会籍-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
         <el-form-item label="新会籍:" prop="huiji" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.huiji" placeholder="请选择" style="width:100%">
                <el-option label="Angel" value="cishucard"></el-option>
                <el-option label="ViVi" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
         <el-form-item label="变更原因:" prop="desc" :label-width="formLabelWidth">
          <el-col :span="22" class="from-date">
                <el-input type="textarea" v-model="ruleForm.desc" maxlength="666" @input="descInput" style="min-height:96px;width:690px;height:69px"></el-input>
                <span class="textarea">还可以输入{{remnant}}字</span>
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
  name:'change',
    data() {
    return {
        remnant: 666,
        dialogFormVisible: false,
        formLabelWidth: '130px',
        ruleForm: {
          huiji: '',//新会籍
          desc:'',//变更原因
        },
        rules: {
          huiji: [
            { required: true, message: '请选择新会籍', trigger: 'change' },
          ],
          desc: [
            { required: true, message: '请输入变更原因', trigger: 'blur' }
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
        descInput(){
        var txtVal = this.ruleForm.desc.length;
        this.remnant = 666 - txtVal;
        }
    }
}
</script>
<style lang="scss">
 @import '../styles/dialog.scss';
</style>

