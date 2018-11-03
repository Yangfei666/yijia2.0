<template>
    <div>
        <el-row>
    <el-col :span="24">
    <div class="practice-main">
        <el-col :span="23" class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程管理</el-breadcrumb-item>
            <el-breadcrumb-item>私教课程表</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>
        <el-col :span="23" class="weber">
            <span class="weber-span">私教课程表</span>
        </el-col>
    </div>
    </el-col>
</el-row>
<el-row>
    <div class="group-main">
        <div class="group-head">
            <div class="group-right">
                <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:250px;margin-top:4px"></el-date-picker>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="周一" name="monday">
                    <Culum></Culum>
                </el-tab-pane>
                <el-tab-pane label="周二" name="tuesday">
                  <Culum></Culum>
                </el-tab-pane>
                <el-tab-pane label="周三" name="wednesday">
                   <Culum></Culum>
                </el-tab-pane>
                <el-tab-pane label="周四" name="thursday">
                   <Culum></Culum>
                </el-tab-pane>
                <el-tab-pane label="周五" name="friday">
                    <Culum></Culum>
                </el-tab-pane>
                <el-tab-pane label="周六" name="saturday">
                    <Culum></Culum>
                </el-tab-pane>
                <el-tab-pane label="周日" name="weekday">
                   <Culum></Culum>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</el-row>
    </div>
</template>
<script>
import Culum from "@/components/culum";
export default {
    name:'privateculum',
    components: {
      Culum
  },
  data() {
    return {
        activeName: 'monday',
        value6: '',
        value1: '',
        value: '',
    }
  },
   methods: {
      onSubmit() {
        console.log('submit!');
      },
       handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    }
}
</script>
<style lang="scss" scoped>
 @import '@/styles/privateculum.scss';
</style>
