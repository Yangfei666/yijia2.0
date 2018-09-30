<template>
    <div>
        <!--转卡操作-->
        <el-row>
            <div class="tag">
                <em class="top"></em>
                <el-col :span="24" class="transfer">
                    <div class="transfer-main">
                        <span class="transfer-span">转卡给老客户</span>
                        <div class="transfer-div">
                            <span>转卡给新客户</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="transfer-from">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="被转卡人姓名:">
                                <el-input v-model="formInline.user" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="transfer-table">
                        <el-table :data="tableData4" :header-cell-style="{background:'#fafafa'}" style="width: 100%">
                            <el-table-column fixed prop="name" align="left" label="姓名" width="90"></el-table-column>
                            <el-table-column prop="tel" align="left" label="手机号" width="140"></el-table-column>
                            <el-table-column prop="cardmunber" align="left" label="卡号" width="140"></el-table-column>
                            <el-table-column prop="cardseed" align="left" label="卡种" width="140"></el-table-column>
                            <el-table-column prop="membership" align="left" label="会籍" width="140"></el-table-column>
                            <el-table-column prop="opentime" align="left" label="开卡时间" width="140"></el-table-column>
                            <el-table-column prop="endtime" align="left" label="到期时间" width="140"></el-table-column>
                            <el-table-column prop="residuenum" align="left" label="剩余次数" width="140"></el-table-column>
                            <el-table-column prop="residueprice" align="left" label="剩余金额" width="140"></el-table-column>
                            <el-table-column prop="status" align="left" label="卡状态" width="140"></el-table-column>
                            <el-table-column fixed="right" align="left" label="操作">
                                <template slot-scope="scope">
                                    <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                                        转卡
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </div>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'transfercard',
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData4: []
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    deleteRow(index, rows) {
       
      }
  }
};
</script>
<style lang="scss" scoped>
.tag {
  width: 97%;
  height: 500px;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  margin: 0px auto;
  em {
    width: 0;
    height: 0;
    font-size: 0;
    overflow: hidden;
    position: absolute;
    &.top {
      border-width: 10px;
      border-style: solid dashed dashed;
      border-color: transparent transparent #fff transparent;
      left: 40px;
      top: -20px;
    }
  }
  .transfer {
    border-bottom: 1px solid #e8e8e8;
    .transfer-main {
      height: 45px;
      width: 98%;
      margin: auto;
      line-height: 45px;
      display: flex;
      justify-content: space-between;
      .transfer-span {
        font-size: 16px;
        color: #262626;
        text-indent: 5px;
      }
      .transfer-div {
        width: 105px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #00bc71;
        line-height: 32px;
        margin-top: 6px;
        margin-right: 10px;
        span {
          color: #00bc71;
          font-size: 16px;
        }
      }
    }
  }
  .transfer-from {
    width: 98%;
    height: 45px;
    line-height: 45px;
    margin: 20px auto;
    display: flex;
    .el-button--primary {
      height: 35px;
      line-height: 10px;
    }
  }
  .transfer-table{
      width: 98%;
      margin: 0 auto;
  }
}
</style>