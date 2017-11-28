<style scoped>
    /**
    * Created by web17code
    */
    .errImg{
      width:45%;
    }
    .errorP1{
      font-size: 2.2rem;
      text-align: center;
      width: 100%;
    }
  .errorP2{
    font-size: 1.1rem;
    text-align: center;
    width: 100%;
  }
  .errBtn{
    background-color:#5ec3ed;
    font-size: 1rem;
    color:#fff;
    text-align: center;
    width: 50%;
    height: 3rem;
    line-height: 3rem;
    border-radius: 1rem;
    margin:0 auto;
  }
</style>

<template>
    <div>
      <!--标题bar-->
      <!--style="position: fixed;top:0;width:100%;z-index:1000;"-->
      <appHeaderBar text="返回"
                    :isHideLeft="false"
                    :isHideRight="false"></appHeaderBar>
      <div style="position: relative;margin-top:3rem;">
        <img src="../assets/error.png" alt="" class="errImg">
        <br><br>
        <p style="" class="errorP1">sorry</p>
        <p style="" class="errorP2">页面出错啦</p>
        <p style="" class="errorP2">您访问的页面已经离开地球</p>
        <br>
        <br>
        <br>
        <p @click="tryAgain" class="errBtn">再试一次</p>
        <br>
        <br>
        <br>
      </div>
    </div>
</template>

<script>
    import appHeader from "../components/appHeader.vue"
    export default {
        data: function () {
            return {
              text:this.$route.query.headTxt
            }
        },
        props: {},
        methods: {
          tryAgain:function () {
            //this.$route.query.page
            this.$router.go(-1);
          }
        },
        created: function () {
        },
        mounted: function () {
        },
        components: {
          appHeaderBar:appHeader
        }
    }
</script>
