<template>
  <div id="app">
    <meta name="viewport"
          content="height=device-height,width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"/>
    <router-view v-on:loginChange="changeLogin"
      style="padding-left: 11%;
                        background:#F7FBFE;
                        min-height: 100vh;"/>
    <!--侧面导航-->
    <!--<mu-paper >-->
      <!--<mu-bottom-nav :value="bottomNav"-->
                     <!--@change="handleChange"-->
                     <!--  v-show="!($route.path.indexOf('_nobar') > 0)">-->
        <!--<mu-bottom-nav-item value="home" title="首页" icon="favorite"/>-->
        <!--<mu-bottom-nav-item value="user" title="会员" icon="account_circle"/>-->
      <!--</mu-bottom-nav>-->
    <!--</mu-paper>-->
    <div class="leftNavBar">
        <div class="avatarC" @click="goLogin">
          <img v-show="avatarUrl"
               :src="avatarUrl?avatarUrl:''" alt="头像">
          <img src='./assets/_avatar.png' alt="头像"
               v-show="!avatarUrl">
          <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{Username}}</p>
        </div>
        <div :class="[nowBar=='home'?'active':'noActive','leftNavBarItem']"
             @click="handleChange('home')">
          <i class="iconfont" v-show="nowBar!='home'">&#xe603;</i>
          <i class="iconfont" v-show="nowBar=='home'" >&#xe61c;</i>
          <span class="leftNavBarTxT">首页</span>
        </div>
        <div :class="[nowBar=='starList'?'active':'noActive','leftNavBarItem']"
             @click="handleChange('starList')">
          <i class="iconfont" v-show="nowBar!='starList'">&#xe678;</i>
          <i class="iconfont" v-show="nowBar=='starList'">&#xe630;</i>
          <span class="leftNavBarTxT">收藏</span>
        </div>
        <div :class="[nowBar=='search'?'active':'noActive','leftNavBarItem']"
             @click="handleChange('search')">
          <i class="iconfont" v-show="nowBar!='search'">&#xe64b;</i>
          <i class="iconfont" v-show="nowBar=='search'">&#xe64b;</i>
          <span class="leftNavBarTxT">搜索</span>
        </div>
        <div :class="[nowBar=='about'?'active':'noActive','leftNavBarItem']"
             @click="handleChange('about')">
          <i class="iconfont" v-show="nowBar!='about'">&#xe60d;</i>
          <i class="iconfont" v-show="nowBar=='about'">&#xe60f;</i>
          <span class="leftNavBarTxT">关于</span>
        </div>
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
  export default {
    name: 'app',
    data: function () {
      return {
        isShowBar: true,//是否显示tab栏
        nowBar:"home",
        Username:"",
        MsgText:"",
        dialog:false,
        avatarUrl:false
      }
    },
    methods: {
      changeLogin:function(data){
        var that = this;
        if (!data.sourceData.success) {
          that.Username = "未登录";
        }else{
          that.Username = data.sourceData.entity.loginName;
          that.avatarUrl = data.sourceData.entity.picImg==null?false:data.sourceData.entity.picImgUrl;
        }
      },
      handleChange: function (val) {//切换底部的tab
        this.nowBar = val;
        this.$router.replace({path: val})//, query: {user: "zhuhj"}
        /*if (this.$route.path.indexOf("_nobar") > 0) {//有"_nobar"隐藏tab切换
          this.isShowBar = false;
        } else {
          this.isShowBar = true;
        }*/
      },
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
          //console.log(data)
          if (!data.data.success) {
            that.Username = "未登录";
          }else{
            that.Username = data.data.entity.loginName;
            that.avatarUrl = data.data.entity.picImg==null?false:data.data.entity.picImgUrl;
          }
        })
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  input,select,option,textarea{outline: none;}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 62.5%;
  }
  /*头像*/
  /*导航*/
  .leftNavBar{
    background-color: #ffffff;
    border-right:1px solid #dfdfdf;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    left:0;
    top:0;
    width: 11%;
    height: 100vh;
  }
  .avatarC{
    position: fixed;
    top:2rem;
    width:11%;
  }
  .avatarC img{
    display: block;
    width:60%;
    height:60%;
    border-radius: 50%;
    margin-left:20%;
    border:1px  solid #ddd;
  }
  .avatarC p{
    display: block;
    text-align: center;
    margin-top:0.5rem;
    font-size: 0.7rem;
  }
  .leftNavBarItem{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:6rem;
    color:#979797;
  }
  .leftNavBarTxT{
    font-size: 0.8rem;
  }
  .leftNavBarItem.active{
    color:#03a9f4;
    fill:red;
    /*background-color: #f1f1f1;*/
  }


  /*导航*/
  .cf17 {
    clear: both;
    content: "";
    display: block;
  }
  .submitBtn{
    font-size: 1rem;
  }
  /*change searchInput css*/
  /*.appbar-search-field {
    color: #FFF;
    margin-bottom: 0;
  }
  .appbar-search-field.focus-state {
    color: #FFF;
  }
  .appbar-search-field .mu-text-field-hint {
    color: rgba(255, 255, 255, 0.54);
  }
  .appbar-search-field .mu-text-field-input {
    color: #FFF;
  }
  .appbar-search-field .mu-text-field-focus-line {
    background-color: #FFF;
  }
  .hintTextClass{
    text-align: left;
  }*/
</style>
