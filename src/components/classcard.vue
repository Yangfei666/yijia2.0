<template>
    <!--体验上课记录-->
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
                                    <el-form ref="form" :model="formInline" class="demo-form-inline" label-width="80px">
                                        <div class="from-class">
                                            <el-form-item label="时间段:" style="text-align:center;">
                                                <el-col :span="24">
                                                    <el-date-picker value-format="yyyy-MM-dd" :clearable="false" format="yyyy-MM-dd" v-model="formInline.time" @change="timechange" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:245px;margin-top:3px;z-index:3"></el-date-picker>
                                                </el-col>
                                            </el-form-item>
                                        </div>
                                        <div class="from-class">
                                            <el-form-item label="券种:" style="text-align:center">
                                                <el-col :span="24">
                                                    <el-select v-model="formInline.quan" placeholder="请选择" style="width:200px" @change="Selectchange4">
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
                                        <el-table highlight-current-row v-loading="loading" element-loading-text="拼命加载中..." :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                                            <el-table-column prop="curriculum_table.curriculum_subject.kcName" align="left" label="课程" fixed></el-table-column>
                                            <el-table-column prop="curriculum_table.kcStime" align="left" label="上课时间" sortable></el-table-column>
                                            <el-table-column prop="customer_voucher.experience_voucher.tkName" align="left" label="券种"></el-table-column>
                                            <el-table-column prop="curriculum_table.kcPlace" align="left" label="教室"></el-table-column>
                                            <el-table-column prop="curriculum_table.staff_info.YGXX_NAME" align="left" label="教练"></el-table-column>
                                            <el-table-column prop="curriculum_table.kcDiff" align="left" label="难度"></el-table-column>
                                            <el-table-column prop="hand" align="left" label="手牌"></el-table-column>
                                            <el-table-column prop="status" align="left" label="上课状态" fixed="right">
                                                <template slot-scope="scope">
                                                    <div v-if="scope.row.isEnter == '已进场'">
                                                        <el-button type="text" size="small" style="color:#00bc71">已进场</el-button>
                                                    </div>
                                                    <div v-else-if="scope.row.isTrue == '已取消'">
                                                        <el-button type="text" size="small" style="color:#D7690F">已取消</el-button>
                                                    </div>
                                                    <div v-else>
                                                        <el-button type="text" size="small" style="color:#FF002B">待完成</el-button>
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
                                            <el-form-item label="券种:" style="text-align:center">
                                                <el-col :span="24">
                                                    <el-select v-model="formInline.quan" placeholder="请选择" style="width:200px" @change="Selectchange4">
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
                                                <el-button  @click="resetForm">重置</el-button>
                                            </el-form-item>
                                        </div>
                                    </el-form>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="practice-table">
                                    <div class="table-tuan">
                                        <el-table highlight-current-row v-loading="loading" element-loading-text="拼命加载中..." :header-cell-style="{background:'#fafafa'}" :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                                            <el-table-column prop="curriculum_table.kcStime" align="left" label="上课时间" fixed></el-table-column>
                                            <el-table-column prop="customer_voucher.experience_voucher.tkName" align="left" label="券种"></el-table-column>
                                            <el-table-column prop="curriculum_table.kcPlace" align="left" label="教室"></el-table-column>
                                            <el-table-column prop="curriculum_table.staff_info.YGXX_NAME" align="left" label="教练"></el-table-column>
                                            <el-table-column prop="hand" align="left" label="手牌"></el-table-column>
                                            <el-table-column prop="status" align="left" label="上课状态" fixed="right">
                                                <template slot-scope="scope">
                                                    <div v-if="scope.row.isEnter == '已进场'">
                                                        <el-button type="text" size="small" style="color:#00bc71">已进场</el-button>
                                                    </div>
                                                    <div v-else-if="scope.row.isTrue == '已取消'">
                                                        <el-button type="text" size="small" style="color:#D7690F">已取消</el-button>
                                                    </div>
                                                    <div v-else>
                                                        <el-button type="text" size="small" style="color:#FF002B">待完成</el-button>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <div class="block">
                                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData2.length">
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
  data() {
    return {
      activeName: "1",
      currentPage: 1,
      pagesize: 10,
      loading: true,
      tablelength: 0,
      tablelength2: 0,
      header: [],
      formInline: {
        time: "",
        quan: "",
        status: ""
      },
      status: [
        { value: "1", label: "取消预约" },
        { value: "2", label: "待上课" },
        { value: "3", label: "已完成" },
        { value: "4", label: "全部" }
      ],
      tableData: [],
      tableData2: [],
      tableData3: [],
      tableData4: []
    };
  },
  watch: {
    status(val) {
      if (!val) {
        this.tableData = this.tableData3;
      }
    },
    quan(val) {
      if (!val) {
        this.tableData = this.tableData3;
      }
    },
    time(val) {
      if (!val) {
        this.tableData = this.tableData3;
      }
    }
  },
  created() {
    this.getTableData();
    setTimeout(() => {
      this.getexperhome();
    }, 1000);
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
            _this.header.push(xialaobj);
          }
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
    //获取表格页面
    getTableData() {
      let _this = this;
      _this.loading = true;
      var params = {
        id: _this.$route.params.id, //体验券id 
        type: 3, //课程种类
        state: _this.formInline.status, //上课状态
        cardId: _this.formInline.quan, //券种id
        startTime: _this.formInline.time[0], //开始
        endTime: _this.formInline.time[1] //结束
      };
      requestLogin("/setExperienceCustomer/takeLessonsRecord", params, "post")
        .then(function(res) {
          _this.loading = false;
          let { group, privateList } = res;
          _this.tableData = group;
          _this.tableData2 = privateList;
        })
        .catch(error => {
          _this.loading = false;
          if (error) {
            this.$message({
              message: "获取数据失败",
              type: "error"
            });
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
    //重置
    resetForm() {
      this.formInline.time = "";
      this.formInline.quan = "";
      this.formInline.status = "";
    },
    handleClick(tab, event) {},
    Selectchange3(val) {},
    Selectchange4(val) {},
    timechange(val) {},
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
      margin-top: 10px;
      .table-tuan {
        width: 98%;
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
