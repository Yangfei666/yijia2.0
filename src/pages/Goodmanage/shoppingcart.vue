<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="practice-main">
                    <el-col :span="23" class="breadcrumb">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                            <el-breadcrumb-item>购物车</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="23" class="weber">
                        <span class="weber-span">购物车</span>
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
                                <el-button type="text" class="p" @click="dialogFormVisible = true">选择客户</el-button>
                                <template>
                                    <el-dialog title="选择客户" :append-to-body="true" :visible.sync="dialogFormVisible">
                                        <!--选择客户-->
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                                            <el-form-item label="客户类别:" prop="classify" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-radio-group v-model="ruleForm.classify" @change="cahngesen">
                                                        <el-radio :label="1">会员客户</el-radio>
                                                        <el-radio :label="2">体验客户</el-radio>
                                                        <el-radio :label="3">潜在客户</el-radio>
                                                        <el-radio :label="4">定金客户</el-radio>
                                                    </el-radio-group>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="客户姓名:" prop="name" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                     <el-autocomplete v-model.trim="ruleForm.name" v-on:input="mingzi" :disabled="disabled" :trigger-on-focus="false" placeholder="请输入" clearable style="width:100%;" :fetch-suggestions="querySearchAsync" @select="handleSelect"></el-autocomplete>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="客户电话:" prop="tel" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-autocomplete v-model.trim="ruleForm.tel" v-on:input="dianhua" :trigger-on-focus="false" placeholder="请输入" clearable style="width:100%;" :fetch-suggestions="querySearchAsync2" @select="handleSelect2"></el-autocomplete>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item class="dialog-footer">
                                                <el-col :span="24" style="display: flex;justify-content: flex-end;">
                                                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                                                    <el-button type="primary" @click="addclientele('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                                                </el-col>
                                            </el-form-item>
                                        </el-form>
                                    </el-dialog>
                                </template>
                            </div>
                                <template>
                                    <el-dialog title="商品列表" :append-to-body="true" width="69%" :visible.sync="dialogTableVisible">
                                        <el-table :data="gridData" ref="singleTable" :row-key="getRowKeys" @selection-change="selsChange" border highlight-current-row :header-cell-style="{background:'#fafafa'}" style="width: 100%" @row-click="rowClick2">
                                        <el-table-column type="index" width="50" align="center"></el-table-column>
                                        <el-table-column prop="name" align="center" label="图片">
                                            <template slot-scope="scope">
                                            <el-tooltip content="点击图片可放大" placement="top">
                                                <img :src="scope.row.urlPic" style="width: 50px;height:50px;border-radius:50%;" @click="handleFileEnlarge(scope.row.urlPic)">
                                            </el-tooltip>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="name" align="center" label="名称"></el-table-column>
                                        <el-table-column prop="price" align="center" label="售价"></el-table-column>
                                        <el-table-column prop="size" align="center" label="规格"></el-table-column>
                                        <el-table-column prop="num" align="center" label="数量"></el-table-column>
                                        <el-table-column align="center" label="操作">
                                            <template slot-scope="scope">
                                               <el-button @click="addToBasket(scope.$index, scope.row)" class="btn btn-sm btn-outline-info">加入购物车</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    </el-dialog>
                                </template>
                              <template>
                                <!--放大图片-->
                                <el-dialog title="" :visible.sync="isEnlargeImage" :show-close='false' :modal-append-to-body="false">
                                    <img @click="isEnlargeImage = false" style="width:50%;" :src="enlargeImage">
                                </el-dialog>
                            </template>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div v-if="this.goodcart.length > 0">
            <div v-for="(item,index) in goodcart" :key="index">
            <div class="practice-table">
                <el-row>
                    <el-col :span="24">
                        <div class="table-name">
                            <div class="name-span">
                            <b class="span1">客户类型：<span>{{item.customer}}</span></b>
                            <b class="span1">客户姓名：<span>{{item.name}}</span></b>
                            <b class="span1">会籍顾问：<span>{{item.YGXX_NAME}}</span></b>
                            </div>
                            <div class="name-spans">
                              <div class="name-span3">
                               <el-button type="text" class="p" @click="tablevisible(item)">添加商品</el-button>
                            </div>
                            <div class="name-span2">
                             <el-button type="text" class="p" @click="EmptyCart(item)">清空购物车</el-button>
                            </div>
                            </div>
                        </div>
                        <el-table ref="singleTable" :data="item.data" border @selection-change="handleSelectionChange" @current-change="handleCurrentChange2" highlight-current-row :header-cell-style="{background:'#fafafa'}" style="width: 100%" @row-click="rowClick">
                            <el-table-column type="index" width="50" align="center"></el-table-column>
                            <el-table-column prop="name" align="center" label="名称"></el-table-column>
                            <el-table-column prop="price" align="center" label="单价"></el-table-column>
                            <el-table-column align="center" label="数量">
                                <template slot-scope="scope">
                                <div style="height: 40px;">
                                <el-input-number v-model="scope.row.num" @change="handleChange" v-on:input="handleBlur" :min="1" :max="1000" label="描述文字"></el-input-number>
                                </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xiaoji" align="center" label="小计">
                                <template slot-scope="scope">
                                    <div>{{scope.row.price*scope.row.num | formatMoney}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="danger" plain size="small" @click="handleDelete(scope.$index,scope.row,item)">删除</el-button> 
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <div class="block-right">
                                <span>总计：{{moneyTotal(item.data)}} 元</span>
                                <div class="btn">
                                <el-button type="text" class="p" @click="Settlement(item)">去结算</el-button>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
              </div>
            </div>
             </div>
             <div v-else>
              <p style="height:50px;">请先选择客户~再选择商品</p>
            </div>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
export default {
  inject: ["reload"],
  name: "shoppingcart",
  data() {
    return {
      formLabelWidth: "130px",
      currentSelectRow: "",
      dialogFormVisible:false,
      dialogTableVisible: false,
      radio: true,
      currentPage: 1,
      pagesize: 10,
      flag: false,
      disabled:false,
      addclien:{},
      isEnlargeImage: false, //放大图片
      enlargeImage: "", //放大图片地址
      input_number_value:1,
      multipleSelection: [],
      tableData: [],
      gridData:[],
      goodcart:[],
      cart:{},
      sels:[],
      nums:[],
      idd:"",
      ruleForm:{
          classify:"",
          name:"",
          tel:""
      },
      rules: {
        classify:[{ required: true, message: '请选择分类', trigger: 'change' }],
        tel:[{ required: true, message: '请选择电话号码', trigger: 'blur' }],
      },
      count: 0,
    };
  },
  filters: {//局部过滤器 单价
        formatMoney: function (value) {
            return "￥ " + value.toFixed(2);//保留两位小数
        }
    },
 computed: {
        //总价
      moneyTotal(){
        return function (goods) {                
            let totalCost = 0;
            for(var index in goods.data){
                let single = goods.data[index];
                totalCost += single.price * single.num;
            }
            return totalCost;
        }
      }
    },
    created(){
        this.getgoodlist();
    },
  methods: {
    //商品列表
      getgoodlist() {
        let _this = this;
       requestLogin("/setGoodsList/searchGoods", {}, "get")
        .then(function(res) {
          _this.gridData = res;
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
    getRowKeys(row) {
      return row.id;
    },
    selsChange(sels) {
    },
     //放大图片
    handleFileEnlarge(_url) {
      if (_url) {
        this.enlargeImage = _url;
        this.isEnlargeImage = !this.isEnlargeImage;
      }
    },
    tablevisible(item){
      this.cart=item;
      this.dialogTableVisible = true;
    },
    //添加到购物车
    addToBasket(index,row){
        let basket = {
            id:row.id,
            name:row.name,
            price:row.price,
            num:1,
        }           
        for(var i=0;i<this.goodcart.length;i++){
            if(this.goodcart[i].yid==this.cart.yid){
              if(this.goodcart[i].data!=undefined){
            let result = this.goodcart[i].data.filter((basket) =>{
                return basket.name === row.name && basket.price === row.price;
            })
            if(result != null && result.length>0){
                result[0].num ++;
                this.$message({
                    type: 'success',
                    message: '已加入购物车'
                });
            }else{
                this.goodcart[i].data.push(basket);
                this.$message({
                    type: 'success',
                    message: '已加入购物车'
                });
            }
        }else{
            this.goodcart[i].data=[];
            this.goodcart[i].data.push(basket);
            this.$message({
                    type: 'success',
                    message: '已加入购物车'
                });
              }
            }
        }  
    },
    //选择客户
    addclientele(formName){
        if(this.ruleForm.name == "" && this.ruleForm.classify == 1){
            this.$message({
                    type: 'warning',
                    message: '客户姓名不能为空'
                });
        }else{
        this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              name: this.ruleForm.name,
              tel: this.ruleForm.tel,
              sign: this.ruleForm.classify
            };
            requestLogin("/setGoodsList/searchDirectByName", loginParams, "post")
              .then(data => {
                this.goodcart.push(data);
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.dialogFormVisible = false;
                this.resetForm(formName);
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
        } else {
          return false;
        }
      });
      }
    },
    //删除商品
    handleDelete(index,row,goods) {
      var _this=this; 
        this.$confirm('确定删除该商品？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(var i=0;i<_this.goodcart.length;i++){
            if(_this.goodcart[i].yid==goods.yid){
              for(var j=0;j<goods.data.length;j++){
                 if(goods.data[j].id==row.id){
                     _this.goodcart[i].data.splice(j,1);                   
                 }
                 _this.multipleSelection;
              }           
            }
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    //清空购物车
    EmptyCart(goods){
       var _this=this; 
        this.$confirm('确定清空购物车？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         for(var i=0;i<_this.goodcart.length;i++){
            if(_this.goodcart[i].yid==goods.yid){
                _this.goodcart[i].data.splice(0,_this.goodcart[i].data.length);      
            }
          }
          _this.multipleSelection;
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });    
    },
    //数量不能为空
    handleChange(value) {
        this.handleSelectionChange(this.multipleSelection);
        if(this.input_number_value == undefined){
            this.$message({
            type: 'error',
            message: '不能为空!'
          });
        }
      },
    handleBlur(value){
        this.input_number_value = value;
    },
    mingzi(){
        if(this.ruleForm.classify == ""){
            this.$message({
            type: 'warning',
            message: '请先选择客户类别!'
          });
        }
    },
    dianhua(){
        if(this.ruleForm.classify == ""){
            this.$message({
            type: 'warning',
            message: '请先选择客户类别!'
          });
        }
    },
    //客户类别
    cahngesen(val){
        if(this.ruleForm.classify != 1){
            this.disabled = true;
        }else{
            this.disabled = false;
        }
    },
    async searchClub(name) {
        this.clubLists = await requestLogin(`/setGoodsList/searchName`, {name: name,tel:this.ruleForm.tel,sign:this.ruleForm.classify}, 'post')
        return this.clubLists
      },
     async querySearchAsync(queryString, cb) {
        var clubLists = await this.searchClub(this.ruleForm.name);
        var results = queryString ? clubLists.filter(this.createStateFilter(queryString)) : clubLists;
        results = results.map(item => ({...item, value: item.name}))
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 100);
      },
    createStateFilter(queryString) {
        return (state) => {
          return state.name
        };
      },
      async searchClub2(name) {
        this.clubLists2 = await requestLogin(`/setGoodsList/searchName`, {tel: this.ruleForm.tel,name:this.ruleForm.name,sign:this.ruleForm.classify}, 'post')
        return this.clubLists2
      },
     async querySearchAsync2(queryString, cb) {
        var clubLists2 = await this.searchClub2(this.ruleForm.tel);
        var results = queryString ? clubLists2.filter(this.createStateFilter2(queryString)) : clubLists2;
        results = results.map(item => ({...item, value: item.tel}))
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 100);
      },
    createStateFilter2(queryString) {
        return (state) => {
          return state.tel
        };
      },
    //去结算
    Settlement(goods) {
        if(goods.data == undefined){
             this.$message({
              type: 'warning',
              message: '请先添加商品信息!'
             });
           }else{
             for(var i=0;i<goods.data.length;i++){
                this.nums.push(goods.data[i].num);
                this.sels.push(goods.data[i].id);
              } 
            this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              sign:goods.sign,//类别
              cid: goods.cid,//客户编号
              yid: goods.yid,//销售编号
              lid: this.sels,//商品编号
              num: this.nums,//数量
            };
            requestLogin("/setGoodsList/saveOrder", loginParams, "post")
              .then(data => {
                 this.$router.push({ path: "/Goodmanage/goodsorder"})
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
      //this.$refs.singleTable.toggleRowSelection(row);
    },
    handleSelect(item) {},
    handleSelect2(item) {},
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
.table{
     width: 100%;
    text-align: center;
    line-height: 45px;
    }
.table .thead-default{
    background-color: #ebebeb;
}
.table .thead-default tr th{
    width: 200px;
}
.table tbody{
    background: #FAF9F9;
}
.table tbody tr td .btn{
    background: #00bc71;
    color: #fff;
    height: 35px;
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
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border-top: 1px solid #ebebeb;
        .block-right{
            width: 33%;
            float: right;
            display: flex;
            justify-content: space-around;
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
        .name-spans{
          display: flex;
          width: 25%;
          justify-content: flex-end;
          .name-span3{
            border: 1px solid #00bc71;
            width: 40%;
            height: 32px;
            border-radius: 4px;
            line-height: 0px;
            margin-top: 8px;
            text-align: center;
            margin-right: 12px;
            .p {
            color: #00bc71;
            font-family: PingFang-SC-Regular;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            line-height: 9px;
          }
         }
          .name-span2{
            border: 1px solid #ff2366;
            width: 40%;
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
}
</style>
