<template>
  <!--会员表格-->
  <div class="practice-list">
    <el-row>
      <el-form ref="formInline" :model="formInline" class="demo-form-inline" label-width="90px" @submit.native.prevent>
        <div class="quanbu">
          <div class="search-form">
            <el-form-item label="会员卡种:">
              <el-col :span="24">
                <el-autocomplete v-model.trim="formInline.membercard" :trigger-on-focus="false" placeholder="请输入" clearable style="width:170px;" :fetch-suggestions="querySearchAsync" @select="handleSelect"></el-autocomplete>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form">
            <el-form-item label="到期时间:">
              <el-col :span="24">
                <el-date-picker v-model="formInline.date" format="yyyy-MM-dd" :clearable="false" value-format="yyyy-MM-dd" type="daterange" range-separator="~" start-placeholder="起始日期" end-placeholder="截止日期" style="width:230px"></el-date-picker>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form" v-show="isShow && isAdviser">
            <el-form-item label="所属会籍:">
              <el-col :span="24">
                <el-select v-model="formInline.adviser" placeholder="请选择" style="width:100%" @change="Selectchange2">
                  <el-option v-for="item in staff_info" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form" v-show="isShow">
            <el-form-item label="卡状态:">
              <el-col :span="24">
                <el-select v-model="formInline.status" placeholder="请选择" style="width:200px" @change="Selectchange">
                  <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form2" v-show="isShow">
            <el-form-item label="剩余次数:">
              <el-col :span="12">
                <el-input v-model.trim="formInline.numsmall" placeholder="最小值" clearable style="width:100px;font-size:12px"></el-input>
              </el-col>
              <el-col :span="1">
                <el-input v-model.trim="formInline.numbig" placeholder="最大值" clearable style="width:100px;font-size:12px"></el-input>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form2" v-show="isShow">
            <el-form-item label="剩余金额:">
              <el-col :span="12">
                <el-input v-model.trim="formInline.fundsmall" placeholder="最小值" clearable style="width:100px;font-size:12px"></el-input>
              </el-col>
              <el-col :span="1">
                <el-input v-model.trim="formInline.fundbig" placeholder="最大值" clearable style="width:100px;font-size:12px"></el-input>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form" v-show="isShow">
            <el-form-item label="多久未跟进:" label-width="100px">
              <el-col :span="24">
                <el-select v-model="formInline.follow" placeholder="请选择" style="width:200px" @change="Selectchange3">
                  <el-option v-for="item in follow" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </div>
          <div class="search-form">
            <el-form-item label-width="40px">
              <el-col :span="24">
                <el-button type="primary" @click="getTableData(false)">查询</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-col>
            </el-form-item>
          </div>
          <div class="corry">
            <el-button type="text" class="corry-out" @click="showToggle">{{btnText}}
              <i class="el-icon-arrow-down" v-show="downIcon"></i>
              <i class="el-icon-arrow-up" v-show="!downIcon"></i>
            </el-button>
          </div>
        </div>
      </el-form>
    </el-row>
    <div class="practice-center">
      <el-row>
        <el-col :span="12">
          <div class="purple">
            <div class="add">
              <el-button type="text" class="add-b el-icon-plus" @click="dialogFormVisible = true">添加会员</el-button>
              <template>
                <el-dialog title="添加会员" :append-to-body="true" :visible.sync="dialogFormVisible">
                  <Addmember :huiyuanqufen='Huiyuanqufen'></Addmember>
                </el-dialog>
              </template>
            </div>
            <div class="add">
              <el-button type="text" class="add-b" @click="func2()">会员跟进</el-button>
            </div>
            <div class="add">
              <el-button type="text" class="add-b" @click="zhuye()">会员主页</el-button>
            </div>
            <div class="add">
              <el-button type="text" class="add-b" @click="removeBatch()">变更会籍</el-button>
              <template>
                <el-dialog title="批量变更会籍" :append-to-body="true" :visible.sync="dialogFormVisible7">
                  <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" @submit.native.prevent>
                    <el-form-item label="会籍顾问:" prop="changemembership" :label-width="formLabelWidth">
                      <el-col :span="22">
                        <el-select v-model="ruleForm.changemembership" placeholder="请选择" style="width:100%" @change="Selectchange2">
                          <el-option v-for="item in staff_info" :key="item.YGXX_YGID_NEI" :label="item.YGXX_NAME" :value="item.YGXX_YGID_NEI"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                    <el-form-item class="dialog-footer">
                      <el-col :span="24" style="display: flex;justify-content: flex-end;">
                        <el-button @click="chongzhi('ruleForm')">重置</el-button>
                        <el-button type="primary" @click="auditServer('ruleForm')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                      </el-col>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </template>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="purple2">
            <el-col :span="10" class="search">
              <el-input id="input" maxlength="18" v-model.trim="searchVal" placeholder="搜索姓名/电话/卡号"></el-input>
              <i class="search-icon el-icon-search" @click="search"></i>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="practice-table">
      <el-row>
        <el-col :span="24">
          <el-table id="rebateSetTable" :row-class-name='tableRowClassName' @select="selectClick" @selection-change="selsChange" :row-key="getRowKeys" ref="singleTable" @current-change="handleCurrentChange2" highlight-current-row v-loading="loading" element-loading-text="拼命加载中..." @row-click="rowClick" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :header-cell-style="{background:'#fafafa'}" style="width: 100%">
            <el-table-column type="selection" :reserve-selection="true" width="40" align="center" fixed></el-table-column>
            <el-table-column prop="HYName" align="left" label="姓名" fixed width="130px"></el-table-column>
            <el-table-column prop="MotoTel" align="left" label="手机号" width="170px"></el-table-column>
            <el-table-column prop="CardNO" align="left" label="卡号" width="160px"></el-table-column>
            <el-table-column prop="CTName" align="left" label="卡种" width="170px"></el-table-column>
            <el-table-column prop="YGXX_NAME" align="left" label="会籍" width="110px"></el-table-column>
            <el-table-column prop="eTime" align="left" label="到期时间" width="120px"></el-table-column>
            <el-table-column prop="State" align="center" label="卡状态"></el-table-column>
            <el-table-column prop="State" align="center" label="未跟进天数" width="150px">
              <template slot-scope="scope">
                <span v-if="scope.row.hyRecordTime == '2018-01-01'">未跟进过</span>
                <span v-else>{{dateDiff(scope.row.hyRecordTime)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SYCS" align="center" label="剩余次数"></el-table-column>
            <el-table-column prop="SYJE" align="center" label="剩余金额"></el-table-column>
            <el-table-column prop="cz" align="center" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button @click="go(scope.$index,scope.row)" type="text" size="small" v-if="scope.row.hyHealth == 1">认领</el-button>
                <el-button type="text" size="small" v-else :disabled="true">已认领</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-button size="small" class="download" @click="dialogVisible = true">下载模板</el-button>
            <el-upload  style="display: inline-block;"
                    ref="upload"
                    action="#"    
                    name="excel-file"
                    :before-upload="beforeUpload"
                    :file-list="fileList"
                    :limit="1"
                    :format ="['xlsx','xls']">
                        <el-button size="small" class="batchimport">批量导入</el-button>
                </el-upload>
            <el-button size="small" class="export" @click="exportExcel">导出</el-button>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
          </div>
          <el-dialog title="会员客户模版填写必读" :visible.sync="dialogVisible" :before-close="handleClose">
            <el-card class="box-card">
              <div style="height:640px;">
                <el-steps direction="vertical">
                  <el-step description="必须按照模填写客户资料,切记不可以更改模版的字段顺序,否则将导致导入失败或者资料导入错误"></el-step>
                  <el-step description="带*部分为必填"></el-step>
                  <el-step description="导入客户数据之前请确保系统已录入至少一个会籍顾问"></el-step>
                  <el-step description="会籍顾问一栏填写的内容必须与系统一模一样(也就是说系统里录入会籍顾问是'张三',表格内填写的也必须是'张三',不可以是'张山'),这样系统将会自动将客户匹配给对应会籍顾问"></el-step>
                  <el-step description="如果有部分客户的会籍顾问匹配不上,系统将会自动分配给系统内记录的第一个会籍顾问(系统打开'员工管理',看到的第一个会籍顾问)" style="padding-top:35px;"></el-step>
                  <el-step description="性别一栏请填写'女'或者'男',填错一律默认'女'" style="padding-top:20px;"></el-step>
                  <el-step description="导入客户数据之前请确保系统已录入全部的会员卡,否则一单模版文件中填写的会员卡系统内没有录入,会导致该客户的会员卡信息错误"></el-step>
                  <el-step description="付款方式请填写[微信,支付宝,现金,银行卡,信用卡,手机银行转账]其中的一项,注意不要填错,否则一律默认'微信'" style="padding-top:20px;"></el-step>
                  <el-step description="填写时间的内容必须年月日都写,如'2019-01-01','2019/1/1'等格式都可以" style="padding-top:20px;"></el-step>
                  <el-step description="卡状态一栏请填写[正常,未激活,挂失,请假,过期,退卡,不通过]其中的意向,填错会导致客户卡状态不对,影响客户使用"></el-step>
                  <el-step description="缴费金额一栏请填写客户实际缴费的数目" style="padding-top:20px;"></el-step>
                </el-steps>
              </div>
            </el-card>
            <div class="checkboxlook"><el-checkbox v-model="checked" @change="rememberlook" style="font-size:16px;">我已认真阅读并理解</el-checkbox></div>
            <div class="dialog-footer2">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="download" :disabled="querenxiazai">下 载</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Addmember from "@/components/addmember";
import { requestLogin , requestDown} from "@/api/api";
import * as validate from "@/validate/Login";
import FileSaver from "file-saver";
import XLSX from "xlsx";
function downloadExcel(config, sourceData) {
  let subData = sourceData.map(item => {
    let temp = [];
    let keys = Object.keys(item);
    for (let i = 0, len = keys.length; i < len; i++) {
      if (config.limit.includes(keys[i])) {
        continue;
      }
      temp.push(item[keys[i]]);
    }
    return temp;
  });
  subData.unshift(config.headTitle);
  let data = subData;
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `${config.sheetName}`);
  XLSX.writeFile(wb, `${config.excelName}.xlsx`);
}
export default {
  name: "leaguermanagetable",
  inject: ["reload"],
  components: {
    Addmember
  },
  data() {
    return {
      fileList:[],
      checked: false,
      dialogVisible: false,
      querenxiazai:true,
      downIcon: true,
      dialogFormVisible: false,
      dialogFormVisible7: false,
      radio: true,
      currentPage: 1,
      pagesize: 10,
      btnText: "展开",
      isShow: false,
      loading: true,
      formLabelWidth: "130px",
      sels: [],
      ruleForm: {
        changemembership: ""
      },
      rules: {
        changemembership: validate.adviser
      },
      Customercategory: "member",
      Huiyuanqufen: { huiyuanqufen: "newCustomer", id: 1 ,bh:0,isAuto:2},
      formInline: {
        membercard: "",
        date: "",
        numsmall: "",
        numbig: "",
        fundsmall: "",
        fundbig: "",
        adviser: [],
        follow: [],
        status: []
      },
      tableData: [],
      tableData2: [],
      staff_info: [],
      searchVal: "",
      follow: [
        //多久未跟进
        { value: "1", label: "一周以内" },
        { value: "2", label: "1周到1月" },
        { value: "3", label: "1月到2个月" },
        { value: "4", label: "2个月以上" }
      ],
      status: [
        //状态
        { value: "未激活", label: "未激活" },
        { value: "正常", label: "正常" },
        { value: "挂失", label: "挂失" },
        { value: "请假", label: "请假" },
        { value: "退卡", label: "退卡" },
        { value: "过期", label: "过期" }
      ]
    };
  },
  watch: {
    searchVal(val) {
      //姓名电话
      if (!val) {
        this.tableData = this.tableData2;
      }
    },
    adviser(val) {
      //会籍
      if (!val) {
        this.tableData = this.tableData2;
      }
    },
    follow(val) {
      //跟进
      if (!val) {
        this.tableData = this.tableData2;
      }
    },
    status(val) {
      //状态
      if (!val) {
        this.tableData = this.tableData2;
      }
    }
  },
  created: function() {
    let _this = this;
    this.getTableData(true);
    setTimeout(function() {
      _this.getCustomer();
    }, 1000);
  },
  activated(){
    let _this = this;
    this.getTableData(true);
    setTimeout(function() {
      _this.getCustomer();
    }, 1000);
    this.dialogFormVisible = false;
  },
  computed: {
    isAdviser() {
      let user = JSON.parse(sessionStorage.getItem("userInfo"));
      for (let index = 0; index < user.role.length; index++) {
        const element = user.role[index];
        if (element.name == "超级管理员" || element.name == "店长" || element.name == "前台") {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    rememberlook(){
      if(this.checked == false){
        this.querenxiazai = true;
      }else{
        this.querenxiazai = false;
      }
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
     beforeUpload(file){
        this.files = file;
        const extension = file.name.split('.')[1] === 'xls'
        const extension2 = file.name.split('.')[1] === 'xlsx'
        const isLt5M = file.size / 1024 / 1024 < 5
        if (!extension && !extension2) {
            this.$message.warning('上传模板只能是 xls、xlsx格式!')
            return
        }
        if (!isLt5M) {
            this.$message.warning('上传模板大小不能超过 5MB!')
            return
        }
        this.fileName = file.name;
        setTimeout(() => {
            this.submitUpload();
        },500);
        return false;
    },  
    // 上传excel
      submitUpload() {
          if(this.fileName == ""){
              this.$message.warning('请选择要上传的文件！')
              return false
          }
          let fileFormData = new FormData();
          fileFormData.append('file', this.files, this.fileName);
          requestLogin("/CustomerFollowUp/import/member", fileFormData)
          .then(res => {
            let { errorCode, msg } = res;
          if (errorCode == 0) {
            this.$message({
              message: msg,
              type: "success"
            });
            this.reload();
            return;
          }
          }).catch(error => {
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
    async searchClub(name) {
        this.clubLists = await requestLogin(`/CustomerFollowUp/searchCustomerCardList`, {name: name,sort:'1'}, 'post')
        return this.clubLists
      },
    async querySearchAsync(queryString, cb) {
        var clubLists = await this.searchClub(this.formInline.membercard);
        var results = queryString ? clubLists.filter(this.createStateFilter(queryString)) : clubLists;
        results = results.map(item => ({...item, value: item.CTName}))
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 100);
      },
      createStateFilter(queryString) {
        return (state) => {
          return state.CTName
        };
      },
      handleSelect(item) {
        },
     dateDiff(sDate1) {
			 	var date2 = new Date();
			 	var date1 = new Date(Date.parse(sDate1.replace(/-/g,   "/")));
			 	var iDays = parseInt(Math.abs(date2.getTime()- date1.getTime()) /1000/60/60/24); 
         return iDays;
			 },
    tableRowClassName({row, rowIndex}){
    },
    getRowKeys(row) {
      return row.HYID;
    },
    selsChange(sels) {
      this.sels = [];
      if (sels.length > 0) {
        for (var i = 0; i < sels.length; i++) {
          this.sels.push(sels[i].HYID);
        }
      }
    },
    //批量变更会籍
    removeBatch() {
      if (this.sels != "") {
        this.dialogFormVisible7 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    auditServer(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            var Params = {
              identity: "member", //身份
              id: _this.ruleForm.changemembership, //新会籍顾问编号
              data: _this.sels //需要变更客户编号
            };
            requestLogin("/setChangeAdviser", Params, "post")
              .then(data => {
                this.$message({
                  message: "变更会籍成功",
                  type: "success"
                });
                _this.reload();
                _this.dialogFormVisible7 = false;
                _this.chongzhi(formName);
                _this.$refs.singleTable.clearSelection();
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
    },
    chongzhi() {
      this.ruleForm.changemembership = "";
    },
    //获取表格数据
    getTableData(type) {
      let _this = this;
      _this.loading = true;
      let params = {};
      if (!type) {
        params = {
          name: _this.HYName, //姓名
          tel: _this.MotoTel, //电话
          cardNo: _this.CardNO, //卡号
          cardType: _this.formInline.membercard, //卡名称
          cardStatus: _this.formInline.status, //成交状态
          remainderStart: _this.formInline.numsmall, //剩余次数区间--小
          remainderEnd: _this.formInline.numbig, //剩余次数区间--大
          remainSumStart: _this.formInline.fundsmall, //剩余金额区间--小
          remainSumEnd: _this.formInline.fundbig, //剩余金额区间--大
          followUpTime: _this.formInline.follow, //多长时间未跟进
          expiryTimeStart: _this.formInline.date[0], //到期时间区间--开始
          expiryTimeEnd: _this.formInline.date[1] //到期时间区间--结束
        };
      }
      requestLogin(
        "/setMemberCustomers/searchMemberCustomers/1/" +
          _this.formInline.adviser,
        params,
        "post"
      )
        .then(function(res) {
          _this.loading = false;
          let { errorCode, msg } = res;
          if (errorCode) {
            _this.tableData = "";
            this.$message({
              message: msg,
              type: "success"
            });
            return;
          }
          _this.tableData = res;
          _this.tableData2 = res;
        })
        .catch(error => {
          _this.loading = false;
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
    //获取会籍顾问列表
    getCustomer() {
      let _this = this;
      requestLogin("/setDepositCustomer/create", {}, "get")
        .then(function(res) {
          let { staff_info } = res;
          _this.staff_info = staff_info;
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
    search() {
      this.tableData = this.tableData2;
      this.tableData = this.tableData2.filter(
        i =>
          i.HYName.includes(this.searchVal) ||
          i.MotoTel.includes(this.searchVal) ||
          i.CardNO.includes(this.searchVal)
      );
    },
    resetForm() {
      this.formInline.date = "";
      this.formInline.membercard = "";
      this.formInline.adviser = "";
      this.formInline.follow = "";
      this.formInline.status = "";
      this.formInline.numsmall = "";
      this.formInline.numbig = "";
      this.formInline.fundsmall = "";
      this.formInline.fundbig = "";
    },
    func2() {
      if(this.sels.length > 1){
        // this.$message({ message: "只能选择一条数据!", type: "warning" });
        this.sels[this.sels.length-1];
        // return;
      }
      if (!this.currentSelectRow) {
        this.$message({
          message: "请先选择数据!",
          type: "warning"
        });
        return;
      }
      this.currentSelectRow = this.tableData.filter(item => item.HYID===this.sels[this.sels.length-1])[0]
      //跟进跳转
      this.$router.push({
        path: "/Customer/memberfollowup/insiderup",
        query: {
          id: this.currentSelectRow.HYID,
          Name: this.currentSelectRow.HYName,
          Sex: this.currentSelectRow.Sex
        }
      });
    },
    //会员主页
    zhuye() {
      if(this.sels.length > 1){
        // this.$message({ message: "只能选择一条数据!", type: "warning" });
        this.sels[this.sels.length-1];
        // return;
      }
      if (!this.currentSelectRow) {
        this.$message({
          message: "请先选择数据!",
          type: "warning"
        });
        return;
      }
      this.currentSelectRow = this.tableData.filter(item => item.HYID===this.sels[this.sels.length-1])[0]
      this.$router.push({
        path: "/Customer/membershiphome/memberhome",
        query: {
          HYID: this.currentSelectRow.HYID,
          HYName: this.currentSelectRow.HYName,
          YGXX_NAME: this.currentSelectRow.YGXX_NAME,
          MotoTel: this.currentSelectRow.MotoTel
        }
      });
    },
    Selectchange(val) {},
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    getCurrentRow(val) {},
    Selectchange2(val) {},
    Selectchange3(val) {},
    //格式化指定列的值
    formatter(row, column) {
      return row.address;
    },
    radiochange(row) {},
    selectClick(selection, row){
      this.currentSelectRow = row;
    },
    rowClick(row, event, column) {
      this.radio = this.tableData.indexOf(row);
      //获取表格数据
      this.currentSelectRow = row;
      this.$refs.singleTable.toggleRowSelection(row);
    },
    handleClick3(row) {
      alert("点击了");
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    //会员认领跳转
    go(index, row) {
      this.currentSelectRow = row;
      this.$router.push({
        path: "/Customer/leaguermanage/claim",
        query: {
          id: this.currentSelectRow.HYID,
          name: this.currentSelectRow.HYName,
          tel: this.currentSelectRow.MotoTel,
          customercategory: this.Customercategory
        }
      });
    },
    showToggle: function() {
      this.isShow = !this.isShow;
      this.downIcon = !this.downIcon;
      if (this.isShow) {
        this.btnText = "收起";
      } else {
        this.btnText = "展开";
      }
    },
     //下载模板
    download(){
      let _this = this;
      _this.dialogVisible = false;
      _this.querenxiazai = true;
      _this.checked = false;
      requestDown("/CustomerFollowUp/download/member", {}, "get","member.xlsx")
        .then(function(res) {
          requestDown(res.data);
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
    //表格导出
    exportExcel() {
      let config = {
        excelName: "会员管理",
        sheetName: "会员管理",
        limit: "hyRecordTime,HYID,Sex,cid".split(","),
        headTitle: "卡号|姓名|手机号|开卡时间|到期时间|剩余次数|剩余金额|卡状态|卡种|会籍".split(
          "|"
        )
      };
      downloadExcel(config, this.tableData);
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
<style lang="scss" scoped>
@import "@/styles/leaguertable.scss";
.el-table .selected-row {
    background: #00bc71;
  }
  .box-card {
    width: 100%;
  }
  .dialog-footer2{
    margin-top:20px;
  }
.practice-list {
  width: 97%;
  height: 100%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .quanbu {
    display: block;
    height: 100%;
    .search-form {
      height: 45px;
      display: flex;
      float: left;
      margin: 15px 0px auto;
      .el-button--primary {
        background-color: #00bc71;
        border-color: #00bc71;
        height: 35px;
        line-height: 1px;
      }
      .el-button + .el-button {
        height: 35px;
        line-height: 1px;
      }
    }
    .search-form2 {
      display: flex;
      float: left;
      margin: 15px 0px auto;
      .el-input {
        height: 35px;
        width: 100px;
      }
    }
    .el-input--suffix .el-input__inner {
      height: 37px;
      padding-right: 0px !important;
    }
    .el-input {
      height: 37px;
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
          margin-top: -4px;
          font-size: 16px;
        }
      }
    }
    .purple2 {
      height: 80px;
      display: flex;
      justify-content: flex-end;
      .search {
       position: relative;
        #input {
          width: 100%;
          border-radius: 36px;
          border: none;
          text-indent: 10px;
          color: #8c8c8c;
          font-size: 14px;
        }
        .search-icon {
          position: absolute;
          right: 6%;
        }
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
        padding: 20px 5px;
        float: right;
        margin-right: 40px;
        .el-pager li.active {
          color: #00bc71;
        }
      }
      .export {
        height: 30px;
        margin-top: 2.1%;
        padding: 6px 13px;
        font-size: 14px;
        border: 1px solid #00bc6a;
        color: #00bc6a;
        margin-left: 0%;
      }
      .download{
        height: 30px;
        margin-top: 2.1%;
        padding: 6px 13px;
        font-size: 14px;
        border: 1px solid #00bc6a;
        color: #00bc6a;
        margin-left: -5%;
      }
      .batchimport{
        height: 30px;
        margin-top: 2.1%;
        padding: 6px 13px;
        font-size: 14px;
        border: 1px solid #00bc6a;
        color: #00bc6a;
        margin-left: 0%;
      }
    }
    .checkboxlook{
       padding-top: 20px;
     }
  }
}
</style>
