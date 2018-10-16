<template>
    <div>
        <!--编辑新员工-->
        <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
          <el-form-item label="姓名:" prop="YGXX_NAME" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.YGXX_NAME" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="性别:" prop="YGXX_SEX" :label-width="formLabelWidth">
            <el-col :span="22">
                    <el-radio label="女" value="0" v-model="currentSelectRow.YGXX_SEX"></el-radio>
                    <el-radio label="男" value="1" v-model="currentSelectRow.YGXX_SEX"></el-radio>
                </el-col> 
            </el-form-item>
             <el-form-item label="电话:" prop="YGXX_HOMETEL" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.YGXX_HOMETEL" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="身份证号:" prop="ygIdentity" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.ygIdentity" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="分配角色:" prop="role" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="currentSelectRow.role" placeholder="请选择" style="width:100%">
                <el-option label="教练" value="cishucard"></el-option>
                <el-option label="会籍顾问" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="所属权限:" prop="power" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="currentSelectRow.power" placeholder="请选择" style="width:100%">
                <el-option label="超级管理" value="cishucard"></el-option>
                <el-option label="普通" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="所属大队:" prop="big" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="currentSelectRow.big" placeholder="请选择" style="width:100%">
                <el-option label="1大队" value="cishucard"></el-option>
                <el-option label="2大队" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
             <el-form-item label="所属小组:" prop="small" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="currentSelectRow.small" placeholder="请选择" style="width:100%">
                <el-option label="1小组" value="cishucard"></el-option>
                <el-option label="2小组" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="员工简介:" prop="ygIntro" :label-width="formLabelWidth">
               <el-col :span="22">
               <el-input type="textarea" v-model="currentSelectRow.ygIntro"></el-input>
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
  name:'editstaff',
  props: ["currentSelectRow"],
    data() {
     return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
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
