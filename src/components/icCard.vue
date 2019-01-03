<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" @submit.native.prevent>
      <el-form-item label="" prop="" :label-width="formLabelWidth">
        <el-col :span="22" class="card__number">
          <el-input ref="inputID" @blur="blur" @keyup.native.enter="enterResult()" @focus="focus" :autofocus="!showInfo" v-model="cardID" placeholder="卡号/姓名/手机号" clearable></el-input>
          <el-button class="card__number_sure-btn" plain @click.native="sureCard">确定</el-button>
        </el-col>
        <el-col :span="22">
          <span style="color:#aaa; font-size: 0.9rem;">备注：卡号能查询本店和连锁店客户，姓名和手机号只能查询本店客户</span>
        </el-col>
      </el-form-item>
    </el-form>
    <div v-show="showInfo">
      <div class="customer" style="margin-left: 10px;">
        <span>客户信息</span>
      </div>
      <div class="cardInfo">
        <div class="cardInfo__photo">
          <img :src="info.Photo" alt="photo" class="cardInfo__photo-img">
        </div>
        <div class="cardInfo__detail">
          <div class="cardInfo__detail_item">姓名：{{info.HYName}}</div>
          <div class="cardInfo__detail_item">性别：{{info.Sex}}</div>
          <div class="cardInfo__detail_item">手机号码：{{info.MotoTel}}</div>
          <div class="cardInfo__detail_item">地址：{{info.HomeAdd}}</div>
        </div>
      </div>
      <div class="main-list">
        <div class="customer">
          <span>预约信息</span>
        </div>
        <div class="main-table">
          <el-table :data="course" highlight-current-row style="width: 100%" :header-cell-style="{background:'#fafafa'}">
            <el-table-column align="left" prop="curriculum_table.curriculum_subject.kcName" label="课程">
              <template slot-scope="scope">
                <span v-if="scope.row.curriculum_table.curriculum_subject">{{scope.row.curriculum_table.curriculum_subject.kcName}}</span>
                <span v-else>私教</span>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="curriculum_table.kcStime" label="日期"></el-table-column>
            <el-table-column align="left" prop="curriculum_table.Stime" label="时间"></el-table-column>
            <el-table-column align="left" prop="curriculum_table.staff_info.YGXX_NAME" label="教练"></el-table-column>
            <el-table-column align="left" prop="curriculum_table.kcPlace" label="教室"></el-table-column>
            <el-table-column align="left" label="手牌">
              <template slot-scope="scope">
                <el-input v-model="handCardNumber" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="left" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="clickEnter(scope.$index)">进场</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
  name: "ic",
  inject: ["reload"],
  components: {},
  props: {
    ICCardNumber: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      file: "",
      formLabelWidth: "130px",
      currentSelectRow: "",
      dialogFormVisible: this.isShowDialog,
      ruleForm: {
        cardID: "",
        ICNumber: "", //
        price: "", //
        heat: "", //
        status: ""
      },
      rules: {
        cardID: [{ required: true, message: "输入卡号/姓名/手机号码" }]
      },
      showInfo: false,
      cardID: "",
      info: {},
      course: [],
      locker:"",
      handCardNumber:""
    };
  },
  mounted() {
    if (this.$refs.inputID) {
      setTimeout(() => {
        this.$refs.inputID.focus();
      }, 300);
    }
    this.cardID = this.ICCardNumber.trim();
    if (this.cardID.length >= 5) {
      this.sureCard();
    }
  },
  watch: {
    cardID(newV, oldV) {
      if (newV.length === 0) {
        this.showInfo = false;
      }
    }
  },
  methods: {
    enterResult() {
      this.sureCard();
    },
    clickEnter(index) {
      this.$confirm("确认要进场吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let curCourse = this.course[index];
        let params = {
          id: curCourse.curriculum_table.ID,
          userId: this.info.HYID,
          number: this.handCardNumber,
          bool:
            curCourse.curriculum_table.kcIsPrivate == "团课课程" ? true : false
        };
        requestLogin("/adminHomePage", params, "post")
          .then(res => {
            this.$message({
              message: "进场成功",
              type: "success"
            });
            this.showInfo = false;
            this.cardID = "";
            setTimeout(() => {
              this.$refs.inputID.focus();
            }, 300);
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
    sureCard() {
      let formData = {
        content: this.cardID
      };
      let _this = this;
      if (!this.cardID) {
        this.$message({ message: "输入卡号/姓名/手机号码", type: "error" });
        return;
      }
      requestLogin("/getMemberInfoByParams", formData, "post")
        .then(res => {
          _this.info = res.info;
          _this.course = [...res.group, ...res.private];
          _this.handCardNumber = res.locker;
          this.showInfo = true;
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
    focus() {},
    blur() {
      if (this.showInfo) return;
      setTimeout(() => {
        this.$refs.inputID && this.$refs.inputID.focus();
      }, 300);
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/dialog.scss";
</style>
<style lang="scss" scoped>
@import "@/styles/course.scss";
.card__number {
  display: flex;
  align-items: center;
  &_sure-btn {
    margin-top: 7px;
    margin-left: 20px;
    line-height: 1px;
  }
}

$photo-width: 20vh;
.customer {
  height: 20px;
  border-left: 2px solid #00bc71;
  margin-top: 15px;
  line-height: 20px;
  text-align: left;
  /*position: absolute;*/
  /*top: 0;*/
  /*left: 0;*/
  span {
    margin-left: 20px;
  }
}

.cardInfo {
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 9px;
  position: relative;
  &__photo {
    margin-left: 100px;
    display: flex;
    height: $photo-width;
    justify-content: center;
    &-img {
      display: block;
      height: $photo-width;
      width: $photo-width;
      border-radius: 10%;
    }
  }
  &__detail {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    margin-left: 65px;
    padding: 0;
    &_item {
      width: 100%;
      padding: 5px 10px;
      margin: 10px 10px;
    }
  }
}

/deep/ .main-list {
  width: 97%;
  margin: 20px auto;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  overflow: hidden;
  .customer {
    height: 20px;
    border-left: 2px solid #00bc71;
    margin-top: 15px;
    line-height: 20px;
    text-align: left;
    span {
      font-family: PingFang-SC-Medium;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #262626;
      margin-left: 20px;
    }
  }
  .main-table {
    width: 98%;
    margin: 10px auto;
    .el-table {
      position: relative;
      overflow: hidden;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      width: 100%;
      max-width: 100%;
      font-size: 14px;
      color: #606266;
      background-color: #fafafa;
      .hidden-columns {
        position: absolute;
        z-index: -1;
      }
      .el-table__header-wrapper {
        width: 100%;
        overflow: hidden;
        background-color: #fafafa;
        .el-table__body,
        .el-table__footer,
        .el-table__header {
          table-layout: fixed;
          border-collapse: separate;
          background-color: #fafafa;
          .el-table thead {
            color: #909399;
            font-weight: 500;
            background-color: #fafafa;
            .el-table tr {
              .el-table th {
                white-space: nowrap;
                overflow: hidden;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                text-align: left;
                text-indent: 22px;
                .el-table th > .cell {
                  position: relative;
                  word-wrap: normal;
                  text-overflow: ellipsis;
                  vertical-align: middle;
                  width: 100%;
                  -webkit-box-sizing: border-box;
                  box-sizing: border-box;
                  color: #535353;
                }
              }
            }
          }
        }
      }
    }
    .el-button--text {
      color: #00bc71;
    }
  }
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
    .search {
      width: 261px;
      border: 1px solid #e8e8e8;
      height: 32px;
      margin: 5px 35px auto;
      display: flex;
      border-radius: 16px;
      .search-input {
        width: 100%;
        border-radius: 16px;
        border: none;
        text-indent: 10px;
        color: #8c8c8c;
        font-size: 14px;
      }
      .search-icon {
        margin-top: 8px;
        margin-right: 13px;
      }
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
  .quanbu {
    display: block;
    height: 60px;
    .search-form {
      height: 45px;
      display: flex;
      float: left;
      margin: 15px 0px auto;
      .el-button--primary {
        background-color: #00bc71;
        border-color: #00bc71;
      }
    }
    .el-input__inner {
      height: 37px;
    }
    .el-input {
      height: 37px;
    }
  }
  .quanbu2 {
    display: inherit;
    float: left;
    height: 60px;
    margin-left: -70px;
    .search-form2 {
      display: flex;
      margin: 15px 0px auto;
      float: left;
      height: 45px;
      .el-button--primary {
        background-color: #00bc71;
        border-color: #00bc71;
      }
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
    display: flex;
    .purple {
      height: 80px;
      display: flex;
      justify-content: flex-start;
      width: 50%;
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
          font-size: 16px;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 9px;
        }
        .add-p {
          color: #00bc71;
          font-size: 16px;
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
          font-size: 16px;
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
      justify-content: center;
      width: 50%;
      .search {
        width: 44%;
        border: 1px solid #e8e8e8;
        height: 32px;
        display: flex;
        border-radius: 16px;
        margin-top: 20px;
        margin-right: 20px;
        .search-input {
          width: 100%;
          border-radius: 16px;
          border: none;
          text-indent: 10px;
          color: #8c8c8c;
          font-size: 14px;
        }
        .search-icon {
          margin-top: 8px;
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

