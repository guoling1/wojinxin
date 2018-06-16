// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import qs from "qs"

import { Toast,XDialog } from 'vux'
Vue.component('toast',Toast);
Vue.component('xDialog',XDialog);

Vue.config.productionTip = false;

import axios from 'axios'
axios.defaults.baseURL = "http://wojinxin.hdjincheng.cn/wofinance";
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios= axios;

// 监听路由变化
router.beforeEach((to, from, next) => {
  next()
});

// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data=qs.stringify(config.data)
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    console.log(response)
    let {status,data} = response;
    if(status == 200) {
      if(data.retCode !="0000"){
        response.status = 500;
        response.statusMessage = data.retMsg || '系统异常';
        response.statusText = "Internal Server Error";
      }else {
        response.data = data.retObject;
      }
    }else {
      response.statusMessage = '系统异常';
    }
    return response;
  },
  error => {
    return Promise.reject('系统异常')   // 返回接口返回的错误信息
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
