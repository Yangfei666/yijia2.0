<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>会所管理</el-breadcrumb-item>
              <el-breadcrumb-item>会员卡管理</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">会员卡管理</span>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <div class="practice-list">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="非通用卡" name="nonuniversal">
          <template>
            <div class="practice-center">
              <el-row>
                <el-col :span="13">
                  <div class="purple">
                    <div class="add">
                      <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">创建会员卡</el-button>
                      <template>
                        <el-dialog title="创建会员卡" :append-to-body="true" :visible.sync="dialogFormVisible">
                          <Foundmembercard :ceshis='ceshi'></Foundmembercard>
                        </el-dialog>
                      </template>
                    </div>
                    <div class="add">
                      <el-button type="text" class="p" @click="changeInfo">编辑会员卡</el-button>
                      <template>
                        <el-dialog title="会员卡信息编辑" :append-to-body="true" :visible.sync="dialogFormVisible2">
                          <Cardedit :currentSelectRow="currentSelectRow" :hides='hide'></Cardedit>
                        </el-dialog>
                      </template>
                    </div> 
                    <div class="add">
                      <el-button type="text" class="p" @click="changeInfo2">会员卡详情</el-button>
                      <template>
                        <el-dialog title="会员卡信息详情" :append-to-body="true" :visible.sync="dialogFormVisible3">
                          <Carddetails :currentSelectRow="currentSelectRow" :hides='hide'></Carddetails>
                        </el-dialog>
                      </template>
                    </div>
                    <div class="add2">
                      <el-button type="text" class="p" @click="delmember">删除会员卡</el-button>
                    </div>
                  </div>
                </el-col>
                <el-col :span="11">
                  <div class="purple2">
                    <el-form ref="form" label-width="90px">
                      <el-col :span="22" class="purple-name">
                        <el-form-item label="卡名称:">
                          <el-col :span="24">
                            <el-input v-model="cardName" placeholder="请输入"></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="2" class="purple-but">
                        <el-form-item label-width="20px">
                          <el-button type="primary" @click="searchName">查询</el-button>
                        </el-form-item>
                      </el-col>
                    </el-form>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="practice-table">
              <el-row>
                <el-col :span="24">
                  <el-table v-loading="loading" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" @row-click="rowClick" fixed style="width: 100%">
                    <el-table-column align="center" prop="radio" fixed width="70px">
                      <template slot-scope="scope">
                       <el-radio class="radio" v-model="radio"  :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column prop="CTName" align="left" fixed label="卡名称" width="150px"></el-table-column>
                    <el-table-column prop="ctType" align="left" label="类型" width="150px"></el-table-column>
                    <el-table-column prop="CTjg" align="left" label="售价" width="150px"></el-table-column>
                    <el-table-column prop="ColorCard" align="left" label="底色" width="150px"></el-table-column>
                    <el-table-column prop="ctIsIsPrivate" align="left" label="团课/私教" width="150px"></el-table-column>
                    <el-table-column prop="CTdate" align="left" label="限制星期" width="250px"></el-table-column>
                    <el-table-column prop="CTxTime_YN" align="left" label="限制时段" width="230px"></el-table-column>
                    <el-table-column prop="CTxDate_YN" align="left" label="周限次数" width="150px"></el-table-column>
                    <el-table-column prop="CTstate" align="left" label="状态" width="150px" fixed="right"></el-table-column>
                  </el-table>
                  <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                    </el-pagination>
                  </div>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane label="通用卡" name="currency"> 
          <template>
            <div class="practice-center">
              <el-row>
                <el-col :span="13">
                  <div class="purple">
                    <div class="add">
                      <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible4 = true">创建会员卡</el-button>
                      <template>
                        <el-dialog title="创建会员卡" :append-to-body="true" :visible.sync="dialogFormVisible4">
                          <Foundmembercard></Foundmembercard>
                        </el-dialog>
                      </template>
                    </div>
                    <div class="add">
                      <el-button type="text" class="p" @click="changeInfo">编辑会员卡</el-button>
                      <template>
                        <el-dialog title="会员卡信息编辑" :append-to-body="true" :visible.sync="dialogFormVisible5">
                          <Cardedit :currentSelectRow="currentSelectRow"  :hides='hide'></Cardedit>
                        </el-dialog>
                      </template>
                    </div>
                    <div class="add">
                      <el-button type="text" class="p" @click="changeInfo2">会员卡详情</el-button>
                      <template>
                        <el-dialog title="会员卡信息详情" :append-to-body="true" :visible.sync="dialogFormVisible6">
                          <Carddetails :currentSelectRow="currentSelectRow" :hides='hide'></Carddetails>
                        </el-dialog>
                      </template>
                    </div>
                    <div class="add2">
                      <el-button type="text" class="p" @click="delmember">删除会员卡</el-button>
                    </div>
                  </div>
                </el-col>
                <el-col :span="11">
                  <div class="purple2">
                    <el-form ref="form" label-width="90px">
                      <el-col :span="22" class="purple-name">
                        <el-form-item label="卡名称:">
                          <el-col :span="24">
                            <el-input v-model="cardName2" placeholder="请输入"></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="2" class="purple-but">
                        <el-form-item label-width="20px">
                          <el-button type="primary" @click="searchName">查询</el-button>
                        </el-form-item>
                      </el-col>
                    </el-form>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="practice-table">
              <el-row>
                <el-col :span="24">
                  <el-table v-loading="loading" ref="singleTable" @current-change="handleCurrentChange2"  element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)" @row-click="rowClick" fixed style="width: 100%">
                    <el-table-column align="center" prop="radio" fixed width="70px">
                      <template slot-scope="scope">
                       <el-radio class="radio" v-model="radio2"  :label="scope.$index" @change.native="getCurrentRow2(scope.$index)">&nbsp;</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column prop="CTName" align="left" fixed label="卡名称" width="150px"></el-table-column>
                    <el-table-column prop="ctType" align="left" label="类型" width="150px"></el-table-column>
                    <el-table-column prop="CTjg" align="left" label="售价" width="150px"></el-table-column>
                    <el-table-column prop="ColorCard" align="left" label="底色" width="150px"></el-table-column>
                    <el-table-column prop="ctIsIsPrivate" align="left" label="团课/私教" width="150px"></el-table-column>
                    <el-table-column prop="CTdate" align="left" label="限制星期" width="250px"></el-table-column>
                    <el-table-column prop="CTxTime_YN" align="left" label="限制时段" width="230px"></el-table-column>
                    <el-table-column prop="CTxDate_YN" align="left" label="周限次数" width="150px"></el-table-column>
                    <el-table-column prop="CTstate" align="left" label="状态" width="150px" fixed="right"></el-table-column>
                  </el-table>
                  <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData2.length">
                    </el-pagination>
                  </div>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import Carddetails from "@/components/carddetails";
import Cardedit from "@/components/cardedit";
import Foundmembercard from "@/components/foundmembercard";
export default {
  name: "membership",
  inject: ["reload"],
  components: {
    Carddetails,
    Cardedit,
    Foundmembercard
  },
  data() {
    return {
      activeName: "nonuniversal",
      loading: true,
      currentSelectRow: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      dialogFormVisible6: false,
      currentPage: 1,
      pagesize: 10,
      radio: true,
      radio2: true,
      sign:"",
      tableData: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      cardName: "",
      cardName2: "",
      ceshi:'hide',
      hide:'yinchang'
    };
  },
  watch: {
    cardName(val) {
      console.log(val);
      if (!val) {
        this.tableData = this.tableData3;
      }
    },
    cardName2(val) {
      console.log(val);
      if (!val) {
        this.tableData2 = this.tableData4;
      }
    }
  },
  created: function() {
    //表格列表数据
    let _this = this;
    _this.loading = true;
    requestLogin("/setCardType", {}, "get")
      .then(function(res) {
        _this.tableData = res.selfCard;
        _this.tableData2 = res.relationCard;
        _this.tableData3 = res.selfCard;
        _this.tableData4 = res.relationCard;
        _this.loading = false;
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
  methods: {
    radiochange(row) {
      console.log(`当前: ${row}`);
    },
    handleClick(tab, event) {
      this.sign=event.target.getAttribute('id');
      if(this.sign=='tab-currency'){
          this.hide='yin';
      }else{
        this.hide='yinchang';
      }
      console.log('当前页:'+this.sign);
    },
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
    },
    //查询表格数据
    searchName() {
      this.tableData = this.tableData3;
      this.tableData2 = this.tableData4;
      this.tableData = this.tableData3.filter(
        i => i.CTName.indexOf(this.cardName) != -1
      );
      this.tableData2 = this.tableData4.filter(
        i => i.CTName.indexOf(this.cardName2) != -1
      );
    },
    rowClick(row, event, column) {
      this.radio = row.index;
      //获取表格数据
      this.currentSelectRow = row;
      console.log(row.index);
      this.radio = this.tableData.indexOf(row);
      this.radio2 = this.tableData2.indexOf(row);
    },
    handleCurrentChange2(val,index) {
        this.currentRow = val;
     },
    getCurrentRow(val){
      console.log(val);
     },
    getCurrentRow2(val){
      console.log(val);
     },
    changeInfo() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    changeInfo2() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible3 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    //删除会员卡
    delmember() {
      let _this = this;
      if (!this.currentSelectRow) {
        this.$message({ message: "请先选择数据!", type: "warning" });
        return;
      }
      this.$confirm("确认删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.loading = true;
          console.log(_this.currentSelectRow.CTID);
          requestLogin(
            "/setCardType/" + _this.currentSelectRow.CTID,
            {},
            "delete"
          ).then(response => {
            _this.loading = false;
            this.$message({ message: "删除成功", type: "success" });
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/membership.scss";
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
    .search {
      width: 261px;
      border: 1px solid #e8e8e8;
      height: 32px;
      margin: 5px 35px auto;
      display: flex;
      border-radius: 16px;
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
        .p {
          color: #00bc71;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 9px;
        }
        .add-p {
          color: #00bc71;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 9px;
        }
      }
      .add2 {
        border: 1px solid #ff2366;
        width: 20%;
        height: 35px;
        border-radius: 4px;
        line-height: 0px;
        margin-top: 20px;
        margin-left: 20px;
        .p {
          color: #ff2366;
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
      justify-content: center;
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
      .purple-name {
        margin-top: 17px;
      }
      .purple-but {
        margin-top: 17px;
        .el-button--primary {
          height: 35px;
          line-height: 11px;
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
    }
  }
}
</style>