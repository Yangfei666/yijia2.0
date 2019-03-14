<template>
  <div>
      <!--班次设置-->
    <div class="practice-list">
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table ref="singleTable" @current-change="handleCurrentChange2" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
              <el-table-column prop="banTitle" align="left" fixed label="班次"></el-table-column>
              <el-table-column prop="banDes" align="left" label="所属岗位"></el-table-column>
              <el-table-column prop="banState" align="left" label="上班时间"></el-table-column>
              <el-table-column prop="banStart" align="left" label="下班时间"></el-table-column>
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
export default {
  name: "shiftsetup",
  inject: ["reload"],
  data() {
    return {
      formLabelWidth: "130px",
      currentPage: 1,
      currentSelectRow: "",
      pagesize: 10,
      tableData: [],
    };
  },
  created() {
    this.gettabledata();
  },
  methods: {
    //轮播图表格数据
    gettabledata() {
      let _this = this;
      requestLogin("/setBannerInfo", {}, "get")
        .then(res => {
          _this.tableData = res;
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
<style lang="scss" scoped>
.practice-list {
  width: 97%;
  height: 100%;
  margin: 0px auto;
  background: #fff;
  display: inline-block;
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