<template>
     <!--定金表格-->
     <div class="practice-list">
            <el-row>
                <el-form ref="form" :model="formInline" class="demo-form-inline" label-width="90px">
                    <div class="quanbu">
                        <div class="search-form">
                            <el-form-item label="登记日期:">
                                <el-col :span="24">
                                    <el-date-picker v-model="formInline.date" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:230px"></el-date-picker>
                                </el-col>
                            </el-form-item>
                        </div>
                        <div class="search-form">
                            <el-form-item label="所属会籍:">
                                <el-col :span="24">
                                    <el-select v-model="formInline.region3" placeholder="请选择" style="width:170px">
                                        <el-option label="Angel" value="angel"></el-option>
                                        <el-option label="MeiMei" value="meimei"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                        </div>
                        <div class="search-form">
                            <el-form-item label="多久未跟进:" label-width="100px">
                                <el-col :span="24">
                                    <el-select v-model="formInline.region2" placeholder="请选择" style="width:200px">
                                        <el-option label="一周" value="aweek"></el-option>
                                        <el-option label="一个月" value="onemonth"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                        </div>
                        <div class="search-form">
                            <el-form-item label-width="40px">
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                                <el-button>重置</el-button>
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
                                        <Addbargain></Addbargain>
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
                                <router-link to="/Customer/depositfollowup" style="text-decoration:none;">
                                    <el-button type="text" class="add-p">客户跟进</el-button>
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
            <router-view></router-view>
            <div class="practice-table">
                <el-row>
                    <el-col :span="24">
                        <el-table style="width: 100%" :default-sort = "{order: 'descending'}" highlight-current-row  :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" @row-click="rowClick" max-height="700">
                            <el-table-column align="center" prop="radio" fixed width="70px">
                                <template slot-scope="scope">
                                   <el-radio-group v-model="radio">
                                      <el-radio :label="scope.$index" @change.native="radiochange(scope.row)">&nbsp;</el-radio>
                                  </el-radio-group>
                                </template>
                            </el-table-column>
                            <el-table-column align="left" prop="name" label="姓名" fixed width="150px"></el-table-column>
                            <el-table-column prop="tel" align="left" label="手机号" width="150px"></el-table-column>
                            <el-table-column prop="hj" align="left" label="会籍" width="150px"></el-table-column>
                            <el-table-column prop="djrq" align="left" label="登记日期" sortable width="150px"></el-table-column>
                            <el-table-column prop="fkfs" align="left" label="付款方式" width="150px"></el-table-column>
                            <el-table-column prop="je" align="left" label="金额" sortable width="150px"></el-table-column>
                            <el-table-column prop="cjzt" align="left" label="成交状态" width="150px"></el-table-column>
                            <el-table-column prop="desc" align="left" label="备注" width="150px"></el-table-column>
                            <el-table-column prop="cz" align="left" label="操作" fixed="right" width="280px">
                                <template slot-scope="scope">
                                    <el-button @click="go" type="text" size="small">认领</el-button>
                                    <el-button @click.native.prevent="handleClick3(scope.row)" type="text" size="small">补交尾款</el-button>
                                    <el-button @click="dialogFormVisible4 = true" type="text" size="small">放弃定金</el-button>
                                    <template>
                                        <el-dialog title="放弃定金" :append-to-body="true" :visible.sync="dialogFormVisible4">
                                            <Givedeposit></Givedeposit>
                                        </el-dialog>
                                    </template>
                                    <el-button type="text" size="small" @click="dialogFormVisible3 = true">换会籍</el-button>
                                    <template>
                                        <el-dialog title="换会籍" :append-to-body="true" :visible.sync="dialogFormVisible3">
                                            <Change></Change>
                                        </el-dialog>
                                    </template>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                          <el-button size="small" class="export">导出</el-button>
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
import Revisedatum2 from "@/components/revisedatum2";
import Change from "@/components/change";
import Givedeposit from "@/components/givedeposit";
export default {
  name:'bargaintable',
  components: {
    Addbargain,
    Revisedatum2,
    Change,
    Givedeposit
  },
  data() {
    return {
      currentSelectRow: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      input10: "",
      value6: "",
      currentPage: 1,
      pagesize: 10,
      radio:true,
      formInline: {
        user: "",
        date: "",
        region: "",
        region2: "",
        region3: ""
      },
      tableData: [
        {
          index:0,
          name: "凌凌漆",
          tel: "123232323",
          hj: "Angel",
          djrq: "2018-07-25",
          fkfs: "到店支付",
          je: "2000.00",
          sex: '女',
          cjzt: "跟进中",
          wechat: "13456wechat",
          desc: "备注内容..."
        },
        {
          index:1,
          name: "凌凌漆",
          tel: "123232323",
          hj: "Angel",
          djrq: "2018-07-25",
          fkfs: "到店支付",
          je: "2000.00",
          sex: '女',
          cjzt: "跟进中",
          wechat: "13456wechat",
          desc: "备注内容..."
        },
        {
          index:2,
          name: "凌凌漆",
          tel: "123232323",
          hj: "Angel",
          djrq: "2018-07-25",
          fkfs: "到店支付",
          je: "2000.00",
          sex: '女',
          cjzt: "跟进中",
          wechat: "13456wechat",
          desc: "备注内容..."
        },
        {
          index:3,
          name: "凌凌漆",
          tel: "123232323",
          hj: "Angel",
          djrq: "2018-07-25",
          fkfs: "到店支付",
          je: "2000.00",
          sex: '女',
          cjzt: "跟进中",
          wechat: "13456wechat",
          desc: "备注内容..."
        },
        {
          index:4,
          name: "凌凌漆",
          tel: "123232323",
          hj: "Angel",
          djrq: "2018-07-25",
          fkfs: "到店支付",
          je: "2000.00",
          sex: '女',
          cjzt: "跟进中",
          wechat: "13456wechat",
          desc: "备注内容..."
        },
        {
          index:5,
          name: "凌凌漆",
          tel: "123232323",
          hj: "Angel",
          djrq: "2018-07-25",
          fkfs: "到店支付",
          je: "2000.00",
          sex: '女',
          cjzt: "跟进中",
          wechat: "13456wechat",
          desc: "备注内容..."
        },
        {
          index:6,
          name: "凌凌漆",
          tel: "123232323",
          hj: "Angel",
          djrq: "2018-07-25",
          fkfs: "到店支付",
          je: "2000.00",
          sex: '女',
          cjzt: "跟进中",
          wechat: "13456wechat",
          desc: "备注内容..."
        }
      ]
    };
  },
  methods: {
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
    onSubmit() {
      console.log("submit!");
    },
    rowClick(row, event, column) {
       this.radio=row.index;
      //获取表格数据
      this.currentSelectRow = row;
      console.log(row.index);
      // if(row.radio == true){
      //   this.radio = true;
      // }else{
      //   this.radio = false;
      // }
    },
    go() {
      let currentRoute =this.$route.path === "/Customer/bargain/bargaintable" ? "bargain" : "latent";
      console.log(currentRoute);
      //认领跳转
      this.$router.push("/Customer/" + currentRoute + "/claim");
    },
    changeInfo() {
      //先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$alert("请先选择列表", "提示信息", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `请先选择列表`
            });
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/bargaintable.scss';
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
      .el-button+.el-button{
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
      .el-button+.el-button{
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