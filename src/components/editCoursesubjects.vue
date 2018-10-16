<template>
    <div>
      <!--修改课程科目-->
        <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
            <el-form-item label="课程科目:" prop="kcName" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.kcName" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="价格:" prop="price" :label-width="formLabelWidth">
               <el-col :span="22">
                <el-input v-model="currentSelectRow.price" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="热度:" prop="kcHot" :label-width="formLabelWidth">
                <el-col :span="22">
                <el-radio v-model="currentSelectRow.kcHot" label="精品" value="0"></el-radio>
                <el-radio v-model="currentSelectRow.kcHot" label="普通" value="1"></el-radio>
                </el-col> 
            </el-form-item>
            <el-form-item label="状态:" prop="ZT" :label-width="formLabelWidth">
                <el-col :span="22">
                <el-radio v-model="currentSelectRow.ZT" label="启用" value="0"></el-radio>
                <el-radio v-model="currentSelectRow.ZT" label="禁用" value="1"></el-radio>
                </el-col> 
            </el-form-item>
             <el-form-item label="课程封面:" prop="cover" :label-width="formLabelWidth">
                <el-col :span="22">
                    <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    v-model="currentSelectRow.cover"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
  props: ["currentSelectRow"],
  name:'editCoursesubjects',
    data() {
    return {
        imageUrl: '',
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
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
}
</script>
<style lang="scss">
 @import '../styles/dialog.scss';
</style>
