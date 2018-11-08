<template>
  <div>
    <!--首页团课卡片-->
    <el-col :span="24" class="main-wp">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in groupList" :key="item.ID" @click="courseId(item)">
            <template>
              <div class="swiper-main">
                <div class="dimback">
                  <img class="Img" :src="item.staff_info.Photo" />
                </div>
                <p class="time">{{item.Stime}}~{{item.Etime}}</p>
                <p class="name">{{item.curriculum_subject.kcName}}.{{item.staff_info.YGXX_NAME}}</p>
              </div>
              <div class="box"></div>
              <div class="bai">{{item.kcbSort.substring(0,1)}}</div>
              <p class="yuyue">已预约:{{item.group_curriculum_appointment_count}}/{{item.RenShu}}</p>
              <div class="progressContainer">
                <div class="progress">
                  <b>{{progress}}</b>
                </div>
              </div>
              <div class="star">
                <div class="block">
                  <el-rate v-model="item.kcDiff" disabled></el-rate>
                </div>
                <div class="but">
                  <p>{{item.kcIsPrivate.substr(0,2)}}</p>
                </div>
              </div>
            </template>
            <!-- <div class="tea-weber"> -->
            <div class="weber-main">
              <div class="circle"></div>
              <span style="font-size:18px">{{item.Stime}}</span>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
      <!-- <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div> -->
    </el-col>
    <!-- 卡片下方时间 -->
    <!-- <el-col :span="24">
      <div class="tea-weber">
        <div class="weber-main" v-for="item in groupList" :key="item.ID">
          <div class="circle"></div>
          <span style="font-size:18px">{{item.Stime}}</span>
        </div>
      </div>
    </el-col> -->
  </div>
</template>
<script src="swiper/dist/js/swiper.min.js"></script>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Swiper from "swiper";
export default {
  name: "league",
  props: {
    groupList:[Object, Array]
  },
  data() {
    return {
      progress: 20,
    };
  },
  mounted() {
    let that = this;
    setTimeout(function() {
      that.initSwiper();
    }, 500);
  },
  methods: {
    initSwiper() {
      var appendNumber = 5;
      var prependNumber = 1;
      new Swiper(".swiper-container", {
        slidesPerView: 5, //同时显示的数量
        spaceBetween: 15, //间距
        direction: "horizontal", //滑动方向
        speed: 500, //切换速度
        grabCursor: true, //指针变成手掌
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    },
    courseId (course) {
      this.$emit('clickCourse', course);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "swiper/dist/css/swiper.min.css";
@import "@/styles/league.scss";
.main-wp {
  .swiper-container {
    width: 95%;
    height: 310px;
    background-color: #fff;
    .swiper-slide {
      display: flex;
      align-items: center;
      background: #ccc;
      list-style: none;
      width: 18% !important;
      background: #fff;
      // height: 89.236%;
      height: 75%;
      margin: 15px auto;
      transition: 500ms ease-in-out;
      transform-origin: center center;
      position: relative;
      z-index: 999;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);
      .weber-main {
        position: relative;
        left: 33%;
        bottom: -62%;
        .circle {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00bc71;
          margin: 12px auto;
          margin-top: 20px;
          margin-left: 45%;
        }
      }///////////////////////
      .swiper-main {
        width: 100%;
        height: 55%;
        position: absolute;
        top: 0px;
        .dimback {
          background: rgba(0, 0, 0, 0.822);
          border-radius: 4px;
          display: flex;
          height: 100%;
          width: 100%;
          .Img {
            width: 100%;
            height: 100%;
            opacity: 0.3;
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
        height: 3px;
        background: #fff;
        position: absolute;
        top: 54%;
        width: 100%;
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
  }
}
.tea-weber {
  width: 95%;
  margin: auto;
  display: flex;
  .weber-main {
    width: 20%;
    display: inline-block;
    position: relative;
    height: 91px;
    .circle {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #00bc71;
      margin: 12px auto;
      margin-top: 20px;
      margin-left: 45%;
    }
    span {
      font-size: 20px;
      color: #262626;
      margin-left: -7%;
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
        border-color: transparent transparent #ddd transparent;
        left: 42%;
        top: 75%;
      }
    }
  }
}
</style>
