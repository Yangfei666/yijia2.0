<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="practice-main">
                    <el-col :span="23" class="breadcrumb">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                            <el-breadcrumb-item>出入库记录</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="23" class="weber">
                        <span class="weber-span">出入库记录</span>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <div class="practice-list">
            <div class="practice-center">
                <el-row>
                    <el-col :span="24">
                        <div class="class-form">
                            <el-form ref="form" :model="formInline" class="demo-form-inline" label-width="80px" @submit.native.prevent>
                                <div class="from-class">
                                    <el-form-item label="名称:" style="text-align:center">
                                        <el-col :span="24">
                                            <el-autocomplete v-model.trim="formInline.name" :trigger-on-focus="false" placeholder="请输入" clearable style="width:230px;" :fetch-suggestions="querySearchAsync" @select="handleSelect"></el-autocomplete>
                                        </el-col>
                                    </el-form-item>
                                </div>
                                <div class="from-class">
                                    <el-form-item label="日期:" style="text-align:center">
                                        <el-col :span="24">
                                          <el-date-picker v-model="formInline.date" format="yyyy-MM-dd" :clearable="false" value-format="yyyy-MM-dd" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:300px"></el-date-picker>
                                        </el-col>
                                    </el-form-item>
                                </div>
                                <div class="from-class">
                                    <el-form-item label-width="40px">
                                        <el-button type="primary" @click="seachshai">查询</el-button>
                                        <el-button @click="resetForm">重置</el-button>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="practice-table">
                <el-row>
                    <el-col :span="24">
                        <el-table ref="singleTable" @current-change="handleCurrentChange2" fixed highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
                            <el-table-column prop="name" align="center" label="图片">
                                <template slot-scope="scope">
                                <el-tooltip content="点击图片可放大" placement="top">
                                    <img :src="scope.row.urlPic" style="width: 50px;height:50px;border-radius:50%;" @click="handleFileEnlarge(scope.row.urlPic)">
                                </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" align="center" label="名称"></el-table-column>
                            <el-table-column prop="createTime" align="center" label="日期"></el-table-column>
                            <el-table-column prop="status" align="center" label="状态"></el-table-column>
                            <el-table-column prop="num" align="center" label="数量"></el-table-column>
                            <el-table-column prop="reason" align="center" label="原因"></el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>
                <template>
                <!--放大图片-->
                <el-dialog title="" :visible.sync="isEnlargeImage" :show-close='false' :modal-append-to-body="false">
                    <img @click="isEnlargeImage = false" style="width:50%;" :src="enlargeImage">
                </el-dialog>
               </template>
            </div>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
export default {
  inject: ["reload"],
  name: "receiptrecord",
  data() {
    return {
      radio: true,
      currentPage: 1,
      pagesize: 10,
      tableData: [],
      tableData2:[],
      isEnlargeImage: false, //放大图片
      enlargeImage: "", //放大图片地址
      formInline: {
        name: "",
        date: "",
      },
    };
  },
  watch: {
    name(val) {
      if (!val) {
        this.tableData = this.tableData2;
      }
    },
    date(val) {
      if (!val) {
        this.tableData = this.tableData2;
      }
    }
  },
  created: function() {
    this.getclassroom();
  },
  methods: {
    //获取表格数据
    getclassroom() {
      let _this = this;
      requestLogin("/setGoodsList/goodsStorageList", {}, "get")
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
    seachshai(){
      let _this = this;
      let params = {
        name:this.formInline.name,
        startDate:this.formInline.date[0],
        endDate:this.formInline.date[1]
      }
      requestLogin("/setGoodsList/searchStorageList", params, "post")
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
    async searchClub(name) {
        this.clubLists = await requestLogin(`/setGoodsList/searchGoodsListBynName`, {name: name}, 'post')
        return this.clubLists
      },
     async querySearchAsync(queryString, cb) {
        var clubLists = await this.searchClub(this.formInline.name);
        var results = queryString ? clubLists.filter(this.createStateFilter(queryString)) : clubLists;
        results = results.map(item => ({...item, value: item.name}))
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 100);
      },
      handleSelect(item) {},
     createStateFilter(queryString) {
        return (state) => {
          return state.name
        };
      },
    //放大图片
    handleFileEnlarge(_url) {
      if (_url) {
        this.enlargeImage = _url;
        this.isEnlargeImage = !this.isEnlargeImage;
      }
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    cahngesen(val) {
    },
    //重置
    resetForm() {
      this.formInline.name = "";
      this.formInline.date = "";
    },
    rowClick(row, event, column) {
      this.radio = row.index;
      //获取表格数据
      this.currentSelectRow = row;
      this.radio = this.tableData.indexOf(row);
    },
    handleCurrentChange2(val, index) {
      this.currentRow = val;
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
  }
}
.practice-list {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .practice-center {
    height: 80px;
    .class-form {
      height: 100%;
      overflow: hidden;
      margin-top: 18px;
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
@media screen and (min-width: 768px)and (max-width: 992px){
  .practice-center {
    height: 80px;
    .class-form {
      height: 100%;
      overflow: hidden;
      margin-top: 18px;
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
        .el-autocomplete{
          width: 160px !important;
        }
        .el-range-editor{
          width: 210px !important;
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
  }
}
@media screen and (min-width: 992px)and (max-width: 1280px){
  .practice-center {
    height: 80px;
    .class-form {
      height: 100%;
      overflow: hidden;
      margin-top: 18px;
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
        .el-autocomplete{
          width: 175px !important;
        }
        .el-range-editor{
          width: 235px !important;
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
  }
}
@media screen and (min-width: 1280px)and (max-width: 1440px){
  .practice-center {
    height: 80px;
    .class-form {
      height: 100%;
      overflow: hidden;
      margin-top: 18px;
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
        .el-autocomplete{
          width: 180px !important;
        }
        .el-range-editor{
          width: 235px !important;
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
  }
}
@media screen and (min-width: 1440px)and (max-width: 1680px){
  .practice-center {
    height: 80px;
    .class-form {
      height: 100%;
      overflow: hidden;
      margin-top: 18px;
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
        .el-autocomplete{
          width: 210px !important;
        }
        .el-range-editor{
          width: 245px !important;
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
  }
}
@media screen and (min-width: 1680px)and (max-width: 1920px){
  .practice-center {
    height: 80px;
    .class-form {
      height: 100%;
      overflow: hidden;
      margin-top: 18px;
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
        .el-autocomplete{
          width: 240px !important;
        }
        .el-range-editor{
          width: 280px !important;
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
  }
}
@media screen and (min-width: 1920px)and (max-width: 2048px){
  .practice-center {
    height: 80px;
    .class-form {
      height: 100%;
      overflow: hidden;
      margin-top: 18px;
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
        .el-autocomplete{
          width: 250px !important;
        }
        .el-range-editor{
          width: 290px !important;
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
  }
}
</style>