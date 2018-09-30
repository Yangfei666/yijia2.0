<template>
<div>
  <!--体验客户主页-->
    <div class="memberhome">
    <div class="member-but">
      <el-button type="text" class="butt el-icon-plus" @click="dialogFormVisible = true">购买体验卷</el-button>
        <template>
        <el-dialog title="购买体验劵" :append-to-body="true" :visible.sync="dialogFormVisible">
        <Buyexpersecurity></Buyexpersecurity>
        </el-dialog>
        </template>
      </div>
     <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="劵1" name="cardone" style="font-size:16px">
      <Securityone></Securityone>
      </el-tab-pane>
    <el-tab-pane label="劵2" name="cardtwo" style="font-size:16px">
      <Securitytwo></Securitytwo>
    </el-tab-pane>
    <el-tab-pane label="劵3" name="cardthree" style="font-size:16px">
      <Securitythree></Securitythree>
    </el-tab-pane>
  </el-tabs>
    </div>
</div>
</template>
<script>
import Buyexpersecurity from "../components/buyexpersecurity";
import Securityone from "../components/securityone";
import Securitytwo from "../components/securitytwo";
import Securitythree from "../components/securitythree";
export default {
  name:'experhome',
  components: {
    Buyexpersecurity,
    Securityone,
    Securitytwo,
    Securitythree
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
      line-height: 7px;
      text-align: center;
      color: #fff;
      span {
        margin-left: 3px;
      }
    }
  }
}
</style>