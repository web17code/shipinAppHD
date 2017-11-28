import Vue from 'vue'
import Router from 'vue-router'
import home from  "../page/home.vue"
import login from "../page/login.vue"
import user from "../page/user.vue"
import video from  "../page/video.vue"
import search from "../page/search.vue"
import starList from "../page/star-list.vue"
import MoreList from  "../page/more-list.vue"
import register from "../page/register.vue"
import about from "../page/about.vue"
import error from "../page/error.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
	    alias: '/',
      name: 'home',
      component: home
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/login_nobar',
      name: 'login',
      component: login
    },
    {
      path:'/video_nobar',
      name: 'video',
      component: video
    },
    {
      path:'/search',
      name: 'search',
      component: search
    },
    {
      path:"/starList",
      name: 'starList',
      component: starList
    },
    {
      path:"/MoreList_nobar",
      name: 'MoreList',
      component: MoreList
    },
    {
      path:"/register_nobar",
      name:"register",
      component:register
    },
    {
      path:"/about",
      name:"about",
      component:about
    },
    {
      path:"/error",
      name:"error",
      component:error
    }
  ]
})
