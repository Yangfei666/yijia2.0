<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import "/assets/fonts/iconfont.css";
</style>
<style src="./styles/public.scss">
</style>
<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
.el-tabs__nav {
  margin-left: 50px;
}
.el-tabs__item {
  line-height: 40px;
}
.el-textarea__inner {
  height: 110px;
  min-height: 110px;
}
.el-upload-dragger {
  width: 270px;
  height: 150px;
}
.el-tabs__nav-scroll {
  height: 45px;
  line-height: 47px;
}
.el-upload-dragger .el-icon-upload {
  font-size: 50px;
  color: #00bc71;
  margin: 30px 0px 15px;
  line-height: 50px;
  border-radius: 10px;
}
.el-upload-dragger.el-upload__text {
  color: #262626;
}
.el-upload-dragger.el-upload__tip:hover {
  color: #00bc71;
}
.el-card__body {
  padding: 10px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
/*滚动条*/
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  /* background-color: #f1f1f1; */
  background-color: transparent;
  border-radius: 10px;
}
</style>
