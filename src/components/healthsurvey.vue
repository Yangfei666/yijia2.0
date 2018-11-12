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
                <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
                    <div class="health-main">
                        <el-col :span="24" class="outside">
                            <span class="outside-biao">健康调查表
                                <span class="outside-biao2">（
                                    <b style="color:#ff0000">*</b>号必填）</span>
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
                                            <el-input v-model="ruleForm.name" placeholder="请输入" style="width:100%"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" class="from-date">
                                    <el-form-item label="联系电话：" prop="tel">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.tel" placeholder="请输入" style="width:100%"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" class="from-date">
                                    <el-form-item label="性别：" prop="sex">
                                        <el-col :span="24">
                                            <el-radio-group v-model="ruleForm.sex">
                                                <el-radio label="女"></el-radio>
                                                <el-radio label="男"></el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" class="from-date">
                                    <el-form-item label="出生年月：" prop="datebirth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.datebirth" placeholder="请输入" style="width:100%"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" class="from-date">
                                    <el-form-item label="身高 (CM)：" prop="height">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.height" placeholder="请输入" style="width:100%"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" class="from-date">
                                    <el-form-item label="体重 (KG)：" prop="weight">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.weight" placeholder="请输入" style="width:100%"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="24" class="from-date2">
                                    <el-form-item label="地址：" prop="address">
                                        <el-col :span="14">
                                            <el-input v-model="ruleForm.address" placeholder="请输入" style="width:100%"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border2">
                                <el-col :span="7" class="from-date3">
                                    <el-form-item label="您曾有坚持体育锻炼吗：" prop="radio" label-width="185px">
                                        <el-col :span="24">
                                            <el-radio-group v-model="ruleForm.radio">
                                                <el-radio label="有"></el-radio>
                                                <el-radio label="无"></el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="from-date3">
                                    <el-form-item label="何种体育项目：" prop="event" label-width="120px">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.event" placeholder="--" style="width:130px;opacity: 0.6;"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="from-date3">
                                    <el-form-item label="练习了多长时间：" prop="time" label-width="140px">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.time" placeholder="--" style="width:130px;opacity: 0.6;"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" class="from-date3">
                                    <el-form-item label="备注：" prop="desc" label-width="70px">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.desc" placeholder="--" style="width:100%;opacity: 0.6;"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border3">
                                <el-col :span="19" class="from-date3">
                                    <el-form-item label="您大概能在何时练习瑜伽：" prop="checkbox" label-width="200px">
                                        <el-col :span="24">
                                            <el-checkbox-group v-model="ruleForm.checkbox">
                                                <el-checkbox label="上午" name="checkbox"></el-checkbox>
                                                <el-checkbox label="中午" name="checkbox"></el-checkbox>
                                                <el-checkbox label="下午" name="checkbox"></el-checkbox>
                                                <el-checkbox label="晚上" name="checkbox"></el-checkbox>
                                            </el-checkbox-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" class="from-date3">
                                    <el-form-item label="备注：" prop="desc2" label-width="70px">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.desc2" placeholder="--" style="width:100%;opacity: 0.6;"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border3">
                                <el-col :span="19" class="from-date3">
                                    <el-form-item label="您打算在瑜伽养生方面每年投资多少：" prop="money" label-width="200px">
                                        <el-col :span="24">
                                            <el-checkbox-group v-model="ruleForm.money">
                                                <el-checkbox label="6000以下" name="money"></el-checkbox>
                                                <el-checkbox label="6000-10000元" name="money"></el-checkbox>
                                                <el-checkbox label="10000-18000元" name="money"></el-checkbox>
                                                <el-checkbox label="18000以上" name="money"></el-checkbox>
                                            </el-checkbox-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" class="from-date3">
                                    <el-form-item label="备注：" prop="desc3" label-width="70px">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.desc3" placeholder="--" style="width:100%;opacity: 0.6;"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border3">
                                <el-col :span="19" class="from-date3">
                                    <el-form-item label="请描述您现在身体健康状况：" prop="state" label-width="212px" style="text-align:left;">
                                        <el-col :span="24">
                                            <el-checkbox-group v-model="ruleForm.state">
                                                <el-checkbox label="体力不足" name="state" style="margin-left:30px"></el-checkbox>
                                                <el-checkbox label="头晕头痛" name="state"></el-checkbox>
                                                <el-checkbox label="皮肤问题" name="state"></el-checkbox>
                                                <el-checkbox label="颈椎问题" name="state"></el-checkbox>
                                                <el-checkbox label="失眠" name="state"></el-checkbox>
                                                <el-checkbox label="哮喘" name="state"></el-checkbox>
                                                <el-checkbox label="肠胃问题" name="state"></el-checkbox>
                                                <el-checkbox label="内分泌失调" name="state"></el-checkbox>
                                                <el-checkbox label="胆固醇" name="state"></el-checkbox>
                                                <el-checkbox label="糖尿病" name="state"></el-checkbox>
                                                <el-checkbox label="心脏病" name="state"></el-checkbox>
                                                <el-checkbox label="痛经" name="state"></el-checkbox>
                                                <el-checkbox label="肾脏问题" name="state"></el-checkbox>
                                                <el-checkbox label="风湿性关节炎" name="state"></el-checkbox>
                                                <el-checkbox label="甲亢" name="state"></el-checkbox>
                                                <el-checkbox label="气管" name="state"></el-checkbox>
                                                <el-checkbox label="血压" name="state"></el-checkbox>
                                                <el-checkbox label="肝脏问题" name="state"></el-checkbox>
                                                <el-checkbox label="痔疮" name="state"></el-checkbox>
                                                <el-checkbox label="贫血" name="state"></el-checkbox>
                                                <el-checkbox label="鼻炎" name="state"></el-checkbox>
                                            </el-checkbox-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" class="from-date3">
                                    <el-form-item label="备注：" prop="desc4" label-width="70px">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.desc4" placeholder="--" style="width:100%;opacity: 0.6;"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border4">
                                <el-col :span="19" class="from-date3">
                                    <el-form-item label="您练习瑜伽的目的是：" prop="intent" label-width="175px" style="text-align:left;">
                                        <el-col :span="24">
                                            <el-checkbox-group v-model="ruleForm.intent">
                                                <el-checkbox label="减脂塑身" name="intent" style="margin-left:30px"></el-checkbox>
                                                <el-checkbox label="理疗脊柱" name="intent"></el-checkbox>
                                                <el-checkbox label="调理肠胃" name="intent"></el-checkbox>
                                                <el-checkbox label="缓解压力" name="intent"></el-checkbox>
                                                <el-checkbox label="挺拔姿态" name="intent"></el-checkbox>
                                                <el-checkbox label="控制情绪" name="intent"></el-checkbox>
                                                <el-checkbox label="降低血糖" name="intent"></el-checkbox>
                                                <el-checkbox label="排除毒素" name="intent"></el-checkbox>
                                                <el-checkbox label="产前练习" name="intent"></el-checkbox>
                                                <el-checkbox label="柔韧身体" name="intent"></el-checkbox>
                                                <el-checkbox label="心情愉悦" name="intent"></el-checkbox>
                                                <el-checkbox label="改善睡眠" name="intent"></el-checkbox>
                                                <el-checkbox label="加强记忆" name="intent"></el-checkbox>
                                                <el-checkbox label="产后恢复" name="intent"></el-checkbox>
                                                <el-checkbox label="滋养皮肤" name="intent"></el-checkbox>
                                                <el-checkbox label="延缓衰老" name="intent"></el-checkbox>
                                                <el-checkbox label="远离负面情绪" name="intent"></el-checkbox>
                                                <el-checkbox label="平衡内分泌" name="intent"></el-checkbox>
                                                <el-checkbox label="避免骨质疏松" name="intent"></el-checkbox>
                                                <el-checkbox label="增强淋巴功能" name="intent"></el-checkbox>
                                                <el-checkbox label="血液流动畅通" name="intent"></el-checkbox>
                                                <el-checkbox label="增强免疫力" name="intent"></el-checkbox>
                                                <el-checkbox label="良好的空间感" name="intent"></el-checkbox>
                                            </el-checkbox-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" class="from-date3">
                                    <el-form-item label="备注：" prop="desc5" label-width="70px">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.desc5" placeholder="--" style="width:100%;opacity: 0.6;"></el-input>
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
export default {
  name: "healthsurvey",
  data() {
    return {
      ruleForm: {
        name: "", //姓名
        tel: "", //电话
        sex: "", //性别
        datebirth: "", //出生年月
        height: "", //身高
        weight: "", //体重
        address: "", //地址
        radio: "", //坚持锻炼体育吗
        event: "", //何种体育
        time: "", //练习了多长时间
        desc: "", //备注1
        checkbox: "", //打算何时练习瑜伽
        desc2: "", //备注2
        money: "", //打算投资多少
        desc3: "", //备注3
        state: "", //身体状况
        desc4: "", //备注4
        intent: "", //目的
        desc5: "", //备注5
        checkbox: [], //何时练习瑜伽选择
        money: [], //投资多少选择
        state: [], //健康状况选择
        intent: [] //目的选择
      }
    };
  },
  created() {
    console.log(this.$route);
    this.gethealth();
  },
  methods: {
    gethealth() {
      let _this = this;
      requestLogin("/CustomerFollowUp/getCustomerBodyData/potential/1/13",{},"get")
        .then(function(res) {
            console.log(res);
        })
        .catch(error => {
          if (error) {
            this.$message({
              message: "获取数据失败",
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
    background: #fafafa;
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