<template>
  <div>
    <!--首页私教卡片-->
    <swiper class="swiper-container" :options="swiperOption" v-if="showSwiper">
      <div class="swiper-slide" v-for="item in privateList" :key="item.ID" @click="courseId(item)">
        <div class="swiper-main">
          <div class="dimback">
            <img class="Img" :src="item.staff_info.Photo" />
          </div>
          <p class="time">{{item.Stime}}~{{item.Etime}}</p>
          <p class="name">{{item.staff_info.YGXX_NAME}}-{{item.kcPlace}}</p>
        </div>
        <div class="box"></div>
        <p class="yuyue">{{item.private_curriculum_appointment.isExperience.substring(0,2) == '体验' ? '体验·' + item.private_curriculum_appointment.experience_customers.exName : '会员·' + item.private_curriculum_appointment.member_customers.HYName}}</p>
        <div class="progressContainer">
          <div class="progress">
            <b>{{progress}}</b>
          </div>
        </div>
        <div class="star">
          <div class="block">
            <p style="text-align:left;color:#f37489;font-size:14px;padding-left:12%;">
              {{item.private_curriculum_appointment.isExperience.substring(0,2) == '体验' ? item.private_curriculum_appointment.customer_voucher.experience_voucher.tkName : item.private_curriculum_appointment.membership_card.card_type.CTName}}</p>
          </div>
          <div class="but">
            <p>{{item.kcIsPrivate.substr(0,2)}}</p>
          </div>
        </div>
        <div class="weber-main">
          <div class="circle"></div>
          <span style="font-size:18px">{{item.Stime}}</span>
        </div>
      </div>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "private",
  props: {
    privateList: [Object, Array]
  },
  data() {
    return {
      progress: 20,
      page: 1,
      //设置属性
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 2,
        centeredSlides: false,
        direction: "horizontal", //滑动方向
        speed: 1000, //切换速度
        preventClicksPropagation: true,
        watchOverflow: true,
        grabCursor: true //指针变成手掌
      }
    };
  },
  computed: {
    showSwiper() {
      return this.privateList.length;
    }
  },
  methods: {
    courseId(course) {
      this.$emit("clickCourse", course);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "swiper/dist/css/swiper.css";
@import "@/styles/league.scss";
.swiper-container {
  width: 97%;
  height: 310px;
  background-color: #fff;
  .swiper-slide {
    display: flex;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    background: #ccc;
    list-style: none;
    width: 18% !important;
    margin-left: 13px !important;
    background: #fff;
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
    }
    .swiper-main {
      width: 100%;
      height: 55%;
      position: absolute;
      top: 0px;
      overflow: hidden;
      .dimback {
        background: rgba(0, 0, 0, 0.822);
        border-radius: 4px;
        display: flex;
        // height: 100%;
        width: 100%;
        .Img {
          width: 100% !important;
          height: 100%;
          opacity: 0.4;
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
</style>
