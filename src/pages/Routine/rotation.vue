<template>
<div>
<el-row>
    <el-col :span="24">
    <div class="practice-main">
        <el-col :span="23" class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>小程序管理</el-breadcrumb-item>
            <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>
        <el-col :span="23" class="weber">
            <span class="weber-span">轮播图管理</span>
        </el-col>
    </div>
    </el-col>
</el-row>
<div class="practice-list">
    <div class="practice-center">
        <el-row>
            <el-col :span="24">
                <div class="purple">
                    <div class="add">
                        <el-button type="text" class="add-p el-icon-plus" @click="addOne">添加轮播图</el-button>
                    </div>
                    <div class="add2">
                        <el-button type="text" class="p" @click="open2">删除轮播图</el-button>
                    </div>
                </div>
                </el-col>
        </el-row>
    </div>
    <div class="practice-table">
            <div class="upload-main">
                <div class="upload" v-for="(item, index) in objects" :key='item.index'>
                    <el-col :span="24">
                    <el-upload class="upload-demo" drag :action="importFileUrl" 
                                :data="upLoadData" 
                                name="importfile" 
                                multiple 
                                :onError="uploadError" 
                                :onSuccess="uploadSuccess" 
                                :beforeUpload="beforeAvatarUpload" >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">{{item.aa}}</div>
                        <div class="el-upload__tip" slot="tip"><em style="color:#fe0000">*</em>{{item.bb}}{{index}}</div>
                    </el-upload>
                    </el-col>
                </div>
             </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'rotation',
  data() {
    return {
        importFileUrl: 'http:dtc.com/cpy/add',
      upLoadData: {
        cpyId: '123456', 
        occurTime: '2017-08'
    },
    objects:[
        {
            aa:'点击或拖入',
            bb:'小程序轮播图'
        },
        {
            aa:'点击或拖入',
            bb:'小程序轮播图'
        },
        {
            aa:'点击或拖入',
            bb:'小程序轮播图'
        },
        {
            aa:'点击或拖入',
            bb:'小程序轮播图'
        },
        {
            aa:'点击或拖入',
            bb:'小程序轮播图'
        },
        {
            aa:'点击或拖入',
            bb:'小程序轮播图'
        },
        {
            aa:'点击或拖入',
            bb:'小程序轮播图'
        },
        {
            aa:'点击或拖入',
            bb:'小程序轮播图'
        },
    ]
    };
  },
  methods:{
      handleClick3(row){
          console.log(row);
          alert('点击了');
      },
        onSubmit() {
        console.log('submit!');
      },
      addOne(){
          this.objects.push({
            aa:'点击或拖入',
            bb:'小程序轮播图'
          });
        },
      // 上传成功后的回调
    uploadSuccess (response, file, fileList) {
      console.log('上传文件', response)
    },
    // 上传错误
    uploadError (response, file, fileList) {
      console.log('上传失败，请重试！')
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload (file) {
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      const extension3 = file.name.split('.')[1] === 'doc'
      const extension4 = file.name.split('.')[1] === 'docx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2 && !extension3 && !extension4) {
        console.log('上传模板只能是 xls、xlsx、doc、docx 格式!')
      }
      if (!isLt2M) {
        console.log('上传模板大小不能超过 10MB!')
      }
      return extension || extension2 || extension3 || extension4 && isLt2M
    },
       open2() {
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.objects = this.objects.slice(1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          }); 
        });
      }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/rotation.scss';
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
  display:inline-block;
  .quanbu{
    display: block;
    height:60px;
  .search-form{
      height: 45px;
    display: flex;
    float: left;
     margin: 15px 0px auto;
        .el-button--primary{
            background-color: #00bc71;
            border-color: #00bc71;
        }
  }
  .el-input__inner{
      height: 37px;
  }
  .el-input{
      height: 37px;
  }
}
  .practice-center {
    height: 70px;
    .purple {
      height: 70px;
      display: flex;
      justify-content: flex-start;
      width: 50%;
      .add {
        border: 1px solid #00bc71;
        width: 20%;
        height: 35px;
        border-radius: 4px;
        line-height: 2px;
        margin-top: 20px;
        margin-left: 20px;
        p {
          color: #00bc71;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 0px;
        }
        .add-p {
          color: #00bc71;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 9px;
        }
      }
      .add2{
        border: 1px solid #ff2366;
        width: 20%;
        height: 35px;
        border-radius: 4px;
        line-height: 2px;
        margin-top: 20px;
        margin-left: 20px;
        .p {
          color: #ff2366;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 9px;
        }
      }
    }
  }
  .practice-table {
      margin: 0px 0px auto;
      .upload-main{
          width: 100%;
         .upload{
                width: 25%;
                float: left;
                margin:10px auto;
          }
      }
    
  }
}
</style>