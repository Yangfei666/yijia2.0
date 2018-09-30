<template>
    <div>
      <!--添加会员-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="照片:" prop="photo" :label-width="formLabelWidth">
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
          <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="ruleForm.name" placeholder="中英文，长度2-10"></el-input>
          </el-col>
        </el-form-item>
         <el-form-item label="手机号:" prop="tel" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="ruleForm.tel" placeholder="请输入11位手机号码"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="微信:" prop="wechat" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="ruleForm.wechat" placeholder="6-20个字母、数字、下划线和减号，必须以字母开头"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别:" prop="sex" label-width="130px">
            <el-col :span="22">
                <el-radio v-model="radio" label="女">女</el-radio>
                <el-radio v-model="radio" label="男">男</el-radio>
            </el-col>
        </el-form-item>
        <el-form-item label="生日:" prop="birthday" :label-width="formLabelWidth">
            <el-col :span="22">
            <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="请选择" style="width:100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="证件号码:" prop="catenumber" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="ruleForm.catenumber" placeholder="请输入18位身份证号码"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="住址:" prop="address" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="ruleForm.address" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="职业:" prop="vocation" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="ruleForm.vocation" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="会籍顾问:" prop="membership" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-select v-model="ruleForm.membership" placeholder="请选择" style="width:100%">
            <el-option label="菲菲" value="feifei"></el-option>
            <el-option label="琦琦" value="qiqi"></el-option>
            </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="紧急联系人:" prop="contact" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="ruleForm.contact" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="紧急联系人电话:" prop="contacttel" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="ruleForm.contacttel" placeholder="请输入11位手机号码"></el-input>
          </el-col>
        </el-form-item>
       <el-form-item label="卡名称:" prop="cardname" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-select v-model="ruleForm.cardname" placeholder="请选择" style="width:100%">
            <el-option label="金额卡" value="meizi"></el-option>
            <el-option label="大众卡" value="qiqi"></el-option>
            </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="卡号:" prop="card" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="ruleForm.card" placeholder="请输入"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="卡号确认:" prop="cardaffirm" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="ruleForm.cardaffirm" placeholder="请输入"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="金额:" prop="money" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="ruleForm.money" placeholder="请输入"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="付款方式:" prop="payment" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-radio-group v-model="payment">
                <el-radio :label="1">微信</el-radio>
                <el-radio :label="2">支付宝</el-radio>
                <el-radio :label="3">信用卡</el-radio>
                <el-radio :label="4">现金</el-radio>
                <el-radio :label="5">银行卡</el-radio>
                <el-radio :label="6">手机银行转账</el-radio>
            </el-radio-group>
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
  name:'addmember',
    data() {
    return {
        fileList: [],
        radio: '男',
        dialogFormVisible: false,
        formLabelWidth: '130px',
        birthday:'',
        payment:3,
        ruleForm: {
          photo:'',//照片
          name: '',//姓名
          tel:'',//手机号
          wechat:'',//微信
          sex:'',//性别
          birthday:'',//生日
          catenumber:'',//证件号码
          address:'',//地址
          vocation:'',//职业
          membership:'',//会籍顾问
          contact:'',//紧急联系人
          contacttel:'',//紧急联系人电话
          cardname:'',//卡名称
          card:'',//卡号
          cardaffirm:'',//卡号确认
          money:'',//金额
          payment:''//付款方式
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min:2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          tel:[
              {required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          membership:[
              { required: true, message: '请选择会籍顾问', trigger: 'change'}
          ],
          cardname:[
              {required: true, message: '请选择卡名称', trigger: 'change'}
          ],
          card: [
            { required: true, message: '请输入卡号', trigger: 'blur' }
          ],
          cardaffirm:[
              {required: true, message: '请确认卡号', trigger: 'blur' }
          ],
          money: [
            {required: true, message: '请输入金额', trigger: 'blur'}
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

