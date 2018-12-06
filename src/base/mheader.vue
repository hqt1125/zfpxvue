<template>
  <div class="header">
    <slot></slot>
    <i class="iconfont icon-return" v-if="back" @click="forback"></i>
  </div>
</template>

<script>
export default {
  props: {
    back: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    forback() {
      this.$router.go(-1);
    }
  },
  components: {}
};
</script>

<style scoped lang='less'>
.header {
  background: #afd9ee;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 11;
  i {
    position: absolute;
    left: 10px;
    font-size: 20px;
  }
}
</style>
