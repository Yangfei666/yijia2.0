<template>
    <div>
      <!--跟进记录-->
   <div class="taste-wapper">
      <el-row>
        <div class="taste-list">
          <el-col :span="24" class="taste-buttom">
            <span>跟进记录:</span>
          </el-col>
          <el-col :span="24" class="taste-center">
            <span @click="dialogFormVisible = true"><i class="el-icon-plus"></i>添加跟进记录</span>
            <template>
              <el-dialog title="添加跟进记录" :append-to-body="true" :visible.sync="dialogFormVisible">
              <!--添加跟进记录-->
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="跟进内容:" prop="desc" :label-width="formLabelWidth">
                      <el-col :span="22">
                      <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入"></el-input>
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
          </el-col>
          <template v-for="item in taste" >
            <el-col :span="24" class="taste-top" :key="item.packetId">
              <div class="round"></div>
              <div class="data">{{item.data}}</div>
              <div class="record">{{item.record}}</div>
            </el-col>
          </template>
        </div>
      </el-row>
    </div>
    </div>
</template>
<script>
export default {
  name:'memberup',
  data() {
    return {
       dialogFormVisible: false,
        formLabelWidth: '130px',
        sex:1,
        disabled:false,
        limitdate: [],
        fileList:[],
        ruleForm: {
          desc:''//跟进内容
        },
        rules: {
          desc:[
            {required: true, message: '请输入跟进内容', trigger: 'blur' }
          ],
        },
   taste:[{
        data:'2018-07-23',
        record:'这是跟进内容，这是跟进内容这是跟进内容容容这是跟进内容容这进内容容'
      },{
        data:'2018-07-23',
        record:'这是一条记录这是跟进内容，这是跟进内容这是跟进内容容容这这进内容容'
      },{
        data:'2018-07-23',
        record:'这是跟进内容，这是跟进内容这是跟进内容这是跟进内容'
      },{
        data:'2018-07-23',
        record:'这是一条记录'
      },{
        data:'2018-07-23',
        record:'这是跟进内容，这是跟进内容这是跟进内容'
      },{
        data:'2018-07-23',
        record:'这是跟进内容，这是跟进内容这是跟进内容'
      },{
        data:'2018-07-23',
        record:'这是跟进内容，这是跟进内容这是跟进内容'
      }]
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
  }
};
</script>
<style lang="scss">
 @import '@/styles/dialog.scss';
</style>
<style lang="scss" scoped>
.taste-wapper{
    width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .taste-list{
    width: 97%;
    height: 100%;
    margin: 20px auto; 
    .taste-buttom{
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      text-align:left;
    }
    .taste-center{
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      height: 32px;
      line-height: 32px;
      color: #00bc71;
      border: 1px dashed #d0f2e5;
      border-radius: 16px;
      margin-top: 15px;
      color: #00bc71;
    }
    .taste-center:hover{
      border: 1px dashed #00bc71;
    }
    .taste-top{
     margin: 15px auto;
      border-radius: 16px;
      background: #f2faf7;
      display: flex;
      height: 32px;
      line-height: 32px;
      .round{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1px solid #00bc71;
            margin: 10px;
      }
      .data{
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
      }
      .record{
            margin-left: 30px;
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
      }
    }
  }
}
@media screen and (min-width: 768px)and (max-width: 992px){
.taste-wapper{
    width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .taste-list{
    width: 97%;
    height: 100%;
    margin: 20px auto; 
    .taste-buttom{
      font-family: PingFang-SC-Regular;
      font-size: 14px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      text-align:left;
    }
    .taste-center{
      font-family: PingFang-SC-Regular;
      font-size: 14px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      height: 32px;
      line-height: 32px;
      color: #00bc71;
      border: 1px dashed #d0f2e5;
      border-radius: 16px;
      margin-top: 15px;
      color: #00bc71;
    }
    .taste-center:hover{
      border: 1px dashed #00bc71;
    }
    .taste-top{
     margin: 15px auto!important;
      border-radius: 16px;
      background: #f2faf7;
      display: flex;
      height: 100%!important;
      line-height: 32px;
      .round{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1px solid #00bc71;
            margin: 11px!important;
      }
      .data{
            font-family: PingFang-SC-Regular;
            font-size: 12px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            width: 18%!important;
      }
      .record{
            margin-left: 13px!important;
            font-family: PingFang-SC-Regular;
            font-size: 12px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            text-align: left!important;
      }
    }
  }
}
}
@media screen and (min-width: 992px)and (max-width: 1280px){
.taste-wapper{
    width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .taste-list{
    width: 97%;
    height: 100%;
    margin: 20px auto; 
    .taste-buttom{
      font-family: PingFang-SC-Regular;
      font-size: 14px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      text-align:left;
    }
    .taste-center{
      font-family: PingFang-SC-Regular;
      font-size: 14px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      height: 32px;
      line-height: 32px;
      color: #00bc71;
      border: 1px dashed #d0f2e5;
      border-radius: 16px;
      margin-top: 15px;
      color: #00bc71;
    }
    .taste-center:hover{
      border: 1px dashed #00bc71;
    }
    .taste-top{
     margin: 15px auto!important;
      border-radius: 16px;
      background: #f2faf7;
      display: flex;
      height: 100%!important;
      line-height: 32px;
      .round{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1px solid #00bc71;
            margin: 11px!important;
      }
      .data{
            font-family: PingFang-SC-Regular;
            font-size: 14px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            width: 12%!important;
      }
      .record{
            margin-left: 13px!important;
            font-family: PingFang-SC-Regular;
            font-size: 14px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            text-align: left!important;
      }
    }
  }
}
}
@media screen and (min-width: 1280px)and (max-width: 1440px){
.taste-wapper{
    width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .taste-list{
    width: 97%;
    height: 100%;
    margin: 20px auto; 
    .taste-buttom{
      font-family: PingFang-SC-Regular;
      font-size: 16px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      text-align:left;
    }
    .taste-center{
      font-family: PingFang-SC-Regular;
      font-size: 16px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      height: 32px;
      line-height: 32px;
      color: #00bc71;
      border: 1px dashed #d0f2e5;
      border-radius: 16px;
      margin-top: 15px;
      color: #00bc71;
    }
    .taste-center:hover{
      border: 1px dashed #00bc71;
    }
    .taste-top{
     margin: 15px auto!important;
      border-radius: 16px;
      background: #f2faf7;
      display: flex;
      height: 100%!important;
      line-height: 32px;
      .round{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1px solid #00bc71;
            margin: 11px!important;
      }
      .data{
            font-family: PingFang-SC-Regular;
            font-size: 14px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            width: 10%!important;
      }
      .record{
            margin-left: 13px!important;
            font-family: PingFang-SC-Regular;
            font-size: 14px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            text-align: left!important;
      }
    }
  }
}
}
@media screen and (min-width: 1440px)and (max-width: 1920px){
.taste-wapper{
    width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .taste-list{
    width: 97%;
    height: 100%;
    margin: 20px auto; 
    .taste-buttom{
      font-family: PingFang-SC-Regular;
      font-size: 16px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      text-align:left;
    }
    .taste-center{
      font-family: PingFang-SC-Regular;
      font-size: 16px!important;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      height: 32px;
      line-height: 32px;
      color: #00bc71;
      border: 1px dashed #d0f2e5;
      border-radius: 16px;
      margin-top: 15px;
      color: #00bc71;
    }
    .taste-center:hover{
      border: 1px dashed #00bc71;
    }
    .taste-top{
     margin: 15px auto!important;
      border-radius: 16px;
      background: #f2faf7;
      display: flex;
      height: 100%!important;
      line-height: 32px;
      .round{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1px solid #00bc71;
            margin: 11px!important;
      }
      .data{
            font-family: PingFang-SC-Regular;
            font-size: 14px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            width: 10%!important;
      }
      .record{
            margin-left: 13px!important;
            font-family: PingFang-SC-Regular;
            font-size: 14px!important;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #595959;
            text-align: left!important;
      }
    }
  }
}
}
</style>
