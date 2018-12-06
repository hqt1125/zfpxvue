import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')
Vue.use(VueAwesomeSwiper)
// Vue.use(notify, { delay: 2000 })
Vue.config.productionTip = false;
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
