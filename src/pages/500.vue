<template>
    <div>
        <el-row>
            <el-col :span="24" class="forbidden">
                <div class="forbidden-main">
                <div class="Img">
                    <img src="../../assets/500.png"/>
                </div>
                <div class="text">
                    <h1>500</h1>
                    <span>抱歉 ，服务器出错了</span>
                    <el-button type="primary" class="butt" @click="jump">返回首页</el-button>
                </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  methods: {
    jump(){
    this.$router.push("/home/main")
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/error.scss";
.forbidden{
    height: 100%;
    display: inline-block;
    .forbidden-main{
        width: 70%;
        margin: 7% auto;
        display: inline-flex;
        .Img{
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        .text{
            margin-left: 5%;
            margin-top: 10%;
            h1{
                font-family: PingFang-SC-Heavy;
                font-size: 72px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 2.9px;
                color: #3a3e3c;
                display: table-cell;
            }
            span{
                font-size: 20px;
                color: #949799;
                text-align: left;
            }
            .el-button--primary{
                margin-top: 10%;
                display: flex;
            }
            .butt{
                height: 10%;
                line-height: 10%;
            }
        }
    }
}
</style>