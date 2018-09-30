<template>
   <!--会所基本信息-->
    <div>
        <div class="practice-table">
       <el-col :span="24">
            <div class="add">
                <el-button type="text" class="p"  @click="dialogFormVisible = true">修改基本信息</el-button>
                <template>
                    <el-dialog title="修改会所基本信息" :append-to-body="true" :visible.sync="dialogFormVisible">
                     <!--修改会所基本信息-->
                        <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
                        <el-form-item label="会所名称:" prop="housename" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-input v-model="ruleForm.housename" placeholder=""></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="会所别名:" prop="housealias" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-input v-model="ruleForm.housealias" placeholder=""></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="所属城市:" prop="city" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-input v-model="ruleForm.city" placeholder=""></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="详细地址:" prop="address" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-input v-model="ruleForm.address" placeholder=""></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="邮编:" prop="zipcode" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-input v-model="ruleForm.zipcode" placeholder=""></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="电话:" prop="tel" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-input v-model="ruleForm.tel" placeholder=""></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="传真:" prop="fax" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-input v-model="ruleForm.fax" placeholder=""></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="是否开启员工注册:" prop="isopen" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-radio-group v-model="ruleForm.isopen">
                                    <el-radio :label="1">启用</el-radio>
                                    <el-radio :label="2">禁用</el-radio>
                                </el-radio-group>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="预售开始时间:" prop="starttime" :label-width="formLabelWidth">
                            <el-col :span="22">
                            <el-time-picker v-model="ruleForm.starttime" :picker-options="{selectableRange: '18:30:00 - 20:30:00'}" placeholder="" style="width:100%"></el-time-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="预售开始时间:" prop="endtime" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-time-picker arrow-control v-model="ruleForm.endtime" :picker-options="{selectableRange: '18:30:00 - 20:30:00'}" placeholder="" style="width:100%"></el-time-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="邀请码:" prop="code" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-input v-model="ruleForm.code" placeholder=""></el-input>
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
        </el-col>
        <el-col :span="24">
            <div class="handback">
                <el-col :span="13" class="hand-left">
                    <div class="left-table">
                        <div class="left-table-main">
                        <el-col :span="7" class="table-hh">
                            <span>会所名称</span>
                        </el-col>
                        <el-col :span="17" class="table-gg">
                            <span>{{msg}}</span>
                        </el-col>
                        </div>
                        <div class="left-table-main">
                        <el-col :span="7" class="table-hh">
                            <span>会所别名</span>
                        </el-col>
                        <el-col :span="17" class="table-gg">
                            <span>{{msg2}}</span>
                        </el-col>
                        </div>
                        <div class="left-table-main">
                        <el-col :span="7" class="table-hh">
                            <span>所属城市</span>
                        </el-col>
                        <el-col :span="17" class="table-gg">
                            <span>{{msg3}}</span>
                        </el-col>
                        </div>
                        <div class="left-table-main">
                        <el-col :span="7" class="table-hh">
                            <span>详细地址</span>
                        </el-col>
                        <el-col :span="17" class="table-gg">
                            <span>{{msg4}}</span>
                        </el-col>
                        </div>
                        <div class="left-table-main">
                        <el-col :span="7" class="table-hh">
                            <span>邮编</span>
                        </el-col>
                        <el-col :span="17" class="table-gg">
                            <span>{{msg5}}</span>
                        </el-col>
                        </div>
                        <div class="left-table-main">
                        <el-col :span="7" class="table-hh">
                            <span>电话</span>
                        </el-col>
                        <el-col :span="17" class="table-gg">
                            <span>{{msg6}}</span>
                        </el-col>
                        </div>
                        <div class="left-table-main">
                        <el-col :span="7" class="table-hh">
                            <span>传真</span>
                        </el-col>
                        <el-col :span="17" class="table-gg">
                            <span>{{msg7}}</span>
                        </el-col>
                        </div>
                        <div class="left-table-main">
                        <el-col :span="7" class="table-hh">
                            <span>是否开启员工注册</span>
                        </el-col>
                        <el-col :span="17" class="table-gg">
                            <span class="gg-span">{{msg8}}</span>
                        </el-col>
                        </div>
                        <div class="left-table-main">
                        <el-col :span="7" class="table-hh">
                            <span>预售开始时间</span>
                        </el-col>
                        <el-col :span="17" class="table-gg">
                            <span>{{msg9}}</span>
                        </el-col>
                        </div>
                        <div class="left-table-main">
                        <el-col :span="7" class="table-hh">
                            <span>预售截止时间</span>
                        </el-col>
                        <el-col :span="17" class="table-gg">
                            <span>{{msg10}}</span>
                        </el-col>
                        </div>
                        <div class="left-table-main">
                        <el-col :span="7" class="table-hh">
                            <span>邀请码</span>
                        </el-col>
                        <el-col :span="17" class="table-gg">
                            <span>{{msg11}}</span>
                        </el-col>
                        </div>
                    </div>
                </el-col>
                <el-col :span="11" class="hand-right">
                        <div class="upload">
                        <el-upload  class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">点击或拖入</div>
                            <div class="el-upload__tip" slot="tip">点击或拖入替换会所封面</div>
                        </el-upload>
                    </div>
                </el-col>
            </div>
        </el-col>
    </div>
</div>
</template>
<script>
export default {
    name:'clubhousebasic',
  data() {
    return {
        formLabelWidth: '130px',
        starttime: new Date(2016, 9, 10, 18, 40),
        endtime: new Date(2016, 9, 10, 18, 40),
        disabled:false,
        limitdate: [],
        dialogFormVisible: false,
        msg:'上海E+瑜伽愚园会所',
        msg2:'E+瑜伽上海愚园店',
        msg3:'上海',
        msg4:'上海长宁区愚园路716号',
        msg5:'35525555',
        msg6:'021-62146321',
        msg7:'无',
        msg8:'关闭注册',
        msg9:'无',
        msg10:'无',
        msg11:'123456',
         ruleForm: {
          housename:'',//会所名称
          housealias: '',//会所别名
          city:'',//所属城市
          address: '',//详细地址
          zipcode:'',//邮编
          tel:'',//电话
          fax:'',//传真
          isopen:'',//是否开启员工注册
          starttime:'',//预售开始时间
          endtime:'',//预售结束时间
          code:''//邀请码
        },
    };
  },
  methods:{
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
 @import '../styles/dialog.scss';
</style>
<style lang="scss" scoped>
  .practice-table {
      .add{
        border: 1px solid #00bc71;
        width: 120px;
        height: 32px;
        border-radius: 4px;
        line-height: 0px;
        margin-top: 10px;
        margin-left: 30px;
        .p {
          color: #00bc71;
          font-size: 16px;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 6px;
        }
      }
      .handback{
          .hand-left{
              height:100%;
              .left-table{
                width: 90%;
                height: 100%;
                border: solid 1px #e8e8e8;
                margin: 20px auto;
                .left-table-main{
                    height: 50px;
                    margin-top: 1px;
                .table-hh{
                    height: 50px;
                    line-height: 50px;
                    text-align: left;
                    text-indent: 20px;
                    background: #EDFAF5;
                    span{
                        color: #262626;
                        font-size: 14px;
                    }
                }
                .table-gg{
                    height: 50px;
                    line-height: 50px;
                    text-align: left;
                    text-indent: 20px;
                    span{
                        color: #262626;
                        font-size: 14px;
                    }
                    .gg-span{
                        color: #23c585;
                    }
                }
              }
              }
          }
          .hand-right{
              height:100%;
              .upload{
               width: 270px;
                height: 150px;
                margin: 0px auto;
             }
          }
      }
  }
</style>