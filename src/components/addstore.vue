<template>
    <div>
        <!--添加门店-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="门店名称:" prop="roomname" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.roomname" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="门店别名:" prop="roombyname" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.roombyname" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="电话:" prop="tel" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.tel" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
           <el-form-item label="邮编:" prop="zipcode" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.zipcode" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="法人:" prop="corporation" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.corporation" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
           <el-form-item label="城市:" prop="homecity" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.homecity" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="详细地址:" prop="detadaddress" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.detadaddress" placeholder="请输入"></el-input>
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
  name:'addstore',
    data() {
     return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
        ruleForm: {
          roomname:'',//门店名称
          roombyname: '',//门店别名
          tel:'',//电话
          zipcode: '',//邮编
          corporation:'',//法人
          homecity:'',//城市
          detadaddress:'',//详细地址
        },
        rules: {
          roomname:[
            {required: true, message: '请输入门店名称', trigger: 'blur'}
          ],
          roombyname: [
            {required: true, message: '请输入门店别名', trigger: 'blur'}
          ],
          tel: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ],
          zipcode: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
         corporation:[
             {required: true, message: '请输入法人', trigger: 'blur'}
         ],
         homecity:[
             {required: true, message: '请输入城市', trigger: 'blur'}
         ],
         detadaddress:[
             {required: true, message: '请输入详细地址', trigger: 'blur'}
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
