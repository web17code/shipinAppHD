<style scoped>
  /**
  * Created by web17code
  */
  .searchContent {
    padding: 0 0.5rem;
    height: 5rem;
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
    font-size: 1.5rem;
    padding-left: 0.5rem;
  }

  .searchIcon {
    display: flex;
    padding-right: 0.5rem;
    font-size: 2rem;
  }

  .searchInput {
    display: flex;
    border: none;
    border-radius: 0.3rem;
    color: #2B333F;
    flex: 1;
    line-height: 3rem;
    height: 3rem;
    font-size: 1.5rem;
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
    /*justify-content:space-around;*/
    align-items: flex-start;
    flex-wrap:wrap;
  }
  .itemContent{
    width: 31%;
    margin-left:1.7%;
    position: relative;
    margin-bottom: 0.7rem;
  }
  .itemContent img.videoPic{
    width: 100%;
    display: flex;
  }
  .maskContent{
    width: 100%;
    display: flex;
    color:#fff;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    z-index:100;
    bottom:0;
    flex-direction: column;
  }
  .maskContent p{
    font-size: 0.9rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  /*videoList cssE*/
</style>

<template>
  <div>
    <!--标题bar-->
    <appHeaderBar text="我的收藏" :isHideLeft="false" :isHideRight="true"></appHeaderBar>
    <div class="videoListTitle"></div>
    <!--视频列表-->
    <div  v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-immediate-check="true"
          infinite-scroll-distance="10">
      <div class="videoList" ref="videoList">
        <div class="itemContent" v-for="item, index in list" :key="index" @click="goVideo(item.videoId)">
          <img :src="imgPrefix+item.coverImage" class="videoPic">
          <div class="maskContent">
            <p><b>{{item.videoName}}</b></p>
          </div>
        </div>
      </div>
      <!--显示加载文字-->
      <p v-show="loading">{{loadingTxT}}</p>
    </div>
    <!--彈出框-收藏提示-->
    <div>
      <mu-dialog :open="dialog" title="通知" @close="close">
        登录后才能查看我的收藏哦！
        <mu-flat-button slot="actions" @click="close" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="goLogin" label="去登录"/>
      </mu-dialog>
    </div>
  </div>
</template>

<script>
  import appHeader from "../components/appHeader.vue"
  export default {
    data: function () {
      return {
        loading:false,
        loadingTxT:"加载中",
        currentPage:1,
        dialog:false,
        list: []
      }
    },
    props: {},
    methods: {
      goLogin:function(){
        this.$router.push("login_nobar");
      },
      goVideo: function (videoId) {
        this.$router.push(
          //, query: {user: "zhuhj"}
          {path: "video_nobar",query:{videoId:videoId}})
      },
      open(){
        this.dialog = true
      },
      close () {//关闭对话框
        this.dialog = false
      },
      loadMore:function(){
        var that = this;
        that.currentPage+=1;
        that.loading = true;
        this.$http.post(window.getHost+'wap/uc/myFavorites', {
          "page.currentPage":that.currentPage,
          "page.pageSize":21
        }, {emulateJSON: true})
          .then(function (data) {
            //console.log(data.data.entity);
            if(data.data.entity.microVideoList.length<21){
              that.loading = true;
              that.loadingTxT = "暂无更多数据"
            }else{
              that.loading = false;
            }
            that.list = that.list.concat(data.data.entity.microVideoList);
          })
      },
      goBack: function () {
        this.$router.go(-1)
      }
    },
    created: function () {
      /*检查登陆*/
      var that = this;
      //检查登陆
      this.$http.post(window.getHost + 'wap/main/getloginUser', {}, {emulateJSON: true})
        .then(function (data) {
          if(!data.data.success){//未登录先去登陆
            that.open();
          }
        });

      var that = this;
      this.$http.post(window.getHost+'wap/uc/myFavorites', {
        "queryMicroVideo.bindCourse":that.$route.query.CId,
        "page.currentPage":that.currentPage,
        "page.pageSize":21
      }, {emulateJSON: true})
        .then(function (data) {
          //console.log(data.data.entity);
          that.imgPrefix = data.data.entity.imgPrefix;
          that.list = data.data.entity.microVideoList;
        })

    },
    mounted: function () {

    },
    components: {
      appHeaderBar:appHeader
    }
  }
</script>
