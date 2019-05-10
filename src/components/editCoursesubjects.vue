<template>
  <div>
    <!--修改课程科目-->
    <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
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
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="uploadImg" :http-request='submitUpload' :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item class="dialog-footer">
        <el-col :span="24" style="display: flex;justify-content: flex-end;">
          <el-button type="primary" @click="submitForm('currentSelectRow')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  props: ["currentSelectRow"],
  name: "editCoursesubjects",
  inject: ["reload"],
  data() {
    return {
      imageUrl: "",
      file:"",
      dialogFormVisible: false,
      formLabelWidth: "130px",
    };
  },
  created(){
    let subImg = this.currentSelectRow.curriculum_subject_img;
    this.imageUrl = subImg.length !== 0 ? subImg[0].urlPic :'';
  },
  methods: {
    submitUpload: function(content) {
      this.file = content.file;
    },
    uploadImg(file) {
      this.imgfile = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //修改课程科目
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let formData = new FormData();
            formData.append("kcName", this.currentSelectRow.kcName); //课程名称
            formData.append("ZT", this.currentSelectRow.ZT == "启用" ? 1 : 2); //状态
            formData.append("BZ", this.currentSelectRow.BZ); //备注
            formData.append("kcHot", this.currentSelectRow.kcHot == "普通" ? 2 : 1); //热度
            formData.append("price", this.currentSelectRow.price); //价格
            formData.append("file",this.file); //课程封面
            requestLogin(
              "/setCurSubInfo/" + this.currentSelectRow.kcno,
              formData,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.reload();
              })
              .catch(error => {
                let { response: { data: { errorCode, msg } } } = error;
                if (errorCode != 0) {
                  this.$message({
                    message: msg,
                    type: "error"
                  });
                  return;
                }
              });
          });
        } else {
          return false;
        }
      });
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
