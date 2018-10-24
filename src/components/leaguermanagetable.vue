<template>
<!--会员表格-->
    <div class="practice-list">
        <el-row>
            <el-form ref="form" :model="formInline" class="demo-form-inline" label-width="90px">
                <div class="quanbu">
                    <div class="search-form">
                        <el-form-item label="会员卡种:">
                            <el-col :span="24">
                                <el-input v-model="formInline.user" placeholder="请输入" clearable style="width:170px;"></el-input>
                            </el-col>
                        </el-form-item>
                    </div>
                    <div class="search-form">
                        <el-form-item label="到期时间:">
                            <el-col :span="24">
                                <el-date-picker v-model="formInline.date" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:230px"></el-date-picker>
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
                                    <el-select v-model="formInline.region3" placeholder="请选择" style="width:170px">
                                        <el-option label="Angel" value="angel"></el-option>
                                        <el-option label="MeiMei" value="meimei"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                        </div>
                        <div class="search-form" v-show="isShow">
                            <el-form-item label="卡状态:">
                                <el-col :span="24">
                                    <el-select v-model="formInline.region" placeholder="请选择" style="width:230px">
                                        <el-option label="已激活" value="activate"></el-option>
                                        <el-option label="已过期" value="overdue"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                        </div>
                        <div class="search-form" v-show="isShow">
                            <el-form-item label="多久未跟进:">
                                <el-col :span="24">
                                    <el-select v-model="formInline.region2" placeholder="请选择" style="width:210px">
                                        <el-option label="一周" value="aweek"></el-option>
                                        <el-option label="一个月" value="onemonth"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                        </div>
                        <div class="search-form">
                            <el-form-item label-width="40px">
                                <el-col :span="24">
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                                <el-button>重置</el-button>
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
                                    <Addmember></Addmember>
                                </el-dialog>
                            </template>
                        </div>
                        <div class="add">
                            <router-link to="/Customer/memberfollowup" style="text-decoration:none;">
                                <el-button type="text" class="add-b">会员跟进</el-button>
                            </router-link>
                        </div>
                        <div class="add">
                            <router-link to="/Customer/membershiphome" style="text-decoration:none;">
                                <el-button type="text" class="add-b">会员主页</el-button>
                            </router-link>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="purple2">
                        <el-col :span="10" class="search">
                            <input class="search-input" maxlength="18" placeholder="搜索姓名/电话/卡号" />
                            <i class="search-icon el-icon-search"></i>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="practice-table">
            <el-row>
                <el-col :span="24">
                    <el-table id="rebateSetTable" highlight-current-row :default-sort = "{order: 'descending'}" @row-click="rowClick" ref="moviesTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :header-cell-style="{background:'#fafafa'}" style="width: 100%">
                        <el-table-column align="center" prop="radio" fixed width="80px">
                            <template slot-scope="scope">
                                <el-radio-group v-model="radio">
                                    <el-radio :label="scope.$index" @change.native="radiochange(scope.row)">&nbsp;</el-radio>
                                </el-radio-group>
                            </template>
                        </el-table-column>
                        <el-table-column align="left" prop="name" label="姓名" fixed width="150px"></el-table-column>
                        <el-table-column prop="tel" align="left" label="手机号" width="150px"></el-table-column>
                        <el-table-column prop="card" align="left" label="卡号" width="150px"></el-table-column>
                        <el-table-column prop="kz" align="left" label="卡种" width="150px"></el-table-column>
                        <el-table-column prop="kksj" align="left" label="开卡时间" sortable width="150px"></el-table-column>
                        <el-table-column prop="hj" align="left" label="会籍" width="140px"></el-table-column>
                        <el-table-column prop="dqsj" align="left" label="到期时间" sortable width="150px"></el-table-column>
                        <el-table-column prop="sycs" align="left" label="剩余次数" sortable width="130px"></el-table-column>
                        <el-table-column prop="syje" align="left" label="剩余金额" sortable width="130px"></el-table-column>
                        <el-table-column prop="status" align="left" label="卡状态" width="140px"></el-table-column>
                        <el-table-column prop="cz" align="left" label="操作" fixed="right">
                            <template slot-scope="scope">
                                <el-button @click="go" type="text" size="small">认领</el-button>
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
export default {
  name: "leaguermanagetable",
  components: {
    Addmember
  },
  data() {
    return {
      downIcon: true,
      dialogFormVisible: false,
      input10: "",
      value6: "",
      radio: true,
      currentPage: 1,
      pagesize: 10,
      btnText: "展开",
      isShow: false,
      formInline: {
        user: "",
        date: "",
        numsmall: "",
        numbig: "",
        fundsmall: "",
        fundbig: "",
        region: "",
        region2: "",
        region3: ""
      },
      tableData: [
        {
          index:0,
          name: "挖煤",
          tel: "123232323",
          card: "02200200",
          kz: "大众卡",
          kksj: "2018-02-21",
          hj: "Angel",
          dqsj: "2018-07-25",
          sycs: "12",
          syje: "200",
          status: "正常"
        },
        {
          index:1,
          name: "挖煤",
          tel: "123232323",
          card: "02200200",
          kz: "大众卡",
          kksj: "2018-02-21",
          hj: "Angel",
          dqsj: "2018-07-25",
          sycs: "12",
          syje: "200",
          status: "正常"
        },
        {
          index:2,
          name: "挖煤",
          tel: "123232323",
          card: "02200200",
          kz: "大众卡",
          kksj: "2018-02-21",
          hj: "Angel",
          dqsj: "2018-07-25",
          sycs: "12",
          syje: "200",
          status: "正常"
        },
        {
           index:3,
          name: "挖煤",
          tel: "123232323",
          card: "02200200",
          kz: "大众卡",
          kksj: "2018-02-21",
          hj: "Angel",
          dqsj: "2018-07-25",
          sycs: "12",
          syje: "200",
          status: "正常"
        },
        {
            index:4,
          name: "挖煤",
          tel: "123232323",
          card: "02200200",
          kz: "大众卡",
          kksj: "2018-02-21",
          hj: "Angel",
          dqsj: "2018-07-25",
          sycs: "12",
          syje: "200",
          status: "正常"
        },
        {
          index:5,
          name: "挖煤",
          tel: "123232323",
          card: "02200200",
          kz: "大众卡2",
          kksj: "2018-02-10",
          hj: "Angel",
          dqsj: "2018-07-20",
          sycs: "13",
          syje: "210",
          status: "正常"
        },
        {
            index:6,
          name: "挖煤",
          tel: "123232323",
          card: "02200200",
          kz: "大众卡",
          kksj: "2018-02-11",
          hj: "Angel",
          dqsj: "2018-07-25",
          sycs: "12",
          syje: "200",
          status: "正常"
        }
      ]
    };
  },
  methods: {
      //格式化指定列的值
       formatter(row, column) {
        return row.address;
      },
      radiochange(row) {
      console.log(`当前: ${row}`);
    },
    rowClick(row, event, column){
    this.$refs.moviesTable.toggleRowSelection(row);
    this.radio=row.index;
      //获取表格数据
      this.currentSelectRow = row;
      console.log(row.index);
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
    onSubmit() {
      console.log("submit!");
    },
    go() {
      let currentRoute = this.$route.path.split("/")[2];
      if (currentRoute === "leaguer") {
        currentRoute = "leaguer/leaguermanage";
      }
      //认领跳转
      this.$router.push("/Customer/" + currentRoute + "/claim");
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
    exportExcel () {
         var wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'))
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '会员客户管理数据表.xlsx')
         } catch (e) { 
           if (typeof console !== 'undefined')
                console.log(e, wbout) 
            }
         return wbout
     },
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/leaguertable.scss';
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
      .el-button+.el-button{
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
    .export{
        height: 30px;
        margin-top: 3.2%;
        padding: 6px 13px;
        font-size: 14px;
        border: 1px solid #00BC6A;
        color: #00BC6A;
        margin-left: -5%;
      }
    }
  }
}
</style>