<template>
  <div id="app">
    <counter></counter>
  </div>
</template>

<script>
import counter from "./components/counter";
export default {
  name: "App",
  data() {
    return {};
  },
  components: { counter }
};
</script>
