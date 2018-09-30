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
            <el-breadcrumb-item>补开卡</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>
        <el-col :span="23" class="weber">
            <span class="weber-span">需要补开卡的会员</span>
        </el-col>
    </div>
    </el-col>
</el-row>
<div class="practice-list">
    <div class="practice-center">
        <el-row>
            <el-col :span="12">
                <div class="purple">
                    <div class="add">
                        <p>补开卡</p>
                    </div>
                </div>
                </el-col>
        </el-row>
    </div>
    <div class="practice-table">
        <el-row>
            <el-col :span="24">
                <el-table :data="tableData" style="width: 100%">
                   <el-table-column align="center" prop="radio" fixed width="90px">
                    <template slot-scope="scope">
                        <el-radio v-model="scope.row.radio"></el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="name" label="客户姓名"></el-table-column>
                    <el-table-column prop="tel" align="left" label="手机号"></el-table-column>
                    <el-table-column prop="card" align="left" label="证件号"></el-table-column>
                    <el-table-column prop="hjgw" align="left" label="会籍顾问"></el-table-column>
                </el-table>
                <div class="block">
                        <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    background
                    :page-sizes="[2, 4, 6, 8]"
                    :page-size="2"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="20">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import Addmember from "@/components/addmember";
export default {
    name:'fillcard',
  components: {
      Addmember
  },
  data() {
    return {
      currentPage4:2,
      tableData:[{
          name:'小木子',
          tel:'123232323',
          card:'02200202000',
          hjgw:'Angel',
      },{
         name:'小木子',
          tel:'123232323',
          card:'02200202000',
          hjgw:'Angel',
      },{
          name:'小木子',
          tel:'123232323',
          card:'02200202000',
          hjgw:'Angel',
      },{
          name:'小木子',
          tel:'123232323',
          card:'02200202000',
          hjgw:'Angel',
      },{
          name:'小木子',
          tel:'123232323',
          card:'02200202000',
          hjgw:'Angel',
      },{
         name:'小木子',
          tel:'123232323',
          card:'02200202000',
          hjgw:'Angel',
      },{
          name:'小木子',
          tel:'123232323',
          card:'02200202000',
          hjgw:'Angel',
      }]
    };
  },
  methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
        onSubmit() {
        console.log('submit!');
      },
  }
};
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
          margin-top: -3px;
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
      .el-button--text{
          color: #00BC71;
      }
      .block{
          float: right;
          margin-top: 10px;
          .el-pagination{
              padding: 15px 5px;
              float: right;
              margin-right: 40px;
              .el-pager li.active {
                color: #00BC71;
            }
          }
      }
  }
}
</style>