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
          <!-- <img v-lazy="item.bookCover"> //懒加载-->
          <div>
            <h4>{{item.bookName}}</h4>
            <p>{{item.bookInfo}}</p>
            <b>{{item.bookPrice}}</b>
            <div class="btn-list">
              <button @click.stop="rmbook(item.bookId)">删除</button>
              <button @click.stop>添加</button>
            </div>
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
      }, 60);
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
  mounted() {
    let scroll = this.$refs.scroll;
    let top = scroll.offsetTop;
    let distance = 0;
    let ismove = false;
    scroll.addEventListener(
      "touchstart",
      e => {
        if (scroll.scrollTop != 0 && scroll.offsetTop != top) return;
        let start = e.touches[0].pageY; //手指点击的开始位置
        let move = e => {
          ismove = true;
          let current = e.touches[0].pageY;
          distance = current - start; //求得拉动的距离，负数不要
          if (distance > 0) {
            if (distance <= 50) {
              scroll.style.top = distance + top + "px";
            } else {
              distance = 50;
              scroll.style.top = top + 50 + "px";
            }
          } else {
            //如果不在考虑范围内，移除move和end
            scroll.removeEventListener("touchmove", move);
            scroll.removeEventListener("touchend", end);
          }
        };
        let end = e => {
          if (!ismove) return;
          ismove = false;
          clearInterval(this.timer1);
          this.timer1 = setInterval(() => {
            if (distance <= 0) {
              clearInterval(this.timer1);
              distance = 0;
              scroll.addEventListener("touchmove", move);
              scroll.addEventListener("touchend", end);
              scroll.style.top = top + "px";
              this.books = [];
              this.offset = 0;
              this.getData();
              return;
            }
            distance -= 1;
            scroll.style.top = top + distance + "px";
          }, 1);
        };
        scroll.addEventListener("touchmove", move);
        scroll.addEventListener("touchend", end);
      },
      false
    );
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
.btn-list {
  display: flex;
  justify-content: space-around;
}
</style>
