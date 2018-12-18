<template>
    <div>
        <!--健康调查表-->
        <div class="health">
            <el-col :span="24" class="infor-head">
                <div class="infor-title">
                    <span>健康调查表</span>
                </div>
                <div class="infor-but" v-on:click="back">
                    <el-button class="goback el-icon-arrow-left">返回</el-button>
                </div>
            </el-col>
            <el-col :span="24">
                <el-form :model="health_survey" label-width="100px" class="demo-ruleForm" :disabled='disabled'>
                    <div class="health-main">
                        <el-col :span="24" class="outside">
                            <span class="outside-biao">健康调查表</span>
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
                                            <el-radio-group v-model="health_survey.htSex">
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
                                            <el-radio-group v-model="health_survey.htIsExercise">
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
                                            <el-checkbox-group v-model="health_survey.htPraTime" style="width: 335px;">
                                                <el-checkbox v-for="i in htPraTime" :label="i" :key="i">{{i}}</el-checkbox>
                                            </el-checkbox-group>
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
                                            <el-radio-group v-model="health_survey.htExpend" style="width: 540px;">
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
                                            <el-checkbox-group v-model="health_survey.htHealth" style="width: 535px;">
                                                <el-checkbox v-for="i in htHealth" :label="i" :key="i">{{i}}</el-checkbox>
                                            </el-checkbox-group>
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
                                            <el-checkbox-group v-model="health_survey.htPurpose" style="width: 600px;">
                                                <el-checkbox v-for="i in htPurpose" :label="i" :key="i">{{i}}</el-checkbox>
                                            </el-checkbox-group>
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
                </el-form>
            </el-col>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
const htPraTimeoptions = ["上午", "中午", "下午", "晚上"];
const htHealthoptions = [
  "体力不足",
  "头晕头痛",
  "皮肤问题",
  "颈椎问题",
  "失眠",
  "肠胃问题",
  "肾脏问题",
  "肝脏问题",
  "胆固醇",
  "哮喘",
  "糖尿病",
  "风湿性关节炎",
  "心脏病",
  "痛经",
  "甲亢",
  "气管",
  "血压",
  "痔疮",
  "贫血",
  "鼻炎",
  "内分泌失调"
];
const htPurposeoptions = [
  "减脂塑身",
  "理疗脊柱",
  "调理肠胃",
  "缓解压力",
  "挺拔姿态",
  "控制情绪",
  "降低血糖",
  "排除毒素",
  "产前练习",
  "柔韧身体",
  "心情愉悦",
  "改善睡眠",
  "加强记忆",
  "产后恢复",
  "滋养皮肤",
  "延缓衰老",
  "远离负面情绪",
  "平衡内分泌",
  "避免骨质疏松",
  "增强淋巴功能",
  "血液流动畅通",
  "增强免疫力",
  "良好的空间感"
];
export default {
  name: "healthsurvey",
  data() {
    return {
      health_survey: {},
      disabled: true,
      htPraTime: [],
      htPraTime: htPraTimeoptions,
      htHealth: [],
      htHealth: htHealthoptions,
      htPurpose: [],
      htPurpose: htPurposeoptions
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
          if (res.health_survey != null) {
            _this.health_survey = res.health_survey;
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
    justify-content: space-between;
    line-height: 50px;
    border-bottom: 1px solid #e8e8e8;
    .infor-but {
      padding-right: 10px;
      font-size: 16px;
      color: #262626;
      .goback {
        border: none;
        background: #fff;
        font-size: 16px;
      }
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
.el-checkbox + .el-checkbox {
  margin-left: 0px;
}
.el-checkbox {
  margin-right: 25px;
}
</style>