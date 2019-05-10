<template>
  <!--添加私教上课记录-->
  <div>
    <div class="practice-table2">
      <el-col :span="24">
        <div class="add">
          <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加私教上课记录</el-button>
          <template>
            <el-dialog title="添加私教上课记录" :append-to-body="true" :visible.sync="dialogFormVisible">
              <!--添加私教上课记录-->
              <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="160px">
                <el-form-item label="本次练习前身体状况:" prop="lianxiqian" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-input v-model.trim="ruleForm.lianxiqian" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="生理期:" prop="Normalperiod" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-radio-group v-model="ruleForm.Normalperiod">
                      <el-radio :label="0" value="是">是</el-radio>
                      <el-radio :label="1" value="否">否</el-radio>
                    </el-radio-group>
                  </el-col>
                </el-form-item>
                <el-form-item label="本次练习重点:" prop="limitdate" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-checkbox-group v-model="ruleForm.limitdate">
                      <el-checkbox v-for="i in limit" :label="i" :key="i">{{i}}</el-checkbox>
                    </el-checkbox-group>
                    <el-input placeholder="其他" v-model.trim="ruleForm.keynote"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="练习后身体的状况:" prop="lianxihou" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-input v-model.trim="ruleForm.lianxihou" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="下次练习重点:" prop="xiaci" :label-width="formLabelWidth">
                  <el-col :span="22">
                    <el-input v-model.trim="ruleForm.xiaci" placeholder="请输入"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item class="dialog-footer">
                  <el-col :span="24" style="display: flex;justify-content: flex-end;">
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')"
                               style="background-color: #00BC71;border-color: #00BC71;">确定
                    </el-button>
                  </el-col>
                </el-form-item>
              </el-form>
            </el-dialog>
          </template>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="handback">
           <el-row :gutter="24">
            <el-col :span="12" v-for="(item,index) in vipfollowing" :key='index' v-show="index<num">
                <el-card shadow="always">
                    <div class="always-head">
                      <span>VIP私教课程跟踪服务状况<font style="padding-left: 20px;">{{item.date}}</font></span>
                    </div>
                    <div class="always-head2">
                        <div class="head2-one">
                            <div class="one-div">本次练习前身体状况</div>
                            <div class="one-div2">{{item.bHealth}}</div>
                        </div>
                        <div class="head2-two">
                            <div class="two-div">生理期</div>
                            <div class="two-div2">
                                <el-radio-group v-model="item.isPeriod" :disabled="true">
                                    <el-radio :label="0" value="是">是</el-radio>
                                    <el-radio :label="1" value="否">否</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="always-body">
                        <div class="always-body1">本次练习重点</div>
                        <div class="always-body2">
                            <el-checkbox-group v-model="item.emphasis" :disabled="true">
                                <el-checkbox v-for="i in emphasis" :label="i" :key="i">{{i}}</el-checkbox>
                            </el-checkbox-group>
                            <span>其他（{{item.otherEmphasis}}）</span>
                        </div>
                    </div>
                    <div class="always-foot">
                        <div class="foot-div">练习后身体的状况</div>
                        <div class="foot-div2">{{item.aHealth}}</div>
                    </div>
                    <div class="always-foot2">
                        <div class="foot2-div">下次练习重点</div>
                        <div class="foot2-div2">{{item.nextEmphasis}}</div>
                    </div>
                </el-card>
            </el-col>
            </el-row>
            <div class="control" :class="{'show-more' : showMore}">
                <el-button type="text" @click="showMore" v-if="this.vipfollowing != '' && this.vipfollowing.length > 4">{{txt}}</el-button>
            </div>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import moment from "moment";
const cityOptions = ["肩颈", "腰椎", "脊柱", "盆骨", "柔韧", "力量", "腹部","侧腰","后背","大腿","小腿","手臂","失眠","便秘","抑郁","静心"];
export default {
  name: "privateinsiderup",
  inject: ["reload"],
  data() {
    return {
      whether:1,
      isShow: true,
      txt: '显示全部',
      num: 4,
      formLabelWidth: "160px",
      dialogFormVisible: false,
      emphasis: [],
      emphasis:cityOptions,
      limit: cityOptions,
      ruleForm: {
        lianxiqian: "", //练习前
        Normalperiod:"",//生理期
        limitdate: [], //重点
        keynote:"",//其他
        lianxihou:"",//联系后
        xiaci:"",//下次
      },
       rules: {
          Normalperiod: [
            { required: true, message: '请选择是否生理期', trigger: 'change' },
          ],
       },
      vipfollowing: [],
    };
  },
  created: function() {
    this.getClubGroup();
  },
  methods: {
    showMore(){
        this.isShow = !this.isShow;
        this.num = this.isShow? 4: this.vipfollowing.length;
        this.txt = this.isShow?  '显示全部':'收起';
      },
      getCurrentDateTime() {
      return moment(new Date()).format("YYYY-MM-DD");
    },
    // 获取私教上课记录数据
    getClubGroup() {
      let _this = this;
      requestLogin("/setDesignateMember/practiceList/"+_this.$route.query.id, {}, "get")
        .then(function(res) {
          _this.vipfollowing = res;
        })
        .catch(error => {
        let { response: { data: { errorCode, msg } } } = error;
        if (errorCode != 0) {
          this.$message({
            message: msg,
            type: "error"
          });
          return;
        }
        });
    },
    //添加私教记录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              hyId: this.$route.query.id, //会员id
              isPeriod: this.ruleForm.Normalperiod, //是否为生理期
              bHealth: this.ruleForm.lianxiqian, //练习前身体状况
              aHealth: this.ruleForm.lianxihou,//练习后身体状况
              emphasis: this.ruleForm.limitdate,//本次练习重点
              otherEmphasis: this.ruleForm.keynote,//其他
              nextEmphasis: this.ruleForm.xiaci,//下次练习重点
            };
            requestLogin(
              "/setDesignateMember/savePractice",
              loginParams,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible = false;
                this.resetForm(formName);
              })
              .catch(error => {
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
          return false;
        }
      });
    },
    open2(){},
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.keynote="";
    },
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
<style lang="scss" scoped>
 .el-checkbox + .el-checkbox {
  margin-left: 0px;
  }
  .el-checkbox {
  margin-right: 45px;
  }

.practice-table2 {
  .add {
    border: 1px solid #00bc71;
    width: 175px;
    height: 32px;
    border-radius: 4px;
    line-height: 0px;
    margin-top: 10px;
    margin-left: 30px;
    float: left;
    .p {
      color: #00bc71;
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      line-height: 6px;
    }
  }
  .add2 {
    border: 1px solid #00bc71;
    width: 140px;
    height: 32px;
    border-radius: 4px;
    line-height: 0px;
    margin-top: 10px;
    margin-left: 20px;
    float: left;
    .p {
      color: #00bc71;
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      line-height: 6px;
    }
  }
  .purple {
      width:20%;
      float: right;
      .add3 {
          height: 35px;
          margin-top:12px;
      }
    }
  .handback {
    height: 100%;
    width: 95%;
    margin: 20px auto;
    display: inline-block;
     position: relative;
    padding-bottom: 40px;
    .control {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-top: 40px;
        text-align: center;
        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 70%);
        &.show-more {
            padding-top: 0;
            background: none;
        }
    }
    .always-head{
        background:#C6F0D2;
        height: 35px;
        line-height: 35px;
    }
    .always-head2{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .head2-one{
            width:49%;
            border-right:1px solid #ccc;
            display:flex;
            .one-div{
                border-right:1px solid #ccc;
                padding:8px;
                font-size:14px;
                text-align: left;
                overflow: hidden;
                width:80px;
            }
            .one-div2{
                padding:8px;
                font-size:14px;
                text-align: left;
                overflow: hidden;
                word-wrap: break-word;
            }
        }
        .head2-two{
            width:49%;
            display:flex;
            .two-div{
                border-right:1px solid #ccc;
                padding:8px;
                padding-top:18px;
                font-size:14px;
                text-align: center;
                overflow: hidden;
                width:80px;
            }
            .two-div2{
                padding:8px;
                font-size:14px;
                text-align: left;
                overflow: hidden;
                padding-top:18px;
                margin: 0 auto;
            }
        }
    }
    .always-body{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .always-body1{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:14px;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .always-body2{
            padding:8px;
            font-size:14px;
            text-align: left;
            overflow: hidden;
            margin: 0 auto;
            width:80%;
            .el-checkbox + .el-checkbox {
            margin-left: 0px;
            }
            .el-checkbox {
            margin-right: 45px;
            }
            .el-checkbox-group{
                margin-left:32px;
            }
            span{
                margin-left:32px;
            }
        }
    }
    .always-foot{
        background:#E3F8E9;
        display:flex;
        border-bottom: 1px solid #ccc;
        .foot-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:14px;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot-div2{
            padding:8px;
            font-size:14px;
            text-align: left;
            overflow: hidden;
            width:80%;
            word-wrap: break-word;
        }
    }
    .always-foot2{
        background:#E3F8E9;
        display:flex;
        .foot2-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:14px;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot2-div2{
            padding:8px;
            font-size:14px;
            text-align: left;
            width:80%;
            overflow: hidden;
            word-wrap: break-word;
        }
    }
  }
}
@media screen and (min-width: 768px)and (max-width: 992px){
    .handback {
    height: 100%;
    width: 95%;
    margin: 20px auto;
    display: inline-block;
     position: relative;
    padding-bottom: 40px;
    .control {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-top: 40px;
        text-align: center;
        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 70%);
        &.show-more {
            padding-top: 0;
            background: none;
        }
    }
    .always-head{
        background:#C6F0D2;
        height: 35px;
        line-height: 35px;
        font-size: 13px !important;
    }
    .always-head2{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .head2-one{
            width:49%;
            border-right:1px solid #ccc;
            display:flex;
            .one-div{
                border-right:1px solid #ccc;
                padding:8px;
                font-size:13px !important;
                text-align: left;
                overflow: hidden;
                width:80px;
            }
            .one-div2{
                padding:8px;
                font-size:13px !important;
                text-align: left;
                overflow: hidden;
                word-wrap: break-word;
            }
        }
        .head2-two{
            width:49%;
            display:flex;
            .two-div{
                border-right:1px solid #ccc;
                padding:8px;
                padding-top:18px;
                font-size:13px !important;
                text-align: center;
                overflow: hidden;
                width:80px;
            }
            .two-div2{
                padding:8px;
                font-size:14px;
                text-align: left;
                overflow: hidden;
                padding-top:18px;
                margin: 0 auto;
                .el-radio-group{
                  .el-radio + .el-radio{
                    margin-left:0px !important;
                  }
                }
            }
        }
    }
    .always-body{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .always-body1{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:13px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .always-body2{
            padding:8px;
            font-size:13px !important;
            text-align: left;
            overflow: hidden;
            margin: 0 auto;
            width:80%;
            .el-checkbox + .el-checkbox {
            margin-left: 0px;
            }
            .el-checkbox {
            margin-right: 45px;
            }
            .el-checkbox-group{
                margin-left:32px;
            }
            span{
                margin-left:32px;
            }
        }
    }
    .always-foot{
        background:#E3F8E9;
        display:flex;
        border-bottom: 1px solid #ccc;
        .foot-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:13px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot-div2{
            padding:8px;
            font-size:13px !important;
            text-align: left;
            overflow: hidden;
            width:80%;
            word-wrap: break-word;
        }
    }
    .always-foot2{
        background:#E3F8E9;
        display:flex;
        .foot2-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:13px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot2-div2{
            padding:8px;
            font-size:13px !important;
            text-align: left;
            width:80%;
            overflow: hidden;
            word-wrap: break-word;
        }
    }
  }
}
@media screen and (min-width: 992px)and (max-width: 1280px){
    .handback {
    height: 100%;
    width: 95%;
    margin: 20px auto;
    display: inline-block;
     position: relative;
    padding-bottom: 40px;
    .control {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-top: 40px;
        text-align: center;
        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 70%);
        &.show-more {
            padding-top: 0;
            background: none;
        }
    }
    .always-head{
        background:#C6F0D2;
        height: 35px;
        line-height: 35px;
        font-size: 14px !important;
    }
    .always-head2{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .head2-one{
            width:49%;
            border-right:1px solid #ccc;
            display:flex;
            .one-div{
                border-right:1px solid #ccc;
                padding:8px;
                font-size:14px !important;
                text-align: left;
                overflow: hidden;
                width:80px;
            }
            .one-div2{
                padding:8px;
                font-size:14px !important;
                text-align: left;
                overflow: hidden;
                word-wrap: break-word;
            }
        }
        .head2-two{
            width:49%;
            display:flex;
            .two-div{
                border-right:1px solid #ccc;
                padding:8px;
                padding-top:18px;
                font-size:14px !important;
                text-align: center;
                overflow: hidden;
                width:80px;
            }
            .two-div2{
                padding:8px;
                font-size:14px;
                text-align: left;
                overflow: hidden;
                padding-top:18px;
                margin: 0 auto;
                .el-radio-group{
                  .el-radio + .el-radio{
                    margin-left:0px !important;
                  }
                }
            }
        }
    }
    .always-body{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .always-body1{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .always-body2{
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            margin: 0 auto;
            width:80%;
            .el-checkbox + .el-checkbox {
            margin-left: 0px;
            }
            .el-checkbox {
            margin-right: 45px;
            }
            .el-checkbox-group{
                margin-left:32px;
            }
            span{
                margin-left:32px;
            }
        }
    }
    .always-foot{
        background:#E3F8E9;
        display:flex;
        border-bottom: 1px solid #ccc;
        .foot-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot-div2{
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            width:80%;
            word-wrap: break-word;
        }
    }
    .always-foot2{
        background:#E3F8E9;
        display:flex;
        .foot2-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot2-div2{
            padding:8px;
            font-size:14px !important;
            text-align: left;
            width:80%;
            overflow: hidden;
            word-wrap: break-word;
        }
    }
  }
}
@media screen and (min-width: 1280px)and (max-width: 1440px){
    .handback {
    height: 100%;
    width: 95%;
    margin: 20px auto;
    display: inline-block;
     position: relative;
    padding-bottom: 40px;
    .control {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-top: 40px;
        text-align: center;
        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 70%);
        &.show-more {
            padding-top: 0;
            background: none;
        }
    }
    .always-head{
        background:#C6F0D2;
        height: 35px;
        line-height: 35px;
        font-size: 14px !important;
    }
    .always-head2{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .head2-one{
            width:49%;
            border-right:1px solid #ccc;
            display:flex;
            .one-div{
                border-right:1px solid #ccc;
                padding:8px;
                font-size:14px !important;
                text-align: left;
                overflow: hidden;
                width:80px;
            }
            .one-div2{
                padding:8px;
                font-size:14px !important;
                text-align: left;
                overflow: hidden;
                word-wrap: break-word;
            }
        }
        .head2-two{
            width:49%;
            display:flex;
            .two-div{
                border-right:1px solid #ccc;
                padding:8px;
                padding-top:18px;
                font-size:14px !important;
                text-align: center;
                overflow: hidden;
                width:80px;
            }
            .two-div2{
                padding:8px;
                font-size:14px;
                text-align: left;
                overflow: hidden;
                padding-top:18px;
                margin: 0 auto;
                .el-radio-group{
                  .el-radio + .el-radio{
                    margin-left:0px !important;
                  }
                }
            }
        }
    }
    .always-body{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .always-body1{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .always-body2{
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            margin: 0 auto;
            width:80%;
            .el-checkbox + .el-checkbox {
            margin-left: 0px;
            }
            .el-checkbox {
            margin-right: 45px;
            }
            .el-checkbox-group{
                margin-left:32px;
            }
            span{
                margin-left:32px;
            }
        }
    }
    .always-foot{
        background:#E3F8E9;
        display:flex;
        border-bottom: 1px solid #ccc;
        .foot-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot-div2{
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            width:80%;
            word-wrap: break-word;
        }
    }
    .always-foot2{
        background:#E3F8E9;
        display:flex;
        .foot2-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot2-div2{
            padding:8px;
            font-size:14px !important;
            text-align: left;
            width:80%;
            overflow: hidden;
            word-wrap: break-word;
        }
    }
  }
}
@media screen and (min-width: 1440px)and (max-width: 1680px){
    .handback {
    height: 100%;
    width: 95%;
    margin: 20px auto;
    display: inline-block;
     position: relative;
    padding-bottom: 40px;
    .control {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-top: 40px;
        text-align: center;
        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 70%);
        &.show-more {
            padding-top: 0;
            background: none;
        }
    }
    .always-head{
        background:#C6F0D2;
        height: 35px;
        line-height: 35px;
        font-size: 14px !important;
    }
    .always-head2{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .head2-one{
            width:49%;
            border-right:1px solid #ccc;
            display:flex;
            .one-div{
                border-right:1px solid #ccc;
                padding:8px;
                font-size:14px !important;
                text-align: left;
                overflow: hidden;
                width:80px;
            }
            .one-div2{
                padding:8px;
                font-size:14px !important;
                text-align: left;
                overflow: hidden;
                word-wrap: break-word;
            }
        }
        .head2-two{
            width:49%;
            display:flex;
            .two-div{
                border-right:1px solid #ccc;
                padding:8px;
                padding-top:18px;
                font-size:14px !important;
                text-align: center;
                overflow: hidden;
                width:80px;
            }
            .two-div2{
                padding:8px;
                font-size:14px;
                text-align: left;
                overflow: hidden;
                padding-top:18px;
                margin: 0 auto;
                .el-radio-group{
                  .el-radio + .el-radio{
                    margin-left:0px !important;
                  }
                }
            }
        }
    }
    .always-body{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .always-body1{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .always-body2{
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            margin: 0 auto;
            width:80%;
            .el-checkbox + .el-checkbox {
            margin-left: 0px;
            }
            .el-checkbox {
            margin-right: 45px;
            }
            .el-checkbox-group{
                margin-left:32px;
            }
            span{
                margin-left:32px;
            }
        }
    }
    .always-foot{
        background:#E3F8E9;
        display:flex;
        border-bottom: 1px solid #ccc;
        .foot-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot-div2{
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            width:80%;
            word-wrap: break-word;
        }
    }
    .always-foot2{
        background:#E3F8E9;
        display:flex;
        .foot2-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:14px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot2-div2{
            padding:8px;
            font-size:14px !important;
            text-align: left;
            width:80%;
            overflow: hidden;
            word-wrap: break-word;
        }
    }
  }
}
@media screen and (min-width: 1680px)and (max-width: 1920px){
    .handback {
    height: 100%;
    width: 95%;
    margin: 20px auto;
    display: inline-block;
     position: relative;
    padding-bottom: 40px;
    .control {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-top: 40px;
        text-align: center;
        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 70%);
        &.show-more {
            padding-top: 0;
            background: none;
        }
    }
    .always-head{
        background:#C6F0D2;
        height: 35px;
        line-height: 35px;
        font-size: 16px !important;
    }
    .always-head2{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .head2-one{
            width:49%;
            border-right:1px solid #ccc;
            display:flex;
            .one-div{
                border-right:1px solid #ccc;
                padding:8px;
                font-size:15px !important;
                text-align: left;
                overflow: hidden;
                width:80px;
            }
            .one-div2{
                padding:8px;
                font-size:15px !important;
                text-align: left;
                overflow: hidden;
                word-wrap: break-word;
            }
        }
        .head2-two{
            width:49%;
            display:flex;
            .two-div{
                border-right:1px solid #ccc;
                padding:8px;
                padding-top:18px;
                font-size:15px !important;
                text-align: center;
                overflow: hidden;
                width:80px;
            }
            .two-div2{
                padding:8px;
                font-size:14px;
                text-align: left;
                overflow: hidden;
                padding-top:18px;
                margin: 0 auto;
                .el-radio-group{
                  .el-radio + .el-radio{
                    margin-left:0px !important;
                  }
                }
            }
        }
    }
    .always-body{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .always-body1{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:15px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .always-body2{
            padding:8px;
            font-size:15px !important;
            text-align: left;
            overflow: hidden;
            margin: 0 auto;
            width:80%;
            .el-checkbox + .el-checkbox {
            margin-left: 0px;
            }
            .el-checkbox {
            margin-right: 45px;
            }
            .el-checkbox-group{
                margin-left:32px;
            }
            span{
                margin-left:32px;
            }
        }
    }
    .always-foot{
        background:#E3F8E9;
        display:flex;
        border-bottom: 1px solid #ccc;
        .foot-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:15px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot-div2{
            padding:8px;
            font-size:15px !important;
            text-align: left;
            overflow: hidden;
            width:80%;
            word-wrap: break-word;
        }
    }
    .always-foot2{
        background:#E3F8E9;
        display:flex;
        .foot2-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:15px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot2-div2{
            padding:8px;
            font-size:15px !important;
            text-align: left;
            width:80%;
            overflow: hidden;
            word-wrap: break-word;
        }
    }
  }
}
@media screen and (min-width: 1920px)and (max-width: 2048px){
    .handback {
    height: 100%;
    width: 95%;
    margin: 20px auto;
    display: inline-block;
     position: relative;
    padding-bottom: 40px;
    .control {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-top: 40px;
        text-align: center;
        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 70%);
        &.show-more {
            padding-top: 0;
            background: none;
        }
    }
    .always-head{
        background:#C6F0D2;
        height: 35px;
        line-height: 35px;
        font-size: 18px !important;
    }
    .always-head2{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .head2-one{
            width:49%;
            border-right:1px solid #ccc;
            display:flex;
            .one-div{
                border-right:1px solid #ccc;
                padding:8px;
                font-size:16px !important;
                text-align: left;
                overflow: hidden;
                width:80px;
            }
            .one-div2{
                padding:8px;
                font-size:16px !important;
                text-align: left;
                overflow: hidden;
                word-wrap: break-word;
            }
        }
        .head2-two{
            width:49%;
            display:flex;
            .two-div{
                border-right:1px solid #ccc;
                padding:8px;
                padding-top:18px;
                font-size:16px !important;
                text-align: center;
                overflow: hidden;
                width:80px;
            }
            .two-div2{
                padding:8px;
                font-size:14px;
                text-align: left;
                overflow: hidden;
                padding-top:18px;
                margin: 0 auto;
                .el-radio-group{
                  .el-radio + .el-radio{
                    margin-left:0px !important;
                  }
                }
            }
        }
    }
    .always-body{
        background:#E3F8E9;
        display: flex;
        border-bottom: 1px solid #ccc;
        .always-body1{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:16px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .always-body2{
            padding:8px;
            font-size:16px !important;
            text-align: left;
            overflow: hidden;
            margin: 0 auto;
            width:80%;
            .el-checkbox + .el-checkbox {
            margin-left: 0px;
            }
            .el-checkbox {
            margin-right: 45px;
            }
            .el-checkbox-group{
                margin-left:32px;
            }
            span{
                margin-left:32px;
            }
        }
    }
    .always-foot{
        background:#E3F8E9;
        display:flex;
        border-bottom: 1px solid #ccc;
        .foot-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:16px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot-div2{
            padding:8px;
            font-size:16px !important;
            text-align: left;
            overflow: hidden;
            width:80%;
            word-wrap: break-word;
        }
    }
    .always-foot2{
        background:#E3F8E9;
        display:flex;
        .foot2-div{
            border-right:1px solid #ccc;
            padding:8px;
            font-size:16px !important;
            text-align: left;
            overflow: hidden;
            width:80px;
        }
        .foot2-div2{
            padding:8px;
            font-size:16px !important;
            text-align: left;
            width:80%;
            overflow: hidden;
            word-wrap: break-word;
        }
    }
  }
}
</style>
