<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>教培管理</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/Teaching/teachingcourse/classprogress' }">正在上课</el-breadcrumb-item>
              <el-breadcrumb-item>查看所有学员</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">查看所有学员</span>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <!--查看所有学员-->
    <div class="practice-list">
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table ref="singleTable" tooltip-effect="dark" @current-change="handleCurrentChange2"  element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick" >
              <el-table-column prop="name" align="center" label="学员姓名"></el-table-column>
              <el-table-column prop="tel" align="center" label="学员电话" width="130px"></el-table-column>
              <el-table-column prop="sex" align="center" label="学员性别"></el-table-column>
              <el-table-column prop="teach_info.theme" align="center" label="归属教培"></el-table-column>
              <el-table-column prop="shift" align="center" label="班次"></el-table-column>
              <el-table-column prop="money" align="center" label="缴费"></el-table-column>
              <el-table-column prop="performance" align="center" label="身份证照片">
                 <template slot-scope="scope">
                   <el-tooltip content="点击图片可放大" placement="top">
                    <img :src="scope.row.identity_Photo" style="width: 55px;height: 55px" @click="handleFileEnlarge(scope.row.identity_Photo)">
                    </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="performance" align="center" label="合同照片">
                <template slot-scope="scope">
                  <el-tooltip content="点击图片可放大" placement="top">
                  <img :src="scope.row.contract_Photo" style="width: 55px;height: 55px" @click="handleFileEnlarge2(scope.row.contract_Photo)">
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column align="left" label="操作" width="150px" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="medium" @click="dialogFormVisible1 = true" :disabled ='disableds'>编辑</el-button>
                  <span v-if="scope.row.status=='退学'" style="margin-left: 10px;">
                  <el-button type="text" size="medium" @click="dialogFormVisible2 = true" style="color:#FF002B" :disabled ='disableds'>已退学</el-button>
                  </span>
                  <span v-else-if="scope.row.status == '请假'" style="margin-left: 10px;">
                  <el-button type="text" size="medium" @click="absence(scope.$index, scope.row)" style="color:#D7690F" :disabled ='disableds'>销假</el-button>
                  <el-button type="text" size="medium" @click="dialogFormVisible2 = true" :disabled ='disableds'>退学</el-button>
                  </span>
                  <span v-else-if="scope.row.status == '正常'" style="margin-left: 10px;">
                  <el-button type="text" size="medium" @click="dialogFormVisible3 = true" :disabled ='disableds'>请假</el-button>
                  <el-button type="text" size="medium" @click="dialogFormVisible2 = true" :disabled ='disableds'>退学</el-button>
                  </span>
                </template>
              </el-table-column>
              <template>
                <!--编辑学员-->
                 <el-dialog title="编辑学员" :append-to-body="true" :visible.sync="dialogFormVisible1">
                    <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px" @submit.native.prevent>
                      <el-form-item label="学员姓名:" prop="name" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model.trim="currentSelectRow.name"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="学员电话:" prop="tel" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model.trim="currentSelectRow.tel" maxlength="11"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="学员性别:" prop="sex" :label-width="formLabelWidth">
                        <el-col :span="22">
                            <el-radio label="女" value="1" v-model="currentSelectRow.sex"  @change="ChangeSex"></el-radio>
                            <el-radio label="男" value="2" v-model="currentSelectRow.sex"  @change="ChangeSex"></el-radio>
                        </el-col>
                      </el-form-item>
                      <!-- <el-form-item label="归属教培:" prop="themes" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model.trim="this.themes" :disabled="true"></el-input>
                        </el-col>
                      </el-form-item> -->
                      <el-form-item label="班次:" prop="shift" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-radio-group v-model="currentSelectRow.shift" @change="Changeshift">
                            <el-radio label="全天班" value="1"></el-radio>
                            <el-radio label="周末班" value="2"></el-radio>
                            <el-radio label="晚班" value="3"></el-radio>
                          </el-radio-group>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="缴费:" prop="money" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input v-model.trim="currentSelectRow.money"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="身份证照片:" prop="identity_Photo" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="uploadImg" :http-request='submitUpload1' :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="合同照片:" prop="contract_Photo" :label-width="formLabelWidth">
                        <el-col :span="22">
                           <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="uploadImg2" :http-request='submitUpload2' :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                        </el-col>
                      </el-form-item>
                      <el-form-item class="dialog-footer">
                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                          <el-button @click="resetForm('currentSelectRow')">重置</el-button>
                          <el-button type="primary" @click="submitForm('currentSelectRow')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
              </template>
               <template>
                 <!--学员退学-->
                  <el-dialog title="学员退学" :append-to-body="true" :visible.sync="dialogFormVisible2">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="费用:" prop="money" :label-width="formLabelWidth">
                        <el-col :span="22">
                         <el-input v-model.trim="ruleForm.money" placeholder="请输入"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="退学原因:" prop="reason" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input type="textarea" v-model.trim="ruleForm.reason" placeholder="请输入退学原因"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item class="dialog-footer">
                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                          <el-button @click="dialogFormVisible2 = false">取消</el-button>
                          <el-button type="primary" @click="leaveschool('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </template>
                <template>
                  <!--学员请假-->
                  <el-dialog title="学员请假" :append-to-body="true" :visible.sync="dialogFormVisible3">
                    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px">
                       <el-form-item label="请假日期:" prop="startDay" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-date-picker v-model="ruleForm2.startDay" :clearable="false"  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:49%" placeholder="开始日期"></el-date-picker>
                          <el-date-picker v-model="ruleForm2.endDay" :clearable="false"  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:49%" placeholder="结束日期"></el-date-picker>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="请假原因:" prop="reason" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input type="textarea" v-model.trim="ruleForm2.reason" placeholder="请输入请假原因"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item class="dialog-footer">
                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                          <el-button @click="dialogFormVisible3 = false">取消</el-button>
                          <el-button type="primary" @click="forleave('ruleForm2')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </template>
            </el-table>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"  :total="tableData.length" ></el-pagination>
            </div>
            <template>
                <!--放大身份证图片-->
                <el-dialog title="" :visible.sync="isEnlargeImage" :show-close='false' :modal-append-to-body="false">
                  <img @click="isEnlargeImage = false" style="width:70%;" :src="enlargeImage">
                </el-dialog>
            </template>
            <template>
                <!--放大合同图片-->
                <el-dialog title="" :visible.sync="isEnlargeImage2" :show-close='false' :modal-append-to-body="false">
                  <img @click="isEnlargeImage2 = false" style="width:70%;" :src="enlargeImage2">
                </el-dialog>
            </template>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
const radioDict = {
  "全天班": 1,
  "周末班": 2,
  "晚班": 3,
}
export default {
  name: "viewall",
  inject: ["reload"],
  data() {
    return {
      currentPage: 1,
      currentSelectRow:{},
      pagesize: 10,
      tableData: [],
      disableds:false,
      dialogFormVisible1:false,
      dialogFormVisible2:false,
      dialogFormVisible3:false,
      dialogFormVisible4:false,
      formLabelWidth: "130px",
      isEnlargeImage: false, //放大图片
      enlargeImage: "", //放大图片地址
      isEnlargeImage2: false, //放大图片
      enlargeImage2: "", //放大图片地址
      imageUrl: "",
      imageUrl2: "",
      idd:"",
      themes:"",
      file:"",
      file2:"",
      ruleForm: {
        money: "",
        reason: "",
      },
      rules: {
        money: [
          { required: true, message: "请输入费用", trigger: "blur" }
        ],
        reason: [
          { required: true, message: "请输入退学原因", trigger: "blur" }
        ],
      },
      ruleForm2: {
        startDay: "",
        endDay:"",
        reason: "",
      },
      rules2: {
        startDay: [
          { required: true, message: "请选择开始时间", trigger: "change" }
        ],
        endDay: [
          { required: true, message: "请选择结束时间", trigger: "change" }
        ],
        reason: [
          { required: true, message: "请输入请假原因", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.gettabledata();
    if(this.$route.query.shibie == 'shibie' && this.$route.query.endDay < this.$route.query.daydate){
      this.disableds = true;
    }else{
      this.disableds = false;
    }
  },
  methods: {
    //放大图片
    handleFileEnlarge(_url) {
      if (_url) {
        this.enlargeImage = _url;
        this.isEnlargeImage = !this.isEnlargeImage;
      }
    },
    handleFileEnlarge2(_url2) {
      if (_url2) {
        this.enlargeImage2 = _url2;
        this.isEnlargeImage2 = !this.isEnlargeImage2;
      }
    },
    uploadImg(file) {
      this.imgfile = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    uploadImg2(file) {
      this.imgfile = file.raw;
      this.imageUrl2 = URL.createObjectURL(file.raw);
    },
    //表格数据
    gettabledata() {
      let _this = this;
      requestLogin("/teachStudent/list/"+_this.$route.query.id, {}, "get")
        .then(res => {
          _this.tableData = res;
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
    //修改学员
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let formData = new FormData();
            formData.append("name", this.currentSelectRow.name); //姓名
            formData.append("tel", this.currentSelectRow.tel); //电话
            formData.append("sex", this.currentSelectRow.sex == '女'?1:2); //性别
            formData.append("teachId",this.$route.query.id); //归属教培
            formData.append("shift", radioDict[this.currentSelectRow.shift]); //班次
            formData.append("money", this.currentSelectRow.money); //缴费
            formData.append("identity_Photo", this.file); //身份证
            formData.append("contract_Photo", this.file2); //合同
            requestLogin(
              "/teachStudent/updateInfo/" + this.currentSelectRow.id,
              formData,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "修改成功",
                  type: "success"
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
          });
        } else {
          return false;
        }
      });
    },
    //学员退学
    leaveschool(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              money: this.ruleForm.money, //费用
              student_id: this.currentSelectRow.id, //id
              reason: this.ruleForm.reason, //原因
            };
            requestLogin("/teachStudent/dropOut", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible2 = false;
                this.ruleForm.money = "";
                this.ruleForm.reason = "";
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
    //学员请假
    forleave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              start_time: this.ruleForm2.startDay, //开始时间
              end_time: this.ruleForm2.endDay, //结束时间
              student_id: this.currentSelectRow.id, //id
              reason: this.ruleForm2.reason, //原因
            };
            requestLogin("/teachStudent/studentLeave", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible3 = false;
                this.ruleForm.startDay = "";
                this.ruleForm.endDay = "";
                this.ruleForm.reason = "";
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
    //学员销假
    absence(index, row){
      let _this = this;
      _this.currentSelectRow = row;
      requestLogin("/teachStudent/unLeave/"+_this.currentSelectRow.id,{}, "get")
        .then(res => {
          this.$message({
            message: "销假成功",
            type: "success"
          });
          _this.reload();
        })
        .catch(error => {
          let { response: {data: { errorCode, msg } }} = error;
          if (errorCode != 0) {
            this.$message({
              message: msg,
              type: "error"
            });
            return;
          }
        });
    },
     //身份证照片
    submitUpload1: function(content) {
      this.file = content.file;
    },
     //合同照片
    submitUpload2: function(content) {
      this.file2 = content.file;
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
    ChangeSex(val) {
    },
    Changeshift(val){
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
      this.imageUrl = this.currentSelectRow.identity_Photo;
      this.imageUrl2 = this.currentSelectRow.contract_Photo;
      this.themes = this.currentSelectRow.teach_info.theme;
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
    margin-top:10px;
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