<template>
    <div>
        <!--添加课程-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="课程:" prop="course" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.course" placeholder="请选择" style="width:100%">
                <el-option label="Angel" value="cishucard"></el-option>
                <el-option label="ViVi" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="课程分类:" prop="courseclassify" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.courseclassify" placeholder="请选择" style="width:100%">
                <el-option label="Angel" value="cishucard"></el-option>
                <el-option label="ViVi" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
           <el-form-item label="教练:" prop="train" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.train" placeholder="请选择" style="width:100%">
                <el-option label="Angel" value="cishucard"></el-option>
                <el-option label="ViVi" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
             <el-form-item label="教室:" prop="room" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-select v-model="ruleForm.room" placeholder="请选择" style="width:100%">
                <el-option label="Angel" value="cishucard"></el-option>
                <el-option label="ViVi" value="jinecard"></el-option>
                </el-select>
                </el-col>
            </el-form-item>
            <el-form-item  label="上课时间:" prop="attendtime" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-time-picker is-range v-model="ruleForm.attendtime" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
             <el-form-item label="容纳人数:" prop="galleryful" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.galleryful" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="难度:" prop="difficulty" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.difficulty" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="价格:" prop="price" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
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
  name:'addcurriculum',
    data() {
     return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
        ruleForm: {
          course:'',//课程
          courseclassify: '',//课程分类
          train:'',//教练
          room: '',//教室
          attendtime:'',//上课时间
          galleryful:'',//容纳人数
          difficulty:'',//难度
          price:''//价格
        },
        rules: {
          course:[
            {required: true, message: '请选择课程', trigger: 'change' }
          ],
          courseclassify: [
            { required: true, message: '请选择课程分类', trigger: 'change' }
          ],
          train: [
            {required: true, message: '请选择教练', trigger: 'change' }
          ],
          room: [
            {required: true, message: '请选择教室', trigger: 'change' }
          ],
         attendtime:[
             {required: true, message: '请选择上课时间', trigger: 'change' }
         ],
         galleryful:[
             {required: true, message: '请输入容纳人数', trigger: 'blur'}
         ],
         difficulty:[
             {required: true, message: '请输入课程难度', trigger: 'blur'}
         ],
         price:[
             {required: true, message: '请输入课程价格', trigger: 'blur'}
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
