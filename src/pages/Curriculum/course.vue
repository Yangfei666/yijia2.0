<template>
<div>
<el-row>
    <el-col :span="24">
    <div class="practice-main">
        <el-col :span="23" class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程管理</el-breadcrumb-item>
            <el-breadcrumb-item>课程科目管理</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>
        <el-col :span="23" class="weber">
            <span class="weber-span">课程科目管理</span>
        </el-col>
    </div>
    </el-col>
</el-row>
<div class="practice-list">
    <div class="practice-center">
                <div class="purple">
                    <div class="add">
                        <el-button type="text" class="add-p el-icon-plus" @click="dialogFormVisible = true">添加课程科目</el-button>
                         <template>
                        <el-dialog title="添加课程科目" :append-to-body="true" :visible.sync="dialogFormVisible">
                        <AddCoursesubjects></AddCoursesubjects>
                        </el-dialog>
                        </template>
                    </div>
                    <div class="add">
                       <el-button type="text" class="p" @click="changeInfo">修改课程科目</el-button>
                       <template>
                        <el-dialog title="修改课程科目" :append-to-body="true" :visible.sync="dialogFormVisible2">
                        <EditCoursesubjects :currentSelectRow="currentSelectRow"></EditCoursesubjects>
                        </el-dialog>
                        </template>
                    </div>
                </div>
                <div class="purple2">
                    <el-form ref="form" :model="form" label-width="90px">
                        <el-col :span="23" class="purple-name">
                    <el-form-item label="课程名称:">
                         <el-col :span="24">
                        <el-input v-model="form.name" placeholder="请输入"></el-input>
                        </el-col>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1" class="purple-but">
                    <el-form-item label-width="25px">
                        <el-col :span="24">
                       <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-col>
                    </el-form-item>
                    </el-col>
                    </el-form>
                </div>
    </div>
    <div class="practice-table">
        <el-row>
            <el-col :span="24">
                <el-table highlight-current-row :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :header-cell-style="{background:'#fafafa'}" @row-click="rowClick" fixed style="width: 100%">
                    <el-table-column align="center" prop="radio" fixed width="80px">
                    <template slot-scope="scope">
                         <el-radio-group v-model="radio">
                            <el-radio :label="scope.$index" @change.native="radiochange(scope.row)">&nbsp;</el-radio>
                        </el-radio-group>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" align="left" label="课程名称"></el-table-column>
                    <el-table-column prop="heat" align="left" label="热度"></el-table-column>
                    <el-table-column prop="status" align="left" label="状态"></el-table-column>
                    <el-table-column prop="desc" align="left" label="备注"></el-table-column>
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
            </el-col>
           </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import EditCoursesubjects from "@/components/editCoursesubjects";
import AddCoursesubjects from "@/components/addCoursesubjects";
export default {
    name:'course',
     components: {
      EditCoursesubjects,
      AddCoursesubjects
  },
  data() {
    return {
        currentSelectRow: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      currentPage:1,
      pagesize:10,
      radio:true,
      form: {
          name:'',
        },
      tableData:[{
          index:0,
          name:'空中瑜伽',
          heat:'精品',
          status:'启用',
          desc:'无',
          price:'200.00'
      },{
          index:1,
          name:'空中瑜伽',
          heat:'精品',
          status:'启用',
          desc:'无',
          price:'200.00'
      },{
          index:2,
          name:'空中瑜伽',
          heat:'精品',
          status:'启用',
          desc:'无',
          price:'200.00'
      },{
          index:3,
          name:'空中瑜伽',
          heat:'精品',
          status:'启用',
          desc:'无',
          price:'200.00'
      },{
          index:4,
          name:'空中瑜伽',
          heat:'精品',
          status:'启用',
          desc:'无',
          price:'200.00'
      },{
          index:5,
          name:'空中瑜伽',
          heat:'精品',
          status:'启用',
          desc:'无',
          price:'200.00'
      },{
          index:6,
          name:'空中瑜伽',
          heat:'精品',
          status:'启用',
          desc:'无',
          price:'200.00'
      }]
    };
  },
  methods:{
      radiochange(row) {
      console.log(`当前: ${row}`);
    },
      handleClick3(row){
          console.log(row);
          alert('点击了');
      },
      handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
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
    changeInfo() {//先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
         this.$alert('请先选择列表', '提示信息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `请先选择列表`
            });
          }
        });
      }
    },
        onSubmit() {
        console.log('submit!');
      },
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/course.scss';
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
  .quanbu{
    display: block;
    height:60px;
  .search-form{
      height: 45px;
    display: flex;
    float: left;
     margin: 15px 0px auto;
        .el-button--primary{
            background-color: #00bc71;
            border-color: #00bc71;
        }
  }
  .el-input__inner{
      height: 37px;
  }
  .el-input{
      height: 37px;
  }
}
.quanbu2{
    display: inherit;
    float: left;
    height: 60px;
    margin-left: -70px;
      .search-form2{
    display: flex;
    margin: 15px 0px auto;
    float: left;
    height: 45px;
        .el-button--primary{
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
    display: flex;
    .purple {
      height: 80px;
      display: flex;
      justify-content: flex-start;
      width: 50%;
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
          font-size: 16px;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 9px;
        }
        .add-p {
          color: #00bc71;
          font-size: 16px;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 9px;
        }
      }
      .add2{
        border: 1px solid #ff2366;
        width: 20%;
        height: 35px;
        border-radius: 4px;
        line-height: 0px;
        margin-top: 20px;
        margin-left: 20px;
        .p {
          color: #ff2366;
          font-size: 16px;
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
      width: 50%;
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
      .purple-name{
          margin-top: 17px;
      }
      .purple-but{
          margin-top: 17px;
          .el-button--primary{
                height: 35px;
                line-height: 11px;
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