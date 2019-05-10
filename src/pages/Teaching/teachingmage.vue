<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>教培管理</el-breadcrumb-item>
              <el-breadcrumb-item>教培业绩</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">教培业绩</span>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <!--教培业绩-->
    <div class="practice-list">
      <div class="practice-center">
        <el-row>
          <el-col :span="24">
            <div class="purple">
              <div class="add">
                <el-date-picker v-model="DefaultShow" @change="changeWeek" :clearable="false"  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"  placeholder="选择日期"></el-date-picker>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table ref="singleTable" tooltip-effect="dark"  border  @current-change="handleCurrentChange2"  element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick" >
              <el-table-column prop="name" align="center" label="姓名"></el-table-column>
              <el-table-column prop="performance" align="center" label="业绩">
                <template slot-scope="scope">
                  <span v-if="edit_id !== scope.row.id || his == false">{{scope.row.performance}}</span>
                  <el-input v-else size="small" v-model.trim="scope.row.performance" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                <div v-if="edit_id !== scope.row.id || his == false">
                  <el-button type="text" @click="editRow(scope.$index,scope.row)">编辑</el-button>
                </div>
                <div v-else>
                  <el-button type="text" @click="conservation(scope.$index,scope.row)">保存</el-button>
                </div>
                </template>
              </el-table-column>
            </el-table>
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
import moment from "moment";
export default {
  name: "teachingmage",
  inject: ["reload"],
  data() {
    return {
      currentPage: 1,
      currentSelectRow: "",
      pagesize: 10,
      tableData: [],
      DefaultShow:this.getCurrentDateTime(),
      id: "",
      his:false,
      edit_id:""
    };
  },
  created() {
    this.gettabledata();
  },
  mounted() {
    this.DefaultShow = this.getCurrentDateTime();
  },
  methods: {
    getCurrentDateTime() {
      return moment(new Date()).format("YYYY-MM-DD");
    },
    editRow(index, row) {
        this.his = true;
        this.edit_id = row.id;
    },
    //表格数据
    gettabledata() {
      let _this = this;
      requestLogin("/satffPerList/"+_this.DefaultShow, {}, "get")
        .then(res => {
          _this.tableData = res[0].staff_info;
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
    changeWeek(val) {
      this.gettabledata();
    },
    //保存
    conservation(){
      let _this = this;
      _this.his = !_this.his;
      let editarrange = {
        staffId: _this.currentSelectRow.id, //员工编号
        date:_this.DefaultShow, //日期
        performance:_this.currentSelectRow.performance, //业绩
      };
      requestLogin("/satffPerUpdate/"+_this.currentSelectRow.staffPerId, editarrange, "post")
        .then(res => {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        })
        .catch(error => {
         _this.his = true;
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