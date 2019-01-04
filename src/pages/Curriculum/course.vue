<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>课程管理</el-breadcrumb-item>
              <el-breadcrumb-item>课程科目管理</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">课程科目管理</span>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <div class="practice-list">
      <div class="practice-center">
        <div class="purple">
          <div class="add">
            <el-button type="text" class="add-p el-icon-plus" @click="dialogFormVisible = true">添加课程科目</el-button>
            <template>
              <el-dialog title="添加课程科目" :append-to-body="true" :visible.sync="dialogFormVisible">
                <!--添加课程科目-->
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                  <el-form-item label="课程科目:" prop="classname" :label-width="formLabelWidth">
                    <el-col :span="22">
                      <el-input v-model="ruleForm.classname" placeholder="请输入"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="价格:" prop="price" :label-width="formLabelWidth">
                    <el-col :span="22">
                      <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="热度:" prop="heat" :label-width="formLabelWidth">
                    <el-col :span="22">
                      <el-radio v-model="ruleForm.heat" label="1">精品</el-radio>
                      <el-radio v-model="ruleForm.heat" label="2">普通</el-radio>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                    <el-col :span="22">
                      <el-radio v-model="ruleForm.status" label="1">启用</el-radio>
                      <el-radio v-model="ruleForm.status" label="2">禁用</el-radio>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="课程封面:" prop="filecover" :label-width="formLabelWidth">
                    <el-col :span="22">
                      <el-upload class="upload-demo" ref="upload" action=" " :file-list="fileList" :limit='1' :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-exceed='uploadOverrun' :http-request='submitUpload' list-type="picture" :auto-upload="true">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                      </el-upload>
                    </el-col>
                  </el-form-item>
                  <el-form-item class="dialog-footer">
                    <el-col :span="24" style="display: flex;justify-content: flex-end;">
                      <el-button @click.native="resetForm('ruleForm')">重置</el-button>
                      <el-button type="primary" @click.native="submitForm('ruleForm')" :loading="addLoading" style="background-color: #00BC71;border-color: #00BC71;">提交</el-button>
                    </el-col>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </template>
          </div>
          <div class="add">
            <el-button type="text" class="p" @click.prevent="changeInfo">修改课程科目</el-button>
            <template>
              <el-dialog v-if="dialogFormVisible2" title="修改课程科目" :append-to-body="true" :visible.sync="dialogFormVisible2">
                <EditCoursesubjects :currentSelectRow="currentSelectRow"></EditCoursesubjects>
              </el-dialog>
            </template>
          </div>
          <div class="add">
            <el-button type="text" class="p" @click.prevent="changeInfo2">课程科目详情</el-button>
            <template>
              <el-dialog v-if="dialogFormVisible3" title="课程科目详情" :append-to-body="true" :visible.sync="dialogFormVisible3">
                <DetailsCoursesubjects :currentSelectRow="currentSelectRow"></DetailsCoursesubjects>
              </el-dialog>
            </template>
          </div>
        </div>
        <div class="purple2">
          <el-form ref="form" label-width="90px" @submit.native.prevent>
            <el-col :span="23" class="purple-name">
              <el-form-item label="课程名称:">
                <el-col :span="24">
                  <el-input v-model="searchName" placeholder="请输入"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="1" class="purple-but">
              <el-form-item label-width="25px">
                <el-col :span="24">
                  <el-button type="primary" @click="search">查询</el-button>
                </el-col>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table v-loading="loading" ref="singleTable" @current-change="handleCurrentChange2" element-loading-text="拼命加载中..." highlight-current-row :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :header-cell-style="{background:'#fafafa'}" @row-click="rowClick" fixed style="width: 100%">
              <el-table-column align="center" prop="radio" fixed width="80px">
                <template slot-scope="scope">
                  <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="kcName" align="left" label="课程名称"></el-table-column>
              <el-table-column prop="kcHot" align="left" label="热度"></el-table-column>
              <el-table-column prop="ZT" align="left" label="状态"></el-table-column>
              <el-table-column prop="BZ" align="left" label="备注"></el-table-column>
            </el-table>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
              </el-pagination>
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
import EditCoursesubjects from "@/components/editCoursesubjects";
import DetailsCoursesubjects from "@/components/detailsCoursesubjects";
export default {
  name: "course",
  inject: ["reload"],
  components: {
    EditCoursesubjects,
    DetailsCoursesubjects
  },
  data() {
    return {
      file: "",
      fileList: [],
      addLoading: false,
      loading: false,
      imageUrl: "",
      formLabelWidth: "130px",
      currentSelectRow: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      currentPage: 1,
      pagesize: 10,
      radio: true,
      ruleForm: {
        classname: "", //课程名称
        price: "", //价格
        heat: "", //热度
        status: "", //状态
        filecover: "", //课程封面
        desc: "" //备注
      },
      rules: {
        classname: validate.classname,
        heat: validate.heat,
        status: validate.status
      },
      searchName: "",
      tableData: [],
      tableData2: []
    };
  },
  watch: {
    searchName(val) {
      if (!val) {
        this.tableData = this.tableData2;
      }
    }
  },
  created: function() {
    this.getbiaoge();
  },
  methods: {
    getbiaoge() {
      //表格列表数据
      let _this = this;
      _this.loading = true;
      requestLogin("/setCurSubInfo", {}, "get")
        .then(function(res) {
          _this.loading = false;
          _this.tableData = res;
          _this.tableData2 = res;
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
    getCurrentRow(val) {},
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传1张图片!"
      });
    },
    //上传图片
    submitUpload: function(content) {
      this.file = content.file;
    },
    radiochange(row) {},
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    //获取表格数据
    rowClick(row, event, column) {
      this.radio = row.index;
      this.currentSelectRow = row;
      this.radio = this.tableData.indexOf(row);
    },
    //修改课程科目
    changeInfo() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择表格数据!", type: "warning" });
      }
    },
    //课程科目详情
    changeInfo2() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible3 = true;
      } else {
        this.$message({ message: "请先选择表格数据!", type: "warning" });
      }
    },
    //查询表单
    search() {
      this.tableData = this.tableData2;
      this.tableData = this.tableData2.filter(
        i => i.kcName.indexOf(this.searchName) != -1
      );
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //添加课程科目
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            let formData = new FormData();
            formData.append("kcName", this.ruleForm.classname); //课程名称
            formData.append("ZT", this.ruleForm.status); //状态
            formData.append("BZ", this.ruleForm.desc); //备注
            formData.append("kcHot", this.ruleForm.heat); //热度
            formData.append("price", this.ruleForm.price); //价格
            formData.append("file", this.file); //课程封面
            requestLogin("/setCurSubInfo", formData, "post")
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
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.imgupload.clearFiles();
      this.file = "";
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
@import "@/styles/course.scss";
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
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .quanbu {
    display: block;
    height: 60px;
    .search-form {
      height: 45px;
      display: flex;
      float: left;
      margin: 15px 0px auto;
      .el-button--primary {
        background-color: #00bc71;
        border-color: #00bc71;
      }
    }
    .el-input__inner {
      height: 37px;
    }
    .el-input {
      height: 37px;
    }
  }
  .quanbu2 {
    display: inherit;
    float: left;
    height: 60px;
    margin-left: -70px;
    .search-form2 {
      display: flex;
      margin: 15px 0px auto;
      float: left;
      height: 45px;
      .el-button--primary {
        background-color: #00bc71;
        border-color: #00bc71;
      }
    }
    .corry {
      height: 37px;
      line-height: 37px;
      float: left;
      margin-top: 15px;
      .corry-out {
        color: #00bc71;
        font-size: 14px;
      }
    }
  }
  .practice-center {
    height: 80px;
    display: flex;
    .purple {
      height: 80px;
      display: flex;
      justify-content: flex-start;
      width: 50%;
      .add {
        border: 1px solid #00bc71;
        width: 20%;
        height: 35px;
        border-radius: 4px;
        line-height: 0px;
        margin-top: 20px;
        margin-left: 20px;
        .p {
          color: #00bc71;
          font-size: 16px;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 9px;
        }
        .add-p {
          color: #00bc71;
          font-size: 16px;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 9px;
        }
      }
      .add2 {
        border: 1px solid #ff2366;
        width: 20%;
        height: 35px;
        border-radius: 4px;
        line-height: 0px;
        margin-top: 20px;
        margin-left: 20px;
        .p {
          color: #ff2366;
          font-size: 16px;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 9px;
        }
      }
    }
    .purple2 {
      height: 80px;
      display: flex;
      justify-content: center;
      width: 50%;
      .search {
        width: 44%;
        border: 1px solid #e8e8e8;
        height: 32px;
        display: flex;
        border-radius: 16px;
        margin-top: 20px;
        margin-right: 20px;
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
      .purple-name {
        margin-top: 17px;
      }
      .purple-but {
        margin-top: 17px;
        .el-button--primary {
          height: 35px;
          line-height: 11px;
        }
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
