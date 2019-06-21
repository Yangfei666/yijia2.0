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
                            <div class="add">
                                <el-button type="text" class="p" @click="cur=0">待结算</el-button>
                            </div>
                            <div class="add">
                                <el-button type="text" class="p" @click="cur=1">待取货</el-button>
                            </div>
                            <div class="add">
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
                                <span>实际付款：{{moneyTotal(item.data) * Totalnum(item.data) -(item.privilegeprice==undefined?0:item.privilegeprice) | formatMoney}} 元</span>
                            </div>
                        </div>
                        <div class="block">
                            <div class="block-right">
                               <div>
                                <span>支付方式：</span>
                                <el-radio-group v-model="item.mode">
                                  <el-radio :label="1">店内到付</el-radio>
                                  <el-radio :label="2">美团</el-radio>
                                  <el-radio :label="3">大众点评</el-radio>
                                  <el-radio :label="4">会籍顾问代收</el-radio>
                                  <el-radio :label="5">储值卡</el-radio>
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
              <p style="height:50px;">暂无商品数据~</p>
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
                                <el-input-number v-model="scope.row.num" :min="1" :max="1000" label="描述文字"></el-input-number>
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
                                    <el-button type="success" plain size="small" @click="(scope)">取货</el-button> 
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
                                <span>实际付款：{{moneyTotal(item.data) * Totalnum(item.data) -(item.privilegeprice==undefined?0:item.privilegeprice) | formatMoney}} 元</span>
                            </div>
                        </div>
                        <div class="block">
                            <div class="block-right">
                               <div>
                                <span>支付方式：</span>
                                <el-radio-group v-model="item.mode">
                                  <el-radio :label="1">店内到付</el-radio>
                                  <el-radio :label="2">美团</el-radio>
                                  <el-radio :label="3">大众点评</el-radio>
                                  <el-radio :label="4">会籍顾问代收</el-radio>
                                  <el-radio :label="5">储值卡</el-radio>
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
              <p style="height:50px;">暂无商品数据2~</p>
            </div>
            </div>
            <!--已完成-->
             <div style="height:100%" v-show="cur==2">
               <div v-if="this.orderList.length > 0">
                 <div v-for="(item,index) in orderList" :key="index">
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
                              <el-table ref="singleTable" border @selection-change="handleSelectionChange" @current-change="handleCurrentChange2" highlight-current-row :header-cell-style="{background:'#fafafa'}" style="width: 100%" @row-click="rowClick">
                                  <el-table-column type="index" width="50" align="center"></el-table-column>
                                  <el-table-column prop="name" align="center" label="名称"></el-table-column>
                                  <el-table-column prop="sellPrice" align="center" label="单价"></el-table-column>
                                  <el-table-column align="center" label="数量">
                                      <template slot-scope="scope">
                                      <div style="height: 40px;">
                                      <el-input-number v-model="scope.row.num" :min="1" :max="1000" label="描述文字"></el-input-number>
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
                                          <el-button type="success" plain size="small" @click="(scope)">取货</el-button> 
                                      </template>
                                  </el-table-column>
                              </el-table>
                              <!-- <div class="block2">
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
                                      <span>实际付款：{{moneyTotal(item.data) * Totalnum(item.data) -(item.privilegeprice==undefined?0:item.privilegeprice) | formatMoney}} 元</span>
                                  </div>
                              </div>
                              <div class="block">
                                  <div class="block-right">
                                    <div>
                                      <span>支付方式：</span>
                                      <el-radio-group v-model="item.mode">
                                        <el-radio :label="1">店内到付</el-radio>
                                        <el-radio :label="2">美团</el-radio>
                                        <el-radio :label="3">大众点评</el-radio>
                                        <el-radio :label="4">会籍顾问代收</el-radio>
                                        <el-radio :label="5">储值卡</el-radio>
                                      </el-radio-group>
                                      </div>
                                      <div class="btn">
                                      <el-button type="text" class="p" @click="Settlement(item)">确认购买</el-button>
                                      </div>
                                  </div>
                              </div> -->
                          </el-col>
                      </el-row>
                  </div>
                  </div>
               </div>
               <div  v-else>
                <p style="height:50px;">暂无商品数据3~</p>
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
      for(var i=0;i<goods.data.length;i++){
            this.sels.push(goods.data[i].oid);
        }  
        let canceparams ={
          oid:this.sels,
        }
        if(goods.data.length<0){
          this.$message({
            type: 'warning',
            message: '没有取消的订单!'
          });
        }else{
        this.$confirm('确定取消订单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        requestLogin("/setGoodsList/cancleOrder", canceparams, "post")
        .then(function(res) {
          this.$message({
            type: 'success',
            message: '取消成功!'
          });
          this.getgoodsorder();
          this.reload();
        })
        .catch(error => {
          this.sels = [];
          let { response: { data: { errorCode, msg } } } = error;
            if (errorCode != 0) {
            this.$message({
                message: msg,
                type: "error"
            });
            return;
            }
        })
      })
      }
    },
    //确认购买
    Settlement(goods) {
       for(var i=0;i<goods.data.length;i++){
            this.nums.push(goods.data[i].num);
            this.sels.push(goods.data[i].oid);
        }  
        if(goods.mode == undefined){
          this.$message({
            type: 'warning',
            message: '您还没有选择付款方式！'
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
    rowClick2(row, event, column) {
      this.radio = row.index;
      this.currentSelectRow = row;
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
</style>
