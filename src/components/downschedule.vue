<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>课程管理</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/Curriculum/group' }">团课课程表</el-breadcrumb-item>
              <el-breadcrumb-item>课程表预览下载</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">课程表预览下载</span>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <div class="practice-list">
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <div class="downmain">
              <el-button type="text" class="el-icon-setting downmain-span" @click="dialogFormVisible2=true">下载设置</el-button>
            </div>
            <div class="downimg">
              <img :src="img"/>
              <div v-show="loading" class="loading">加载中...</div>
            </div>
             <div class="downbtn">
            <el-button type="text" size="small" class="download2" @click="downbtn" :disabled="xianshi">下载图片</el-button>
            </div>
            <template>
              <el-dialog title="下载设置" :append-to-body="true" :visible.sync="dialogFormVisible2">
                  <!--下载设置-->
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="会馆Logo:" prop="logo" :label-width="formLabelWidth">
                          <el-col :span="22" v-if="this.setup != null">
                               <Fileupload5 ref="fileUpload" :imageUrl="imageUrl" @sendBlobFile="setBlobImg" style="width:130px;height:130px"></Fileupload5>
                                 <span class="el-upload__tip" style="color:#DEB116;font-size: 14px;"><span style="color:red;font-size: 14px;">*(必填)</span>只能上传png文件，且不超过500kb</span>
                                <ul v-if="blobImg.src" class="el-upload-list el-upload-list--picture">
                                <li tabindex="0" class="el-upload-list__item is-ready">
                                  <img :src="blobImg.src" alt="" class="el-upload-list__item-thumbnail">
                                  <a class="el-upload-list__item-name">
                                    <i class="el-icon-document"></i>{{blobImg.name}}
                                  </a>
                                  <label class="el-upload-list__item-status-label">
                                    <i class="el-icon-upload-success el-icon-check"></i>
                                  </label>
                                  <i class="el-icon-close" @click="clearBlobImg"></i>
                                  <i class="el-icon-close-tip">按 delete 键可删除</i>
                                </li>
                              </ul>
                          </el-col>
                          <el-col :span="22" v-else>
                              <Fileupload4 ref="fileUpload" :imageUrl="imageUrl" @sendBlobFile="setBlobImg"></Fileupload4>
                              <el-button size="small" type="primary" @click="changeUserIcon">上传图片</el-button>
                              <span class="el-upload__tip" style="color:#DEB116;font-size: 14px;">*(必填)只能上传png文件，且不超过500kb</span>
                              <ul v-if="blobImg.src" class="el-upload-list el-upload-list--picture">
                                <li tabindex="0" class="el-upload-list__item is-ready">
                                  <img :src="blobImg.src" alt="" class="el-upload-list__item-thumbnail">
                                  <a class="el-upload-list__item-name">
                                    <i class="el-icon-document"></i>{{blobImg.name}}
                                  </a>
                                  <label class="el-upload-list__item-status-label">
                                    <i class="el-icon-upload-success el-icon-check"></i>
                                  </label>
                                  <i class="el-icon-close" @click="clearBlobImg"></i>
                                  <i class="el-icon-close-tip">按 delete 键可删除</i>
                                </li>
                              </ul>
                          </el-col>
                    </el-form-item>
                    <el-form-item label="课程背景颜色:" prop="Coursebackgcolor" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <div style="display:flex">
                        <span class="demonstration">白底课程：</span>
                        <el-color-picker v-model="ruleForm.color_white" color-format='rgb' @active-change="changecolor" :predefine="predefineColors"></el-color-picker>
                        </div>
                        <div style="display: flex;position: absolute; top: 0%; left: 18%;">
                          <span class="demonstration">灰底课程：</span>
                        <el-color-picker v-model="ruleForm.color_black" color-format='rgb' @active-change="changecolor" :predefine="predefineColors"></el-color-picker>
                        </div>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="自定义底片:" prop="img" :label-width="formLabelWidth">
                      <el-col :span="22" v-if="this.setup != null">
                            <el-upload class="upload-demo" ref="upload" action=" " :on-change="uploadImg" :limit='1' :file-list="fileList" :on-exceed='uploadOverrun' :http-request='submitUpload2' :beforeUpload="beforeAvatarUpload" :auto-upload="true">
                              <img v-if="imageUrlss" :src="imageUrlss" class="avatar" style="width:130px;height:130px;">
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                              <div slot="tip" class="el-upload__tip" style="color:#DEB116;font-size: 14px;margin-top: -7px;">只能上传jpg/jpeg/png文件，且不超过4MB</div>
                            </el-upload>
                          </el-col>
                          <el-col :span="22" v-else>
                            <el-upload class="upload-demo" ref="upload" action=" " :on-change="uploadImg" :file-list="fileList" :limit='1' :on-exceed='uploadOverrun' :http-request='submitUpload2' :beforeUpload="beforeAvatarUpload" list-type="picture" :auto-upload="true">
                              <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
                              <div slot="tip" class="el-upload__tip" style="color:#DEB116;font-size: 14px;margin-top: -7px;">只能上传jpg/jpeg/png文件，且不超过4MB</div>
                            </el-upload>
                          </el-col>
                        </el-form-item>
                    <el-form-item label="备注说明:" prop="remake" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-input type="textarea" style="position: relative;" v-model.trim="ruleForm.remake" maxlength="1000" @input="descInput" placeholder="请输入汉字,字母,数字, 1000字以内"></el-input>
                        <span style="position: absolute;right: 10%;bottom: 24%;">{{remnant}}/1000</span>
                        <div style="color:#DEB116;font-size: 14px;">每段话结尾请使用“;”来分隔</div>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="特别提示:" prop="hot_tip" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-input type="textarea" style="position: relative;" v-model.trim="ruleForm.hot_tip" maxlength="300" @input="descInput2" placeholder="请输入汉字,字母,数字, 300字以内"></el-input>
                        <span style="position: absolute;right: 10%;bottom: 24%;">{{remnant2}}/300</span>
                        <div style="color:#DEB116;font-size: 14px;">每段话结尾请使用“;”来分隔</div>
                      </el-col>
                    </el-form-item>
                  <el-form-item class="dialog-footer">
                      <el-col :span="24" style="display: flex;justify-content: flex-end;">
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                      <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                      </el-col>
                  </el-form-item>
                  </el-form>
                </el-dialog>
            </template>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { requestLogin ,requestUrlDown} from "@/api/api";
import * as validate from "@/validate/Login";
import Fileupload4 from "@/components/fileupload4";
import Fileupload5 from "@/components/fileupload5";
import html2canvas from 'html2canvas';
export default {
  name: "downschedule",
  inject: ["reload"],
  components: {
    Fileupload4,
    Fileupload5
  },
  data() {
    return {
      img: "",
      pagesize: 10,
      imageUrl: "",
      imageUrlss: "",
      // urlsetup:"https://api.yijiayoga.com",
      urlsetup:"http://www.loelve.xyz",
      dataURL:"",
      blobImg:{},
      setup:"",
      loading: true,
      dialogFormVisible2:false,
      formLabelWidth: "130px",
      xianshi:false,
      chooseClub: "",
      fileList: [],
      file: "",
      setcolor:"",
      remnant:0,
      remnant2:0,
      file2:"",
      predefineColors:[
          'rgba(255, 69, 0, 1)',
          'rgba(255, 140, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(144, 238, 144, 1)',
          'rgba(0, 206, 209, 1)',
          'rgba(30, 144, 255, 1)',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'rgb(255,255,255)',
          'rgb(220,220,220)',
      ],
      ruleForm: {
        logo:"",//会馆logo
        remake:"",//备注说明
        hot_tip:"",//特别提示
        color_white:"rgb(255,255,255)",//课程背景颜色白
        color_black:"rgb(220,220,220)",//课程背景颜色灰
        img:"",//自定义底片
      },
      rules: {
        // Clubhouselogo: { required: true, message: '请输入处理结果', trigger: 'blur' }
      },
    };
  },
  mounted(){
    this.gettabledata();
  },
  created(){
    this.gettabledates();
  },
  methods: {
    uploadImg(file) {
      this.imgfile = file.raw;
      this.imageUrlss = URL.createObjectURL(file.raw);
    },
    gettabledata() {
      this.loading = true;
      requestUrlDown("/download/courseTable/"+this.$route.query.huisuoid +"/"+this.$route.query.zhouyi, {}, "get")
        .then(res => {
          if(res.data != null){
            this.loading = false;
            var blob = new Blob([res.data],{type: 'application/octet-stream'});
            let url = window.URL.createObjectURL(blob);
            this.img = url;
            this.xianshi = false;
          }else{
            this.xianshi = true;
          }
        })
        .catch(error => {
          this.loading = false;
          let { response: { data: { errorCode, msg }}} = error;
          if (errorCode != 0) {
            this.$message({
              message: '对不起,请先完成下载设置',
              type: "error"
            });
            return;
          }
        });
    },
    gettabledates() {
      let _this = this;
      requestLogin("/download/getSetUp", {}, "get")
        .then(res => {
          _this.setup = res;
          _this.ruleForm.color_white = _this.setup.color_white;
          _this.ruleForm.color_black = _this.setup.color_black;
          _this.imageUrlss = _this.urlsetup + _this.setup.img;
          _this.imageUrl = _this.urlsetup + _this.setup.logo;
          _this.ruleForm.remake = _this.setup.remake;
          _this.ruleForm.hot_tip = _this.setup.hot_tip;
          _this.remnant = _this.setup.remake.length;
          _this.remnant2 = _this.setup.hot_tip.length;
        })
        .catch(error => {
          let { response: { data: { errorCode, msg }}} = error;
          if (errorCode != 0) {
            this.$message({
              message: msg,
              type: "error"
            });
            return;
          }
        });
    },
    //下载课程表图片
     downbtn(){
        let link = document.createElement("a");
        link.style.display = 'none';
        link.href = this.img;
        link.setAttribute('download','课程表图片.png')
        document.body.appendChild(link);
        link.click();
    },
     submitUpload2: function(content) {
      this.file2 = content.file;
    },
     clearBlobImg(){
      this.blobImg = {};
    },
    changeUserIcon() {
      this.$refs.fileUpload.openFile();
    },
    setBlobImg(val){
      let {fileImg, formData, fileName, data2file} = val
      this.blobImg = {
        src:URL.createObjectURL(fileImg),
        name: fileName
      }
      this.file = data2file
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传1张图片!"
      });
    },
     beforeAvatarUpload(file) {
      var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)                 
      const extension = testmsg === 'jpg'  
      const extension2 = testmsg === 'png'  
      const extension3 = testmsg === 'jpeg'
      const isLt2M = file.size / 1024 / 1024 < 4  
      if(!extension && !extension2 && !extension3) {  
          this.$message({  
              message: '上传图片只能是 jpg、png、jpeg格式!',  
              type: 'warning'  
          });  
      }  
      if(!isLt2M) {  
          this.$message({  
              message: '上传图片大小不能超过 4MB!',  
              type: 'warning'  
          });  
      }  return extension || extension2 || extension3 && isLt2M  
    },
    descInput() {
      var txtVal = this.ruleForm.remake.length;
      this.remnant = txtVal;
      if(this.ruleForm.remake.length > 1000){
         this.$message({
            message: "请输入1000以内的字",
            type: "warning"
          });
      }
    },
    descInput2() {
      var txtVal = this.ruleForm.hot_tip.length;
      this.remnant2 = txtVal;
      if(this.ruleForm.hot_tip.length > 300){
         this.$message({
            message: "请输入300以内的字",
            type: "warning"
          });
      }
    },
   submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let formData = new FormData();
            formData.append("remake", _this.ruleForm.remake); //备注
            formData.append("hot_tip", _this.ruleForm.hot_tip); //特别提示
            formData.append("color_white", _this.ruleForm.color_white); //白底
            formData.append("color_black", _this.ruleForm.color_black); //灰底
            formData.append("logo", _this.file); //会馆logo
            formData.append("img", _this.file2); //自定义底片
            requestLogin(
              "/download/setUp",
              formData,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                _this.dialogFormVisible2 = false;
                _this.reload();
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
    changecolor(val){
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>

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
  display: inline-block;
  .practice-center {
    height: 80px;
    margin-top: -10px;
    .purple {
      height: 80px;
      display: flex;
      justify-content: flex-start;
      .add {
        height: 35px;
        margin-top: 20px;
        margin-right: 27px;
        margin-left: 10px;
      }
      .add2 {
        height: 35px;
        margin-top: 20px;
        margin-right: 27px;
        margin-left: 10px;
      }
    }
  }
  .practice-table {
     .downmain{
      text-align: left;
      margin-left: 20px;
      margin-top: 10px;
      margin-bottom: 20px;
      .downmain-span{
        font-size: 16px;
      }
    }
    .downimg{
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .downbtn{
        display: inline-block;
        margin-bottom: 20px;
        margin-top: 20px;
        .download2{
          height: 35px;
          font-size: 14px;
          border: 1px solid #00bc6a;
          background: #00bc6a;
          color: #fff;
          width: 115px;
          margin: 0 auto;
          border-radius: 10px;
          padding: 12px;
        }
      }
    .el-button--text {
      color: #00bc71;
    }
    .block {
      float: right;
      margin-top: 10px;
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
  }
}
</style>