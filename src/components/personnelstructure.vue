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
               <el-col :span="24" class="left-table-main2" v-for="item in big" :key="item.id">
                <el-col :span="2" class="table-dio">
                    <el-radio-group v-model="radio">
                   <el-radio  @change.native="radiochange">&nbsp;</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="5" class="table-hh">
                    <span>{{item.Brigade}}</span>
                </el-col>
                <el-tag :key="tag" v-for="tag in club_info_group" closable :disable-transitions="false" @close="handleClose(tag)" style="margin-top:10px;color:#00bc71">{{tag}}</el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+添加新组</el-button>
                </el-col>
            </div>
            </el-col>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "personnelstructure",
  inject: ["reload"],
  data() {
    return {
      formLabelWidth: "130px",
      dialogFormVisible: false,
      radio: true,
      dynamicTags: ['标签一', '标签二', '标签三'],
      club_info_group: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      loading: false,
      inputValue: "",
      ruleForm: {
        bigname: "" //大队名称
      },
      rules: {
        bigname: [
          { required: true, message: "请输入大队名称", trigger: "blur" }
        ]
      },
      big: [],
    };
  },
  created: function() {
    //获取大队小组数据
    let _this = this;
    requestLogin("/setClubInfo/create", {}, "get")
      .then(function(res) {
        _this.big = res;
        let { club_info_group } = res;
        _this.club_info_group = club_info_group;
      })
      .catch(error => {
        if (error.res) {
          this.$message({
            message: "获取数据失败",
            type: "error"
          });
        }
      });
  },
  methods: {
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
      this.inputValue = "";
    },
    //添加大队
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            var loginParams = {
              title: this.ruleForm.bigname //大队名称
            };
            requestLogin("/addBrigade", loginParams, "post")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible = false;
              })
              .catch(error => {
                this.addLoading = false;
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
          this.$message({ message: "提交失败!", type: "error" });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    radiochange(row) {
      console.log(`当前: ${row}`);
    },
    //删除大队
    open2() {
      let _this = this;
      if (!this.currentSelectRow) {
        this.$message({ message: "请先选择数据!", type: "warning" });
        return;
      }
      this.$confirm("确认删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.loading = true;
          console.log(_this.currentSelectRow.YGXX_YGID_NEI);
          requestLogin(
            "/setClubInfo/" + _this.currentSelectRow.YGXX_YGID_NEI,
            {},
            "delete"
          ).then(response => {
            _this.loading = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
          this.reload();
        })
        .catch(error => {
          this.addLoading = false;
          let { response: { data: { errorCode, msg } } } = error;
          if (errorCode != 0) {
            this.$message({
              message: msg,
              type: "error"
            });
            return;
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
<style lang="scss" scoped>
@import "@/styles/personnelstructure.scss";
.practice-table2 {
  .add {
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
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      line-height: 6px;
    }
  }
  .add2 {
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
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      line-height: 6px;
    }
  }
  .handback {
    height: 100%;
    width: 95%;
    margin: 20px auto;
    display: inline-block;
    .left-table-main {
      border-bottom: 1px solid #d9d9d9;
      height: 55px;
      line-height: 55px;
      display: flex;
      .table-dio {
        height: 55px;
        line-height: 55px;
        text-align: center;
        .el-radio__inner {
          width: 18px;
          height: 18px;
        }
      }
      .table-hh {
        height: 55px;
        line-height: 55px;
        text-align: left;
        span {
          color: #262626;
          font-size: 14px;
        }
      }
      .table-gg {
        height: 55px;
        line-height: 55px;
        text-align: left;
        text-indent: 20px;
        span {
          color: #23c585;
          font-size: 14px;
          .el-tag .el-icon-close {
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
        .gg-span {
          color: #23c585;
        }
      }
    }
    .left-table-main2 {
      border-top: 1px solid #d9d9d9;
      height: 55px;
      line-height: 55px;
      display: flex;
      .table-dio {
        height: 55px;
        line-height: 55px;
        text-align: center;
        .el-radio__inner {
          width: 18px;
          height: 18px;
        }
      }
      .table-hh {
        height: 55px;
        line-height: 55px;
        text-align: left;
        span {
          color: #262626;
          font-size: 14px;
        }
      }
      .table-gg {
        height: 55px;
        line-height: 55px;
        text-align: left;
        text-indent: 20px;
        span {
          color: #23c585;
          font-size: 14px;
          .el-tag .el-icon-close {
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
        .gg-span {
          color: #23c585;
        }
      }
    }
    .hand-right {
      height: 100%;
      .upload {
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