<template>
    <!--会员上课记录-->
    <div class="memberhome">
        <el-col :span="24">
            <div class="class-main">
                <div class="infor-but" v-on:click="back">
                    <el-button class="goback el-icon-arrow-left">返回</el-button>
                </div>
                <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                    <el-tab-pane label="团课记录" name="1">
                        <template>
                            <el-col :span="24">
                                <div class="class-form">
                                    <el-form ref="form" :model="formInline" class="demo-form-inline" label-width="80px" @submit.native.prevent>
                                        <div class="from-class">
                                            <el-form-item label="时间段:" style="text-align:center;">
                                                <el-col :span="24">
                                                    <el-date-picker value-format="yyyy-MM-dd" :clearable="false" format="yyyy-MM-dd" v-model="formInline.time" @change="timechange" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:245px;margin-top:3px;z-index:3"></el-date-picker>
                                                </el-col>
                                            </el-form-item>
                                        </div>
                                        <div class="from-class">
                                            <el-form-item label="卡种:" style="text-align:center">
                                                <el-col :span="24">
                                                    <el-select v-model="formInline.card" placeholder="请选择" style="width:200px" @change="Selectchange4">
                                                        <el-option v-for="item in header" :key="item.key" :label="item.name" :value="item.key"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                        </div>
                                        <div class="from-class">
                                            <el-form-item label="上课状态:" style="text-align:center">
                                                <el-col :span="24">
                                                    <el-select v-model="formInline.status" placeholder="请选择" style="width:200px" @change="Selectchange3">
                                                        <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                        </div>
                                        <div class="from-class">
                                            <el-form-item label-width="40px">
                                                <el-button type="primary" @click="getTableData">查询</el-button>
                                                <el-button @click="resetForm">重置</el-button>
                                            </el-form-item>
                                        </div>
                                    </el-form>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="practice-table">
                                    <div class="table-tuan">
                                        <el-table  @row-click="rowClick" highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                                            <el-table-column prop="curriculum_table.curriculum_subject.kcName" align="left" label="课程" fixed></el-table-column>
                                            <el-table-column prop="curriculum_table.kcStime" align="left" label="上课时间"></el-table-column>
                                            <el-table-column prop="membership_card.card_type.CTName" align="left" label="卡种"></el-table-column>
                                            <el-table-column prop="curriculum_table.kcPlace" align="left" label="教室"></el-table-column>
                                            <el-table-column prop="curriculum_table.staff_info.YGXX_NAME" align="left" label="教练"></el-table-column>
                                            <el-table-column prop="curriculum_table.kcDiff" align="left" label="难度"></el-table-column>
                                            <el-table-column prop="hand" align="left" label="手牌"></el-table-column>
                                            <el-table-column prop="name" align="left" label="约课方式"></el-table-column>
                                            <el-table-column prop="status" align="left" label="上课状态" fixed="right">
                                                <template slot-scope="scope">
                                                    <div v-if="scope.row.isEnter == '已进场'">
                                                        <el-button type="text" size="small" style="color:#00bc71">已进场</el-button>
                                                    </div>
                                                    <div v-else-if="scope.row.isTrue == '已取消'">
                                                        <el-button type="text" size="small" style="color:#D7690F">已取消</el-button>
                                                    </div>
                                                     <div v-else-if="scope.row.isTrue == '失约'">
                                                        <el-button type="text" size="small" style="color:#FF002B">失约</el-button>
                                                    </div>
                                                    <div v-else>
                                                        <el-button type="text" size="small" style="color:#FF002B">待完成</el-button>
                                                        <el-button type="success" size="small" plain @click="cancelReservation">取消</el-button>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <div class="block">
                                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="私教记录" name="2">
                        <template>
                            <el-col :span="24">
                                <div class="class-form">
                                    <el-form ref="form" :model="formInline" class="demo-form-inline" label-width="80px">
                                        <div class="from-class">
                                            <el-form-item label="时间段:" style="text-align:center;">
                                                <el-col :span="24">
                                                    <el-date-picker value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="formInline.time" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:245px;margin-top:3px;z-index:3"></el-date-picker>
                                                </el-col>
                                            </el-form-item>
                                        </div>
                                        <div class="from-class">
                                            <el-form-item label="卡种:" style="text-align:center">
                                                <el-col :span="24">
                                                    <el-select v-model="formInline.card" placeholder="请选择" style="width:200px" @change="Selectchange4">
                                                        <el-option v-for="item in header" :key="item.key" :label="item.name" :value="item.key"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                        </div>
                                        <div class="from-class">
                                            <el-form-item label="上课状态:" style="text-align:center">
                                                <el-col :span="24">
                                                    <el-select v-model="formInline.status" placeholder="请选择" style="width:200px" @change="Selectchange3">
                                                        <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                        </div>
                                        <div class="from-class">
                                            <el-form-item label-width="40px">
                                                <el-button type="primary" @click="getTableData">查询</el-button>
                                                <el-button @click="resetForm">重置</el-button>
                                            </el-form-item>
                                        </div>
                                    </el-form>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="practice-table">
                                    <div class="table-tuan">
                                        <el-table highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData2.slice((currentPage2-1)*pagesize2,currentPage2*pagesize2)" style="width: 100%">
                                            <el-table-column prop="curriculum_table.kcStime" align="left" label="上课时间"></el-table-column>
                                            <el-table-column prop="membership_card.card_type.CTName" align="left" label="卡种"></el-table-column>
                                            <el-table-column prop="curriculum_table.kcPlace" align="left" label="教室"></el-table-column>
                                            <el-table-column prop="curriculum_table.staff_info.YGXX_NAME" align="left" label="教练"></el-table-column>
                                            <el-table-column prop="hand" align="left" label="手牌"></el-table-column>
                                            <el-table-column prop="name" align="left" label="约课方式"></el-table-column>
                                            <el-table-column prop="status" align="left" label="上课状态" fixed="right">
                                                <template slot-scope="scope">
                                                    <div v-if="scope.row.isEnter == '已进场'">
                                                        <el-button type="text" size="small" style="color:#00bc71">已进场</el-button>
                                                    </div>
                                                    <div v-else-if="scope.row.isTrue == '已取消'">
                                                        <el-button type="text" size="small" style="color:#D7690F">已取消</el-button>
                                                    </div>
                                                     <div v-else-if="scope.row.isTrue == '失约'">
                                                        <el-button type="text" size="small" style="color:#FF002B">失约</el-button>
                                                    </div>
                                                    <div v-else>
                                                        <el-button type="text" size="small" style="color:#FF002B">待完成</el-button>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <div class="block">
                                            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize2" layout="total, sizes, prev, pager, next, jumper" :total="tableData2.length">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="排队记录" name="3" v-if="hide == false">
                        <template>
                            <el-col :span="24">
                                <div class="class-form">
                                    <el-form ref="form" :model="formInline" class="demo-form-inline" label-width="80px" @submit.native.prevent>
                                        <div class="from-class">
                                            <el-form-item label="时间段:" style="text-align:center;">
                                                <el-col :span="24">
                                                    <el-date-picker  v-model="formInline.time2" value-format="yyyy-MM-dd" :clearable="false" format="yyyy-MM-dd" @change="timechange" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:245px;margin-top:3px;z-index:3"></el-date-picker>
                                                </el-col>
                                            </el-form-item>
                                        </div>
                                        <div class="from-class">
                                            <el-form-item label="卡种:" style="text-align:center">
                                                <el-col :span="24">
                                                    <el-select v-model="formInline.card2" placeholder="请选择" style="width:200px" @change="Selectchange4">
                                                        <el-option v-for="item in header" :key="item.key" :label="item.name" :value="item.key"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                        </div>
                                        <div class="from-class">
                                            <el-form-item label="排队状态:" style="text-align:center">
                                                <el-col :span="24">
                                                    <el-select v-model="formInline.status2" placeholder="请选择" style="width:200px" @change="Selectchange3">
                                                        <el-option v-for="item in status2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                        </div>
                                        <div class="from-class">
                                            <el-form-item label-width="40px">
                                                <el-button type="primary" @click="getTableData2">查询</el-button>
                                                <el-button @click="resetForm2">重置</el-button>
                                            </el-form-item>
                                        </div>
                                    </el-form>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="practice-table">
                                    <div class="table-tuan">
                                        <el-table @row-click="rowClick" highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData5.slice((currentPage3-1)*pagesize3,currentPage3*pagesize3)" style="width: 100%">
                                            <el-table-column prop="curriculum_table.curriculum_subject.kcName" align="left" label="课程" fixed></el-table-column>
                                            <el-table-column prop="curriculum_table.kcStime" align="left" label="上课时间"></el-table-column>
                                            <el-table-column prop="membership_card.card_type.CTName" align="left" label="卡种"></el-table-column>
                                            <el-table-column prop="curriculum_table.kcPlace" align="left" label="教室"></el-table-column>
                                            <el-table-column prop="curriculum_table.staff_info.YGXX_NAME" align="left" label="教练"></el-table-column>
                                            <el-table-column prop="curriculum_table.kcDiff" align="left" label="难度"></el-table-column>
                                            <el-table-column prop="status" align="left" label="排队状态" fixed="right">
                                                <template slot-scope="scope">
                                                    <div v-if="scope.row.status == '排队中'">
                                                        <el-button type="text" size="small" style="color:#0070C0">排队中</el-button>
                                                    </div>
                                                    <div v-else-if="scope.row.status == '已取消'">
                                                        <el-button type="text" size="small" style="color:#FF002B">已取消</el-button>
                                                    </div>
                                                    <div v-else-if="scope.row.status == '预约成功'">
                                                        <el-button type="text" size="small" style="color:#00bc71">预约成功</el-button>
                                                    </div>
                                                    <div v-else-if="scope.row.status == '排队过期'">
                                                        <el-button type="text" size="small" style="color:#FF002B">排队过期</el-button>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <div class="block">
                                            <el-pagination @size-change="handleSizeChange3" @current-change="handleCurrentChange3" :current-page="currentPage3" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize3" layout="total, sizes, prev, pager, next, jumper" :total="tableData5.length">
                                            </el-pagination>
                                        </div>
                                    </div>
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
  name: "classcard",
  inject: ["reload"],
  data() {
    return {
      activeName: "1",
      currentPage: 1,
      hide:false,
      pagesize: 10,
      currentPage2: 1,
      pagesize2: 10,
      currentPage3:1,
      pagesize3:10,
      tablelength: 0,
      tablelength2: 0,
      tablelength3: 0,
      header: [],
      formInline: {
        time: "",
        card: "",
        status: "",
        time2: "",
        card2: "",
        status2: ""
      },
      status: [
        { value: "1", label: "取消预约" },
        { value: "2", label: "待上课" },
        { value: "3", label: "已完成" },
        { value: "5", label:"失约"},
        { value: "4", label: "全部" },
      ],
      status2: [
        { value: "1", label: "排队中" },
        { value: "2", label: "取消排队" },
        { value: "3", label: "预约成功" },
        { value: "4", label: "排队过期" },
        { value: "5", label: "全部" }
      ],
      tableData: [],
      tableData2: [],
      tableData3: [],
      tableData5: [],
      tableData6: []
    };
  },
  watch: {
    card(val) {
      //卡种
      if (!val) {
        this.tableData = this.tableData3;
      }
    },
    status(val) {
      //状态
      if (!val) {
        this.tableData = this.tableData3;
      }
    },
    time(val) {
      //时间
      if (!val) {
        this.tableData = this.tableData3;
      }
    },
    card2(val) {
      //卡种
      if (!val) {
        this.tableData5 = this.tableData6;
      }
    },
    status2(val) {
      //状态
      if (!val) {
        this.tableData5 = this.tableData6;
      }
    },
    time2(val) {
      //时间
      if (!val) {
        this.tableData5 = this.tableData6;
      }
    }
  },
  created() {
    this.getTableData();
    this.getTableData2();
    this.hide = true;
    setTimeout(() => {
      this.getexperhome();
    }, 1500);
  },
  methods: {
    //获取会员卡详情
    getexperhome() {
      let _this = this;
      requestLogin("/setMemberCustomers/" + _this.$route.query.HYID, {}, "get")
        .then(function(res) {
          var membership_card = [];
          membership_card = res.membership_card;
          for (var i = 0; i < membership_card.length; i++) {
            var xialaobj = { key: "", name: "" };
            xialaobj.key = membership_card[i].id;
            xialaobj.name = membership_card[i].card_type.CTName;
            _this.header.push(xialaobj);
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
    //取消预约
    cancelReservation() {
      this.$confirm("确定取消预约吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = { bool: true, id:this.currentSelectRow.id};
        requestLogin("/adminHomePage/cancelReservation" , params, "post")
          .then(data => {
            this.$message({
              message: "取消成功",
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
    //获取表格页面
    getTableData() {
      let _this = this;
      var params = {
        id: _this.$route.query.HYID, //会员卡id
        type: 3, //课程种类
        state: _this.formInline.status, //上课状态
        cardId: _this.formInline.card, //卡id
        startTime: _this.formInline.time[0], //预约时间
        endTime: _this.formInline.time[1] //结束
      };
      requestLogin("/setDesignateMember/takeLessonsRecord", params, "post")
        .then(function(res) {
          let { group, privateList } = res;
          _this.tableData = group;
          _this.tableData2 = privateList;
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
      if (null != this.tableData || null != this.tableData2) {
        _this.tableData.map((item, index) => {
          item.kcName = item.curriculum_table.curriculum_subject.kcName;
          item.YGXX_NAME = item.curriculum_table.staff_info.YGXX_NAME;
        });
        _this.tableData2.map((item, index) => {
          item.YGXX_NAME = item.curriculum_table.staff_info.YGXX_NAME;
        });
        this.tablelength = this.tableData.length;
        this.tablelength2 = this.tableData2.length;
      }
    },
    getTableData2() {
      let _this = this;
      var params = {
        id: _this.$route.query.HYID, //会员卡id
        status: _this.formInline.status2, //上课状态
        cardId: _this.formInline.card2, //卡id
        startTime: _this.formInline.time2[0], //预约时间
        endTime: _this.formInline.time2[1] //结束时间
      };
      requestLogin("/setDesignateMember/takeLineUpRecord", params, "post")
        .then(function(res) {
          _this.tableData5 = res;
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
      if (null != this.tableData5) {
        _this.tableData5.map((item, index) => {
          item.kcName = item.curriculum_table.curriculum_subject.kcName;
          item.YGXX_NAME = item.curriculum_table.staff_info.YGXX_NAME;
        });
        this.tablelength3 = this.tableData5.length;
      }
    },
    rowClick(row, event, column) {
        this.currentSelectRow = row;
    },
    handleClick(tab, event) {},
    Selectchange3(val) {},
    Selectchange4(val) {},
    timechange(val) {},
    //重置
    resetForm() {
      this.formInline.time = "";
      this.formInline.card = "";
      this.formInline.status = "";
    },
    resetForm2() {
      this.formInline.time2 = "";
      this.formInline.card2 = "";
      this.formInline.status2 = "";
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleSizeChange2(size) {
      this.pagesize2 = size;
    },
    handleSizeChange3(size) {
      this.pagesize3 = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleCurrentChange2(currentPage2) {
      this.currentPage2 = currentPage2;
    },
    handleCurrentChange3(currentPage3) {
      this.currentPage3 = currentPage3;
    },
    back() {
      this.$router.push({
        path: "/Customer/membershiphome/memberhome",
        query: {
          HYID: this.$route.query.HYID,
          HYName: this.$route.query.HYName,
          YGXX_NAME: this.$route.query.YGXX_NAME,
          MotoTel: this.$route.query.MotoTel
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
      margin-top: 10px;
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
