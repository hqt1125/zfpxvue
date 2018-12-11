import * as Types from './mutations-type'
export default {
    [Types.INCREASE](state, count) {
        state.count += count;
    },
    [Types.REDUCE](state, count) {
        state.count -= count;
    }
}