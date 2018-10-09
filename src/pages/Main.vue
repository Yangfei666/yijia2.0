<template>
<div class="main-total">
    <template>
    <Nav></Nav>
    </template>
    <div class="main">
    <div class="main-right">
       <div class="block">
         <el-col :span="24">
      <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1" style="width:180px"></el-date-picker>
         </el-col>
     </div>
        <div class="block2">
            <el-radio-group v-model="radio4" size="medium">
              <el-radio-button label="今天" ></el-radio-button>
              <el-radio-button label="明天"></el-radio-button>
              <el-radio-button label="后天"></el-radio-button>
            </el-radio-group>
        </div>
      </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="团课(共20节)" name="league"><League ref='League'></League></el-tab-pane>
    <el-tab-pane label="私教(共20节)" name="private"><Private></Private></el-tab-pane>
    </el-tabs>
    </div>
        <div class="main-list">
        <div class="customer">
            <span>教练上课登记</span>
        </div>
        <div class="main-table">
          <el-table highlight-current-row :data="trainer" style="width: 100%" :header-cell-style="{background:'#fafafa'}">
            <el-table-column  fixed align="left" label="头像">
               <template slot-scope="scope">
                  <img  :src="scope.row.img" alt="头像" style="width: 36px;height:36px;border-radius:50%;">
                </template>
            </el-table-column>
            <el-table-column align="left" prop="trainer" label="安排教练">
            </el-table-column>
            <el-table-column align="left" prop="tel" label="手机号"></el-table-column>
            <el-table-column align="left" prop="goclass" label="上课教练"></el-table-column>
            <el-table-column align="left" prop="room" label="教室"></el-table-column>
            <el-table-column align="left" label="操作" fixed="right">
            <template slot-scope="scope">
                <el-button @click="handleClick2(scope.row)" type="text" size="small">进场</el-button>
            </template>
            </el-table-column>
         </el-table>
        </div>
    </div>
    <div class="main-list">
        <div class="customer">
            <span>体验客户约课</span>
        </div>
        <div class="main-table">
          <el-table highlight-current-row :data="experience" style="width: 100%" :header-cell-style="{background:'#fafafa'}">
            <el-table-column align="left" fixed label="头像">
               <template slot-scope="scope">
                  <img  :src="scope.row.img" alt="头像" style="width: 36px;height:36px;border-radius:50%;">
                </template>
            </el-table-column>
            <el-table-column align="left" prop="name" label="客户姓名">
            </el-table-column>
            <el-table-column align="left" prop="tel" label="手机号"></el-table-column>
            <el-table-column align="left" prop="tyj" label="体验卷"></el-table-column>
            <el-table-column align="left" prop="hjgw" label="会籍顾问"></el-table-column>
            <el-table-column align="left" prop="fkfs" label="付款方式"></el-table-column>
            <el-table-column align="left" label="操作" fixed="right">
            <template slot-scope="scope">
                <el-button @click="handleClick2(scope.row)" type="text" size="small">离场</el-button>
                <el-button @click="handleClick2(scope.row)" type="text" size="small">未使用</el-button>
            </template>
            </el-table-column>
         </el-table>
        </div>
    </div>
    <div class="nav-list">
        <div class="customer">
            <span>会员约课</span>
        </div>
        <div class="main-table">
          <el-table highlight-current-row :data="leaguer" style="width: 100%" :header-cell-style="{background:'#fafafa'}">
            <el-table-column align="left" prop="img" fixed label="头像">
               <template slot-scope="scope">
                  <img  :src="scope.row.img" alt="头像" style="width: 36px;height:36px;border-radius:50%;">
                </template>
            </el-table-column>
            <el-table-column align="left" prop="name" label="客户姓名"></el-table-column>
            <el-table-column align="left" prop="tel" label="手机号"></el-table-column>
            <el-table-column align="left" prop="card" label="卡号" ></el-table-column>
            <el-table-column align="left" prop="hjgw" label="会籍顾问"></el-table-column>
             <el-table-column align="left" label="操作" fixed="right">
            <template slot-scope="scope">
                <el-button @click="handleClick2(scope.row)" type="text" size="small">进场</el-button>
                <el-button @click="handleClick2(scope.row)" type="text" size="small">取消预约</el-button>
            </template>
            </el-table-column>
         </el-table>
        </div>
    </div>
</div>
</template>
<script>
import League from "../components/league";
import Private from "../components/private";
import Nav from "../components/nav";
export default {
  components: {
    League,
    Private,
    Nav,
  },
  data() {
    return {
      activeName: "league",
      radio4: '今天',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
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
      value2: "",
      value1: "",
      visible2: false,
      trainer:[
        {
          img: "http://img2.woyaogexing.com/2017/10/31/da621481e30d6bc4!400x400_big.jpg",
          trainer: "王小虎",
          tel: "16845654464",
          goclass: "Angel",
          room: "综合瑜伽教室",
        }
      ],
      experience: [
        {
          img: "http://img2.woyaogexing.com/2017/10/31/da621481e30d6bc4!400x400_big.jpg",
          name: "王小虎",
          tel: "16845654464",
          tyj: "大众2222",
          hjgw: "Angle",
          fkfs: "大众点评"
        },
        {
          img: "http://img2.woyaogexing.com/2017/10/31/da621481e30d6bc4!400x400_big.jpg",
          name: "王小虎",
          tel: "16845654464",
          tyj: "大众2222",
          hjgw: "Angle",
          fkfs: "大众点评"
        },
        {
          img: "http://img2.woyaogexing.com/2017/10/31/da621481e30d6bc4!400x400_big.jpg",
          name: "王小虎",
          tel: "16845654464",
          tyj: "大众2222",
          hjgw: "Angle",
          fkfs: "大众点评"
        },
        {
          img: "http://img2.woyaogexing.com/2017/10/31/da621481e30d6bc4!400x400_big.jpg",
          name: "王小虎",
          tel: "16845654464",
          tyj: "大众2222",
          hjgw: "Angle",
          fkfs: "大众点评"
        }
      ],
      leaguer: [
        {
          img: "http://img2.woyaogexing.com/2017/10/31/da621481e30d6bc4!400x400_big.jpg",
          name: "王小虎",
          tel: "16845654464",
          card: "123456",
          hjgw: "Angle"
        },
        {
          img: "http://img2.woyaogexing.com/2017/10/31/da621481e30d6bc4!400x400_big.jpg",
          name: "王小虎",
          tel: "16845654464",
          card: "123456",
          hjgw: "Angle"
        },
        {
          img: "http://img2.woyaogexing.com/2017/10/31/da621481e30d6bc4!400x400_big.jpg",
          name: "王小虎",
          tel: "16845654464",
          card: "123456",
          hjgw: "Angle"
        },
        {
          img: "http://img2.woyaogexing.com/2017/10/31/da621481e30d6bc4!400x400_big.jpg",
          name: "王小虎",
          tel: "16845654464",
          card: "123456",
          hjgw: "Angle"
        },
        {
          img: "http://img2.woyaogexing.com/2017/10/31/da621481e30d6bc4!400x400_big.jpg",
          name: "王小虎",
          tel: "16845654464",
          card: "123456",
          hjgw: "Angle"
        },
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClick2(row) {
      console.log(row);
      alert('点击了');
    }
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
                background-color: #56E79E;
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
                color: #56E79E;
              }
              .el-tabs__item:hover {
                  color: #56E79E;
                  cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .main-list {
    width: 97%;
    margin: 20px auto;
    height:100%;
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
      .el-button--text{
        color: #00BC71;
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
      .el-button--text{
        color: #00BC71;
      }
    }
  }
}
</style>