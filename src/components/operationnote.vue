<template>
    <div>
        <!--操作记录-->
        <div class="health">
            <el-col :span="24" class="infor-head">
                <router-link :to="{name:'Memberhome'}" style="text-decoration:none;">
                    <div class="infor-but">
                        <span class="goback el-icon-arrow-left">返回</span>
                    </div>
                </router-link>
                <div class="infor-title">
                    <span>操作记录</span>
                </div>
            </el-col>
            <el-col :span="24">
            <div class="practice-table">
                <el-row :gutter="12" class="item-wrap" style="margin-left:0px;margin-right:0px">
                    <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">转卡</div>
                                    <div class="always-cardone">卡1</div>
                                </div>
                                <div class="yuan-main4">
                                    <div class="yuan">原会员姓名：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">新会员姓名：
                                        <span>大大幅度</span>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">退卡</div>
                                    <div class="always-cardone">卡2</div>
                                </div>
                                <div class="yuan-main">
                                    <div class="yuan">退还金额：
                                        <div class="right">￥12.00</div>
                                    </div>
                                    <div class="yuan">退卡原因：
                                        <div class="right">退卡原因退卡原因退卡原因原因</div>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">升级</div>
                                    <div class="always-cardone">卡3</div>
                                </div>
                                <div class="yuan-main3">
                                    <div class="yuan">原卡号：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">原卡类型：
                                        <span>50次(高峰)</span>
                                    </div>
                                    <div class="yuan">原激活时间:
                                        <span class="yuan2">2018-06-17 20:00:00</span>
                                    </div>
                                    <div class="yuan" v-show="isShow">原到期时间:
                                        <span class="yuan2">2018-06-17 20:00:00</span>
                                    </div>
                                    <div class="yuan" v-show="isShow">原支付方式：
                                        <span class="yuan">支付宝</span>
                                    </div>
                                    <div class="yuan" v-show="isShow">原付款金额：
                                        <span class="yuan">￥50.00</span>
                                    </div>
                                    <div class="yuan" v-show="isShow">原剩余金额：
                                        <span class="yuan">￥5.00</span>
                                    </div>
                                </div>
                                <div class="yuan-main2" v-show="isShow">
                                    <div class="yuan">原卡号：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">原卡类型：
                                        <span>50次(高峰)</span>
                                    </div>
                                    <div class="yuan">原激活时间:
                                        <span class="yuan2">2018-06-17 20:00:00</span>
                                    </div>
                                    <div class="yuan">原到期时间:
                                        <span class="yuan2">2018-06-17 20:00:00</span>
                                    </div>
                                    <div class="yuan">原支付方式：
                                        <span class="yuan">支付宝</span>
                                    </div>
                                    <div class="yuan">原付款金额：
                                        <span class="yuan">￥50.00</span>
                                    </div>
                                    <div class="yuan">原剩余金额：
                                        <span class="yuan">￥5.00</span>
                                    </div>
                                </div>
                                <span class="corry-out" @click="showToggle">{{btnText}}</span>
                                <div class="footss">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">转卡</div>
                                    <div class="always-cardone">卡1</div>
                                </div>
                                <div class="yuan-main4">
                                    <div class="yuan">原会员姓名：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">新会员姓名：
                                        <span>大大幅度</span>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">转卡</div>
                                    <div class="always-cardone">卡1</div>
                                </div>
                                <div class="yuan-main4">
                                    <div class="yuan">原会员姓名：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">新会员姓名：
                                        <span>大大幅度</span>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">转卡</div>
                                    <div class="always-cardone">卡1</div>
                                </div>
                                <div class="yuan-main4">
                                    <div class="yuan">原会员姓名：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">新会员姓名：
                                        <span>大大幅度</span>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">转卡</div>
                                    <div class="always-cardone">卡1</div>
                                </div>
                                <div class="yuan-main4">
                                    <div class="yuan">原会员姓名：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">新会员姓名：
                                        <span>大大幅度</span>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">转卡</div>
                                    <div class="always-cardone">卡1</div>
                                </div>
                                <div class="yuan-main4">
                                    <div class="yuan">原会员姓名：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">新会员姓名：
                                        <span>大大幅度</span>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">转卡</div>
                                    <div class="always-cardone">卡1</div>
                                </div>
                                <div class="yuan-main4">
                                    <div class="yuan">原会员姓名：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">新会员姓名：
                                        <span>大大幅度</span>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">转卡</div>
                                    <div class="always-cardone">卡1</div>
                                </div>
                                <div class="yuan-main4">
                                    <div class="yuan">原会员姓名：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">新会员姓名：
                                        <span>大大幅度</span>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                     <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">转卡</div>
                                    <div class="always-cardone">卡1</div>
                                </div>
                                <div class="yuan-main4">
                                    <div class="yuan">原会员姓名：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">新会员姓名：
                                        <span>大大幅度</span>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                     <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">转卡</div>
                                    <div class="always-cardone">卡1</div>
                                </div>
                                <div class="yuan-main4">
                                    <div class="yuan">原会员姓名：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">新会员姓名：
                                        <span>大大幅度</span>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                     <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">转卡</div>
                                    <div class="always-cardone">卡1</div>
                                </div>
                                <div class="yuan-main4">
                                    <div class="yuan">原会员姓名：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">新会员姓名：
                                        <span>大大幅度</span>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                     <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">转卡</div>
                                    <div class="always-cardone">卡1</div>
                                </div>
                                <div class="yuan-main4">
                                    <div class="yuan">原会员姓名：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">新会员姓名：
                                        <span>大大幅度</span>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                     <el-col :span="4" class="box-ul">
                        <el-card shadow="always">
                            <div class="always-main">
                                <span class="always-span">2018-06-17 20:00:00</span>
                                <div class="card-main">
                                    <div class="always-card">转卡</div>
                                    <div class="always-cardone">卡1</div>
                                </div>
                                <div class="yuan-main4">
                                    <div class="yuan">原会员姓名：
                                        <span>李木子</span>
                                    </div>
                                    <div class="yuan">新会员姓名：
                                        <span>大大幅度</span>
                                    </div>
                                </div>
                                <div class="foot">
                                    <span class="foot1">操作人</span>
                                    <div class="foot2">测试555</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <div class="block">
                <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
                </div>
            </div>
            </el-col>
        </div>
    </div>
</template>
<script>
import { requestLogin } from "@/api/api";
export default {
    name:'operationnote',
  data() {
    return {
      btnText: "展开",
      isShow: false
    };
  },
  created(){
      this.getexperhome();
  },
  methods: {
       //获取操作记录
    getexperhome() {
      let _this = this;
      let relationCard = [];
      console.log(this.$route);
      console.log(this.$route.params.HYID);
      requestLogin("/setDesignateMember/getOperationRecord/" + this.$route.params.HYID, {}, "get")
        .then(function(res) {
        //   _this.club = res;
        //   let { membership_card } = res;
        //   relationCard = membership_card.relationCard;
        //   let { Photo } = res;
        //   _this.imageUrl = Photo;
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
    showToggle: function() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.btnText = "收起";
      } else {
        this.btnText = "展开";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/operationnote.scss";
.health {
  width: 97%;
  height: 100%;
  display: inline-block;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  .infor-head {
    height: 50px;
    display: flex;
    line-height: 50px;
    border-bottom: 1px solid #e8e8e8;
    .infor-but {
      padding-left: 10px;
      font-size: 16px;
      color: #262626;
    }
    .infor-but:hover {
      color: #00bc71;
    }
    .infor-title {
      padding-left: 15px;
      font-size: 16px;
      color: #262626;
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
  .practice-table {
    width: 98%;
    height: 100%;
    margin: 2% auto;
    .item-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: inherit;
      flex-wrap: wrap;
      padding-left: 0px;
      padding-right: 0px;
    }
    .box-ul {
      width: 20%;
      margin-bottom: 10px;
      .always-main {
        text-align: left;
        .always-span {
          font-size: 20px;
          color: #262626;
        }
        .card-main {
          width: 100%;
          display: flex;
          margin-top: 10px;
          .always-card {
            width: 56px;
            height: 32px;
            background: #00bc71;
            border-radius: 4px;
            font-size: 20px;
            text-align: center;
            line-height: 32px;
            color: #fff;
          }
          .always-cardone {
            width: 56px;
            height: 32px;
            background: #facc14;
            border-radius: 4px;
            font-size: 20px;
            text-align: center;
            line-height: 32px;
            margin-left: 10px;
            color: #fff;
          }
        }
        .yuan-main {
          padding-left: 0px;
          text-align: left;
          height: 100%;
          margin-top: 10px;
          line-height: 25px;
          .yuan {
            color: #8c8c8c;
            font-size: 14px;
            display: flex;
            .right {
              color: #8c8c8c;
              font-size: 13.5px;
              width: 64%;
            }
          }
        }
        .yuan-main4 {
          padding-left: 0px;
          text-align: left;
          height: 100%;
          margin-top: 15px;
          line-height: 35px;
          .yuan {
            color: #8c8c8c;
            font-size: 14px;
            display: flex;
            .right {
              color: #8c8c8c;
              font-size: 13.5px;
              width: 64%;
            }
          }
        }
        .yuan-main3 {
          padding-left: 0px;
          text-align: left;
          height: 100%;
          margin-top: 10px;
          line-height: 25px;
          .yuan {
            color: #8c8c8c;
            font-size: 14px;
            display: flex;
            justify-content: flex-start;
            .right {
              color: #8c8c8c;
              font-size: 13.5px;
              width: 64%;
            }
            .yuan2 {
              color: #8c8c8c;
              font-size: 13px;
            }
          }
        }
        .yuan-main2 {
          padding-left: 0px;
          text-align: left;
          height: 100%;
          margin-top: 10px;
          line-height: 25px;
          .yuan {
            color: #262626;
            font-size: 14px;
            .yuan2 {
              color: #262626;
              font-size: 13.5px;
            }
          }
        }
        .corry-out {
          color: #00bc71;
          font-size: 14px;
        }
        .foot {
          margin-top: 30px;
          line-height: 25px;
          .foot1 {
            font-size: 14px;
            color: #eca110;
          }
          .foot2 {
            font-size: 20px;
            color: #262626;
          }
        }
        .footss {
          margin-top: 10px;
          line-height: 25px;
          .foot1 {
            font-size: 14px;
            color: #eca110;
          }
          .foot2 {
            font-size: 20px;
            color: #262626;
          }
        }
      }
    }
    .block{
        display: flex;
    justify-content: center;
    margin-top: 20px;
    }
  }
}
</style>