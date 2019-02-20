<template>
  <div>
    <!--会员卡详情-->
    <el-form ref="currentSelectRow" label-width="100px" :disabled='disabled'>
      <el-form-item label="卡名称:" prop="CTName" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.CTName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="类型:" prop="ctType" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="currentSelectRow.ctType">
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
          <el-input v-model="currentSelectRow.CTvalidity"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="次数:" prop="Ctnum" :label-width="formLabelWidth" v-show="currentSelectRow.ctType == '次数卡'">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.Ctnum"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="一周次数限制:" prop="CTxDate_Val" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio-group v-model="currentSelectRow.CTxDate_Val">
            <el-radio label="不限" value="1"></el-radio>
            <el-radio label="2次" value="2"></el-radio>
            <el-radio label="3次" value="3"></el-radio>
            <el-radio label="4次" value="4"></el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="限制日期(可用):" prop="CTdate" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-checkbox-group v-model="currentSelectRow.CTdate">
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
          <el-radio-group v-model="currentSelectRow.appointmentTime">
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
          <el-time-picker v-model="currentSelectRow.CTxTime_1S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker v-model="currentSelectRow.CTxTime_1E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周二:" prop="two" :label-width="formLabelWidth" v-show="currentSelectRow.CTxTime_YN === '限用'">
        <el-col :span="22">
          <el-time-picker v-model="currentSelectRow.CTxTime_2S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker v-model="currentSelectRow.CTxTime_2E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周三:" prop="three" :label-width="formLabelWidth" v-show="currentSelectRow.CTxTime_YN === '限用'">
        <el-col :span="22">
          <el-time-picker v-model="currentSelectRow.CTxTime_3S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker v-model="currentSelectRow.CTxTime_3E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周四:" prop="four" :label-width="formLabelWidth" v-show="currentSelectRow.CTxTime_YN === '限用'">
        <el-col :span="22">
          <el-time-picker v-model="currentSelectRow.CTxTime_4S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker v-model="currentSelectRow.CTxTime_4E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周五:" prop="five" :label-width="formLabelWidth" v-show="currentSelectRow.CTxTime_YN === '限用'">
        <el-col :span="22">
          <el-time-picker v-model="currentSelectRow.CTxTime_5S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker v-model="currentSelectRow.CTxTime_5E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周六:" prop="six" :label-width="formLabelWidth" v-show="currentSelectRow.CTxTime_YN === '限用'">
        <el-col :span="22">
          <el-time-picker v-model="currentSelectRow.CTxTime_6S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker v-model="currentSelectRow.CTxTime_6E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="周日:" prop="sun" :label-width="formLabelWidth" v-show="currentSelectRow.CTxTime_YN === '限用'">
        <el-col :span="22">
          <el-time-picker v-model="currentSelectRow.CTxTime_7S" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="开始时间"></el-time-picker>
          <el-time-picker v-model="currentSelectRow.CTxTime_7E" :clearable='false' value-format="HH:mm:ss" format="HH:mm:ss" :picker-options="{start: '05:00',step: '00:05',end:'24:00'}" style="width:49%" placeholder="结束时间"></el-time-picker>
        </el-col>
      </el-form-item>
      <div v-if="this.hides == 'yinchang'">
        <el-form-item label="" :label-width="formLabelWidth"></el-form-item>
      </div>
      <div v-else>
        <el-form-item label="选择可用门店:" :prop="currentSelectRow.club" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-transfer filterable disabled v-model="shoproom" :data="data2" :titles="['待选门店', '已选门店']" :props="{key: 'Hsxx_Hsid',label: 'Hsxx_Name'}"></el-transfer>
          </el-col>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
const cityOptions = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
export default {
  name: "cardedit",
  props: ["currentSelectRow", "hides"],
  data() {
    return {
      ctType: 2,
      Ctnum: "",
      data2: [],
      startTime: "",
      endTime: "",
      formLabelWidth: "130px",
      value: "",
      limit: cityOptions,
      CTdate: [],
      disabled: true
    };
  },
  mounted: function() {
    this.getallClub();
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
              message: "获取门店数据失败",
              type: "error"
            });
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
