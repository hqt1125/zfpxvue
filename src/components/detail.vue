<template>
  <div class="detail">
    <mheader :back="true">详情页</mheader>
    <ul>
      <li>
        <label for="bookName">书的名称</label>
        <input type="text" v-model="book.bookName" id="bookName">
      </li>
      <li>
        <label for="bookInfo">书的信息</label>
        <input type="text" v-model="book.bookInfo" id="bookInfo">
      </li>
      <li>
        <label for="bookPrice">书的价格</label>
        <input type="text" v-model.number="book.bookPrice" id="bookPrice">
      </li>
      <li>
        <button>确认修改</button>
      </li>
    </ul>
  </div>
</template>

<script>
import mheader from "../base/mheader.vue";
import { findOneBook } from "../api/index.js";
export default {
  data() {
    return {
      book: {}
    };
  },
  created() {
    this.data();
  },
  watch: {
    $route() {
      this.data();
    }
  },
  components: { mheader },
  computed: {
    bid() {
      return this.$route.params.bid;
    }
  },
  methods: {
    async data() {
      this.book = await findOneBook(this.bid);
      Object.keys(this.book).length > 0 ? void 0 : this.$router.push("/list");
    }
  }
};
</script>

<style scoped>
.detail {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  z-index: 100;
}
ul {
  margin-top: 50px;
}
</style>
