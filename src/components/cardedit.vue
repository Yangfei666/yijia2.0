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
                    <el-radio label="期限卡" value="1" v-model="currentSelectRow.ctType"></el-radio>
                    <el-radio label="次数卡" value="2" v-model="currentSelectRow.ctType"></el-radio>
                    <el-radio label="金额卡" value="3" v-model="currentSelectRow.ctType"></el-radio>
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
                    <el-radio label="启用" value="1" v-model="currentSelectRow.CTState"></el-radio>
                    <el-radio label="禁用" value="2" v-model="currentSelectRow.CTState"></el-radio>
                </el-col>
            </el-form-item>
            <el-form-item label="限时段(可用):" prop="CTxTime_YN" :label-width="formLabelWidth">
              <el-col :span="22">
               <el-time-select placeholder="起始时间" value-format="HH:mm:ss" v-model="currentSelectRow.CTxTime_1S" :picker-options="{ start: '08:30',step: '00:15',end: '18:30'}" style="width:49%"></el-time-select>
              <el-time-select placeholder="结束时间" value-format="HH:mm:ss" v-model="currentSelectRow.CTxTime_1E" :picker-options="{start: '08:30',step: '00:15',end: '18:30',minTime: startTime}" style="width:49%"></el-time-select>
                </el-col>
            </el-form-item>
             <el-form-item label="选择可用门店:" prop="shoproom" :label-width="formLabelWidth">
              <el-col :span="22">
                 <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    :titles="['待选门店', '已选门店']"
                    filter-placeholder="请输入门店名称"
                    v-model="shoproom"
                    :data="data2">
                </el-transfer>
                </el-col>
            </el-form-item>
             <el-form-item class="dialog-footer">
               <el-col :span="24" style="display: flex;justify-content: flex-end;">
            <el-button @click="resetForm('currentSelectRow')">重置</el-button>
            <el-button type="primary" @click="submitForm('currentSelectRow')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
            </el-col>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
const cityOptions = ['周一','周二','周三','周四','周五','周六','周日'];
export default {
  name:'cardedit',
  props: ["currentSelectRow"],
    data() {
        const generateData2 = _ => {
        const data = [];
        const cities = ['本朴瑜伽', '言瑜伽', '一伽瑜伽', '花影瑜伽', '观云瑜伽', '竹瑜伽', '爱伽瑜伽'];
        const pinyin = ['benpuyujia', 'yanyujia', 'yijiayujia', 'huayingyujia', 'guanyunyujia', 'zhuyujia', 'aijiayujia'];
        cities.forEach((room, index) => {
          data.push({
            label: room,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
     return {
        data2: generateData2(),
        shoproom: [],
        startTime: '',
        endTime: '',
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        },
        dialogFormVisible: false,
        formLabelWidth: '130px',
        value:'',
        limitdate: [],
        limit:cityOptions
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
              CTName: this.ruleForm.cardname, //卡名称
              CTjg: this.ruleForm.price, //价格
              CTstate: this.ruleForm.status, //状态
              CTxDate_Val: this.ruleForm.num, //每周限用次数
              CTxTime_1S: this.ruleForm.startTime, //限用时间段--开始
              CTxTime_1E: this.ruleForm.endTime, //限用时间段--结束
              ColorCard: this.ruleForm.memcolor, //颜色
              ctNotes: this.ruleForm.role, //备注
              ctType: this.ruleForm.type, //类型
              CTdate: this.ruleForm.limitdate, //限制日期
              CTvalidity: this.ruleForm.date, //有效期
              Ctnum: this.ruleForm.num, //次数
              ctIsIsPrivate: this.ruleForm.classtype, //课程类别
              clubRelation: this.Hsxx_Hsid //连锁店id
            };
            requestLogin("/setCardType", loginParams, "post")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
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
    handleCheckChange(val) {
      console.log(this.ruleForm.limit);
    },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style lang="scss">
 @import '../styles/dialog.scss';
</style>
