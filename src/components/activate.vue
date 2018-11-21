<template>
  <div>
    <el-row>
      <div class="tag">
        <em class="top"></em>
        <el-col :span="24" class="transfer">
          <div class="transfer-main">
            <span class="transfer-span">激活操作</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="first-from">
            <span>点击右侧按钮激活<img class="from-img" src="../assets/shou.png" /></span>
            <el-button class="first-but" type="primary" @click="onSubmit">确定</el-button>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "activate",
  inject: ["reload"],
  data() {
    return {};
  },
  methods: { 
    //激活
    onSubmit() {
      this.$confirm("确认提交吗？", "提示").then(() => {
        requestLogin(
          "/setDesignateMember/activationCard/" + this.$route.query.CARD.id,
          {},
          "post"
        )
          .then(data => {
            this.$message({
              message: "激活成功",
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
    }
  }
};
</script>
<style lang="scss" scoped>
.tag {
  width: 97%;
  height: 500px;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.08);
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
      .transfer-span2 {
        font-size: 16px;
        color: #00bc71;
        padding-left: 20px;
      }
      .transfer-div {
        width: 105px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #00bc71;
        line-height: 32px;
        margin-top: 6px;
        span {
          color: #00bc71;
          font-size: 16px;
        }
      }
    }
  }
  .first-from {
    width: 70%;
    margin: 20px;
    display: flex;
    justify-content: space-between;
    .first-but {
      width: 64px;
      height: 33px;
      border: 1px solid;
      line-height: 8px;
      text-align: center;
    }
    span .from-img {
      width: 22px;
      height: 18px;
      padding-left: 10px;
      position: relative;
      top: 3px;
    }
  }
}
</style>