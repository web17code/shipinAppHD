// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
require('video.js/dist/lang/zh-CN')//导入视频语言包
import Vue from 'vue'
import VueVideoPlayer from 'vue-video-player'
import App from './App'
import router from './router'
import resource from  'vue-resource'
import MuseUI from 'muse-ui'
import "./assets/MaterialIcons.css"
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css' // 使用 light 主题蓝色
import VueAwesomeSwiper from 'vue-awesome-swiper'//引入轮播插件WWWW
import Mint from 'mint-ui';
Vue.use(Mint);
Vue.use(MuseUI) //引入框架
Vue.use(resource) //引入請求
Vue.use(VueAwesomeSwiper)//全局注册swiper插件
Vue.use(VueVideoPlayer)
Vue.config.productionTip = false;
window.getHost = "http://swsy.zhunedu.com/swsy/";
//window.getHost = "http://123.59.211.161:7000/swsy/";
//window.getHost = "http://192.168.1.218:7000/"

Vue.http.interceptors.push(function(request, next) {//拦截器
  // 跨域携带cookie
  request.credentials = true;
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
