<template>
<div>
<el-row>
    <el-col :span="24">
    <div class="practice-main">
        <el-col :span="23" class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>经营管理</el-breadcrumb-item>
            <el-breadcrumb-item>排班管理</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>
        <el-col :span="23" class="weber">
            <span class="weber-span">排班管理</span>
        </el-col>
    </div>
    </el-col>
</el-row>
<div class="practice-list">
    <div class="practice-table">
        <el-row>
            <el-col :span="24">
                <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                    <el-tab-pane label="前台排班表" name="foreground">
                        <template v-if="activeName === 'foreground'">
                         <Foreground></Foreground>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="教练排班表" name="trainarrange">
                        <template v-if="activeName === 'trainarrange'">
                            <Trainarrange></Trainarrange>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="班次设置"  name="shiftsetup">
                        <template v-if="activeName === 'shiftsetup'">
                            <Shiftsetup></Shiftsetup>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
           </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import Foreground from "@/components/foreground";
import Trainarrange from "@/components/trainarrange";
import Shiftsetup from "@/components/shiftsetup";
export default {
     name:'arrangemage',
    components: {
      Foreground,
      Trainarrange,
      Shiftsetup
    },
  data() {
    return {
        activeName: 'foreground',
    };
  },
  methods:{
       handleClick(tab, event) {
      },
  }
};
</script>
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
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  display: inline-block;
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
    height: 80px;
    .purple {
      height: 80px;
      display: flex;
      justify-content: flex-start;
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
          font-size: 16px;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
        }
        .add-p {
          color: #00bc71;
          margin-top: 9px;
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
        p {
          color: #ff2366;
          font-size: 16px;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
        }
      }
    }
  }
  .practice-table {
      .add{
        border: 1px solid #00bc71;
        width: 120px;
        height: 32px;
        border-radius: 4px;
        line-height: 0px;
        margin-top: 10px;
        margin-left: 30px;
        p {
          color: #00bc71;
          font-size: 16px;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
        }
      }
      .handback{
          margin-top: 20px;
          .hand-left{
              height:100%;
              .left-table{
                width: 575px;
                height: 100%;
                border: solid 1px #e8e8e8;
                margin-left: 30px;
                .left-table-main{
                    height: 50px;
                    margin-top: 1px;
                .table-hh{
                    height: 50px;
                    line-height: 50px;
                    text-align: left;
                    text-indent: 20px;
                    background: #EDFAF5;
                    span{
                        color: #262626;
                        font-size: 14px;
                    }
                }
                .table-gg{
                    height: 50px;
                    line-height: 50px;
                    text-align: left;
                    text-indent: 20px;
                    span{
                        color: #262626;
                        font-size: 14px;
                    }
                    .gg-span{
                        color: #23c585;
                    }
                }
              }
              }
          }
          .hand-right{
              height:100%;
              margin-top: 2%;
              .upload{
               width: 270px;
                height: 150px;
             }
          }
      }
  }
}
</style>
