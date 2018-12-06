<template>
  <div>
    <mheader>列表页</mheader>
    <div class="content">
      <ul>
        <router-link
          v-for="(item,index) in books"
          :key="index"
          :to="`/detail/${item.bookId}`"
          tag="li"
        >
          <img :src="item.bookCover">
          <div>
            <h4>{{item.bookName}}</h4>
            <p>{{item.bookInfo}}</p>
            <b>{{item.bookPrice}}</b>
            <button @click.stop="rmbook(item.bookId)">删除</button>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import mheader from "../base/mheader.vue";
import { getbooks, removeBook } from "../api/index.js";
export default {
  data() {
    return {
      books: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async rmbook(id) {
      await removeBook(id);
      this.getData();
    },
    async getData() {
      let data = await getbooks();
      this.books = data;
    }
  },
  components: { mheader }
};
</script>

<style scoped>
.content ul {
  padding: 10px;
}
.content ul li {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
}
.content ul li img {
  width: 130px;
  height: 150px;
}
.content h4 {
  font-size: 20px;
  line-height: 35px;
}
.content p {
  color: #2a2a2a;
  line-height: 25px;
}
.content b {
  color: red;
}
.content button {
  display: block;
  width: 60px;
  height: 25px;
  background: orangered;
  color: #fff;
  border: none;
  border-radius: 15px;
  outline: none;
}
</style>
