<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="practice-main">
          <el-col :span="23" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>客户管理</el-breadcrumb-item>
              <el-breadcrumb-item>客户邀约</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="23" class="weber">
            <span class="weber-span">客户邀约</span>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <div class="cardopen">
      <el-row>
        <el-col :span="24">
             <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="我的邀约" name="second">
                    <template>
                        <div class="cardopen-table">
                        <el-table :data="tableData2.slice((currentPage2-1)*pagesize2,currentPage2*pagesize2)" border @row-click="rowClick2" :default-sort="{order: 'descending'}" highlight-current-row :header-cell-style="{background:'#fafafa'}" style="width: 100%">
                        <el-table-column prop="name" align="center" label="姓名" fixed></el-table-column>
                        <el-table-column prop="tel" align="center" label="联系方式" width="130"></el-table-column>
                        <el-table-column prop="customer" align="center" label="客户类型"></el-table-column>
                        <el-table-column prop="createDate" align="center" label="登记日期" width="160" sortable></el-table-column>
                        <el-table-column prop="lastRecordDate" align="center" label="上次跟进时间" width="200" sortable></el-table-column>
                        <el-table-column prop="RecordDate" align="center" label="邀约到店日期" width="160" sortable></el-table-column>
                        <el-table-column prop="content" align="left" label="邀约内容" width="400"></el-table-column>
                        <el-table-column prop="recordPerson" align="center" label="邀约人"></el-table-column>
                        <el-table-column align="center" label="操作" fixed="right" width="180">
                          <template slot-scope="scope">
                            <el-button type="success" plain size="small" v-if="scope.row.status == '待赴约'" @click="invited(scope.row,3)">赴约</el-button>
                            <el-button type="success" plain size="small" v-if="scope.row.status == '待赴约'" @click="invited(scope.row,2)">失约</el-button>
                            <span v-if="scope.row.status == '已赴约'">已赴约</span>
                            <span v-if="scope.row.status == '失约'">已失约</span>
                          </template>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2" background :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pagesize2" layout="total, sizes, prev, pager, next, jumper" :total="tableData2.length">
                        </el-pagination>
                    </div>
                    </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="待邀约客户" name="first" :disabled="first">
                    <template>
                      <div class="cardopenstab">
                        <div class="cardopen-table1" v-show="table">
                        <el-table :data="tableData1.slice((currentPage-1)*pagesize,currentPage*pagesize)" ref="singleTable" @select="selectClick" @selection-change="selsChange" :row-key="getRowKeys" border @row-click="rowClick" :default-sort="{order: 'descending'}" highlight-current-row :header-cell-style="{background:'#fafafa'}" style="width: 100%">
                        <el-table-column type="selection" :reserve-selection="true" width="50" align="center" fixed ></el-table-column>
                        <el-table-column prop="name" align="center" label="姓名" fixed></el-table-column>
                        <el-table-column prop="tel" align="center" label="联系方式"></el-table-column>
                        <el-table-column prop="customer" align="center" label="客户类型"></el-table-column>
                        <el-table-column prop="register" align="center" label="登记日期" sortable></el-table-column>
                        <el-table-column prop="lastRecordDate" align="center" label="上次跟进时间" sortable></el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData1.length">
                        </el-pagination>
                    </div>
                    </div>
                    <div class="cardopen-table2" v-show="derupgenjin" v-if="this.taste.length > 0">
                      <el-col :span="24" class="taste-top" v-for="item in taste" :key="item.packetId">
                      <div class="round"></div>
                      <div class="data">{{item.reCreaTime}}</div>
                      <div class="record">{{item.reContent}}</div>
                    </el-col>
                    </div>
                    <div v-else v-show="derupgenjin"  style="margin:6% auto;width: 88%;">
                      暂无跟进记录~~
                    </div>
                    <div class="cardopen-right">
                      <div class="right-button">
                        <div class="user">
                          <el-select v-model="couponSelected" @change="getCouponSelected">
                            <el-option v-for="item in couponList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                      </div>
                      </div>
                      <div class="right-button2">
                        <el-button type="text" @click="genjin">添加跟进</el-button>
                        <template>
                          <el-dialog title="添加跟进" :append-to-body="true" :visible.sync="dialogFormVisible">
                            <!--添加跟进-->
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                              <el-form-item label="跟进内容:" prop="desc" :label-width="formLabelWidth">
                                <el-col :span="22" class="from-date">
                                  <el-input type="textarea" v-model.trim="ruleForm.desc" maxlength="100" @input="descInput" placeholder="请输入"></el-input>
                                  <span class="textarea">还可以输入{{remnant}}字</span>
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
                      <div class="right-button3">
                        <el-button type="text" @click="yaoyue">邀约到店</el-button>
                        <template>
                          <el-dialog title="邀约到店" :append-to-body="true" :visible.sync="dialogFormVisible2">
                            <!--邀约到店-->
                            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px">
                              <el-form-item label="日期:" prop="kcStime" :label-width="formLabelWidth">
                                <el-col :span="22">
                                  <el-date-picker type="date" placeholder="请选择" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="ruleForm2.kcStime" style="width: 100%;"></el-date-picker>
                                </el-col>
                              </el-form-item>
                              <el-form-item label="跟进内容:" prop="desc" :label-width="formLabelWidth">
                                <el-col :span="22" class="from-date">
                                  <el-input type="textarea" v-model.trim="ruleForm2.desc" maxlength="100" @input="descInput2" placeholder="请输入"></el-input>
                                  <span class="textarea">还可以输入{{remnant}}字</span>
                                </el-col>
                              </el-form-item>
                              <el-form-item class="dialog-footer">
                                <el-col :span="24" style="display: flex;justify-content: flex-end;">
                                  <el-button @click="resetForm2('ruleForm2')">重置</el-button>
                                  <el-button type="primary" @click="addcustomer('ruleForm2')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                                </el-col>
                              </el-form-item>
                            </el-form>
                          </el-dialog>
                        </template>
                        </div>
                      <div class="right-button4">
                        <el-button type="text" @click="insiderup">跟进记录</el-button>
                      </div>
                      <div class="right-button5" v-if="this.roless">
                        <el-button type="text" @click="tobeinvited">全店待邀约客户</el-button>
                      </div>
                    </div>
                    </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="全店邀约" name="third" :disabled="third" v-if="quandian">
                    <template>
                        <div class="cardopen-table">
                        <el-table :data="tableData3.slice((currentPage3-1)*pagesize3,currentPage3*pagesize3)" border @row-click="rowClick3" :default-sort="{order: 'descending'}" highlight-current-row :header-cell-style="{background:'#fafafa'}" style="width: 100%">
                        <el-table-column prop="name" align="center" label="姓名" fixed></el-table-column>
                        <el-table-column prop="tel" align="center" label="联系方式" width="130"></el-table-column>
                        <el-table-column prop="customer" align="center" label="客户类型"></el-table-column>
                        <el-table-column prop="createDate" align="center" label="登记日期" width="160" sortable></el-table-column>
                        <el-table-column prop="lastRecordDate" align="center" label="上次跟进时间" width="200" sortable></el-table-column>
                        <el-table-column prop="RecordDate" align="center" label="邀约到店日期" width="160" sortable></el-table-column>
                        <el-table-column prop="content" align="left" label="邀约内容" width="400"></el-table-column>
                        <el-table-column prop="recordPerson" align="center" label="邀约人"></el-table-column>
                        <el-table-column align="center" label="操作" fixed="right" width="100">
                          <template slot-scope="scope">
                            <span>{{scope.row.status}}</span>
                          </template>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange3" @current-change="handleCurrentChange3" :current-page="currentPage3" background :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pagesize3" layout="total, sizes, prev, pager, next, jumper" :total="tableData3.length">
                        </el-pagination>
                    </div>
                    </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "customerinvitation",
  inject: ["reload"],
  data() {
    return {
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      currentPage: 1,
      pagesize: 10,
      currentPage2: 1,
      pagesize2: 10,
      currentPage3: 1,
      pagesize3: 10,
      identity:"",
      genjinsels:"",
      quandian:false,
      ids:"",
      nums:"",
      sels: [],
      taste:[],
      table:true,
      first:false,
      third:false,
      derupgenjin:false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "130px",
      activeName: 'second',
      ruleForm: {
        desc: "" //跟进内容
      },
      ruleForm2: {
        kcStime:"",//日期
        desc: "" //跟进内容
      },
      rules: {
        desc: [{ required: true, message: "请输入跟进内容", trigger: "blur" }]
      },
       rules2: {
        kcStime:[{required:true,message: "请选择日期", trigger: "blur" }],
        desc: [{ required: true, message: "请输入跟进内容", trigger: "blur" }]
      },
      remnant:100,
      couponList:[
        { value: "1", label: "全部" },
        { value: "experience", label: "体验" },
        { value: "potential", label: "潜在" },
        { value: "deposit", label: "定金" }
        ],
      couponSelected: '',
      status:"",
      roles:"",
      roless:"",
      collectiveInvitation:"",
      systemRole:""
    };
  },
  watch: {
    couponSelected(val) {
      if (!val) {
        this.tableData1 = this.tableData4;
      }
    },
  },
  created: function() {
    this.getTableData();
    this.couponSelected = this.couponList[0].value;
  },
  methods: {
    //我的邀约表格数据
    getTableData() {
      let _this = this;
      requestLogin("/CustomerFollowUp/invitation/my", {}, "get")
        .then(function(res) {
          _this.tableData2 = res.data;
          _this.status = res.status;
          _this.roles = res.role;
          _this.systemRole = res.systemRole;
          if(res.status == true && res.role.indexOf("会籍顾问") != -1){
            _this.getTableData3();
          }
          if(res.status == true && res.systemRole){
            _this.getTableData2();
          }
          if(res.status == false && res.systemRole){
            _this.first = true;
          }
          _this.roles = res.role.split(",");
          _this.systemRole = res.systemRole.split(",");
          for(var i = 0; i < _this.systemRole.length;i++){
            for(var j =0; j < _this.roles.length;j++){
              if(_this.systemRole[i] == _this.roles[j]){
                _this.quandian = true;
                break;
              }
            }
          }
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
    //全店邀约表格数据
    getTableData2() {
      let _this = this;
      requestLogin("/CustomerFollowUp/invitation/whole", {}, "get")
        .then(function(res) {
          _this.tableData3 = res.data;
          // _this.systemRole =res.systemRole;
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
    //待邀约表格数据
    getTableData3() {
      let _this = this;
      requestLogin("/CustomerFollowUp/invitation/wait", {}, "get")
        .then(function(res) {
          _this.tableData1 = res.data;
          // _this.collectiveInvitation = res.collectiveInvitation;
          _this.roless = res.roles;
           _this.tableData4 = res.data;
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
    //全店待邀约客户
    tobeinvited(){
      let _this = this;
      _this.table = true;
      _this.derupgenjin = false;
      requestLogin("/CustomerFollowUp/invitation/wait/2", {}, "get")
        .then(function(res) {
          _this.tableData1 = res.data;
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
    //跟进记录
    getTablederup() {
      let _this = this;
      requestLogin("/CustomerFollowUp/getFollowUpRecord/"+_this.identity+"/"+_this.genjinsels, {}, "get")
        .then(function(res) {
          _this.taste = res.record;
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
     //添加跟进记录
    submitForm(formName) {
       if(this.ruleForm.desc.length < 10){
         this.$message({
            message: "输入字数不能少于10个字",
            type: "warning"
          });
      }else{
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              identity: this.identity, //客户类别
              id: this.genjinsels, //客户id
              content: this.ruleForm.desc //内容
            };
            requestLogin(
              "/CustomerFollowUp/addFollowUpRecord",
              loginParams,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                // this.reload();
                this.getTableData2();
                this.getTableData3();
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
    //邀约到店
    addcustomer(formName){
      if(this.ruleForm2.desc.length < 10){
         this.$message({
            message: "输入字数不能少于10个字",
            type: "warning"
          });
      }else{
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var loginParams = {
              identity: this.identity, //客户类别
              id: this.genjinsels, //客户id
              day:this.ruleForm2.kcStime,//日期
              content: this.ruleForm2.desc //内容
            };
            requestLogin(
              "/CustomerFollowUp/invitation/create",
              loginParams,
              "post"
            )
              .then(data => {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                // this.reload();
                this.getTableData2();
                this.getTableData3();
                this.dialogFormVisible2 = false;
                this.resetForm2(formName);
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
    selectClick(selection, row){
      this.currentSelectRow = row;
      this.identity = this.currentSelectRow.identity;
      this.genjinsels = this.currentSelectRow.cid;
    },
    //待邀约
    invited(row,pass){
      this.$confirm("确认提交吗？", "提示").then(() => {
            requestLogin("/CustomerFollowUp/handleInvitation/"+this.ids+"/"+pass, {}, "get")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.getTableData();
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
    genjin(){
      if(this.sels.length > 1){
        this.$message({ message: "只能选择一条数据!", type: "warning" });
        return;
      }
      this.currentSelectRow = this.tableData1.filter(item => item.cid===this.sels[0])[0];
      if (this.currentSelectRow) {
        this.dialogFormVisible = true;
        this.table = true;
        this.derupgenjin = false;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    yaoyue(){
      if(this.sels.length > 1){
        this.$message({ message: "只能选择一条数据!", type: "warning" });
        return;
      }
      this.currentSelectRow = this.tableData1.filter(item => item.cid===this.sels[0])[0];
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
        this.table = true;
        this.derupgenjin = false;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    insiderup(){
      if(this.sels.length > 1){
        this.$message({ message: "只能选择一条数据!", type: "warning" });
        return;
      }
      this.currentSelectRow = this.tableData1.filter(item => item.cid===this.sels[0])[0];
      if (this.currentSelectRow) {
        this.derupgenjin = true;
        this.table = false;
        this.getTablederup();
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
        this.table = true;
        this.derupgenjin = false;
      }
    },
    getRowKeys(row) {
      return row.cid;
    },
    selsChange(sels) {
      this.sels=[];
      if(sels.length>0){
          for(var i=0;i<sels.length;i++){
           this.sels.push(sels[i].cid);
        }
      }
    },
    getCouponSelected(){
        this.table = true;
        this.tableData1 = this.tableData4;
        this.tableData1 = this.tableData4.filter(
        i => i.identity.includes(this.couponSelected)
      );
        if(this.couponSelected == "1"){
          this.getTableData3();
          this.table = true;
        }
    },
    resetForm2(formName) {
      this.$refs[formName].resetFields();
      this.remnant = 100;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.remnant = 100;
    },
     descInput() {
      var txtVal = this.ruleForm.desc.length;
      this.remnant = 100 - txtVal;
    },
     descInput2() {
      var txtVal = this.ruleForm2.desc.length;
      this.remnant = 100 - txtVal;
    },
     handleClick(tab, event) {
      },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange2(size) {
      this.pagesize2 = size;
    },
    handleCurrentChange2(currentPage2) {
      this.currentPage2 = currentPage2;
    },
    handleSizeChange3(size) {
      this.pagesize3 = size;
    },
    handleCurrentChange3(currentPage3) {
      this.currentPage3 = currentPage3;
    },
    rowClick(row, event, column) {
      this.currentSelectRow = row;
      this.identity = this.currentSelectRow.identity;
      this.genjinsels = this.currentSelectRow.cid;
      this.$refs.singleTable.toggleRowSelection(row);
    },
    rowClick2(row, event, column) {
      this.currentSelectRow = row;
      this.ids = this.currentSelectRow.id;
      this.nums = this.currentSelectRow.status;
    },
    rowClick3(row, event, column) {
      this.currentSelectRow = row;
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
.el-table {
    color: #595959 !important;
    width: 100% !important;
    margin: 0 auto !important;
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
.cardopen {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .cardopen-table{
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
  .cardopenstab{
    display: flex;
    justify-content: space-between;
   .cardopen-table1{
     width: 88%;
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
  .cardopen-table2{
     width: 88%;
     .taste-top {
      margin: 10px auto;
      border-radius: 16px;
      background: #f2faf7;
      display: flex;
      height: 32px;
      line-height: 32px;
      .round {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid #00bc71;
        margin: 10px;
      }
      .data {
        font-family: PingFang-SC-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #595959;
      }
      .record {
        margin-left: 30px;
        font-family: PingFang-SC-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #595959;
      }
    }
  }
  .cardopen-right{
    width: 27%;
    .right-button{
      display: flex;
      justify-content: flex-end;
      .el-button{
        box-shadow: #ebebeb 0px 0px 0px 1px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 140px;
        margin-right: 10px;
        color: #555;
      }
      .user{
        width: 140px;
        background: #DCDCDC;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border-radius: 5px;
      }
    }
    .right-button2{
      text-align: right;
      margin-top:10px;
      .el-button{
        box-shadow: #ebebeb 0px 0px 0px 1px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 140px;
        color: #555;
      }
    }
    .right-button3{
      text-align: right;
      margin-top:10px;
      .el-button{
        box-shadow: #ebebeb 0px 0px 0px 1px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 140px;
        color: #555;
      }
    }
    .right-button4{
      text-align: right;
      margin-top:10px;
      .el-button{
        box-shadow: #ebebeb 0px 0px 0px 1px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 140px;
        color: #555;
      }
    }
    .right-button5{
      text-align: right;
      margin-top:10px;
      .el-button{
        box-shadow: #ebebeb 0px 0px 0px 1px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 140px;
        color: #555;
      }
    }
  }
  }
}
</style>
