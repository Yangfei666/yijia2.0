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
                      <el-radio v-model="ruleForm.heat" label="精品">精品</el-radio>
                      <el-radio v-model="ruleForm.heat" label="普通">普通</el-radio>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="状态:" prop="start" :label-width="formLabelWidth">
                    <el-col :span="22">
                      <el-radio v-model="ruleForm.start" label="启用">启用</el-radio>
                      <el-radio v-model="ruleForm.start" label="禁用">禁用</el-radio>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="课程封面:" prop="cover" :label-width="formLabelWidth">
                    <el-col :span="22">
                      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" v-model="ruleForm.cover" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
              <el-dialog title="修改课程科目" :append-to-body="true" :visible.sync="dialogFormVisible2">
                <EditCoursesubjects :currentSelectRow="currentSelectRow"></EditCoursesubjects>
              </el-dialog>
            </template>
          </div>
          <div class="add2">
            <el-button type="text" class="p" @click.prevent="handleDel">删除课程科目</el-button>
          </div>
        </div>
        <div class="purple2">
          <el-form ref="form" :model="form" label-width="90px">
            <el-col :span="23" class="purple-name">
              <el-form-item label="课程名称:">
                <el-col :span="24">
                  <el-input v-model="form.name" placeholder="请输入"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="1" class="purple-but">
              <el-form-item label-width="25px">
                <el-col :span="24">
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-col>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table v-loading="loading" element-loading-text="拼命加载中..." highlight-current-row :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :header-cell-style="{background:'#fafafa'}" @row-click="rowClick" fixed style="width: 100%">
              <el-table-column align="center" prop="radio" fixed width="80px">
                <template slot-scope="scope">
                  <el-radio-group v-model="radio">
                    <el-radio :label="scope.$index" @change.native="radiochange(scope.row)">&nbsp;</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column prop="kcName" align="left" label="课程名称"></el-table-column>
              <el-table-column prop="kcHot" align="left" label="热度"></el-table-column>
              <el-table-column prop="ZT" align="left" label="状态"></el-table-column>
              <el-table-column prop="BZ" align="left" label="备注"></el-table-column>
            </el-table>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
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
import EditCoursesubjects from "@/components/editCoursesubjects";
export default {
  name: "course",
  components: {
    EditCoursesubjects
  },
  data() {
    return {
      addLoading: false,
      loading: false,
      imageUrl: "",
      formLabelWidth: "130px",
      currentSelectRow: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      currentPage: 1,
      pagesize: 10,
      radio: true,
      ruleForm: {
        classname: "是都", //课程名称
        price: "123", //价格
        heat: "2", //热度
        start: "1", //状态
        cover: "" ,//课程封面
        desc:"",//备注
      },
      rules: {
        classname: [
          { required: true, message: "请输入课程名称", trigger: "blur" }
        ],
        heat: [{ required: true, message: "请选择热度", trigger: "change" }],
        start: [{ required: true, message: "请选择状态", trigger: "change" }],
        cover: [
          { required: true, message: "请选择课程封面", trigger: "change" }
        ]
      },
      form: {
        name: ""
      },
      tableData: []
    };
  },
  created: function () {
    //表格列表数据
      let _this = this;
      _this.loading = true;
      requestLogin("/setCurSubInfo",{},'get')
        .then(function(res) {
          _this.loading = false;
          _this.tableData = res;
        })
        .catch(error => {
          if(error.res){
             this.$message({
              message: "获取数据失败",
              type: "error"
            });
          }
        });
  },
  methods: {
    radiochange(row) {
      console.log(`当前: ${row}`);
    },
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
    },
    //获取表格数据
    rowClick(row, event, column) {
      this.radio = row.index;
      this.currentSelectRow = row;
      console.log(row.index);
    },
    //删除课程科目
    handleDel() {
        this.$confirm("确认删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          console.log(123);
          requestLogin("/setCurSubInfo/" +1, {}, "delete").then(response => {
            console.log(111);
            this.loading = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.tableData = this.tableData.splice(1);
          });
        })
        .catch(() => {
          this.loading = false;
          this.$message({
            message: "删除失败!",
            type: "error"
          });
        });
    },
    //修改课程科目
    changeInfo() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$alert("请先选择列表", "提示信息", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `请先选择列表`
            });
          }
        });
      }
    },
    //查询表单
    onSubmit() {
      console.log("submit!");
    },
   //添加课程科目
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？','提示').then(() => {
            console.log("接口前");
            this.addLoading = true;
            var loginParams = {
                kcName: this.ruleForm.classname,//课程名称
                ZT: this.ruleForm.start,//状态
                BZ: this.ruleForm.desc,//备注
                kcHot : this.ruleForm.heat,//热度
                price : this.ruleForm.price,//价格
                file : this.ruleForm.cover,//课程封面
            };
            requestLogin('/setCurSubInfo', loginParams,'post').then(data => {
              console.log("接口后");
              this.addLoading = false;
              this.$message({
									message: '提交成功',
									type: 'success'
                });
            })
            .catch(error => {
              this.addLoading = false;
              if (error.response) {
                this.$message({
                  message: "提交失败,请稍候再试",
                  type: "error"
                });
              }
            });
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
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