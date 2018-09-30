<template>
<!--上课记录-->
    <div class="memberhome">
        <el-col :span="24">
            <div class="class-main">
            <div class="infor-but" v-on:click="back">
                <span class="goback el-icon-arrow-left">返回</span>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="团课记录" name="first">
                <template>
                    <el-col :span="24">
                    <div class="class-form">
                        <el-form ref="form" :model="formInline" class="demo-form-inline" label-width="80px">
                            <div class="from-class">
                                <el-form-item label="时间段:" style="text-align:center;">
                                <el-col :span="24">
                                <el-date-picker v-model="formInline.date" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:245px;margin-top:3px;z-index:3"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            </div>
                             <div class="from-class">
                                <el-form-item label="卡种:" style="text-align:center">
                                <el-col :span="24">
                                <el-select v-model="formInline.region" placeholder="请选择" style="width:230px;z-index:2">
                                <el-option label="大众卡" value="activate"></el-option>
                                <el-option label="期限卡" value="overdue"></el-option>
                                </el-select>
                                </el-col>
                            </el-form-item>
                            </div>
                             <div class="from-class">
                                <el-form-item label="上课状态:" style="text-align:center">
                                <el-col :span="24">
                               <el-select v-model="formInline.region2" placeholder="请选择" style="width:230px;z-index:2">
                                <el-option label="大众卡" value="activate"></el-option>
                                <el-option label="期限卡" value="overdue"></el-option>
                                </el-select>
                                </el-col>
                            </el-form-item>
                            </div>
                            <div class="from-class">
                            <el-form-item label-width="40px">
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                                <el-button>重置</el-button>
                            </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    </el-col>
                    <el-col :span="24">
                        <div class="practice-table">
                            <div class="table-tuan">
                            <el-table highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                                <el-table-column prop="class" align="left" label="课程" fixed width="170px"></el-table-column>
                                <el-table-column prop="time"  align="left" label="上课时间" width="250px"></el-table-column>
                                <el-table-column prop="card" align="left" label="卡种" width="150px"></el-table-column>
                                <el-table-column prop="room" align="left" label="教室" width="250px"></el-table-column>
                                <el-table-column prop="train" align="left" label="教练" width="170px"></el-table-column>
                                <el-table-column prop="difficulty" align="left" label="难度" width="170px"></el-table-column>
                                <el-table-column prop="handcard" align="left" label="手牌" width="170px"></el-table-column>
                                <el-table-column prop="status" align="left" label="上课状态" fixed="right" width="170px"></el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            background
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tableData.length">
                            </el-pagination>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </template>
            </el-tab-pane>
            <el-tab-pane label="私教记录" name="second">
                 <template>
                    <el-col :span="24">
                    <div class="class-form">
                        <el-form ref="form" :model="formInline" class="demo-form-inline" label-width="80px">
                            <div class="from-class">
                                <el-form-item label="时间段:" style="text-align:center">
                                <el-col :span="24">
                                <el-date-picker v-model="formInline.date" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:245px;margin-top:3px;z-index:3"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            </div>
                             <div class="from-class">
                                <el-form-item label="卡种:" style="text-align:center">
                                <el-col :span="24">
                                <el-select v-model="formInline.region" placeholder="请选择" style="width:230px;z-index:2">
                                <el-option label="大众卡" value="activate"></el-option>
                                <el-option label="期限卡" value="overdue"></el-option>
                                </el-select>
                                </el-col>
                            </el-form-item>
                            </div>
                             <div class="from-class">
                                <el-form-item label="上课状态:" style="text-align:center">
                                <el-col :span="24">
                               <el-select v-model="formInline.region2" placeholder="请选择" style="width:230px;z-index:2">
                                <el-option label="大众卡" value="activate"></el-option>
                                <el-option label="期限卡" value="overdue"></el-option>
                                </el-select>
                                </el-col>
                            </el-form-item>
                            </div>
                            <div class="from-class">
                            <el-form-item label-width="40px">
                                <el-button type="primary" @click="onSubmit" style="height:37px">查询</el-button>
                                <el-button>重置</el-button>
                            </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    </el-col>
                    <el-col :span="24">
                        <div class="practice-table">
                            <div class="table-tuan">
                            <el-table highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
                                <el-table-column prop="time"  align="left" sortable label="上课时间" fixed width="300px"></el-table-column>
                                <el-table-column prop="card" align="left" label="卡种" width="230px"></el-table-column>
                                <el-table-column prop="room" align="left" label="教室" width="300px"></el-table-column>
                                <el-table-column prop="train" align="left" label="教练" width="230px"></el-table-column>
                                <el-table-column prop="handcard" align="left" label="手牌" width="230px"></el-table-column>
                                <el-table-column prop="status" align="left" label="上课状态" fixed="right" width="230px"></el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            background
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tableData2.length">
                            </el-pagination>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </template>
            </el-tab-pane>
        </el-tabs>
            </div>
        </el-col>
    </div>
</template>
<script>
export default {
    name:'classcard',
  data() {
    return {
      activeName: "first",
      currentPage:1,
      pagesize:10,
      formInline: {
          user: '',
          date:'',
          region: '',
          region2:'',
          region3:''
        },
        tableData:[{
          class:'空中瑜伽',
          time:'2018-06-17  20:00:00',
          card:'卡1',
          room:'综合瑜伽教室',
          train:'李木子',
          difficulty:'2',
          handcard:'123',
          status:'已取消',
      },{
           class:'空中瑜伽',
          time:'2018-06-17  20:00:00',
          card:'卡1',
          room:'综合瑜伽教室',
          train:'李木子',
          difficulty:'2',
          handcard:'123',
          status:'已取消',
      },{
          class:'空中瑜伽',
          time:'2018-06-17  20:00:00',
          card:'卡1',
          room:'综合瑜伽教室',
          train:'李木子',
          difficulty:'2',
          handcard:'123',
          status:'已取消',
      },{
           class:'空中瑜伽',
          time:'2018-06-17  20:00:00',
          card:'卡1',
          room:'综合瑜伽教室',
          train:'李木子',
          difficulty:'2',
          handcard:'123',
          status:'已取消',
      },{
          class:'空中瑜伽',
          time:'2018-06-17  20:00:00',
          card:'卡1',
          room:'综合瑜伽教室',
          train:'李木子',
          difficulty:'2',
          handcard:'123',
          status:'已取消',
      },{
         class:'空中瑜伽',
          time:'2018-06-17  20:00:00',
          card:'卡1',
          room:'综合瑜伽教室',
          train:'李木子',
          difficulty:'2',
          handcard:'123',
          status:'已取消',
      },{
         class:'空中瑜伽',
          time:'2018-06-17  20:00:00',
          card:'卡1',
          room:'综合瑜伽教室',
          train:'李木子',
          difficulty:'2',
          handcard:'123',
          status:'已取消',
      }],
      tableData2:[{
          time:'2018-06-17  20:00:00',
          card:'卡1',
          room:'综合瑜伽教室',
          train:'李木子',
          handcard:'123',
          status:'已取消',
      },{
          time:'2018-06-17  20:00:00',
          card:'卡1',
          room:'综合瑜伽教室',
          train:'李木子',
          handcard:'123',
          status:'已取消',
      },{
          time:'2018-06-17  20:00:00',
          card:'卡1',
          room:'综合瑜伽教室',
          train:'李木子',
          handcard:'123',
          status:'已取消',
      },{
          time:'2018-06-17  20:00:00',
          card:'卡1',
          room:'综合瑜伽教室',
          train:'李木子',
          handcard:'123',
          status:'已取消',
      },{
          time:'2018-06-19  20:00:00',
          card:'卡1',
          room:'综合瑜伽教室',
          train:'李木子',
          handcard:'123',
          status:'已取消',
      },{
          time:'2018-06-18  20:00:00',
          card:'卡1',
          room:'综合瑜伽教室',
          train:'李木子',
          handcard:'123',
          status:'已取消',
      }],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
      onSubmit() {
        console.log('submit!');
      },
      handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
    },
       back(){
        this.$router.go(-1);//返回上一层
    },
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/classcard.scss";
.memberhome {
  width: 97%;
  height: 100%;
  display: inline-block;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .class-main {
    height: 100%;
    position: relative;
    .infor-but{
            position: absolute;
            top: 2.5%!important;
            z-index:2;
            color:#262626;
            right: 80%!important;
            .goback{
                font-size: 14px;
            }
        }
    .infor-but:hover{
        color: #00bc71;
    }
    .class-form{
        height: 100%;
        overflow: hidden;
        .from-class{
            height: 50px;
            float: left;
             .el-button--primary{
                height: 35px;
                line-height: 1px;
            }
            .el-button+.el-button{
                height: 35px;
                line-height: 1px;
            }
        }
        .from-class2{
            .el-button--primary{
                height: 35px;
                line-height: 1px;
            }
            .el-button+.el-button{
                height: 35px;
                line-height: 1px;
            }
        }
    }
    .practice-table{
        margin-top: 10px;
        .table-tuan{
            width: 98%;
            margin: 0 auto;
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
  }
}
    
</style>
