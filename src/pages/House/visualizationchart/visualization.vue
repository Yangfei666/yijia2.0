<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>会所管理</el-breadcrumb-item>
              <el-breadcrumb-item>可视化数表</el-breadcrumb-item>
              <el-breadcrumb-item>会所业绩报表</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="practice-head">
          <el-col :span="24" class="weber">
            <div class="main-right">
              <div class="block">
                <el-col :span="24">
                  <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                  <el-date-picker v-model="value4" type="month" placeholder="选择月"></el-date-picker>
                  <el-date-picker v-model="value5" type="year" placeholder="选择年"></el-date-picker>
                </el-col>
              </div>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
              <el-tab-pane label="总业绩图表" name="first" :lazy="true">
                <Totalchart></Totalchart>
              </el-tab-pane>
              <el-tab-pane label="体验图表" name="second" :lazy="true">
                <Experiencechart></Experiencechart>
              </el-tab-pane>
              <el-tab-pane label="潜在图表" name="third" :lazy="true">
                <Latentchart></Latentchart>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Totalchart from "@/components/totalchart";
import Experiencechart from "@/components/experiencechart";
import Latentchart from "@/components/latentchart";
export default {
  name: "visualization",
  components: {
    Totalchart,
    Experiencechart,
    Latentchart
  },
  data() {
    return {
      activeName: "first",
      value1: "",
      value4: "",
      value5: "",
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss" scoped>
.practice-main {
  height: 60px;
  background: #fff;
  border-top: 1px solid #ebebeb;
  .breadcrumb {
    margin: 23px 20px auto;
  }
}
.practice-head {
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  .weber {
    margin-top: 10px;
    position: relative;
    .main-right {
      // width: 29%;
      position: absolute;
      right: 2%;
      z-index: 2;
      .block {
        float: right;
        margin-top: -5px;
        line-height: 40px;
        .el-date-editor {
          position: relative;
          display: inline-block;
          text-align: left;
          .el-input__inner {
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border-radius: 16px;
            border: 1px solid #e8e8e8;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 32px;
            line-height: 32px;
            outline: 0;
            padding: 0 15px;
            -webkit-transition: border-color 0.2s
              cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            width: 100%;
          }
        }
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 148px;
        }
        .el-input {
          position: relative;
          font-size: 14px;
          display: inline-block;
          width: 100%;
        }
      }
    }
  }
}
</style>