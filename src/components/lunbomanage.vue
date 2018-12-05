<template>
    <div>
        <el-col :span="24">
            <div class="practice-main">
                <el-col :span="23" class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>小程序管理</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{path:'/Routine/rotation'}">轮播图管理</el-breadcrumb-item>
                        <el-breadcrumb-item>图片管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
                <el-col :span="23" class="weber">
                    <span class="weber-span">图片管理</span>
                </el-col>
            </div>
        </el-col>
        <div class="practice-list">
            <div class="practice-center">
                <div class="upload-img">
                <el-upload action=" " list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang='scss' scoped>
.practice-main {
  height: 112px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  .breadcrumb {
    margin: 17px 20px auto;
  }
  .weber {
    margin: 17px 20px auto;
    height: 45px;
    display: flex;
    line-height: 45px;
    .weber-span {
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      font-family: PingFang-SC-Regular;
    }
    .search {
      width: 261px;
      border: 1px solid #e8e8e8;
      height: 32px;
      margin: 5px 35px auto;
      display: flex;
      border-radius: 16px;
      .search-input {
        width: 100%;
        border-radius: 16px;
        border: none;
        text-indent: 10px;
        color: #8c8c8c;
        font-size: 14px;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
    }
  }
}
.practice-list {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  display: inline-block;
  .practice-center {
    height: 500px;
    .upload-img{
        display: flex;
        margin: 1%;
    }
  }
}
</style>
