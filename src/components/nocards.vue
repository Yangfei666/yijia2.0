<template>
<div>
    <!--不办卡操作-->
    <div class="health">
    <el-col :span="24" class="infor-head">
        <router-link to="/Customer/experiencehome/experhome" style="text-decoration:none;">
        <div class="infor-but">
            <span class="goback el-icon-arrow-left">返回</span>
        </div>
        </router-link>
        <div class="infor-title">
            <span>不办卡</span>
        </div>
    </el-col>
    <el-col :span="24">
    <div class="health-from"> 
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="115px" class="demo-ruleForm">
            <el-col :span="20" class="from-date">
            <el-form-item label="不办卡原因：" prop="desc">
                <el-col :span="24">
                <el-input type="textarea" v-model="ruleForm.desc" maxlength="666" @input="descInput"></el-input>
                <span class="textarea">还可以输入{{remnant}}字</span>
                </el-col>
            </el-form-item>
            </el-col>
            <el-col :span="20" class="from-date">
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-col>
        </el-form>
    </div>
    </el-col>
    </div>
</div>
</template>
<script>
export default {
    name:'nocards',
  data() {
    return {
         remnant: 666,
         ruleForm: {
          leavedate:'',
          desc: '',
        },
        rules: {
            leavedate:[
                { type: 'date', required: true, message: '请选择请假时间', trigger: 'change' }
            ],
            desc: [
            { required: true, message: '请输入请假原因', trigger: 'blur' },
            { min: 1, max: 666, message: '长度在 1 到 666个字符', trigger: 'blur' }
          ],
        }
    };
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
      },
        descInput(){
        var txtVal = this.ruleForm.desc.length;
        this.remnant = 666 - txtVal;
        }
  }
  
};
</script>
<style lang="scss" scoped>
.health{
    width: 97%;
    height: 600px;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    .infor-head{
        height: 50px;
        display: flex;
        line-height: 50px;
        border-bottom: 1px solid #e8e8e8;
        .infor-but{
            padding-left: 10px;
            font-size: 16px;
            color: #262626;
        }
        .infor-but:hover{
            color:#00bc71;
        }
        .infor-title{
             padding-left: 15px;
            font-size: 16px;
            color: #262626;
            img{
                width: 15px;
                height: 15px;
            }
        }
    }
    .health-from{
        width: 83%;
        margin: 30px auto;
        .from-date{
            position: relative;
            .textarea{
                color: #00bc71;
                position: absolute;
                top: 75px;
                right: 20px;
            }
        }
        .el-button--primary{
            height: 35px;
            line-height: 1px;
        }
        .el-button+.el-button{
            height: 35px;
            line-height: 1px;
        }
    }
}
</style>