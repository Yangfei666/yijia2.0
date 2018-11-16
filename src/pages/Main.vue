<template>
  <div class="main-total">
    <template>
      <Nav></Nav>
    </template>
    <div class="main">
      <div class="main-right">
        <div class="block">
          <el-col :span="24">
            <el-date-picker
            v-model="SelectDate" @change="changeSelectDate" value-format="yyyy-MM-dd" align="right" type="date"
            placeholder="选择日期" :picker-options="pickerOptions1" :clearable="false" style="width:180px">
            </el-date-picker>
          </el-col>
        </div>
        <div class="block2">
          <el-radio-group v-model="bottomDay" size="medium" @change="changeBottomDay">
            <el-radio-button label="今天"></el-radio-button>
            <el-radio-button label="明天"></el-radio-button>
            <el-radio-button label="后天"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="团课(共20节)" name="league">
          <League ref='League' :groupList="groupList" @clickCourse="clickCourse" v-if="enterStadium"></League>
          <div v-else  style="padding:90px;color:#BFA808;">对不起,昨天还有客户没有进场或者取消预约,请选择昨天的日期,操作完成后方可操作今日课程</div>
        </el-tab-pane>
        <el-tab-pane label="私教(共20节)" name="private">
          <Private ref='private' :privateList="privateList" @clickCourse="clickCourse" v-if="enterStadium"></Private>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="main-list" v-if="experience.length > 0 && enterStadium">
      <div class="customer">
        <span>体验客户约课</span>
      </div>
      <div class="main-table">
        <el-table highlight-current-row :data="experience" style="width: 100%" :header-cell-style="{background:'#fafafa'}">
          <el-table-column align="left" fixed label="头像">
            <template slot-scope="scope">
              <img src="../assets/tianjiahuiyuan.png" alt="头像" style="width: 36px;height:36px;border-radius:50%;">
            </template>
          </el-table-column>
          <el-table-column align="left" prop="experience_customers.exName" label="客户姓名">
          </el-table-column>
          <el-table-column align="left" prop="experience_customers.exTel" label="手机号"></el-table-column>
          <el-table-column align="left" prop="customer_voucher.experience_voucher.tkName" label="体验券"></el-table-column>
          <el-table-column align="left" prop="experience_customers.exHjgwName" label="会籍顾问"></el-table-column>
          <el-table-column align="left" prop="customer_voucher.mode" label="付款方式"></el-table-column>
          <el-table-column align="left" label="操作" fixed="right">
            <template slot-scope="scope">
              <div v-if="scope.row.isEnter == '未进场' && scope.row.isTrue == '未取消'">
                <el-button type="text" size="small" @click="clickEnter('体验客户', scope.row.experience_customers.id)">进场</el-button>
                <el-button type="text" size="small" @click="cancelReservation(scope.row.id, '体验客户')">取消预约</el-button>
              </div>
              <div v-if="scope.row.isTrue == '已取消'">
                <el-button type="text" size="small" disabled style="color:red">已取消</el-button>
              </div>
              <div v-if="scope.row.isEnter == '已进场'">
                <el-button type="text" size="small" disabled style="color:red">已进场</el-button>
                <el-button type="text" size="small" disabled style="color:red">{{scope.row.hand == '0000' ? '未使用手牌' : scope.row.hand }}</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="nav-list" v-if="leaguer.length > 0 && enterStadium">
      <div class="customer">
        <span>会员约课</span>
      </div>
      <div class="main-table">
        <el-table highlight-current-row :data="leaguer" style="width: 100%" :header-cell-style="{background:'#fafafa'}">
          <el-table-column align="left" prop="img" fixed label="头像">
            <template slot-scope="scope">
              <img :src="scope.row.member_customers.Photo" alt="头像" style="width: 36px;height:36px;border-radius:50%;">
            </template>
          </el-table-column>
          <el-table-column align="left" prop="member_customers.HYName" label="客户姓名"></el-table-column>
          <el-table-column align="left" prop="member_customers.MotoTel" label="手机号"></el-table-column>
          <el-table-column align="left" prop="membership_card.CardNO" label="卡号"></el-table-column>
          <el-table-column align="left" prop="member_customers.staff_info.YGXX_NAME" label="会籍顾问"></el-table-column>
          <el-table-column align="left" label="操作" fixed="right">
            <template slot-scope="scope">
              <div v-if="scope.row.isEnter == '未进场' && scope.row.isTrue == '未取消'">
                <el-button type="text" size="small" @click="clickEnter('会员客户', scope.row.member_customers.HYID)">进场</el-button>
                <el-button type="text" size="small" @click="cancelReservation(scope.row.id, '会员客户')">取消预约</el-button>
              </div>
              <div v-if="scope.row.isTrue == '已取消'">
                <el-button type="text" size="small" disabled style="color:red">已取消</el-button>
              </div>
              <div v-if="scope.row.isEnter == '已进场'">
                <el-button type="text" size="small" disabled style="color:red">已进场</el-button>
                <el-button type="text" size="small" disabled style="color:red">{{scope.row.hand == '0000' ? '未使用手牌' : scope.row.hand }}</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="main-list" v-if="enterStadium">
      <div class="customer">
        <span>教练上课登记</span>
      </div>
      <div class="main-table">
        <el-table highlight-current-row :data="trainer" style="width: 100%" :header-cell-style="{background:'#fafafa'}">
          <el-table-column fixed align="left" label="头像">
            <template slot-scope="scope">
              <img :src="scope.row.img" alt="头像" style="width: 36px;height:36px;border-radius:50%;">
            </template>
          </el-table-column>
          <el-table-column align="left" prop="name1" label="安排教练"></el-table-column>
          <el-table-column align="left" prop="tel" label="手机号"></el-table-column>
          <el-table-column align="left" prop="name2" label="上课教练"></el-table-column>
          <el-table-column align="left" prop="classroom" label="教室"></el-table-column>
          <el-table-column align="left" label="操作" fixed="right">
            <template slot-scope="scope">
              <div v-if="scope.row.name1 == scope.row.name2">
                <el-button type="text" size="small" @click="clickEnter('教练', 0)">进场</el-button>
              </div>
              <div v-else>
                <el-button type="text" size="small" style="color:red" disabled>已进场</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 进场输入框 -->
    <template>
      <el-dialog :title="enterTitle" :append-to-body="true" :visible.sync="dialogFormVisible" :course="course">
        <Approach :course="course" :userId="userId" @caochSuccess="caochSuccess" @CustomerSuccess="CustomerSuccess"></Approach>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import League from "../components/league";
import Private from "../components/private";
import Approach from "@/components/approach";
import Nav from "../components/nav";
import { requestLogin as request } from "../api/api";
export default {
  components: {
    League,
    Private,
    Nav,
    Approach
  },
  data() {
    return {
      enterStadium : true,// 是否显示课程内容
      enterTitle : '团课会员进场',//进场输入框的标题
      dialogFormVisible: false,
      formLabelWidth: "130px",
      groupList: [], // 团课列表
      privateList: [], // 私教列表
      date: new Date(),
      activeName: "league",// 团课/私教
      bottomDay: "今天",// 时间按钮
      pickerOptions1: {
        disabledDate(time) {
          const date = new Date();
          var maxDay = date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
          return time.getTime() > maxDay;
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      SelectDate: this.GetDateStr(0), // 日期选择
      experience: [], // 体验客户
      leaguer: [], // 会员客户
      number: "0000", //进场手牌
      course: false, //选中课程
      userId: 0, //选中的客户id
      identity : '',//要进场的身份
      name2 : ''
    };
  },
  computed: {
    // 当前选中的课程
    trainer() {
      if (this.course.JLID != this.course.JLIDs) {
        request("/setStaffInfo/" + this.course.JLIDs, {}, "get")
          .then(data => {
            this.name2 = data.YGXX_NAME;
          });
          return [
              {
                img: this.course.staff_info.Photo,
                name1: this.course.staff_info.YGXX_NAME,
                tel: this.course.staff_info.YGXX_HOMETEL,
                classroom: this.course.kcPlace,
                name2:this.name2
              }
            ];
      } else {
        return [
          {
            img: this.course ? this.course.staff_info.Photo : '',
            name1: this.course ? this.course.staff_info.YGXX_NAME : '',
            tel: this.course ? this.course.staff_info.YGXX_HOMETEL : '',
            classroom: this.course? this.course.kcPlace : '',
            name2:this.course ? this.course.staff_info.YGXX_NAME : ''
          }
        ];
      }
    },
    bool() {
      return this.activeName == "league" ? true : false;
    }
  },
  created() {
    let today = this.GetDateStr(0);
    this.getCourseList(today);
  },
  watch: {
    activeName (oldValue, newValue) {
      if (newValue == 'league') {
        var course = this.privateList.slice(0, 1)[0];
        } else {
        var course = this.groupList.slice(0, 1)[0];
      }
      this.course = course;
      this.getCourseDetails(course);
    }
  },
  methods: {
    // 进场按钮点击
    clickEnter (str, id) {
      this.enterTitle = (this.activeName == "league" ? '团课' : '私教') + str + '进场';
      this.userId = id;
      this.dialogFormVisible = true;
    },
    // 教练进场成功更改状态
    caochSuccess(name2, JLIDs) {
      this.name2 = name2;
      this.course.JLIDs = JLIDs;
      this.dialogFormVisible = false;
    },
    // 客户进场更改状态
    CustomerSuccess(hand) {
      this.changeStatus('已进场', hand);
      this.dialogFormVisible = false;
    },
    // 页面进场/取消状态更改
    changeStatus(msg, num) {
      let str = this.enterTitle.substring(2,4);
      let array = str == '会员' ? this.leaguer : this.experience;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (msg == '已取消' && element.id == num) {
          element.isTrue = msg;
        }
        if (str == '会员') {
          if (msg == '已进场' && element.member_customers.HYID == this.userId) {
            element.isEnter = msg;
            element.hand = num;
          }
        } else {
          if (msg == '已进场' && element.experience_customers.id == this.userId) {
            element.isEnter = msg;
            element.hand = num;
          }
        }
      }
    },
    // 取消预约
    cancelReservation(id, str) {
      this.enterTitle = (this.activeName == "league" ? '团课' : '私教') + str + '取消预约';
      let params = { bool: this.bool, id:id };
      request("/adminHomePage/cancelReservation", params)
        .then(data => {
          this.changeStatus('已取消', id);
          this.msgThen(data);
        })
        .catch(error => {
          this.msgCatch(error, "对不起,取消预约失败");
        });
    },
    // 时间按钮
    changeBottomDay() {
      if (this.bottomDay == "今天") {
        let day = this.GetDateStr(0)
        this.SelectDate = day;
        this.getCourseList(day);
      } else if (this.bottomDay == "明天") {
        let day = this.GetDateStr(1)
        this.SelectDate = day;
        this.getCourseList(day);
      } else {
        let day = this.GetDateStr(2)
        this.SelectDate = day;
        this.getCourseList(day);
      }
    },
    // 获取指定天数后的时间
    GetDateStr(num, day) {
      var day = day || new Date();
      let date = new Date(day);
      date.setDate(date.getDate() + num);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? '0' + d : d;
      return y + "-" + m + "-" + d;
    },
    // 时间选择
    changeSelectDate() {
      if (this.SelectDate == this.GetDateStr(0)) {
        this.bottomDay = "今天";
      } else if (this.SelectDate == this.GetDateStr(1)) {
        this.bottomDay = "明天";
      } else if (this.SelectDate == this.GetDateStr(2)) {
        this.bottomDay = "后天";
      } else {
        this.bottomDay = "";
      }
      this.getCourseList(this.SelectDate);
    },
    // 根据日期获取课程列表
    getCourseList(day) {
      request("/adminHomePage?day=" + day, {}, "get")
        .then(data => {
          // console.log(data);
          // console.log(sessionStorage.getItem('access-token'));
          if (data.group === false && data.private === false) {
            this.enterStadium = false;
          } else {
            this.enterStadium = true;
            this.groupList = data.group;
            this.privateList = data.private;
            setTimeout(this.getCourseDetails(data.group.slice(0, 1)[0]), 2000); // 加载默认课程详情
          }
        })
        .catch(error => {
          this.msgCatch(error, "对不起,课程数据加载失败");
        });
    },
    // 获取课程预约详情
    clickCourse(course) {
      this.getCourseDetails(course);
    },
    getCourseDetails(course) {
      if (!course) {
        return fasle;
      }
      this.course = course;
      // id = 7016;
      request("/adminHomePage/" + course.ID, {}, "get")
        .then(data => {
          this.experience = data.experience;
          this.leaguer = data.member;
        })
        .catch(error => {
          if (error.response) {
            this.$message({
              message: "对不起,课预约详情获取失败!",
              type: "error"
            });
          }
        });
    },
    //成功提示
    msgThen(data) {
      if (data.errorCode == 0) {
        this.$message({
          message: "操作成功",
          type: "success"
        });
      } else {
        this.$message({
          message: data.msg,
          type: "error"
        });
      }
    },
    //失败提示
    msgCatch(error, msg) {
      if (error.response) {
        this.$message({
          message: msg,
          type: "error"
        });
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/main.scss";
.main-total {
  height: 100%;
  .main {
    width: 97%;
    margin: 20px auto;
    height: 410px;
    background-color: #ffffff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    .main-right {
      width: 60%;
      position: absolute;
      right: 0;
      z-index: 2;
      .block {
        // width: 30%;
        float: left;
        margin-top: 1px;
        line-height: 40px;
        .el-date-editor {
          position: relative;
          display: inline-block;
          text-align: left;
          .el-input__inner {
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border-radius: 16px;
            border: 1px solid #e8e8e8;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 32px;
            line-height: 32px;
            outline: 0;
            padding: 0 15px;
            -webkit-transition: border-color 0.2s
              cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            width: 100%;
          }
        }
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 148px;
        }
        .el-input {
          position: relative;
          font-size: 14px;
          display: inline-block;
          width: 100%;
        }
      }
      .block2 {
        // width: 30%;
        float: right;
        display: flex;
        justify-content: space-between;
        border-radius: 30px;
        height: 32px;
        line-height: 32px;
        margin-top: 4px;
        .el-radio-button__inner {
          color: #fff;
          background-color: #00bc71;
          border-color: #00bc71;
          -webkit-box-shadow: -1px 0 0 0 #00bc71;
          box-shadow: -1px 0 0 0 #00bc71;
        }
      }
    }
    .el-tabs {
      width: 100%;
      margin: 0 auto;
      .el-tabs__header {
        padding: 0px;
        position: relative;
        margin: 0 0 15px;
        .el-tabs__nav-wrap {
          overflow: hidden;
          margin-bottom: -1px;
          position: relative;
          .el-tabs__nav-scroll {
            overflow: hidden;
            .el-tabs__nav {
              white-space: nowrap;
              position: relative;
              -webkit-transition: -webkit-transform 0.3s;
              transition: -webkit-transform 0.3s;
              transition: transform 0.3s;
              transition: transform 0.3s, -webkit-transform 0.3s;
              transition: transform 0.3s, -webkit-transform 0.3s;
              float: left;
              z-index: 2;
              .el-tabs__active-bar {
                position: absolute;
                bottom: 0;
                left: 37px;
                height: 2px;
                background-color: #56e79e;
                z-index: 1;
                -webkit-transition: -webkit-transform 0.3s
                  cubic-bezier(0.645, 0.045, 0.355, 1);
                transition: -webkit-transform 0.3s
                  cubic-bezier(0.645, 0.045, 0.355, 1);
                transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
                  -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
                  -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                list-style: none;
                width: 30px;
                transform: translateX(0px);
              }
              .el-tabs__item {
                padding: 0 20px;
                height: 40px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                line-height: 40px;
                display: inline-block;
                list-style: none;
                font-size: 14px;
                font-weight: 500;
                color: #303133;
                position: relative;
              }
              .el-tabs__item.is-top:nth-child(2) {
                padding-left: 37px;
              }
              .el-tabs__item.is-active {
                color: #56e79e;
              }
              .el-tabs__item:hover {
                color: #56e79e;
                cursor: pointer;
              }
            }
          }
        }
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
  .nav-list {
    width: 97%;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    margin: 20px auto;
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
}
</style>
