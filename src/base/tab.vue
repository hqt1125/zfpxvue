<template>
  <div class="footer">
    <router-link to="/home">
      <i class="iconfont icon-shouye"></i>
      <span>首页</span>
    </router-link>
    <router-link to="/list">
      <i class="iconfont icon-list-2-copy"></i>
      <span>列表</span>
    </router-link>
    <router-link to="/collect">
      <i class="iconfont icon-shoucang"></i>
      <span>收藏</span>
    </router-link>
    <router-link to="/add">
      <i class="iconfont icon-tuanduicankaoxian-"></i>
      <span>添加</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang='less'>
.footer {
  position: fixed;
  z-index: 11;
  background: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  border-top: 1px solid #ccc;
  a {
    display: flex;
    color: darkslategray;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  a.router-link-active {
    color: red;
  }
}
</style>
