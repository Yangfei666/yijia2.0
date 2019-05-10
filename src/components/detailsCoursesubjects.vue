<template>
  <div>
    <!--课程科目详情-->
    <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px" :disabled="true">
      <el-form-item label="课程科目:" prop="kcName" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model.trim="currentSelectRow.kcName" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="价格:" prop="price" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model.trim="currentSelectRow.price" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="热度:" prop="kcHot" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio v-model="currentSelectRow.kcHot" label="精品" value="1"></el-radio>
          <el-radio v-model="currentSelectRow.kcHot" label="普通" value="2"></el-radio>
        </el-col>
      </el-form-item>
      <el-form-item label="状态:" prop="ZT" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio v-model="currentSelectRow.ZT" label="启用" value="1"></el-radio>
          <el-radio v-model="currentSelectRow.ZT" label="禁用" value="2"></el-radio>
        </el-col>
      </el-form-item>
      <el-form-item label="课程封面:" prop="curriculum_subject_img.urlPic" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-upload class="avatar-uploader" action="" :show-file-list="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  props: ["currentSelectRow"],
  name: "detailsCoursesubjects",
  inject: ["reload"],
  data() {
    return {
      imageUrl: "",
      file: "",
      dialogFormVisible: false,
      formLabelWidth: "130px"
    };
  },
  created() {
    let subImg = this.currentSelectRow.curriculum_subject_img;
    this.imageUrl = subImg.length !== 0 ? subImg[0].urlPic : "";
  },
  methods: {
    submitUpload: function(content) {
      this.file = content.file;
    },
    uploadImg(file) {
      this.imgfile = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
