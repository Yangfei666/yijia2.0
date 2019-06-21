<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>客户管理</el-breadcrumb-item>
              <el-breadcrumb-item>客户邀约</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">客户邀约</span>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <div class="cardopen">
      <el-row>
        <el-col :span="24">
             <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="待邀约客户" name="first">
                    <template>
                        <div class="cardopen-table">
                        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border @row-click="rowClick" :default-sort="{order: 'descending'}" highlight-current-row :header-cell-style="{background:'#fafafa'}" style="width: 100%">
                        <el-table-column prop="HYName" align="center" label="姓名" fixed></el-table-column>
                        <el-table-column prop="HYName" align="center" label="联系方式"></el-table-column>
                        <el-table-column prop="HYName" align="center" label="客户类型"></el-table-column>
                        <el-table-column prop="HYName" align="center" label="登记日期" sortable></el-table-column>
                        <el-table-column prop="HYName" align="center" label="上次跟进时间" sortable></el-table-column>
                        <el-table-column prop="HYName" align="center" label="备注"></el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                        </el-pagination>
                    </div>
                    </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="我的邀约" name="second">
                    <template>
                        <div class="cardopen-table">
                        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border @row-click="rowClick" :default-sort="{order: 'descending'}" highlight-current-row :header-cell-style="{background:'#fafafa'}" style="width: 100%">
                        <el-table-column prop="HYName" align="center" label="姓名" fixed></el-table-column>
                        <el-table-column prop="HYName" align="center" label="联系方式"></el-table-column>
                        <el-table-column prop="HYName" align="center" label="客户类型"></el-table-column>
                        <el-table-column prop="HYName" align="center" label="登记日期" width="160" sortable></el-table-column>
                        <el-table-column prop="HYName" align="center" label="上次跟进时间" width="200" sortable></el-table-column>
                        <el-table-column prop="HYName" align="center" label="邀约到店日期" width="160" sortable></el-table-column>
                        <el-table-column prop="HYName" align="center" label="邀约内容"></el-table-column>
                        <el-table-column prop="HYName" align="center" label="邀约人"></el-table-column>
                        <el-table-column prop="HYName" align="center" label="操作"></el-table-column>
                        <el-table-column prop="HYName" align="center" label="特殊情况备注" width="200"></el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                        </el-pagination>
                    </div>
                    </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="全店邀约" name="third">
                    <template>
                        <div class="cardopen-table">
                        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border @row-click="rowClick" :default-sort="{order: 'descending'}" highlight-current-row :header-cell-style="{background:'#fafafa'}" style="width: 100%">
                        <el-table-column prop="HYName" align="center" label="姓名" fixed></el-table-column>
                        <el-table-column prop="HYName" align="center" label="联系方式"></el-table-column>
                        <el-table-column prop="HYName" align="center" label="客户类型"></el-table-column>
                        <el-table-column prop="HYName" align="center" label="登记日期" width="160" sortable></el-table-column>
                        <el-table-column prop="HYName" align="center" label="上次跟进时间" width="200" sortable></el-table-column>
                        <el-table-column prop="HYName" align="center" label="邀约到店日期" width="160" sortable></el-table-column>
                        <el-table-column prop="HYName" align="center" label="邀约内容"></el-table-column>
                        <el-table-column prop="HYName" align="center" label="邀约人"></el-table-column>
                        <el-table-column prop="HYName" align="center" label="操作"></el-table-column>
                        <el-table-column prop="HYName" align="center" label="特殊情况备注" width="200"></el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                        </el-pagination>
                    </div>
                    </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "customerinvitation",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      activeName: 'first',
    };
  },
  created: function() {
    this.getTableData();
  },
  methods: {
    //获取表格数据
    getTableData() {
      let _this = this;
      requestLogin("/setMemberCustomers/selectCardReviewData/1", {}, "get")
        .then(function(res) {
          _this.tableData = res;
          _this.tableData2 = res;
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
     handleClick(tab, event) {
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
  .cardopen-table{
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
// @media screen and (min-width: 768px)and (max-width: 992px){
//   .search {
//       width: 30% !important;
//       border: 1px solid #e8e8e8;
//       height: 30px;
//       display: -webkit-box;
//       display: -ms-flexbox;
//       display: flex;
//       border-radius: 16px;
//       line-height: 30px;
//       margin-right: 15px;
//       .search-input {
//         width: 100%;
//         border-radius: 14px;
//         border: none;
//         text-indent: 10px;
//         color: #8c8c8c;
//         font-size: 14px;
//         opacity: 1;
//       }
//       .search-icon {
//         margin-top: 8px;
//         margin-right: 13px;
//       }
//     }
// }
// @media screen and (min-width: 992px)and (max-width: 1280px){
//   .search {
//       width: 30% !important;
//       border: 1px solid #e8e8e8;
//       height: 30px;
//       display: -webkit-box;
//       display: -ms-flexbox;
//       display: flex;
//       border-radius: 16px;
//       line-height: 30px;
//       margin-right: 15px;
//       .search-input {
//         width: 100%;
//         border-radius: 14px;
//         border: none;
//         text-indent: 10px;
//         color: #8c8c8c;
//         font-size: 14px;
//         opacity: 1;
//       }
//       .search-icon {
//         margin-top: 8px;
//         margin-right: 13px;
//       }
//     }
// }
// @media screen and (min-width: 1280px)and (max-width: 1440px){
//   .search {
//       width: 26% !important;
//       border: 1px solid #e8e8e8;
//       height: 30px;
//       display: -webkit-box;
//       display: -ms-flexbox;
//       display: flex;
//       border-radius: 16px;
//       line-height: 30px;
//       margin-right: 15px;
//       .search-input {
//         width: 100%;
//         border-radius: 14px;
//         border: none;
//         text-indent: 10px;
//         color: #8c8c8c;
//         font-size: 14px;
//         opacity: 1;
//       }
//       .search-icon {
//         margin-top: 8px;
//         margin-right: 13px;
//       }
//     }
// }
// @media screen and (min-width: 1440px)and (max-width: 1680px){
//   .search {
//       width: 26% !important;
//       border: 1px solid #e8e8e8;
//       height: 30px;
//       display: -webkit-box;
//       display: -ms-flexbox;
//       display: flex;
//       border-radius: 16px;
//       line-height: 30px;
//       margin-right: 15px;
//       .search-input {
//         width: 100%;
//         border-radius: 14px;
//         border: none;
//         text-indent: 10px;
//         color: #8c8c8c;
//         font-size: 14px;
//         opacity: 1;
//       }
//       .search-icon {
//         margin-top: 8px;
//         margin-right: 13px;
//       }
//     }
// }
// @media screen and (min-width: 1680px)and (max-width: 1920px){
//   .search {
//       width: 22% !important;
//       border: 1px solid #e8e8e8;
//       height: 30px;
//       display: -webkit-box;
//       display: -ms-flexbox;
//       display: flex;
//       border-radius: 16px;
//       line-height: 30px;
//       margin-right: 15px;
//       .search-input {
//         width: 100%;
//         border-radius: 14px;
//         border: none;
//         text-indent: 10px;
//         color: #8c8c8c;
//         font-size: 14px;
//         opacity: 1;
//       }
//       .search-icon {
//         margin-top: 8px;
//         margin-right: 13px;
//       }
//     }
// }
// @media screen and (min-width: 1920px)and (max-width: 2048px){
//   .search {
//       width: 22% !important;
//       border: 1px solid #e8e8e8;
//       height: 30px;
//       display: -webkit-box;
//       display: -ms-flexbox;
//       display: flex;
//       border-radius: 16px;
//       line-height: 30px;
//       margin-right: 15px;
//       .search-input {
//         width: 100%;
//         border-radius: 14px;
//         border: none;
//         text-indent: 10px;
//         color: #8c8c8c;
//         font-size: 14px;
//         opacity: 1;
//       }
//       .search-icon {
//         margin-top: 8px;
//         margin-right: 13px;
//       }
//     }
// }
</style>
