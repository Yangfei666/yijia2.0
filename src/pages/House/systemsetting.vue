<template>
    <div>
        <el-col :span="24">
            <div class="practice-main">
                <el-col :span="23" class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>会所管理</el-breadcrumb-item>
                        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
                <el-col :span="23" class="weber">
                    <span class="weber-span">系统设置</span>
                </el-col>
            </div>
        </el-col>
        <!--系统设置-->
        <div class="health">
            <el-col :span="24">
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" :disabled='disabled'>
                    <div class="health-main">
                        <el-col :span="24" class="outside">
                            <span class="outside-biao">系统设置</span>
                            <span style="color:#00bc71;border-radius:20px;font-size:12px;width:40px;display:inline-block;border:1px solid;height:17px" @click="editAll">编辑</span>
                        </el-col>
                        <el-col :span="24">
                            <div class="box"></div>
                        </el-col>
                        <el-col :span="24" class="health-from">
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="会所开馆时间：" prop="openTime" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-time-select v-model="ruleForm.openTime" value-format="HH:mm" style="width:250px" :picker-options="{ start: '05:00', step: '00:15', end: '24:00'}" placeholder="默认05:00"></el-time-select>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="会所闭馆时间：" prop="closeTime" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-time-select v-model="ruleForm.closeTime" value-format="HH:mm" style="width:250px" :picker-options="{ start: '05:00', step: '00:15', end: '24:00'}" placeholder="默认24:00"></el-time-select>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="会员卡激活时间(天数)：" prop="activation" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.activation" style="width:250px" placeholder="默认30天,最大99"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="提前进场时间(小时)：" prop="enterTime" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.enterTime" style="width:250px" placeholder="默认2小时,最大99"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="每月免于惩罚的次数：" prop="punishCount" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.punishCount" style="width:250px" placeholder="默认3,最大9"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="私教课最大时长：" prop="lengthOfTime" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.lengthOfTime" style="width:250px" placeholder="默认120分钟"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="信用1级约私教天数：" prop="personalDate1" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.personalDate1" style="width:250px" placeholder="默认30"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="信用2级约私教天数：" prop="personalDate2" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.personalDate2" style="width:250px" placeholder="默认25"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="信用3级约私教天数：" prop="personalDate3" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.personalDate3" style="width:250px" placeholder="默认20"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="信用4级约私教天数：" prop="personalDate4" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.personalDate4" style="width:250px" placeholder="默认15"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="信用5级约私教天数：" prop="personalDate5" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.personalDate5" style="width:250px" placeholder="默认10"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="信用6级约私教天数：" prop="personalDate6" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.personalDate6" style="width:250px" placeholder="默认5"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="惩罚升级的次数：" prop="punishRscalation" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.punishRscalation" style="width:250px" placeholder="默认1"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="惩罚升级的措施：" prop="numTwo" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.numTwo" style="width:250px" placeholder="默认2"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="客户端团课提前预约(天数)：" prop="apiLeagueDate" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.apiLeagueDate" style="width:250px" placeholder="默认3天"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="客户端私教提前预约(天数)：" prop="apiPersonalDate" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.apiPersonalDate" style="width:250px" placeholder="默认3天"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="客户端团课提前预约时间(分钟)：" prop="apiLeagueTime" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.apiLeagueTime" style="width:250px" placeholder="默认120分钟"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="客户端私教提前预约时间(分钟)：" prop="apiPersonalTime" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.apiPersonalTime" style="width:250px" placeholder="默认120分钟"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="团课提前预约时间(天数)：" prop="leagueDate" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.leagueDate" style="width:250px" placeholder="默认3天,最大99"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="是否开启惩罚：" prop="isPunish" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-radio-group v-model="ruleForm.isPunish" @change="chanegtext">
                                                <el-radio :label="0">否</el-radio>
                                                <el-radio :label="1">是</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border" v-if="ruleForm.isPunish != 0 && ruleForm.isPunish == 1">
                                <el-col :span="24" class="from-date">
                                    <el-form-item label="会员惩罚措施编号：" prop="punishNum" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-radio-group v-model="ruleForm.punishNum" @change="chanegtext">
                                                <el-radio :label="1">几天内不能上课</el-radio>
                                                <el-radio :label="2">扣次数或金额或有效期</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border" v-if="ruleForm.isPunish != 0 && ruleForm.punishNum == 1">
                                <el-col :span="24" class="from-date">
                                    <el-form-item label="几天内不让上课：" prop="date" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.date" style="width:250px" placeholder="默认7,最大9"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border2" v-if="ruleForm.isPunish != 0 && ruleForm.punishNum != 1">
                                <el-col :span="8" class="from-date2">
                                    <el-form-item label="扣具体次数：" prop="num" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.num" style="width:100%" placeholder="默认1"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" class="from-date2">
                                    <el-form-item label="扣具体金额(元)：" prop="price" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.price" style="width:100%" placeholder="默认100"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" class="from-date2">
                                    <el-form-item label="扣具体时间(天数)：" prop="time" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.time" style="width:100%" placeholder="默认15"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border3">
                                <el-col :span="24" class="from-date3">
                                    <el-form-item label="客户至少提前多少时间取消预约(分钟)：" prop="punishTime" label-width="270px">
                                        <el-col :span="24">
                                            <el-input v-model="ruleForm.punishTime" style="width:450px" placeholder="默认120分钟,最大999"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-col>
                    </div>
                    <el-col :span="24" class="from-date4" v-show="hide">
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="addhealthsurvey('ruleForm')">提交</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
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
  name: "systemsetting",
  inject: ["reload"],
  data() {
    return {
      disabled: false,
      hide: false,
      formLabelWidth: "220px",
      ruleForm: {
        openTime: new Date(2016, 9, 10, 18, 40), //会所开馆时间
        closeTime: new Date(2016, 9, 10, 18, 40), //会所闭馆时间
        activation: "", //会员卡激活时间
        enterTime: "", //提前进场时间
        punishTime: "", //客户至少提前多少时间取消预约
        punishCount: "", //每月免于惩罚的次数
        lengthOfTime: "", //私教课最大时长
        punishNum: "", //会员惩罚措施编号
        isPunish: "", //是否开启惩罚
        date: "", //日期
        num: "", //天数
        price: "", //价格
        time: "", //时间
        leagueDate: "", //团课提前预约时间
        apiLeagueDate: "", //客户端团课提前预约
        apiPersonalDate: "", //客户端私教提前预约
        apiLeagueTime: "", //客户端团课提前预约时间
        apiPersonalTime: "", //客户端私教提前预约时间
        punishRscalation: "", //惩罚升级的次数
        numTwo: "", //惩罚升级的措施
        personalDate1: "", //信用1级约私教天数
        personalDate2: "", //信用2级约私教天数
        personalDate3: "", //信用3级约私教天数
        personalDate4: "", //信用4级约私教天数
        personalDate5: "", //信用5级约私教天数
        personalDate6: "" //信用6级约私教天数
      }
    };
  },
  created() {
    this.gethealth();
  },
  methods: {
    gethealth() {
      let _this = this;
      requestLogin("/getClubParams", {}, "get")
        .then(function(res) {
          if (res == null) {
            _this.disabled = false;
            _this.hide = true;
          } else {
            _this.ruleForm = res;
            _this.disabled = true;
            _this.hide = false;
          }
        })
        .catch(error => {
          if (error.res) {
            this.$message({
              message: "暂时没有数据",
              type: "error"
            });
          }
        });
    },
    addhealthsurvey(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        var loginParams = {
          openTime: this.ruleForm.openTime, //会所开馆时间
          closeTime: this.ruleForm.closeTime, //会所闭馆时间
          activation: this.ruleForm.activation, //会员卡激活时间
          enterTime: this.ruleForm.enterTime, //提前进场时间
          punishTime: this.ruleForm.punishTime, //客户至少提前多少时间取消预约
          punishCount: this.ruleForm.punishCount, //每月免于惩罚的次数
          lengthOfTime: this.ruleForm.lengthOfTime, //私教课最大时长
          punishNum: this.ruleForm.punishNum, //会员惩罚措施编号
          isPunish: this.ruleForm.isPunish, //是否开启惩罚
          date: this.ruleForm.date, //日期
          num: this.ruleForm.num, //天数
          price: this.ruleForm.price, // 价格
          time: this.ruleForm.time, //时间
          leagueDate: this.ruleForm.leagueDate, //团课提前预约时间
          apiLeagueDate: this.ruleForm.apiLeagueDate, //客户端团课提前预约
          apiPersonalDate: this.ruleForm.apiPersonalDate, //客户端私教提前预约
          apiLeagueTime: this.ruleForm.apiLeagueTime, //客户端团课提前预约时间
          apiPersonalTime: this.ruleForm.apiPersonalTime, //客户端私教提前预约时间
          punishRscalation: this.ruleForm.punishRscalation, //惩罚升级的次数
          numTwo: this.ruleForm.numTwo, //惩罚升级的措施
          personalDate1: this.ruleForm.personalDate1, //信用1级约私教天数
          personalDate2: this.ruleForm.personalDate2, //信用2级约私教天数
          personalDate3: this.ruleForm.personalDate3, //信用3级约私教天数
          personalDate4: this.ruleForm.personalDate4, //信用4级约私教天数
          personalDate5: this.ruleForm.personalDate5, //信用5级约私教天数
          personalDate6: this.ruleForm.personalDate6 //信用6级约私教天数
        };
        requestLogin("/setClubParams", loginParams, "post")
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
      this.$refs[formName].resetFields();
    },
    chanegtext(val) {},
    editAll() {
      this.disabled = false;
      this.hide = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/systemsetting.scss";
.practice-main {
  height: 112px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  .breadcrumb {
    margin: 17px 20px auto;
  }
  .weber {
    margin: 17px 20px auto;
    height: 45px;
    display: flex;
    line-height: 45px;
    .weber-span {
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      font-family: PingFang-SC-Regular;
    }
    .search {
      width: 261px;
      border: 1px solid #e8e8e8;
      height: 32px;
      margin: 5px 35px auto;
      display: flex;
      border-radius: 16px;
      .search-input {
        width: 100%;
        border-radius: 16px;
        border: none;
        text-indent: 10px;
        color: #8c8c8c;
        font-size: 14px;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
    }
  }
}
.health {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  display: inline-block;
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
      background: -webkit-linear-gradient(to right, #fff, #00bc71, #fff);
      background: -o-linear-gradient(to right, #fff, #00bc71, #fff);
      background: -moz-linear-gradient(to right, #fff, #00bc71, #fff);
      background: linear-gradient(to right, #fff, #00bc71, #fff);
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
      .from-date-border2 {
        width: 100%;
        .from-date2 {
          display: flex;
          .el-form-item {
            margin-bottom: 10px;
            margin-top: 10px;
          }
        }
      }
      .from-date-border3 {
        width: 100%;
        .from-date3 {
          display: flex;
          .el-form-item {
            margin-bottom: 10px;
            margin-top: 10px;
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
