<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in data" :key="index">
      <img :src="slide" class="swdiv">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  name: "carrousel",
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          type: "bullets"
        },
        autoplay: {
          delay: 3000, // 1秒切换一次
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。默认为true：停止
        }, //可选选项，自动滑动
        speed: 300 // 速度300
      }
    };
  }
};
</script>
<style scoped>
.swdiv {
  width: 100%;
}
</style>
