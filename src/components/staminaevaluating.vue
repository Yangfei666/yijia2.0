<template>
<div>
    <!--体能评估表-->
    <div class="health">
    <el-col :span="24" class="infor-head">
        <div class="infor-but" v-on:click="back">
            <i class="el-icon-arrow-left"></i>
            <span class="goback">返回</span>
        </div>
        <div class="infor-title">
            <span>体能评估表（<span style="color:#f00;font-size:14px">测试日期Date:</span><el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>）</span>
            <img src="../assets/51.png"  @click="editAll" v-on:click="show = !show"/>
        </div>
    </el-col>
    <el-col :span="24">
        <el-form ref="form" :model="form">
            <div class="health-main">
                <el-col :span="24" class="outside">
                <span class="outside-biao">体能评估项目</span>
                <span class="outside-biao">原始数据Beginning</span>
                <span class="outside-biao">六周6weeks</span>
                <span class="outside-biao">十二周12weeks</span>
                <span class="outside-biao">六个月6mons</span>
                <span class="outside-biao">十二个月12mons</span>
                </el-col>
                <el-col :span="24" class="health-from">
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">静态心率 Resting HeartRate(MMHG)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" v-model="form.heartrateoriginal" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" v-model="form.heartratesix" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" v-model="form.heartrateTwelve" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" v-model="form.heartrateJune" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" v-model="form.heartrateDecember" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                     <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">血压 Blood pressure (MMHG)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">身高 Height (CM)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">体重 Weight (KG)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">颈围 Neck Circum (CM)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">肩围 Shoulder Circum (CM)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">胸围 Chest Circum (CM)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">臂围 左/右 Arms Circum.L/R (CM)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">腹围 Abdominal Circum (CM)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">腰围 Waistline (CM)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">臂围 Hipline (CM)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">大腿围 左/右 Thigh Circum.L/R (CM)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">小腿围左/右Calves Circum.L/R(CM)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">体脂百分比 Body fat percentage (%)</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">腰臀比 Waist-hip rate </span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">BMI体质指数</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">基础代谢 Basal metabolic</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">柔韧性测试 Flexibility Test</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">肌肉耐力 Muscle Endurance</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date-border">
                        <el-col :span="5" class="ating">
                            <span style="padding-left:10px;">教练建议 Professional advice</span>
                        </el-col>
                        <el-col :span="19" class="atingss">
                            <el-input class="ating-ipt" type="text" placeholder="34" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="45" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                            <el-input class="ating-ipt" type="text" placeholder="66" :disabled="edit"/>
                        </el-col>
                    </el-col>
                </el-col>
            </div> 
             <el-col :span="24" class="from-date4" v-if="show">
            <el-form-item label-width="0px">
                   <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>重置</el-button>
             </el-form-item>
        </el-col>
        </el-form>
    </el-col>
    </div>
</div>
</template>
<script>
export default {
    name:'staminaevaluating',
  data() {
    return {
        value1: '',
        form: {
            heartrateoriginal:'',//静态心率原始数据
            heartratesix:'',//静态心率六周数据
            heartrateTwelve:'',//静态心率十二周数据
            heartrateJune:'',//静态心率六个月数据
            heartrateDecember:''//静态心率十二个月数据
        },
        edit: true,
        show: false,
    };
  },
    methods: {
      editAll () {
			this.edit = false
        },
      handleClick(tab, event) {
      console.log(tab, event);
    },
      onSubmit(){
        alert('submit!');
      },
       back(){
        this.$router.go(-1);//返回上一层
    },
  }
};
</script>
<style lang="scss" scoped>
@import '../styles/staminaevaluating.scss';
.health{
    width: 97%;
    height: 100%;
    display: inline-block;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
        .infor-head{
        height: 50px;
        display: flex;
        line-height: 50px;
        border-bottom: 1px solid #e8e8e8;
        .infor-but{
            padding-left: 10px;
            font-size: 16px;
            color: #262626;
        }
        .infor-but:hover{
            color:#00bc71;
        }
        .infor-title{
             padding-left: 20px;
            font-size: 16px;
            color: #262626;
            img{
                width: 15px;
                height: 15px;
            }
        }
    }
    .health-main{
        border: 1px solid #e8e8e8;
        height: 100%;
        display: inline-block;
        width: 97%;
        margin: 20px auto;
        background: #fafafa;
           .outside{
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #e8e8e8;
                display: flex;
                justify-content: space-around;
            .outside-biao{
                font-size: 14px;
                color: #000;
                .outside-biao2{
                    font-size: 14px;
                    color: #262626;
                }
            }
        }
        .from-date-border{
                width: 100%;
                border-bottom: 1px solid #e8e8e8;
                height: 55px;
                line-height: 55px;
                .ating{
                    text-align: left;
                    font-size: 14px;
                    color: #262626;
                }
                .atingss{
                    text-align: left;
                    font-size: 14px;
                    color: #262626;
                     display: flex;
                     justify-content: space-around;
                     .ating-ipt{
                        width: 80px;
                        height: 54px;
                        text-align: center;
                        background: #fafafa;
                        opacity: 1.1;
                    }
                }
            }
    }
    .from-date4{
         margin-top: 10px;
    }
}
</style>