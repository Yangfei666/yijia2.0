<template>
  <!--会员表格-->
  <div class="practice-list">
    <el-row>
      <el-form ref="formInline" :model="formInline" class="demo-form-inline" label-width="90px">
        <div class="quanbu">
          <div class="search-form">
            <el-form-item label="会员卡种:">
              <el-col :span="24">
                <el-input v-model="formInline.membercard" placeholder="请输入" clearable style="width:170px;"></el-input>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form">
            <el-form-item label="到期时间:">
              <el-col :span="24">
                <el-date-picker v-model="formInline.date" value-format="yyyy-MM-dd" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:230px"></el-date-picker>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form" v-show="isShow">
            <el-form-item label="剩余次数:">
              <el-col :span="12">
                <el-input v-model="formInline.numsmall" placeholder="最小值" clearable style="width:100px;font-size:12px"></el-input>
              </el-col>
              <el-col :span="1">
                <el-input v-model="formInline.numbig" placeholder="最大值" clearable style="width:100px;font-size:12px"></el-input>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form" v-show="isShow">
            <el-form-item label="剩余金额:">
              <el-col :span="12">
                <el-input v-model="formInline.fundsmall" placeholder="最小值" clearable style="width:100px;font-size:12px"></el-input>
              </el-col>
              <el-col :span="1">
                <el-input v-model="formInline.fundbig" placeholder="最大值" clearable style="width:100px;font-size:12px"></el-input>
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
          <div class="search-form" v-show="isShow">
            <el-form-item label="卡状态:">
              <el-col :span="24">
                <el-select v-model="formInline.status" placeholder="请选择" style="width:200px" @change="Selectchange">
                  <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form" v-show="isShow">
            <el-form-item label="多久未跟进:">
              <el-col :span="24">
                <el-select v-model="formInline.follow" placeholder="请选择" style="width:200px" @change="Selectchange3">
                  <el-option v-for="item in follow" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form">
            <el-form-item label-width="40px">
              <el-col :span="24">
                <el-button type="primary" @click="getTableData(false)">查询</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-col>
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
              <el-button type="text" class="add-b el-icon-plus" @click="dialogFormVisible = true">添加会员</el-button>
              <template>
                <el-dialog title="添加会员" :append-to-body="true" :visible.sync="dialogFormVisible">
                  <Addmember :huiyuanqufen='Huiyuanqufen'></Addmember>
                </el-dialog>
              </template>
            </div>
            <div class="add">
              <el-button type="text" class="add-b" @click="func2()">会员跟进</el-button>
            </div>
            <div class="add">
              <el-button type="text" class="add-b" @click="zhuye()">会员主页</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="purple2">
            <el-col :span="10" class="search">
              <input class="search-input" maxlength="18" v-model="searchVal" placeholder="搜索姓名/电话/卡号" />
              <i class="search-icon el-icon-search" @click="search"></i>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="practice-table">
      <el-row>
        <el-col :span="24">
          <el-table id="rebateSetTable" ref="singleTable" @current-change="handleCurrentChange2" highlight-current-row v-loading="loading" element-loading-text="拼命加载中..." :default-sort="{order: 'descending'}" @row-click="rowClick" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :header-cell-style="{background:'#fafafa'}" style="width: 100%">
            <el-table-column align="center" prop="radio" fixed width="80px">
              <template slot-scope="scope">
                <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="HYName" align="left" label="姓名" fixed width="150px"></el-table-column>
            <el-table-column prop="MotoTel" align="left" label="手机号" width="180px"></el-table-column>
            <el-table-column prop="CardNO" align="left" label="卡号" width="180px"></el-table-column>
            <el-table-column prop="CTName" align="left" label="卡种" width="180px"></el-table-column>
            <el-table-column prop="sTime" align="left" label="开卡时间" sortable width="200px"></el-table-column>
            <el-table-column prop="YGXX_NAME" align="left" label="会籍" width="180px"></el-table-column>
            <el-table-column prop="eTime" align="left" label="到期时间" sortable width="200px"></el-table-column>
            <el-table-column prop="SYCS" align="left" label="剩余次数" sortable width="130px"></el-table-column>
            <el-table-column prop="SYJE" align="left" label="剩余金额" sortable width="130px"></el-table-column>
            <el-table-column prop="State" align="left" label="卡状态" width="140px"></el-table-column>
            <el-table-column prop="cz" align="left" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button @click="go(scope.$index,scope.row)" type="text" size="small">认领</el-button>
              </template>
            </el-table-column>
          </el-table>
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
import Addmember from "@/components/addmember";
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
  name: "leaguermanagetable",
  inject: ["reload"],
  components: {
    Addmember
  },
  data() {
    return {
      downIcon: true,
      dialogFormVisible: false,
      radio: true,
      currentPage: 1,
      pagesize: 10,
      btnText: "展开",
      isShow: false,
      loading: true,
      Customercategory: "member",
      Huiyuanqufen: { huiyuanqufen: "newCustomer" },
      formInline: {
        membercard: "",
        date: "",
        numsmall: "",
        numbig: "",
        fundsmall: "",
        fundbig: "",
        adviser: [],
        follow: [],
        status: []
      },
      tableData: [],
      tableData2: [],
      staff_info: [],
      searchVal: "",
      follow: [
        //多久未跟进
        { value: "1", label: "一周以内" },
        { value: "2", label: "1周到1月" },
        { value: "3", label: "1月到2个月" },
        { value: "4", label: "2个月以上" }
      ],
      status: [
        //状态
        { value: "未激活", label: "未激活" },
        { value: "正常", label: "正常" },
        { value: "挂失", label: "挂失" },
        { value: "请假", label: "请假" },
        { value: "退卡", label: "退卡" },
        { value: "过期", label: "过期" }
      ]
    };
  },
  watch: {
    searchVal(val) {
      //姓名电话
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
    },
    status(val) {
      //状态
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
          name: _this.HYName, //姓名
          tel: _this.MotoTel, //电话
          cardNo: _this.CardNO, //卡号
          cardType: _this.formInline.membercard, //卡名称
          cardStatus: _this.formInline.status, //成交状态
          remainderStart: _this.formInline.numsmall, //剩余次数区间--小
          remainderEnd: _this.formInline.numbig, //剩余次数区间--大
          remainSumStart: _this.formInline.fundsmall, //剩余金额区间--小
          remainSumEnd: _this.formInline.fundbig, //剩余金额区间--大
          followUpTime: _this.formInline.follow, //多长时间未跟进
          expiryTimeStart: _this.formInline.date[0], //到期时间区间--开始
          expiryTimeEnd: _this.formInline.date[1] //到期时间区间--结束
        };
      }
      requestLogin(
        "/setMemberCustomers/searchMemberCustomers/1",
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
          i.HYName.includes(this.searchVal) ||
          i.MotoTel.includes(this.searchVal) ||
          i.CardNO.includes(this.searchVal)
      );
    },
    resetForm() {
      this.formInline.date = "";
      this.formInline.membercard = "";
      this.formInline.adviser = "";
      this.formInline.follow = "";
      this.formInline.status = "";
      this.formInline.numsmall = "";
      this.formInline.numbig = "";
      this.formInline.fundsmall = "";
      this.formInline.fundbig = "";
    },
    func2() {
      if (!this.currentSelectRow) {
        this.$message({
          message: "请先选择数据!",
          type: "warning"
        });
        return;
      }
      //跟进跳转
      this.$router.push({
        name: "Insiderup",
        params: {
          HYID: this.currentSelectRow.HYID,
          HYName: this.currentSelectRow.HYName,
          Sex: this.currentSelectRow.Sex
        }
      });
    },
    //会员主页
    zhuye() {
      if (!this.currentSelectRow) {
        this.$message({
          message: "请先选择数据!",
          type: "warning"
        });
        return;
      }
      this.$router.push({
        path: "/Customer/membershiphome/memberhome",
        query: {
          HYID: this.currentSelectRow.HYID,
          HYName: this.currentSelectRow.HYName,
          YGXX_NAME: this.currentSelectRow.YGXX_NAME,
          MotoTel: this.currentSelectRow.MotoTel
        }
      });
    },
    Selectchange(val) {},
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    getCurrentRow(val) {},
    Selectchange2(val) {},
    Selectchange3(val) {},
    //格式化指定列的值
    formatter(row, column) {
      return row.address;
    },
    radiochange(row) {},
    rowClick(row, event, column) {
      this.radio = this.tableData.indexOf(row);
      //获取表格数据
      this.currentSelectRow = row;
    },
    handleClick3(row) {
      alert("点击了");
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    //会员认领跳转
    go(index, row) {
      this.currentSelectRow = row;
      this.$router.push({
        path: "/Customer/leaguer/leaguermanage/claim",
        query: {
          name: this.currentSelectRow.HYName,
          tel: this.currentSelectRow.MotoTel,
          customercategory: this.Customercategory
        }
      });
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
        excelName: "会员管理",
        sheetName: "会员管理",
        limit: "hyRecordTime,HYID,Sex,cid".split(","),
        headTitle: "卡号|姓名|手机号|开卡时间|到期时间|剩余次数|剩余金额|卡状态|卡种|会籍".split(
          "|"
        )
      };
      downloadExcel(config, this.tableData);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/leaguertable.scss";
.practice-list {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .quanbu {
    display: block;
    height: 100%;
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
    .el-input--suffix .el-input__inner {
      height: 37px;
      padding-right: 0px !important;
    }
    .el-input {
      height: 37px;
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
        line-height: 2px;
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
          margin-top: 9px;
        }
        .add-b {
          color: #00bc71;
          margin-top: -4px;
          font-size: 16px;
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
