<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>客户管理</el-breadcrumb-item>
              <el-breadcrumb-item>开卡审核</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">开卡审核</span>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <div class="cardopen">
      <el-row>
        <el-col :span="24">
          <div class="cardopen-head">
            <span class="head-left">待审核客户列表</span>
            <div class="search">
              <input class="search-input" maxlength="18" v-model="searchVal" placeholder="搜索姓名/电话/卡号" />
              <i class="search-icon el-icon-search" @click="search"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" @row-click="rowClick" v-loading="loading" element-loading-text="拼命加载中..." :default-sort="{order: 'descending'}" highlight-current-row :header-cell-style="{background:'#fafafa'}" style="width: 100%">
            <el-table-column prop="HYName" align="left" label="客户姓名" width="120px" fixed></el-table-column>
            <el-table-column prop="MotoTel" align="left" label="手机号" width="140px"></el-table-column>
            <el-table-column prop="CardNO" align="left" label="卡号" width="150px"></el-table-column>
            <el-table-column prop="CTName" align="left" label="卡名称" width="170px"></el-table-column>
            <el-table-column prop="fkTime" align="left" label="发卡时间" sortable width="160px"></el-table-column>
            <el-table-column prop="eTime" align="left" label="到期时间" sortable width="160px"></el-table-column>
            <el-table-column prop="mode" align="left" label="付款方式" width="150px"></el-table-column>
            <el-table-column prop="money" align="left" label="付款金额" sortable width="120px"></el-table-column>
            <el-table-column prop="YGXX_NAME" align="left" label="会籍顾问" width="100px"></el-table-column>
            <el-table-column prop="cz" align="left" label="操作" fixed="right" width="120px">
              <template slot-scope="scope">
                <el-button @click.native.prevent="go(scope.row,1)" type="text" size="small">通过</el-button>
                <el-button @click.native.prevent="go(scope.row,2)" type="text" size="small">不通过</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "cardopenaudit",
  inject: ["reload"],
  data() {
    return {
      loading: false,
      tableData: [],
      searchVal: "",
      tableData2: [],
      currentPage: 1,
      pagesize: 10
    };
  },
  watch: {
    searchVal(val) {
      //姓名电话卡号
      if (!val) {
        this.tableData = this.tableData2;
      }
    }
  },
  created: function() {
    this.getTableData();
  },
  methods: {
    //获取表格数据
    getTableData() {
      let _this = this;
      _this.loading = true;
      requestLogin("/setMemberCustomers/selectCardReviewData/1", {}, "get")
        .then(function(res) {
          _this.loading = false;
          _this.tableData = res;
          _this.tableData2 = res;
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
    search() {
      this.tableData = this.tableData2;
      this.tableData = this.tableData2.filter(
        i =>
          i.HYName.includes(this.searchVal) ||
          i.MotoTel.includes(this.searchVal) ||
          i.CardNO.includes(this.searchVal)
      );
    },
    //是否通过
    go(row, pass) {
      this.$confirm("确认提交吗？", "提示").then(() => {
        var loginParams = {
          id: this.currentSelectRow.id, //会员卡id
          num: pass //是否通过
        };
        requestLogin("/setMemberCustomers/doCardReview", loginParams, "post")
          .then(data => {
            this.$message({
              message: "提交成功",
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
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    rowClick(row, event, column) {
      //获取表格数据
      this.currentSelectRow = row;
    }
  }
};
</script>
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
  }
}
.cardopen {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .cardopen-head {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-left: 2px solid #00bc71;
    padding-left: 10px;
    margin: 10px auto;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    .head-left {
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      .head-right {
        padding-left: 10px;
        font-size: 14px;
        color: #262626;
      }
    }
    .search {
      width: 22%;
      border: 1px solid #e8e8e8;
      height: 30px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-radius: 16px;
      line-height: 30px;
      margin-right: 15px;
      .search-input {
        width: 100%;
        border-radius: 14px;
        border: none;
        text-indent: 10px;
        color: #8c8c8c;
        font-size: 14px;
        opacity: 1;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
    }
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
</style>
