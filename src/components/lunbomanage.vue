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
        <div class="img-list">
          <div class="img-content" v-for="(item,key) in imagelist" :key="key">
            <img :src="item.banPic">
            <div class="name">
              <div>{{ item.banIsFirst}}</div>
              <el-button type="text" @click="handleFileName(item,key)" v-show="item.banIsFirst != '封面'">设为封面</el-button>
            </div>
            <!-- 删除icon -->
            <div class="del" v-if="item.banIsFirst == '封面'">
            </div>
            <div class="del" v-else>
              <i @click="handleFileRemove(item,key)" class="el-icon-delete"></i>
            </div>
            <!-- 放大icon -->
            <div class="layer" @click="handleFileEnlarge(item.banPic)">
              <i class="el-icon-view"></i>
            </div>
          </div>
          <div v-if="!pass && progress !== 0" class="img-content img-progress">
            <el-progress type="circle" :percentage="progress" :status="proStatus"></el-progress>
          </div>
          <div class="img-upload">
            <el-upload class="uploader" accept="image/*" ref="upload" list-type="picture-card" :show-file-list="false" action="" :data="params.data" :http-request='submitUpload' :before-upload="beforeAvatarUpload" :on-change="uploadOnChange" :on-success="uploadOnSuccess" :on-error="uploadOnError" :on-progress="uploadOnProgress">
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
          <el-dialog title="" :visible.sync="isEnlargeImage" size="large" :show-close='false' :modal-append-to-body="false" top="8%" width="60%">
            <img @click="isEnlargeImage = false" style="width:100%;" :src="enlargeImage">
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      progress: 0, //上传进度
      pass: null, //是否上传成功
      isEnlargeImage: false, //放大图片
      enlargeImage: "", //放大图片地址
      imagelist: [],
      file: "",
      params: {
        data: {}
      }
    };
  },
  computed: {
    //上传状态
    proStatus() {
      if (this.pass) {
        return "success";
      } else if (this.pass == false) {
        return "exception";
      } else {
        return "";
      }
    }
  },
  created() {
    this.getUpload();
  },
  methods: {
    //获取图片管理列表
    getUpload() {
      let _this = this;
      requestLogin("/setBannerImg/" + _this.$route.query.id, {}, "get")
        .then(res => {
          _this.imagelist = res;
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
    },
    //开始上传
    uploadOnProgress(e, file) {
      this.progress = Math.floor(e.percent);
    },
    uploadOnChange(file) {
      if (file.status == "ready") {
        this.pass = null;
        this.progress = 0;
      } else if (file.status == "fail") {
        this.$message.error("图片上传出错，请刷新重试！");
      }
    },
    //添加图片
    submitUpload: function(content) {
      this.file = content.file;
      let formData = new FormData();
      formData.append("file", this.file);
      requestLogin("/setBannerImg/" + this.$route.query.id, formData, "post")
        .then(data => {
          this.$message({
            message: "上传成功",
            type: "success"
          });
          this.getUpload();
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
    },
    //上传图片
    uploadOnSuccess(file) {
      this.pass = true;
    },
    beforeAvatarUpload(file) {
      var testimg = file.name.substring(file.name.lastIndexOf('.')+1);
      const isJPG = testimg === "jpg";
      const isPNG = testimg === "png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message({  
              message: '上传图片只能是 JPG、PNG格式!',  
              type: 'warning'  
          });  
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG || isPNG && isLt2M;
    },
    uploadOnError(e, file) {
      this.pass = false;
    },
    //放大图片
    handleFileEnlarge(_url) {
      if (_url) {
        this.enlargeImage = _url;
        this.isEnlargeImage = !this.isEnlargeImage;
      }
    },
    //设为封面
    handleFileName(file, i) {
      let that = this;
      this.$confirm("确认设为这张为封面吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          requestLogin("/setBannerImg/" + file.id, {}, "put").then(response => {
            this.$message({
              message: "设置成功",
              type: "success"
            });
            this.getUpload();
          });
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
    },
    //删除图片
    handleFileRemove(file, i) {
      if (!file.banPic) {
        return false;
      }
      let that = this;
      this.$confirm("是否删除这张图片？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          requestLogin("/setBannerImg/" + file.id, {}, "delete").then(
            response => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              that.imagelist.splice(i, 1);
            }
          );
        })
        .catch(meg => console.log(meg));
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
    height: 100%;
    display: flex;
    margin: 1%;
    .img-list {
      .img-content {
        float: left;
        text-align: left;
        position: relative;
        display: inline-block;
        width: 200px;
        height: 260px;
        padding: 5px;
        margin: 5px 20px 20px 0;
        border: 1px solid #d1dbe5;
        border-radius: 4px;
        transition: all 0.3s;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
          0 0 6px 0 rgba(0, 0, 0, 0.04);
        img {
          display: block;
          width: 100%;
          height: 190px;
          margin: 0 auto;
          border-radius: 4px;
        }
        .name {
          margin-top: 10px;
        }
        .name > div {
          width: 90%;
          text-overflow: ellipsis;
          overflow: hidden;
          height: 25px;
          line-height: 25px;
        }
        .del,
        .layer {
          opacity: 0;
          transition: all 0.3s;
        }
        .del {
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: #8492a6;
          cursor: pointer;
          font-size: 18px;
        }
        .layer {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 200px;
          color: #fff;
          text-align: center;
          z-index: 5;
          background-color: rgba(0, 0, 0, 0.4);
          i {
            font-size: 1.6em;
            margin-top: 80px;
          }
        }
      }
      .img-content:hover .del,
      .img-content:hover .layer {
        opacity: 1;
      }
      .img-upload {
        float: left;
        width: 200px;
        height: 200px;
        line-height: 200px;
        display: table;
        text-align: center;
        margin-top: 5%;
        .uploader {
          width: 100%;
          height: 100%;
          display: table-cell;
          vertical-align: middle;
        }
      }
      .img-progress {
        text-align: center;
        padding-top: 50px;
      }
    }
  }
}
</style>
