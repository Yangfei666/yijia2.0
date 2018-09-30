<template>
<div>
  <!--会员主页-->
    <div class="memberhome">
    <div class="member-but">
      <div class="butt el-icon-plus" @click="dialogFormVisible = true">添加新卡</div>
        <template>
        <el-dialog title="添加新卡" :append-to-body="true" :visible.sync="dialogFormVisible">
        <Addcard></Addcard>
        </el-dialog>
        </template>
      </div>
     <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="卡1" name="cardone" style="font-size:16px">
      <Cardone></Cardone>
      </el-tab-pane>
    <el-tab-pane label="卡2" name="cardtwo" style="font-size:16px">
      <Cardtwo></Cardtwo>
    </el-tab-pane>
    <el-tab-pane label="卡3" name="cardthree" style="font-size:16px">
      <Cardthree></Cardthree>
    </el-tab-pane>
  </el-tabs>
    </div>
    <router-view></router-view>
</div>
</template>
<script>
import Addcard from "../components/addcard";
import Cardone from "../components/cardone";
import Cardtwo from "../components/cardtwo";
import Cardthree from "../components/cardthree";
export default {
  name:'memberhome',
  components: {
    Addcard,
    Cardone,
    Cardtwo,
    Cardthree
  },
  data() {
    return {
      activeName: "cardone",
      dialogFormVisible: false,
      dialogFormVisible2: false
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss" scoped>
.memberhome {
  width: 97%;
  height: 410px;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  .member-but {
    width: 100px;
    height: 32px;
    position: absolute;
    right: 30px;
    top: 6px;
    border-radius: 4px;
    background: #00bc71;
    color: #fff;
    z-index: 2;
    .butt {
      width: 100%;
      height: 100%;
      line-height: 32px;
      text-align: center;
      span {
        margin-left: 3px;
      }
    }
  }
}
</style>