<style scoped>
  .video_desc{
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    font-size: 0.9rem;
  }
  .video_desc>div{
    padding-top: 0.5rem;
    padding-bottom:0.5rem;
    line-height:1.5;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 1rem;
  }
  .star{
    color:#dddddd;
  }
  .isStar{
    color:#ffea00;
  }
</style>
<template>
  <div>
    <!--标题bar-->
    <appHeaderBar text="视频播放" :isHideLeft="false" :isHideRight="true"></appHeaderBar>
    <!--視頻播放-->
    <video-player class="vjs-custom-skin"
                  ref="videoPlayer"
                  :options="playerOptions"
                  :playsinline="true">
    </video-player>
    <!--視頻介紹級收藏-->
    <div class="video_desc">
      <div>
        <p>名称：{{videData.videoName}}</p>
      </div>
      <div>
        <p>时长：{{videData.playTime}}</p>
      </div>
      <div>
        <p>收藏：</p>
        <mu-icon value="star"
                 @click="goStar"
                 :class="[{'isStar':isStar},'star']"/>
        <p>（点星收藏）</p>
      </div>
      <div>
        <p>描述：{{videData.context}}</p>
      </div>
    </div>
    <!--彈出框-收藏提示-->
    <div>
      <mu-dialog :open="dialog" title="通知" @close="close">
        {{starText}}
        <!--<mu-flat-button slot="actions" @click="close" primary label="取消"/>-->
        <mu-flat-button slot="actions" primary @click="close" label="确定"/>
      </mu-dialog>
    </div>
  </div>
</template>
<script>
  import appHeader from "../components/appHeader.vue"
  export default {
    data() {
      return {
        videData: {},
        starText: "",
        dialog: false,
        isStar: false,
        //http://docs.videojs.com/tutorial-options.html
        playerOptions: {
          // videojs options
          muted: false,
          //fluid:true,
          language: 'zh-CN',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            //src:"http://vjs.zencdn.net/v/oceans.mp4"
            src: ""
          }],
          poster: "",
        }
      }
    },
    mounted() {
      //console.log('this is current player instance object', this.player)
    },
    created: function () {
      var that = this;
      var param = this.$route.query.videoId;
      this.$http.post(window.getHost + 'wap/video/getVideo/', {
        "videoId": param
      }, {emulateJSON: true})
        .then(function (data) {
          console.log(data.data.entity.video)
          //that.videoData = data.data.entity.courses;
          //coverImageUrl
          that.isStar = data.data.entity.isFavorites;
          that.videData = data.data.entity.video;
          that.playerOptions.poster = data.data.entity.video.coverImageUrl;
          that.playerOptions.sources[0].src = data.data.entity.video.playUrl;
        });
    },
    components: {
      appHeaderBar: appHeader
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      checkLogin: function () {
        this.$http.post(window.getHost + 'wap/main/getloginUser', {}, {emulateJSON: true})
          .then(function (data) {
            //console.log(data.data.message)
            return data.data.success
          });
      },
      open(){
        this.dialog = true
      },
      close () {//关闭对话框
        this.dialog = false
      },
      goBack: function () {
        this.$router.go(-1);
      },
      goStar: function () {
        var that = this;
        if(that.isStar){//取消收藏
          that.$http.post(window.getHost + 'wap/uc/deleteFaveorite', {
            videoId:that.videData.videoId
          }, {emulateJSON: true}).then(function (data) {
            if(data.data.success){
              that.isStar = false;
              that.dialog = true;
              that.starText = "取消收藏";
            }else{
              that.dialog = true;
              that.starText = "取消收藏失败";
            }

          })
        }else{//收藏
          that.$http.post(window.getHost + 'wap/uc/front/createfavorites/'+that.videData.videoId, {}, {emulateJSON: true}).then(function (data) {
            console.log(data.data.success)
            if(data.data.success){
              that.isStar = true;
              that.dialog = true;
              that.starText = "收藏成功";
            }
            console.log(data.data.code)
            if(data.data.code=="40301"){//未登录
              if(localStorage.userName==undefined){//没缓存数据
                that.$router.push("login_nobar");
              }else{//登录,再点星
                that.$http.post(window.getHost+'wap/main/login', {
                  loginName: localStorage.userName,
                  password: localStorage.passWord
                }, {emulateJSON: true})//
                  .then(function (data) {
                    if(data.data.code=="20000"){//登陆成功，点星
                      that.$http.post(window.getHost + 'wap/uc/front/createfavorites/'+that.videData.videoId, {}, {emulateJSON: true}).then(function (data) {
                        if (data.data.success) {
                          that.isStar = true;
                          that.dialog = true;
                          that.starText = "收藏成功";
                        }else if(!data.data.success&&data.data.message.indexOf("已经收藏过了")>=0){
                          that.isStar = true;
                          that.dialog = true;
                          that.starText = "收藏成功";
                        }else{
                          that.isStar = false;
                          that.dialog = true;
                          that.starText = "收藏失败";
                        }
                      })
                    }else{
                      that.isStar = false;
                      that.dialog = true;
                      that.starText = "收藏失败";
                    }
                  });
              }
            }
          })
        }
      }
    }
  }
</script>
