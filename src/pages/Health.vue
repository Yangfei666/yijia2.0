<template>
    <div>
        <div class="health">
            <el-form :model="health_survey" :rules="rules" ref="health_survey" label-width="100px" class="demo-ruleForm">
                <div class="health-main">
                    <el-col :span="24" class="outside">
                      <span style="margin-right: 30px;"><strong>{{clubAndStaff.clubName}}</strong> - <strong>{{clubAndStaff.staffName}}</strong></span>
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
                                <el-form-item label="姓名：" prop="htName">
                                    <el-col :span="24">
                                        <el-input v-model="health_survey.htName" style="width:100%"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="from-date">
                                <el-form-item label="联系电话：" prop="htTel">
                                    <el-col :span="24">
                                        <el-input v-model="health_survey.htTel" maxlength="11" style="width:100%"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="from-date">
                                <el-form-item label="性别：" prop="htSex">
                                    <el-col :span="24">
                                        <el-radio-group v-model="health_survey.htSex" @change="sexchange">
                                            <el-radio label="女"></el-radio>
                                            <el-radio label="男"></el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="from-date">
                                <el-form-item label="出生年月：" prop="htBirthday">
                                    <el-col :span="24">
                                        <el-date-picker v-model="health_survey.htBirthday" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width:202px" type="date" placeholder="选择日期">
                                        </el-date-picker>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="from-date">
                                <el-form-item label="身高 (CM)：" prop="htHeight">
                                    <el-col :span="24">
                                        <el-input v-model="health_survey.htHeight" style="width:100%"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="from-date">
                                <el-form-item label="体重 (KG)：" prop="htWeight">
                                    <el-col :span="24">
                                        <el-input v-model="health_survey.htWeight" style="width:100%"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :span="24" class="from-date-border">
                            <el-col :span="24" class="from-date2">
                                <el-form-item label="地址：" prop="htAddress">
                                    <el-col :span="10">
                                        <el-input v-model="health_survey.htAddress" style="width:100%"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :span="24" class="from-date-border2" style="border-bottom: 1px solid #fff">
                            <el-col :span="7" class="from-date3">
                                <el-form-item label="您曾有坚持体育锻炼吗：" prop="htIsExercise" label-width="185px">
                                    <el-col :span="24">
                                        <el-radio-group v-model="health_survey.htIsExercise" @change="Exercisecahnge">
                                            <el-radio :label="1">有</el-radio>
                                            <el-radio :label="2">无</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5" class="from-date3" style="float:right">
                                <el-form-item label="备注：" prop="htExeRmk" label-width="70px">
                                    <el-col :span="24">
                                        <el-input v-model="health_survey.htExeRmk" style="width:100%;opacity: 0.6;"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :span="24" class="from-date-border2">
                            <el-col :span="10" class="from-date3" v-show="health_survey.htIsExercise == 1">
                                <el-form-item label="何种体育项目：" prop="htExeName" label-width="185px">
                                    <el-col :span="24">
                                        <el-input v-model="health_survey.htExeName" style="width:140px;opacity: 0.6;"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" class="from-date3" v-show="health_survey.htIsExercise == 1">
                                <el-form-item label="练习了多长时间：" prop="htExeTime" label-width="185px">
                                    <el-col :span="24">
                                        <el-input v-model="health_survey.htExeTime" style="width:140px;opacity: 0.6;"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :span="24" class="from-date-border3">
                            <el-col :span="19" class="from-date3">
                                <el-form-item label="您大概能在何时练习瑜伽：" prop="htPraTime" label-width="200px">
                                    <el-col :span="24">
                                        <el-checkbox-group v-model="health_survey.htPraTime" :min="1" :max="4"  style="width: 335px;" @change="htPraTimechange">
                                            <el-checkbox v-for="city in PraTime" :label="city" :key="city">{{city}}</el-checkbox>
                                        </el-checkbox-group>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5" class="from-date3">
                                <el-form-item label="备注：" prop="htPraRmk" label-width="70px">
                                    <el-col :span="24">
                                        <el-input v-model="health_survey.htPraRmk" style="width:100%;opacity: 0.6;"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :span="24" class="from-date-border3">
                            <el-col :span="19" class="from-date3">
                                <el-form-item label="您打算在瑜伽养生方面每年投资多少：" prop="htExpend" label-width="200px">
                                    <el-col :span="24">
                                        <el-radio-group v-model="health_survey.htExpend" style="width: 540px;" @change="htExpendchange">
                                            <el-radio :label="1" style="margin-left:20px">6000以下</el-radio>
                                            <el-radio :label="2">6000-10000元</el-radio>
                                            <el-radio :label="3">10000-18000元</el-radio>
                                            <el-radio :label="4">18000以上</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5" class="from-date3">
                                <el-form-item label="备注：" prop="htExpRmk" label-width="70px">
                                    <el-col :span="24">
                                        <el-input v-model="health_survey.htExpRmk" style="width:100%;opacity: 0.6;"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :span="24" class="from-date-border3">
                            <el-col :span="19" class="from-date3">
                                <el-form-item label="请描述您现在身体健康状况：" prop="htHealth" label-width="212px" style="text-align:left;">
                                    <el-col :span="24">
                                        <el-checkbox-group v-model="health_survey.htHealth" :min="1" :max="10" style="width: 752px;" @change="htHealthchange">
                                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                                        </el-checkbox-group>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5" class="from-date3">
                                <el-form-item label="备注：" prop="htHeaRmk" label-width="70px">
                                    <el-col :span="24">
                                        <el-input v-model="health_survey.htHeaRmk" style="width:100%;opacity: 0.6;"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :span="24" class="from-date-border4">
                            <el-col :span="19" class="from-date3">
                                <el-form-item label="您练习瑜伽的目的是：" prop="htPurpose" label-width="212px" style="text-align:left;">
                                    <el-col :span="24">
                                        <el-checkbox-group v-model="health_survey.htPurpose" :min="1" :max="20" style="width: 752px;" @change="htPurposechange">
                                            <el-checkbox v-for="city in pose" :label="city" :key="city">{{city}}</el-checkbox>
                                        </el-checkbox-group>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5" class="from-date3">
                                <el-form-item label="备注：" prop="htPurRmk" label-width="70px">
                                    <el-col :span="24">
                                        <el-input v-model="health_survey.htPurRmk" style="width:100%;opacity: 0.6;"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="from-date4">
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="addhealthsurvey('health_survey')">提交</el-button>
                            <el-button @click="resetForm('health_survey')" plain>重置</el-button>
                        </el-form-item>
                    </el-col>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
const cityOptions = [
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
const cityOptions2 = [
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
const cityOptions3 = [
    "上午",
    "中午",
    "下午",
    "晚上"
];
export default {
  data() {
    return {
      health_survey: {
        htName: "", //姓名
        htTel: "", //电话
        htSex: "", //性别
        htBirthday: "", //出生年月
        htHeight: "", //身高
        htWeight: "", //体重
        htAddress: "", //地址
        htIsExercise: "", //是否坚持体育
        htExeName: "", //何种体育项目
        htExeTime: "", //练习多长时间
        htExeRmk: "", //备注
        htPraTime:[], //在何时练习瑜伽
        htPraRmk: "", //备注
        htExpend: "", //投资多少
        htExpRmk: "", //备注
        htHealth: [], //身体状况
        htHeaRmk: "", //备注
        htPurpose: [], //目的是
        htPurRmk: "", //备注
        staffId:'',
        hsid:''
      },
      clubAndStaff:'',
      cities: cityOptions,
      pose: cityOptions2,
      PraTime: cityOptions3,
      rules: {
        htName: [{ required: true, message: "请输入姓名", trigger: "blur" },],
        htTel: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
            message: "格式错误"
          }
        ],
        htSex: [{ required: true, message: "请选择性别", trigger: "change" }]
      }
    };
  },
  beforeMount(){
    this.clubAndStaff = JSON.parse(sessionStorage.getItem('selected-club'));
  },
  methods: {
    addhealthsurvey(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              htName: this.health_survey.htName, //姓名
              htTel: this.health_survey.htTel, //电话
              htSex: this.health_survey.htSex, //性别
              htBirthday: this.health_survey.htBirthday, //生日
              htAddress: this.health_survey.htAddress, //地址
              htHeight: this.health_survey.htHeight, //身高
              htWeight: this.health_survey.htWeight, //体重
              htIsExercise: this.health_survey.htIsExercise, //是否锻炼 1-是 2-否
              htExeName: this.health_survey.htExeName, //那种体育项目
              htExeTime: this.health_survey.htExeTime, //练习了多长时间
              htExeRmk: this.health_survey.htExeRmk, //体育项目备注
              htPraTime: this.health_survey.htPraTime, // 练习时间段 1-上午 2-中午 3-下午 4-晚上
              htPraRmk: this.health_survey.htPraRmk, //练习时间段备注
              htExpend: this.health_survey.htExpend, //投资预算    1/6000以下 2/6000-10000元 3/10000-18000元 4/18000元以上
              htExpRmk: this.health_survey.htExpRmk, //投资预算备注
              htHealth: this.health_survey.htHealth, //健康状态
              htHeaRmk: this.health_survey.htHeaRmk, //健康状态 备注
              htPurpose: this.health_survey.htPurpose, //练习目的
              htPurRmk: this.health_survey.htPurRmk,//练习目的备注
              staffId:this.clubAndStaff.staffID,
              hsid:this.clubAndStaff.clubID
            };
            requestLogin(
              "/CustomerFollowUp/addHealthSurvey",
              loginParams,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.resetForm(formName);
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
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    sexchange(val) {
    },
    Exercisecahnge(val) {
    },
    htPraTimechange(val) {
    },
    htExpendchange(val) {
    },
    htHealthchange(val) {
    },
    htPurposechange(val) {
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/health.scss";
.health {
  width: 100%;
  height: 100%;
  display: inline-block;
  .health-main {
    width: 90%;
    margin: 3% auto;
    height: 100%;
    display: flow-root;
    border-radius: 5px;
    background: #f7fffc;
    border: 1px solid #e8e8e8;
    .outside {
      margin-top: 20px;
      text-align: center;
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
    .from-date4 {
      margin-top: 4%;
      text-align: center;
    }
  }
}
.el-checkbox + .el-checkbox {
  margin-left: 0px;
}
.el-checkbox {
  margin-right: 25px;
}
</style>

