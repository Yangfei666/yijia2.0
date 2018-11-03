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
          <el-table :data="tableData" :show-header="false" style="width: 100%" highlight-current-row @row-click="rowClick">
            <el-table-column align="center" prop="radio" fixed width="50px">
              <template slot-scope="scope">
                <el-radio-group v-model="radio">
                  <el-radio :label="scope.$index" @change.native="radiochange(scope.row)">&nbsp;</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="tag">
              <template slot-scope="scope">
                <span>{{scope.row.Brigade}}</span>
                <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" style="margin-left:20px;">
                  {{tag}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" style="width:87px;height:35px;">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+添加新组</el-button>
              </template>
            </el-table-column>
          </el-table>
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
      dynamicTags: ["标签一", "标签二", "标签三"],
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
      tableData: []
    };
  },
  created: function() {
    //获取大队小组数据
    let _this = this;
    requestLogin("/setClubInfo/create", {}, "get")
      .then(function(res) {
        _this.tableData = res;
        // let { club_info_group } = res;
        // _this.dynamicTags = club_info_group;
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
    //删除小组
    handleClose(tag) {
      let _this = this;
        this.$confirm("确认删除该小组吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            console.log(_this.currentSelectRow.id);
            requestLogin(
              "/setClubInfo/" + _this.currentSelectRow.id,
              {},
              "delete"
            ).then(response => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            });
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
    //添加小组
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
      console.log(this.inputValue);
      console.log(this.currentSelectRow.id);
      requestLogin("/setClubInfo/addGroup/"+this.inputValue+"/"+this.currentSelectRow.id, {}, "post")
        .then(data => {
          this.$message({
            message: "添加小组成功",
            type: "success"
          });
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
            var loginParams = {
              title: this.ruleForm.bigname //大队名称
            };
            requestLogin("/addBrigade", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible = false;
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
          this.$message({ message: "提交失败!", type: "error" });
          return false;
        }
      });
    },
    rowClick(row, event, column) {
      this.radio = row.index;
      //获取表格数据
      this.currentSelectRow = row;
      console.log(row.index);
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
      } else {
        this.$confirm("确认删除该条记录吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _this.loading = true;
            console.log(_this.currentSelectRow.id);
            requestLogin(
              "/setClubInfo/" + _this.currentSelectRow.id,
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
  }
}
</style>