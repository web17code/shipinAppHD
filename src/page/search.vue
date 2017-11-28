<style scoped>
  /**
  * Created by web17code
  */
  .searchContent {
    margin: 0 1rem;
    height: 5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
    align-content: space-between;
    border-bottom:1px solid #E8EBEC;
  }

  .searchCannel {
    display: flex;
    font-size: 1.5rem;
    padding-left: 0.5rem;
  }

  .searchIcon {
    display: flex;
    font-size: 2.5rem;
    margin-left:0.7rem;
    margin-right:0.5rem;
  }

  .searchInput {
    display: flex;
    border: none;
    border-radius: 0.3rem;
    color: #A7A9AB;
    flex: 1;
    line-height: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    width: 100%;
    padding: 5px;
    outline: none;
    background-color: #E7E7E7;
    /*A7A9AB*/
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
    font-size: 1rem;
    line-height: 2rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  /*videoList cssE*/
</style>

<template>
  <div>
    <!--搜索条-->
    <div class="searchContent">
      <input type="text"
             @blur="searchKey"
             class="searchInput"
             v-model="keyWord">
      <mu-icon value="search" color="#A7A9AB" class="searchIcon"/>
    </div>
    <div class="videoListTitle"></div>
    <!--视频列表-->
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-immediate-check="true"
         infinite-scroll-distance="10">
      <div class="videoList">
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
    <!--彈出框-收藏提示-->
    <div>
      <mu-dialog :open="dialog" title="通知" @close="close">
        未找到匹配内容
        <!--<mu-flat-button slot="actions" @click="close" primary label="取消"/>-->
        <mu-flat-button slot="actions" primary @click="close" label="确定"/>
      </mu-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        loading:false,
        loadingTxT:"加载中",
        currentPage:1,
        dialog:false,
        keyWord: "",
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
      open(){
        this.dialog = true
      },
      close () {//关闭对话框
        this.dialog = false
      },
      searchKey: function () {
        var that = this;
        that.currentPage=1;//重置当前页码为1
        if(that.keyWord.trim()==""){//关键字为空退出
          return false;
        }
        this.$http.post(window.getHost+'wap/front/index/ajax/wapWeikeOrders', {
          "queryMicroVideo.keywords":that.keyWord,
          "page.currentPage":that.currentPage,
          "page.pageSize":21
        }, {emulateJSON: true})
          .then(function (data) {
            //console.log(data.data.entity)
            that.list = data.data.entity;
            if(data.data.entity.length==0){
              that.open();
            }
          })
      },
      loadMore:function(){
        var that = this;
        that.currentPage+=1;
        that.loading = true;
        this.$http.post(window.getHost+'wap/front/index/ajax/wapWeikeOrders', {
          "queryMicroVideo.keywords":that.keyWord,
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
    },
    mounted: function () {
    },
    components: {}
  }
</script>
