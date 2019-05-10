<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>客户反馈</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">客户反馈</span>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <!--信息反馈-->
    <div class="practice-list">
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table ref="singleTable" tooltip-effect="dark"  @current-change="handleCurrentChange2"  element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick" >
              <el-table-column prop="" align="left" label="" width="50"></el-table-column>
              <el-table-column prop="HYName" align="left" label="姓名"></el-table-column>
              <el-table-column prop="MotoTel" align="left" label="电话"></el-table-column>
              <el-table-column prop="content" align="left" label="反馈内容"></el-table-column>
              <el-table-column prop="handle" align="left" label="处理结果"></el-table-column>
              <el-table-column prop="ignore" align="left" label="忽略原因"></el-table-column>
              <el-table-column align="left" label="操作">
                <template slot-scope="scope">
                  <div v-if="scope.row.status == 0">
                  <el-button type="text" @click="dialogFormVisible1 = true" size="medium">处理</el-button>
                  <el-button type="text" @click="dialogFormVisible2 = true" size="medium">忽略</el-button>
                  </div>
                  <div v-if="scope.row.status == 1">
                  <el-button type="text" size="medium">已处理</el-button>
                  </div>
                  <div v-if="scope.row.status == 2">
                  <el-button type="text" style="color:#D7690F" size="medium">已忽略</el-button>
                   </div>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog title="处理反馈信息" :append-to-body="true" :visible.sync="dialogFormVisible1">
            <!--处理结果-->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="处理结果:" prop="desc" :label-width="formLabelWidth">
                <el-col :span="22">
                <el-input type="textarea" v-model.trim="ruleForm.desc" placeholder="请输入处理理由"></el-input>
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
           <el-dialog title="忽略反馈信息" :append-to-body="true" :visible.sync="dialogFormVisible2">
           <!--忽略理由-->
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px">
            <el-form-item label="忽略原因:" prop="desc2" :label-width="formLabelWidth">
                <el-col :span="22">
                <el-input type="textarea" v-model.trim="ruleForm2.desc2" placeholder="请输入忽略原因"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-col :span="24" style="display: flex;justify-content: flex-end;">
                <el-button @click="resetForm2('ruleForm2')">重置</el-button>
                <el-button type="primary" @click="submitForm2('ruleForm2')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                </el-col>
            </el-form-item>
            </el-form>
          </el-dialog>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"  :total="tableData.length" ></el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
export default {
  name: "feedback",
  inject: ["reload"],
  data() {
    return {
      currentPage: 1,
      currentSelectRow: "",
      pagesize: 10,
      count:"",
      dialogFormVisible1:false,
      dialogFormVisible2:false,
      tableData: [],
      id: "",
      formLabelWidth: "130px",
      ruleForm: {
        desc: "" //处理结果
      },
      rules: {
        desc: { required: true, message: '请输入处理结果', trigger: 'blur' }
      },
      ruleForm2: {
        desc2: "" //忽略理由
      },
      rules2: {
        desc2: { required: true, message: '请输入忽略理由', trigger: 'blur' }
      }
    };
  },
  created() {
    this.gettabledata();
  },
//   beforeUpdate() {
//     sessionStorage.setItem("untreated",this.count);
//   },
  methods: {
    //表格数据
    gettabledata() {
      let _this = this;
      requestLogin("/setMemberCustomers/showMemberAdvice", {}, "get")
        .then(res => {
          _this.tableData = res.data;
          _this.count = res.count;
          sessionStorage.setItem("untreated",res.count);
        })
        .catch(error => {
          let { response: { data: { errorCode, msg }}} = error;
          if (errorCode != 0) {
            this.$message({
              message: msg,
              type: "error"
            });
            return;
          }
        });
    },
    //处理结果
    submitForm(formName) {
      this.$confirm("确认要提交吗？", "提示").then(() => {
        var loginParams = {
          id: this.currentSelectRow.id, //id
          size:'1',
          content: this.ruleForm.desc //处理结果
        };
        requestLogin("/setMemberCustomers/handleMemberAdvice", loginParams, "post")
          .then(data => {
            this.$message({
              message: "处理成功",
              type: "success"
            });
            this.reload();
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
    },
    //忽略理由
    submitForm2(formName) {
      this.$confirm("确认要提交吗？", "提示").then(() => {
        var loginParams = {
          id: this.currentSelectRow.id, //id
          size:'2',
          content: this.ruleForm2.desc2 //忽略理由
        };
        requestLogin("/setMemberCustomers/handleMemberAdvice", loginParams, "post")
          .then(data => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.reload();
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
     resetForm2(formName) {
      this.$refs[formName].resetFields();
    },
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    rowClick(row, event, column) {
      this.currentSelectRow = row;
    },
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
.practice-main {
  height: 112px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  .breadcrumb {
    margin: 17px 20px auto;
  }
  .weber {
    margin: 17px 20px auto;
    height: 45px;
    display: flex;
    line-height: 45px;
    .weber-span {
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      font-family: PingFang-SC-Regular;
    }
    .search {
      width: 261px;
      border: 1px solid #e8e8e8;
      height: 32px;
      margin: 5px 35px auto;
      display: flex;
      border-radius: 16px;
      .search-input {
        width: 100%;
        border-radius: 16px;
        border: none;
        text-indent: 10px;
        color: #8c8c8c;
        font-size: 14px;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
    }
  }
}
.practice-list {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  display: inline-block;
  .practice-center {
    height: 80px;
    margin-top: -10px;
    .purple {
      height: 80px;
      display: flex;
      justify-content: flex-start;
      .add {
        height: 35px;
        margin-top: 20px;
        margin-right: 27px;
        margin-left: 10px;
      }
      .add2 {
        height: 35px;
        margin-top: 20px;
        margin-right: 27px;
        margin-left: 10px;
      }
    }
  }
  .practice-table {
    .el-button--text {
      color: #00bc71;
    }
    .block {
      float: right;
      margin-top: 10px;
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
  }
}
</style>