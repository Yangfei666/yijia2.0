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
                        <el-select v-if="Coach.length > 0" v-model="form.train" :placeholder="Coach[0]" style="width:230px" @change="Selectchange3">
                          <el-option v-for="item in Coach" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-form>
              </div>
              <div class="block2">
                <el-col :span="24">
                  <el-date-picker v-model="value4" type="month" value-format="yyyy-MM" @change="change1" placeholder="选择月" style="width:150px"></el-date-picker>
                  <el-date-picker v-model="value5" type="year" value-format="yyyy" @change="change1" placeholder="选择年" style="width:150px"></el-date-picker>
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
              <el-col :span="24" v-if="coachData.groupList !=null">
                <el-table v-loading="loading" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="coachData.groupList.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
                  <el-table-column width="20px" fixed></el-table-column>
                  <el-table-column prop="kcName" align="left" label="课程名称" width="240px" fixed></el-table-column>
                  <el-table-column prop="Stime" align="left" label="开始时间" width="240px"></el-table-column>
                  <el-table-column prop="Etime" align="left" label="结束时间" width="240px"></el-table-column>
                  <el-table-column prop="kcIsPrivate" align="left" label="课程分类" width="240px" :formatter="formatkcIs"></el-table-column>
                  <el-table-column prop="YGXX_NAME" align="left" label="会籍顾问" width="240px"></el-table-column>
                  <el-table-column prop="kcPerson" align="left" label="上课人数" width="240px"></el-table-column>
                  <el-table-column prop="kcStime" align="left" label="开课日期" width="240px" fixed="right"></el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="coachData.groupList.length">
                  </el-pagination>
                </div>
              </el-col>
            </template>
          </el-tab-pane>
          <el-tab-pane label="私教" name="sijiao">
            <template>
              <el-col :span="24" v-if="coachData.privateList != null">
                <el-table v-loading="loading" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="coachData.privateList.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
                  <el-table-column width="20px" fixed></el-table-column>
                  <el-table-column prop="Stime" align="left" label="开始时间" width="260px" fixed></el-table-column>
                  <el-table-column prop="Etime" align="left" label="结束时间" width="260px"></el-table-column>
                  <el-table-column prop="kcIsPrivate" align="left" label="课程分类" width="260px" :formatter="formatkcIs"></el-table-column>
                  <el-table-column prop="YGXX_NAME" align="left" label="会籍顾问" width="260px"></el-table-column>
                  <el-table-column prop="kcPerson" align="left" label="上课人数" width="260px"></el-table-column>
                  <el-table-column prop="kcStime" align="left" label="开课日期" width="260px" fixed="right"></el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="coachData.privateList.length">
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
      value4: "2018-06",
      value5: "2018",
      loading: false,
      Coach: [],
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      jskey: "",
      Coachclass: [], //全部数据
      coachData: [] //当前选中的教练数据
    };
  },
  mounted() {
    setTimeout(() => {
      this.getstaffdate();
    }, 500);
  },
  methods: {
    //课程分类
    formatkcIs(row, column, cellValue) {
      if (cellValue === 1) {
        return "私教";
      } else if (cellValue === 0) {
        return "团课";
      }
    },
    // 根据数组下标获取单个教练的课程数据
    getCoachData(num) {
      this.coachData = this.Coachclass[num];
    },
    //教练上课记录
    getstaffdate() {
      let _this = this;
      requestLogin("/chart/getCoachData/" + _this.value4, {}, "get")
        .then(function(res) {
          let Coachclass = Object.values(res.data);
          let Coach = Object.keys(res.data);
          _this.Coach = Object.keys(res.data);
          _this.Coachclass = Object.values(res.data);
          let num = 0; 
          console.log('this.jskey:'+_this.jskey);
          if (_this.jskey != "") {
            for (var i = 0; i < _this.Coach.length; i++) {
              if (_this.jskey == Coach[i]) {
                num = i;
              }
            }
          }
          // 默认第一个教练的上课记录
          _this.getCoachData(num);
          console.log(Coachclass, Coach);
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
    change1(val) {
      console.log(val);
    },
    //下拉change
    Selectchange3(val) {
      this.jskey = val;
      this.getstaffdate();
      console.log(val);
    },
    rowClick(row, event, column) {
      this.currentSelectRow = row;
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
        padding-left: 29%;
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
  height: 100%;
  display: inline-block;
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