<template>
  <!--会所封面管理-->
  <div>
    <div class="practice-table">
      <el-col :span="24">
        <div class="add">
          <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加图片</el-button>
          <template>
            <el-dialog title="添加会所图片" :append-to-body="true" :visible.sync="dialogFormVisible">
              <!--添加会所图片-->
              <el-upload class="upload-demo" ref="upload" action=" "
              :file-list="fileList"
              :limit='5'
              :on-exceed='uploadOverrun'
              :http-request='submitUpload'
              list-type="picture"
              :auto-upload="true">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-dialog>
          </template>
        </div>
      </el-col>
      <el-col :span="24" class="table">
        <el-table :data="cover" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中..." :default-sort="{order: 'descending'}" highlight-current-row :header-cell-style="{background:'#fafafa'}" @row-click="rowClick">
          <el-table-column prop="id" label="ID" sortable align="left" width="250">
          </el-table-column>
          <el-table-column prop="hsxxPic" label="图片" sortable align="left" width="300">
            <template slot-scope="scope">
              <img :src="scope.row.hsxxPic" style="width: 75px;height: 65px">
            </template>
          </el-table-column>
          <el-table-column prop="hsxxIsFirst" label="状态" sortable align="left" width="300">
            <template slot-scope="scope">
              <div v-if="scope.row.hsxxIsFirst == '封面'">
                <el-tooltip :content="scope.row.hsxxIsFirst" placement="top">
                <el-switch v-model="scope.row.hsxxIsFirst" @change="changeSwitch($event,scope.row)" disabled active-color="#00bc71" inactive-color="#ff4949" active-value="封面" inactive-value="非封面">
                </el-switch>
              </el-tooltip>
              </div>
              <div v-else>
              <el-tooltip :content="scope.row.hsxxIsFirst" placement="top">
                <el-switch v-model="scope.row.hsxxIsFirst" @change="changeSwitch($event,scope.row)" @click.native.prevent="toggleStatus(scope.$index)" active-color="#00bc71" inactive-color="#ff4949" active-value="封面" inactive-value="非封面">
                </el-switch>
              </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <div v-if="scope.row.hsxxIsFirst == '封面'">
               <el-button size="mini" type="danger" disabled>删除</el-button>
              </div>
              <div v-else>
              <el-button size="mini" type="danger" @click.native.prevent="mydel(scope.$index,cover)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "covermanagement",
  inject: ["reload"],
  data() {
    return {
      fileList: [],
      formLabelWidth: "130px",
      dialogFormVisible: false,
      cover: [],
      hsxxIsFirst:true,
      loading: true,
      rowIndex: -1,//图片下标
    };
  },
  created: function() {
    this.getClub();
  },
  methods: {
    toggleStatus(index, row) {
      let _this = this;
      this.$confirm("确认选择当前为封面吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.loading = true;
          requestLogin(
            "/setClubInfoImg/" + _this.currentSelectRow.id,
            {},
            "put"
          ).then(() => {
            _this.loading = false;
            this.$message({
              message: "修改成功",
              type: "success"
            });
          })
            .then(()=>{
              _this.getClub()
            })
        })
        .catch(error => {
          _this.loading = false;
          this.$message({
              message: "修改失败",
              type: "error"
            });
            _this.cover[index].hsxxIsFirst = '非封面';
        });
    },
    changeSwitch(val,row) {
    },
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传5张图片!"
      });
    },
    //自定义的上传图片的方法
    submitUpload(content){
      let _this = this
      let formData = new FormData();
      formData.append("file", content.file);
      this.$message({message: "添加成功",type: "success"});
      this.dialogFormVisible = false;
      requestLogin("/setClubInfoImg", formData,'post')
        .then(()=>{
          _this.getClub()
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取封面
    getClub() {
      let _this = this;
      _this.loading = true;
      requestLogin("/setClubInfoImg", {}, "get")
        .then(function(res) {
          _this.loading = false;
          _this.cover = res;
        })
        .catch(error => {
          _this.loading = false;
          if (error.res) {
            this.$message({
              message: "获取数据失败",
              type: "error"
            });
          }
        });
    },
    //删除封面
    mydel(index, row) {
      let _this = this;
      this.$confirm("确认删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.loading = true;
          requestLogin(
            "/setClubInfoImg/" + _this.currentSelectRow.id,
            {},
            "delete"
          ).then(() => {
            _this.loading = false;
            _this.$message({
              message: "删除成功",
              type: "success"
            })
          })
            .then(()=>{
              _this.cover.splice(index, 1)
            })
          ;
          rows.splice(index, 1);
        })
        .catch(error => {
          _this.loading = false;
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    rowClick(row, event, column) {
      //获取表格数据
      this.currentSelectRow = row;
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
<style lang="scss" scoped>
.practice-table {
  width: 97%;
  height: 100%;
  display: inline-block;
  .add {
    border: 1px solid #00bc71;
    width: 120px;
    height: 32px;
    border-radius: 4px;
    margin-top: 10px;
    display: block;
    margin-left: 10px;
    .p {
      color: #00bc71;
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      margin-top: -5px;
    }
  }
  .table {
    margin-top: 20px;
  }
}
</style>
