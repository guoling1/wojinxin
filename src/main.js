// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import qs from "qs"

Vue.config.productionTip = false

import axios from 'axios'
axios.defaults.baseURL = "http://www.aihuikao.com/wofinance";
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios= axios;

// 监听路由变化
router.beforeEach((to, from, next) => {
  next()
});

// http request 拦截器
axios.interceptors.request.use(
  config => {

    console.log(config)
    config.data=qs.stringify(config.data)
    console.log(config)
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    /*if(response.data=='Please login!'){
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
      })
    }*/
    return response;
  },
  error => {
    /*if (error.response) {
      console.log(error.response.status)
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit('LOGOUT');
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }else {

    }*/
    return Promise.reject('系统异常')   // 返回接口返回的错误信息
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
