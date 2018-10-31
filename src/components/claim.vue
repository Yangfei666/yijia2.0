<template>
    <div>
        <!--认领-->
        <div class="health">
            <el-col :span="24" class="infor-head">
                    <div class="infor-but" @click="goback">
                        <el-button type="text" class="goback el-icon-arrow-left">返回</el-button>
                    </div>
                <div class="infor-title">
                    <span>认领</span>
                </div>
            </el-col>
            <el-col :span="24" class="infor-dd">
                <span>姓名：<span>{{this.$route.query.prName}}</span></span>
                <span style="padding-left:30px">电话：<span>{{this.$route.query.prTel}}</span></span>
            </el-col>
            <el-col :span="24">
            <div class="practice-table">
              <el-row>
            <el-col :span="24">
                <el-table fixed v-loading="loading" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" @row-click="rowClick" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                    <el-table-column prop="htName" align="left" label="姓名"></el-table-column>
                    <el-table-column prop="htTel" align="left" label="电话"></el-table-column>
                    <el-table-column prop="htSex" align="left" label="性别"></el-table-column>
                    <el-table-column prop="htBirthday" align="left" label="出生日期"></el-table-column>
                    <el-table-column prop="htHeight" align="left" label="身高"></el-table-column>
                    <el-table-column prop="htWeight" align="left" label="体重"></el-table-column>
                    <el-table-column align="left" label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="claim(scope.row)">认领</el-button>
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
            </el-col>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name:'claim',
  inject: ["reload"],
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      tableData: [],
      loading:true,
    };
  },
    mounted: function() {
    //表格列表数据
    let _this = this;
    _this.loading = true;
    requestLogin("/CustomerFollowUp/getWaitReceiveData", {}, "get")
      .then(function(res) {
         _this.loading = false;
        let {health} = res;
        _this.tableData = health;
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
  methods: {
    goback(){
      this.$router.go(-1)
    },
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
    },
      claim(row) {
        console.log(row);
        this.$confirm("确认要认领吗？", "提示").then(() => {
            var loginParams = {
              identity:'potential', //客户类别
              howMuch:1, //数据类型
              num:this.currentSelectRow.id, //数据id
              id:this.currentSelectRow.id, //客户id
            };
            requestLogin("/CustomerFollowUp/confirmReceive", loginParams, "post")
              .then(data => {
                this.$message({
                  message: "认领成功",
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
    line-height: 50px;
    border-bottom: 1px solid #e8e8e8;
    .infor-but {
      padding-left: 10px;
      font-size: 16px;
      color: #262626;
      .goback{
        color: #262626;
        font-size: 16px;
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
    width: 98%;
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