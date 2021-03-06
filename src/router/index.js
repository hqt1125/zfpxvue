import Vue from 'vue'
import Router from 'vue-router'
//路由懒加载
const home = () => import('../components/home.vue');
// import home from '../components/home.vue'
// import list from '../components/list.vue'
const list = () => import('../components/list.vue');
// import collect from '../components/collect.vue'
const collect = () => import('../components/collect.vue');
// import add from '../components/add.vue'
const add = () => import('../components/add.vue');
// import detail from '../components/detail.vue'
const detail = () => import('../components/detail.vue');

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home, meta: { keepAlive: true, title: '首页' } },
        { path: '/list', component: list, meta: { title: '列表' } },
        { path: '/collect', component: collect, meta: { title: '收藏' } },
        { path: '/add', component: add, meta: { title: '添加' } },
        { path: '/detail/:bid', component: detail, meta: { title: '详情' } },
        { path: '*', redirect: '/home', meta: { title: '首页' } }
    ]
})
