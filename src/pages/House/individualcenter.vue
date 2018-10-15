<template>
<div>
  <el-row>
    <el-col :span="24">
    <div class="practice-main">
        <el-col :span="23" class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>超级管理员个人中心</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>
        <el-col :span="23" class="weber">
          <el-col :span="1" class="weber-img">
            <img src="http://img2.woyaogexing.com/2017/10/31/da621481e30d6bc4!400x400_big.jpg"/>
          </el-col>
          <el-col :span="10" class="weber-left">
            <span class="weber-span">小册子</span>
            <p class="weber-p">岗位:总经理<span class="weber-pp">电话:12345678901</span></p>
            </el-col>
        </el-col>
    </div>
    </el-col>
</el-row>
<el-row>
    <el-col :span="24">
        <div class="center-main">
             <el-col :span="24">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <!--个人资料-->
                    <el-tab-pane label="个人资料" name="first">
                        <template>
                       <div class="handback">
                        <el-col :span="10" class="hand-left">
                            <div class="left-table">
                                <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>岗位</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>总经理</span>
                                </el-col>
                                </div>
                                <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>电话</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>25454564545</span>
                                </el-col>
                                </div>
                                <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>入职时间</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>2018-06-17 20:00:00</span>
                                </el-col>
                                </div>
                                <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>员工编号</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>5655</span>
                                </el-col>
                                </div>
                                <div class="left-table-main">
                                <el-col :span="7" class="table-hh">
                                    <span>身份证号</span>
                                </el-col>
                                <el-col :span="17" class="table-gg">
                                    <span>123456465798545445</span>
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
                    </template>
                    </el-tab-pane>
                    <!--修改密码-->
                    <el-tab-pane label="修改密码" name="first2">
                        <template>
                        <el-col :span="16" class="center-two">
                       <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="原密码:" prop="pass">
                            <el-input :type="pwdType" v-model="ruleForm2.pass" placeholder="请输入6-18位数字或字母"></el-input>
                            <div class="eye" @click="showToggle">
                                <img :src="openeye" @click="changeType()" v-show="downIcon"/>
                                <img :src="openeye2" @click="changeType()" v-show="!downIcon"/>
                                </div>
                        </el-form-item>
                         <el-form-item label="新密码:" prop="passWord">
                            <el-input :type="pwdType2" v-model="ruleForm2.passWord" placeholder="请输入6-18位数字或字母"></el-input>
                            <div class="closed" @click="showToggle2">
                                <img :src="openeye" @click="changeType2()" v-show="downIcon2"/>
                                <img :src="openeye2" @click="changeType2()" v-show="!downIcon2"/>
                                </div>
                        </el-form-item>
                        <el-form-item label="确认密码:" prop="checkPass">
                            <el-input :type="pwdType3" v-model="ruleForm2.checkPass" placeholder="请输入6-18位数字或字母"></el-input>
                            <div class="closed" @click="showToggle3">
                                <img :src="openeye" @click="changeType3()" v-show="downIcon3"/>
                                <img :src="openeye2" @click="changeType3()" v-show="!downIcon3"/>
                                </div>
                        </el-form-item>
                        <el-form-item class="primary">
                            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                            <el-button @click="resetForm('ruleForm2')">重置</el-button>
                        </el-form-item>
                        </el-form>
                        </el-col>
                        </template>
                    </el-tab-pane>
                    <!--我的门店-->
                    <el-tab-pane label="我的门店" name="second">
                        <template>
                         <el-col :span="24" class="room-main">
                            <div class="add">
                                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加门店</el-button>
                                <template>
                                <el-dialog title="添加门店" :append-to-body="true" :visible.sync="dialogFormVisible">
                                 <!--添加门店-->
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                                    <el-form-item label="门店名称:" prop="roomname" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.roomname" placeholder="请输入"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="门店别名:" prop="roombyname" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.roombyname" placeholder="请输入"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="电话:" prop="tel" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.tel" placeholder="请输入"></el-input>
                                        </el-col>
                                    </el-form-item>
                                <el-form-item label="邮编:" prop="zipcode" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.zipcode" placeholder="请输入"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="法人:" prop="corporation" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.corporation" placeholder="请输入"></el-input>
                                        </el-col>
                                    </el-form-item>
                                <el-form-item label="城市:" prop="homecity" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.homecity" placeholder="请输入"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="详细地址:" prop="detadaddress" :label-width="formLabelWidth">
                                    <el-col :span="22">
                                        <el-input v-model="ruleForm.detadaddress" placeholder="请输入"></el-input>
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
                            <div class="add2">
                                <el-button type="text" class="p" @click="open2">删除门店</el-button>
                            </div>
                        </el-col>
                            <el-col :span="24">
                                <div  class="table-room">
                                <el-table highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                                    <el-table-column align="center" prop="radio" fixed width="70px">
                                    <template slot-scope="scope">
                                        <el-radio v-model="scope.row.radio"></el-radio>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="roomname" align="left" label="门店名称" width="180px"></el-table-column>
                                    <el-table-column prop="roombyname" align="left" label="门店别名" width="180px"></el-table-column>
                                    <el-table-column prop="corporation" align="left" label="法人" width="160px"></el-table-column>
                                    <el-table-column prop="tel" align="left" label="电话" width="160px"></el-table-column>
                                    <el-table-column prop="zipcode" align="left" label="邮编" width="160px"></el-table-column>
                                    <el-table-column prop="portraiture" align="left" label="传真" width="160px"></el-table-column>
                                    <el-table-column prop="homecity" align="left" label="所属城市" width="160px"></el-table-column>
                                    <el-table-column prop="detadaddress" align="left" label="详细地址" width="400px" fixed="right"></el-table-column>
                                </el-table>
                                <div class="block">
                                    <el-pagination
                                    @size-change="handleSizeChange" 
                                    @current-change="handleCurrentChange" 
                                    :current-page="currentPage" 
                                    background 
                                    :page-sizes="[10, 20, 30, 40]" 
                                    :page-size="pagesize" 
                                    layout="total, sizes, prev, pager, next, jumper" 
                                    :total="tableData.length">
                                    </el-pagination>
                                </div>
                                </div>
                            </el-col>
                            </template>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </div>
    </el-col>
</el-row>
</div>
</template>
<script>
export default {
    name:'individualcenter',
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入原密码'));
        } 
      };
      var validatePassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        }else{
            if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm2.passWord) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      formLabelWidth: '130px',
      downIcon:true,
      downIcon2:false,
      downIcon3:false,
      pwdType: 'text', // 密码类型
      pwdType2: 'password', // 密码类型
      pwdType3: 'password', // 密码类型
      openeye: require('@/assets/eye.png'), //图片地址
      openeye2: require('@/assets/closed.png'), //图片地址
      currentPage: 1,
      pagesize: 10,
      activeName: 'first',
      dialogFormVisible: false,
       ruleForm: {
          roomname:'',//门店名称
          roombyname: '',//门店别名
          tel:'',//电话
          zipcode: '',//邮编
          corporation:'',//法人
          homecity:'',//城市
          detadaddress:'',//详细地址
        },
        rules: {
          roomname:[
            {required: true, message: '请输入门店名称', trigger: 'blur'}
          ],
          roombyname: [
            {required: true, message: '请输入门店别名', trigger: 'blur'}
          ],
          tel: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ],
          zipcode: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
         corporation:[
             {required: true, message: '请输入法人', trigger: 'blur'}
         ],
         homecity:[
             {required: true, message: '请输入城市', trigger: 'blur'}
         ],
         detadaddress:[
             {required: true, message: '请输入详细地址', trigger: 'blur'}
         ],
        },
       ruleForm2: {
          pass: '',
          passWord:'',
          checkPass: '',
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passWord: [
            { validator: validatePassWord, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
         tableData:[{
            radio:'',
            roomname:'颐嘉瑜伽',
            roombyname:'颐嘉瑜伽',
            corporation:'小伙子',
            tel:'13254545452',
            zipcode:'1246554',
            portraiture:'00000',
            homecity:'上海',
            detadaddress:'这是详细地址这是详细地址这是详细地址',
          },{
            radio:'',
            roomname:'颐嘉瑜伽',
            roombyname:'颐嘉瑜伽',
            corporation:'小伙子',
            tel:'13254545452',
            zipcode:'1246554',
            portraiture:'00000',
            homecity:'上海',
            detadaddress:'这是详细地址这是详细地址这是详细地址',
          },{
            radio:'',
            roomname:'颐嘉瑜伽',
            roombyname:'颐嘉瑜伽',
            corporation:'小伙子',
            tel:'13254545452',
            zipcode:'1246554',
            portraiture:'00000',
            homecity:'上海',
            detadaddress:'这是详细地址这是详细地址这是详细地址',
          },{
            radio:'',
            roomname:'颐嘉瑜伽',
            roombyname:'颐嘉瑜伽',
            corporation:'小伙子',
            tel:'13254545452',
            zipcode:'1246554',
            portraiture:'00000',
            homecity:'上海',
            detadaddress:'这是详细地址这是详细地址这是详细地址',
         },{
            radio:'',
            roomname:'颐嘉瑜伽',
            roombyname:'颐嘉瑜伽',
            corporation:'小伙子',
            tel:'13254545452',
            zipcode:'1246554',
            portraiture:'00000',
            homecity:'上海',
            detadaddress:'这是详细地址这是详细地址这是详细地址',
         },{
            radio:'',
            roomname:'颐嘉瑜伽',
            roombyname:'颐嘉瑜伽',
            corporation:'小伙子',
            tel:'13254545452',
            zipcode:'1246554',
            portraiture:'00000',
            homecity:'上海',
            detadaddress:'这是详细地址这是详细地址这是详细地址',
         },{
            radio:'',
            roomname:'颐嘉瑜伽',
            roombyname:'颐嘉瑜伽',
            corporation:'小伙子',
            tel:'13254545452',
            zipcode:'1246554',
            portraiture:'00000',
            homecity:'上海',
            detadaddress:'这是详细地址这是详细地址这是详细地址',
        }]
    };
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
    },
    showToggle: function() {
      this.downIcon = !this.downIcon;
    },
    showToggle2: function() {
      this.downIcon2 = !this.downIcon2;
    },
    showToggle3: function() {
      this.downIcon3 = !this.downIcon3;
    },
      changeType() {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
      },
      changeType2() {
        this.pwdType2 = this.pwdType2 === 'password' ? 'text' : 'password';
      },
       changeType3() {
        this.pwdType3 = this.pwdType3 === 'password' ? 'text' : 'password';
      },
    open2() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData = this.tableData.slice(1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
.practice-main {
  height: 140px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  .breadcrumb {
    margin: 17px 20px auto;
  }
  .weber {
    margin: 20px 20px auto;
    height: 72px;
    display: flex;
    line-height: 72px;
    justify-content:flex-start;
    .weber-img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .weber-left {
      display: inline-grid;
      padding-left: 20px;
      .weber-span {
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        font-family: PingFang-SC-Regular;
        height: 35px;
        line-height: 40px;
        text-align: left;
        img {
          width: 15px;
          height: 15px;
          padding-left: 5px;
        }
      }
      .weber-p {
        height: 25px;
        line-height: 25px;
        text-align: left;
        margin-top: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #8c8c8c;
        .weber-pp {
          padding-left: 15px;
        }
      }
    }
  }
}
.center-main{
    width: 97%;
    height: 100%;
    margin: 20px auto;
    background-color: #ffffff;
	box-shadow: 0px 1px 6px 0px 
		rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    display: inline-block;
    .handback{
          height: 450px;
          .hand-left{
              .left-table{
                width: 100%;
                height: 100%;
                border: solid 1px #e8e8e8;
                margin-left: 30px;
                margin-top: 20px;
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
                margin: 20px auto;
             }
          }
      }
      .center-two{
            margin: 20px 80px auto;
            width: 70%;
            height: 440px;
            display: inline-block;
            position: relative;
            .primary{
                display: flex;
                justify-content: flex-start;
                margin-top: 35px;
            }
            .eye{
                width: 40px;
                height: 33px;
                background: #f5f5f5;
                position: absolute;
                right: 1px;
                top: 4px;
                img{
                    width: 17px;
                    height: 16px;
                    display: inline-block;
                    margin-top: 10px;
                }
            }
            .closed{
                width: 40px;
                height: 33px;
                background: #f5f5f5;
                position: absolute;
                right: 1px;
                top: 4px;
                img{
                    width: 15px;
                    height: 13px;
                    display: inline-block;
                }
            }
      }
    .room-main{
        height: 60px;
        .add{
                border: 1px solid #00bc71;
                width: 120px;
                height: 32px;
                border-radius: 4px;
                line-height: 0px;
                margin-top: 10px;
                margin-left: 30px;
                float: left;
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
            .add2{
                border: 1px solid #ff2366;
                width: 120px;
                height: 32px;
                border-radius: 4px;
                line-height: 0px;
                margin-top: 10px;
                margin-left: 20px;
                float: left;
                .p {
                color: #ff2366;
                font-size: 16px;
                font-family: PingFang-SC-Regular;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                line-height: 6px;
                }
            }
    }
    .table-room{
        width: 98%;
        margin: 0px auto;
        .block{
            margin: 15px auto;
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>