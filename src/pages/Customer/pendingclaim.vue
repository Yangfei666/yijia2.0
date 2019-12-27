<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>客户管理</el-breadcrumb-item>
              <el-breadcrumb-item>待认领客户</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">待认领客户</span>
          </el-col>
        </div>
      </el-col>
    </el-row>
     <!--首页选项卡-->
    <div class="main-head">
        <div class="head-one">
        <img class="one-img" src="@/assets/tianjiahuiyuan.png" @click="dialogFormVisible = true" />
        <el-button type="text" class="one-p" @click="dialogFormVisible = true">添加会员</el-button>
        <template>
            <el-dialog title="添加会员" :append-to-body="true" :visible.sync="dialogFormVisible">
            <Addmember :huiyuanqufen='Huiyuanqufen'></Addmember>
            </el-dialog>
        </template>
        </div>
        <div class="border"></div>
        <div class="head-one">
        <img class="one-img" src="@/assets/dingjin.png" @click="dialogFormVisible2 = true" />
        <el-button type="text" class="one-p" @click="dialogFormVisible2 = true">添加定金客户</el-button>
        <template>
            <el-dialog title="添加定金客户" :append-to-body="true" :visible.sync="dialogFormVisible2">
            <Addbargain :dingjinqufen='Dingjinqufen'></Addbargain>
            </el-dialog>
        </template>
        </div>
        <div class="border"></div>
        <div class="head-one">
        <img class="one-img" src="@/assets/tiyan.png" @click="dialogFormVisible3 = true"/>
        <el-button type="text" class="one-p" @click="dialogFormVisible3 = true">添加体验客户</el-button>
        <template>
            <el-dialog title="添加体验客户" :append-to-body="true" :visible.sync="dialogFormVisible3">
            <Addpractice :tiyanqufen='Tiyanqufen'></Addpractice>
            </el-dialog>
        </template>
        </div>
        <div class="border"></div>
        <div class="head-two">
        <img class="two-img" src="@/assets/qianzai.png" @click="dialogFormVisible4 = true"/>
        <el-button type="text" class="two-p" @click="dialogFormVisible4 = true">添加潜在客户</el-button>
        <template>
            <el-dialog title="添加潜在客户" :append-to-body="true" :visible.sync="dialogFormVisible4">
            <Addlatent :qianzaiqufen='Qianzaiqufen'></Addlatent>
            </el-dialog>
        </template>
        </div>
    </div>
    <div class="cardopen">
      <el-row>
        <el-col :span="24">
          <div class="cardopen-head">
            <span class="head-left">待认领客户列表</span>
          </div>
        </el-col>
        <el-col :span="24">
            <el-table fixed v-loading="loading" element-loading-text="拼命加载中..." ref="singleTable" highlight-current-row :header-cell-style="{background:'#fafafa'}" @row-click="rowClick" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                <el-table-column align="center" prop="radio" fixed width="80px">
                <template slot-scope="scope">
                  <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                </template>
              </el-table-column>
                <el-table-column prop="htName" align="left" label="姓名"></el-table-column>
                <el-table-column prop="htTel" align="left" label="电话"></el-table-column>
                <el-table-column prop="htSex" align="left" label="性别"></el-table-column>
                <el-table-column prop="htBirthday" align="left" label="出生日期"></el-table-column>
                <el-table-column prop="htHeight" align="left" label="身高"></el-table-column>
                <el-table-column prop="htWeight" align="left" label="体重"></el-table-column>
            </el-table>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import Addmember from "@/components/addmember";
import Addbargain from "@/components/addbargain";
import Addpractice from "@/components/addpractice";
import Addlatent from "@/components/addlatent";
export default {
  name: "pendingclaim",
  inject: ["reload"],
  components: {
    Addmember,
    Addbargain,
    Addpractice,
    Addlatent
  },
  data() {
    return {
      loading: false,
      tableData: [],
      searchVal: "",
      tableData2: [],
      currentPage: 1,
      pagesize: 10,
      sels: [],
      radio: true,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      Huiyuanqufen: { huiyuanqufen: "newCustomer", id: 1, bh:"", tel:"" ,isAuto: 1},
      Dingjinqufen: { dingjinqufen: "newCustomer", id: 1, bh:"", tel:"" ,isAuto: 1 },
      Tiyanqufen: { tiyanqufen: "newCustomer", id: 1, bh:"", tel:"" ,isAuto: 1 },
      Qianzaiqufen: { bh:"", tel:"" ,isAuto: 1 },
    };
  },
  watch: {
    searchVal(val) {
      //姓名电话卡号
      if (!val) {
        this.tableData = this.tableData2;
      }
    }
  },
  created: function() {
    this.getTableData();
  },
  activated(){
    this.getTableData();
    this.dialogFormVisible = false;
    this.dialogFormVisible2 = false;
    this.dialogFormVisible3 = false;
    this.dialogFormVisible4 = false;
  },
  methods: {
    //获取表格数据
    getTableData() {
      let _this = this;
      _this.loading = true;
      requestLogin("/CustomerFollowUp/getWaitReceiveData", {}, "get")
        .then(function(res) {
          _this.loading = false;
          let {health} = res;
        _this.tableData = health;
        })
        .catch(error => {
          _this.loading = false;
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
    getCurrentRow(val) {},
    search() {
      this.tableData = this.tableData2;
      this.tableData = this.tableData2.filter(
        i =>
          i.HYName.includes(this.searchVal) ||
          i.MotoTel.includes(this.searchVal) ||
          i.CardNO.includes(this.searchVal)
      );
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    rowClick(row, event, column) {
      //获取表格数据
      this.currentSelectRow = row;
      this.radio = this.tableData.indexOf(row);
      this.$refs.singleTable.toggleRowSelection(row);
      this.Huiyuanqufen.bh = this.currentSelectRow.id;
      this.Huiyuanqufen.tel = this.currentSelectRow.htTel;
      this.Dingjinqufen.bh = this.currentSelectRow.id;
      this.Dingjinqufen.tel = this.currentSelectRow.htTel;
      this.Tiyanqufen.bh = this.currentSelectRow.id;
      this.Tiyanqufen.tel = this.currentSelectRow.htTel;
      this.Qianzaiqufen.bh = this.currentSelectRow.id;
      this.Qianzaiqufen.tel = this.currentSelectRow.htTel;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/nav.scss";
.main-head {
  width: 97%;
  margin: 20px auto;
  height: 180px;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  .border {
    width: 1px;
    height: 40%;
    background: #d9d9d9;
    float: right;
    position: relative;
    top: 28%;
    border-radius: 5px;
  }
  .head-one {
    width: 16%;
    height: 100%;
    .one-img {
      width: 80px;
      height: 80px;
      display: initial;
      margin-top: 25px;
    }
    .one-p {
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 25px;
      letter-spacing: 0px;
      color: #8c8c8c;
      text-align: center;
      width: 100%;
    }
    .one-pp {
      font-family: PingFang-SC-Regular;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 15px;
      letter-spacing: 0px;
      color: #8c8c8c;
      text-align: center;
      width: 100%;
    }
    .one-p:hover {
      color: #00bc71;
    }
    .one-pp:hover {
      color: #00bc71;
    }
  }
  .head-one:hover {
    transform: scale(1.1);
  }
  .head-two {
    width: 16%;
    height: 100%;
    .two-img {
      width: 80px;
      height: 80px;
      display: initial;
      margin-top: 25px;
    }
    .two-p {
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 25px;
      letter-spacing: 0px;
      color: #8c8c8c;
      text-align: center;
      width: 100%;
    }
    .two-p:hover {
      color: #00bc71;
    }
  }
  .head-two:hover {
    transform: scale(1.1);
  }
}
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
.cardopen {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .cardopen-head {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-left: 2px solid #00bc71;
    padding-left: 10px;
    margin: 10px auto;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    .head-left {
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      .head-right {
        padding-left: 10px;
        font-size: 14px;
        color: #262626;
      }
    }
    .search {
      width: 22%;
      border: 1px solid #e8e8e8;
      height: 30px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-radius: 16px;
      line-height: 30px;
      margin-right: 15px;
      .search-input {
        width: 100%;
        border-radius: 14px;
        border: none;
        text-indent: 10px;
        color: #8c8c8c;
        font-size: 14px;
        opacity: 1;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
    }
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
@media screen and (min-width: 768px)and (max-width: 992px){
  .search {
      width: 30% !important;
      border: 1px solid #e8e8e8;
      height: 30px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-radius: 16px;
      line-height: 30px;
      margin-right: 15px;
      .search-input {
        width: 100%;
        border-radius: 14px;
        border: none;
        text-indent: 10px;
        color: #8c8c8c;
        font-size: 14px;
        opacity: 1;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
    }
}
@media screen and (min-width: 992px)and (max-width: 1280px){
  .search {
      width: 30% !important;
      border: 1px solid #e8e8e8;
      height: 30px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-radius: 16px;
      line-height: 30px;
      margin-right: 15px;
      .search-input {
        width: 100%;
        border-radius: 14px;
        border: none;
        text-indent: 10px;
        color: #8c8c8c;
        font-size: 14px;
        opacity: 1;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
    }
}
@media screen and (min-width: 1280px)and (max-width: 1440px){
  .search {
      width: 26% !important;
      border: 1px solid #e8e8e8;
      height: 30px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-radius: 16px;
      line-height: 30px;
      margin-right: 15px;
      .search-input {
        width: 100%;
        border-radius: 14px;
        border: none;
        text-indent: 10px;
        color: #8c8c8c;
        font-size: 14px;
        opacity: 1;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
    }
}
@media screen and (min-width: 1440px)and (max-width: 1680px){
  .search {
      width: 26% !important;
      border: 1px solid #e8e8e8;
      height: 30px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-radius: 16px;
      line-height: 30px;
      margin-right: 15px;
      .search-input {
        width: 100%;
        border-radius: 14px;
        border: none;
        text-indent: 10px;
        color: #8c8c8c;
        font-size: 14px;
        opacity: 1;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
    }
}
@media screen and (min-width: 1680px)and (max-width: 1920px){
  .search {
      width: 22% !important;
      border: 1px solid #e8e8e8;
      height: 30px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-radius: 16px;
      line-height: 30px;
      margin-right: 15px;
      .search-input {
        width: 100%;
        border-radius: 14px;
        border: none;
        text-indent: 10px;
        color: #8c8c8c;
        font-size: 14px;
        opacity: 1;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
    }
}
@media screen and (min-width: 1920px)and (max-width: 2048px){
  .search {
      width: 22% !important;
      border: 1px solid #e8e8e8;
      height: 30px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-radius: 16px;
      line-height: 30px;
      margin-right: 15px;
      .search-input {
        width: 100%;
        border-radius: 14px;
        border: none;
        text-indent: 10px;
        color: #8c8c8c;
        font-size: 14px;
        opacity: 1;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
    }
}
</style>
