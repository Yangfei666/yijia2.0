<template>
  <!--潜在表格-->
  <div class="practice-list">
    <el-row>
      <el-form ref="formInline" :model="formInline" class="demo-form-inline" label-width="90px">
        <div class="quanbu">
          <div class="search-form">
            <el-form-item label="登记日期:">
              <el-col :span="24">
                <el-date-picker v-model="formInline.date" value-format="yyyy-MM-dd" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:230px"></el-date-picker>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form">
            <el-form-item label="客户质量:">
              <el-col :span="24">
                <el-select v-model="formInline.quality" placeholder="请选择" style="width:200px" @change="Selectchange">
                  <el-option v-for="item in quality" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form" v-show="isShow && isAdviser">
            <el-form-item label="所属会籍:">
              <el-col :span="24">
                <el-select v-model="formInline.adviser" placeholder="请选择" style="width:100%" @change="Selectchange2">
                  <el-option v-for="item in staff_info" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
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
          <div class="search-form" v-show="isShow">
            <el-form-item label="成交状态:">
              <el-col :span="24">
                <el-select v-model="formInline.cardstatus" placeholder="请选择" style="width:200px" @change="Selectchange">
                  <el-option v-for="item in cardstatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </div>
          <div class="quanbu2">
            <div class="search-form2">
              <el-form-item>
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
        </div>
      </el-form>
    </el-row>
    <div class="practice-center">
      <el-row>
        <el-col :span="12">
          <div class="purple">
            <div class="add">
              <el-button type="text" class="add-p el-icon-plus" @click="dialogFormVisible = true">添加潜在客户</el-button>
              <template>
                <el-dialog title="添加潜在客户" :append-to-body="true" :visible.sync="dialogFormVisible">
                  <Addlatent></Addlatent>
                </el-dialog>
              </template>
            </div>
            <div class="add">
              <el-button type="text" class="add-p" @click="changeInfo">修改资料</el-button>
              <template>
                <el-dialog title="修改资料" :append-to-body="true" :visible.sync="dialogFormVisible2">
                  <Revisedatum :currentSelectRow="currentSelectRow"></Revisedatum>
                </el-dialog>
              </template>
            </div>
            <div class="add">
              <el-button type="text" class="add-p" @click="func()">客户跟进</el-button>
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
          <el-table id="rebateSetTable" ref="singleTable" @current-change="handleCurrentChange2" fixed v-loading="loading" element-loading-text="拼命加载中..." highlight-current-row :default-sort="{order: 'descending'}" :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
            <el-table-column align="center" prop="radio" fixed width="80px">
              <template slot-scope="scope">
                <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="prName" align="left" label="姓名" fixed width="150px"></el-table-column>
            <el-table-column prop="prTel" align="left" label="手机号" width="200px"></el-table-column>
            <el-table-column prop="YGXX_NAME" align="left" label="会籍" width="200px"></el-table-column>
            <el-table-column prop="prDate" align="left" label="登记日期" sortable width="200px"></el-table-column>
            <el-table-column prop="prQuality" align="left" label="质量" width="200px"></el-table-column>
            <el-table-column prop="prSuc" align="left" label="成交状态" width="200px"></el-table-column>
            <el-table-column align="left" label="操作" fixed="right" width="300px">
              <template slot-scope="scope">
                <el-button @click="go(scope.$index, scope.row)" type="text" size="small">认领</el-button>
                <el-button @click.native.prevent="dialogFormVisible6 = true" type="text" size="small">体验</el-button>
                <el-button @click.native.prevent="dialogFormVisible5 = true" type="text" size="small">定金</el-button>
                <el-button type="text" size="small" @click="dialogFormVisible4 = true">办卡</el-button>
                <el-button type="text" size="small" @click="dialogFormVisible3 = true">换会籍</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="换会籍" :append-to-body="true" :visible.sync="dialogFormVisible3">
            <change :potential="Potential"></change>
          </el-dialog>
          <el-dialog title="添加会员" :append-to-body="true" :visible.sync="dialogFormVisible4">
            <Addmember :huiyuanqufen='Huiyuanqufen'></Addmember>
          </el-dialog>
          <el-dialog title="添加定金客户" :append-to-body="true" :visible.sync="dialogFormVisible5">
            <Addbargain :dingjinqufen='Dingjinqufen'></Addbargain>
          </el-dialog>
          <el-dialog title="添加体验客户" :append-to-body="true" :visible.sync="dialogFormVisible6">
            <Addpractice :tiyanqufen='Tiyanqufen'></Addpractice>
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
import Addlatent from "@/components/addlatent";
import Revisedatum from "@/components/revisedatum";
import Change from "@/components/change";
import Addbargain from "@/components/addbargain";
import Addpractice from "@/components/addpractice";
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
  name: "latenttable",
  inject: ["reload"],
  components: {
    Addlatent,
    Revisedatum,
    Change,
    Addmember,
    Addbargain,
    Addpractice
  },
  data() {
    return {
      cardstatus: [
        //成交状态
        { value: "0", label: "已成交" },
        { value: "1", label: "跟进中" }
      ],
      Potential: { potential: "setPotentialCustomer", id: "" },
      loading: true,
      downIcon: true,
      currentSelectRow: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      currentPage: 1,
      pagesize: 10,
      radio: "",
      Tiyanqufen: { tiyanqufen: "potential", id: "" },
      Dingjinqufen: { dingjinqufen: "potential", id: "" },
      Huiyuanqufen: { huiyuanqufen: "potential", id: "" },
      Customercategory: "potential",
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      dialogFormVisible6: false,
      btnText: "展开",
      isShow: false,
      quality: [
        //客户质量
        { value: "1", label: "A" },
        { value: "2", label: "B" },
        { value: "3", label: "C" },
        { value: "4", label: "D" }
      ],
      follow: [
        //多久未跟进
        { value: "1", label: "一周以内" },
        { value: "2", label: "1周到1月" },
        { value: "3", label: "1月到2个月" },
        { value: "4", label: "2个月以上" }
      ],
      formInline: {
        user: "",
        date: "",
        quality: [],
        adviser: [],
        follow: []
      },
      tableData: [],
      tableData2: [],
      staff_info: [],
      searchVal: ""
    };
  },
  created: function() {
    let _this = this;
    this.getTableData(true);
    setTimeout(function() {
      _this.getCustomer();
    }, 1500);
  },
  computed: {
    isAdviser () {
      let user = JSON.parse(sessionStorage.getItem("userInfo"));
      for (let index = 0; index < user.role.length; index++) {
        const element = user.role[index];
        if (element.name == '超级管理员' || element.name == '店长') {
          return true;
        }
      }
      return false;
    }
  },
  watch: {
    searchVal(val) {
      //姓名电话
      if (!val) {
        this.tableData = this.tableData2;
      }
    },
    quality(val) {
      //质量
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
  methods: {
    //获取表格数据
    getTableData(type) {
      let _this = this;
      _this.loading = true;
      let params = {};
      if (!type) {
        params = {
          name: _this.prName, //姓名
          tel: _this.prTel, //电话
          quality: _this.formInline.quality, //质量
          followUpTime: _this.formInline.follow, //多长时间未跟进
          registerTimeStart: _this.formInline.date[0], //登记时间区间--开始
          registerTimeEnd: _this.formInline.date[1], //登记时间区间--结束
          status: _this.formInline.cardstatus //成交状态
        };
      }
      requestLogin(
        "/setPotentialCustomer/searchPotentialCustomers/1/" + _this.formInline.adviser,
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
    search() {
      this.tableData = this.tableData2;
      this.tableData = this.tableData2.filter(
        i =>
          i.prName.includes(this.searchVal) || i.prTel.includes(this.searchVal)
      );
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
    //表格导出
    exportExcel() {
      let config = {
        excelName: "潜在客户管理",
        sheetName: "潜在客户管理",
        limit: "id,prSex,hsid,prBelog,prHealth,RecordTime,WeChat,remark".split(
          ","
        ),
        headTitle: "姓名|电话|质量|成交状态|登记时间|会籍".split("|")
      };
      downloadExcel(config, this.tableData);
    },
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    getCurrentRow(val) {},
    Selectchange(val) {},
    Selectchange2(val) {},
    Selectchange3(val) {},
    radiochange(row) {},
    //重置
    resetForm() {
      this.formInline.quality = "";
      this.formInline.date = "";
      this.formInline.follow = "";
      this.formInline.adviser = "";
    },
    //跟进记录
    func() {
      if (!this.currentSelectRow) {
        this.$message({
          message: "请先选择数据!",
          type: "warning"
        });
        return;
      }
      //跟进跳转
      this.$router.push({
        path: "/Customer/potentialfollowup/memberup",
        query: {
          id: this.currentSelectRow.id,
          prName: this.currentSelectRow.prName,
          prSex: this.currentSelectRow.prSex
        }
      });
    },
    showToggle: function() {
      //表单收起展开
      this.isShow = !this.isShow;
      this.downIcon = !this.downIcon;
      if (this.isShow) {
        this.btnText = "收起";
      } else {
        this.btnText = "展开";
      }
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    rowClick(row, event, column) {
      this.radioData = row.index;
      //获取所需id
      this.currentSelectRow = row;
      this.Potential.id = this.currentSelectRow.id;
      this.Tiyanqufen.id = this.currentSelectRow.id;
      this.Dingjinqufen.id = this.currentSelectRow.id;
      this.Huiyuanqufen.id = this.currentSelectRow.id;
      this.radio = this.tableData.indexOf(row);
    },
    //潜在认领跳转
    go(index, row) {
      this.currentSelectRow = row;
      this.$router.push({
        path: "/Customer/latent/claim",
        query: {
          name: this.currentSelectRow.prName,
          tel: this.currentSelectRow.prTel,
          customercategory: this.Customercategory
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
          line-height: 9px;
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
