<template>
    <div>
        <!--消费记录-->
        <div class="health">
            <el-col :span="24" class="infor-head">
                <div class="infor-title">
                    <span>消费记录</span>
                </div>
                <div class="infor-but" @click="goback">
                        <el-button class="goback el-icon-arrow-left">返回</el-button>
                    </div>
            </el-col>
            <el-col :span="24" class="infor-dd">
                <span>姓名：<span>{{this.name}}</span></span>
                <span style="padding-left:30px">电话：<span>{{this.tel}}</span></span>
            </el-col>
            <el-col :span="24">
            <div class="practice-table">
              <el-row>
                <el-col :span="24">
                    <el-table fixed highlight-current-row :header-cell-style="{background:'#fafafa'}" @row-click="rowClick" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                        <el-table-column prop="name" align="center" label="商品名称" width="160px"></el-table-column>
                        <el-table-column prop="num" align="center" label="商品数量"></el-table-column>
                        <el-table-column prop="price" align="center" label="商品单价"></el-table-column>
                        <el-table-column prop="totalPrice" align="center" label="商品总价"></el-table-column>
                        <el-table-column prop="createTime" align="center" label="创建时间" width="180px"></el-table-column>
                        <el-table-column prop="salesman" align="center" label="销售人员"></el-table-column>
                        <el-table-column prop="operator" align="center" label="操作人员" fixed="right"></el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                        </el-pagination>
                    </div>
                </el-col>
              </el-row>
            </div>
            </el-col>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name:'consume',
  inject: ["reload"],
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      tableData: [],
      id:this.$route.query.id,
      name:this.$route.query.name,
      tel:this.$route.query.tel,
      customercategory:this.$route.query.customercategory
    };
  },
  created () {
      this.getTableData();
  },
  methods: {
    //获取表格页面
    getTableData() {
      let _this = this;
      requestLogin("/CustomerFollowUp/customerRecord/"+this.customercategory+'/'+_this.$route.query.id, {}, "get")
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
    goback(){
      this.$router.go(-1)
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
    },
  }
};
</script>
<style lang="scss" scoped>
.health {
  width: 97%;
  height: 100%;
  display: inline-block;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .infor-head {
    height: 50px;
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    border-bottom: 1px solid #e8e8e8;
    .infor-but {
      padding-right: 10px;
      font-size: 16px;
      color: #262626;
      .goback{
        color: #262626;
        font-size: 16px;
        background: #fff;
        border: none;
      }
      .goback:hover{
        color: #00bc71;
      }
    }
    .infor-title {
      padding-left: 15px;
      font-size: 16px;
      color: #262626;
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
  .infor-dd{
    height: 50px;
    line-height: 50px;
    text-align: left;
    padding-left:25px;
    font-size: 16px;
    color: #262626;
  }
  .practice-table {
    width: 100%;
    height: 100%;
    margin: 1% auto;
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