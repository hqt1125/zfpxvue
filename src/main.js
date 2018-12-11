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
Vue.config.productionTip = false;
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
