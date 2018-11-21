<template>
    <div>
        <!--编辑体验券-->
        <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
          <el-form-item label="体验券名称:" prop="tkName" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.tkName" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="售价(元):" prop="tkPrice" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.tkPrice" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="总次数:" prop="frequency" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.frequency" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="有效期(天数):" prop="vld" :label-width="formLabelWidth">
              <el-col :span="22">
                <el-input v-model="currentSelectRow.vld" placeholder="请输入"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="状态:" prop="tkState" :label-width="formLabelWidth">
              <el-col :span="22">
                    <el-radio label="启用"  value="1" v-model="currentSelectRow.tkState"></el-radio>
                    <el-radio label="禁用"  value="0" v-model="currentSelectRow.tkState"></el-radio>
                </el-col>
            </el-form-item>
            <el-form-item label="类型:" prop="type" :label-width="formLabelWidth">
              <el-col :span="22">
                    <el-radio label="团课券" value="1" v-model="currentSelectRow.type"></el-radio>
                    <el-radio label="私教券" value="0" v-model="currentSelectRow.type"></el-radio>
                </el-col>
            </el-form-item>
             <el-form-item class="dialog-footer">
               <el-col :span="24" style="display: flex;justify-content: flex-end;">
            <el-button type="primary" @click="submitForm('currentSelectRow')" style="background-color: #00BC71;border-color: #00BC71;">确定</el-button>
            </el-col>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name:'editexpersecurity',
  props: ["currentSelectRow"],
  inject:['reload'],
    data() {
     return {
        dialogFormVisible: false,
        formLabelWidth: '130px',
        disabled:false,
     }
    },
    methods: {
      //编辑体验券
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示").then(() => {
            this.addLoading = true;
            var loginParams = {
              tkName: this.currentSelectRow.tkName, //劵名称
              tkPrice: this.currentSelectRow.tkPrice, //劵价格
              tkState: this.currentSelectRow.tkState == '启用' ? 1 :0, //状态
              frequency: this.currentSelectRow.frequency, //次数
              vld: this.currentSelectRow.vld, //有效期
              type: this.currentSelectRow.type  == '团课券' ? 1 :0//类型
            };
            requestLogin("/setExperienceVoucher/"+this.currentSelectRow.id, loginParams, "put")
              .then(data => {
                this.addLoading = false;
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.reload();
                this.dialogFormVisible=false;
              })
              .catch(error => {
                this.addLoading = false;
                if (error.response) {
                  this.$message({
                    message: "修改失败,请稍候再试",
                    type: "error"
                  });
                }
              });
          });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
}
</script>
<style lang="scss">
 @import '../styles/dialog.scss';
</style>
