<template>
  <div id="app">
    <tab></tab>
    <transition name="fadeIn">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fadeIn">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
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
  bottom: 60px;
  overflow: auto;
}
.fadeIn-enter {
  opacity: 0;
}
.fadeIn-enter-active {
  transition: all 0.3s linear;
}
.fadeIn-leave-active {
  transition: all 0.3s linear;
  opacity: 0;
}
</style>
