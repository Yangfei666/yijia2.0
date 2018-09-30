<template>
  <div style="width:100%;height:100%;">
    <el-container class="home-main">
      <!--侧边栏-->
      <el-col :class="collapsed?'coll':'expand'" style="transition:500ms">
        <el-aside class="home-aside" width="100%">
          <Aside :collapsed="collapsed"></Aside>
        </el-aside>
      </el-col>
      <el-col :class="collapsed?'coll2':'expand2'" style="transition:500ms">
        <el-container class="home-main2">
          <!--头部-->
          <el-header height="62px" :class="collapsed?'coll2':'expand2'">
            <Header @changeCollapsed="changeCollapsed"></Header>
          </el-header>
          <!--主要内容-->
          <el-main>
            <router-view ref="mainChild"></router-view>
          </el-main>
        </el-container>
      </el-col>
    </el-container>
  </div>
</template>
<script>
import Aside from "../components/aside";
import Header from "../components/header";
import Main from "../pages/Main";
export default {
  components: {
    Aside,
    Header,
    Main
  },
  name: "Home",
  data() {
    return {
      collapsed: false,
      screenWidth: document.body.clientWidth
    };
  },
  methods: {
    changeCollapsed(collapsed) {
      this.collapsed = collapsed;
      if (this.$refs.mainChild.$refs.League) {
        setTimeout(() => {
          this.$refs.mainChild.$refs.League.initSwiper();
        }, 500);
      }
    }
  },
  mounted() {
    let screenWidth = document.body.clientWidth;
    this.collapsed = screenWidth <= 992;
    window.onresize = () => {
      let screenWidth = document.body.clientWidth;
      this.collapsed = screenWidth <= 992;
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/base.scss";
.home-main {
  height: 100%;
  width: 100%;
  .home-aside {
    background: #323844;
    overflow-x: hidden;
    height: 100%;
  }
  .home-main2 {
    // overflow-y: scroll;
    background: #ecedf0;
    height: 100%;
    .el-header {
      // width: 100%;
      background-color: #fff;
      z-index: 25;
      position: fixed;
      top: 0;
      background-color: #fff;
      color: #333;
      text-align: center;
      padding: 0 0px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.16);
    }
    .el-main {
      margin-top: 62px;
      background-color: #e9eef3;
      color: #333;
      text-align: center;
      display: block;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      -ms-flex-preferred-size: auto;
      flex-basis: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0px;
    }
  }
  .coll {
    width: 60px;
  }
  .expand {
    width: 200px;
  }
  .coll2 {
    width: calc(100% - 60px) !important;
  }
  .expand2 {
    width: calc(100% - 200px) !important;
  }
}
body > .el-container {
  margin-bottom: 40px;
}

.el-aside {
  background: #323844;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>


