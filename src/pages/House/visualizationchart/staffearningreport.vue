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
            <el-breadcrumb-item>员工业绩报表</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>
    </div>
    </el-col>
    <el-col :span="24">
        <div class="practice-head">
         <el-col :span="24" class="weber">
                <span class="weber-span">体验客户管理</span>
          <div class="main-right">
              <div class="block3">
                <el-form ref="form" :model="form" label-width="85px">
                    <el-col :span="20" style="height:50px">
                <el-form-item label="员工姓名:">
                    <el-col :span="24">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width:280px">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    </el-col>
                </el-form-item>
                </el-col>
                <el-col :span="4" style="height:50px">
                <el-form-item label-width="3px">
                    <el-col :span="24">
                         <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-col>
                </el-form-item>
                </el-col>
                </el-form>
        </div>
            <div class="block2">
                <el-col :span="24" class="dsd">
                <el-radio-group v-model="radio4" size="medium" style="height:32px">
                    <el-radio-button label="今天" ></el-radio-button>
                    <el-radio-button label="本月"></el-radio-button>
                    <el-radio-button label="本年"></el-radio-button>
                </el-radio-group>
            </el-col>
            <el-col :span="15" class="block1">
                <el-date-picker v-model="value2" align="right"  type="date"  placeholder="选择日期"  :picker-options="pickerOptions1" style="width:130px"></el-date-picker>
            </el-col>
        </div>
    </div>
        </el-col>
    </div>
</el-col>
</el-row>
<el-col :span="24" class="staffchart">
    <div class="staff-main">
        <div id="staffchart" :style="{width: '100%', height: '415px'}"></div>
    </div>
</el-col>
<el-col :span="24" class="staffchart">
    <div class="staff-main">
        <div id="staffchart2" :style="{width: '100%', height: '415px'}"></div>
    </div>
</el-col>
</div>
</template>
<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入饼图组件
    require('echarts/lib/chart/line')
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/legend')
export default {
    name:'staffearningreport',
  data() {
    return {
        form: {
            region:''
        },
         radio4: '今天',
         value2:'',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
    };
  },
    mounted() {
        setTimeout(() => {
                this.drawLine();
                this.drawBar();
            }, 500);
     },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        console.log('submit!');
      },
      drawBar(){
          let staffchart = echarts.init(document.getElementById('staffchart'))
          let option = {
              title: {
                    text: '私教/团课业绩构成柱状图',
                    textStyle:{
                        color:'#595959',
                        fontSize:'20px'
                    },
                     top:'5%',
                     left:'1%'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['团课业绩','私教业绩'],
                    top:'5%'
                },
                grid: {
                    left: '1%',
                    right: '2%',
                    bottom: '1%',
                    top:'20%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['08/02','08/02','08/02','08/02','08/02','08/02','08/02',
                        '08/02','08/02','08/02','08/02','08/02','08/02','08/02','08/02',
                        '08/02','08/02','08/02','08/02','08/02']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'团课业绩',
                        type:'bar',
                        color:'#2fc25b',
                        data:[320, 332, 301, 334, 390, 330, 320,342,234,234,
                        235,565,24,56,657,345,756,43,77,776]
                    },
                    {
                        name:'私教业绩',
                        type:'bar',
                        stack: '广告',
                        color:'#1890ff',
                        data:[120, 132, 101, 134, 90, 230, 210,234,456,34,
                        678,334,778,334,99,48,86,34,786,234]
                    }
                ]
            };
            staffchart.setOption(option);
      },
      drawLine(){
          let staffchart2 = echarts.init(document.getElementById('staffchart2'))
          let option2 = {
                    title: {
                        text: '体验客户新增折线图',
                        textStyle:{
                        color:'#595959',
                        fontSize:'20px'
                    },
                     top:'5%',
                     left:'1%'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['团课体验人数','私教体验人数'],
                        top:'5%'
                    },
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '1%',
                        top:'20%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                       data : ['08/02','08/02','08/02','08/02','08/02','08/02','08/02',
                        '08/02','08/02','08/02','08/02','08/02','08/02','08/02','08/02',
                        '08/02','08/02','08/02','08/02','08/02']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'团课体验人数',
                            type:'line',
                            stack: '总量',
                            color:'#1890ff',
                            data:[320, 332, 301, 334, 390, 330, 320,342,234,234,
                             235,565,24,56,657,345,756,43,77,36]
                        },
                        {
                            name:'私教体验人数',
                            type:'line',
                            stack: '总量',
                            color:'#2fc25b',
                            data:[120, 132, 101, 134, 90, 230, 210,234,456,34,
                        678,334,778,334,99,48,86,34,786,234]
                        },
                    ]
                };
            staffchart2.setOption(option2);
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
.practice-head{
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
      .weber {
            position: relative;
            display: flex;
            height: 50px;
            line-height: 45px;
            .weber-span {
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #262626;
                font-family: PingFang-SC-Regular;
                text-indent: 20px;
                }
           .main-right {
              width: 70%;
              position: absolute;
              right: 0px;
              z-index: 2;
              top: 0px;
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
      .block2 {
        height: 32px;
        line-height: 32px;
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: flex-end;
        .dsd{
           line-height: 34px;
           text-align: right;
         }
        .block1{
            line-height: 38px;
        }
            .el-radio-button__inner {
            color: #fff;
            background-color: #00bc71;
            border-color: #00bc71;
            -webkit-box-shadow: -1px 0 0 0 #00bc71;
            box-shadow: -1px 0 0 0 #00bc71;
        }
      }
      .block3{
            height: 50px;
            line-height: 50px;
            display: flex;
            float: left;
            .el-button--primary{
                height: 35px;
                line-height: 8px;
            }
      }
    }
  }
}
.staffchart{
    .staff-main{
        width: 97%;
        background-color: #ffffff;
	    box-shadow: 0px 1px 3px 0px 
		rgba(0, 0, 0, 0.23);
	    border-radius: 4px;
        height: 450px;
        margin: 20px auto;
    }
}
</style>