<template>
  <div>
      <!--前台排班表-->
    <div class="practice-list">
      <div class="practice-center">
        <el-row>
          <el-col :span="24">
            <div class="purple">
              <div class="add">
                  <el-date-picker v-model="dateValue" @change="changeWeek" :clearable="false" type="week" format="yyyy 第 WW 周" placeholder="选择周" :firstDayOfWeek="1"></el-date-picker>
              </div>
              <div class="add2">
                  <el-select v-model="value" placeholder="复制课表" @change="changeInfo2">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="practice-table">
        <el-row>
          <el-col :span="24">
            <el-table ref="singleTable" tooltip-effect="dark" border @current-change="handleCurrentChange2" element-loading-text="拼命加载中..." highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
              <el-table-column prop="name" align="center" fixed label="">
              </el-table-column>
              <el-table-column align="center" :label="'周一('+this.getsubstr('Monday')+')'">
                  <template slot-scope="scope">
                      <span v-if="edit_id !== scope.row.id || (cur_date >= scope.row.week[0]) || hides[0]">{{scope.row.shift[0]}}</span>
                      <el-select v-else v-model="scope.row.shift[0]" :clearable='false' @change="handleEdit(scope,0)">
                        <el-option v-for="(item,index) in classify" :key="index" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                  </template>
              </el-table-column>
              <el-table-column align="center" :label="'周二('+this.getsubstr('Tuesday')+')'">
                   <template slot-scope="scope">
                       <span v-if="edit_id !== scope.row.id  || (cur_date >= scope.row.week[1]) || hides[1]">{{scope.row.shift[1]}}</span>
                     <el-select v-else v-model="scope.row.shift[1]" :clearable='false' @change="handleEdit(scope,1,$event)" >
                        <el-option v-for="(item,index) in classify" :key="index" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                  </template>
              </el-table-column>
              <el-table-column align="center" :label="'周三('+this.getsubstr('Wednesday')+')'">
                   <template slot-scope="scope">
                       <span v-if="edit_id !== scope.row.id  || (cur_date >= scope.row.week[2]) || hides[2]">{{scope.row.shift[2]}}</span>
                       <el-select v-else v-model="scope.row.shift[2]" :clearable='false' @change="handleEdit(scope,2,$event)">
                        <el-option v-for="(item,index) in classify" :key="index" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                  </template>
              </el-table-column>
              <el-table-column align="center" :label="'周四('+this.getsubstr('Thursday')+')'">
                   <template slot-scope="scope">
                       <span v-if="edit_id !== scope.row.id  || (cur_date >= scope.row.week[3]) || hides[3]">{{scope.row.shift[3]}}</span>
                       <el-select v-else v-model="scope.row.shift[3]" :clearable='false' @change="handleEdit(scope,3,$event)">
                        <el-option v-for="(item,index) in classify" :key="index" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                  </template>
              </el-table-column>
              <el-table-column align="center" :label="'周五('+this.getsubstr('Friday')+')'">
                   <template slot-scope="scope">
                       <span v-if="edit_id !== scope.row.id  || (cur_date >= scope.row.week[4]) || hides[4]">{{scope.row.shift[4]}}</span>
                       <el-select v-else v-model="scope.row.shift[4]" :clearable='false' @change="handleEdit(scope,4,$event)">
                        <el-option v-for="(item,index) in classify" :key="index" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                  </template>
              </el-table-column>
              <el-table-column align="center" :label="'周六('+this.getsubstr('Saturday')+')'">
                   <template slot-scope="scope">
                       <span v-if="edit_id !== scope.row.id  || (cur_date >= scope.row.week[5]) || hides[5]">{{scope.row.shift[5]}}</span>
                      <el-select v-else v-model="scope.row.shift[5]" :clearable='false' @change="handleEdit(scope,5,$event)">
                        <el-option v-for="(item,index) in classify" :key="index" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                  </template>
              </el-table-column>
              <el-table-column align="center" :label="'周日('+this.getsubstr('Sunday')+')'">
                   <template slot-scope="scope">
                       <span v-if="edit_id !== scope.row.id || (cur_date >= scope.row.week[6]) || hides[6]">{{scope.row.shift[6]}}</span>
                       <el-select v-else v-model="scope.row.shift[6]" :clearable='false' @change="handleEdit(scope,6,$event)">
                        <el-option v-for="(item,index) in classify" :key="index" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                  </template>
              </el-table-column>
              <el-table-column fixed="right" align="center" label="操作" width="80px">
               <template slot-scope="scope">
               <el-button type="text" @click="editRow(scope.$index,scope.row)">编辑</el-button>
               </template>
             </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
import moment from "moment";
export default {
  name: "foreground",
  inject: ["reload"],
  data() {
    return {
      currentPage: 1,
      currentSelectRow: "",
      pagesize: 10,
      tableData: [],
      classify: [],
      hides:[false, false, false, false, false, false,false],
      week:[],
      dateValue: "", //哪一周
      DefaultShow:"",
      thetime:"",
      idd:'',
      edit_id:'',
      cur_date: moment(new Date()).format("YYYY-MM-DD").toString(),
      value: "",
      options: [
        {
          value: "1",
          label: "复制本周"
        },
        {
          value: "2",
          label: "复制本月"
        }
      ],
      riqi:"",
      hangid:"",
    };
  },
  created() {
    this.gettabledata();
    setTimeout(() => {
      this.Rotationselect();
    }, 1000);
  },
    computed: {
    //周一
    Monday() {
      if (this.dateValue == "") {
        this.dateValue = this.GetDateStr(
          0,
          this.getFirstDayOfWeek(new Date())
        );
        return this.dateValue;
      } else {
        this.dateValue = this.GetDateStr(
          0,
          this.getFirstDayOfWeek(this.dateValue)
        );
        return this.dateValue;
      }
    },
    //周末
    Sunday() {
      if (this.dateValue == "") {
        return this.GetDateStr(0, this.getFirstDayOfWeek(new Date(), 2));
      } else {
        return this.GetDateStr(0, this.getFirstDayOfWeek(this.dateValue, 2));
      }
    }
  },
  mounted(){
      this.DefaultShow = this.getCurrentDateTime();
  },
  methods: {
      getCurrentDateTime() {
      return moment(new Date()).format("YYYY-MM-DD");
    },
    editRow(index,row){
       this.edit_id = row.id;
        var curDate = this.getCurrentDateTime();
        var weeks = this.tableData[index].week;
        this.hides = [false, false, false, false, false, false,false]
    },
    handleEdit(rowdata,num,val) {
        this.hides[num] = !this.hides[num];
        this.riqi = rowdata.row.week[num];
        this.hangid = rowdata.row.staffShiftId[num];
        this.classify.map((item, index) => {
            if (val == item.name) {
                this.idd = item.id;
        }
      });
        this.Editarrange();
    },
    changeWeek(val) {
      this.gettabledata();
    },
      // 获取指日期的周一/日时间
    getFirstDayOfWeek(date, num) {
      num = num ? num : 1;
      var day = date.getDay() || 7;
      if (num == 1) {
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1 - day
        );
      } else {
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 7 - day
        );
      }
    },
    // 获取指定天数后的时间
    GetDateStr(num, day) {
      var day = day || new Date();
      let date = new Date(day);
      date.setDate(date.getDate() + num);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    getsubstr(name) {
      var dates = this.week[name];
      if (dates != null) {
        return dates.substring(5);
      }
    },
    //编辑排班
    Editarrange() {
      let _this = this;
      let editarrange = {
          staffId:_this.currentSelectRow.id,//员工编号
          date:this.riqi,//排班日期
          shiftId:this.idd,//班次编号
          type:'前台',//员工岗位
      };
      requestLogin("/staffShift/"+this.hangid,editarrange, "put")
        .then(res => {
          this.$message({
              message: "修改成功",
              type: "success"
            });
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
    //班次下拉框
    Rotationselect() { 
      let _this = this;
      requestLogin("/getShiftBySort/1", {}, "get")
        .then(res => {
          _this.classify = res;
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
    //表格数据
    gettabledata() {
      let _this = this;
      requestLogin("/getStaffShift/"+_this.Monday+"/1",{}, "get")
        .then(res => {
          _this.tableData = res.data;
          _this.edit_id = ''
          let { week} = res;
          _this.week = week;
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
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    rowClick(row, event, column) {
      this.currentSelectRow = row;
    },
    //复制排班表
    changeInfo2(val) {
      let _this = this;
      requestLogin("/copyStaffShift/"+_this.Monday+'/'+_this.value+'/1', {}, "get")
        .then(res => {
          this.$message({
            message: "复制排班表成功",
            type: "success"
          });
          _this.value = "";
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
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
.practice-list {
  width: 97%;
  height: 100%;
  margin: 0px auto;
  background: #fff;
  display: inline-block;
  .practice-center {
    height: 80px;
    margin-top: -10px;
    .purple {
      height: 80px;
      display: flex;
      justify-content: flex-start;
      .add {
          height: 35px;
          margin-top: 20px;
          margin-right: 27px;
          margin-left: 10px;
      }
      .add2 {
          height: 35px;
          margin-top: 20px;
          margin-right: 27px;
          margin-left: 10px;
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
    }
  }
}
</style>