<template>
  <div>
    <!--会员主页-->
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>客户管理</el-breadcrumb-item>
              <el-breadcrumb-item>会员客户管理</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/Customer/leaguer/leaguermanage' }">会员管理</el-breadcrumb-item>
              <el-breadcrumb-item>会员主页</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <el-col :span="1" class="weber-img">
              <img :src="club.Photo" />
            </el-col>
            <el-col :span="10" class="weber-left">
              <span class="weber-span">{{club.HYName}}·{{club.Sex}}</span>
              <p class="weber-p">会籍顾问:{{this.YGXX_NAME}}
                <span class="weber-pp">电话:{{club.MotoTel}}</span>
              </p>
            </el-col>
            <el-col :span="12" class="weber-right">
              <div class="right-span">
                <router-link :to="{name:'Information',params:{HYID:this.HYID}}" class="link" exact>综合信息</router-link>
              </div>
              <div class="border"></div>
              <div class="right-span">
                <router-link :to="{name:'Leave',params:{HYID:this.HYID}}" class="link" exact>请假/销假</router-link>
              </div>
              <div class="border"></div>
              <div class="right-span">
                <router-link :to="{name:'Unhook',params:{HYID:this.HYID}}" class="link" exact>挂失/解挂/补卡</router-link>
              </div>
              <div class="border"></div>
              <div class="right-span">
                <el-button type="text" class="add-p link" @click="dialogFormVisible = true">换会籍</el-button>
                <template>
                  <el-dialog title="换会籍" :append-to-body="true" :visible.sync="dialogFormVisible">
                    <Change :potential="Potential"></Change>
                  </el-dialog>
                </template>
              </div>
              <div class="border"></div>
              <div class="right-span">
                <router-link :to="{name:'Operationnote',params:{HYID:this.HYID}}" class="link" exact>操作记录</router-link>
              </div>
              <div class="border"></div>
              <div class="right-span">
                <router-link :to="{name:'Classcard2',params:{HYID:this.HYID}}" class="link" exact>上课记录</router-link>
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
import { requestLogin } from "@/api/api";
import Change from "@/components/change";
export default {
  name: "membershiphome",
  components: {
    Change
  },
  data() {
    return {
      dialogFormVisible: false,
      Potential: {
        potential: "setDesignateMember",
        id: this.$route.params.HYID
      },
      club: "",
      YGXX_NAME: "",
      HYName: "",
      HYID: "",
      MotoTel: ""
    };
  },
  created() {
    setTimeout(() => {
      this.getexperhome();
    }, 500);
    this.YGXX_NAME = this.$route.params.YGXX_NAME;
    this.HYID = this.$route.params.HYID;
    this.HYName = this.$route.params.HYName;
    this.MotoTel = this.$route.params.MotoTel;
  },
  methods: {
    //获取个人中心详情
    getexperhome() {
      let _this = this;
      // console.log(this.$route);
      // console.log(this.$route.params.HYID);
      requestLogin("/setMemberCustomers/" + this.$route.params.HYID, {}, "get")
        .then(function(res) {
          _this.club = res;
          // console.log(res);
        })
        .catch(error => {
          if (error.res) {
            this.$message({
              message: "获取数据失败",
              type: "error"
            });
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.practice-main {
  height: 140px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  .breadcrumb {
    margin: 17px 20px auto;
  }
  .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 15px;
          height: 15px;
          padding-left: 5px;
        }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 10px;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 16px;
          color: #595959;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 16px;
        }
      }
      .is-active {
        color: #00bc71;
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
@media screen and (min-width: 768px) and (max-width: 992px) {
  .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-img {
      width: 50px !important;
      height: 50px !important;
      border-radius: 50%;
      margin-top: 2% !important;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 18px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 12px !important;
          height: 12px !important;
          padding-left: 5px;
        }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 12px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 0px !important;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 12px !important;
          color: #595959;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 12px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 2px !important;
      }
    }
  }
}
@media screen and (min-width: 992px) and (max-width: 1280px) {
  .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-img {
      width: 60px !important;
      height: 60px !important;
      border-radius: 50%;
      margin-top: 1% !important;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 18px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 12px !important;
          height: 12px !important;
          padding-left: 5px;
        }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 12px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 7px !important;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 12px !important;
          color: #595959;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 12px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 5px !important;
      }
    }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1440px) {
  .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-img {
      width: 65px !important;
      height: 65px !important;
      border-radius: 50%;
      margin-top: 0% !important;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 18px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 12px !important;
          height: 12px !important;
          padding-left: 5px;
        }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 14px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 7px !important;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 14px !important;
          color: #595959;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 14px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px !important;
      }
    }
  }
}
@media screen and (min-width: 1440px) and (max-width: 1920px) {
  .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-img {
      width: 72px !important;
      height: 72px !important;
      border-radius: 50%;
      margin-top: 0% !important;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 20px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 12px !important;
          height: 12px !important;
          padding-left: 5px;
        }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 7px !important;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 16px !important;
          color: #595959;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 16px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px !important;
      }
    }
  }
}
@media screen and (min-width: 1920px) and (max-width: 2048px) {
  .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content: space-between;
    .weber-img {
      width: 72px !important;
      height: 72px !important;
      border-radius: 50%;
      margin-top: 0% !important;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .weber-left {
      display: inline-grid;
      .weber-span {
        font-size: 22px !important;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 12px !important;
          height: 12px !important;
          padding-left: 5px;
        }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 18px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
    .weber-right {
      display: flex;
      justify-content: flex-end;
      .right-span {
        font-family: PingFang-SC-Regular;
        font-size: 18px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 7px !important;
        margin-top: 16px;
        .link {
          text-decoration: none;
          font-size: 18px !important;
          color: #595959;
        }
        .router-link-active {
          color: #00bc71;
          font-size: 18px !important;
        }
      }
      .is-active {
        color: #00bc71;
      }
      .border {
        width: 1px;
        height: 25%;
        background: #d9d9d9;
        float: right;
        position: relative;
        top: 60%;
        border-radius: 5px;
        margin-right: 10px !important;
      }
    }
  }
}
</style>
