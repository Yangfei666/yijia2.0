<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="practice-main">
                    <el-col :span="23" class="breadcrumb">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="23" class="weber">
                        <span class="weber-span">商品列表</span>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <div class="practice-list">
          <el-row>
              <el-col :span="24">
                  <div class="class-form">
                    <el-form ref="form" :model="formInline" class="demo-form-inline" label-width="80px" @submit.native.prevent>
                        <div class="from-class">
                            <el-form-item label="名称:" style="text-align:center">
                                <el-col :span="24">
                                    <el-autocomplete v-model.trim="formInline.name" :trigger-on-focus="false" placeholder="请输入" clearable style="width:190px;" :fetch-suggestions="querySearchAsync2" @select="handleSelect2"></el-autocomplete>
                                </el-col>
                            </el-form-item>
                        </div>
                        <div class="from-class">
                            <el-form-item label="分类:" style="text-align:center">
                                <el-col :span="24">
                                  <el-select v-model="formInline.classfiy" placeholder="请选择" style="width:100%">
                                      <el-option v-for="item in classfiys" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                  </el-select>
                                </el-col>
                            </el-form-item>
                        </div>
                        <div class="from-class">
                            <el-form-item label="状态:" style="text-align:center">
                                <el-col :span="24">
                                  <el-select v-model="formInline.status" placeholder="请选择" style="width:100%">
                                      <el-option v-for="item in statuss" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                  </el-select>
                                </el-col>
                            </el-form-item>
                        </div>
                        <div class="from-class">
                            <el-form-item label-width="40px">
                                <el-button type="primary" @click="seachshai">查询</el-button>
                                <el-button @click="chongzhi">重置</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                  </div>
              </el-col>
          </el-row>
            <div class="practice-center">
                <el-row>
                    <el-col :span="16">
                        <div class="purple">
                            <div class="add">
                                <el-button type="text" class="p el-icon-plus" @click="dialogFormVisible = true">添加商品</el-button>
                                <template>
                                    <el-dialog title="添加商品" :append-to-body="true" :visible.sync="dialogFormVisible">
                                        <!--添加商品-->
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                                            <el-form-item label="名称:" prop="name" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="ruleForm.name" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="进价:" prop="purprice" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="ruleForm.purprice" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="售价:" prop="price" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="ruleForm.price" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="分类:" prop="classfiy" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-select v-model="ruleForm.classfiy" placeholder="请选择" style="width:100%" @change="Selectchange2">
                                                        <el-option v-for="item in classfiys" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="规格:" prop="size" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="ruleForm.size" placeholder="如：S、M、L、XL、XXL"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="单位:" prop="units" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="ruleForm.units" placeholder="如：件、个、条"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="库存:" prop="repertory" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="ruleForm.repertory" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="详情:" prop="details" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="ruleForm.details" placeholder="请输入"></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-radio-group v-model="ruleForm.status" @change="cahngesen">
                                                        <el-radio :label="1">上架</el-radio>
                                                        <el-radio :label="2">下架</el-radio>
                                                    </el-radio-group>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="图片:" prop="imgpic" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                <el-upload class="upload-demo" ref="upload" action=" " :file-list="fileList" :limit='1' :on-exceed='uploadOverrun' :http-request='submitUpload2' list-type="picture" :beforeUpload="beforeAvatarUpload" :auto-upload="true">
                                                    <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
                                                    <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</span>
                                                </el-upload>
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
                                <el-button type="text" class="p" @click="editpriority()">编辑商品</el-button>
                                <template>
                                    <el-dialog title="编辑商品" :append-to-body="true" :visible.sync="dialogFormVisible2">
                                        <!--编辑商品-->
                                        <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
                                            <el-form-item label="名称:" prop="name" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="currentSelectRow.name" placeholder=""></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="进价:" prop="sellPrice" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="currentSelectRow.sellPrice" placeholder=""></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="售价:" prop="price" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="currentSelectRow.price" placeholder=""></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="分类:" prop="name2" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-select v-model="name2" placeholder="" style="width:100%" @change="Selectchange2">
                                                        <el-option v-for="item in classfiys" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="规格:" prop="size" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="currentSelectRow.size" placeholder=""></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="单位:" prop="unit" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="currentSelectRow.unit" placeholder=""></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="库存:" prop="num" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="currentSelectRow.num" placeholder="" disabled></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="详情:" prop="intro" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-input v-model.trim="currentSelectRow.intro" placeholder=""></el-input>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                    <el-radio-group v-model="currentSelectRow.status" @change="cahngesen">
                                                        <el-radio label="上架" value="1"></el-radio>
                                                        <el-radio label="下架" value="2"></el-radio>
                                                    </el-radio-group>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item label="图片:" prop="urlPic" :label-width="formLabelWidth">
                                                <el-col :span="22">
                                                <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="uploadImg2" :http-request='submitUpload2' :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                                    <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                </el-upload>
                                                </el-col>
                                            </el-form-item>
                                            <el-form-item class="dialog-footer">
                                                <el-col :span="24" style="display: flex;justify-content: flex-end;">
                                                    <el-button type="primary" @click="submitForm2('currentSelectRow')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                                                </el-col>
                                            </el-form-item>
                                        </el-form>
                                    </el-dialog>
                                </template>
                            </div>
                            <div class="add2">
                                <el-button type="text" class="p" @click="deleteclassify">删除商品</el-button>
                            </div>
                            <div class="add">
                                <el-button type="text" class="p" @click="rukudiaolg">入库</el-button>
                                <template>
                                <!--入库-->
                                  <el-dialog title="入库操作" :append-to-body="true" :visible.sync="dialogFormVisible5">
                                    <el-form :model="ruleForm4" :rules="rules4" ref="ruleForm4" label-width="100px">
                                      <el-form-item label="数量:" prop="num" :label-width="formLabelWidth">
                                          <el-col :span="22">
                                              <el-input v-model.trim="ruleForm4.num" placeholder="请输入"></el-input>
                                          </el-col>
                                      </el-form-item>
                                      <el-form-item label="入库原因:" prop="reason" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                          <el-input type="textarea" v-model.trim="ruleForm4.reason" placeholder="请输入"></el-input>
                                        </el-col>
                                      </el-form-item>
                                      <el-form-item class="dialog-footer">
                                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                                          <el-button @click="resetForm('ruleForm4')">重置</el-button>
                                          <el-button type="primary" @click="ruku('ruleForm4')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                                        </el-col>
                                      </el-form-item>
                                    </el-form>
                                  </el-dialog>
                                </template>
                            </div>
                            <div class="add">
                                <el-button type="text" class="p" @click="chukudiaolg">出库</el-button>
                                <template>
                                <!--出库-->
                                  <el-dialog title="出库操作" :append-to-body="true" :visible.sync="dialogFormVisible6">
                                    <el-form :model="ruleForm5" :rules="rules5" ref="ruleForm5" label-width="100px">
                                      <el-form-item label="数量:" prop="num" :label-width="formLabelWidth">
                                          <el-col :span="22">
                                              <el-input v-model.trim="ruleForm5.num" placeholder="请输入"></el-input>
                                          </el-col>
                                      </el-form-item>
                                      <el-form-item label="出库原因:" prop="reason" :label-width="formLabelWidth">
                                        <el-col :span="22">
                                          <el-input type="textarea" v-model.trim="ruleForm5.reason" placeholder="请输入出库原因"></el-input>
                                        </el-col>
                                      </el-form-item>
                                      <el-form-item class="dialog-footer">
                                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                                          <el-button @click="resetForm('ruleForm5')">重置</el-button>
                                          <el-button type="primary" @click="chuku('ruleForm5')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                                        </el-col>
                                      </el-form-item>
                                    </el-form>
                                  </el-dialog>
                                </template>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="purple2">
                        <el-col :span="24" class="search">
                            <el-autocomplete class="search-input" v-model.trim="searchVal" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" placeholder="搜索商品名称" clearable @select="handleSelect"></el-autocomplete>
                            <el-button icon="el-icon-search" circle  @click="searchtable"></el-button>
                        </el-col>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="practice-table">
                <el-row>
                    <el-col :span="24">
                        <el-table ref="singleTable" @current-change="handleCurrentChange2" fixed highlight-current-row :header-cell-style="{background:'#fafafa'}" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @row-click="rowClick">
                            <el-table-column align="right" prop="radio" fixed width="50px">
                                <template slot-scope="scope">
                                    <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                                </template>
                            </el-table-column>
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
                                    <el-button v-if="scope.row.status == '上架'" type="danger" plain size="medium" @click="Enabledisabled(scope.$index)">下架</el-button>
                                    <el-button v-else plain type="success" size="medium" @click="Enabledisabled2(scope.$index)">上架</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>
                <template>
                 <!--下架-->
                  <el-dialog title="下架原因" :append-to-body="true" :visible.sync="dialogFormVisible3">
                    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px">
                      <el-form-item label="下架原因:" prop="xiajia" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input type="textarea" v-model.trim="ruleForm2.xiajia" placeholder="请输入下架原因"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item class="dialog-footer">
                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                          <el-button @click="dialogFormVisible3 = false">取消</el-button>
                          <el-button type="primary" @click="xiajia('ruleForm2')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </template>
                <template>
                 <!--上架-->
                  <el-dialog title="上架原因" :append-to-body="true" :visible.sync="dialogFormVisible4">
                    <el-form :model="ruleForm3" :rules="rules3" ref="ruleForm3" label-width="100px">
                      <el-form-item label="上架原因:" prop="shangjia" :label-width="formLabelWidth">
                        <el-col :span="22">
                          <el-input type="textarea" v-model.trim="ruleForm3.shangjia" placeholder="请输入上架原因"></el-input>
                        </el-col>
                      </el-form-item>
                      <el-form-item class="dialog-footer">
                        <el-col :span="24" style="display: flex;justify-content: flex-end;">
                          <el-button @click="dialogFormVisible4 = false">取消</el-button>
                          <el-button type="primary" @click="shangjia('ruleForm3')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </template>
                <template>
                <!--放大图片-->
                <el-dialog title="" :visible.sync="isEnlargeImage" :show-close='false' :modal-append-to-body="false">
                    <img @click="isEnlargeImage = false" style="width:50%;" :src="enlargeImage">
                </el-dialog>
            </template>
            </div>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
import * as validate from "@/validate/Login";
const radioDict = {
  "上架": 1,
  "下架": 2,
}
export default {
  inject: ["reload"],
  name: "goodlist",
  data() {
    return {
      formLabelWidth: "130px",
      currentSelectRow: "",
      isEnlargeImage: false, //放大图片
      enlargeImage: "", //放大图片地址
      radio: true,
      searchVal:"",
      name2:"",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      dialogFormVisible6: false,
      currentPage: 1,
      pagesize: 10,
      file2:"",
      imageUrl2: "",
      fileList: [],
      ruleForm: {
        name: "",//名称
        purprice: "",//进价
        price: "",//售价
        classfiy: "",//分类
        imgpic: "",//图片
        units: "",//单位
        size: "",//规格
        repertory: "",//库存
        details: "",//详情
        status:"",//状态
      },
      ruleForm2:{
        xiajia:"",
      },
      ruleForm3:{
        shangjia:"",
      },
      ruleForm4:{
        num:"",
      },
      ruleForm5:{
        num:"",
        reason:""
      },
      rules2:{
        xiajia:[{required: true, message: '请输入下架原因', trigger: 'blur'}]
      },
      rules3:{
        shangjia:[{required: true, message: '请输入上架原因', trigger: 'blur'}]
      },
      rules4:{
        num:[{required: true, message: '请输入入库数量', trigger: 'blur'}]
      },
      rules5:{
        num:[{required: true, message: '请输入出库数量', trigger: 'blur'}],
        reason:[{required: true, message: '请输入出库原因', trigger: 'blur'}]
      },
      rules: {
        name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
        purprice:[{ required: true, message: '请输入进价', trigger: 'blur' }],
        price:[{ required: true, message: '请输入售价', trigger: 'blur' }],
        classfiy:[{ required: true, message: '请选择分类', trigger: 'change' }],
        units:[{ required: true, message: '请输入单位', trigger: 'blur' }],
        size:[{ required: true, message: '请输入规格', trigger: 'blur' }],
        repertory:[{ required: true, message: '请输入库存', trigger: 'blur' }],
        details:[{ required: true, message: '请输入详情', trigger: 'blur' }],
        status:[{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      tableData: [],
      tableData2:[],
      classfiys:[],
      statuss:[
        {
          id:1,
          name:"上架"
        },
        {
          id:2,
          name:"下架"
        }],
      formInline: {
        name: "",
        classfiy: "",
        status:""
      },
    };
  },
  watch: {
    searchVal(val) {
      if (!val) {
        this.tableData = this.tableData2;
      }
    },
    name(val) {
      if (!val) {
        this.tableData = this.tableData2;
      }
    },
    classfiy(val) {
      if (!val) {
        this.tableData = this.tableData2;
      }
    },
    status(val) {
      if (!val) {
        this.tableData = this.tableData2;
      }
    },
  },
  created: function() {
    this.getclassroom();
    this.getclassfiy();
  },
  methods: {
    //获取商品列表数据
    getclassroom() {
      let _this = this;
      requestLogin("/setGoodsList", {}, "get")
        .then(function(res) {
          _this.tableData = res;
          _this.tableData2 = res;
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
    //获取商品列表数据
    getclassfiy() {
      let _this = this;
      requestLogin("/setGoodsType", {}, "get")
        .then(function(res) {
          _this.classfiys = res;
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
     //放大图片
    handleFileEnlarge(_url) {
      if (_url) {
        this.enlargeImage = _url;
        this.isEnlargeImage = !this.isEnlargeImage;
      }
    },
    seachshai(){
      let _this = this;
      let params = {
        name:this.formInline.name,
        gid:this.formInline.classfiy,
        status:this.formInline.status
      }
      requestLogin("/setGoodsList/searchGoodsList", params, "post")
        .then(function(res) {
          _this.tableData = res;
          _this.tableData2 = res;
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    submitUpload2: function(content) {
      this.file2 = content.file;
    },
    uploadImg2(file) {
      this.imgfile = file.raw;
      this.imageUrl2 = URL.createObjectURL(file.raw);
    },
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传1张图片!"
      });
    },
    //入库
    ruku(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              num: this.ruleForm4.num,
              reason: this.ruleForm4.reason,
              status: '1'
            };
            requestLogin("/setGoodsList/goodsStorage/"+this.currentSelectRow.id, loginParams, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible5 = false;
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
    },
    //出库
    chuku(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              num: this.ruleForm5.num,
              reason: this.ruleForm5.reason,
              status: '2'
            };
            requestLogin("/setGoodsList/goodsStorage/"+this.currentSelectRow.id, loginParams, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible6 = false;
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
    },
    //下架
    xiajia(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              reason: this.ruleForm2.xiajia,
            };
            requestLogin("/setGoodsList/goodsPack/"+this.currentSelectRow.id, loginParams, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible3 = false;
                this.ruleForm2.xiajia = "";
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
     //上架
    shangjia(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let loginParams = {
              reason: this.ruleForm3.shangjia,
            };
            requestLogin("/setGoodsList/goodsPack/"+this.currentSelectRow.id, loginParams, "post")
              .then(data => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible4 = false;
                this.ruleForm3.shangjia = "";
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
    //添加商品
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
             let formData = new FormData();
            formData.append("gid", this.ruleForm.classfiy);
            formData.append("name", this.ruleForm.name);
            formData.append("price", this.ruleForm.price);
            formData.append("sellPrice", this.ruleForm.purprice);
            formData.append("size", this.ruleForm.size);
            formData.append("unit", this.ruleForm.units);
            formData.append("num", this.ruleForm.repertory);
            formData.append("status", this.ruleForm.status);
            formData.append("intro", this.ruleForm.details);
            formData.append("file", this.file2);
            requestLogin("/setGoodsList", formData, "post")
              .then(data => {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.reload();
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
    },
    //编辑商品
    submitForm2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let formData = new FormData();
            formData.append("gid", this.currentSelectRow.goods_type.id);
            formData.append("name", this.currentSelectRow.name);
            formData.append("price", this.currentSelectRow.price);
            formData.append("sellPrice",this.currentSelectRow.sellPrice);
            formData.append("size", this.currentSelectRow.size);
            formData.append("unit", this.currentSelectRow.unit);
            formData.append("num", this.currentSelectRow.num);
            formData.append("intro", this.currentSelectRow.intro);
            formData.append("status", radioDict[this.currentSelectRow.status]);
            formData.append("file", this.file2);
            requestLogin("/setGoodsList/updateGoodsList/"+this.currentSelectRow.id, formData, "post")
              .then(data => {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                for (var i = 0; i < this.tableData.length; i++) {
                  if (this.tableData[i].id== this.currentSelectRow.id) {
                    this.tableData[i].name = this.currentSelectRow.name; //名称
                   for(var j=0;j<this.classfiys.length;j++){
                    if(this.classfiys[j].id==this.currentSelectRow.goods_type.id){
                         this.tableData[i].goods_type.name = this.classfiys[j].name;
                    }
                   }
                  }
                }
                this.reload();
                this.radio = false;
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
    //删除商品
    deleteclassify() {
      let _this = this;
      if (!_this.currentSelectRow) {
        this.$message({ message: "请先选择数据!", type: "warning" });
        return;
      }
      this.$confirm("确认删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        requestLogin("/setGoodsList/"+_this.currentSelectRow.id, {}, "delete")
          .then(response => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            _this.reload();
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
    beforeAvatarUpload(file) {                
      var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)                 
      const extension = testmsg === 'jpg'  
      const extension2 = testmsg === 'png'  
      const isLt2M = file.size / 1024 / 1024 < 1  
      if(!extension && !extension2) {  
          this.$message({  
              message: '上传文件只能是 jpg、png格式!',  
              type: 'warning'  
          });  
      }  
      if(!isLt2M) {  
          this.$message({  
              message: '上传文件大小不能超过 1MB!',  
              type: 'warning'  
          });  
      }  return extension || extension2 && isLt2M  
    } ,
     handleSelect(item) {},
     handleSelect2(item) {},
     createStateFilter(queryString) {
        return (state) => {
          return state.name
        };
      },
      createStateFilter2(queryString) {
        return (state) => {
          return state.name
        };
      },
      //查询表格
      searchtable() {
        this.tableData = this.tableData2;
        this.tableData = this.tableData2.filter(
          i =>
          i.name.includes(this.searchVal)
        );
      },
      async searchClub(name) {
        this.clubLists = await requestLogin(`/setGoodsList/searchGoodsListBynName`, {name: name}, 'post')
        return this.clubLists
      },
     async querySearchAsync(queryString, cb) {
        var clubLists = await this.searchClub(this.searchVal);
        var results = queryString ? clubLists.filter(this.createStateFilter(queryString)) : clubLists;
        results = results.map(item => ({...item, value: item.name}))
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 100);
      },
      async searchClub2(name) {
        this.clubLists2 = await requestLogin(`/setGoodsList/searchGoodsListBynName`, {name: name}, 'post')
        return this.clubLists2
      },
     async querySearchAsync2(queryString, cb) {
        var clubLists2 = await this.searchClub2(this.formInline.name);
        var results = queryString ? clubLists2.filter(this.createStateFilter2(queryString)) : clubLists2;
        results = results.map(item => ({...item, value: item.name}))
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 100);
      },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    chongzhi(){
      this.formInline.name = "";
      this.formInline.classfiy = "";
      this.formInline.status = "";
    },
    Selectchange2(val){},
    getCurrentRow(val) {},
    //编辑商品
    editpriority() {
      if (this.currentSelectRow) {
        this.dialogFormVisible2 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    rukudiaolg(){
      if (this.currentSelectRow) {
        this.dialogFormVisible5 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    chukudiaolg(){
      if (this.currentSelectRow) {
        this.dialogFormVisible6 = true;
      } else {
        this.$message({ message: "请先选择数据!", type: "warning" });
      }
    },
    cahngesen(val) {
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    rowClick(row, event, column) {
      this.radio = row.index;
      //获取表格数据
      this.currentSelectRow = row;
      this.imageUrl2 = this.currentSelectRow.urlPic;
      this.name2 = this.currentSelectRow.goods_type.name;
      this.radio = this.tableData.indexOf(row);
    },
    handleCurrentChange2(val, index) {
      this.currentRow = val;
    },
    Enabledisabled() {
     this.dialogFormVisible3 = true;
    },
    Enabledisabled2() {
     this.dialogFormVisible4 = true;
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
@import "@/styles/goodlist.scss";
.el-button.is-circle{
    border-radius: 0;
    padding: 12px;
    margin-left: 19px;
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
  .class-form {
      height: 100%;
      overflow: hidden;
      margin-top: 18px;
      .from-class {
        height: 50px;
        float: left;
        .el-button--primary {
          height: 35px;
          line-height: 1px;
        }
        .el-button + .el-button {
          height: 35px;
          line-height: 1px;
        }
      }
      .from-class2 {
        .el-button--primary {
          height: 35px;
          line-height: 1px;
        }
        .el-button + .el-button {
          height: 35px;
          line-height: 1px;
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
        width: 20%;
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
    .purple2 {
      height: 80px;
      display: flex;
      justify-content: flex-end;
      .search {
        width: 70%;
        border: 1px solid #fff;
        height: 36px;
        display: flex;
        border-radius: 16px;
        margin-top: 20px;
        margin-right: 14px;
        .search-input {
          width: 100%;
          border-radius: 16px;
          border: none;
          text-indent: 10px;
          color: #8c8c8c;
          font-size: 14px;
        }
        .search-icon {
          margin-top: 9px;
          margin-right: 13px;
        }
      }
      .purple-name {
        margin-top: 17px;
      }
      .purple-but {
        margin-top: 17px;
        .el-button--primary {
          height: 35px;
          line-height: 11px;
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