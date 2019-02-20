<template>
  <div>
    <!--创建会员卡-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="卡名称:" prop="cardname" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.cardname" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="类型:" prop="type" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="ruleForm.type" @change="radiochange">
            <el-radio :label="1">期限卡</el-radio>
            <el-radio :label="2">次数卡</el-radio>
            <el-radio :label="3">金额卡</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="课程种类:" prop="classtype" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="ruleForm.classtype">
            <el-radio :label="2">团课卡</el-radio>
            <el-radio :label="1">私教卡</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="会员卡底色:" prop="memcolor" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="ruleForm.memcolor">
            <el-radio :label="1">白底</el-radio>
            <el-radio :label="2">灰底</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="售价:" prop="price" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="有效期:" prop="date" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="ruleForm.date" placeholder="请输入月数"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="次数:" prop="number" :label-width="formLabelWidth" v-if="ruleForm.type == 2">
        <el-col :span="22">
          <el-input v-model="ruleForm.number" placeholder="大于0"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="一周次数限制:" prop="num" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="ruleForm.num">
            <el-radio :label="1">不限</el-radio>
            <el-radio :label="2">2次</el-radio>
            <el-radio :label="3">3次</el-radio>
            <el-radio :label="4">4次</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="限制日期(可用):" prop="limitdate" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-checkbox-group v-model="ruleForm.limitdate" @change="handleCheckChange">
            <el-checkbox v-for="i in limit" :label="i" :key="i">{{i}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-form-item>
      <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="约课天数等级:" prop="appointmentTime" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="ruleForm.appointmentTime" @change="radiochange">
            <el-radio :label="1">高级</el-radio>
            <el-radio :label="2">普通</el-radio>
            <el-radio :label="0">跟随系统</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="是否限制时段:" prop="limittime" :label-width="formLabelWidth">
        <el-col :span="22">
           <el-radio-group v-model="ruleForm.limittime">
            <el-radio :label="1">不限</el-radio>
            <el-radio :label="2">限用</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="周一:" prop="one" :label-width="formLabelWidth" v-show="ruleForm.limittime === 2">
        <el-col :span="22">
          <el-time-picker  v-model="ruleForm.onestartTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="ruleForm.oneendTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周二:" prop="two" :label-width="formLabelWidth" v-show="ruleForm.limittime === 2">
        <el-col :span="22">
          <el-time-picker  v-model="ruleForm.twostartTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="ruleForm.twoendTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周三:" prop="three" :label-width="formLabelWidth" v-show="ruleForm.limittime === 2">
        <el-col :span="22">
          <el-time-picker  v-model="ruleForm.threestartTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="ruleForm.threeendTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周四:" prop="four" :label-width="formLabelWidth" v-show="ruleForm.limittime === 2">
        <el-col :span="22">
          <el-time-picker  v-model="ruleForm.fourstartTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="ruleForm.fourendTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周五:" prop="five" :label-width="formLabelWidth" v-show="ruleForm.limittime === 2">
        <el-col :span="22">
          <el-time-picker  v-model="ruleForm.fivestartTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="ruleForm.fiveendTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周六:" prop="six" :label-width="formLabelWidth" v-show="ruleForm.limittime === 2">
        <el-col :span="22">
          <el-time-picker  v-model="ruleForm.sixstartTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="ruleForm.sixendTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周日:" prop="sun" :label-width="formLabelWidth" v-show="ruleForm.limittime === 2">
        <el-col :span="22">
          <el-time-picker  v-model="ruleForm.sunstartTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="ruleForm.sunendTime" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <div v-if="this.ceshis=='hide'">
        <el-form-item label="" :label-width="formLabelWidth"></el-form-item>
      </div>
      <div v-else>
        <el-form-item label="选择可用门店:" prop="shoproom" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-transfer filterable v-model="shoproom" filter-placeholder="请输入门店名称" @change="getSelectItem" :data="data2" :titles="['待选门店', '已选门店']" :props="{key: 'Hsxx_Hsid',label: 'Hsxx_Name'}">
            </el-transfer>
          </el-col>
        </el-form-item>
      </div>
      <el-form-item class="dialog-footer">
        <el-col :span="24" style="display: flex;justify-content: flex-end;">
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
const cityOptions = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
export default {
  name: "foundmembercard",
  inject: ["reload"],
  props: ["ceshis"],
  data() {
    return {
      data2: [],
      shoproom: [],
      limitdate: [],
      startTime: "",
      endTime: "",
      dialogFormVisible: false,
      formLabelWidth: "130px",
      disabled: false,
      addLoading: false,
      ruleForm: {
        cardname: "", //卡名称
        type: "", //类型
        appointmentTime:"",//约课等级
        classtype: "", //课程种类
        memcolor: "", //会员卡底色
        price: "", //售价
        date: "", //有效期
        num: "", //限制次数
        limitdate: [], //限制日期
        status: "", //状态
        number: "", //次数卡--次数
        shoproom: [], //选择可用门店
        limittime:"",//是否限制时段
        onestartTime:"",//周一
        oneendTime:"",//周一
        twostartTime:"",//周二
        twoendTime:"",//周二
        threestartTime:"",//周三
        threeendTime:"",//周三
        fourstartTime:"",//周四
        fourendTime:"",//周四
        fivestartTime:"",//周五
        fiveendTime:"",//周五
        sixstartTime:"",//周六
        sixendTime:"",//周六
        sunstartTime:"",//周日
        sunendTime:"",//周日
      },
      rules: {
        cardname: validate.cardname,
        type: validate.type,
        classtype: validate.classtype,
        memcolor: validate.memcolor,
        price: validate.price,
        date: validate.date,
        num: validate.num,
        status: validate.status,
        number: validate.number,
        shoproom:validate.shoproom,
        limittime:validate.limittime,
        appointmentTime:validate.appointmentTime
      },
      limit: cityOptions
    };
  },
  mounted: function() {
    this.getallClub();
  },
  methods: {
    radiochange(val) {
    },
    getSelectItem(val) {
      this.ruleForm.shoproom = val;
    },
    //门店数据
    getallClub() {
      let _this = this;
      requestLogin("/allClub", {}, "get")
        .then(function(res) {
          _this.data2 = res;
        })
        .catch(error => {
          if (error.res) {
            this.$message({
              message: "获取数据失败",
              type: "error"
            });
          }
        });
    },
    //添加会员卡
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            _this.addLoading = true;
            var loginParams = {
              CTName: _this.ruleForm.cardname, //卡名称
              CTjg: _this.ruleForm.price, //价格
              CTstate: _this.ruleForm.status, //状态
              CTxDate_Val: _this.ruleForm.num, //每周限用次数
              CTxTime_1S: _this.ruleForm.onestartTime, //周一
              CTxTime_1E: _this.ruleForm.oneendTime, //周一
              CTxTime_2S: _this.ruleForm.twostartTime, //周二
              CTxTime_2E: _this.ruleForm.twoendTime, //周二
              CTxTime_3S: _this.ruleForm.threestartTime, //周三
              CTxTime_3E: _this.ruleForm.threeendTime, //周三
              CTxTime_4S: _this.ruleForm.fourstartTime, //周四
              CTxTime_4E: _this.ruleForm.fourendTime, //周四
              CTxTime_5S: _this.ruleForm.fivestartTime, //周五
              CTxTime_5E: _this.ruleForm.fiveendTime, //周五
              CTxTime_6S: _this.ruleForm.sixstartTime, //周六
              CTxTime_6E: _this.ruleForm.sixendTime, //周六
              CTxTime_7S: _this.ruleForm.sunstartTime, //周日
              CTxTime_7E: _this.ruleForm.sunendTime, //周日
              ColorCard: _this.ruleForm.memcolor, //颜色
              ctNotes: _this.ruleForm.role, //备注
              ctType: _this.ruleForm.type, //类型
              appointmentTime: _this.ruleForm.appointmentTime, //约课等级
              CTdate: _this.ruleForm.limitdate, //限制日期
              CTvalidity: _this.ruleForm.date, //有效期
              Ctnum: _this.ruleForm.number, //次数
              CTxTime_YN:_this.ruleForm.limittime,//是否限制时段
              ctIsIsPrivate: _this.ruleForm.classtype, //课程类别
              clubRelation: _this.ruleForm.shoproom //连锁店id
            };
            requestLogin("/setCardType", loginParams, "post")
              .then(data => {
                _this.addLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                _this.reload();
                _this.resetForm(formName);
              })
              .catch(error => {
                _this.addLoading = false;
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
    handleCheckChange(val) {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.shoproom = "";
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
