<template>
  <!--侧边栏-->
  <div class="left">
    <div class="left-head" v-show="!collapsed">
      <img class="mm" src="../assets/logo.png" />
      <span class="pp">易伽瑜伽</span>
    </div>
    <div class="left-center" v-show="!collapsed">
      <div class="cen-one">
        <div class="one-img">
          <img src="../assets/51.png" @click="personal"/>
        </div>
        <el-button type="text" class="one-p" @click="personal">约私教</el-button>
      </div>
      <div class="cen-two">
        <div class="two-img">
          <img src="../assets/49.png" @click="Group"/>
        </div>
        <el-button type="text" class="two-p" @click="Group">约团课</el-button>
      </div>
    </div>
    <div class="left-head" v-show="collapsed">
      <img class="mm" src="../assets/logo.png" />
    </div>
    <div v-show="collapsed" class="collapsed-icon">
      <img src="../assets/51.png" alt="约私教" title="约私教" @click="personal"/>
      <img src="../assets/49.png" alt="约团课" title="约团课" @click="Group"/>
    </div>
    <el-row class="tac">
      <el-col :span="12"> 
        <el-menu :default-active="defaultActiveIndex" unique-opened router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="collapsed" @select="handleSelect" background-color="#323844" text-color="#fff" active-text-color="#fff">
          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <el-submenu v-if="!item.leaf" :index="index + ''" v-bind:key="item.index">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow &&(term.name != '会员客户管理')&&(term.name != '可视化数表')" :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i>
                <span slot="title">{{term.name}}</span>
              </el-menu-item>
              <el-submenu v-else-if="term.menuShow&&((term.name=='会员客户管理')||(term.name == '可视化数表'))" :index="term.path">
                <template slot="title">{{term.name}}</template>
                <el-menu-item v-for="(i,index) in term.children" :key="index" :index="i.path">
                  {{i.name}}
                </el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf && item.children && item.children.length" :index="item.children[0].path" v-bind:key="item.index" :class="$route.path == item.children[0].path?'is-active':''">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Personal from "../components/personal";
import Group from "../components/group";
export default {
  props: ["collapsed"],
  components: {
    Personal,
    Group
  },
  data() {
    return {
      defaultActiveIndex: "0",
      dialogFormVisible: false,
      dialogFormVisible2: false
    };
  },
  methods: {
    personal(){
      this.$router.push("/Curriculum/privateculum");
    },
    Group(){
      this.$router.push("/Curriculum/group");
    },
    handleSelect(index) {
      this.defaultActiveIndex = index;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
.left {
  .left-head {
    width: 100%;
    height: 62px;
    background: #323844;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.35);
    position: relative;
    .pp {
      font-family: PingFang-SC-Bold;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 62px;
      letter-spacing: 1px;
      color: #56e79e;
      // margin-left: 68px;
      position: absolute;
      left: 33%;
    }
    .mm {
      width: 32px;
      height: 32px;
      position: absolute;
      top: 23%;
      left: 15%;
    }
  }
  .left-center {
    height: 80px;
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .cen-one {
      width: 49%;
      height: 100%;
      background: #395b56;
      .one-img {
        width: 32px;
        height: 32px;
        margin: 0 auto;
        margin-top: 10px;
        img {
          width: 32px;
          height: 32px;
          display: block;
        }
      }
      .one-p {
        font-family: PingFang-SC-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #56e79e;
        text-align: center;
        width: 100%;
      }
    }
    .cen-two {
      width: 49%;
      height: 100%;
      background: #395b56;
      .two-img {
        width: 32px;
        height: 32px;
        margin: 0 auto;
        margin-top: 10px;
        img {
          width: 32px;
          height: 27px;
          display: block;
        }
      }
      .two-p {
        font-family: PingFang-SC-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 10px;
        letter-spacing: 0px;
        color: #56e79e;
        text-align: center;
        width: 100%;
      }
    }
  }
  .collapsed-icon{
    img{
      display: block;
      margin: 30% auto;
    }
  }
  .tac {
    margin-top: 20px;
    .el-col-12 {
      width: 100%;
      .el-menu {
        border-right: solid 0px #323844;
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        .el-submenu {
          list-style: none;
          margin: 0;
          padding-left: 0;
          .el-submenu__title {
            font-size: 14px;
            color: #303133;
            padding: 0 20px;
            cursor: pointer;
            -webkit-transition: border-color 0.3s, background-color 0.3s,
              color 0.3s;
            transition: border-color 0.3s, background-color 0.3s, color 0.3s;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            span {
              margin-left: 10px;
            }
          }
        }
        .el-menu-item {
          .el-menu-item [class^="el-icon-"] {
            margin-right: 5px;
            width: 24px;
            text-align: center;
            font-size: 18px;
            vertical-align: middle;
          }
          span {
            margin-left: 10px;
          }
        }
        .el-menu-item.is-active {
          border-left: 2px solid rgb(0, 188, 113);
          background-color: #22272e !important;
        }
        .el-menu-item i {
          color: #fff;
        }
        .el-submenu__title i {
          color: #fff;
        }
      }
    }
  }
}
</style>
