<template>
  <div>
    <mheader>列表页</mheader>
    <div class="content" ref="scroll" @scroll="loadmore">
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
      <div @click="more" class="more">点我加载更多。。。</div>
    </div>
  </div>
</template>

<script>
import mheader from "../base/mheader.vue";
import { pagation, getbooks, removeBook } from "../api/index.js";
export default {
  data() {
    return {
      books: [],
      offset: 0,
      hasMore: true,
      isLoading: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    loadmore() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.scroll;
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          this.getData();
        }
      }, 13);
    },
    more() {
      this.getData();
    },
    async rmbook(id) {
      await removeBook(id);
      this.getData();
    },
    // async getData() {
    //   let data = await getbooks();
    //   this.books = data;
    // },
    async getData() {
      if (this.hasMore && !this.isLoading) {
        this.isLoading = true;
        let { hasMore, books } = await pagation(this.offset);
        this.books = [...this.books, ...books];
        this.hasMore = hasMore;
        this.isLoading = false;
        this.offset = this.books.length;
      }
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
.more {
  color: red;
  font-size: 24px;
  text-align: center;
  width: 100%;
}
</style>
