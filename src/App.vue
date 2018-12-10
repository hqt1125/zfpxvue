<template>
  <div id="app">
    <tab></tab>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import tab from "./base/tab.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    tab
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  touch-action: none;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
}
input,
button {
  appearance: none;
}
.content {
  position: fixed;
  width: 100%;
  top: 40px;
  bottom: 40px;
  overflow: auto;
}
</style>
