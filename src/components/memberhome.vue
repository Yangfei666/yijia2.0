<template>
<div>
  <!--会员主页-->
    <div class="memberhome">
    <div class="member-but">
      <div class="butt el-icon-plus" @click="dialogFormVisible = true">添加新卡</div>
        <template>
        <el-dialog title="添加新卡" :append-to-body="true" :visible.sync="dialogFormVisible">
         <!--添加新卡-->
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="客户编号:" prop="number" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-input v-model="ruleForm.number" placeholder="5664" :disabled="true"></el-input>
                  </el-col>
              </el-form-item>
              <el-form-item label="卡名称:" prop="cardname" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-select v-model="ruleForm.cardname" placeholder="请选择卡种" style="width:100%">
                  <el-option label="次数卡" value="cishucard"></el-option>
                  <el-option label="金额卡" value="jinecard"></el-option>
                  </el-select>
                  </el-col>
              </el-form-item>
            <el-form-item label="金额:" prop="money" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-input v-model="ruleForm.money" placeholder="请输入"></el-input>
                  </el-col>
              </el-form-item>
              <el-form-item label="付款方式:" prop="payment" :label-width="formLabelWidth">
            <el-col :span="22">
              <el-radio-group v-model="payment">
                  <el-radio :label="1">微信</el-radio>
                  <el-radio :label="2">支付宝</el-radio>
                  <el-radio :label="3">信用卡</el-radio>
                  <el-radio :label="4">现金</el-radio>
                  <el-radio :label="5">银行卡</el-radio>
                  <el-radio :label="6">手机银行转账</el-radio>
              </el-radio-group>
              </el-col>
              </el-form-item>
              <el-form-item label="是否立即启用:" prop="start" :label-width="formLabelWidth">
              <el-col :span="22">
                  <el-radio v-model="radio" label="是">是</el-radio>
                  <el-radio v-model="radio" label="否">否</el-radio>
                  </el-col> 
              </el-form-item>
              <el-form-item label="激活时间:" prop="activate" :label-width="formLabelWidth">
              <el-col :span="22">
                  <el-radio-group v-model="radio2">
                      <el-radio :label="3">立即</el-radio>
                      <el-radio :label="6">默认</el-radio>
                      <el-radio :label="9">首次上课</el-radio>
                  </el-radio-group>
                  </el-col> 
              </el-form-item>
              <el-form-item label="到期时间:" prop="become" :label-width="formLabelWidth">
              <el-col :span="22">
                  <el-radio v-model="radio3" label="自定义">自定义</el-radio>
                  <el-radio v-model="radio3" label="默认有效期">默认有效期</el-radio>
                  </el-col> 
              </el-form-item>
              <el-form-item prop="attenddate" label="自定义到期时间:" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.attenddate" style="width: 100%;"></el-date-picker>
                  </el-col>
              </el-form-item>
              <el-form-item class="dialog-footer">
                <el-col :span="24" style="display: flex;justify-content: flex-end;">
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
              </el-col>
          </el-form-item>
          </el-form>
        </el-dialog>
        </template>
      </div>
     <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="卡1" name="cardone" style="font-size:16px">
      <Cardone></Cardone>
      </el-tab-pane>
    <el-tab-pane label="卡2" name="cardtwo" style="font-size:16px">
      <Cardtwo></Cardtwo>
    </el-tab-pane>
    <el-tab-pane label="卡3" name="cardthree" style="font-size:16px">
      <Cardthree></Cardthree>
    </el-tab-pane>
  </el-tabs>
    </div>
    <router-view></router-view>
</div>
</template>
<script>
import Cardone from "../components/cardone";
import Cardtwo from "../components/cardtwo";
import Cardthree from "../components/cardthree";
export default {
  name:'memberhome',
  components: {
    Cardone,
    Cardtwo,
    Cardthree
  },
  data() {
    return {
        formLabelWidth: '130px',
        payment:3,
        radio:'否',
        radio2:6,
        radio3:'自定义',
        activeName: "cardone",
        dialogFormVisible: false,
        dialogFormVisible2: false,
        ruleForm: {
          number:'',//编号
          cardname: '',//卡名称
          money:'',//金额
          payment:'',//付款方式
          start:'',//是否立即启用
          activate: '',//激活时间
          become:'',//到期时间
          attenddate:''//自定义到期时间
        },
        rules: {
         money:[
            {required: true, message: '请输入金额', trigger: 'blur' }
          ],
          cardname: [
            { required: true, message: '请选择卡名称', trigger: 'change' }
          ],
          payment: [
            { required: true, message: '请选择付款方式', trigger: 'change' }
          ],
          start:[
            {required: true, message: '请选择是否启动', trigger: 'change'}
          ],
          activate: [
            {required: true, message: '请选择激活时间', trigger: 'change' }
          ],
          become: [
            {required: true, message: '请选择到期时间', trigger: 'change' }
          ],
         attenddate:[
             {required: true, message: '请选择到期时间', trigger: 'change' }
         ]
        },
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
};
</script>
<style lang="scss">
 @import '@/styles/dialog.scss';
</style>
<style lang="scss" scoped>
.memberhome {
  width: 97%;
  height: 410px;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  .member-but {
    width: 100px;
    height: 32px;
    position: absolute;
    right: 30px;
    top: 6px;
    border-radius: 4px;
    background: #00bc71;
    color: #fff;
    z-index: 2;
    .butt {
      width: 100%;
      height: 100%;
      line-height: 32px;
      text-align: center;
      span {
        margin-left: 3px;
      }
    }
  }
}
</style>