// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store/index'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import '@/assets/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';
import VueProgressBar from 'vue-progressbar'
// import Mock from './mock'
import axios from 'axios';
Vue.prototype.$axios=axios;
// Mock.init()
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueProgressBar)

//在vue中使用vuex必须先调用vue.use方法
Vue.use(Vuex)

/* 请求拦截器 */
// axios.interceptors.request.use(function (config) { // 每次请求时会从sessionStorage中获取token
//     let token = sessionStorage.getItem('access-token')
//     if (token) {
//       token = 'bearer' + ' ' + token.replace(/'|"/g, '') // 把token加入到默认请求参数中
//       config.headers.common['Authorization'] = token
//     }
//     return config
//   }, function (error) {
//     return Promise.reject(error)
//   })
  /* 响应拦截器 */
  axios.interceptors.response.use(function (response) { // 10001 token无效
    if (response.data.errorCode === 10001) {
      sessionStorage.removeItem('access-token') // 删除已经失效或过期的token
      router.replace({
        path: '/login' // 到登录页重新获取token
      })
    } else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token
      sessionStorage.setItem('access-token', response.data.token) // 覆盖原来的token
    }
    return response
  }, function (error) {
    return Promise.reject(error)
  })  

Vue.config.productionTip = false
//将vuex实例挂载到vue原型链上
Vue.prototype.$store = new Vuex.Store({
    state:{},
    getters: {},
    actions: {},
    mutations: {}
   });

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App},
    template: '<App/>'
})
