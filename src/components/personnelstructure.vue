<template>
<!--会所人员架构-->
    <div>
        <div class="practice-table2">
       <el-col :span="24">
            <div class="add">
                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">创建大队</el-button>
                <template>
                    <el-dialog title="创建大队" :append-to-body="true" :visible.sync="dialogFormVisible">
                        <!--创建大队-->
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                        <el-form-item label="大队名称:" prop="bigname" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-input v-model="ruleForm.bigname" placeholder="请输入"></el-input>
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
                <el-button type="text" class="p" @click="open2">删除大队</el-button>
            </div>
        </el-col>
        <el-col :span="24">
            <div class="handback">
               <el-col :span="24" class="left-table-main2" v-for="item in handback" :key="item.id">
                <el-col :span="2" class="table-dio">
                    <el-radio v-model="radio"></el-radio>
                </el-col>
                <el-col :span="5" class="table-hh">
                    <span>{{item.name}}</span>
                </el-col>
                <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" style="margin-top:10px;color:#00bc71">{{tag}}</el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+{{item.txt}}</el-button>
                </el-col>
            </div>
        </el-col>
    </div>
</div>
</template>
<script>
export default {
    name:'personnelstructure',
  data() {
    return {
        formLabelWidth: '130px',
        dialogFormVisible: false,
        radio:true,
        dynamicTags: ['组名1', '组名2', '组名3'],
        inputVisible: false,
        inputValue: '',
        ruleForm: {
          bigname:'',//大队名称
        },
        rules: {
          bigname:[
            {required: true, message: '请输入姓名', trigger: 'blur' }
          ],
        },
        handback:[{
            name:'这是A队名称',
            txt:'添加新组'
        },
        {
            name:'这是B队名称',
            txt:'添加新组'
        },
        {
            name:'这是C队名称',
            txt:'添加新组'
        },
        {
            name:'这是D队名称',
            txt:'添加新组'
        },
        {
            name:'这是E队名称',
            txt:'添加新组'
        },
        {
            name:'这是F队名称',
            txt:'添加新组'
        },
        {
            name:'这是G队名称',
            txt:'添加新组'
        }]
    };
  },
  methods:{
       handleClick(tab, event) {
        console.log(tab, event);
      },
       handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
      open2() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handback = this.handback.slice(1);
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
      }
  }
};
</script>
<style lang="scss">
 @import '../styles/dialog.scss';
</style>
<style lang="scss" scoped>
  .practice-table2 {
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
      .handback{
            height: 100%;
            width: 95%;
            margin: 20px auto;
            .left-table-main{
                    border-bottom: 1px solid #d9d9d9;
                    height: 55px;
                    line-height: 55px;
                    display: flex;
                .table-dio{
                    height: 55px;
                    line-height: 55px;
                    text-align: center;
                    .el-radio__inner{
                        width: 18px;
                        height: 18px;
                    }
                }
            .table-hh{
                height: 55px;
                line-height: 55px;
                text-align: left;
                span{
                    color: #262626;
                    font-size: 14px;
                }
            }
            .table-gg{
                height: 55px;
                line-height: 55px;
                text-align: left;
                text-indent: 20px;
                span{
                    color: #23c585;
                    font-size: 14px;
                    .el-tag .el-icon-close{
                        border-radius: 50%;
                        text-align: center;
                        position: relative;
                        cursor: pointer;
                        font-size: 12px;
                        height: 16px;
                        width: 16px;
                        line-height: 16px;
                        top: -1px;
                        right: -5px;
                        color: #00bc71;
                    }
                }
                .gg-span{
                    color: #23c585;
                }
            }
            }
            .left-table-main2{
                    border-top: 1px solid #d9d9d9;
                    height: 55px;
                    line-height: 55px;
                    display: flex;
                .table-dio{
                    height: 55px;
                    line-height: 55px;
                    text-align: center;
                    .el-radio__inner{
                        width: 18px;
                        height: 18px;
                    }
                }
            .table-hh{
                height: 55px;
                line-height: 55px;
                text-align: left;
                span{
                    color: #262626;
                    font-size: 14px;
                }
            }
            .table-gg{
                height: 55px;
                line-height: 55px;
                text-align: left;
                text-indent: 20px;
                span{
                    color: #23c585;
                    font-size: 14px;
                    .el-tag .el-icon-close{
                        border-radius: 50%;
                        text-align: center;
                        position: relative;
                        cursor: pointer;
                        font-size: 12px;
                        height: 16px;
                        width: 16px;
                        line-height: 16px;
                        top: -1px;
                        right: -5px;
                        color: #00bc71;
                    }
                }
                .gg-span{
                    color: #23c585;
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
  .el-tag + .el-tag {
    margin-left: 10px;
    margin-top: 10px;
    color: #00bc71;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
     margin-top: 10px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    color: #00bc71;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
    color: #00bc71;
  }
</style>