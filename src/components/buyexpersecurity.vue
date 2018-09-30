<template>
    <div>
        <!--购买体验卷-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
             <el-form-item label="劵类型:" prop="cardname" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.cardname" placeholder="请选择" style="width:100%">
                <el-option label="次数卡" value="cishucard"></el-option>
                <el-option label="金额卡" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
             <el-form-item label="金额:" prop="price" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
                <el-form-item label="付款方式:" prop="payment" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-radio-group v-model="ruleForm.payment">
                <el-radio :label="1">店内到付</el-radio>
                <el-radio :label="2">美团</el-radio>
                <el-radio :label="3">大众</el-radio>
                <el-radio :label="4">会籍代收</el-radio>
                <el-radio :label="5">未支付</el-radio>
            </el-radio-group>
            </el-col>
            </el-form-item>
            <el-form-item label="原因:" prop="desc" :label-width="formLabelWidth">
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
  name:'buyexpersecurity',
    data() {
     return {
         remnant: 666,
        dialogFormVisible: false,
        formLabelWidth: '130px',
        payment: 1,
        disabled:false,
        limitdate: [],
        ruleForm: {
          cardname:'',//卷类型
          price:'',//金额
          payment: '',//付款方式
          desc:''//原因
        },
        rules: {
          cardname:[
            {required: true, message: '请选择卷类型', trigger: 'change' }
          ],
          price: [
            {required: true, message: '请输入金额', trigger: 'blur' }
          ],
          payment: [
            {required: true, message: '请选择付款方式', trigger: 'change' }
          ],
         desc:[
             {required: true, message: '请输入原因', trigger: 'blur' }
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
