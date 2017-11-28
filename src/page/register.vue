<style scoped>
  /**
  * Created by web17code
  */
  .formC {
    padding: 1rem 5%;
  }
  .addBlock{

  }
  .validImgC{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .validImgC .codeTxt{
    flex:1;
  }
  .validImgC .validImg{
    align-self: flex-end;
  }
</style>

<template>
  <div>
    <!--标题bar-->
    <appHeaderBar text="注册" :isHideLeft="false" :isHideRight="true"></appHeaderBar>
    <div class="formC">
      <mu-text-field label="用户名"
                     hintText="仅能包含大小写字母_-(4-15位)"
                     fullWidth
                     type="text"
                     v-model="userName"
                     labelFloat/>
      <br/>
      <mu-text-field label="密码"
                     hintText="可含大小写字母数字下划线大于6位"
                     fullWidth
                     v-model="passWord"
                     type="password" labelFloat/>
      <br/>
      <mu-text-field label="确认密码"
                     hintText="请在输一次您的密码"
                     fullWidth
                     v-model="RePassWord"
                     type="password" labelFloat/>
      <br/>
      <div class="validImgC">
        <mu-text-field label="验证码"
                       class="codeTxt"
                       hintText="输入右侧图片数字"
                       v-model="validCode"
                       type="text" labelFloat/>
        <img onclick="this.src=window.getHost+'ran/random?random='+Math.random()"
             alt="验证码，点击图片更换"
             class
             :src="WHost+'ran/random'" width="86" height="40">
      </div>

      <br/>
      <br/>
      <mu-raised-button label="注册"
                        labelClass="submitBtn"
                        fullWidth primary
                        @click="register"/>
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
        WHost:window.getHost,
        dialog:false,
        MsgText:"",
        userName: "",
        passWord: "",
        RePassWord:"",
        validCode:""
      }
    },
    props: {},
    methods: {
      close:function(){
          this.dialog = false;
      },
      register: function () {
        var that = this;
        if(!/[a-zA-Z0-9_-]{4,15}$/.test(that.userName)){
          that.dialog=true;
          that.MsgText = "用户名不合要求哦";
          return false;
        }//^[_0-9a-zA-Z]{6,}$   *-*/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/
        if(!/^[_0-9a-zA-Z]{6,}$/.test(that.passWord)){
          that.dialog=true;
          that.MsgText = "密码不合要求哦";
          return false;
        }
        if(that.RePassWord!=that.passWord){
          that.dialog=true;
          that.MsgText = "两次密码不一致哦";
          return false;
        }
        if(that.validCode.trim()==""){
          that.dialog=true;
          that.MsgText = "验证码不能为空";
          return false;
        }
        this.$http.post(window.getHost+'wap/main/createuser', {
          "user.loginName": that.userName,
          "user.password" :that.passWord,
          "confirmPwd" :that.RePassWord,
          "registerCode" : that.validCode
        }, {emulateJSON: true})
          .then(function (data) {
            if(data.data.success) {
              localStorage.userName = that.userName;
              localStorage.passWord = that.passWord;
              that.dialog = true;
              that.MsgText = "注册成功";
              setTimeout(function(){
                that.$router.push({path: "user",query:{}})
              },1500)
            }else{
              that.dialog=true;
              that.MsgText = data.data.message;
            }
          });
//        localStorage.userName = that.userName;
//        localStorage.passWord = that.passWord;
        /*
        this.$http.post(window.getHost+'/wap/mian/index', {
          username: that.userName,
          pwd: that.passWord
        }, {emulateJSON: true})
          .then(function (data) {
            alert(that.userName);
            console.log(data)
          }, function () {});*/
      }
    },
    created: function () {},
    mounted: function () {},
    components: {
      appHeaderBar:appHeader
    }
  }
</script>
