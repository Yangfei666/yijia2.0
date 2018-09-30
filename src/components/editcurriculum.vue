<template>
    <div>
        <!--修改课程-->
        <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
            <el-form-item label="课程:" prop="classname" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="currentSelectRow.classname" placeholder="请选择" style="width:100%">
                <el-option label="Angel" value="cishucard"></el-option>
                <el-option label="ViVi" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="课程分类:" prop="gorp" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="currentSelectRow.gorp" placeholder="请选择" style="width:100%">
                <el-option label="Angel" value="cishucard"></el-option>
                <el-option label="ViVi" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
           <el-form-item label="教练:" prop="train" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="currentSelectRow.train" placeholder="请选择" style="width:100%">
                <el-option label="Angel" value="cishucard"></el-option>
                <el-option label="ViVi" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
             <el-form-item label="教室:" prop="jiaoshi" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="currentSelectRow.jiaoshi" placeholder="请选择" style="width:100%">
                <el-option label="Angel" value="cishucard"></el-option>
                <el-option label="ViVi" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item  label="上课时间:" prop="statstime" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-time-picker is-range v-model="currentSelectRow.statstime" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
             <el-form-item label="容纳人数:" prop="renshu" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.renshu" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="难度:" prop="difficulty" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.difficulty" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="价格:" prop="price" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.price" placeholder="请输入"></el-input>
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
  name:'editcurriculum',
  props: ["currentSelectRow"],
    data() {
     return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
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
