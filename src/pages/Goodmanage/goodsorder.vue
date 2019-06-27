<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="practice-main">
                    <el-col :span="23" class="breadcrumb">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                            <el-breadcrumb-item>商品订单</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="23" class="weber">
                        <span class="weber-span" v-if="this.cur==0">待结算</span>
                        <span class="weber-span" v-if="this.cur==1">待取货</span>
                        <span class="weber-span" v-if="this.cur==2">已完成</span>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <div class="practice-list">
            <div class="practice-center">
                <el-row>
                    <el-col :span="24">
                        <div class="purple">
                            <div class="add" :class="(cur===0)?'active':''">
                                <el-button type="text" class="p" @click="cur=0">待结算</el-button>
                            </div>
                            <div class="add" :class="(cur===1)?'active':''">
                                <el-button type="text" class="p" @click="cur=1">待取货</el-button>
                            </div>
                            <div class="add" :class="(cur===2)?'active':''">
                                <el-button type="text" class="p" @click="cur=2">已完成</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <!--待结算-->
            <div style="height:100%" v-show="cur==0">
            <div v-if="this.goodsorder.length > 0">
            <div v-for="(item,index) in goodsorder" :key="index">
            <div class="practice-table">
                <el-row>
                    <el-col :span="24">
                        <div class="table-name">
                            <div class="name-span">
                            <b class="span1">客户类型：<span>{{item.customer}}</span></b>
                            <b class="span1">客户姓名：<span>{{item.name}}</span></b>
                            <b class="span1">会籍顾问：<span>{{item.YGXX_NAME}}</span></b>
                            </div>
                            <div class="name-span2">
                              <el-button type="text" class="p" @click="Cancelorder(item)">取消订单</el-button>
                            </div>
                        </div>
                        <el-table ref="singleTable" :data="item.data" border @selection-change="handleSelectionChange" @current-change="handleCurrentChange2" highlight-current-row :header-cell-style="{background:'#fafafa'}" style="width: 100%" @row-click="rowClick">
                            <el-table-column type="index" width="50" align="center"></el-table-column>
                            <el-table-column prop="name" align="center" label="名称"></el-table-column>
                            <el-table-column prop="sellPrice" align="center" label="单价"></el-table-column>
                            <el-table-column align="center" label="数量">
                                <template slot-scope="scope">
                                <div style="height: 40px;">
                                <el-input-number v-model="scope.row.num" :disabled="true"></el-input-number>
                                </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xiaoji" align="center" label="小计">
                                <template slot-scope="scope">
                                    <div>{{scope.row.sellPrice*scope.row.num |formatMoney}}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block2">
                            <div class="block-right1">
                                <span>总计：</span>
                                <span>商品总价：{{moneyTotal(item.data) | formatMoney}} 元</span>
                                <span>总数量：{{Totalnum(item.data)}}</span>
                            </div>
                            <div class="block-right2">
                                <div>优惠金额：</div>
                                <el-input v-model.trim="item.privilegeprice" placeholder="请输入" maxlength="10"></el-input>
                            </div>
                            <div class="block-right3">
                                <span>实际付款：{{moneyTotal(item.data) -(item.privilegeprice==undefined?0:item.privilegeprice) | formatMoney}} 元</span>
                            </div>
                        </div>
                        <div class="block">
                            <div class="block-right">
                               <div>
                                <span>支付方式：</span>
                                <el-radio-group v-model="item.mode">
                                  <el-radio :label="1">微信</el-radio>
                                  <el-radio :label="2">支付宝</el-radio>
                                  <el-radio :label="3">现金</el-radio>
                                  <el-radio :label="4">银行卡</el-radio>
                                  <el-radio :label="5">信用卡</el-radio>
                                  <el-radio :label="6">手机银行转账</el-radio>
                                  <el-radio :label="7">储值卡</el-radio>
                                </el-radio-group>
                                </div>
                                <div class="btn">
                                <el-button type="text" class="p" @click="Settlement(item)">确认购买</el-button>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            </div>
            </div>
            <div  v-else>
              <p style="height:50px;">暂无待结算商品数据~</p>
            </div>
            </div>
            <!--待取货-->
            <div style="height:100%" v-show="cur==1">
            <div v-if="this.ListByPick.length > 0">
            <div v-for="(item,index) in ListByPick" :key="index">
            <div class="practice-table">
                <el-row>
                    <el-col :span="24">
                        <div class="table-name">
                            <div class="name-span">
                            <b class="span1">客户类型：<span>{{item.customer}}</span></b>
                            <b class="span1">客户姓名：<span>{{item.name}}</span></b>
                            <b class="span1">会籍顾问：<span>{{item.YGXX_NAME}}</span></b>
                            </div>
                        </div>
                        <el-table ref="singleTable" :data="item.data" border @selection-change="handleSelectionChange" @current-change="handleCurrentChange2" highlight-current-row :header-cell-style="{background:'#fafafa'}" style="width: 100%" @row-click="rowClick">
                            <el-table-column type="index" width="50" align="center"></el-table-column>
                            <el-table-column prop="name" align="center" label="名称"></el-table-column>
                            <el-table-column prop="sellPrice" align="center" label="单价"></el-table-column>
                            <el-table-column align="center" label="数量">
                                <template slot-scope="scope">
                                <div style="height: 40px;">
                                <el-input-number v-model="scope.row.num" :disabled="true"></el-input-number>
                                </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xiaoji" align="center" label="小计">
                                <template slot-scope="scope">
                                    <div>{{scope.row.sellPrice*scope.row.num | formatMoney}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="success" plain @click="pickupgoods(scope.$index, scope.row)">取货</el-button> 
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <div class="block-right4">
                                  <span>优惠金额：{{item.discount}} 元</span>
                                  <span style="margin-left:50px;">总计：{{item.totalPrice}} 元</span>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            </div>
            </div>
            <div v-else>
              <p style="height:50px;">暂无待取货商品数据~</p>
            </div>
            </div>
            <!--已完成-->
             <div style="height:100%" v-show="cur==2">
               <div v-if="this.orderList.length > 0">
                 <div v-for="(item,index) in orderList" :key="index" @click="getDataId(item.oid)" v-show="index<num">
                  <div class="practice-table">
                      <el-row>
                          <el-col :span="24">
                              <div class="table-name">
                                  <div class="name-span">
                                  <b class="span1">客户类型：<span>{{item.customer}}</span></b>
                                  <b class="span1">客户姓名：<span>{{item.name}}</span></b>
                                  <b class="span1">会籍顾问：<span>{{item.YGXX_NAME}}</span></b>
                                  </div>
                              </div>
                              <table class="table">
                                <thead class="thead-default">
                                  <tr>
                                    <th>#</th>
                                    <th>名称</th>
                                    <th>单价</th>
                                    <th>数量</th>
                                    <th>小计</th>
                                    <th>交易状态</th>
                                    <th v-show="item.status == '已完成'">操作</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{{index+1}}</td>
                                    <td>{{item.lname}}</td>
                                    <td>{{item.sellPrice}}</td>
                                    <td>{{item.num}}</td>
                                    <td>{{item.sellPrice * item.num  | formatMoney}}</td>
                                    <td v-show="item.status == '已取消'"><span style="color:red;">{{item.status}}</span></td>
                                    <td v-show="item.status == '已完成'"><span style="color:green;">{{item.status}}</span></td>
                                    <td v-show="item.status == '已退货'"><span style="color:#00bc71;">{{item.status}}</span></td>
                                    <td v-show="item.status == '已完成'"><button type="text" class="btn" @click="goodsrejected(item.oid)">退货</button></td>
                                  </tr>
                                </tbody>
                              </table>
                              <div class="block">
                                <div class="block-right4">
                                  <span>优惠金额：{{item.discount}} 元</span>
                                  <span style="margin-left:50px;">总计：{{item.totalPrice}} 元</span>
                                </div>
                            </div>
                          </el-col>
                      </el-row>
                  </div>
                  </div>
               </div>
               <div  v-else>
                <p style="height:50px;">暂无已完成商品数据~</p>
               </div>
               <div class="control" :class="{'show-more' : showMore}">
                <el-button type="text" style="width: 7%;border: 1px solid #ccc;" @click="showMore" v-if="this.orderList != '' && this.orderList.length > 10">{{txt}}</el-button>
            </div>
             </div>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
export default {
  inject: ["reload"],
  name: "goodsorder",
  data() {
    return {
      formLabelWidth: "130px",
      currentSelectRow: "",
      privilegeprice:0,
      mode:"",
      dialogFormVisible:false,
      dialogTableVisible: false,
      radio: true,
      currentPage: 1,
      pagesize: 10,
      disabled:false,
      addclien:{},
      multipleSelection: [],
      tableData: [],
      nums:[],
      sels:[],
      cur:0,
      txt: '显示更多',
      num: 10,
      isShow: true,
      goodsorder:[],
      ListByPick:[],
      orderList:[]
    };
  },
  filters: {//局部过滤器 单价
        formatMoney: function (value) {
            return "￥ " + value.toFixed(2);//保留两位小数
        }
    },
  // 通过computed计算属性及时改变
 computed: {
     //总价
      moneyTotal(){
        return function (goods) {                
            let totalCost = 0;
            for(var index in goods){
                let single = goods[index];
                totalCost += single.sellPrice * single.num;
            }
            return totalCost;
        }
      },
    //总数
      Totalnum(){
        return function (goods) {                
            let numbertotal = 0;
            for(var index in goods){
                let single = goods[index];
                numbertotal += single.num;
            }
            return numbertotal;
        }
      },
    },
    created(){
        this.getgoodsorder();
        this.getListByPick();
        this.getorderList();
    },
  methods: {
    //待结算
      getgoodsorder() {
          let _this = this;
       requestLogin("/setGoodsList/orderListToPay", {}, "get")
        .then(function(res) {
          _this.goodsorder = res;
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
    //待取货
    getListByPick() {
          let _this = this;
       requestLogin("/setGoodsList/orderListByPick", {}, "get")
        .then(function(res) {
          _this.ListByPick = res;
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
    //已完成
    getorderList() {
          let _this = this;
       requestLogin("/setGoodsList/orderList", {}, "get")
        .then(function(res) {
          _this.orderList = res;
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
   // 点击发生的变化
   handleSelectionChange(val) {
      this.multipleSelection = val; //给定义的数组赋值
    },
    //取消订单
    Cancelorder(goods){
      this.$confirm("确认提交吗？", "提示").then(() => {
            for(var i=0;i<goods.data.length;i++){
            this.sels.push(goods.data[i].oid);
            }  
            let canceparams ={
              oid:this.sels,
            }
            requestLogin("/setGoodsList/cancleOrder", canceparams, "post")
              .then(data => {
                 this.$message({
                  type: 'success',
                  message: '提交成功'
                   });
                   this.getgoodsorder();
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
    getDataId(oid) {
    },
    //退货
    goodsrejected(oid){
      this.$confirm("确认提交吗？", "提示").then(() => {
            requestLogin("/setGoodsList/returnOrder/"+oid, {}, "get")
              .then(data => {
                 this.$message({
                  type: 'success',
                  message: '退货成功'
                   });
                   this.getorderList();
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
    //取货
    pickupgoods(index,row){
      this.$confirm("确认提交吗？", "提示").then(() => {
            requestLogin("/setGoodsList/claimOrder/"+row.oid,{}, "get")
              .then(data => {
                 this.$message({
                  type: 'success',
                  message: '取货成功'
                   });
                   this.getListByPick();
                   this.getorderList();
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
    //确认购买
    Settlement(goods) {
       for(var i=0;i<goods.data.length;i++){
            this.nums.push(goods.data[i].num);
            this.sels.push(goods.data[i].oid);
        }  
        if(goods.mode == undefined || goods.privilegeprice == undefined){
          this.$message({
            type: 'warning',
            message: '您还没有选择付款方式和输入优惠金额！'
              });
        }else{
          this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              sign:goods.sign,
              oid: this.sels,
              payment:goods.mode,
              discount:goods.privilegeprice
            };
            requestLogin("/setGoodsList/balanceOrder", loginParams, "post")
              .then(data => {
                 this.$message({
                  type: 'success',
                  message: '提交成功'
                   });
                   this.getgoodsorder();
              })
              .catch(error => {
                this.sels = [];
                this.nums = [];
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
        }
    },
    rowClick(row, event, column) {
      this.radio = row.index;
      //获取表格数据
      this.currentSelectRow = row;
      this.radio = this.tableData.indexOf(row);
    },
     showMore(){
        this.isShow = !this.isShow;
        this.num = this.isShow? 10: this.orderList.length;
        this.txt = this.isShow?  '显示更多':'收起';
      },
    rowClick2(row, event, column) {
      this.radio = row.index;
      this.currentSelectRow = row;
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
.show-more {
      margin-bottom: 20px;
      background: none;
  }
.active{
      background-color: #F0F6F2;
  }
.table{
    margin: 0 auto;
    border: 1px solid #ebebeb;
    width: 98%;
    margin-bottom: 10px;
    text-align: center;
    line-height: 45px;
    }
.table .thead-default{
    background-color: rgb(250, 250, 250);
}
.table tbody{
    background: #fff;
}
.table tbody tr td .btn{
    background: #00bc71;
    color: #fff;
    height: 32px;
    width: 65px;
    border-radius: 5px;
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
.practice-list {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .practice-center {
    height: 80px;
    .purple {
      height: 80px;
      display: flex;
      justify-content: flex-start;
      .add {
        border: 1px solid #00bc71;
        width: 12%;
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
        width: 15%;
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
        .add-p {
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
  }
  .practice-table {
      border: 2px solid #ebebeb;
      width: 97%;
      margin: 0 auto;
      margin-bottom: 20px;
    .el-button--text {
      color: #fff;
      line-height: 10px;
    }
    .block {
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        .block-right{
            width: 95%;
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            span{
                line-height: 50px;
            }
        .btn{
            width: 100px;
            border: 1px solid;
            height: 35px;
            border-radius: 6px;
            margin-top: 7px;
            background: #00bc71;
            color: #fff;
          }
        }
        .block-right4{
            width: 95%;
            display: flex;
            justify-content:flex-start;
            margin: 0 auto;
            span{
                line-height: 50px;
            }
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .block2 {
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        display: flex;
        justify-content: flex-start;
        .block-right1{
          line-height: 50px;
          span{
            margin-left: 30px;
          }
        }
        .block-right2{
            display: -webkit-box;
            line-height: 50px;
            margin-left: 50px;
        }
        .block-right3{
            line-height: 50px;
            margin-left: 50px;
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .table-name{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ebebeb;
        margin-bottom: 10px;
        text-align: left;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        .name-span{
            .span1{
              margin-left: 13px;
              span{
                  color: #00bc71;
              }
            }
        }
       .name-span2{
            border: 1px solid #ff2366;
            width: 8%;
            height: 32px;
            border-radius: 4px;
            line-height: 0px;
            margin-top: 8px;
            text-align: center;
            margin-right: 12px;
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
  }
}
@media screen and (min-width: 768px)and (max-width: 992px){
    .practice-table {
      border: 2px solid #ebebeb;
      width: 97%;
      margin: 0 auto;
      margin-bottom: 20px;
    .el-button--text {
      color: #fff;
      line-height: 10px;
    }
    .el-input-number{
      width: 125px !important;
    }
    .block {
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        .block-right{
            width: 97% !important;
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            .el-radio+.el-radio {
                  margin-left: 0px;
              }
              .el-radio-group{
                width: 266px !important; 
              }
            span{
                line-height: 50px;
            }
        .btn{
            width: 81px !important;
            border: 1px solid;
            height: 35px;
            border-radius: 6px;
            margin-top: 7px;
            background: #00bc71;
            color: #fff;
          }
        }
        .block-right4{
            width: 95%;
            display: flex;
            justify-content:flex-start;
            margin: 0 auto;
            span{
                line-height: 50px;
            }
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .block2 {
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        display: flex;
        justify-content: flex-start;
        .block-right1{
          line-height: 50px;
          span{
            margin-left: 10px !important;
            font-size: 14px !important;
          }
        }
        .block-right2{
            display: -webkit-box;
            line-height: 50px;
            margin-left: 16px !important;
            font-size: 14px !important;
            .el-input{
              width: 80px !important;
            }
        }
        .block-right3{
            line-height: 50px;
            margin-left: 10px !important;
            font-size: 14px !important;
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .table-name{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ebebeb;
        margin-bottom: 10px;
        text-align: left;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        .name-span{
            .span1{
              margin-left: 13px;
              span{
                  color: #00bc71;
              }
            }
        }
       .name-span2{
            border: 1px solid #ff2366;
            width: 13% !important;
            height: 32px;
            border-radius: 4px;
            line-height: 0px;
            margin-top: 8px;
            text-align: center;
            margin-right: 12px;
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
  }
}
@media screen and (min-width: 992px)and (max-width: 1280px){
    .practice-table {
      border: 2px solid #ebebeb;
      width: 97%;
      margin: 0 auto;
      margin-bottom: 20px;
    .el-button--text {
      color: #fff;
      line-height: 10px;
    }
    .el-input-number{
      width: 150px !important;
    }
    .block {
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        .block-right{
            width: 95% !important;
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            .el-radio+.el-radio {
                  margin-left: 10px !important;
              }
              .el-radio-group{
                width: 545px !important; 
              }
            span{
                line-height: 50px;
            }
        .btn{
            width: 90px !important;
            border: 1px solid;
            height: 35px;
            border-radius: 6px;
            margin-top: 7px;
            background: #00bc71;
            color: #fff;
          }
        }
        .block-right4{
            width: 95%;
            display: flex;
            justify-content:flex-start;
            margin: 0 auto;
            span{
                line-height: 50px;
            }
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .block2 {
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        display: flex;
        justify-content: flex-start;
        .block-right1{
          line-height: 50px;
          span{
            margin-left: 20px !important;
            font-size: 14px !important;
          }
        }
        .block-right2{
            display: -webkit-box;
            line-height: 50px;
            margin-left: 22px !important;
            font-size: 14px !important;
            .el-input{
              width: 130px !important;
            }
        }
        .block-right3{
            line-height: 50px;
            margin-left: 20px !important;
            font-size: 14px !important;
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .table-name{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ebebeb;
        margin-bottom: 10px;
        text-align: left;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        .name-span{
            .span1{
              margin-left: 13px;
              span{
                  color: #00bc71;
              }
            }
        }
       .name-span2{
            border: 1px solid #ff2366;
            width: 13% !important;
            height: 32px;
            border-radius: 4px;
            line-height: 0px;
            margin-top: 8px;
            text-align: center;
            margin-right: 12px;
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
  }
}
@media screen and (min-width: 1280px)and (max-width: 1440px){
    .practice-table {
      border: 2px solid #ebebeb;
      width: 97%;
      margin: 0 auto;
      margin-bottom: 20px;
    .el-button--text {
      color: #fff;
      line-height: 10px;
    }
    .el-input-number{
      width: 165px !important;
    }
    .block {
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        .block-right{
            width: 95% !important;
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            .el-radio+.el-radio {
                  margin-left: 20px !important;
              }
              .el-radio-group{
                width: 625px !important; 
              }
            span{
                line-height: 50px;
            }
        .btn{
            width: 100px !important;
            border: 1px solid;
            height: 35px;
            border-radius: 6px;
            margin-top: 7px;
            background: #00bc71;
            color: #fff;
          }
        }
        .block-right4{
            width: 95%;
            display: flex;
            justify-content:flex-start;
            margin: 0 auto;
            span{
                line-height: 50px;
            }
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .block2 {
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        display: flex;
        justify-content: flex-start;
        .block-right1{
          line-height: 50px;
          span{
            margin-left: 25px !important;
            font-size: 16px !important;
          }
        }
        .block-right2{
            display: -webkit-box;
            line-height: 50px;
            margin-left: 30px !important;
            font-size: 16px !important;
            .el-input{
              width: 150px !important;
            }
        }
        .block-right3{
            line-height: 50px;
            margin-left: 30px !important;
            font-size: 16px !important;
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .table-name{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ebebeb;
        margin-bottom: 10px;
        text-align: left;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        .name-span{
            .span1{
              margin-left: 13px;
              span{
                  color: #00bc71;
              }
            }
        }
       .name-span2{
            border: 1px solid #ff2366;
            width: 10% !important;
            height: 32px;
            border-radius: 4px;
            line-height: 0px;
            margin-top: 8px;
            text-align: center;
            margin-right: 12px;
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
  }
}
@media screen and (min-width: 1440px)and (max-width: 1680px){
    .practice-table {
      border: 2px solid #ebebeb;
      width: 97%;
      margin: 0 auto;
      margin-bottom: 20px;
    .el-button--text {
      color: #fff;
      line-height: 10px;
    }
    .el-input-number{
      width: 170px !important;
    }
    .block {
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        .block-right{
            width: 95% !important;
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            .el-radio+.el-radio {
                  margin-left: 30px !important;
              }
              .el-radio-group{
                width: 720px !important; 
              }
            span{
                line-height: 50px;
            }
        .btn{
            width: 100px !important;
            border: 1px solid;
            height: 35px;
            border-radius: 6px;
            margin-top: 7px;
            background: #00bc71;
            color: #fff;
          }
        }
        .block-right4{
            width: 95%;
            display: flex;
            justify-content:flex-start;
            margin: 0 auto;
            span{
                line-height: 50px;
            }
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .block2 {
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        display: flex;
        justify-content: flex-start;
        .block-right1{
          line-height: 50px;
          span{
            margin-left: 25px !important;
            font-size: 16px !important;
          }
        }
        .block-right2{
            display: -webkit-box;
            line-height: 50px;
            margin-left: 30px !important;
            font-size: 16px !important;
            .el-input{
              width: 190px !important;
            }
        }
        .block-right3{
            line-height: 50px;
            margin-left: 30px !important;
            font-size: 16px !important;
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .table-name{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ebebeb;
        margin-bottom: 10px;
        text-align: left;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        .name-span{
            .span1{
              margin-left: 13px;
              span{
                  color: #00bc71;
              }
            }
        }
       .name-span2{
            border: 1px solid #ff2366;
            width: 10% !important;
            height: 32px;
            border-radius: 4px;
            line-height: 0px;
            margin-top: 8px;
            text-align: center;
            margin-right: 12px;
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
  }
}
@media screen and (min-width: 1680px)and (max-width: 1920px){
    .practice-table {
      border: 2px solid #ebebeb;
      width: 97%;
      margin: 0 auto;
      margin-bottom: 20px;
    .el-button--text {
      color: #fff;
      line-height: 10px;
    }
    .el-input-number{
      width: 170px !important;
    }
    .block {
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        .block-right{
            width: 95% !important;
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            .el-radio+.el-radio {
                  margin-left: 30px !important;
              }
              .el-radio-group{
                width: 740px !important; 
              }
            span{
                line-height: 50px;
            }
        .btn{
            width: 100px !important;
            border: 1px solid;
            height: 35px;
            border-radius: 6px;
            margin-top: 7px;
            background: #00bc71;
            color: #fff;
          }
        }
        .block-right4{
            width: 95%;
            display: flex;
            justify-content:flex-start;
            margin: 0 auto;
            span{
                line-height: 50px;
            }
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .block2 {
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        display: flex;
        justify-content: flex-start;
        .block-right1{
          line-height: 50px;
          span{
            margin-left: 25px !important;
            font-size: 16px !important;
          }
        }
        .block-right2{
            display: -webkit-box;
            line-height: 50px;
            margin-left: 30px !important;
            font-size: 16px !important;
            .el-input{
              width: 190px !important;
            }
        }
        .block-right3{
            line-height: 50px;
            margin-left: 30px !important;
            font-size: 16px !important;
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .table-name{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ebebeb;
        margin-bottom: 10px;
        text-align: left;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        .name-span{
            .span1{
              margin-left: 13px;
              span{
                  color: #00bc71;
              }
            }
        }
       .name-span2{
            border: 1px solid #ff2366;
            width: 10% !important;
            height: 32px;
            border-radius: 4px;
            line-height: 0px;
            margin-top: 8px;
            text-align: center;
            margin-right: 12px;
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
  }
}
@media screen and (min-width: 1920px)and (max-width: 2048px){
    .practice-table {
      border: 2px solid #ebebeb;
      width: 97%;
      margin: 0 auto;
      margin-bottom: 20px;
    .el-button--text {
      color: #fff;
      line-height: 10px;
    }
    .el-input-number{
      width: 180px !important;
    }
    .block {
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        .block-right{
            width: 95% !important;
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            .el-radio+.el-radio {
                  margin-left: 30px !important;
              }
              .el-radio-group{
                width: 740px !important; 
              }
            span{
                line-height: 50px;
            }
        .btn{
            width: 100px !important;
            border: 1px solid;
            height: 35px;
            border-radius: 6px;
            margin-top: 7px;
            background: #00bc71;
            color: #fff;
          }
        }
        .block-right4{
            width: 95%;
            display: flex;
            justify-content:flex-start;
            margin: 0 auto;
            span{
                line-height: 50px;
            }
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .block2 {
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        display: flex;
        justify-content: flex-start;
        .block-right1{
          line-height: 50px;
          span{
            margin-left: 25px !important;
            font-size: 16px !important;
          }
        }
        .block-right2{
            display: -webkit-box;
            line-height: 50px;
            margin-left: 30px !important;
            font-size: 16px !important;
            .el-input{
              width: 190px !important;
            }
        }
        .block-right3{
            line-height: 50px;
            margin-left: 30px !important;
            font-size: 16px !important;
        }
      .el-pagination {
        padding: 15px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
    }
    .table-name{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ebebeb;
        margin-bottom: 10px;
        text-align: left;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        .name-span{
            .span1{
              margin-left: 13px;
              span{
                  color: #00bc71;
              }
            }
        }
       .name-span2{
            border: 1px solid #ff2366;
            width:9% !important;
            height: 32px;
            border-radius: 4px;
            line-height: 0px;
            margin-top: 8px;
            text-align: center;
            margin-right: 12px;
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
  }
}
</style>
