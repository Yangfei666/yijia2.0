<template>
  <div>
      <!--团课课程表-->
    <div class="practice-center">
        <el-row>
            <el-col :span="24">
                <div class="purple">
                    <div class="add">
                        <el-button type="text" class="add-p el-icon-plus" @click="dialogFormVisible = true">添加课程</el-button>
                        <template>
                        <el-dialog title="添加课程(2018-07-10 周二)" :append-to-body="true" :visible.sync="dialogFormVisible">
                        <!--添加课程-->
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                            <el-form-item label="课程:" prop="course" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-select v-model="ruleForm.course" placeholder="请选择" style="width:100%">
                                <el-option label="Angel" value="cishucard"></el-option>
                                <el-option label="ViVi" value="jinecard"></el-option>
                                </el-select>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="课程分类:" prop="courseclassify" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-select v-model="ruleForm.courseclassify" placeholder="请选择" style="width:100%">
                                <el-option label="Angel" value="cishucard"></el-option>
                                <el-option label="ViVi" value="jinecard"></el-option>
                                </el-select>
                                </el-col>
                            </el-form-item>
                        <el-form-item label="教练:" prop="train" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-select v-model="ruleForm.train" placeholder="请选择" style="width:100%">
                                <el-option label="Angel" value="cishucard"></el-option>
                                <el-option label="ViVi" value="jinecard"></el-option>
                                </el-select>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="教室:" prop="room" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-select v-model="ruleForm.room" placeholder="请选择" style="width:100%">
                                <el-option label="Angel" value="cishucard"></el-option>
                                <el-option label="ViVi" value="jinecard"></el-option>
                                </el-select>
                                </el-col>
                            </el-form-item>
                            <el-form-item  label="上课时间:" prop="attendtime" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-time-picker is-range v-model="ruleForm.attendtime" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 100%;"></el-time-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="容纳人数:" prop="galleryful" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-input v-model="ruleForm.galleryful" placeholder="请输入"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="难度:" prop="difficulty" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-input v-model="ruleForm.difficulty" placeholder="请输入"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="价格:" prop="price" :label-width="formLabelWidth">
                            <el-col :span="22">
                                <el-input v-model="ruleForm.price" placeholder="请输入"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item class="dialog-footer">
                            <el-col :span="24" style="display: flex;justify-content: flex-end;">
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                            <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                            </el-col>
                        </el-form-item>
                        </el-form>
                        </el-dialog>
                        </template>
                    </div>
                    <div class="add">
                    <el-button type="text" class="p"  @click="changeInfo">修改课程</el-button>
                    <template>
                        <el-dialog title="修改课程" :append-to-body="true" :visible.sync="dialogFormVisible3">
                        <Editcurriculum :currentSelectRow="currentSelectRow"></Editcurriculum>
                        </el-dialog>
                        </template>
                    </div>
                    <div class="add">
                    <el-button type="text" class="p" @click="dialogFormVisible2 = true">预约团课</el-button>
                    <template>
                        <el-dialog title="预约团课" :append-to-body="true" :visible.sync="dialogFormVisible2">
                        <Group></Group>
                        </el-dialog>
                        </template>
                    </div>
                    <div class="add2">
                        <el-button type="text" class="p" @click="open2">删除课程</el-button>
                    </div>
                </div>
                </el-col>
        </el-row>
    </div>
    <div class="practice-table">
        <el-row>
            <el-col :span="24">
                <el-table  highlight-current-row 
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"  
                @row-click="rowClick" style="width: 100%" :header-cell-style="{background:'#fafafa'}">
                    <el-table-column align="center" prop="radio" fixed width="50px">
                    <template slot-scope="scope">
                        <el-radio-group v-model="radio">
                            <el-radio :label="scope.$index" @change.native="radiochange(scope.row)">&nbsp;</el-radio>
                        </el-radio-group>
                        </template>
                    </el-table-column>
                    <el-table-column prop="classname" align="left" label="课程名称"></el-table-column>
                    <el-table-column prop="statstime" align="left" label="上课时间"></el-table-column>
                    <el-table-column prop="color" align="left" label="底色"></el-table-column>
                    <el-table-column prop="train" align="left" label="教练"></el-table-column>
                    <el-table-column prop="gorp" align="left" label="团课/私教"></el-table-column>
                    <el-table-column prop="booked" align="left" label="已预约"></el-table-column>
                    <el-table-column prop="difficulty" align="left" label="难度" fixed="right"></el-table-column>
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
</template>
<script>
import Editcurriculum from "@/components/editcurriculum";
import Group from "@/components/group";
export default {
    name:'grouptimetable',
    components: {
      Group,
      Editcurriculum,
  },
  data() {
    return {
        formLabelWidth: '130px',
        ruleForm: {
          course:'',//课程
          courseclassify: '',//课程分类
          train:'',//教练
          room: '',//教室
          attendtime:'',//上课时间
          galleryful:'',//容纳人数
          difficulty:'',//难度
          price:''//价格
        },
        rules: {
          course:[
            {required: true, message: '请选择课程', trigger: 'change' }
          ],
          courseclassify: [
            { required: true, message: '请选择课程分类', trigger: 'change' }
          ],
          train: [
            {required: true, message: '请选择教练', trigger: 'change' }
          ],
          room: [
            {required: true, message: '请选择教室', trigger: 'change' }
          ],
         attendtime:[
             {required: true, message: '请选择上课时间', trigger: 'change' }
         ],
         galleryful:[
             {required: true, message: '请输入容纳人数', trigger: 'blur'}
         ],
         difficulty:[
             {required: true, message: '请输入课程难度', trigger: 'blur'}
         ],
         price:[
             {required: true, message: '请输入课程价格', trigger: 'blur'}
         ]
        },
        currentSelectRow: "",
        dialogFormVisible: false,
        dialogFormVisible2: false,
        dialogFormVisible3:false,
        currentPage:1,
        pagesize:10,
        radio:true,
        tableData:[{
          index:0,
          classname:'空中瑜伽',
          statstime:'2018-06-2',
          color:'白',
          train:'Angel',
          gorp:'团课',
          booked:'2/80',
          difficulty:'3',
          jiaoshi:'大教室',
          renshu:'20',
          price:200.00
      },{
          index:1,
          classname:'空中瑜伽',
          statstime:'2018-06-2',
          color:'白',
          train:'Angel',
          gorp:'团课',
          booked:'2/80',
          difficulty:'3',
          jiaoshi:'大教室',
          renshu:'20',
          price:200.00
      },{
          index:2,
          classname:'空中瑜伽',
          statstime:'2018-06-2',
          color:'白',
          train:'Angel',
          gorp:'团课',
          booked:'2/80',
          difficulty:'3',
          jiaoshi:'大教室',
          renshu:'20',
          price:200.00
      },{
          index:3,
          classname:'空中瑜伽',
          statstime:'2018-06-2',
          color:'白',
          train:'Angel',
          gorp:'团课',
          booked:'2/80',
          difficulty:'3',
          jiaoshi:'大教室',
          renshu:'20',
          price:200.00
      },{
           index:4,
          classname:'空中瑜伽',
          statstime:'2018-06-2',
          color:'白',
          train:'Angel',
          gorp:'团课',
          booked:'2/80',
          difficulty:'3',
          jiaoshi:'大教室',
          renshu:'20',
          price:200.00
      },{
          index:5,
          classname:'空中瑜伽',
          statstime:'2018-06-2',
          color:'白',
          train:'Angel',
          gorp:'团课',
          booked:'2/80',
          difficulty:'3',
          jiaoshi:'大教室',
          renshu:'20',
          price:200.00
      },{
          index:6,
          classname:'空中瑜伽',
          statstime:'2018-06-2',
          color:'白',
          train:'Angel',
          gorp:'团课',
          booked:'2/80',
          difficulty:'3',
          jiaoshi:'大教室',
          renshu:'20',
          price:200.00
      },{
          index:7,
          classname:'空中瑜伽',
          statstime:'2018-06-2',
          color:'白',
          train:'Angel',
          gorp:'团课',
          booked:'2/80',
          difficulty:'3',
          jiaoshi:'大教室',
          renshu:'20',
          price:200.00
      },{
          index:8,
          classname:'空中瑜伽',
          statstime:'2018-06-2',
          color:'白',
          train:'Angel',
          gorp:'团课',
          booked:'2/80',
          difficulty:'3',
          jiaoshi:'大教室',
          renshu:'20',
          price:200.00
      }]
    }
  },
   methods: {
       radiochange(row) {
      console.log(`当前: ${row}`);
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
    },
    changeInfo() {//先选择列表
      if (this.currentSelectRow) {
        this.dialogFormVisible3 = true;
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
      open2() {
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData = this.tableData.splice(1)
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style lang="scss" scoped>
 @import '@/styles/group.scss';
</style>
<style lang="scss">
 @import '@/styles/dialog.scss';
</style>