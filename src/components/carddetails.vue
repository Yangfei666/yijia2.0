<template>
    <div>
        <!--会员卡详情-->
        <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
          <el-form-item label="卡名称:" prop="name" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.name" disabled></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="类型:" prop="type" :label-width="formLabelWidth">
              <el-col :span="22">
                    <el-radio label="期限卡" value="0" v-model="currentSelectRow.type" disabled></el-radio>
                    <el-radio label="次数卡" value="1" v-model="currentSelectRow.type" disabled></el-radio>
                    <el-radio label="金额卡" value="2" v-model="currentSelectRow.type" disabled></el-radio>
                </el-col>
            </el-form-item>
             <el-form-item label="课程种类:" prop="tuansi" :label-width="formLabelWidth">
              <el-col :span="22">
                    <el-radio label="团课" value="0" v-model="currentSelectRow.tuansi" disabled></el-radio>
                    <el-radio label="私教" value="1" v-model="currentSelectRow.tuansi" disabled></el-radio>
                </el-col>
            </el-form-item>
            <el-form-item label="会员卡底色:" prop="color" :label-width="formLabelWidth">
              <el-col :span="22">
                    <el-radio label="白底" value="0" v-model="currentSelectRow.color" disabled></el-radio>
                    <el-radio label="灰底" value="1" v-model="currentSelectRow.color" disabled></el-radio>
                </el-col>
            </el-form-item>
            <el-form-item label="售价:" prop="price" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.price" disabled></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="有效期:" prop="youxiaoqi" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.youxiaoqi" disabled></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="一周次数限制:" prop="num" :label-width="formLabelWidth">
              <el-col :span="22">
                    <el-radio label="不限" value="0" v-model="currentSelectRow.num" disabled></el-radio>
                    <el-radio label="2次" value="1" v-model="currentSelectRow.num" disabled></el-radio>
                    <el-radio label="3次" value="2" v-model="currentSelectRow.num" disabled></el-radio>
                    <el-radio label="4次" value="3" v-model="currentSelectRow.num" disabled></el-radio>
                </el-col>
            </el-form-item>
            <el-form-item label="限制日期(可用):" prop="week" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-checkbox-group v-model="currentSelectRow.week" disabled>
                    <el-checkbox label="周一"></el-checkbox>
                    <el-checkbox label="周二"></el-checkbox>
                    <el-checkbox label="周三"></el-checkbox>
                    <el-checkbox label="周四"></el-checkbox>
                    <el-checkbox label="周五"></el-checkbox>
                    <el-checkbox label="周六"></el-checkbox>
                    <el-checkbox label="周日"></el-checkbox>
                </el-checkbox-group>
                </el-col>
            </el-form-item>
             <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
              <el-col :span="22">
                    <el-radio label="启用" value="0" v-model="currentSelectRow.status" disabled></el-radio>
                    <el-radio label="禁用" value="1" v-model="currentSelectRow.status" disabled></el-radio>
                </el-col>
            </el-form-item>
            <el-form-item label="限时段(可用):" prop="time" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-time-picker is-range v-model="currentSelectRow.time" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 100%;" disabled></el-time-picker>
                </el-col>
            </el-form-item>
             <el-form-item label="选择可用门店:" prop="shoproom" :label-width="formLabelWidth">
              <el-col :span="22">
                 <el-transfer
                    filterable
                    disabled
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
export default {
  name:'carddetails',
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
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        },
        dialogFormVisible: false,
        formLabelWidth: '130px',
        num: 1,
        status:1,
        memcolor:1,
        classtype:1,
        type:1,
        limitdate: [],
        disabled:true,
     }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
