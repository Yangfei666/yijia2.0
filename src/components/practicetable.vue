<template>
  <!--体验表格-->
  <div class="practice-list">
    <el-row>
      <el-form ref="formInline" :model="formInline" class="demo-form-inline" label-width="90px">
        <div class="quanbu">
          <div class="search-form">
            <el-form-item label="体验劵种:">
              <el-col :span="24">
                <el-input v-model="formInline.user" placeholder="请输入" clearable style="width:170px;"></el-input>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form">
            <el-form-item label="登记日期:">
              <el-col :span="24">
                <el-date-picker v-model="formInline.date" value-format="yyyy-MM-dd" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:230px"></el-date-picker>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form" v-show="isShow">
            <el-form-item label="成交状态:">
              <el-col :span="24">
                <el-select v-model="formInline.cardstatus" placeholder="请选择" style="width:200px" @change="Selectchange">
                  <el-option v-for="item in cardstatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form" v-show="isShow">
            <el-form-item label="多久未跟进:" label-width="100px">
              <el-col :span="24">
                <el-select v-model="formInline.follow" placeholder="请选择" style="width:200px" @change="Selectchange3">
                  <el-option v-for="item in follow" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form" v-show="isShow">
            <el-form-item label="所属会籍:">
              <el-col :span="24">
                <el-select v-model="formInline.adviser" placeholder="请选择" style="width:100%" @change="Selectchange2">
                  <el-option v-for="item in staff_info" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form">
            <el-form-item label-width="40px">
              <el-button type="primary" @click="getTableData(false)">查询</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </div>
          <div class="corry">
            <el-button type="text" class="corry-out" @click="showToggle">{{btnText}}
              <i class="el-icon-arrow-down" v-show="downIcon"></i>
              <i class="el-icon-arrow-up" v-show="!downIcon"></i>
            </el-button>
          </div>
        </div>
      </el-form>
    </el-row>
    <div class="practice-center">
      <el-row>
        <el-col :span="12">
          <div class="purple">
            <div class="add">
              <el-button type="text" class="add-p el-icon-plus" @click="dialogFormVisible = true">添加体验客户</el-button>
              <template>
                <el-dialog title="添加体验客户" :append-to-body="true" :visible.sync="dialogFormVisible">
                  <Addpractice :tiyanqufen='Tiyanqufen'></Addpractice>
                </el-dialog>
              </template>
            </div>
            <div class="add">
              <el-button type="text" class="add-p" @click="taste()">客户跟进</el-button>
            </div>
            <div class="add">
              <el-button type="text" class="add-p" @click="exper()">体验客户主页</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="purple2">
            <el-col :span="10" class="search">
              <input class="search-input" maxlength="18" v-model="searchVal" placeholder="搜索姓名/电话" />
              <i class="search-icon el-icon-search" @click="search"></i>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="practice-table">
      <el-row>
        <el-col :span="24">
          <el-table id="rebateSetTable" ref="singleTable" @current-change="handleCurrentChange2" highlight-current-row :default-sort="{order: 'descending'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :header-cell-style="{background:'#fafafa'}" @row-click="rowClick" v-loading="loading" element-loading-text="拼命加载中..." style="width: 100%">
            <el-table-column align="center" prop="radio" fixed width="70px">
              <template slot-scope="scope">
                <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="exName" align="left" label="姓名" fixed width="150px"></el-table-column>
            <el-table-column prop="exTel" align="left" label="手机号" width="180px"></el-table-column>
            <el-table-column prop="tkName" align="left" label="劵种" width="180px"></el-table-column>
            <el-table-column prop="mode" align="left" label="付款方式" width="180px"></el-table-column>
            <el-table-column prop="price" align="left" label="金额" sortable width="150px"></el-table-column>
            <el-table-column prop="exHjgwName" align="left" label="会籍" width="180px"></el-table-column>
            <el-table-column prop="exRegister" align="left" label="登记日期" sortable width="180px"></el-table-column>
            <el-table-column prop="exSuc" align="left" label="成交状态" width="150px"></el-table-column>
            <el-table-column prop="exReason" align="left" label="未成交原因" width="230px"></el-table-column>
            <el-table-column prop="cz" align="left" label="操作" fixed="right" width="230px">
              <template slot-scope="scope">
                <el-button @click="go(scope.$index,scope.row)" type="text" size="small">认领</el-button>
                <el-button type="text" size="small" @click="dialogFormVisible2 = true">换会籍</el-button>
              </template>
            </el-table-column>
          </el-table>
          <template>
            <el-dialog title="换会籍" :append-to-body="true" :visible.sync="dialogFormVisible2">
              <Change :potential="Potential"></Change>
            </el-dialog>
          </template>
          <div class="block">
            <el-button size="small" class="export" @click="exportExcel">导出</el-button>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Addpractice from "@/components/addpractice";
import Change from "@/components/change";
import { requestLogin } from "@/api/api";
import FileSaver from "file-saver";
import XLSX from "xlsx";
function downloadExcel(config, sourceData) {
  let subData = sourceData.map(item => {
    let temp = [];
    let keys = Object.keys(item);
    for (let i = 0, len = keys.length; i < len; i++) {
      if (config.limit.includes(keys[i])) {
        continue;
      }
      temp.push(item[keys[i]]);
    }
    return temp;
  });
  subData.unshift(config.headTitle);
  let data = subData;
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `${config.sheetName}`);
  XLSX.writeFile(wb, `${config.excelName}.xlsx`);
}
export default {
  name: "practicetable",
  inject: ["reload"],
  components: {
    Addpractice,
    Change
  },
  data() {
    return {
      Potential: { potential: "setExperienceCustomer", id: "" },
      downIcon: true,
      loading: true,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      input10: "",
      value6: "",
      currentPage: 1,
      pagesize: 10,
      btnText: "展开",
      isShow: false,
      radio: "",
      Tiyanqufen:{tiyanqufen:'newCustomer'},
      Customercategory:'experience',
      formInline: {
        user: "",
        date: "",
        cardstatus: "",
        follow: "",
        adviser: ""
      },
      tableData: [],
      tableData2: [],
      searchVal: "",
      staff_info: [],
      follow: [
        //多久未跟进
        { value: "1", label: "一周以内" },
        { value: "2", label: "1周到1月" },
        { value: "3", label: "1月到2个月" },
        { value: "4", label: "2个月以上" }
      ],
      cardstatus: [
        //成交状态
        { value: "0", label: "已成交" },
        { value: "1", label: "未成交" },
        { value: "2", label: "跟进中" }
      ]
    };
  },
  watch: {
    searchVal(val) {
      //姓名电话
      console.log(val);
      if (!val) {
        this.tableData = this.tableData2;
      }
    },
    adviser(val) {
      //会籍
      if (!val) {
        this.tableData = this.tableData2;
      }
    },
    follow(val) {
      //跟进
      if (!val) {
        this.tableData = this.tableData2;
      }
    }
  },
  created: function() {
    let _this = this;
    this.getTableData(true);
    setTimeout(function() {
      _this.getCustomer();
    }, 1000);
  },
  methods: {
    //获取表格数据
    getTableData(type) {
      let _this = this;
      _this.loading = true;
      let params = {};
      if (!type) {
        params = {
          name: _this.exName, //姓名
          tel: _this.exTel, //电话
          followUpTime: _this.formInline.follow, //多长时间未跟进
          registerTimeStart: _this.formInline.date[0], //登记时间区间--开始
          registerTimeEnd: _this.formInline.date[1], //登记时间区间--结束
          voucherType: _this.formInline.user, //券名称
          status: _this.formInline.cardstatus //成交状态
        };
      }
      requestLogin(
        "/setExperienceCustomer/searchExperienceCustomers/1",
        params,
        "post"
      )
        .then(function(res) {
          _this.loading = false;
          let { errorCode, msg } = res;
          if (errorCode) {
            _this.tableData = "";
            this.$message({
              message: msg,
              type: "error"
            });
            return;
          }
          _this.tableData = res;
          _this.tableData2 = res;
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
    },
    //获取会籍顾问列表
    getCustomer() {
      let _this = this;
      requestLogin("/setDepositCustomer/create", {}, "get")
        .then(function(res) {
          let { staff_info } = res;
          _this.staff_info = staff_info;
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
    search() {
      this.tableData = this.tableData2;
      this.tableData = this.tableData2.filter(
        i =>
          i.exName.includes(this.searchVal) || i.exTel.includes(this.searchVal)
      );
    },
    Selectchange3(val) {
      console.log(val);
    },
    Selectchange2(val) {
      console.log(val);
    },
    Selectchange(val) {
      console.log(val);
    },
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    getCurrentRow(val) {
      console.log(val);
    },
    radiochange(row) {
      console.log(`当前: ${row}`);
    },
    handleClick3(row) {
      console.log(row);
      alert("点击了");
    },
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
    },
    resetForm() {
      this.formInline.user = "";
      this.formInline.date = "";
      this.formInline.cardstatus = "";
      this.formInline.follow = "";
      this.formInline.adviser = "";
    },
    rowClick(row, event, column) {
      this.radio = row.index;
      //获取表格数据
      this.currentSelectRow = row;
      this.Potential.id = this.currentSelectRow.id;
      this.radio = this.tableData.indexOf(row);
    },
    //体验认领跳转
    go(index,row) {
      this.currentSelectRow = row;
       this.$router.push({
        path:"/Customer/practice/claim",
        query: {
          name: this.currentSelectRow.exName,
          tel: this.currentSelectRow.exTel,
          customercategory:this.Customercategory
        }
      });
    },
    taste() {
      if (!this.currentSelectRow) {
        this.$message({ message: "请先选择数据!", type: "warning" });
        return;
      }
      //跟进跳转
      this.$router.push({
        name: "Practiceup",
        params: {
          id: this.currentSelectRow.id,
          exName: this.currentSelectRow.exName,
          exSex: this.currentSelectRow.exSex
        }
      });
    },
    exper() {
      if (!this.currentSelectRow) {
        this.$message({ message: "请先选择数据!", type: "warning" });
        return;
      }
      this.$router.push({
        name: "Experhome",
        params: {
          id: this.currentSelectRow.id,
          exName: this.currentSelectRow.exName,
          exHjgwName: this.currentSelectRow.exHjgwName,
          exTel: this.currentSelectRow.exTel,
          exSex: this.currentSelectRow.exSex
        }
      });
      console.log(this.currentSelectRow.id);
    },
    showToggle: function() {
      this.isShow = !this.isShow;
      this.downIcon = !this.downIcon;
      if (this.isShow) {
        this.btnText = "收起";
      } else {
        this.btnText = "展开";
      }
    },
    //表格导出
    exportExcel() {
      let config = {
        excelName: "体验客户管理",
        sheetName: "体验客户管理",
        limit: "id,exWeChat,exSex,exHealth,exHjgwId,HSID".split(","),
        headTitle: "姓名|手机号码|会籍|登记日期|成交状态|未成交原因|创建时间|金额|付款方式|券种".split(
          "|"
        )
      };
      downloadExcel(config, this.tableData);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/latenttable.scss";
.practice-list {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .quanbu {
    display: block;
    height: 60px;
    .search-form {
      height: 45px;
      display: flex;
      float: left;
      margin: 15px 0px auto;
      .el-button--primary {
        background-color: #00bc71;
        border-color: #00bc71;
        height: 35px;
        line-height: 1px;
      }
      .el-button + .el-button {
        height: 35px;
        line-height: 1px;
      }
    }
    .corry {
      height: 37px;
      line-height: 37px;
      float: left;
      margin-top: 15px;
      .corry-out {
        color: #00bc71;
        font-size: 14px;
      }
    }
    .el-input__inner {
      height: 37px;
    }
    .el-input {
      height: 37px;
    }
  }
  .practice-center {
    height: 80px;
    .purple {
      height: 80px;
      display: flex;
      justify-content: flex-start;
      .add {
        border: 1px solid #00bc71;
        width: 20%;
        height: 35px;
        border-radius: 4px;
        line-height: 0px;
        margin-top: 20px;
        margin-left: 20px;
        p {
          color: #00bc71;
          font-size: 16px;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
        }
        .add-p {
          color: #00bc71;
          font-size: 16px;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 10px;
        }
      }
    }
    .purple2 {
      height: 80px;
      display: flex;
      justify-content: flex-end;
      .search {
        width: 44%;
        border: 1px solid #e8e8e8;
        height: 32px;
        display: flex;
        border-radius: 16px;
        margin-top: 20px;
        margin-right: 20px;
        .search-input {
          width: 100%;
          border-radius: 16px;
          border: none;
          text-indent: 10px;
          color: #8c8c8c;
          font-size: 14px;
        }
        .search-icon {
          margin-top: 8px;
          margin-right: 13px;
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
      .export {
        height: 30px;
        margin-top: 2%;
        padding: 6px 13px;
        font-size: 14px;
        border: 1px solid #00bc6a;
        color: #00bc6a;
        margin-left: -5%;
      }
    }
  }
}
</style>
