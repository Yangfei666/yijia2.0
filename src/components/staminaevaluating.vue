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
                    <span>体能评估表（
                        <span style="color:#00bc71;font-size:16px">最新日期Date:</span>
                        <el-date-picker v-model="timeDefaultShow" format="yyyy年MM月dd日" disabled :default-value="timeDefaultShow" type="date" style="width:190px" value-format="yyyy-MM-dd">
                        </el-date-picker>）</span>
                    <img src="../assets/deit.png" @click="editAll" v-show="hide" />
                </div>
            </el-col>
            <el-col :span="24">
                <el-form :model="physical_energy_assessment" class="demo-ruleForm" :disabled="edit">
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
                                    <span style="padding-left:10px;">静态心率 Resting HeartRate</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" v-model="physical_energy_assessment.stHeartRate0" type="text" />
                                    <el-input class="ating-ipt" v-model="physical_energy_assessment.stHeartRate1" type="text" />
                                    <el-input class="ating-ipt" v-model="physical_energy_assessment.stHeartRate2" type="text" />
                                    <el-input class="ating-ipt" v-model="physical_energy_assessment.stHeartRate3" type="text" />
                                    <el-input class="ating-ipt" v-model="physical_energy_assessment.stHeartRate4" type="text" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">血压 Blood pressure (MMHG)</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stBlopre0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stBlopre1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stBlopre2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stBlopre3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stBlopre4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">身高 Height (CM)</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stHeight0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stHeight1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stHeight2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stHeight3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stHeight4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">体重 Weight (KG)</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWeight0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWeight1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWeight2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWeight3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWeight4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">颈围 Neck Circum (CM)</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stNeck0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stNeck1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stNeck2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stNeck3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stNeck4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">肩围 Shoulder Circum (CM)</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stShoulder0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stShoulder1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stShoulder2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stShoulder3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stShoulder4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">胸围 Chest Circum (CM)</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stChest0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stChest1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stChest2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stChest3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stChest4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">臂围 左/右 Arms Circum.L/R (CM)</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stArms0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stArms1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stArms2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stArms3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stArms4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">腹围 Abdominal Circum (CM)</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAbdominal0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAbdominal1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAbdominal2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAbdominal3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAbdominal4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">腰围 Waistline (CM)</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWaistline0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWaistline1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWaistline2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWaistline3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWaistline4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">臂围 Hipline (CM)</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stHipline0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stHipline1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stHipline2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stHipline3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stHipline4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">大腿围左/右 Thigh Circum.L/R(CM)</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stThigh0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stThigh1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stThigh2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stThigh3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stThigh4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">小腿围左/右Calves Circum.L/R(CM)</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stCrus0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stCrus1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stCrus2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stCrus3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stCrus4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">体脂百分比 Body fat percentage(%)</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stFatRate0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stFatRate1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stFatRate2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stFatRate3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stFatRate4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">腰臀比 Waist-hip rate </span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWaist0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWaist1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWaist2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWaist3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stWaist4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">BMI体质指数</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stBmi0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stBmi1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stBmi2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stBmi3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stBmi4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">基础代谢 Basal metabolic</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stMetabolism0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stMetabolism1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stMetabolism2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stMetabolism3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stMetabolism4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">柔韧性测试 Flexibility Test</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stFlexibility0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stFlexibility1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stFlexibility2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stFlexibility3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stFlexibility4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">肌肉耐力 Muscle Endurance</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAbdomen0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAbdomen1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAbdomen2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAbdomen3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAbdomen4" />
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="5" class="ating">
                                    <span style="padding-left:10px;">教练建议 Professional advice</span>
                                </el-col>
                                <el-col :span="19" class="atingss">
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAdvice0" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAdvice1" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAdvice2" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAdvice3" />
                                    <el-input class="ating-ipt" type="text" v-model="physical_energy_assessment.stAdvice4" />
                                </el-col>
                            </el-col>
                        </el-col>
                    </div>
                    <el-col :span="24" class="from-date4" v-if="show">
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="addposture('physical_energy_assessment')" style="height:37px">提交</el-button>
                            <el-button @click="resetForm('physical_energy_assessment')">重置</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" class="from-date4" v-if="show2">
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="addposture2('physical_energy_assessment')" style="height:37px">修改提交</el-button>
                            <el-button @click="resetForm('physical_energy_assessment')">重置</el-button>
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
  name: "staminaevaluating",
  inject: ["reload"],
  data() {
    return {
      value1: "",
      physical_energy_assessment: {},
      edit: false,
      show: true,
      show2: false,
      timeDefaultShow: "",
      hide: true
    };
  },
  mounted() {
    this.timeDefaultShow = new Date();
    setTimeout(() => {
      this.gethealth();
    }, 500);
  },
  methods: {
    gethealth() {
      let _this = this;
      requestLogin(
        "/CustomerFollowUp/getCustomerBodyData/" +
          _this.$route.query.potential +
          "/3/" +
          _this.$route.query.id,
        {},
        "get"
      )
        .then(function(res) {
          if (res == null) {
            _this.edit = false;
            _this.show = true;
            _this.hide = false;
          } else {
            _this.physical_energy_assessment = res;
            _this.edit = true;
            _this.show = false;
            _this.hide = true;
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
    //添加体能数据
    addposture(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        var loginParams = {
          stDate: this.timeDefaultShow, //测试日期
          stHeartRate0: this.physical_energy_assessment.stHeartRate0, //静态心率
          stHeartRate1: this.physical_energy_assessment.stHeartRate1, //静态心率
          stHeartRate2: this.physical_energy_assessment.stHeartRate2, //静态心率
          stHeartRate3: this.physical_energy_assessment.stHeartRate3, //静态心率
          stHeartRate4: this.physical_energy_assessment.stHeartRate4, //静态心率
          stBlopre0: this.physical_energy_assessment.stBlopre0, //血压
          stBlopre1: this.physical_energy_assessment.stBlopre1, //血压
          stBlopre2: this.physical_energy_assessment.stBlopre2, //血压
          stBlopre3: this.physical_energy_assessment.stBlopre3, //血压
          stBlopre4: this.physical_energy_assessment.stBlopre4, //血压
          stHeight0: this.physical_energy_assessment.stHeight0, //身高
          stHeight1: this.physical_energy_assessment.stHeight1, //身高
          stHeight2: this.physical_energy_assessment.stHeight2, //身高
          stHeight3: this.physical_energy_assessment.stHeight3, //身高
          stHeight4: this.physical_energy_assessment.stHeight4, //身高
          stWeight0: this.physical_energy_assessment.stWeight0, //体重
          stWeight1: this.physical_energy_assessment.stWeight1, //体重
          stWeight2: this.physical_energy_assessment.stWeight2, //体重
          stWeight3: this.physical_energy_assessment.stWeight3, //体重
          stWeight4: this.physical_energy_assessment.stWeight4, //体重
          stNeck0: this.physical_energy_assessment.stNeck0, //颈围
          stNeck1: this.physical_energy_assessment.stNeck1, //颈围
          stNeck2: this.physical_energy_assessment.stNeck2, //颈围
          stNeck3: this.physical_energy_assessment.stNeck3, //颈围
          stNeck4: this.physical_energy_assessment.stNeck4, //颈围
          stShoulder0: this.physical_energy_assessment.stShoulder0, //肩围
          stShoulder1: this.physical_energy_assessment.stShoulder1, //肩围
          stShoulder2: this.physical_energy_assessment.stShoulder2, //肩围
          stShoulder3: this.physical_energy_assessment.stShoulder3, //肩围
          stShoulder4: this.physical_energy_assessment.stShoulder4, //肩围
          stChest0: this.physical_energy_assessment.stChest0, //胸围
          stChest1: this.physical_energy_assessment.stChest1, //胸围
          stChest2: this.physical_energy_assessment.stChest2, //胸围
          stChest3: this.physical_energy_assessment.stChest3, //胸围
          stChest4: this.physical_energy_assessment.stChest4, //胸围
          stArms0: this.physical_energy_assessment.stArms0, //臂围
          stArms1: this.physical_energy_assessment.stArms1, //臂围
          stArms2: this.physical_energy_assessment.stArms2, //臂围
          stArms3: this.physical_energy_assessment.stArms3, //臂围
          stArms4: this.physical_energy_assessment.stArms4, //臂围
          stAbdominal0: this.physical_energy_assessment.stAbdominal0, //腹围
          stAbdominal1: this.physical_energy_assessment.stAbdominal1, //腹围
          stAbdominal2: this.physical_energy_assessment.stAbdominal2, //腹围
          stAbdominal3: this.physical_energy_assessment.stAbdominal3, //腹围
          stAbdominal4: this.physical_energy_assessment.stAbdominal4, //腹围
          stWaistline0: this.physical_energy_assessment.stWaistline0, //腰围
          stWaistline1: this.physical_energy_assessment.stWaistline1, //腰围
          stWaistline2: this.physical_energy_assessment.stWaistline2, //腰围
          stWaistline3: this.physical_energy_assessment.stWaistline3, //腰围
          stWaistline4: this.physical_energy_assessment.stWaistline4, //腰围
          stHipline0: this.physical_energy_assessment.stHipline0, //臀围
          stHipline1: this.physical_energy_assessment.stHipline1, //臀围
          stHipline2: this.physical_energy_assessment.stHipline2, //臀围
          stHipline3: this.physical_energy_assessment.stHipline3, //臀围
          stHipline4: this.physical_energy_assessment.stHipline4, //臀围
          stThigh0: this.physical_energy_assessment.stThigh0, //大腿圈
          stThigh1: this.physical_energy_assessment.stThigh1, //大腿圈
          stThigh2: this.physical_energy_assessment.stThigh2, //大腿圈
          stThigh3: this.physical_energy_assessment.stThigh3, //大腿圈
          stThigh4: this.physical_energy_assessment.stThigh4, //大腿圈
          stCrus0: this.physical_energy_assessment.stCrus0, //小退圈
          stCrus1: this.physical_energy_assessment.stCrus1, //小退圈
          stCrus2: this.physical_energy_assessment.stCrus2, //小退圈
          stCrus3: this.physical_energy_assessment.stCrus3, //小退圈
          stCrus4: this.physical_energy_assessment.stCrus4, //小退圈
          stFatRate0: this.physical_energy_assessment.stFatRate0, //体质百分比
          stFatRate1: this.physical_energy_assessment.stFatRate1, //体质百分比
          stFatRate2: this.physical_energy_assessment.stFatRate2, //体质百分比
          stFatRate3: this.physical_energy_assessment.stFatRate3, //体质百分比
          stFatRate4: this.physical_energy_assessment.stFatRate4, //体质百分比
          stWaist0: this.physical_energy_assessment.stWaist0, //腰臀比
          stWaist1: this.physical_energy_assessment.stWaist1, //腰臀比
          stWaist2: this.physical_energy_assessment.stWaist2, //腰臀比
          stWaist3: this.physical_energy_assessment.stWaist3, //腰臀比
          stWaist4: this.physical_energy_assessment.stWaist4, //腰臀比
          stBmi0: this.physical_energy_assessment.stBmi0, //体质指数
          stBmi1: this.physical_energy_assessment.stBmi1, //体质指数
          stBmi2: this.physical_energy_assessment.stBmi2, //体质指数
          stBmi3: this.physical_energy_assessment.stBmi3, //体质指数
          stBmi4: this.physical_energy_assessment.stBmi4, //体质指数
          stMetabolism0: this.physical_energy_assessment.stMetabolism0, //基础代谢
          stMetabolism1: this.physical_energy_assessment.stMetabolism1, //基础代谢
          stMetabolism2: this.physical_energy_assessment.stMetabolism2, //基础代谢
          stMetabolism3: this.physical_energy_assessment.stMetabolism3, //基础代谢
          stMetabolism4: this.physical_energy_assessment.stMetabolism4, //基础代谢
          stFlexibility0: this.physical_energy_assessment.stFlexibility0, //柔韧性测试
          stFlexibility1: this.physical_energy_assessment.stFlexibility1, //柔韧性测试
          stFlexibility2: this.physical_energy_assessment.stFlexibility2, //柔韧性测试
          stFlexibility3: this.physical_energy_assessment.stFlexibility3, //柔韧性测试
          stFlexibility4: this.physical_energy_assessment.stFlexibility4, //柔韧性测试
          stAbdomen0: this.physical_energy_assessment.stAbdomen0, //肌肉耐力
          stAbdomen1: this.physical_energy_assessment.stAbdomen1, //肌肉耐力
          stAbdomen2: this.physical_energy_assessment.stAbdomen2, //肌肉耐力
          stAbdomen3: this.physical_energy_assessment.stAbdomen3, //肌肉耐力
          stAbdomen4: this.physical_energy_assessment.stAbdomen4, //肌肉耐力
          stAdvice0: this.physical_energy_assessment.stAdvice0, //教练建议
          stAdvice1: this.physical_energy_assessment.stAdvice1, //教练建议
          stAdvice2: this.physical_energy_assessment.stAdvice2, //教练建议
          stAdvice3: this.physical_energy_assessment.stAdvice3, //教练建议
          stAdvice4: this.physical_energy_assessment.stAdvice4 //教练建议
        };
        requestLogin(
          "/CustomerFollowUp/addPhysicalEnergy/" +
            this.$route.query.id +
            "/" +
            this.$route.query.potential,
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
    //编辑体能数据
    addposture2(formName) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        var loginParams = {
          stDate: this.timeDefaultShow, //测试日期
          stHeartRate0: this.physical_energy_assessment.stHeartRate0, //静态心率
          stHeartRate1: this.physical_energy_assessment.stHeartRate1, //静态心率
          stHeartRate2: this.physical_energy_assessment.stHeartRate2, //静态心率
          stHeartRate3: this.physical_energy_assessment.stHeartRate3, //静态心率
          stHeartRate4: this.physical_energy_assessment.stHeartRate4, //静态心率
          stBlopre0: this.physical_energy_assessment.stBlopre0, //血压
          stBlopre1: this.physical_energy_assessment.stBlopre1, //血压
          stBlopre2: this.physical_energy_assessment.stBlopre2, //血压
          stBlopre3: this.physical_energy_assessment.stBlopre3, //血压
          stBlopre4: this.physical_energy_assessment.stBlopre4, //血压
          stHeight0: this.physical_energy_assessment.stHeight0, //身高
          stHeight1: this.physical_energy_assessment.stHeight1, //身高
          stHeight2: this.physical_energy_assessment.stHeight2, //身高
          stHeight3: this.physical_energy_assessment.stHeight3, //身高
          stHeight4: this.physical_energy_assessment.stHeight4, //身高
          stWeight0: this.physical_energy_assessment.stWeight0, //体重
          stWeight1: this.physical_energy_assessment.stWeight1, //体重
          stWeight2: this.physical_energy_assessment.stWeight2, //体重
          stWeight3: this.physical_energy_assessment.stWeight3, //体重
          stWeight4: this.physical_energy_assessment.stWeight4, //体重
          stNeck0: this.physical_energy_assessment.stNeck0, //颈围
          stNeck1: this.physical_energy_assessment.stNeck1, //颈围
          stNeck2: this.physical_energy_assessment.stNeck2, //颈围
          stNeck3: this.physical_energy_assessment.stNeck3, //颈围
          stNeck4: this.physical_energy_assessment.stNeck4, //颈围
          stShoulder0: this.physical_energy_assessment.stShoulder0, //肩围
          stShoulder1: this.physical_energy_assessment.stShoulder1, //肩围
          stShoulder2: this.physical_energy_assessment.stShoulder2, //肩围
          stShoulder3: this.physical_energy_assessment.stShoulder3, //肩围
          stShoulder4: this.physical_energy_assessment.stShoulder4, //肩围
          stChest0: this.physical_energy_assessment.stChest0, //胸围
          stChest1: this.physical_energy_assessment.stChest1, //胸围
          stChest2: this.physical_energy_assessment.stChest2, //胸围
          stChest3: this.physical_energy_assessment.stChest3, //胸围
          stChest4: this.physical_energy_assessment.stChest4, //胸围
          stArms0: this.physical_energy_assessment.stArms0, //臂围
          stArms1: this.physical_energy_assessment.stArms1, //臂围
          stArms2: this.physical_energy_assessment.stArms2, //臂围
          stArms3: this.physical_energy_assessment.stArms3, //臂围
          stArms4: this.physical_energy_assessment.stArms4, //臂围
          stAbdominal0: this.physical_energy_assessment.stAbdominal0, //腹围
          stAbdominal1: this.physical_energy_assessment.stAbdominal1, //腹围
          stAbdominal2: this.physical_energy_assessment.stAbdominal2, //腹围
          stAbdominal3: this.physical_energy_assessment.stAbdominal3, //腹围
          stAbdominal4: this.physical_energy_assessment.stAbdominal4, //腹围
          stWaistline0: this.physical_energy_assessment.stWaistline0, //腰围
          stWaistline1: this.physical_energy_assessment.stWaistline1, //腰围
          stWaistline2: this.physical_energy_assessment.stWaistline2, //腰围
          stWaistline3: this.physical_energy_assessment.stWaistline3, //腰围
          stWaistline4: this.physical_energy_assessment.stWaistline4, //腰围
          stHipline0: this.physical_energy_assessment.stHipline0, //臀围
          stHipline1: this.physical_energy_assessment.stHipline1, //臀围
          stHipline2: this.physical_energy_assessment.stHipline2, //臀围
          stHipline3: this.physical_energy_assessment.stHipline3, //臀围
          stHipline4: this.physical_energy_assessment.stHipline4, //臀围
          stThigh0: this.physical_energy_assessment.stThigh0, //大腿圈
          stThigh1: this.physical_energy_assessment.stThigh1, //大腿圈
          stThigh2: this.physical_energy_assessment.stThigh2, //大腿圈
          stThigh3: this.physical_energy_assessment.stThigh3, //大腿圈
          stThigh4: this.physical_energy_assessment.stThigh4, //大腿圈
          stCrus0: this.physical_energy_assessment.stCrus0, //小退圈
          stCrus1: this.physical_energy_assessment.stCrus1, //小退圈
          stCrus2: this.physical_energy_assessment.stCrus2, //小退圈
          stCrus3: this.physical_energy_assessment.stCrus3, //小退圈
          stCrus4: this.physical_energy_assessment.stCrus4, //小退圈
          stFatRate0: this.physical_energy_assessment.stFatRate0, //体质百分比
          stFatRate1: this.physical_energy_assessment.stFatRate1, //体质百分比
          stFatRate2: this.physical_energy_assessment.stFatRate2, //体质百分比
          stFatRate3: this.physical_energy_assessment.stFatRate3, //体质百分比
          stFatRate4: this.physical_energy_assessment.stFatRate4, //体质百分比
          stWaist0: this.physical_energy_assessment.stWaist0, //腰臀比
          stWaist1: this.physical_energy_assessment.stWaist1, //腰臀比
          stWaist2: this.physical_energy_assessment.stWaist2, //腰臀比
          stWaist3: this.physical_energy_assessment.stWaist3, //腰臀比
          stWaist4: this.physical_energy_assessment.stWaist4, //腰臀比
          stBmi0: this.physical_energy_assessment.stBmi0, //体质指数
          stBmi1: this.physical_energy_assessment.stBmi1, //体质指数
          stBmi2: this.physical_energy_assessment.stBmi2, //体质指数
          stBmi3: this.physical_energy_assessment.stBmi3, //体质指数
          stBmi4: this.physical_energy_assessment.stBmi4, //体质指数
          stMetabolism0: this.physical_energy_assessment.stMetabolism0, //基础代谢
          stMetabolism1: this.physical_energy_assessment.stMetabolism1, //基础代谢
          stMetabolism2: this.physical_energy_assessment.stMetabolism2, //基础代谢
          stMetabolism3: this.physical_energy_assessment.stMetabolism3, //基础代谢
          stMetabolism4: this.physical_energy_assessment.stMetabolism4, //基础代谢
          stFlexibility0: this.physical_energy_assessment.stFlexibility0, //柔韧性测试
          stFlexibility1: this.physical_energy_assessment.stFlexibility1, //柔韧性测试
          stFlexibility2: this.physical_energy_assessment.stFlexibility2, //柔韧性测试
          stFlexibility3: this.physical_energy_assessment.stFlexibility3, //柔韧性测试
          stFlexibility4: this.physical_energy_assessment.stFlexibility4, //柔韧性测试
          stAbdomen0: this.physical_energy_assessment.stAbdomen0, //肌肉耐力
          stAbdomen1: this.physical_energy_assessment.stAbdomen1, //肌肉耐力
          stAbdomen2: this.physical_energy_assessment.stAbdomen2, //肌肉耐力
          stAbdomen3: this.physical_energy_assessment.stAbdomen3, //肌肉耐力
          stAbdomen4: this.physical_energy_assessment.stAbdomen4, //肌肉耐力
          stAdvice0: this.physical_energy_assessment.stAdvice0, //教练建议
          stAdvice1: this.physical_energy_assessment.stAdvice1, //教练建议
          stAdvice2: this.physical_energy_assessment.stAdvice2, //教练建议
          stAdvice3: this.physical_energy_assessment.stAdvice3, //教练建议
          stAdvice4: this.physical_energy_assessment.stAdvice4 //教练建议
        };
        requestLogin(
          "/CustomerFollowUp/editPhysicalEnergy/" +
            this.$route.query.id +
            "/" +
            this.$route.query.potential,
          loginParams,
          "put"
        )
          .then(data => {
            this.$message({
              message: "修改成功",
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
      this.physical_energy_assessment = "";
    },
    editAll() {
      this.edit = false;
      this.show2 = true;
    },
    onSubmit() {
      alert("submit!");
    },
    back() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/staminaevaluating.scss";
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
        width: 18px;
        height: 19px;
      }
    }
  }
  .health-main {
    border: 1px solid #e8e8e8;
    height: 100%;
    display: inline-block;
    width: 97%;
    margin: 20px auto;
    background: #f7fffc;
    .outside {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      justify-content: space-around;
      .outside-biao {
        font-size: 14px;
        color: #000;
        .outside-biao2 {
          font-size: 14px;
          color: #262626;
        }
      }
    }
    .from-date-border {
      width: 100%;
      border-bottom: 1px solid #e8e8e8;
      height: 55px;
      line-height: 55px;
      .ating {
        text-align: left;
        font-size: 14px;
        color: #262626;
      }
      .atingss {
        text-align: left;
        font-size: 14px;
        color: #262626;
        display: flex;
        justify-content: space-around;
        .ating-ipt {
          width: 80px;
          height: 54px;
          text-align: center;
          background: #fafafa;
          opacity: 1.1;
        }
      }
    }
  }
  .from-date4 {
    margin-top: 10px;
  }
}
</style>