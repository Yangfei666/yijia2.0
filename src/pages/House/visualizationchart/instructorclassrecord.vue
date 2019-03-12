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
                  <el-date-picker v-model="value4" type="month" format="yyyy-MM" value-format="yyyy-MM" @change="change1" placeholder="选择月" style="width:150px" :clearable='false'></el-date-picker>
                  <!-- <el-date-picker v-model="value5" type="year" format="yyyy" value-format="yyyy" @change="change2" placeholder="选择年" style="width:150px"></el-date-picker> -->
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
                  <el-table-column prop="curriculum_subject.kcName" align="left" label="课程名称" fixed></el-table-column>
                  <el-table-column prop="Stime" align="left" label="开始时间"></el-table-column>
                  <el-table-column prop="Etime" align="left" label="结束时间"></el-table-column>
                  <el-table-column prop="kcIsPrivate" align="left" label="课程分类"></el-table-column>
                  <el-table-column prop="staff_info.YGXX_NAME" align="left" label="教练"></el-table-column>
                  <el-table-column prop="group_curriculum_appointment_count" align="left" label="上课人数"></el-table-column>
                  <el-table-column prop="hand" align="left" label="手牌"></el-table-column>
                  <el-table-column prop="kcStime" align="left" label="开课日期" fixed="right"></el-table-column>
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
                <el-table v-loading="loading" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="coachData.privateList.slice((currentPage2-1)*pagesize2,currentPage2*pagesize2)" style="width: 100%" @row-click="rowClick">
                  <el-table-column width="20px"></el-table-column>
                  <el-table-column prop="private_curriculum_appointment.isExperience" align="left" label="客户类型"></el-table-column>
                  <el-table-column prop="private_curriculum_appointment.member_customers.HYName" align="left" label="客户姓名">
                    <template slot-scope="scope">
                      <span v-if="scope.row.private_curriculum_appointment.isExperience == '会员客户'">{{scope.row.private_curriculum_appointment.member_customers.HYName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="private_curriculum_appointment.membership_card.card_type.CTName" align="left" label="上课卡种">
                    <template slot-scope="scope">
                      <span v-if="scope.row.private_curriculum_appointment.isExperience == '会员客户'">{{scope.row.private_curriculum_appointment.membership_card.card_type.CTName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Stime" align="left" label="开始时间"></el-table-column>
                  <el-table-column prop="Etime" align="left" label="结束时间"></el-table-column>
                  <el-table-column prop="kcIsPrivate" align="left" label="课程分类"></el-table-column>
                  <el-table-column prop="staff_info.YGXX_NAME" align="left" label="教练"></el-table-column>
                  <el-table-column prop="hand" align="left" label="手牌"></el-table-column>
                  <el-table-column prop="kcStime" align="left" label="开课日期"></el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize2" layout="total, sizes, prev, pager, next, jumper" :total="coachData.privateList.length">
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
import moment from "moment";
export default {
  name: "instructorclassrecord",
  data() {
    return {
      form: {
        region: ""
      },
      activeName: "tuanke",
      value1: "",
      value4: moment(new Date()).format("YYYY-MM"),
      value5: "2018",
      loading: false,
      Coach: [],
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      currentPage2: 1,
      pagesize2: 10,
      jskey: "",
      Coachclass: [], //全部数据
      coachData: [] //当前选中的教练数据
    };
  },
  mounted() {
    setTimeout(() => {
      this.getstaffdate();
    }, 500);
    this.value4 = this.getCurrentDateTime();
  },
  methods: {
    getCurrentDateTime() {
      return moment(new Date()).format("YYYY-MM");
    },
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
          if (_this.jskey != "") {
            for (var i = 0; i < _this.Coach.length; i++) {
              if (_this.jskey == Coach[i]) {
                num = i;
              }
            }
          }
          // 默认第一个教练的上课记录
          _this.getCoachData(num);
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
      let year = this.value4.split("-")[0];
      if (year !== this.value5) {
        this.value5 = year;
      }
      this.getstaffdate();
    },
    change2(val) {
      let year = this.value4.split("-")[0];
      let month = this.value4.split("-")[1];
      if (year !== this.value5) {
        this.value4 = `${this.value5}-${month}`;
      }
      this.getstaffdate();
    },
    Selectchange3(val) {
      this.jskey = val;
      let num = 0;
      if (this.jskey != "") {
        for (var i = 0; i < this.Coach.length; i++) {
          if (this.jskey == this.Coach[i]) {
            num = i;
          }
        }
      }
      this.getCoachData(num);
    },
    rowClick(row, event, column) {
      this.currentSelectRow = row;
    },
    handleClick(tab, event) {},
    getCurrentRow(val) {},
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange2(size) {
      this.pagesize2 = size;
    },
    handleCurrentChange2(currentPage2) {
      this.currentPage2 = currentPage2;
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
      width: 66%;
      position: absolute;
      right: 2%;
      z-index: 2;
      top: 0px;
      .block2 {
        height: 32px;
        line-height: 32px;
        height: 50px;
        line-height: 37px;
        float: right;
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
@media screen and (min-width: 768px) and (max-width: 992px) {
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
        width: 67% !important;
        position: absolute;
        right: 2% !important;
        z-index: 2;
        top: 0px;
        .block2 {
          height: 32px;
          line-height: 32px;
          height: 50px;
          line-height: 37px;
          float: right;
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
        .el-select {
          width: 154px !important;
        }
        .el-date-editor {
          width: 120px !important;
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
}
@media screen and (min-width: 992px) and (max-width: 1280px) {
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
        width: 67% !important;
        position: absolute;
        right: 2% !important;
        z-index: 2;
        top: 0px;
        .block2 {
          height: 32px;
          line-height: 32px;
          height: 50px;
          line-height: 37px;
          float: right;
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
        .el-select {
          width: 200px !important;
        }
        .el-date-editor {
          width: 130px !important;
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
}
@media screen and (min-width: 1280px) and (max-width: 1440px) {
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
        width: 67% !important;
        position: absolute;
        right: 2% !important;
        z-index: 2;
        top: 0px;
        .block2 {
          height: 32px;
          line-height: 32px;
          height: 50px;
          line-height: 37px;
          float: right;
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
        .el-select {
          width: 240px !important;
        }
        .el-date-editor {
          width: 150px !important;
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
}
@media screen and (min-width: 1440px) and (max-width: 1680px) {
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
        width: 67% !important;
        position: absolute;
        right: 2% !important;
        z-index: 2;
        top: 0px;
        .block2 {
          height: 32px;
          line-height: 32px;
          height: 50px;
          line-height: 37px;
          float: right;
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
        .el-select {
          width: 250px !important;
        }
        .el-date-editor {
          width: 150px !important;
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
}
@media screen and (min-width: 1680px) and (max-width: 1920px) {
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
        width: 67% !important;
        position: absolute;
        right: 2% !important;
        z-index: 2;
        top: 0px;
        .block2 {
          height: 32px;
          line-height: 32px;
          height: 50px;
          line-height: 37px;
          float: right;
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
        .el-select {
          width: 260px !important;
        }
        .el-date-editor {
          width: 160px !important;
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
}
@media screen and (min-width: 1920px) and (max-width: 2048px) {
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
        width: 67% !important;
        position: absolute;
        right: 2% !important;
        z-index: 2;
        top: 0px;
        .block2 {
          height: 32px;
          line-height: 32px;
          height: 50px;
          line-height: 37px;
          float: right;
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
        .el-select {
          width: 280px !important;
        }
        .el-date-editor {
          width: 180px !important;
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
}
</style>