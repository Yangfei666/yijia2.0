<template>
<!--会员卡解挂操作-->
    <div class="memberhome">
        <el-col :span="24">
            <div class="class-main">
            <router-link to="/Customer/membershiphome/memberhome" style="text-decoration:none;">
            <div class="infor-but">
                <span class="goback el-icon-arrow-left">返回</span>
            </div>
            </router-link>
            <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="解挂操作" name="first">
                <template>
                    <el-col :span="24">
                        <div class="first-from">
                            <span>点击右侧按钮解挂<img class="from-img" src="../assets/51.png"/></span>
                            <el-button class="first-but" type="primary" @click="submit">确定</el-button>
                        </div>
                    </el-col>
                </template>
            </el-tab-pane>
            <el-tab-pane label="补卡操作" name="second">
                <template>
                     <el-col :span="24">
                    <div class="health-from"> 
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-col :span="20" class="from-date">
                            <el-form-item label="新的卡号：" prop="card">
                                <el-col :span="24">
                                <el-input v-model="ruleForm.card" placeholder="请输入"></el-input>
                                </el-col>
                            </el-form-item>
                            </el-col>
                            <el-col :span="20" class="from-date">
                            <el-form-item label="确认卡号：" prop="confirmcard">
                                <el-col :span="24">
                                <el-input v-model="ruleForm.confirmcard" placeholder="请输入"></el-input>
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
                </template>
            </el-tab-pane>
            <el-tab-pane label="挂失操作" name="unhook">
                <template>
                    <el-col :span="24">
                        <div class="first-from">
                            <span>点击右侧按钮挂失<img class="from-img" src="../assets/51.png"/></span>
                            <el-button class="first-but" type="primary" @click="submit">确定</el-button>
                        </div>
                    </el-col>
                </template>
            </el-tab-pane>
        </el-tabs>
            </div>
        </el-col>
    </div>
</template>
<script>
export default {
    name:'unhook',
  data() {
    return {
      activeName: "first",
       ruleForm: {
          card:'',
          confirmcard: '',
        },
        rules: {
            card:[
                { required: true, message: '请输入新的卡号', trigger: 'blur' },
                { min: 1, max: 18, message: '长度在 1 到 18个字符', trigger: 'blur' }
            ],
            confirmcard: [
                { required: true, message: '请输入确认卡号', trigger: 'blur' },
                { min: 1, max: 18, message: '长度在 1 到 18个字符', trigger: 'blur' }
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
      submit(){
        alert('submit!');
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
  }
};
</script>
<style lang="scss" scoped>
.memberhome {
  width: 97%;
  height: 585px;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  position: relative;
  .class-main {
    height: 100%;
    .infor-but{
        position: absolute;
        top:2.5%;
        z-index:2;
        color:#262626;
        right: 5%;
        .goback{
            font-size: 14px;
        }
    }
    .infor-but:hover{
        color: #00bc71;
    }
    .health-from{
        width: 83%;
        margin: 30px auto;
        .from-date{
            position: relative;
            .textarea{
                color: #00bc71;
                position: absolute;
                top: 55px;
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
    .first-from{
         width: 70%;
        margin: 20px;
        display: flex;
        justify-content: space-between;
        .first-but{
            width: 64px;
            height: 33px;
            border: 1px solid;
            line-height: 8px;
            text-align: center;
        }
        span .from-img{
                width: 14px;
                height: 8px;
                padding-left: 10px;
        }
    }
  }
}
    
</style>
