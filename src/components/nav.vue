<template>
<!--首页选项卡-->
    <div class="main-head">
     <div class="head-one">
        <img class="one-img" src="../assets/tianjiahuiyuan.png"/>
        <router-link to="" style="text-decoration:none;">
            <p class="one-p" @click="dialogFormVisible = true">添加会员</p>
        <template>
        <el-dialog title="添加会员" :append-to-body="true" :visible.sync="dialogFormVisible">
        <Addmember></Addmember>
        </el-dialog>
        </template>
        </router-link>
      </div>
      <div class="border"></div>
      <div class="head-one">
        <img class="one-img" src="../assets/dingjin.png"/>
        <router-link to="" style="text-decoration:none;">
        <p class="one-p" @click="dialogFormVisible2 = true">添加定金客户</p>
        <template>
        <el-dialog title="添加定金客户" :append-to-body="true" :visible.sync="dialogFormVisible2">
        <Addbargain></Addbargain>
        </el-dialog>
        </template>
        </router-link>
      </div>
      <div class="border"></div>
      <div class="head-one">
        <img class="one-img" src="../assets/huiytuanguanli.png"/>
        <router-link :to="{path:'/Customer/leaguer/leaguermanage'}" style="text-decoration:none;">
        <p class="one-p">会员管理</p>
        </router-link>
      </div>
      <div class="border"></div>
      <div class="head-one">
        <img class="one-img" src="../assets/tiyan.png"/>
        <router-link to="" style="text-decoration:none;">
        <p class="one-p" @click="dialogFormVisible3 = true">添加体验客户</p>
        <template>
        <el-dialog title="添加体验客户" :append-to-body="true" :visible.sync="dialogFormVisible3">
        <Addpractice></Addpractice>
        </el-dialog>
        </template>
        </router-link>
      </div>
      <div class="border"></div>
      <div class="head-two">
        <img class="two-img" src="../assets/qianzai.png"/>
        <router-link to="" style="text-decoration:none;">
        <p class="two-p" @click="dialogFormVisible4 = true">添加潜在客户</p>
        <template>
        <el-dialog title="添加潜在客户" :append-to-body="true" :visible.sync="dialogFormVisible4">
        <Addlatent></Addlatent>
        </el-dialog>
        </template>
        </router-link>
      </div>
    </div>
</template>
<script>
import Addmember from "@/components/addmember";
import Addbargain from "@/components/addbargain";
import Addpractice from "@/components/addpractice";
import Addlatent from "@/components/addlatent";
export default {
  components: {
      Addmember,
      Addbargain,
      Addpractice,
      Addlatent
  },
  data() {
    return {
        dialogFormVisible: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        dialogFormVisible4: false,
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/nav.scss";
    .main-head{
        width: 97%;
        margin: 20px auto;
        height: 180px;
        background-color: #ffffff;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        .border{
            width:1px;
            height: 40%;
            background: #d9d9d9;
            float: right;
            position: relative;
            top:28%;
            border-radius: 5px;
        }
        .head-one{
            width: 16%;
            height: 100%;
            .one-img{
                width: 80px;
                height: 80px;
                display: initial;
                margin-top: 25px;
            }
            .one-p{
                font-family: PingFang-SC-Regular;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 12px;
                letter-spacing: 0px;
                color: #8c8c8c;
                text-align: center;
            }
            .one-p:hover{
                color: #00bc71;
            }
        }
        .head-one:hover{
             transform:scale(1.1);
        }
        .head-two{
            width: 16%;
            height: 100%;
            .two-img{
                width: 80px;
                height: 80px;
                display: initial;
                margin-top: 25px;
            }
            .two-p{
                font-family: PingFang-SC-Regular;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 12px;
                letter-spacing: 0px;
                color: #8c8c8c;
                text-align: center;
            }
            .two-p:hover{
                color: #00bc71;
            }
        }
          .head-two:hover{
             transform:scale(1.1);
        }
    }
</style>