// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue';
import "@/style/common.css";      //  全局公共样式;
import App from './App'
import axios from './axios/index';
import router from './router'
//element-ui
import element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import moveDrag from '@/directive/moveDrag.js';

Vue.config.productionTip = false;

Vue.prototype.axios = axios;
Vue.use(element);
Vue.directive("moveDrag",moveDrag); //封装的dialog弹框移动插件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
