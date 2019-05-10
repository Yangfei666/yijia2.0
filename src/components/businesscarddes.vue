<template>
  <div>
    <!--办卡说明-->
    <el-row>
      <el-col :span="24" class="elcol"></el-col>
      <div class="tag">
        <em class="top"></em>
        <el-col :span="24" class="transfer">
          <div class="transfer-main">
            <span class="transfer-span">办卡说明</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="transfer-from">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" disabled class="demo-ruleForm">
              <el-col :span="16">
                <el-form-item label="办卡说明:" prop="desc" :label-width="formLabelWidth">
                  <el-col :span="24">
                    <el-input type="textarea" v-model.trim="ruleForm.desc"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "businesscarddes",
  inject: ["reload"],
  props: ["pathquery"],
  data() {
    return {
      ruleForm: {
        desc:this.pathquery.CARD.remark
      },
      formLabelWidth:'100px'
    };
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.elcol {
  height: 25px;
  background: #e9eef3;
}
.tag {
  width: 100%;
  height: 400px;
  display: inline-block;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  margin: 0px auto;
  em {
    width: 0;
    height: 0;
    font-size: 0;
    overflow: hidden;
    position: absolute;
    &.top {
      border-width: 10px;
      border-style: solid dashed dashed;
      border-color: transparent transparent #fff transparent;
      left: 40px;
      top: -20px;
    }
  }
  .transfer {
    border-bottom: 1px solid #e8e8e8;
    .transfer-main {
      height: 45px;
      width: 98%;
      margin: auto;
      line-height: 45px;
      display: flex;
      justify-content: flex-start;
      .transfer-span {
        font-size: 16px;
        color: #262626;
        text-indent: 5px;
      }
    }
  }
  .transfer-from {
    width: 85%;
    margin: 20px auto;
    .el-button--primary {
      height: 35px;
      line-height: 10px;
    }
    .submit {
      display: flex;
    }
    .from-date {
      display: flex;
      position: relative;
      margin-top: 15px;
      .textarea {
        color: #00bc71;
        position: absolute;
        top: 55px;
        right: 20px;
      }
    }
  }
  .transfer-table {
    width: 98%;
    margin: 0 auto;
  }
}
</style>
