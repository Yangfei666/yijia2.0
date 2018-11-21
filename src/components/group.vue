<template>
    <div>
      <!--约团课-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="门店:" prop="door" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.door" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item prop="attenddate" label="上课日期:" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.attenddate" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item prop="attendtime" label="上课时间:" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-time-picker is-range v-model="ruleForm.attendtime" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
             <el-form-item label="预约课程:" prop="bespoke" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.bespoke" placeholder="请选择" style="width:100%">
                <el-option label="空中瑜伽" value="kong"></el-option>
                <el-option label="基础瑜伽" value="jichu"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="姓名:" prop="name" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
              <el-form-item label="会员/体验客户:" prop="consumer" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.consumer" placeholder="请选择" style="width:100%">
                <el-option label="会员" value="huiyuan"></el-option>
                <el-option label="体验客户" value="tiyan"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
             <el-form-item label="卡种:" prop="card" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.card" placeholder="请选择" style="width:100%">
                <el-option label="次数卡" value="cishucard"></el-option>
                <el-option label="金额卡" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
             <el-form-item class="dialog-footer">
               <el-col :span="24" style="display: flex;justify-content: flex-end;">
            <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
            </el-col>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  name:'group',
    data() {
    return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
        ruleForm: {
          door:'',//门店
          attenddate: '',//上课日期
          attendtime:'',//上课时间
          bespoke:'',//预约课程
          consumer:'',//会员/体验客户
          name: '',//姓名
          card:'',//卡种
        },
        rules: {
          door:[
            {required: true, message: '请输入门店', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min:2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          attenddate: [
            {type: 'date', required: true, message: '请选择上课日期', trigger: 'change' }
          ],
          attendtime:[
            {required: true, message: '请选择上课时间', trigger: 'change'}
          ],
          bespoke: [
            {required: true, message: '请选择预约课程', trigger: 'change' }
          ],
          consumer: [
            {required: true, message: '请选择会员/体验客户', trigger: 'change' }
          ],
         card:[
             {required: true, message: '请选择卡种', trigger: 'change' }
         ]
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
    }
}
</script>
<style lang="scss">
 @import '../styles/dialog.scss';
</style>
