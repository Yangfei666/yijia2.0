<template>
  <div>
    <!--修改角色权限-->
    <el-form :model="currentSelectRow" ref="currentSelectRow" label-width="100px">
      <el-form-item label="角色名称:" prop="name" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-input v-model="currentSelectRow.name" placeholder="请输入"></el-input>
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
        <el-col :span="22">
          <el-select v-model="currentSelectRow.status" placeholder="请选择" style="width:100%">
            <el-option label="启用" value="cishucard"></el-option>
            <el-option label="禁用" value="jinecard"></el-option>
          </el-select>
        </el-col>
      </el-form-item> -->
      <el-form-item v-for="(items, index) in emptyOptions" :key="index" :prop="items.type"
                    :label-width="formLabelWidth" style="margin-bottom:10px">
        <el-col :span="22">
          <i class="el-icon-caret-bottom" @click="isShowToggle(index)"></i>
          <el-checkbox :indeterminate="items.isIndeterminate" v-model="items.checkAll"
                       @change="isCheckAll($event, index)">
            {{items.type}}
          </el-checkbox>
          <el-checkbox-group @change="getCheckedItems($event, index)"
                             v-model="items.checkedItems"
                             style="margin-left:45px;" v-show="items.isShow">
            <el-checkbox v-for="(item, index) in items.power" :label="item.id" :key="index">
              {{item.describe}}
            </el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-form-item>
      <el-form-item class="dialog-footer">
        <el-col :span="24" style="display: flex;justify-content: flex-end;">
          <!--<el-button @click="resetForm('currentSelectRow')">重置</el-button>-->
          <el-button type="primary" @click="submitForm('currentSelectRow')"
                     style="background-color: #00BC71;border-color: #00BC71;">确定
          </el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {requestLogin} from "@/api/api";

  let role = {
    infoById(id) {
      return requestLogin(`/RoleAuthorityManagement/${id}`, {}, "get");
    },
    updateById(id, params) {
      return requestLogin(`/RoleAuthorityManagement/${id}`, params, "put");
    },
    createList() {
      return requestLogin("/RoleAuthorityManagement/create", {}, "get");
    },

  };
  export default {
    name: 'editrole',
    props: {
      "currentSelectRow": {
        type: Object,
        require: true,
      },
    },
    data() {
      return {
        formLabelWidth: '130px',
        num: 1,
        status: 1,
        memcolor: 1,
        classtype: 1,
        type: 1,
        disabled: false,
        limitdate: [],
        emptyOptions: [],

      };
    },
    mounted() {
      this.rolecreate()
    },
    methods: {
      //角色编辑页
      async rolecreate() {
        let _this = this;
        _this.loading = true;
        await role.createList()
          .then((res) => {
          _this.loading = false;
          _this.emptyOptions = res.map(item => {
            item.checkedItems = [];
            item.checkAll = false;
            item.isShow = true;
            item.isIndeterminate = false;
            return item;
          });
        })
          .then(() => {
            _this.roleInfo();
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
      //获取角色详情
      roleInfo() {
        let id = this.currentSelectRow.id;
        let _this = this;
        role.infoById(id)
          .then(res => {
            _this.detailRoleInfo(res);
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
      //处理已编辑选项
      detailRoleInfo({id, name, power} = {}) {
        this.emptyOptions = this.emptyOptions.map((item, index) => {
          item.checkedItems = power.map(subItem => {
            return subItem.controller === item.power[0].controller ? subItem.id : null;
          }).filter(item => Boolean(item));
          this.getCheckedItems(item.checkedItems, index);
          return item;
        });
      },
      mapSubmitFormParams() {
        let checkPower = [];
        this.emptyOptions.map(item => {
          item.checkedItems.map(subItem => {
            checkPower.push(subItem);
          });
        });
        return checkPower;
      },
      //提交角色权限
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          let _this = this
          if (valid) {
            this.$confirm("确认提交吗？", "提示").then(() => {
              _this.addLoading = true;
              let params = {
                name: _this.currentSelectRow.name, //角色名称
                power: _this.mapSubmitFormParams(), //权限
              };
              role.updateById(this.currentSelectRow.id, params)
                .then(data => {
                  _this.addLoading = false;
                  _this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                })
                .then(()=>{
                  this.$emit('closeEditPage')
                })
                .catch(error => {
                  _this.addLoading = false;
                  console.log(error);
                  let {response: {data: {errorCode, msg}}} = error;
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
            this.$message({message: "提交失败!", type: "error"});
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.emptyOptions.map(item => {
          item.checkedItems = [];
          item.checkAll = false;
          item.isShow = true;
          item.isIndeterminate = false;
        });
      },
      isShowToggle(order) {
        this.emptyOptions[order].isShow = !this.emptyOptions[order].isShow;
      },
      isCheckAll(val, order) {
        let orderOptions = this.emptyOptions[order];
        orderOptions.checkAll = val;
        orderOptions.checkedItems = val ? orderOptions.power.map(item => item.id) : [];
        orderOptions.isIndeterminate = false;
      },
      getCheckedItems(val, order) {
        let checkedCount = val.length;
        let orderOptions = this.emptyOptions[order];
        orderOptions.checkAll = checkedCount === orderOptions.power.length;
        orderOptions.isIndeterminate = checkedCount > 0 && checkedCount < orderOptions.power.length;
      },
    }
  };
</script>
<style lang="scss">
  @import '../styles/dialog.scss';
</style>
