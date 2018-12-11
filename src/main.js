import Vue from 'vue'
import App from './App'
import router from './router'
//轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper';
//图片懒加载
import VueLazyload from 'vue-lazyload';
require('swiper/dist/css/swiper.css')
Vue.use(VueAwesomeSwiper)
// Vue.use(VueLazyload)
// Vue.use(notify, { delay: 2000 })
//在进入路由之前每一次都会进入这个方法
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
})
Vue.config.productionTip = false;
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
