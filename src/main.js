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
import Mock from './mock'
import axios from 'axios';
Vue.prototype.$axios=axios;
// Mock.init()
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueProgressBar)

//在vue中使用vuex必须先调用vue.use方法
Vue.use(Vuex)

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
