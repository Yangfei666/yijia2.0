<template>
    <div>
        <!--添加潜在客户-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.name" placeholder="中英文，长度2-10"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="性别:" prop="sex" :label-width="formLabelWidth">
            <el-col :span="22">
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio :label="1">女</el-radio>
                    <el-radio :label="2">男</el-radio>
                </el-radio-group>
                </el-col> 
            </el-form-item>
             <el-form-item label="电话:" prop="tel" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.tel" placeholder="请输入11位手机号码"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="微信:" prop="wechat" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.wechat" placeholder="6-20个字母、数字、下划线和减号，必须以字母开头"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="客户质量:" prop="quality" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.quality" placeholder="请选择" style="width:100%">
                <el-option label="A" value="cishucard"></el-option>
                <el-option label="B" value="jinecard"></el-option>
                <el-option label="C" value="jinecard"></el-option>
                <el-option label="D" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="会籍顾问:" prop="adviser" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.adviser" placeholder="请选择" style="width:100%">
                <el-option label="Angel" value="cishucard"></el-option>
                <el-option label="ViVi" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="备注:" prop="desc" :label-width="formLabelWidth">
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
  name:'addlatent',
    data() {
     return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
        sex:1,
        disabled:false,
        limitdate: [],
        ruleForm: {
          name:'',//姓名
          sex: '',//性别
          tel:'',//电话
          wechat: '',//微信
          quality:'',//客户质量
          adviser:'',//会籍顾问
          desc:''//员工简介
        },
        rules: {
          name:[
            {required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          sex: [
            { required: true,message: '请选择性别', trigger: 'change' }
          ],
          tel: [
            {required: true, message: '请输入电话', trigger: 'blur' }
          ],
          wechat: [
            {required: true, message: '请输入微信', trigger: 'blur' }
          ],
         adviser:[
             {required: true, message: '请选择会籍顾问', trigger: 'change' }
         ],
         quality:[
             {required: true, message: '请选择客户质量', trigger: 'change'}
         ],
          desc:[
            {required: true, message: '请输入备注', trigger: 'blur' }
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
      }
    }
}
</script>
<style lang="scss">
 @import '../styles/dialog.scss';
</style>
