<template>
  <div>
    <mheader>首页</mheader>
    <div class="content">
      <swiper :data="sliders"></swiper>
      <div class="conbox">
        <h3>热门图书</h3>
        <ul>
          <li v-for="(item,index) in books" :key="index">
            <img :src="item.bookCover">
            <b>{{item.bookName}}</b>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import mheader from "../base/mheader.vue";
import swiper from "../base/swiper.vue";
import { getsliders, getHotBook } from "../api/index.js";
export default {
  data() {
    return {
      sliders: [],
      books: []
    };
  },
  created() {
    this.getsld();
    this.getbok();
  },
  components: {
    mheader,
    swiper
  },
  methods: {
    async getsld() {
      let data = await getsliders();
      this.sliders = data;
    },
    async getbok() {
      let data = await getHotBook();
      this.books = data;
    }
  }
};
</script>

<style scoped lang='less'>
.conbox {
  width: 90%;
  margin: 0 auto;
  h3 {
    color: #999;
    padding: 5px 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap; //换行
    li {
      width: 50%;
      text-align: center;
      margin: 5px 0;
      padding-bottom: 10px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
