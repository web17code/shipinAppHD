<style scoped>
  /**
  * Created by web17code
  */
  .searchContent {
    padding: 0 0.5rem;
    height: 3rem;
    background-color: #2196f3;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
    align-content: space-between;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
  }

  .searchCannel {
    display: flex;
    font-size: 1rem;
    padding-left: 0.5rem;
  }

  .searchIcon {
    display: flex;
    padding-right: 0.5rem;
  }

  .searchInput {
    display: flex;
    border: none;
    border-radius: 0.3rem;
    color: #2B333F;
    flex: 1;
    line-height: 2rem;
    height: 2rem;
    font-size: 1rem;
    width: 100%;
    padding: 5px;
    outline: none;
  }
  /*videoList cssS*/
  .videoListTitle{
    height: 0.5rem;
    text-align: left;
    padding-left: 1rem;
    font-size: 0.9rem;
    color:#2c3e50;
  }
  .videoList{
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    align-items: flex-start;
    flex-wrap:wrap;
  }
  .itemContent{
    width: 31%;
    margin-left: 2%;
    position: relative;
    margin-bottom: 1rem;
  }
  .itemContent img.videoPic{
    width: 100%;
    display: flex;
  }
  .maskContent{
    width: 100%;
    height: 2rem;
    display: flex;
    color:#fff;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    z-index:100;
    bottom:0;
    flex-direction: column;
  }
  .maskContent p{
    font-size: 0.7rem;
    line-height: 2rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  /*videoList cssE*/
</style>

<template>
  <div>
    <!--标题bar-->
    <appHeaderBar :text="headerBarTxt" :isHideLeft="false" :isHideRight="true"></appHeaderBar>
    <div class="videoListTitle"></div>
    <!--视频列表-->
    <div  v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-immediate-check="true"
          infinite-scroll-distance="10">
      <div class="videoList" ref="videoList">
        <div class="itemContent" v-for="item, index in list" :key="index" @click="goVideo(item.videoId)">
          <img :src="item.coverImageUrl" class="videoPic">
          <div class="maskContent">
            <p><b>{{item.videoName}}</b></p>
          </div>
        </div>
      </div>
      <!--显示加载文字-->
      <p v-show="loading">{{loadingTxT}}</p>
    </div>
  </div>
</template>

<script>
  import appHeader from "../components/appHeader.vue"
  export default {
    data: function () {
      return {
        loadingTxT:"加载中",
        currentPage:1,
        headerBarTxt:this.$route.query.Cname,
        loading:false,
        list: []
      }
    },
    props: {},
    methods: {
      goVideo: function (videoId) {
        this.$router.push(
          //, query: {user: "zhuhj"}
          {path: "video_nobar",query:{videoId:videoId}})
      },
      loadMore:function(){
        var that = this;
        that.currentPage+=1;
        that.loading = true;
        this.$http.post(window.getHost+'wap/front/index/ajax/wapWeikeOrders', {
          "queryMicroVideo.bindCourse":that.$route.query.CId,
          "page.currentPage":that.currentPage,
          "page.pageSize":21
        }, {emulateJSON: true})
          .then(function (data) {
            //console.log(data.data.entity);
            if(data.data.entity.length<21){
              that.loading = true;
              that.loadingTxT = "暂无更多数据"
            }else{
              that.loading = false;

            }
            that.list = that.list.concat(data.data.entity);
          })
      },
      goBack: function () {
        this.$router.go(-1)
      }
    },
    created: function () {
      var that = this;
      this.$http.post(window.getHost+'wap/front/index/ajax/wapWeikeOrders', {
        "queryMicroVideo.bindCourse":that.$route.query.CId,
        "page.currentPage":that.currentPage,
        "page.pageSize":21
      }, {emulateJSON: true})
        .then(function (data) {
          //console.log(data.data.entity)
          that.list = data.data.entity;
        })
    },
    mounted: function () {
    },
    components: {
      appHeaderBar:appHeader
    }
  }
</script>
