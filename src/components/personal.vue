<template>
    <div>
      <!--约私教-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="上课日期:" prop="attenddate" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-date-picker v-model="ruleForm.attenddate" type="date" placeholder="请选择" style="width:100%"></el-date-picker>
            </el-col>
        </el-form-item>
       <el-form-item prop="attendtime" label="上课时间:" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-time-picker is-range v-model="ruleForm.attendtime" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 100%;"></el-time-picker>
                </el-col>
        </el-form-item>
        <el-form-item label="教室:" prop="room" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-select v-model="ruleForm.room" placeholder="请选择" style="width:100%">
            <el-option label="大教室" value="big"></el-option>
            <el-option label="小教室" value="small"></el-option>
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
            <el-option label="会员" value="meizi"></el-option>
            <el-option label="体验客户" value="qiqi"></el-option>
            </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="卡种:" prop="card" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="ruleForm.card" placeholder="请输入"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="教练:" prop="trainer" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-select v-model="ruleForm.trainer" placeholder="请选择" style="width:100%">
            <el-option label="菲菲" value="feifei"></el-option>
            <el-option label="琦琦" value="qiqi"></el-option>
            </el-select>
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
  name:'personal',
    data() {
    return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
        ruleForm: {
          name: '',//姓名
          card:'',//卡种
          consumer:'',//会员/体验客户
          trainer: '',//教练
          attenddate:'',//上课日期
          attendtime:'',//上课时间
          room:''//教室
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min:2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          card: [
            { required: true, message: '请输入卡种', trigger: 'blur' }
          ],
          trainer: [
            { required: true, message: '请选择教练', trigger: 'change' }
          ],
          attenddate: [
            { type: 'date', required: true, message: '请选择上课日期', trigger: 'change' }
          ],
           consumer: [
            { required: true, message: '请选择会员/体验客户', trigger: 'change' }
          ],
          attendtime:[
            {required: true, message: '请选择上课时间', trigger: 'change'}
          ],
          room: [
            { required: true, message: '请选择教室', trigger: 'change' }
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style lang="scss">
 @import '../styles/dialog.scss';
</style>

