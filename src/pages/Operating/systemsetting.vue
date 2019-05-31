<template>
    <div>
        <el-col :span="24">
            <div class="practice-main">
                <el-col :span="23" class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>经营管理</el-breadcrumb-item>
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
                            <router-link to="">
                            <span style="color:#00bc71;border-radius:20px;font-size:12px;width:45px;display:inline-block;border:1px solid;height:17px;line-height:19px" @click="editAll">编辑</span>
                            </router-link>
                        </el-col>
                        <el-col :span="24">
                            <div class="box"></div>
                        </el-col>
                        <el-col :span="24" class="health-from">
                            <div class="health-from-div">
                                <p class="el-icon-caret-right hei">会馆设置</p>
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
                                    <el-form-item label="是否自动分配储物柜：" prop="locker" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-radio-group v-model="ruleForm.locker" @change="chanegtext">
                                                <el-radio :label="2">否</el-radio>
                                                <el-radio :label="1">是</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                     <el-form-item label="本会所是否使用IC卡：" prop="isICCard" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-radio-group v-model="ruleForm.isICCard" @change="chanegtext">
                                                <el-radio :label="2">否</el-radio>
                                                <el-radio :label="1">是</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border">
                                <el-col :span="12" class="from-date">
                                   <el-form-item label="会员头像是否必填：" prop="memberIsNull" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-radio-group v-model="ruleForm.memberIsNull" @change="chanegtext">
                                                <el-radio :label="2">否</el-radio>
                                                <el-radio :label="1">是</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            </div>
                            <div class="health-from-div">
                                <p class="el-icon-caret-right hei">会员卡设置</p>
                                <el-col :span="24" class="from-date-border2">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="会员卡激活时间(天数)：" prop="activation" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.activation" style="width:250px" placeholder="默认30天,最大99"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="高级会员卡预约天数：" prop="grade1" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.grade1" style="width:250px" placeholder="默认3"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border2">
                                <el-col :span="12" class="from-date">
                                     <el-form-item label="普通会员卡预约天数：" prop="grade2" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.grade2" style="width:250px" placeholder="默认2"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            </div>
                            <div class="health-from-div">
                                <p class="el-icon-caret-right hei">课程设置</p>
                                <el-col :span="24" class="from-date-border3">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="提前进场时间(小时)：" prop="enterTime" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.enterTime" style="width:250px" placeholder="默认2小时,最大99"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="单节私教时长(分钟)：" prop="onePrivateTime" label-width="290px">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.onePrivateTime" style="width:250px" placeholder="默认60"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            </div>
                            <div class="health-from-div">
                                <p class="el-icon-caret-right hei">预约及取消设置</p>
                                <el-col :span="24" class="from-date-border4">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="客户端团课提前预约(天数)：" prop="apiLeagueDate" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.apiLeagueDate" style="width:250px" placeholder="默认3天"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="客户端私教提前预约(天数)：" prop="apiPersonalDate" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.apiPersonalDate" style="width:250px" placeholder="默认3天"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                             <el-col :span="24" class="from-date-border4">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="客户端团课提前预约时间(分钟)：" prop="apiLeagueTime" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.apiLeagueTime" style="width:250px" placeholder="默认120分钟"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="客户端私教提前预约时间(分钟)：" prop="apiPersonalTime" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.apiPersonalTime" style="width:250px" placeholder="默认120分钟"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border4">
                                <el-col :span="24" class="from-date">
                                    <el-form-item label="是否开启教练信用计算：" prop="calculationCredit" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-radio-group v-model="ruleForm.calculationCredit">
                                                <el-radio :label="2">否</el-radio>
                                                <el-radio :label="1">是</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border4">
                                <el-col :span="12" class="from-date" v-if="ruleForm.calculationCredit == 2 || ruleForm.calculationCredit == 1">
                                    <el-form-item label="私教提前预约时间(天数)：" prop="personalDate1" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.personalDate1" style="width:250px" placeholder="默认30"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date" v-if="ruleForm.calculationCredit == 2 || ruleForm.calculationCredit == 1">
                                    <el-form-item label="团课提前预约时间(天数)：" prop="leagueDate" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.leagueDate" style="width:250px" placeholder="默认3天,最大99"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border4">
                                <el-col :span="12" class="from-date" v-if="ruleForm.calculationCredit == 1">
                                    <el-form-item label="信用2级约私教天数：" prop="personalDate2" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.personalDate2" style="width:250px" placeholder="默认25"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date" v-if="ruleForm.calculationCredit == 1">
                                    <el-form-item label="信用3级约私教天数：" prop="personalDate3" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.personalDate3" style="width:250px" placeholder="默认20"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border4">
                                <el-col :span="12" class="from-date" v-if="ruleForm.calculationCredit == 1">
                                    <el-form-item label="信用4级约私教天数：" prop="personalDate4" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.personalDate4" style="width:250px" placeholder="默认15"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date" v-if="ruleForm.calculationCredit == 1">
                                    <el-form-item label="信用5级约私教天数：" prop="personalDate5" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.personalDate5" style="width:250px" placeholder="默认10"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border4">
                                <el-col :span="12" class="from-date" v-if="ruleForm.calculationCredit == 1">
                                    <el-form-item label="信用6级约私教天数：" prop="personalDate6" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.personalDate6" style="width:250px" placeholder="默认5"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date" v-if="ruleForm.calculationCredit == 1">
                                    <el-form-item label="教练信用1级最大私教取消次数：" prop="cancelNum1" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.cancelNum1" style="width:250px" placeholder="默认5"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border4">
                                <el-col :span="12" class="from-date" v-if="ruleForm.calculationCredit == 1">
                                    <el-form-item label="教练信用2级最大私教取消次数：" prop="cancelNum2" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.cancelNum2" style="width:250px" placeholder="默认10"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date" v-if="ruleForm.calculationCredit == 1">
                                    <el-form-item label="教练信用3级最大私教取消次数：" prop="cancelNum3" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.cancelNum3" style="width:250px" placeholder="默认15"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border4">
                                <el-col :span="12" class="from-date" v-if="ruleForm.calculationCredit == 1">
                                    <el-form-item label="教练信用4级最大私教取消次数：" prop="cancelNum4" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.cancelNum4" style="width:250px" placeholder="默认20"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date" v-if="ruleForm.calculationCredit == 1">
                                    <el-form-item label="教练信用5级最大私教取消次数：" prop="cancelNum5" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.cancelNum5" style="width:250px" placeholder="默认25"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border4">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="是否开启惩罚：" prop="isPunishPc" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-radio-group v-model="ruleForm.isPunishPc" @change="chanegtext">
                                                <el-radio :label="0">否</el-radio>
                                                <el-radio :label="1">是</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                             <el-col :span="24" class="from-date-border4">
                                <el-col :span="12" class="from-date" v-if="ruleForm.isPunishPc == 1">
                                    <el-form-item label="每月免于惩罚的次数：" prop="punishCount" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.punishCount" style="width:250px" placeholder="默认3,最大9"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date" v-if="ruleForm.isPunishPc == 1">
                                    <el-form-item label="惩罚升级的次数：" prop="punishRscalation" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.punishRscalation" style="width:250px" placeholder="默认1"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border5">
                                <el-col :span="12" class="from-date" v-if="ruleForm.isPunishPc == 1">
                                    <el-form-item label="会员惩罚措施：" prop="punishNumPc" label-width="200px">
                                        <el-col :span="24">
                                            <el-radio-group v-model="ruleForm.punishNumPc" @change="chanegtext">
                                                <el-radio :label="1">几天内不能上课</el-radio>
                                                <el-radio :label="2">扣次数或金额或有效期</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="from-date" v-if="ruleForm.isPunishPc == 1">
                                    <el-form-item label="惩罚升级的措施：" prop="numTwoPc" label-width="200px">
                                        <el-col :span="24">
                                            <el-radio-group v-model="ruleForm.numTwoPc" @change="chanegtext">
                                                <el-radio :label="1">几天内不能上课</el-radio>
                                                <el-radio :label="2">扣次数或金额或有效期</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border6">
                                <el-col :span="6" class="from-date" v-if="ruleForm.isPunishPc == 1">
                                   <el-form-item label="几天内不让上课：" prop="date" label-width="140px">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.date" style="width:250px" placeholder="默认7,最大9"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="from-date" v-if="ruleForm.isPunishPc == 1">
                                    <el-form-item label="扣具体次数：" prop="num" label-width="140px">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.num" style="width:100%" placeholder="默认1"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="from-date" v-if="ruleForm.isPunishPc == 1">
                                    <el-form-item label="扣具体金额(元)：" prop="price" label-width="140px">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.price" style="width:100%" placeholder="默认100"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6" class="from-date" v-if="ruleForm.isPunishPc == 1">
                                    <el-form-item label="扣具体时间(天数)：" prop="time" label-width="140px">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.time" style="width:100%" placeholder="默认15"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="from-date-border7">
                                <el-col :span="12" class="from-date">
                                    <el-form-item label="客户至少提前多少时间取消预约(分钟)：" prop="punishTime" :label-width="formLabelWidth">
                                        <el-col :span="24">
                                            <el-input v-model.trim="ruleForm.punishTime" style="width:250px" placeholder="默认120分钟,最大999"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            </div>
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
        punishNumPc: "", //会员惩罚措施编号
        isPunishPc: "", //是否开启惩罚
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
        numTwoPc: "", //惩罚升级的措施
        personalDate1: "", //信用1级约私教天数
        personalDate2: "", //信用2级约私教天数
        personalDate3: "", //信用3级约私教天数
        personalDate4: "", //信用4级约私教天数
        personalDate5: "", //信用5级约私教天数
        personalDate6: "", //信用6级约私教天数
        calculationCredit: "", //是否开启教练信用计算
        cancelNum1: "", //教练信用1级
        cancelNum2: "", //教练信用2级
        cancelNum3: "", //教练信用3级
        cancelNum4: "", //教练信用4级
        cancelNum5: "", //教练信用5级
        isICCard: "" ,//是否开启IC卡
        locker:"",//是否自动分配储物柜
        grade1:"",//高级会员卡预约天数
        grade2:"",//普通会员卡预约天数
        onePrivateTime:"",//单节私教时长
        memberIsNull:"",//会员头像是否必填
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
          punishNum: this.ruleForm.punishNumPc, //会员惩罚措施编号
          isPunish: this.ruleForm.isPunishPc, //是否开启惩罚
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
          numTwo: this.ruleForm.numTwoPc, //惩罚升级的措施
          personalDate1: this.ruleForm.personalDate1, //信用1级约私教天数
          personalDate2: this.ruleForm.personalDate2, //信用2级约私教天数
          personalDate3: this.ruleForm.personalDate3, //信用3级约私教天数
          personalDate4: this.ruleForm.personalDate4, //信用4级约私教天数
          personalDate5: this.ruleForm.personalDate5, //信用5级约私教天数
          personalDate6: this.ruleForm.personalDate6, //信用6级约私教天数
          calculationCredit: this.ruleForm.calculationCredit, //是否开启教练信用计算
          cancelNum1: this.ruleForm.cancelNum1, //教练信用1级
          cancelNum2: this.ruleForm.cancelNum2, //教练信用2级
          cancelNum3: this.ruleForm.cancelNum3, //教练信用3级
          cancelNum4: this.ruleForm.cancelNum4, //教练信用4级
          cancelNum5: this.ruleForm.cancelNum5, //教练信用5级
          isICCard: this.ruleForm.isICCard, //是否开启IC卡
          locker:this.ruleForm.locker,//是否自动分配储物柜
          grade1:this.ruleForm.grade1,//高级会员卡预约天数
          grade2:this.ruleForm.grade2,//普通会员卡预约天数
          onePrivateTime:this.ruleForm.onePrivateTime,//单节私教时长
          memberIsNull:this.ruleForm.memberIsNull,//会员头像是否必填
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
        .health-from-div{
            height: 100%;
            text-align: left;
            margin-left: 10px;
            display: -webkit-box;
            .hei{
                text-align: left;
                color: #000;
            }
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
        .from-date {
          display: flex;
          .el-form-item {
            margin-bottom: 10px;
            margin-top: 10px;
          }
        }
      }
      .from-date-border3 {
        width: 100%;
        .from-date {
          display: flex;
          .el-form-item {
            margin-bottom: 10px;
            margin-top: 10px;
          }
        }
      }
      .from-date-border4 {
        width: 100%;
        .from-date {
          display: flex;
          .el-form-item {
            margin-bottom: 10px;
            margin-top: 10px;
          }
        }
      }
      .from-date-border5 {
        width: 100%;
        .from-date {
          display: flex;
          .el-form-item {
            margin-bottom: 10px;
            margin-top: 10px;
          }
        }
      }
      .from-date-border6 {
        width: 100%;
        .from-date {
          display: flex;
          .el-form-item {
            margin-bottom: 10px;
            margin-top: 10px;
          }
        }
      }
      .from-date-border7 {
        width: 100%;
        .from-date {
          display: flex;
          .el-form-item {
            margin-bottom: 10px;
            margin-top: 10px;
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
