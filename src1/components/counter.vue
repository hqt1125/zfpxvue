<template>
  <div>
    计数器：
    <button @click="add">+</button>
    <br>
    当前：{{$store.state.count}}
    <br>计数器：
    <button @click="reb">-</button>
    {{$store.getters.val}}
  </div>
</template>

<script>
import * as Types from "../store/mutations-type";
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    add() {
      this.$store.commit(Types.INCREASE, 2);
    },
    reb() {
      this.$store.commit(Types.REDUCE, 1);
    }
  }
};
</script>

<style scoped>
</style>
