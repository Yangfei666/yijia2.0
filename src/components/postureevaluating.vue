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
                </div>
            </el-col>
            <el-col :span="24">
                <el-form :model="posture_assessment" ref="posture_assessment" :disabled="disabled" label-width="100px" class="demo-ruleForm">
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
                                        <el-col :span="19">
                                            <el-radio-group v-model="posture_assessment.poNeck" style="display: flex;justify-content: space-around;padding-top: 20px;padding-left: 10px;" @change="yinjingchange">
                                                <el-radio :label="1">&nbsp;</el-radio>
                                                <el-radio :label="2">&nbsp;</el-radio>
                                                <el-radio :label="3">&nbsp;</el-radio>
                                                <el-radio :label="4">&nbsp;</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="24" class="right-shang">
                                        <el-col :span="5" class="shang2 bb">
                                            <span>圆肩</span>
                                        </el-col>
                                        <el-col :span="19">
                                            <el-radio-group v-model="posture_assessment.poShoulder" style="display: flex;justify-content: space-around;padding-top: 20px;padding-left: 10px;" @change="yinjingchange">
                                                <el-radio :label="1">&nbsp;</el-radio>
                                                <el-radio :label="2">&nbsp;</el-radio>
                                                <el-radio :label="3">&nbsp;</el-radio>
                                                <el-radio :label="4">&nbsp;</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="24" class="right-shang">
                                        <el-col :span="5" class="shang2 bb">
                                            <span>胸椎曲度(看驼背)</span>
                                        </el-col>
                                        <el-col :span="19">
                                            <el-radio-group v-model="posture_assessment.poThoracic" style="display: flex;justify-content: space-around;padding-top: 20px;padding-left: 10px;" @change="yinjingchange">
                                                <el-radio :label="1">&nbsp;</el-radio>
                                                <el-radio :label="2">&nbsp;</el-radio>
                                                <el-radio :label="3">&nbsp;</el-radio>
                                                <el-radio :label="4">&nbsp;</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="24" class="right-shang">
                                        <el-col :span="5" class="shang2 bb">
                                            <span>腰椎曲度(看肋骨外翻)</span>
                                        </el-col>
                                        <el-col :span="19">
                                            <el-radio-group v-model="posture_assessment.poLumbar" style="display: flex;justify-content: space-around;padding-top: 20px;padding-left: 10px;" @change="yinjingchange">
                                                <el-radio :label="1">&nbsp;</el-radio>
                                                <el-radio :label="2">&nbsp;</el-radio>
                                                <el-radio :label="3">&nbsp;</el-radio>
                                                <el-radio :label="4">&nbsp;</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="24" class="right-shang">
                                        <el-col :span="5" class="shang2 bb">
                                            <span>盆骨(看前倾后倾)</span>
                                        </el-col>
                                        <el-col :span="19">
                                            <el-radio-group v-model="posture_assessment.poPelvis" style="display: flex;justify-content: space-around;padding-top: 20px;padding-left: 10px;" @change="yinjingchange">
                                                <el-radio :label="1">&nbsp;</el-radio>
                                                <el-radio :label="2">&nbsp;</el-radio>
                                                <el-radio :label="3">&nbsp;</el-radio>
                                                <el-radio :label="4">&nbsp;</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="24" class="right-shang">
                                        <el-col :span="5" class="shang2 bb">
                                            <span>膝关节(看是否超伸)</span>
                                        </el-col>
                                        <el-col :span="19">
                                            <el-radio-group v-model="posture_assessment.poKnee" style="display: flex;justify-content: space-around;padding-top: 20px;padding-left: 10px;" @change="yinjingchange">
                                                <el-radio :label="1">&nbsp;</el-radio>
                                                <el-radio :label="2">&nbsp;</el-radio>
                                                <el-radio :label="3">&nbsp;</el-radio>
                                                <el-radio :label="4">&nbsp;</el-radio>
                                            </el-radio-group>
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
                                                <el-col :span="19">
                                                    <el-radio-group v-model="posture_assessment.poHeadInc" style="display: flex;justify-content: space-around;padding-top: 20px;margin-left:-74px;" @change="yinjingchange">
                                                        <el-radio :label="1">&nbsp;</el-radio>
                                                        <el-radio :label="2">&nbsp;</el-radio>
                                                        <el-radio :label="3">&nbsp;</el-radio>
                                                        <el-radio :label="4">&nbsp;</el-radio>
                                                    </el-radio-group>
                                                </el-col>
                                            </el-col>
                                            <el-col :span="24" class="right-shang">
                                                <el-col :span="5" class="shang2 bb">
                                                    <span>旋转</span>
                                                </el-col>
                                                <el-col :span="19">
                                                    <el-radio-group v-model="posture_assessment.poHeadRot" style="display: flex;justify-content: space-around;padding-top: 20px;margin-left:-74px;" @change="yinjingchange">
                                                        <el-radio :label="1">&nbsp;</el-radio>
                                                        <el-radio :label="2">&nbsp;</el-radio>
                                                        <el-radio :label="3">&nbsp;</el-radio>
                                                        <el-radio :label="4">&nbsp;</el-radio>
                                                    </el-radio-group>
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
                                        <el-col :span="19">
                                            <el-radio-group v-model="posture_assessment.poShrug" style="display: flex;justify-content: space-around;padding-top: 20px;padding-left: 10px;" @change="yinjingchange">
                                                <el-radio :label="1">&nbsp;</el-radio>
                                                <el-radio :label="2">&nbsp;</el-radio>
                                                <el-radio :label="3">&nbsp;</el-radio>
                                                <el-radio :label="4">&nbsp;</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="24" class="right-shang">
                                        <el-col :span="5" class="shang2 bb">
                                            <span>异状肩胛</span>
                                        </el-col>
                                        <el-col :span="19">
                                            <el-radio-group v-model="posture_assessment.poScapular" style="display: flex;justify-content: space-around;padding-top: 20px;padding-left: 10px;" @change="yinjingchange">
                                                <el-radio :label="1">&nbsp;</el-radio>
                                                <el-radio :label="2">&nbsp;</el-radio>
                                                <el-radio :label="3">&nbsp;</el-radio>
                                                <el-radio :label="4">&nbsp;</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="24" class="right-shang">
                                        <el-col :span="5" class="shang2 bb">
                                            <span>脊椎(C或S形)</span>
                                        </el-col>
                                        <el-col :span="19">
                                            <el-radio-group v-model="posture_assessment.poSpine" style="display: flex;justify-content: space-around;padding-top: 20px;padding-left: 10px;" @change="yinjingchange">
                                                <el-radio :label="1">&nbsp;</el-radio>
                                                <el-radio :label="2">&nbsp;</el-radio>
                                                <el-radio :label="3">&nbsp;</el-radio>
                                                <el-radio :label="4">&nbsp;</el-radio>
                                            </el-radio-group>
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
                                                <el-col :span="19">
                                                    <el-radio-group v-model="posture_assessment.poPelvisInc" style="display: flex;justify-content: space-around;padding-top: 20px;margin-left:-74px;" @change="yinjingchange">
                                                        <el-radio :label="1">&nbsp;</el-radio>
                                                        <el-radio :label="2">&nbsp;</el-radio>
                                                        <el-radio :label="3">&nbsp;</el-radio>
                                                        <el-radio :label="4">&nbsp;</el-radio>
                                                    </el-radio-group>
                                                </el-col>
                                            </el-col>
                                            <el-col :span="24" class="right-shang">
                                                <el-col :span="5" class="shang2 bb">
                                                    <span>旋转</span>
                                                </el-col>
                                                <el-col :span="19">
                                                    <el-radio-group v-model="posture_assessment.poPelvisRot" style="display: flex;justify-content: space-around;padding-top: 20px;margin-left:-74px;" @change="yinjingchange">
                                                        <el-radio :label="1">&nbsp;</el-radio>
                                                        <el-radio :label="2">&nbsp;</el-radio>
                                                        <el-radio :label="3">&nbsp;</el-radio>
                                                        <el-radio :label="4">&nbsp;</el-radio>
                                                    </el-radio-group>
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
                                    <el-input type="textarea" v-model="posture_assessment.poRemark" style="height:100%"></el-input>
                                </div>
                            </el-col>
                        </div>
                    </div>
                    <el-col :span="24" class="from-date4" v-if="show">
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="addposture('posture_assessment')">提交</el-button>
                            <el-button @click="resetForm('posture_assessment')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-col>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "postureevaluating",
  inject: ["reload"],
  data() {
    return {
      posture_assessment: {},
      disabled:true,
      show:true,
    };
  },
   mounted() {
    console.log(this.$route.query.id);
    console.log(this.$route.query.potential);
    this.gethealth();
  },
  methods: {
    gethealth() {
      let _this = this;
      requestLogin(
        "/CustomerFollowUp/getCustomerBodyData/"+_this.$route.query.potential+'/2/'+_this.$route.query.id,
        {},
        "get"
      )
        .then(function(res) {
          if(res==null){
              _this.disabled = false;
              _this.show = true;
          }else{
               _this.posture_assessment = res.posture_assessment;
               _this.disabled = true;
               _this.show = false;
          }
        })
        .catch(error => {
          if (error.res) {
            this.$message({
              message: "暂时没有数据可以展示",
              type: "error"
            });
          }
        });
    },
    addposture(formName) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              poNeck: this.posture_assessment.poNeck, //颈前引
              poShoulder: this.posture_assessment.poShoulder, //圆肩
              poThoracic: this.posture_assessment.poThoracic, //胸椎曲度
              poLumbar: this.posture_assessment.poLumbar, //腰椎曲度
              poPelvis: this.posture_assessment.poPelvis, //盆骨
              poKnee: this.posture_assessment.poKnee, //膝关节
              poHeadInc: this.posture_assessment.poHeadInc, //头部(侧倾)
              poHeadRot: this.posture_assessment.poHeadRot, //头部(旋转)
              poShrug: this.posture_assessment.poShrug, //耸肩
              poScapular: this.posture_assessment.poScapular, //肩胛
              poSpine: this.posture_assessment.poSpine, //脊柱
              poPelvisInc: this.posture_assessment.poPelvisInc, // 骨盆(侧倾)
              poPelvisRot: this.posture_assessment.poPelvisRot, //骨盆(旋转)
              poRemark: this.posture_assessment.poRemark, //备注
            };
            requestLogin(
              "/CustomerFollowUp/addPosture/"+this.$route.query.id+'/'+this.$route.query.potential,
              loginParams,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
              })
              .catch(error => {
                let { response: { data: { errorCode, msg } } } = error;
                if (errorCode != 0) {
                  this.$message({
                    message: msg,
                    type: "error"
                  });
                  return;
                }
              });
          });
    },
    resetForm(formName) {
      this.posture_assessment = '';
    },
    yinjingchange(val) {
      console.log(val);
    },
    back() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/postureevaluating.scss";
.health {
  width: 97%;
  height: 100%;
  display: inline-block;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .infor-head {
    height: 50px;
    display: flex;
    line-height: 50px;
    border-bottom: 1px solid #e8e8e8;
    .infor-but {
      padding-left: 10px;
      font-size: 16px;
      color: #262626;
    }
    .infor-but:hover {
      color: #00bc71;
    }
    .infor-title {
      padding-left: 20px;
      font-size: 16px;
      color: #262626;
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
  .health-main {
    border: 1px solid #e8e8e8;
    height: 100%;
    display: inline-block;
    width: 95%;
    margin: 20px auto;
    background: #f7fffc;
    .health-one {
      height: 500px;
      overflow: hidden;
      .one-left {
        width: 100%;
        height: 500px;
        line-height: 500px;
        float: left;
        border-right: 0.5px solid #e8e8e8;
      }
      .one-right {
        width: 100%;
        height: 100%;
        float: right;
        .right-shang {
          height: 55px;
          border-bottom: 0.5px solid #e8e8e8;
          display: flex;
          .shang1 {
            height: 55px;
            line-height: 55px;
            span {
              font-size: 14px;
              color: #000;
            }
          }
          .bb {
            text-align: left;
            text-indent: 50px;
          }
          .aa {
            text-align: left;
            text-indent: 9px;
          }
          .cc {
            text-align: left;
            text-indent: 15px;
          }
          .dd {
            text-indent: -17px;
          }
          .gg {
            text-indent: -5px;
          }
          .shang2 {
            height: 55px;
            line-height: 55px;
            span {
              font-size: 14px;
              color: #262626;
            }
          }
        }

        .wrap {
          height: 110px;
          .shang-left {
            width: 100%;
            height: 110px;
            line-height: 110px;
            border-right: 0.5px solid #e8e8e8;
            border-bottom: 0.5px solid #e8e8e8;
          }
          .right-shang2 {
            height: 55px;
            border-bottom: 0.5px solid #e8e8e8;
            display: flex;
            .bb {
              text-align: left;
              text-indent: 50px;
            }
            .aa {
              text-align: left;
              text-indent: 9px;
            }
            .cc {
              text-align: left;
              text-indent: 15px;
            }
            .dd {
              text-indent: -17px;
            }
            .gg {
              text-indent: -5px;
            }
            .shang2 {
              height: 55px;
              line-height: 55px;
              span {
                font-size: 14px;
                color: #262626;
              }
            }
          }
        }
      }
    }
    .health-two {
      height: 277px;
      overflow: hidden;
      .one-left {
        width: 100%;
        height: 277px;
        line-height: 277px;
        float: left;
        border-right: 0.5px solid #e8e8e8;
        border-top: 0.3px solid #e8e8e8;
        border-bottom: 0.3px solid #e8e8e8;
      }
      .one-right {
        width: 100%;
        height: 100%;
        float: right;
        .right-shang {
          height: 55px;
          border-bottom: 0.5px solid #e8e8e8;
          display: flex;
          .shang1 {
            height: 55px;
            line-height: 55px;
            span {
              font-size: 14px;
              color: #000;
            }
          }
          .bb {
            text-align: left;
            text-indent: 50px;
          }
          .aa {
            text-align: left;
            text-indent: 9px;
          }
          .cc {
            text-align: left;
            text-indent: 15px;
          }
          .dd {
            text-indent: -17px;
          }
          .gg {
            text-indent: -5px;
          }
          .shang2 {
            height: 55px;
            line-height: 55px;
            span {
              font-size: 14px;
              color: #262626;
            }
          }
        }
        .wrap {
          height: 110px;
          .shang-left {
            width: 100%;
            height: 110px;
            line-height: 110px;
            border-right: 0.5px solid #e8e8e8;
            border-bottom: 0.5px solid #e8e8e8;
          }
        }
      }
    }
    .health-three {
      height: 110px;
      overflow: hidden;
      .one-left {
        width: 100%;
        height: 110px;
        line-height: 110px;
        float: left;
        border-right: 0.5px solid #e8e8e8;
        border-top: 0.5px solid #e8e8e8;
      }
      .one-right {
        width: 100%;
        height: 100%;
        float: right;
        .el-textarea.el-textarea__inner {
          height: 110px !important;
          opacity: 0.6;
        }
      }
    }
  }
}
</style>