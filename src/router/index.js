import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home.vue'
import list from '../components/list.vue'
import collect from '../components/collect.vue'
import add from '../components/add.vue'
import detail from '../components/detail.vue'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home, meta: { keepAlive: true } },
        { path: '/list', component: list },
        { path: '/collect', component: collect },
        { path: '/add', component: add },
        { path: '/detail/:bid', component: detail },
        { path: '*', redirect: '/home' }
    ]
})
