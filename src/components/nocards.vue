<template>
<div>
    <!--不办卡操作-->
    <div class="health">
    <el-col :span="24" class="infor-head">
        <router-link :to="{name:'Experhome'}" style="text-decoration:none;">
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
            <el-col :span="17" class="from-date">
                <el-col :span="24">
            <el-form-item label="不办卡原因：" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" maxlength="666" @input="descInput" style="width:100%"></el-input>
                <span class="textarea">还可以输入{{remnant}}字</span>
            </el-form-item>
                </el-col>
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
import { requestLogin } from "@/api/api";
export default {
    name:'nocards',
  data() {
    return {
         remnant: 666,
         ruleForm: {
          desc: '',
        },
        rules: {
            desc: [
            { required: true, message: '请输入请假原因', trigger: 'blur' },
            { min: 1, max: 666, message: '长度在 1 到 666个字符', trigger: 'blur' }
          ],
        }
    };
  },
  created(){
      console.log(this.$route);
  },
  methods: {
    //不办卡
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              content: this.ruleForm.desc, //原因
            };
            requestLogin("/setExperienceCustomer/giveUp/"+this.$route.params.id, loginParams, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
              })
              .catch(error => {
                  this.$message({
                  message: "提交失败",
                  type: "error"
                });
              });
          });
        } else {
          this.$message({ message: "提交失败!请检查是否有误!", type: "error" });
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
@media screen and (min-width: 768px)and (max-width: 992px){
    .health{
    width: 97%;
    height: 600px;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
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
        .el-textarea{
                width: 375px!important;
        }
    }
}
}
@media screen and (min-width: 992px)and (max-width: 1280px){
    .health{
    width: 97%;
    height: 600px;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
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
        .el-textarea{
                width:510px!important;
        }
    }
}
}
@media screen and (min-width: 1280px)and (max-width: 1440px){
    .health{
    width: 97%;
    height: 600px;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
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
        .el-textarea{
                width:550px!important;
        }
    }
}
}
@media screen and (min-width: 1440px)and (max-width: 1920px){
    .health{
    width: 97%;
    height: 600px;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
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
        .el-textarea{
                width:600px!important;
        }
    }
}
}
@media screen and (min-width: 1920px)and (max-width: 2048px){
    .health{
    width: 97%;
    height: 600px;
    margin: 20px auto;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
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
        .el-textarea{
                width:650px!important;
        }
    }
}
}
</style>