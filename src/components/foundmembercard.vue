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
                <el-radio-group v-model="ruleForm.type">
                    <el-radio :label="1">期限卡</el-radio>
                    <el-radio :label="2">次数卡</el-radio>
                    <el-radio :label="3">金额卡</el-radio>
                </el-radio-group>
                </el-col>
            </el-form-item>
             <el-form-item label="课程种类:" prop="classtype" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-radio-group v-model="ruleForm.classtype">
                    <el-radio :label="1">团课卡</el-radio>
                    <el-radio :label="2">私教卡</el-radio>
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
                <el-input v-model="ruleForm.date" placeholder="请输入"></el-input>
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
                <el-checkbox-group v-model="limitdate">
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
                <el-radio-group v-model="status">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="2">禁用</el-radio>
                </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="限时段(可用):" prop="limittime" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-time-picker is-range v-model="ruleForm.limittime" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 100%;"></el-time-picker>
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
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
            </el-col>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  name:'foundmembercard',
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
        disabled:false,
        limitdate: [],
        ruleForm: {
          cardname:'',//卡名称
          type: '',//类型
          classtype:'',//课程种类
          memcolor:'',//会员卡底色
          price:'',//售价
          date: '',//有效期
          num:'',//限制次数
          limitdate:'',//限制日期
          status:'',//状态
          limittime:'',//限制时间段
          shoproom:''//选择可用门店
        },
        rules: {
          cardname:[
            {required: true, message: '请输入卡名称', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择卡类型', trigger: 'change' }
          ],
          classtype: [
            { required: true, message: '请选择课程种类', trigger: 'change' }
          ],
          memcolor:[
            {required: true, message: '请选择会员卡底色', trigger: 'change'}
          ],
          price: [
            {required: true, message: '请选择预约课程', trigger: 'blur' }
          ],
          date: [
            {required: true, message: '请选择会员', trigger: 'change' }
          ],
         num:[
             {required: true, message: '请选择卡种', trigger: 'change' }
         ]
        }
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
