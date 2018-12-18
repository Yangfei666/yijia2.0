<template>
<div>
  <!--体验客户跟进-->
    <el-row>
    <el-col :span="24">
    <div class="practice-main">
        <el-col :span="23" class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/Customer/practice' }">体验客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>体验客户跟进</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>
        <el-col :span="23" class="weber">
            <span class="weber-span">{{this.Name}}·{{this.Sex}}</span>
            <el-col :span="10" class="weber-right">
              <div class="right-span">
                 <router-link :to="{path:'/Customer/tastefollowup/healthsurvey',query:{id:this.id,Name:this.Name,Sex:this.Sex,potential:this.Potential}}" class="link">健康调查表</router-link>
              </div>
              <div class="border"></div>
              <div class="right-span">
                 <router-link :to="{path:'/Customer/tastefollowup/staminaevaluating',query:{id:this.id,Name:this.Name,Sex:this.Sex,potential:this.Potential}}" class="link">体能评估</router-link>
              </div>
              <div class="border"></div>
              <div class="right-span">
                 <router-link :to="{path:'/Customer/tastefollowup/postureevaluating',query:{id:this.id,Name:this.Name,Sex:this.Sex,potential:this.Potential}}" class="link">体态评估</router-link>
              </div>
            </el-col>
        </el-col>
    </div>
    </el-col>
</el-row>
  <router-view></router-view>
</div>
</template>
<script>
export default {
  name:'tastefollowup',
    data() {
    return {
      id:"",
      Name:"",
      Sex:"",
      Potential:'experience',
    }
  },
  created(){
    this.id = this.$route.query.id;
    this.Name = this.$route.query.Name;
    this.Sex = this.$route.query.Sex;
    this.Potential = 'experience';
  }
}
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
    justify-content: space-between;
    .weber-span {
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      font-family: PingFang-SC-Regular;
    }
    .weber-right{
      display: flex;
      justify-content: flex-end;
      .right-span{
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 10px;
        .link{
            text-decoration: none;
            font-size: 16px;
            color: #595959;
        }
        .router-link-active{
        color: #00bc71;
        font-size: 16px;
         }
      }
      .border{
            width:1px;
            height: 30%;
            background: #d9d9d9;
            float: right;
            position: relative;
            top:35%;
            border-radius: 5px;
             margin-right: 10px;
      }
    }
  }
}
@media screen and (min-width: 768px)and (max-width: 992px){
 .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 18px!important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 12px!important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 7px!important;
        .link{
            text-decoration: none;
            font-size: 12px!important;
            color: #595959;
        }
        .router-link-active{
        color: #00bc71;
        font-size: 12px!important;
         }
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
  }
}
@media screen and (min-width: 992px)and (max-width: 1280px){
.weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 18px!important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 14px!important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 7px!important;
        .link{
            text-decoration: none;
            font-size: 14px!important;
            color: #595959;
        }
        .router-link-active{
        color: #00bc71;
        font-size: 14px!important;
         }
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
  }
}
@media screen and (min-width: 1280px)and (max-width: 1440px){
 .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 20px!important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 16px!important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 7px!important;
        .link{
            text-decoration: none;
            font-size: 16px!important;
            color: #595959;
        }
        .router-link-active{
        color: #00bc71;
        font-size: 16px!important;
         }
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
  }
}
@media screen and (min-width: 1440px)and (max-width: 1920px){
  .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 20px!important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 18px!important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 7px!important;
        .link{
            text-decoration: none;
            font-size: 18px!important;
            color: #595959;
        }
        .router-link-active{
        color: #00bc71;
        font-size: 18px!important;
         }
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
  }
}
</style>
