<template>
  <!--定金表格-->
  <div class="practice-list">
    <el-row>
      <el-form ref="form" :model="formInline" class="demo-form-inline" label-width="90px">
        <div class="quanbu">
          <div class="search-form">
            <el-form-item label="登记日期:">
              <el-col :span="24">
                <el-date-picker v-model="formInline.date" value-format="yyyy-MM-dd" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:230px"></el-date-picker>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form">
            <el-form-item label="所属会籍:">
              <el-col :span="24">
                <el-select v-model="formInline.adviser" placeholder="请选择" style="width:100%" @change="Selectchange2">
                  <el-option v-for="item in staff_info" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form">
            <el-form-item label="多久未跟进:" label-width="100px">
              <el-col :span="24">
                <el-select v-model="formInline.follow" placeholder="请选择" style="width:200px" @change="Selectchange3">
                  <el-option v-for="item in follow" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
        </div>
      </el-form>
    </el-row>
    <div class="practice-center">
      <el-row>
        <el-col :span="12">
          <div class="purple">
            <div class="add">
              <el-button type="text" class="add-p el-icon-plus" @click="dialogFormVisible = true">添加定金客户</el-button>
              <template>
                <el-dialog title="添加定金客户" :append-to-body="true" :visible.sync="dialogFormVisible">
                  <Addbargain :dingjinqufen='Dingjinqufen'></Addbargain>
                </el-dialog>
              </template>
            </div>
            <div class="add">
              <el-button type="text" class="add-p" @click="changeInfo">修改资料</el-button>
              <template>
                <el-dialog title="修改定金客户资料" :append-to-body="true" :visible.sync="dialogFormVisible2">
                  <Revisedatum2 :currentSelectRow="currentSelectRow"></Revisedatum2>
                </el-dialog>
              </template>
            </div>
            <div class="add">
              <el-button type="text" class="add-p" @click="func2()">客户跟进</el-button>
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
    <router-view></router-view>
    <div class="practice-table">
      <el-row>
        <el-col :span="24">
          <el-table id="rebateSetTable"  ref="singleTable"  @current-change="handleCurrentChange2" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中..." :default-sort="{order: 'descending'}" highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" @row-click="rowClick">
            <el-table-column align="center" prop="radio" fixed width="70px">
              <template slot-scope="scope">
               <el-radio class="radio" v-model="radio"  :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="itName" align="left" label="姓名" fixed width="150px"></el-table-column>
            <el-table-column prop="itTel" align="left" label="手机号" width="150px"></el-table-column>
            <el-table-column prop="itHjgwName" align="left" label="会籍" width="150px"></el-table-column>
            <el-table-column prop="itDepositTime" align="left" label="登记日期" sortable width="150px"></el-table-column>
            <el-table-column prop="itPayment" align="left" label="付款方式" width="150px"></el-table-column>
            <el-table-column prop="itPrice" align="left" label="金额" sortable width="150px"></el-table-column>
            <el-table-column prop="itSuc" align="left" label="成交状态" width="150px"></el-table-column>
            <el-table-column prop="itRemark" align="left" label="备注" width="150px"></el-table-column>
            <el-table-column prop="cz" align="left" label="操作" fixed="right" width="280px">
              <template slot-scope="scope">
                <el-button @click="go(scope.$index, scope.row)" type="text" size="small">认领</el-button>
                <el-button @click.native.prevent="dialogFormVisible5 = true" type="text" size="small">办卡</el-button>
                <el-button @click="dialogFormVisible4 = true" type="text" size="small">放弃定金</el-button>
                <el-button type="text" size="small" @click="dialogFormVisible3 = true">换会籍</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="添加会员" :append-to-body="true" :visible.sync="dialogFormVisible5">
            <Addmember :huiyuanqufen='Huiyuanqufen'></Addmember>
          </el-dialog>
          <el-dialog title="放弃定金" :append-to-body="true" :visible.sync="dialogFormVisible4">
            <Givedeposit :currentSelectRow="currentSelectRow"></Givedeposit>
          </el-dialog>
          <el-dialog title="换会籍" :append-to-body="true" :visible.sync="dialogFormVisible3">
            <change :potential="Potential"></change>
          </el-dialog>
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
import Addbargain from "@/components/addbargain";
import Addmember from "@/components/addmember";
import Revisedatum2 from "@/components/revisedatum2";
import Change from "@/components/change";
import Givedeposit from "@/components/givedeposit";
import { requestLogin } from "@/api/api";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "bargaintable",
  inject: ["reload"],
  components: {
    Addbargain,
    Revisedatum2,
    Change,
    Givedeposit,
    Addmember
  },
  data() {
    return {
      currentSelectRow: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      currentPage: 1,
      pagesize: 10,
      loading: true,
      radio: true,
      Customercategory:'deposit',
      Potential:{potential:'setDepositCustomer',id:''},
      Dingjinqufen:{dingjinqufen:'newCustomer'},
      Huiyuanqufen:{huiyuanqufen:'deposit',id:''},
      formInline: {
        date: "",
        adviser: [],
        follow: []
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
          name: _this.itName, //姓名
          tel: _this.itTel, //电话
          followUpTime: _this.formInline.follow, //多长时间未跟进
          registerTimeStart: _this.formInline.date[0], //登记时间区间--开始
          registerTimeEnd: _this.formInline.date[1] //登记时间区间--结束
        };
      }
      requestLogin(
        "/setDepositCustomer/searchDepositCustomers/1",
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
          i.itName.includes(this.searchVal) || i.itTel.includes(this.searchVal)
      );
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
        name: "Bargainup",
        params: {
          id: this.currentSelectRow.id,
          itName: this.currentSelectRow.itName,
          itSex: this.currentSelectRow.itSex
        }
      });
    },
    //表格导出
     exportExcel() {
      var fix = document.querySelector(".el-table__fixed");
      var wb;
      if (fix) {
        wb = XLSX.utils.table_to_book(
          document.querySelector('#rebateSetTable').removeChild(fix)
        );
        document.querySelector('#rebateSetTable').appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
      }
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "定金客户管理数据表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    radiochange(row) {
      console.log(`当前: ${row}`);
    },
    Selectchange2(val) {
      console.log(val);
    },
    Selectchange3(val) {
      console.log(val);
    },
    handleClick3(row) {
      console.log(row);
      alert("点击了");
    },
    handleCurrentChange2(val,index) {
        this.currentRow = val;
     },
        getCurrentRow(val){
          console.log(val);
     },
    resetForm() {
      this.formInline.date = "";
      this.formInline.adviser = "";
      this.formInline.follow = "";
    },
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
    },
    rowClick(row, event, column) {
      this.radio = row.index;
      //获取表格数据
      this.currentSelectRow = row;
       this.Potential.id=this.currentSelectRow.id;
       this.Huiyuanqufen.id=this.currentSelectRow.id;
      this.radio = this.tableData.indexOf(row);
    },
     //定金认领跳转
    go(index,row) {
      this.currentSelectRow = row;
      this.$router.push({
        path:"/Customer/bargain/claim",
        query: {
          name: this.currentSelectRow.itName,
          tel: this.currentSelectRow.itTel,
          customercategory:this.Customercategory
        }
      });
    },
    changeInfo() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/bargaintable.scss";
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
    .el-input__inner {
      height: 37px;
    }
    .el-input {
      height: 37px;
    }
  }
  .quanbu2 {
    display: inherit;
    float: left;
    height: 60px;
    margin-left: -70px;
    .search-form2 {
      display: flex;
      margin: 15px 0px auto;
      float: left;
      height: 45px;
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
        margin-top: 3.2%;
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