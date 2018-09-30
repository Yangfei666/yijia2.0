<template>
    <div>
        <!--添加定金客户-->
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
            <el-form-item label="会籍顾问:" prop="adviser" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.adviser" placeholder="请选择" style="width:100%">
                <el-option label="Angel" value="cishucard"></el-option>
                <el-option label="ViVi" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="付款方式:" prop="mode" :label-width="formLabelWidth">
              <el-col :span="22">
                 <el-radio-group v-model="ruleForm.mode">
                    <el-radio :label="3">店内到付</el-radio>
                    <el-radio :label="6">大众</el-radio>
                    <el-radio :label="9">美团</el-radio>
                    <el-radio :label="9">会籍代收</el-radio>
                    <el-radio :label="9">未支付</el-radio>
                </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="金额:" prop="price" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="支付凭证:" prop="photo" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-upload class="upload-demo" v-model="ruleForm.photo" 
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" style="color:#c7c7c7">选择文件</el-button>
            <span>未选择任何文件</span>
            </el-upload>
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
  name:'addbargain',
    data() {
     return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
        sex:1,
        disabled:false,
        limitdate: [],
        fileList:[],
        ruleForm: {
          name:'',//姓名
          sex: '',//性别
          tel:'',//电话
          wechat: '',//微信
          adviser:'',//会籍顾问
          photo:'',//支付凭证
          price:'',//金额
          mode:'',//付款方式
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
         photo:[
             {required: true, message: '请上传支付凭证', trigger: 'change'}
         ],
          price:[
            {required: true, message: '请输入金额', trigger: 'blur' }
          ],
          mode: [
            { required: true,message: '请选择付款方式', trigger: 'change' }
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
      },
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
}
</script>
<style lang="scss">
 @import '../styles/dialog.scss';
</style>
