// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import 'normalize.css';
import './style/common.css';
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import router from './router';
import 'element-ui/lib/theme-default/index.css';
import store from './vuex/store';
import axios from './http';
import $ from 'jquery';
import skyLoading from '@/directive/skyLoading.js';
import skyDrag from '@/directive/skyDrag.js';
import skyDeviceDrag from '@/directive/skyd-device-drag.js';
import cursor from '@/directive/cursor.js';
import * as custom from './filters.js';
import quickInput from '@/plugins/quick-input';
import transcoding from '@/plugins/transcoding';
import VueLazyload from 'vue-lazyload';
import organizationSelector from '@/plugins/organization-selector/single';
import multiOrganizationSelector from '@/plugins/organization-selector/multi';
Vue.config.productionTip = false; //来关闭生产模式下给出的提示,设置为 false 以阻止 vue 在启动时生成生产提示
Vue.use(ElementUI);
Vue.directive('skyLoading', skyLoading);
Vue.directive('skyDrag', skyDrag);
Vue.directive('skyDeviceDrag', skyDeviceDrag);
Vue.directive('cursor', cursor);
Vue.prototype.axios = axios;
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key]);
});
require('@/util/jquery.fileDownload.js'); //下载文件
require('@/util/ajaxFileUpload.js'); //上传文件
// 添加 $user() 获取当前操作人信息的方法
Vue.use((vue, options) => {
  let currentUser = {};
  vue.prototype.$user = function(user) {
    if (user == undefined) {
      return currentUser;
    } else {
      currentUser = user;
    }
  };
});
Vue.use(VueLazyload, {
  loading: 'data:image/gif;base64,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'
});
// quick-input  transcoding 登记为全局组件
Vue.component('quickInput', quickInput);
Vue.component('transcoding', transcoding);
Vue.component('organizationSelector', organizationSelector);
Vue.component('multiOrganizationSelector', multiOrganizationSelector);
Vue.component('multiSelector', multiOrganizationSelector);
Vue.component('selector', organizationSelector);
/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  $,
  template: '<App/>',
  components: { App }
});
window.addEventListener('resize', function() {
  store.commit('MENU_SET_CONTENTHEIGHT');
}, false);