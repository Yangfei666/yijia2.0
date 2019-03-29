<template>
  <div>
    <!--会员卡编辑-->
    <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
      <el-form-item label="卡名称:" prop="CTName" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.CTName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="类型:" prop="ctType" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="currentSelectRow.ctType" @change="radiochange">
            <el-radio label="期限卡" value="1"></el-radio>
            <el-radio label="次数卡" value="2"></el-radio>
            <el-radio label="金额卡" value="3"></el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="课程种类:" prop="ctIsIsPrivate" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio label="团课卡" value="2" v-model="currentSelectRow.ctIsIsPrivate"></el-radio>
          <el-radio label="私教卡" value="1" v-model="currentSelectRow.ctIsIsPrivate"></el-radio>
        </el-col>
      </el-form-item>
      <el-form-item label="会员卡底色:" prop="ColorCard" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio label="白底" value="1" v-model="currentSelectRow.ColorCard"></el-radio>
          <el-radio label="灰底" value="2" v-model="currentSelectRow.ColorCard"></el-radio>
        </el-col>
      </el-form-item>
      <el-form-item label="售价:" prop="CTjg" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.CTjg"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="有效期:" prop="CTvalidity" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.CTvalidity" placeholder="请输入数字"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="次数:" prop="Ctnum" :label-width="formLabelWidth" v-show="currentSelectRow.ctType == '次数卡'">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.Ctnum"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="一周次数限制:" prop="CTxDate_Val" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio label="不限" value="1" v-model="currentSelectRow.CTxDate_Val"></el-radio>
          <el-radio label="2次" value="2" v-model="currentSelectRow.CTxDate_Val"></el-radio>
          <el-radio label="3次" value="3" v-model="currentSelectRow.CTxDate_Val"></el-radio>
          <el-radio label="4次" value="4" v-model="currentSelectRow.CTxDate_Val"></el-radio>
        </el-col>
      </el-form-item>
      <el-form-item label="限制日期(可用):" prop="CTdate" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-checkbox-group v-model="currentSelectRow.CTdate" @change="handleCheckChange">
            <el-checkbox v-for="i in limit" :label="i" :key="i">{{i}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-form-item>
      <el-form-item label="状态:" prop="CTstate" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="currentSelectRow.CTstate">
            <el-radio label="启用" value="1"></el-radio>
            <el-radio label="禁用" value="2"></el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="约课天数等级:" prop="appointmentTime" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="currentSelectRow.appointmentTime" @change="radiochange">
            <el-radio label="高级" value="1"></el-radio>
            <el-radio label="普通" value="2"></el-radio>
            <el-radio label="跟随系统" value="0"></el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="是否限制时段:" prop="CTxTime_YN" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio label="不限" value="1" v-model="currentSelectRow.CTxTime_YN"></el-radio>
          <el-radio label="限用" value="2" v-model="currentSelectRow.CTxTime_YN"></el-radio>       
        </el-col>
      </el-form-item>
       <el-form-item label="周一:" prop="one" :label-width="formLabelWidth" v-show="currentSelectRow.CTxTime_YN === '限用'">
        <el-col :span="22">
          <el-time-picker  v-model="currentSelectRow.CTxTime_1S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="currentSelectRow.CTxTime_1E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周二:" prop="two" :label-width="formLabelWidth" v-show="currentSelectRow.CTxTime_YN === '限用'">
        <el-col :span="22">
          <el-time-picker  v-model="currentSelectRow.CTxTime_2S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="currentSelectRow.CTxTime_2E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周三:" prop="three" :label-width="formLabelWidth" v-show="currentSelectRow.CTxTime_YN === '限用'">
        <el-col :span="22">
          <el-time-picker  v-model="currentSelectRow.CTxTime_3S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="currentSelectRow.CTxTime_3E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周四:" prop="four" :label-width="formLabelWidth" v-show="currentSelectRow.CTxTime_YN === '限用'">
        <el-col :span="22">
          <el-time-picker  v-model="currentSelectRow.CTxTime_4S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="currentSelectRow.CTxTime_4E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周五:" prop="five" :label-width="formLabelWidth" v-show="currentSelectRow.CTxTime_YN === '限用'">
        <el-col :span="22">
          <el-time-picker  v-model="currentSelectRow.CTxTime_5S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="currentSelectRow.CTxTime_5E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周六:" prop="six" :label-width="formLabelWidth" v-show="currentSelectRow.CTxTime_YN === '限用'">
        <el-col :span="22">
          <el-time-picker  v-model="currentSelectRow.CTxTime_6S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="currentSelectRow.CTxTime_6E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周日:" prop="sun" :label-width="formLabelWidth" v-show="currentSelectRow.CTxTime_YN === '限用'">
        <el-col :span="22">
          <el-time-picker  v-model="currentSelectRow.CTxTime_7S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker  v-model="currentSelectRow.CTxTime_7E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <div v-if="this.hides == 'yinchang'">
        <el-form-item label="" :label-width="formLabelWidth"></el-form-item>
      </div>
      <div v-else>
        <el-form-item label="选择可用门店:" prop="club_info" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-transfer filterable v-model="club_info_id" filter-placeholder="请输入门店名称" @change="getSelectItem" :data="data2" :titles="['待选门店', '已选门店']" :props="{key: 'Hsxx_Hsid',label: 'Hsxx_Name'}">
            </el-transfer>
          </el-col>
        </el-form-item>
      </div>
      <el-form-item class="dialog-footer">
        <el-col :span="24" style="display: flex;justify-content: flex-end;">
          <el-button type="primary" @click="submitForm('currentSelectRow')" :loading="addLoading" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
const cityOptions = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const radioDict = {
  "期限卡": 1,
  "次数卡": 2,
  "金额卡": 3,
  "团课卡": 2,
  "私教卡": 1,
  "白底": 1,
  "灰底": 2,
  "不限": 1,
  "2次": 2,
  "3次": 3,
  "4次": 4,
  "启用": 1,
  "禁用": 2,
  "高级": 1,
  "普通": 2,
  "跟随系统": 0,
}
export default {
  name: "cardedit",
  props: ["currentSelectRow", "hides"],
  inject: ["reload"],
  data() {
    return {
      ctType: 2,
      Ctnum: "",
      data2: [],
      CTdate: [],
      startTime: "",
      endTime: "",
      addLoading: false,
      dialogFormVisible: false,
      formLabelWidth: "130px",
      value: "",
      limit: cityOptions,
      club_info: [],
      club_info_id:[],
    };
  },
  beforeDestroy(){
    this.$emit('closeEdit', false)
  },
  mounted: function() {
    this.getallClub();
    this.getClubInfoId()
  },
  computed: {
    shoproom() {
      let array = this.currentSelectRow.club_info;
      let arr = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        arr.push(element.Hsxx_Hsid);
      }
      return arr;
    }
  },
  methods: {
    //修改会员卡
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            if(this.currentSelectRow.CTxTime_1S == null || this.currentSelectRow.CTxTime_1E == null){
              this.currentSelectRow.CTxTime_1S = '00:00:00';
              this.currentSelectRow.CTxTime_1E = '23:59:00';
            }
            if(this.currentSelectRow.CTxTime_2S == null || this.currentSelectRow.CTxTime_2E == null){
              this.currentSelectRow.CTxTime_2S = '00:00:00';
              this.currentSelectRow.CTxTime_2E = '23:59:00';
            }
            if(this.currentSelectRow.CTxTime_3S == null || this.currentSelectRow.CTxTime_3E == null){
              this.currentSelectRow.CTxTime_3S = '00:00:00';
              this.currentSelectRow.CTxTime_3E = '23:59:00';
            }
            if(this.currentSelectRow.CTxTime_4S == null || this.currentSelectRow.CTxTime_4E == null){
              this.currentSelectRow.CTxTime_4S = '00:00:00';
              this.currentSelectRow.CTxTime_4E = '23:59:00';
            }
            if(this.currentSelectRow.CTxTime_5S == null || this.currentSelectRow.CTxTime_5E == null){
              this.currentSelectRow.CTxTime_5S = '00:00:00';
              this.currentSelectRow.CTxTime_5E = '23:59:00';
            }
            if(this.currentSelectRow.CTxTime_6S == null || this.currentSelectRow.CTxTime_6E == null){
              this.currentSelectRow.CTxTime_6S = '00:00:00';
              this.currentSelectRow.CTxTime_6E = '23:59:00';
            }
            if(this.currentSelectRow.CTxTime_7S == null || this.currentSelectRow.CTxTime_7E == null){
              this.currentSelectRow.CTxTime_7S = '00:00:00';
              this.currentSelectRow.CTxTime_7E = '23:59:00';
            }
            var loginParams = {
              CTName: this.currentSelectRow.CTName, //卡名称
              CTjg: this.currentSelectRow.CTjg, //价格
              CTstate: radioDict[this.currentSelectRow.CTstate], //状态
              CTxDate_Val: radioDict[this.currentSelectRow.CTxDate_Val], //每周限用次数
              CTxTime_YN:this.currentSelectRow.CTxTime_YN == '限用'? 2 :1,//是否限制时段
              CTxTime_1S: this.currentSelectRow.CTxTime_1S, //周一
              CTxTime_1E: this.currentSelectRow.CTxTime_1E, //周一
              CTxTime_2S: this.currentSelectRow.CTxTime_2S, //周二
              CTxTime_2E: this.currentSelectRow.CTxTime_2E, //周二
              CTxTime_3S: this.currentSelectRow.CTxTime_3S, //周三
              CTxTime_3E: this.currentSelectRow.CTxTime_3E, //周三
              CTxTime_4S: this.currentSelectRow.CTxTime_4S, //周四
              CTxTime_4E: this.currentSelectRow.CTxTime_4E, //周四
              CTxTime_5S: this.currentSelectRow.CTxTime_5S, //周五
              CTxTime_5E: this.currentSelectRow.CTxTime_5E, //周五
              CTxTime_6S: this.currentSelectRow.CTxTime_6S, //周六
              CTxTime_6E: this.currentSelectRow.CTxTime_6E, //周六
              CTxTime_7S: this.currentSelectRow.CTxTime_7S, //周日
              CTxTime_7E: this.currentSelectRow.CTxTime_7E, //周日
              ColorCard: radioDict[this.currentSelectRow.ColorCard], //颜色
              ctNotes: this.currentSelectRow.ctNotes, //备注
              ctType: radioDict[this.currentSelectRow.ctType], //类型
              appointmentTime: radioDict[this.currentSelectRow.appointmentTime], //约课等级
              CTdate: this.currentSelectRow.CTdate.filter(item => item), //限制日期
              CTvalidity: parseInt(this.currentSelectRow.CTvalidity), //有效期
              Ctnum: this.currentSelectRow.Ctnum, //次数
              ctIsIsPrivate: radioDict[this.currentSelectRow.ctIsIsPrivate], //课程类别
              clubRelation:  this.club_info_id//连锁店id
            };
            requestLogin(`/setCardType/${this.currentSelectRow.CTID}`, loginParams, "put")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.$emit("regetData");
                this.$emit('closeEdit', false)
              })
              .catch(error => {
                this.addLoading = false;
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
    //门店数据
    getallClub() {
      let _this = this;
      requestLogin("/allClub", {}, "get")
        .then(function(res) {
          _this.data2 = res;
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
    },
    getClubInfoId(){
      if(!this.currentSelectRow.club_info) return;
      this.club_info_id = this.currentSelectRow.club_info.map(item=>item.Hsxx_Hsid)
    },
    radioHandler(value){

    },
    radiochange(val) {
    },
    getSelectItem(val) {
      console.log(val);
    },

    handleCheckChange(val) {
      console.log(this.currentSelectRow.CTdate);

    },
    handleCheckChange(val) {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
