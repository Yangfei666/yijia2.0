<template>
    <!--体验消费记录-->
    <div class="memberhome">
        <el-col :span="24">
            <div class="class-main">
                <div class="infor-but" v-on:click="back">
                    <el-button class="goback el-icon-arrow-left">返回</el-button>
                </div>
            <el-col :span="24">
                <div class="practice-table">
                    <div class="table-tuan">
                        <el-table  @row-click="rowClick" highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                            <el-table-column prop="name" align="center" label="商品名称" width="160px"></el-table-column>
                            <el-table-column prop="num" align="center" label="商品数量"></el-table-column>
                            <el-table-column prop="price" align="center" label="商品单价"></el-table-column>
                            <el-table-column prop="totalPrice" align="center" label="商品总价"></el-table-column>
                            <el-table-column prop="createTime" align="center" label="创建时间" width="180px"></el-table-column>
                            <el-table-column prop="salesman" align="center" label="销售人员"></el-table-column>
                            <el-table-column prop="operator" align="center" label="操作人员" fixed="right"></el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-col>
            </div>
        </el-col>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "memberconsume",
  inject: ["reload"],
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      tablelength: 0,
      tableData: [],
    };
  },
  created() {
    this.getTableData();
    setTimeout(() => {
      this.getexperhome();
    }, 1500);
  },
  methods: {
    //获取体验券详情
    getexperhome() {
      let _this = this;
      requestLogin("/setExperienceCustomer/" + _this.$route.params.id, {}, "get")
        .then(function(res) {
          var customer_voucher = [];
          customer_voucher = res.customer_voucher;
          for (var i = 0; i < customer_voucher.length; i++) {
            var xialaobj = { key: "", name: "" };
            xialaobj.key = customer_voucher[i].id;
            xialaobj.name = customer_voucher[i].experience_voucher.tkName;
            // _this.header.push(xialaobj);
          }
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
    //获取表格页面
    getTableData() {
      let _this = this;
      requestLogin("/CustomerFollowUp/customerRecord/experience/"+_this.$route.params.id, {}, "get")
        .then(function(res) {
          _this.tableData = res;
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
    rowClick(row, event, column) {
        this.currentSelectRow = row;
    },
    handleClick(tab, event) {},
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    back() {
      this.$router.push({
        name: "Experhome",
        params: {
          id: this.$route.params.id,
          exName: this.$route.params.exName,
          exHjgwName: this.$route.params.exHjgwName,
          exTel: this.$route.params.exTel,
          exSex: this.$route.params.exSex,
          exWeChat:this.$route.params.exWeChat,
          exHjgwId:this.$route.params.exHjgwId
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/classcard.scss";
.memberhome {
  width: 97%;
  height: 100%;
  display: inline-block;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .class-main {
    height: 100%;
    position: relative;
    .infor-but {
      position: absolute;
      top: 0px;
      z-index: 2;
      color: #262626;
      right: 1%;
      .goback {
        font-size: 16px;
        border: none;
        background: #fff;
      }
    }
    .infor-but:hover {
      color: #00bc71;
    }
    .class-form {
      height: 100%;
      overflow: hidden;
      .from-class {
        height: 50px;
        float: left;
        .el-button--primary {
          height: 35px;
          line-height: 1px;
        }
        .el-button + .el-button {
          height: 35px;
          line-height: 1px;
        }
      }
      .from-class2 {
        .el-button--primary {
          height: 35px;
          line-height: 1px;
        }
        .el-button + .el-button {
          height: 35px;
          line-height: 1px;
        }
      }
    }
    .practice-table {
      margin-top: 38px;
      .table-tuan {
        width: 100%;
        margin: 0 auto;
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
  }
}
</style>
