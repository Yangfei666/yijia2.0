<template>
    <div>
        <el-row>
    <el-col :span="24">
    <div class="practice-main">
        <el-col :span="23" class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程管理</el-breadcrumb-item>
            <el-breadcrumb-item>团课课程表</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>
        <el-col :span="23" class="weber">
            <span class="weber-span">团课课程表</span>
            <div class="weber-from">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-col :span="24">
                 <el-form-item label="所属门店:">
                     <el-col :span="24">
                    <el-select v-model="formInline.region" placeholder="请选择" style="width:260px;margin-top: 3px;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    </el-col>
                </el-form-item>
                </el-col>
                </el-form>
            </div>
        </el-col>
    </div>
    </el-col>
</el-row>
<el-row>
    <div class="group-main">
        <div class="group-head">
            <div class="group-right">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="width:140px;"></el-date-picker>
                <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:250px;margin-top:5px"></el-date-picker>
                <el-select v-model="value" placeholder="请选择" style="width:140px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="周一" name="monday">
                    <Grouptimetable></Grouptimetable>
                </el-tab-pane>
                <el-tab-pane label="周二" name="tuesday">
                    <Grouptimetable></Grouptimetable>
                </el-tab-pane>
                <el-tab-pane label="周三" name="wednesday">
                    <Grouptimetable></Grouptimetable>
                </el-tab-pane>
                <el-tab-pane label="周四" name="thursday">
                    <Grouptimetable></Grouptimetable>
                </el-tab-pane>
                <el-tab-pane label="周五" name="friday">
                    <Grouptimetable></Grouptimetable>
                </el-tab-pane>
                <el-tab-pane label="周六" name="saturday">
                   <Grouptimetable></Grouptimetable>
                </el-tab-pane>
                <el-tab-pane label="周日" name="weekday">
                    <Grouptimetable></Grouptimetable>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</el-row>
    </div>
</template>
<script>
import Grouptimetable from "@/components/grouptimetable";
export default {
    name:'group',
    components: {
      Grouptimetable
  },
  data() {
    return {
         formInline: {
          region: ''
        },
        activeName: 'monday',
        value6: '',
        value1: '',
        value: '',
        options: [{
          value: '选项1',
          label: '复制一周'
        }, {
          value: '选项2',
          label: '复制一月'
        }],
    }
  },
   methods: {
       handleClick(tab, event) {
        console.log(tab, event);
      },
    }
}
</script>
<style lang="scss" scoped>
 @import '@/styles/group.scss';
</style>
