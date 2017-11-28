<style scoped>
  /**
  * Created by web17code
  */
  /*navbar bymyself*/
  .NavContent {
    padding: 0 0.5rem;
    height: 5rem;
    /*background-color: #2196f3;*/
    display: flex;
    flex-direction: row;
    align-items: center; /*次轴对齐方式*/
    justify-content: flex-start; /*主轴对齐方式*/
    color: #666;
    align-content: space-between;
    /*box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);*/
  }

  .isHide {
    visibility: hidden;
  }

  /*.NavRight {
    display: flex;
    font-size: 2rem;
    padding-left: 0.5rem;
  }*/

  .NavLeft {
    font-size: 2rem;
    display: flex;
  }

  .NavCenter {
    display: flex;
    line-height: 4.2rem;
    height: 4.2rem;
    font-size: 1rem;
  }

  /*.NavCenter p {
    display: inline-block;
    text-align: center;

  }*/

  /*navbar bymyself*/

</style>

<template>
  <div class="NavContent">
    <mu-icon value="navigate_before"
             color="#a7a7a7;"
             @click="goBack"
             :class="['NavLeft']"/>
    <p class="NavCenter"
       @click="goBack"
       style="display: block;text-align: left;color:#979797;">{{text}}</p>
    <!--<mu-icon value="search"
             color="#fff"
             @click="goSearch"
             :class="[{'isHide':isHideRight},'NavRight']"/>-->
  </div>
</template>

<script>
  export default {
    data: function () {
      return {}
    },
    props: {
      text: ""
    },
    methods: {
      goSearch: function () {
        this.$router.push(
          //, query: {user: "zhuhj"}
          {path: "search", query: {}})
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
