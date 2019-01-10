<template>
  <div>
    <!--体验客户主页-->
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>客户管理</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/Customer/practice' }">体验客户管理</el-breadcrumb-item>
              <el-breadcrumb-item>体验客户主页</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <el-col :span="10" class="weber-left">
              <div class="weber-span">体验客户·{{this.exName}}·{{this.exSex}}</div>
              <div class="weber-p">会籍顾问:{{this.exHjgwName}}
                <span class="weber-pp">电话:{{this.exTel}}</span>
              </div>
            </el-col>
            <el-col :span="14" class="weber-right">
              <div class="right-span">
                <router-link :to="{name:'Information2',params:{id:this.id}}" class="link">综合信息 </router-link>
              </div>
              <div class="border"></div>
              <div class="right-span">
                <el-button type="text" class="link" @click="dialogFormVisible = true">办卡</el-button>
                <template>
                  <el-dialog title="添加会员" :append-to-body="true" :visible.sync="dialogFormVisible">
                    <Addmember :huiyuanqufen='Huiyuanqufen'></Addmember>
                  </el-dialog>
                </template>
              </div>
              <div class="border"></div>
              <div class="right-span">
                <router-link :to="{name:'Nocards',params:{id:this.id}}" class="link">不办卡</router-link>
              </div>
              <div class="border"></div>
              <div class="right-span">
                <el-button type="text" class="link" @click="dialogFormVisible2 = true">交定金</el-button>
                <template>
                  <el-dialog title="添加定金客户" :append-to-body="true" :visible.sync="dialogFormVisible2">
                    <Addbargain :dingjinqufen='Dingjinqufen'></Addbargain>
                  </el-dialog>
                </template>
              </div>
              <div class="border"></div>
              <div class="right-span">
                <el-button type="text" class="link" @click="dialogFormVisible3 = true">换会籍</el-button>
                <template>
                  <el-dialog title="换会籍" :append-to-body="true" :visible.sync="dialogFormVisible3">
                    <Change :potential="Potential"></Change>
                  </el-dialog>
                </template>
              </div>
              <div class="border"></div>
              <div class="right-span">
                <router-link :to="{name:'Classcard',params:{id:this.id}}" class="link">上课记录</router-link>
              </div>
            </el-col>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>
<script>
import Addmember from "@/components/addmember";
import Addbargain from "@/components/addbargain";
import Change from "@/components/change";
export default {
  name: "experiencehome",
  inject: ["reload"],
  components: {
    Addmember,
    Addbargain,
    Change
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      Potential: {
        potential: "setExperienceCustomer",
        id: this.$route.params.id
      },
      Huiyuanqufen: {
        huiyuanqufen: "experience",
        id: this.$route.params.id,
        name: this.$route.params.exName,
        sex: this.$route.params.exSex,
        tel: this.$route.params.exTel,
        wechat: this.$route.params.exWeChat,
        ygxxnameid: this.$route.params.exHjgwId,
        ygxxname: this.$route.params.exHjgwName
      },
      Dingjinqufen: {
        dingjinqufen: "experience",
        id: this.$route.params.id,
        name: this.$route.params.exName,
        sex: this.$route.params.exSex,
        tel: this.$route.params.exTel,
        wechat: this.$route.params.exWeChat,
        ygxxnameid: this.$route.params.exHjgwId,
        ygxxname: this.$route.params.exHjgwName
      },
      id: "",
      exHjgwName: "",
      exHjgwId: "",
      exName: "",
      exTel: "",
      exSex: "",
      exWeChat: ""
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.exHjgwName = this.$route.params.exHjgwName;
    this.exName = this.$route.params.exName;
    this.exTel = this.$route.params.exTel;
    this.exSex = this.$route.params.exSex;
    this.exWeChat = this.$route.params.exWeChat;
    this.exHjgwId = this.$route.params.exHjgwId;
  },
  methods: {
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
        font-size: 15px !important;
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
        margin-right: 4px !important;
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
        margin-right: 10px;
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
        margin-right: 10px;
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
        margin-right: 10px;
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
          width: 15px !important;
          height: 15px !important;
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
        font-size: 16px !important;
        font-weight: normal;
        font-stretch: normal;
        color: #595959;
        margin-right: 10px !important;
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
        margin-right: 10px;
      }
    }
  }
}
</style>