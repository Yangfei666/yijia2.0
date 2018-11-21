<template>
    <div>
        <!--健康调查表-->
        <div class="health">
            <el-col :span="24" class="infor-head">
                <div class="infor-but" v-on:click="back">
                    <i class="el-icon-arrow-left"></i>
                    <span class="goback">返回</span>
                </div>
                <div class="infor-title">
                    <span>健康调查表</span>
                </div>
            </el-col>
            <el-col :span="24">
                <el-form :model="health_survey" label-width="100px" class="demo-ruleForm" :disabled='disabled'>
                    <div class="health-main">
                        <el-col :span="24" class="outside">
                            <span class="outside-biao">健康调查表
                                <span class="outside-biao2">(
                                    <b style="color:#ff0000">*</b>号必填)</span>
                            </span>
                        </el-col>
                        <el-col :span="24">
                            <div class="box"></div>
                        </el-col>
                        <el-col :span="24" class="health-from">
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="8" class="from-date">
                                    <el-form-item label="姓名：" prop="name">
                                        <el-col :span="24">
                                            <el-input v-model="health_survey.htName" style="width:100%"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" class="from-date">
                                    <el-form-item label="联系电话：" prop="tel">
                                        <el-col :span="24">
                                            <el-input v-model="health_survey.htTel" style="width:100%"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" class="from-date">
                                    <el-form-item label="性别：" prop="sex">
                                        <el-col :span="24">
                                            <el-radio-group v-model="health_survey.htSex" @change="sexchange">
                                                <el-radio label="女"></el-radio>
                                                <el-radio label="男"></el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" class="from-date">
                                    <el-form-item label="出生年月：" prop="datebirth">
                                        <el-col :span="24">
                                            <el-input v-model="health_survey.htBirthday" style="width:100%"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" class="from-date">
                                    <el-form-item label="身高 (CM)：" prop="height">
                                        <el-col :span="24">
                                            <el-input v-model="health_survey.htHeight" style="width:100%"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" class="from-date">
                                    <el-form-item label="体重 (KG)：" prop="weight">
                                        <el-col :span="24">
                                            <el-input v-model="health_survey.htWeight" style="width:100%"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="24" class="from-date2">
                                    <el-form-item label="地址：" prop="address">
                                        <el-col :span="14">
                                            <el-input v-model="health_survey.htAddress" style="width:100%"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border2">
                                <el-col :span="7" class="from-date3">
                                    <el-form-item label="您曾有坚持体育锻炼吗：" prop="radio" label-width="185px">
                                        <el-col :span="24">
                                            <el-radio-group v-model="health_survey.htIsExercise" @change="Exercisecahnge">
                                                <el-radio :label="1" value="有">有</el-radio>
                                                <el-radio :label="2" value="无">无</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="from-date3">
                                    <el-form-item label="何种体育项目：" prop="event" label-width="120px">
                                        <el-col :span="24">
                                            <el-input v-model="health_survey.htExeName" style="width:130px;opacity: 0.6;"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="from-date3">
                                    <el-form-item label="练习了多长时间：" prop="time" label-width="140px">
                                        <el-col :span="24">
                                            <el-input v-model="health_survey.htExeTime" style="width:130px;opacity: 0.6;"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" class="from-date3">
                                    <el-form-item label="备注：" prop="desc" label-width="70px">
                                        <el-col :span="24">
                                            <el-input v-model="health_survey.htPurRmk" style="width:100%;opacity: 0.6;"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border3">
                                <el-col :span="19" class="from-date3">
                                    <el-form-item label="您大概能在何时练习瑜伽：" prop="checkbox" label-width="200px">
                                        <el-col :span="24">
                                            <el-radio-group v-model="health_survey.htPraTime" style="width: 335px;" @change="htPraTimechange">
                                                <el-radio :label="1">上午</el-radio>
                                                <el-radio :label="2">中午</el-radio>
                                                <el-radio :label="3">下午</el-radio>
                                                <el-radio :label="4">晚上</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" class="from-date3">
                                    <el-form-item label="备注：" prop="desc2" label-width="70px">
                                        <el-col :span="24">
                                            <el-input v-model="health_survey.htPraRmk" style="width:100%;opacity: 0.6;"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border3">
                                <el-col :span="19" class="from-date3">
                                    <el-form-item label="您打算在瑜伽养生方面每年投资多少：" prop="money" label-width="200px">
                                        <el-col :span="24">
                                            <el-radio-group v-model="health_survey.htExpend" style="width: 540px;" @change="htExpendchange">
                                                <el-radio :label="1">6000以下</el-radio>
                                                <el-radio :label="2">6000-10000元</el-radio>
                                                <el-radio :label="3">10000-18000元</el-radio>
                                                <el-radio :label="4">18000以上</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" class="from-date3">
                                    <el-form-item label="备注：" prop="desc3" label-width="70px">
                                        <el-col :span="24">
                                            <el-input v-model="health_survey.htExpRmk" style="width:100%;opacity: 0.6;"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border3">
                                <el-col :span="19" class="from-date3">
                                    <el-form-item label="请描述您现在身体健康状况：" prop="state" label-width="212px" style="text-align:left;">
                                        <el-col :span="24">
                                            <el-radio-group v-model="health_survey.htHealth" style="width: 535px;" @change="htHealthchange">
                                                <el-radio label="体力不足" style="margin-left:30px"></el-radio>
                                                <el-radio label="头晕头痛"></el-radio>
                                                <el-radio label="皮肤问题"></el-radio>
                                                <el-radio label="颈椎问题"></el-radio>
                                                <el-radio label="失眠"></el-radio>
                                                <el-radio label="肠胃问题"></el-radio>
                                                <el-radio label="肾脏问题"></el-radio>
                                                <el-radio label="肝脏问题"></el-radio>
                                                <el-radio label="胆固醇"></el-radio>
                                                <el-radio label="哮喘"></el-radio>
                                                <el-radio label="糖尿病"></el-radio>
                                                <el-radio label="心脏病"></el-radio>
                                                <el-radio label="风湿性关节炎"></el-radio>
                                                <el-radio label="痛经"></el-radio>
                                                <el-radio label="甲亢"></el-radio>
                                                <el-radio label="气管"></el-radio>
                                                <el-radio label="血压"></el-radio>
                                                <el-radio label="痔疮"></el-radio>
                                                <el-radio label="贫血"></el-radio>
                                                <el-radio label="鼻炎"></el-radio>
                                                <el-radio label="内分泌失调"></el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" class="from-date3">
                                    <el-form-item label="备注：" prop="desc4" label-width="70px">
                                        <el-col :span="24">
                                            <el-input v-model="health_survey.htHeaRmk" style="width:100%;opacity: 0.6;"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border4">
                                <el-col :span="19" class="from-date3">
                                    <el-form-item label="您练习瑜伽的目的是：" prop="intent" label-width="175px" style="text-align:left;">
                                        <el-col :span="24">
                                            <el-radio-group v-model="health_survey.htPurpose" style="width: 600px;" @change="htPurposechange">
                                                <el-radio label="减脂塑身" style="margin-left:30px"></el-radio>
                                                <el-radio label="理疗脊柱"></el-radio>
                                                <el-radio label="调理肠胃"></el-radio>
                                                <el-radio label="缓解压力"></el-radio>
                                                <el-radio label="挺拔姿态"></el-radio>
                                                <el-radio label="控制情绪"></el-radio>
                                                <el-radio label="降低血糖"></el-radio>
                                                <el-radio label="排除毒素"></el-radio>
                                                <el-radio label="产前练习"></el-radio>
                                                <el-radio label="柔韧身体"></el-radio>
                                                <el-radio label="心情愉悦"></el-radio>
                                                <el-radio label="改善睡眠"></el-radio>
                                                <el-radio label="加强记忆"></el-radio>
                                                <el-radio label="产后恢复"></el-radio>
                                                <el-radio label="滋养皮肤"></el-radio>
                                                <el-radio label="延缓衰老"></el-radio>
                                                <el-radio label="远离负面情绪"></el-radio>
                                                <el-radio label="平衡内分泌"></el-radio>
                                                <el-radio label="避免骨质疏松"></el-radio>
                                                <el-radio label="增强淋巴功能"></el-radio>
                                                <el-radio label="血液流动畅通"></el-radio>
                                                <el-radio label="增强免疫力"></el-radio>
                                                <el-radio label="良好的空间感"></el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" class="from-date3">
                                    <el-form-item label="备注：" prop="desc5" label-width="70px">
                                        <el-col :span="24">
                                            <el-input v-model="health_survey.htPurRmk" style="width:100%;opacity: 0.6;"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-col>
                    </div>
                    <!-- <el-col :span="24" class="from-date4">
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="addhealthsurvey('health_survey')">提交</el-button>
                            <el-button @click="resetForm('health_survey')">重置</el-button>
                        </el-form-item>
                    </el-col> -->
                </el-form>
            </el-col>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "healthsurvey",
  data() {
    return {
      health_survey: {},
      disabled: true
    };
  },
  created() {
    this.gethealth();
  },
  methods: {
    gethealth() {
      let _this = this;
      requestLogin(
        "/CustomerFollowUp/getCustomerBodyData/" +
          _this.$route.query.potential +
          "/1/" +
          _this.$route.query.id,
        {},
        "get"
      )
        .then(function(res) {
          _this.health_survey = res.health_survey;
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
    // addhealthsurvey(formName){
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       this.$confirm("确认提交吗？", "提示").then(() => {
    //         var loginParams = {
    //           htName: this.health_survey.htName, //姓名
    //           htTel: this.ruleForm.sex, //电话
    //           htSex: this.ruleForm.phone, //性别
    //           htBirthday: this.ruleForm.desc, //生日
    //           htAddress: this.ruleForm.idnumber, //地址
    //           htHeight: this.ruleForm.big, //身高
    //           htWeight: this.ruleForm.small, //体重
    //           htIsExercise: this.ruleForm.role, //是否锻炼 1-是 2-否
    //           htExeName: this.ruleForm.role, //那种体育项目
    //           htExeTime: this.ruleForm.role, //练习了多长时间
    //           htExeRmk: this.ruleForm.role, //体育项目备注
    //           htPraTime: this.ruleForm.role, // 练习时间段 1-上午 2-中午 3-下午 4-晚上
    //           htPraRmk: this.ruleForm.role, //练习时间段备注
    //           htExpend: this.ruleForm.role, //投资预算    1/6000以下 2/6000-10000元 3/10000-18000元 4/18000元以上
    //           htExpRmk: this.ruleForm.role, //投资预算备注
    //           htHealth: this.ruleForm.role, //健康状态
    //           htHeaRmk: this.ruleForm.role, //健康状态 备注
    //           htPurpose: this.ruleForm.role, //练习目的
    //           htPurRmk: this.ruleForm.role, //练习目的备注
    //         };
    //         requestLogin("/CustomerFollowUp/addHealthSurvey", loginParams, "post")
    //           .then(data => {
    //             this.$message({
    //               message: "提交成功",
    //               type: "success"
    //             });
    //             this.resetForm(formName);
    //           })
    //           .catch(error => {
    //             let { response: { data: { errorCode, msg } } } = error;
    //             if (errorCode != 0) {
    //               this.$message({
    //                 message: msg,
    //                 type: "error"
    //               });
    //               return;
    //             }
    //           });
    //       });
    //     } else {
    //       this.$message({ message: "提交失败!", type: "error" });
    //       return false;
    //     }
    //   });
    // },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    //性别
    sexchange(val) {},
    Exercisecahnge(val) {},
    htPraTimechange(val) {},
    htExpendchange(val) {},
    htHealthchange(val) {},
    htPurposechange(val) {},
    back() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/healthsurvey.scss";
.health {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  display: inline-block;
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
    width: 90%;
    margin: 20px auto;
    display: inline-block;
    background: #f7fffc;
    .outside {
      margin-top: 20px;
      .outside-biao {
        font-size: 16px;
        color: #262626;
        .outside-biao2 {
          font-size: 14px;
          color: #262626;
        }
      }
    }
    .box {
      margin: 20px auto;
      width: 95%;
      height: 1px;
      background: -webkit-linear-gradient(
        to right,
        #fff,
        #00bc71,
        #fff
      ); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(
        to right,
        #fff,
        #00bc71,
        #fff
      ); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(
        to right,
        #fff,
        #00bc71,
        #fff
      ); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #fff, #00bc71, #fff);
      /* 标准的语法（必须放在最后） */
    }
    .health-from {
      .from-date-border {
        width: 100%;
        .from-date {
          display: flex;
          .el-form-item {
            margin-bottom: 10px;
            margin-top: 10px;
          }
        }
      }
      .from-date-border {
        width: 100%;
        .from-date2 {
          .el-form-item {
            margin-bottom: 10px;
            margin-top: 10px;
          }
        }
      }
      .from-date-border2 {
        border-bottom: 1px solid #e8e8e8;
        .from-date3 {
          display: flex;
          .el-form-item {
            margin-bottom: 10px;
            margin-top: 10px;
            .el-form-item__content {
              .el-input {
                .el-input__inner {
                  border: none;
                  background: #fafafa;
                }
              }
            }
          }
        }
      }
      .from-date-border3 {
        border-bottom: 1px solid #e8e8e8;
        .from-date3 {
          display: flex;
          .el-form-item {
            margin-bottom: 10px;
            margin-top: 10px;
            .el-form-item__content {
              .el-input {
                .el-input__inner {
                  border: none;
                  background: #fafafa;
                }
              }
            }
          }
        }
      }
      .from-date-border4 {
        .from-date3 {
          display: flex;
          .el-form-item {
            margin-bottom: 10px;
            margin-top: 10px;
            .el-form-item__content {
              .el-input {
                .el-input__inner {
                  border: none;
                  background: #fafafa;
                }
              }
            }
          }
        }
      }
    }
  }
  .from-date4 {
    margin-top: 20px;
  }
}
</style>