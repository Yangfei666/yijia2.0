<template>
  <div>
    <!--编辑新员工-->
    <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
      <el-form-item label="姓名:" prop="YGXX_NAME" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.YGXX_NAME" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别:" prop="YGXX_SEX" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio label="女" value="1" v-model="currentSelectRow.YGXX_SEX"></el-radio>
          <el-radio label="男" value="2" v-model="currentSelectRow.YGXX_SEX"></el-radio>
        </el-col>
      </el-form-item>
      <el-form-item label="电话:" prop="YGXX_HOMETEL" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.YGXX_HOMETEL" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="身份证号:" prop="ygIdentity" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.ygIdentity" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="分配角色:" prop="role" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-checkbox-group v-model="currentSelectRow.role" @change="handleCheckChange">
            <el-checkbox v-for="i in role" :label="i.id" :key="i.id">{{i.name}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-form-item>
      <el-form-item label="所属大队:" prop="Brigade" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-select v-model="currentSelectRow.Brigade" placeholder="请选择" style="width:100%" @change="bigsVal">
            <el-option v-for="item in brigades" :key="item.id" :label="item.Brigade" :value="item.id.toString()"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="所属小组:" prop="group" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-select v-model="currentSelectRow.group" placeholder="请选择" style="width:100%" @change="xiaozu">
            <el-option v-for="item in groups" :key="item.id" :label="item.group" :value="item.group"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="员工简介:" prop="ygIntro" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input type="textarea" v-model="currentSelectRow.ygIntro"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="dialog-footer">
        <el-col :span="24" style="display: flex;justify-content: flex-end;">
          <el-button type="primary" @click="submitForm('currentSelectRow')" :loading="addLoading" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "editstaff",
  props: ["currentSelectRow"],
  inject: ["reload"],
  data() {
    return {
      addLoading: false,
      loading: true,
      dialogFormVisible: false,
      formLabelWidth: "130px",
      disabled: false,
      role: [],
      brigades: [],
      groups: [],
      aaaaaaaaa: []
    };
  },
  mounted: function() {
    this.rolegourp();
  },
  methods: {
    rolegourp() {
      let _this = this;
      _this.loading = true;
      requestLogin("/setStaffInfo/create", {}, "get")
        .then(function(res) {
          _this.loading = false;
          let { role, brigades } = res;
          _this.role = role;
          console.log(brigades);
          _this.brigades = brigades;
        })
        .catch(error => {
          if (error.res) {
            this.$message({
              message: "获取数据失败",
              type: "error"
            });
          }
        });
    },
    //编辑员工信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            var loginParams = {
              YGXX_NAME: this.currentSelectRow.YGXX_NAME, //姓名
              YGXX_SEX: this.currentSelectRow.YGXX_SEX == "女" ? 1 : 2, //性别
              YGXX_HOMETEL: this.currentSelectRow.YGXX_HOMETEL, //电话
              ygIntro: this.currentSelectRow.ygIntro, //简介
              ygIdentity: this.currentSelectRow.ygIdentity, //身份证
              Brigade: this.currentSelectRow.Brigade, //大队
              group: this.currentSelectRow.group, //小组
              role: this.currentSelectRow.role //分配角色
            };
            requestLogin(
              "/setStaffInfo/" + this.currentSelectRow.YGXX_YGID_NEI,
              loginParams,
              "put"
            )
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible = false;
              })
              .catch(error => {
                this.addLoading = false;
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCheckChange(val) {
      console.log(this.currentSelectRow.role);
    },
    xiaozu(val) {
      console.log(val);
    },
    bigsVal(id) {
      this.brigades.map((item, index) => {
        if (item.id === id) {
          this.groups = item.club_info_group;
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
