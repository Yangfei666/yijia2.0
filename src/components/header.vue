<template>
  <!--头部-->
  <div class="header">
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <!--展开折叠开关-->
        <div class="apply" @click="changeCollasped">
          <img class="apply-img" :src="applyimg" v-show="downIcon" />
          <img class="apply-img" :src="applyimg2" v-show="!downIcon" />
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple-light">
        <div class="inner">
          <el-col :span="12" v-if="options" class="inner-select" style="display: flex;justify-content: flex-end;">
            <el-select v-model="club.Hsxx_Hsid" @change="changeValue" :placeholder="club.Hsxx_Name" style="width:200px">
              <el-option v-for="item in options" :key="item.Hsxx_Hsid" :label="item.Hsxx_Name" :value="item.Hsxx_Hsid" style="width:100%;height:100%"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12" v-else class="inner-select" style="display: flex;justify-content: flex-end;">
            {{club.Hsxx_Name}}
          </el-col>
          <el-col :span="12">
            <div class="userinfo-inner">
              <div style="margin-right:-7px;margin-top:12px"><img :src="user.Photo" /></div>
              <router-link to="/House/feedback" style="text-decoration: none;color: #333;width: 55px;" @click.native="untreated">
              <el-badge :value="todo" :max="99" class="item" v-if="todo>0"></el-badge>
              <el-badge class="item" v-else></el-badge>
              </router-link>
                <span class="name">{{user.YGXX_NAME}}</span>
              <span class="tuichu">
                <el-dropdown trigger="click">
                  <i class="el-icon-arrow-down el-icon-setting"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <router-link to="/House/individualcenter" style="text-decoration: none;color: #333;">个人中心</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
          </el-col>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import { requestLogin } from "../api/api";
// import Bus from "@/common/eventBus";
export default {
  inject: ["reload"],
  // components:{
  //   Bus
  // },
  data() {
    return {
      downIcon: true,
      collapsed: false,
      todo:JSON.parse(sessionStorage.getItem('untreated')),
      input21: "",
      applyimg: require("@/assets/apply.png"), //图片地址
      applyimg2: require("@/assets/classify.png"), //图片地址
      sysUserName: "",
      sysUserAvatar: "",
      options: JSON.parse(sessionStorage.getItem("clubList")),
      user: JSON.parse(sessionStorage.getItem("userInfo")),
      club: JSON.parse(sessionStorage.getItem("club"))
    };
  },
  // created() {
  //   setTimeout(()=>{
  //     this.getUser();
  //   },500)
  // },
  // created(){
  //   Bus.$on('changeClub',clubID=>{
  //     this.club.Hsxx_Hsid = clubID;
  //   })
  // },
  created() {
    setTimeout(()=>{
      this.todo = JSON.parse(sessionStorage.getItem('untreated'));
    },500)
  },
  methods: {
    //获取个人资料
    getUser() {
      let _this = this;
      requestLogin("/PersonalCenter", {}, "get")
        .then(function(res) {
          _this.user = res;
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
    // 切换门店
    changeValue() {
      requestLogin("/againGetToken/" + this.club.Hsxx_Hsid)
        .then(data => {
          sessionStorage.setItem("access-token", data); //换成新门店的token
          this.options.forEach(item => {
            if (item.Hsxx_Hsid == this.club.Hsxx_Hsid) {
              sessionStorage.setItem("club", JSON.stringify(item)); //缓存所属门店
            }
          });
          this.reload();
          // this.$router.go(0);
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
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      }).then(() => {
        requestLogin("/exitLogin", {}, "get")
          .then(data => {
            sessionStorage.removeItem("access-token");
            sessionStorage.removeItem("clubList");
            _this.$router.push("/login");
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
    },
    changeCollasped() {
      this.downIcon = !this.downIcon;
      this.collapsed = !this.collapsed;
      this.$emit("changeCollapsed", this.collapsed);
    },
    untreated(){
      this.todo = 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  margin-top: -20px;
  margin-right: 40px;
}
.header {
  height: 100%;
  .el-col-12 {
    width: 50%;
    height: 100%;
    .bg-purple {
      background: #fff;
    }
    .bg-purple-light {
      background: #fff;
    }
    .grid-content {
      border-radius: 1px;
      min-height: 36px;
      height: 100%;
      display: flex;
      position: relative;
      .apply {
        width: 50px;
        .apply-img {
          width: 20px;
          height: 20px;
          display: inline-block;
          margin: 0px auto;
          margin-top: 20px;
        }
      }
      .inner {
        position: absolute;
        right: 5%;
        top: 0px;
        height: 62px;
        line-height: 62px;
        width: 100%;
        .userinfo-inner {
          display: flex;
          justify-content: flex-end;
          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin-top: 5%;
            margin-right: 7%;
          }
          h5 {
            float: left;
            margin-left: 10px;
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 10px;
            letter-spacing: 0px;
            color: #262626;
          }
          .name {
            margin-right: 16%;
          }
          .tuichu {
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #333;
          }
          .link {
            text-decoration: none;
            color: #333;
          }
        }
      }
    }
  }
}
.el-col {
  border-radius: 1px;
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .header {
    height: 100%;
    .el-col-12 {
      width: 50%;
      height: 100%;
      .grid-content {
        border-radius: 1px;
        min-height: 36px;
        height: 100%;
        display: flex;
        position: relative;
        .inner {
          position: absolute;
          right: 5%;
          top: 0px;
          height: 62px;
          line-height: 62px;
          width: 100%;
          .inner-select {
            display: flex !important;
            justify-content: center !important;
          }
          .userinfo-inner {
            display: flex;
            justify-content: flex-end;
            img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              margin-top: 9%;
              margin-right: 7%;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 992px) and (max-width: 1280px) {
  .header {
    height: 100%;
    .el-col-12 {
      width: 50%;
      height: 100%;
      .grid-content {
        border-radius: 1px;
        min-height: 36px;
        height: 100%;
        display: flex;
        position: relative;
        .inner {
          position: absolute;
          right: 5%;
          top: 0px;
          height: 62px;
          line-height: 62px;
          width: 100%;
          .inner-select {
            display: flex !important;
            justify-content: flex-end !important;
          }
          .userinfo-inner {
            display: flex;
            justify-content: flex-end;
            img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              margin-top: 7%;
              margin-right: 7%;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1440px) {
  .header {
    height: 100%;
    .el-col-12 {
      width: 50%;
      height: 100%;
      .grid-content {
        border-radius: 1px;
        min-height: 36px;
        height: 100%;
        display: flex;
        position: relative;
        .inner {
          position: absolute;
          right: 5%;
          top: 0px;
          height: 62px;
          line-height: 62px;
          width: 100%;
          .inner-select {
            display: flex !important;
            justify-content: flex-end !important;
          }
          .userinfo-inner {
            display: flex;
            justify-content: flex-end;
            img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              margin-top: 6%;
              margin-right: 7%;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1440px) and (max-width: 1920px) {
  .header {
    height: 100%;
    .el-col-12 {
      width: 50%;
      height: 100%;
      .grid-content {
        border-radius: 1px;
        min-height: 36px;
        height: 100%;
        display: flex;
        position: relative;
        .inner {
          position: absolute;
          right: 5%;
          top: 0px;
          height: 62px;
          line-height: 62px;
          width: 100%;
          .inner-select {
            display: flex !important;
            justify-content: flex-end !important;
          }
          .userinfo-inner {
            display: flex;
            justify-content: flex-end;
            img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              margin-top: 4%;
              margin-right: 7%;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1920px) and (max-width: 2048px) {
  .header {
    height: 100%;
    .el-col-12 {
      width: 50%;
      height: 100%;
      .grid-content {
        border-radius: 1px;
        min-height: 36px;
        height: 100%;
        display: flex;
        position: relative;
        .inner {
          position: absolute;
          right: 5%;
          top: 0px;
          height: 62px;
          line-height: 62px;
          width: 100%;
          .inner-select {
            display: flex !important;
            justify-content: flex-end !important;
            .el-select {
              width: 170px !important;
            }
          }
          .userinfo-inner {
            display: flex;
            justify-content: flex-end;
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-top: 3%;
              margin-right: 7%;
            }
            .name {
              font-size: 18px !important;
            }
          }
        }
      }
    }
  }
}
</style>
