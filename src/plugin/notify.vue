<template>
  <div>
    <div class="notify">{{value}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "我简直太帅了啊"
    };
  },
  components: {}
};
</script>

<style scoped>
.notify {
  width: 100px;
  height: 40px;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 15px;
  line-height: 40px;
  text-align: center;
  color: #fff;
}
</style>
