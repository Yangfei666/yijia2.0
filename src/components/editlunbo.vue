<template>
  <div>
    <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
      <el-form-item label="分类:" prop="classify" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-select v-model="currentSelectRow.banState" style="width:100%" @change="Selectchange2">
            <el-option v-for="item in classify" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="标题:" prop="title" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.banTitle" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="时间范围:" prop="timeframe" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-date-picker v-model="currentSelectRow.banStart" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:49%"></el-date-picker>
          <el-date-picker v-model="currentSelectRow.banEnd" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:49%"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio label="启用" value="2" v-model="currentSelectRow.banStatus"></el-radio>
          <el-radio label="禁用" value="1" v-model="currentSelectRow.banStatus"></el-radio>
        </el-col>
      </el-form-item>
      <el-form-item label="描述:" prop="desc" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input type="textarea" v-model="currentSelectRow.banDes" placeholder="汉字、字母、数字和下划线及逗号句号, 长度50以内" style="width:100%"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="dialog-footer">
        <el-col :span="24" style="display: flex;justify-content: flex-end;">
          <el-button type="primary" @click="editForm('currentSelectRow')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  props: ["currentSelectRow"],
  inject: ["reload"],
  data() {
    return {
      formLabelWidth: "130px",
      classify: [],
      banstate: "",
      fenlei: "",
      id: "",
      selectId:""
    };
  },
  created() {
    this.Rotationselect();
  },
  methods: {
    //轮播图下拉框
    Rotationselect() {
      let _this = this;
      requestLogin("/setBannerInfo/create", {}, "get")
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
    //编辑轮播图
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            let banStateId = this.classify.filter(item => item.name === this.currentSelectRow.banState)[0]
            let banState = banStateId ? Number.parseInt(banStateId.id) : this.currentSelectRow.banState
            var loginParams = {
              banStatus: this.currentSelectRow.banStatus == '启用'?2:1, //状态
              banState, //分类
              banTitle: this.currentSelectRow.banTitle, //标题
              banDes: this.currentSelectRow.banDes, //描述
              banStart: this.currentSelectRow.banStart, //开始时间
              banEnd: this.currentSelectRow.banEnd //结束时间
            };
            requestLogin(
              "/setBannerInfo/" + this.currentSelectRow.id,
              loginParams,
              "put"
            )
              .then(data => {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.reload();
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
    Selectchange2(val) {
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>