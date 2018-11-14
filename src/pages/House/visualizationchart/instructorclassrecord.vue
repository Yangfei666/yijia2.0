<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="practice-main">
                    <el-col :span="23" class="breadcrumb">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>会所管理</el-breadcrumb-item>
                            <el-breadcrumb-item>可视化数表</el-breadcrumb-item>
                            <el-breadcrumb-item>教练上课记录</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="practice-head">
                    <el-col :span="24" class="weber">
                        <span class="weber-span">教练上课记录</span>
                        <div class="main-right">
                            <div class="block3">
                                <el-form ref="form" :model="form" label-width="85px">
                                    <el-col :span="20" style="height:50px">
                                        <el-form-item label="教练姓名:">
                                            <el-col :span="24">
                                                <el-select v-model="form.train" placeholder="请选择" style="width:100%" @change="Selectchange3">
                                                    <el-option v-for="item in coach" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                                                </el-select>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" style="height:50px">
                                        <el-form-item label-width="3px">
                                            <el-col :span="24">
                                                <el-button type="primary" @click="onSubmit">查询</el-button>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </div>
                            <div class="block2">
                                <el-col :span="24">
                                    <el-date-picker v-model="value4" type="month" placeholder="选择月" style="width:150px"></el-date-picker>
                                    <el-date-picker v-model="value5" type="year" placeholder="选择年" style="width:150px"></el-date-picker>
                                </el-col>
                            </div>
                        </div>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <el-col :span="24">
            <div class="staff-main">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="团课" name="tuanke">
                        <template>
                            <el-col :span="24">
                                <el-table v-loading="loading" @current-change="handleCurrentChange2" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
                                    <el-table-column align="center" prop="radio" fixed width="70px">
                                        <template slot-scope="scope">
                                            <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name" align="left" label="开始时间"  width="180px"></el-table-column>
                                    <el-table-column prop="name" align="left" label="结束时间"  width="180px"></el-table-column>
                                    <el-table-column prop="name" align="left" label="会籍顾问"  width="180px"></el-table-column>
                                    <el-table-column prop="name" align="left" label="分类"  width="180px"></el-table-column>
                                    <el-table-column prop="name" align="left" label="课程名称"  width="180px"></el-table-column>
                                    <el-table-column prop="name" align="left" label="上课人数"  width="180px"></el-table-column>
                                    <el-table-column prop="name" align="left" label="开课日期"  width="180px" fixed="right"></el-table-column>
                                </el-table>
                                <div class="block">
                                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                                    </el-pagination>
                                </div>
                            </el-col>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="私教" name="sijiao">
                        <template>
                            <el-col :span="24">
                                <el-table v-loading="loading" @current-change="handleCurrentChange2" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
                                    <el-table-column align="center" prop="radio" fixed width="70px">
                                        <template slot-scope="scope">
                                            <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name" align="left" label="开始时间"  width="180px"></el-table-column>
                                    <el-table-column prop="name" align="left" label="结束时间"  width="180px"></el-table-column>
                                    <el-table-column prop="name" align="left" label="会籍顾问"  width="180px"></el-table-column>
                                    <el-table-column prop="name" align="left" label="分类"  width="180px"></el-table-column>
                                    <el-table-column prop="name" align="left" label="课程名称"  width="180px"></el-table-column>
                                    <el-table-column prop="name" align="left" label="上课人数"  width="180px"></el-table-column>
                                    <el-table-column prop="name" align="left" label="开课日期"  width="180px" fixed="right"></el-table-column>
                                </el-table>
                                <div class="block">
                                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                                    </el-pagination>
                                </div>
                            </el-col>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "instructorclassrecord",
  data() {
    return {
      form: {
        region: ""
      },
      activeName: "tuanke",
      value1: "",
      value4: "",
      value5: "",
      radio: true,
      loading: false,
      coach: [],
      tableData: [{ name: "chm" }],
      currentPage: 1,
      pagesize: 10
    };
  },
  mounted() {
      this.getstaffdate();
    setTimeout(() => {
      this.rolegourp();
    }, 1000);
  },
  methods: {
    //教练上课记录
    getstaffdate() {
      let _this = this;
      requestLogin("/chart/getCoachData/2018-06", {}, "get")
        .then(function(res) {
        //   _this.tableData = coach;
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
    //教练
    rolegourp() {
      let _this = this;
      requestLogin("/getCurTableBaseInfo", {}, "post")
        .then(function(res) {
          let { coach } = res;
          _this.coach = coach;
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
    Selectchange3(val) {
      console.log(val);
    },
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    rowClick(row, event, column) {
      this.radio = row.index;
      this.currentSelectRow = row;
      this.radio = this.tableData.indexOf(row);
    },
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(event.target.getAttribute("id"));
    },
    getCurrentRow(val) {
      console.log(val);
    },
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="scss" scoped>
.practice-main {
  height: 60px;
  background: #fff;
  border-top: 1px solid #ebebeb;
  .breadcrumb {
    margin: 23px 20px auto;
  }
}
.practice-head {
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  .weber {
    position: relative;
    display: flex;
    height: 50px;
    line-height: 45px;
    .weber-span {
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      font-family: PingFang-SC-Regular;
      text-indent: 20px;
    }
    .main-right {
      width: 75%;
      position: absolute;
      right: 0px;
      z-index: 2;
      top: 0px;
      .block2 {
        height: 32px;
        line-height: 32px;
        height: 50px;
        line-height: 37px;
        display: flex;
        justify-content: flex-end;
        padding-left: 22%;
        .dsd {
          line-height: 34px;
          text-align: right;
        }
        .block1 {
          line-height: 38px;
        }
        .el-radio-button__inner {
          color: #fff;
          background-color: #00bc71;
          border-color: #00bc71;
          -webkit-box-shadow: -1px 0 0 0 #00bc71;
          box-shadow: -1px 0 0 0 #00bc71;
        }
      }
      .block3 {
        height: 50px;
        line-height: 50px;
        display: flex;
        float: left;
        .el-button--primary {
          height: 35px;
          line-height: 8px;
        }
      }
    }
  }
}
.staff-main {
  width: 97%;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  height: 450px;
  margin: 20px auto;
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