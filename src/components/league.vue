<template>
  <div>
    <!--首页团课卡片-->
    <el-col :span="24" class="main-wp">
      <div class="swiper-container" id="swiper">
        <div class="swiper-wrapper">
          <ul class="swiper-slide" v-for="item in 4" :key="item">
            <li class="tea" v-for="(i,index) in arr" @click="middle(i)" :key="index">
              <template>
                <div class="swiper-main">
                  <div class="dimback">
                  <img class="Img" :src="i.Img" />
                  </div>
                  <p class="time">{{i.time}}</p>
                  <p class="name">{{i.name}}</p>
                </div>
                <div class="box"></div>
                <div class="bai">{{i.tuan}}</div>
                <p class="yuyue">{{i.num}}</p>
                <div class="progressContainer">
                  <div class="progress">
                    <b>{{i.progress}}</b>
                  </div>
                </div>
                <div class="star">
                  <div class="block">
                    <el-rate v-model="value1"></el-rate>
                  </div>
                  <div class="but">
                    <p>{{i.but}}</p>
                  </div>
                </div>
              </template>
            </li>
          </ul>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <!-- <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div> -->
    </el-col>
    <el-col :span="24">
      <div class="tea-weber">
        <div class="weber-main">
          <div class="circle"></div>
          <span style="font-size:16px">09:00</span>
        </div>
        <div class="weber-main">
          <div class="circle"></div>
          <span style="font-size:18px">09:00</span>
        </div>
        <div class="weber-main">
          <div class="circle"></div>
          <span>09:00</span>
          <em class="top"></em>
        </div>
        <div class="weber-main">
          <div class="circle"></div>
          <span style="font-size:18px">09:00</span>
        </div>
        <div class="weber-main">
          <div class="circle"></div>
          <span style="font-size:16px">09:00</span>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Swiper from "swiper";
import Img from '@/assets/1.png'; 
import Img2 from '@/assets/2.png'; 
import Img3 from '@/assets/3.png';
import Img4 from '@/assets/4.png'; 
import Img5 from '@/assets/5.png'; 
export default {
  name:'league',
  data() {
    return {
      value1: 4,
      progress: 20,
      mySwiper: "",
      arr: [
        {
          id: 1,
          Img:Img,
          time: "9:30-10:00",
          name: "空中瑜伽·lucyv",
          tuan: "白",
          num: "已预约25/25",
          progress: "20",
          but: "团课"
        },
        {
          id: 2,
          Img:Img2,
          time: "9:30-10:00",
          name: "空中瑜伽·lucyv",
          tuan: "灰",
          num: "已预约20/25",
          progress: "20",
          but: "团课"
        },
        {
          id: 3,
          Img:Img3,
          time: "9:30-10:00",
          name: "基础瑜伽·angel",
          tuan: "白",
          num: "已预约16/25",
          progress: "20",
          but: "团课"
        },
        {
          id: 4,
          Img:Img4,
          time: "9:30-10:00",
          name: "空中瑜伽·lucyv",
          tuan: "白",
          num: "已预约21/25",
          progress: "20",
          but: "团课"
        },
        {
          id: 5,
          Img:Img5,
          time: "9:30-10:00",
          name: "基础瑜伽·lucyv",
          tuan: "白",
          num: "已预约14/25",
          progress: "20",
          but: "团课"
        }
      ]
    };
  },
  mounted() {
    let that = this;
    setTimeout(function() {
      that.initSwiper();
    }, 500);
  },
  methods: {
    middle(i) {
      let idx = this.arr.indexOf(i);
      this.arr.splice(idx, 1);
      this.arr.splice(2, 0, i);
    },
     initSwiper() {
      new Swiper("#swiper", {
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: ".swiper-pagination",
        autoplay: 2000,
        paginationClickable: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "swiper/dist/css/swiper.min.css";
@import "@/styles/league.scss";
.main-wp {
  .swiper-container {
    width: 93%;
    height: 260px;
    background-color: #fff;
    .swiper-wrapper{
      width: 100%;
    .swiper-slide {
      padding-top: 0px;
      padding-left: 0px;
      .tea {
        float: left;
        list-style: none;
        width: 19.13%;
        background: #fff;
        margin: 0 1.45%;
        height: 89.236%;
        transition: 500ms ease-in-out;
        transform-origin: center center;
        position: relative;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);
        .swiper-main {
          width: 100%;
          height: 55%;
          position: absolute;
          top: 0px;
          .dimback{
            background: #000;
            border-radius: 4px;
            display: flex;
            height: 100%;
            width: 100%;
            .Img {
            width: 100%;
            height: 100%;
            opacity:0.3; 
            filter: alpha(opacity=30);
            border-radius: 4px;
            }
          }
          .time {
            color: #fff;
            font-size: 20px;
            position: absolute;
            top: 13%;
            left: 10%;
          }
          .name {
            color: #fff;
            font-size: 20px;
            position: absolute;
            top: 37%;
            left: 10%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .box {
          height: 4px;
          background: #fff;
          position: relative;
          top: 54%;
        }
        .bai {
          width: 30%;
          height: 24px;
          border-radius: 11px;
          background-color: #ffffff;
          box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);
          position: absolute;
          top: 50%;
          left: 36%;
          color: #000;
          font-size: 14px;
          line-height: 24px;
          font-family: PingFang-SC-Regular;
        }
        .yuyue {
          font-family: PingFang-SC-Regular;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 25px;
          letter-spacing: 0px;
          color: #262626;
          width: 80%;
          height: 25px;
          text-align: left;
          position: absolute;
          top: 58%;
          left: 10%;
        }
        div.progressContainer {
          height: 1px;
          width: 13%;
          border-radius: 10px;
          background-color: #fff;
          margin-left: 10%;
          position: absolute;
          bottom: 48px;
        }
        div.progress {
          background-color: #eed29b;
          border-radius: 10px;
          height: 1px;
        }
        b {
          color: #fff;
          font-weight: 100;
          font-size: 12px;
          position: absolute;
          left: 40%;
        }
        .star {
          width: 100%;
          height: 40px;
          position: absolute;
          bottom: 0px;
          .block {
            width: 70%;
            height: 21px;
            .el-rate {
              height: 21px;
              line-height: 1;
              transform: scale(0.7);
              .el-rate__item {
                .el-rate__icon {
                  font-size: 14px;
                  margin: 0;
                  -webkit-transition: 0.3s;
                  transition: 0.3s;
                }
              }
            }
          }
          .but {
            width: 40px;
            height: 21px;
            float: right;
            margin-top: -11%;
            border-radius: 10px;
            border: solid 1px #eed29b;
            margin-right: 4%;
            p {
              font-family: PingFang-SC-Regular;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 0px;
              letter-spacing: 0px;
              color: #eed29b;
              margin-top: 10px;
            }
          }
        }
      }
      .tea:nth-child(1) {
        transform: rotateY(0deg) translateZ(500px);
        -webkit-box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);
        transform: rotateX(24deg);
        width: 16.2%;
      }
      .tea:nth-child(2) {
        transform: rotateY(0deg) translateZ(500px);
        width: 16.2%;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);
        transform: rotateX(24deg);
      }
      .tea:nth-child(3) {
        transform: rotateY(0deg) translatez(500px);
        box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.08);
      }
      .tea:nth-child(4) {
        transform: rotateY(0deg) translateZ(500px);
        width: 16.2%;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);
        transform: rotateX(24deg);
      }
      .tea:nth-child(5) {
        transform: rotateY(0deg) translateZ(500px);
        width: 16.2%;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);
        transform: rotateX(24deg);
      }
     }
    }
  }
}
.tea-weber {
  width: 93%;
  margin: auto;
  display: flex;
  .weber-main {
    width: 20%;
    float: left;
    position: relative;
    height: 91px;
    .circle {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #00bc71;
      margin: 12px auto;
      margin-top: 20px;
    }
    span {
      font-size: 20px;
      color: #262626;
    }
    em {
      width: 0;
      height: 0;
      font-size: 0;
      overflow: hidden;
      position: absolute;
      &.top {
        border-width: 12px;
        border-style: solid dashed dashed;
        border-color: transparent transparent #e9eef3 transparent;
        left: 45%;
        top: 75%;
      }
    }
  }
}
</style>