<style scoped>
  /**
  * Created by web17code
  */

  .swiperSlider {
    height: 15rem;
  }

  .swiperSlider img {
    width: 100%;
    height: 15rem;
  }

  .videoTitle {
    overflow: hidden;
    margin-left: 1.5%;
    margin-right: 1.5%;
    margin-bottom:0.7rem;
    padding-top:1rem;
    border-bottom:1px solid #E4E8EB;
    /*padding: 1rem 5% 0;*/
    font-size: 1.5rem;
    color:#03a9f4;
  }

  .videoTitle .videoTitle1 {
    float: left;
  }

  .videoTitle .videoTitle2 {
    float: right;
    font-size: 1rem;
  }

  .videoList {
    margin-left: 1.5%;
    margin-right: 1.5%;
    overflow: hidden;
  }

  .videoList .videoItem {
    float: left;
    width: 33.33%;
    margin-bottom:1rem;
  }

  .videoList .videoItem img {
    width: 95%;
    display: block;
    margin: 0 auto;
  }

  .videoList .videoItem p {
    font-size: 0.8rem;
    font-weight: bolder;
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

<template>
  <div>
    <div style="padding: 1.5rem 1rem;">
      <!--轮播区-->
      <!--<swiper :options="swiperOption" ref="mySwiper">
        &lt;!&ndash; slides class="swiperSlider"&ndash;&gt;
        <swiper-slide v-for="items in bannerList"
                      class="swiperSlider"
                      :key="items.name">
          <img :src="items.src" :alt="items.name">
        </swiper-slide>
        &lt;!&ndash; Optional controls &ndash;&gt;
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>-->
      <!--视频列表-->
      <div class="videoListContent" v-for="items in videoData" :key="items.course.context">
        <div class="videoTitle">
          <p class="videoTitle1">{{items.course.context}}</p>
          <p class="videoTitle2"
             @click="goMoreList(items.course.courseId,items.course.courseName)">更多>></p>
        </div>
        <div class="videoList">
          <div class="videoItem" v-for="one in items.courseVideo">
            <img :src="one.coverImageUrl"
                 :alt="one.videoName"
                 @click="goVideo(one.videoId)">
            <p>{{one.videoName}}</p>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 56px;width: 100%;"></div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  //import appHeader from "../components/appHeader.vue"
  export default {
    data: function () {
      return {
        /*swiperOption: {
         //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
         // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
         notNextTick: true,
         // swiper configs 所有的配置同swiper官方api配置
         autoplay: 3000,//自动播放时间
         loop: true,
         direction: 'horizontal',//水平
         setWrapperSize: true,//体验更好
         autoHeight: true,
         pagination: '.swiper-pagination',
         autoplayDisableOnInteraction: false,
         observer: true,//观察者模式，当有东西变动，就可以初始化插件
         observeParents: true,
         // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
         //debugger: true,
         },*/
        bannerList: [],
        videoData: []
      }
    },
    props: {},
    methods: {
      goVideo: function (Vname) {
        this.$router.push(
          //, query: {user: "zhuhj"}
          {path: "video_nobar",query:{videoId:Vname}})
      },
      goMoreList:function(CId,Cname){
        this.$router.push(
          //, query: {user: "zhuhj"}
          {path: "MoreList_nobar",query:{CId:CId,Cname:Cname}})
      }
    },
    created: function () {
      var that = this;
      console.log(window.getHost+'wap/front/index')
      this.$http.post(window.getHost+'wap/front/index', {
        "page.pageSize":3
      }, {emulateJSON: true})
        .then(function (data) {
          that.videoData = data.data.entity.courses;
        },function(data){
          this.$router.push({path: "error",query:{page:"home",headTxt:"首页"}});
        });
    },
    mounted: function () {
    }/*,
    components: {
      swiper,
      swiperSlide
    }*/
  }
</script>
