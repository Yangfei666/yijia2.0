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
      <el-form-item label="限时段(可用):" prop="CTxTime_YN" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-time-select placeholder="起始时间" value-format="HH:mm:ss" v-model="currentSelectRow.CTxTime_1S" :picker-options="{ start: '05:00',step: '00:15',end: '24:00'}" style="width:49%"></el-time-select>
          <el-time-select placeholder="结束时间" value-format="HH:mm:ss" v-model="currentSelectRow.CTxTime_1E" :picker-options="{start: '05:30',step: '00:15',end: '24:00',minTime: startTime}" style="width:49%"></el-time-select>
        </el-col>
      </el-form-item>
      <div v-if="this.hides == 'yinchang'">
        <el-form-item label="" :label-width="formLabelWidth"></el-form-item>
      </div>
      <div v-else>
        <el-form-item label="选择可用门店:" prop="club_info" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-transfer filterable v-model="shoproom" filter-placeholder="请输入门店名称"
            @change="getSelectItem" :data="data2" :titles="['待选门店', '已选门店']"
            :props="{key: 'Hsxx_Hsid',label: 'Hsxx_Name'}">
            </el-transfer>
          </el-col>
        </el-form-item>
      </div>
      <el-form-item class="dialog-footer">
        <el-col :span="24" style="display: flex;justify-content: flex-end;">
          <el-button @click="resetForm('currentSelectRow')">重置</el-button>
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
export default {
  name: "cardedit",
  props: ["currentSelectRow","hides"],
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
      club_info: []
    };
  },
  mounted: function() {
    this.getallClub();
  },
  computed: {
    shoproom () {
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
            var loginParams = {
              CTName: this.currentSelectRow.CTName, //卡名称
              CTjg: this.currentSelectRow.CTjg, //价格
              CTstate: this.currentSelectRow.CTstate == '禁用' ? 2 : 1, //状态
              CTxDate_Val: this.currentSelectRow.CTxDate_Val.substr(0,1), //每周限用次数
              CTxTime_1S: this.currentSelectRow.CTxTime_1S, //限用时间段--开始
              CTxTime_1E: this.currentSelectRow.CTxTime_1E, //限用时间段--结束
              ColorCard: this.currentSelectRow.ColorCard == '白底' ? 1 : 2, //颜色
              ctNotes: this.currentSelectRow.ctNotes, //备注
              ctType: this.currentSelectRow.ctType == '期限卡' ? 1 : (this.currentSelectRow.ctType == '次数卡' ? 2 : 3), //类型
              CTdate: this.currentSelectRow.CTdate, //限制日期
              CTvalidity: this.currentSelectRow.CTvalidity, //有效期
              Ctnum: this.currentSelectRow.Ctnum, //次数
              ctIsIsPrivate: this.currentSelectRow.ctIsIsPrivate == '团课卡' ? 2 : 1, //课程类别
              clubRelation: this.currentSelectRow.club_info //连锁店id
            };
            requestLogin("/setCardType/" + this.currentSelectRow.CTID, loginParams, "put")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible = false;
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
          this.$message({ message: "提交失败!", type: "error" });
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
          if (error.res) {
            this.$message({
              message: "获取数据失败",
              type: "error"
            });
          }
        });
    },
    radiochange(val) {
      console.log(val, "val");
      console.log(this.currentSelectRow.Ctnum, "input的值");
    },
    getSelectItem(val) {
      this.shoproom = val;
      console.log(val);
    },
    handleCheckChange(val) {
      console.log(this.currentSelectRow.CTdate);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
