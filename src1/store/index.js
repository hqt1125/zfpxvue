import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'
import mutations from './mutations'
Vue.use(Vuex);
let state = { count: 0 }
let getters = {
    val: (state) => state.count % 2 ? '奇数' : '偶数'
}
export default new Vuex.Store({
    state, mutations, strict: true, getters, plugins: [logger()]//严格模式
})