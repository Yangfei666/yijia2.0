<template>
    <div>
        <!--总业绩图表-->
        <el-col :span="24">
            <div class="Totalachievement">
                <el-col :span="12" class="Total-head">
                    <div id="myChart" :style="{width: '100%', height: '410px'}"></div>
                </el-col>
                <div class="box4"></div>
                <el-col :span="12" class="Total-head">
                    <div id="myChart2" :style="{width: '100%', height: '410px'}"></div>
                </el-col>
            </div>
        </el-col>
        <el-col :span="24">
            <div class="Performancechange">
                <el-col :span="24" class="charts">
                    <div id="myChart3" :style="{width: '100%', height: '410px'}"></div>
                </el-col>
            </div>
        </el-col>
        <el-col :span="24">
            <div class="Performancechange">
                <el-col :span="24" class="charts">
                    <div id="myChart4" :style="{width: '100%', height: '410px'}"></div>
                </el-col>
            </div>
        </el-col>
    </div>
</template>
<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入饼图组件
    require('echarts/lib/chart/pie')
    require('echarts/lib/chart/line')
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/legend')
    export default {
        name:'totalchart',
        data() {
            return {};
        },
        mounted() {
            setTimeout(() => {
                this.drawLine();
                this.drawPie();
                this.drawBar();
            }, 500);
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            drawPie() { //饼图
                let myChart = echarts.init(document.getElementById('myChart'))
                let myChart2 = echarts.init(document.getElementById('myChart2'))
                let option = {
                    title : {
                            text: '私教团课业绩占比图',
                            x:'left',
                            textStyle:{
                                color:'#595959',
                                fontSize:'34px'
                            },
                            top:'1%',
                            left:'1%'
                        },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                     legend: {
                        x: 'right',
                        data: ['团课业绩', '私教业绩'],
                        orient: 'vertical',
                        right: 5,
                        top: 40,
                        bottom: 10,
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            color: ['#2FC25B', '#1890FF', '#8378EA', '#E062AE', '#FFDB5C', '#9d96f5', ],
                            radius: ['53%', '70%'],
                            center: ['50%', '50%'],
                            avoidLabelOverlap: false,
                            hoverAnimation: true, //hover放大
                            label: {
                               normal: {
                                show: false,
                                position: 'center',
                               },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                               {
                                value: 30,
                                name: '私教业绩'
                            },
                            {
                                value: 70,
                                name: '团课业绩'
                            }]
                        }
                    ]
                };
                 let option2 = {
                      title : {
                            text: '员工业绩占比图',
                            x:'left',
                            textStyle:{
                                color:'#595959',
                                fontSize:'34px'
                            },
                            top:'1%',
                            left:'1%'
                        },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        x: 'right',
                        data:['凌凌漆','李木子','电风扇','办公费','水电费','尔特我'],
                        orient: 'vertical',
                        right: 5,
                        top: 40,
                        bottom: 10,
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            color: ['#2FC25B', '#1890FF', '#8378EA', '#E062AE', '#FFDB5C', '#13c2c2', ],
                            radius: ['53%', '70%'],
                            center: ['50%', '50%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                               {
                                value: 24,
                                name: '凌凌漆'
                            },
                            {
                                value: 34,
                                name: '李木子'
                            },
                            {
                                value: 70,
                                name: '电风扇'
                            },
                            {
                                value: 28,
                                name: '办公费'
                            },
                            {
                                value: 64,
                                name: '水电费'
                            },
                            {
                                value: 50,
                                name: '尔特我'
                            }]
                        }
                    ]
                };
                myChart.setOption(option);
                myChart2.setOption(option2);
            },
            drawLine() { //折线图
                let myChart3 = echarts.init(document.getElementById('myChart3'))
                myChart3.setOption({
                    title: {
                    text: '团课/私教业绩变化折线图',
                    textStyle:{
                        color:'#595959',
                        fontSize:'20px'
                    },
                     top:'4%',
                     left:'1%'
                },
                    tooltip: {
                         trigger: 'axis',
                       axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                       }
                    },
                     legend: {
                        data:['团课业绩','私教业绩'],
                        top:'4%'
                    },
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '3%',
                        top: '14%',
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
                        data: ['06/02', '06/03', '06/04', '06/05', '06/06', '06/07',
                            '06/08', '06/09', '06/10', '06/11', '06/12', '06/13', '06/14',
                            '06/15', '06/16', '06/17', '06/18', '06/19', '06/20', '06/21'
                        ]
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                            name: '团课业绩',
                            type: 'line',
                            stack: '总量',
                            color: '#1890ff',
                            data: [23, 34, 45, 56, 23, 54, 64, 34, 54, 67, 88, 20, 75, 48, 46, 78, 30, 49, 56, 34]
                        },
                        {
                            name: '私教业绩',
                            type: 'line',
                            stack: '总量',
                            color: '#2fc25b',
                            data: [100, 120, 90, 98, 100, 40, 80, 76, 20, 60, 20, 75, 95, 48, 93, 63, 76, 37, 75, 34]
                        },
                    ]
                });
            },
            drawBar() { //柱状图
                let myChart4 = echarts.init(document.getElementById('myChart4'))
                myChart4.setOption({
                    title: {
                    text: '员工业绩柱状图',
                    textStyle:{
                        color:'#595959',
                        fontSize:'20px'
                    },
                     top:'4%',
                     left:'1%'
                },
                  tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['木子','上官木子','小木子','欧阳','Angel','ViVi'],
                    top:'4%'
                },
                grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '3%',
                        top: '14%',
                        containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data: ['06/02', '06/03', '06/04', '06/05', '06/06', '06/07',
                            '06/08', '06/09', '06/10', '06/11', '06/12', '06/13', '06/14',
                            '06/15', '06/16', '06/17', '06/18', '06/19', '06/20', '06/21'
                        ]
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'木子',
                        color:'#2FC25B',
                        type:'bar',
                        data:[100, 120, 90, 98, 100, 40, 80, 76, 20, 60, 20, 75, 95, 48, 93, 63, 76, 37, 75, 34]
                    },
                    {
                        name:'上官木子',
                        type:'bar',
                        color:'#1890FF',
                        data:[23, 34, 45, 56, 23, 54, 64, 34, 54, 67, 88, 20, 75, 48, 46, 78, 30, 49, 56, 34]
                    },
                    {
                        name:'小木子',
                        type:'bar',
                         color:'#8378EA',
                       data:[100, 120, 90, 98, 100, 40, 80, 76, 20, 60, 20, 75, 95, 48, 93, 63, 76, 37, 75, 34]
                    },
                    {
                        name:'欧阳',
                        type:'bar',
                         color:'#E062AE',
                         data:[23, 34, 45, 56, 23, 54, 64, 34, 54, 67, 88, 20, 75, 48, 46, 78, 30, 49, 56, 34]
                    },
                    {
                        name:'Angel',
                        type:'bar',
                         color:'#FFDB5C',
                        data:[100, 120, 90, 98, 100, 40, 80, 76, 20, 60, 20, 75, 95, 48, 93, 63, 76, 37, 75, 34],
                    },
                    {
                        name:'ViVi',
                        type:'bar',
                         color:'#13c2c2',
                         data:[23, 34, 45, 56, 23, 54, 64, 34, 54, 67, 88, 20, 75, 48, 46, 78, 30, 49, 56, 34]
                    },
                ]
                });
            },
        }
    };
</script>
<style lang="scss" scoped>
@import '@/styles/totalchart.scss';
    .Totalachievement {
        width: 97%;
        height: 370px;
        margin: 10px auto;
        background-color: #ffffff;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
        border-radius: 4px;
        display: flex;
        .Total-head {
            height: 100%;
            #myChart{
                position: absolute;
                left: 37px!important;
                top: 42px!important;
                width: 41%!important;
                height: 300px!important;
                user-select: none;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                padding: 0px;
                margin: 0px;
                border-width: 0px;
            }
            #myChart2{
                position: absolute;
                right: 70px!important;
                top: 42px!important;
                width: 41%!important;
                height: 300px!important;
                user-select: none;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                padding: 0px;
                margin: 0px;
                border-width: 0px;
            }
        }
        .box4 {
            width: 1px;
            height: 50%;
            background: #e8e8e8;
            float: left;
            position: relative;
            top: 23%;
            border-radius: 5px;
            left: -1%;
        }
    }
    .Performancechange {
        width: 97%;
        height: 440px;
        margin: 10px auto;
        background-color: #ffffff;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
        border-radius: 4px;
        .change-head {
            height: 40px;
            display: flex;
            line-height: 40px;
            margin-top: 15px;
            span {
                color: #595959;
                font-size: 14px;
                text-indent: 20px;
            }
        }
    }
</style>