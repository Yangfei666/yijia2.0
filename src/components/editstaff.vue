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
          <el-input v-model="currentSelectRow.YGXX_HOMETEL" maxlength="11" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="身份证号:" prop="ygIdentity" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.ygIdentity" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="分配角色:" prop="role" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-checkbox-group v-model="selectRoleId" @change="handleCheckChange">
            <el-checkbox v-for="i in role" :checked="checkoutRole(i.id)" :label="i.id" :key="i.id">{{i.name}}</el-checkbox>
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
      <el-form-item label="状态:" prop="YGXX_STATE" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-radio label="全职" value="1" v-model="currentSelectRow.YGXX_STATE"></el-radio>
          <el-radio label="兼职" value="3" v-model="currentSelectRow.YGXX_STATE"></el-radio>
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
      selectRoleId: [],
      role: [],
      brigades: [],
      groups: [],
      aaaaaaaaa: []
    };
  },
  mounted() {
    this.rolegourp();
    this.selectRoleId = this.getRoleId(this.currentSelectRow.role)
  },
  beforeDestroy(){
    this.$emit('closeEdit', false);
  },
  methods: {
   async rolegourp() {
      let _this = this;
      _this.loading = true;
      await requestLogin("/setStaffInfo/create", {}, "get")
        .then(function(res) {
          _this.loading = false;
          let { role, brigades } = res;
          _this.role = role;
          _this.brigades = brigades;
        })
        .then(()=>{
          _this.bigsVal(_this.currentSelectRow.Brigade)
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
    getRoleId(role){
      return role.map(item=> item.id)
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
              YGXX_STATE:this.currentSelectRow.YGXX_STATE == "全职" ? 1 : 3,//状态
              role: this.selectRoleId //分配角色
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
          return false;
        }
      });
    },
    handleCheckChange(value) {
      Object.assign(this.selectRoleId, value)
    },
    xiaozu(val) {
    },
    bigsVal(id) {
      if(!id) return;
      this.brigades.map((item, index) => {
        if (item.id === parseInt(id)) {
          this.groups = item.club_info_group;
          this.currentSelectRow.group = item.club_info_group[0].group;
        }
      });
    },
    checkoutRole(id){
    }
  },
  filters:{
  }
};
</script>
<style lang="scss">
@import "../styles/dialog.scss";
</style>
