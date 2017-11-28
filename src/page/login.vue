<style scoped>
  /**
  * Created by web17code
  */
  .formC {
    padding: 1rem 5%;
  }
</style>

<template>
  <div>
    <!--标题bar-->
    <appHeaderBar text="登录" :isHideLeft="false" :isHideRight="true"></appHeaderBar>
    <div class="formC">
      <mu-text-field label="用户名"
                     hintText="请输入密码"
                     fullWidth
                     type="text"
                     v-model="userName"
                     labelFloat/>
      <br/>
      <mu-text-field label="密码"
                     hintText="请输入密码"
                     fullWidth
                     v-model="passWord"
                     type="password" labelFloat/>
      <br/>
      <br/>
      <div class="addBlock">
        <span></span>
        <span @click="goRegister" style="color:#2196f3;">没有账号？</span>
      </div>
      <br/>
      <mu-raised-button label="登录"
                        labelClass="submitBtn"
                        fullWidth primary
                        @click="login"/>
    </div>
    <!--错误提示模态框-->
    <div>
      <mu-dialog :open="dialog" title="通知" @close="close">
        {{MsgText}}
        <mu-flat-button slot="actions" primary @click="close" label="确定"/>
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
        dialog:false,
        userName: localStorage.userName,
        passWord: localStorage.passWord
      }
    },
    props: {},
    methods: {
      close:function(){
        this.dialog = false;
      },
      login: function () {
        var that = this;
        this.$http.post(window.getHost+'wap/main/login', {
          loginName: that.userName,
          password: that.passWord
        }, {emulateJSON: true})//
          .then(function (data) {
            if(data.data.code=="20000"){
              localStorage.userName = that.userName;
              localStorage.passWord = that.passWord;
              that.$emit("loginChange",{sourceData:data.data})
              that.$router.go(-1);
            }else{
              that.dialog = true;
              that.MsgText = data.data.message;
            }
          });
      },
      goRegister:function () {
        this.$router.push(
          //, query: {user: "zhuhj"}
          {path: "register_nobar",query:{}})
      }
      /*,
      setCookie: function () {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + 1000 * 3600 * 24 * Days);//过期时间 2分钟
        document.cookie = "username=" + escape("web17code") + ";expires=" + exp.toGMTString();
        document.cookie = "password=" + escape("12345我6") + ";expires=" + exp.toGMTString();
      }*/
    },
    created: function () {
      /*var that = this;
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf("username") == 0) {
          that.username = unescape(c.substring("username".length+1, c.length));
        }
        if (c.indexOf("password") == 0) {
          that.password = unescape(c.substring("password".length+1, c.length));
        }
      }*/
    },
    mounted: function () {
    },
    components: {
      appHeaderBar:appHeader
    }
  }
</script>
