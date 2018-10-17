<template>
    <div>
        <el-row>
    <el-col :span="24">
    <div class="practice-main">
        <el-col :span="23" class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>会员客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>开卡审核</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>
        <el-col :span="23" class="weber">
            <span class="weber-span">开卡审核</span>
        </el-col>
    </div>
    </el-col>
</el-row>
<div class="cardopen">
    <el-row>
        <el-col :span="24">
        <div class="cardopen-head">
            <span class="head-left">待审核客户列表</span>
            <div class="search">
                <input class="search-input" maxlength="18" placeholder="搜索姓名/电话/卡号"/>
                <i class="search-icon el-icon-search"></i>
            </div>
        </div>
        </el-col>
        <el-col :span="24">
                <el-table :data="tableData" :default-sort = "{order: 'descending'}" :header-cell-style="{background:'#fafafa'}" style="width: 100%">
                    <el-table-column align="center" prop="name" label="客户姓名" width="130px" fixed></el-table-column>
                    <el-table-column prop="tel" align="left" label="手机号" width="150px"></el-table-column>
                    <el-table-column prop="card" align="left" label="卡号" width="150px"></el-table-column>
                    <el-table-column prop="cardname" align="left" label="卡名称" width="150px"></el-table-column>
                    <el-table-column prop="fksj" align="left" label="发卡时间" sortable width="160px"></el-table-column>
                    <el-table-column prop="dqsj" align="left" label="到期时间" sortable width="160px"></el-table-column>
                    <el-table-column prop="fkfs" align="left" label="付款方式" width="150px"></el-table-column>
                    <el-table-column prop="fkje" align="left" label="付款金额" sortable width="140px"></el-table-column>
                    <el-table-column prop="hjgw" align="left" label="会籍顾问" width="140px"></el-table-column>
                    <el-table-column prop="cz" align="left" label="操作" fixed="right" width="230px">
                        <template slot-scope="scope">
                        <el-button @click.native.prevent="handleClick2(scope.row)" type="text" size="small">通过</el-button>
                        <el-button @click.native.prevent="handleClick2(scope.row)" type="text" size="small">不通过</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
    </el-row>
</div>
    </div>
</template>
<script>
export default {
 name:'cardopenaudit',
  data() {
    return {
         tableData:[{
          name:'小厨子',
          tel:'123232323',
          card:'00000000',
          cardname:'大众卡',
          fksj:'2018-02-20',
          dqsj:'2019-02-20',
          fkfs:'支付宝',
          fkje:'202',
          hjgw:'Angel'
      },{
          name:'小厨子',
          tel:'123232323',
          card:'00000000',
          cardname:'大众卡',
          fksj:'2018-02-24',
          dqsj:'2019-02-25',
          fkfs:'支付宝',
          fkje:'200',
          hjgw:'Angel'
      },{
          name:'小厨子',
          tel:'123232323',
          card:'00000000',
          cardname:'大众卡',
          fksj:'2018-02-24',
          dqsj:'2019-02-25',
          fkfs:'支付宝',
          fkje:'200',
          hjgw:'Angel'
      },{
          name:'小厨子',
          tel:'123232323',
          card:'00000000',
          cardname:'大众卡',
          fksj:'2018-02-24',
          dqsj:'2019-02-25',
          fkfs:'支付宝',
          fkje:'200',
          hjgw:'Angel'
      },{
          name:'小厨子',
          tel:'123232323',
          card:'00000000',
          cardname:'大众卡',
          fksj:'2018-02-24',
          dqsj:'2019-02-25',
          fkfs:'支付宝',
          fkje:'200',
          hjgw:'Angel'
      },{
          name:'小厨子',
          tel:'123232323',
          card:'00000000',
          cardname:'大众卡',
          fksj:'2018-02-24',
          dqsj:'2019-02-25',
          fkfs:'支付宝',
          fkje:'200',
          hjgw:'Angel'
      },{
          name:'小厨子',
          tel:'123232323',
          card:'00000000',
          cardname:'大众卡',
          fksj:'2018-02-24',
          dqsj:'2019-02-25',
          fkfs:'支付宝',
          fkje:'200',
          hjgw:'Angel'
      }],
    }
  },
   methods:{
      handleClick2(row){
          console.log(row);
          alert('点击了');
      },
      //格式化指定列的值
       formatter(row, column) {
        return row.address;
      },
   }
}
</script>
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
.cardopen{
    width: 97%;
    height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .cardopen-head{
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
    .head-left{
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        .head-right{
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
        opacity: 0.6;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
    }
  }
}
.cardopen2{
    width: 97%;
    height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .cardopen-head{
    display: flex;
    border-left: 2px solid #00bc71;
    padding-left: 10px;
   margin: 15px auto;
    .head-left{
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        .head-right{
            padding-left: 10px;
            font-size: 14px;
            color: #262626;
        }
    }
  }
}
</style>
