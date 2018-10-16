<template>
    <div>
        <!--编辑体验卷-->
        <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
          <el-form-item label="体验卷名称:" prop="tkName" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.tkName" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="售价(元):" prop="tkPrice" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.tkPrice" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="总次数:" prop="frequency" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.frequency" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="有效期(天数):" prop="vld" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.vld" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="状态:" prop="tkState" :label-width="formLabelWidth">
              <el-col :span="22">
                    <el-radio label="启用"  value="0" v-model="currentSelectRow.tkState"></el-radio>
                    <el-radio label="禁用"  value="1" v-model="currentSelectRow.tkState"></el-radio>
                </el-col>
            </el-form-item>
            <el-form-item label="类型:" prop="type" :label-width="formLabelWidth">
              <el-col :span="22">
                    <el-radio label="团课卷" value="0" v-model="currentSelectRow.type"></el-radio>
                    <el-radio label="私教卷" value="1" v-model="currentSelectRow.type"></el-radio>
                </el-col>
            </el-form-item>
             <el-form-item class="dialog-footer">
               <el-col :span="24" style="display: flex;justify-content: flex-end;">
            <el-button @click="resetForm('currentSelectRow')">重置</el-button>
            <el-button type="primary" @click="submitForm('currentSelectRow')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
            </el-col>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  name:'editexpersecurity',
  props: ["currentSelectRow"],
    data() {
     return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
        num: 1,
        status:1,
        memcolor:1,
        classtype:1,
        type:1,
        disabled:false,
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
