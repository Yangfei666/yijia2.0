<template>
<div>
    <!--体态评估表-->
    <div class="health">
    <el-col :span="24" class="infor-head">
        <div class="infor-but" v-on:click="back">
            <i class="el-icon-arrow-left"></i>
            <span class="goback">返回</span>
        </div>
        <div class="infor-title">
            <span>体态评估表</span>
            <img src="../assets/51.png"  @click="editAll" v-on:click="show = !show"/>
        </div>
    </el-col>
    <el-col :span="24">
         <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="health-main">
            <div class="health-one">
                <el-col style="width:6%">
                <div class="one-left">
                    <span>侧面</span>
                </div>
                </el-col>
                <el-col :span="22" style="width:94%">
                <div class="one-right">
                     <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang1 bb">
                            <span>部位</span>
                        </el-col>
                          <el-col :span="5" class="shang1">
                            <span>标准</span>
                        </el-col>
                          <el-col :span="5" class="shang1">
                            <span>轻度</span>
                        </el-col>
                          <el-col :span="5" class="shang1">
                            <span>中度</span>
                        </el-col>
                          <el-col :span="5" class="shang1">
                            <span>严重</span>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang2 bb">
                            <span>颈前引</span>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang2 bb">
                            <span>圆肩</span>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang2 bb">
                            <span>胸椎曲度(看驼背)</span>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang2 bb">
                            <span>腰椎曲度(看肋骨外翻)</span>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang2 bb">
                            <span>盆骨(看前倾后倾)</span>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang2 bb">
                            <span>膝关节(看是否超伸)</span>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                    </el-col>
                    <div class="wrap">
                    <el-col style="width:8%">
                        <div class="shang-left">
                            <span>头部</span>
                        </div>
                    </el-col>
                    <el-col :span="22" style="width:92%">
                    <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang2 bb">
                            <span>侧倾</span>
                        </el-col>
                          <el-col :span="5" class="shang2 aa">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2 cc">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2 dd">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2 gg">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang2 bb">
                            <span>旋转</span>
                        </el-col>
                          <el-col :span="5" class="shang2 aa">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2 cc">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2 dd">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2 gg">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                    </el-col>
                    </el-col>
                    </div>
                </div>
                </el-col>
            </div>
            <div class="health-two">
                <el-col style="width:6%">
                <div class="one-left">
                    <span>背面</span>
                </div>
                </el-col>
                <el-col :span="22" style="width:94%">
                <div class="one-right">
                     <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang2 bb">
                            <span>耸肩</span>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang2 bb">
                            <span>异状肩胛</span>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang2 bb">
                            <span>脊椎(C或S形)</span>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                    </el-col>
                    <div class="wrap">
                    <el-col style="width:8%">
                        <div class="shang-left">
                            <span>盆骨</span>
                        </div>
                    </el-col>
                    <el-col :span="22" style="width:92%">
                    <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang2 bb">
                            <span>侧倾</span>
                        </el-col>
                          <el-col :span="5" class="shang2 aa">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2 cc">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2 dd">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2 gg">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="right-shang">
                        <el-col :span="5" class="shang2 bb">
                            <span>旋转</span>
                        </el-col>
                          <el-col :span="5" class="shang2 aa">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2 cc">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2 dd">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                          <el-col :span="5" class="shang2 gg">
                            <el-radio v-model="radio" :disabled="edit"></el-radio>
                        </el-col>
                    </el-col>
                    </el-col>
                    </div>
                </div>
                </el-col>
            </div>
            <div class="health-three">
                 <el-col style="width:6%">
                <div class="one-left">
                    <span>备注</span>
                </div>
                </el-col>
                 <el-col :span="22" style="width:94%">
                <div class="one-right">
                    <el-input type="textarea" placeholder="这是备注内容这是备注内容这是备注内容这是备注内容这是备注内容这是备注内容这是备注内容这是备注内容这是备注内容这是备注内容这是备注内容这是备注内容这是
这是备注内容这是备注内容这是备注内容这是备注内容这是备注内容这是备注内容内容这是备注内容" style="height:100%" :disabled="edit"></el-input>
                </div>
                 </el-col>
            </div>
        </div>
        <el-form-item label-width="0px" style="margin-top:30px" v-if="show">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>重置</el-button>
        </el-form-item>
         </el-form>
    </el-col>
    </div>
</div>
</template>
<script>
export default {
    name:'postureevaluating',
  data() {
    return {
          ruleForm: {},
          radio: '',
          edit: true,
          show: false,
    };
  },
  methods: {
       back(){
        this.$router.go(-1);//返回上一层
    },
    onSubmit() {
        console.log('submit!');
      },
      editAll () {
			this.edit = false
        },
  }
};
</script>
<style lang="scss" scoped>
 @import '../styles/postureevaluating.scss';
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
        display:inline-block;
        width: 95%;
        margin: 20px auto;
        background: #fafafa;
        .health-one{
            height: 500px;
            overflow: hidden;
            .one-left{
                width: 100%;
                height: 500px;
                line-height: 500px;
                float: left;
                border-right: 0.5px solid #e8e8e8;
            }
            .one-right{
                width: 100%;
                height: 100%;
                float: right;
                .right-shang{
                    height: 55px;
                    border-bottom: 0.5px solid #e8e8e8;
                    display: flex;
                    .shang1{
                        height: 55px;
                        line-height: 55px;
                        span{
                            font-size: 14px;
                            color: #000;
                        }
                    }
                    .bb{
                        text-align: left;
                        text-indent: 50px;
                    }
                    .aa{
                        text-align: left;
                        text-indent: 9px;
                    }
                     .cc{
                        text-align: left;
                        text-indent: 15px;
                    }
                    .dd{
                        text-indent: -17px;
                    }
                    .gg{
                        text-indent: -5px;
                    }
                    .shang2{
                        height: 55px;
                        line-height: 55px;
                        span{
                            font-size: 14px;
                            color: #262626;
                        }
                        
                    }
                }
                
                .wrap{
                    height: 110px;
                    .shang-left{
                    width: 100%;
                    height: 110px;
                    line-height: 110px;
                    border-right: 0.5px solid #e8e8e8;
                    border-bottom: 0.5px solid #e8e8e8;
                 }
                 .right-shang2{
                    height: 55px;
                    border-bottom: 0.5px solid #e8e8e8;
                    display: flex;
                    .bb{
                        text-align: left;
                        text-indent: 50px;
                    }
                    .aa{
                        text-align: left;
                        text-indent: 9px;
                    }
                     .cc{
                        text-align: left;
                        text-indent: 15px;
                    }
                    .dd{
                        text-indent: -17px;
                    }
                    .gg{
                        text-indent: -5px;
                    }
                    .shang2{
                        height: 55px;
                        line-height: 55px;
                        span{
                            font-size: 14px;
                            color: #262626;
                        }
                        
                    }
                }
                }
                
            }
        }
        .health-two{
            height: 277px;
            overflow: hidden;
            .one-left{
                width: 100%;
                height: 277px;
                line-height: 277px;
                float: left;
                border-right: 0.5px solid #e8e8e8;
                border-top: 0.3px solid #e8e8e8;
                border-bottom: 0.3px solid #e8e8e8;
            }
            .one-right{
                width: 100%;
                height: 100%;
                float: right;
                .right-shang{
                    height: 55px;
                    border-bottom: 0.5px solid #e8e8e8;
                    display: flex;
                    .shang1{
                        height: 55px;
                        line-height: 55px;
                        span{
                            font-size: 14px;
                            color: #000;
                        }
                    }
                    .bb{
                        text-align: left;
                        text-indent: 50px;
                    }
                    .aa{
                        text-align: left;
                        text-indent: 9px;
                    }
                     .cc{
                        text-align: left;
                        text-indent: 15px;
                    }
                    .dd{
                        text-indent: -17px;
                    }
                    .gg{
                        text-indent: -5px;
                    }
                    .shang2{
                        height: 55px;
                        line-height: 55px;
                        span{
                            font-size: 14px;
                            color: #262626;
                        }
                        
                    }
                }
                .wrap{
                    height: 110px;
                    .shang-left{
                    width: 100%;
                    height: 110px;
                    line-height: 110px;
                    border-right: 0.5px solid #e8e8e8;
                    border-bottom: 0.5px solid #e8e8e8;
                 }
                }
                
            }
        }
        .health-three{
            height: 110px;
            overflow: hidden;
            .one-left{
                width: 100%;
                height: 110px;
                line-height: 110px;
                float: left;
                border-right: 0.5px solid #e8e8e8;
                border-top: 0.5px solid #e8e8e8;
            }
            .one-right{
                width: 100%;
                height: 100%;
                float: right;
                 .el-textarea.el-textarea__inner{
                    height: 110px !important;
                    opacity: 0.6;
                }
            }
        }
         
    }
}
</style>