<template>
  <div>
    <!--入会协议-->
    <div class="health">
      <el-col :span="24" class="infor-head">
        <div class="infor-title">
          <span>上传入会凭证</span>
        </div>
        <div class="infor-but" v-on:click="back">
          <el-button class="goback el-icon-arrow-left">返回</el-button>
        </div>
      </el-col>
      <el-col :span="24" class="practice-center">
        <div class="img-list">
          <div class="img-content" v-for="(item,key) in imagelist" :key="key">
            <img :src="item.urlPic">
            <div class="del">
              <i @click="handleFileRemove(item,key)" class="el-icon-delete"></i>
            </div>
            <!-- 放大icon -->
            <div class="layer" @click="handleFileEnlarge(item.urlPic)">
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
      </el-col>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
export default {
  naem: "memberment",
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
      },
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
      requestLogin("/setDesignateMember/showVoucherList/" + _this.$route.query.HYID, {}, "get")
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
      requestLogin("/setDesignateMember/saveVoucher/" + this.$route.query.HYID, formData, "post")
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
    //删除图片
    handleFileRemove(file, i) {
      if (!file.urlPic) {
        return false;
      }
      let that = this;
      this.$confirm("是否删除这张图片？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          requestLogin("/setDesignateMember/delVoucher/" + file.id, {}, "delete").then(
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
    },
    back() {
      this.$router.push({
      path: "/Customer/membershiphome/memberhome",
      query: {
          HYID: this.$route.query.HYID,
          HYName: this.$route.query.HYName,
          YGXX_NAME: this.$route.query.YGXX_NAME,
          MotoTel: this.$route.query.MotoTel
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.health {
  width: 97%;
  height: 100%;
  display: inline-block;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .infor-head {
    height: 50px;
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    border-bottom: 1px solid #e8e8e8;
    .infor-but {
      padding-right: 10px;
      font-size: 16px;
      color: #262626;
      .goback{
        border: none;
        background: #fff;
        font-size: 16px;
      }
    }
    .infor-but:hover {
      color: #00bc71;
    }
    .infor-title {
      padding-left: 15px;
      font-size: 16px;
      color: #262626;
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
  .practice-center {
    height: 100%;
    display: flex;
    padding-left: 15px;
    .img-list {
      .img-content {
        float: left;
        text-align: left;
        position: relative;
        display: inline-block;
        width: 200px;
        height: 230px;
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
          bottom: 8px;
          right: 45%;
          color: #8492a6;
          cursor: pointer;
          font-size: 20px;
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
// }
}
</style>
