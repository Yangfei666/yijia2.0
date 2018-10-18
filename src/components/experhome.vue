<template>
<div>
  <!--体验客户主页-->
    <div class="memberhome">
    <div class="member-but">
      <el-button type="text" class="butt el-icon-plus" @click="dialogFormVisible = true">购买体验券</el-button>
        <template>
        <el-dialog title="购买体验劵" :append-to-body="true" :visible.sync="dialogFormVisible">
        <!--购买体验券-->
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="劵类型:" prop="cardname" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-select v-model="ruleForm.cardname" placeholder="请选择" style="width:100%">
                  <el-option label="次数卡" value="cishucard"></el-option>
                  <el-option label="金额卡" value="jinecard"></el-option>
                  </el-select>
                  </el-col>
              </el-form-item>
              <el-form-item label="金额:" prop="price" :label-width="formLabelWidth">
                <el-col :span="22">
                  <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
                  </el-col>
              </el-form-item>
                  <el-form-item label="付款方式:" prop="payment" :label-width="formLabelWidth">
            <el-col :span="22">
              <el-radio-group v-model="ruleForm.payment">
                  <el-radio :label="1">店内到付</el-radio>
                  <el-radio :label="2">美团</el-radio>
                  <el-radio :label="3">大众</el-radio>
                  <el-radio :label="4">会籍代收</el-radio>
                  <el-radio :label="5">未支付</el-radio>
              </el-radio-group>
              </el-col>
              </el-form-item>
              <el-form-item label="原因:" prop="desc" :label-width="formLabelWidth">
                <el-col :span="22" class="from-date">
                <el-input type="textarea" v-model="ruleForm.desc" maxlength="666" @input="descInput" style="min-height:96px;width:690px;height:69px"></el-input>
                  <span class="textarea">还可以输入{{remnant}}字</span>
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
    <el-tab-pane label="劵1" name="cardone" style="font-size:16px">
      <Securityone></Securityone>
      </el-tab-pane>
    <el-tab-pane label="劵2" name="cardtwo" style="font-size:16px">
      <Securitytwo></Securitytwo>
    </el-tab-pane>
    <el-tab-pane label="劵3" name="cardthree" style="font-size:16px">
      <Securitythree></Securitythree>
    </el-tab-pane>
  </el-tabs>
    </div>
</div>
</template>
<script>
import Securityone from "../components/securityone";
import Securitytwo from "../components/securitytwo";
import Securitythree from "../components/securitythree";
export default {
  name:'experhome',
  components: {
    Securityone,
    Securitytwo,
    Securitythree
  },
  data() {
    return {
        activeName: "cardone",
        dialogFormVisible: false,
        dialogFormVisible2: false,
        remnant: 666,
        formLabelWidth: '130px',
        payment: 1,
        disabled:false,
        limitdate: [],
        ruleForm: {
          cardname:'',//券类型
          price:'',//金额
          payment: '',//付款方式
          desc:''//原因
        },
        rules: {
          cardname:[
            {required: true, message: '请选择券类型', trigger: 'change' }
          ],
          price: [
            {required: true, message: '请输入金额', trigger: 'blur' }
          ],
          payment: [
            {required: true, message: '请选择付款方式', trigger: 'change' }
          ],
         desc:[
             {required: true, message: '请输入原因', trigger: 'blur' }
         ],
        }
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
      },
      descInput(){
        var txtVal = this.ruleForm.desc.length;
        this.remnant = 666 - txtVal;
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
      line-height: 7px;
      text-align: center;
      color: #fff;
      span {
        margin-left: 3px;
      }
    }
  }
}
</style>