<style scoped>
  /**
  * Created by web17code
  */
  .userContent{
    min-height: 100vh;
    background-color: #e8e8e8;
  }
  .InfoContent{
    padding:0 0.3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:flex-start;
    height:5rem;
    background-color: #fff;
  }
  .InfoContent img.avatar{
    display: flex;
    margin-left: 1rem;
    width:3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    border:1px solid #ddd;
  }
  .InfoContent .infoTxt{
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    align-self:flex-start;
    margin-left: 1.5rem;
    flex: 1;
  }
  .InfoContent .infoTxt .infoTxtName{
    font-size:1.1rem;
    line-height: 1.5rem;
    display: flex;
  }
  .InfoContent .infoTxt .infoTxtType{
    font-size:1.1rem;
    display: flex;
    line-height: 1.5rem;
  }
  .startContent{
    margin-top:2rem;
    padding:0 0.3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height:5rem;
    background-color: #fff;
  }
  .startContent div.txt{
    font-size: 1.1rem;
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    margin-left: 1.5rem;
  }
  .rightArr{
    display: flex;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0rem;
  }
</style>

<template>
  <div class="userContent">
    <!--标题bar-->
    <appHeaderBar text="用户" :isHideLeft="true" :isHideRight="false"></appHeaderBar>
    <!---->
    <div class="InfoContent" @click="goLogin">
      <img class="avatar"
           v-show="avatarUrl"
           :src="avatarUrl?avatarUrl:''" alt="头像">
      <img src='../assets/personAVATAR.png' alt="头像"
           class="avatar"
           v-show="!avatarUrl">
      <div class="infoTxt">
        <p class="infoTxtName">用户名：{{Username}}</p>
        <p class="infoTxtType">普通会员</p>
      </div>
      <img src="../assets/rightArr.svg"
           @click="goLogin"
           class="rightArr">
    </div>
    <!--收藏页-->
    <div class="startContent" @click="goStarList">
      <div class="txt">
        <span>收藏列表</span>
      </div>
      <img src="../assets/rightArr.svg"
           @click="goStarList"
           class="rightArr">
    </div>
    <!--退出提示模态框-->
    <div>
      <mu-dialog :open="dialog" title="通知" @close="close">
        {{MsgText}}
        <mu-flat-button slot="actions" primary @click="close" label="取消"/>
        <mu-flat-button slot="actions" primary @click="loginOut" label="确定"/>
      </mu-dialog>
    </div>
  </div>
</template>

<script>
  import appHeader from "../components/appHeader.vue"
  export default {
    data: function () {
      return {
        MsgText:"",
        Username:"",
        dialog:false,
        avatarUrl:false
      }
    },
    props: {},
    methods: {
      close:function(){
        this.dialog = false;
      },
      goLogin:function(){
        //查看是否登录
        var that = this;
        //检查登陆
        this.$http.post(window.getHost + 'wap/main/getloginUser', {}, {emulateJSON: true})
          .then(function (data) {
            console.log(data.data);
            if (!data.data.success) {
              this.$router.push({
                path: "login_nobar",query:{}
              })
            }else{
              that.dialog = true;
              that.MsgText = "您要注销登录吗";
            }
          })
      },
      goStarList:function(){
        this.$router.push({
          path: "starList_nobar",query:{}
        })
      },
      loginOut:function(){
        var that = this;
        this.$http.post(window.getHost + 'wap/uc/exit', {}, {emulateJSON: true})
          .then(function (data) {
            this.dialog = false;
            if (data.data.success) {
              that.Username = "已注销";
            }
          })
      }
    },
    created: function () {
      var that = this;
      //检查登陆
      this.$http.post(window.getHost + 'wap/main/getloginUser', {}, {emulateJSON: true})
        .then(function (data) {
          if (!data.data.success) {
            that.Username = "未登录";
          }else{
            that.Username = data.data.entity.loginName;
            that.avatarUrl = data.data.entity.picImg==null?false:data.data.entity.picImgUrl;
          }
        })
    },
    mounted: function () {
    },
    components: {
      appHeaderBar:appHeader
    }
  }
</script>
