// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'es6-promise/auto';
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store/index'
import ElementUI from 'element-ui'
import '../theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import '@/assets/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';
import router from './router'
import VueProgressBar from 'vue-progressbar'
import axios from 'axios';
Vue.prototype.$axios = axios;
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueProgressBar)

//在vue中使用vuex必须先调用vue.use方法
Vue.use(Vuex)

Vue.config.productionTip = false
//将vuex实例挂载到vue原型链上
Vue.prototype.$store = new Vuex.Store({
    state: {},
    getters: {},
    actions: {},
    mutations: {}
});

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
        window.sessionStorage.removeItem('access-token')
        next()
    }else if(to.path.startsWith('/')){
        console.log('is/page')
        next()
    }else {
        let token = window.sessionStorage.getItem('access-token')
        if (!token) {
            next({ path: '/login' })
        } else {
            next()
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
